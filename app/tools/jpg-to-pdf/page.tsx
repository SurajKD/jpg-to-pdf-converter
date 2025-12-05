// app/tools/jpg-to-pdf/page.tsx
import dynamic from "next/dynamic";
import type { Metadata } from "next";
import Link from "next/link";
import React from "react";

const AdPlaceholder = dynamic(() => import("../../../components/AdPlaceholder"), {
  ssr: false,
  loading: () => <div className="h-24" />,
});
const DropzoneClient = dynamic(() => import("../../../components/DropzoneClient"), { ssr: false });

export const metadata: Metadata = {
  title: "JPG to PDF Converter — Free Online Tool (No Upload Needed)",
  description:
    "Convert JPG, JPEG, and PNG images to PDF instantly. Reorder photos, rotate pages, adjust margins, and combine multiple images into one PDF. 100% secure client-side processing.",
  keywords: [
    "jpg to pdf",
    "convert jpg to pdf",
    "image to pdf",
    "jpg to pdf online",
    "photo to pdf",
    "merge jpg to pdf",
    "jpg to pdf converter",
    "free pdf converter",
    "jpg to pdf no upload",
  ],
  alternates: {
    canonical: "https://anyfileconverter.online/tools/jpg-to-pdf",
  },
  openGraph: {
    title: "JPG to PDF Converter — Free Online Tool (Fast & Secure)",
    description:
      "Convert JPG, JPEG, and PNG images to PDF instantly. Rearrange, rotate, and combine multiple photos into one PDF. Client-side, fast, private.",
    url: "https://anyfileconverter.online/tools/jpg-to-pdf",
    siteName: "AnyFileConverter",
    type: "article",
    locale: "en_US",
    images: [
      {
        url: "https://anyfileconverter.online/og-jpg-to-pdf.png",
        width: 1200,
        height: 630,
        alt: "JPG to PDF Converter Preview",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "JPG to PDF Converter — Free Online Tool",
    description: "Convert JPG, JPEG, and PNG images to PDF instantly. Works on all devices. No upload required.",
    images: ["https://anyfileconverter.online/og-jpg-to-pdf.png"],
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "SoftwareApplication",
      "@id": "https://anyfileconverter.online/tools/jpg-to-pdf#app",
      name: "JPG to PDF Converter",
      applicationCategory: "FileConverter",
      operatingSystem: "Web",
      url: "https://anyfileconverter.online/tools/jpg-to-pdf",
      description:
        "Convert JPG, JPEG, and PNG images to PDF instantly. Reorder, rotate, and merge multiple images into one PDF. 100% private and processed in your browser.",
      offers: {
        "@type": "Offer",
        price: "0",
        priceCurrency: "USD",
      },
    },
    {
      "@type": "WebApplication",
      "@id": "https://anyfileconverter.online/tools/jpg-to-pdf#webapp",
      name: "JPG to PDF Converter",
      description:
        "Convert JPG, JPEG, and PNG images to PDF with reorder, rotate, merge and compression options. Fast client-side conversion.",
      url: "https://anyfileconverter.online/tools/jpg-to-pdf",
      applicationCategory: "Utility",
      offers: {
        "@type": "Offer",
        price: "0",
        priceCurrency: "USD",
      },
    },
    {
      "@type": "FAQPage",
      "@id": "https://anyfileconverter.online/tools/jpg-to-pdf#faq",
      mainEntity: [
        {
          "@type": "Question",
          name: "Is my data uploaded when converting JPG to PDF?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "No. All conversions are processed inside your browser using client-side technology. Your files are never uploaded unless you explicitly opt-in for server features.",
          },
        },
        {
          "@type": "Question",
          name: "Which image formats are supported?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "JPG, JPEG, and PNG images are supported, plus most common web photo formats.",
          },
        },
        {
          "@type": "Question",
          name: "Can I combine multiple images into a single PDF?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Yes. Upload multiple images, reorder them, rotate if needed, and convert them all into one PDF file.",
          },
        },
      ],
    },
  ],
};

export default function ToolPage() {
  return (
    <>
      <main className="max-w-4xl mx-auto px-4 py-10">
        <nav aria-label="Breadcrumb" className="text-sm mb-3 text-slate-600">
          <Link href="/">Home</Link> {" / "} <Link href="/tools">Tools</Link> {" / "} JPG to PDF
        </nav>

        <header className="mb-4">
          <h1 className="text-3xl font-semibold leading-tight">JPG to PDF Converter Tool</h1>
          <p className="text-gray-600 mt-2">
            Drag &amp; drop JPG/PNG files, reorder, and convert to a single PDF document instantly — all in your browser.
          </p>
        </header>

        {/* Primary ad slot (non-intrusive) */}
        <div className="mt-4 flex justify-center">
          <AdPlaceholder />
        </div>

        {/* Converter UI */}
        <div className="mt-4 bg-white rounded-lg p-4 shadow-sm border border-slate-100">
          <DropzoneClient />
        </div>

        {/* Secondary ad slot (kept away from primary actions) */}
        <div className="mt-6 flex justify-center">
          <AdPlaceholder />
        </div>

        <article className="prose prose-lg mt-8">
          <h2>How to Use the JPG to PDF Converter</h2>
          <p>
            Our tool makes it simple to convert your JPG images to PDF format. The process is intuitive and requires just a few clicks.
            All conversion happens directly in your browser (client-side) unless you opt-in to server-side features.
          </p>

          <h3>Step-by-Step Instructions</h3>
          <ol>
            <li><strong>Upload Images:</strong> Drag &amp; drop JPG or PNG files into the converter area, or click to browse.</li>
            <li><strong>Preview:</strong> Thumbnails appear so you can confirm the images.</li>
            <li><strong>Reorder:</strong> Drag thumbnails to set page order.</li>
            <li><strong>Remove:</strong> Exclude unwanted images using the Remove button.</li>
            <li><strong>Convert:</strong> Click Convert and wait for the short finalization step.</li>
            <li><strong>Download / Share:</strong> Download the PDF or use the Share button on mobile (Web Share API).</li>
          </ol>

          <h3>Converter Features</h3>
          <ul>
            <li>Multiple image support (batch convert)</li>
            <li>Drag &amp; drop reordering</li>
            <li>Page size options (A4, Letter)</li>
            <li>Quality control for smaller PDFs</li>
            <li>Orientation detection</li>
            <li>Instant download — no signup</li>
          </ul>

          <h3>Why Choose Our Tool?</h3>
          <p>
            Privacy-first client-side conversion, lightweight UI for fast performance, and clear instructions for mobile sharing.
            We never upload your files unless you explicitly choose server sharing features.
          </p>

          <h3>Common Uses &amp; Tips</h3>
          <ul>
            <li>Combine scanned pages into one PDF for submission</li>
            <li>Prepare images for printing</li>
            <li>Save receipts, invoices, and documents as PDFs</li>
            <li>Use medium-size photos for best file size/quality balance</li>
          </ul>
        </article>

        {/* Content-area ad (mid-article) */}
        <div className="mt-8 flex justify-center">
          <AdPlaceholder />
        </div>
      </main>

      {/* Structured data for SEO */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
    </>
  );
}
