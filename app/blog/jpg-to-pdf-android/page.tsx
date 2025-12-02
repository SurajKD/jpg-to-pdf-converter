import type { Metadata } from "next"
import AdPlaceholder from "../../../components/AdPlaceholder"

export const metadata: Metadata = {
  title: "How to Convert JPG to PDF on Android — Quick Guide",
  description: "Step-by-step instructions to convert JPG images to PDF on Android using browser, Google Photos, or this online tool.",
  alternates: { canonical: "https://jpg-to-pdf-convert.netlify.app/blog/jpg-to-pdf-android" },
  openGraph: { title: "How to Convert JPG to PDF on Android", description: "Fast Android methods", url: "https://jpg-to-pdf-convert.netlify.app/blog/jpg-to-pdf-android" }
}

export default function AndroidGuide() {
  return (
    <main className="blog" style={{ padding: 24, maxWidth: 900, margin: "0 auto", lineHeight: 1.7 }}>
      <h1>How to Convert JPG to PDF on Android — Quick Guide</h1>

      <p>
        Converting JPG images to PDF on Android is easy — here are three reliable methods depending on whether you prefer a
        built-in solution, a browser-based tool (recommended for privacy), or a quick app.
      </p>

      <h2>Method 1 — Using our browser tool (Private & fast)</h2>
      <ol>
        <li>Open <a href="/tools/jpg-to-pdf">our JPG → PDF converter</a> in Chrome on your Android device.</li>
        <li>Tap the upload area and choose images from your gallery.</li>
        <li>Reorder if needed, then tap <strong>Convert</strong>.</li>
        <li>Tap <strong>Download</strong> or use the Share button to send the file directly to other apps.</li>
      </ol>
      <p>
        This method keeps files on your device (client-side) and doesn't require installing anything. It's fast for a few images
        and preserves privacy.
      </p>

      <h2>Method 2 — Google Photos / Print to PDF</h2>
      <ol>
        <li>Open the image in Google Photos.</li>
        <li>Tap the three-dot menu → <strong>Print</strong>.</li>
        <li>Choose <strong>Save as PDF</strong> as the printer and save.</li>
      </ol>

      <h2>Method 3 — Use a dedicated Android app</h2>
      <p>
        If you frequently convert large batches, an app may be more convenient. Look for apps with good reviews and offline processing.
        Remember: installed apps may request more permissions than a browser-based tool.
      </p>

      <h3>Tips for best results</h3>
      <ul>
        <li>Crop out unnecessary borders before converting.</li>
        <li>Use consistent orientation for a clean PDF.</li>
        <li>If files are large, reduce image quality slightly to keep PDFs small.</li>
      </ul>

      <h3>FAQ</h3>
      <p><strong>Is it safe?</strong> Yes — the browser method keeps files local by default.</p>
      <div style={{ marginTop: 12 }}>
        <AdPlaceholder />
      </div>
    </main>
  )
}
