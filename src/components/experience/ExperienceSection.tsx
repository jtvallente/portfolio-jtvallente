import { experiences } from "@/data/experience"
import ExperienceItem from "./ExperienceItem"

export default function ExperienceSection() {
  return (
    <section id="experience" className="relative">
      <h2 className="mb-10 text-xl font-semibold text-github-accent">
        Experiences
      </h2>

      <ol className="relative border-s border-github-border">
        {experiences.map((exp, index) => (
          <ExperienceItem key={`${exp.company}-${index}`} exp={exp} />
        ))}
      </ol>
    </section>
  )
}
