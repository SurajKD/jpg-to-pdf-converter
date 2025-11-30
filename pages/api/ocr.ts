import type { NextApiRequest, NextApiResponse } from 'next'
// This endpoint is intentionally minimal. Enable only if you supply OCR_API_KEY and deploy capacity.
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (process.env.ENABLE_SERVER_CONVERSION !== 'true') {
    return res.status(403).json({ error: 'OCR disabled' })
  }
  // Rate-limit + security must be added in production
  return res.status(501).json({ error: 'OCR not implemented in this scaffold' })
}
