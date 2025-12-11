// components/RemoveBgClient.tsx
'use client';

import React, { useCallback, useEffect, useRef, useState } from "react";
import { useDropzone } from "react-dropzone";

type Item = {
  id: string;
  file: File;
  url: string;
  resultUrl?: string;
  beforeKB?: number;
  afterKB?: number;
  outName?: string;
  status?: "idle" | "processing" | "done" | "failed";
  processedBy?: "client" | "server" | null;
  error?: string | null;
};

function genId() {
  return Math.random().toString(36).slice(2, 9);
}

export default function RemoveBgClient() {
  const [items, setItems] = useState<Item[]>([]);
  const itemsRef = useRef<Item[]>([]);
  useEffect(() => {
    itemsRef.current = items;
  }, [items]);

  const [processingId, setProcessingId] = useState<string | null>(null);
  const [progressText, setProgressText] = useState<string | null>(null);
  const [bgColor, setBgColor] = useState<string>("transparent");

  // imgly wrapper: { lib: defaultExportOrFunction, raw: moduleExports }
  const imglyRef = useRef<any | null>(null);
  const preloadedRef = useRef(false);
  const mountedRef = useRef(true);

  useEffect(() => {
    mountedRef.current = true;
    return () => {
      mountedRef.current = false;
    };
  }, []);

  // ---------- dropzone ----------
  const onDrop = useCallback((accepted: File[]) => {
    const added = accepted.map((f) => ({
      id: genId(),
      file: f,
      url: URL.createObjectURL(f),
      beforeKB: +(f.size / 1024).toFixed(1),
      status: "idle" as const,
      processedBy: null,
      error: null,
    }));
    setItems((prev) => [...prev, ...added]);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { "image/*": [] },
    multiple: true,
    maxSize: 25 * 1024 * 1024, // 25MB per file cap (tweak as needed)
  });

  // revoke object URLs for one item
  const cleanupItem = (id: string) => {
    setItems((prev) => {
      const found = prev.find((p) => p.id === id);
      if (found) {
        try {
          URL.revokeObjectURL(found.url);
        } catch {}
        if (found.resultUrl) {
          try {
            URL.revokeObjectURL(found.resultUrl);
          } catch {}
        }
      }
      return prev.filter((p) => p.id !== id);
    });
  };

  // revoke and clear all
  const clearAll = () => {
    setItems((prev) => {
      prev.forEach((it) => {
        try {
          URL.revokeObjectURL(it.url);
        } catch {}
        if (it.resultUrl) {
          try {
            URL.revokeObjectURL(it.resultUrl);
          } catch {}
        }
      });
      return [];
    });
    setProcessingId(null);
    setProgressText(null);
  };

  // cleanup on unmount (revoke any created object urls)
  useEffect(() => {
    return () => {
      itemsRef.current.forEach((it) => {
        try {
          URL.revokeObjectURL(it.url);
        } catch {}
        if (it.resultUrl) {
          try {
            URL.revokeObjectURL(it.resultUrl);
          } catch {}
        }
      });
    };
  }, []);

  // ---------- IMG.LY helpers (robust) ----------
  const ensureImgly = useCallback(async (opts?: { preload?: boolean }) => {
    if (imglyRef.current) return imglyRef.current;
    if (!mountedRef.current) throw new Error("component unmounted");

    setProgressText("Loading @imgly/background-removal…");
    try {
      const mod = await import("@imgly/background-removal");
      // Log the exported shape for debugging
      console.info("@imgly/background-removal exports:", {
        hasDefault: !!(mod as any).default,
        hasRemoveBackground: !!(mod as any).removeBackground,
        hasPreload: !!(mod as any).preload,
        moduleKeys: Object.keys(mod),
      });

      // Normalize wrapper
      const lib = (mod && ((mod as any).default || mod)) ?? mod;
      imglyRef.current = { lib, raw: mod };

      // Optional preload
      if (opts?.preload && typeof (mod as any).preload === "function" && !preloadedRef.current) {
        setProgressText("Preloading models & wasm (first run may take a while)…");
        try {
          await (mod as any).preload({
            debug: true,
            progress: (key: string, cur: number, tot: number) => {
              if (!mountedRef.current) return;
              setProgressText(`Downloading ${key}: ${cur}/${tot}`);
            },
          });
          preloadedRef.current = true;
        } catch (err) {
          console.warn("Imgly preload failed (non-fatal):", err);
        }
      }

      if (mountedRef.current) setProgressText(null);
      return imglyRef.current;
    } catch (err) {
      if (mountedRef.current) setProgressText(null);
      console.error("Failed importing @imgly/background-removal:", err);
      throw err;
    }
  }, []);

  // single image processing with imgly — robust to lib input shape (prefer blob URL)
  const processOneImgly = useCallback(
    async (it: Item): Promise<{ blob: Blob; name: string }> => {
      const wrapper = await ensureImgly({ preload: true });
      if (!mountedRef.current) throw new Error("component unmounted");

      // Try to locate the callable: many versions export a default function or named removeBackground
      const libFunc =
        (wrapper && (wrapper.lib || (wrapper.raw && ((wrapper.raw as any).removeBackground || (wrapper.raw as any).default)))) ||
        null;

      if (!libFunc || typeof libFunc !== "function") {
        throw new Error("Unexpected @imgly/background-removal export shape (no callable found)");
      }

      const callLib = async (input: any) => {
        const config: any = {
          debug: true,
          output: { format: "image/png", quality: 0.92, type: "foreground" },
        };
        return await libFunc(input, config);
      };

      setProgressText("Removing background (client)…");

      let lastErr: any = null;
      let resultBlob: Blob | null = null;

      // 1) Preferred: pass blob-url string (some versions expect string and call .replace)
      try {
        const blobUrl = it.url || URL.createObjectURL(it.file);
        console.debug("Trying imgly with blob URL:", typeof blobUrl, blobUrl?.slice?.(0, 120));
        resultBlob = await callLib(blobUrl);
      } catch (err: any) {
        lastErr = err;
        console.warn("imgly with blob URL failed:", err);
      }

      // 2) Fallback: pass File/Blob directly
      if (!resultBlob) {
        try {
          console.debug("Trying imgly with File/Blob:", it.file.name, it.file.type);
          resultBlob = await callLib(it.file);
        } catch (err: any) {
          lastErr = err;
          console.warn("imgly with file/blob failed:", err);
        }
      }

      // 3) Last resort: ArrayBuffer / Uint8Array
      if (!resultBlob) {
        try {
          const ab = await it.file.arrayBuffer();
          console.debug("Trying imgly with ArrayBuffer length:", ab.byteLength);
          resultBlob = await callLib(ab);
        } catch (err: any) {
          lastErr = err;
          console.warn("imgly with arraybuffer failed:", err);
        }
      }

      if (!resultBlob) {
        console.error("Background removal failed for", it.file.name, lastErr);
        throw lastErr || new Error("Background removal returned no blob");
      }

      const baseName = it.file.name.replace(/\.[^/.]+$/, "");
      const name = `${baseName}-nobg.png`;
      return { blob: resultBlob, name };
    },
    [ensureImgly]
  );

  // ---------- orchestrator ----------
  const processAll = async () => {
    // snapshot current items to avoid stale closures
    const list = itemsRef.current.slice();
    if (!list.length) return;
    setProcessingId("batch");
    setProgressText(null);

    // mark all as processing initially
    setItems((prev) => prev.map((p) => ({ ...p, status: "processing", error: null })));

    try {
      for (const it of list) {
        if (!mountedRef.current) break;
        setProcessingId(it.id);
        setItems((prev) => prev.map((p) => (p.id === it.id ? { ...p, status: "processing", error: null } : p)));

        try {
          const result = await processOneImgly(it);
          if (!mountedRef.current) break;
          const url = URL.createObjectURL(result.blob);

          setItems((prev) =>
            prev.map((p) => {
              if (p.id !== it.id) return p;
              if (p.resultUrl && p.resultUrl !== url) {
                try {
                  URL.revokeObjectURL(p.resultUrl);
                } catch {}
              }
              return {
                ...p,
                resultUrl: url,
                afterKB: +(result.blob.size / 1024).toFixed(1),
                outName: result.name,
                status: "done",
                processedBy: "client",
                error: null,
              };
            })
          );
        } catch (err: any) {
          console.error("Failed to process", it.file.name, err);
          setItems((prev) =>
            prev.map((p) => (p.id === it.id ? { ...p, status: "failed", processedBy: "client", error: err?.message || String(err) } : p))
          );
        }

        // throttle briefly so UI can breathe
        await new Promise((r) => setTimeout(r, 120));
      }
    } finally {
      if (mountedRef.current) {
        setProcessingId(null);
        setProgressText(null);
      }
    }
  };

  const downloadAll = async () => {
    for (const it of itemsRef.current) {
      if (!it.resultUrl) continue;
      const a = document.createElement("a");
      a.href = it.resultUrl;
      a.download = it.outName || `${it.file.name.replace(/\.[^/.]+$/, "")}-nobg.png`;
      document.body.appendChild(a);
      a.click();
      a.remove();
      await new Promise((r) => setTimeout(r, 200));
    }
  };

  // Try to preload assets on mount (non-fatal)
  useEffect(() => {
    ensureImgly({ preload: true }).catch(() => {});
  }, [ensureImgly]);

  // ---------- render ----------
  return (
    <div className="w-full">
      <div
        {...getRootProps()}
        aria-label="File dropzone"
        className={`w-full border-2 rounded-lg p-4 cursor-pointer transition-colors ${isDragActive ? "border-blue-300 bg-blue-50" : "border-sky-100 bg-white"
          }`}
      >
        <input {...getInputProps()} aria-hidden />
        <p className="m-0 text-sm text-slate-700">{isDragActive ? "Drop images here..." : "Drag & drop images, or click to select"}</p>
        <small className="text-xs text-slate-500">Supports JPG, PNG, WEBP. Multiple files supported. Max 25MB each.</small>
      </div>

      {items.length > 0 && (
        <>
          <div className="mt-3 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
              <div className="flex items-center gap-3">
                <label className="text-sm w-28" htmlFor="bg-select">Background</label>
                <select id="bg-select" value={bgColor} onChange={(e) => setBgColor(e.target.value)} className="px-2 py-1 text-sm border rounded w-44">
                  <option value="transparent">Transparent (PNG)</option>
                  <option value="#ffffff">White</option>
                  <option value="#000000">Black</option>
                  <option value="#f7f7f7">Light Gray</option>
                  <option value="#fffcdb">Cream</option>
                </select>
              </div>

              <div className="flex items-center gap-3">
                <span className="text-sm w-28">Model</span>
                <span className="text-xs text-slate-500">Imgly (in-browser)</span>
              </div>
            </div>

            <div className="flex flex-col gap-2 w-full sm:w-auto sm:flex-row sm:items-center">
              <button
                onClick={processAll}
                disabled={!!processingId}
                className="w-full sm:w-auto px-4 py-2 rounded-md text-white bg-blue-600 hover:bg-blue-700 disabled:opacity-50"
                aria-disabled={!!processingId}
              >
                {processingId ? "Processing..." : "Remove Background"}
              </button>

              <button
                onClick={downloadAll}
                disabled={items.every((i) => !i.resultUrl)}
                className="w-full sm:w-auto px-4 py-2 rounded-md text-white bg-green-600 hover:bg-green-700 disabled:opacity-50"
                aria-disabled={items.every((i) => !i.resultUrl)}
              >
                Download All
              </button>

              <button
                onClick={() => clearAll()}
                className="w-full sm:w-auto px-4 py-2 rounded-md border bg-white text-slate-700 hover:bg-slate-50"
              >
                Reset
              </button>
            </div>
          </div>

          <div className="mt-3 space-y-3">
            {progressText && <div className="text-sm text-slate-600">{progressText}</div>}

            <ul className="space-y-3">
              {items.map((it) => (
                <li key={it.id} className="flex flex-col sm:flex-row items-start sm:items-center gap-3 p-2 border rounded-md">
                  <div className="w-full sm:w-24 flex-shrink-0">
                    <img
                      src={it.resultUrl || it.url}
                      alt={it.file.name}
                      className="w-full h-16 object-cover rounded-sm"
                      style={{ backgroundColor: it.resultUrl && bgColor !== "transparent" ? bgColor : undefined }}
                    />
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="font-semibold truncate text-sm" title={it.file.name}>
                      {it.file.name}
                    </div>
                    <div className="text-xs text-slate-500 mt-1">
                      {it.beforeKB} KB {it.afterKB ? `→ ${it.afterKB} KB` : ""} {it.outName ? ` / ${it.outName}` : ""}
                    </div>

                    <div className="text-xs mt-1">
                      {it.status === "processing" && <span className="text-blue-600">Processing…</span>}
                      {it.status === "done" && it.processedBy && <span className="text-green-600">Done ({it.processedBy === "client" ? "client" : "server"})</span>}
                      {it.status === "failed" && <span className="text-red-600">Error: {it.error}</span>}
                    </div>
                  </div>

                  <div className="flex gap-2 mt-2 sm:mt-0">
                    {it.resultUrl && (
                      <a
                        href={it.resultUrl}
                        download={it.outName || `${it.file.name.replace(/\.[^/.]+$/, "")}-nobg.png`}
                        className="text-sm text-white bg-green-600 hover:bg-green-700 px-3 py-2 rounded-md text-center"
                      >
                        Download
                      </a>
                    )}

                    <button onClick={() => cleanupItem(it.id)} className="text-sm bg-white border px-3 py-2 rounded-md hover:bg-slate-50">
                      Remove
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </>
      )}
    </div>
  );
}
