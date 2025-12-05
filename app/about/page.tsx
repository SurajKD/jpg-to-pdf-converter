// app/about/page.tsx
import type { Metadata } from "next";
import dynamic from "next/dynamic";
import Link from "next/link";
import React from "react";

const AdPlaceholder = dynamic(() => import("../../components/AdPlaceholder"), {
  ssr: false,
  loading: () => <div className="h-24" />,
});

export const metadata: Metadata = {
  title: "About — AnyFileConverter.online",
  description:
    "Learn about AnyFileConverter.online — fast, private, client-side file conversion tools (JPG→PDF, PDF compression, image optimization and more).",
  alternates: { canonical: "https://anyfileconverter.online/about" },
};

const orgJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "AnyFileConverter",
  "url": "https://anyfileconverter.online",
  "logo": "https://anyfileconverter.online/logo.png",
  "sameAs": [],
  "contactPoint": [
    {
      "@type": "ContactPoint",
      "contactType": "customer support",
      "email": "support@anyfileconverter.online"
    }
  ]
};

const pageJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  "url": "https://anyfileconverter.online/about",
  "name": "About — AnyFileConverter",
  "description": "About AnyFileConverter — privacy-first, browser-based file conversion tools."
};

export default function AboutPage() {
  return (
    <>
      <main className="max-w-4xl mx-auto px-4 py-10">
        {/* Structured data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(orgJsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(pageJsonLd) }}
        />

        <article className="prose prose-lg">
          <header>
            <h1 className="text-3xl font-semibold mt-0">About AnyFileConverter</h1>
            <p className="text-gray-600">
              AnyFileConverter.online provides fast, privacy-first file tools that run in your browser.
              We build simple, reliable utilities to convert, compress, and manage files — no signup required.
            </p>

            <div className="mt-4 mb-4">
              <Link href="/contact">
                <button className="btn px-4 py-2 rounded-lg text-white font-medium">
                  Contact the Team
                </button>
              </Link>
            </div>
          </header>

          <section>
            <h2 className="text-2xl font-semibold">Our mission</h2>
            <p>
              We believe essential digital tools should be <strong>free</strong>, <strong>easy to use</strong>,
              and <strong>privacy-friendly</strong>. Many services upload and retain user files — we design
              tools so conversions happen locally in the browser by default.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold">Privacy-first approach</h2>
            <p>Most conversions run client-side. That means:</p>
            <ul>
              <li><strong>Your files stay on your device</strong> during normal conversions.</li>
              <li><strong>No account or signup</strong> is required to use the tools.</li>
              <li><strong>No retention</strong> of files on our servers unless a tool explicitly needs temporary upload.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold">Why it’s free</h2>
            <p>
              Lightweight, policy-compliant advertising helps fund the project so core tools remain free.
              We focus on a clean, low-friction experience and transparency about data handling.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold">Tools we provide</h2>
            <p>We’re continually expanding. Current tools include:</p>
            <ul>
              <li>JPG → PDF Converter</li>
              <li>PDF Compressor</li>
              <li>Image Compressor (JPG/PNG/WebP)</li>
              <li>PDF → Word (DOCX)</li>
              <li>PDF merge / split utilities</li>
            </ul>
            <p>
              Visit the <Link href="/tools" className="underline">Tools page</Link> to try them.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold">Our commitment</h2>
            <p>
              Speed, simplicity, and security guide our decisions. Whether you're a student submitting assignments
              or a professional preparing documents, we aim to make file tasks fast and painless.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold">Want to help?</h2>
            <p>
              Share feedback or suggest new features on the <Link href="/contact" className="underline">Contact</Link> page.
              Your input helps the project grow and keeps the tools free for everyone.
            </p>
          </section>

          <footer>
            <p className="mt-6 text-gray-600">— The AnyFileConverter Team</p>
          </footer>
        </article>

        <div className="mt-8">
          <AdPlaceholder />
        </div>
      </main>
    </>
  );
}
