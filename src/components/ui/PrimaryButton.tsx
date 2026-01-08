import type { ReactNode } from "react"

interface PrimaryButtonProps {
  children: ReactNode
  href: string
  variant?: "primary" | "secondary"
  
}

export default function PrimaryButton({
  children,
  href,
  variant = "primary",
}: PrimaryButtonProps) {
  const base =
    "inline-flex items-center justify-center px-4 py-2 rounded-md text-sm font-medium transition"

  const styles =
    variant === "primary"
      ? "bg-github-accent text-white hover:opacity-90"
      : "border border-github-border bg-github-surface hover:bg-github-border"
      

  return (
    <a href={href} className={`${base} ${styles}`}>
      {children}
    </a>
  )
}
