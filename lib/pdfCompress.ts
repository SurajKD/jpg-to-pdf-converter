// lib/pdfCompress.ts
import { PDFDocument } from "pdf-lib";

export interface PdfCompressOptions {
  /**
   * Whether to use object streams when saving.
   * This usually reduces size slightly.
   * Default: true
   */
  useObjectStreams?: boolean;

  /**
   * Placeholder for future enhancements (if you later
   * create PDFs yourself and control image quality).
   */
  // imageQuality?: number;
}

/**
 * Lightweight PDF "compression" using pdf-lib.
 * Re-saves the PDF with optimizations, which can reduce size
 * (metadata cleanup, better structure), but does NOT re-encode
 * embedded images from existing PDFs.
 *
 * Returns a Blob you can download or preview.
 */
export async function compressPdf(
  file: File | Blob | ArrayBuffer,
  options: PdfCompressOptions = {}
): Promise<Blob> {
  const { useObjectStreams = true } = options;

  let arrayBuffer: ArrayBuffer;

  if (file instanceof File || file instanceof Blob) {
    arrayBuffer = await file.arrayBuffer();
  } else {
    arrayBuffer = file;
  }

  const pdfDoc = await PDFDocument.load(arrayBuffer, {
    ignoreEncryption: true,
  });

  const compressedBytes = await pdfDoc.save({
    useObjectStreams,
    addDefaultPage: false,
  });

  // Make sure we pass ArrayBuffer to Blob to keep TS happy
  const buffer = compressedBytes.buffer.slice(
    compressedBytes.byteOffset,
    compressedBytes.byteOffset + compressedBytes.byteLength
  );
//@ts-ignore
  return new Blob([buffer], { type: "application/pdf" });
}

/** Get human-friendly size in KB / MB for UI display */
export function formatBytes(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  const kb = bytes / 1024;
  if (kb < 1024) return `${kb.toFixed(1)} KB`;
  const mb = kb / 1024;
  return `${mb.toFixed(2)} MB`;
}

/** Calculate percentage reduction */
export function getSavedPercent(
  originalBytes: number,
  compressedBytes: number
): number {
  if (!originalBytes) return 0;
  return Math.max(
    0,
    100 - Math.round((compressedBytes / originalBytes) * 100)
  );
}
