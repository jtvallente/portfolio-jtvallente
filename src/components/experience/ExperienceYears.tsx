import { useEffect, useMemo, useRef, useState } from "react"
import { BrainCircuit, Database, Globe, Wrench } from "lucide-react"

type Tile = {
  value: number
  suffix?: string
  label: string
  Icon: React.ComponentType<{ className?: string }>
}

function useCountUpOnView(targetValue: number, startOnView: boolean, durationMs = 900) {
  const [value, setValue] = useState(0)

  useEffect(() => {
    if (!startOnView) return

    let raf = 0
    const start = performance.now()
    const from = 0
    const to = targetValue

    const tick = (now: number) => {
      const elapsed = now - start
      const t = Math.min(1, elapsed / durationMs)

      // easeOutCubic
      const eased = 1 - Math.pow(1 - t, 3)
      const next = Math.round(from + (to - from) * eased)

      setValue(next)

      if (t < 1) raf = requestAnimationFrame(tick)
    }

    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [startOnView, targetValue, durationMs])

  return value
}

export default function ExperienceYears() {
  const sectionRef = useRef<HTMLDivElement | null>(null)
  const [inView, setInView] = useState(false)
  const [hasAnimated, setHasAnimated] = useState(false)

  // Your 4 tiles (formalized labels)
  const tiles: Tile[] = useMemo(
    () => [
      { value: 5, suffix: "+", label: "Web Development", Icon: Globe },
      { value: 2, suffix: "+", label: "AI/ML & Intelligent Automation", Icon: BrainCircuit },
      { value: 2, suffix: "+", label: "Data Systems & Database Engineering", Icon: Database },
      { value: 2, suffix: "+", label: "Software Engineering & System Design", Icon: Wrench },
    ],
    []
  )

  useEffect(() => {
    const el = sectionRef.current
    if (!el) return

    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true)
          setHasAnimated(true) // animate only once
          obs.disconnect()
        }
      },
      { threshold: 0.25 }
    )

    obs.observe(el)
    return () => obs.disconnect()
  }, [])

  return (
    <div ref={sectionRef} className="max-w-5xl">
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {tiles.map((t) => (
          <ExperienceTile
            key={t.label}
            tile={t}
            animate={inView || hasAnimated}
          />
        ))}
      </div>
    </div>
  )
}

function ExperienceTile({ tile, animate }: { tile: Tile; animate: boolean }) {
  const n = useCountUpOnView(tile.value, animate, 900)

  return (
    <div className="relative overflow-hidden rounded-xl border border-github-border bg-github-surface p-4">
      {/* Subtle top glow */}
      <div className="pointer-events-none absolute -top-10 -right-10 h-24 w-24 rounded-full bg-github-accent/15 blur-2xl" />

      <div className="flex items-start gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-lg border border-github-border bg-github-bg">
          <tile.Icon className="h-5 w-5 text-github-accent" />
        </div>

        <div className="min-w-0">
          <div className="flex items-baseline gap-1">
            <span className="text-2xl font-bold tracking-tight text-github-text">
              {n}
            </span>
            {tile.suffix && (
              <span className="text-lg font-semibold text-github-accent">
                {tile.suffix}
              </span>
            )}
          </div>

          <div className="mt-1 text-sm text-github-muted leading-snug">
            {tile.label}
          </div>
        </div>
      </div>
    </div>
  )
}
