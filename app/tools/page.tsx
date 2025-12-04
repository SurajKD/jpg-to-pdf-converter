// app/tools/page.tsx
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
    title: "Tools — AnyFileConverter (JPG→PDF, Compress, Image Tools & More)",
    description:
        "All tools from AnyFileConverter: JPG→PDF, Compress PDF, Image Compressor, Background Remover, PDF→Word, AI PDF Summarizer and more. Fast, private and browser-first utilities.",
    keywords: [
        "jpg to pdf",
        "pdf compressor",
        "image compressor",
        // "background remover",
        "pdf to word",
        // "pdf summarizer",
        "online file tools",
        "anyfileconverter",
    ],
    alternates: { canonical: "https://anyfileconverter.online/tools" },
    openGraph: {
        title: "AnyFileConverter — Useful Browser Tools for Files & PDFs",
        description:
            "Quick, privacy-first file tools: JPG→PDF, Compress PDF, Image Compressor, Background Remover, PDF→Word, AI PDF Summarizer and more.",
        url: "https://anyfileconverter.online/tools",
        siteName: "AnyFileConverter",
        type: "website",
        images: [
            {
                url: "https://anyfileconverter.online/og-tools.png",
                width: 1200,
                height: 630,
                alt: "AnyFileConverter tools preview",
            },
        ],
    },
    twitter: {
        card: "summary_large_image",
        title: "AnyFileConverter — File & PDF Tools",
        description:
            "Fast, private, browser-first converters and utilities. No accounts, no uploads by default.",
        images: ["https://anyfileconverter.online/og-tools.png"],
    },
};

const tools = [
    {
        id: "jpg-to-pdf",
        title: "JPG → PDF",
        href: "/tools/jpg-to-pdf",
        short:
            "Combine JPG/PNG/WebP images into a single PDF. Drag, reorder, and download — all in your browser.",
        features: ["Client-side", "Drag & drop", "Reorder pages"],
    },
    {
        id: "compress-pdf",
        title: "Compress PDF",
        href: "/tools/compress-pdf",
        short:
            "Reduce PDF file size while keeping readable quality. Ideal for email and uploads. Browser-first compression.",
        features: ["Balanced / Max presets", "No upload by default", "Progress reporting"],
    },
    {
        id: "image-compressor",
        title: "Image Compressor",
        href: "/tools/image-compressor",
        short:
            "Shrink JPG, PNG and WebP images with adjustable quality and preview before download.",
        features: ["Lossy & WebP", "Batch compression", "Preview & download"],
    },
    //   {
    //     id: "bg-remover",
    //     title: "Background Remover",
    //     href: "/tools/bg-remover",
    //     short:
    //       "Remove plain backgrounds and export transparent PNGs. Fast for product photos and avatars.",
    //     features: ["PNG output", "Adjust sensitivity", "Client-side processing"],
    //   },
    {
        id: "pdf-to-word",
        title: "PDF → Word",
        href: "/tools/pdf-to-word",
        short:
            "Convert text-based PDFs to editable Word (.doc) files in your browser. Best for native/text PDFs.",
        features: ["Client-side extraction", "Quick .doc download", "Preview"],
    },
    //   {
    //     id: "ai-pdf-summarizer",
    //     title: "AI PDF Summarizer",
    //     href: "/tools/ai-pdf-summarizer",
    //     short:
    //       "Get concise extractive summaries and highlights from text PDFs — local summarizer, privacy-first.",
    //     features: ["Extractive summary", "Custom length", "Local processing"],
    //   },
];

const pageJsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "name": "AnyFileConverter Tools",
    "description": "Listing of useful file and PDF tools on AnyFileConverter",
    "url": "https://anyfileconverter.online/tools",
    "itemListElement": tools.map((t, i) => ({
        "@type": "ListItem",
        position: i + 1,
        item: {
            "@type": "WebPage",
            name: t.title,
            url: `https://anyfileconverter.online${t.href}`,
            description: t.short,
        },
    })),
};

export default function ToolsIndexPage() {
    return (
        <>
            <main style={{ padding: 24, maxWidth: 1100, margin: "0 auto", lineHeight: 1.6 }}>
                <nav aria-label="Breadcrumb" style={{ marginBottom: 12 }}>
                    <Link href="/">Home</Link> {" / "} Tools
                </nav>
                <header style={{ marginBottom: 18 }}>
                    <h1 style={{ margin: 0, fontSize: 32, color: "#0b74de" }}>Tools</h1>
                    <p style={{ marginTop: 8, color: "#555", maxWidth: 820 }}>
                        Fast, privacy-first browser tools for common file tasks. No signup required — most tools run
                        directly in your browser so your files stay on your device unless you choose to upload.
                    </p>
                </header>

                <section
                    aria-labelledby="all-tools"
                    style={{
                        display: "grid",
                        gap: 16,
                        gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
                    }}
                >
                    {tools.map((t) => (
                        <article
                            key={t.id}
                            className="card"
                            style={{
                                padding: 18,
                                borderRadius: 12,
                                border: "1px solid #eef2f7",
                                background: "#fff",
                            }}
                        >
                            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 12 }}>
                                <div>
                                    <h3 style={{ margin: 0, fontSize: 18, color: "#0b74de" }}>{t.title}</h3>
                                    <p style={{ marginTop: 8, marginBottom: 12, color: "#333" }}>{t.short}</p>
                                </div>
                                <div style={{ minWidth: 44, textAlign: "right" }}>
                                    <Link href={t.href} aria-label={`Open ${t.title}`}>
                                        <span
                                            style={{
                                                display: "inline-block",
                                                padding: "8px 10px",
                                                borderRadius: 8,
                                                background: "#0b74de",
                                                color: "#fff",
                                                fontWeight: 700,
                                                textDecoration: "none",
                                            }}
                                        >
                                            Open
                                        </span>
                                    </Link>
                                </div>
                            </div>

                            <ul style={{ marginTop: 12, marginBottom: 0, paddingLeft: 18, color: "#666" }}>
                                {t.features.map((f) => (
                                    <li key={f}>{f}</li>
                                ))}
                            </ul>
                        </article>
                    ))}
                </section>

                <section style={{ marginTop: 28 }}>
                    <h2 style={{ color: "#0b74de" }}>Why choose AnyFileConverter?</h2>
                    <ul style={{ marginLeft: 20 }}>
                        <li><strong>Privacy-first:</strong> Most processing happens locally in your browser.</li>
                        <li><strong>No signup:</strong> Instant tools — convert and download without accounts.</li>
                        <li><strong>Lightweight:</strong> Fast interfaces designed to work on mobile and desktop.</li>
                        <li><strong>AdSense-friendly pages:</strong> Clear Trust & Legal pages to help with approval.</li>
                    </ul>
                </section>

                <section style={{ marginTop: 28 }}>
                    <h2 style={{ color: "#0b74de" }}>Frequently asked</h2>

                    <div style={{ marginTop: 12 }}>
                        <h3 style={{ marginBottom: 6 }}>Are files uploaded?</h3>
                        <p style={{ color: "#444" }}>
                            By default, files are processed in your browser and are not uploaded to our servers. Any optional
                            sharing or cloud features will be clearly labelled and opt-in.
                        </p>

                        <h3 style={{ marginTop: 12, marginBottom: 6 }}>Can I use these on mobile?</h3>
                        <p style={{ color: "#444" }}>
                            Yes — all tools are designed to work on modern mobile browsers. Performance depends on device memory for very large files.
                        </p>
                    </div>
                </section>
            </main>

            <script
                type="application/ld+json"
                // eslint-disable-next-line react/no-danger
                dangerouslySetInnerHTML={{ __html: JSON.stringify(pageJsonLd) }}
            />
        </>
    );
}
