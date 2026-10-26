export interface SkillGroup {
  title: string;
  items: string[];
}

export const SKILL_GROUPS: SkillGroup[] = [
  {
    title: "Frontend",
    items: ["React", "TypeScript", "Vite", "React Router", "Tailwind CSS", "Framer Motion", "GSAP", "Three.js", "Leaflet", "Chart.js / Recharts"],
  },
  {
    title: "Backend & Data",
    items: ["Node.js", "Python", "FastAPI", "Blazor / ASP.NET", "REST APIs", "Azure Functions", "Supabase", "PostgreSQL"],
  },
  {
    title: "Cloud & DevOps",
    items: ["Microsoft Azure", "Azure Static Web Apps", "Azure Active Directory", "Azure DevOps", "Git & GitHub", "Vercel", "PowerShell", "Visual Studio Code"],
  },
  {
    title: "AI & Data",
    items: ["OpenAI API", "Qdrant", "RAG / Vector Search", "PyMuPDF", "tiktoken", "NumPy"],
  },
  {
    title: "Microsoft & Low-Code",
    items: ["Power Apps", "Power Automate", "SharePoint", "Dataverse", "Dynamics 365", "Power BI", "Office 365", "Power Platform CLI"],
  },
  {
    title: "Creative & Multimedia",
    items: ["Unity 3D", "Blender", "Adobe Creative Suite", "VR Development", "Game Design"],
  },
];

export const MARQUEE_TOP = ["React", "TypeScript", "Node.js", "Python", "FastAPI", "Azure", "Supabase", "PostgreSQL"];
export const MARQUEE_BOTTOM = ["GSAP", "Three.js", "Vite", "Tailwind", "Dynamics 365", "Power Platform", "RAG", "Unity"];
