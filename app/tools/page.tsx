// app/tools/page.tsx
import type { Metadata } from "next";
import Link from "next/link";
import React from "react";

export const metadata: Metadata = {
  title: "Tools — AnyFileConverter (JPG→PDF, Compress, Image Tools & More)",
  description:
    "All tools from AnyFileConverter: JPG→PDF, Compress PDF, Image Compressor, PDF→Word and more. Fast, private and browser-first utilities.",
  keywords: [
    "jpg to pdf",
    "pdf compressor",
    "image compressor",
    "pdf to word",
    "online file tools",
    "anyfileconverter",
  ],
  alternates: { canonical: "https://anyfileconverter.online/tools" },
  openGraph: {
    title: "AnyFileConverter — Useful Browser Tools for Files & PDFs",
    description:
      "Quick, privacy-first file tools: JPG→PDF, Compress PDF, Image Compressor, PDF→Word and more.",
    url: "https://anyfileconverter.online/tools",
    siteName: "AnyFileConverter",
    type: "website",
    images: [
      {
        url: "https://anyfileconverter.online/og-tools.png",
        width: 1200,
        height: 630,
        alt: "AnyFileConverter tools preview",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "AnyFileConverter — File & PDF Tools",
    description:
      "Fast, private, browser-first converters and utilities. No accounts, no uploads by default.",
    images: ["https://anyfileconverter.online/og-tools.png"],
  },
};

const tools = [
  {
    id: "jpg-to-pdf",
    title: "JPG → PDF",
    href: "/tools/jpg-to-pdf",
    short:
      "Combine JPG/PNG/WebP images into a single PDF. Drag, reorder, and download — all in your browser.",
    features: ["Client-side", "Drag & drop", "Reorder pages"],
  },
  {
    id: "compress-pdf",
    title: "Compress PDF",
    href: "/tools/compress-pdf",
    short:
      "Reduce PDF file size while keeping readable quality. Ideal for email and uploads. Browser-first compression.",
    features: ["Balanced / Max presets", "No upload by default", "Progress reporting"],
  },
  {
    id: "image-compressor",
    title: "Image Compressor",
    href: "/tools/image-compressor",
    short:
      "Shrink JPG, PNG and WebP images with adjustable quality and preview before download.",
    features: ["Lossy & WebP", "Batch compression", "Preview & download"],
  },
  {
    id: "pdf-to-word",
    title: "PDF → Word",
    href: "/tools/pdf-to-word",
    short:
      "Convert text-based PDFs to editable Word (.docx) files in your browser. Best for native/text PDFs.",
    features: ["Client-side extraction", "Quick .docx download", "Preview"],
  },
];

const pageJsonLd = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  name: "AnyFileConverter Tools",
  description: "Listing of useful file and PDF tools on AnyFileConverter",
  url: "https://anyfileconverter.online/tools",
  itemListElement: tools.map((t, i) => ({
    "@type": "ListItem",
    position: i + 1,
    item: {
      "@type": "WebPage",
      name: t.title,
      url: `https://anyfileconverter.online${t.href}`,
      description: t.short,
    },
  })),
};

export default function ToolsIndexPage() {
  return (
    <>
      <main className="max-w-4xl mx-auto px-4 py-10">
        <nav aria-label="Breadcrumb" className="text-sm mb-3 text-slate-600">
          <Link href="/">Home</Link> {" / "} <span>Tools</span>
        </nav>

        <header className="mb-6">
          <h1 className="text-3xl font-semibold leading-tight">Tools</h1>
          <p className="mt-2 text-gray-600 max-w-prose">
            Fast, privacy-first browser tools for common file tasks. No signup required — most tools run directly in your browser so your files stay on your device unless you choose to upload.
          </p>
        </header>

        <section aria-labelledby="all-tools">
          <div className="grid gap-6 grid-cols-1 sm:grid-cols-2">
            {tools.map((t) => (
              <article
                key={t.id}
                className="bg-white rounded-lg p-5 border border-slate-100 shadow-sm hover:shadow-md transition"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="min-w-0">
                    <h3 className="text-lg font-semibold leading-tight">{t.title}</h3>
                    <p className="mt-2 text-sm text-gray-700">{t.short}</p>
                  </div>

                  <div className="flex items-start">
                    <Link href={t.href} aria-label={`Open ${t.title}`}>
                      <span className="btn inline-block">Open</span>
                    </Link>
                  </div>
                </div>

                <ul className="mt-4 ml-5 text-sm text-slate-600 space-y-1">
                  {t.features.map((f) => (
                    <li key={f}>&#8226;&nbsp;{f}</li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </section>

        <section className="mt-8">
          <h2 className="text-2xl font-semibold">Why choose AnyFileConverter?</h2>
          <ul className="mt-3 ml-5 text-gray-700 space-y-2">
            <li><strong>Privacy-first:</strong> Most processing happens locally in your browser.</li>
            <li><strong>No signup:</strong> Instant tools — convert and download without accounts.</li>
            <li><strong>Lightweight:</strong> Fast interfaces designed to work on mobile and desktop.</li>
            <li><strong>AdSense-friendly pages:</strong> Clear Trust & Legal pages to help with approval.</li>
          </ul>
        </section>

        <section className="mt-8">
          <h2 className="text-2xl font-semibold">Frequently asked</h2>

          <div className="mt-4 space-y-4 text-gray-700">
            <div>
              <h3 className="text-base font-medium">Are files uploaded?</h3>
              <p className="mt-1">By default, files are processed in your browser and are not uploaded to our servers. Any optional sharing or cloud features will be clearly labelled and opt-in.</p>
            </div>

            <div>
              <h3 className="text-base font-medium">Can I use these on mobile?</h3>
              <p className="mt-1">Yes — all tools are designed to work on modern mobile browsers. Performance depends on device memory for very large files.</p>
            </div>
          </div>
        </section>
      </main>

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(pageJsonLd) }} />
    </>
  );
}
