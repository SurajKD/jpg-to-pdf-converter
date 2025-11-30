'use client'

import React, { useCallback, useState } from 'react'
import { useDropzone } from 'react-dropzone'
import { imagesToPdf } from '../lib/pdfClient'

type Item = { file: File; id: string; url: string }

function id() { return Math.random().toString(36).slice(2,9) }

export default function DropzoneClient() {
  const [items, setItems] = useState<Item[]>([])
  const [processing, setProcessing] = useState(false)
  const onDrop = useCallback((acceptedFiles: File[]) => {
    const added = acceptedFiles.map(f => ({ file: f, id: id(), url: URL.createObjectURL(f) }))
    setItems(prev => [...prev, ...added])
  }, [])
  const { getRootProps, getInputProps } = useDropzone({ onDrop, accept: { 'image/*': [] } })

  const remove = (idToRemove: string) => setItems(prev => prev.filter(i => i.id !== idToRemove))

  const convert = async () => {
    if (!items.length) return
    setProcessing(true)
    try {
      const blob = await imagesToPdf(items.map(i => i.file), { format: 'A4', quality: 0.8 })
      const url = URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = 'images.pdf'
      document.body.appendChild(a)
      a.click()
      a.remove()
      URL.revokeObjectURL(url)
    } catch (e) {
      console.error(e)
      alert('Conversion failed')
    } finally {
      setProcessing(false)
    }
  }

  return (
    <div>
      <div {...getRootProps()} style={{padding:12, border:'2px dashed #e6eef8', borderRadius:8, cursor:'pointer'}}>
        <input {...getInputProps()} />
        <p className="small">Drag & drop images here, or click to select</p>
      </div>
      {items.length > 0 && (
        <ul style={{marginTop:12}}>
          {items.map(it => (
            <li key={it.id} style={{display:'flex', alignItems:'center', gap:12, marginBottom:8}}>
              <img src={it.url} alt="" width={64} style={{objectFit:'cover', borderRadius:6}} />
              <div style={{flex:1}}>
                <div style={{fontWeight:600}}>{it.file.name}</div>
                <div className="small">{(it.file.size/1024).toFixed(1)} KB</div>
              </div>
              <button className="btn" onClick={() => remove(it.id)}>Remove</button>
            </li>
          ))}
        </ul>
      )}
      <div style={{marginTop:12}}>
        <button className="btn" onClick={convert} disabled={processing}>{processing ? 'Converting...' : 'Convert to PDF'}</button>
      </div>
    </div>
  )
}
