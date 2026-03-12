export type ProjectCategory = string;

export type Project = {
  id: string;
  title: string;
  description: strong;
  tagline: string;
  category: ProjectCategory;
  problem: string;
  solution: string;
  tech: string[];
  image: string;
  screenshots?: string[]
  github?: string;
  live?: string;
  learnings: string[];
  overview?: string;
  fullDetails?: string[];
  privateContent?: boolean;
};

export {};