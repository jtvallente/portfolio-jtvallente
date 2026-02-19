import type { KBChunk, KBAction } from "@/data/kb"
import { KB } from "@/data/kb"

export type RetrieveResult = {
  chunks: KBChunk[]
  actions: KBAction[]
}

const STOP = new Set([
  "the","a","an","and","or","to","of","in","on","for","with","about","what",
  "which","who","how","is","are","was","were","do","does","did","my","your",
  "james","me","you","i"
])

// Add the terms you *want* recruiters to use (deploy, host, backend, etc.)
const SYNONYMS: Record<string, string[]> = {
  deploy: ["deployment","host","hosting","vercel","render","docker","aws","ci","cd"],
  hosting: ["deploy","deployment","vercel","render"],
  backend: ["api","server","node","express","services","rest"],
  frontend: ["react","ui","ux","tailwind","web"],
  database: ["db","sql","mysql","postgres","mongodb","supabase","firebase"],
  data: ["etl","pipeline","scraping","ingestion","preprocessing"],
  ai: ["ml","nlp","llm","bert","gemini","model","fine-tune","finetune"],
  research: ["thesis","paper","study","evaluation","f1","kappa"],
  projects: ["portfolio","apps","application","case study"],
  contact: ["email","linkedin","github"],
}

export function retrieveKeyword(query: string, topN = 10): RetrieveResult {
  const q = normalize(query)
  const baseTokens = tokenize(q)
  const expandedTokens = expandTokens(baseTokens)

  const scored = KB.map((chunk) => ({
    chunk,
    score: scoreChunk(chunk, q, expandedTokens),
  }))
    .filter((x) => x.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, topN)
    .map((x) => x.chunk)

  const chunks = scored.length ? scored : KB.filter((c) => c.id === "bio.summary")
  return { chunks, actions: collectActions(chunks) }
}

function scoreChunk(chunk: KBChunk, fullQuery: string, qTokens: string[]) {
  const title = normalize(chunk.title)
  const tags = (chunk.tags || []).map(normalize)
  const text = normalize(chunk.text)

  let score = 0

  // Strong phrase match
  if (title.includes(fullQuery)) score += 30
  if (text.includes(fullQuery)) score += 15

  // Token scoring: title > tags > text
  for (const tok of qTokens) {
    if (!tok) continue

    // exact includes
    if (title.includes(tok)) score += 8
    if (tags.some((t) => t.includes(tok))) score += 6
    if (text.includes(tok)) score += 2

    // fuzzy (typos / minor differences)
    score += fuzzyBoost(title, tok, 2)
    score += fuzzyBoost(text, tok, 1)
  }

  // Light priors (useful defaults)
  if (chunk.id === "bio.summary") score += 2
  if (chunk.id === "skills.overview") score += 1
  if (chunk.source === "projects" && qTokens.includes("project")) score += 2

  return score
}

function collectActions(chunks: KBChunk[]): KBAction[] {
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

  return out.slice(0, 5)
}

function normalize(s: string) {
  return (s || "")
    .toLowerCase()
    .replace(/[^\p{L}\p{N}\s]/gu, " ")
    .replace(/\s+/g, " ")
    .trim()
}

function tokenize(s: string) {
  return s
    .split(" ")
    .map((t) => t.trim())
    .filter((t) => t.length >= 3 && !STOP.has(t))
}

function expandTokens(tokens: string[]) {
  const expanded = new Set(tokens)
  for (const t of tokens) {
    for (const [k, syns] of Object.entries(SYNONYMS)) {
      if (t === k || syns.includes(t)) {
        expanded.add(k)
        syns.forEach((x) => expanded.add(x))
      }
    }
  }
  return [...expanded]
}

// Minimal fuzzy boost using edit distance threshold 1–2 via sliding window check
function fuzzyBoost(haystack: string, needle: string, weight: number) {
  if (needle.length < 4) return 0
  if (haystack.includes(needle)) return 0

  // Check a few windows around similar lengths (cheap)
  const n = needle.length
  for (let i = 0; i + n <= haystack.length; i += Math.max(1, Math.floor(n / 2))) {
    const window = haystack.slice(i, i + n)
    if (levenshtein(window, needle) <= 1) return weight
  }
  return 0
}

function levenshtein(a: string, b: string) {
  const m = a.length
  const n = b.length
  const dp = Array.from({ length: m + 1 }, () => new Array(n + 1).fill(0))
  for (let i = 0; i <= m; i++) dp[i][0] = i
  for (let j = 0; j <= n; j++) dp[0][j] = j
  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      const cost = a[i - 1] === b[j - 1] ? 0 : 1
      dp[i][j] = Math.min(
        dp[i - 1][j] + 1,
        dp[i][j - 1] + 1,
        dp[i - 1][j - 1] + cost
      )
    }
  }
  return dp[m][n]
}
