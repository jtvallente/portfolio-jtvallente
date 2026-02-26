import { Resend } from "resend"

const resend = new Resend(process.env.RESEND_API_KEY)

import { NextApiRequest, NextApiResponse } from "next"

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    res.status(405).json({ ok: false, error: "Method not allowed" })
    return
  }

  try {
    const body =
      typeof req.body === "string" ? JSON.parse(req.body) : req.body ?? {}
    const { name, company, email, subject, message, website } = body

    if (website) {
      res.status(400).json({ ok: false, error: "Spam detected" })
      return
    }

    if (!email || !subject || !message) {
      res.status(400).json({ ok: false, error: "Missing required fields" })
      return
    }

    await resend.emails.send({
      from: "Portfolio Contact <onboarding@resend.dev>",
      to: "jameslourencevallente@gmail.com",
      replyTo: email,
      subject: `[Portfolio] ${subject}`,
      text: [
        "New contact message from your portfolio.",
        "",
        `Name: ${name || "N/A"}`,
        `Company: ${company || "N/A"}`,
        `Email: ${email}`,
        "",
        message,
      ].join("\n"),
    })

    res.status(200).json({ ok: true })
  } catch (error) {
    console.error("Error sending email:", error);
    res.status(500).json({ ok: false, error: "Email failed" })
  }
}
