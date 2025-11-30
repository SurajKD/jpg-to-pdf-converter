import AdPlaceholder from './AdPlaceholder'
export default function Footer() {
  return (
    <footer style={{marginTop:32, padding:24, borderTop:'1px solid #eef2f7'}}>
      <div className="container small">
        <p>© {new Date().getFullYear()} JPG to PDF. All rights reserved.</p>
        <div style={{marginTop:8}}><AdPlaceholder /></div>
      </div>
    </footer>
  )
}
