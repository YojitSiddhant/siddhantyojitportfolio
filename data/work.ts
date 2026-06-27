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
  {
    title: "Selco Lift",
    summary: "",
    screenshots: [],
    logo: "/company-logos/selco-lift-logo.webp",
    links: [
      {
        label: "Visit Site",
        url: "https://selcolift.com/",
      },
    ],
    order: 2,
  },
  {
    title: "Araq",
    summary: "",
    screenshots: [],
    logo: "/company-logos/araq-logo-black.png",
    links: [
      {
        label: "Visit Site",
        url: "https://araq.techvantalabs.com/",
      },
    ],
    order: 3,
  },
  {
    title: "Dainik Bhaskar",
    summary: "",
    screenshots: [],
    logo: "/company-logos/dainik-bhaskar-genius-hunt-2026.jpeg",
    links: [
      {
        label: "Visit Site",
        url: "https://dblms.techvantalabs.com/",
      },
    ],
    order: 4,
  },
  {
    title: "MyMeet",
    summary: "",
    screenshots: [],
    logo: "/company-logos/my-meet.png",
    links: [
      {
        label: "Visit Site",
        url: "https://mymeet.techvantalabs.com/",
      },
    ],
    order: 5,
  },
  {
    title: "TicketDesk24",
    summary: "",
    screenshots: [],
    logo: "/company-logos/ticketdesk24.png",
    links: [
      {
        label: "Visit Site",
        url: "https://ticketdesk24.com/about",
      },
    ],
    order: 6,
  },
];
