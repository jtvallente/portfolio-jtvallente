import type { Project } from '@/data/projects'
import ImageSlider from './ImageSlider'

export default function FeaturedProject({ project }: { project: Project }) {
  return (
    <section className="border border-github-border rounded-lg bg-github-surface p-6 space-y-4">
      {/* Header */}
      <header className="space-y-1">
        <span className="text-xs uppercase text-github-muted">
          Featured Project
        </span>

        <h2 className="text-xl font-semibold leading-snug">
          {project.name}: {project.shortDescription}
          {project.status && (
            <span className="text-[10px] ml-3 px-2 py-0.5 rounded border border-github-border text-github-muted whitespace-nowrap">
              {project.status.toUpperCase()}
            </span>
          )}
        </h2>

        <p className="text-sm text-github-muted max-w-3xl">{project.problem}</p>
      </header>

      {/* Screenshots */}
      <div className="bg-github-canvas rounded-md overflow-hidden max-h-[460px]">
        <ImageSlider images={project.images} />
      </div>

      {/* Meta Info */}
      <div className="grid md:grid-cols-2 gap-6 text-sm">
        {/* Left */}
        <div className="space-y-4">
          <p>
            <strong>Role:</strong> {project.role}
          </p>

          <div>
            <strong>Tech:</strong>
            <div className="flex flex-wrap gap-2 mt-2">
              {project.techStack.map((tech) => (
                <span
                  key={tech}
                  className="text-xs px-2 py-1 rounded border border-github-border"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Right */}
        {project.highlights && (
          <div>
            <strong>Highlights:</strong>
            <ul className="list-disc list-inside mt-2 space-y-1 text-github-muted">
              {project.highlights.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        )}
      </div>

      {/* Status / Note */}
      {(project.status || project.note) && (
        <div className="text-xs text-github-muted italic border-l-2 border-github-border pl-3">
          <strong>Status:</strong> {project.status?.toUpperCase()} —{' '}
          {project.note}
        </div>
      )}

      {/* Links */}
      {project.links && (
        <div className="flex gap-4 text-sm">
          <strong>Links:</strong>
          {project.links.map((link) => (
            <a
              key={link.label}
              href={link.url}
              target="_blank"
              rel="noreferrer"
              className="text-github-accent hover:underline"
            >
              {link.label}
            </a>
          ))}
        </div>
      )}
    </section>
  )
}
