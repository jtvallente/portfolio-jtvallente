import type { KBChunk, KBAction } from "@/data/kb"
import { GoogleGenAI } from "@google/genai"
import { retrieveKeyword } from "./retrieve.keyword"

type HybridResult = {
  chunks: KBChunk[]
  actions: KBAction[]
}

const EMBED_MODEL = "gemini-embedding-001"

// Cache embeddings in memory for the running serverless instance
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

function getClient() {
  const apiKey = process.env.GEMINI_API_KEY
  if (!apiKey) throw new Error("Missing GEMINI_API_KEY")
  return new GoogleGenAI({ apiKey })
}

// Embed a single string (query or chunk)
async function embedText(text: string) {
  const ai = getClient()
  const resp = await ai.models.embedContent({
    model: EMBED_MODEL,
    contents: text,
  })

  // resp.embeddings may be an array depending on SDK output;
  // handle both single and list shapes safely.
  const emb = Array.isArray(resp.embeddings) ? resp.embeddings[0] : resp.embeddings
  const values = emb?.values ?? emb
  if (!values || !Array.isArray(values)) throw new Error("Embedding response missing values")
  return values as number[]
}

async function getChunkEmbedding(chunk: KBChunk) {
  const cached = chunkEmbedCache.get(chunk.id)
  if (cached) return cached

  // Embed a compact representation (title + text + tags)
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
 * Hybrid retrieval:
 * 1) keyword retrieval to shortlist
 * 2) embedding cosine similarity rerank for meaning-based search
 */
export async function retrieveHybrid(query: string, topN = 6): Promise<HybridResult> {
  const { chunks: shortlist, actions } = retrieveKeyword(query, 10)

  // If shortlist is only summary fallback, just return it
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
  // Prefer actions from top chunks; fallback to keyword actions if none
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
