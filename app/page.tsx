// app/page.tsx
import Link from "next/link";
import type { Metadata } from "next";
import { OpenConverterButton } from "../components/OpenConvertButton";
import dynamic from "next/dynamic";
import React from "react";
import Image from "next/image";

const AdPlaceholder = dynamic(() => import("../components/AdPlaceholder"), {
  ssr: false,
  loading: () => <div className="h-24" />, // preserves layout for ads
});

export const metadata: Metadata = {
  title: "AnyFileConverter — Free Online File Conversion Tools (JPG→PDF, Compress, Optimize)",
  description:
    "AnyFileConverter.online: privacy-first, client-side file conversion tools. Convert JPG to PDF, compress PDFs, compress images and convert PDF→Word — fast, free and secure.",
  keywords: [
    "file converter",
    "jpg to pdf",
    "compress pdf",
    "image compressor",
    "pdf to word",
    "online file conversion",
  ],
  alternates: { canonical: "https://anyfileconverter.online" },
  openGraph: {
    title: "AnyFileConverter — Free Online Tools (Convert, Compress, Optimize)",
    description:
      "Privacy-first file conversion tools. Convert JPG to PDF, compress PDFs, compress images and convert PDF to Word — fast, free and secure.",
    url: "https://anyfileconverter.online",
    siteName: "AnyFileConverter",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "https://anyfileconverter.online/landing-og.jpg",
        width: 1200,
        height: 630,
        alt: "AnyFileConverter Tools — JPG→PDF, Compress, Image Optimizer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "AnyFileConverter — Free Online File Conversion Tools",
    description:
      "Convert files in your browser. JPG→PDF, PDF compression, image compression, and PDF to Word — fast, private and free.",
    images: ["https://anyfileconverter.online/landing-og.jpg"],
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
      logo: "https://anyfileconverter.online/logo.png",
      sameAs: [],
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
      description: "Privacy-first online file conversion tools. Convert, compress and optimize files directly in your browser.",
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
        { "@type": "ListItem", position: 1, name: "Home", item: "https://anyfileconverter.online/" },
        { "@type": "ListItem", position: 2, name: "Tools", item: "https://anyfileconverter.online/tools" },
      ],
    },
    {
      "@type": "SoftwareApplication",
      "@id": "https://anyfileconverter.online/tools/jpg-to-pdf#app",
      name: "JPG to PDF Converter",
      applicationCategory: "FileConverter",
      operatingSystem: "Web",
      url: "https://anyfileconverter.online/tools/jpg-to-pdf",
      description: "Convert JPG and PNG images to a PDF inside your browser. Reorder, rotate, and adjust layout — no upload required.",
      offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
    },
    {
      "@type": "SoftwareApplication",
      "@id": "https://anyfileconverter.online/tools/pdf-compressor#app",
      name: "PDF Compressor",
      applicationCategory: "FileConverter",
      operatingSystem: "Web",
      url: "https://anyfileconverter.online/tools/pdf-compressor",
      description: "Reduce PDF file size in the browser — fast and private compression.",
      offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
    },
    {
      "@type": "SoftwareApplication",
      "@id": "https://anyfileconverter.online/tools/image-compressor#app",
      name: "Image Compressor",
      applicationCategory: "ImageTool",
      operatingSystem: "Web",
      url: "https://anyfileconverter.online/tools/image-compressor",
      description: "Compress JPG, PNG and WebP images directly in the browser.",
      offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
    },
    {
      "@type": "SoftwareApplication",
      "@id": "https://anyfileconverter.online/tools/pdf-to-word#app",
      name: "PDF to Word Converter",
      applicationCategory: "FileConverter",
      operatingSystem: "Web",
      url: "https://anyfileconverter.online/tools/pdf-to-word",
      description: "Convert PDFs into editable DOCX files inside your browser — no uploads by default.",
      offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
    },
    {
      "@type": "WebApplication",
      "@id": "https://anyfileconverter.online/#webapp",
      name: "AnyFileConverter",
      url: "https://anyfileconverter.online",
      description: "A collection of privacy-first online file conversion tools that run in your browser.",
      applicationCategory: "Utility",
      offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
    },
    {
      "@type": "FAQPage",
      "@id": "https://anyfileconverter.online/#faq",
      mainEntity: [
        {
          "@type": "Question",
          name: "Are my files uploaded to your servers?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Most conversions run in your browser — files are not uploaded unless clearly stated.",
          },
        },
        {
          "@type": "Question",
          name: "Are the tools free to use?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Yes — all current tools are free with no signup required.",
          },
        },
        {
          "@type": "Question",
          name: "Which file types do you support?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Supported formats include JPG, PNG, WebP, PDF, and DOCX depending on the tool used.",
          },
        },
      ],
    },
  ],
};

export default function Home() {
  return (
    <>
      <main className="min-h-screen text-gray-900">
        <section className="max-w-5xl mx-auto px-4 py-8">
          {/* HERO: stacked on mobile, two-column on md+ */}
          <header className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
            <div>
              <h1 className="text-2xl sm:text-3xl md:text-4xl font-semibold leading-tight">
                AnyFileConverter.online
              </h1>

              <p className="mt-3 text-gray-600 text-base sm:text-lg">
                Privacy-first, client-side file tools. Convert JPG → PDF, compress PDFs & images, and convert PDF → Word — fast, free and secure.
              </p>

              <div className="mt-5 flex flex-col sm:flex-row sm:items-center sm:space-x-3 gap-3">
                <div className="w-full sm:w-auto">
                  <Link href="/tools" className="inline-block w-full sm:w-auto">
                    <button className="w-full sm:w-auto px-5 py-3 rounded-lg bg-slate-900 text-white text-sm font-medium hover:bg-slate-800 transition">
                      View All Tools
                    </button>
                  </Link>
                </div>
              </div>

              <p className="mt-4 text-xs text-gray-500">
                Fast, secure & free — no signup required. Files stay on your device unless you opt into server features.
              </p>
            </div>

            <div className="flex justify-center md:justify-end">
              <Image
                src="/landing-og.webp"
                alt="AnyFileConverter Tools preview"
                className="w-full max-w-xs md:max-w-sm rounded-lg shadow-sm object-cover"
                width={420}
                height={280}
                loading="eager"
              />
            </div>
          </header>

          {/* Ad placeholder (non-intrusive) */}
          <div className="mt-6">
            <AdPlaceholder />
          </div>

          {/* Tools grid */}
          <section className="mt-8">
            <h2 className="text-xl font-semibold">Available tools</h2>
            <p className="mt-2 text-gray-600">Quick client-side tools for most common file tasks.</p>

            <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <ToolCard href="/tools/jpg-to-pdf" title="JPG → PDF" desc="Combine images to a single PDF. Reorder, rotate & choose page size." tag="Client-side" />
              <ToolCard href="/tools/pdf-compressor" title="PDF Compressor" desc="Reduce PDF size for email and uploads." tag="Client-side" />
              <ToolCard href="/tools/image-compressor" title="Image Compressor" desc="Compress JPG, PNG & WebP images with quality control." tag="Client-side" />
              <ToolCard href="/tools/pdf-to-word" title="PDF → Word" desc="Convert PDFs into editable DOCX files." tag="Client-side" />
            </div>
          </section>

          {/* Benefits & How it works */}
          <section className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-lg font-semibold">Why choose AnyFileConverter?</h3>
              <ul className="mt-3 list-inside list-disc text-gray-700 space-y-2">
                <li><strong>Privacy-first:</strong> Conversions happen in your browser.</li>
                <li><strong>No signup:</strong> Use instantly with no account.</li>
                <li><strong>Fast & lightweight:</strong> Minimal UI, local processing.</li>
                <li><strong>Mobile-ready:</strong> Designed to work smoothly on phones.</li>
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-semibold">How it works</h3>
              <ol className="mt-3 list-decimal list-inside text-gray-700 space-y-2">
                <li>Select the tool you want to use.</li>
                <li>Upload or drag & drop your files.</li>
                <li>Adjust settings (quality, page size, order).</li>
                <li>Convert & download instantly.</li>
              </ol>
            </div>
          </section>

          {/* FAQ */}
          <section className="mt-8">
            <h3 className="text-lg font-semibold">Frequently asked questions</h3>
            <div className="mt-3 space-y-2 text-gray-700">
              <details className="bg-white p-3 rounded-lg shadow-sm">
                <summary className="cursor-pointer font-medium">Are my files uploaded to your servers?</summary>
                <p className="mt-2 text-sm text-gray-600">Most conversions run in your browser — files are not uploaded unless you explicitly enable a server feature.</p>
              </details>

              <details className="bg-white p-3 rounded-lg shadow-sm">
                <summary className="cursor-pointer font-medium">Are the tools free to use?</summary>
                <p className="mt-2 text-sm text-gray-600">Yes — all core tools are free with no signup required.</p>
              </details>

              <details className="bg-white p-3 rounded-lg shadow-sm">
                <summary className="cursor-pointer font-medium">Which formats are supported?</summary>
                <p className="mt-2 text-sm text-gray-600">Formats vary by tool: JPG/PNG/WebP for image tools, PDF for PDF tools and DOCX for Word outputs.</p>
              </details>
            </div>
          </section>

          <div className="mt-10">
            <AdPlaceholder />
          </div>
        </section>
      </main>

      {/* Structured data */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(combinedJsonLd) }} />
    </>
  );
}

/* -------------------------
   Small helper: ToolCard (tailwind)
   ------------------------- */
function ToolCard({ href, title, desc, tag }: { href: string; title: string; desc: string; tag?: string }) {
  return (
    <Link href={href} className="block bg-white rounded-lg p-4 shadow-sm hover:shadow-md transition">
      <div className="flex justify-between items-start">
        <h4 className="text-md font-semibold">{title}</h4>
        {tag && <span className="text-xs text-slate-500">{tag}</span>}
      </div>
      <p className="mt-2 text-sm text-gray-600">{desc}</p>
    </Link>
  );
}
