// components/PdfToWordClient.tsx
'use client'

import React, { JSX, useCallback, useMemo, useState } from "react";
import { useDropzone } from "react-dropzone";

/**
 * PdfToWordClient.tsx
 *
 * Modes:
 * - Text docx (default): extract text via PDF.js getTextContent() -> docx (editable text)
 * - Preserve layout (images): render page images and embed into docx (visual fidelity)
 * - OCR: optionally run OCR (Tesseract) on page images to extract editable text
 *
 * Notes:
 * - docx is dynamically imported; install with `npm install docx` for best results.
 * - Tesseract and PDF.js are loaded from CDN at runtime to avoid bundling heavy libs.
 * - For production-scale, consider server-side conversion for large PDFs or better fidelity.
 */

export default function PdfToWordClient(): JSX.Element {
    const [file, setFile] = useState<File | null>(null);
    const [processing, setProcessing] = useState(false);
    const [extractedText, setExtractedText] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [showFullPreview, setShowFullPreview] = useState(false);

    // Options
    const [useOcr, setUseOcr] = useState(false);
    const [preserveLayout, setPreserveLayout] = useState(false); // embed page images in docx
    const [maxPages, setMaxPages] = useState<number>(5); // safe default
    const [ocrProgress, setOcrProgress] = useState<{ page?: number; progress?: number; status?: string } | null>(null);

    const onDrop = useCallback((accepted: File[]) => {
        setError(null);
        setOcrProgress(null);
        const pdf = accepted?.[0] ?? null;
        if (!pdf) return;
        if (pdf.type !== "application/pdf" && !/\.pdf$/i.test(pdf.name)) {
            setError("Please upload a PDF file.");
            return;
        }
        setFile(pdf);
        setExtractedText(null);
        setShowFullPreview(false);
    }, []);

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        multiple: false,
        accept: { "application/pdf": [] },
    });

    const reset = () => {
        setFile(null);
        setExtractedText(null);
        setError(null);
        setShowFullPreview(false);
        setOcrProgress(null);
    };

    /* ---------------- PDF.js CDN loader ---------------- */
    const PDFJS_CDN_URL = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/2.6.347/pdf.min.js';
    const PDFJS_WORKER_CDN = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/2.6.347/pdf.worker.min.js';

    async function ensurePdfJsLoaded(): Promise<any> {
        if ((window as any).pdfjsLib) return (window as any).pdfjsLib;

        await new Promise<void>((resolve, reject) => {
            const existing = document.querySelector(`script[data-pdfjs-cdn="${PDFJS_CDN_URL}"]`);
            if (existing) {
                (existing as HTMLScriptElement).addEventListener('load', () => resolve());
                (existing as HTMLScriptElement).addEventListener('error', () => reject(new Error('Failed to load pdf.js from CDN')));
                return;
            }
            const script = document.createElement('script');
            script.src = PDFJS_CDN_URL;
            script.async = true;
            script.setAttribute('data-pdfjs-cdn', PDFJS_CDN_URL);
            script.onload = () => resolve();
            script.onerror = () => reject(new Error('Failed to load pdf.js from CDN'));
            document.head.appendChild(script);
        });

        const pdfjsLib = (window as any).pdfjsLib;
        if (!pdfjsLib) throw new Error('pdfjsLib not available after CDN load');

        try {
            pdfjsLib.GlobalWorkerOptions.workerSrc = PDFJS_WORKER_CDN;
        } catch {
            // ignore if not available
        }
        return pdfjsLib;
    }

    /* ---------------- Extract text using PDF.js getTextContent (preferred) ---------------- */
    async function extractTextWithPdfJs(arrayBuffer: ArrayBuffer) {
        const pdfjsLib = await ensurePdfJsLoaded();
        const loadingTask = pdfjsLib.getDocument({ data: arrayBuffer });
        const pdf = await loadingTask.promise;

        const pageTexts: string[] = [];

        for (let i = 1; i <= Math.min(pdf.numPages, maxPages); i++) {
            const page = await pdf.getPage(i);
            const textContent = await page.getTextContent();
            // Join the textual items in order. This produces readable text for native PDFs.
            const pageText = textContent.items.map((it: any) => String(it.str)).join(' ');
            pageTexts.push(pageText.trim());
        }

        return pageTexts.join('\n\n'); // pages separated by blank line
    }

    /* ---------------- Render pages to canvases (used for images or OCR) ---------------- */
    async function renderPdfPagesToCanvases(arrayBuffer: ArrayBuffer, pagesToProcess: number, scale = 1.5) {
        const pdfjsLib = await ensurePdfJsLoaded();
        const loadingTask = pdfjsLib.getDocument({ data: arrayBuffer });
        const pdf = await loadingTask.promise;
        const pages = Math.min(pdf.numPages, pagesToProcess);
        const canvases: HTMLCanvasElement[] = [];

        for (let i = 1; i <= pages; i++) {
            const page = await pdf.getPage(i);
            // try both viewport signatures for different pdf.js versions
            const vp = (typeof page.getViewport === 'function') ? (page.getViewport({ scale }) as any) : page.getViewport(scale);
            const canvas = document.createElement('canvas');
            canvas.width = Math.floor(vp.width);
            canvas.height = Math.floor(vp.height);
            const ctx = canvas.getContext('2d');
            if (!ctx) throw new Error('Could not get canvas context for PDF rendering.');
            await page.render({ canvasContext: ctx, viewport: vp }).promise;
            canvases.push(canvas);
        }

        return canvases;
    }

    /* ---------------- OCR (Tesseract UMD) ---------------- */
    async function runOcrOnCanvases(canvases: HTMLCanvasElement[], lang = 'eng') {
        const TESSERACT_CDN = 'https://unpkg.com/tesseract.js@2.1.5/dist/tesseract.min.js';

        if (!(window as any).Tesseract) {
            await new Promise<void>((resolve, reject) => {
                const existing = document.querySelector(`script[data-tesseract-cdn="${TESSERACT_CDN}"]`);
                if (existing) {
                    (existing as HTMLScriptElement).addEventListener('load', () => resolve());
                    (existing as HTMLScriptElement).addEventListener('error', () => reject(new Error('Failed to load Tesseract.js from CDN')));
                    return;
                }
                const s = document.createElement('script');
                s.src = TESSERACT_CDN;
                s.async = true;
                s.setAttribute('data-tesseract-cdn', TESSERACT_CDN);
                s.onload = () => resolve();
                s.onerror = () => reject(new Error('Failed to load Tesseract.js from CDN'));
                document.head.appendChild(s);
            });
        }

        const T = (window as any).Tesseract;
        if (!T || typeof T.recognize !== 'function') throw new Error('Tesseract not available');

        const results: string[] = [];
        let pageIndex = 0;
        for (const canvas of canvases) {
            pageIndex++;
            setOcrProgress({ page: pageIndex, progress: 0, status: `processing page ${pageIndex}` });
            const res = await T.recognize(canvas, lang, {
                logger: (m: any) => {
                    if (m && typeof m === 'object') {
                        setOcrProgress(prev => ({
                            page: pageIndex,
                            progress: typeof m.progress === 'number' ? m.progress : prev?.progress,
                            status: String(m.status ?? prev?.status)
                        }));
                    }
                }
            });
            const text = res?.data?.text ?? '';
            results.push(text);
        }
        return results.join('\n\n');
    }

    /* ---------------- DOCX generation (text) ---------------- */
    async function downloadAsDocx(filename: string, text: string) {
        const docxMod = await import('docx');
        const { Document, Packer, Paragraph, TextRun } = docxMod;

        const blocks = text.split(/\n{2,}/).map(b => b.trim()).filter(Boolean);

        const children = blocks.flatMap(block => {
            const lines = block.split(/\n/).map(l => l.trim());
            if (lines.length === 1) {
                return [new Paragraph({ children: [new TextRun(String(lines[0]))] })];
            }
            const runs: any[] = [];
            lines.forEach((ln, idx) => {
                if (ln.length > 0) runs.push(new TextRun(String(ln)));
                if (idx < lines.length - 1) runs.push(new TextRun({ text: "", break: 1 }));
            });
            return [new Paragraph({ children: runs })];
        });

        const doc = new Document({ sections: [{ children }] });
        const blob = await Packer.toBlob(doc);
        const safeTitle = filename.replace(/\.pdf$/i, "");
        const url = URL.createObjectURL(blob);
        try {
            const a = document.createElement('a');
            a.href = url;
            a.download = `${safeTitle}.docx`;
            document.body.appendChild(a);
            a.click();
            a.remove();
        } finally {
            URL.revokeObjectURL(url);
        }
    }

    /* ---------------- DOCX generation (embed page images) ---------------- */
    // arrayBuffer is required to render pages inside this function
    // Replace your existing downloadAsDocxWithImages with this version
    // new downloadAsDocxWithImages — embed full page images (no crop), centered in docx
    async function downloadAsDocxWithImages(filename: string, arrayBuffer: ArrayBuffer, pagesToProcess: number, scale = 1.5, imageFormat: 'png' | 'jpeg' = 'jpeg') {
        const canvases = await renderPdfPagesToCanvases(arrayBuffer, pagesToProcess, scale);
        if (!canvases.length) throw new Error('No pages rendered.');

        // helper: canvas -> Uint8Array
        async function canvasToUint8(canvas: HTMLCanvasElement, mime = 'image/jpeg', quality?: number) {
            return new Promise<Uint8Array>((resolve) => {
                canvas.toBlob(blob => {
                    if (!blob) {
                        resolve(new Uint8Array());
                        return;
                    }
                    const reader = new FileReader();
                    reader.onload = () => {
                        const arr = new Uint8Array(reader.result as ArrayBuffer);
                        resolve(arr);
                    };
                    reader.readAsArrayBuffer(blob);
                }, mime, quality);
            });
        }

        // helper: Uint8Array -> ArrayBuffer
        function uint8ToArrayBuffer(u8: Uint8Array): ArrayBuffer {
            const arr = new ArrayBuffer(u8.byteLength);
            const view = new Uint8Array(arr);
            view.set(u8.subarray(0, u8.byteLength));
            return arr;
        }

        const docxMod = await import('docx');
        const { Document, Packer, Paragraph, ImageRun, AlignmentType } = docxMod;

        const children: any[] = [];

        // max width in pixels to fit into Word page (tune as needed)
        const maxWidthPx = 1200;

        for (let i = 0; i < canvases.length; i++) {
            const canvas = canvases[i];

            // scale image to maxWidthPx while preserving aspect ratio
            let finalCanvas = canvas;
            if (canvas.width > maxWidthPx) {
                const targetWidth = maxWidthPx;
                const targetHeight = Math.round((targetWidth / canvas.width) * canvas.height);
                const tmp = document.createElement('canvas');
                tmp.width = targetWidth;
                tmp.height = targetHeight;
                const tctx = tmp.getContext('2d');
                if (tctx) tctx.drawImage(canvas, 0, 0, targetWidth, targetHeight);
                finalCanvas = tmp;
            }

            const u8 = await canvasToUint8(finalCanvas, imageFormat === 'png' ? 'image/png' : 'image/jpeg', imageFormat === 'jpeg' ? 0.85 : undefined);
            const arrBuf = uint8ToArrayBuffer(u8);

            // ImageRun expects ArrayBuffer/Buffer; cast to any to avoid type mismatch in some docx versions
            //@ts-ignore
            const img = new ImageRun({
                data: arrBuf as any,
                transformation: {
                    width: finalCanvas.width,
                    height: finalCanvas.height
                }
            });

            // center the paragraph so the page image sits centered (prevents perceived left/top shift)
            children.push(new Paragraph({ children: [img], alignment: AlignmentType.CENTER }));

            // Add a page break after the page (except last)
            if (i < canvases.length - 1) {
                children.push(new Paragraph({ children: [], pageBreakBefore: true }));
            }
        }

        const doc = new Document({ sections: [{ children }] });
        const blob = await Packer.toBlob(doc);
        const safeTitle = filename.replace(/\.pdf$/i, "");
        const url = URL.createObjectURL(blob);
        try {
            const a = document.createElement('a');
            a.href = url;
            a.download = `${safeTitle}-pages.docx`;
            document.body.appendChild(a);
            a.click();
            a.remove();
        } finally {
            URL.revokeObjectURL(url);
        }
    }



    /* ---------------- Convert orchestration ---------------- */
    const handleConvert = async () => {
        if (!file) return;
        setProcessing(true);
        setExtractedText(null);
        setError(null);
        setOcrProgress(null);

        try {
            // Safety limits
            const MAX_BYTES = 120 * 1024 * 1024; // 120MB
            if (file.size > MAX_BYTES) {
                setError("File is very large. For huge PDFs consider server-side conversion.");
                setProcessing(false);
                return;
            }

            const arrayBuffer = await file.arrayBuffer();

            // If preserveLayout true -> embed page images into docx
            if (preserveLayout) {
                // If OCR is also requested, run OCR to produce editable text; otherwise only images
                if (useOcr) {
                    if (!confirm(`Preserve layout + OCR selected. OCR is CPU-intensive and may take a while. It will process up to ${maxPages} page(s). Continue?`)) {
                        setProcessing(false);
                        return;
                    }
                    setOcrProgress({ page: 0, progress: 0, status: 'rendering pages for OCR' });
                    const canvases = await renderPdfPagesToCanvases(arrayBuffer, maxPages, 1.5);
                    setOcrProgress({ page: 0, progress: 0, status: 'running OCR' });
                    const ocrText = await runOcrOnCanvases(canvases, 'eng');
                    setExtractedText(ocrText);
                    // produce a docx that first embeds images, then appends OCR text (or you could interleave)
                    await downloadAsDocxWithImages(file.name, arrayBuffer, maxPages, 1.5, 'jpeg');
                    // append text docx generation (user can download both; for simplicity we provide images-docx now and also text-docx)
                    await downloadAsDocx(file.name.replace(/\.pdf$/i, '') + '_ocr', ocrText);
                    setProcessing(false);
                    return;
                } else {
                    // Just images -> docx
                    if (!confirm(`Preserve layout (embed page images) will create an image-based .docx. It will process up to ${maxPages} page(s). Continue?`)) {
                        setProcessing(false);
                        return;
                    }
                    setOcrProgress({ page: 0, progress: 0, status: 'rendering pages for image embedding' });
                    await downloadAsDocxWithImages(file.name, arrayBuffer, maxPages, 1.5, 'jpeg');
                    setProcessing(false);
                    return;
                }
            }

            // If not preserveLayout: prefer PDF.js text extraction (editable text)
            if (!useOcr) {
                try {
                    const text = await extractTextWithPdfJs(arrayBuffer);
                    if (text && text.replace(/\s/g, "").length >= 20) {
                        setExtractedText(text);
                        await downloadAsDocx(file.name, text);
                        setProcessing(false);
                        return;
                    } else {
                        setError("PDF.js extracted little or no text. If this is a scanned PDF, enable OCR or use 'Preserve layout (images)'.");
                        setProcessing(false);
                        return;
                    }
                } catch (e) {
                    console.error("PDF.js extraction failed:", e);
                    setError("Failed to extract text using PDF.js. Try enabling OCR or preserve layout mode.");
                    setProcessing(false);
                    return;
                }
            }

            // If useOcr true and not preserveLayout: run OCR on rendered pages and generate docx from OCR text
            if (useOcr) {
                if (!confirm(`OCR is CPU-intensive and may take a while. This will process up to ${maxPages} page(s). Continue?`)) {
                    setProcessing(false);
                    return;
                }
                setOcrProgress({ page: 0, progress: 0, status: 'rendering pages' });
                const canvases = await renderPdfPagesToCanvases(arrayBuffer, maxPages, 1.5);
                if (!canvases.length) {
                    setError("Could not render pages for OCR.");
                    setProcessing(false);
                    return;
                }
                setOcrProgress({ page: 0, progress: 0, status: 'starting OCR' });
                const ocrText = await runOcrOnCanvases(canvases, 'eng');
                if (!ocrText || ocrText.replace(/\s/g, "").length < 20) {
                    setError("OCR produced little text. Try different settings or server-side OCR.");
                    setProcessing(false);
                    return;
                }
                setExtractedText(ocrText);
                await downloadAsDocx(file.name, ocrText);
                setProcessing(false);
                return;
            }

        } catch (err) {
            console.error(err);
            setError("Conversion failed. Try a simpler PDF or server-side converter.");
            setProcessing(false);
        } finally {
            setOcrProgress(null);
        }
    };

    const previewSnippet = useMemo(() => {
        if (!extractedText) return "";
        if (showFullPreview) return extractedText;
        return extractedText.slice(0, 1000);
    }, [extractedText, showFullPreview]);

    return (
        <div style={{ maxWidth: 820 }}>
            <div
                {...getRootProps()}
                aria-label="PDF dropzone"
                style={{
                    padding: 14,
                    border: "2px dashed #e6eef8",
                    borderRadius: 8,
                    cursor: "pointer",
                    background: isDragActive ? "#f4fbff" : "#fff",
                }}
            >
                <input {...getInputProps()} aria-hidden />
                <p style={{ margin: 0, color: "#333", fontWeight: 500 }}>
                    {isDragActive ? "Drop PDF here..." : "Drag & drop a PDF here, or click to select"}
                </p>
                <small style={{ color: "#666" }}>
                    Default: extract editable text via PDF.js. Use "Preserve layout" to embed page images into the DOCX.
                </small>
            </div>

            {error && (
                <div role="alert" style={{ marginTop: 12, padding: 10, borderRadius: 8, background: "#fff5f5", border: "1px solid #ffd6d6", color: "#7a1a1a" }}>
                    {error}
                </div>
            )}

            {file && (
                <div style={{ marginTop: 12, padding: 12, borderRadius: 8, background: "#f9fbff", border: "1px solid #e2e8f0" }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 12 }}>
                        <div>
                            <div style={{ fontWeight: 700 }}>{file.name}</div>
                            <div style={{ color: "#475569", fontSize: 13 }}>{formatBytes(file.size)}</div>
                        </div>

                        <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
                            <label style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                                <input type="checkbox" checked={preserveLayout} onChange={e => setPreserveLayout(e.target.checked)} />
                                <span style={{ fontSize: 13 }}>Preserve layout (embed page images)</span>
                            </label>

                            <label style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                                <input type="checkbox" checked={useOcr} onChange={e => setUseOcr(e.target.checked)} />
                                <span style={{ fontSize: 13 }}>Enable OCR (Tesseract)</span>
                            </label>

                            <label style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                                <span style={{ fontSize: 13 }}>Max pages:</span>
                                <input type="number" value={maxPages} onChange={e => setMaxPages(Math.max(1, Math.min(50, Number(e.target.value || 1))))} style={{ width: 68, padding: 6, borderRadius: 6 }} />
                            </label>

                            <button
                                onClick={handleConvert}
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
                                {processing ? "Working..." : preserveLayout ? (useOcr ? "Images + OCR → DOCX" : "Images → DOCX") : (useOcr ? "OCR → DOCX" : "Text → DOCX")}
                            </button>

                            <button onClick={reset} disabled={processing} style={{ background: "#fff", border: "1px solid #e6eef8", padding: "8px 12px", borderRadius: 8, cursor: processing ? "not-allowed" : "pointer" }}>
                                Reset
                            </button>
                        </div>
                    </div>

                    <div style={{ marginTop: 8, color: "#475569", fontSize: 13 }}>
                        <strong>Note:</strong> Embedding images preserves visual fidelity (but text won't be selectable). Text extraction produces editable text but may lose layout and images. OCR is CPU-intensive.
                    </div>
                </div>
            )}

            {ocrProgress && (
                <div style={{ marginTop: 12, padding: 10, borderRadius: 8, background: "#fffaf0", border: "1px solid #fde3a7", color: "#66510a" }}>
                    <div style={{ fontWeight: 600 }}>Status</div>
                    <div style={{ marginTop: 6 }}>{ocrProgress.status} {ocrProgress.page ? `— page ${ocrProgress.page}` : ""} {typeof ocrProgress.progress === 'number' ? `(${Math.round((ocrProgress.progress || 0) * 100)}%)` : ""}</div>
                </div>
            )}

            {extractedText && (
                <div style={{ marginTop: 12 }}>
                    <h4 style={{ margin: "6px 0" }}>Preview{!showFullPreview ? " (first ~1000 chars)" : ""}:</h4>
                    <pre style={{ whiteSpace: "pre-wrap", background: "#fff", border: "1px solid #efefef", padding: 12, borderRadius: 8, maxHeight: 420, overflow: "auto" }}>
                        {previewSnippet}
                    </pre>

                    {!showFullPreview && extractedText.length > 1000 && (
                        <div style={{ marginTop: 8 }}>
                            <button onClick={() => setShowFullPreview(true)} style={{ padding: "6px 10px", borderRadius: 6 }}>Show full preview</button>
                        </div>
                    )}
                </div>
            )}
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

function escapeHtml(s: string) {
    return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

const previewSnippet = (text: string | null, showFull: boolean) => {
    if (!text) return "";
    return showFull ? text : text.slice(0, 1000);
};
