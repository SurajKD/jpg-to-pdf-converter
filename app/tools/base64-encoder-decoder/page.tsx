import type { Metadata } from 'next'
import dynamic from 'next/dynamic'
import Link from 'next/link'
import React from 'react'

const Base64EncoderDecoderClient = dynamic(
  () =>
    import('../../../components/tools/Base64EncoderDecoderClient').then(
      (mod) => mod.default
    ),
  {
    ssr: false,
    loading: () => <div className="h-48" />,
  }
)

const AdPlaceholder = dynamic(
  () => import('../../../components/AdPlaceholder'),
  { ssr: false, loading: () => <div className="h-24" /> }
)

export const metadata: Metadata = {
  title: 'Base64 Encoder/Decoder — Encode & Decode Text & Files',
  description:
    'Encode and decode Base64 strings online. Convert text and files to/from Base64 instantly. Free and secure.',
  keywords: ['Base64 encoder', 'Base64 decoder', 'encode Base64', 'decode Base64', 'Base64 converter'],
  alternates: { canonical: 'https://anyfileconverter.online/tools/base64-encoder-decoder' },
  openGraph: {
    title: 'Base64 Encoder/Decoder — AnyFileConverter',
    description: 'Encode and decode Base64 instantly',
    url: 'https://anyfileconverter.online/tools/base64-encoder-decoder',
    type: 'website',
  },
}

const pageJsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'SoftwareApplication',
      '@id': 'https://anyfileconverter.online/tools/base64-encoder-decoder#app',
      name: 'Base64 Encoder/Decoder',
      description: 'Encode and decode Base64 text and files in the browser.',
      applicationCategory: 'Utility',
      operatingSystem: 'Web',
      url: 'https://anyfileconverter.online/tools/base64-encoder-decoder',
      offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
    },
    {
      '@type': 'WebApplication',
      '@id': 'https://anyfileconverter.online/tools/base64-encoder-decoder#webapp',
      name: 'Base64 Encoder/Decoder',
      description: 'Browser-based Base64 encoder and decoder for text and files.',
      applicationCategory: 'Utility',
      url: 'https://anyfileconverter.online/tools/base64-encoder-decoder',
      offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
    },
    {
      '@type': 'BreadcrumbList',
      '@id': 'https://anyfileconverter.online/tools/base64-encoder-decoder#breadcrumbs',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://anyfileconverter.online/' },
        { '@type': 'ListItem', position: 2, name: 'Tools', item: 'https://anyfileconverter.online/tools' },
        { '@type': 'ListItem', position: 3, name: 'Base64 Encoder/Decoder', item: 'https://anyfileconverter.online/tools/base64-encoder-decoder' },
      ],
    },
  ],
}

export default function Base64EncoderDecoderPage() {
  return (
    <>
      <main className="max-w-4xl mx-auto px-4 py-10">
        <nav aria-label="Breadcrumb" className="text-sm mb-3 text-slate-600">
          <Link href="/">Home</Link> {' / '} <Link href="/tools">Tools</Link> {' / '} <span>Base64 Encoder/Decoder</span>
        </nav>

        <header className="mb-4">
          <h1 className="text-3xl font-semibold leading-tight">Base64 Encoder/Decoder — Encode &amp; Decode Text and Files</h1>
          <p className="text-gray-600 mt-2">
            Convert text and files to Base64 or decode Base64 strings back into readable content. Works entirely in your browser, so your data stays private.
          </p>
        </header>

        <section className="mt-4">
          <div className="bg-white rounded-lg p-4 shadow-sm border border-slate-100">
            <Base64EncoderDecoderClient />
          </div>
        </section>

        <div className="mt-6 flex justify-center">
          <AdPlaceholder />
        </div>
      </main>

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(pageJsonLd) }} />
    </>
  )
}
