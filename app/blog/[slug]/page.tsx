import { notFound } from 'next/navigation'
export default function Post({ params }: { params: { slug: string } }) {
  const { slug } = params
  if (!slug) notFound()
  return (
    <article>
      <h1>{slug.replace(/-/g,' ')}</h1>
      <p className="small">This is a placeholder blog post. Replace with MDX content for production.</p>
    </article>
  )
}
