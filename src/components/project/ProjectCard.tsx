import type { Project } from "@/data/projects"

interface ProjectCardProps {
  project: Project
}

export default function ProjectCard({ project }: ProjectCardProps) {
  return (
    <article className="border border-github-border rounded-lg bg-github-surface overflow-hidden flex flex-col">
      {/* Screenshot (16:9, NOT cropped) */}
      <div className="bg-github-canvas">
        <img
          src={project.images?.[0]}
          alt={`${project.name} screenshot`}
          className="w-full aspect-video object-contain"
          loading="lazy"
        />
      </div>

      {/* Content */}
      <div className="p-4 space-y-3 flex-1">
        {/* Title + Status */}
        <div className="flex items-start justify-between gap-3">
          <h3 className="font-semibold text-sm leading-snug">
            {project.name}
          </h3>

          {project.status && (
            <span className="text-[10px] px-2 py-0.5 rounded border border-github-border text-github-muted whitespace-nowrap">
              {project.status.toUpperCase()}
            </span>
          )}
        </div>

        {/* Two-sentence description */}
        <p className="text-xs text-github-muted leading-relaxed">
          {project.shortDescription}
        </p>

        {/* Role */}
        <p className="text-xs">
          <span className="text-github-muted">Role:</span>{" "}
          {project.role}
        </p>

        {/* Tech Stack */}
        <div className="flex flex-wrap gap-1.5">
          {project.techStack.map((tech) => (
            <span
              key={tech}
              className="text-[10px] px-2 py-0.5 rounded border border-github-border"
            >
              {tech}
            </span>
          ))}
        </div>

        {/* Status / Note (WHY inactive / no demo) */}
        {(project.note || project.status) && (
          <div className="text-[11px] text-github-muted italic border-l-2 border-github-border pl-2">
            {project.note
              ? project.note
              : project.status !== "live"
              ? "This project is not currently publicly accessible."
              : null}
          </div>
        )}
      </div>

      {/* Links */}
      {project.links && (
        <div className="px-4 pb-4 flex gap-4 text-xs">
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
    </article>
  )
}
