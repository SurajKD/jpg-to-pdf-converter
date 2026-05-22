"use client";

import { useState } from "react";
import { useDropzone } from "react-dropzone";

export default function AiPdfSummarizerClient() {
  const [file, setFile] = useState<File | null>(null);
  const [summary, setSummary] = useState("");
  const [loading, setLoading] = useState(false);
  const [sentences, setSentences] = useState(3);

  const onDrop = (acceptedFiles: File[]) => {
    if (acceptedFiles.length > 0) {
      setFile(acceptedFiles[0]);
      setSummary("");
    }
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { "application/pdf": [".pdf"] },
    multiple: false,
  });

  async function handleSummarize() {
    if (!file) return;
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("sentences", String(sentences));

      const response = await fetch("/api/summarize-pdf", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        setSummary(data.error || "Could not summarize PDF.");
        return;
      }

      setSummary(data.summary);
    } catch (error) {
      console.error(error);
      setSummary("Failed to summarize PDF.");
    } finally {
      setLoading(false);
    }
  }

  const resetAll = () => {
    setFile(null);
    setSummary("");
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>

      {/* Dropzone */}
      {!file && (
        <div
          {...getRootProps()}
          className="dropzone"
          style={{
            borderRadius: 16,
            padding: 40,
            textAlign: "center",
            cursor: "pointer",
            transition: "background 0.2s",
            background: isDragActive ? "rgba(11,116,222,0.08)" : "var(--surface)",
          }}
        >
          <input {...getInputProps()} />
          <p style={{ fontSize: 18, marginBottom: 8, color: "var(--text)" }}>
            Drag & drop a PDF here, or click to select
          </p>
          <p style={{ color: "var(--muted)", fontSize: 14, marginBottom: 0 }}>
            Works best with selectable/text PDFs.
          </p>
        </div>
      )}

      {/* File info + controls */}
      {file && (
        <div
          className="card"
          style={{ borderRadius: 16, padding: 20 }}
        >
          <h3 style={{ marginBottom: 4 }}>{file.name}</h3>
          <p className="small" style={{ marginBottom: 20 }}>
            {(file.size / 1024).toFixed(1)} KB
          </p>

          <div className="action-row" style={{ alignItems: "center", flexWrap: "wrap" }}>
            <label style={{ color: "var(--text)", fontSize: "0.95rem" }}>
              Sentences
            </label>
            <input
              type="number"
              min={1}
              max={20}
              value={sentences}
              onChange={(e) => setSentences(Number(e.target.value))}
              style={{ width: 70 }}
            />
            <button
              onClick={handleSummarize}
              disabled={loading}
              className="btn"
            >
              {loading ? "Summarizing..." : "Summarize"}
            </button>
            <button
              onClick={resetAll}
              style={{
                padding: "0.5rem 0.9rem",
                borderRadius: "0.5rem",
                border: "1px solid var(--border)",
                background: "transparent",
                color: "var(--text)",
                fontSize: "0.95rem",
                cursor: "pointer",
              }}
            >
              Reset
            </button>
          </div>
        </div>
      )}

      {/* Summary output */}
      {summary && (
        <div>
          <h2 style={{ marginBottom: 12 }}>Summary</h2>
          <div
            className="panel"
            style={{
              borderRadius: 12,
              padding: 20,
              lineHeight: 1.8,
              whiteSpace: "pre-wrap",
              color: "var(--text)",
            }}
          >
            {summary}
          </div>
        </div>
      )}

    </div>
  );
}