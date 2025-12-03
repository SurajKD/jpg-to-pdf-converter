import type { Metadata } from "next";
import dynamic from "next/dynamic";

const CompressPdfClient = dynamic(
  () => import("../../../components/CompressPdfClient"),
  { ssr: false, loading: () => <div style={{ height: 200 }} /> }
);

const AdPlaceholder = dynamic(
  () => import("../../../components/AdPlaceholder"),
  { ssr: false, loading: () => <div style={{ height: 90 }} /> }
);

export const metadata: Metadata = {
  title: "Compress PDF Online — Free PDF Compressor (Fast & Private)",
  description:
    "Compress PDF files online for free. Reduce PDF size while keeping quality — ideal for email, uploads, and sharing. Fast, secure, and runs in your browser (no upload by default).",
  keywords: [
    "compress pdf",
    "pdf compressor",
    "reduce pdf size",
    "compress pdf online",
    "free pdf compressor",
    "pdf compression no upload",
  ],
  alternates: {
    canonical: "https://anyfileconverter.online/tools/compress-pdf",
  },
  openGraph: {
    title: "Compress PDF Online — Free PDF Compressor",
    description:
      "Reduce your PDF file size online. Fast, private browser-based PDF compression — no upload required by default.",
    url: "https://anyfileconverter.online/tools/compress-pdf",
    type: "website",
    siteName: "AnyFileConverter",
    locale: "en_US",
    images: [
      {
        // Add an OG image at this absolute URL if available
        url: "https://anyfileconverter.online/og-compress-pdf.png",
        width: 1200,
        height: 630,
        alt: "Compress PDF — AnyFileConverter",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Compress PDF Online — Free PDF Compressor",
    description:
      "Reduce your PDF file size quickly in the browser. No signup. No upload required by default.",
    images: ["https://anyfileconverter.online/og-compress-pdf.png"],
  },
};

const pageJsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "SoftwareApplication",
      "@id": "https://anyfileconverter.online/tools/compress-pdf#app",
      "name": "PDF Compressor",
      "applicationCategory": "FileConverter",
      "operatingSystem": "Web",
      "url": "https://anyfileconverter.online/tools/compress-pdf",
      "description":
        "Compress PDF files online in your browser. Reduce file size while maintaining quality — ideal for email, uploads, and sharing.",
      "offers": {
        "@type": "Offer",
        "price": "0",
        "priceCurrency": "USD"
      }
    },
    {
      "@type": "WebApplication",
      "@id": "https://anyfileconverter.online/tools/compress-pdf#webapp",
      "name": "PDF Compressor",
      "url": "https://anyfileconverter.online/tools/compress-pdf",
      "description":
        "Browser-based PDF compression — fast, private, and free. No upload required by default.",
      "applicationCategory": "Utility",
      "offers": {
        "@type": "Offer",
        "price": "0",
        "priceCurrency": "USD"
      }
    },
    {
      "@type": "FAQPage",
      "@id": "https://anyfileconverter.online/tools/compress-pdf#faq",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "Is my PDF uploaded to your server?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "No. Compression runs in your browser by default so your PDF is not uploaded to our servers."
          }
        },
        {
          "@type": "Question",
          "name": "Does PDF compression reduce quality?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "This tool performs safe, browser-based compression. In most cases, visible quality remains similar while file size is reduced."
          }
        },
        {
          "@type": "Question",
          "name": "Do I need to create an account?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "No account or registration is required to compress PDFs."
          }
        }
      ]
    }
  ]
};

export default function CompressPdfPage() {
  return (
    <>
      <main style={{ padding: 24, maxWidth: 900, margin: "0 auto", lineHeight: 1.7 }}>
        <h1>Compress PDF Online — Free & Secure</h1>
        <p style={{ color: "#555" }}>
          Reduce PDF file size quickly in your browser. Perfect for emailing, uploading, and sharing
          without hitting file size limits. Your PDFs stay on your device by default.
        </p>

        <section style={{ marginTop: 20 }}>
          <CompressPdfClient />
        </section>

        <div style={{ marginTop: 20 }}>
          <AdPlaceholder />
        </div>

        <section style={{ marginTop: 32 }}>
          <h2>How to Compress a PDF</h2>
          <ol style={{ marginLeft: 20 }}>
            <li>Click inside the box above or drag & drop a PDF file</li>
            <li>Wait a moment while we process your document</li>
            <li>Download your compressed PDF using the green button</li>
            <li>Use it for email, uploads, or sharing</li>
          </ol>

          <h2>Why Use Our PDF Compressor?</h2>
          <ul style={{ marginLeft: 20 }}>
            <li><strong>Privacy-first:</strong> Compression runs in your browser for maximum privacy.</li>
            <li><strong>Fast:</strong> No uploads or waiting for servers.</li>
            <li><strong>Free:</strong> No signup, no hidden limits.</li>
            <li><strong>Simple:</strong> Clean interface focused on one thing—shrinking your PDFs.</li>
          </ul>
        </section>

        <section style={{ marginTop: 32 }}>
          <h2>FAQ</h2>
          <h3>Is my PDF secure?</h3>
          <p>
            Yes. By default, your PDF remains on your device, and compression is done locally in your browser.
          </p>

          <h3>How much can I compress?</h3>
          <p>
            It depends on your PDF. Documents with many images typically see more savings than plain text PDFs.
          </p>

          <h3>Does this affect the content?</h3>
          <p>
            The structure and content of your PDF remain the same. In most cases, you won&apos;t notice a difference
            aside from reduced file size.
          </p>
        </section>
      </main>

      {/* FAQ JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(pageJsonLd) }}
      />
    </>
  );
}
