import Link from 'next/link'
export default function BlogIndex() {
  return (
    <section>
      <h1>Blog</h1>
      <p className="small">SEO articles and how-tos.</p>
      <ul>
        <li><Link href="/blog/how-to-convert-jpg-to-pdf">How to convert JPG to PDF</Link></li>
      </ul>
    </section>
  )
}
