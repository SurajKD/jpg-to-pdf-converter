'use client'

import React, { useState } from 'react';

export default function SvgToPngClient(): React.ReactElement {
  const [svgText, setSvgText] = useState('');
  const [error, setError] = useState<string | null>(null);

  const onFile = async (f: File | null) => {
    setError(null);
    if (!f) return;
    try {
      const text = await f.text();
      setSvgText(text);
    } catch (e) {
      setError('Could not read file');
    }
  };

  const downloadPng = async () => {
    setError(null);
    try {
      const blob = new Blob([svgText], { type: 'image/svg+xml;charset=utf-8' });
      const url = URL.createObjectURL(blob);
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement('canvas');
        canvas.width = img.width || 800;
        canvas.height = img.height || 600;
        const ctx = canvas.getContext('2d');
        if (!ctx) {
          setError('Canvas not available');
          URL.revokeObjectURL(url);
          return;
        }
        ctx.fillStyle = 'white';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(img, 0, 0);
        canvas.toBlob((b) => {
          if (!b) {
            setError('Failed to generate PNG');
            URL.revokeObjectURL(url);
            return;
          }
          const u = URL.createObjectURL(b);
          const a = document.createElement('a');
          a.href = u;
          a.download = 'image.png';
          document.body.appendChild(a);
          a.click();
          a.remove();
          URL.revokeObjectURL(u);
          URL.revokeObjectURL(url);
        }, 'image/png');
      };
      img.onerror = () => {
        setError('Failed to load SVG as image');
        URL.revokeObjectURL(url);
      };
      img.src = url;
    } catch (e) {
      setError('Conversion failed');
    }
  };

  return (
    <div style={{ maxWidth: 820 }}>
      <div style={{ marginBottom: 12 }}>
        <input type="file" accept="image/svg+xml" onChange={(e) => onFile(e.target.files?.[0] ?? null)} />
      </div>

      <div>
        <textarea value={svgText} onChange={(e) => setSvgText(e.target.value)} placeholder="Paste SVG markup here" rows={10} style={{ width: '100%', padding: 8 }} />
      </div>

      {error && <div style={{ marginTop: 8, color: 'var(--text)' }}>{error}</div>}

      <div style={{ marginTop: 8, display: 'flex', gap: 8 }}>
        <button onClick={downloadPng} className="btn">Download PNG</button>
        <button onClick={() => { setSvgText(''); setError(null); }} style={{ background: 'var(--surface)', border: '1px solid var(--border)', padding: '8px 12px', borderRadius: 8 }}>Clear</button>
      </div>
    </div>
  );
}
