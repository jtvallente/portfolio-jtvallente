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
  
    foundationalKnowledge: string[]
  
    experience: Array<{
      role: string
      company: string
      timeframe?: string
      location?: string
      type?: string
      highlights: string[]
    }>
  
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
  
    freelance: {
      highlights: string[]
    }
  
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
        "Magna Cum Laude Computer Science graduate specializing in AI-driven systems, NLP, and full-stack web development. Builds production-ready applications from data ingestion and model development to deployment and user-facing interfaces. Experienced in LLM integration, intelligent automation, ETL/data pipelines, and scalable backend architecture, with a strong foundation in software engineering and research-to-production execution.",
      longBio:
        "James started web development at age 13 through web design competitions, beginning with HTML and CSS before expanding into JavaScript. He pursued ICT during high school and built his first software application at 18 using Java and Oracle SQL for an inventory system. He strengthened fundamentals through online learning (e.g., W3Schools, SoloLearn) and CS courses (including Harvard CS50). He entered the University of the Philippines Los Baños in 2021 as an Applied Physics student, later shifting to Computer Science. He completed BSCS requirements with Magna Cum Laude standing and focuses on building reliable, data-driven systems that blend software engineering with AI/ML and NLP.",
      honors: [
        "Magna Cum Laude (BS Computer Science, University of the Philippines Los Baños)",
        "Consistent Dean’s List / President’s List (College/University Scholar)",
        "Nominated twice to Phi Kappa Phi International Honor Society",
        "Nominee, Honor Society of the Philippines (based on top students in the college)",
      ],
    },
  
    // From your PDF's FOUNDATIONAL KNOWLEDGE section
    foundationalKnowledge: [
      "Discrete Math",
      "Mathematical Computing",
      "Calculus",
      "Statistical Methods",
      "Chemistry",
      "Electromagnetism",
      "Mathematical Methods in Physics",
      "Newtonian Mechanics",
      "Programming Fundamentals",
      "Object-Oriented Programming (OOP)",
      "Web Programming",
      "Data Structures",
      "Logic Design and Digital Computer Circuits",
      "Numerical and Symbolic Computation",
      "Software Engineering",
      "File Processing and Database Systems",
      "Computer Organization and Machine Level Programming",
      "Design and Analysis of Algorithms",
      "Mobile Computing",
      "Design and Implementation of Programming Languages",
      "Operating Systems",
      "Computer Architecture",
      "Artificial Intelligence",
      "Digital Image Processing",
      "Data Communications & Networking",
      "Automata and Language Theory",
      "Human-Computer Interaction",
      "Introduction to Parallel Computing",
    ],
  
    experience: [
      {
        role: "Lecturer / Guest Lecturer / Resource Speaker",
        company: "ACES Polytechnic College",
        timeframe: "Jan 2026",
        highlights: [
          "Invited as a Guest Lecturer / Resource Speaker for Competency-Based Review 2 (CBR2) under the BTVTeD program.",
          "Delivered lectures and facilitated applied activities on Teaching ICT as an Introductory Course, covering ICT foundations, ethical and safe technology use, and professional handling of ICT tools/equipment aligned with PRC standards.",
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
          "Co-head for Jeopardy Committee event for the 42nd Computer Science Week; built a secure live scoring web app and created email automations for registrants.",
          "Participated in hackathons, in-org coding reviews, and software development projects.",
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
          "Designed marketing campaigns; handled invoicing, inventory management, and platform/courier issue resolution.",
        ],
      },
    ],
  
    freelance: {
      highlights: [
        "Built a mobile app using Dart (Flutter) to improve a company’s business operations.",
        "Worked as a graphic designer for logos, posters, creatives, and banners.",
        "Social Media Content Creator (Big Boss Smokery; Rehab Works) in 2021.",
        "Technical writing projects.",
      ],
    },
  
    projects: [
        {
          name: "iskStress: Hybrid Stress Detection System",
          category: "academic",
          summary:
            "End-to-end NLP pipeline for Taglish Reddit data: scraping, preprocessing, automated analysis, model evaluation, and a deployed web platform for real-time stress visualization.",
          tags: ["NLP", "BERT", "Model Evaluation", "Web Platform", "Data Pipeline"],
          stack: ["Python", "NLP", "BERT", "Web"],
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
          name: "HarvestHub",
          category: "academic",
          summary:
            "MERN website to help streamline farm-to-table initiatives by the Kadiwa.",
          tags: ["MERN", "Web", "Product"],
          stack: ["MongoDB", "Express.js", "React", "Node.js"],
        },
        {
          name: "BRICS (Booking & Reservation System for ICS)",
          category: "academic",
          summary:
            "MERN + Tailwind web app; served as frontend developer and UI/UX designer.",
          tags: ["Frontend", "UI/UX", "MERN", "Tailwind"],
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
          tags: ["Interpreter", "Python", "PL"],
          stack: ["Python"],
        },
        {
          name: "SolveXpress",
          category: "academic",
          summary:
            "Intelligent Diet Problem Solver built in R with Shiny UI using numerical and symbolic computations.",
          tags: ["R", "Optimization", "Shiny", "Numerical"],
          stack: ["R", "Shiny"],
        },
        {
          name: "Food Information System",
          category: "academic",
          summary:
            "Python app for recording food reviews and items from establishments using SQL storage.",
          tags: ["Python", "SQL", "CRUD"],
          stack: ["Python", "SQL"],
        },
        {
          name: "Sokoban",
          category: "academic",
          summary: "Terminal-based Sokoban-inspired game built in Python.",
          tags: ["Python", "Game"],
          stack: ["Python"],
        },
        {
          name: "COURSDLE",
          category: "academic",
          summary: "Terminal-based Wordle-inspired game built in Python.",
          tags: ["Python", "Game"],
          stack: ["Python"],
        },
        {
          name: "MLBB Unreleased",
          category: "academic",
          summary: "MLBB-inspired desktop game built in Java.",
          tags: ["Java", "Game"],
          stack: ["Java"],
        },
        {
          name: "Halina (Figma Prototype)",
          category: "academic",
          summary:
            "Mobile app prototype built in Figma to help UPLB students earn points by exploring campus.",
          tags: ["Figma", "UI/UX", "Prototype"],
          stack: ["Figma"],
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
      frontend: ["React", "Tailwind CSS", "Bootstrap", "HTML", "CSS", "UI/UX", "Responsive Design", "SEO"],
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
  