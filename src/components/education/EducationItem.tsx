import type { Education } from "@/data/education"

export default function EducationItem({ edu }: { edu: Education }) {
  return (
    <div className="grid grid-cols-[120px_40px_1fr] gap-6 relative">
      {/* Date (far left) */}
      <div className="text-right text-white">
        {edu.year}
      </div>

      {/* DOT */}
      <div className="flex justify-center">
        <span className="mt-1 h-4 w-4 rounded-full bg-github-bg border-2 border-github-accent" />
      </div>

      {/* Content */}
      <div className="max-w-2xl">
        <h3 className="text-lg font-semibold">
          {edu.school}
        </h3>

        {edu.degree ? (
          <p className="text-sm text-github-muted">
            {edu.degree} · {edu.location}
          </p>
        ) : (
          <p className="text-sm text-github-muted">
            {edu.location}
          </p>
        )}

        <div className="flex flex-wrap gap-2 pt-1">
          {edu.honors.map((honor) => (
            <span
              key={honor}
              className="text-sm px-2 py-0.5 rounded-full
                         bg-purple-500/10 text-purple-300
                         border border-purple-500/20"
            >
              {honor}
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}
