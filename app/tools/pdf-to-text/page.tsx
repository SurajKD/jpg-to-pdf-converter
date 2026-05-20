import type { Metadata } from "next"
import dynamic from "next/dynamic"
import Link from "next/link"
import React from "react"

const PdfToTextClient = dynamic(
  () => import("../../../components/PdfToTextClient"),
  { ssr: false, loading: () => <div className="h-48" /> }
)

const AdPlaceholder = dynamic(
  () => import("../../../components/AdPlaceholder"),
  { ssr: false, loading: () => <div className="h-24" /> }
)

export const metadata: Metadata = {
  title: "PDF to Text Converter — Extract Text from PDF Online (Free)",
  description:
    "Extract text from PDF files online for free. Convert PDF pages into editable plain text fast and privately in your browser.",
  keywords: [
    "pdf to text",
    "extract text from pdf",
    "pdf text extractor",
    "pdf to txt",
    "pdf text online",
    "free pdf to text",
  ],
  alternates: { canonical: "https://anyfileconverter.online/tools/pdf-to-text" },
  openGraph: {
    title: "PDF to Text Converter — Free Online Tool",
    description:
      "Extract text from PDF files in your browser. Fast, private, and free — no uploads required by default.",
    url: "https://anyfileconverter.online/tools/pdf-to-text",
    siteName: "AnyFileConverter",
    type: "website",
    locale: "en_US",
    images: [
      {
        url: "https://anyfileconverter.online/og-pdf-to-text.jpg",
        width: 1200,
        height: 630,
        alt: "PDF to Text Converter Preview",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "PDF to Text Converter — Free Online Tool",
    description:
      "Extract text from PDF documents directly in your browser. Private and easy to use.",
    images: ["https://anyfileconverter.online/og-pdf-to-text.jpg"],
  },
}

const pageJsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "SoftwareApplication",
      "@id": "https://anyfileconverter.online/tools/pdf-to-text#app",
      name: "PDF to Text Converter",
      applicationCategory: "FileConverter",
      operatingSystem: "Web",
      url: "https://anyfileconverter.online/tools/pdf-to-text",
      description:
        "Extract text from PDF files directly in your browser. Fast, private, and free.",
      offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
    },
    {
      "@type": "WebApplication",
      "@id": "https://anyfileconverter.online/tools/pdf-to-text#webapp",
      name: "PDF to Text Converter",
      url: "https://anyfileconverter.online/tools/pdf-to-text",
      description:
        "Browser-based PDF text extraction tool that converts PDF pages into plain text.",
      applicationCategory: "Utility",
      offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
    },
    {
      "@type": "BreadcrumbList",
      "@id": "https://anyfileconverter.online/tools/pdf-to-text#breadcrumbs",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: "https://anyfileconverter.online/" },
        { "@type": "ListItem", position: 2, name: "Tools", item: "https://anyfileconverter.online/tools" },
        { "@type": "ListItem", position: 3, name: "PDF to Text", item: "https://anyfileconverter.online/tools/pdf-to-text" },
      ],
    },
    {
      "@type": "FAQPage",
      "@id": "https://anyfileconverter.online/tools/pdf-to-text#faq",
      mainEntity: [
        {
          "@type": "Question",
          name: "Can I extract text from PDF files for free?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Yes — this tool extracts text from PDFs in your browser for free, with no signup required.",
          },
        },
        {
          "@type": "Question",
          name: "Is my PDF uploaded to a server?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "No. Text extraction happens locally in your browser unless you explicitly use a cloud feature.",
          },
        },
        {
          "@type": "Question",
          name: "What file formats are supported?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "This tool supports PDF files and converts them to plain text (.txt).",
          },
        },
      ],
    },
  ],
}

export default function PdfToTextPage() {
  return (
    <>
      <main className="max-w-4xl mx-auto px-4 py-10">
        <nav aria-label="Breadcrumb" className="text-sm mb-3 text-slate-600">
          <Link href="/">Home</Link> {" / "}
          <Link href="/tools">Tools</Link> {" / "}
          PDF to Text
        </nav>

        <header className="mb-4">
          <h1 className="text-3xl font-semibold leading-tight">PDF to Text Converter — Extract PDF Text Online</h1>
          <p className="text-gray-600 mt-2">
            Convert PDF pages to plain text quickly and privately in your browser. Download a .txt file or copy extracted text instantly.
          </p>
        </header>

        <section className="mt-4">
          <div className="bg-white rounded-lg p-4 shadow-sm border border-slate-100">
            <PdfToTextClient />
          </div>
        </section>

        <div className="mt-6 flex justify-center">
          <AdPlaceholder />
        </div>

        <article className="prose prose-lg mt-8">
          <h2>How to extract text from a PDF</h2>
          <ol>
            <li>Upload or drag & drop your PDF file.</li>
            <li>Wait while the browser extracts the text from the document.</li>
            <li>Download the result as a .txt file or copy it directly.</li>
          </ol>

          <h2>Why use this PDF to Text tool?</h2>
          <ul>
            <li><strong>Private:</strong> Extracts text locally in your browser by default.</li>
            <li><strong>Fast:</strong> No file uploads or server waiting.</li>
            <li><strong>Free:</strong> No signup and no hidden limits.</li>
            <li><strong>Simple:</strong> Clean interface for one task.</li>
          </ul>

          <h2>Common use cases</h2>
          <ul>
            <li>Copy the text from reports, contracts, and invoices.</li>
            <li>Import PDF text into note-taking apps or word processors.</li>
            <li>Extract searchable text for research and editing.</li>
          </ul>

          <h2>Frequently Asked Questions</h2>
          <details>
            <summary><strong>Will my PDF be uploaded?</strong></summary>
            <p>No — text extraction happens in your browser unless you explicitly choose a cloud feature.</p>
          </details>
          <details>
            <summary><strong>Does this work for scanned PDFs?</strong></summary>
            <p>Scanned PDFs may not extract text reliably without OCR. This tool works best for native PDFs with embedded text.</p>
          </details>
          <details>
            <summary><strong>What format is the output?</strong></summary>
            <p>The result is plain text (.txt), which you can open in Notepad, Word, or any text editor.</p>
          </details>
        </article>

        <div className="mt-8 flex justify-center">
          <AdPlaceholder />
        </div>
      </main>

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(pageJsonLd) }} />
    </>
  )
}
