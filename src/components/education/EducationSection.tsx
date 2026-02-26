import { useMemo, useState } from "react"
import { education } from "@/data/education"
import EducationItem from "./EducationItem"

export default function EducationSection() {
  const [index, setIndex] = useState(0)
  const total = education.length
  const canNavigate = total > 1
  const safeIndex = useMemo(() => {
    if (total === 0) return 0
    return Math.min(Math.max(index, 0), total - 1)
  }, [index, total])

  const goTo = (nextIndex: number) => {
    if (!canNavigate) return
    const normalized = (nextIndex + total) % total
    setIndex(normalized)
  }

  return (
    <section id="education" className="relative">
      <div className="flex items-center justify-between gap-4">
        <h2 className="text-xl font-semibold text-github-accent">Education</h2>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => goTo(safeIndex - 1)}
            disabled={!canNavigate}
            className="rounded-full border border-github-border bg-github-surface px-3 py-1 text-xs font-semibold text-github-muted transition hover:text-github-text disabled:opacity-50"
          >
            Prev
          </button>
          <button
            type="button"
            onClick={() => goTo(safeIndex + 1)}
            disabled={!canNavigate}
            className="rounded-full border border-github-border bg-github-surface px-3 py-1 text-xs font-semibold text-github-muted transition hover:text-github-text disabled:opacity-50"
          >
            Next
          </button>
        </div>
      </div>

      <div className="mt-8 overflow-hidden">
        <div
          className="flex transition-transform duration-500 ease-out"
          style={
            {
              transform: `translateX(-${safeIndex * 100}%)`,
            } as React.CSSProperties
          }
        >
          {education.map((edu) => (
            <div
              key={edu.school}
              className="w-full shrink-0 px-1 sm:px-2"
            >
              <EducationItem edu={edu} />
            </div>
          ))}
        </div>
      </div>

      <div className="mt-6 flex items-center justify-center gap-2">
        {education.map((edu, dotIndex) => (
          <button
            key={`${edu.school}-dot`}
            type="button"
            onClick={() => goTo(dotIndex)}
            aria-label={`Go to ${edu.school}`}
            className={`h-2.5 w-2.5 rounded-full border border-github-border transition ${
              dotIndex === safeIndex
                ? "bg-github-accent"
                : "bg-github-surface hover:bg-github-border"
            }`}
          />
        ))}
      </div>
    </section>
  )
}
