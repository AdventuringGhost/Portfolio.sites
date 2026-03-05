import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Card } from "./ui/Card";
import { Badge } from "./ui/Badge";
import { Button } from "./ui/Button";
import { ArrowRight } from "lucide-react";
import type { Project } from "@/content/types";

const MAX_STACK_ITEMS_ON_CARD = 5;

// helper copied from app/page.tsx to keep cards working too
function ensureTrailingSlash(href: string) {
  try {
    const url = new URL(href, "http://example.com");
    if (url.origin === "http://example.com") {
      return href.replace(/\/?$/, "/");
    }
  } catch {
    return href.replace(/\/?$/, "/");
  }
  return href;
}

export const ProjectCard = ({ project }: { project: Project }) => {
  const projectImage = project.image || project.architectureImage;
  const internalHref = ensureTrailingSlash(`/projects/${project.slug}`);

  return (
    <Card className="flex flex-col h-full overflow-hidden transition-shadow duration-300 hover:shadow-lg">
      {projectImage && (
        <div className="relative h-48 w-full flex-shrink-0 border-b border-gray-200">
          <Image
            src={projectImage}
            alt={`Promotional or architectural image for the ${project.title} project`}
            fill
            className="object-cover"
          />
        </div>
      )}
      <div className="p-6 flex flex-col flex-grow h-full">
        <div className="flex-grow">
          <h3 className="text-xl font-bold text-gray-900 mb-3">
            {project.title}
          </h3>

          {project.summaryBullets && project.summaryBullets.length > 0 && (
            <ul className="space-y-2 mt-2 mb-4 list-disc list-inside text-sm text-gray-600">
              {project.summaryBullets.map((bullet, i) => (
                <li key={`${project.slug}-bullet-${i}`}>{bullet}</li>
              ))}
            </ul>
          )}
        </div>

        <div className="mt-auto pt-4">
          <div className="flex flex-wrap gap-2 mb-3">
            {(project.stack || [])
              .slice(0, MAX_STACK_ITEMS_ON_CARD)
              .map((tech, index) => (
                <Badge key={`${tech}-${index}`}>{tech}</Badge>
              ))}
          </div>
          {project.liveUrl ? (
            <Link
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center rounded-2xl font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed bg-[#F5DD61] text-gray-900 hover:bg-[#EACD52] focus:ring-[#F5DD61] shadow-lg hover:shadow-xl px-6 py-3 text-base w-full group mt-2"
            >
              View Live Site
              <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" />
            </Link>
          ) : (
            <Link
              href={internalHref}
              className="inline-flex items-center justify-center rounded-2xl font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed bg-[#F5DD61] text-gray-900 hover:bg-[#EACD52] focus:ring-[#F5DD61] shadow-lg hover:shadow-xl px-6 py-3 text-base w-full group mt-2"
            >
              {project.buttonText || "View Case Study"}
              <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" />
            </Link>
          )}
        </div>
      </div>
    </Card>
  );
};
