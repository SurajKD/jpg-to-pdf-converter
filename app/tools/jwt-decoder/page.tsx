import type { Metadata } from 'next'
import dynamic from 'next/dynamic'
import Link from 'next/link'
import React from 'react'

const JWTDecoderClient = dynamic(
  () => import('../../../components/tools/JWTDecoderClient'),
  { ssr: false, loading: () => <div className="h-48" /> }
)

const AdPlaceholder = dynamic(
  () => import('../../../components/AdPlaceholder'),
  { ssr: false, loading: () => <div className="h-24" /> }
)

export const metadata: Metadata = {
  title: 'JWT Decoder — Decode JSON Web Tokens Instantly',
  description:
    'Decode JWT tokens online. View headers, payloads, verify signatures, and check expiration dates. Fast, secure, and client-side only.',
  keywords: [
    'JWT decoder',
    'decode JWT',
    'JSON web token',
    'JWT validator',
    'token decoder',
    'JWT tool',
  ],
  alternates: { canonical: 'https://anyfileconverter.online/tools/jwt-decoder' },
  openGraph: {
    title: 'JWT Decoder — AnyFileConverter',
    description: 'Decode and validate JWT tokens instantly',
    url: 'https://anyfileconverter.online/tools/jwt-decoder',
    type: 'website',
  },
}

const pageJsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'SoftwareApplication',
      '@id': 'https://anyfileconverter.online/tools/jwt-decoder#app',
      name: 'JWT Decoder',
      description: 'Inspect JWT headers, payloads, and signature claims in the browser.',
      applicationCategory: 'Utility',
      operatingSystem: 'Web',
      url: 'https://anyfileconverter.online/tools/jwt-decoder',
      offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
    },
    {
      '@type': 'WebApplication',
      '@id': 'https://anyfileconverter.online/tools/jwt-decoder#webapp',
      name: 'JWT Decoder',
      description: 'Client-side JWT token inspection and validation tool.',
      applicationCategory: 'Utility',
      url: 'https://anyfileconverter.online/tools/jwt-decoder',
      offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
    },
    {
      '@type': 'BreadcrumbList',
      '@id': 'https://anyfileconverter.online/tools/jwt-decoder#breadcrumbs',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://anyfileconverter.online/' },
        { '@type': 'ListItem', position: 2, name: 'Tools', item: 'https://anyfileconverter.online/tools' },
        { '@type': 'ListItem', position: 3, name: 'JWT Decoder', item: 'https://anyfileconverter.online/tools/jwt-decoder' },
      ],
    },
  ],
}

export default function JWTDecoderPage() {
  return (
    <>
      <main className="max-w-4xl mx-auto px-4 py-10">
        <nav aria-label="Breadcrumb" className="text-sm mb-3 text-slate-600">
          <Link href="/">Home</Link> {' / '} <Link href="/tools">Tools</Link> {' / '} <span>JWT Decoder</span>
        </nav>

        <header className="mb-4">
          <h1 className="text-3xl font-semibold leading-tight">JWT Decoder — Inspect Tokens and Claims</h1>
          <p className="text-gray-600 mt-2">
            Decode JWT tokens in your browser to view headers, payloads, and signature details. Check expiration and decode safely without uploading your token.
          </p>
        </header>

        <section className="mt-4">
          <div className="bg-white rounded-lg p-4 shadow-sm border border-slate-100">
            <JWTDecoderClient />
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
