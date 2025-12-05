// app/tools/compress-pdf/page.tsx
import type { Metadata } from "next";
import dynamic from "next/dynamic";
import Link from "next/link";
import React from "react";

const CompressPdfClient = dynamic(
  () => import("../../../components/CompressPdfClient"),
  { ssr: false, loading: () => <div className="h-48" /> }
);

const AdPlaceholder = dynamic(
  () => import("../../../components/AdPlaceholder"),
  { ssr: false, loading: () => <div className="h-24" /> }
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
        url: "https://anyfileconverter.online/og-pdf-compressor.jpg",
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
    images: ["https://anyfileconverter.online/og-pdf-compressor.jpg"],
  },
};

const pageJsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "SoftwareApplication",
      "@id": "https://anyfileconverter.online/tools/compress-pdf#app",
      name: "PDF Compressor",
      applicationCategory: "FileConverter",
      operatingSystem: "Web",
      url: "https://anyfileconverter.online/tools/compress-pdf",
      description:
        "Compress PDF files online in your browser. Reduce file size while maintaining quality — ideal for email, uploads, and sharing.",
      offers: {
        "@type": "Offer",
        price: "0",
        priceCurrency: "USD",
      },
    },
    {
      "@type": "WebApplication",
      "@id": "https://anyfileconverter.online/tools/compress-pdf#webapp",
      name: "PDF Compressor",
      url: "https://anyfileconverter.online/tools/compress-pdf",
      description:
        "Browser-based PDF compression — fast, private, and free. No upload required by default.",
      applicationCategory: "Utility",
      offers: {
        "@type": "Offer",
        price: "0",
        priceCurrency: "USD",
      },
    },
    {
      "@type": "FAQPage",
      "@id": "https://anyfileconverter.online/tools/compress-pdf#faq",
      mainEntity: [
        {
          "@type": "Question",
          name: "Is my PDF uploaded to your server?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "No. Compression runs in your browser by default so your PDF is not uploaded to our servers.",
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
    },
  ],
};

export default function CompressPdfPage() {
  return (
    <>
      <main className="max-w-4xl mx-auto px-4 py-10">
        <nav aria-label="Breadcrumb" className="text-sm mb-3 text-slate-600">
          <Link href="/">Home</Link> {" / "} <Link href="/tools">Tools</Link> {" / "} Compress PDF
        </nav>

        <header className="mb-4">
          <h1 className="text-3xl font-semibold leading-tight">Compress PDF Online — Free &amp; Secure</h1>
          <p className="mt-2 text-gray-600">
            Reduce PDF file size quickly in your browser. Perfect for emailing, uploading, and sharing without hitting file size limits.
            Your PDFs stay on your device by default.
          </p>
        </header>

        {/* Compressor UI */}
        <section className="mt-4">
          <div className="bg-white rounded-lg p-4 shadow-sm border border-slate-100">
            <CompressPdfClient />
          </div>
        </section>

        {/* Non-intrusive ad slot (kept away from primary controls) */}
        <div className="mt-6 flex justify-center">
          <AdPlaceholder />
        </div>

        <article className="prose prose-lg mt-8">
          <h2>How to Compress a PDF</h2>
          <ol>
            <li>Click inside the box above or drag &amp; drop a PDF file.</li>
            <li>Wait a moment while we process your document.</li>
            <li>Download your compressed PDF using the green button.</li>
            <li>Use it for email, uploads, or sharing.</li>
          </ol>

          <h2>Why Use Our PDF Compressor?</h2>
          <ul>
            <li><strong>Privacy-first:</strong> Compression runs in your browser for maximum privacy.</li>
            <li><strong>Fast:</strong> No uploads or waiting for servers.</li>
            <li><strong>Free:</strong> No signup, no hidden limits.</li>
            <li><strong>Simple:</strong> Clean interface focused on one thing—shrinking your PDFs.</li>
          </ul>

          <h2>FAQ</h2>
          <details>
            <summary>Is my PDF secure?</summary>
            <p>Yes. By default, your PDF remains on your device, and compression is done locally in your browser.</p>
          </details>

          <details>
            <summary>How much can I compress?</summary>
            <p>It depends on your PDF. Documents with many images typically see more savings than plain text PDFs.</p>
          </details>

          <details>
            <summary>Does compression affect the content?</summary>
            <p>The structure and content of your PDF remain the same. In most cases, you won’t notice a difference aside from reduced file size.</p>
          </details>
        </article>

        <div className="mt-8 flex justify-center">
          <AdPlaceholder />
        </div>
      </main>

      {/* Structured data for SEO */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(pageJsonLd) }} />
    </>
  );
}
