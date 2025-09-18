import type { Project } from "@adventuringghost/types";
import { images } from "../assets/images";

export const projects: Project[] = [
  {
    slug: "portfolio",
    title: "AdventuringGhost Portfolio",
    tagline: "Sleek, sunrise-themed developer portfolio",
    description:
      "A polished monorepo-based portfolio showcasing projects, resume highlights, and case studies. Features a comprehensive About Me page with personal story, profile photo, and detailed skills sections. Built with React (Vite + TypeScript) and Tailwind CSS, with a shared UI library and SEO/accessibility baked in.",
    tech: ["React", "TypeScript", "Vite", "TailwindCSS", "Monorepo (npm workspaces)"],
    links: {
      live: "https://adventuringghost.com",
      github: "https://github.com/AdventuringGhost/Portfolio.sites",
      caseStudy: "CASE_STUDY_URL_PLACEHOLDER"
    },
    status: "You Are Here",
    date: "2025-08-27",
    highlights: [
      "Shared UI package across apps",
      "SEO + accessibility optimizations",
      "Structured project detail pages with links",
      "Graceful image error handling to prevent layout shifts",
      "Responsive, sunrise-themed design system",
      "About Me page with personal story and DevOps focus",
      "Profile photo integration with fallback system",
      "Comprehensive Skills & Technologies sections",
      "Updated navigation with About tab",
      "Enhanced call-to-action with green button animations"
    ],
    thumbnail: images.portfolio
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
    thumbnail: images.hikeHarvest
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
    thumbnail: images.glowGrove
  },
  {
    slug: "security-lab",
    title: "Security Lab",
    tagline: "Up next: AWS Data Engineering, AWS Security & CompTIA Security+",
    description:
      "Coming soon: A comprehensive security learning journey focusing on AWS Data Engineering, AWS Security specializations, and CompTIA Security+ SY0-701 certification. This project will document hands-on labs, security best practices, and real-world scenarios as I work towards these industry-recognized certifications.",
    tech: ["AWS Data Engineering", "AWS Security", "CompTIA Security+", "Cloud Security"],
    links: {
      github: "https://github.com/yourname/security-lab"
    },
    status: "WIP",
    date: "2025-01-15",
    highlights: [
      "AWS Data Engineering fundamentals and best practices",
      "AWS Security specialization preparation",
      "CompTIA Security+ SY0-701 certification track",
      "Hands-on security labs and documentation",
      "Real-world security scenarios and case studies"
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
    ],
    thumbnail: images.netopsShowcase
  },
  {
    slug: "municipal-hospital-netops",
    title: "Municipal Hospital NetOps",
    tagline: "Enterprise network infrastructure for healthcare",
    description:
      "Comprehensive network design and implementation for a municipal hospital system. Features redundant core switching, VLAN segmentation for departments, wireless access points, and security policies for HIPAA compliance.",
    tech: ["Cisco Packet Tracer", "Enterprise Networking", "VLAN Design", "Security Policies"],
    links: {
      github: "https://github.com/yourname/municipal-hospital-netops"
    },
    status: "WIP",
    date: "2025-01-15",
    highlights: [
      "Multi-building campus network topology",
      "Department-specific VLAN segmentation",
      "Redundant core switching for high availability",
      "Wireless access point deployment",
      "Security policies for HIPAA compliance",
      "Network monitoring and management"
    ]
  },
];
