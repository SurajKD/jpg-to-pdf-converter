// app/page.tsx

import Link from "next/link";
import type { Metadata } from "next";
import dynamic from "next/dynamic";
import React from "react";
import Image from "next/image";

export const revalidate = 86400;

const AdPlaceholder = dynamic(
  () => import("../components/AdPlaceholder"),
  {
    ssr: true,
    loading: () => <div className="h-24" />,
  }
);

export const metadata: Metadata = {
  title: "AnyFileConverter – Free PDF, JPG & Image Converter",
  description:
    "Free online PDF and image tools. Convert JPG to PDF, compress PDFs, remove backgrounds, merge PDFs, and optimize images securely in your browser.",

  keywords: [
    "pdf converter",
    "jpg to pdf",
    "image converter",
    "pdf compressor",
    "merge pdf",
    "remove background",
    "compress image",
    "online file converter",
    "pdf tools",
    "free converter",
  ],

  alternates: {
    canonical: "https://anyfileconverter.online",
  },

  openGraph: {
    title: "AnyFileConverter – Free PDF, JPG & Image Converter",
    description:
      "Convert JPG to PDF, compress PDFs, optimize images and remove backgrounds online for free.",
    url: "https://anyfileconverter.online",
    siteName: "AnyFileConverter",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "https://anyfileconverter.online/landing-og.webp",
        width: 1200,
        height: 630,
        alt: "AnyFileConverter online tools preview",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "AnyFileConverter – Free PDF & Image Tools",
    description:
      "Convert JPG to PDF, compress files, optimize images and edit PDFs online for free.",
    images: ["https://anyfileconverter.online/landing-og.webp"],
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
    },

    {
      "@type": "WebSite",
      "@id": "https://anyfileconverter.online/#website",
      url: "https://anyfileconverter.online",
      name: "AnyFileConverter",
      description:
        "Free browser-based PDF and image conversion tools.",
      publisher: {
        "@id": "https://anyfileconverter.online/#org",
      },
    },

    {
      "@type": "WebApplication",
      "@id": "https://anyfileconverter.online/#webapp",
      name: "AnyFileConverter",
      applicationCategory: "Utility",
      operatingSystem: "Web",
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
          name: "Are my files uploaded to your servers?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Most tools work entirely inside your browser so your files remain on your device.",
          },
        },

        {
          "@type": "Question",
          name: "Are the tools free?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Yes. All core conversion and optimization tools are free to use.",
          },
        },

        {
          "@type": "Question",
          name: "Which file formats are supported?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Supported formats include JPG, PNG, WebP, PDF and DOCX depending on the selected tool.",
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
        <section className="max-w-6xl mx-auto px-4 py-8">
          {/* HERO */}
          <header className="grid grid-cols-1 md:grid-cols-1 gap-8 items-center">
            <div>
              <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold leading-tight">
                Free PDF, JPG, Image & AI Converter Tools
              </h1>

              <p className="mt-4 text-gray-600 text-base sm:text-lg leading-7">
                AnyFileConverter provides free online converter
                tools for PDFs, JPG images, PNG files, AI Summarizer and
                document optimization directly in your browser.
                Convert files instantly without signup while
                keeping your data private and secure.
              </p>

              <div className="mt-6 flex flex-col sm:flex-row gap-4">
                <Link
                  href="/tools"
                  className="inline-flex items-center justify-center rounded-lg px-6 py-3 text-white font-medium btn"
                >
                  Explore All Tools
                </Link>
              </div>

              <p className="mt-5 text-sm text-gray-500">
                Fast, secure and privacy-focused file conversion
                tools for desktop and mobile users.
              </p>
            </div>

            {/* <div className="flex justify-center md:justify-end">
              <Image
                src="/landing-og.webp"
                alt="AnyFileConverter PDF and image tools preview"
                width={520}
                height={340}
                priority
                className="rounded-2xl shadow-lg object-cover"
              />
            </div> */}
          </header>

          {/* Ad */}
          {/* <div className="mt-4">
            <AdPlaceholder />
          </div> */}

          {/* Tools */}
          <section className="mt-12">
            <h2 className="text-2xl font-bold">
              Popular PDF, Image & AI Tools
            </h2>

            <p className="mt-3 text-gray-600">
              Browser-based tools for converting, compressing,
              optimizing and editing files online.
            </p>

            <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              <ToolCard
                href="/tools/ai-pdf-summarizer"
                title="AI PDF Summarizer"
                desc="Get concise summaries of your PDF documents using AI."
              />
              <ToolCard
                href="/tools/youtube-repurposer"
                title="YouTube Content Repurposer"
                desc="Repurpose your YouTube content into different formats and platforms."
              />
              <ToolCard
                href="/tools/jpg-to-pdf"
                title="Convert JPG to PDF"
                desc="Convert multiple JPG and PNG images into a single PDF document."
              />

              <ToolCard
                href="/tools/pdf-compressor"
                title="Compress PDF Online"
                desc="Reduce PDF file size for faster sharing and uploads."
              />

              <ToolCard
                href="/tools/image-compressor"
                title="Compress Images"
                desc="Optimize JPG, PNG and WebP images with quality control."
              />

              <ToolCard
                href="/tools/pdf-to-word"
                title="PDF to Word Converter"
                desc="Transform PDFs into editable DOCX documents."
              />

              <ToolCard
                href="/tools/merge-pdf"
                title="Merge PDF Files"
                desc="Combine multiple PDF files into one organized document."
              />

              <ToolCard
                href="/tools/remove-bg"
                title="Remove Image Background"
                desc="Create transparent PNG images instantly online."
              />

              <ToolCard
                href="/tools/pdf-splitter"
                title="Split PDF Pages"
                desc="Extract selected pages from large PDF documents."
              />

              <ToolCard
                href="/tools/qr-code-generator"
                title="Generate QR Codes"
                desc="Create custom QR codes for URLs, text and WiFi."
              />

              <ToolCard
                href="/tools/youtube-thumbnail-downloader"
                title="YouTube Thumbnail Downloader"
                desc="Extract and download high-quality YouTube cover images."
              />
            </div>
          </section>

          {/* Benefits */}
          <section className="mt-14 grid grid-cols-1 md:grid-cols-2 gap-10">
            <div>
              <h3 className="text-xl font-semibold">
                Why choose AnyFileConverter?
              </h3>

              <ul className="mt-4 list-disc list-inside text-gray-700 space-y-3">
                <li>
                  Privacy-first browser processing for secure file handling.
                </li>

                <li>
                  No signup or account creation required.
                </li>

                <li>
                  Fast conversion speeds on desktop and mobile devices.
                </li>

                <li>
                  Lightweight tools with simple user interfaces.
                </li>

                <li>
                  Works directly in modern browsers without software installation.
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-xl font-semibold">
                How the tools work
              </h3>

              <ol className="mt-4 list-decimal list-inside text-gray-700 space-y-3">
                <li>Select a conversion or optimization tool.</li>

                <li>Upload files or drag and drop them.</li>

                <li>
                  Configure quality, layout or compression settings.
                </li>

                <li>
                  Convert files instantly and download the result.
                </li>
              </ol>
            </div>
          </section>

          {/* SEO CONTENT */}
          <section className="mt-14">
            <h3 className="text-2xl font-bold">
              Popular file conversion tasks
            </h3>

            <div className="mt-5 space-y-5 text-gray-700 leading-8">
              <p>
                Convert JPG images into professional PDF
                documents for resumes, invoices, reports,
                assignments and presentations directly in your browser.
              </p>

              <p>
                Compress PDF documents to reduce upload times,
                improve email sharing and save cloud storage space
                without noticeably reducing quality.
              </p>

              <p>
                Optimize PNG, JPG and WebP images for websites,
                ecommerce stores, blogs and social media platforms
                to improve page loading performance.
              </p>

              <p>
                Merge multiple PDFs into a single organized file
                for contracts, presentations, reports and scanned documents.
              </p>

              <p>
                Remove image backgrounds instantly for product photography,
                design projects, profile pictures and marketing graphics.
              </p>

              <p>
                Browser-based file processing improves privacy because
                most tools work directly on your device instead of uploading
                files to external servers.
              </p>
            </div>
          </section>

          {/* EXTRA CONTENT */}
          <section className="mt-14">
            <h3 className="text-2xl font-bold">
              Why browser-based tools matter
            </h3>

            <div className="mt-5 space-y-5 text-gray-700 leading-8">
              <p>
                Traditional online converters often require uploading
                sensitive documents to remote servers. AnyFileConverter
                focuses on browser-based processing whenever possible,
                helping improve privacy and security.
              </p>

              <p>
                Local processing also improves speed because files do not
                need to be transferred across the internet before conversion.
                This creates a faster and smoother user experience.
              </p>

              <p>
                Students, professionals, developers, businesses and content
                creators use online file tools daily for productivity,
                collaboration and content optimization.
              </p>

              <p>
                Whether you need to compress PDFs, optimize website images,
                merge documents or convert file formats, browser-based tools
                provide a fast and accessible workflow from any device.
              </p>
            </div>
          </section>

          {/* FAQ */}
          <section className="mt-14">
            <h3 className="text-2xl font-bold">
              Frequently asked questions
            </h3>

            <div className="mt-5 space-y-4">
              <details className="bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 p-4 rounded-xl shadow-sm">
                <summary className="cursor-pointer font-medium text-gray-900 dark:text-white">
                  Are my files uploaded to servers?
                </summary>

                <p className="mt-3 text-gray-600 dark:text-gray-300">
                  Most tools process files directly in your browser
                  without uploading them to external servers.
                </p>
              </details>

              <details className="bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 p-4 rounded-xl shadow-sm">
                <summary className="cursor-pointer font-medium text-gray-900 dark:text-white">
                  Are these tools free?
                </summary>

                <p className="mt-3 text-gray-600 dark:text-gray-300">
                  Yes. All core file conversion and optimization
                  tools are completely free to use.
                </p>
              </details>

              <details className="bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 p-4 rounded-xl shadow-sm">
                <summary className="cursor-pointer font-medium text-gray-900 dark:text-white">
                  Which file formats are supported?
                </summary>

                <p className="mt-3 text-gray-600 dark:text-gray-300">
                  Supported formats include JPG, PNG, WebP,
                  PDF and DOCX depending on the selected tool.
                </p>
              </details>
            </div>
          </section>

          {/* External Links */}
          <section className="mt-14 text-sm text-gray-600">
            <h3 className="text-lg font-semibold">
              Helpful resources
            </h3>

            <ul className="mt-4 list-disc list-inside space-y-2">
              <li>
                Learn more about the PDF format from{" "}
                <a
                  href="https://www.adobe.com/acrobat/about-adobe-pdf.html"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 underline"
                >
                  Adobe PDF documentation
                </a>
              </li>

              <li>
                Explore image optimization best practices from{" "}
                <a
                  href="https://developers.google.com/speed/docs/insights/OptimizeImages"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 underline"
                >
                  Google PageSpeed Insights
                </a>
              </li>
            </ul>
          </section>

          <div className="mt-12">
            <AdPlaceholder />
          </div>
        </section>
      </main>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(combinedJsonLd),
        }}
      />
    </>
  );
}

function ToolCard({
  href,
  title,
  desc,
}: {
  href: string;
  title: string;
  desc: string;
}) {
  return (
    <Link
      href={href}
      className="block bg-white rounded-xl p-5 shadow-sm hover:shadow-md transition"
    >
      <h4 className="text-lg font-semibold">
        {title}
      </h4>

      <p className="mt-3 text-sm text-gray-600 leading-6">
        {desc}
      </p>
    </Link>
  );
}