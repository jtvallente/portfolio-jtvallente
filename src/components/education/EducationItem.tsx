import type { Education } from "@/data/education"

export default function EducationItem({ edu }: { edu: Education }) {
  const baseUrl = import.meta.env.BASE_URL ?? "/"
  const logoSrc = edu.logo
    ? `${baseUrl.endsWith("/") ? baseUrl : `${baseUrl}/`}${edu.logo.replace(
        /^\//,
        ""
      )}`
    : undefined
  const initials = edu.school
    .split(" ")
    .filter(Boolean)
    .map((word) => word[0])
    .slice(0, 3)
    .join("")

  return (
    <article className="mx-auto flex h-full w-full max-w-5xl flex-col gap-4 rounded-2xl border border-github-border bg-github-surface p-5 shadow-[0_8px_30px_rgba(0,0,0,0.25)] sm:flex-row sm:items-stretch sm:gap-6">
      <div className="flex items-center gap-4 sm:flex-none">
        <div className="h-20 w-auto overflow-hidden rounded-xl border border-github-border bg-white px-4 py-2 sm:h-full sm:w-28 sm:py-4">
          {logoSrc ? (
            <img
              src={logoSrc}
              alt={`${edu.school} logo`}
              className="h-full w-full object-contain"
              loading="lazy"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center text-xs font-semibold text-github-muted">
              {initials}
            </div>
          )}
        </div>
        <div>
          <time className="inline-flex items-center rounded-full border border-github-border bg-github-bg px-2.5 py-1 text-xs font-semibold text-github-text">
            {edu.year}
          </time>
          <h3 className="mt-2 text-base font-semibold text-github-text">
            {edu.school}
          </h3>
          <p className="text-xs text-github-muted">{edu.location}</p>
        </div>
      </div>

      <div className="flex flex-1 flex-col justify-center gap-3 sm:items-end sm:text-right">
        {edu.degree ? (
          <div className="text-sm text-github-muted">
            <span className="text-xs uppercase tracking-[0.18em] text-github-muted/80">
              Course / Track
            </span>
            <p className="mt-1 text-sm text-github-text">{edu.degree}</p>
          </div>
        ) : null}

        {edu.honors?.length ? (
          <div className="flex flex-wrap gap-2 sm:justify-end">
            {edu.honors.map((honor) => (
              <span
                key={honor}
                className="rounded-full border border-github-accent/30 bg-github-accent/10 px-2.5 py-1 text-xs text-github-accent"
              >
                {honor}
              </span>
            ))}
          </div>
        ) : null}
      </div>
    </article>
  )
}
