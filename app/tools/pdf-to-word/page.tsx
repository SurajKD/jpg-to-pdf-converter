// app/tools/pdf-to-word/page.tsx
import type { Metadata } from "next";
import dynamic from "next/dynamic";
import Link from "next/link";
import React from "react";

const PdfToWordClient = dynamic(
  () => import("../../../components/PdfToWordClient"),
  { ssr: false, loading: () => <div style={{ height: 200 }} /> }
);

const AdPlaceholder = dynamic(
  () => import("../../../components/AdPlaceholder"),
  { ssr: false, loading: () => <div style={{ height: 90 }} /> }
);

/* ─────────────────────────────────────────
   ✔ SEO METADATA
────────────────────────────────────────── */
export const metadata: Metadata = {
  title: "PDF to Word Converter — Free Online PDF → DOCX (Fast & Private)",
  description:
    "Convert PDF to Word (DOCX) online for free. Fast, accurate and privacy-first client-side conversion. Works on text PDFs, scanned PDFs, and image-based PDFs with high fidelity.",
  keywords: [
    "pdf to word",
    "convert pdf to word",
    "pdf to docx",
    "pdf to word online",
    "pdf converter",
    "convert pdf",
    "edit pdf in word",
    "free pdf to word converter",
  ],
  alternates: { canonical: "https://anyfileconverter.online/tools/pdf-to-word" },
  openGraph: {
    title: "PDF to Word Converter — Online & Free (No Upload Needed)",
    description:
      "Convert PDF files to editable DOCX documents directly in your browser. Fast, accurate, and secure.",
    url: "https://anyfileconverter.online/tools/pdf-to-word",
    siteName: "AnyFileConverter",
    type: "article",
    locale: "en_US",
    images: [
      {
        url: "https://anyfileconverter.online/og-pdf-to-word.jpg",
        width: 1200,
        height: 630,
        alt: "PDF to Word Converter Preview",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "PDF to Word — Free Online Converter",
    description:
      "Convert PDF documents to editable DOCX files instantly. Private client-side processing.",
    images: ["https://anyfileconverter.online/og-pdf-to-word.jpg"],
  },
};

/* ─────────────────────────────────────────
   ✔ Combined JSON-LD (SoftwareApp + WebApp + Breadcrumbs + FAQ)
────────────────────────────────────────── */
const pageJsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "SoftwareApplication",
      "@id": "https://anyfileconverter.online/tools/pdf-to-word#app",
      name: "PDF to Word Converter",
      description:
        "Convert PDFs into editable DOCX files directly in your browser. Fast, private and accurate.",
      applicationCategory: "FileConverter",
      operatingSystem: "Web",
      url: "https://anyfileconverter.online/tools/pdf-to-word",
      offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
    },
    {
      "@type": "WebApplication",
      "@id": "https://anyfileconverter.online/tools/pdf-to-word#webapp",
      name: "PDF to Word Converter",
      description:
        "Free online tool to convert PDF files into Word (DOCX) documents. No upload required by default.",
      applicationCategory: "Utility",
      url: "https://anyfileconverter.online/tools/pdf-to-word",
      offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
    },
    {
      "@type": "BreadcrumbList",
      "@id": "https://anyfileconverter.online/tools/pdf-to-word#breadcrumbs",
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: "Home",
          item: "https://anyfileconverter.online/",
        },
        {
          "@type": "ListItem",
          position: 2,
          name: "Tools",
          item: "https://anyfileconverter.online/tools",
        },
        {
          "@type": "ListItem",
          position: 3,
          name: "PDF to Word",
          item: "https://anyfileconverter.online/tools/pdf-to-word",
        },
      ],
    },
    {
      "@type": "FAQPage",
      "@id": "https://anyfileconverter.online/tools/pdf-to-word#faq",
      mainEntity: [
        {
          "@type": "Question",
          name: "Is my PDF uploaded to your servers?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "No. Conversion is performed client-side in your browser unless you explicitly enable server-based OCR.",
          },
        },
        {
          "@type": "Question",
          name: "Does this work for scanned PDFs?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Yes, but scanned/image PDFs may require OCR for editable text output.",
          },
        },
        {
          "@type": "Question",
          name: "Will formatting be preserved?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Most PDF layouts—including paragraphs, headings and images—convert accurately. Complex formatting may vary slightly.",
          },
        },
        {
          "@type": "Question",
          name: "Do I need an account or subscription?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "No sign-up required. The PDF to Word converter is completely free to use.",
          },
        },
      ],
    },
  ],
};

/* ─────────────────────────────────────────
   ✔ PAGE COMPONENT
────────────────────────────────────────── */
export default function PdfToWordPage() {
  return (
    <>
      <main
        style={{
          padding: 24,
          maxWidth: 900,
          margin: "0 auto",
          lineHeight: 1.7,
        }}
      >
        {/* Breadcrumb */}
        <nav aria-label="Breadcrumb" style={{ marginBottom: 12 }}>
          <Link href="/">Home</Link> {" / "}
          <Link href="/tools">Tools</Link> {" / "}
          PDF to Word
        </nav>

        {/* Header */}
        <h1>PDF → Word (DOCX) — Free & Accurate Conversion</h1>
        <p style={{ color: "#555" }}>
          Convert your PDF files into fully editable Word documents (DOCX). Fast,
          accurate and privacy-first. No upload required unless you enable OCR
          for scanned PDFs.
        </p>

        {/* Tool UI */}
        <section style={{ marginTop: 20 }}>
          <PdfToWordClient />
        </section>

        <div style={{ marginTop: 20 }}>
          <AdPlaceholder />
        </div>

        {/* SEO Content */}
        <article style={{ marginTop: 32 }}>
          <h2>How the PDF to Word Converter Works</h2>
          <ol style={{ marginLeft: 20 }}>
            <li>
              <strong>Upload your PDF</strong> — drag & drop or select a file.
            </li>
            <li>
              <strong>Process the PDF</strong> — detects text, layout, images,
              tables and paragraphs.
            </li>
            <li>
              <strong>Convert to DOCX</strong> — formatting is preserved as
              closely as possible.
            </li>
            <li>
              <strong>Download your Word file</strong> — open in Microsoft Word,
              Google Docs, or Apple Pages.
            </li>
          </ol>

          <h2>Why Choose This PDF → Word Tool?</h2>
          <ul style={{ marginLeft: 20 }}>
            <li>
              <strong>Private:</strong> Conversion happens entirely in your
              browser unless OCR is enabled.
            </li>
            <li>
              <strong>Accurate:</strong> Preserves paragraphs, spacing, fonts,
              bold/italic text, and images.
            </li>
            <li>
              <strong>Free:</strong> No signup, no limits.
            </li>
            <li>
              <strong>Universal:</strong> Works on phones, laptops and tablets.
            </li>
          </ul>

          <h2>Frequently Asked Questions</h2>

          <details>
            <summary>
              <strong>Is my PDF uploaded to your servers?</strong>
            </summary>
            <p>
              No. Conversion happens in your browser unless you enable
              server-based OCR for scanned PDFs.
            </p>
          </details>

          <details>
            <summary>
              <strong>Does this work for scanned PDFs?</strong>
            </summary>
            <p>
              Yes — but scanned/image PDFs require OCR to become editable. OCR
              mode is optional.
            </p>
          </details>

          <details>
            <summary>
              <strong>Will formatting be preserved?</strong>
            </summary>
            <p>
              Most formatting converts accurately including images and layout.
              Very complex PDFs may vary slightly.
            </p>
          </details>

          <details>
            <summary>
              <strong>Do I need an account?</strong>
            </summary>
            <p>No — the tool is completely free to use.</p>
          </details>
        </article>

        <div style={{ marginTop: 24 }}>
          <AdPlaceholder />
        </div>
      </main>

      {/* JSON-LD Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(pageJsonLd) }}
      />
    </>
  );
}
