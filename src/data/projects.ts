export interface Project {
    name: string
    shortDescription: string
    role: string
    techStack: string[]
    problem: string
    highlights?: string[]
    images: string[]
    links?: {
      label: string
      url: string
    }[]
    status?: "live" | "inactive" | "unreleased"
    note?: string
    featured?: boolean
    type?: "web" | "desktop" | "mobile" | "research" | "game"
  }
  
  export const projects: Project[] = [
    {
      name: "iskStress",
      shortDescription:
        "Hybrid NLP system for detecting stress in Taglish Reddit posts.",
      role: "Researcher and Developer",
      techStack: [
        "Python",
        "MentalBERT",
        "TensiStrength",
        "React",
        "Supabase",
      ],
      problem:
        "Detecting psychological stress in low-resource, code-switched Taglish text.",
      highlights: [
        "Fine-tuned a BERT-based model for stress detection",
        "Enhanced a lexicon-based tool for Taglish text",
        "Built a web platform for real-time visualization",
      ],
      images: [
        "iskstress/1.png",
        "iskstress/2.png",
        "iskstress/3.png",
      ],
      links: [
        { label: "Paper", url: "https://drive.google.com/file/d/1CoKDQ6eg0XUgDZX-9wUyrWHo3QjbWygy/view?usp=sharing" },
        { label: "GitHub", url: "https://github.com/jtvallente/iskStress-SP2-MODEL.git" },
      ],
      status: "inactive",
      note:
        "Demo is no longer live due to terminated third-party services.",
      featured: true,
      type: "research",
    },
  
    {
      name: "UPLB Halina",
      shortDescription:
        "Evaluating the impact of gamification on user experience in a campus mobile app.",
      role: "UI/UX Designer / Researcher",
      techStack: ["UI/UX Research", "Gamification", "Usability Testing"],
      problem:
        "Understanding how gamification affects usability, engagement, and satisfaction.",
      images: ["halina/1.png","halina/2.png"],
      status: "unreleased",
      type: "research",
      links: [
        { label: "Paper", url: "https://drive.google.com/file/d/1_S2l-ayFtAiAuS_R-GpV03fD8S-LJepv/view?usp=sharing" },
      ],
    },
  
    {
      name: "LOLCODE Interpreter",
      shortDescription:
        "A graphical LOLCODE interpreter with lexical, syntax, and semantic analysis.",
      role: "Full Stack Developer",
      techStack: ["Python", "GUI Development", "Team Leadership"],
      problem:
        "Providing an interactive environment for understanding LOLCODE programs.",
      images: ["lolcode/1.jpg"],
      status: "live",
      type: "desktop",
      note: "Desktop application (not a web-based system).",
      links: [
        { label: "GitHub", url: "https://github.com/jtvallente/CMSC124-Project.git" },
      ],
    },
  
    {
      name: "BRICS",
      shortDescription:
        "Internal booking and reservation system for UPLB ICS facilities.",
      role: "UI/UX Designer & Front-End Developer",
      techStack: ["MERN Stack", "UI/UX", "Front-End Development"],
      problem:
        "Streamlining booking of lecture halls and computer laboratories.",
      images: ["brics/1.png", "brics/2.png"],
      status: "live",
      type: "web",
      links: [
        { label: "Demo", url: "https://brics-alpha.vercel.app/" },
      ],
    },
  
    {
      name: "Elbigay",
      shortDescription:
        "Android donation platform connecting donors and beneficiaries in Los Baños.",
      role: "Backend Developer",
      techStack: ["Flutter", "Dart", "Firebase"],
      problem:
        "Improving transparency and accessibility in local donation systems.",
      images: ["elbigay/1.png"],
      type: "mobile",
      status: "unreleased",
      note: "Mobile application (not a web-based system)."
    },
  
    {
      name: "HarvestHub PH",
      shortDescription:
        "E-commerce platform for farm products with admin tools for DA.",
      role: "Frontend Developer / Team Lead",
      techStack: ["Front-End Development", "Project Management", "Databases"],
      problem:
        "Creating a seamless farm-to-consumer e-commerce experience.",
      images: ["harvesthub/1.jpeg"],
      type: "web",
      status: "inactive",
      links: [
        { label: "Github", url: "https://github.com/CMSC100-1S2324/group1-project.git" },
      ],
    },
  
    {
      name: "MLBB Mini Game",
      shortDescription:
        "Java-based desktop minigame inspired by Mobile Legends.",
      role: "Game Developer",
      techStack: ["Java", "OOP", "Game Development"],
      problem:
        "Applying object-oriented programming concepts in a game setting.",
      images: ["mlbb/1.png"],
      status: "unreleased",
      type: "game",
    },
  
    {
      name: "COURSEDLE",
      shortDescription:
        "Wordle-inspired game using UPLB course codes.",
      role: "Programmer",
      techStack: ["Python"],
      problem:
        "Gamifying familiarity with UPLB academic programs.",
      images: ["coursedle/1.png"],
      links: [
        {
          label: "GitHub",
          url: "https://github.com/jasrelperalta/coursedle",
        },
      ],
      type: "game",
    },
  
    {
      name: "iTVL-now",
      shortDescription:
        "Inventory management system for a senior high school department.",
      role: "Software Developer",
      techStack: ["Java", "SQL"],
      problem:
        "Tracking tools, donations, and procurements efficiently.",
      images: ["itvl/1.png"],
      type: "desktop",
    },
  
    {
      name: "Check-GBF",
      shortDescription:
        "AI-powered essay checker built during a 16-hour hackathon.",
      role: "Full Stack Developer",
      techStack: ["AI", "NLP", "Web Development"],
      problem:
        "Automating essay evaluation at scale for scholarship screening.",
      images: ["checkgbf/1.png"],
      type: "web",
    },
  ]
  