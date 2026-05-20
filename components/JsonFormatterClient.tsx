'use client'

import React, { useState } from 'react';

export default function JsonFormatterClient(): React.ReactElement {
  const [text, setText] = useState('');
  const [error, setError] = useState<string | null>(null);

  const format = () => {
    setError(null);
    try {
      const obj = JSON.parse(text);
      setText(JSON.stringify(obj, null, 2));
    } catch (e: any) {
      setError(e?.message ?? 'Invalid JSON');
    }
  };

  const download = () => {
    const blob = new Blob([text], { type: 'application/json' });
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
      <textarea value={text} onChange={(e) => setText(e.target.value)} placeholder='Paste JSON here' rows={12} style={{ width: '100%', padding: 8 }} />
      {error && <div style={{ color: 'var(--text)' }}>{error}</div>}
      <div style={{ marginTop: 8, display: 'flex', gap: 8 }}>
        <button onClick={format} className="btn">Format / Validate</button>
        <button onClick={download} style={{ background: 'var(--surface)', border: '1px solid var(--border)', padding: '8px 12px', borderRadius: 8 }}>Download JSON</button>
      </div>
    </div>
  );
}
