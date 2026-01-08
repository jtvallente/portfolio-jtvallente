import type { Experience } from "@/data/experience"

export default function ExperienceItem({ exp }: { exp: Experience }) {
  return (
    <div className="grid grid-cols-[120px_40px_1fr] gap-6 relative">
      
      {/* DATE */}
      <div className="text-right">
        <p className="text-sm font-semibold text-github-text">
          {exp.start}
        </p>
        <p className="text-xs text-github-muted mt-1">
          {exp.end}
        </p>
      </div>

      {/* DOT */}
      <div className="flex justify-center">
        <span className="mt-1 h-4 w-4 rounded-full bg-github-bg border-2 border-github-accent" />
      </div>

      {/* CONTENT */}
      <div className="max-w-2xl">
        {/* Header */}
        <div className="flex justify-between items-start gap-6">
          <div>
            <h3 className="text-lg font-semibold">
              {exp.role}
            </h3>
            <p className="text-sm text-github-muted">
              {exp.company} · {exp.location}
              {exp.type ? ` · ${exp.type}` : ""}
            </p>
          </div>

          {/* Logo */}
          {exp.logo && (
            <div className="bg-white rounded-lg p-2 border border-github-border shadow-sm">
              <img
                src={exp.logo}
                alt={`${exp.company} logo`}
                className="h-12 w-auto object-contain"
              />
            </div>
          )}
        </div>

        {/* Bullets */}
        <ul className="mt-4 space-y-2 text-sm text-github-muted">
          {exp.bullets.map((bullet, index) => (
            <li key={index} className="flex gap-3">
              <span className="mt-2 h-2 w-2 rounded-full bg-github-muted" />
              <span>{bullet}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
