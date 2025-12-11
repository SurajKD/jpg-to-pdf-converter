// app/tools/remove-bg/page.tsx
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

export const metadata: Metadata = {
  title: "Remove Image Background — Free AI Background Remover (Client-side)",
  description:
    "Remove backgrounds from photos right in your browser. Produce transparent PNGs or composite a solid color. Private, fast and no uploads by default — ideal for portraits and product shots.",
  keywords: [
    "remove background",
    "background remover",
    "remove image background online",
    "transparent png",
    "background eraser",
    "image matting",
    "photo background remover",
    "in-browser background removal",
  ],
  alternates: { canonical: "https://anyfileconverter.online/tools/remove-bg" },
  openGraph: {
    title: "Remove Image Background — AnyFileConverter",
    description:
      "Remove backgrounds from photos in the browser (client-side AI). Create transparent PNGs or swap the background with a color — no upload required.",
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
      "Remove backgrounds from photos directly in your browser. Fast, private and free — generate transparent PNGs with client-side AI.",
    images: ["https://anyfileconverter.online/og-tools.png"],
  },
};

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
        "Client-side background remover that uses in-browser AI to produce transparent PNGs or images with a solid background color.",
      "offers": { "@type": "Offer", price: "0", priceCurrency: "USD" }
    },
    {
      "@type": "WebApplication",
      "@id": "https://anyfileconverter.online/tools/remove-bg#webapp",
      "name": "Remove Image Background",
      "url": "https://anyfileconverter.online/tools/remove-bg",
      "description":
        "Browser-based background remover — private, fast and easy to use. No uploads by default.",
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
          "name": "Is processing done on my device or uploaded to a server?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "By default processing runs entirely in your browser using client-side WASM/ONNX models, so your images do not leave your device. There is no upload unless you explicitly choose any server-side features."
          }
        },
        {
          "@type": "Question",
          "name": "Which file types are supported?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Common image formats are supported: JPG/JPEG, PNG and WebP. The resulting transparent output is saved as PNG by default."
          }
        },
        {
          "@type": "Question",
          "name": "Why does the first run take longer?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "On first use the browser downloads the WASM and ONNX assets required by the model. Subsequent runs are much faster because assets are cached by the browser. You can optionally preload assets via the 'Preload Assets' button."
          }
        },
        {
          "@type": "Question",
          "name": "How do I improve edge quality for hair or complex objects?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "For fine hair or challenging masks try: (1) using high-resolution images, (2) toggling model settings if available (smaller vs medium), and (3) performing a small manual touch-up in an image editor. For the highest quality across all image types, consider a server-side model or commercial API as a fallback."
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
        <nav aria-label="Breadcrumb" className="text-sm mb-3 text-slate-600">
          <Link href="/">Home</Link> {" / "} <Link href="/tools">Tools</Link> {" / "} Remove Image Background
        </nav>

        <header className="mb-4">
          <h1 className="text-3xl font-semibold leading-tight">
            Remove Image Background — AI Background Remover (Client-side)
          </h1>
          <p className="text-gray-600 mt-2">
            Remove backgrounds from photos directly in your browser using an in-browser AI model. Create transparent PNGs or instantly replace the background with a solid color — no signup, no upload by default.
          </p>

          <div className="mt-4 text-sm text-slate-500">
            <strong>Tip:</strong> Use the “Preload Assets” button to fetch model files ahead of time for a faster first-run experience.
          </div>
        </header>

        <section className="mt-4">
          <div className="bg-white rounded-lg p-4 shadow-sm border border-slate-100">
            <RemoveBgClient />
          </div>
        </section>

        <div className="mt-6 flex justify-center">
          <AdPlaceholder />
        </div>

        <article className="prose prose-lg mt-8">
          <h2>How it works</h2>
          <p>
            This tool uses an AI matting/segmentation model that runs in the browser (WASM/ONNX). The model separates foreground pixels (subject) from background pixels, then outputs a PNG with an alpha channel (transparent background) or a composite with a chosen solid color.
          </p>

          <h3>Why client-side matters</h3>
          <ul>
            <li><strong>Privacy:</strong> images stay on your device unless you explicitly use a server feature.</li>
            <li><strong>Speed:</strong> no upload/download latency for most photos — especially on modern devices.</li>
            <li><strong>Cost-free:</strong> no server costs for you (or for us) when you run the model locally.</li>
          </ul>

          <h3>When to consider server-side</h3>
          <p>
            In-browser models are excellent for portraits and straightforward subjects. For extremely fine-grained masks (very wispy hair, translucent objects, complex reflections) a larger server model (U²-Net variants) or a commercial API can produce subtly better results. We can add an opt-in server fallback if you prefer maximum quality across every image.
          </p>

          <h2>Best practices for great results</h2>
          <ul>
            <li>Upload high-resolution images (larger source images produce cleaner masks).</li>
            <li>Prefer photos where the subject contrasts with the background.</li>
            <li>Use the Preload Assets option before a batch to avoid first-run downloads during processing.</li>
            <li>If you need a colored background, choose the color after removal rather than editing manually — the tool composites for you.</li>
          </ul>

          <h2>Troubleshooting & browser notes</h2>
          <h4>First run is slow</h4>
          <p>The first run downloads the model and wasm files from IMG.LY's CDN — use Preload to control when that happens.</p>

          <h4>Performance and shared memory</h4>
          <p>
            For best performance (WebGPU / SharedArrayBuffer) enable COOP/COEP headers on your site:
            <code className="mx-1">Cross-Origin-Opener-Policy: same-origin</code> and
            <code className="mx-1">Cross-Origin-Embedder-Policy: require-corp</code>.
            These are optional but significantly speed up inference on supported browsers.
          </p>

          <h4>Supported browsers</h4>
          <p>
            Modern Chromium-based browsers (Chrome, Edge) and Firefox work well. Mobile performance varies by device — newer phones handle the model acceptably, older phones may be slower.
          </p>

          <h2 className="mt-6">Frequently asked questions</h2>

          <details>
            <summary><strong>Do I need an account?</strong></summary>
            <p>No — this tool is free to use and requires no registration for client-side removal.</p>
          </details>

          <details>
            <summary><strong>What file types can I upload?</strong></summary>
            <p>Upload JPG, PNG, or WebP images. Output is PNG when you choose transparent background.</p>
          </details>

          <details>
            <summary><strong>Will my image be uploaded?</strong></summary>
            <p>Not by default. Client-side processing keeps the image local. If you use a server-side fallback (optional), you’ll be informed and the upload will be explicit.</p>
          </details>

          <details>
            <summary><strong>Can I self-host the model files?</strong></summary>
            <p>Yes — advanced users can host the ONNX/WASM assets and configure the library’s <code>publicPath</code> to point to your assets for faster, private hosting.</p>
          </details>
        </article>

        <div className="mt-8 flex justify-center">
          <AdPlaceholder />
        </div>
      </main>

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(pageJsonLd) }} />
    </>
  );
}
