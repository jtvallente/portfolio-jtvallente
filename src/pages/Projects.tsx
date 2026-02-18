import { useEffect, useRef } from "react"
import * as THREE from "three"
// @ts-expect-error Vanta does not have TypeScript definitions
import NET from "vanta/dist/vanta.net.min.js"

import { projects } from '@/data/projects'
import FeaturedProject from '../components/project/FeaturedProject'
import ProjectTile from '@/components/project/ProjectTile'

export default function Projects() {
  const netRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    if (!netRef.current) return

    const effect = NET({
      el: netRef.current,
      THREE,
      mouseControls: true,
      touchControls: true,
      gyroControls: false,

      minHeight: 200,
      minWidth: 200,
      scale: 1.0,
      scaleMobile: 1.0,

      backgroundColor: 0x0d1117, // github.bg
      color: 0x9f7aea, 

      // reduce noise (less webby)
      points: 9.0,
      maxDistance: 18.0,
      spacing: 26.0,
    })

    return () => {
      effect?.destroy()
    }
  }, [])

  const featured = projects.find((p) => p.featured)
  const others = projects.filter((p) => !p.featured).slice(0, 9)

  return (
    <>
      {/* FULL PAGE NET BACKGROUND (SIDES ONLY) */}
      <div className="fixed inset-0 -z-10 pointer-events-none">
        <div
          ref={netRef}
          className="absolute inset-0"
          style={{
            WebkitMaskImage:
              "linear-gradient(to right, rgba(0,0,0,1) 0%, rgba(0,0,0,1) 22%, rgba(0,0,0,0.08) 42%, rgba(0,0,0,0.08) 58%, rgba(0,0,0,1) 78%, rgba(0,0,0,1) 100%)",
            maskImage:
              "linear-gradient(to right, rgba(0,0,0,1) 0%, rgba(0,0,0,1) 22%, rgba(0,0,0,0.08) 42%, rgba(0,0,0,0.08) 58%, rgba(0,0,0,1) 78%, rgba(0,0,0,1) 100%)",
          }}
        />
      </div>

      {/* PAGE CONTENT */}
      <section className="relative z-10 space-y-16">
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
    </>
  )
}
