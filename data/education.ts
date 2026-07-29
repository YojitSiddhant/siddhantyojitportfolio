export type EducationItem = {
  institute: string;
  degree: string;
  duration: string;
  description?: string;
  logo: string;
};

export const education: EducationItem[] = [
  {
    institute: "PES University",
    degree: "Master of Computer Applications (MCA)",
    duration: "2024 - 2026",
    logo: "/company-logos/pes-logo.webp",
  },
  {
    institute: "New Horizon College",
    degree: "Bachelor of Computer Applications (BCA)",
    duration: "2020 - 2023",
    logo: "/company-logos/nhcm-logo.jpeg",
  },
];
