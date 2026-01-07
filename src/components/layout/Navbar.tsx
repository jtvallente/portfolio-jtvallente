export default function Navbar() {
    return (
      <header className="border-b border-github-border bg-github-bg">
        <div className="max-w-5xl mx-auto px-6 py-4 flex justify-between">
          <span className="font-semibold">Your Name</span>
          <nav className="space-x-6 text-sm text-github-muted">
            <a className="hover:text-github-text" href="#">Home</a>
            <a className="hover:text-github-text" href="#">Projects</a>
            <a className="hover:text-github-text" href="#">About</a>
          </nav>
        </div>
      </header>
    )
  }
  