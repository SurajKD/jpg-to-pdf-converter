// app/page.tsx
import Link from "next/link";
import type { Metadata } from "next";
import { OpenConverterButton } from "../components/OpenConvertButton";
import dynamic from "next/dynamic";
import React from "react";

const AdPlaceholder = dynamic(() => import("../components/AdPlaceholder"), {
  ssr: false,
  loading: () => <div style={{ height: 90 }} />,
});

export const metadata: Metadata = {
  title: "Free JPG to PDF Converter Online | Fast & Secure",
  description:
    "Convert JPG to PDF online, reorder images, rotate pages, and adjust margins. Easy, fast, and completely free—works on mobile and desktop.",
  keywords: ["jpg to pdf", "image to pdf", "convert jpg to pdf online", "free pdf converter"],
  alternates: {
    canonical: "https://anyfileconverter.online",
  },
  openGraph: {
    title: "Free JPG to PDF Converter Online | Fast & Secure",
    description:
      "Convert JPG to PDF online, reorder images, rotate pages, and adjust margins. Easy, fast, and completely free—works on mobile and desktop.",
    url: "https://anyfileconverter.online",
    siteName: "AnyFileConverter",
    locale: "en_US",
    type: "website",
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
    description:
      "Convert JPG to PDF online, reorder images, rotate pages, and adjust margins. Easy, fast, and completely free—works on mobile and desktop.",
    images: ["https://anyfileconverter.online/og-jpg-to-pdf.png"],
  },
};

const combinedJsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": "https://anyfileconverter.online/#org",
      name: "AnyFileConverter",
      url: "https://anyfileconverter.online",
      logo: "https://anyfileconverter.online/path-to-your-logo.png",
      sameAs: [
        // fill with absolute urls to social profiles if available
      ],
      contactPoint: [
        {
          "@type": "ContactPoint",
          contactType: "customer support",
          email: "support@anyfileconverter.online",
        },
      ],
    },
    {
      "@type": "WebSite",
      "@id": "https://anyfileconverter.online/#website",
      url: "https://anyfileconverter.online",
      name: "AnyFileConverter",
      description:
        "Privacy-first online file conversion tools. Convert JPG to PDF, compress PDFs and more — directly in your browser.",
      publisher: { "@id": "https://anyfileconverter.online/#org" },
      potentialAction: {
        "@type": "SearchAction",
        target: "https://anyfileconverter.online/?q={search_term_string}",
        "query-input": "required name=search_term_string",
      },
    },
    {
      "@type": "BreadcrumbList",
      "@id": "https://anyfileconverter.online/#breadcrumbs",
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
      ],
    },
    {
      "@type": "SoftwareApplication",
      "@id": "https://anyfileconverter.online/tools/jpg-to-pdf#app",
      name: "JPG to PDF Converter",
      url: "https://anyfileconverter.online/tools/jpg-to-pdf",
      applicationCategory: "FileConverter",
      operatingSystem: "Web",
      description:
        "Convert JPG and PNG images to a single PDF file directly in your browser. No upload — conversions happen locally.",
      offers: {
        "@type": "Offer",
        price: "0",
        priceCurrency: "USD",
      },
    },
    {
      "@type": "SoftwareApplication",
      "@id": "https://anyfileconverter.online/tools/pdf-compressor#app",
      name: "PDF Compressor",
      url: "https://anyfileconverter.online/tools/pdf-compressor",
      applicationCategory: "FileConverter",
      operatingSystem: "Web",
      description:
        "Reduce PDF file size without uploading — compression runs inside the browser to maintain privacy.",
      offers: {
        "@type": "Offer",
        price: "0",
        priceCurrency: "USD",
      },
    },
    {
      "@type": "WebApplication",
      "@id": "https://anyfileconverter.online/#webapp",
      name: "JPG to PDF Converter",
      description:
        "Convert JPG to PDF online, reorder images, rotate pages, and adjust margins. Easy, fast, and completely free—works on mobile and desktop.",
      url: "https://anyfileconverter.online",
      applicationCategory: "Utility",
      offers: {
        "@type": "Offer",
        price: "0",
        priceCurrency: "USD",
      },
    },
    {
      "@type": "FAQPage",
      "@id": "https://anyfileconverter.online/#faq",
      mainEntity: [
        {
          "@type": "Question",
          name: "Is my data secure?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Yes. All processing happens on your device by default. We don't store or upload files unless you choose to use server-side features.",
          },
        },
        {
          "@type": "Question",
          name: "What file formats are supported?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "We support JPG, JPEG, and PNG image formats.",
          },
        },
        {
          "@type": "Question",
          name: "Do I need an account?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "No account or registration is required. Convert and download immediately.",
          },
        },
      ],
    },
  ],
};

export default function Home() {
  return (
    <>
      <section>
        <h1>Convert JPG to PDF — Fast, Secure & Free</h1>
        <p className="small">Client-side conversion. Your files never leave your browser by default.</p>

        <div style={{ marginTop: 20 }}>
          <Link href="/tools/jpg-to-pdf" aria-label="Open JPG to PDF converter">
            <OpenConverterButton name="Open JPG → PDF Converter" />
          </Link>
        </div>
        <div style={{ marginTop: 12 }}>
          <AdPlaceholder />
        </div>

        <article style={{ marginTop: 32, lineHeight: 1.6 }}>
          <h2>Why Choose Our JPG to PDF Converter?</h2>
          <p>
            Converting JPG images to PDF has never been easier. Our free online converter allows you to transform your image files into professional PDF documents in seconds. Whether you need to combine multiple photos into a single PDF, create a photo album, or prepare images for printing, our tool handles it all effortlessly.
          </p>

          <h3>Key Features</h3>
          <ul style={{ marginLeft: 20 }}>
            <li><strong>100% Privacy:</strong> All conversion happens in your browser. Your images are never uploaded to our servers.</li>
            <li><strong>Fast Processing:</strong> Instant conversion without waiting or registration required.</li>
            <li><strong>Multiple Images:</strong> Convert and combine multiple JPG/PNG images into a single PDF.</li>
            <li><strong>Reorder Images:</strong> Drag and drop to arrange images before converting.</li>
            <li><strong>Customizable Format:</strong> Choose between A4, Letter, and other page sizes.</li>
            <li><strong>Quality Control:</strong> Adjust compression to balance file size and image quality.</li>
            <li><strong>Works Everywhere:</strong> Compatible with Windows, Mac, iPhone, Android, and any device with a web browser.</li>
          </ul>

          <h3>How to Convert JPG to PDF</h3>
          <ol style={{ marginLeft: 20 }}>
            <li>Click the "Open JPG → PDF Converter" button above</li>
            <li>Drag and drop your JPG or PNG images, or click to select files</li>
            <li>Reorder images if needed by dragging them</li>
            <li>Click "Convert to PDF" to create your document</li>
            <li>Download your PDF instantly to your device</li>
          </ol>

          <h3>Perfect For</h3>
          <p>
            Our converter is ideal for photographers, students, professionals, and anyone who needs to create PDFs from images. Use it to digitize documents, create photo books, prepare images for printing, or combine multiple scans into a single file.
          </p>

          <h3>Frequently Asked Questions</h3>
          <div id="faq" style={{ marginLeft: 20 }}>
            {/* Visible FAQ content must match the JSON-LD for eligibility */}
            <details>
              <summary><strong>Is my data secure?</strong></summary>
              <p>Yes. All processing happens on your device by default. We don't store, upload, or access your files unless you choose server-side features.</p>
            </details>

            <details>
              <summary><strong>What file formats are supported?</strong></summary>
              <p>We support JPG, JPEG, and PNG image formats.</p>
            </details>

            <details>
              <summary><strong>Do I need an account?</strong></summary>
              <p>No account or registration is required. Convert and download immediately.</p>
            </details>
          </div>
        </article>

        <div style={{ marginTop: 12 }}>
          <AdPlaceholder />
        </div>
      </section>

      {/* Combined JSON-LD (Organization, WebSite, Breadcrumbs, SoftwareApplication, WebApplication, FAQ) */}
      <script
        type="application/ld+json"
        // safe because combinedJsonLd is static JSON you control
        dangerouslySetInnerHTML={{ __html: JSON.stringify(combinedJsonLd) }}
      />
    </>
  );
}
