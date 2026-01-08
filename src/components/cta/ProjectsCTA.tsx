import { Link } from "react-router-dom"
import PrimaryButton from "@/components/ui/PrimaryButton"

export default function ProjectsCTA() {
  return (
    <section className="relative mt-16 rounded-2xl p-[1px] bg-gradient-to-r from-indigo-500/60 via-purple-500/60 to-indigo-500/60">
      <div className="rounded-2xl bg-github-surface px-8 py-10 md:px-12 md:py-12">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          
          {/* Text */}
          <div className="space-y-2 max-w-2xl">
            <h3 className="text-xl font-semibold font-semibold text-github-accent">
              Want to see these skills in action?
            </h3>
            <p className="text-github-muted text-sm md:text-base">
              Explore my projects from AI-powered systems and NLP research to
              full-stack applications built for specific users.
            </p>
          </div>

          {/* CTA */}
          <Link to="/projects">
            <PrimaryButton href="/projects">
              View My Projects →
            </PrimaryButton>
          </Link>
        </div>
      </div>
    </section>
  )
}
