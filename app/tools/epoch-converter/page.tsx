import type { Metadata } from 'next';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import React from 'react';
import ShareButton from '../../../components/ShareButton';

const EpochConverterClient = dynamic(
  () => import('../../../components/EpochConverterClient'),
  { ssr: false, loading: () => <div className="h-48" /> }
);
const AdPlaceholder = dynamic(
  () => import('../../../components/AdPlaceholder'),
  { ssr: false, loading: () => <div className="h-24" /> }
);

export const metadata: Metadata = {
  title: 'Epoch Time Converter — Free Online Timestamp Converter',
  description:
    'Convert epoch timestamps in seconds or milliseconds to readable dates and times in your browser. Free online epoch converter for logs and APIs.',
  keywords: ['epoch converter', 'timestamp converter', 'epoch to date', 'online epoch converter', 'convert epoch time'],
  alternates: { canonical: 'https://anyfileconverter.online/tools/epoch-converter' },
  openGraph: {
    title: 'Epoch Time Converter — Free Online Timestamp Tool',
    description:
      'Convert epoch seconds and milliseconds into readable dates and times in your browser with this privacy-first timestamp converter.',
    url: 'https://anyfileconverter.online/tools/epoch-converter',
    siteName: 'AnyFileConverter',
    type: 'article',
    locale: 'en_US',
    images: [
      {
        url: 'https://anyfileconverter.online/landing-og.jpg',
        width: 1200,
        height: 630,
        alt: 'Epoch Time Converter Preview',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Epoch Time Converter — Free Online Tool',
    description:
      'Convert epoch timestamps in seconds or milliseconds into readable date and time strings directly in your browser.',
    images: ['https://anyfileconverter.online/landing-og.jpg'],
  },
};

const pageJsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'SoftwareApplication',
      '@id': 'https://anyfileconverter.online/tools/epoch-converter#app',
      name: 'Epoch Time Converter',
      description:
        'Convert epoch timestamps in seconds or milliseconds into human-readable date and time values.',
      applicationCategory: 'DeveloperTool',
      operatingSystem: 'Web',
      url: 'https://anyfileconverter.online/tools/epoch-converter',
      offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
    },
    {
      '@type': 'WebApplication',
      '@id': 'https://anyfileconverter.online/tools/epoch-converter#webapp',
      name: 'Epoch Time Converter',
      description:
        'Free online tool to decode epoch timestamps into readable dates and times for logs and API data.',
      applicationCategory: 'Utility',
      url: 'https://anyfileconverter.online/tools/epoch-converter',
      offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
    },
    {
      '@type': 'BreadcrumbList',
      '@id': 'https://anyfileconverter.online/tools/epoch-converter#breadcrumbs',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://anyfileconverter.online/' },
        { '@type': 'ListItem', position: 2, name: 'Tools', item: 'https://anyfileconverter.online/tools' },
        { '@type': 'ListItem', position: 3, name: 'Epoch Converter', item: 'https://anyfileconverter.online/tools/epoch-converter' },
      ],
    },
  ],
};

export default function EpochConverterPage() {
  return (
    <>
      <main className="max-w-4xl mx-auto px-4 py-10">
        <nav aria-label="Breadcrumb" className="text-sm mb-3 text-slate-600">
          <Link href="/">Home</Link> {' / '}
          <Link href="/tools">Tools</Link> {' / '}
          <span>Epoch Converter</span>
        </nav>

        <header className="mb-4">
          <h1 className="text-3xl font-semibold leading-tight">Epoch Time Converter</h1>
          <p className="text-gray-600 mt-2">
            Convert epoch timestamps in seconds or milliseconds to readable dates and times. Great for log analysis and API inspection.
          </p>
        </header>

        <section className="mt-4">
          <div className="bg-white rounded-lg p-4 shadow-sm border border-slate-100">
            <EpochConverterClient />
          </div>
        </section>

        <div className="mt-6 flex justify-center">
          <AdPlaceholder />
        </div>
        <ShareButton />
        <article className="prose prose-lg mt-8">
          <h2>Decode epoch timestamps instantly</h2>
          <p>
            Use this tool to convert raw epoch values into standard date and time strings. It supports both second-based and millisecond-based timestamps used by logs and APIs.
          </p>
        </article>
      </main>

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(pageJsonLd) }} />
    </>
  );
}
