import type { Education } from "@/data/education"

export default function EducationItem({ edu }: { edu: Education }) {
  return (
    <li className="relative pb-10 ps-10">
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

      {/* Year pill */}
      <time className="inline-flex items-center rounded-md border border-github-border bg-github-surface px-2 py-0.5 text-xs font-medium text-github-text">
        {edu.year}
      </time>

      {/* Content card */}
      <div className="mt-4 rounded-xl border border-github-border bg-github-surface p-5">
        <h3 className="text-lg font-semibold text-github-text">
          {edu.school}
        </h3>

        {edu.degree ? (
          <p className="mt-1 text-sm text-github-muted">
            {edu.degree} · {edu.location}
          </p>
        ) : (
          <p className="mt-1 text-sm text-github-muted">{edu.location}</p>
        )}

        {/* Honors */}
        {edu.honors?.length ? (
          <div className="mt-3 flex flex-wrap gap-2">
            {edu.honors.map((honor) => (
              <span
                key={honor}
                className="
                  text-sm px-2 py-0.5 rounded-full
                  bg-purple-500/10 text-purple-300
                  border border-purple-500/20
                "
              >
                {honor}
              </span>
            ))}
          </div>
        ) : null}
      </div>
    </li>
  )
}
