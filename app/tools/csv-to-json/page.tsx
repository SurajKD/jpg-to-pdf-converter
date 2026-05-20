import type { Metadata } from 'next';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import React from 'react';

const CsvToJsonClient = dynamic(
  () => import('../../../components/CsvToJsonClient'),
  { ssr: false, loading: () => <div className="h-48" /> }
);
const AdPlaceholder = dynamic(
  () => import('../../../components/AdPlaceholder'),
  { ssr: false, loading: () => <div className="h-24" /> }
);

export const metadata: Metadata = {
  title: 'CSV to JSON Converter — Free Online CSV → JSON Tool',
  description:
    'Convert CSV tables into JSON objects in your browser. Free online CSV to JSON converter for APIs and data workflows.',
  keywords: ['csv to json', 'csv converter', 'convert csv to json', 'online csv to json', 'json export', 'csv tool'],
  alternates: { canonical: 'https://anyfileconverter.online/tools/csv-to-json' },
  openGraph: {
    title: 'CSV to JSON Converter — Free Online Tool',
    description:
      'Convert CSV data into structured JSON objects directly in your browser. Great for APIs, imports, and data processing.',
    url: 'https://anyfileconverter.online/tools/csv-to-json',
    siteName: 'AnyFileConverter',
    type: 'article',
    locale: 'en_US',
    images: [
      {
        url: 'https://anyfileconverter.online/landing-og.jpg',
        width: 1200,
        height: 630,
        alt: 'CSV to JSON Converter Preview',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'CSV to JSON Converter — Free Online Tool',
    description:
      'Convert CSV data into JSON objects in your browser with no uploads required.',
    images: ['https://anyfileconverter.online/landing-og.jpg'],
  },
};

const pageJsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'SoftwareApplication',
      '@id': 'https://anyfileconverter.online/tools/csv-to-json#app',
      name: 'CSV to JSON Converter',
      description:
        'Convert CSV tables into structured JSON objects directly in your browser.',
      applicationCategory: 'DeveloperTool',
      operatingSystem: 'Web',
      url: 'https://anyfileconverter.online/tools/csv-to-json',
      offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
    },
    {
      '@type': 'WebApplication',
      '@id': 'https://anyfileconverter.online/tools/csv-to-json#webapp',
      name: 'CSV to JSON Converter',
      description:
        'Free online tool to turn CSV export data into JSON objects for APIs and apps.',
      applicationCategory: 'Utility',
      url: 'https://anyfileconverter.online/tools/csv-to-json',
      offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
    },
    {
      '@type': 'BreadcrumbList',
      '@id': 'https://anyfileconverter.online/tools/csv-to-json#breadcrumbs',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://anyfileconverter.online/' },
        { '@type': 'ListItem', position: 2, name: 'Tools', item: 'https://anyfileconverter.online/tools' },
        { '@type': 'ListItem', position: 3, name: 'CSV to JSON', item: 'https://anyfileconverter.online/tools/csv-to-json' },
      ],
    },
  ],
};

export default function CsvToJsonPage() {
  return (
    <>
      <main className="max-w-4xl mx-auto px-4 py-10">
        <nav aria-label="Breadcrumb" className="text-sm mb-3 text-slate-600">
          <Link href="/">Home</Link> {' / '}
          <Link href="/tools">Tools</Link> {' / '}
          <span>CSV to JSON</span>
        </nav>

        <header className="mb-4">
          <h1 className="text-3xl font-semibold leading-tight">CSV → JSON</h1>
          <p className="text-gray-600 mt-2">
            Convert CSV rows into JSON objects using browser-based parsing. The first row becomes headers and maps to JSON keys automatically.
          </p>
        </header>

        <section className="mt-4">
          <div className="bg-white rounded-lg p-4 shadow-sm border border-slate-100">
            <CsvToJsonClient />
          </div>
        </section>

        <div className="mt-6 flex justify-center">
          <AdPlaceholder />
        </div>

        <article className="prose prose-lg mt-8">
          <h2>Convert CSV to JSON instantly</h2>
          <p>
            This tool helps you prepare CSV exports for APIs, database imports, and JavaScript apps. Use header rows to define field names and get clean JSON output.
          </p>
        </article>
      </main>

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(pageJsonLd) }} />
    </>
  );
}
