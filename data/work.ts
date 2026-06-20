export type WorkItem = {
  title: string;
  summary: string;
  screenshots: string[];
  links: Array<{ label: string; url: string }>;
  logo?: string;
  order: number;
};

export const workItems: WorkItem[] = [
  {
    title: "TechVanta Labs",
    summary: "",
    screenshots: [],
    logo: "/company-logos/techvanta-logo-tight.png",
    links: [],
    order: 1,
  },
];
