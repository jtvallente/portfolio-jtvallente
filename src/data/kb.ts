// src/data/kb.ts
import { profile } from "./profile.master"

export type KBSource =
  | "bio"
  | "skills"
  | "experience"
  | "projects"
  | "research"
  | "education"
  | "freelance"
  | "interests"
  | "foundations"
  | "links"

export type KBAction =
  | { type: "NAVIGATE_ROUTE"; label: string; to: string } // use react-router
  | { type: "OPEN_URL"; label: string; url: string }      // external link
  | { type: "OPEN_SECTION"; label: string; sectionId: string }

export type KBChunk = {
  id: string
  title: string
  source: KBSource
  tags: string[]
  text: string
  actions?: KBAction[]
  sensitivity?: "public" | "personal_allowed"
}

const PROJECTS_ROUTE = "/projects"
const PROJECTS_URL = profile.bio.links.projectsPage

export const KB: KBChunk[] = [
  // ===== BIO =====
  {
    id: "bio.summary",
    title: "Professional Summary",
    source: "bio",
    tags: ["summary", "about", "overview"],
    text: profile.bio.summary,
    actions: [{ type: "OPEN_SECTION", label: "View About section", sectionId: "about" }],
    sensitivity: "public",
  },
  {
    id: "bio.quick_facts",
    title: "Quick Facts",
    source: "bio",
    tags: ["age", "location", "email", "degree"],
    text: [
      `Name: ${profile.bio.name}`,
      `Title: ${profile.bio.title}`,
      `Age: ${profile.bio.age}`,
      `Location: ${profile.bio.location}`,
      `Email: ${profile.bio.email}`,
      `Degree: ${profile.bio.degree}`,
      profile.bio.graduationNote ? `Note: ${profile.bio.graduationNote}` : "",
    ]
      .filter(Boolean)
      .join("\n"),
    sensitivity: "personal_allowed",
  },
  {
    id: "bio.honors",
    title: "Honors & Nominations",
    source: "bio",
    tags: ["honors", "awards", "nominations", "magna cum laude"],
    text: profile.bio.honors.map((h) => `• ${h}`).join("\n"),
    sensitivity: "public",
  },

  // ===== LINKS =====
  {
    id: "links.accounts",
    title: "Links & Accounts",
    source: "links",
    tags: ["github", "linkedin", "email", "contact", "links"],
    text: [
      `GitHub: ${profile.bio.links.github}`,
      `LinkedIn: ${profile.bio.links.linkedin}`,
      `Email: ${profile.bio.email}`,
      `Projects: ${profile.bio.links.projectsPage}`,
    ].join("\n"),
    actions: [
      { type: "OPEN_URL", label: "Open GitHub", url: profile.bio.links.github },
      { type: "OPEN_URL", label: "Open LinkedIn", url: profile.bio.links.linkedin },
      { type: "OPEN_URL", label: "Open Projects page", url: profile.bio.links.projectsPage },
    ],
    sensitivity: "personal_allowed",
  },

  // ===== FOUNDATIONAL KNOWLEDGE =====
  {
    id: "foundations.cs",
    title: "Foundational Knowledge",
    source: "foundations",
    tags: ["foundational", "cs", "core", "algorithms", "systems", "math"],
    text: profile.foundationalKnowledge.map((x) => `• ${x}`).join("\n"),
    sensitivity: "public",
  },

  // ===== EXPERIENCE =====
  ...profile.experience.map((exp, i): KBChunk => ({
    id: `exp.${i}.${exp.company.toLowerCase().replace(/\s+/g, "_")}`,
    title: `${exp.role} — ${exp.company}`,
    source: "experience",
    tags: ["experience", exp.company, exp.role],
    text: [
      exp.timeframe ? `Timeframe: ${exp.timeframe}` : "",
      exp.location ? `Location: ${exp.location}` : "",
      exp.type ? `Type: ${exp.type}` : "",
      "",
      ...exp.highlights.map((b) => `• ${b}`),
    ]
      .filter(Boolean)
      .join("\n"),
    actions: [{ type: "OPEN_SECTION", label: "View Experience section", sectionId: "experience" }],
    sensitivity: "public",
  })),

  // ===== PROJECTS =====
  ...profile.projects.map((p): KBChunk => ({
    id: `proj.${p.name.toLowerCase().replace(/[^a-z0-9]+/g, "_")}`,
    title: `Project — ${p.name}`,
    source: "projects",
    tags: ["project", p.category, ...p.tags],
    text: [
      `Category: ${p.category}`,
      p.stack?.length ? `Stack: ${p.stack.join(", ")}` : "",
      "",
      p.summary,
      "",
      "Suggestion: Would you like to view the project page?",
    ]
      .filter(Boolean)
      .join("\n"),
    actions: [
      // Internal route (works with BrowserRouter basename)
      { type: "NAVIGATE_ROUTE", label: "View the project page", to: PROJECTS_ROUTE },
      // External URL (works anywhere)
      { type: "OPEN_URL", label: "Open Projects in browser", url: PROJECTS_URL },
    ],
    sensitivity: "public",
  })),

  // ===== RESEARCH =====
  ...profile.research.map((r, i): KBChunk => ({
    id: `research.${i}`,
    title: `Research — ${r.title}`,
    source: "research",
    tags: ["research", ...r.keywords],
    text: [
      r.summary,
      "",
      r.metrics?.length ? `Key results: ${r.metrics.join(" | ")}` : "",
    ]
      .filter(Boolean)
      .join("\n"),
    actions: [{ type: "OPEN_SECTION", label: "View Research section", sectionId: "research" }],
    sensitivity: "public",
  })),

  // ===== EDUCATION =====
  ...profile.education.map((e, i): KBChunk => ({
    id: `edu.${i}`,
    title: `Education — ${e.school}`,
    source: "education",
    tags: ["education", e.school, e.degree, ...(e.honors ?? [])],
    text: [
      `School: ${e.school}`,
      `Degree: ${e.degree}`,
      e.years ? `Years: ${e.years}` : "",
      e.location ? `Location: ${e.location}` : "",
      e.honors?.length ? `Honors: ${e.honors.join(", ")}` : "",
    ]
      .filter(Boolean)
      .join("\n"),
    actions: [{ type: "OPEN_SECTION", label: "View Education section", sectionId: "education" }],
    sensitivity: "public",
  })),

  // ===== SKILLS =====
  {
    id: "skills.overview",
    title: "Skills Overview",
    source: "skills",
    tags: ["skills", "stack", "tools"],
    text: [
      `Frontend: ${profile.skills.frontend.join(", ")}`,
      `Backend: ${profile.skills.backend.join(", ")}`,
      `Data & Databases: ${profile.skills.dataDatabases.join(", ")}`,
      `AI/ML/NLP: ${profile.skills.aiMlNlp.join(", ")}`,
      `DevOps/Cloud: ${profile.skills.devopsCloud.join(", ")}`,
      `Automation: ${profile.skills.automation.join(", ")}`,
      `Languages: ${profile.skills.languages.join(", ")}`,
      `Tools/Platforms: ${profile.skills.toolsPlatforms.join(", ")}`,
    ].join("\n"),
    actions: [{ type: "OPEN_SECTION", label: "View Skills section", sectionId: "skills" }],
    sensitivity: "public",
  },
]
