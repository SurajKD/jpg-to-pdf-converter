import type { Metadata } from "next";
import dynamic from "next/dynamic";
import Link from "next/link";

const AdPlaceholder = dynamic(() => import("../../../components/AdPlaceholder"), {
    ssr: false,
    loading: () => <div className="h-24" />,
});

export const metadata: Metadata = {
    title: "How to Compress Images (JPG/PNG/WebP) Without Losing Quality",
    description:
        "Learn the best ways to compress images for web, email, and social media. Compare browser-based, offline, and mobile compression methods.",
    alternates: { canonical: "https://anyfileconverter.online/blog/image-compressor" },
    keywords: ["compress images", "image compressor", "jpg compressor", "png compressor"],
};

const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
        {
            "@type": "Question",
            name: "Does compressing an image reduce quality?",
            acceptedAnswer: {
                "@type": "Answer",
                text: "Light compression keeps quality almost identical. Heavy compression can cause pixelation or blurring.",
            },
        },
        {
            "@type": "Question",
            name: "What is the best format for compressed images?",
            acceptedAnswer: {
                "@type": "Answer",
                text: "WebP is usually the smallest. JPG is great for photos. PNG is best for graphics requiring transparency.",
            },
        },
    ],
};

export default function Blog() {
    return (
        <>
            <main className="max-w-4xl mx-auto px-4 py-8 prose prose-lg">
                <h1>How to Compress Images (JPG/PNG/WebP) Without Losing Quality</h1>

                <p className="text-gray-600">
                    Large images slow down websites, increase upload times, and take up unnecessary storage.
                    This guide explains how to compress images effectively while keeping them sharp.
                </p>

                <Link href="/tools/image-compressor">
                    <button className="px-4 py-2 rounded btn text-white shadow  mb-4 mt-2">
                        Try the Image Compressor
                    </button>
                </Link>

                <h2>Why compress images?</h2>
                <ul>
                    <li>Faster uploads</li>
                    <li>Better website performance</li>
                    <li>Smaller email attachments</li>
                    <li>Improved SEO (Google ranks faster sites higher)</li>
                </ul>

                <h2>1. Browser-based image compression (client-side)</h2>
                <p>
                    These tools work directly in your browser with no uploads, ensuring privacy. Ideal for quick tasks.
                </p>

                <h2>2. Desktop tools</h2>
                <p>
                    Desktop photo editors (Photoshop, Affinity, GIMP) offer advanced compression and control over formats and quality.
                </p>

                <h2>3. Mobile image compression</h2>
                <p>Modern phones can compress images using built-in editing tools or apps.</p>

                <h2>Comparison table</h2>
                <div className="overflow-x-auto rounded-lg border border-slate-200 my-4">
                    <table className="min-w-full text-sm divide-y divide-slate-200">
                        <thead className="bg-slate-50">
                            <tr>
                                <th className="px-4 py-3 text-left font-semibold">Method</th>
                                <th className="px-4 py-3 text-left font-semibold">Privacy</th>
                                <th className="px-4 py-3 text-left font-semibold">Ease</th>
                                <th className="px-4 py-3 text-left font-semibold">Quality Control</th>
                            </tr>
                        </thead>

                        <tbody className="divide-y divide-slate-100">
                            <tr className="bg-white">
                                <td className="px-4 py-3">Browser tool</td>
                                <td className="px-4 py-3">High</td>
                                <td className="px-4 py-3">Easy</td>
                                <td className="px-4 py-3">Good</td>
                            </tr>

                            <tr className="bg-slate-50/50">
                                <td className="px-4 py-3">Desktop software</td>
                                <td className="px-4 py-3">High</td>
                                <td className="px-4 py-3">Medium</td>
                                <td className="px-4 py-3">Excellent</td>
                            </tr>

                            <tr className="bg-white">
                                <td className="px-4 py-3">Mobile apps</td>
                                <td className="px-4 py-3">Medium</td>
                                <td className="px-4 py-3">Easy</td>
                                <td className="px-4 py-3">Medium</td>
                            </tr>
                        </tbody>
                    </table>
                </div>


                <h2>Best practices for compression</h2>
                <ul>
                    <li>Use WebP for smallest size.</li>
                    <li>Lower quality to 70–80% for photos.</li>
                    <li>Resize large images before compressing.</li>
                </ul>

                <h2>FAQ</h2>
                <div className="space-y-3 mt-4">
                    <details className="bg-white border border-slate-200 rounded-lg p-4">
                        <summary className="cursor-pointer list-none font-medium py-1">
                            What’s the best image format?
                        </summary>
                        <p className="mt-2 text-gray-700 text-sm">
                            WebP offers the smallest file sizes, JPG is best for photographs, and PNG is ideal when you need transparency.
                        </p>
                    </details>

                    <details className="bg-white border border-slate-200 rounded-lg p-4">
                        <summary className="cursor-pointer list-none font-medium py-1">
                            Will compression blur my image?
                        </summary>
                        <p className="mt-2 text-gray-700 text-sm">
                            Only if you choose very high compression.
                            Moderate compression maintains excellent visual quality and is nearly indistinguishable from the original.
                        </p>
                    </details>
                </div>


                <AdPlaceholder />
            </main>

            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
        </>
    );
}
