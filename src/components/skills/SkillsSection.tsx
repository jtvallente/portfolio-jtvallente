import {
    FaBrain,
    FaPenFancy,
    FaUsers,
    FaProjectDiagram,
  } from "react-icons/fa"
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
  } from "react-icons/si"
  
  import SkillGroup from "./SkillGroup"
  import SkillIcon from "./SkillIcon"
  
  export default function SkillsSection() {
    return (
      <section className="space-y-8">
        <h2 className="text-xl font-semibold text-github-accent">Skills</h2>
  
        <div className="grid gap-6 md:grid-cols-2">
          <SkillGroup title="Machine Learning & NLP">
            <SkillIcon icon={FaBrain} label="Machine Learning" level="Advanced" />
            <SkillIcon icon={SiPython} label="Python" level="Advanced" />
            <SkillIcon icon={FaBrain} label="BERT & MentalBERT" level="Advanced" />
            <SkillIcon icon={FaBrain} label="Text Classification" level="Advanced" />
            <SkillIcon
              icon={FaBrain}
              label="Sentiment & Stress Analysis"
              level="Advanced"
            />
          </SkillGroup>
  
          <SkillGroup title="Data Preprocessing & Evaluation">
            <SkillIcon icon={SiPython} label="Data Cleaning" level="Advanced" />
            <SkillIcon
              icon={FaProjectDiagram}
              label="Feature Engineering"
              level="Beginner"
            />
            <SkillIcon
              icon={FaProjectDiagram}
              label="Model Evaluation"
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
          </SkillGroup>
  
          <SkillGroup title="Tools & Platforms">
            <SkillIcon icon={SiGit} label="Git" level="Advanced" />
            <SkillIcon icon={SiGithub} label="GitHub" level="Advanced" />
            <SkillIcon icon={SiVite} label="Vite" level="Beginner" />
            <SkillIcon icon={SiFlutter} label="Flutter" level="Intermediate" />
            <SkillIcon icon={SiDart} label="Dart" level="Beginner" />
            <SkillIcon
              icon={FaProjectDiagram}
              label="Automation (Zapier, Keap)"
              level="Advanced"
            />
          </SkillGroup>
  
          <SkillGroup title="Soft & Research Skills">
            <SkillIcon icon={FaPenFancy} label="Technical Writing" level="Advanced" />
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
  