import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import { siteContent } from "@/content/site";
import { JsonLd } from "@/components/JsonLd";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { ScrollToTop } from "@/components/ScrollToTop";
import "./globals.css";

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL || "https://adventuringghost.com";

export const metadata: Metadata = {
  title: "AdventuringGhost - Cloud & DevOps Engineer",
  description:
    "I build resilient cloud infrastructure, automate deployments, and secure enterprise networks.",
  keywords: [
    "Cloud Engineer",
    "DevOps",
    "AWS",
    "Cisco CCNA",
    "Infrastructure as Code",
    "Terraform",
    "Nomad",
    "CI/CD",
    "Infrastructure",
    "Automation",
    "Networking",
    "Node.js",
    "React",
    "Next.js",
  ],
  authors: [{ name: "AdventuringGhost" }],
  creator: "AdventuringGhost",
  publisher: "AdventuringGhost",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL(siteUrl),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "AdventuringGhost - Cloud & DevOps Engineer",
    description:
      "I build resilient cloud infrastructure, automate deployments, and secure enterprise networks.",
    url: "https://adventuringghost.com",
    siteName: "AdventuringGhost",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "AdventuringGhost - Cloud & DevOps Engineer",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "AdventuringGhost - Cloud & DevOps Engineer",
    description:
      "I build resilient cloud infrastructure, automate deployments, and secure enterprise networks.",
    images: ["/og-image.jpg"],
    creator: "@adventuringghost",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: process.env.GOOGLE_VERIFICATION_CODE,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const allSkills = siteContent.skills.flatMap((group) => group.items);

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        "@id": "https://adventuringghost.com/#website",
        url: "https://adventuringghost.com/",
        name: "AdventuringGhost",
        description: "Cloud & DevOps Engineer portfolio",
        publisher: {
          "@id": "https://adventuringghost.com/#person",
        },
        potentialAction: [
          {
            "@type": "SearchAction",
            target: {
              "@type": "EntryPoint",
              urlTemplate:
                "https://adventuringghost.com/?s={search_term_string}",
            },
            "query-input": "required name=search_term_string",
          },
        ],
      },
      {
        "@type": "Person",
        "@id": "https://adventuringghost.com/#person",
        name: "AdventuringGhost",
        url: "https://adventuringghost.com/",
        image: {
          "@type": "ImageObject",
          url: "https://adventuringghost.com/og-image.jpg",
          width: 1200,
          height: 630,
        },
        description:
          "I build resilient cloud infrastructure, automate deployments, and secure enterprise networks.",
        jobTitle: "Cloud & DevOps Engineer",
        knowsAbout: allSkills,
        sameAs: [
          siteContent.links.github,
          siteContent.links.linkedin,
          siteContent.links.instagram,
        ],
      },
    ],
  };

  const navItems: Array<{ href: string; label: string; external?: boolean }> = [
    // desktop links removed; navigation now handled entirely by logo dropdown
  ];

  return (
    <html lang="en">
      <body
        className={`${GeistSans.variable} ${GeistMono.variable} antialiased`}
      >
        <Nav navItems={navItems} />
        <ScrollToTop />
        <main>{children}</main>
        <Footer links={siteContent.links} />
        <JsonLd data={jsonLd} />
      </body>
    </html>
  );
}
