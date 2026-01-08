import type { IconType } from "react-icons"

type Proficiency = "Beginner" | "Intermediate" | "Advanced"

export default function SkillIcon({
  icon: Icon,
  label,
  level = "Intermediate",
}: {
  icon: IconType
  label: string
  level?: Proficiency
}) {
  return (
    <div
      className="group flex items-center gap-2 px-3 py-2 text-xs rounded-md border border-github-border bg-github-bg hover:bg-github-canvas transition"
      title={`${label} — ${level}`}
    >
      <Icon className="h-4 w-4 text-github-accent" />

      <span className="whitespace-nowrap">{label}</span>

      {/* Proficiency indicator */}
      <span
        className={`ml-1 h-2 w-2 rounded-full ${
          level === "Advanced"
            ? "bg-green-500"
            : level === "Intermediate"
            ? "bg-yellow-500"
            : "bg-gray-400"
        }`}
      />
    </div>
  )
}
