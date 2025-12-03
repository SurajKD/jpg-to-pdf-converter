import dynamic from 'next/dynamic'
import type { Metadata } from 'next'
const AdPlaceholder = dynamic(() => import("../../../components/AdPlaceholder"), {
  ssr: false,
  loading: () => <div style={{ height: 90 }} />, // keep layout stable for ads
})
const DropzoneClient = dynamic(() => import('../../../components/DropzoneClient'), { ssr: false })

export const metadata: Metadata = {
    title: 'JPG to PDF Converter Tool | Free Online Conversion',
    description:
        'Convert JPG to PDF online, reorder images, rotate pages, and adjust margins. Easy, fast, and completely free—works on mobile and desktop.',
    keywords: ['jpg to pdf', 'image to pdf', 'convert jpg to pdf', 'free pdf converter', 'online pdf converter'],
    alternates: {
        canonical: 'https://anyfileconverter.online/tools/jpg-to-pdf',
    },
    openGraph: {
        title: 'JPG to PDF Converter Tool | Free Online Conversion',
        description:
            'Convert JPG to PDF online, reorder images, rotate pages, and adjust margins. Easy, fast, and completely free—works on mobile and desktop.',
        url: 'https://anyfileconverter.online/tools/jpg-to-pdf',
        siteName: 'JPG→PDF Converter',
        type: 'website',
        locale: 'en_US',
        images: [
            {
                url: '/og-jpg-to-pdf.png',
                width: 1200,
                height: 630,
                alt: 'JPG to PDF Converter Preview',
            },
        ],
    },
    twitter: {
        card: 'summary_large_image',
        title: 'JPG to PDF Converter — Free Online Tool',
        description:
            'Convert JPG to PDF online, reorder images, rotate pages, and adjust margins. Easy, fast, and completely free—works on mobile and desktop.',
        images: ['/og-jpg-to-pdf.png'],
    },
}

const webAppLd = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: 'JPG to PDF Converter',
    description: 'Convert JPG to PDF online, reorder images, rotate pages, and adjust margins. Easy, fast, and completely free—works on mobile and desktop.',
    url: 'https://anyfileconverter.online/tools/jpg-to-pdf',
    applicationCategory: 'Utility',
    offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
}

const faqLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
        {
            '@type': 'Question',
            name: 'Is my data uploaded when I convert images?',
            acceptedAnswer: {
                '@type': 'Answer',
                text: 'No — by default conversion runs client-side in your browser so your files are not uploaded. Server-side features are optional and explicitly presented to the user.',
            },
        },
        {
            '@type': 'Question',
            name: 'Which image formats are supported?',
            acceptedAnswer: {
                '@type': 'Answer',
                text: 'We support JPG, JPEG and PNG (plus other common web image formats).',
            },
        },
        {
            '@type': 'Question',
            name: 'Can I combine multiple images into a single PDF?',
            acceptedAnswer: {
                '@type': 'Answer',
                text: 'Yes — upload multiple images, reorder them and convert to a single downloadable PDF.',
            },
        },
    ],
}

export default function ToolPage() {
    return (
        <>
            <section>
                <h1>JPG to PDF Converter Tool</h1>
                <p className="small">
                    Drag & drop JPG/PNG files, reorder, and convert to a single PDF document instantly — all in your browser.
                </p>

                {/* Primary ad slot (non-intrusive): placed below the intro so it can capture attention without blocking the tool */}
                <div style={{ marginTop: 12, display: 'flex', justifyContent: 'center' }}>
                    {/* AdPlaceholder is a safe demo element; replace with AdSense code after approval */}
                    <AdPlaceholder />
                </div>

                <div className="card" style={{ marginTop: 12 }}>
                    <DropzoneClient />
                </div>

                {/* Secondary ad slot: placed after the interactive tool, but NOT adjacent to the download button.
            This helps avoid accidental clicks near interactive UI (AdSense policy). */}
                <div style={{ marginTop: 18, display: 'flex', justifyContent: 'center' }}>
                    <AdPlaceholder />
                </div>

                <article style={{ marginTop: 32, lineHeight: 1.6 }}>
                    <h2>How to Use the JPG to PDF Converter</h2>
                    <p>
                        Our tool makes it simple to convert your JPG images to PDF format. The process is intuitive and
                        requires just a few clicks. All conversion happens directly in your browser (client-side) unless you
                        opt-in to server-side features.
                    </p>

                    <h3>Step-by-Step Instructions</h3>
                    <ol style={{ marginLeft: 20 }}>
                        <li>
                            <strong>Upload Images:</strong> Drag & drop JPG or PNG files into the converter area, or click to browse.
                        </li>
                        <li>
                            <strong>Preview:</strong> Thumbnails appear so you can confirm the images.
                        </li>
                        <li>
                            <strong>Reorder:</strong> Drag thumbnails to set page order.
                        </li>
                        <li>
                            <strong>Remove:</strong> Exclude unwanted images using the Remove button.
                        </li>
                        <li>
                            <strong>Convert:</strong> Click Convert and wait for the short finalization step.
                        </li>
                        <li>
                            <strong>Download / Share:</strong> Download the PDF or use the Share button on mobile (Web Share API).
                        </li>
                    </ol>

                    <h3>Converter Features</h3>
                    <ul style={{ marginLeft: 20 }}>
                        <li>Multiple image support (batch convert)</li>
                        <li>Drag & drop reordering</li>
                        <li>Page size options (A4, Letter)</li>
                        <li>Quality control for smaller PDFs</li>
                        <li>Orientation detection</li>
                        <li>Instant download — no signup</li>
                    </ul>

                    <h3>Why Choose Our Tool?</h3>
                    <p>
                        Privacy-first client-side conversion, lightweight UI for fast performance, and clear instructions for
                        mobile sharing. We never upload your files unless you explicitly choose server sharing features.
                    </p>

                    <h3>Common Uses & Tips</h3>
                    <ul style={{ marginLeft: 20 }}>
                        <li>Combine scanned pages into one PDF for submission</li>
                        <li>Prepare images for printing</li>
                        <li>Save receipts, invoices, and documents as PDFs</li>
                        <li>Use medium-size photos for best file size/quality balance</li>
                    </ul>
                </article>

                {/* Content-area ad (mid-article) */}
                <div style={{ marginTop: 24, display: 'flex', justifyContent: 'center' }}>
                    <AdPlaceholder />
                </div>
            </section>

            {/* Structured data for SEO */}
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(webAppLd) }}
            />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }}
            />
        </>
    )
}
