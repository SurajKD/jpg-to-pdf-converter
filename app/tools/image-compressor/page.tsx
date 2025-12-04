// app/tools/image-compressor/page.tsx
import Link from "next/link";
import type { Metadata } from "next";
import dynamic from "next/dynamic";
import React from "react";

const ImageCompressorClient = dynamic(
  () => import("../../../components/ImageCompressorClient"),
  { ssr: false, loading: () => <div style={{ height: 200 }} /> }
);

const AdPlaceholder = dynamic(
  () => import("../../../components/AdPlaceholder"),
  { ssr: false, loading: () => <div style={{ height: 90 }} /> }
);

export const metadata: Metadata = {
  title: "Image Compressor — JPG/PNG/WebP Optimizer (Free & Private)",
  description:
    "Compress JPG, PNG and WebP images in your browser. Reduce upload times and storage with high-quality compression. No uploads by default — fast, private and free.",
  keywords: [
    "image compressor",
    "compress image online",
    "jpg compressor",
    "png compressor",
    "webp compressor",
    "reduce image size",
    "image optimizer",
  ],
  alternates: { canonical: "https://anyfileconverter.online/tools/image-compressor" },
  openGraph: {
    title: "Image Compressor — AnyFileConverter",
    description: "Shrink images quickly in the browser. Fast, private, and free.",
    url: "https://anyfileconverter.online/tools/image-compressor",
    siteName: "AnyFileConverter",
    type: "website",
    locale: "en_US",
    images: [
      {
        url: "https://anyfileconverter.online/og-image-compressor.jpg",
        width: 1200,
        height: 630,
        alt: "Image Compressor — AnyFileConverter",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Image Compressor — AnyFileConverter",
    description: "Compress JPG, PNG and WebP images without uploading them — right in your browser.",
    images: ["https://anyfileconverter.online/og-image-compressor.jpg"],
  },
};

const pageJsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "SoftwareApplication",
      "@id": "https://anyfileconverter.online/tools/image-compressor#app",
      "name": "Image Compressor",
      "applicationCategory": "ImageTool",
      "operatingSystem": "Web",
      "url": "https://anyfileconverter.online/tools/image-compressor",
      "description": "Compress JPG, PNG and WebP images in the browser to reduce file size for uploads and sharing.",
      "offers": {
        "@type": "Offer",
        "price": "0",
        "priceCurrency": "USD"
      }
    },
    {
      "@type": "WebApplication",
      "@id": "https://anyfileconverter.online/tools/image-compressor#webapp",
      "name": "Image Compressor",
      "url": "https://anyfileconverter.online/tools/image-compressor",
      "description": "Browser-based image compression — fast, private and easy to use.",
      "applicationCategory": "Utility",
      "offers": {
        "@type": "Offer",
        "price": "0",
        "priceCurrency": "USD"
      }
    },
    {
      "@type": "BreadcrumbList",
      "@id": "https://anyfileconverter.online/tools/image-compressor#breadcrumbs",
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://anyfileconverter.online/" },
        { "@type": "ListItem", "position": 2, "name": "Tools", "item": "https://anyfileconverter.online/tools" },
        { "@type": "ListItem", "position": 3, "name": "Image Compressor", "item": "https://anyfileconverter.online/tools/image-compressor" }
      ]
    },
    {
      "@type": "FAQPage",
      "@id": "https://anyfileconverter.online/tools/image-compressor#faq",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "Is compression done on my device or uploaded to a server?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "By default compression runs in your browser so your files are not uploaded. Server-side options (if offered) will be opt-in and clearly labeled."
          }
        },
        {
          "@type": "Question",
          "name": "Which image formats are supported?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "This tool supports JPG, JPEG, PNG and WebP formats. It can re-encode images into smaller JPG or WebP versions depending on your quality choice."
          }
        },
        {
          "@type": "Question",
          "name": "Will compression reduce visible image quality?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "You control the quality slider — choose a balance between file size and visual fidelity. For most images, medium compression significantly reduces file size with minimal visible difference."
          }
        },
        {
          "@type": "Question",
          "name": "Do I need an account?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "No account or signup is required. Compress and download images instantly."
          }
        }
      ]
    }
  ]
};

export default function ImageCompressorPage() {
  return (
    <>
      <main style={{ padding: 24, maxWidth: 900, margin: "0 auto", lineHeight: 1.7 }}>
        <nav aria-label="Breadcrumb" style={{ marginBottom: 12 }}>
          <Link href="/">Home</Link> {" / "} <Link href="/tools">Tools</Link> {" / "} Image Compressor
        </nav>

        <h1>Image Compressor — Reduce JPG/PNG/WebP Size (Fast & Private)</h1>

        <p style={{ color: "#555" }}>
          Compress JPG, PNG and WebP images instantly in your browser. Reduce upload times, shrink attachments for email,
          and save storage — all while keeping visual quality under your control. No account required and files stay on your device by default.
        </p>

        <section style={{ marginTop: 20 }}>
          <ImageCompressorClient />
        </section>

        <div style={{ marginTop: 20 }}>
          <AdPlaceholder />
        </div>

        <article style={{ marginTop: 28, lineHeight: 1.6 }}>
          <h2>Why use our Image Compressor?</h2>
          <p>
            Our image compressor is built for speed and privacy. It runs entirely in your browser so images never leave your device unless you explicitly choose server features.
            That means faster results, better privacy, and no waiting in upload queues.
          </p>

          <h3>Key benefits</h3>
          <ul style={{ marginLeft: 20 }}>
            <li><strong>Privacy-first:</strong> Default client-side compression — we do not upload your files.</li>
            <li><strong>High quality:</strong> Adjustable quality settings let you balance size and visual fidelity.</li>
            <li><strong>Multiple formats:</strong> Supports JPG, PNG and WebP and can output smaller JPG or WebP files.</li>
            <li><strong>Batch processing:</strong> Compress multiple images at once for bulk optimization.</li>
            <li><strong>Mobile friendly:</strong> Works well on phones and tablets — use the Web Share API to share results on mobile.</li>
          </ul>

          <h2>How it works — quick steps</h2>
          <ol style={{ marginLeft: 20 }}>
            <li><strong>Upload or drag & drop:</strong> Add one or many images into the compressor box.</li>
            <li><strong>Choose quality:</strong> Use the quality slider to preview file size and image appearance.</li>
            <li><strong>Compress:</strong> Click the compress button and wait for the browser to re-encode the image(s).</li>
            <li><strong>Download:</strong> Download compressed images or use the share button on mobile.</li>
          </ol>

          <h2>Best practices to get the smallest images</h2>
          <ul style={{ marginLeft: 20 }}>
            <li>Prefer WebP output for photographic images — it often gives the best size/quality ratio.</li>
            <li>Cropping large unused areas of an image before compression reduces final size.</li>
            <li>For screenshots or simple graphics, lower quality values typically keep acceptable results with big savings.</li>
            <li>Batch compress photos with similar settings to speed up workflow.</li>
          </ul>

          <h2>Common use cases</h2>
          <ul style={{ marginLeft: 20 }}>
            <li>Prepare photos for faster website uploads or CMS publishing.</li>
            <li>Shrink images for email attachments to meet size limits.</li>
            <li>Optimize images for social sharing without losing look and feel.</li>
            <li>Reduce storage usage on devices before backups.</li>
          </ul>

          <h2 style={{ marginTop: 20 }}>Frequently Asked Questions</h2>

          <div id="faq" style={{ marginLeft: 20 }}>
            <details>
              <summary><strong>Is compression done on my device or uploaded to a server?</strong></summary>
              <p>
                By default compression runs in your browser so your files are not uploaded. If we offer server features, they will be opt-in and clearly labeled.
              </p>
            </details>

            <details>
              <summary><strong>Which image formats are supported?</strong></summary>
              <p>
                This tool supports JPG, JPEG, PNG and WebP. You can choose output format and quality per image.
              </p>
            </details>

            <details>
              <summary><strong>Will compression reduce visible image quality?</strong></summary>
              <p>
                You control a quality slider to balance file size and image fidelity. Medium settings often provide significant size reductions with minimal visible change.
              </p>
            </details>

            <details>
              <summary><strong>Do I need an account?</strong></summary>
              <p>No account or registration is required. Compress and download images instantly.</p>
            </details>
          </div>
        </article>

        <div style={{ marginTop: 24 }}>
          <AdPlaceholder />
        </div>
      </main>

      {/* JSON-LD structured data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(pageJsonLd) }}
      />
    </>
  );
}
