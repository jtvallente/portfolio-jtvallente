import { Github, Linkedin, Mail, Facebook } from "lucide-react"
import { Link } from "react-router-dom"
import logo from "@/assets/kurator-logo.png"

export default function Footer() {
  return (
    <footer className="border-t border-github-border bg-[#000000]/0">
      <div className="max-w-5xl mx-auto px-6 py-6 text-sm text-github-muted flex flex-col sm:flex-row items-center justify-between gap-4">
        
        {/* Logo + Brand */}
        <Link to="//" className="flex items-center gap-2 hover:opacity-90">
          <img
            src={logo}
            alt="Kurator logo"
            className="h-7 w-7 object-contain"
          />
          <span className="font-semibold text-github-muted">
          © 2026 kurator.dev
          </span>
        </Link>

        <div className="flex items-center gap-4">
          {/* GitHub */}
          <a
            href="https://github.com/jtvallente"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
            className="hover:text-github-text transition"
          >
            <Github className="h-5 w-5" />
          </a>

          {/* LinkedIn */}
          <a
            href="https://www.linkedin.com/in/jtvallente/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
            className="hover:text-github-text transition"
          >
            <Linkedin className="h-5 w-5" />
          </a>

          {/* Email */}
          <a
            href="mailto:jameslourencevallente@gmail.com"
            aria-label="Email"
            className="hover:text-github-text transition"
          >
            <Mail className="h-5 w-5" />
          </a>

          {/* Facebook */}
          <a
            href="https://www.facebook.com/jjamboyy/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Facebook"
            className="hover:text-github-text transition"
          >
            <Facebook className="h-5 w-5" />
          </a>
        </div>
      </div>
    </footer>
  )
}
