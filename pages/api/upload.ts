import type { NextApiRequest, NextApiResponse } from 'next'
import formidable from 'formidable'
export const config = { api: { bodyParser: false } }

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (process.env.ENABLE_SERVER_CONVERSION !== 'true') {
    return res.status(403).json({ error: 'Server conversion disabled' })
  }
  if (req.method !== 'POST') return res.status(405).end()
  const form = new formidable.IncomingForm()
  form.parse(req, (err, fields, files) => {
    if (err) return res.status(500).json({ error: 'Upload failed' })
    // TODO: store files to S3 or ephemeral storage and return URL with TTL
    return res.status(200).json({ ok: true, files: Object.keys(files) })
  })
}
