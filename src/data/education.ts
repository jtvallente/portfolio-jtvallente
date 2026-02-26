export type Education = {
  school: string
  degree?: string
  location: string
  year: string
  honors: string[]
  logo?: string
}

export const education: Education[] = [
  {
    school: "University of the Philippines Los Baños",
    degree: "BS Computer Science",
    location: "Los Baños, Laguna",
    year: "2025",
    logo: "logos/uplb.svg",
    honors: [
      "Magna Cum Laude",
      "Chancellor's & Dean's List Scholar",
      "Phi Kappa Phi Nominee",
      "Honor Society of the Philippines Nominee",
    ],
  },
  {
    school: "Taytay Senior High School",
    degree: "ICT Strand",
    location: "Taytay, Rizal",
    year: "2021",
    logo: "logos/edu-tshs.png",
    honors: ["With High Honors", "Top 1 ICT Strand", "Top 4 Overall"],
  },
  {
    school: "San Vicente National High School",
    location: "Panabo City, Davao del Norte",
    year: "2019",
    logo: "logos/svnhs.png",
    honors: ["Valedictorian", "Outstanding Performance in ICT"],
  },
  {
    school: "San Vicente Elementary School",
    location: "Panabo City, Davao del Norte",
    year: "2015",
    logo: "logos/edu-sves.png",
    honors: ["Valedictorian"],
  },
]
  
