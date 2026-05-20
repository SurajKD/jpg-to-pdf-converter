'use client'

import React, { useState } from 'react';

function parseCsv(text: string) {
  const lines = text.split(/\r?\n/).filter(Boolean);
  if (!lines.length) return [];
  const headers = lines[0].split(',').map(h => h.trim());
  return lines.slice(1).map(line => {
    const cols = line.split(',');
    const obj: any = {};
    headers.forEach((h, i) => { obj[h] = cols[i] !== undefined ? cols[i].trim() : ''; });
    return obj;
  });
}

export default function CsvToJsonClient(): React.ReactElement {
  const [csv, setCsv] = useState('');
  const [jsonPreview, setJsonPreview] = useState<string>('');

  const convert = () => {
    const arr = parseCsv(csv);
    setJsonPreview(JSON.stringify(arr, null, 2));
  };

  const download = () => {
    const blob = new Blob([jsonPreview], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'data.json';
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(url);
  };

  return (
    <div style={{ maxWidth: 820 }}>
      <textarea value={csv} onChange={(e) => setCsv(e.target.value)} placeholder='Paste CSV here (first row = headers)' rows={10} style={{ width: '100%', padding: 8 }} />
      <div style={{ marginTop: 8, display: 'flex', gap: 8 }}>
        <button onClick={convert} className="btn">Convert</button>
        <button onClick={download} style={{ background: 'var(--surface)', border: '1px solid var(--border)', padding: '8px 12px', borderRadius: 8 }}>Download JSON</button>
      </div>

      {jsonPreview && (
        <pre style={{ marginTop: 12, padding: 12, border: '1px solid var(--border)', borderRadius: 8, background: 'var(--surface)' }}>{jsonPreview}</pre>
      )}
    </div>
  );
}
