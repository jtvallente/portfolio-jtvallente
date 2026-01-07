import profileImg from '@/assets/images/profile.jpg'

import PrimaryButton from '@/components/ui/PrimaryButton'
import SkillIcon from '@/components/ui/SkillIcon'
import SkillGroup from '@/components/ui/SkillGroup'
import { Link } from 'react-router-dom'

import {
  SiPython,
  SiReact,
  SiJavascript,
  SiHtml5,
  SiCss3,
  SiSupabase,
  SiNodedotjs,
  SiVite,
  SiGit,
  SiGithub,
  SiFlutter,
  SiDart,
} from 'react-icons/si'

import { FaBrain, FaUsers, FaProjectDiagram, FaPenFancy } from 'react-icons/fa'

export default function Home() {
  return (
    <section className="space-y-16">
      {/* ================= HERO ================= */}
      <section className="grid grid-cols-1 md:grid-cols-[1fr_220px] gap-8">
        <div className="space-y-6">
          <h1 className="text-2xl font-semibold">
            Hi, I'm James Lourence Vallente 👋
          </h1>

          <p className="text-github-muted max-w-2xl">
            Software Engineer | Web Developer | AI and NLP · I build reliable
            web systems and AI models, with a focus on natural language
            processing.
          </p>

          {/* Action Buttons */}
          <div className="flex gap-3">
            <Link to="/projects">
              <PrimaryButton href="/projects">View Projects</PrimaryButton>
            </Link>

            <PrimaryButton
              href="https://drive.google.com/file/d/1PCngbi2LJouwRx2uuIA6TTpjT9D6c-n3/view?usp=sharing"
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
      </section>

      {/* ================= ABOUT ================= */}
      <section className="space-y-4 max-w-3xl">
        <h2 className="text-xl font-semibold">About Me</h2>
        <p className="text-github-muted leading-relaxed">
          I am a Computer Science graduate from the University of the
          Philippines Los Baños. My work focuses on machine learning, NLP, and
          full-stack development. I enjoy turning research ideas into working
          systems. I have experience leading teams, building web apps, and
          integrating AI into real products.
        </p>
      </section>

      {/* ================= SKILLS ================= */}
      <section className="space-y-8">
        <h2 className="text-xl font-semibold">Skills</h2>

        <SkillGroup title="Machine Learning & NLP">
          <SkillIcon icon={FaBrain} label="Machine Learning" />
          <SkillIcon icon={SiPython} label="Python" />
          <SkillIcon icon={FaBrain} label="BERT & MentalBERT" />
          <SkillIcon icon={FaBrain} label="Text Classification" />
          <SkillIcon icon={FaBrain} label="Sentiment & Stress Analysis" />
        </SkillGroup>

        <SkillGroup title="Data Preprocessing & Evaluation">
          <SkillIcon icon={SiPython} label="Data Cleaning" />
          <SkillIcon icon={FaProjectDiagram} label="Feature Engineering" />
          <SkillIcon icon={FaProjectDiagram} label="Model Evaluation" />
        </SkillGroup>

        <SkillGroup title="Web & Full-Stack Development">
          <SkillIcon icon={SiReact} label="React" />
          <SkillIcon icon={SiHtml5} label="HTML" />
          <SkillIcon icon={SiCss3} label="CSS" />
          <SkillIcon icon={SiJavascript} label="JavaScript" />
          <SkillIcon icon={SiSupabase} label="Supabase" />
          <SkillIcon icon={SiNodedotjs} label="Node.js" />
        </SkillGroup>

        <SkillGroup title="Tools & Platforms">
          <SkillIcon icon={SiGit} label="Git" />
          <SkillIcon icon={SiGithub} label="GitHub" />
          <SkillIcon icon={SiVite} label="Vite" />
          <SkillIcon icon={SiFlutter} label="Flutter" />
          <SkillIcon icon={SiDart} label="Dart" />
          <SkillIcon
            icon={FaProjectDiagram}
            label="Automation (Zapier, Keap)"
          />
        </SkillGroup>

        <SkillGroup title="Soft & Research Skills">
          <SkillIcon icon={FaPenFancy} label="Technical Writing" />
          <SkillIcon icon={FaBrain} label="Research & Experimentation" />
          <SkillIcon icon={FaUsers} label="Team Leadership" />
          <SkillIcon icon={FaProjectDiagram} label="Project Coordination" />
        </SkillGroup>
      </section>
    </section>
  )
}
