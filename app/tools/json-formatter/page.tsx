import type { Metadata } from 'next';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import React from 'react';

const JsonFormatterClient = dynamic(
  () => import('../../../components/JsonFormatterClient'),
  { ssr: false, loading: () => <div className="h-48" /> }
);
const AdPlaceholder = dynamic(
  () => import('../../../components/AdPlaceholder'),
  { ssr: false, loading: () => <div className="h-24" /> }
);

export const metadata: Metadata = {
  title: 'JSON Formatter & Validator — Free Online JSON Tool',
  description:
    'Validate, format and download JSON data in your browser. Private client-side JSON formatting and validation for developers and data teams.',
  keywords: ['json formatter', 'json validator', 'json prettify', 'online json formatter', 'validate json', 'json tool'],
  alternates: { canonical: 'https://anyfileconverter.online/tools/json-formatter' },
  openGraph: {
    title: 'JSON Formatter & Validator — Free Online JSON Tool',
    description:
      'Validate and format JSON in your browser. Quickly find syntax errors and download pretty-printed JSON files for APIs and configs.',
    url: 'https://anyfileconverter.online/tools/json-formatter',
    siteName: 'AnyFileConverter',
    type: 'article',
    locale: 'en_US',
    images: [
      {
        url: 'https://anyfileconverter.online/landing-og.jpg',
        width: 1200,
        height: 630,
        alt: 'JSON Formatter Preview',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'JSON Formatter & Validator — Free Online JSON Tool',
    description:
      'Validate and pretty-print JSON directly in your browser with private client-side conversion.',
    images: ['https://anyfileconverter.online/landing-og.jpg'],
  },
};

const pageJsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'SoftwareApplication',
      '@id': 'https://anyfileconverter.online/tools/json-formatter#app',
      name: 'JSON Formatter & Validator',
      description:
        'Validate, format and download JSON data privately in your browser.',
      applicationCategory: 'DeveloperTool',
      operatingSystem: 'Web',
      url: 'https://anyfileconverter.online/tools/json-formatter',
      offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
    },
    {
      '@type': 'WebApplication',
      '@id': 'https://anyfileconverter.online/tools/json-formatter#webapp',
      name: 'JSON Formatter & Validator',
      description:
        'Free online JSON formatter for API payloads, config files, and developer workflows.',
      applicationCategory: 'Utility',
      url: 'https://anyfileconverter.online/tools/json-formatter',
      offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
    },
    {
      '@type': 'BreadcrumbList',
      '@id': 'https://anyfileconverter.online/tools/json-formatter#breadcrumbs',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://anyfileconverter.online/' },
        { '@type': 'ListItem', position: 2, name: 'Tools', item: 'https://anyfileconverter.online/tools' },
        { '@type': 'ListItem', position: 3, name: 'JSON Formatter', item: 'https://anyfileconverter.online/tools/json-formatter' },
      ],
    },
  ],
};

export default function JsonFormatterPage() {
  return (
    <>
      <main className="max-w-4xl mx-auto px-4 py-10">
        <nav aria-label="Breadcrumb" className="text-sm mb-3 text-slate-600">
          <Link href="/">Home</Link> {' / '}
          <Link href="/tools">Tools</Link> {' / '}
          <span>JSON Formatter</span>
        </nav>

        <header className="mb-4">
          <h1 className="text-3xl font-semibold leading-tight">JSON Formatter & Validator</h1>
          <p className="text-gray-600 mt-2">
            Validate, format and download JSON files directly in your browser. Ideal for API payloads, config files and developer workflows.
          </p>
        </header>

        <section className="mt-4">
          <div className="bg-white rounded-lg p-4 shadow-sm border border-slate-100">
            <JsonFormatterClient />
          </div>
        </section>

        <div className="mt-6 flex justify-center">
          <AdPlaceholder />
        </div>

        <article className="prose prose-lg mt-8">
          <h2>Format and Validate JSON</h2>
          <p>
            Paste JSON and discover syntax errors instantly. The formatter makes JSON easier to read and helps prevent invalid data from being used in applications.
          </p>
          <h2>Why use this tool?</h2>
          <ul>
            <li>Check JSON syntax instantly in the browser.</li>
            <li>Download cleaned and pretty-printed JSON files.</li>
            <li>No uploads required — all processing stays on your device.</li>
          </ul>
        </article>
      </main>

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(pageJsonLd) }} />
    </>
  );
}
