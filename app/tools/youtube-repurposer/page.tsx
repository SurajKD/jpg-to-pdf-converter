import type { Metadata } from 'next'
import dynamic from 'next/dynamic'
import Link from 'next/link'
import React from 'react'
import ShareButton from '../../../components/ShareButton'

const YoutubeRepurposerClient = dynamic(
  () => import('../../../components/tools/YoutubeRepurposerClient'),
  { ssr: false, loading: () => <div style={{ height: 250 }} /> }
)

const AdPlaceholder = dynamic(
  () => import('../../../components/AdPlaceholder'),
  { ssr: false, loading: () => <div style={{ height: 90 }} /> }
)

export const metadata: Metadata = {
  title: 'YouTube Content Repurposer — Generate Blog, X Thread, LinkedIn & More',
  description:
    'Paste any YouTube URL and instantly generate a blog post, X thread, LinkedIn post, social captions, and newsletter. Free AI-powered content repurposer.',
  keywords: [
    'youtube content repurposer',
    'youtube to blog post',
    'youtube to twitter thread',
    'youtube to linkedin',
    'repurpose youtube video',
    'ai content repurposer',
    'youtube video summarizer',
    'free content repurposer',
  ],
  alternates: { canonical: 'https://anyfileconverter.online/tools/youtube-repurposer' },
  openGraph: {
    title: 'YouTube Content Repurposer — Generate Blog, X Thread, LinkedIn & More',
    description: 'Paste a YouTube URL and generate 5 pieces of content instantly with AI. Free, no sign-up.',
    url: 'https://anyfileconverter.online/tools/youtube-repurposer',
    type: 'website',
  },
}

const pageJsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'SoftwareApplication',
      name: 'YouTube Content Repurposer',
      description: 'AI-powered tool that converts any YouTube video into a blog post, X thread, LinkedIn post, captions, and newsletter section.',
      applicationCategory: 'Utility',
      operatingSystem: 'Web',
      url: 'https://anyfileconverter.online/tools/youtube-repurposer',
      offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
    },
    {
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://anyfileconverter.online/' },
        { '@type': 'ListItem', position: 2, name: 'Tools', item: 'https://anyfileconverter.online/tools' },
        { '@type': 'ListItem', position: 3, name: 'YouTube Repurposer', item: 'https://anyfileconverter.online/tools/youtube-repurposer' },
      ],
    },
    {
      '@type': 'FAQPage',
      mainEntity: [
        {
          '@type': 'Question',
          name: 'What content types does this tool generate?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'It generates five content types from any YouTube URL: a full blog post, an X (Twitter) thread, a LinkedIn post, social media captions for multiple platforms, and a newsletter section.',
          },
        },
        {
          '@type': 'Question',
          name: 'Does this tool require a YouTube API key?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'No. The tool uses AI to search for and analyze the video content. No YouTube API key or account is required.',
          },
        },
        {
          '@type': 'Question',
          name: 'Which AI model powers this tool?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'The tool uses Google Gemini (2.5 Flash by default) with automatic fallback to other Gemini models if the primary is unavailable.',
          },
        },
        {
          '@type': 'Question',
          name: 'Is this tool free to use?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Yes. It is completely free with no sign-up required. It is powered by the Google Gemini free tier.',
          },
        },
      ],
    },
  ],
}

export default function YoutubeRepurposerPage() {
  return (
    <>
      <main style={{ padding: 24, maxWidth: 950, margin: '0 auto', lineHeight: 1.8 }}>

        {/* Breadcrumb */}
        <nav aria-label="Breadcrumb" style={{ marginBottom: 16, fontSize: 14 }}>
          <Link href="/">Home</Link> {' / '}
          <Link href="/tools">Tools</Link> {' / '}
          YouTube Content Repurposer
        </nav>

        {/* Hero */}
        <section>
          <h1 style={{ fontSize: 40, marginBottom: 16, lineHeight: 1.2 }}>
            YouTube Content Repurposer
          </h1>
          <p style={{ fontSize: 18, color: 'var(--muted)', marginBottom: 20 }}>
            Paste any YouTube URL and instantly generate a blog post, X thread, LinkedIn post,
            social captions, and newsletter — powered by Google Gemini. Free, no sign-up required.
          </p>
        </section>

        {/* Tool */}
        <section style={{ marginTop: 32 }}>
          <YoutubeRepurposerClient />
        </section>

        {/* Ad */}
        <div style={{ marginTop: 30 }}>
          <AdPlaceholder />
        </div>

        <div style={{ marginTop: 20 }}>
          <ShareButton
            title="YouTube Content Repurposer — Generate Blog, X Thread, LinkedIn & More"
            description="Paste any YouTube URL and generate 5 pieces of content instantly with AI. Free, no sign-up."
          />
        </div>

        {/* How It Works */}
        <section style={{ marginTop: 50 }}>
          <h2>How the YouTube Content Repurposer Works</h2>
          <h3>1. Paste a YouTube URL</h3>
          <p>Copy any YouTube video, Short, or live stream URL and paste it into the input box above.</p>
          <h3>2. Fetch Video Info</h3>
          <p>The tool uses AI to search for the video title and content summary — no YouTube API key needed.</p>
          <h3>3. Generate Your Content</h3>
          <p>Click any content type button to generate that format, or use "Generate All 5" to produce everything at once.</p>
          <h3>4. Copy & Publish</h3>
          <p>Copy the generated content with one click and paste directly into your blog, social media scheduler, or email tool.</p>
        </section>

        {/* Use Cases */}
        <section style={{ marginTop: 50 }}>
          <h2>Who Is This Tool For?</h2>
          <h3>Content Creators</h3>
          <p>Turn one video into a week of content across every platform without writing anything from scratch.</p>
          <h3>Marketers</h3>
          <p>Repurpose webinars, product demos, and explainer videos into blog posts and LinkedIn content instantly.</p>
          <h3>Newsletter Writers</h3>
          <p>Generate a polished newsletter section from any YouTube video in seconds, complete with subject line and preview text.</p>
          <h3>Social Media Managers</h3>
          <p>Extract captions for Instagram, TikTok, Facebook, and YouTube Community posts from a single video.</p>
        </section>

        {/* Privacy */}
        <section style={{ marginTop: 50 }}>
          <h2>Privacy & Security</h2>
          <p>
            No video files are ever uploaded to our servers. The tool uses AI web search to analyze
            publicly available video information. Generated content is never stored or logged.
          </p>
        </section>

        {/* FAQ */}
        <section style={{ marginTop: 50 }}>
          <h2>Frequently Asked Questions</h2>
          <details>
            <summary><strong>What content types does this tool generate?</strong></summary>
            <p>Five formats: a full blog post, an X thread, a LinkedIn post, social captions for 5 platforms, and a newsletter section with subject line and preview text.</p>
          </details>
          <details>
            <summary><strong>Does this require a YouTube API key?</strong></summary>
            <p>No. The tool uses AI to find and analyze video content. No YouTube account or API key is needed.</p>
          </details>
          <details>
            <summary><strong>Which AI model powers this?</strong></summary>
            <p>Google Gemini 2.5 Flash by default, with automatic fallback to Gemini 2.5 Flash-Lite and Gemini 2.5 Pro if the primary model is unavailable.</p>
          </details>
          <details>
            <summary><strong>Is it free?</strong></summary>
            <p>Yes. Completely free with no sign-up required. Powered by the Google Gemini free tier.</p>
          </details>
          <details>
            <summary><strong>Can I generate all 5 formats at once?</strong></summary>
            <p>Yes. Click "Generate All 5" to run all content types sequentially. Each result is cached in the session so you won't regenerate content you've already produced.</p>
          </details>
        </section>

        {/* Related Tools */}
        <section style={{ marginTop: 50 }}>
          <h2>Explore More Free Tools</h2>
          <ul>
            <li><Link href="/tools/ai-pdf-summarizer">AI PDF Summarizer</Link></li>
            <li><Link href="/tools/youtube-thumbnail-downloader">YouTube Thumbnail Downloader</Link></li>
            <li><Link href="/tools/qr-code-generator">QR Code Generator</Link></li>
            <li><Link href="/tools/image-compressor">Image Compressor</Link></li>
          </ul>
        </section>

      </main>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(pageJsonLd) }} />
    </>
  )
}