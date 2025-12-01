import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "How to Convert JPG to PDF — Step-by-Step Guide",
  description:
    "Learn how to convert JPG to PDF quickly using our free online tool. Fast, privacy-first, mobile-friendly, no login required.",
  alternates: {
    canonical: "https://your-netlify-domain.netlify.app/blog/how-to-convert-jpg-to-pdf",
  },
  openGraph: {
    title: "How to Convert JPG to PDF — Step-by-Step Guide",
    description:
      "Convert JPG to PDF for free using our fast, privacy-first online converter. No signup, mobile-friendly.",
    type: "article",
    url: "https://your-netlify-domain.netlify.app/blog/how-to-convert-jpg-to-pdf",
    images: [
      {
        url: '/og-jpg-to-pdf.png',
        width: 1200,
        height: 630,
        alt: 'JPG to PDF Converter Preview',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'JPG to PDF Converter — Free Online Tool',
    description:
      'Convert JPG and PNG images to PDF instantly. Secure, private, browser-based conversion.',
    images: ['/og-jpg-to-pdf.png'],
  },
};

export default function Page() {
  const jsonLdArticle = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: "How to Convert JPG to PDF — Step-by-Step Guide",
    description:
      "Step-by-step guide to converting JPG images to PDF online using our free, privacy-first tool.",
    author: {
      "@type": "Organization",
      name: "JPG to PDF Converter",
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": "https://your-netlify-domain.netlify.app/blog/how-to-convert-jpg-to-pdf",
    },
    publisher: {
      "@type": "Organization",
      name: "JPG to PDF Converter",
      logo: {
        "@type": "ImageObject",
        url: "https://your-netlify-domain.netlify.app/logo.png",
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
          text: "Yes — the JPG to PDF converter is completely free to use.",
        },
      },
      {
        "@type": "Question",
        name: "Are my images uploaded to the server?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "No — conversion is done client-side. Your files never leave your device.",
        },
      },
      {
        "@type": "Question",
        name: "Can I combine multiple JPGs into one PDF?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes — upload multiple images, reorder them, and convert to a single PDF.",
        },
      },
    ],
  };

  return (
    <main style={{ padding: "24px", maxWidth: "900px", margin: "0 auto" }}>
      {/* JSON-LD Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdArticle) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdFAQ) }}
      />

      <h1 style={{ fontSize: "32px", marginBottom: "8px" }}>
        How to Convert JPG to PDF (Step-by-Step Guide)
      </h1>
      <p style={{ color: "#666", marginBottom: "20px" }}>
        The simplest way to turn images into a clean, share-ready PDF file —
        completely free and privacy-friendly.
      </p>

      <a
        href="/tools/jpg-to-pdf"
        style={{
          display: "inline-block",
          background: "#0b74de",
          color: "#fff",
          padding: "10px 16px",
          textDecoration: "none",
          borderRadius: "8px",
          marginBottom: "28px",
        }}
      >
        Open JPG → PDF Converter
      </a>

      <section>
        <h2 style={{ color: "#0b74de" }}>Why Convert JPG to PDF?</h2>
        <p>
          JPG images are great for viewing, but PDFs are preferred for official
          submissions, printing, and sharing multi-page documents. PDF preserves
          formatting, maintains quality, and is universally compatible.
        </p>

        <h2 style={{ color: "#0b74de" }}>How to Convert JPG to PDF Online</h2>
        <ol>
          <li>
            <strong>Open the converter</strong> at{" "}
            <a href="/tools/jpg-to-pdf">/tools/jpg-to-pdf</a>.
          </li>
          <li>
            <strong>Upload your JPG images</strong> (drag &amp; drop supported).
          </li>
          <li>
            <strong>Optional:</strong> Upload multiple images &amp; reorder them.
          </li>
          <li>
            <strong>Click “Convert to PDF”</strong> and download your file.
          </li>
        </ol>

        <h2 style={{ color: "#0b74de" }}>What Makes Our Tool Better?</h2>
        <ul>
          <li>100% free</li>
          <li>No login required</li>
          <li>Privacy-first: client-side conversion</li>
          <li>Mobile-friendly</li>
          <li>Merge multiple JPGs into one PDF</li>
        </ul>

        <div
          style={{
            background: "#fff8e6",
            borderLeft: "4px solid #ffd271",
            padding: "12px",
            borderRadius: "6px",
            margin: "20px 0",
          }}
        >
          <strong>Tip:</strong> Use clear, well-lit document images for better
          PDF output.
        </div>

        <h2 style={{ color: "#0b74de" }}>Convert on Mobile</h2>
        <p>
          Works on Android &amp; iPhone. Open the tool in your browser (Chrome
          or Safari), select images from gallery, convert, and download.
        </p>

        <h2 style={{ color: "#0b74de" }}>Tips for High-Quality PDFs</h2>
        <ul>
          <li>Use medium-sized images to avoid huge file sizes.</li>
          <li>Straighten and crop scanned pages.</li>
          <li>Combine all pages into one PDF for easy sharing.</li>
        </ul>

        <h2 style={{ color: "#0b74de" }}>FAQ</h2>

        <p>
          <strong>Is this tool free?</strong> Yes — totally free.
        </p>
        <p>
          <strong>Do you upload my files?</strong> No — everything processes on
          your own device.
        </p>
        <p>
          <strong>Can I combine multiple JPGs?</strong> Yes — upload and reorder
          as you like.
        </p>
      </section>
    </main>
  );
}
