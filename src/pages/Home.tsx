import { useEffect, useRef, useState } from 'react'
import * as THREE from 'three'
// @ts-expect-error: The "vanta.net.min.js" module does not have TypeScript definitions
import NET from 'vanta/dist/vanta.net.min.js'

import profileImg from '@/assets/images/profile.jpg'

import PrimaryButton from '@/components/ui/PrimaryButton'
import ExperienceSection from '@/components/experience/ExperienceSection'
import { Github, Linkedin, Mail, Facebook } from 'lucide-react'
import SkillsSection from '@/components/skills/SkillsSection'
import ProjectsCTA from '@/components/cta/ProjectsCTA'
import EducationSection from '@/components/education/EducationSection'
import ExperienceYears from '@/components/experience/ExperienceYears'

import { Link } from 'react-router-dom'

export default function Home() {
  const netRef = useRef<HTMLDivElement | null>(null)
  const [resumeOpen, setResumeOpen] = useState(false)
  const [requestEmail, setRequestEmail] = useState('')
  const [requestReason, setRequestReason] = useState('')
  const [requestStatus, setRequestStatus] = useState<
    'idle' | 'submitting' | 'success' | 'error'
  >('idle')

  useEffect(() => {
    if (!netRef.current) return

    const effect = NET({
      el: netRef.current,
      THREE,
      mouseControls: true,
      touchControls: true,
      gyroControls: false,

      backgroundColor: 0x0d1117,

      color: 0x9f7aea, // gray for lines (or dots depending on build)
      color2: 0x4b5563, // keep dots purple (or lines depending on build)

      points: 8.0,
      maxDistance: 14.0,
      spacing: 26.0,
    })

    // Force the line color AFTER init (works when init mapping is weird)
    effect.setOptions({
      color: 0x9f7aea,
      color2: 0x4b5563,
    })

    return () => {
      effect?.destroy()
    }
  }, [])

  return (
    <>
      {/* FULL PAGE NET BACKGROUND */}
      <div className="fixed inset-0 -z-10 pointer-events-none">
        <div
          ref={netRef}
          className="absolute inset-0"
          style={{
            // Shows on left + right; fades out towards center
            WebkitMaskImage:
              'linear-gradient(to right, rgba(0,0,0,1) 0%, rgba(0,0,0,1) 22%, rgba(0,0,0,0.08) 42%, rgba(0,0,0,0.08) 58%, rgba(0,0,0,1) 78%, rgba(0,0,0,1) 100%)',
            maskImage:
              'linear-gradient(to right, rgba(0,0,0,1) 0%, rgba(0,0,0,1) 22%, rgba(0,0,0,0.08) 42%, rgba(0,0,0,0.08) 58%, rgba(0,0,0,1) 78%, rgba(0,0,0,1) 100%)',
          }}
        />
      </div>

      {/* Your page content (unchanged) */}
      <section className="space-y-10">
        {/* ================= HERO ================= */}
        <section className="relative overflow-hidden rounded-2xl  bg-github-surface p-8 md:p-12 shadow-[0_0_25px_rgba(168,85,247,0.35)]">
          {/* Glow / Accent */}
          <div className="pointer-events-none absolute -top-34 -right-40 h-72 w-72 rounded-full bg-gradient-to-br from-indigo-500/40 to-purple-500/40 blur-3xl" />
          <div className="pointer-events-none absolute -top-24 -right-10 h-72 w-72 rounded-full bg-gradient-to-br from-indigo-500/40 to-purple-500/40 blur-3xl" />

          <div className="relative grid grid-cols-1 md:grid-cols-[1fr_220px] gap-10">
            {/* Text */}
            <div className="space-y-6">
              <span className="inline-block text-xs uppercase tracking-wide text-github-muted">
                Software Engineer · AI, NLP & Data Systems
              </span>

              <h1 className="text-3xl md:text-4xl font-bold leading-tight">
                Hi, I'm{' '}
                <span className="bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
                  James Lourence Vallente
                </span>{' '}
              </h1>

              <p className="text-github-muted max-w-2xl text-base md:text-lg">
                I build reliable,{' '}
                <span className="text-github-text font-medium">
                  data-driven web systems and AI applications
                </span>
                , from data collection and modeling to production-ready
                deployment.
              </p>

              {/* Actions */}
              <div className="flex flex-wrap gap-4">
                <Link to="/projects">
                  <PrimaryButton href="/projects">View Projects</PrimaryButton>
                </Link>

                <PrimaryButton
                  variant="secondary"
                  onClick={() => setResumeOpen(true)}
                >
                  Download Resume
                </PrimaryButton>
              </div>
            </div>

            {/* Profile Image */}
            <div className="relative">
              <div className="absolute inset-0 rounded-full bg-github-accent/20 blur-2xl" />
              <img
                src={profileImg}
                alt="James Vallente"
                className="
      relative w-40 h-40 rounded-full object-cover
      border border-github-border
    "
              />
            </div>
          </div>
        </section>

        <ExperienceYears />

        {/* ================= ABOUT ================= */}
        <section id="about" className="max-w-5xl space-y-6 border border-github-border rounded-xl bg-github-surface p-6">
          <h2 className="text-xl font-semibold text-github-accent">About Me</h2>

          <p className="text-github-muted leading-relaxed">
            I am a Computer Science graduate from the University of the
            Philippines Los Baños. My work focuses on building data-driven
            systems across machine learning, NLP, and full-stack development. I
            enjoy turning research ideas into practical, end-to-end solutions,
            from data collection and processing to deployment. I have experience
            leading teams, designing web applications, and building APIs and
            integrations that support scalable and reliable systems.
          </p>

          {/* Connect */}
          <div className="pt-4 border-t border-github-border flex flex-col sm:flex-row sm:items-center gap-3">
            <span className="text-sm text-github-muted">Connect with me:</span>

            <div className="flex items-center gap-4">
              <a
                href="https://github.com/jtvallente"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub"
                className="hover:text-github-text transition"
              >
                <Github className="h-5 w-5" />
              </a>

              <a
                href="https://www.linkedin.com/in/jtvallente/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="hover:text-github-text transition"
              >
                <Linkedin className="h-5 w-5" />
              </a>

              <a
                href="mailto:jameslourencevallente@gmail.com"
                aria-label="Email"
                className="hover:text-github-text transition"
              >
                <Mail className="h-5 w-5" />
              </a>

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
        </section>

        <SkillsSection />
        <ProjectsCTA />
        <ExperienceSection />
        <EducationSection />
      </section>

      {resumeOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 px-4"
          role="dialog"
          aria-modal="true"
          aria-label="Request resume access"
        >
          <div className="w-full max-w-lg rounded-2xl border border-github-border bg-github-surface p-6 shadow-2xl">
            <div className="flex items-start justify-between gap-4">
              <div className="space-y-1">
                <h3 className="text-lg font-semibold text-github-text">
                  Request Resume Access
                </h3>
                <p className="text-sm text-github-muted">
                  Send your details here and I will grant access to the resume
                  as soon as I can.
                </p>
              </div>
              <button
                type="button"
                onClick={() => setResumeOpen(false)}
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
                if (requestStatus === 'submitting') return

                try {
                  setRequestStatus('submitting')

                  const res = await fetch(
                    'https://portfolio-chat-api-five.vercel.app/api/resume-request',
                    {
                    method: 'POST',
                    headers: {
                      'Content-Type': 'application/json',
                      Accept: 'application/json',
                    },
                    body: JSON.stringify({
                      email: requestEmail,
                      message: requestReason,
                      source: 'portfolio-resume-request',
                      website: '',
                    }),
                  }
                  )

                  if (!res.ok) {
                    throw new Error('Request failed')
                  }

                  setRequestStatus('success')
                  setRequestEmail('')
                  setRequestReason('')
                } catch {
                  setRequestStatus('error')
                }
              }}
            >
              <label className="block space-y-2 text-sm">
                <span className="text-github-muted">Your email</span>
                <input
                  type="email"
                  required
                  value={requestEmail}
                  onChange={(event) => setRequestEmail(event.target.value)}
                  className="w-full rounded-md border border-github-border bg-github-surface px-3 py-2 text-github-text outline-none focus:border-github-accent"
                  placeholder="you@company.com"
                />
              </label>

              <label className="block space-y-2 text-sm">
                <span className="text-github-muted">
                  Message (why you want access)
                </span>
                <textarea
                  rows={4}
                  value={requestReason}
                  onChange={(event) => setRequestReason(event.target.value)}
                  className="w-full rounded-md border border-github-border bg-github-surface px-3 py-2 text-github-text outline-none focus:border-github-accent"
                  placeholder="Recruiter role, project review, etc."
                />
              </label>

              {requestStatus === 'success' && (
                <p className="text-sm text-emerald-400">
                  Request sent. I will review it and reply by email.
                </p>
              )}

              {requestStatus === 'error' && (
                <p className="text-sm text-red-400">
                  Something went wrong. Please try again.
                </p>
              )}

              <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                <span className="text-xs text-github-muted">
                  I will review your request and share access by email.
                </span>
                <PrimaryButton type="submit">
                  {requestStatus === 'submitting'
                    ? 'Sending...'
                    : 'Request Access'}
                </PrimaryButton>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  )
}
