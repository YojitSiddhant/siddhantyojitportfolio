export type WorkItem = {
  title: string;
  summary: string;
  screenshots: string[];
  links: Array<{ label: string; url: string }>;
  order: number;
};

export const workItems: WorkItem[] = [
  {
    title: "TechVanta Labs",
    summary:
      "A designed website project for TechVanta Labs, focused on a clean product presentation and responsive layout.",
    screenshots: [],
    links: [
      {
        label: "Live Site",
        url: "https://techvantalabs.com/",
      },
    ],
    order: 1,
  },
];
