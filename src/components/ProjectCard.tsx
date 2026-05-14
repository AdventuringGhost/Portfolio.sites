import React from "react";
import Image from "next/image";
import { Card } from "./ui/Card";
import { Badge } from "./ui/Badge";
import { ArrowRight } from "lucide-react";
import type { Project } from "@/content/types";

const MAX_STACK_FULL = 5;
const MAX_STACK_COMPACT = 4;

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

export const ProjectCard = ({
  project,
  compact = false,
}: {
  project: Project;
  compact?: boolean;
}) => {
  const projectImage = project.image || project.architectureImage;
  const internalHref = ensureTrailingSlash(`/projects/${project.slug}`);
  const maxStack = compact ? MAX_STACK_COMPACT : MAX_STACK_FULL;

  return (
    <Card className="flex flex-col h-full overflow-hidden transition-shadow duration-300 hover:shadow-lg">
      {!compact && projectImage && (
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

          {compact ? (
            project.tagline && (
              <p className="text-sm text-gray-600 mb-4 leading-relaxed">
                {project.tagline}
              </p>
            )
          ) : (
            project.summaryBullets && project.summaryBullets.length > 0 && (
              <ul className="space-y-2 mt-2 mb-4 list-disc list-inside text-sm text-gray-600">
                {project.summaryBullets.map((bullet, i) => (
                  <li key={`${project.slug}-bullet-${i}`}>{bullet}</li>
                ))}
              </ul>
            )
          )}
        </div>

        <div className="mt-auto pt-4">
          <div className="flex flex-wrap gap-2 mb-3">
            {(project.stack || []).slice(0, maxStack).map((tech, index) => (
              <Badge key={`${tech}-${index}`}>{tech}</Badge>
            ))}
          </div>
          <div className={`flex gap-2 mt-2${project.liveUrl ? " flex-col sm:flex-row" : ""}`}>
            <a
              href={internalHref}
              className="inline-flex items-center justify-center rounded-2xl font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed bg-[#F5DD61] text-gray-900 hover:bg-[#EACD52] focus:ring-[#F5DD61] shadow-lg hover:shadow-xl px-6 py-3 text-base flex-1 group"
            >
              {project.buttonText || "View Case Study"}
              <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" />
            </a>
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center rounded-2xl font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed border border-gray-200 bg-white text-gray-700 hover:bg-gray-50 focus:ring-gray-300 px-6 py-3 text-base flex-1 group"
              >
                Live Demo
                <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" />
              </a>
            )}
          </div>
        </div>
      </div>
    </Card>
  );
};
