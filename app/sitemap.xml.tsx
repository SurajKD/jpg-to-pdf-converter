import { NextResponse } from 'next/server'

export async function GET() {
  const domain = process.env.NEXT_PUBLIC_DOMAIN || 'https://jpgtopdf.example'
  const pages = [
    '',
    '/tools/jpg-to-pdf',
    '/privacy',
    '/terms',
    '/about',
    '/blog'
  ]
  const urls = pages.map(p => `<url><loc>${domain}${p}</loc></url>`).join('')
  const xml = `<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${urls}</urlset>`
  return new NextResponse(xml, { headers: { 'Content-Type': 'application/xml' } })
}
