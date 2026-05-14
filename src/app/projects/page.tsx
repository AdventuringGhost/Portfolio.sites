import type { Metadata } from "next";
import Link from "next/link";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";
import { ArrowLeft } from "lucide-react";
import { siteContent } from "@/content/site";
import { ProjectCard } from "@/components/ProjectCard";

export const metadata: Metadata = {
  title: "Projects | Katherine Schlosser",
  description:
    "DevSecOps projects spanning Kubernetes security, edge IoT, and AI-driven automation.",
};

const CATEGORIES = [
  {
    label: "Security",
    slugs: ["warden", "covenant"],
  },
  {
    label: "Edge & Cloud",
    slugs: ["watershed", "nomad-edge"],
  },
  {
    label: "AI & Automation",
    slugs: ["azure-email-agent", "margin-watch"],
  },
  {
    label: "Proposals",
    slugs: ["aviation-tool-inventory"],
  },
];

export default function ProjectsPage() {
  const projectsBySlug = Object.fromEntries(
    siteContent.projects.map((p) => [p.slug, p]),
  );

  return (
    <main>
      <Section className="pt-12 pb-8">
        <div className="max-w-5xl mx-auto">
          <Button asChild variant="ghost" className="mb-8 -ml-2 text-gray-500">
            <Link href="/">
              <ArrowLeft className="w-4 h-4 mr-1" />
              Back
            </Link>
          </Button>

          <p className="text-sm font-mono tracking-widest text-gray-400 uppercase mb-3">
            Work
          </p>
          <SectionHeading level={1} className="text-4xl sm:text-5xl mb-4">
            All Projects
          </SectionHeading>
        </div>
      </Section>

      {CATEGORIES.map((category) => {
        const projects = category.slugs
          .map((slug) => projectsBySlug[slug])
          .filter(Boolean);

        if (projects.length === 0) return null;

        return (
          <Section key={category.label} className="py-12">
            <div className="max-w-5xl mx-auto">
              <p className="text-xs font-mono tracking-widest text-gray-400 uppercase mb-6">
                {category.label}
              </p>
              <div className="grid md:grid-cols-2 gap-6">
                {projects.map((project) => (
                  <ProjectCard key={project.slug} project={project} compact />
                ))}
              </div>
            </div>
          </Section>
        );
      })}
    </main>
  );
}
