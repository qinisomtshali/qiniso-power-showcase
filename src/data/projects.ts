export interface FeaturedProject {
  id: string;
  title: string;
  category: string;
  summary: string;
  technologies: string[];
  features: string[];
  liveUrl: string;
  domain: string;
  /** Tall scroll-through capture of the live site (used in the browser frame). */
  image: string;
  theme: { bg: string; accent: string };
}

export interface ListedProject {
  id: string;
  title: string;
  summary: string;
  technologies: string[];
  href: string;
  earlier?: boolean;
}

export const FEATURED_PROJECTS: FeaturedProject[] = [
  {
    id: "hearconnect",
    title: "HearConnect 2.0",
    category: "Healthcare platform",
    summary:
      "The redesigned public platform for HearConnect, South Africa's audiology benefit manager — one site serving patients, audiologists and medical schemes across a network of 700+ contracted audiologists and 1.3M+ covered lives.",
    technologies: ["React 19", "Vite", "React Router", "GSAP", "Three.js", "Leaflet", "Azure Static Web Apps"],
    features: [
      "Map-based provider finder for 700+ audiologists",
      "Separate journeys for patients, audiologists & schemes",
      "Free online hearing screener & MDX resource library",
      "Prerendered routes for SEO & POPIA-compliant consent",
    ],
    liveUrl: "https://www.hearconnect.co.za/",
    domain: "hearconnect.co.za",
    image: "/Images/projects/hearconnect-long.webp",
    theme: { bg: "#06201c", accent: "#1fd6a8" },
  },
  {
    id: "threepointoh",
    title: "THREEPOINTOH",
    category: "Company website",
    summary:
      "Company website for a Gauteng-based technology company building configurable software platforms for healthcare and other regulated operations — presenting its solutions, services and product families through an operations-console visual identity.",
    technologies: ["React", "Vite", "React Router", "Responsive Design", "Accessibility"],
    features: [
      "Scroll-driven hero with illustrative product UI",
      "Solutions, services and product-family structure",
      "Dark, mono-typographic console identity",
      "Skip links & reduced-motion support",
    ],
    liveUrl: "https://3oh.tech/",
    domain: "3oh.tech",
    image: "/Images/projects/threepointoh-long.webp",
    theme: { bg: "#160c05", accent: "#f4a261" },
  },
  {
    id: "ns-lushozi",
    title: "NS Lushozi",
    category: "Practice website",
    summary:
      "A calm, trust-first website for a registered private social worker offering confidential online and in-person psycho-social support. Credentials, fees and FAQs sit up front so reaching out feels safe, with booking one step away.",
    technologies: ["React", "TypeScript", "Vite", "Tailwind CSS", "Setmore Booking", "WhatsApp", "JSON-LD SEO"],
    features: [
      "Online booking via Setmore & WhatsApp enquiry",
      "\"Quick exit\" button for visitors who need privacy",
      "Eight services with who-it's-for detail, fees & FAQs",
      "Structured data for local search",
    ],
    liveUrl: "https://nslushozi.co.za/",
    domain: "nslushozi.co.za",
    image: "/Images/projects/ns-lushozi-long.webp",
    theme: { bg: "#27171a", accent: "#eaa5ad" },
  },
  {
    id: "bongiwe",
    title: "Bongiwe.M",
    category: "Practice website",
    summary:
      "Website for a registered private social worker in Durban offering counselling for individuals, couples and families, online or in person. Warm, accessible design with a guided \"how it works\" journey, transparent fees and integrated booking.",
    technologies: ["React", "TypeScript", "Vite", "Setmore Booking", "WhatsApp", "POPIA Consent"],
    features: [
      "Setmore booking widget & WhatsApp enquiries",
      "Guided first-session journey, fees and FAQ",
      "POPIA-compliant cookie consent & privacy policy",
      "Structured data & social profiles for discoverability",
    ],
    liveUrl: "https://bongiwemprivatesw.co.za/",
    domain: "bongiwemprivatesw.co.za",
    image: "/Images/projects/bongiwe-mkhize-long.webp",
    theme: { bg: "#141a10", accent: "#b4c46e" },
  },
];

export const MORE_PROJECTS: ListedProject[] = [
  {
    id: "zaziedu",
    title: "ZaziEdu — SA University Course Finder",
    summary:
      "Full-stack platform helping South African students discover universities, courses and bursaries. APS score matching and a live database of 1,560+ courses across 26 universities — 450+ active users.",
    technologies: ["React", "Supabase", "PostgreSQL", "TypeScript"],
    href: "https://github.com/qinisomtshali",
  },
  {
    id: "zarflow",
    title: "ZARFlow — Personal Finance Tracker",
    summary:
      "Personal finance platform built for South Africans: income, expenses, budgets, savings goals, crypto and debt — with gamification, leaderboards and a mobile app on the roadmap.",
    technologies: ["React", "TypeScript", "Supabase", "Recharts"],
    href: "https://github.com/qinisomtshali",
  },
  {
    id: "findoc",
    title: "FinDoc Brain — AI Financial Document Q&A",
    summary:
      "RAG system for interrogating annual reports and loan agreements in plain English. PDF ingestion, vector embeddings, semantic retrieval and a FastAPI backend, built from scratch.",
    technologies: ["Python", "OpenAI", "Qdrant", "FastAPI", "PyMuPDF"],
    href: "https://github.com/qinisomtshali",
  },
  {
    id: "hr-leave",
    title: "HR Leave Request Management App",
    summary:
      "Leave management with role-based access, automated approval workflows, sick-note validation and detailed audit logging.",
    technologies: ["Power Apps", "SharePoint", "Power Automate", "Dataverse"],
    href: "https://github.com/qinisomtshali/Leave-Request-App",
    earlier: true,
  },
  {
    id: "payment-qa",
    title: "Payment QA Flow",
    summary:
      "Automated document processing that tags SharePoint files with metadata and tracks approval status for real-world QA processes.",
    technologies: ["Power Automate", "SharePoint", "Power Apps", "Office 365"],
    href: "https://github.com/qinisomtshali/Leave-Request-App",
    earlier: true,
  },
  {
    id: "d365",
    title: "D365 Sales App Extensions",
    summary:
      "Custom workflows and forms on Dynamics 365 for client tracking, automated onboarding and sales pipeline management.",
    technologies: ["Dynamics 365", "Power Platform", "Power Automate", "Power Apps"],
    href: "https://github.com/qinisomtshali/Leave-Request-App",
    earlier: true,
  },
];
