// src/data/kb.ts
import { profile } from "./profile.master.js"

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
  | { type: "NAVIGATE_ROUTE"; label: string; to: string }
  | { type: "OPEN_URL"; label: string; url: string }
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
    id: "bio.basics",
    title: "Profile Basics (Name, Nickname, Age, Location, Degree)",
    source: "bio",
    tags: [
      "name",
      "nickname",
      "nick",
      "alias",
      "called",
      "age",
      "old",
      "years old",
      "location",
      "where",
      "based",
      "from",
      "email",
      "contact",
      "degree",
      "bio",
      "basics",
    ],
    text: [
      `Name: ${profile.bio.name}`,
      profile.bio.nickname ? `Nickname: ${profile.bio.nickname}` : "",
      `Age: ${profile.bio.age} years old`,
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
    id: "bio.summary",
    title: "Professional Summary",
    source: "bio",
    tags: ["summary", "about", "overview", "elevator pitch", "profile"],
    text: profile.bio.summary,
    actions: [{ type: "OPEN_SECTION", label: "View About section", sectionId: "about" }],
    sensitivity: "public",
  },
  {
    id: "bio.long",
    title: "Biography (Background Story)",
    source: "bio",
    tags: ["bio", "background", "story", "history", "timeline"],
    text: profile.bio.longBio,
    sensitivity: "public",
  },
  {
    id: "bio.honors",
    title: "Honors & Nominations",
    source: "bio",
    tags: ["honors", "awards", "nominations", "magna", "cum laude", "dean", "president lister"],
    text: profile.bio.honors.map((h) => `• ${h}`).join("\n"),
    sensitivity: "public",
  },

  // ===== LINKS =====
  {
    id: "links.accounts",
    title: "Links & Accounts (GitHub, LinkedIn, Projects, Email)",
    source: "links",
    tags: ["github", "linkedin", "projects", "portfolio", "email", "contact", "links"],
    text: [
      `GitHub: ${profile.bio.links.github}`,
      `LinkedIn: ${profile.bio.links.linkedin}`,
      `Projects page: ${profile.bio.links.projectsPage}`,
      `Email: ${profile.bio.email}`,
    ].join("\n"),
    actions: [
      { type: "OPEN_URL", label: "Open GitHub", url: profile.bio.links.github },
      { type: "OPEN_URL", label: "Open LinkedIn", url: profile.bio.links.linkedin },
      { type: "OPEN_URL", label: "Open Projects page", url: profile.bio.links.projectsPage },
      { type: "NAVIGATE_ROUTE", label: "View the project page", to: PROJECTS_ROUTE },
    ],
    sensitivity: "personal_allowed",
  },

  // ===== FOUNDATIONAL KNOWLEDGE / COURSEWORK =====
  {
    id: "foundations.cs_coursework",
    title: "Foundational Knowledge — CS Coursework",
    source: "foundations",
    tags: ["foundational", "foundation", "coursework", "courses", "subjects", "cs", "computer science"],
    text: profile.foundationalKnowledge.csCoursework.map((x) => `• ${x}`).join("\n"),
    sensitivity: "public",
  },
  {
    id: "foundations.math_physics_coursework",
    title: "Foundational Knowledge — Math/Physics Coursework",
    source: "foundations",
    tags: ["foundational", "foundation", "coursework", "courses", "subjects", "math", "physics"],
    text: profile.foundationalKnowledge.mathPhysicsCoursework.map((x) => `• ${x}`).join("\n"),
    sensitivity: "public",
  },
  {
    id: "foundations.other",
    title: "Foundational Knowledge — Additional Foundations",
    source: "foundations",
    tags: ["foundational", "foundation", "core", "fundamentals"],
    text: profile.foundationalKnowledge.otherFoundations.map((x) => `• ${x}`).join("\n"),
    sensitivity: "public",
  },

  // ===== EXPERIENCE =====
  ...profile.experience.map((exp, i): KBChunk => ({
    id: `exp.${i}.${exp.company.toLowerCase().replace(/\s+/g, "_")}`,
    title: `${exp.role} — ${exp.company}`,
    source: "experience",
    tags: [
      "experience",
      exp.company,
      exp.role,
      "work",
      "internship",
      "leadership",
      "team lead",
      "projects",
    ],
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

  // ===== FREELANCE =====
  {
    id: "freelance.highlights",
    title: "Freelance Work",
    source: "freelance",
    tags: ["freelance", "contract", "client", "side projects", "writing", "design", "flutter"],
    text: profile.freelance.highlights.map((x) => `• ${x}`).join("\n"),
    sensitivity: "public",
  },

  // ===== PROJECTS =====
  ...profile.projects.map((p): KBChunk => ({
    id: `proj.${p.name.toLowerCase().replace(/[^a-z0-9]+/g, "_")}`,
    title: `Project — ${p.name}`,
    source: "projects",
    tags: [
      "project",
      p.category,
      ...p.tags,
      ...(p.stack ?? []),
      "portfolio",
      "case study",
    ],
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
      { type: "NAVIGATE_ROUTE", label: "View the project page", to: PROJECTS_ROUTE },
      { type: "OPEN_URL", label: "Open Projects in browser", url: PROJECTS_URL },
    ],
    sensitivity: "public",
  })),

  // ===== RESEARCH =====
  ...profile.research.map((r, i): KBChunk => ({
    id: `research.${i}`,
    title: `Research — ${r.title}`,
    source: "research",
    tags: ["research", ...r.keywords, "paper", "thesis", "study"],
    text: [
      r.summary,
      "",
      r.metrics?.length ? `Key results: ${r.metrics.join(" | ")}` : "",
    ]
      .filter(Boolean)
      .join("\n"),
    sensitivity: "public",
  })),

  // ===== EDUCATION =====
  ...profile.education.map((e, i): KBChunk => ({
    id: `edu.${i}`,
    title: `Education — ${e.school}`,
    source: "education",
    tags: ["education", "school", e.school, e.degree, ...(e.honors ?? [])],
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
    title: "Skills / Tools Overview",
    source: "skills",
    tags: ["skills", "stack", "tools", "tech", "languages", "frameworks"],
    text: [
      `Frontend: ${profile.skills.frontend.join(", ")}`,
      `Backend: ${profile.skills.backend.join(", ")}`,
      `Data & Databases: ${profile.skills.dataDatabases.join(", ")}`,
      `AI/ML/NLP: ${profile.skills.aiMlNlp.join(", ")}`,
      `DevOps/Cloud: ${profile.skills.devopsCloud.join(", ")}`,
      `Automation: ${profile.skills.automation.join(", ")}`,
      `Programming Languages: ${profile.skills.languages.join(", ")}`,
      `Tools/Platforms: ${profile.skills.toolsPlatforms.join(", ")}`,
      `Other: ${profile.skills.misc.join(", ")}`,
    ].join("\n"),
    actions: [{ type: "OPEN_SECTION", label: "View Skills section", sectionId: "skills" }],
    sensitivity: "public",
  },

  // ===== INTERESTS =====
  {
    id: "interests.hobbies",
    title: "Hobbies / Interests",
    source: "interests",
    tags: ["hobbies", "interests", "fun", "personal", "outside work"],
    text: profile.interests.map((x) => `• ${x}`).join("\n"),
    sensitivity: "public",
  },
]