'use client'

import React, { useState } from 'react';

function simpleMarkdownToHtml(md: string) {
  // minimal converter: headings, bold, italics, links, code blocks
  let out = md
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
  out = out.replace(/^### (.*$)/gim, '<h3>$1</h3>');
  out = out.replace(/^## (.*$)/gim, '<h2>$1</h2>');
  out = out.replace(/^# (.*$)/gim, '<h1>$1</h1>');
  out = out.replace(/\*\*(.*)\*\*/gim, '<strong>$1</strong>');
  out = out.replace(/\*(.*)\*/gim, '<em>$1</em>');
  out = out.replace(/`([^`]+)`/gim, '<code>$1</code>');
  out = out.replace(/\n/g, '<br/>');
  out = out.replace(/\[(.*?)\]\((.*?)\)/gim, '<a href="$2">$1</a>');
  return out;
}

export default function MarkdownToHtmlClient(): React.ReactElement {
  const [md, setMd] = useState('');

  const html = simpleMarkdownToHtml(md || '');

  const download = () => {
    const content = `<!doctype html><html><head><meta charset="utf-8"><title>Converted</title></head><body>${html}</body></html>`;
    const blob = new Blob([content], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'converted.html';
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(url);
  };

  return (
    <div style={{ maxWidth: 820 }}>
      <textarea value={md} onChange={(e) => setMd(e.target.value)} placeholder='Paste Markdown here' rows={10} style={{ width: '100%', padding: 8 }} />
      <div style={{ marginTop: 8, display: 'flex', gap: 8 }}>
        <button onClick={download} className="btn">Download HTML</button>
        <button onClick={() => setMd('')} style={{ background: 'var(--surface)', border: '1px solid var(--border)', padding: '8px 12px', borderRadius: 8 }}>Clear</button>
      </div>

      <h4 style={{ marginTop: 12 }}>Preview</h4>
      <div style={{ border: '1px solid var(--border)', padding: 12, borderRadius: 8, background: 'var(--surface)' }} dangerouslySetInnerHTML={{ __html: html }} />
    </div>
  );
}
