export interface Role {
  year: string;
  range: string;
  title: string;
  company: string;
  location: string;
  type: string;
  description: string;
  achievements: string[];
  logo: string;
  current?: boolean;
}

export const EXPERIENCE: Role[] = [
  {
    year: "2026",
    range: "Mar 2026 — Present",
    title: "Junior Software Engineer & Application Support",
    company: "HearConnect SA",
    location: "South Africa",
    type: "Full-time",
    description:
      "Building, enhancing, and maintaining the company's primary CRM system and integrated applications across the Microsoft technology stack. Delivering full-stack internal systems from requirements through to deployment, while providing first- and second-line application support across Microsoft environments and third-party platforms.",
    achievements: [
      "CRM development & maintenance across the Microsoft stack",
      "Built the HearConnect 2.0 website end to end — React 19, provider finder map, hearing screener, prerendered SEO",
      "First- and second-line application support & troubleshooting",
      "System performance monitoring and proactive issue resolution",
      "IT governance, data protection, and security protocol adherence",
      "User access management and internal user support",
    ],
    logo: "hearconnect.png",
    current: true,
  },
  {
    year: "2025",
    range: "Mar 2025 — Feb 2026",
    title: "Power Platform Developer Intern",
    company: "HearConnect",
    location: "South Africa",
    type: "Internship",
    description:
      "Building end-to-end business solutions using Power Apps, Power Automate, and SharePoint. Enhancing leave management and approval systems, integrating Microsoft services, and supporting digital transformation within the organization.",
    achievements: [
      "Built HearConnect leave management application",
      "Automated document processing workflows",
      "Implemented role-based access control systems",
      "Reduced manual processing time by 60%",
    ],
    logo: "hearconnect.png",
  },
  {
    year: "2024",
    range: "Jul 2024 — Dec 2025",
    title: "Power Platform Developer Trainee",
    company: "Mecer Inter-Ed",
    location: "South Africa",
    type: "Training",
    description:
      "Completed structured Microsoft PL-200, PL-400, MB-210 training. Built end-to-end low-code solutions using Power Apps, Dataverse, and Dynamics 365.",
    achievements: [
      "Completed Microsoft PL-200, PL-400, MB-210 certifications",
      "Developed custom business apps with Dataverse",
      "Built sales automation flows using Dynamics 365",
      "Gained hands-on experience with Power Platform architecture",
    ],
    logo: "mecer.png",
  },
  {
    year: "2023",
    range: "Feb 2023 — Jan 2024",
    title: "Machine Operator",
    company: "Ford Motor Company of Southern Africa",
    location: "South Africa",
    type: "Full-time",
    description:
      "Gained hands-on experience in the automotive manufacturing sector, operating industrial machinery with precision and adhering to strict quality and safety protocols. Contributed to streamlined production workflows and efficient reporting systems.",
    achievements: [
      "Maintained high quality standards",
      "Optimized production processes",
      "Contributed to safety initiatives",
      "Developed process improvement ideas",
    ],
    logo: "ford.png",
  },
  {
    year: "2022",
    range: "Jun 2022 — Dec 2022",
    title: "Multimedia Engineer Intern",
    company: "Mbula RND",
    location: "South Africa",
    type: "Internship",
    description:
      "Designed and developed an inclusive video game for the deaf community using Unity, C#, and Azure. Integrated multimedia elements and game mechanics to improve accessibility and promote digital inclusion.",
    achievements: [
      "Designed accessible video game using Unity and C#",
      "Integrated Azure cloud services",
      "Promoted inclusion for the deaf community",
      "Worked across multimedia teams for UX improvements",
    ],
    logo: "mbula.png",
  },
  {
    year: "2021",
    range: "Mar 2021 — May 2022",
    title: "Technical Lab Tutor",
    company: "Tshwane University of Technology",
    location: "South Africa",
    type: "Part-time",
    description:
      "Provided academic support in multimedia computing labs, mentoring students and facilitating practical sessions in animation, coding, and digital design. Developed strong foundations in education and technical communication.",
    achievements: [
      "Mentored 50+ students per semester",
      "Assisted with programming assignments",
      "Conducted lab sessions and tutorials",
      "Improved student success rates",
    ],
    logo: "tut.png",
  },
  {
    year: "2020",
    range: "Jan 2020 — Mar 2021",
    title: "VR Developer",
    company: "Go4IR",
    location: "South Africa",
    type: "Contract",
    description:
      "Created interactive virtual reality experiences using Unity3D and Blender. Contributed to educational tools using multimedia pipelines.",
    achievements: [
      "Developed VR applications for deaf learners",
      "Integrated sign language recognition",
      "Built Unity-based educational games",
      "Implemented Azure cloud integration",
    ],
    logo: "vr.png",
  },
];
