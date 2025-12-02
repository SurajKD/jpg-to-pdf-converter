import type { Metadata } from "next"
import AdPlaceholder from "../../../components/AdPlaceholder"

export const metadata: Metadata = {
  title: "How to Convert JPG to PDF on iPhone — Fast Methods",
  description: "Easy ways to convert JPG images to PDF on iPhone using the Photos app, Files, or our browser tool.",
  alternates: { canonical: "https://jpg-to-pdf-convert.netlify.app/blog/jpg-to-pdf-iphone" },
}

export default function IphoneGuide() {
  return (
    <main style={{ padding: 24, maxWidth: 900, margin: "0 auto", lineHeight: 1.7 }}>
      <h1>How to Convert JPG to PDF on iPhone — Fast Methods</h1>

      <p>
        iPhone has simple built-in ways to create PDFs from photos, but if you prefer privacy or need to combine multiple images,
        our browser-based tool is a great alternative.
      </p>

      <h2>Built-in method (Photos → Print → Save as PDF)</h2>
      <ol>
        <li>Open <strong>Photos</strong> and select the image(s).</li>
        <li>Tap the <strong>Share</strong> icon, then choose <strong>Print</strong>.</li>
        <li>Use the pinch-out gesture on the preview to convert to PDF.</li>
        <li>Tap <strong>Share</strong> again and save to Files or send to another app.</li>
      </ol>

      <h2>Browser-based private method</h2>
      <p>
        Use <a href="/tools/jpg-to-pdf">our JPG → PDF converter</a> in Safari. It runs in your browser and doesn't upload files unless you choose to share them.
      </p>

      <h3>Why use the browser tool?</h3>
      <ul>
        <li>Combine many images into a single PDF easily.</li>
        <li>Control order, margins and quality.</li>
        <li>No extra apps or permissions required.</li>
      </ul>

      <h3>FAQ</h3>
      <p><strong>Will the PDF keep image quality?</strong> Yes, if you keep quality settings high. You can trade off size vs quality in the tool.</p>
      <div style={{ marginTop: 12 }}>
        <AdPlaceholder />
      </div>
    </main>
  )
}
