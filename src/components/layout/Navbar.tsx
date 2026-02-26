import { useState } from "react"
import { Link } from "react-router-dom"
import logo from "@/assets/kurator-logo.png"
import PrimaryButton from "@/components/ui/PrimaryButton"

export default function Navbar() {
  const [contactOpen, setContactOpen] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [contactName, setContactName] = useState("")
  const [contactCompany, setContactCompany] = useState("")
  const [contactEmail, setContactEmail] = useState("")
  const [contactSubject, setContactSubject] = useState("")
  const [contactMessage, setContactMessage] = useState("")
  const [contactStatus, setContactStatus] = useState<
    "idle" | "submitting" | "success" | "error"
  >("idle")

  return (
    <>
      <header className="sticky top-0 z-40 border-b border-github-border bg-github-bg/95 backdrop-blur">
        <div className="max-w-5xl mx-auto px-6 py-4 flex justify-between items-center gap-4">
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
        <div className="flex items-center gap-4">
          <nav className="hidden sm:flex space-x-6 text-sm text-github-muted">
            <Link to="//" className="hover:text-github-text">
              Home
            </Link>
            <Link to="/projects" className="hover:text-github-text">
              Projects
            </Link>
          </nav>
          <PrimaryButton
            onClick={() => setContactOpen(true)}
            className="bg-github-accent text-white shadow-[0_0_20px_rgba(159,122,234,0.45)] hover:shadow-[0_0_28px_rgba(159,122,234,0.6)]"
          >
            Contact
          </PrimaryButton>
          <button
            type="button"
            onClick={() => setMobileOpen((prev) => !prev)}
            className="sm:hidden rounded-md border border-github-border bg-github-surface px-2.5 py-2 text-xs text-github-muted hover:text-github-text"
            aria-label="Toggle navigation menu"
            aria-expanded={mobileOpen}
            aria-controls="mobile-nav"
          >
            {mobileOpen ? (
              <svg
                viewBox="0 0 24 24"
                className="h-4 w-4"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <path d="M6 6l12 12M18 6l-12 12" />
              </svg>
            ) : (
              <svg
                viewBox="0 0 24 24"
                className="h-4 w-4"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <path d="M3 6h18M3 12h18M3 18h18" />
              </svg>
            )}
          </button>
        </div>
      </div>
        {mobileOpen && (
          <div id="mobile-nav" className="sm:hidden border-t border-github-border bg-github-bg/95">
            <nav className="max-w-5xl mx-auto px-6 py-4 flex flex-col gap-3 text-sm text-github-muted">
              <Link
                to="//"
                className="hover:text-github-text"
                onClick={() => setMobileOpen(false)}
              >
                Home
              </Link>
              <Link
                to="/projects"
                className="hover:text-github-text"
                onClick={() => setMobileOpen(false)}
              >
                Projects
              </Link>
            </nav>
          </div>
        )}
    </header>

      {contactOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 px-4"
          role="dialog"
          aria-modal="true"
          aria-label="Contact form"
        >
          <div className="w-full max-w-xl rounded-2xl border border-github-border bg-github-surface p-6 shadow-2xl">
            <div className="flex items-start justify-between gap-4">
              <div className="space-y-1">
                <h3 className="text-lg font-semibold text-github-text">
                  Get in touch with me
                </h3>
                <p className="text-sm text-github-muted">
                  Got exciting news, a role to discuss, or a project idea? Send
                  a message and I will get back to you by email.
                </p>
              </div>
              <button
                type="button"
                onClick={() => setContactOpen(false)}
                className="rounded-md border border-github-border px-3 py-1 text-sm text-github-muted hover:text-github-text"
                aria-label="Close"
              >
                Close
              </button>
            </div>

            <form
              className="mt-5 space-y-4"
              onSubmit={async (event) => {
                event.preventDefault()
                if (contactStatus === "submitting") return

                try {
                  setContactStatus("submitting")

                  const res = await fetch("https://formspree.io/f/xnjblrww", {
                    method: "POST",
                    headers: {
                      "Content-Type": "application/json",
                      Accept: "application/json",
                    },
                    body: JSON.stringify({
                      name: contactName,
                      company: contactCompany,
                      email: contactEmail,
                      subject: contactSubject,
                      message: contactMessage,
                      source: "portfolio-contact",
                    }),
                  })

                  if (!res.ok) {
                    throw new Error("Request failed")
                  }

                  setContactStatus("success")
                  setContactName("")
                  setContactCompany("")
                  setContactEmail("")
                  setContactSubject("")
                  setContactMessage("")
                } catch {
                  setContactStatus("error")
                }
              }}
            >
              <div className="grid gap-4 sm:grid-cols-2">
                <label className="block space-y-2 text-sm">
                  <span className="text-github-muted">Name</span>
                  <input
                    type="text"
                    required
                    value={contactName}
                    onChange={(event) => setContactName(event.target.value)}
                    className="w-full rounded-md border border-github-border bg-github-surface px-3 py-2 text-github-text outline-none focus:border-github-accent"
                    placeholder="Jane Doe"
                  />
                </label>

                <label className="block space-y-2 text-sm">
                  <span className="text-github-muted">Company</span>
                  <input
                    type="text"
                    value={contactCompany}
                    onChange={(event) => setContactCompany(event.target.value)}
                    className="w-full rounded-md border border-github-border bg-github-surface px-3 py-2 text-github-text outline-none focus:border-github-accent"
                    placeholder="Acme Inc."
                  />
                </label>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <label className="block space-y-2 text-sm">
                  <span className="text-github-muted">Email</span>
                  <input
                    type="email"
                    required
                    value={contactEmail}
                    onChange={(event) => setContactEmail(event.target.value)}
                    className="w-full rounded-md border border-github-border bg-github-surface px-3 py-2 text-github-text outline-none focus:border-github-accent"
                    placeholder="you@company.com"
                  />
                </label>

                <label className="block space-y-2 text-sm">
                  <span className="text-github-muted">Subject</span>
                  <input
                    type="text"
                    required
                    value={contactSubject}
                    onChange={(event) => setContactSubject(event.target.value)}
                    className="w-full rounded-md border border-github-border bg-github-surface px-3 py-2 text-github-text outline-none focus:border-github-accent"
                    placeholder="Role or inquiry"
                  />
                </label>
              </div>

              <label className="block space-y-2 text-sm">
                <span className="text-github-muted">Message</span>
                <textarea
                  rows={4}
                  required
                  value={contactMessage}
                  onChange={(event) => setContactMessage(event.target.value)}
                  className="w-full rounded-md border border-github-border bg-github-surface px-3 py-2 text-github-text outline-none focus:border-github-accent"
                  placeholder="Tell me about the role, project, or collaboration."
                />
              </label>

              {contactStatus === "success" && (
                <p className="text-sm text-emerald-400">
                  Message sent. I will reply by email soon.
                </p>
              )}

              {contactStatus === "error" && (
                <p className="text-sm text-red-400">
                  Something went wrong. Please try again.
                </p>
              )}

              <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                <span className="text-xs text-github-muted">
                  I usually reply within 1-2 days.
                </span>
                <PrimaryButton type="submit">
                  {contactStatus === "submitting" ? "Sending..." : "Send Message"}
                </PrimaryButton>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  )
}
