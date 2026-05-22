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
    title: "AI PDF Summarizer — Summarize Any PDF in Seconds",
    description:
        "Upload any PDF and get an AI-generated summary in seconds. Powered by Google Gemini. Perfect for students, researchers, lawyers, and busy professionals. Free, fast, and no sign-up required.",
    keywords: [
        "ai pdf summarizer",
        "summarize pdf online",
        "pdf summary generator",
        "pdf key points extractor",
        "free pdf summarizer",
        "google gemini pdf summary",
        "summarize research paper",
        "pdf to summary",
        "pdf reader ai",
        "book summary generator",
    ],
    alternates: { canonical: "https://anyfileconverter.online/tools/ai-pdf-summarizer" },
    openGraph: {
        title: "AI PDF Summarizer — Summarize Any PDF in Seconds",
        description:
            "Upload a PDF and get a clear, concise AI summary powered by Google Gemini. Free, no login required.",
        url: "https://anyfileconverter.online/tools/ai-pdf-summarizer",
        siteName: "AnyFileConverter",
        type: "website",
        images: [
            {
                url: "https://anyfileconverter.online/og-ai-summarizer.png",
                width: 1200,
                height: 630,
                alt: "AI PDF Summarizer by AnyFileConverter",
            },
        ],
    },
    twitter: {
        card: "summary_large_image",
        title: "AI PDF Summarizer — Summarize Any PDF in Seconds",
        description: "Upload a PDF and get an AI-powered summary in seconds. Free, fast, no sign-up.",
        images: ["https://anyfileconverter.online/og-ai-summarizer.png"],
    },
};

const pageJsonLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "AI PDF Summarizer",
    applicationCategory: "UtilitiesApplication",
    operatingSystem: "Web",
    url: "https://anyfileconverter.online/tools/ai-pdf-summarizer",
    description:
        "Upload any PDF and receive an AI-generated summary powered by Google Gemini. Supports books, research papers, reports, and legal documents. Free with no sign-up required.",
    offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
    featureList: [
        "AI-powered summarization via Google Gemini",
        "Adjustable summary length (1–10 sentences)",
        "Samples beginning, middle, and end of document",
        "Works with books, papers, reports, and legal docs",
        "No sign-up or account required",
    ],
};

const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
        {
            "@type": "Question",
            name: "What types of PDFs can I summarize?",
            acceptedAnswer: {
                "@type": "Answer",
                text: "You can summarize any text-based PDF — books, research papers, legal contracts, business reports, academic articles, and more. Image-only PDFs (scanned documents without OCR) are not supported.",
            },
        },
        {
            "@type": "Question",
            name: "How does the AI summarizer work?",
            acceptedAnswer: {
                "@type": "Answer",
                text: "The tool extracts all text from your PDF, then samples content from the beginning, middle, and end of the document. Google Gemini reads this sample and writes a coherent summary in your chosen number of sentences.",
            },
        },
        {
            "@type": "Question",
            name: "Is my PDF stored or shared?",
            acceptedAnswer: {
                "@type": "Answer",
                text: "No. Your PDF is processed in memory and never stored on our servers. The extracted text is sent to Google Gemini's API for summarization and is not retained.",
            },
        },
        {
            "@type": "Question",
            name: "How long can the PDF be?",
            acceptedAnswer: {
                "@type": "Answer",
                text: "There is no strict page limit. The tool intelligently samples up to 20,000 characters from across the document, so even long books and reports are handled well.",
            },
        },
    ],
};

const steps = [
    { step: "1", title: "Upload your PDF", desc: "Drag and drop or click to select any text-based PDF file." },
    { step: "2", title: "Choose summary length", desc: "Pick between 1 and 20 sentences depending on how detailed you need the summary." },
    { step: "3", title: "AI reads the whole doc", desc: "Google Gemini samples content from the start, middle, and end for a complete picture." },
    { step: "4", title: "Get your summary", desc: "Receive a clean, human-readable summary — not raw copied text." },
];

const useCases = [
    { title: "Students", desc: "Summarize textbooks, research papers, and lecture notes before exams." },
    { title: "Researchers", desc: "Quickly assess whether a paper is worth reading in full." },
    { title: "Professionals", desc: "Digest lengthy reports, contracts, and business documents fast." },
    { title: "Readers", desc: "Get the key ideas from non-fiction books before committing to a full read." },
];

export default function AiPdfSummarizerPage() {
    return (
        <>
            <main className="container">

                <nav aria-label="Breadcrumb" className="text-sm mb-4" style={{ color: "var(--muted)" }}>
                    <Link href="/">Home</Link>
                    {" / "}
                    <Link href="/tools">Tools</Link>
                    {" / "}
                    <span style={{ color: "var(--text)" }}>AI PDF Summarizer</span>
                </nav>

                <h1>AI PDF Summarizer</h1>

                <p className="text-base leading-7 mt-2 mb-1" style={{ color: "var(--text)", maxWidth: 620 }}>
                    Upload any PDF — book, paper, report, or contract — and get a clear, accurate AI-generated
                    summary in seconds. Powered by Google Gemini.
                </p>
                <p className="small mb-6">
                    No sign-up required. Works on any text-based PDF up to hundreds of pages.
                </p>

                {/* Tool */}
                <section aria-label="Summarizer tool" className="mb-8">
                    <AiPdfSummarizerClient />
                </section>

                <div className="mb-8">
                    <AdPlaceholder />
                </div>

                {/* How it works */}
                <section aria-labelledby="how-it-works" className="mb-10">
                    <h2 id="how-it-works">How it works</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-4">
                        {steps.map((s) => (
                            <div key={s.step} className="card">
                                <div className="small mb-1">Step {s.step}</div>
                                <div className="font-semibold mb-2" style={{ color: "var(--text)" }}>
                                    {s.title}
                                </div>
                                <p className="small mb-0" style={{ color: "var(--muted)" }}>
                                    {s.desc}
                                </p>
                            </div>
                        ))}
                    </div>
                </section>

                {/* What it does */}
                <section aria-labelledby="what-it-does" className="mb-10">
                    <h2 id="what-it-does">What this tool actually does</h2>
                    <p style={{ color: "var(--text)" }}>
                        Most PDF summarizers just copy the first few sentences of your document — which is
                        usually just the title page or introduction. This tool is different.
                    </p>
                    <p style={{ color: "var(--text)" }}>
                        It extracts all text from your PDF, then intelligently samples content from the{" "}
                        <strong>beginning, middle, and end</strong> of the document — up to 20,000 characters.
                        Google Gemini then reads this sample and writes a genuine summary in your chosen number
                        of sentences, covering the main themes, key arguments, and overall message.
                    </p>
                    <p style={{ color: "var(--text)" }}>
                        The result reads like a book review or abstract — not a transcript of the first page.
                    </p>
                </section>

                {/* Who it's for */}
                <section aria-labelledby="use-cases" className="mb-10">
                    <h2 id="use-cases">Who is this for?</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-4">
                        {useCases.map((u) => (
                            <div key={u.title} className="card">
                                <div className="font-semibold mb-2" style={{ color: "var(--text)" }}>
                                    {u.title}
                                </div>
                                <p className="small mb-0" style={{ color: "var(--muted)" }}>
                                    {u.desc}
                                </p>
                            </div>
                        ))}
                    </div>
                </section>

                {/* FAQ */}
                <section aria-labelledby="faq" className="mb-10">
                    <h2 id="faq">Frequently asked questions</h2>
                    <div className="mt-4 space-y-3">
                        {faqJsonLd.mainEntity.map((q, i) => (
                            <details
                                key={i}
                                className="card"
                                style={{ borderRadius: "0.75rem" }}
                            >
                                <summary
                                    className="cursor-pointer font-semibold"
                                    style={{ color: "var(--text)", padding: "2px 0" }}
                                >
                                    {q.name}
                                </summary>
                                <p className="small mt-3 mb-0" style={{ color: "var(--muted)" }}>
                                    {q.acceptedAnswer.text}
                                </p>
                            </details>
                        ))}
                    </div>
                </section>

                {/* Privacy */}
                <section aria-labelledby="privacy" className="mb-10">
                    <h2 id="privacy">Privacy</h2>
                    <p style={{ color: "var(--text)", maxWidth: 680 }}>
                        Your PDF is never stored on our servers. It is processed in memory, the text is
                        extracted and sent to Google Gemini's API for summarization, and then discarded.
                        We do not log your documents or summaries.
                    </p>
                </section>

                {/* Limitations */}
                <section aria-labelledby="limitations" className="mb-10">
                    <h2 id="limitations">Limitations</h2>
                    <ul style={{ color: "var(--muted)" }}>
                        <li>Scanned PDFs without embedded text (image-only) are not supported.</li>
                        <li>Heavily formatted PDFs (complex tables, charts) may extract poorly.</li>
                        <li>Summaries are AI-generated and may occasionally miss niche details.</li>
                        <li>The free tier is subject to Google Gemini API rate limits.</li>
                    </ul>
                </section>

                <div className="mt-8">
                    <AdPlaceholder />
                </div>

            </main>

            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(pageJsonLd) }} />
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
        </>
    );
}