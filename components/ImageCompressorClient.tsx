// components/ImageCompressorClient.tsx
'use client'

import React, { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";

type Item = { id: string; file: File; url: string; compressedUrl?: string; beforeKB?: number; afterKB?: number };

function genId() {
  return Math.random().toString(36).slice(2, 9);
}

/**
 * Simple image compressor using canvas. Works for JPG/PNG/WebP.
 * quality: 0.0 - 1.0 (JPEG/WebP). PNG will be converted to JPEG if requested.
 */
export default function ImageCompressorClient() {
  const [items, setItems] = useState<Item[]>([]);
  const [quality, setQuality] = useState<number>(0.75);
  const [format, setFormat] = useState<"image/jpeg" | "image/webp" | "image/png">("image/jpeg");
  const [processing, setProcessing] = useState(false);

  const onDrop = useCallback((accepted: File[]) => {
    const added = accepted.map(f => ({ id: genId(), file: f, url: URL.createObjectURL(f), beforeKB: +(f.size / 1024).toFixed(1) }));
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

  const compressOne = (file: File): Promise<Blob> => {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.onload = () => {
        try {
          const maxW = img.width;
          const maxH = img.height;
          const canvas = document.createElement("canvas");
          canvas.width = maxW;
          canvas.height = maxH;
          const ctx = canvas.getContext("2d");
          if (!ctx) return reject(new Error("Canvas not supported"));
          // Draw image
          ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
          // Convert to desired format
          canvas.toBlob(
            (blob) => {
              if (!blob) return reject(new Error("Compression failed"));
              resolve(blob);
            },
            format,
            quality
          );
        } catch (err) {
          reject(err);
        }
      };
      img.onerror = (e) => reject(new Error("Image load failed"));
      img.src = URL.createObjectURL(file);
    });
  };

  const compressAll = async () => {
    if (!items.length) return;
    setProcessing(true);
    const updated: Item[] = [];
    try {
      for (const it of items) {
        const blob = await compressOne(it.file);
        const url = URL.createObjectURL(blob);
        updated.push({
          ...it,
          compressedUrl: url,
          afterKB: +(blob.size / 1024).toFixed(1),
        });
        // small delay to yield main thread for UI responsiveness on large batches
        await new Promise(res => setTimeout(res, 120));
      }
      setItems(updated);
    } catch (err) {
      console.error(err);
      alert("Compression failed for one or more images. Try lower quality.");
    } finally {
      setProcessing(false);
    }
  };

  const downloadAllAsZip = async () => {
    // Minimal: download each file sequentially (no zip lib to avoid deps).
    // If you want zip, we can add JSZip later.
    for (const it of items) {
      if (!it.compressedUrl) continue;
      const a = document.createElement("a");
      a.href = it.compressedUrl;
      const ext = format === "image/png" ? "png" : format === "image/webp" ? "webp" : "jpg";
      a.download = `${it.file.name.replace(/\.[^/.]+$/, "")}-compressed.${ext}`;
      document.body.appendChild(a);
      a.click();
      a.remove();
      await new Promise(r => setTimeout(r, 250));
    }
  };

  return (
    <div>
      <div {...getRootProps()} style={{ padding: 14, border: "2px dashed #e6eef8", borderRadius: 8, cursor: "pointer", background: isDragActive ? "#f4fbff" : "#fff" }}>
        <input {...getInputProps()} />
        <p style={{ margin: 0, color: "#333" }}>{isDragActive ? "Drop images here..." : "Drag & drop images, or click to select"}</p>
        <small style={{ color: "#666" }}>Supports JPG, PNG, WEBP. Multiple files supported.</small>
      </div>

      {items.length > 0 && (
        <div style={{ marginTop: 12 }}>
          <div style={{ display: "flex", gap: 8, alignItems: "center", flexWrap: "wrap" }}>
            <label style={{ display: "flex", gap: 8, alignItems: "center" }}>
              Quality
              <input type="range" min={0.2} max={1} step={0.05} value={quality} onChange={(e) => setQuality(Number(e.target.value))} />
              <span className="small">{Math.round(quality * 100)}%</span>
            </label>

            <label style={{ display: "flex", gap: 8, alignItems: "center" }}>
              Output
              <select value={format} onChange={(e) => setFormat(e.target.value as any)} style={{ padding: "6px 8px", borderRadius: 6 }}>
                <option value="image/jpeg">JPEG (smaller)</option>
                <option value="image/webp">WebP (best)</option>
                <option value="image/png">PNG (lossless)</option>
              </select>
            </label>

            <button onClick={compressAll} disabled={processing} className="btn" style={{ opacity: processing ? 0.6 : 1 }}>
              {processing ? "Compressing..." : "Compress Images"}
            </button>

            <button onClick={downloadAllAsZip} disabled={processing || items.every(i => !i.compressedUrl)} className="btn" style={{ background: "#22c55e" }}>
              Download All
            </button>

            <button onClick={() => { items.forEach(i => i.compressedUrl && URL.revokeObjectURL(i.compressedUrl)); setItems([]); }} style={{ background: "#fff", border: "1px solid #e6eef8", padding: "8px 12px", borderRadius: 8 }}>
              Reset
            </button>
          </div>

          <ul style={{ marginTop: 12, padding: 0, listStyle: "none" }}>
            {items.map(it => (
              <li key={it.id} style={{ display: "flex", gap: 12, alignItems: "center", marginBottom: 12, padding: 8, borderRadius: 8, border: "1px solid #f1f5f9" }}>
                <img src={it.compressedUrl || it.url} alt={it.file.name} width={96} style={{ objectFit: "cover", borderRadius: 6 }} />
                <div style={{ flex: 1 }}>
                  <div style={{ fontWeight: 600 }}>{it.file.name}</div>
                  <div className="small">{it.beforeKB} KB {it.afterKB ? `→ ${it.afterKB} KB` : ''}</div>
                </div>
                <div style={{ display: "flex", gap: 8 }}>
                  {it.compressedUrl && <a href={it.compressedUrl} download={`${it.file.name.replace(/\.[^/.]+$/, "")}-compressed`} className="btn" style={{ background: "#22c55e" }}>Download</a>}
                  <button onClick={() => remove(it.id)} style={{ background: "#fff", border: "1px solid #eee", padding: "8px 10px", borderRadius: 8 }}>Remove</button>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
