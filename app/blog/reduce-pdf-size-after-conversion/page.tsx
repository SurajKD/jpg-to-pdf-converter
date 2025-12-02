import type { Metadata } from "next"
import AdPlaceholder from "../../../components/AdPlaceholder"

export const metadata: Metadata = {
  title: "How to Reduce PDF Size After Conversion",
  description: "Practical tips to reduce PDF size after converting images, without losing too much quality.",
  alternates: { canonical: "https://jpg-to-pdf-convert.netlify.app/blog/reduce-pdf-size-after-conversion" },
}

export default function ReduceSize() {
  return (
    <main className="blog" style={{ padding: 24, maxWidth: 900, margin: "0 auto", lineHeight: 1.7 }}>
      <h1>How to Reduce PDF Size After Conversion</h1>

      <p>
        Large PDFs are inconvenient to share. If your converted PDF is too big, try these practical steps to shrink it while
        keeping readable quality.
      </p>

      <h2>1. Resize images before conversion</h2>
      <p>
        If the source images are very large (camera photos), resize them to a maximum width of 1500–2000px — it's still high quality
        for printing and drastically reduces file size.
      </p>

      <h2>2. Lower image quality slightly</h2>
      <p>
        A quality setting of 70–85% often keeps images visually crisp but reduces bytes significantly. Our tool lets you adjust quality
        during conversion.
      </p>

      <h2>3. Use grayscale for documents</h2>
      <p>
        If your images are scanned documents (not color photos), convert to grayscale before embedding — that can cut size a lot.
      </p>

      <h2>4. Compress the final PDF</h2>
      <p>
        Use an online PDF compressor or a desktop app (Preview on Mac has export/compress options). For sensitive files, prefer client-side
        tools to protect privacy.
      </p>

      <h3>Quick checklist</h3>
      <ul>
        <li>Resize large images</li>
        <li>Choose 70–85% quality for photos</li>
        <li>Use grayscale for text scans</li>
        <li>Compress final PDF if needed</li>
      </ul>

      <p style={{ marginTop: 12 }}>
        Following these tips usually reduces file size without noticeable quality loss.
      </p>
      <div style={{ marginTop: 12 }}>
        <AdPlaceholder />
      </div>
    </main>
  )
}
