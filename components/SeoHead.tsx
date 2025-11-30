import Head from 'next/head'
export default function SeoHead({ title, description }: { title?: string; description?: string }) {
  return (
    <Head>
      <title>{title || 'JPG to PDF'}</title>
      <meta name="description" content={description || 'Convert JPG to PDF in your browser'} />
    </Head>
  )
}
