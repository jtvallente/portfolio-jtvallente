import type { ReactNode } from "react"

interface SkillGroupProps {
  title: string
  children: ReactNode
}

export default function SkillGroup({ title, children }: SkillGroupProps) {
  return (
    <div className="space-y-3">
      <h3 className="font-semibold">{title}</h3>
      <div className="flex flex-wrap gap-2">{children}</div>
    </div>
  )
}
