import { experiences } from "@/data/experience"
import ExperienceItem from "./ExperienceItem"

export default function ExperienceSection() {
  return (
    <section id="experience" className="relative">
      <h2 className="text-xl font-semibold mb-12 font-semibold text-github-accent">Experiences</h2>

      {/* Timeline line */}
      <div className="absolute left-[163px] top-24 bottom-0 w-px bg-github-border" />

      <div className="space-y-20">
        {experiences.map((exp, index) => (
          <ExperienceItem
            key={`${exp.company}-${index}`}
            exp={exp}
          />
        ))}
      </div>
    </section>
  )
}
