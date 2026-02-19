export interface Experience {
    role: string
    company: string
    location: string
    type?: "On-site" | "Remote" | "Hybrid"
    start: string
    end: string
    bullets: string[]
    logo?: string
    liveWebsite?: string
  }
  
  export const experiences: Experience[] = [
    {
      role: "Lecturer",
      company: "ACES Polytechnic College",
      location: "Davao del Norte, Philippines",
      type: "On-site",
      start: "Jan 2026",
      end: "Jan 2026",
      logo: "logos/aces-college.webp",
      bullets: [
        "Invited as a Guest Lecturer / Resource Speaker for the BTVTeD Competency-Based Review 2 (CBR2).",
        "Delivered lectures on Teaching ICT, covering ICT fundamentals, ethics, and safe technology use.",
        "Facilitated applied learning activities aligned with PRC standards for ICT tools and equipment."
      ],
    },
    {
      role: "Resident Member",
      company: "UPLB Computer Science Society (UPLB COSS)",
      location: "Laguna, Philippines",
      type: "Hybrid",
      start: "Sept 2024",
      end: "Dec 2025",
      logo: "logos/uplb-coss.png",
      bullets: [
        "Member of the UPLB COSS Publication Committee.",
        "Led the Ad Hoc Committee for UPLB COSS during the UPLB February Fair 2025, coordinating event logistics and execution.",
        "Created engaging content as a MicroCOSSm Committee member, contributing to the organization's newsletter.",
        "Collaborated with Publication and Creatives Committees for the 41st Computer Science Week."
      ],
    },
    {
      role: "Software Engineer Intern",
      company: "Limitless Lab",
      location: "Mandaluyong, Philippines",
      type: "Hybrid",
      start: "June 2025",
      end: "July 2025",
      logo: "logos/limitless-lab.png",
      bullets: [
        "Led a team developing an AI-powered grant-matching platform.",
        "Made key technical and architectural decisions for the system.",
        "Coordinated tasks, timelines, and progress updates within the team."
      ],
    },
    {
      role: "Virtual Assistant",
      company: "HTBIZ Law",
      location: "Maryland, USA",
      type: "Remote",
      start: "March 2023",
      end: "June 2024",
      logo: "logos/htbiz-law.png",
      bullets: [
        "Designed and optimized landing pages and sales funnels using Squarespace, Kajabi, and ClickFunnels.",
        "Created marketing assets including video edits, transcriptions, and Canva designs.",
        "Automated email campaigns and integrations using Keap and Zapier."
      ],
      liveWebsite: "https://www.htbizlaw.com/"
    },
    {
      role: "Online Store Manager",
      company: "Avi's Tiny Home",
      location: "Cainta, Rizal",
      type: "On-site",
      start: "May 2020",
      end: "August 2021",
      logo: "logos/avis-tiny-home.png",
      bullets: [
        "Managed e-commerce operations including product listings, order fulfillment, and customer support.",
        "Handled invoicing, inventory tracking, and sales reporting.",
        "Resolved platform and courier issues while executing marketing campaigns."
      ],
    },
  ]
  