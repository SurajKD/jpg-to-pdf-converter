import type { Metadata } from 'next'
import dynamic from 'next/dynamic'
import Link from 'next/link'
import React from 'react'

const QRCodeGeneratorClient = dynamic(
  () => import('../../../components/tools/QRCodeGeneratorClient'),
  { ssr: false, loading: () => <div className="h-48" /> }
)

const AdPlaceholder = dynamic(
  () => import('../../../components/AdPlaceholder'),
  { ssr: false, loading: () => <div className="h-24" /> }
)

export const metadata: Metadata = {
  title: 'QR Code Generator — Create Custom QR Codes Free',
  description:
    'Generate QR codes for URLs, text, emails, and WiFi networks. Customize colors, download as PNG. Free and client-side.',
  keywords: ['QR code generator', 'QR code maker', 'QR code creator', 'free QR code'],
  alternates: { canonical: 'https://anyfileconverter.online/tools/qr-code-generator' },
  openGraph: {
    title: 'QR Code Generator — AnyFileConverter',
    description: 'Create and customize QR codes instantly',
    url: 'https://anyfileconverter.online/tools/qr-code-generator',
    type: 'website',
  },
}

const pageJsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'SoftwareApplication',
      '@id': 'https://anyfileconverter.online/tools/qr-code-generator#app',
      name: 'QR Code Generator',
      description: 'Create custom QR codes for text, links, email and WiFi in your browser.',
      applicationCategory: 'Utility',
      operatingSystem: 'Web',
      url: 'https://anyfileconverter.online/tools/qr-code-generator',
      offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
    },
    {
      '@type': 'WebApplication',
      '@id': 'https://anyfileconverter.online/tools/qr-code-generator#webapp',
      name: 'QR Code Generator',
      description: 'Browser-based QR code creation tool with customizable colors and output.',
      applicationCategory: 'Utility',
      url: 'https://anyfileconverter.online/tools/qr-code-generator',
      offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
    },
    {
      '@type': 'BreadcrumbList',
      '@id': 'https://anyfileconverter.online/tools/qr-code-generator#breadcrumbs',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://anyfileconverter.online/' },
        { '@type': 'ListItem', position: 2, name: 'Tools', item: 'https://anyfileconverter.online/tools' },
        { '@type': 'ListItem', position: 3, name: 'QR Code Generator', item: 'https://anyfileconverter.online/tools/qr-code-generator' },
      ],
    },
  ],
}

export default function QRCodeGeneratorPage() {
  return (
    <>
      <main className="max-w-4xl mx-auto px-4 py-10">
        <nav aria-label="Breadcrumb" className="text-sm mb-3 text-slate-600">
          <Link href="/">Home</Link> {' / '} <Link href="/tools">Tools</Link> {' / '} <span>QR Code Generator</span>
        </nav>

        <header className="mb-4">
          <h1 className="text-3xl font-semibold leading-tight">QR Code Generator — Create Custom QR Codes</h1>
          <p className="text-gray-600 mt-2">
            Generate QR codes for links, text, email and WiFi credentials. Customize colors, size and error correction, then download your PNG.
          </p>
        </header>

        <section className="mt-4">
          <div className="bg-white rounded-lg p-4 shadow-sm border border-slate-100">
            <QRCodeGeneratorClient />
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
