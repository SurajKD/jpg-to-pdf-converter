import Link from "next/link"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Blog & Guides — JPG to PDF Converter",
  description: "Helpful guides and tips for converting JPG to PDF, mobile instructions, quality tips, and more.",
  alternates: { canonical: "https://jpg-to-pdf-convert.netlify.app/blog" },
}

export default function BlogIndex() {
  const posts = [
    { href: "/blog/how-to-convert-jpg-to-pdf", title: "How to Convert JPG to PDF (Step-by-Step Guide)" },
    { href: "/blog/jpg-to-pdf-android", title: "How to Convert JPG to PDF on Android — Quick Guide" },
    { href: "/blog/jpg-to-pdf-iphone", title: "How to Convert JPG to PDF on iPhone — Fast Methods" },
    { href: "/blog/reduce-pdf-size-after-conversion", title: "How to Reduce PDF Size After Conversion" },
    { href: "/blog/best-jpg-to-pdf-tools", title: "Best JPG to PDF Tools — Free & Paid Options" },
  ]

  return (
    <main style={{ padding: 24, maxWidth: 900, margin: "0 auto", lineHeight: 1.7 }}>
      <h1>Blog & Guides</h1>
      <p style={{ color: "#555" }}>
        Practical guides, device-specific tips, and best practices for converting images to PDF. Helpful if you're preparing
        documents, archiving photos, or optimizing PDFs for sharing and printing.
      </p>

      <ul style={{ marginTop: 16 }}>
        {posts.map(p => (
          <li key={p.href} style={{ marginBottom: 12 }}>
            <Link href={p.href} style={{ color: "#0b74de", fontWeight: 600 }}>{p.title}</Link>
            <div style={{ color: "#666", fontSize: 14 }}>Short practical guide with tips and screenshots (where useful).</div>
          </li>
        ))}
      </ul>

      <p style={{ marginTop: 24, color: "#666" }}>
        Want more topics? Email suggestions to <a href="/contact">our contact page</a>.
      </p>
    </main>
  )
}
