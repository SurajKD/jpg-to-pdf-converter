import type { Metadata } from 'next'
import dynamic from 'next/dynamic'
import Link from 'next/link'
import React from 'react'
import ShareButton from '../../../components/ShareButton'

const YoutubeThumbnailDownloaderClient = dynamic(
  () => import('../../../components/tools/YoutubeThumbnailDownloaderClient'),
  { ssr: false, loading: () => <div style={{ height: 250 }} /> }
)

const AdPlaceholder = dynamic(
  () => import('../../../components/AdPlaceholder'),
  { ssr: false, loading: () => <div style={{ height: 90 }} /> }
)

export const metadata: Metadata = {
  title: 'YouTube Thumbnail Downloader — Download YouTube Thumbnail HD Free',
  description:
    'Free online YouTube thumbnail downloader & extractor. Extract and download high-quality (HD, 1080p, 720p) thumbnails from YouTube videos, Shorts, and Live streams.',
  keywords: [
    'youtube thumbnail downloader',
    'download youtube thumbnail',
    'youtube thumbnail hd',
    'youtube thumbnail extractor',
    'youtube shorts thumbnail downloader',
    'free youtube thumbnail downloader',
  ],
  alternates: { canonical: 'https://anyfileconverter.online/tools/youtube-thumbnail-downloader' },
  openGraph: {
    title: 'YouTube Thumbnail Downloader — Free Online Tool (Fast & Secure)',
    description: 'Instantly extract and download YouTube video thumbnails in all resolutions including HD, SD, HQ, and MQ. Free & client-side.',
    url: 'https://anyfileconverter.online/tools/youtube-thumbnail-downloader',
    type: 'website',
  },
}

const pageJsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'SoftwareApplication',
      '@id': 'https://anyfileconverter.online/tools/youtube-thumbnail-downloader#app',
      name: 'YouTube Thumbnail Downloader',
      description: 'Free browser-based utility to instantly extract and download YouTube thumbnails in multiple resolutions.',
      applicationCategory: 'Utility',
      operatingSystem: 'Web',
      url: 'https://anyfileconverter.online/tools/youtube-thumbnail-downloader',
      offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
    },
    {
      '@type': 'WebApplication',
      '@id': 'https://anyfileconverter.online/tools/youtube-thumbnail-downloader#webapp',
      name: 'YouTube Thumbnail Downloader Extractor',
      description: 'Browser-based YouTube thumbnail extractor with multiple resolution support, copy functionality and local history.',
      applicationCategory: 'Utility',
      url: 'https://anyfileconverter.online/tools/youtube-thumbnail-downloader',
      offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
    },
    {
      '@type': 'BreadcrumbList',
      '@id': 'https://anyfileconverter.online/tools/youtube-thumbnail-downloader#breadcrumbs',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://anyfileconverter.online/' },
        { '@type': 'ListItem', position: 2, name: 'Tools', item: 'https://anyfileconverter.online/tools' },
        { '@type': 'ListItem', position: 3, name: 'YouTube Thumbnail Downloader', item: 'https://anyfileconverter.online/tools/youtube-thumbnail-downloader' },
      ],
    },
    {
      '@type': 'FAQPage',
      '@id': 'https://anyfileconverter.online/tools/youtube-thumbnail-downloader#faq',
      mainEntity: [
        {
          '@type': 'Question',
          name: 'Is this YouTube thumbnail downloader free?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Yes. Our extractor tool is 100% free with unlimited usages. You can fetch and download thumbnails in any resolution without registrations.',
          },
        },
        {
          '@type': 'Question',
          name: 'Can I download HD thumbnails?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Yes, if the uploader uploaded an HD cover image, you can download it in 1280x720 (720p HD) and 1920x1080 (1080p Full HD) Max Resolution.',
          },
        },
        {
          '@type': 'Question',
          name: 'Does it support YouTube Shorts?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Yes. It fully supports standard YouTube videos, YouTube Shorts, Live streams, and custom embed URLs.',
          },
        },
        {
          '@type': 'Question',
          name: 'Are thumbnails stored on your server?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'No. All processing happens locally in your browser. We do not store or track any YouTube URLs on our servers. Your local history is stored only on your own device.',
          },
        },
        {
          '@type': 'Question',
          name: 'Why are some thumbnails unavailable?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'YouTube automatically scales thumbnails to various resolutions. However, if a video has a lower resolution or was uploaded a long time ago, the Max Resolution cover (1280x720) may not exist on YouTube servers.',
          },
        },
      ],
    },
  ],
}

export default function YoutubeThumbnailDownloaderPage() {
  return (
    <>
      <main
        style={{
          padding: 24,
          maxWidth: 950,
          margin: '0 auto',
          lineHeight: 1.8,
        }}
      >
        {/* Breadcrumb */}
        <nav
          aria-label="Breadcrumb"
          style={{
            marginBottom: 16,
            fontSize: 14,
          }}
        >
          <Link href="/">Home</Link> {' / '}
          <Link href="/tools">Tools</Link> {' / '}
          YouTube Thumbnail Downloader
        </nav>

        {/* Hero */}
        <section>
          <h1
            style={{
              fontSize: 40,
              marginBottom: 16,
              lineHeight: 1.2,
            }}
          >
            YouTube Thumbnail Downloader
          </h1>

          <p
            style={{
              fontSize: 18,
              color: '#555',
              marginBottom: 20,
            }}
          >
            Instantly extract and download high-quality YouTube video cover images in HD, Standard, High, and Medium resolutions. Free, fast, and privacy-focused.
          </p>
        </section>

        {/* Tool */}
        <section style={{ marginTop: 32 }}>
          <YoutubeThumbnailDownloaderClient />
        </section>

        {/* Ad */}
        <div style={{ marginTop: 30 }}>
          <AdPlaceholder />
        </div>

        <ShareButton
          title="YouTube Thumbnail Downloader — Free Online Tool"
          description="Free browser-based YouTube thumbnail extractor. Extract and download high-quality video cover images instantly."
        />

        {/* How It Works */}
        <section style={{ marginTop: 50 }}>
          <h2>How the YouTube Thumbnail Downloader Works</h2>

          <h3>1. Copy Video URL</h3>
          <p>
            Copy the link of the target YouTube Video, Shorts, or Live Stream from your browser bar or share button.
          </p>

          <h3>2. Paste into Extractor</h3>
          <p>
            Paste the copied link into the input box above and click the "Extract Thumbnails" button.
          </p>

          <h3>3. Validate & Download</h3>
          <p>
            Our tool analyzes the link and checks all standard cover assets, making them available to preview and download locally.
          </p>
        </section>

        {/* YouTube Thumbnail Best Practices */}
        <section style={{ marginTop: 50 }}>
          <h2>YouTube Thumbnail Best Practices</h2>

          <h3>Recommended Thumbnail Sizes</h3>
          <p>
            For optimal display across all devices and search results, use the ideal resolution of 1280 × 720 (720p HD), a minimum width of 640 pixels, a 16:9 aspect ratio, and save in JPG or PNG format under 2MB.
          </p>

          <h3>Why Thumbnail Quality Matters for CTR</h3>
          <p>
            Your thumbnail is the primary visual hook that determines your Click-Through Rate (CTR). High-contrast typography, clear expressions, and perfect resolution are proven to improve ranking and increase views on YouTube. Reusing and analyzing successful templates is a core practice for top-tier creators.
          </p>
        </section>

        {/* Privacy & Security */}
        <section style={{ marginTop: 50 }}>
          <h2>Privacy & Security</h2>
          <p>
            We care about your privacy. No URLs or images are ever uploaded or saved on our servers. Processing and metadata validation happen entirely inside your web browser.
          </p>
        </section>

        {/* FAQ Accordion Section */}
        <section style={{ marginTop: 50 }}>
          <h2>Frequently Asked Questions</h2>

          <details>
            <summary><strong>Is this YouTube thumbnail downloader free to use?</strong></summary>
            <p>Yes. Our extractor tool is 100% free with unlimited usages. You can fetch and download thumbnails in any resolution without registrations.</p>
          </details>

          <details>
            <summary><strong>Can I download HD thumbnails?</strong></summary>
            <p>Yes, if the uploader uploaded an HD cover image, you can download it in 1280x720 (720p HD) and 1920x1080 (1080p Full HD) Max Resolution.</p>
          </details>

          <details>
            <summary><strong>Does it support YouTube Shorts?</strong></summary>
            <p>Yes. It fully supports standard YouTube videos, YouTube Shorts, Live streams, and custom embed URLs.</p>
          </details>

          <details>
            <summary><strong>Are thumbnails stored on your server?</strong></summary>
            <p>No. All processing happens locally in your browser. We do not store or track any YouTube URLs on our servers. Your local history is stored only on your own device.</p>
          </details>

          <details>
            <summary><strong>Why are some thumbnails unavailable?</strong></summary>
            <p>YouTube automatically scales thumbnails to various resolutions. However, if a video has a lower resolution or was uploaded a long time ago, the Max Resolution cover (1280x720) may not exist on YouTube servers.</p>
          </details>
        </section>

        {/* Related Tools */}
        <section style={{ marginTop: 50 }}>
          <h2>Explore More Free Utilities</h2>
          <ul>
            <li>
              <Link href="/tools/image-compressor">
                Compress Images Online
              </Link>
            </li>
            <li>
              <Link href="/tools/qr-code-generator">
                QR Code Generator
              </Link>
            </li>
            <li>
              <Link href="/tools/svg-to-png">
                SVG → PNG Tool
              </Link>
            </li>
            <li>
              <Link href="/tools/base64-encoder-decoder">
                Base64 Converter
              </Link>
            </li>
          </ul>
        </section>
      </main>

      {/* Schema JSON-LD Markup */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(pageJsonLd) }} />
    </>
  )
}
