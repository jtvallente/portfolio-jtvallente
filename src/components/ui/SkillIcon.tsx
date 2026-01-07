import type { IconType } from "react-icons"

interface SkillIconProps {
  icon: IconType
  label: string
}

export default function SkillIcon({ icon: Icon, label }: SkillIconProps) {
  return (
    <div className="flex items-center gap-2 px-3 py-2 rounded-md
                    bg-github-surface border border-github-border text-sm">
      <Icon className="text-github-accent" size={18} />
      <span>{label}</span>
    </div>
  )
}
