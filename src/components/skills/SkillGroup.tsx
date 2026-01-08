export default function SkillGroup({
    title,
    children,
  }: {
    title: string
    children: React.ReactNode
  }) {
    return (
      <div className="border border-github-border rounded-xl bg-github-surface p-5 space-y-4">
        <h3 className="text-sm font-semibold">{title}</h3>
  
        <div className="flex flex-wrap gap-3">
          {children}
        </div>
      </div>
    )
  }
  