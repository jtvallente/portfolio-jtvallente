import { education } from "@/data/education"
import EducationItem from "./EducationItem"

export default function EducationSection() {
  return (
    <section id="education" className="space-y-6">
      <h2 className="text-xl font-semibold mb-12 font-semibold text-github-accent">Education</h2>

      <div className="relative space-y-8">
        {/* Timeline line */}
        <div className="absolute left-[163px] top-3 h-full w-px bg-github-border" />

        {education.map((edu) => (
          <EducationItem key={edu.school} edu={edu} />
        ))}
      </div>
    </section>
  )
}
