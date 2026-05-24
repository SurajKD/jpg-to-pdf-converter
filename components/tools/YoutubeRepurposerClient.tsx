"use client";

import { useState, useRef } from "react";

const TABS = [
    { id: "blog", label: "Blog Post", icon: "📝" },
    { id: "thread", label: "X Thread", icon: "🧵" },
    { id: "linkedin", label: "LinkedIn", icon: "💼" },
    { id: "captions", label: "Captions", icon: "🎬" },
    { id: "newsletter", label: "Newsletter", icon: "📧" },
];

const PROMPTS: Record<string, (title: string, summary: string) => string> = {
    blog: (title, summary) => `You are a professional content writer. Based on the YouTube video titled "${title}" with the following summary, write a detailed SEO-friendly blog post.
Requirements:
- Write a compelling H1 title
- Write an engaging introduction
- Use ## H2 subheadings to structure content
- Include key insights, tips, and takeaways
- Write a conclusion with a call to action
- Aim for 600–900 words
- Conversational but authoritative tone
- Do NOT mention "this video" — write as a standalone article
Summary: ${summary}
Return only the blog post in markdown format.`,

    thread: (title, summary) => `You are a viral X (Twitter) content creator. Based on the YouTube video titled "${title}", create an engaging X thread.
Requirements:
- Start with a hook tweet (no "🧵 Thread:" opener)
- Write 6–10 tweets total, each under 280 characters
- Number each tweet (1/, 2/, 3/ etc.)
- Include insights, surprising facts, or actionable tips
- End with a strong CTA tweet
- Use emojis sparingly
Summary: ${summary}
Return only the thread, one tweet per line.`,

    linkedin: (title, summary) => `You are a LinkedIn thought leader. Based on the YouTube video titled "${title}", write a high-performing LinkedIn post.
Requirements:
- Bold attention-grabbing first line
- Short paragraphs (1–2 sentences max)
- Include a personal insight or opinion
- 3–5 key takeaways formatted clearly
- End with a question to drive comments
- 150–300 words, professional but human
- 3–5 relevant hashtags at the end
Summary: ${summary}
Return only the LinkedIn post.`,

    captions: (title, summary) => `You are a social media caption writer. Based on the YouTube video titled "${title}", create 5 captions for different platforms.
1. **Instagram** (150 words max) — storytelling with emojis and hashtags
2. **TikTok** (80 words max) — casual, punchy, trend-aware
3. **YouTube Community** (100 words max) — engaging existing audience
4. **Facebook** (120 words max) — informative, community-focused
5. **Universal Short** (under 50 words) — works anywhere
Summary: ${summary}
Return all 5 captions with their labels.`,

    newsletter: (title, summary) => `You are an expert newsletter writer. Based on the YouTube video titled "${title}", write a newsletter section.
Requirements:
- Subject line suggestion
- Preview text (under 100 characters)
- Warm personal opening
- Summary in 2–3 paragraphs
- 3–5 bullet point takeaways
- "Why this matters" section
- CTA to watch the full video
- 300–500 words, conversational tone
Summary: ${summary}
Return the subject line, preview text, and newsletter body.`,
};

function extractVideoId(url: string): string | null {
    const patterns = [
        /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([^&\n?#]+)/,
        /youtube\.com\/shorts\/([^&\n?#]+)/,
    ];
    for (const p of patterns) {
        const m = url.match(p);
        if (m) return m[1];
    }
    return null;
}

async function callGemini(prompt: string): Promise<string> {
    const models = ["gemini-2.5-flash", "gemini-2.5-flash-lite", "gemini-2.5-pro"];
    let lastError: any;
    for (const model of models) {
        try {
            const res = await fetch("/api/repurpose", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ prompt, model }),
            });
            if (!res.ok) {
                const err = await res.json();
                if (err.status === 503 || err.status === 429) { lastError = err; continue; }
                throw new Error(err.error || "API error");
            }
            const data = await res.json();
            return data.text;
        } catch (e) {
            lastError = e;
        }
    }
    throw lastError;
}

export default function YoutubeRepurposerClient() {
    const [url, setUrl] = useState("");
    const [activeTab, setActiveTab] = useState("blog");
    const [videoInfo, setVideoInfo] = useState<{
        title: string;
        summary: string;
        authorName: string;
        videoId: string;
    } | null>(null);
    const [results, setResults] = useState<Record<string, string>>({});
    const [loading, setLoading] = useState(false);
    const [generating, setGenerating] = useState(false);
    const [error, setError] = useState("");
    const [copied, setCopied] = useState(false);

    async function handleFetch() {
        const videoId = extractVideoId(url.trim());
        if (!videoId) { setError("Please enter a valid YouTube URL."); return; }
        setError("");
        setLoading(true);
        setResults({});
        setVideoInfo(null);
        try {
            const res = await fetch("/api/repurpose", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ action: "fetch", videoId }),
            });
            if (!res.ok) throw new Error("Failed to fetch");
            const data = await res.json();
            setVideoInfo({
                title: data.title,
                summary: data.summary,
                authorName: data.authorName,
                videoId,
            });
        } catch (e) {
            setError("Could not fetch video info. Please check the URL and try again.");
        } finally {
            setLoading(false);
        }
    }

    async function handleGenerate(type: string) {
        if (!videoInfo) return;
        if (results[type]) { setActiveTab(type); return; }
        setGenerating(true);
        setActiveTab(type);
        try {
            const prompt = PROMPTS[type](videoInfo.title, videoInfo.summary);
            const content = await callGemini(prompt);
            setResults(prev => ({ ...prev, [type]: content }));
        } catch (e: any) {
            setError("Generation failed. Please try again.");
        } finally {
            setGenerating(false);
        }
    }

    async function handleGenerateAll() {
        if (!videoInfo || generating) return;
        setGenerating(true);
        for (const tab of TABS) {
            if (!results[tab.id]) {
                try {
                    const prompt = PROMPTS[tab.id](videoInfo.title, videoInfo.summary);
                    const content = await callGemini(prompt);
                    setResults(prev => ({ ...prev, [tab.id]: content }));
                } catch { }
            }
        }
        setGenerating(false);
    }

    function handleCopy() {
        const text = results[activeTab];
        if (!text) return;
        navigator.clipboard.writeText(text);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    }

    const currentResult = results[activeTab];

    return (
        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>

            {/* URL Input */}
            <div className="card" style={{ borderRadius: 16, padding: 20 }}>
                <label style={{ display: "block", fontSize: 13, fontWeight: 600, color: "var(--muted)", textTransform: "uppercase", letterSpacing: "0.07em", marginBottom: 10 }}>
                    YouTube URL
                </label>
                <div className="action-row">
                    <input
                        type="url"
                        value={url}
                        onChange={e => { setUrl(e.target.value); setError(""); }}
                        onKeyDown={e => e.key === "Enter" && handleFetch()}
                        placeholder="https://youtube.com/watch?v=... or youtu.be/..."
                        style={{ flex: 1 }}
                    />
                    <button
                        onClick={handleFetch}
                        disabled={loading || !url.trim()}
                        className="btn"
                        style={{ whiteSpace: "nowrap" }}
                    >
                        {loading ? "Fetching…" : "Fetch Video"}
                    </button>
                </div>
                {error && (
                    <p style={{ color: "#ef4444", fontSize: 13, margin: "8px 0 0" }}>{error}</p>
                )}
            </div>

            {/* Video Info */}
            {videoInfo && (
                <div className="card" style={{ borderRadius: 16, padding: 16, display: "flex", gap: 14, alignItems: "flex-start" }}>
                    <img
                        src={`https://img.youtube.com/vi/${videoInfo.videoId}/mqdefault.jpg`}
                        alt="Video thumbnail"
                        style={{ width: 120, height: 68, borderRadius: 8, objectFit: "cover", flexShrink: 0, border: "1px solid var(--border)" }}
                    />
                    <div style={{ flex: 1, minWidth: 0 }}>
                        <p style={{ fontWeight: 700, fontSize: 15, color: "var(--text)", margin: "0 0 2px" }}>
                            {videoInfo.title}
                        </p>
                        {videoInfo.authorName && (
                            <p className="small" style={{ margin: "0 0 4px", color: "var(--brandprimary)" }}>
                                {videoInfo.authorName}
                            </p>
                        )}
                        <p className="small" style={{ margin: 0, display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden" }}>
                            {videoInfo.summary?.slice(0, 200)}…
                        </p>
                    </div>
                </div>
            )}

            {/* Generate Buttons */}
            {videoInfo && (
                <div style={{ display: "flex", gap: 8, flexWrap: "wrap", alignItems: "center" }}>
                    {TABS.map(tab => (
                        <button
                            key={tab.id}
                            onClick={() => handleGenerate(tab.id)}
                            disabled={generating}
                            style={{
                                padding: "8px 14px",
                                borderRadius: 8,
                                border: `1px solid ${results[tab.id] ? "var(--brandprimary)" : "var(--border)"}`,
                                background: results[tab.id] ? "var(--brandprimary)" : "var(--surface)",
                                color: results[tab.id] ? "#fff" : "var(--text)",
                                fontSize: 13,
                                fontWeight: 600,
                                cursor: generating ? "not-allowed" : "pointer",
                                opacity: generating && activeTab !== tab.id ? 0.6 : 1,
                                display: "flex",
                                alignItems: "center",
                                gap: 5,
                                transition: "all 0.15s",
                            }}
                        >
                            {tab.icon} {tab.label}
                            {results[tab.id] && <span style={{ fontSize: 10, marginLeft: 2 }}>✓</span>}
                        </button>
                    ))}
                    <button
                        onClick={handleGenerateAll}
                        disabled={generating}
                        style={{
                            padding: "8px 16px",
                            borderRadius: 8,
                            border: "1px solid var(--brandprimary)",
                            background: "transparent",
                            color: "var(--brandprimary)",
                            fontSize: 13,
                            fontWeight: 600,
                            cursor: generating ? "not-allowed" : "pointer",
                        }}
                    >
                        {generating ? "Generating…" : "⚡ Generate All 5"}
                    </button>
                </div>
            )}

            {/* Output Tabs + Content */}
            {videoInfo && (
                <div className="panel" style={{ borderRadius: 16, overflow: "hidden" }}>

                    {/* Tab bar */}
                    <div style={{ display: "flex", borderBottom: "1px solid var(--border)", overflowX: "auto" }}>
                        {TABS.map(tab => (
                            <button
                                key={tab.id}
                                onClick={() => setActiveTab(tab.id)}
                                style={{
                                    padding: "12px 16px",
                                    border: "none",
                                    borderBottom: activeTab === tab.id ? "2px solid var(--brandprimary)" : "2px solid transparent",
                                    background: "transparent",
                                    color: activeTab === tab.id ? "var(--brandprimary)" : "var(--muted)",
                                    fontSize: 13,
                                    fontWeight: 600,
                                    cursor: "pointer",
                                    whiteSpace: "nowrap",
                                    display: "flex",
                                    alignItems: "center",
                                    gap: 5,
                                }}
                            >
                                {tab.icon} {tab.label}
                            </button>
                        ))}
                    </div>

                    {/* Content */}
                    <div style={{ padding: "1.25rem", minHeight: 220 }}>
                        {generating && activeTab && !results[activeTab] ? (
                            <div style={{ textAlign: "center", padding: "3rem 0" }}>
                                <div style={{
                                    width: 28,
                                    height: 28,
                                    border: "3px solid var(--border)",
                                    borderTop: "3px solid var(--brandprimary)",
                                    borderRadius: "50%",
                                    margin: "0 auto 12px",
                                    animation: "yt-spin 0.8s linear infinite",
                                }} />
                                <p className="small" style={{ margin: 0 }}>
                                    Generating {TABS.find(t => t.id === activeTab)?.label}…
                                </p>
                            </div>
                        ) : currentResult ? (
                            <>
                                <div style={{ display: "flex", justifyContent: "flex-end", marginBottom: 10 }}>
                                    <button
                                        onClick={handleCopy}
                                        style={{
                                            padding: "6px 14px",
                                            borderRadius: 6,
                                            border: "1px solid var(--border)",
                                            background: "var(--surface)",
                                            color: copied ? "#22c55e" : "var(--brandprimary)",
                                            fontSize: 12,
                                            fontWeight: 600,
                                            cursor: "pointer",
                                        }}
                                    >
                                        {copied ? "✓ Copied!" : "Copy"}
                                    </button>
                                </div>
                                <pre style={{
                                    whiteSpace: "pre-wrap",
                                    wordBreak: "break-word",
                                    fontSize: 14,
                                    lineHeight: 1.8,
                                    color: "var(--text)",
                                    margin: 0,
                                    fontFamily: "inherit",
                                }}>
                                    {currentResult}
                                </pre>
                            </>
                        ) : (
                            <div style={{ textAlign: "center", padding: "3rem 0" }}>
                                <p className="small" style={{ margin: 0 }}>
                                    Click a button above to generate {TABS.find(t => t.id === activeTab)?.label}
                                </p>
                            </div>
                        )}
                    </div>
                </div>
            )}

            <style>{`@keyframes yt-spin { to { transform: rotate(360deg); } }`}</style>
        </div>
    );
}