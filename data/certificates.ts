export type CertificateItem = {
  title: string;
  issuer: string;
  logo: string;
  order: number;
};

export const certificates: CertificateItem[] = [
  {
    title: "Python Programming",
    issuer: "New Horizon College",
    logo: "/company-logos/nhcm-logo.jpeg",
    order: 1,
  },
  {
    title: "Machine Learning",
    issuer: "New Horizon College",
    logo: "/company-logos/nhcm-logo.jpeg",
    order: 2,
  },
  {
    title: "Software Testing",
    issuer: "Alpha Tech Academy",
    logo: "/company-logos/atlas-logo.png",
    order: 3,
  },
  {
    title: "Data Visualization with Power BI",
    issuer: "Great Learning Academy",
    logo: "/company-logos/great-learning-logo.png",
    order: 4,
  },
];
