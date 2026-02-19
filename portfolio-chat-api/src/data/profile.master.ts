// src/data/profile.master.ts

export type Profile = {
    bio: {
      name: string
      nickname?: string
      title: string
      age: number
      location: string
      email: string
      links: {
        github: string
        linkedin: string
        projectsPage: string
      }
      degree: string
      graduationNote?: string
      summary: string
      longBio: string
      honors: string[]
    }
  
    // This represents your college + foundational coursework and foundations
    foundationalKnowledge: {
      csCoursework: string[]
      mathPhysicsCoursework: string[]
      otherFoundations: string[]
    }
  
    experience: Array<{
      role: string
      company: string
      timeframe?: string
      location?: string
      type?: string
      highlights: string[]
    }>
  
    freelance: {
      highlights: string[]
    }
  
    projects: Array<{
      name: string
      category: "academic" | "practicum" | "hackathon" | "personal" | "freelance"
      stack?: string[]
      summary: string
      tags: string[]
      links?: {
        live?: string
        repo?: string
        caseStudy?: string
      }
    }>
  
    research: Array<{
      title: string
      summary: string
      keywords: string[]
      metrics?: string[]
    }>
  
    skills: {
      toolsPlatforms: string[]
      backend: string[]
      frontend: string[]
      dataDatabases: string[]
      aiMlNlp: string[]
      automation: string[]
      devopsCloud: string[]
      languages: string[]
      misc: string[]
    }
  
    education: Array<{
      school: string
      degree: string
      years?: string
      honors?: string[]
      location?: string
    }>
  
    interests: string[]
  }
  
  export const profile: Profile = {
    bio: {
      name: "James Lourence T. Vallente",
      nickname: "Jims",
      title: "Software Engineer · AI, NLP & Data Systems",
      age: 23,
      location: "Cainta, Rizal, Philippines",
      email: "jameslourencevallente@gmail.com",
      links: {
        github: "https://github.com/jtvallente",
        linkedin: "https://linkedin.com/in/jtvallente",
        projectsPage: "https://jtvallente.github.io/portfolio-jtvallente/projects",
      },
      degree: "Bachelor of Science in Computer Science (2022–2025)",
      graduationNote:
        "Completed academic requirements in December 2025; awaiting July 2026 graduation (First Semester graduate).",
      summary:
        "Magna Cum Laude BS Computer Science graduate focused on full-stack engineering, AI/NLP, and automation. Builds end-to-end systems—from data collection and pipelines to production-ready web apps and LLM integrations—while applying strong fundamentals in software engineering, databases, and systems.",
      longBio:
        "James grew up in Davao and moved to Manila at age 17 to pursue studies. He was Valedictorian in elementary and graduated with High Honors in junior and senior high school (ICT strand). He started web development at age 13 through web design competitions (HTML/CSS), later exploring JavaScript. At 18, he built a Java + Oracle SQL inventory system for his senior high school’s tools and equipment. He strengthened fundamentals through self-study and online courses (e.g., W3Schools, SoloLearn, Harvard CS50 and Intro AI). He entered the University of the Philippines Los Baños in 2021 as an Applied Physics student and later shifted to Computer Science. He completed BSCS requirements in December 2025 with Magna Cum Laude standing and continues building reliable, data-driven systems that blend software engineering with AI/ML and NLP.",
      honors: [
        "Magna Cum Laude (BS Computer Science, University of the Philippines Los Baños)",
        "Consistent Dean’s List / President’s List (College/University Scholar)",
        "Nominated twice to Phi Kappa Phi International Honor Society",
        "Nominee, Honor Society of the Philippines (based on top students in the college)",
      ],
    },
  
    foundationalKnowledge: {
      // CS/IT coursework + core CS foundations (from your PDF list)
      csCoursework: [
        "Programming Fundamentals",
        "Object-Oriented Programming (OOP)",
        "Web Programming",
        "Data Structures",
        "File Processing and Database Systems",
        "Software Engineering",
        "Logic Design and Digital Computer Circuits",
        "Computer Organization and Machine Level Programming",
        "Computer Architecture",
        "Operating Systems",
        "Data Communications & Networking",
        "Design and Analysis of Algorithms",
        "Automata and Language Theory",
        "Design and Implementation of Programming Languages",
        "Human-Computer Interaction",
        "Mobile Computing",
        "Introduction to Parallel Computing",
        "Artificial Intelligence",
        "Digital Image Processing",
      ],
      // Math/physics foundations (also from your PDF list)
      mathPhysicsCoursework: [
        "Discrete Math",
        "Mathematical Computing",
        "Calculus",
        "Statistical Methods",
        "Mathematical Methods in Physics",
        "Newtonian Mechanics",
        "Electromagnetism",
        "Chemistry",
        "Numerical and Symbolic Computation",
      ],
      // Extra foundation framing that helps retrieval
      otherFoundations: [
        "Algorithmic thinking and complexity analysis",
        "Database fundamentals and SQL-based systems",
        "Systems thinking (architecture, OS, networking)",
        "Applied research methods and evaluation metrics (accuracy, precision, recall, F1-score)",
      ],
    },
  
    experience: [
      {
        role: "Lecturer / Guest Lecturer / Resource Speaker",
        company: "ACES Polytechnic College",
        timeframe: "Jan 2026",
        highlights: [
          "Invited as a Guest Lecturer / Resource Speaker for Competency-Based Review 2 (CBR2) under the Bachelor of Technical-Vocational Teacher Education (BTVTeD) program.",
          "Delivered lectures and facilitated applied learning activities on Teaching ICT as an Introductory Course, covering ICT foundations, ethical and safe technology use, and professional handling of ICT tools and equipment aligned with PRC standards.",
        ],
      },
      {
        role: "Resident Member",
        company: "UPLB Computer Science Society",
        highlights: [
          "Member, Publication Committee.",
          "Led the Ad Hoc Committee for UPLB COSS in the UPLB February Fair 2025, coordinating event logistics and execution.",
          "Created content as a MicroCOSSm Committee member for the organization’s newsletter to enhance engagement.",
          "Collaborated with Publication and Creatives Committee for the 41st Computer Science Week.",
          "Co-head for Jeopardy Committee event for the 42nd Computer Science Week; built a secure live scoring web app and created email automations for registrants for seamless event preparation and announcements.",
          "Joined hackathons, in-org coding reviews, and software development projects.",
        ],
      },
      {
        role: "Software Engineer & Team Lead Intern",
        company: "Limitless Lab",
        highlights: [
          "Led a development team to build an AI-powered web platform with automated data ingestion, API-based processing, and chatbot integration using LLM APIs.",
          "Designed and validated automated data flows between backend services, AI models, and frontend components.",
          "Coordinated tasks, made key technical decisions, and delivered features under tight timelines.",
          "Participated in code reviews and system discussions with mentors.",
          "Assisted in deploying backend services using Docker for local and cloud-based testing.",
          "Documented automation logic, data flows, and system behavior for maintainability and handover.",
        ],
      },
      {
        role: "Digital Marketing Assistant",
        company: "HTBIZ Law",
        highlights: [
          "Designed and optimized landing pages, sales funnels, and custom domains using Squarespace, Kajabi, and ClickFunnels.",
          "Created marketing assets including video edits, transcriptions, and Canva designs for campaigns and social media.",
          "Automated email campaigns and integrations using Keap (Infusionsoft) and Zapier to improve workflow efficiency.",
        ],
      },
      {
        role: "Store Manager",
        company: "Avi’s Tiny Home",
        highlights: [
          "Managed e-commerce operations: product listings, order fulfillment, sales tracking, and customer support.",
          "Designed and executed marketing campaigns; handled invoicing, inventory management, and resolved issues with platforms and couriers.",
        ],
      },
    ],
  
    freelance: {
      highlights: [
        "Built a mobile app using Dart (Flutter) to improve a company’s business operations.",
        "Hired as a graphic designer for logos, posters, creatives, and banners.",
        "Social Media Content Creator (Big Boss Smokery; Rehab Works) in 2021.",
        "Technical writing projects.",
      ],
    },
  
    projects: [
      {
        name: "Sokoban",
        category: "academic",
        summary: "Terminal-based Sokoban-inspired game built in Python.",
        tags: ["Python", "Game", "Terminal"],
        stack: ["Python"],
      },
      {
        name: "COURSDLE",
        category: "academic",
        summary: "Terminal-based Wordle-inspired game built in Python.",
        tags: ["Python", "Game", "Terminal"],
        stack: ["Python"],
      },
      {
        name: "MLBB Unreleased",
        category: "academic",
        summary: "MLBB-inspired desktop game built in Java.",
        tags: ["Java", "Game", "Desktop"],
        stack: ["Java"],
      },
      {
        name: "HarvestHub",
        category: "academic",
        summary: "MERN website to streamline farm-to-table initiatives by the Kadiwa.",
        tags: ["MERN", "Web", "Product"],
        stack: ["MongoDB", "Express.js", "React", "Node.js"],
      },
      {
        name: "SolveXpress",
        category: "academic",
        summary:
          "Intelligent Diet Problem Solver built in R with Shiny UI using numerical and symbolic computations.",
        tags: ["R", "Shiny", "Optimization", "Numerical"],
        stack: ["R", "Shiny"],
      },
      {
        name: "Food Information System",
        category: "academic",
        summary:
          "Python-based app for recording food reviews/items from establishments using SQL storage.",
        tags: ["Python", "SQL", "CRUD"],
        stack: ["Python", "SQL"],
      },
      {
        name: "BRICS (Booking & Reservation System for ICS)",
        category: "academic",
        summary: "MERN + Tailwind web app; served as frontend developer and UI/UX designer.",
        tags: ["MERN", "Tailwind", "UI/UX", "Frontend"],
        stack: ["React", "Node.js", "MongoDB", "Tailwind CSS"],
      },
      {
        name: "Elbigay",
        category: "academic",
        summary:
          "Flutter mobile app to streamline donation drives and initiatives in Los Baños.",
        tags: ["Flutter", "Mobile", "Product"],
        stack: ["Dart", "Flutter"],
      },
      {
        name: "LOLCode Interpreter",
        category: "academic",
        summary:
          "Python-based interpreter for the general-purpose programming language LOLCODE.",
        tags: ["Interpreter", "Python", "Programming Languages"],
        stack: ["Python"],
      },
      {
        name: "Halina (Figma Prototype)",
        category: "academic",
        summary:
          "Mobile app prototype built in Figma to help UPLB students earn points by exploring campus.",
        tags: ["Figma", "UI/UX", "Prototype"],
        stack: ["Figma"],
      },
      {
        name: "Limitless Funds",
        category: "practicum",
        summary:
          "AI-powered web app helping NGOs find grants and funding opportunities; served as software engineer and team lead during practicum.",
        tags: ["LLM", "Automation", "Web", "Data Ingestion"],
        stack: ["React", "Node.js", "APIs", "LLM APIs"],
      },
      {
        name: "CheckGBF",
        category: "hackathon",
        summary: "AI-powered essay checker web app built during a 16-hour hackathon.",
        tags: ["AI", "Web App", "Hackathon"],
      },
      {
        name: "iskStress: Hybrid Stress Detection System",
        category: "academic",
        summary:
          "End-to-end NLP pipeline for Taglish Reddit data: scraping, preprocessing, automated analysis, model evaluation, and a deployed web platform for real-time stress visualization.",
        tags: ["NLP", "BERT", "Model Evaluation", "Web Platform", "Data Pipeline"],
        stack: ["Python", "NLP", "BERT", "Web"],
      },
    ],
  
    research: [
      {
        title:
          "iskStress: A Hybrid System for Stress Detection in r/peyups using Fine-Tuned MentalBERT and an Enhanced Lexicon-Based Tool",
        summary:
          "Developed a hybrid stress detection framework for Taglish social media posts by integrating a fine-tuned transformer model (MentalBERT) with an enhanced lexicon-based tool derived from TensiStrength. Built and annotated a dataset of 2,300 posts from Filipino academic subreddits, evaluated model performance, and deployed a web platform for real-time stress trend visualization.",
        keywords: ["NLP", "MentalBERT", "Lexicon-based", "Taglish", "Stress Detection"],
        metrics: ["F1-score: 0.795", "Cohen’s Kappa: 0.658", "Lexicon accuracy improvement: +7%"],
      },
    ],
  
    education: [
      {
        school: "University of the Philippines Los Baños",
        degree: "BS Computer Science",
        years: "2022–2025",
        honors: ["Magna Cum Laude"],
        location: "Los Baños, Laguna",
      },
    ],
  
    skills: {
      toolsPlatforms: [
        "GitHub",
        "Vercel",
        "Render",
        "MongoDB Atlas",
        "Supabase",
        "MySQL",
        "PostgreSQL",
        "Firebase",
        "Postman",
        "Keap (Infusionsoft)",
        "Zapier",
        "WordPress (Bricks, DIVI, Elementor)",
        "Squarespace",
        "ClickFunnels",
        "Kajabi",
        "Canva",
        "Photoshop",
        "Google Colab",
        "HuggingFace",
      ],
      backend: ["Node.js", "Express.js", "REST API", "API Integration", "JSON"],
      frontend: [
        "React",
        "Tailwind CSS",
        "Bootstrap",
        "HTML",
        "CSS",
        "UI/UX",
        "Responsive Design",
        "SEO",
      ],
      dataDatabases: ["MySQL", "PostgreSQL", "SQL", "Data Pipelines (ETL Workflow)", "Data Scraping"],
      aiMlNlp: [
        "AI/ML",
        "LLM",
        "NLP",
        "BERT",
        "Model Evaluation (Accuracy, F1-Score, Recall, Precision)",
        "GPU-powered Model Training and Fine-tuning",
      ],
      automation: ["Workflow Automation"],
      devopsCloud: ["Docker (Basic)", "AWS", "Linux (Ubuntu)"],
      languages: ["Python", "JavaScript", "Java", "C", "C++", "R"],
      misc: [
        "Technical Documentation",
        "User-testing",
        "Prompt-driven coding (ChatGPT, GitHub Copilot, Lovable AI)",
        "Exposure to Erlang, Rust, Prolog, SCHEME, and COBOL",
      ],
    },
  
    interests: [
      "Podcasts",
      "Aviation and plane-spotting",
      "Reading books",
      "Coffee, tea, and matcha",
      "Digital marketing and content creation",
      "Science and technology",
      "Hiking and nature spots",
      "Cooking",
      "Video games (Roblox, Mobile Legends, Genshin Impact)",
      "Dancing",
      "Writing (technical and academic)",
    ],
  }