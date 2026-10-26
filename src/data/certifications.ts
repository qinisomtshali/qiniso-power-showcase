export interface Certification {
  code: string;
  name: string;
  issuer: string;
  year: string;
  description: string;
  badge: string;
  verifyUrl: string;
}

export const CERTIFICATIONS: Certification[] = [
  {
    code: "PL-400",
    name: "Power Platform Developer",
    issuer: "Microsoft",
    year: "2024",
    description: "Advanced development capabilities in Power Platform",
    badge: "/Images/certifications/associate.png",
    verifyUrl:
      "https://learn.microsoft.com/api/credentials/share/en-us/QINISOMtshali-2486/40EC2E8886132498?sharingId=BA211BD8093A5B2",
  },
  {
    code: "PL-200",
    name: "Power Platform Functional Consultant",
    issuer: "Microsoft",
    year: "2024",
    description: "Business process consulting and solution design",
    badge: "/Images/certifications/associate.png",
    verifyUrl:
      "https://learn.microsoft.com/api/credentials/share/en-us/QINISOMtshali-2486/B7DCC6C56D3BD577?sharingId=BA211BD8093A5B2",
  },
  {
    code: "MB-210",
    name: "Dynamics 365 Sales",
    issuer: "Microsoft",
    year: "2024",
    description: "Sales automation and customer relationship management",
    badge: "/Images/certifications/associate.png",
    verifyUrl:
      "https://learn.microsoft.com/api/credentials/share/en-us/QINISOMtshali-2486/4C9B90542B2D3AF4?sharingId=BA211BD8093A5B2",
  },
  {
    code: "AZ-900",
    name: "Azure Fundamentals",
    issuer: "Microsoft",
    year: "2022",
    description: "Cloud computing fundamentals and Azure services",
    badge: "/Images/certifications/fundamentals.png",
    verifyUrl:
      "https://learn.microsoft.com/api/credentials/share/en-us/QINISOMtshali-2486/D2CE194F303186CF?sharingId=BA211BD8093A5B2",
  },
];

export const ADDITIONAL_CERTIFICATIONS = [
  { label: "Kubernetes Fundamentals", url: "https://www.credly.com/badges/2d32d462-41b7-40a2-8321-31081eb8c69e/" },
  { label: "DevOps Principles", url: "https://www.credly.com/badges/501ff19b-9ea8-40f5-8bad-fc9992962230/" },
  { label: "IBM Cloud Computing Fundamentals", url: "https://www.credly.com/badges/7409f2ed-f59d-4163-bb9d-b17cebc63e3c/" },
];
