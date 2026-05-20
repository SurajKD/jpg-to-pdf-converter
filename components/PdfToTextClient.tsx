"use client"

import React, { useCallback, useEffect, useState } from "react"
import { useDropzone } from "react-dropzone"

type State =
  | { status: "idle" }
  | { status: "ready"; file: File }
  | { status: "extracting"; file: File }
  | { status: "done"; file: File; text: string; downloadUrl: string }

const PDFJS_CDN_URL = "https://cdnjs.cloudflare.com/ajax/libs/pdf.js/2.6.347/pdf.min.js"
const PDFJS_WORKER_CDN = "https://cdnjs.cloudflare.com/ajax/libs/pdf.js/2.6.347/pdf.worker.min.js"

async function ensurePdfJsLoaded(): Promise<any> {
  if ((window as any).pdfjsLib) return (window as any).pdfjsLib

  await new Promise<void>((resolve, reject) => {
    const existing = document.querySelector(`script[data-pdfjs-cdn="${PDFJS_CDN_URL}"]`)
    if (existing) {
      ;(existing as HTMLScriptElement).addEventListener("load", () => resolve())
      ;(existing as HTMLScriptElement).addEventListener("error", () => reject(new Error("Failed to load pdf.js from CDN")))
      return
    }

    const script = document.createElement("script")
    script.src = PDFJS_CDN_URL
    script.async = true
    script.setAttribute("data-pdfjs-cdn", PDFJS_CDN_URL)
    script.onload = () => resolve()
    script.onerror = () => reject(new Error("Failed to load pdf.js from CDN"))
    document.head.appendChild(script)
  })

  const pdfjsLib = (window as any).pdfjsLib
  if (!pdfjsLib) throw new Error("pdfjsLib not available after CDN load")

  try {
    pdfjsLib.GlobalWorkerOptions.workerSrc = PDFJS_WORKER_CDN
  } catch {
    // ignore if pdfjs version does not expose GlobalWorkerOptions
  }

  return pdfjsLib
}

async function extractTextWithPdfJs(arrayBuffer: ArrayBuffer) {
  const pdfjsLib = await ensurePdfJsLoaded()
  const loadingTask = pdfjsLib.getDocument({ data: arrayBuffer })
  const pdf = await loadingTask.promise

  const pages: string[] = []
  for (let i = 1; i <= pdf.numPages; i++) {
    const page = await pdf.getPage(i)
    const textContent = await page.getTextContent()
    const pageText = textContent.items.map((item: any) => String(item.str)).join(" ")
    pages.push(pageText.trim())
  }

  return pages.filter(Boolean).join("\n\n")
}

export default function PdfToTextClient() {
  const [state, setState] = useState<State>({ status: "idle" })
  const [downloadUrl, setDownloadUrl] = useState<string | null>(null)

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const file = acceptedFiles[0]
    if (!file) return

    if (file.type !== "application/pdf") {
      alert("Please upload a valid PDF file.")
      return
    }

    if (downloadUrl) {
      URL.revokeObjectURL(downloadUrl)
      setDownloadUrl(null)
    }

    setState({ status: "ready", file })
  }, [downloadUrl])

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    multiple: false,
    accept: { "application/pdf": [] },
  })

  const reset = () => {
    if (downloadUrl) URL.revokeObjectURL(downloadUrl)
    setDownloadUrl(null)
    setState({ status: "idle" })
  }

  const handleExtract = async () => {
    if (state.status !== "ready") return
    setState({ status: "extracting", file: state.file })

    try {
      const arrayBuffer = await state.file.arrayBuffer()
      const extractedText = await extractTextWithPdfJs(arrayBuffer)
      const sanitized = extractedText || ""
      const blob = new Blob([sanitized], { type: "text/plain;charset=utf-8" })
      const url = URL.createObjectURL(blob)
      setDownloadUrl(url)
      setState({ status: "done", file: state.file, text: sanitized, downloadUrl: url })
    } catch (error) {
      console.error(error)
      alert("Failed to extract text from the PDF. Please try a different file.")
      setState({ status: "ready", file: state.file })
    }
  }

  useEffect(() => {
    return () => {
      if (downloadUrl) URL.revokeObjectURL(downloadUrl)
    }
  }, [downloadUrl])

  return (
    <div>
      <div
        {...getRootProps()}
        style={{
          padding: 16,
          border: "2px dashed var(--border)",
          borderRadius: 8,
          cursor: "pointer",
          background: isDragActive ? "rgba(59,130,246,0.12)" : "var(--surface)",
        }}
      >
        <input {...getInputProps()} />
        <p style={{ margin: 0, color: "var(--text)", fontWeight: 500 }}>
          {isDragActive
            ? "Drop your PDF here..."
            : "Drag & drop a PDF here, or click to select"}
        </p>
        <small style={{ color: "var(--muted)" }}>
          Extract plain text from PDF pages using browser-based PDF.js.
        </small>
      </div>

      {state.status !== "idle" && state.status !== "extracting" && (
        <div
          style={{
            marginTop: 16,
            padding: 12,
            borderRadius: 8,
            background: "var(--surface)",
            border: "1px solid var(--border)",
          }}
        >
          <div style={{ fontWeight: 600 }}>{state.file.name}</div>
          <div style={{ fontSize: 13, color: "var(--muted)" }}>
            File size: {(state.file.size / 1024).toFixed(1)} KB
          </div>
        </div>
      )}

      <div
        style={{
          marginTop: 16,
          display: "flex",
          flexDirection: "column",
          gap: 12,
          alignItems: "stretch",
        }}
      >
        {state.status === "ready" && (
          <button
            onClick={handleExtract}
            style={{
              background: "#0b74de",
              color: "#fff",
              padding: "10px 16px",
              borderRadius: 8,
              border: "none",
              cursor: "pointer",
              fontWeight: 600,
            }}
          >
            Extract Text
          </button>
        )}

        {state.status === "extracting" && (
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <div
              role="status"
              style={{
                width: 32,
                height: 32,
                borderRadius: "50%",
                border: "4px solid rgba(0,0,0,0.08)",
                borderTopColor: "#0b74de",
                animation: "spin 1s linear infinite",
              }}
            />
            <span style={{ color: "var(--text)", fontWeight: 600 }}>
              Extracting text...
            </span>
            <style>{`
              @keyframes spin {
                to { transform: rotate(360deg); }
              }
            `}</style>
          </div>
        )}

        {state.status === "done" && (
          <>
            <a
              href={state.downloadUrl}
              download={`${state.file.name.replace(/\.pdf$/i, "")}.txt`}
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
              ⬇️ Download Text File
            </a>
            <button
              onClick={reset}
              style={{
                background: "var(--surface)",
                color: "var(--text)",
                padding: "11px 18px",
                borderRadius: 10,
                border: "1px solid var(--border)",
                fontWeight: 600,
                cursor: "pointer",
              }}
            >
              Reset
            </button>
          </>
        )}
      </div>

      {state.status === "done" && (
        <div
          style={{
            marginTop: 18,
            padding: 14,
            borderRadius: 10,
            background: "var(--surface)",
            border: "1px solid var(--border)",
            whiteSpace: "pre-wrap",
            fontSize: 13,
            lineHeight: 1.6,
            color: "var(--text)",
            maxHeight: 280,
            overflowY: "auto",
          }}
        >
          {state.text || "No text found in this PDF."}
        </div>
      )}
    </div>
  )
}
