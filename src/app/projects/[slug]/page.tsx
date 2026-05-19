import { Suspense } from "react";
import { siteContent } from "@/content/site";
import { notFound } from "next/navigation";
import type { Metadata, ResolvingMetadata } from "next";
import Link from "next/link";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";
import Image from "next/image";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { DetailSection } from "@/components/ui/DetailSection";
import { ChevronRight, ArrowLeft } from "lucide-react";
import { MilestoneCard } from "@/components/MilestoneCard";
import { MonitoringCard } from "@/components/MonitoringCard";
import { CodeBlockWrapper } from "@/components/ui/CodeBlockWrapper";
import { HighlightedCode } from "@/components/ui/HighlightedCode";
import { WardenArchDiagram } from "@/components/diagrams/WardenArchDiagram";
import { AviationArchDiagram } from "@/components/diagrams/AviationArchDiagram";
import { AviationStateMachineDiagram } from "@/components/diagrams/AviationStateMachineDiagram";

interface Learning {
  category: string;
  points: string[];
}

const LearningCard = ({ learning }: { learning: Learning }) => (
  <Card className="p-6">
    <SectionHeading level={3} className="text-lg mb-3">
      {learning.category}
    </SectionHeading>
    {Array.isArray(learning.points) && learning.points.length > 0 && (
      <ul className="space-y-2">
        {learning.points.map((point, i) => (
          <li
            key={`${learning.category}-point-${i}`}
            className="text-gray-600 flex items-start"
          >
            <ChevronRight className="w-4 h-4 text-sky-500 mr-2 mt-1 flex-shrink-0" />
            <span>{point}</span>
          </li>
        ))}
      </ul>
    )}
  </Card>
);

interface MonitoringItemData {
  title: string;
  description: string;
  visual?: "cost-analysis";
  image?: string;
}

const MonitoringItem = ({ item }: { item: MonitoringItemData }) => {
  if (item.visual === "cost-analysis") {
    const src = item.image ?? "/diagram/cost-analysis-visual.png";
    return (
      <Card className="p-4">
        <h4 className="text-lg font-bold text-gray-900 mb-2">{item.title}</h4>
        <Image
          src={src}
          alt={`Visual diagram for ${item.title}`}
          width={800}
          height={450}
          className="w-full h-auto rounded-lg bg-gray-100"
        />
        <p className="text-sm text-gray-600 mt-2">{item.description}</p>
      </Card>
    );
  }
  return <MonitoringCard item={item} />;
};

// This function tells Next.js which slugs to statically generate at build time.
export function generateStaticParams() {
  if (!siteContent.projects || siteContent.projects.length === 0) {
    return [];
  }
  return siteContent.projects.map((project) => ({
    slug: project.slug,
  }));
}

export async function generateMetadata(
  { params }: { params: { slug: string } | Promise<{ slug: string }> },
  _parent: ResolvingMetadata,
): Promise<Metadata> {
  // params may be a promise in Next 16+; unwrap it
  const { slug } = await params;
  const project = siteContent.projects.find((p) => p.slug === slug);

  if (!project) {
    return {
      title: "Project Not Found",
    };
  }

  return {
    title: `${project.title} | Case Study`,
    description: project.overview,
  };
}

type ProjectDetailSectionData = {
  title: string;
  summary: string;
  bullets: string[];
};

type DetailItem = {
  type: string;
  color: string;
  data?: Partial<ProjectDetailSectionData>;
};

type DetailMedia = {
  src?: string;
  caption?: string;
};

/**
 * A type guard to ensure a project detail item has all the required data to be rendered.
 */
function isDetailItemValid(
  detail: DetailItem,
): detail is DetailItem & { data: ProjectDetailSectionData } {
  return !!(
    detail.data &&
    detail.data.title &&
    detail.data.summary &&
    Array.isArray(detail.data.bullets)
  );
}

function getDetailMedia(
  type: string,
  project: {
    problemImage?: string;
    problemImageCaption?: string;
    solutionImage?: string;
    solutionImageCaption?: string;
    outcomeImage?: string;
    outcomeImageCaption?: string;
  },
): DetailMedia {
  if (type === "problem") {
    return {
      src: project.problemImage,
      caption: project.problemImageCaption,
    };
  }
  if (type === "solution") {
    return {
      src: project.solutionImage,
      caption: project.solutionImageCaption,
    };
  }
  if (type === "outcome") {
    return {
      src: project.outcomeImage,
      caption: project.outcomeImageCaption,
    };
  }
  return {};
}

export default async function ProjectPage({
  params,
}: {
  params: { slug: string } | Promise<{ slug: string }>;
}) {
  // params may be a promise in Next 16+; unwrap it
  const { slug } = await params;
  const project = siteContent.projects.find((p) => p.slug === slug);

  if (!project) {
    notFound();
  }

  const arcPeers = project.portfolioArc
    ? siteContent.projects.filter(
        (p) =>
          project.portfolioArc!.peers.includes(p.slug) &&
          p.slug !== project.slug,
      )
    : [];

  let learningsContent = null;
  if (Array.isArray(project.learnings)) {
    const validLearnings = project.learnings.filter(
      (l): l is Learning =>
        !!(l && l.category && Array.isArray(l.points) && l.points.length > 0),
    );

    if (validLearnings.length > 0) {
      learningsContent = (
        <div className="mb-12">
          <SectionHeading level={2} className="text-center mb-6">
            Key Learnings & Decisions
          </SectionHeading>
          <div className="space-y-6">
            {validLearnings.map((learning, index) => (
              <LearningCard
                key={`${learning.category}-${index}`}
                learning={learning}
              />
            ))}
          </div>
        </div>
      );
    }
  }

  const projectDetailsItems: DetailItem[] = [
    {
      type: "problem" as const,
      color: "bg-red-400",
      data: project.problem,
    },
    {
      type: "solution" as const,
      color: "bg-green-400",
      data: project.solution,
    },
    {
      type: "outcome" as const,
      color: "bg-blue-400",
      data: project.outcome,
    },
  ];

  return (
    <div className="min-h-screen bg-white">
      <div>
        {/* Back to main/projects */}
        <div className="container mx-auto px-4 py-4">
          <Button asChild variant="ghost" size="sm">
            <Link href="/#projects" className="inline-flex items-center">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Projects
            </Link>
          </Button>
        </div>
        <Section className="bg-gradient-to-br from-[#F5DD61]/20 to-[#59D5E0]/20 py-16 sm:py-24">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <SectionHeading>{project.title}</SectionHeading>
              <p className="mt-4 text-lg text-gray-600">{project.overview}</p>
            </div>

            <div className="grid md:grid-cols-3 gap-8 mb-12">
              <DetailSection title="Core Technologies">
                {Array.isArray(project.stack) && project.stack.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {project.stack.map((tech, index) => (
                      <Badge key={`${tech}-${index}`}>{tech}</Badge>
                    ))}
                  </div>
                )}
              </DetailSection>
              <DetailSection
                title="Architecture Components"
                className="md:col-span-2"
              >
                {project.architecture &&
                  Array.isArray(project.architecture.components) &&
                  project.architecture.components.length > 0 && (
                    <ul className="list-disc list-inside space-y-1 text-gray-600">
                      {project.architecture.components.map(
                        (component, index) => (
                          <li key={`${project.slug}-arch-${index}`}>
                            {component}
                          </li>
                        ),
                      )}
                    </ul>
                  )}
              </DetailSection>
            </div>

            {project.architectureImage && (
              <Card className="p-4 mb-12">
                <Image
                  src={project.architectureImage}
                  alt={`${project.title} architecture visual`}
                  width={1200}
                  height={700}
                  className="w-full h-auto rounded-lg"
                />
                {project.architectureImageCaption && (
                  <p className="text-sm text-gray-600 mt-3 italic">
                    {project.architectureImageCaption}
                  </p>
                )}
              </Card>
            )}

            {project.slug === "warden" && (
              <div className="mb-12">
                <WardenArchDiagram />
              </div>
            )}

            {project.slug === "aviation-tool-inventory" && (
              <>
                <div className="mb-8">
                  <AviationArchDiagram />
                </div>
                <div className="mb-12">
                  <AviationStateMachineDiagram />
                </div>
              </>
            )}

            <div className="my-12 space-y-8">
              {projectDetailsItems.filter(isDetailItemValid).map((detail) => {
                const media = getDetailMedia(detail.type, project);

                return (
                <Card key={detail.type} className="p-6">
                  <SectionHeading level={3} className="text-xl mb-3">
                    {detail.data.title}
                  </SectionHeading>
                  <p className="text-gray-600 mb-4">{detail.data.summary}</p>
                  <ul className="space-y-2">
                    {detail.data.bullets.map((bullet, i) => (
                      <li
                        key={`${detail.type}-bullet-${i}`}
                        className="flex items-start gap-3"
                      >
                        <div
                          className={`w-2 h-2 ${detail.color} rounded-full mt-1.5 flex-shrink-0`}
                        />
                        <span className="text-sm text-gray-700">{bullet}</span>
                      </li>
                    ))}
                  </ul>

                  {media.src && (
                    <div className="mt-6">
                      <Image
                        src={media.src}
                        alt={`${detail.data.title} visual`}
                        width={1200}
                        height={700}
                        className="w-full h-auto rounded-lg"
                      />
                      {media.caption && (
                        <p className="text-sm text-gray-600 mt-3 italic">
                          {media.caption}
                        </p>
                      )}
                    </div>
                  )}
                </Card>
              );})}
            </div>

            {learningsContent}

            {project.roadmap &&
              Array.isArray(project.roadmap.milestones) &&
              project.roadmap.milestones.length > 0 && (
                <div className="my-16">
                  <div className="text-center mb-8">
                    <SectionHeading level={2} className="mb-3">
                      Implementation Milestones
                    </SectionHeading>
                    <p className="text-gray-600 max-w-3xl mx-auto text-sm sm:text-base">
                      A breakdown of the key tasks and milestones that brought
                      this project to life.
                    </p>
                  </div>
                  <div className="space-y-6">
                    {project.roadmap.milestones.map((milestone) => (
                      <MilestoneCard key={milestone.id} milestone={milestone} />
                    ))}
                  </div>
                </div>
              )}

            {project.completionImage && (
              <div className="my-16">
                <div className="text-center mb-8">
                  <SectionHeading level={2} className="mb-3">
                    Evidence of Completion
                  </SectionHeading>
                </div>
                <Card className="p-4">
                  <Image
                    src={project.completionImage}
                    alt="Evidence of project completion"
                    width={1200}
                    height={800}
                    className="w-full h-auto rounded-lg"
                  />
                  {project.completionImageCaption && (
                    <p className="text-sm text-gray-600 mt-3 italic">
                      {project.completionImageCaption}
                    </p>
                  )}
                </Card>
              </div>
            )}

            {(project.monitoring || project.codeSample) && (
              <div className="my-16 grid lg:grid-cols-2 gap-10 items-start">
                {/* Monitoring & Cost Analysis */}
                {Array.isArray(project.monitoring) &&
                  project.monitoring.length > 0 && (
                    <div className="space-y-8">
                      <SectionHeading level={2} className="text-center mb-6">
                        Monitoring & Analysis
                      </SectionHeading>
                      {project.monitoring.map((item) => (
                        <MonitoringItem key={item.title} item={item} />
                      ))}
                    </div>
                  )}

                {/* Code Sample */}
                {project.codeSample && (
                  <div className="lg:sticky lg:top-24">
                    <h4 className="text-lg font-bold text-gray-900 mb-2">
                      {project.codeSample.title}
                    </h4>
                    <CodeBlockWrapper snippet={project.codeSample.snippet}>
                      <Suspense
                        fallback={
                          <div className="shiki-fallback">Loading code...</div>
                        }
                      >
                        <HighlightedCode
                          language={project.codeSample.language}
                          snippet={project.codeSample.snippet}
                        />
                      </Suspense>
                    </CodeBlockWrapper>
                  </div>
                )}
              </div>
            )}

            <div className="mt-12 flex flex-col sm:flex-row justify-center items-center gap-4">
              {project.codeUrl && (
                <Button
                  asChild
                  variant="secondary"
                  className="w-full sm:w-auto"
                >
                  <a
                    href={project.codeUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    View Source Code
                  </a>
                </Button>
              )}
              {project.liveUrl && (
                <Button asChild variant="accent" className="w-full sm:w-auto">
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Live Demo
                  </a>
                </Button>
              )}
            </div>

            {project.portfolioArc && arcPeers.length > 0 && (
              <div className="mt-20 border-t border-gray-200 pt-16">
                <div className="text-center mb-10">
                  <p className="text-xs font-mono text-gray-400 tracking-[0.2em] uppercase mb-3">
                    Part of a larger arc
                  </p>
                  <SectionHeading level={2} className="mb-4">
                    {project.portfolioArc.name}
                  </SectionHeading>
                  <p className="text-gray-600 max-w-3xl mx-auto leading-relaxed">
                    {project.portfolioArc.summary}
                  </p>
                </div>

                <div className="flex flex-wrap justify-center gap-6 mb-10">
                  {project.portfolioArc.costs.map((c) => (
                    <div key={c.label} className="text-center">
                      <p className="text-2xl font-bold text-gray-900">{c.amount}</p>
                      <p className="text-xs font-mono text-gray-400 uppercase tracking-widest mt-1">{c.label}</p>
                    </div>
                  ))}
                  <div className="text-center">
                    <p className="text-2xl font-bold text-[#59D5E0]">{project.portfolioArc.totalCost}</p>
                    <p className="text-xs font-mono text-gray-400 uppercase tracking-widest mt-1">Combined</p>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  {arcPeers.map((peer) => (
                    <a key={peer.slug} href={`/projects/${peer.slug}/`}>
                      <Card className="p-6 hover:shadow-md transition-shadow cursor-pointer h-full">
                        <p className="text-xs font-mono text-gray-400 tracking-[0.2em] uppercase mb-2">
                          Related project
                        </p>
                        <h3 className="font-bold text-gray-900 mb-2">{peer.title}</h3>
                        {peer.tagline && (
                          <p className="text-sm text-gray-600 mb-4">{peer.tagline}</p>
                        )}
                        <div className="flex flex-wrap gap-1 mb-4">
                          {peer.stack.slice(0, 4).map((tech) => (
                            <Badge key={tech}>{tech}</Badge>
                          ))}
                        </div>
                      </Card>
                    </a>
                  ))}
                </div>

                <div className="flex flex-col sm:flex-row justify-center gap-4 mt-8">
                  {arcPeers.map((peer) => (
                    <Button key={peer.slug} asChild variant="secondary" className="w-full sm:w-auto">
                      <a href={`/projects/${peer.slug}/`}>
                        {peer.title.split(" —")[0]} →
                      </a>
                    </Button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </Section>
      </div>
    </div>
  );
}
