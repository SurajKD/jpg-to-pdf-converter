import type { Metadata } from 'next'
import dynamic from 'next/dynamic'
import Link from 'next/link'
import React from 'react'
import ShareButton from '../../../components/ShareButton'

const JSONCSVConverterClient = dynamic(
  () => import('../../../components/tools/JSONCSVConverterClient'),
  { ssr: false, loading: () => <div className="h-48" /> }
)

const AdPlaceholder = dynamic(
  () => import('../../../components/AdPlaceholder'),
  { ssr: false, loading: () => <div className="h-24" /> }
)

export const metadata: Metadata = {
  title: 'JSON ↔ CSV Converter — Convert Between Formats Free',
  description:
    'Convert JSON to CSV or CSV to JSON online. Support for custom delimiters. Fast, free, and client-side only.',
  keywords: ['JSON converter', 'CSV converter', 'JSON to CSV', 'CSV to JSON', 'data converter'],
  alternates: { canonical: 'https://anyfileconverter.online/tools/json-csv-converter' },
  openGraph: {
    title: 'JSON ↔ CSV Converter — AnyFileConverter',
    description: 'Convert between JSON and CSV formats instantly',
    url: 'https://anyfileconverter.online/tools/json-csv-converter',
    type: 'website',
  },
}

const pageJsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'SoftwareApplication',
      '@id': 'https://anyfileconverter.online/tools/json-csv-converter#app',
      name: 'JSON ↔ CSV Converter',
      description: 'Convert data between JSON arrays and CSV format in the browser.',
      applicationCategory: 'FileConverter',
      operatingSystem: 'Web',
      url: 'https://anyfileconverter.online/tools/json-csv-converter',
      offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
    },
    {
      '@type': 'WebApplication',
      '@id': 'https://anyfileconverter.online/tools/json-csv-converter#webapp',
      name: 'JSON ↔ CSV Converter',
      description: 'Browser-based JSON and CSV conversion with preview and delimiter controls.',
      applicationCategory: 'Utility',
      url: 'https://anyfileconverter.online/tools/json-csv-converter',
      offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
    },
    {
      '@type': 'BreadcrumbList',
      '@id': 'https://anyfileconverter.online/tools/json-csv-converter#breadcrumbs',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://anyfileconverter.online/' },
        { '@type': 'ListItem', position: 2, name: 'Tools', item: 'https://anyfileconverter.online/tools' },
        { '@type': 'ListItem', position: 3, name: 'JSON ↔ CSV Converter', item: 'https://anyfileconverter.online/tools/json-csv-converter' },
      ],
    },
  ],
}

export default function JSONCSVConverterPage() {
  return (
    <>
      <main className="max-w-4xl mx-auto px-4 py-10">
        <nav aria-label="Breadcrumb" className="text-sm mb-3 text-slate-600">
          <Link href="/">Home</Link> {' / '} <Link href="/tools">Tools</Link> {' / '} <span>JSON ↔ CSV Converter</span>
        </nav>

        <header className="mb-4">
          <h1 className="text-3xl font-semibold leading-tight">JSON ↔ CSV Converter — Convert Data Formats in Browser</h1>
          <p className="text-gray-600 mt-2">
            Convert JSON arrays to CSV or CSV tables to JSON instantly. Choose delimiters, preview output, and download without leaving your browser.
          </p>
        </header>

        <section className="mt-4">
          <div className="bg-white rounded-lg p-4 shadow-sm border border-slate-100">
            <JSONCSVConverterClient />
          </div>
        </section>

        <div className="mt-6 flex justify-center">
          <AdPlaceholder />
        </div>
        <ShareButton/>
      </main>

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(pageJsonLd) }} />
    </>
  )
}
