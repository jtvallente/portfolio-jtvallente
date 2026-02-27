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
        <div style="padding:24px;font-family:Inter,Segoe UI,Arial,sans-serif;background:#ffffff;color:#111827;">
          <table role="presentation" cellpadding="0" cellspacing="0" style="width:100%;max-width:560px;margin:0 auto;border:1px solid #e5e7eb;border-radius:14px;overflow:hidden;background:#ffffff;color:#111827;">
            <tr>
              <td style="padding:16px 20px;border-bottom:1px solid #e5e7eb;background:#f3f4f6;">
                <div style="font-size:12px;letter-spacing:2px;text-transform:uppercase;color:#6b7280;">Portfolio Contact</div>
                <div style="font-size:18px;font-weight:600;margin-top:6px;">New message received ✉️</div>
              </td>
            </tr>
            <tr>
              <td style="padding:20px;">
                <table role="presentation" cellpadding="0" cellspacing="0" style="width:100%;border:1px solid #e5e7eb;border-radius:12px;padding:12px;">
                  <tr>
                    <td style="width:33%;vertical-align:top;padding-right:12px;">
                      <div style="font-size:12px;color:#6b7280;">Name</div>
                      <div style="font-size:14px;margin-top:4px;">${name || 'N/A'}</div>
                    </td>
                    <td style="width:33%;vertical-align:top;padding-right:12px;">
                      <div style="font-size:12px;color:#6b7280;">Company</div>
                      <div style="font-size:14px;margin-top:4px;">${company || 'N/A'}</div>
                    </td>
                    <td style="width:34%;vertical-align:top;">
                      <div style="font-size:12px;color:#6b7280;">Email</div>
                      <div style="font-size:14px;margin-top:4px;color:#7c3aed;word-break:break-word;overflow-wrap:anywhere;">${email}</div>
                    </td>
                  </tr>
                </table>
                <div style="margin-top:14px;">
                  <span style="display:inline-block;border-radius:999px;padding:4px 10px;font-size:11px;background:#f3f4f6;border:1px solid #e5e7eb;">
                    Subject: ${subject}
                  </span>
                </div>
                <table role="presentation" cellpadding="0" cellspacing="0" style="width:100%;margin-top:16px;border:1px solid #e5e7eb;border-radius:12px;background:#f9fafb;">
                  <tr>
                    <td style="padding:12px;">
                      <div style="font-size:12px;color:#6b7280;">Message</div>
                      <div style="font-size:14px;margin-top:8px;white-space:pre-wrap;">${message}</div>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>
            <tr>
              <td style="padding:12px 20px;border-top:1px solid #e5e7eb;font-size:12px;color:#6b7280;background:#f3f4f6;">
                Confidentiality notice: This email may contain private information intended only for the recipient. If you received it in error, please delete it.
              </td>
            </tr>
          </table>
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
