import type { VercelRequest, VercelResponse } from '@vercel/node'
import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

function setCors(req: VercelRequest, res: VercelResponse) {
  const origin = req.headers.origin

  const isLocal =
    typeof origin === 'string' &&
    (origin.startsWith('http://localhost:') ||
      origin.startsWith('http://127.0.0.1:'))

  const isProd = origin === 'https://jtvallente.github.io'

  if (origin && (isLocal || isProd)) {
    res.setHeader('Access-Control-Allow-Origin', origin)
  } else {
    res.setHeader('Access-Control-Allow-Origin', 'null')
  }

  res.setHeader('Vary', 'Origin')
  res.setHeader('Access-Control-Allow-Methods', 'POST,OPTIONS')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type')
  res.setHeader('Access-Control-Max-Age', '86400')
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  setCors(req, res)

  if (req.method === 'OPTIONS') {
    return res.status(204).end()
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ ok: false, error: 'Method not allowed' })
  }

  try {
    const body =
      typeof req.body === 'string' ? JSON.parse(req.body) : req.body ?? {}
    const { name, company, email, subject, message, website } = body

    if (website) {
      return res.status(400).json({ ok: false, error: 'Spam detected' })
    }

    if (!email || !subject || !message) {
      return res.status(400).json({ ok: false, error: 'Missing required fields' })
    }

    await resend.emails.send({
      from: 'Portfolio Contact <onboarding@resend.dev>',
      to: 'jameslourencevallente@gmail.com',
      replyTo: email,
      subject: `[Portfolio] ${subject}`,
      html: `
        <style>
          .card { background: #ffffff; color: #111827; border: 1px solid #e5e7eb; }
          .muted { color: #6b7280; }
          .accent { color: #7c3aed; }
          .chip { background: #f3f4f6; border: 1px solid #e5e7eb; }
          .panel { background: #f9fafb; border: 1px solid #e5e7eb; }
          .wrap { word-break: break-word; overflow-wrap: anywhere; }
          @media (prefers-color-scheme: dark) {
            .card { background: #161b22; color: #c9d1d9; border-color: #30363d; }
            .muted { color: #8b949e; }
            .accent { color: #9f7aea; }
            .chip { background: #0f141b; border-color: #30363d; }
            .panel { background: #0f141b; border-color: #30363d; }
          }
        </style>
        <div style="padding:24px;font-family:Inter,Segoe UI,Arial,sans-serif;">
          <div class="card" style="max-width:560px;margin:0 auto;border-radius:14px;overflow:hidden;">
            <div style="padding:16px 20px;border-bottom:1px solid #e5e7eb;background:linear-gradient(135deg, rgba(159,122,234,0.18), rgba(255,255,255,1));">
              <div class="muted" style="font-size:12px;letter-spacing:2px;text-transform:uppercase;">Portfolio Contact</div>
              <div style="font-size:18px;font-weight:600;margin-top:6px;">New message received ✉️</div>
            </div>
            <div style="padding:20px;">
              <div style="display:flex;gap:12px;flex-wrap:wrap;">
                <div style="flex:1;min-width:220px;">
                  <div class="muted" style="font-size:12px;">Name</div>
                  <div style="font-size:14px;margin-top:4px;">${name || 'N/A'}</div>
                </div>
                <div style="flex:1;min-width:220px;">
                  <div class="muted" style="font-size:12px;">Company</div>
                  <div style="font-size:14px;margin-top:4px;">${company || 'N/A'}</div>
                </div>
                <div style="flex:1;min-width:220px;">
                  <div class="muted" style="font-size:12px;">Email</div>
                  <div class="accent wrap" style="font-size:14px;margin-top:4px;">${email}</div>
                </div>
              </div>
              <div style="margin-top:14px;">
                <span class="chip" style="display:inline-block;border-radius:999px;padding:4px 10px;font-size:11px;">
                  Subject: ${subject}
                </span>
              </div>
              <div class="panel" style="margin-top:16px;padding:14px;border-radius:10px;">
                <div class="muted" style="font-size:12px;">Message</div>
                <div style="font-size:14px;margin-top:8px;white-space:pre-wrap;">${message}</div>
              </div>
            </div>
            <div class="muted" style="padding:12px 20px;border-top:1px solid #e5e7eb;font-size:12px;">
              Confidentiality notice: This email may contain private information intended only for the recipient. If you received it in error, please delete it.
            </div>
          </div>
        </div>
      `,
      text: [
        'New contact message from your portfolio.',
        '',
        `Name: ${name || 'N/A'}`,
        `Company: ${company || 'N/A'}`,
        `Email: ${email}`,
        '',
        message,
      ].join('\n'),
    })

    return res.status(200).json({ ok: true })
  } catch {
    return res.status(500).json({ ok: false, error: 'Email failed' })
  }
}
