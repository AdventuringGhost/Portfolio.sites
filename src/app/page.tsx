import Image from "next/image";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";
import { siteContent } from "@/content/site";
import { Mail } from "lucide-react";
import { ProjectCard } from "@/components/ProjectCard";
import { HeroCarousel } from "@/components/HeroCarousel";

export default async function Home() {
  return (
    <div className="min-h-screen bg-white">
      {/* Skip to content link for accessibility */}
      <a
        href="#main-content"
        className="absolute top-0 left-0 -translate-y-full focus:translate-y-0 bg-[#59D5E0] text-black font-bold p-4 z-[100]"
      >
        Skip to main content
      </a>

      <div id="main-content">
        {/* Hero Carousel */}
        <HeroCarousel
          projects={siteContent.projects}
          secondaryCta={siteContent.hero.ctas.secondary}
          ghostCta={siteContent.hero.ctas.ghost}
        />

        {/* Case Studies */}
        <Section id="projects" className="bg-gray-50 py-20 sm:py-32">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-12">
              <SectionHeading>Case Studies</SectionHeading>
              <p className="text-gray-600 max-w-2xl mx-auto">
                A look at projects that demonstrate my skills in cloud
                infrastructure, networking, and full-stack development.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              {siteContent.projects.map((project) => (
                <ProjectCard key={project.slug} project={project} />
              ))}
            </div>
          </div>
        </Section>

        {/* About Me */}
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
              I'm always open to discussing new projects, creative ideas, or
              opportunities to be part of your vision.
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
