import dynamic from 'next/dynamic'
import AdPlaceholder from '../../../components/AdPlaceholder'
const DropzoneClient = dynamic(() => import('../../../components/DropzoneClient'), { ssr: false })

export default function ToolPage() {
  return (
    <section>
      <h1>JPG to PDF</h1>
      <p className="small">Drag & drop JPG/PNG files, reorder, and convert to a single PDF.</p>
      <div className="card" style={{marginTop:12}}>
        <DropzoneClient />
      </div>
      <div style={{marginTop:12}}>
        <AdPlaceholder />
      </div>
    </section>
  )
}
