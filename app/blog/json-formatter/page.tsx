import Link from 'next/link';

export default function Page() {
  return (
    <div className="container">
      <nav className="text-sm text-slate-600 mb-4">
        <Link href="/">Home</Link> / <Link href="/blog">Blog</Link> / <span>JSON Formatter & Validator</span>
      </nav>
      <h1>JSON Formatter & Validator — Tips</h1>
      <p className="muted">Validate JSON quickly, spot errors and download well-formatted JSON files.</p>
      <p className="mt-3 text-gray-600">
        Use this browser-based JSON formatter for API payloads, config files, and development workflows. It helps you spot syntax issues fast and produces clean, readable JSON for use in code and automation.
      </p>
      <p className="mt-3 text-gray-600">
        The tool is optimized for quick validation and download, making it easy to keep JSON data consistent across projects and integrations.
      </p>
    </div>
  );
}
