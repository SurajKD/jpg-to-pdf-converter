"use client";

import React, { useCallback, useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";
import {
  compressLossless,
  compressBalanced,
  compressMax,
  CompressionError,
  type CompressionResult,
  type ProgressEvent,
} from "@quicktoolsone/pdf-compress";

type Preset = "lossless" | "balanced" | "max";

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
  const [preset, setPreset] = useState<Preset>("balanced");
  const [progress, setProgress] = useState(0);
  const [progressMsg, setProgressMsg] = useState("");

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
      setProgress(0);
      setProgressMsg("");
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
    setProgress(0);
    setProgressMsg("");
    setState({ status: "idle" });
  };

  const handleCompress = async () => {
    if (state.status !== "ready" && state.status !== "done") return;

    const file = state.file;
    setState({ status: "compressing", file });
    setAnimating(false);
    setProgress(0);
    setProgressMsg("Starting compression...");

    const buffer = await file.arrayBuffer();

    const onProgress = (event: ProgressEvent) => {
      setProgress(event.progress ?? 0);
      if (event.message) setProgressMsg(event.message);
      else setProgressMsg(event.phase);
    };

    let result: CompressionResult | null = null;

    try {
      // Try the selected preset
      if (preset === "lossless") {
        result = await compressLossless(buffer, { onProgress });
      } else if (preset === "balanced") {
        result = await compressBalanced(buffer, { onProgress });
      } else {
        result = await compressMax(buffer, { onProgress });
      }
    } catch (err) {
      console.error("[Compress] Error with preset", preset, err);

      // If lossless fails, just bail out
      if (preset === "lossless") {
        const msg =
          err instanceof Error ? err.message : "Compression failed (lossless).";
        alert(msg);
        setProgress(0);
        setProgressMsg("");
        setState({ status: "ready", file: state.file });
        return;
      }

      // For balanced/max: try fallback lossless if it's a compression error
      if (err instanceof CompressionError) {
        console.warn(
          "[Compress] Balanced/Max failed, falling back to lossless. Phase:",
          err.phase
        );
        try {
          setProgressMsg("Falling back to lossless compression...");
          result = await compressLossless(buffer, { onProgress });
        } catch (fallbackErr) {
          console.error("[Compress] Lossless fallback also failed", fallbackErr);
          const msg =
            fallbackErr instanceof Error
              ? fallbackErr.message
              : "Compression failed.";
          alert(msg);
          setProgress(0);
          setProgressMsg("");
          setState({ status: "ready", file: state.file });
          return;
        }
      } else {
        const msg =
          err instanceof Error
            ? err.message
            : "Compression failed. Please try another file.";
        alert(msg);
        setProgress(0);
        setProgressMsg("");
        setState({ status: "ready", file: state.file });
        return;
      }
    }

    if (!result) {
      alert("Compression failed without a result.");
      setProgress(0);
      setProgressMsg("");
      setState({ status: "ready", file: state.file });
      return;
    }

    const { originalSize, compressedSize, percentageSaved } = result.stats;

    const blob = new Blob([result.pdf], { type: "application/pdf" });
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
  };

  useEffect(() => {
    return () => {
      if (state.status === "done") {
        URL.revokeObjectURL(state.downloadUrl);
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const originalKB =
    state.status === "ready" ||
    state.status === "compressing" ||
    state.status === "done"
      ? (state.file.size / 1024).toFixed(1)
      : null;

  const compressedKB =
    state.status === "done"
      ? (state.compressedSize / 1024).toFixed(1)
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
          100% client-side compression in your browser. Large PDFs may take longer.
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
            Original size: <strong>{originalKB} KB</strong>
          </div>

          {state.status === "done" && (
            <div style={{ fontSize: 13, color: "#0b74de", marginTop: 4 }}>
              Compressed size: <strong>{compressedKB} KB</strong>{" "}
              {savedPercent !== null && <>({savedPercent}% smaller)</>}
            </div>
          )}
        </div>
      )}

      {/* Preset selector */}
      {(state.status === "ready" || state.status === "idle") && (
        <div style={{ marginTop: 16 }}>
          <label
            htmlFor="preset-select"
            style={{
              display: "block",
              marginBottom: 8,
              fontSize: 14,
              fontWeight: 600,
              color: "#333",
            }}
          >
            Compression level:
          </label>
          <select
            id="preset-select"
            value={preset}
            onChange={(e) => setPreset(e.target.value as Preset)}
            style={{
              padding: "8px 12px",
              borderRadius: 6,
              border: "1px solid #e2e8f0",
              fontSize: 14,
              cursor: "pointer",
              background: "#fff",
            }}
          >
            <option value="lossless">Lossless (no quality loss)</option>
            <option value="balanced">Balanced (recommended)</option>
            <option value="max">Max compression (smallest file)</option>
          </select>
        </div>
      )}

      {/* Progress */}
      {state.status === "compressing" && (
        <div style={{ marginTop: 12 }}>
          <div
            style={{
              height: 6,
              borderRadius: 999,
              background: "#e5e7eb",
              overflow: "hidden",
              maxWidth: 260,
            }}
          >
            <div
              style={{
                height: "100%",
                width: `${progress}%`,
                borderRadius: 999,
                background: "#0b74de",
                transition: "width 0.2s linear",
              }}
            />
          </div>
          <div
            style={{
              marginTop: 6,
              fontSize: 12,
              color: "#555",
            }}
          >
            {progress.toFixed(0)}% — {progressMsg}
          </div>
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
