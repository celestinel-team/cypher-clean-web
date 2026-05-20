import { neon } from '@neondatabase/serverless'

const sql = neon(process.env.DATABASE_URL || process.env.POSTGRES_URL)

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  try {
    await sql`INSERT INTO downloads DEFAULT VALUES`
    return res.status(200).json({ ok: true })
  } catch (err) {
    console.error('track-download failed:', err)
    return res.status(500).json({ ok: false })
  }
}
