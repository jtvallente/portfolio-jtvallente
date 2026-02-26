import type { Project } from '@/data/projects'
import ImageSlider from './ImageSlider'

export default function ProjectTile({ project }: { project: Project }) {
  return (
    <article className="border border-github-border rounded-2xl bg-github-surface overflow-hidden">
      <div className="grid gap-5 p-5 md:grid-cols-[minmax(0,280px)_1fr]">
        <div className="bg-github-canvas rounded-xl overflow-hidden">
          <ImageSlider images={project.images} />
        </div>

        <div className="flex flex-col gap-4">
          <div className="flex flex-wrap items-start justify-between gap-3">
            <div>
              <h3 className="text-base font-semibold leading-snug">
                {project.name}
              </h3>
              <p className="mt-1 text-sm text-github-muted leading-relaxed">
                {project.shortDescription}
              </p>
            </div>
            {project.status && (
              <span className="text-[10px] px-2 py-0.5 rounded border border-github-border text-github-muted whitespace-nowrap">
                {project.status.toUpperCase()}
              </span>
            )}
          </div>

          <p className="text-sm text-github-muted">
            <span className="text-github-text font-semibold">Role:</span>{" "}
            {project.role}
          </p>

          {project.problem && (
            <p className="text-sm text-github-muted leading-relaxed">
              <span className="text-github-text font-semibold">
                Problem:
              </span>{" "}
              {project.problem}
            </p>
          )}

          {project.highlights?.length ? (
            <div className="text-sm text-github-muted">
              <span className="text-github-text font-semibold">
                Highlights:
              </span>
              <ul className="mt-2 list-disc list-inside space-y-1">
                {project.highlights.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          ) : null}

          <div>
            <span className="text-github-text font-semibold text-sm">
              Tech:
            </span>
            <div className="mt-2 flex flex-wrap gap-2">
              {project.techStack.map((tech) => (
                <span
                  key={tech}
                  className="text-[10px] px-2 py-1 rounded border border-github-border"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          {(project.note || project.status) && (
            <div className="text-[11px] text-github-muted italic border-l-2 border-github-border pl-2">
              {project.note
                ? project.note
                : project.status !== "live"
                ? "This project is not currently publicly accessible."
                : null}
            </div>
          )}

          {project.links && (
            <div className="flex flex-wrap gap-3 text-xs">
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
        </div>
      </div>
    </article>
  )
}
