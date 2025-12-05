// app/tools/merge-pdf/page.tsx
import type { Metadata } from "next";
import dynamic from "next/dynamic";
import Link from "next/link";
import React from "react";

const MergePdfClient = dynamic(
  () => import("../../../components/MergePdfClient"),
  { ssr: false, loading: () => <div className="h-48" /> }
);

const AdPlaceholder = dynamic(
  () => import("../../../components/AdPlaceholder"),
  { ssr: false, loading: () => <div className="h-24" /> }
);

/* SEO METADATA */
export const metadata: Metadata = {
  title: "Merge PDF — Combine Multiple PDFs Online (Client-side, Private)",
  description:
    "Merge multiple PDF files into one single PDF. Fast, private client-side merging — no upload required. Reorder files and download the merged document.",
  keywords: [
    "merge pdf",
    "combine pdf",
    "pdf merge online",
    "merge pdf files",
    "combine pdf files",
    "pdf tools",
    "pdf converter",
  ],
  alternates: { canonical: "https://anyfileconverter.online/tools/merge-pdf" },
  openGraph: {
    title: "Merge PDF — Combine PDFs Online & Free",
    description:
      "Combine multiple PDFs into one file directly in your browser. Private, fast and free — no server uploads by default.",
    url: "https://anyfileconverter.online/tools/merge-pdf",
    siteName: "AnyFileConverter",
    type: "article",
    locale: "en_US",
    images: [
      {
        url: "https://anyfileconverter.online/og-merge-pdf.jpg",
        width: 1200,
        height: 630,
        alt: "Merge PDF Preview",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Merge PDF — Free Online Tool",
    description: "Merge multiple PDF files into one single PDF. Private client-side merging.",
    images: ["https://anyfileconverter.online/og-merge-pdf.jpg"],
  },
};

/* Combined JSON-LD (SoftwareApp + WebApp + Breadcrumbs + FAQ) */
const pageJsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "SoftwareApplication",
      "@id": "https://anyfileconverter.online/tools/merge-pdf#app",
      name: "Merge PDF",
      description:
        "Combine multiple PDF files into a single PDF directly in your browser. Reorder files and download the merged result. Client-side processing by default.",
      applicationCategory: "FileConverter",
      operatingSystem: "Web",
      url: "https://anyfileconverter.online/tools/merge-pdf",
      offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
    },
    {
      "@type": "WebApplication",
      "@id": "https://anyfileconverter.online/tools/merge-pdf#webapp",
      name: "Merge PDF",
      description:
        "Merge PDFs without uploading to a server — fast, private and free to use.",
      applicationCategory: "Utility",
      url: "https://anyfileconverter.online/tools/merge-pdf",
      offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
    },
    {
      "@type": "BreadcrumbList",
      "@id": "https://anyfileconverter.online/tools/merge-pdf#breadcrumbs",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: "https://anyfileconverter.online/" },
        { "@type": "ListItem", position: 2, name: "Tools", item: "https://anyfileconverter.online/tools" },
        { "@type": "ListItem", position: 3, name: "Merge PDF", item: "https://anyfileconverter.online/tools/merge-pdf" },
      ],
    },
    {
      "@type": "FAQPage",
      "@id": "https://anyfileconverter.online/tools/merge-pdf#faq",
      mainEntity: [
        {
          "@type": "Question",
          name: "Are my files uploaded to your servers?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "No — by default merging happens client-side in your browser. Files are not uploaded to our servers unless you explicitly use a server-based option.",
          },
        },
        {
          "@type": "Question",
          name: "Can I reorder files before merging?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Yes — you can reorder files (move up / move down) to control the merge order.",
          },
        },
        {
          "@type": "Question",
          name: "What if my PDFs are very large?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Large PDFs may consume significant memory in the browser. For very large files, consider using a server-side merge option.",
          },
        },
      ],
    },
  ],
};

export default function MergePdfPage() {
  return (
    <>
      <main className="max-w-4xl mx-auto px-4 py-10">
        {/* Breadcrumb */}
        <nav aria-label="Breadcrumb" className="text-sm mb-3 text-slate-600">
          <Link href="/">Home</Link> {" / "}
          <Link href="/tools">Tools</Link> {" / "}
          <span>Merge PDF</span>
        </nav>

        {/* Header */}
        <header className="mb-4">
          <h1 className="text-3xl font-semibold leading-tight">Merge PDF — Combine Multiple PDFs into One</h1>
          <p className="text-gray-600 mt-2">
            Upload multiple PDF files, reorder them, and merge into a single PDF — all in your browser.
            Fast, private and free.
          </p>
        </header>

        {/* Tool UI */}
        <section className="mt-4">
          <div className="bg-white rounded-lg p-4 shadow-sm border border-slate-100">
            <MergePdfClient />
          </div>
        </section>

        <div className="mt-6 flex justify-center">
          <AdPlaceholder />
        </div>

        {/* SEO Content */}
        <article className="prose prose-lg mt-8">
          <h2>How Merge PDF Works</h2>
          <ol>
            <li><strong>Add files</strong> — select multiple PDF files from your device.</li>
            <li><strong>Reorder</strong> — move files up/down to set the merge order.</li>
            <li><strong>Merge</strong> — click Merge &amp; Download to combine and save the resulting PDF.</li>
          </ol>

          <h2>Why use this Merge PDF tool?</h2>
          <ul>
            <li><strong>Private:</strong> Merging is performed client-side by default — your files stay on your device.</li>
            <li><strong>Simple:</strong> Reorder files and merge with one click.</li>
            <li><strong>Free:</strong> No signup or subscription required.</li>
          </ul>

          <h2>Frequently Asked Questions</h2>

          <details>
            <summary><strong>Will my PDFs be uploaded?</strong></summary>
            <p>No. By default, merging happens in your browser and files are not uploaded to our servers.</p>
          </details>

          <details>
            <summary><strong>Can I merge many files or very large PDFs?</strong></summary>
            <p>Yes, but very large files may cause high memory usage in the browser. For heavy use, a server-side merge is recommended.</p>
          </details>

          <details>
            <summary><strong>Is the merged PDF compatible with all PDF readers?</strong></summary>
            <p>Yes — the merged file is a standard PDF and should open in Adobe Reader, browser PDF viewers, mobile apps, and other PDF tools.</p>
          </details>
        </article>

        <div className="mt-8 flex justify-center">
          <AdPlaceholder />
        </div>
      </main>

      {/* JSON-LD Structured Data */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(pageJsonLd) }} />
    </>
  );
}
