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
    logo: "/company-logos/techvanta-logo-v3.jpeg",
    links: [
      {
        label: "Visit Site",
        url: "https://techvantalabs.com/",
      },
    ],
    order: 1,
  },
];
