'use client'

import React, { useCallback, useEffect, useState } from 'react'
import { useDropzone } from 'react-dropzone'
import { imagesToPdf } from '../lib/pdfClient'

type Item = { file: File; id: string; url: string }

function genId() {
  return Math.random().toString(36).slice(2, 9)
}

export default function DropzoneClient() {
  const [items, setItems] = useState<Item[]>([])
  const [processing, setProcessing] = useState(false) // conversion running
  const [animating, setAnimating] = useState(false) // 2s post-convert animation
  const [converted, setConverted] = useState(false) // conversion complete + animation done
  const [downloadUrl, setDownloadUrl] = useState<string | null>(null)

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const added = acceptedFiles.map(f => ({ file: f, id: genId(), url: URL.createObjectURL(f) }))
    setItems(prev => [...prev, ...added])
    // reset previous conversion state if uploading new files
    if (downloadUrl) {
      URL.revokeObjectURL(downloadUrl)
      setDownloadUrl(null)
      setConverted(false)
    }
  }, [downloadUrl])

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { 'image/*': [] },
  })

  const revokeUrl = (url?: string | null) => {
    if (!url) return
    try { URL.revokeObjectURL(url) } catch (e) {}
  }

  const remove = (idToRemove: string) => {
    setItems(prev => {
      const found = prev.find(p => p.id === idToRemove)
      if (found) revokeUrl(found.url)
      return prev.filter(i => i.id !== idToRemove)
    })
    // if items removed after conversion, keep converted state as-is; user can reset manually
  }

  // Convert -> then show 2s animation -> then show download button
  const convert = async () => {
    if (!items.length) return
    setProcessing(true)
    setAnimating(false)
    setConverted(false)
    // clear previous download if any
    if (downloadUrl) {
      revokeUrl(downloadUrl)
      setDownloadUrl(null)
    }

    try {
      const blob = await imagesToPdf(items.map(i => i.file), { format: 'A4', quality: 0.8 })
      const url = URL.createObjectURL(blob)
      setDownloadUrl(url)

      // start the 2-second "finalizing" animation
      setAnimating(true)
      setTimeout(() => {
        setAnimating(false)
        setConverted(true)
      }, 2000)
    } catch (err) {
      console.error(err)
      alert('Conversion failed — please try smaller images or refresh the page.')
    } finally {
      setProcessing(false)
    }
  }

  const resetAll = () => {
    // revoke thumbnails
    items.forEach(i => revokeUrl(i.url))
    setItems([])
    // revoke pdf
    if (downloadUrl) revokeUrl(downloadUrl)
    setDownloadUrl(null)
    setProcessing(false)
    setAnimating(false)
    setConverted(false)
  }

  // cleanup on unmount
  useEffect(() => {
    return () => {
      items.forEach(i => revokeUrl(i.url))
      if (downloadUrl) revokeUrl(downloadUrl)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div>
      {/* Dropzone */}
      <div
        {...getRootProps()}
        style={{
          padding: 12,
          border: '2px dashed #e6eef8',
          borderRadius: 8,
          cursor: 'pointer',
          background: isDragActive ? '#f4fbff' : 'transparent',
        }}
        aria-disabled={processing || animating}
      >
        <input {...getInputProps()} />
        <p style={{ margin: 0, color: '#333' }}>
          {isDragActive ? 'Drop images here...' : 'Drag & drop images here, or click to select'}
        </p>
        <small style={{ color: '#666' }}>Supports JPG, JPEG, PNG, WEBP</small>
      </div>

      {/* File list */}
      {items.length > 0 && (
        <ul style={{ marginTop: 12, padding: 0, listStyle: 'none' }}>
          {items.map(it => (
            <li key={it.id} style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 8 }}>
              <img src={it.url} alt={it.file.name} width={64} height={64} style={{ objectFit: 'cover', borderRadius: 6 }} />
              <div style={{ flex: 1 }}>
                <div style={{ fontWeight: 600 }}>{it.file.name}</div>
                <div style={{ color: '#666', fontSize: 13 }}>{(it.file.size / 1024).toFixed(1)} KB</div>
              </div>
              <button
                onClick={() => remove(it.id)}
                style={{
                  background: 'transparent',
                  border: '1px solid #eee',
                  color: '#333',
                  padding: '8px 10px',
                  borderRadius: 8,
                  cursor: 'pointer',
                }}
                aria-label={`Remove ${it.file.name}`}
                disabled={processing || animating}
              >
                Remove
              </button>
            </li>
          ))}
        </ul>
      )}

      {/* Action area */}
      <div style={{ marginTop: 12, display: 'flex', gap: 12, alignItems: 'center' }}>
        {/* Show Convert button only when not converted and not animating */}
        {!converted && !animating && (
          <button
            onClick={convert}
            disabled={processing || items.length === 0}
            style={{
              background: '#0b74de',
              color: '#fff',
              padding: '10px 16px',
              borderRadius: 8,
              border: 'none',
              cursor: processing || items.length === 0 ? 'not-allowed' : 'pointer',
              opacity: processing || items.length === 0 ? 0.6 : 1,
            }}
          >
            {processing ? 'Processing...' : 'Convert to PDF'}
          </button>
        )}

        {/* Converting animation (2s) after conversion finishes */}
        {animating && (
          <div aria-live="polite" style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <div
              role="status"
              style={{
                width: 36,
                height: 36,
                borderRadius: '50%',
                border: '4px solid rgba(0,0,0,0.08)',
                borderTopColor: '#0b74de',
                animation: 'spin 1s linear infinite',
              }}
            />
            <div style={{ color: '#333', fontWeight: 600 }}>Finalizing your PDF...</div>

            <style>{`
              @keyframes spin {
                to { transform: rotate(360deg); }
              }
            `}</style>
          </div>
        )}

        {/* After converted: show Download (green) + Reset */}
        {converted && downloadUrl && (
          <>
            <a
              href={downloadUrl}
              download={`converted-${new Date().toISOString().replace(/[:.]/g, '-')}.pdf`}
              style={{
                display: 'inline-block',
                background: '#22c55e', /* green */
                color: '#fff',
                padding: '12px 20px',
                borderRadius: 10,
                textDecoration: 'none',
                fontWeight: 700,
              }}
            >
              ⬇️ Download PDF
            </a>

            <button
              onClick={resetAll}
              style={{
                background: '#fff',
                color: '#333',
                padding: '10px 14px',
                borderRadius: 8,
                border: '1px solid #e6eef8',
                cursor: 'pointer',
              }}
            >
              Reset
            </button>
          </>
        )}

        {/* If not converted and no items - show disabled convert hint */}
        {!converted && !animating && items.length === 0 && (
          <div style={{ color: '#666' }}>Add images to enable conversion</div>
        )}
      </div>
    </div>
  )
}
