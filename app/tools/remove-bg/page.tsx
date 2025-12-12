import Link from "next/link";
import type { Metadata } from "next";
import dynamic from "next/dynamic";
import React from "react";

const RemoveBgClient = dynamic(() => import("../../../components/RemoveBgClient"), {
  ssr: false,
  loading: () => <div className="h-48" />
});

const AdPlaceholder = dynamic(() => import("../../../components/AdPlaceholder"), {
  ssr: false,
  loading: () => <div className="h-24" />
});

/* -------------------------------------------------------
   🔥 SEO METADATA (Improved)
-------------------------------------------------------- */
export const metadata: Metadata = {
  title: "Remove Image Background — Free AI Background Remover (Client-side)",
  description:
    "Remove backgrounds from photos directly in your browser using fast, private client-side AI. Create transparent PNGs instantly without uploading anything.",
  keywords: [
    "remove background",
    "background remover",
    "image background remover",
    "remove background online",
    "transparent background",
    "AI background remover",
    "photo background eraser",
    "free background remover",
    "remove bg tool",
    "in-browser background removal",
  ],
  alternates: {
    canonical: "https://anyfileconverter.online/tools/remove-bg",
  },
  openGraph: {
    title: "Remove Image Background — AnyFileConverter",
    description:
      "Remove backgrounds from photos in your browser using fast, private AI. Create transparent PNGs instantly with no upload required.",
    url: "https://anyfileconverter.online/tools/remove-bg",
    siteName: "AnyFileConverter",
    type: "website",
    locale: "en_US",
    images: [
      {
        url: "https://anyfileconverter.online/og-tools.png",
        width: 1200,
        height: 630,
        alt: "Remove Image Background — AnyFileConverter",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Remove Image Background — AnyFileConverter",
    description:
      "Remove image backgrounds instantly using fast in-browser AI. Transparent PNG output, no upload required.",
    images: ["https://anyfileconverter.online/og-tools.png"],
  },
};

/* -------------------------------------------------------
   🔥 JSON-LD Structured Data (SEO Boost)
-------------------------------------------------------- */
const pageJsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "SoftwareApplication",
      "@id": "https://anyfileconverter.online/tools/remove-bg#app",
      "name": "Remove Image Background",
      "applicationCategory": "ImageTool",
      "operatingSystem": "Web",
      "url": "https://anyfileconverter.online/tools/remove-bg",
      "description":
        "Client-side background remover powered by in-browser AI. Produces transparent PNGs instantly, without uploading images.",
      "offers": { "@type": "Offer", price: "0", priceCurrency: "USD" }
    },
    {
      "@type": "WebApplication",
      "@id": "https://anyfileconverter.online/tools/remove-bg#webapp",
      "name": "Remove Image Background",
      "url": "https://anyfileconverter.online/tools/remove-bg",
      "description":
        "Remove backgrounds from images directly in your browser using privacy-friendly, fast AI.",
      "applicationCategory": "Utility",
      "offers": { "@type": "Offer", price: "0", priceCurrency: "USD" }
    },
    {
      "@type": "BreadcrumbList",
      "@id": "https://anyfileconverter.online/tools/remove-bg#breadcrumbs",
      "itemListElement": [
        { "@type": "ListItem", position: 1, name: "Home", item: "https://anyfileconverter.online/" },
        { "@type": "ListItem", position: 2, name: "Tools", item: "https://anyfileconverter.online/tools" },
        { "@type": "ListItem", position: 3, name: "Remove Image Background", item: "https://anyfileconverter.online/tools/remove-bg" }
      ]
    },
    {
      "@type": "FAQPage",
      "@id": "https://anyfileconverter.online/tools/remove-bg#faq",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "Is image processing done locally?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Yes. All processing happens entirely in your browser using an in-browser AI model. Your images never leave your device unless you explicitly choose a cloud feature."
          }
        },
        {
          "@type": "Question",
          "name": "Which file formats are supported?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "You can upload JPG, JPEG, PNG, and WebP. The output is a transparent PNG."
          }
        },
        {
          "@type": "Question",
          "name": "Why is the first run slower?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "The model (ONNX/WASM) must be downloaded once. After that, the browser caches it, and future runs are almost instant."
          }
        },
        {
          "@type": "Question",
          "name": "How can I improve hair edges?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Use high-resolution images and adjust feather/threshold settings. Extremely fine edges may require a higher-tier model or server fallback."
          }
        }
      ]
    }
  ]
};

export default function RemoveBgPage() {
  return (
    <>
      <main className="max-w-4xl mx-auto px-4 py-10">
        {/* Breadcrumb */}
        <nav aria-label="Breadcrumb" className="text-sm mb-3 text-slate-600">
          <Link href="/">Home</Link> {" / "}
          <Link href="/tools">Tools</Link> {" / "}
          Remove Image Background
        </nav>

        {/* Header Section */}
        <header className="mb-4">
          <h1 className="text-3xl font-semibold leading-tight">
            Remove Image Background — AI Background Remover (Client-side)
          </h1>
          <p className="text-gray-600 mt-2">
            Remove backgrounds from images directly in your browser using fast, private AI. No upload,
            no signup — generate transparent PNGs instantly.
          </p>

          <p className="mt-4 text-sm text-slate-500">
            <strong>Tip:</strong> Preload the model to speed up your first removal.
          </p>
        </header>

        {/* Tool Component */}
        <section className="mt-4">
          <div className="bg-white rounded-lg p-4 shadow-sm border border-slate-100">
            <RemoveBgClient />
          </div>
        </section>

        {/* Ad Spot */}
        <div className="mt-6 flex justify-center">
          <AdPlaceholder />
        </div>

        {/* SEO Article Section */}
        <article className="prose prose-lg mt-8">
          <h2>How this background remover works</h2>
          <p>
            This tool uses an optimized ONNX segmentation model running locally in your browser via WASM.
            The model identifies foreground pixels and outputs a transparent PNG, without uploading anything.
          </p>

          <h3>Why client-side AI?</h3>
          <ul>
            <li><strong>Zero uploads:</strong> Your images stay on your device.</li>
            <li><strong>Faster:</strong> No network delay for processing.</li>
            <li><strong>Private:</strong> Perfect for sensitive or personal photos.</li>
          </ul>

          <h3>When to consider server-side tools</h3>
          <p>
            For very complex images such as detailed hair, reflections, or transparent objects, a larger
            server-side AI model can produce cleaner masks. A hybrid option may be added later.
          </p>

          <h2>Best practices for excellent results</h2>
          <ul>
            <li>Use higher resolution photos.</li>
            <li>Increase subject/background contrast when shooting photos.</li>
            <li>Use feather/threshold controls to fine-tune the output.</li>
            <li>Use "Preload Assets" before batch processing.</li>
          </ul>

          <h2>Troubleshooting</h2>
          <h4>First run is slow</h4>
          <p>The model and WebAssembly runtime must be loaded once, then cached.</p>

          <h4>Performance tips</h4>
          <p>
            For maximum speed, enable:
            <code className="mx-1">Cross-Origin-Opener-Policy: same-origin</code> and
            <code className="mx-1">Cross-Origin-Embedder-Policy: require-corp</code>.
          </p>

          <h4>Browser support</h4>
          <p>
            Chrome, Edge, and Firefox work best. Mobile performance varies by device.
          </p>

          <h2>FAQ</h2>

          <details>
            <summary><strong>Do I need an account?</strong></summary>
            <p>No — fully free and no signup required.</p>
          </details>

          <details>
            <summary><strong>Will my images be uploaded?</strong></summary>
            <p>No uploads happen unless you choose server processing.</p>
          </details>

          <details>
            <summary><strong>Can I host the model myself?</strong></summary>
            <p>Yes — advanced users can self-host ONNX + WASM assets for full control.</p>
          </details>
        </article>

        {/* Ad Spot Bottom */}
        <div className="mt-8 flex justify-center">
          <AdPlaceholder />
        </div>
      </main>

      {/* JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(pageJsonLd) }}
      />
    </>
  );
}
