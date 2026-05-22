import type { Metadata } from "next";
import dynamic from "next/dynamic";
import Link from "next/link";

import { aiPdfSummarizerJsonLd } from "../../../lib/seo/aiPdfSummarizer";
import ShareButton from "../../../components/ShareButton";

const AiPdfSummarizerClient = dynamic(
    () => import("../../../components/AiPdfSummarizerClient"),
    {
        ssr: false,
        loading: () => <div style={{ height: 250 }} />,
    }
);

const AdPlaceholder = dynamic(
    () => import("../../../components/AdPlaceholder"),
    {
        ssr: false,
        loading: () => <div style={{ height: 90 }} />,
    }
);

export const metadata: Metadata = {
    title:
        "AI PDF Summarizer for Research Papers & Reports",
    description:
        "Summarize PDFs instantly with AI. Extract key points, highlights, and concise summaries from research papers, books, reports, and documents online for free.",
    keywords: [
        "ai pdf summarizer",
        "summarize pdf online",
        "research paper summarizer",
        "pdf summary tool",
        "free pdf summarizer",
        "gemini pdf summarizer",
    ],
    alternates: {
        canonical:
            "https://anyfileconverter.online/tools/ai-pdf-summarizer",
    },
    openGraph: {
        title:
            "AI PDF Summarizer for Research Papers & Reports",
        description:
            "Summarize long PDFs using AI. Get concise summaries, highlights, and key insights from documents online.",
        url:
            "https://anyfileconverter.online/tools/ai-pdf-summarizer",
        siteName: "AnyFileConverter",
        type: "website",
        images: [
            {
                url:
                    "https://anyfileconverter.online/og-ai-summarizer.png",
                width: 1200,
                height: 630,
                alt: "AI PDF Summarizer",
            },
        ],
    },
    twitter: {
        card: "summary_large_image",
        title:
            "AI PDF Summarizer for Research Papers & Reports",
        description:
            "Summarize PDFs instantly with AI and extract important insights from long documents.",
        images: [
            "https://anyfileconverter.online/og-ai-summarizer.png",
        ],
    },
};

export default function AiPdfSummarizerPage() {
    return (
        <>
            <main
                style={{
                    padding: 24,
                    maxWidth: 950,
                    margin: "0 auto",
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
                    <Link href="/">Home</Link> {" / "}
                    <Link href="/tools">
                        AI & PDF Tools
                    </Link>{" "}
                    {" / "}
                    AI PDF Summarizer
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
                        AI PDF Summarizer for Research Papers &
                        Reports
                    </h1>

                    <p
                        style={{
                            fontSize: 18,
                            color: "#555",
                            marginBottom: 20,
                        }}
                    >
                        Summarize long PDF documents instantly
                        using AI. Extract key insights,
                        highlights, and concise summaries from
                        research papers, books, study notes,
                        reports, and contracts online for free.
                    </p>
                </section>

                {/* Tool */}
                <section style={{ marginTop: 32 }}>
                    <AiPdfSummarizerClient />
                </section>

                {/* Ad */}
                <div style={{ marginTop: 30 }}>
                    <AdPlaceholder />
                </div>
                <ShareButton
                    title="AI PDF Summarizer — Summarize Any PDF in Seconds"
                    description="Free AI PDF summarizer powered by Google Gemini. No sign-up required."
                />

                {/* Benefits */}
                <section style={{ marginTop: 50 }}>
                    <h2>
                        Summarize Long PDFs Quickly with AI
                    </h2>

                    <p>
                        Reading long documents can take hours.
                        Our AI PDF summarizer helps students,
                        researchers, professionals, and creators
                        quickly understand the core ideas of a
                        document before reading it fully.
                    </p>

                    <h3>Research Papers</h3>

                    <p>
                        Quickly understand research papers,
                        academic journals, and technical
                        documents before investing time into full
                        reading.
                    </p>

                    <h3>Books & Study Notes</h3>

                    <p>
                        Extract the most important concepts from
                        textbooks, ebooks, and study materials
                        for faster revision and learning.
                    </p>

                    <h3>Business Reports & Contracts</h3>

                    <p>
                        Review reports, proposals, and legal
                        documents faster by extracting key points
                        and summaries instantly.
                    </p>
                </section>

                {/* How It Works */}
                <section style={{ marginTop: 50 }}>
                    <h2>How the AI PDF Summarizer Works</h2>

                    <h3>1. Extract PDF Text</h3>

                    <p>
                        The tool extracts readable text from your
                        uploaded PDF document securely in real
                        time.
                    </p>

                    <h3>2. Analyze Important Sections</h3>

                    <p>
                        Instead of summarizing only the beginning
                        of the document, the AI samples content
                        from different sections of the PDF for
                        better context.
                    </p>

                    <h3>3. Generate AI Summary</h3>

                    <p>
                        Google Gemini AI generates a concise,
                        human-readable summary designed to
                        highlight the key information clearly.
                    </p>
                </section>

                {/* Privacy */}
                <section style={{ marginTop: 50 }}>
                    <h2>Privacy & Security</h2>

                    <p>
                        Files are processed temporarily for
                        summarization and are not permanently
                        stored on our servers.
                    </p>

                    <p>
                        AI summarization is powered by{" "}
                        <a
                            href="https://ai.google.dev/"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            Google Gemini AI
                        </a>
                        .
                    </p>

                    <p>
                        PDF text extraction uses{" "}
                        <a
                            href="https://www.npmjs.com/package/pdf-parse"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            pdf-parse
                        </a>
                        .
                    </p>
                </section>

                {/* FAQ */}
                <section style={{ marginTop: 50 }}>
                    <h2>Frequently Asked Questions</h2>

                    <details>
                        <summary><strong> Is this AI PDF summarizer free to use?</strong></summary>
                        <p>Yes, the tool is completely free and does
                            not require an account.</p>
                    </details>

                    <details>
                        <summary><strong> Can it summarize research papers?
                        </strong></summary>
                        <p>Yes, it works especially well for
                            research papers, reports, and long-form
                            documents.</p>
                    </details>

                    <details>
                        <summary><strong> Are uploaded PDF files stored?</strong></summary>
                        <p>No, uploaded files are processed
                            temporarily and are not permanently
                            stored.</p>
                    </details>
                    <details>
                        <summary><strong>  Does it work with scanned PDFs?</strong></summary>
                        <p>  Currently, scanned or image-only PDFs may
                            not work correctly because they do not
                            contain readable embedded text.</p>
                    </details>

                </section>

                {/* Internal Links */}
                <section style={{ marginTop: 50 }}>
                    <h2>Explore More AI & PDF Tools</h2>

                    <ul>
                        <li>
                            <Link href="/tools/compress-pdf">
                                Compress PDF Files Online
                            </Link>
                        </li>

                        <li>
                            <Link href="/tools/merge-pdf">
                                Merge Multiple PDF Files
                            </Link>
                        </li>

                        <li>
                            <Link href="/tools/pdf-to-word">
                                Convert PDF to Word
                            </Link>
                        </li>

                        <li>
                            <Link href="/tools/image-compressor">
                                Compress Images Online
                            </Link>
                        </li>
                    </ul>
                </section>
            </main>

            {/* JSON-LD */}
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify(
                        aiPdfSummarizerJsonLd
                    ),
                }}
            />
        </>
    );
}