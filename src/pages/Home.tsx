import profileImg from '@/assets/images/profile.jpg'

import PrimaryButton from '@/components/ui/PrimaryButton'
import ExperienceSection from '@/components/experience/ExperienceSection'
import { Github, Linkedin, Mail, Facebook } from 'lucide-react'
import SkillsSection from '@/components/skills/SkillsSection'
import ProjectsCTA from '@/components/cta/ProjectsCTA'
import EducationSection from '@/components/education/EducationSection'

import { Link } from 'react-router-dom'

export default function Home() {
  return (
    <section className="space-y-16">
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
              , from data collection and modeling to production-ready deployment.
            </p>

            {/* Actions */}
            <div className="flex flex-wrap gap-4">
              <Link to="/projects">
                <PrimaryButton href="/projects">View Projects</PrimaryButton>
              </Link>

              <PrimaryButton
                href="https://drive.google.com/file/d/1KqerfYIh6MgHAUuMT5DxWynkH7VF5EKW/view?usp=sharing"
                variant="secondary"
              >
                Download Resume
              </PrimaryButton>
            </div>
          </div>

          {/* Profile Image */}
          <div className="flex justify-center md:justify-end">
            <img
              src={profileImg}
              alt="James Vallente"
              className="w-40 h-40 rounded-full border border-github-border
                       object-cover bg-github-surface"
            />
          </div>
        </div>
      </section>

      {/* ================= ABOUT ================= */}
      <section className="max-w-5xl space-y-6 border border-github-border rounded-xl bg-github-surface p-6">
        <h2 className="text-xl font-semibold text-github-accent">About Me</h2>

        <p className="text-github-muted leading-relaxed">
          I am a Computer Science graduate from the University of the
          Philippines Los Baños. My work focuses on building data-driven systems
          across machine learning, NLP, and full-stack development. I enjoy
          turning research ideas into practical, end-to-end solutions, from data
          collection and processing to deployment. I have experience leading
          teams, designing web applications, and building APIs and integrations
          that support scalable and reliable systems.
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
  )
}
