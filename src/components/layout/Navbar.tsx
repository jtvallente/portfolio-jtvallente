import { Link } from "react-router-dom"

export default function Navbar() {
  return (
    <header className="border-b border-github-border bg-github-bg">
      <div className="max-w-5xl mx-auto px-6 py-4 flex justify-between">
        <span className="font-semibold">James Lourence Vallente</span>
        <nav className="space-x-6 text-sm text-github-muted">
          <Link to="/" className="hover:text-github-text">Home</Link>
          <Link to="/projects" className="hover:text-github-text">Projects</Link>
        </nav>
      </div>
    </header>
  )
}
