import Link from 'next/link'
export default function Home() {
  return (
    <section>
      <h1>Convert JPG to PDF — Fast & Private</h1>
      <p className="small">Client-side conversion. Your files never leave your browser by default.</p>
      <div style={{marginTop:20}}>
        <Link href="/tools/jpg-to-pdf"><button className="btn">Open JPG → PDF Converter</button></Link>
      </div>
    </section>
  )
}
