// components/AiPdfSummarizerClient.tsx
'use client'

import React, { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";

/**
 * Lightweight extractive summarizer:
 * - If the PDF is text-based, we attempt a naive text extraction (similar to PdfToWordClient).
 * - Then run a simple sentence-scoring summary (TF-like scoring based on word frequency).
 *
 * This is NOT an LLM. It gives quick highlights locally without sending data to a server.
 * For better results, integrate an LLM API (server-side) and call it optionally.
 */

function splitIntoSentences(text: string) {
  // Very naive sentence splitter
  return text.match(/[^.!?]+[.!?]?/g) || [text];
}

function scoreSentences(sentences: string[], keywords?: string[]) {
  // Build word frequency
  const freq: Record<string, number> = {};
  const stop = new Set(["the","and","is","in","it","of","to","a","for","on","with","that","as","this","are","be"]);
  for (const s of sentences) {
    const words = s.toLowerCase().replace(/[^\w\s]/g, "").split(/\s+/).filter(Boolean);
    for (const w of words) {
      if (stop.has(w)) continue;
      freq[w] = (freq[w] || 0) + 1;
    }
  }
  // Score sentences
  return sentences.map(s => {
    const words = s.toLowerCase().replace(/[^\w\s]/g, "").split(/\s+/).filter(Boolean);
    let score = 0;
    for (const w of words) if (freq[w]) score += freq[w];
    // prefer longer but not too long
    score *= Math.min(1.8, 1 + Math.log(Math.max(1, words.length)) / 4);
    // small boost for presence of keywords
    if (keywords && keywords.length) {
      for (const k of keywords) if (s.toLowerCase().includes(k.toLowerCase())) score *= 1.2;
    }
    return { s, score };
  });
}

export default function AiPdfSummarizerClient() {
  const [file, setFile] = useState<File | null>(null);
  const [processing, setProcessing] = useState(false);
  const [summary, setSummary] = useState<string | null>(null);
  const [rawText, setRawText] = useState<string | null>(null);
  const [numSentences, setNumSentences] = useState<number>(5);

  const onDrop = useCallback((accepted: File[]) => {
    const p = accepted[0];
    if (!p) return;
    if (p.type !== "application/pdf") {
      alert("Please upload a PDF file.");
      return;
    }
    setFile(p);
    setSummary(null);
    setRawText(null);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    multiple: false,
    accept: { "application/pdf": [] },
  });

  const extractTextNaive = async (arrayBuffer: ArrayBuffer) => {
    const decoder = new TextDecoder("utf-8");
    const raw = decoder.decode(arrayBuffer);
    // Attempt the same heuristics as PdfToWord
    const parenMatches = Array.from(raw.matchAll(/\(([^()]{2,400})\)/g)).map(m => m[1]);
    const btMatches = Array.from(raw.matchAll(/BT([\s\S]{0,800})ET/g)).map(m => m[1]);
    let combined = parenMatches.concat(btMatches).join("\n\n");
    combined = combined.replace(/\\n/g, " ").replace(/\s{2,}/g, " ").trim();
    if (combined.length < 200) {
      const asciiRuns = Array.from(raw.matchAll(/[ -~]{30,}/g)).map(m => m[0]);
      combined = asciiRuns.join("\n\n");
    }
    return combined;
  };

  const handleSummarize = async () => {
    if (!file) return;
    setProcessing(true);
    setSummary(null);
    try {
      const ab = await file.arrayBuffer();
      const text = await extractTextNaive(ab);
      if (!text || text.length < 80) {
        alert("This PDF may be scanned or complex. This local summarizer requires selectable text. Consider using OCR or a server-based summarizer.");
        setProcessing(false);
        return;
      }
      setRawText(text);
      const sentences = splitIntoSentences(text);
      const scored = scoreSentences(sentences);
      // Pick top sentences
      const top = scored.sort((a, b) => b.score - a.score).slice(0, Math.max(3, Math.min(numSentences, sentences.length)));
      // Preserve original order
      top.sort((a, b) => sentences.indexOf(a.s) - sentences.indexOf(b.s));
      const out = top.map(t => t.s.trim()).join(" ");
      setSummary(out);
    } catch (err) {
      console.error(err);
      alert("Summarization failed.");
    } finally {
      setProcessing(false);
    }
  };

  const reset = () => {
    setFile(null);
    setSummary(null);
    setRawText(null);
  };

  return (
    <div>
      <div {...getRootProps()} style={{ padding: 14, border: "2px dashed #e6eef8", borderRadius: 8, cursor: "pointer", background: isDragActive ? "#f4fbff" : "#fff" }}>
        <input {...getInputProps()} />
        <p style={{ margin: 0, color: "#333" }}>{isDragActive ? "Drop PDF here..." : "Drag & drop a PDF here, or click to select"}</p>
        <small style={{ color: "#666" }}>Local extractive summarizer (works best with selectable/text PDFs).</small>
      </div>

      {file && (
        <div style={{ marginTop: 12, padding: 12, borderRadius: 8, background: "#f9fbff", border: "1px solid #e2e8f0" }}>
          <div style={{ fontWeight: 600 }}>{file.name}</div>
          <div className="small">{(file.size / 1024).toFixed(1)} KB</div>

          <div style={{ marginTop: 8, display: "flex", gap: 8, alignItems: "center" }}>
            <label style={{ display: "flex", gap: 8, alignItems: "center" }}>
              Sentences
              <input type="number" min={1} max={15} value={numSentences} onChange={(e) => setNumSentences(Number(e.target.value))} style={{ width: 72, padding: "6px 8px", borderRadius: 6 }} />
            </label>

            <button onClick={handleSummarize} disabled={processing} className="btn">{processing ? "Summarizing..." : "Summarize"}</button>
            <button onClick={reset} style={{ background: "#fff", border: "1px solid #e6eef8", padding: "8px 12px", borderRadius: 8 }}>Reset</button>
          </div>
        </div>
      )}

      {summary && (
        <div style={{ marginTop: 12 }}>
          <h4>Summary</h4>
          <div style={{ background: "#fff", border: "1px solid #efefef", padding: 12 }}>{summary}</div>
          <div style={{ marginTop: 8 }}>
            <button onClick={() => { navigator.clipboard?.writeText(summary); }} className="btn">Copy Summary</button>
          </div>
        </div>
      )}

      {rawText && (
        <div style={{ marginTop: 12 }}>
          <h4>Raw extracted text (preview)</h4>
          <pre style={{ whiteSpace: "pre-wrap", background: "#fff", border: "1px solid #efefef", padding: 12, maxHeight: 240, overflow: "auto" }}>{rawText.slice(0, 3000)}</pre>
        </div>
      )}
    </div>
  );
}
