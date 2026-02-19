import { education } from "@/data/education"
import EducationItem from "./EducationItem"

export default function EducationSection() {
  return (
    <section id="education" className="relative">
      <h2 className="mb-10 text-xl font-semibold text-github-accent">
        Education
      </h2>

      <ol className="relative border-s border-github-border">
        {education.map((edu) => (
          <EducationItem key={edu.school} edu={edu} />
        ))}
      </ol>
    </section>
  )
}
