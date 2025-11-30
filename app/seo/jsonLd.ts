export function toolJsonLd(domain = 'https://jpgtopdf.example') {
  return {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "JPG to PDF Converter",
    "url": domain,
    "description": "Convert JPG images to PDF in your browser. No upload required by default."
  }
}
