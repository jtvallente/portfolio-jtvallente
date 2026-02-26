import { useMemo, useState } from "react"
import type { Project } from "@/data/projects"
import ImageSlider from "./ImageSlider"

interface ProjectCardProps {
  project: Project
}

export default function ProjectCard({ project }: ProjectCardProps) {
  const [showDetails, setShowDetails] = useState(false)
  const maxTech = 6
  const visibleTech = useMemo(
    () => project.techStack.slice(0, maxTech),
    [project.techStack]
  )
  const hiddenTechCount = Math.max(project.techStack.length - maxTech, 0)

  return (
    <article className="border border-github-border rounded-lg bg-github-surface overflow-hidden flex flex-col">
      {/* Screenshot (16:9, NOT cropped) */}
      <div className="bg-github-canvas">
        <ImageSlider images={project.images} />
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
          {visibleTech.map((tech) => (
            <span
              key={tech}
              className="text-[10px] px-2 py-0.5 rounded border border-github-border"
            >
              {tech}
            </span>
          ))}
          {hiddenTechCount > 0 && (
            <span className="text-[10px] px-2 py-0.5 rounded border border-github-border text-github-muted">
              +{hiddenTechCount} more
            </span>
          )}
        </div>

        <button
          type="button"
          onClick={() => setShowDetails((prev) => !prev)}
          className="text-xs text-github-accent hover:underline"
        >
          {showDetails ? "Hide details" : "Show details"}
        </button>

        {showDetails && (
          <div className="space-y-3 text-xs text-github-muted">
            <div className="border-t border-github-border pt-3">
              <span className="text-github-text font-semibold">
                Problem:
              </span>{" "}
              {project.problem}
            </div>

            {project.highlights?.length ? (
              <div>
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

            {(project.note || project.status) && (
              <div className="italic border-l-2 border-github-border pl-2">
                {project.note
                  ? project.note
                  : project.status !== "live"
                  ? "This project is not currently publicly accessible."
                  : null}
              </div>
            )}
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
