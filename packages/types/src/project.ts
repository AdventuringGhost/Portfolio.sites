export type Project = {
  slug: string;              // URL-safe id
  title: string;
  tagline: string;           // short 1-liner beneath title
  description: string;       // long markdown-capable string ok
  tech: string[];            // e.g., ["React","AWS Lambda","DynamoDB"]
  links: {
    github?: string;
    live?: string;
    caseStudy?: string;
    video?: string;
  };
  thumbnail?: string;        // optional image path
  date?: string;             // ISO (for sorting)
  status?: "WIP" | "Live" | "Archived";
  highlights?: string[];     // bullets
};
