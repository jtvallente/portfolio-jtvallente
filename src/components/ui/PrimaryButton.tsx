import type { ReactNode } from "react"

interface PrimaryButtonProps {
  children: ReactNode
  href?: string
  onClick?: () => void
  type?: "button" | "submit"
  variant?: "primary" | "secondary"
}

export default function PrimaryButton({
  children,
  href,
  onClick,
  type = "button",
  variant = "primary",
}: PrimaryButtonProps) {
  const base =
    "inline-flex items-center justify-center px-4 py-2 rounded-md text-sm font-medium transition"

  const styles =
    variant === "primary"
      ? "bg-github-accent text-white hover:opacity-90"
      : "border border-github-border bg-github-surface hover:bg-github-border"
      

  if (href && !onClick) {
    return (
      <a href={href} className={`${base} ${styles}`}>
        {children}
      </a>
    )
  }

  return (
    <button type={type} onClick={onClick} className={`${base} ${styles}`}>
      {children}
    </button>
  )
}
