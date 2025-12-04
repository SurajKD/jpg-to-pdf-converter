// app/blog/page.tsx
import Link from "next/link";
import type { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Blog & Guides — AnyFileConverter (JPG→PDF, Compress, Image Tools)",
  description:
    "Helpful guides for converting JPG to PDF, compressing PDFs and images, and converting PDF to Word. Step-by-step tutorials, tips, and best practices.",
  alternates: { canonical: "https://anyfileconverter.online/blog" },
  openGraph: {
    title: "AnyFileConverter — Blog & Guides",
    description:
      "Guides: JPG→PDF, PDF compression, image optimization and PDF→Word. Practical tutorials for web and mobile users.",
    url: "https://anyfileconverter.online/blog",
    siteName: "AnyFileConverter",
  },
};

const posts = [
  {
    href: "/blog/how-to-convert-jpg-to-pdf",
    title: "How to Convert JPG to PDF (Step-by-Step Guide)",
    date: "2025-03-10",
    excerpt: "A simple step-by-step walkthrough to convert JPG images to PDF on desktop and mobile — with screenshots and pro tips.",
  },
  {
    href: "/blog/jpg-to-pdf-android",
    title: "How to Convert JPG to PDF on Android — Quick Guide",
    date: "2025-03-11",
    excerpt: "Fast methods to convert images to PDF on Android devices using built-in tools and privacy-first browser options.",
  },
  {
    href: "/blog/jpg-to-pdf-iphone",
    title: "How to Convert JPG to PDF on iPhone — Fast Methods",
    date: "2025-03-12",
    excerpt: "Convert photos to a single PDF on iPhone with the best built-in and third-party methods — no signup required.",
  },
  {
    href: "/blog/reduce-pdf-size-after-conversion",
    title: "How to Reduce PDF Size After Conversion",
    date: "2025-03-13",
    excerpt: "Practical tips for compressing PDFs after conversion — choose settings to balance quality and filesize.",
  },
  {
    href: "/blog/best-jpg-to-pdf-tools",
    title: "Best JPG to PDF Tools — Free & Paid Options",
    date: "2025-03-14",
    excerpt: "Compare built-in OS tools, browser-based privacy tools, desktop apps and cloud services — choose what fits your workflow.",
  },
  {
    href: "/blog/compress-pdf",
    title: "Best Ways to Compress PDF — Free, Fast & Without Losing Quality",
    date: "2025-03-15",
    excerpt: "Optimize PDFs for email and uploads — browser-based, desktop and cloud options explained with workflows.",
  },
  {
    href: "/blog/image-compressor",
    title: "How to Compress Images (JPG/PNG/WebP) Without Losing Quality",
    date: "2025-03-16",
    excerpt: "The practical guide to compressing images for web and email — formats, quality settings, and recommended workflows.",
  },
  {
    href: "/blog/pdf-to-word",
    title: "How to Convert PDF to Word (Editable DOCX)",
    date: "2025-03-17",
    excerpt: "A full guide to converting PDFs into editable Word docs, with tips for scanned PDFs and OCR usage.",
  },
];

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebPage",
      "@id": "https://anyfileconverter.online/blog",
      "url": "https://anyfileconverter.online/blog",
      "name": "AnyFileConverter — Blog & Guides",
      "description": "Guides for converting files, compressing PDFs and images, and converting PDF to Word.",
      "inLanguage": "en-US",
      "breadcrumb": {
        "@id": "https://anyfileconverter.online/blog#breadcrumblist"
      }
    },
    {
      "@type": "BreadcrumbList",
      "@id": "https://anyfileconverter.online/blog#breadcrumblist",
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://anyfileconverter.online/" },
        { "@type": "ListItem", "position": 2, "name": "Blog", "item": "https://anyfileconverter.online/blog" }
      ]
    },
    {
      "@type": "ItemList",
      "@id": "https://anyfileconverter.online/blog#posts",
      "itemListElement": posts.map((p, i) => ({
        "@type": "ListItem",
        "position": i + 1,
        "url": `https://anyfileconverter.online${p.href}`,
        "name": p.title,
        "datePublished": p.date
      }))
    }
  ]
};

export default function BlogIndex() {
  return (
    <>
      <main className="max-w-4xl mx-auto px-4 py-10">
        <header className="mb-8">
          <h1 className="text-3xl sm:text-4xl font-semibold leading-tight">Blog & Guides</h1>
          <p className="mt-3 text-gray-600">
            Practical tutorials and how-tos for converting images and PDFs, optimizing files for web and mobile,
            and getting the most from AnyFileConverter's tools.
          </p>

          <div className="mt-4 flex gap-3 flex-wrap">
            <Link href="/tools" className="inline-block">
              <button className="btn px-4 py-2 rounded-lg text-white text-sm font-medium">
                View Tools
              </button>
            </Link>
            <a href="/rss.xml" className="inline-block text-sm text-slate-600 underline">Subscribe (RSS)</a>
          </div>
        </header>

        <section aria-labelledby="latest-posts">
          <h2 id="latest-posts" className="text-2xl font-semibold mb-4">Latest posts</h2>

          <div className="grid gap-6">
            {posts.map((p) => (
              <article key={p.href} className="bg-white rounded-lg p-5 shadow-sm hover:shadow-md transition">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="text-lg font-semibold">
                      <Link href={p.href} className="hover:underline">{p.title}</Link>
                    </h3>
                    <p className="mt-2 text-sm text-gray-600">{p.excerpt}</p>
                    <div className="mt-3 flex items-center gap-3 text-xs text-slate-500">
                      <time dateTime={p.date}>{new Date(p.date).toLocaleDateString()}</time>
                      <span>•</span>
                      <span>Reading time: 2–4 min</span>
                    </div>
                  </div>

                  <div className="hidden sm:flex sm:items-center sm:ml-4">
                    <Link href={p.href} className="inline-flex items-center justify-center px-3 py-2 rounded-md bg-slate-100 text-slate-800 text-sm hover:bg-slate-200">
                      Read
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>

        <aside className="mt-10">
          <div className="bg-white rounded-lg p-5 shadow-sm">
            <h3 className="text-lg font-semibold">Helpful resources</h3>
            <ul className="mt-3 space-y-2 text-sm text-gray-700">
              <li><Link href="/tools/jpg-to-pdf" className=" hover:underline">JPG → PDF Converter</Link></li>
              <li><Link href="/tools/pdf-compressor" className=" hover:underline">PDF Compressor</Link></li>
              <li><Link href="/tools/image-compressor" className=" hover:underline">Image Compressor</Link></li>
              <li><Link href="/tools/pdf-to-word" className=" hover:underline">PDF → Word</Link></li>
            </ul>
          </div>

          <div className="mt-6">
            {/* lightweight newsletter CTA (non-functional placeholder) */}
            <div className="bg-slate-50 rounded-lg p-4 text-sm text-gray-700">
              <strong>Want more guides?</strong>
              <p className="mt-2">Suggest topics or request a guide via our <Link href="/contact" className="underline">Contact</Link> page.</p>
            </div>
          </div>
        </aside>
      </main>

      {/* Structured data for the blog index */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
    </>
  );
}
