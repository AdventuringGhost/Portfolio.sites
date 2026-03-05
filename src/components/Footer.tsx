import React from "react";
import Link from "next/link";
import {
  Github,
  Linkedin,
  Instagram,
  Mail,
  type LucideIcon,
} from "lucide-react";

interface FooterProps {
  links: {
    github?: string;
    linkedin?: string;
    instagram?: string;
    email?: string;
  };
  builtWith?: string;
  subtitle?: string;
}

interface SocialLink {
  href: string;
  icon: LucideIcon;
  label: string;
  isExternal: boolean;
}

const DEFAULT_BUILT_WITH =
  "Built with Next.js, Tailwind CSS, and deployed on AWS S3 + CloudFront";

export const Footer = ({
  links = {},
  builtWith = DEFAULT_BUILT_WITH,
  subtitle,
}: FooterProps): React.JSX.Element => {
  const currentYear = new Date().getFullYear();
  const startYear = 2023;
  const copyrightYear =
    startYear === currentYear ? currentYear : `${startYear} - ${currentYear}`;

  const socialLinks: SocialLink[] = [
    { href: links.github, icon: Github, label: "GitHub", isExternal: true },
    {
      href: links.linkedin,
      icon: Linkedin,
      label: "LinkedIn",
      isExternal: true,
    },
    {
      href: links.instagram,
      icon: Instagram,
      label: "Instagram",
      isExternal: true,
    },
    {
      href: links.email ? `mailto:${links.email}` : undefined,
      icon: Mail,
      label: "Email",
      isExternal: false,
    },
  ].filter((link): link is SocialLink => typeof link.href === "string");

  return (
    <footer className="bg-gray-50 border-t border-gray-200">
      <div className="container mx-auto px-4 py-12">
        <div className="flex flex-col md:flex-row justify-between items-center">
          {/* Brand */}
          <div className="mb-6 md:mb-0">
            <a
              href="/"
              className="text-2xl font-bold text-[#59D5E0] mb-2 block"
              aria-label="AdventuringGhost, go to homepage"
            >
              AdventuringGhost
            </a>
            {subtitle && <p className="text-gray-600 text-sm">{subtitle}</p>}
          </div>

          {/* Social Links */}
          <div className="flex space-x-4 mb-6 md:mb-0">
            {socialLinks.map(({ href, icon: Icon, label, isExternal }) => (
              <Link
                key={href}
                href={href}
                className="p-2 rounded-full bg-white text-gray-600 hover:text-[#59D5E0] hover:bg-[#59D5E0]/10 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-[#59D5E0] focus:ring-offset-2"
                aria-label={label}
                target={isExternal ? "_blank" : undefined}
                rel={isExternal ? "noopener noreferrer" : undefined}
              >
                <Icon className="w-5 h-5" />
              </Link>
            ))}
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-gray-200 pt-6 mt-6">
          <div className="flex flex-col md:flex-row justify-between items-center text-sm text-gray-600">
            <p>&copy; {copyrightYear} AdventuringGhost. All rights reserved.</p>
            <p className="mt-2 md:mt-0">{builtWith}</p>
          </div>
        </div>
      </div>
    </footer>
  );
};
