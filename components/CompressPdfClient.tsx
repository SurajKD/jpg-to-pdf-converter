"use client";

import React, { useCallback, useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";
import {
  compressPdf,
  formatBytes,
  getSavedPercent,
} from "../lib/pdfCompress";

type State =
  | { status: "idle" }
  | { status: "ready"; file: File }
  | { status: "compressing"; file: File }
  | {
      status: "done";
      file: File;
      compressedBlob: Blob;
      downloadUrl: string;
      originalSize: number;
      compressedSize: number;
      percentageSaved: number;
    };

export default function CompressPdfClient() {
  const [state, setState] = useState<State>({ status: "idle" });
  const [animating, setAnimating] = useState(false);

  const onDrop = useCallback(
    (accepted: File[]) => {
      const pdf = accepted[0];
      if (!pdf) return;

      if (pdf.type !== "application/pdf") {
        alert("Please upload a PDF file.");
        return;
      }

      // Clean any previous URL
      if (state.status === "done") {
        URL.revokeObjectURL(state.downloadUrl);
      }

      setAnimating(false);
      setState({ status: "ready", file: pdf });
    },
    [state]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    multiple: false,
    accept: { "application/pdf": [] },
  });

  const reset = () => {
    if (state.status === "done") {
      URL.revokeObjectURL(state.downloadUrl);
    }
    setAnimating(false);
    setState({ status: "idle" });
  };

  const handleCompress = async () => {
    if (state.status !== "ready" && state.status !== "done") return;

    const file = state.file;
    setState({ status: "compressing", file });
    setAnimating(false);

    try {
      const originalSize = file.size;

      // pdf-lib based lightweight optimization
      const blob = await compressPdf(file, { useObjectStreams: true });
      const compressedSize = blob.size;

      const percentageSaved = getSavedPercent(originalSize, compressedSize);
      const url = URL.createObjectURL(blob);

      setAnimating(true);
      setTimeout(() => {
        setAnimating(false);
        setState({
          status: "done",
          file,
          compressedBlob: blob,
          downloadUrl: url,
          originalSize,
          compressedSize,
          percentageSaved,
        });
      }, 2000);
    } catch (err) {
      console.error(err);
      alert("Compression failed. Please try another file or refresh the page.");
      setState({ status: "ready", file: state.file });
    }
  };

  useEffect(() => {
    return () => {
      if (state.status === "done") {
        URL.revokeObjectURL(state.downloadUrl);
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const originalLabel =
    state.status === "ready" ||
    state.status === "compressing" ||
    state.status === "done"
      ? formatBytes(state.file.size)
      : null;

  const compressedLabel =
    state.status === "done"
      ? formatBytes(state.compressedSize)
      : null;

  const savedPercent =
    state.status === "done"
      ? state.percentageSaved.toFixed(1)
      : null;

  return (
    <div>
      {/* Dropzone */}
      <div
        {...getRootProps()}
        style={{
          padding: 16,
          border: "2px dashed #e6eef8",
          borderRadius: 8,
          cursor: "pointer",
          background: isDragActive ? "#f4fbff" : "#fff",
        }}
      >
        <input {...getInputProps()} />
        <p style={{ margin: 0, color: "#333", fontWeight: 500 }}>
          {isDragActive
            ? "Drop your PDF here..."
            : "Drag & drop a PDF here, or click to select"}
        </p>
        <small style={{ color: "#666" }}>
          Lightweight optimization using pdf-lib. Best for cleaning up existing PDFs.
        </small>
      </div>

      {/* File info */}
      {(state.status === "ready" ||
        state.status === "compressing" ||
        state.status === "done") && (
        <div
          style={{
            marginTop: 16,
            padding: 12,
            borderRadius: 8,
            background: "#f9fbff",
            border: "1px solid #e2e8f0",
          }}
        >
          <div style={{ fontWeight: 600 }}>{state.file.name}</div>
          <div style={{ fontSize: 13, color: "#555" }}>
            Original size: <strong>{originalLabel}</strong>
          </div>

          {state.status === "done" && (
            <div style={{ fontSize: 13, color: "#0b74de", marginTop: 4 }}>
              Compressed size: <strong>{compressedLabel}</strong>{" "}
              {savedPercent !== null && <>({savedPercent}% smaller)</>}
            </div>
          )}
        </div>
      )}

      {/* Actions */}
      <div
        style={{
          marginTop: 16,
          display: "flex",
          gap: 12,
          flexWrap: "wrap",
          alignItems: "center",
        }}
      >
        {/* Compress button */}
        {state.status !== "done" && !animating && (
          <button
            onClick={handleCompress}
            disabled={state.status !== "ready"}
            style={{
              background: "#0b74de",
              color: "#fff",
              padding: "10px 16px",
              borderRadius: 8,
              border: "none",
              cursor:
                state.status === "ready" ? "pointer" : "not-allowed",
              opacity: state.status === "ready" ? 1 : 0.6,
            }}
          >
            {state.status === "compressing"
              ? "Compressing..."
              : "Compress PDF"}
          </button>
        )}

        {/* Finalizing animation */}
        {animating && (
          <div
            aria-live="polite"
            style={{ display: "flex", alignItems: "center", gap: 10 }}
          >
            <div
              role="status"
              style={{
                width: 32,
                height: 32,
                borderRadius: "50%",
                border: "4px solid rgba(0,0,0,0.06)",
                borderTopColor: "#0b74de",
                animation: "spin 1s linear infinite",
              }}
            />
            <span style={{ color: "#333", fontWeight: 600 }}>
              Finalizing compressed PDF...
            </span>

            <style>{`
              @keyframes spin {
                to { transform: rotate(360deg); }
              }
            `}</style>
          </div>
        )}

        {/* Download + Reset */}
        {state.status === "done" && !animating && (
          <>
            <a
              href={state.downloadUrl}
              download={`compressed-${state.file.name.replace(
                /\.pdf$/i,
                ""
              )}.pdf`}
              style={{
                display: "inline-block",
                background: "#22c55e",
                color: "#fff",
                padding: "11px 18px",
                borderRadius: 10,
                textDecoration: "none",
                fontWeight: 700,
              }}
            >
              ⬇️ Download Compressed PDF
            </a>
            <button
              onClick={reset}
              style={{
                background: "#fff",
                color: "#333",
                padding: "10px 14px",
                borderRadius: 8,
                border: "1px solid #e2e8f0",
                cursor: "pointer",
              }}
            >
              Reset
            </button>
          </>
        )}
      </div>

      {/* Hint when nothing selected */}
      {state.status === "idle" && (
        <div style={{ marginTop: 8, fontSize: 13, color: "#666" }}>
          Select a PDF to enable compression.
        </div>
      )}
    </div>
  );
}
