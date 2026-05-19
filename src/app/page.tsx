import Image from "next/image";
import Link from "next/link";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";
import { siteContent } from "@/content/site";
import { Mail } from "lucide-react";
import { ProjectCard } from "@/components/ProjectCard";

const FEATURED_SLUGS = ["margin-watch", "warden", "covenant", "watershed"];
const PROPOSAL_SLUGS = ["aviation-tool-inventory"];

export default function Home() {
  const featuredProjects = siteContent.projects.filter((p) =>
    FEATURED_SLUGS.includes(p.slug),
  );
  const proposalProjects = siteContent.projects.filter((p) =>
    PROPOSAL_SLUGS.includes(p.slug),
  );

  return (
    <div className="min-h-screen bg-white">
      <a
        href="#main-content"
        className="absolute top-0 left-0 -translate-y-full focus:translate-y-0 bg-[#59D5E0] text-black font-bold p-4 z-[100]"
      >
        Skip to main content
      </a>

      <div id="main-content">
        {/* Hero */}
        <section className="bg-gradient-to-br from-[#59D5E0]/20 to-[#F5DD61]/20 py-36 md:py-56">
          <div className="max-w-3xl mx-auto px-4 text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-4">
              Katherine Schlosser
            </h1>
            <p className="text-lg md:text-xl text-gray-600 mb-4">
              DevSecOps Engineer | Kubernetes Security | AI-Driven Automation |
              Open to Remote
            </p>
            <p className="text-base text-gray-500 mb-10 max-w-xl mx-auto">
              I build security-first, edge-to-cloud systems for environments
              where failure isn&apos;t an option.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button asChild size="lg" variant="secondary">
                <Link href="/projects">View Projects</Link>
              </Button>
              <Button asChild size="lg" variant="ghost">
                <Link href="/blog">Read the Blog</Link>
              </Button>
              <Button asChild size="lg" variant="ghost">
                <a href="/resume.pdf" target="_blank" rel="noopener noreferrer">Resume</a>
              </Button>
            </div>
          </div>
        </section>

        {/* Featured Projects */}
        <Section id="projects" className="bg-gray-50 py-20 sm:py-32">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-12">
              <p className="text-xs font-mono tracking-widest text-gray-400 uppercase mb-3">
                Featured Work
              </p>
              <SectionHeading>Security-First Infrastructure</SectionHeading>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {featuredProjects.map((project) => (
                <ProjectCard key={project.slug} project={project} compact />
              ))}
            </div>

            <div className="text-center mt-10">
              <Link
                href="/projects"
                className="text-[#59D5E0] hover:text-[#4BC4CF] font-medium transition-colors"
              >
                View all projects →
              </Link>
            </div>
          </div>
        </Section>

        {/* Consulting Proposals */}
        {proposalProjects.length > 0 && (
          <Section id="proposals" className="py-20 sm:py-32">
            <div className="max-w-5xl mx-auto">
              <div className="text-center mb-12">
                <p className="text-xs font-mono tracking-widest text-gray-400 uppercase mb-3">
                  Consulting
                </p>
                <SectionHeading>Solution Proposals</SectionHeading>
                <p className="mt-4 text-gray-500 text-sm max-w-xl mx-auto">
                  Scoped proposals for operational environments — architecture, implementation plan, and ROI analysis ready for engagement.
                </p>
              </div>
              <div className="grid md:grid-cols-2 gap-6 max-w-2xl mx-auto">
                {proposalProjects.map((project) => (
                  <ProjectCard key={project.slug} project={project} compact />
                ))}
              </div>
            </div>
          </Section>
        )}

        {/* About */}
        <Section id="about" className="py-20 sm:py-32">
          <div className="max-w-3xl mx-auto text-center">
            <SectionHeading>About Me</SectionHeading>
            {siteContent.about.profileImage && (
              <div className="mt-8 mb-6">
                <Image
                  src={siteContent.about.profileImage}
                  alt={siteContent.about.profileImageAlt || "Profile Icon"}
                  width={150}
                  height={150}
                  className="rounded-full mx-auto object-cover border-4 border-white shadow-lg"
                />
              </div>
            )}
            <p className="text-lg text-gray-600 mt-6 max-w-2xl mx-auto">
              {siteContent.about.content}
            </p>
          </div>
        </Section>

        {/* Skills */}
        <Section id="skills" className="bg-gray-50 py-20 sm:py-32">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <SectionHeading>Skills</SectionHeading>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {siteContent.skills.map((skillGroup) => (
                <div key={skillGroup.group}>
                  <h3 className="font-bold text-lg text-gray-800 mb-3">
                    {skillGroup.group}
                  </h3>
                  <ul className="space-y-2">
                    {skillGroup.items.map((skill) => (
                      <li key={skill} className="text-gray-600">
                        {skill}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </Section>

        {/* Contact */}
        <Section id="contact" className="py-20 sm:py-32">
          <div className="max-w-xl mx-auto text-center">
            <SectionHeading>Get in Touch</SectionHeading>
            <p className="text-gray-600 mb-8">
              I&apos;m always open to discussing new projects, creative ideas,
              or opportunities to be part of your vision.
            </p>
            <Button asChild size="lg" variant="secondary">
              <a href={`mailto:${siteContent.links.email}`}>
                <Mail className="w-5 h-5 mr-2" />
                Say Hello
              </a>
            </Button>
          </div>
        </Section>
      </div>
    </div>
  );
}
