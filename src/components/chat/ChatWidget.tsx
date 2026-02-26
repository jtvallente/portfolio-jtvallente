import { useEffect, useMemo, useRef, useState } from 'react'
import { Bot, Send, X, MessageCircle, Sparkles } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { retrieveKeyword } from '@/lib/retrieve.keyword'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'

type ChatMsg = {
  id: string
  role: 'user' | 'assistant'
  text: string
  ts: number
  actions?: KBAction[]
}

type KBAction =
  | { type: 'NAVIGATE_ROUTE'; label: string; to: string }
  | { type: 'OPEN_URL'; label: string; url: string }
  | { type: 'OPEN_SECTION'; label: string; sectionId: string; to?: string }

function uid() {
  return Math.random().toString(36).slice(2) + Date.now().toString(36)
}

export default function ChatWidget() {
  const [open, setOpen] = useState(false)
  const [input, setInput] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const navigate = useNavigate()

  async function runAction(action: KBAction) {
    if (action.type === 'NAVIGATE_ROUTE') {
      navigate(action.to)
      setOpen(false)
      return
    }

    if (action.type === 'OPEN_URL') {
      window.open(action.url, '_blank', 'noopener,noreferrer')
      return
    }

    if (action.type === 'OPEN_SECTION') {
      if (action.to) {
        navigate(action.to)
        setOpen(false)
        setTimeout(() => {
          const el = document.getElementById(action.sectionId)
          el?.scrollIntoView({ behavior: 'smooth', block: 'start' })
        }, 250)
        return
      }

      const el = document.getElementById(action.sectionId)
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' })
        setOpen(false)
      } else {
        setTimeout(() => {
          const retry = document.getElementById(action.sectionId)
          retry?.scrollIntoView({ behavior: 'smooth', block: 'start' })
        }, 250)
      }
      return
    }
  }

  const [messages, setMessages] = useState<ChatMsg[]>(() => {
    const raw = localStorage.getItem('james_chat_messages')
    if (!raw) {
      return [
        {
          id: uid(),
          role: 'assistant',
          text: 'Hi! I\'m James\' portfolio assistant. Ask me about projects, research, experience, skills, or education.',
          ts: Date.now(),
        },
      ]
    }
    try {
      const parsed = JSON.parse(raw) as ChatMsg[]
      return parsed.length
        ? parsed
        : [
            {
              id: uid(),
              role: 'assistant',
              text: 'Hi! I\'m James\' portfolio assistant. Ask me about projects, research, experience, skills, or education.',
              ts: Date.now(),
            },
          ]
    } catch {
      return [
        {
          id: uid(),
          role: 'assistant',
          text: 'Hi! I\'m James\' portfolio assistant. Ask me about projects, research, experience, skills, or education.',
          ts: Date.now(),
        },
      ]
    }
  })

  const listRef = useRef<HTMLDivElement | null>(null)
  const inputRef = useRef<HTMLInputElement | null>(null)

  useEffect(() => {
    localStorage.setItem('james_chat_messages', JSON.stringify(messages))
  }, [messages])

  useEffect(() => {
    const el = listRef.current
    if (!el) return
    el.scrollTop = el.scrollHeight
  }, [messages, isTyping, open])

  useEffect(() => {
    if (!open) return
    const t = setTimeout(() => inputRef.current?.focus(), 50)
    return () => clearTimeout(t)
  }, [open])

  const quickPrompts = useMemo(
    () => [
      'What projects has James built?',
      "Summarize James' AI/ML experience.",
      'What tech stack does James use?',
      'What research has James done?',
    ],
    []
  )

  async function sendMessage(text: string) {
    const trimmed = text.trim()
    if (!trimmed) return

    const userMsg: ChatMsg = {
      id: uid(),
      role: 'user',
      text: trimmed,
      ts: Date.now(),
    }
    setMessages((prev) => [...prev, userMsg])
    setInput('')
    setIsTyping(true)

    try {
      const API_URL = import.meta.env.VITE_CHAT_API_URL as string
      if (!API_URL) throw new Error('Missing VITE_CHAT_API_URL')
      console.log('CHAT API URL:', API_URL)
      const res = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: trimmed,
          history: messages
            .filter((m) => m.role === 'user' || m.role === 'assistant')
            .slice(-10)
            .map((m) => ({ role: m.role, text: m.text })),
        }),
      })

      const data = (await res.json()) as {
        reply?: string
        actions?: KBAction[]
      }

      if (!res.ok) {
        throw new Error(data?.reply || `Request failed: ${res.status}`)
      }

      const botMsg: ChatMsg = {
        id: uid(),
        role: 'assistant',
        text: data.reply || "Sorry — I didn't get a response. Try again.",
        ts: Date.now(),
        actions: data.actions ?? [],
      }

      setMessages((prev) => [...prev, botMsg])
    } catch (err) {
      console.error('❌ Chat API fetch failed:', err)

      const API_URL = import.meta.env.VITE_CHAT_API_URL as string

      const errText =
        err instanceof Error
          ? err.message
          : typeof err === 'string'
          ? err
          : JSON.stringify(err)

      const { chunks, actions } = retrieveKeyword(trimmed, 6)

      const botMsg: ChatMsg = {
        id: uid(),
        role: 'assistant',
        text:
          `❌ I couldn't reach the server.\n` +
          `API_URL: ${API_URL || '(missing)'}\n` +
          `Error: ${errText}\n\n` +
          `Local retrieval matches:\n` +
          chunks.map((c) => `- ${c.title}`).join('\n'),
        ts: Date.now(),
        actions,
      }

      setMessages((prev) => [...prev, botMsg])
    } finally {
      setIsTyping(false)
    }
  }

  function onSubmit(e: React.FormEvent) {
    e.preventDefault()
    void sendMessage(input)
  }

  function clearChat() {
    const initial: ChatMsg[] = [
      {
        id: uid(),
        role: 'assistant',
        text: 'Hi! I\'m James\' portfolio assistant. Ask me about projects, research, experience, skills, or education.',
        ts: Date.now(),
      },
    ]
    setMessages(initial)
    localStorage.setItem('james_chat_messages', JSON.stringify(initial))
  }

  return (
    <>
      {/* Floating Button with pulse rings + notification dot */}
      <div className="fixed bottom-5 right-5 z-[60]">
        {/* Pulse rings — only animate when chat is closed */}
        {!open && (
          <>
            <span
              className="absolute inset-0 rounded-full animate-ping bg-github-accent opacity-20 pointer-events-none"
              style={{ animationDuration: '2.5s' }}
            />
            <span
              className="absolute inset-0 rounded-full animate-ping bg-github-accent opacity-10 pointer-events-none"
              style={{ animationDuration: '2.5s', animationDelay: '0.5s' }}
            />
          </>
        )}

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          className="
            relative inline-flex items-center gap-2
            rounded-full border border-github-accent/40 bg-github-surface
            px-4 py-3 text-sm font-medium text-github-text
            shadow-[0_10px_30px_rgba(0,0,0,0.35),0_0_18px_rgba(88,166,255,0.25)]
            hover:shadow-[0_10px_30px_rgba(0,0,0,0.35),0_0_28px_rgba(88,166,255,0.45)]
            hover:border-github-accent/70
            transition-all duration-300
          "
          aria-label="Chat with James"
        >
          <MessageCircle className="h-5 w-5 text-github-accent" />
          <span className="hidden sm:inline">Chat with James</span>
        </button>

        {/* Notification dot — only show when closed */}
        {!open && (
          <span className="absolute -top-1 -right-1 flex h-3.5 w-3.5 pointer-events-none">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-red-500 border-2 border-github-surface" />
          </span>
        )}
      </div>

      {/* Panel */}
      {open && (
        <div
          className="
            fixed bottom-20 right-5 z-[60]
            w-[92vw] max-w-sm
            overflow-hidden rounded-2xl border border-github-border
            bg-github-surface shadow-[0_20px_60px_rgba(0,0,0,0.45)]
          "
          role="dialog"
          aria-modal="true"
        >
          {/* Header */}
          <div className="flex items-center justify-between border-b border-github-border px-4 py-3">
            <div className="flex items-center gap-2">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl border border-github-border bg-github-bg">
                <Bot className="h-5 w-5 text-github-accent" />
              </div>
              <div className="leading-tight">
                <div className="text-sm font-semibold text-github-text">
                  Chat with James
                </div>
                <div className="text-xs text-github-muted">
                  AI Portfolio assistant
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={clearChat}
                className="rounded-lg border border-github-border bg-github-bg px-2 py-1 text-xs text-github-muted hover:text-github-text transition"
              >
                Clear
              </button>
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="rounded-lg border border-github-border bg-github-bg p-2 text-github-muted hover:text-github-text transition"
                aria-label="Close chat"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          </div>

          {/* Messages */}
          <div
            ref={listRef}
            className="max-h-[380px] overflow-y-auto px-4 py-3 space-y-3"
          >
            {/* Quick prompts */}
            <div className="flex flex-wrap gap-2">
              {quickPrompts.map((p) => (
                <button
                  key={p}
                  type="button"
                  onClick={() => void sendMessage(p)}
                  className="
                    inline-flex items-center gap-1 rounded-full
                    border border-github-border bg-github-bg
                    px-3 py-1 text-xs text-github-muted
                    hover:text-github-text hover:bg-github-surface transition
                  "
                >
                  <Sparkles className="h-3.5 w-3.5 text-github-accent" />
                  {p}
                </button>
              ))}
            </div>

            {messages.map((m) => (
              <div
                key={m.id}
                className={[
                  'flex',
                  m.role === 'user' ? 'justify-end' : 'justify-start',
                ].join(' ')}
              >
                <div
                  className={[
                    'max-w-[85%] rounded-2xl px-3 py-2 text-sm leading-relaxed border',
                    m.role === 'user'
                      ? 'bg-github-bg border-github-border text-github-text'
                      : 'bg-github-surface border-github-border text-github-text',
                  ].join(' ')}
                >
                  <div className="prose prose-invert prose-sm max-w-none">
                    <ReactMarkdown remarkPlugins={[remarkGfm]}>
                      {m.text}
                    </ReactMarkdown>
                  </div>
                  {m.role === 'assistant' &&
                    m.actions &&
                    m.actions.length > 0 && (
                      <div className="mt-2 flex flex-wrap gap-2">
                        {m.actions.map((a, idx) => (
                          <button
                            key={`${m.id}-action-${idx}`}
                            type="button"
                            onClick={() => runAction(a)}
                            className="
                              inline-flex items-center gap-2 rounded-full
                              border border-github-border bg-github-bg
                              px-3 py-1 text-xs text-github-text
                              hover:bg-github-surface transition
                            "
                          >
                            {a.label}
                          </button>
                        ))}
                      </div>
                    )}
                </div>
              </div>
            ))}

            {isTyping && (
              <div className="flex justify-start">
                <div className="max-w-[85%] rounded-2xl px-3 py-2 text-sm border border-github-border bg-github-surface text-github-muted">
                  Typing…
                </div>
              </div>
            )}
          </div>

          {/* Input */}
          <form
            onSubmit={onSubmit}
            className="border-t border-github-border p-3"
          >
            <div className="flex items-center gap-2">
              <input
                ref={inputRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask about projects, research, skills…"
                className="
                  flex-1 rounded-xl border border-github-border bg-github-bg
                  px-3 py-2 text-sm text-github-text placeholder:text-github-muted
                  outline-none focus:ring-2 focus:ring-github-accent/30
                "
              />
              <button
                type="submit"
                disabled={!input.trim() || isTyping}
                className="
                  inline-flex items-center justify-center rounded-xl
                  border border-github-border bg-github-bg
                  px-3 py-2 text-github-text
                  hover:bg-github-surface transition
                  disabled:opacity-50 disabled:cursor-not-allowed
                "
                aria-label="Send"
              >
                <Send className="h-4 w-4" />
              </button>
            </div>

            <p className="mt-2 text-[11px] text-github-muted">
              Answers will be limited to James' public portfolio info.
            </p>
          </form>
        </div>
      )}
    </>
  )
}
