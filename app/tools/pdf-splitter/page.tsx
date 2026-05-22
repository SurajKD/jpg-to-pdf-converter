import type { Metadata } from 'next'
import dynamic from 'next/dynamic'
import Link from 'next/link'
import React from 'react'
import ShareButton from '../../../components/ShareButton'

const PDFSplitterClient = dynamic(
  () => import('../../../components/tools/PDFSplitterClient'),
  { ssr: false, loading: () => <div className="h-48" /> }
)

const AdPlaceholder = dynamic(
  () => import('../../../components/AdPlaceholder'),
  { ssr: false, loading: () => <div className="h-24" /> }
)

export const metadata: Metadata = {
  title: 'PDF Splitter — Extract & Split PDF Pages Free',
  description:
    'Split PDF files by page range. Extract specific pages and download. Fast, secure, and completely client-side.',
  keywords: ['PDF splitter', 'split PDF', 'extract PDF pages', 'PDF tool', 'page extractor'],
  alternates: { canonical: 'https://anyfileconverter.online/tools/pdf-splitter' },
  openGraph: {
    title: 'PDF Splitter — AnyFileConverter',
    description: 'Split and extract PDF pages instantly',
    url: 'https://anyfileconverter.online/tools/pdf-splitter',
    type: 'website',
  },
}

const pageJsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'SoftwareApplication',
      '@id': 'https://anyfileconverter.online/tools/pdf-splitter#app',
      name: 'PDF Splitter',
      description: 'Extract and split pages from PDF files in the browser.',
      applicationCategory: 'FileConverter',
      operatingSystem: 'Web',
      url: 'https://anyfileconverter.online/tools/pdf-splitter',
      offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
    },
    {
      '@type': 'WebApplication',
      '@id': 'https://anyfileconverter.online/tools/pdf-splitter#webapp',
      name: 'PDF Splitter',
      description: 'Browser-based PDF page extraction and splitting tool.',
      applicationCategory: 'Utility',
      url: 'https://anyfileconverter.online/tools/pdf-splitter',
      offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
    },
    {
      '@type': 'BreadcrumbList',
      '@id': 'https://anyfileconverter.online/tools/pdf-splitter#breadcrumbs',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://anyfileconverter.online/' },
        { '@type': 'ListItem', position: 2, name: 'Tools', item: 'https://anyfileconverter.online/tools' },
        { '@type': 'ListItem', position: 3, name: 'PDF Splitter', item: 'https://anyfileconverter.online/tools/pdf-splitter' },
      ],
    },
  ],
}

export default function PDFSplitterPage() {
  return (
    <>
      <main className="max-w-4xl mx-auto px-4 py-10">
        <nav aria-label="Breadcrumb" className="text-sm mb-3 text-slate-600">
          <Link href="/">Home</Link> {' / '} <Link href="/tools">Tools</Link> {' / '} <span>PDF Splitter</span>
        </nav>

        <header className="mb-4">
          <h1 className="text-3xl font-semibold leading-tight">PDF Splitter — Extract Pages and Create New PDFs</h1>
          <p className="text-gray-600 mt-2">
            Split PDF documents by pages or page range, then download selected pages instantly. This tool works entirely in your browser for private processing.
          </p>
        </header>

        <section className="mt-4">
          <div className="bg-white rounded-lg p-4 shadow-sm border border-slate-100">
            <PDFSplitterClient />
          </div>
        </section>

        <div className="mt-6 flex justify-center">
          <AdPlaceholder />
        </div>
        <ShareButton />
      </main>

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(pageJsonLd) }} />
    </>
  )
}
