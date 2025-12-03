import Link from "next/link"
import type { Metadata } from "next"
import { OpenConverterButton } from "../components/OpenConvertButton"
import dynamic from "next/dynamic"

const AdPlaceholder = dynamic(() => import("../components/AdPlaceholder"), {
  ssr: false,
  loading: () => <div style={{ height: 90 }} />, 
})
export const metadata: Metadata = {
    title: "Free JPG to PDF Converter Online | Fast & Secure",
    description:
        "Convert JPG to PDF online, reorder images, rotate pages, and adjust margins. Easy, fast, and completely free—works on mobile and desktop.",
    keywords: ["jpg to pdf", "image to pdf", "convert jpg to pdf online", "free pdf converter"],
    alternates: {
        canonical: "https://anyfileconverter.online",
    },
    openGraph: {
        title: "Free JPG to PDF Converter Online | Fast & Secure",
        description:
            "Convert JPG to PDF online, reorder images, rotate pages, and adjust margins. Easy, fast, and completely free—works on mobile and desktop.",
        url: "https://anyfileconverter.online",
        siteName: "JPG→PDF Converter",
        locale: "en_US",
        type: "website",
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
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "JPG to PDF Converter",
    description:
        "Convert JPG to PDF online, reorder images, rotate pages, and adjust margins. Easy, fast, and completely free—works on mobile and desktop.",
    url: "https://anyfileconverter.online",
    applicationCategory: "Utility",
    offers: {
        "@type": "Offer",
        price: "0",
        priceCurrency: "USD",
    },
}

const faqLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
        {
            "@type": "Question",
            name: "Is my data secure?",
            acceptedAnswer: {
                "@type": "Answer",
                text: "Yes. All processing happens on your device by default. We don't store or upload files unless you choose to use server-side features.",
            },
        },
        {
            "@type": "Question",
            name: "What file formats are supported?",
            acceptedAnswer: {
                "@type": "Answer",
                text: "We support JPG, JPEG, and PNG image formats.",
            },
        },
        {
            "@type": "Question",
            name: "Do I need an account?",
            acceptedAnswer: {
                "@type": "Answer",
                text: "No account or registration is required. Convert and download immediately.",
            },
        },
    ],
}

export default function Home() {
    return (
        <>
            <section>
                <h1>Convert JPG to PDF — Fast, Secure & Free</h1>
                <p className="small">Client-side conversion. Your files never leave your browser by default.</p>

                <div style={{ marginTop: 20 }}>
                    <Link href="/tools/jpg-to-pdf" aria-label="Open JPG to PDF converter">
                        <OpenConverterButton name="Open JPG → PDF Converter" />
                    </Link>
                </div>
                <div style={{ marginTop: 12 }}>
                    <AdPlaceholder />
                </div>
                <article style={{ marginTop: 32, lineHeight: 1.6 }}>
                    <h2>Why Choose Our JPG to PDF Converter?</h2>
                    <p>
                        Converting JPG images to PDF has never been easier. Our free online converter allows you to transform your image files into professional PDF documents in seconds. Whether you need to combine multiple photos into a single PDF, create a photo album, or prepare images for printing, our tool handles it all effortlessly.
                    </p>

                    <h3>Key Features</h3>
                    <ul style={{ marginLeft: 20 }}>
                        <li><strong>100% Privacy:</strong> All conversion happens in your browser. Your images are never uploaded to our servers.</li>
                        <li><strong>Fast Processing:</strong> Instant conversion without waiting or registration required.</li>
                        <li><strong>Multiple Images:</strong> Convert and combine multiple JPG/PNG images into a single PDF.</li>
                        <li><strong>Reorder Images:</strong> Drag and drop to arrange images before converting.</li>
                        <li><strong>Customizable Format:</strong> Choose between A4, Letter, and other page sizes.</li>
                        <li><strong>Quality Control:</strong> Adjust compression to balance file size and image quality.</li>
                        <li><strong>Works Everywhere:</strong> Compatible with Windows, Mac, iPhone, Android, and any device with a web browser.</li>
                    </ul>

                    <h3>How to Convert JPG to PDF</h3>
                    <ol style={{ marginLeft: 20 }}>
                        <li>Click the "Open JPG → PDF Converter" button above</li>
                        <li>Drag and drop your JPG or PNG images, or click to select files</li>
                        <li>Reorder images if needed by dragging them</li>
                        <li>Click "Convert to PDF" to create your document</li>
                        <li>Download your PDF instantly to your device</li>
                    </ol>

                    <h3>Perfect For</h3>
                    <p>
                        Our converter is ideal for photographers, students, professionals, and anyone who needs to create PDFs from images. Use it to digitize documents, create photo books, prepare images for printing, or combine multiple scans into a single file.
                    </p>

                    <h3>Frequently Asked Questions</h3>
                    <dl style={{ marginLeft: 20 }}>
                        <dt><strong>Is my data secure?</strong></dt>
                        <dd>Yes. All processing happens on your device. We don't store, upload, or access your files.</dd>

                        <dt><strong>What file formats are supported?</strong></dt>
                        <dd>We support JPG, JPEG, and PNG image formats.</dd>

                        <dt><strong>How many images can I convert?</strong></dt>
                        <dd>You can convert as many images as your browser memory allows, typically hundreds of images.</dd>

                        <dt><strong>Do I need to create an account?</strong></dt>
                        <dd>No account or registration is required. Simply use the tool and download your PDF.</dd>

                        <dt><strong>Is it free?</strong></dt>
                        <dd>Yes, our converter is completely free with no hidden charges or premium limits.</dd>
                    </dl>
                </article>
                <div style={{ marginTop: 12 }}>
                    <AdPlaceholder />
                </div>
            </section>

            {/* JSON-LD structured data */}
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
