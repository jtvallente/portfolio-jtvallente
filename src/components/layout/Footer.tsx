export default function Footer() {
    return (
      <footer className="border-t border-github-border bg-github-bg">
        <div className="max-w-5xl mx-auto px-6 py-6 text-sm text-github-muted flex flex-col sm:flex-row justify-between gap-2">
          <span>
            © {new Date().getFullYear()} James Vallente
          </span>
  
          <div className="flex gap-4">
            <a
              href="https://github.com/your-username"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-github-text"
            >
              GitHub
            </a>
            <a
              href="https://linkedin.com/in/your-username"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-github-text"
            >
              LinkedIn
            </a>
          </div>
        </div>
      </footer>
    )
  }
  