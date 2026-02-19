import type { Experience } from "@/data/experience"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faLink } from "@fortawesome/free-solid-svg-icons"

export default function ExperienceItem({ exp }: { exp: Experience }) {
  return (
    <li className="relative pb-12 ps-10">
      {/* Marker centered on the timeline line */}
      <span
        className="
          absolute start-0 top-1 flex h-6 w-6 items-center justify-center
          -translate-x-1/2
          rounded-full border border-github-accent bg-github-bg
          ring-8 ring-github-bg
        "
      >
        <span className="h-2.5 w-2.5 rounded-full bg-github-accent" />
      </span>

      {/* Date + type pill row */}
      <div className="flex flex-wrap items-center gap-2">
        <time className="inline-flex items-center rounded-md border border-github-border bg-github-surface px-2 py-0.5 text-xs font-medium text-github-text">
          {exp.start} — {exp.end}
        </time>

        {exp.type ? (
          <span className="inline-flex items-center rounded-md border border-github-border bg-github-surface px-2 py-0.5 text-xs font-medium text-github-muted">
            {exp.type}
          </span>
        ) : null}
      </div>

      {/* Content card */}
      <div className="mt-4 rounded-xl border border-github-border bg-github-surface p-5">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <div className="min-w-0">
            <h3 className="text-lg font-semibold text-github-text">{exp.role}</h3>
            <p className="mt-1 text-sm text-github-muted">
              {exp.company} · {exp.location}
            </p>
          </div>

          {exp.logo ? (
            <div className="shrink-0 self-start rounded-lg border border-github-border bg-white p-2 shadow-sm">
              <img
                src={exp.logo}
                alt={`${exp.company} logo`}
                className="h-10 w-auto object-contain"
              />
            </div>
          ) : null}
        </div>

        <ul className="mt-4 space-y-2 text-sm text-github-muted">
          {exp.bullets.map((bullet, idx) => (
            <li key={idx} className="flex gap-3">
              <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-github-muted" />
              <span className="leading-relaxed">{bullet}</span>
            </li>
          ))}
        </ul>

        {exp.liveWebsite ? (
          <div className="mt-4 flex items-center gap-2 text-sm">
            <FontAwesomeIcon icon={faLink} className="text-github-muted" />
            <a
              href={exp.liveWebsite}
              target="_blank"
              rel="noopener noreferrer"
              className="text-github-accent hover:underline"
            >
              Live Website
            </a>
          </div>
        ) : null}
      </div>
    </li>
  )
}
