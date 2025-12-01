import Link from 'next/link'
export default function Header() {
    return (
        <header className="container header" style={{ paddingTop: 12, paddingBottom: 12 }}>
            <div>
                <Link href="/" style={{fontSize:'24px', color: '#0b74de', textDecoration: 'none' }}><strong>JPG→PDF</strong></Link>
            </div>
            <nav>
                <Link href="/tools/jpg-to-pdf" 
                style={{ marginRight: 12, color: '#0b74de', textDecoration: 'none' }}>Tool</Link>
                <Link href="/blog" 
                style={{ marginRight: 12, color: '#0b74de', textDecoration: 'none' }}>Blog</Link>
                <Link href="/privacy" 
                style={{ color: '#0b74de', textDecoration: 'none' }}>Privacy</Link>
            </nav>
        </header>
    )
}
