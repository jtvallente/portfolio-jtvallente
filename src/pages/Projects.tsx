import { useEffect, useMemo, useRef, useState } from 'react'
import * as THREE from 'three'
// @ts-expect-error Vanta does not have TypeScript definitions
import NET from 'vanta/dist/vanta.net.min.js'

import { projects } from '@/data/projects'
import FeaturedProject from '../components/project/FeaturedProject'
import ProjectCard from '@/components/project/ProjectCard'

export default function Projects() {
  const netRef = useRef<HTMLDivElement | null>(null)
  const [query, setQuery] = useState('')
  const [typeFilters, setTypeFilters] = useState<string[]>([])
  const [statusFilters, setStatusFilters] = useState<string[]>([])
  const [techFilters, setTechFilters] = useState<string[]>([])

  useEffect(() => {
    if (!netRef.current) return

    const effect = NET({
      el: netRef.current,
      THREE,
      mouseControls: true,
      touchControls: true,
      gyroControls: false,

      backgroundColor: 0x0d1117,

      color: 0x9f7aea, // gray for lines (or dots depending on build)
      color2: 0x4b5563, // keep dots purple (or lines depending on build)

      points: 8.0,
      maxDistance: 14.0,
      spacing: 26.0,
    })

    // Force the line color AFTER init (works when init mapping is weird)
    effect.setOptions({
      color: 0x9f7aea,
      color2: 0x4b5563,
    })

    return () => {
      effect?.destroy()
    }
  }, [])

  const featured = projects.find((p) => p.featured)
  const others = projects.filter((p) => !p.featured)

  const typeOptions = useMemo(() => {
    const counts = new Map<string, number>()
    projects.forEach((project) => {
      const key = project.type ?? 'other'
      counts.set(key, (counts.get(key) ?? 0) + 1)
    })
    return Array.from(counts.entries()).sort((a, b) => b[1] - a[1])
  }, [])

  const statusOptions = useMemo(() => {
    const counts = new Map<string, number>()
    projects.forEach((project) => {
      const key = project.status ?? 'unspecified'
      counts.set(key, (counts.get(key) ?? 0) + 1)
    })
    return Array.from(counts.entries()).sort((a, b) => b[1] - a[1])
  }, [])

  const techOptions = useMemo(() => {
    const counts = new Map<string, number>()
    projects.forEach((project) => {
      project.techStack.forEach((tech) => {
        counts.set(tech, (counts.get(tech) ?? 0) + 1)
      })
    })
    return Array.from(counts.entries()).sort((a, b) =>
      a[0].localeCompare(b[0])
    )
  }, [])

  const filteredProjects = useMemo(() => {
    const trimmed = query.trim().toLowerCase()
    return others.filter((project) => {
      const typeKey = project.type ?? 'other'
      const statusKey = project.status ?? 'unspecified'

      if (typeFilters.length && !typeFilters.includes(typeKey)) return false
      if (statusFilters.length && !statusFilters.includes(statusKey)) {
        return false
      }
      if (
        techFilters.length &&
        !project.techStack.some((tech) => techFilters.includes(tech))
      ) {
        return false
      }

      if (!trimmed) return true

      const haystack = [
        project.name,
        project.shortDescription,
        project.problem,
        project.role,
        project.techStack.join(' '),
        project.type ?? '',
        project.status ?? '',
      ]
        .join(' ')
        .toLowerCase()

      return haystack.includes(trimmed)
    })
  }, [others, query, statusFilters, techFilters, typeFilters])

  return (
    <>
      {/* FULL PAGE NET BACKGROUND (SIDES ONLY) */}
      <div className="fixed inset-0 -z-10 pointer-events-none">
        <div
          ref={netRef}
          className="absolute inset-0"
          style={{
            WebkitMaskImage:
              'linear-gradient(to right, rgba(0,0,0,1) 0%, rgba(0,0,0,1) 22%, rgba(0,0,0,0.08) 42%, rgba(0,0,0,0.08) 58%, rgba(0,0,0,1) 78%, rgba(0,0,0,1) 100%)',
            maskImage:
              'linear-gradient(to right, rgba(0,0,0,1) 0%, rgba(0,0,0,1) 22%, rgba(0,0,0,0.08) 42%, rgba(0,0,0,0.08) 58%, rgba(0,0,0,1) 78%, rgba(0,0,0,1) 100%)',
          }}
        />
      </div>

      {/* PAGE CONTENT */}
      <section className="relative z-10 space-y-8">
        <header>
          <h1 className="text-xl font-semibold text-github-accent">Projects</h1>
        </header>

        {featured && <FeaturedProject project={featured} />}

        <section className="space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <h2 className="text-xl font-semibold">Other Projects</h2>
            <span className="text-xs uppercase tracking-[0.2em] text-github-muted">
              {filteredProjects.length} shown
            </span>
          </div>

          <div className="grid gap-8 lg:grid-cols-[260px_1fr]">
            <aside className="space-y-6 rounded-2xl border border-github-border bg-github-surface p-5 lg:sticky lg:top-24 lg:h-fit">
              <div>
                <label className="text-xs uppercase tracking-[0.2em] text-github-muted">
                  Search
                </label>
                <input
                  value={query}
                  onChange={(event) => setQuery(event.target.value)}
                  placeholder="Search projects"
                  className="mt-2 w-full rounded-md border border-github-border bg-github-bg px-3 py-2 text-sm text-github-text outline-none focus:border-github-accent"
                />
              </div>

              <div>
                <div className="flex items-center justify-between">
                  <p className="text-xs uppercase tracking-[0.2em] text-github-muted">
                    Type
                  </p>
                  {typeFilters.length > 0 && (
                    <button
                      type="button"
                      className="text-xs text-github-accent hover:underline"
                      onClick={() => setTypeFilters([])}
                    >
                      Clear
                    </button>
                  )}
                </div>
                <div className="mt-3 flex flex-wrap gap-2">
                  {typeOptions.map(([type, count]) => {
                    const active = typeFilters.includes(type)
                    return (
                      <button
                        key={type}
                        type="button"
                        onClick={() =>
                          setTypeFilters((prev) =>
                            active
                              ? prev.filter((item) => item !== type)
                              : [...prev, type]
                          )
                        }
                        className={`rounded-full border px-2.5 py-1 text-xs transition ${
                          active
                            ? 'border-github-accent bg-github-accent/10 text-github-accent'
                            : 'border-github-border text-github-muted hover:text-github-text'
                        }`}
                      >
                        {type} ({count})
                      </button>
                    )
                  })}
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between">
                  <p className="text-xs uppercase tracking-[0.2em] text-github-muted">
                    Status
                  </p>
                  {statusFilters.length > 0 && (
                    <button
                      type="button"
                      className="text-xs text-github-accent hover:underline"
                      onClick={() => setStatusFilters([])}
                    >
                      Clear
                    </button>
                  )}
                </div>
                <div className="mt-3 flex flex-wrap gap-2">
                  {statusOptions.map(([status, count]) => {
                    const active = statusFilters.includes(status)
                    return (
                      <button
                        key={status}
                        type="button"
                        onClick={() =>
                          setStatusFilters((prev) =>
                            active
                              ? prev.filter((item) => item !== status)
                              : [...prev, status]
                          )
                        }
                        className={`rounded-full border px-2.5 py-1 text-xs transition ${
                          active
                            ? 'border-github-accent bg-github-accent/10 text-github-accent'
                            : 'border-github-border text-github-muted hover:text-github-text'
                        }`}
                      >
                        {status} ({count})
                      </button>
                    )
                  })}
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between">
                  <p className="text-xs uppercase tracking-[0.2em] text-github-muted">
                    Tech
                  </p>
                  {techFilters.length > 0 && (
                    <button
                      type="button"
                      className="text-xs text-github-accent hover:underline"
                      onClick={() => setTechFilters([])}
                    >
                      Clear
                    </button>
                  )}
                </div>
                <div className="mt-3 max-h-56 overflow-auto pr-1">
                  <div className="flex flex-wrap gap-2">
                    {techOptions.map(([tech, count]) => {
                      const active = techFilters.includes(tech)
                      return (
                        <button
                          key={tech}
                          type="button"
                          onClick={() =>
                            setTechFilters((prev) =>
                              active
                                ? prev.filter((item) => item !== tech)
                                : [...prev, tech]
                            )
                          }
                          className={`rounded-full border px-2.5 py-1 text-xs transition ${
                            active
                              ? 'border-github-accent bg-github-accent/10 text-github-accent'
                              : 'border-github-border text-github-muted hover:text-github-text'
                          }`}
                        >
                          {tech} ({count})
                        </button>
                      )
                    })}
                  </div>
                </div>
              </div>
            </aside>

            <div className="space-y-6">
              <div className="grid gap-6 md:grid-cols-2">
                {filteredProjects.map((project) => (
                  <ProjectCard key={project.name} project={project} />
                ))}
              </div>

              {filteredProjects.length === 0 && (
                <div className="rounded-xl border border-github-border bg-github-surface p-6 text-sm text-github-muted">
                  No projects match these filters. Try clearing some filters.
                </div>
              )}
            </div>
          </div>
        </section>
      </section>
    </>
  )
}
