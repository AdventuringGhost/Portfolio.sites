import type { Project } from "@adventuringghost/types";

export const projects: Project[] = [
  {
    slug: "portfolio",
    title: "AdventuringGhost Portfolio",
    tagline: "Sleek, sunrise-themed developer portfolio",
    description:
      "A polished monorepo-based portfolio showcasing projects, resume highlights, and case studies. Built with React (Vite + TypeScript) and Tailwind CSS, with a shared UI library and SEO/accessibility baked in.",
    tech: ["React", "TypeScript", "Vite", "TailwindCSS", "Monorepo (npm workspaces)"],
    links: {
      live: "https://adventuringghost.com",
      github: "https://github.com/AdventuringGhost/Portfolio.sites",
      caseStudy: "CASE_STUDY_URL_PLACEHOLDER"
    },
    status: "Live",
    date: "2025-08-27",
    highlights: [
      "Shared UI package across apps",
      "SEO + accessibility optimizations",
      "Structured project detail pages with links",
      "Graceful image error handling to prevent layout shifts",
      "Responsive, sunrise-themed design system"
    ],
    thumbnail: "/portfolio-screenshot.png"
  },
  {
    slug: "hike-harvest",
    title: "Hike Harvest — Trail Recipe Collection",
    tagline: "Outdoor cooking companion with recipe sharing and trail tips",
    description:
      "A comprehensive recipe website designed for outdoor enthusiasts and trail cooking. Features recipe browsing by category, detailed cooking instructions, nutrition information, equipment lists, and community features. Built with React, TypeScript, and Tailwind CSS with a focus on mobile-first design and accessibility.",
    tech: [
      "React 18",
      "TypeScript",
      "Vite",
      "TailwindCSS",
      "React Router",
      "Mock API Integration"
    ],
    links: {
      live: "https://hike-harvest.com",
      github: "https://github.com/AdventuringGhost/Portfolio.sites"
    },
    status: "Live",
    date: "2025-01-15",
    highlights: [
      "Recipe browsing by category (Breakfast, Lunch, Dinner, Snack, Dessert, Drinks)",
      "Photo support with high-quality food imagery",
      "Detailed nutrition information and equipment lists",
      "Trail cooking tips and community features",
      "Mobile-first responsive design with inward animations",
      "Accessibility-compliant with alt text and keyboard navigation"
    ],
    thumbnail: "/hike-harvest-screenshot.png"
  },
  {
    slug: "glow-grove",
    title: "Glow + Grove — E-commerce Demo",
    tagline: "Modern React + Vite e-commerce demo with complete shopping flow",
    description:
      "A modern React + Vite e-commerce demo with a green/lime/orange/red theme, robust cart and checkout flow, localStorage persistence, and console-based analytics events. Includes product detail pages, order confirmation, shipping options, blog posts, and a demo notice for safe testing.",
    tech: [
      "React 18",
      "Vite 5",
      "TypeScript",
      "TailwindCSS",
      "React Router v6",
      "Context API + useReducer",
      "localStorage"
    ],
    links: {
      live: "https://glow-grove.com",
      github: "https://github.com/AdventuringGhost/Portfolio.sites"
    },
    status: "Live",
    date: "2025-08-28",
    highlights: [
      "Complete shopping flow: browse → cart → checkout → confirmation",
      "Robust cart system with localStorage persistence",
      "4 shipping options with dynamic pricing",
      "Product JSON-LD structured data for SEO",
      "Demo-safe checkout with clear disclaimers",
      "Console-based e-commerce analytics tracking"
    ],
    thumbnail: "/glow-grove-screenshot.png"
  },
  {
    slug: "security-lab",
    title: "Security Lab",
    tagline: "AWS + ethical hacking labs showcase",
    description:
      "A documentation-style site demonstrating security labs: AWS IAM, S3 encryption, Lambda exploits, and basic ethical hacking drills. Includes screenshots and write-ups.",
    tech: ["AWS", "React", "Markdown docs", "Security tools"],
    links: {
      github: "https://github.com/yourname/security-lab"
    },
    status: "Archived",
    date: "2025-08-29",
    highlights: [
      "AWS security labs documented step by step",
      "Ethical hacking drills",
      "Visual walkthroughs and code samples"
    ]
  },
  {
    slug: "netops-showcase",
    title: "NetOps Showcase",
    tagline: "Networking projects for CCNA",
    description:
      "Showcase of Packet Tracer labs and networking projects built for CCNA prep. Features VLAN setups, routing labs, and ISP simulation with diagrams and configs.",
    tech: ["Cisco Packet Tracer", "Networking", "CCNA"],
    links: {
      github: "https://github.com/yourname/netops-showcase"
    },
    status: "Live",
    date: "2025-08-30",
    highlights: [
      "Multi-router Packet Tracer labs",
      "VLANs, routing protocols, trunking",
      "Internet simulation and lab configs"
    ]
  },
  {
    slug: "blogsite",
    title: "BlogSite",
    tagline: "Full-stack blog platform with Node/React/Mongo",
    description:
      "A custom full-stack blog platform. Features user auth, rich text posts, comments, tags, and an admin dashboard. Built as a professional full-stack project for the portfolio.",
    tech: ["Node.js", "Express", "MongoDB", "React"],
    links: {
      live: "https://example.com/blogsite",
      github: "https://github.com/yourname/blogsite"
    },
    status: "WIP",
    date: "2025-09-01",
    highlights: [
      "Full CRUD backend API",
      "MongoDB Atlas integration",
      "Polished frontend with auth and admin tools"
    ]
  }
];
