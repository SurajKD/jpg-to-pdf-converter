// components/ImageCompressorClient.tsx
'use client'

import React, { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";

type Item = {
  id: string;
  file: File;
  url: string;
  compressedUrl?: string;
  beforeKB?: number;
  afterKB?: number;
  outName?: string;
  outType?: string;
};

function genId() {
  return Math.random().toString(36).slice(2, 9);
}

export default function ImageCompressorClient() {
  const [items, setItems] = useState<Item[]>([]);
  const [quality, setQuality] = useState<number>(0.75);
  const [format, setFormat] = useState<"image/jpeg" | "image/webp" | "image/png">("image/jpeg");
  const [processing, setProcessing] = useState(false);
  const [maxDim, setMaxDim] = useState<number>(1920);

  const onDrop = useCallback((accepted: File[]) => {
    const added = accepted.map(f => ({
      id: genId(),
      file: f,
      url: URL.createObjectURL(f),
      beforeKB: +(f.size / 1024).toFixed(1),
    }));
    setItems(prev => [...prev, ...added]);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { "image/*": [] },
    multiple: true,
  });

  const remove = (id: string) => {
    setItems(prev => {
      const found = prev.find(p => p.id === id);
      if (found) URL.revokeObjectURL(found.url);
      if (found && found.compressedUrl) URL.revokeObjectURL(found.compressedUrl);
      return prev.filter(p => p.id !== id);
    });
  };

  const computeTargetSize = (width: number, height: number, maxSide: number) => {
    const long = Math.max(width, height);
    if (long <= maxSide) return { w: width, h: height };
    const ratio = maxSide / long;
    return { w: Math.round(width * ratio), h: Math.round(height * ratio) };
  };

  const compressOne = (file: File): Promise<{ blob: Blob; name: string; type: string }> => {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.onload = () => {
        try {
          const naturalW = img.naturalWidth || img.width;
          const naturalH = img.naturalHeight || img.height;
          const { w: targetW, h: targetH } = computeTargetSize(naturalW, naturalH, maxDim);

          const canvas = document.createElement("canvas");
          canvas.width = targetW;
          canvas.height = targetH;
          const ctx = canvas.getContext("2d", { alpha: true });
          if (!ctx) return reject(new Error("Canvas not supported"));

          ctx.drawImage(img, 0, 0, targetW, targetH);

          const hasAlpha = file.type === "image/png" || file.type === "image/webp" || file.name.toLowerCase().endsWith(".png");
          if (format === "image/jpeg" && hasAlpha) {
            const bg = document.createElement("canvas");
            bg.width = targetW;
            bg.height = targetH;
            const bgCtx = bg.getContext("2d");
            if (!bgCtx) return reject(new Error("Canvas not supported"));
            bgCtx.fillStyle = "#ffffff";
            bgCtx.fillRect(0, 0, targetW, targetH);
            bgCtx.drawImage(canvas, 0, 0);
            ctx.clearRect(0, 0, targetW, targetH);
            ctx.drawImage(bg, 0, 0);
          }

          const doToBlob = (mime: string, q?: number) => {
            const cb = (blob: Blob | null) => {
              if (!blob) return reject(new Error("Compression failed"));
              const baseName = file.name.replace(/\.[^/.]+$/, "");
              const ext = mime === "image/png" ? "png" : mime === "image/webp" ? "webp" : "jpg";
              const outName = `${baseName}-compressed.${ext}`;
              const outFile = new File([blob], outName, { type: blob.type || mime });
              resolve({ blob: outFile, name: outName, type: outFile.type });
            };

            if (mime === "image/png") {
              canvas.toBlob(cb, mime);
            } else {
              canvas.toBlob(cb, mime, q);
            }
          };

          if (format === "image/png") {
            doToBlob("image/png");
          } else if (format === "image/webp") {
            doToBlob("image/webp", quality);
          } else {
            doToBlob("image/jpeg", quality);
          }
        } catch (err) {
          reject(err);
        }
      };
      img.onerror = () => reject(new Error("Image load failed"));
      img.src = URL.createObjectURL(file);
    });
  };

  const compressAll = async () => {
    if (!items.length) return;
    setProcessing(true);
    const updated: Item[] = [];
    try {
      for (const it of items) {
        const result = await compressOne(it.file);
        const url = URL.createObjectURL(result.blob);
        updated.push({
          ...it,
          compressedUrl: url,
          afterKB: +(result.blob.size / 1024).toFixed(1),
          outName: result.name,
          outType: result.type,
        });
        // yield for UI responsiveness
        await new Promise(res => setTimeout(res, 120));
      }
      setItems(updated);
    } catch (err) {
      console.error(err);
      alert("Compression failed for one or more images. Try lower quality or a smaller max dimension.");
    } finally {
      setProcessing(false);
    }
  };

  const downloadAllAsZip = async () => {
    for (const it of items) {
      if (!it.compressedUrl) continue;
      const a = document.createElement("a");
      a.href = it.compressedUrl;
      const suggestedName = it.outName || `${it.file.name.replace(/\.[^/.]+$/, "")}-compressed.${format === "image/png" ? "png" : format === "image/webp" ? "webp" : "jpg"}`;
      a.download = suggestedName;
      document.body.appendChild(a);
      a.click();
      a.remove();
      await new Promise(r => setTimeout(r, 250));
    }
  };

  return (
    <div className="w-full">
      {/* Dropzone */}
      <div
        {...getRootProps()}
        className={`w-full border-2 rounded-lg p-4 cursor-pointer transition-colors ${
          isDragActive ? "border-blue-300 bg-blue-50" : "border-sky-100 bg-white"
        }`}
      >
        <input {...getInputProps()} />
        <p className="m-0 text-sm text-slate-700">{isDragActive ? "Drop images here..." : "Drag & drop images, or click to select"}</p>
        <small className="text-xs text-slate-500">Supports JPG, PNG, WEBP. Multiple files supported.</small>
      </div>

      {items.length > 0 && (
        <>
          {/* Controls */}
          <div className="mt-3 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between flex-wrap">
            <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:gap-4">
              {/* Quality */}
              <div className="flex items-center gap-3 min-w-0">
                <span className="text-sm w-16">Quality</span>
                <input
                  className="w-40 sm:w-48"
                  disabled={format === "image/png"}
                  type="range"
                  min={0.2}
                  max={1}
                  step={0.05}
                  value={quality}
                  onChange={(e) => setQuality(Number(e.target.value))}
                />
                <span className="text-sm w-10 text-right">{Math.round(quality * 100)}%</span>
              </div>

              {/* Max dim */}
              <div className="flex items-center gap-3">
                <span className="text-sm w-24">Max dim</span>
                <input
                  type="number"
                  min={200}
                  max={8000}
                  step={100}
                  value={maxDim}
                  onChange={(e) => setMaxDim(Number(e.target.value))}
                  className="w-24 text-sm px-2 py-1 border rounded"
                />
                <span className="text-sm text-slate-500">px</span>
              </div>

              {/* Output */}
              <div className="flex items-center gap-3">
                <span className="text-sm w-16">Output</span>
                <select
                  value={format}
                  onChange={(e) => setFormat(e.target.value as any)}
                  className="px-2 py-1 text-sm border rounded w-36"
                >
                  <option value="image/jpeg">JPEG (smaller)</option>
                  <option value="image/webp">WebP (best)</option>
                  <option value="image/png">PNG (lossless)</option>
                </select>
              </div>
            </div>

            {/* Action buttons - on mobile these will be stacked full width */}
            <div className="flex flex-col gap-2 w-full sm:w-auto sm:flex-row sm:items-center">
              <button
                onClick={compressAll}
                disabled={processing}
                className="w-full sm:w-auto px-4 py-2 rounded-md text-white bg-blue-600 hover:bg-blue-700 disabled:opacity-50"
              >
                {processing ? "Compressing..." : "Compress Images"}
              </button>

              <button
                onClick={downloadAllAsZip}
                disabled={processing || items.every(i => !i.compressedUrl)}
                className="w-full sm:w-auto px-4 py-2 rounded-md text-white bg-green-600 hover:bg-green-700 disabled:opacity-50"
              >
                Download All
              </button>

              <button
                onClick={() => {
                  items.forEach(i => i.compressedUrl && URL.revokeObjectURL(i.compressedUrl));
                  setItems([]);
                }}
                className="w-full sm:w-auto px-4 py-2 rounded-md border bg-white text-slate-700 hover:bg-slate-50"
              >
                Reset
              </button>
            </div>
          </div>

          {/* List */}
          <ul className="mt-3 space-y-3">
            {items.map(it => (
              <li key={it.id} className="sm:grid md:flex items-center gap-3 p-2 border rounded-md">
                <img
                  src={it.compressedUrl || it.url}
                  alt={it.file.name}
                  className="w-24 h-16 object-cover rounded-sm flex-shrink-0"
                />

                <div className="flex-1 min-w-0">
                  <div className="font-semibold truncate text-sm" title={it.file.name}>
                    {it.file.name}
                  </div>
                  <div className="text-xs text-slate-500 mt-1">
                    {it.beforeKB} KB {it.afterKB ? `→ ${it.afterKB} KB` : ""} {it.outName ? ` / ${it.outName}` : ""}
                  </div>
                </div>

                <div className="flex gap-2 w-28 sm:w-auto mt-2">
                  {it.compressedUrl && (
                    <a
                      href={it.compressedUrl}
                      download={it.outName || `${it.file.name.replace(/\.[^/.]+$/, "")}-compressed`}
                      className="text-sm text-white bg-green-600 hover:bg-green-700 px-3 py-2 rounded-md text-center"
                    >
                      Download
                    </a>
                  )}

                  <button
                    onClick={() => remove(it.id)}
                    className="text-sm bg-white border px-3 py-2 rounded-md hover:bg-slate-50"
                  >
                    Remove
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
}
