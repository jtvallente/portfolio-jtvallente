import { FaBrain, FaPenFancy, FaUsers, FaProjectDiagram } from 'react-icons/fa'
import {
  SiPython,
  SiReact,
  SiHtml5,
  SiCss3,
  SiJavascript,
  SiSupabase,
  SiNodedotjs,
  SiGit,
  SiGithub,
  SiVite,
  SiFlutter,
  SiDart,
  SiAdobephotoshop,
  SiFigma,
  SiExpress,
  SiCanva,
  SiSquarespace,
  SiWordpress,
} from 'react-icons/si'

import SkillGroup from './SkillGroup'
import SkillIcon from './SkillIcon'

export default function SkillsSection() {
  return (
    <section className="space-y-8">
      <h2 className="text-xl font-semibold text-github-accent">Skills</h2>

      <div className="grid gap-6 md:grid-cols-2">
        <SkillGroup title="Machine Learning & NLP">
          <SkillIcon icon={FaBrain} label="Machine Learning" level="Advanced" />
          <SkillIcon icon={SiPython} label="Python" level="Advanced" />
          <SkillIcon
            icon={FaBrain}
            label="BERT & MentalBERT"
            level="Advanced"
          />
          <SkillIcon
            icon={FaBrain}
            label="Text Classification"
            level="Advanced"
          />
          <SkillIcon
            icon={FaBrain}
            label="Sentiment & Stress Analysis"
            level="Advanced"
          />
        </SkillGroup>

        <SkillGroup title="Data Processing & Evaluation">
          <SkillIcon
            icon={SiPython}
            label="Data Scraping & Cleaning"
            level="Advanced"
          />
          <SkillIcon
            icon={FaProjectDiagram}
            label="Data Preprocessing & Transformation"
            level="Advanced"
          />
          <SkillIcon
            icon={FaProjectDiagram}
            label="Feature Engineering"
            level="Intermediate"
          />
          <SkillIcon
            icon={FaProjectDiagram}
            label="Model Evaluation & Validation"
            level="Intermediate"
          />
        </SkillGroup>

        <SkillGroup title="Web & Full-Stack Development">
          <SkillIcon icon={SiReact} label="React" level="Advanced" />
          <SkillIcon icon={SiHtml5} label="HTML" level="Advanced" />
          <SkillIcon icon={SiCss3} label="CSS" level="Advanced" />
          <SkillIcon icon={SiJavascript} label="JavaScript" level="Advanced" />
          <SkillIcon icon={SiSupabase} label="Supabase" level="Intermediate" />
          <SkillIcon icon={SiNodedotjs} label="Node.js" level="Advanced" />
          <SkillIcon icon={SiExpress} label="Express.js" level="Advanced" />
          <SkillIcon
            icon={SiSquarespace}
            label="Squarespace"
            level="Advanced"
          />
          <SkillIcon icon={SiWordpress} label="Wordpress" level="Advanced" />
        </SkillGroup>

        <SkillGroup title="Tools & Platforms">
          <SkillIcon icon={SiGit} label="Git" level="Advanced" />
          <SkillIcon icon={SiGithub} label="GitHub" level="Advanced" />
          <SkillIcon icon={SiVite} label="Vite" level="Beginner" />
          <SkillIcon icon={SiFlutter} label="Flutter" level="Intermediate" />
          <SkillIcon icon={SiDart} label="Dart" level="Beginner" />
          <SkillIcon
            icon={SiAdobephotoshop}
            label="Adobe Photoshop"
            level="Intermediate"
          />
          <SkillIcon icon={SiFigma} label="Figma" level="Advanced" />
          <SkillIcon icon={SiCanva} label="Canva" level="Advanced" />
          <SkillIcon
            icon={FaProjectDiagram}
            label="Automation (Zapier, Keap)"
            level="Advanced"
          />
        </SkillGroup>

        <SkillGroup title="Soft & Research Skills">
          <SkillIcon
            icon={FaPenFancy}
            label="Technical Writing"
            level="Advanced"
          />
          <SkillIcon
            icon={FaBrain}
            label="Research & Experimentation"
            level="Advanced"
          />
          <SkillIcon icon={FaUsers} label="Team Leadership" level="Advanced" />
          <SkillIcon
            icon={FaProjectDiagram}
            label="Project Coordination"
            level="Advanced"
          />
        </SkillGroup>
      </div>
    </section>
  )
}
