import { Link } from "react-router-dom"
import logo from "@/assets/kurator-logo.png"

export default function Navbar() {
  return (
    <header className="border-b border-github-border bg-github-bg">
      <div className="max-w-5xl mx-auto px-6 py-4 flex justify-between items-center">
        
        {/* Logo + Brand */}
        <Link to="//" className="flex items-center gap-2 hover:opacity-90">
          <img
            src={logo}
            alt="Kurator logo"
            className="h-7 w-7 object-contain"
          />
          <span className="font-semibold text-github-text">
            kurator.dev
          </span>
        </Link>

        {/* Nav */}
        <nav className="space-x-6 text-sm text-github-muted">
          <Link to="//" className="hover:text-github-text">
            Home
          </Link>
          <Link to="/projects" className="hover:text-github-text">
            Projects
          </Link>
        </nav>
      </div>
    </header>
  )
}

