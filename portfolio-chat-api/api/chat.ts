import type { VercelRequest, VercelResponse } from '@vercel/node'
import { retrieveHybrid } from './lib/retrieve.hybrid.js'

type ReqBody = {
  message: string
  history?: Array<{ role: 'user' | 'assistant'; text: string }>
}

const MODEL = 'mistral-small' // Free-tier friendly model

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
    return res.status(405).json({ error: 'Method not allowed' })
  }

  try {
    const apiKey = process.env.MISTRAL_API_KEY
    if (!apiKey) {
      return res.status(500).json({ error: 'Missing MISTRAL_API_KEY' })
    }

    const body = req.body as ReqBody
    const message = (body?.message || '').trim()
    if (!message) {
      return res.status(400).json({ error: 'Missing message' })
    }

    // Retrieve KB context
    const { chunks, actions } = await retrieveHybrid(message, 15)

    const context = chunks
      .map((c) => `### ${c.title}\n${c.text}`)
      .join('\n\n')

    // System guardrails
    const systemPrompt = [
      `You are "James' Portfolio Assistant".`,
      `Answer ONLY using the provided CONTEXT.`,
      `If the answer is not in CONTEXT, say: "I don't have that information in James' portfolio."`,
      `Do not invent details.`,
      `Use English only.`,
      `Be concise and recruiter-friendly.`,
      `If relevant, end with: "Would you like to view the project page?"`,
    ].join('\n')

    const historyMessages =
      (body.history || []).slice(-10).map((m) => ({
        role: m.role,
        content: m.text,
      })) ?? []

    // Call Mistral API
    const mistralResp = await fetch(
      'https://api.mistral.ai/v1/chat/completions',
      {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${apiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: MODEL,
          messages: [
            { role: 'system', content: systemPrompt },
            { role: 'system', content: `CONTEXT:\n${context}` },
            ...historyMessages,
            { role: 'user', content: message },
          ],
          temperature: 0.3,
          max_tokens: 400,
        }),
      }
    )

    if (!mistralResp.ok) {
      const errText = await mistralResp.text()
      throw new Error(`Mistral error ${mistralResp.status}: ${errText}`)
    }

    const data = await mistralResp.json()

    const reply =
      data?.choices?.[0]?.message?.content?.trim() ||
      "I don't have that information in James' portfolio."

    return res.status(200).json({ reply, actions })
  } catch (err: unknown) {
    const errorMessage = err instanceof Error ? err.message : String(err)

    return res.status(500).json({
      error: 'Internal error',
      details: errorMessage,
    })
  }
}