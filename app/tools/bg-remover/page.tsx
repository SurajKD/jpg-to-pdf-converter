import type { Metadata } from "next";
import dynamic from "next/dynamic";
import Link from "next/link";

const BgRemoverClient = dynamic(
    () => import("../../../components/BgRemoverClient"),
    { ssr: false, loading: () => <div style={{ height: 200 }} /> }
);

const AdPlaceholder = dynamic(
    () => import("../../../components/AdPlaceholder"),
    { ssr: false, loading: () => <div style={{ height: 90 }} /> }
);

export const metadata: Metadata = {
    title: "Remove Image Background — Free Online Tool",
    description: "Remove backgrounds from photos in your browser. Transparent PNG output, fast and private (no upload by default).",
    keywords: ["background remover", "remove background from image", "png background remove"],
    alternates: { canonical: "https://anyfileconverter.online/tools/bg-remover" },
    openGraph: {
        title: "Background Remover — AnyFileConverter",
        description: "Erase image backgrounds and export transparent PNGs — all in your browser.",
        url: "https://anyfileconverter.online/tools/bg-remover",
        siteName: "AnyFileConverter",
        type: "website",
        images: [{ url: "https://anyfileconverter.online/og-bg-remover.png", width: 1200, height: 630, alt: "Background Remover" }],
    },
    twitter: {
        card: "summary_large_image",
        title: "Background Remover — AnyFileConverter",
        description: "Quickly remove backgrounds and download transparent PNG files.",
        images: ["https://anyfileconverter.online/og-bg-remover.png"],
    },
};

const pageJsonLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "Background Remover",
    "applicationCategory": "ImageTool",
    "operatingSystem": "Web",
    "url": "https://anyfileconverter.online/tools/bg-remover",
    "description": "Remove backgrounds from images client-side to preserve privacy and speed.",
};

export default function BgRemoverPage() {
    return (
        <>
            <main style={{ padding: 24, maxWidth: 900, margin: "0 auto", lineHeight: 1.7 }}>
                <nav aria-label="Breadcrumb" style={{ marginBottom: 12 }}>
                    <Link href="/">Home</Link> {" / "} <Link href="/tools">Tools</Link> {" / "} BG Remover
                </nav>
                <h1>Remove Background from Image — Fast & Private</h1>
                <p style={{ color: "#555" }}>
                    Remove the background from photos and download a transparent PNG — all in your browser with no uploads by default.
                </p>

                <section style={{ marginTop: 20 }}>
                    <BgRemoverClient />
                </section>

                <div style={{ marginTop: 20 }}>
                    <AdPlaceholder />
                </div>

                <section style={{ marginTop: 28 }}>
                    <h2>Use cases</h2>
                    <ul style={{ marginLeft: 20 }}>
                        <li>Product photos for marketplaces</li>
                        <li>Profile images</li>
                        <li>Marketing assets</li>
                    </ul>
                </section>
            </main>

            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(pageJsonLd) }} />
        </>
    );
}
