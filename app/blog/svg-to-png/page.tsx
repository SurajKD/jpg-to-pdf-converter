import Link from 'next/link';

export default function Page() {
  return (
    <div className="container">
      <nav className="text-sm text-slate-600 mb-4">
        <Link href="/">Home</Link> / <Link href="/blog">Blog</Link> / <span>Convert SVG to PNG</span>
      </nav>
      <h1>Convert SVG to PNG — Quick Guide</h1>
      <p className="muted">Use the SVG → PNG converter to render vector artwork as a portable PNG image in your browser.</p>
      <p className="mt-3 text-gray-600">
        This guide shows how to convert SVG files or inline SVG markup into downloadable PNG images directly in the browser. It is helpful for designers and developers who need raster versions of icons, illustrations, or logos without installing extra software.
      </p>
      <p className="mt-3 text-gray-600">
        The browser-based SVG conversion keeps your workflow fast and private by processing files on your device, while still supporting real-world SVG content and export-ready PNG downloads.
      </p>
    </div>
  );
}
