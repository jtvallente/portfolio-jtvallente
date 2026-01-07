export default function Home() {
    return (
      <section className="space-y-6">
        <header>
          <h1 className="text-2xl font-semibold">
            Hi, I'm James Vallente 👋
          </h1>
          <p className="mt-2 text-github-muted max-w-2xl">
            Software Engineer & Web Developer · Computer Science graduate from UPLB.
            I specialize in Python, AI model training and fine-tuning, data scraping,
            and turning data into meaningful insights.
          </p>
        </header>
  
        <div className="flex flex-wrap gap-2 text-sm">
          {[
            "Python",
            "AI / ML",
            "Data Scraping",
            "Data Analysis",
            "React",
            "TypeScript",
            "Tailwind CSS",
          ].map((skill) => (
            <span
              key={skill}
              className="px-3 py-1 rounded-md bg-github-surface border border-github-border"
            >
              {skill}
            </span>
          ))}
        </div>
      </section>
    )
  }
  