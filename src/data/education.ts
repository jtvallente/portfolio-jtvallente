export type Education = {
    school: string
    degree?: string
    location: string
    year: string
    honors: string[]
  }
  
  export const education: Education[] = [
    {
      school: "University of the Philippines Los Baños",
      degree: "BS Computer Science",
      location: "Los Baños, Laguna",
      year: "2025",
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
      honors: ["With High Honors", "Top 1 ICT Strand", "Top 4 Overall"],
    },
    {
      school: "San Vicente National High School",
      location: "Panabo City, Davao del Norte",
      year: "2019",
      honors: ["Valedictorian", "Outstanding Performance in ICT"],
    },
    {
      school: "San Vicente Elementary School",
      location: "Panabo City, Davao del Norte",
      year: "2015",
      honors: ["Valedictorian"],
    },
  ]
  