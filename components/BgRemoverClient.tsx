// components/BgRemoverClient.tsx
'use client'

import React, { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";

/**
 * Basic background remover: removes near-white background by alpha threshold.
 * This is NOT a machine-learning perfect remover but works well for simple white backgrounds.
 * For advanced removal, we can later integrate WASM models or a server option.
 */

type Item = { id: string; file: File; url: string; resultUrl?: string };

function genId() { return Math.random().toString(36).slice(2, 9); }

export default function BgRemoverClient() {
  const [items, setItems] = useState<Item[]>([]);
  const [threshold, setThreshold] = useState<number>(240); // 0-255: higher = more removed (near-white)
  const [processing, setProcessing] = useState(false);

  const onDrop = useCallback((accepted: File[]) => {
    const added = accepted.map(f => ({ id: genId(), file: f, url: URL.createObjectURL(f) }));
    setItems(prev => [...prev, ...added]);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { "image/*": [] },
    multiple: true,
  });

  const revokeAll = () => {
    items.forEach(i => { URL.revokeObjectURL(i.url); if (i.resultUrl) URL.revokeObjectURL(i.resultUrl); });
  }

  const remove = (id: string) => {
    setItems(prev => {
      const found = prev.find(p => p.id === id);
      if (found) { URL.revokeObjectURL(found.url); if (found.resultUrl) URL.revokeObjectURL(found.resultUrl); }
      return prev.filter(p => p.id !== id);
    });
  };

  const removeBackground = (file: File): Promise<Blob> => {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.crossOrigin = "anonymous";
      img.onload = () => {
        try {
          const canvas = document.createElement("canvas");
          canvas.width = img.width;
          canvas.height = img.height;
          const ctx = canvas.getContext("2d");
          if (!ctx) return reject(new Error("Canvas not supported"));
          ctx.drawImage(img, 0, 0);
          const imd = ctx.getImageData(0, 0, canvas.width, canvas.height);
          const data = imd.data;

          for (let i = 0; i < data.length; i += 4) {
            const r = data[i], g = data[i + 1], b = data[i + 2];
            // simple check: if pixel is near white (all channels > threshold), make transparent
            if (r >= threshold && g >= threshold && b >= threshold) {
              data[i + 3] = 0; // alpha = 0
            }
          }

          ctx.putImageData(imd, 0, 0);
          canvas.toBlob((blob) => {
            if (!blob) return reject(new Error("Failed to create blob"));
            resolve(blob);
          }, "image/png");
        } catch (err) {
          reject(err);
        }
      };
      img.onerror = () => reject(new Error("Image load failed"));
      img.src = URL.createObjectURL(file);
    });
  };

  const processAll = async () => {
    if (!items.length) return;
    setProcessing(true);
    try {
      const updated: Item[] = [];
      for (const it of items) {
        const blob = await removeBackground(it.file);
        const url = URL.createObjectURL(blob);
        updated.push({ ...it, resultUrl: url });
        await new Promise(r => setTimeout(r, 80));
      }
      setItems(updated);
    } catch (err) {
      console.error(err);
      alert("Background removal failed for one or more images.");
    } finally {
      setProcessing(false);
    }
  };

  const downloadAll = () => {
    for (const it of items) {
      if (!it.resultUrl) continue;
      const a = document.createElement("a");
      a.href = it.resultUrl;
      a.download = `${it.file.name.replace(/\.[^/.]+$/, "")}-transparent.png`;
      document.body.appendChild(a);
      a.click();
      a.remove();
    }
  };

  return (
    <div>
      <div {...getRootProps()} style={{ padding: 14, border: "2px dashed #e6eef8", borderRadius: 8, cursor: "pointer", background: isDragActive ? "#f4fbff" : "#fff" }}>
        <input {...getInputProps()} />
        <p style={{ margin: 0, color: "#333" }}>{isDragActive ? "Drop images here..." : "Drag & drop images, or click to select"}</p>
        <small style={{ color: "#666" }}>Best for images with plain/white backgrounds. Output: PNG with transparency.</small>
      </div>

      {items.length > 0 && (
        <>
          <div style={{ marginTop: 12, display: "flex", gap: 8, alignItems: "center", flexWrap: "wrap" }}>
            <label style={{ display: "flex", gap: 8, alignItems: "center" }}>
              Sensitivity
              <input type="range" min={200} max={255} value={threshold} onChange={(e) => setThreshold(Number(e.target.value))} />
              <span className="small">{threshold}</span>
            </label>

            <button onClick={processAll} disabled={processing} className="btn" style={{ opacity: processing ? 0.6 : 1 }}>
              {processing ? "Removing..." : "Remove Background"}
            </button>

            <button onClick={downloadAll} disabled={items.every(i => !i.resultUrl)} className="btn" style={{ background: "#22c55e" }}>
              Download All
            </button>

            <button onClick={() => { revokeAll(); setItems([]); }} style={{ background: "#fff", border: "1px solid #e6eef8", padding: "8px 12px", borderRadius: 8 }}>
              Reset
            </button>
          </div>

          <ul style={{ marginTop: 12, padding: 0, listStyle: "none" }}>
            {items.map(it => (
              <li key={it.id} style={{ display: "flex", gap: 12, alignItems: "center", marginBottom: 12 }}>
                <img src={it.resultUrl || it.url} alt={it.file.name} width={120} style={{ objectFit: "cover", borderRadius: 6, background: "#fff" }} />
                <div style={{ flex: 1 }}>
                  <div style={{ fontWeight: 600 }}>{it.file.name}</div>
                  <div className="small">{it.file.type} {Math.round(it.file.size / 1024)} KB</div>
                </div>
                <div style={{ display: "flex", gap: 8 }}>
                  {it.resultUrl && <a href={it.resultUrl} download={`${it.file.name.replace(/\.[^/.]+$/, "")}-transparent.png`} className="btn" style={{ background: "#22c55e" }}>Download</a>}
                  <button onClick={() => remove(it.id)} style={{ background: "#fff", border: "1px solid #eee", padding: "8px 10px", borderRadius: 8 }}>Remove</button>
                </div>
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
}
