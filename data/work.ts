export type WorkItem = {
  title: string;
  summary: string;
  screenshots: string[];
  links: Array<{ label: string; url: string }>;
  order: number;
};

export const workItems: WorkItem[] = [];
