import Link from 'next/link';

export default function Page() {
  return (
    <div className="container">
      <nav className="text-sm text-slate-600 mb-4">
        <Link href="/">Home</Link> / <Link href="/blog">Blog</Link> / <span>Epoch Time Converter</span>
      </nav>
      <h1>Epoch Time Converter — Convert Timestamps</h1>
      <p className="muted">Convert epoch seconds or milliseconds to human-readable dates and timezones.</p>
      <p className="mt-3 text-gray-600">
        Use this converter to decode epoch timestamps from logs, API responses, or event records into readable date and time strings. It supports both second and millisecond precision so you can inspect raw timestamp values quickly.
      </p>
      <p className="mt-3 text-gray-600">
        The browser-based tool is perfect for developers and analysts who need fast, private timestamp conversion without installing additional utilities.
      </p>
    </div>
  );
}
