'use client'

import React, { useState } from 'react';

export default function EpochConverterClient(): React.ReactElement {
  const [value, setValue] = useState('');
  const [out, setOut] = useState('');

  const convert = () => {
    const n = Number(value.trim());
    if (Number.isNaN(n)) {
      setOut('Invalid number');
      return;
    }
    // detect seconds vs ms
    const asMs = value.trim().length <= 10 ? n * 1000 : n;
    const d = new Date(asMs);
    setOut(d.toString());
  };

  return (
    <div style={{ maxWidth: 820 }}>
      <div style={{ marginBottom: 8 }}>
        <input placeholder='Enter epoch (seconds or milliseconds)' value={value} onChange={(e) => setValue(e.target.value)} style={{ width: '100%', padding: 8 }} />
      </div>
      <div style={{ display: 'flex', gap: 8 }}>
        <button onClick={convert} className="btn">Convert</button>
        <button onClick={() => { setValue(''); setOut(''); }} style={{ background: 'var(--surface)', border: '1px solid var(--border)', padding: '8px 12px', borderRadius: 8 }}>Clear</button>
      </div>
      {out && <div style={{ marginTop: 12, padding: 12, border: '1px solid var(--border)', borderRadius: 8, background: 'var(--surface)' }}>{out}</div>}
    </div>
  );
}
