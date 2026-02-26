import { Resend } from "resend"

const resend = new Resend(process.env.RESEND_API_KEY)

export default async function handler(req: any, res: any) {
  if (req.method !== "POST") {
    res.status(405).json({ ok: false, error: "Method not allowed" })
    return
  }

  try {
    const body =
      typeof req.body === "string" ? JSON.parse(req.body) : req.body ?? {}
    const { email, message, website } = body

    if (website) {
      res.status(400).json({ ok: false, error: "Spam detected" })
      return
    }

    if (!email) {
      res.status(400).json({ ok: false, error: "Missing required fields" })
      return
    }

    await resend.emails.send({
      from: "Resume Requests <onboarding@resend.dev>",
      to: "jameslourencevallente@gmail.com",
      replyTo: email,
      subject: "[Portfolio] Resume access request",
      text: [
        "New resume access request from your portfolio.",
        "",
        `Email: ${email}`,
        "",
        message || "No message provided.",
      ].join("\n"),
    })

    res.status(200).json({ ok: true })
  } catch (error) {
    res.status(500).json({ ok: false, error: "Email failed" })
  }
}
