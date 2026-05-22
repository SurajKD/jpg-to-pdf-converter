import type { Metadata } from 'next';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import React from 'react';
import ShareButton from '../../../components/ShareButton';

const SvgToPngClient = dynamic(
  () => import('../../../components/SvgToPngClient'),
  { ssr: false, loading: () => <div className="h-48" /> }
);
const AdPlaceholder = dynamic(
  () => import('../../../components/AdPlaceholder'),
  { ssr: false, loading: () => <div className="h-24" /> }
);

export const metadata: Metadata = {
  title: 'SVG to PNG Converter — Free Online SVG → PNG Export',
  description:
    'Convert SVG files or SVG markup to PNG images in your browser. Fast, private and free browser-based SVG to PNG converter for designers and developers.',
  keywords: ['svg to png', 'svg converter', 'svg png export', 'online svg to png', 'vector to raster', 'free svg converter'],
  alternates: { canonical: 'https://anyfileconverter.online/tools/svg-to-png' },
  openGraph: {
    title: 'SVG to PNG Converter — Free Online Export',
    description:
      'Convert SVG files or markup to PNG images directly in your browser. Fast and private browser-based SVG to PNG conversion.',
    url: 'https://anyfileconverter.online/tools/svg-to-png',
    siteName: 'AnyFileConverter',
    type: 'article',
    locale: 'en_US',
    images: [
      {
        url: 'https://anyfileconverter.online/landing-og.jpg',
        width: 1200,
        height: 630,
        alt: 'SVG to PNG Converter Preview',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'SVG to PNG Converter — Free Online Export',
    description:
      'Convert SVG files or markup into PNG images directly in your browser with privacy-first conversion.',
    images: ['https://anyfileconverter.online/landing-og.jpg'],
  },
};

const pageJsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'SoftwareApplication',
      '@id': 'https://anyfileconverter.online/tools/svg-to-png#app',
      name: 'SVG to PNG Converter',
      description:
        'Convert SVG files or SVG markup into downloadable PNG images directly in your browser.',
      applicationCategory: 'ImageTool',
      operatingSystem: 'Web',
      url: 'https://anyfileconverter.online/tools/svg-to-png',
      offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
    },
    {
      '@type': 'WebApplication',
      '@id': 'https://anyfileconverter.online/tools/svg-to-png#webapp',
      name: 'SVG to PNG Converter',
      description:
        'Free online tool to export SVG markup or SVG files as PNG images with client-side processing.',
      applicationCategory: 'Utility',
      url: 'https://anyfileconverter.online/tools/svg-to-png',
      offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
    },
    {
      '@type': 'BreadcrumbList',
      '@id': 'https://anyfileconverter.online/tools/svg-to-png#breadcrumbs',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://anyfileconverter.online/' },
        { '@type': 'ListItem', position: 2, name: 'Tools', item: 'https://anyfileconverter.online/tools' },
        { '@type': 'ListItem', position: 3, name: 'SVG to PNG', item: 'https://anyfileconverter.online/tools/svg-to-png' },
      ],
    },
  ],
};

export default function SvgToPngPage() {
  return (
    <>
      <main className="max-w-4xl mx-auto px-4 py-10">
        <nav aria-label="Breadcrumb" className="text-sm mb-3 text-slate-600">
          <Link href="/">Home</Link> {' / '}
          <Link href="/tools">Tools</Link> {' / '}
          <span>SVG to PNG</span>
        </nav>

        <header className="mb-4">
          <h1 className="text-3xl font-semibold leading-tight">SVG → PNG Converter</h1>
          <p className="text-gray-600 mt-2">
            Convert SVG markup or .svg files to PNG images directly in your browser. This tool is fast, private, and free to use.
          </p>
        </header>

        <section className="mt-4">
          <div className="bg-white rounded-lg p-4 shadow-sm border border-slate-100">
            <SvgToPngClient />
          </div>
        </section>

        <div className="mt-6 flex justify-center">
          <AdPlaceholder />
        </div>
        <ShareButton />

        <article className="prose prose-lg mt-8">
          <h2>Export SVG to PNG in the browser</h2>
          <p>
            Use this converter to turn SVG vector graphics into raster PNG images without installing software. It is ideal for creating previews, exporting icons, and generating assets for web or mobile apps.
          </p>
          <h2>How it works</h2>
          <ul>
            <li>Upload an SVG file or paste SVG markup.</li>
            <li>Render the SVG content in the browser.</li>
            <li>Download the converted PNG image instantly.</li>
          </ul>
        </article>
      </main>

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(pageJsonLd) }} />
    </>
  );
}
