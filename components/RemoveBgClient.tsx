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
  processedBy?: "client" | null;
  error?: string | null;
};

function genId() {
  return Math.random().toString(36).slice(2, 9);
}

export default function RemoveBgClient() {
  const [items, setItems] = useState<Item[]>([]);
  const [processingId, setProcessingId] = useState<string | null>(null);
  const [progressText, setProgressText] = useState<string | null>(null);
  const [bgColor, setBgColor] = useState<string>("transparent");
  const imglyRef = useRef<any | null>(null);
  const preloadedRef = useRef(false);

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
  });

  const cleanupItem = (id: string) => {
    setItems((prev) => {
      const found = prev.find((p) => p.id === id);
      if (found) {
        URL.revokeObjectURL(found.url);
        if (found.resultUrl) URL.revokeObjectURL(found.resultUrl);
      }
      return prev.filter((p) => p.id !== id);
    });
  };

  const clearAll = () => {
    items.forEach((it) => {
      URL.revokeObjectURL(it.url);
      if (it.resultUrl) URL.revokeObjectURL(it.resultUrl);
    });
    setItems([]);
  };

  // ---------- IMG.LY (client) helpers ----------
  const ensureImgly = useCallback(async (opts?: { preload?: boolean }) => {
    if (imglyRef.current) return imglyRef.current;
    setProgressText("Loading background-removal library…");
    try {
      const mod = await import("@imgly/background-removal");
      // support default and named export shapes
      const lib = (mod && (mod.default || mod)) ?? mod;
      imglyRef.current = lib;

      if (opts?.preload && typeof mod.preload === "function" && !preloadedRef.current) {
        setProgressText("Preloading models & wasm (first run may take a while)…");
        try {
          await mod.preload({
            debug: false,
            progress: (key: string, cur: number, tot: number) => {
              setProgressText(`Downloading ${key}: ${cur}/${tot}`);
            },
          });
          preloadedRef.current = true;
        } catch (err) {
          console.warn("Preload failed (still usable):", err);
        }
      }

      setProgressText(null);
      return imglyRef.current;
    } catch (err) {
      setProgressText(null);
      console.error("Failed to load @imgly/background-removal:", err);
      throw err;
    }
  }, []);

  // call imgly and normalize result to { blob, name }
  const processOneImgly = useCallback(
    async (it: Item): Promise<{ blob: Blob; name: string }> => {
      const lib = await ensureImgly({ preload: true });
      setProgressText("Removing background (client)…");

      const config: any = {
        debug: false,
        model: "isnet_fp16", // high quality default; change to 'small' to reduce downloads if needed
        output: {
          format: "image/png",
          quality: 0.92,
          type: "foreground",
        },
      };

      // library may be exported as function/default or named removeBackground
      let raw: unknown;
      if (typeof lib === "function") {
        raw = await lib(it.file, config);
      } else if (lib && typeof lib.removeBackground === "function") {
        raw = await lib.removeBackground(it.file, config);
      } else if (lib && typeof lib.default === "function") {
        raw = await lib.default(it.file, config);
      } else {
        throw new Error("Unsupported @imgly/background-removal export shape");
      }

      // Normalize result into Blob
      let resultBlob: Blob | null = null;
      if (raw instanceof Blob) {
        resultBlob = raw;
      } else if ((raw as any)?.blob instanceof Blob) {
        resultBlob = (raw as any).blob;
      } else if (typeof raw === "string" && raw.startsWith("data:")) {
        const res = await fetch(raw);
        resultBlob = await res.blob();
      } else if (raw && typeof raw === "object") {
        const rr: any = raw as any;
        //@ts-ignore
        if (rr instanceof Uint8Array) resultBlob = new Blob([rr], { type: "image/png" });
        else if (rr.arrayBuffer && typeof rr.arrayBuffer === "function") {
          const ab = await rr.arrayBuffer();
          resultBlob = new Blob([ab], { type: "image/png" });
        } else if (rr.data && (rr.data instanceof Uint8Array || rr.data instanceof ArrayBuffer)) {
          const data = rr.data instanceof Uint8Array ? rr.data : new Uint8Array(rr.data);
          resultBlob = new Blob([data], { type: "image/png" });
        }
      }

      if (!resultBlob) {
        // show raw to console for debugging
        console.error("Unsupported result from @imgly/background-removal:", raw);
        throw new Error("Background removal returned unsupported result shape; see console for raw result.");
      }

      const baseName = it.file.name.replace(/\.[^/.]+$/, "");
      const name = `${baseName}-nobg.png`;
      return { blob: resultBlob, name };
    },
    [ensureImgly]
  );

  // ---------- orchestrator (client-only) ----------
  const processAll = async () => {
    if (!items.length) return;
    setProcessingId("batch");
    setProgressText(null);

    setItems((prev) => prev.map((p) => ({ ...p, status: "processing", error: null })));

    try {
      const updated: Item[] = [];
      for (const it of items) {
        setProcessingId(it.id);
        setProgressText("Preparing…");
        setItems((prev) => prev.map((p) => (p.id === it.id ? { ...p, status: "processing" } : p)));

        try {
          const result = await processOneImgly(it);
          const url = URL.createObjectURL(result.blob);
          if (it.resultUrl) URL.revokeObjectURL(it.resultUrl);
          // apply bgColor if requested by compositing in browser before creating blob (optional)
          if (bgColor && bgColor !== "transparent") {
            // composite onto chosen color (client-side)
            const img = document.createElement("img");
            img.src = url;
            await new Promise<void>((res, rej) => {
              img.onload = () => res();
              img.onerror = () => rej(new Error("Image load failed while compositing"));
            });
            const canvas = document.createElement("canvas");
            canvas.width = img.naturalWidth || img.width;
            canvas.height = img.naturalHeight || img.height;
            const ctx = canvas.getContext("2d");
            if (!ctx) throw new Error("Canvas not supported");
            ctx.fillStyle = bgColor;
            ctx.fillRect(0, 0, canvas.width, canvas.height);
            ctx.drawImage(img, 0, 0);
            const blob: Blob | null = await new Promise((resolve) => canvas.toBlob((b) => resolve(b), "image/png"));
            if (!blob) throw new Error("Failed to encode composited image");
            URL.revokeObjectURL(url);
            const newUrl = URL.createObjectURL(blob);
            updated.push({
              ...it,
              resultUrl: newUrl,
              afterKB: +(blob.size / 1024).toFixed(1),
              outName: result.name,
              status: "done",
              processedBy: "client",
              error: null,
            });
          } else {
            updated.push({
              ...it,
              resultUrl: url,
              afterKB: +(result.blob.size / 1024).toFixed(1),
              outName: result.name,
              status: "done",
              processedBy: "client",
              error: null,
            });
          }
        } catch (err: any) {
          console.error("Failed to process", it.file.name, err);
          updated.push({
            ...it,
            status: "failed",
            processedBy: "client",
            error: err?.message || String(err),
          });
        }

        // small delay to keep UI responsive
        await new Promise((r) => setTimeout(r, 120));
      }

      setItems(updated);
    } finally {
      setProcessingId(null);
      setProgressText(null);
    }
  };

  const downloadAll = async () => {
    for (const it of items) {
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

  const preloadAssets = async () => {
    try {
      setProgressText("Preloading assets…");
      await ensureImgly({ preload: true });
      setProgressText("Preload complete");
      setTimeout(() => setProgressText(null), 1500);
    } catch (err: any) {
      setProgressText("Preload failed: " + (err?.message || String(err)));
      setTimeout(() => setProgressText(null), 2500);
    }
  };

  // warm up library in background if user opens the page
  useEffect(() => {
    ensureImgly({ preload: false }).catch(() => null);
  }, [ensureImgly]);

  return (
    <div className="w-full">
      <div
        {...getRootProps()}
        className={`w-full border-2 rounded-lg p-4 cursor-pointer transition-colors ${isDragActive ? "border-blue-300 bg-blue-50" : "border-sky-100 bg-white"}`}
      >
        <input {...getInputProps()} />
        <p className="m-0 text-sm text-slate-700">{isDragActive ? "Drop images here..." : "Drag & drop images, or click to select"}</p>
        <small className="text-xs text-slate-500">Supports JPG, PNG, WEBP. Multiple files supported — client-side only.</small>
      </div>

      {items.length > 0 && (
        <>
          <div className="mt-3 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between flex-wrap">
            <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:gap-4">
              <div className="flex items-center gap-3">
                <span className="text-sm w-28">Background</span>
                <select value={bgColor} onChange={(e) => setBgColor(e.target.value)} className="px-2 py-1 text-sm border rounded w-44">
                  <option value="transparent">Transparent (PNG)</option>
                  <option value="#ffffff">White</option>
                  <option value="#000000">Black</option>
                  <option value="#f7f7f7">Light Gray</option>
                  <option value="#fffcdb">Cream</option>
                </select>
              </div>

              <div className="flex items-center gap-3">
                <span className="text-sm w-28">Engine</span>
                <span className="text-xs text-slate-500">IMG.LY (in-browser WASM)</span>
              </div>
            </div>

            <div className="flex flex-col gap-2 w-full sm:w-auto sm:flex-row sm:items-center">
              <button onClick={processAll} disabled={!!processingId} className="w-full sm:w-auto px-4 py-2 rounded-md text-white bg-blue-600 hover:bg-blue-700 disabled:opacity-50">
                {processingId ? "Processing..." : "Remove Background"}
              </button>

              <button onClick={downloadAll} disabled={items.every((i) => !i.resultUrl)} className="w-full sm:w-auto px-4 py-2 rounded-md text-white bg-green-600 hover:bg-green-700 disabled:opacity-50">
                Download All
              </button>

              <button onClick={() => clearAll()} className="w-full sm:w-auto px-4 py-2 rounded-md border bg-white text-slate-700 hover:bg-slate-50">
                Reset
              </button>

              <button onClick={preloadAssets} className="hidden sm:inline-block w-full sm:w-auto px-4 py-2 rounded-md border bg-white text-slate-700 hover:bg-slate-50">
                Preload Assets
              </button>
            </div>
          </div>

          <div className="mt-3 space-y-3">
            {progressText && <div className="text-sm text-slate-600">{progressText}</div>}

            <ul className="space-y-3">
              {items.map((it) => (
                <li key={it.id} className="sm:grid md:flex items-center gap-3 p-2 border rounded-md">
                  <img src={it.resultUrl || it.url} alt={it.file.name} className="w-24 h-16 object-cover rounded-sm flex-shrink-0" style={{ backgroundColor: it.resultUrl && bgColor !== "transparent" ? bgColor : undefined }} />

                  <div className="flex-1 min-w-0">
                    <div className="font-semibold truncate text-sm" title={it.file.name}>
                      {it.file.name}
                    </div>
                    <div className="text-xs text-slate-500 mt-1">
                      {it.beforeKB} KB {it.afterKB ? `→ ${it.afterKB} KB` : ""} {it.outName ? ` / ${it.outName}` : ""}
                    </div>

                    <div className="text-xs mt-1">
                      {it.status === "processing" && <span className="text-blue-600">Processing…</span>}
                      {it.status === "done" && it.processedBy && <span className="text-green-600">Done (client)</span>}
                      {it.status === "failed" && <span className="text-red-600">Error: {it.error}</span>}
                    </div>
                  </div>

                  <div className="flex gap-2 w-28 sm:w-auto mt-2">
                    {it.resultUrl && (
                      <a href={it.resultUrl} download={it.outName || `${it.file.name.replace(/\.[^/.]+$/, "")}-nobg.png`} className="text-sm text-white bg-green-600 hover:bg-green-700 px-3 py-2 rounded-md text-center">
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
