import type { KBChunk, KBAction } from "../../src/data/kb.js"
import { retrieveKeyword } from "./retrieve.keyword.js"

type HybridResult = {
  chunks: KBChunk[]
  actions: KBAction[]
}

const EMBED_MODEL = "mistral-embed"

// Cache embeddings in memory (serverless warm instance only)
const chunkEmbedCache = new Map<string, number[]>()

function cosine(a: number[], b: number[]) {
  let dot = 0
  let na = 0
  let nb = 0
  const len = Math.min(a.length, b.length)

  for (let i = 0; i < len; i++) {
    dot += a[i] * b[i]
    na += a[i] * a[i]
    nb += b[i] * b[i]
  }

  return dot / (Math.sqrt(na) * Math.sqrt(nb) + 1e-12)
}

async function embedText(text: string): Promise<number[]> {
  const apiKey = process.env.MISTRAL_API_KEY
  if (!apiKey) throw new Error("Missing MISTRAL_API_KEY")

  const resp = await fetch("https://api.mistral.ai/v1/embeddings", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: EMBED_MODEL,
      input: text,
    }),
  })

  if (!resp.ok) {
    const err = await resp.text()
    throw new Error(`Mistral embedding error ${resp.status}: ${err}`)
  }

  const data = await resp.json()
  const embedding = data?.data?.[0]?.embedding

  if (!embedding || !Array.isArray(embedding)) {
    throw new Error("Invalid embedding response")
  }

  return embedding as number[]
}

async function getChunkEmbedding(chunk: KBChunk) {
  const cached = chunkEmbedCache.get(chunk.id)
  if (cached) return cached

  const payload = [
    `Title: ${chunk.title}`,
    chunk.tags?.length ? `Tags: ${chunk.tags.join(", ")}` : "",
    `Text: ${chunk.text}`,
  ]
    .filter(Boolean)
    .join("\n")

  const vec = await embedText(payload)
  chunkEmbedCache.set(chunk.id, vec)

  return vec
}


/**
 * TRUE Hybrid Retrieval:
 * 1) Keyword shortlist
 * 2) Semantic rerank via Mistral embeddings
 */
export async function retrieveHybrid(
  query: string,
  topN = 6
): Promise<HybridResult> {
  const { chunks: shortlist, actions } = retrieveKeyword(query, 20)

  if (shortlist.length === 1 && shortlist[0].id === "bio.summary") {
    return { chunks: shortlist, actions }
  }

  const qVec = await embedText(query)

  const scored = await Promise.all(
    shortlist.map(async (c) => {
      const cVec = await getChunkEmbedding(c)
      return { chunk: c, sim: cosine(qVec, cVec) }
    })
  )

  scored.sort((a, b) => b.sim - a.sim)

  const top = scored.slice(0, topN).map((x) => x.chunk)
  const topActions = collectActions(top, actions)

  return { chunks: top, actions: topActions }
}

function collectActions(chunks: KBChunk[], fallback: KBAction[]) {
  const seen = new Set<string>()
  const out: KBAction[] = []

  for (const c of chunks) {
    for (const a of c.actions || []) {
      const key =
        a.type === "NAVIGATE_ROUTE"
          ? `${a.type}:${a.to}`
          : a.type === "OPEN_URL"
          ? `${a.type}:${a.url}`
          : `${a.type}:${a.sectionId}`

      if (seen.has(key)) continue
      seen.add(key)
      out.push(a)
    }
  }

  if (out.length === 0) return fallback.slice(0, 5)
  return out.slice(0, 5)
}