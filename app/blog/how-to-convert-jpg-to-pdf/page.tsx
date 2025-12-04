import type { Metadata } from "next";
import AdPlaceholder from "../../../components/AdPlaceholder";
import Link from "next/link";

export const metadata: Metadata = {
  title: "How to Convert JPG to PDF — Step-by-Step Guide",
  description:
    "Learn how to convert JPG to PDF using a fast, secure, privacy-first online tool. Works on mobile and desktop, no login required.",
  alternates: {
    canonical: "https://anyfileconverter.online/blog/how-to-convert-jpg-to-pdf",
  },
  openGraph: {
    title: "How to Convert JPG to PDF — Step-by-Step Guide",
    description:
      "Convert JPG to PDF for free using our fast, secure tool. No uploads required — fully client-side.",
    type: "article",
    url: "https://anyfileconverter.online/blog/how-to-convert-jpg-to-pdf",
    images: [
      {
        url: "https://anyfileconverter.online/og-tools.png",
        width: 1200,
        height: 630,
        alt: "JPG to PDF Converter Preview",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "JPG to PDF Converter — Free Online Tool",
    description:
      "Convert JPG and PNG images to PDF instantly. 100% private, secure, and performed inside your browser.",
    images: ["https://anyfileconverter.online/og-tools.png"],
  },
};

export default function Page() {
  const jsonLdArticle = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: "How to Convert JPG to PDF — Step-by-Step Guide",
    description:
      "Step-by-step instructions for converting JPG images to PDF using a free, privacy-first online tool.",
    author: {
      "@type": "Organization",
      name: "AnyFileConverter",
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": "https://anyfileconverter.online/blog/how-to-convert-jpg-to-pdf",
    },
    publisher: {
      "@type": "Organization",
      name: "AnyFileConverter",
      logo: {
        "@type": "ImageObject",
        url: "https://anyfileconverter.online/logo.png",
      },
    },
    datePublished: "2025-12-01",
  };

  const jsonLdFAQ = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "Is this JPG to PDF tool free?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes — the JPG to PDF converter is completely free to use with no limits.",
        },
      },
      {
        "@type": "Question",
        name: "Are my images uploaded to the server?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "No — all conversions run client-side in your browser. Your files never leave your device.",
        },
      },
      {
        "@type": "Question",
        name: "Can I combine multiple JPGs into one PDF?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes — upload multiple images, reorder them, and convert into a single PDF document.",
        },
      },
    ],
  };

  return (
    <main className="max-w-4xl mx-auto px-4 py-10 prose prose-lg">
      {/* JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdArticle) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdFAQ) }}
      />

      <h1>How to Convert JPG to PDF (Step-by-Step Guide)</h1>

      <p className="text-gray-600">
        The simplest way to turn images into a clean, share-ready PDF file —
        completely free, private, and mobile-friendly.
      </p>

      {/* CTA Button */}
      <div className="mt-4 mb-4">
        <Link href="/tools/jpg-to-pdf">
          <button className="btn px-4 py-2 rounded-lg text-white font-medium">
            Open JPG → PDF Converter
          </button>
        </Link>
      </div>

      <h2>Why Convert JPG to PDF?</h2>
      <p>
        JPG images are great for viewing, but PDFs are preferred for official submissions,
        printing, and sharing multi-page documents. PDF preserves layout, maintains quality,
        and ensures compatibility across devices.
      </p>

      <h2>How to Convert JPG to PDF Online</h2>
      <ol>
        <li>
          Open the converter:{" "}
          <Link href="/tools/jpg-to-pdf" className="text-sky-700 font-medium">
            /tools/jpg-to-pdf
          </Link>
        </li>
        <li>Upload your JPG or PNG images (drag & drop supported).</li>
        <li>Optional: Upload multiple images and reorder them.</li>
        <li>Click “Convert to PDF” and download your file instantly.</li>
      </ol>

      <h2>What Makes Our Tool Better?</h2>
      <ul>
        <li>100% free — no hidden fees</li>
        <li>No login or signup required</li>
        <li>Fully client-side, privacy-first conversion</li>
        <li>Works on mobile, desktop, and tablets</li>
        <li>Merge multiple JPGs into a single PDF</li>
      </ul>

      {/* Highlight Tip Box */}
      <div className="bg-yellow-50 border-l-4 border-yellow-300 p-4 rounded-md my-6">
        <strong>Tip:</strong> For best results, use bright, well-lit images or clear document scans.
      </div>

      <h2>Convert on Mobile (Android & iPhone)</h2>
      <p>
        You can convert images to PDF easily from your phone. Open the tool in Chrome (Android)
        or Safari (iPhone), choose images from your gallery, convert, and download — no app needed.
      </p>

      <h2>Tips for High-Quality PDFs</h2>
      <ul>
        <li>Use medium-sized images to avoid extremely large PDF files.</li>
        <li>Straighten and crop your document images before converting.</li>
        <li>Combine all pages into a single PDF for easier sharing.</li>
      </ul>

      <h2>FAQ</h2>

      <div className="space-y-3">
        <details className="bg-white border border-slate-200 rounded-lg p-4">
          <summary className="cursor-pointer list-none font-medium">
            Is this tool free?
          </summary>
          <p className="mt-2 text-gray-700 text-sm">
            Yes — completely free with no limits or signups.
          </p>
        </details>

        <details className="bg-white border border-slate-200 rounded-lg p-4">
          <summary className="cursor-pointer list-none font-medium">
            Do you upload my files?
          </summary>
          <p className="mt-2 text-gray-700 text-sm">
            No files are uploaded. Everything is processed on your device.
          </p>
        </details>

        <details className="bg-white border border-slate-200 rounded-lg p-4">
          <summary className="cursor-pointer list-none font-medium">
            Can I combine multiple JPGs?
          </summary>
          <p className="mt-2 text-gray-700 text-sm">
            Yes — upload as many images as you want and reorder them before converting.
          </p>
        </details>
      </div>

      <div className="mt-8">
        <AdPlaceholder />
      </div>
    </main>
  );
}
