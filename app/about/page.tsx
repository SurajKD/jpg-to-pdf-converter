import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "About — JPG to PDF Converter",
  description: "About our JPG to PDF converter: mission, privacy-first approach, and why we built this free tool.",
  alternates: { canonical: "https://jpg-to-pdf-convert.netlify.app/about" },
}

export default function AboutPage() {
  return (
    <main style={{ padding: 24, maxWidth: 900, margin: "0 auto", lineHeight: 1.7 }}>
      <h1>About JPG → PDF Converter</h1>
      <p style={{ color: "#555" }}>
        We built this free JPG to PDF converter because users needed a fast, simple and private way to convert images
        into shareable documents — without installing apps or creating accounts. Our goal is to keep the tool lightweight,
        reliable, and respectful of your privacy.
      </p>

      <h2>Our approach</h2>
      <p>
        By default, all conversions happen in your browser (client-side). That means your images are never uploaded to our
        servers unless you explicitly opt in to a server feature (for example, temporary cloud hosting). We believe privacy
        should be the default — not an afterthought.
      </p>

      <h2>What we do and why it’s free</h2>
      <p>
        This site is a small project that provides useful utilities for everyone — students, professionals, photographers,
        and anyone who needs quick PDF files from images. The tool is free because we believe basic utilities should be
        accessible. We support the project with modest, policy-compliant ads and occasional suggestions for upgrades.
      </p>

      <h2>Trust & security</h2>
      <ul>
        <li><strong>Client-side first:</strong> Conversions happen locally in your browser by default.</li>
        <li><strong>No accounts:</strong> You don't need to sign up — just convert and download.</li>
        <li><strong>Temporary uploads only if chosen:</strong> If you use sharing/upload features, files are stored only briefly.</li>
      </ul>

      <h2>Want to help?</h2>
      <p>
        If you like the tool, please share it with friends or leave feedback on the contact page. Small projects grow through
        helpful users — thank you for using the converter.
      </p>

      <p style={{ marginTop: 28, color: "#666" }}>
        — The JPG→PDF team
      </p>
    </main>
  )
}
