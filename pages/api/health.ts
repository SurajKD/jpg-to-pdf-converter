import type { NextApiRequest, NextApiResponse } from 'next'
export default function handler(req: NextApiRequest, res: NextApiResponse) {
  res.status(200).json({ ok: true, env: process.env.ENABLE_SERVER_CONVERSION || 'false' })
}
