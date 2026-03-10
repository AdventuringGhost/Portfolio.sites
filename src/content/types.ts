import type { BundledLanguage } from "shiki";

export interface Certification {
  name: string;
  issuer: string;
  badge: string; // Path to the badge image
  url: string; // URL to the certification verification
}

export interface Cta {
  text: string;
  href: string;
}

export interface Milestone {
  id: string;
  label: string;
  status: "Complete" | "In Progress" | "Planned";
  progress: number;
  summary: string;
  tickets?: {
    key: string;
    title: string;
    finishingComment?: string;
  }[];
}

export interface Project {
  slug: string;
  title: string;
  tagline?: string;
  summaryBullets: string[];
  cardVariant?: "primary" | "secondary" | "accent" | "ghost";
  overview: string;
  stack: string[];
  liveUrl?: string;
  codeUrl?: string;
  buttonText?: string;
  image?: string;
  architectureImage?: string;
  architectureImageCaption?: string;
  architecture?: {
    description: string;
    components: string[];
  };
  problem?: {
    title: string;
    summary: string;
    bullets: string[];
  };
  problemImage?: string;
  problemImageCaption?: string;
  solution?: {
    title: string;
    summary: string;
    bullets: string[];
  };
  solutionImage?: string;
  solutionImageCaption?: string;
  outcome?: {
    title: string;
    summary: string;
    bullets: string[];
  };
  outcomeImage?: string;
  outcomeImageCaption?: string;
  codeSample?: {
    language: BundledLanguage;
    title: string;
    snippet: string;
  };
  learnings?: {
    category: string;
    points: string[];
  }[];
  monitoring?: {
    title: string;
    description: string;
    visual?: "cost-analysis";
  }[];
  roadmap?: {
    milestones: Milestone[];
  };
  completionImage?: string;
  completionImageCaption?: string;
}

export interface SiteContent {
  hero: {
    title: string;
    subtitle: string;
    ctas: { primary: Cta; secondary: Cta; ghost: Cta };
  };
  nav: { label: string; href: string }[];
  certs: Certification[];
  projects: Project[];
  skills: { group: string; items: string[] }[];
  links: { [key: string]: string };
  about: {
    content: string;
    profileImage?: string;
    profileImageAlt?: string;
  };
}
