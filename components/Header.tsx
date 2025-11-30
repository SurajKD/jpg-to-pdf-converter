import Link from 'next/link'
export default function Header() {
  return (
    <header className="container header" style={{paddingTop:12, paddingBottom:12}}>
      <div>
        <Link href="/"><strong>JPG→PDF</strong></Link>
      </div>
      <nav>
        <Link href="/tools/jpg-to-pdf" style={{marginRight:12}}>Tool</Link>
        <Link href="/blog" style={{marginRight:12}}>Blog</Link>
        <Link href="/privacy">Privacy</Link>
      </nav>
    </header>
  )
}
