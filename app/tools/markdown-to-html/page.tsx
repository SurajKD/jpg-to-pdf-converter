import type { Metadata } from 'next';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import React from 'react';

const MarkdownToHtmlClient = dynamic(
  () => import('../../../components/MarkdownToHtmlClient'),
  { ssr: false, loading: () => <div className="h-48" /> }
);
const AdPlaceholder = dynamic(
  () => import('../../../components/AdPlaceholder'),
  { ssr: false, loading: () => <div className="h-24" /> }
);

export const metadata: Metadata = {
  title: 'Markdown to HTML Converter — Free Online Markdown Export',
  description:
    'Convert Markdown into HTML in your browser. Free markdown to HTML converter for docs, blogs, and static pages.',
  keywords: ['markdown to html', 'markdown converter', 'convert markdown', 'html export', 'online markdown tool'],
  alternates: { canonical: 'https://anyfileconverter.online/tools/markdown-to-html' },
  openGraph: {
    title: 'Markdown to HTML Converter — Free Online Export',
    description:
      'Convert Markdown text into HTML and download a ready-made HTML file with this browser-based tool.',
    url: 'https://anyfileconverter.online/tools/markdown-to-html',
    siteName: 'AnyFileConverter',
    type: 'article',
    locale: 'en_US',
    images: [
      {
        url: 'https://anyfileconverter.online/landing-og.jpg',
        width: 1200,
        height: 630,
        alt: 'Markdown to HTML Converter Preview',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Markdown to HTML — Free Online Converter',
    description:
      'Convert Markdown to HTML in your browser and download a full HTML file instantly.',
    images: ['https://anyfileconverter.online/landing-og.jpg'],
  },
};

const pageJsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'SoftwareApplication',
      '@id': 'https://anyfileconverter.online/tools/markdown-to-html#app',
      name: 'Markdown to HTML Converter',
      description:
        'Convert Markdown documents into HTML and download a ready-made HTML file.',
      applicationCategory: 'DeveloperTool',
      operatingSystem: 'Web',
      url: 'https://anyfileconverter.online/tools/markdown-to-html',
      offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
    },
    {
      '@type': 'WebApplication',
      '@id': 'https://anyfileconverter.online/tools/markdown-to-html#webapp',
      name: 'Markdown to HTML Converter',
      description:
        'Free online tool to convert Markdown text into HTML for documentation and blog content.',
      applicationCategory: 'Utility',
      url: 'https://anyfileconverter.online/tools/markdown-to-html',
      offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
    },
    {
      '@type': 'BreadcrumbList',
      '@id': 'https://anyfileconverter.online/tools/markdown-to-html#breadcrumbs',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://anyfileconverter.online/' },
        { '@type': 'ListItem', position: 2, name: 'Tools', item: 'https://anyfileconverter.online/tools' },
        { '@type': 'ListItem', position: 3, name: 'Markdown to HTML', item: 'https://anyfileconverter.online/tools/markdown-to-html' },
      ],
    },
  ],
};

export default function MarkdownToHtmlPage() {
  return (
    <>
      <main className="max-w-4xl mx-auto px-4 py-10">
        <nav aria-label="Breadcrumb" className="text-sm mb-3 text-slate-600">
          <Link href="/">Home</Link> {' / '}
          <Link href="/tools">Tools</Link> {' / '}
          <span>Markdown to HTML</span>
        </nav>

        <header className="mb-4">
          <h1 className="text-3xl font-semibold leading-tight">Markdown → HTML</h1>
          <p className="text-gray-600 mt-2">
            Convert Markdown text into HTML and download a full HTML file instantly. Great for docs, blogs, and static content.
          </p>
        </header>

        <section className="mt-4">
          <div className="bg-white rounded-lg p-4 shadow-sm border border-slate-100">
            <MarkdownToHtmlClient />
          </div>
        </section>

        <div className="mt-6 flex justify-center">
          <AdPlaceholder />
        </div>

        <article className="prose prose-lg mt-8">
          <h2>Convert Markdown to HTML in the browser</h2>
          <p>
            Paste your markdown content and get instant HTML output. The tool supports headings, emphasis, inline code, links and basic formatting so you can generate web-ready content fast.
          </p>
        </article>
      </main>

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(pageJsonLd) }} />
    </>
  );
}
