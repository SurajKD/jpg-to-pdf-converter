'use client'

import React, { JSX, useCallback, useMemo, useState } from "react";
import { useDropzone } from "react-dropzone";
import { PDFDocument } from "pdf-lib";

/**
 * MergePdfClient.tsx
 *
 * - Drag & drop or select multiple PDFs
 * - Reorder files (move up / move down)
 * - Merge client-side using pdf-lib and trigger download
 * - Small safety limits and friendly UI similar to PdfToWordClient
 */

type FileItem = { id: string; file: File };

const uid = () => Math.random().toString(36).slice(2, 9);

export default function MergePdfClient(): JSX.Element {
  const [files, setFiles] = useState<FileItem[]>([]);
  const [processing, setProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [info, setInfo] = useState<string | null>(null);
  const [showHelp, setShowHelp] = useState(false);

  const MAX_TOTAL_BYTES = 200 * 1024 * 1024; // 200MB total (safe client-side)
  const MAX_FILES = 50;

  const onDrop = useCallback((accepted: File[]) => {
    setError(null);
    setInfo(null);
    if (!accepted || !accepted.length) return;

    // filter PDFs
    const pdfs = accepted.filter(
      (f) => f.type === "application/pdf" || /\.pdf$/i.test(f.name)
    );

    if (pdfs.length === 0) {
      setError("No PDF files found. Please add files with .pdf extension.");
      return;
    }

    // create items
    const newItems = pdfs.map((f) => ({ id: uid(), file: f }));

    // safety checks
    const totalFiles = files.length + newItems.length;
    if (totalFiles > MAX_FILES) {
      setError(`Too many files. Limit is ${MAX_FILES} files in total.`);
      return;
    }

    const totalBytes =
      files.reduce((s, it) => s + it.file.size, 0) +
      newItems.reduce((s, it) => s + it.file.size, 0);

    if (totalBytes > MAX_TOTAL_BYTES) {
      setError("Total selected files exceed safe client-side memory limit (~200MB). Remove some files or merge on the server.");
      return;
    }

    setFiles((prev) => [...prev, ...newItems]);
  }, [files]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    multiple: true,
    accept: { "application/pdf": [] },
  });

  function removeFile(id: string) {
    setFiles((s) => s.filter((f) => f.id !== id));
  }

  function moveFile(index: number, dir: -1 | 1) {
    setFiles((prev) => {
      const copy = [...prev];
      const to = index + dir;
      if (to < 0 || to >= copy.length) return prev;
      const [item] = copy.splice(index, 1);
      copy.splice(to, 0, item);
      return copy;
    });
  }

  function reset() {
    setFiles([]);
    setError(null);
    setInfo(null);
    setProcessing(false);
  }

  async function mergeAndDownload() {
    setError(null);
    setInfo(null);

    if (files.length === 0) {
      setError("Add at least one PDF to merge.");
      return;
    }

    // quick confirmation for large sets
    if (files.length > 10) {
      const ok = confirm(`You're merging ${files.length} files. This may use significant memory in the browser. Continue?`);
      if (!ok) return;
    }

    setProcessing(true);
    try {
      // create merged document
      const mergedPdf = await PDFDocument.create();

      // iterate in order
      for (let i = 0; i < files.length; i++) {
        const item = files[i];
        setInfo(`Loading ${i + 1} / ${files.length} — ${item.file.name}`);
        const arr = await item.file.arrayBuffer();
        const pdf = await PDFDocument.load(arr);
        const indices = pdf.getPageIndices();
        const copied = await mergedPdf.copyPages(pdf, indices);
        copied.forEach((p) => mergedPdf.addPage(p));
      }

      setInfo("Finalizing merged PDF...");
      const mergedBytes = await mergedPdf.save();
      //@ts-ignore
      const blob = new Blob([mergedBytes], { type: "application/pdf" });
      const url = URL.createObjectURL(blob);

      const safeName = `merged-${Date.now()}.pdf`;
      const a = document.createElement("a");
      a.href = url;
      a.download = safeName;
      document.body.appendChild(a);
      a.click();
      a.remove();
      URL.revokeObjectURL(url);

      setInfo(`Merged ${files.length} file(s) — downloaded as ${safeName}`);
    } catch (err) {
      console.error(err);
      setError("Failed to merge PDFs. See console for details.");
    } finally {
      setProcessing(false);
      // clear transient info after a while
      setTimeout(() => setInfo(null), 6000);
    }
  }

  const totalSize = useMemo(() => {
    return files.reduce((s, it) => s + it.file.size, 0);
  }, [files]);

  return (
    <div style={{ maxWidth: 820 }}>
      <div
        {...getRootProps()}
        aria-label="PDF merge dropzone"
        style={{
          padding: 14,
          border: "2px dashed #e6eef8",
          borderRadius: 8,
          cursor: "pointer",
          background: isDragActive ? "#f4fbff" : "#fff",
        }}
      >
        <input {...getInputProps()} aria-hidden />
        <p style={{ margin: 0, color: "#333", fontWeight: 600 }}>
          {isDragActive ? "Drop PDFs here..." : "Drag & drop PDF files here, or click to select"}
        </p>
        <small style={{ color: "#666" }}>
          Reorder files before merging. Merging happens in your browser — no upload required.
        </small>
      </div>

      {error && (
        <div role="alert" style={{ marginTop: 12, padding: 10, borderRadius: 8, background: "#fff5f5", border: "1px solid #ffd6d6", color: "#7a1a1a" }}>
          {error}
        </div>
      )}

      {files.length > 0 && (
        <div style={{ marginTop: 12, padding: 12, borderRadius: 8, background: "#f9fbff", border: "1px solid #e2e8f0" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 12 }}>
            <div>
              <div style={{ fontWeight: 700 }}>{files.length} file(s) selected</div>
              <div style={{ color: "#475569", fontSize: 13 }}>{formatBytes(totalSize)} total</div>
            </div>

            <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
              <button
                onClick={mergeAndDownload}
                disabled={processing}
                style={{
                  padding: "8px 14px",
                  borderRadius: 8,
                  border: "none",
                  background: processing ? "#9bbbe9" : "#2563eb",
                  color: "#fff",
                  cursor: processing ? "default" : "pointer",
                }}
                aria-disabled={processing}
              >
                {processing ? "Merging..." : "Merge & Download"}
              </button>

              <button
                onClick={() => {
                  setShowHelp((s) => !s);
                }}
                style={{ background: "#fff", border: "1px solid #e6eef8", padding: "8px 12px", borderRadius: 8, cursor: "pointer" }}
              >
                {showHelp ? "Hide" : "Help"}
              </button>

              <button onClick={reset} disabled={processing} style={{ background: "#fff", border: "1px solid #e6eef8", padding: "8px 12px", borderRadius: 8, cursor: processing ? "not-allowed" : "pointer" }}>
                Reset
              </button>
            </div>
          </div>

          {showHelp && (
            <div style={{ marginTop: 10, color: "#475569", fontSize: 13 }}>
              <strong>Tip:</strong> Use the ↑ / ↓ buttons to reorder files. The top file will appear first in the merged PDF.
            </div>
          )}

          <div style={{ marginTop: 12 }}>
            <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "grid", gap: 8 }}>
              {files.map((f, idx) => (
                <li key={f.id} style={{ display: "flex", alignItems: "center", gap: 12, padding: 8, borderRadius: 8, background: "#fff", border: "1px solid #eef2ff" }}>
                  <div style={{ flex: "1 1 0", minWidth: 0 }}>
                    <div style={{ fontWeight: 700, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{f.file.name}</div>
                    <div style={{ color: "#64748b", fontSize: 13 }}>{formatBytes(f.file.size)}</div>
                  </div>

                  <div style={{ display: "flex", gap: 6 }}>
                    <button onClick={() => moveFile(idx, -1)} disabled={idx === 0 || processing} title="Move up"
                      style={{ padding: "6px 8px", borderRadius: 6, border: "1px solid #e6eef8", background: "#fff", cursor: idx === 0 || processing ? "not-allowed" : "pointer" }}>
                      ↑
                    </button>
                    <button onClick={() => moveFile(idx, 1)} disabled={idx === files.length - 1 || processing} title="Move down"
                      style={{ padding: "6px 8px", borderRadius: 6, border: "1px solid #e6eef8", background: "#fff", cursor: idx === files.length - 1 || processing ? "not-allowed" : "pointer" }}>
                      ↓
                    </button>
                    <button onClick={() => removeFile(f.id)} disabled={processing} title="Remove"
                      style={{ padding: "6px 8px", borderRadius: 6, border: "1px solid #fee2e2", background: "#fff", color: "#dc2626", cursor: processing ? "not-allowed" : "pointer" }}>
                      ✕
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}

      {info && (
        <div style={{ marginTop: 12, padding: 10, borderRadius: 8, background: "#f0f9ff", border: "1px solid #dbeafe", color: "#083344" }}>
          {info}
        </div>
      )}

      <div style={{ marginTop: 12, color: "#475569", fontSize: 13 }}>
        <strong>Note:</strong> Merging happens in your browser. For extremely large files or many pages, prefer a server-side merge to avoid running out of memory.
      </div>
    </div>
  );
}

/* ---------------- Utilities ---------------- */

function formatBytes(bytes: number) {
  if (bytes < 1024) return `${bytes} B`;
  const units = ["KB", "MB", "GB"];
  let i = -1;
  let n = bytes;
  do {
    n = n / 1024;
    i++;
  } while (n >= 1024 && i < units.length - 1);
  return `${n.toFixed(1)} ${units[i]}`;
}
