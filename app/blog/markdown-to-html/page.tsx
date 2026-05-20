import Link from 'next/link';

export default function Page() {
  return (
    <div className="container">
      <nav className="text-sm text-slate-600 mb-4">
        <Link href="/">Home</Link> / <Link href="/blog">Blog</Link> / <span>Markdown to HTML</span>
      </nav>
      <h1>Markdown to HTML — Best Practices</h1>
      <p className="muted">Convert Markdown to HTML for quick previews and static pages.</p>
      <p className="mt-3 text-gray-600">
        This guide explains how to transform Markdown text into HTML that is ready for blogs, docs, or web pages. It supports common markdown features like headings, formatting, inline code, and links for fast HTML generation.
      </p>
      <p className="mt-3 text-gray-600">
        The browser-based converter is ideal for writers and developers who want instant previews and downloadable HTML output without extra tools.
      </p>
    </div>
  );
}
