import Link from 'next/link';

export default function Page() {
  return (
    <div className="container">
      <nav className="text-sm text-slate-600 mb-4">
        <Link href="/">Home</Link> / <Link href="/blog">Blog</Link> / <span>CSV to JSON</span>
      </nav>
      <h1>CSV to JSON — Quick Guide</h1>
      <p className="muted">Turn CSV tables into JSON objects for APIs and apps.</p>
      <p className="mt-3 text-gray-600">
        This guide helps you convert spreadsheet-style CSV data into structured JSON for web APIs and application import workflows. Use the first row as headers to map fields to keys automatically.
      </p>
      <p className="mt-3 text-gray-600">
        Browser-based conversion makes it easy to clean up CSV exports and prepare them for JavaScript, REST APIs, or database imports without extra tools.
      </p>
    </div>
  );
}
