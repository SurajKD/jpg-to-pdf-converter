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
  title: "Compress PDF Online — Reduce File Size Fast",
  description:
    "Compress PDF files online for free. Reduce PDF size while keeping quality, perfect for email, uploads, and sharing. Fast, secure, and runs in your browser.",
  alternates: {
    canonical: "https://anyfileconverter.online/tools/compress-pdf",
  },
  openGraph: {
    title: "Compress PDF Online — Free PDF Compressor",
    description:
      "Reduce your PDF file size online. Fast, secure PDF compression that runs in your browser.",
    url: "https://anyfileconverter.online/tools/compress-pdf",
    type: "website",
    siteName: "AnyFileConverter.online",
  },
};

const faqLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "Is my PDF uploaded to your server?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "No. Compression is done in your browser by default, so your PDF is not uploaded to our servers.",
      },
    },
    {
      "@type": "Question",
      name: "Does PDF compression reduce quality?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "This tool performs safe, browser-based compression. In most cases, visible quality remains similar while file size is reduced.",
      },
    },
    {
      "@type": "Question",
      name: "Do I need to create an account?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "No account or registration is required to compress PDFs.",
      },
    },
  ],
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
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }}
      />
    </>
  );
}
