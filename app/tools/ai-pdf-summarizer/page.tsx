import type { Metadata } from "next";
import dynamic from "next/dynamic";
import Link from "next/link";

const AiPdfSummarizerClient = dynamic(
    () => import("../../../components/AiPdfSummarizerClient"),
    { ssr: false, loading: () => <div style={{ height: 200 }} /> }
);

const AdPlaceholder = dynamic(
    () => import("../../../components/AdPlaceholder"),
    { ssr: false, loading: () => <div style={{ height: 90 }} /> }
);

export const metadata: Metadata = {
    title: "AI PDF Summarizer — Summarize PDFs Quickly",
    description: "Upload a PDF and get a short summary, highlights and key points. Built for students, researchers, and busy readers. Privacy-first options.",
    keywords: ["pdf summarizer", "ai pdf summarizer", "summarize pdf online"],
    alternates: { canonical: "https://anyfileconverter.online/tools/ai-pdf-summarizer" },
    openGraph: {
        title: "AI PDF Summarizer — AnyFileConverter",
        description: "Get concise summaries and highlights from PDF documents. Fast and privacy-conscious.",
        url: "https://anyfileconverter.online/tools/ai-pdf-summarizer",
        siteName: "AnyFileConverter",
        type: "website",
        images: [{ url: "https://anyfileconverter.online/og-ai-summarizer.png", width: 1200, height: 630, alt: "AI PDF Summarizer" }],
    },
    twitter: {
        card: "summary_large_image",
        title: "AI PDF Summarizer — AnyFileConverter",
        description: "Summarize PDFs into short notes and key points with a privacy-first approach.",
        images: ["https://anyfileconverter.online/og-ai-summarizer.png"],
    },
};

const pageJsonLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "AI PDF Summarizer",
    "applicationCategory": "AIUtility",
    "operatingSystem": "Web",
    "url": "https://anyfileconverter.online/tools/ai-pdf-summarizer",
    "description": "Summarize PDF documents and extract key points using local or API-based summarization.",
};

export default function AiPdfSummarizerPage() {
    return (
        <>
            <main style={{ padding: 24, maxWidth: 900, margin: "0 auto", lineHeight: 1.7 }}>
                <nav aria-label="Breadcrumb" style={{ marginBottom: 12 }}>
                    <Link href="/">Home</Link> {" / "} <Link href="/tools">Tools</Link> {" / "} AI PDF Summarizer
                </nav>
                <h1>AI PDF Summarizer — Read Faster</h1>
                <p style={{ color: "#555" }}>
                    Upload a PDF and get a short summary, key points, and suggested highlights. Great for research, quick reviews, or study notes.
                </p>

                <section style={{ marginTop: 20 }}>
                    <AiPdfSummarizerClient />
                </section>

                <div style={{ marginTop: 20 }}>
                    <AdPlaceholder />
                </div>

                <section style={{ marginTop: 28 }}>
                    <h2>Privacy</h2>
                    <p style={{ marginLeft: 20 }}>
                        Summarization can run locally (privacy-first) or via an API if you enable cloud features. Cloud summarization is opt-in.
                    </p>
                </section>
            </main>

            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(pageJsonLd) }} />
        </>
    );
}
