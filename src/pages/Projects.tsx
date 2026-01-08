import { projects } from '@/data/projects'
import FeaturedProject from '../components/project/FeaturedProject'
import ProjectTile from '@/components/project/ProjectTile'

export default function Projects() {
  const featured = projects.find((p) => p.featured)
  const others = projects.filter((p) => !p.featured).slice(0, 9)

  return (
    <section className="space-y-16">
      <header>
        <h1 className="text-xl font-semibold text-github-accent">Projects</h1>
      </header>
      {featured && <FeaturedProject project={featured} />}

      <section className="space-y-6">
        <h2 className="text-xl font-semibold">Other Projects</h2>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {others.map((project) => (
            <ProjectTile key={project.name} project={project} />
          ))}
        </div>
      </section>
    </section>
  )
}
