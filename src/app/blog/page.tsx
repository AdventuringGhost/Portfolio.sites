import type { Metadata } from "next";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ArrowLeft } from "lucide-react";

export const metadata: Metadata = {
  title: "Blog | Katherine Schlosser",
  description:
    "Writing on DevSecOps, Kubernetes security, edge infrastructure, and AI-driven automation.",
};

const posts: { slug: string; title: string; date: string; summary: string }[] =
  [
    {
      slug: "devsecops-physical-robotics",
      title: "DevSecOps for Physical Systems: What Changes When Your Workload Has Legs",
      date: "May 15, 2026",
      summary:
        "Software vulnerabilities cause outages. In physical robotics, they cause collisions. The security posture, update pipeline, and threat model all change when your workload operates in the real world.",
    },
    {
      slug: "ai-cloud-finance-business",
      title:
        "AI in the Cloud: What Business Owners Need to Understand About Finance-Driven Infrastructure",
      date: "May 12, 2026",
      summary:
        "Cloud-based AI changes the financial architecture of a business — what you can observe, what you can act on, and how fast. The most important shift isn't in the product; it's in the operating layer.",
    },
    {
      slug: "ai-agent-identity-security-gaps",
      title: "Identity Systems Weren't Built for AI Agents — and That's a Security Problem",
      date: "May 8, 2026",
      summary:
        "AI agents authenticate programmatically, act continuously, and hold permissions that can combine in ways no one anticipated. Here's what that means for your identity and access management architecture.",
    },
    {
      slug: "ai-active-security-monitoring",
      title: "Why AI Belongs in Your Active Security Monitoring Stack",
      date: "May 4, 2026",
      summary:
        "AI doesn't solve the alert volume problem by being smarter about which alerts matter. It solves it by changing the relationship between alert volume and analyst capacity.",
    },
    {
      slug: "ai-streamlining-expenses",
      title: "How AI Streamlines Business Expense Management",
      date: "April 28, 2026",
      summary:
        "AI fixes expense management by removing the parts that shouldn't require human attention — categorization, policy compliance, anomaly detection — so finance teams focus on judgment, not receipt chasing.",
    },
    {
      slug: "forecasting-roi-ai-agents",
      title: "Forecasting ROI for Your Business with AI Agents",
      date: "April 21, 2026",
      summary:
        "How to build a defensible ROI forecast for AI agent adoption before you've committed to anything, using the same discipline you'd apply to any infrastructure investment.",
    },
    {
      slug: "nomad-edge-cost-architecture",
      title:
        "SNS vs Kinesis, Nomad vs EKS: The Cost Architecture of Rural Edge Computing",
      date: "April 14, 2026",
      summary:
        "Why the \"cheaper\" choices aren't compromises — they're the right answers when you're building for environments hours from the nearest city.",
    },
    {
      slug: "warden-post-mortem",
      title:
        "Post-Mortem: Warden vs Simulated Shell Spawn — Detection to Auto-Patch in 3 Seconds",
      date: "April 7, 2026",
      summary:
        "A structured SRE post-mortem of the Warden security pipeline proving end-to-end Kubernetes threat detection and automated remediation on a live AKS cluster.",
    },
    {
      slug: "covenant-policy-as-code",
      title:
        "Why Policy Lives in Code: Building OPA Rego Access Control for a Multi-Tenant AI System",
      date: "March 31, 2026",
      summary:
        "Prompt-based access control isn't access control. Here's how Covenant puts OPA Rego as a hard gate between JWT identity and Claude — and why the distinction matters.",
    },
    {
      slug: "watershed-offline-first",
      title:
        "Offline-First by Default: Building IoT Telemetry for Environments Where the Network Fails",
      date: "March 24, 2026",
      summary:
        "Standard IoT pipelines assume connectivity. Watershed doesn't. Here's how a SQLite buffer, async reconnect loop, and rolling anomaly detection handle rural edge reality.",
    },
    {
      slug: "ai-ghost-machine",
      title:
        "The Ghost in the Machine: Why AI is the New Currency of Intent",
      date: "March 17, 2026",
      summary:
        "AI is no longer just a chatbot feature set. From capability stacks to agentic action — how to understand the progression from Deep Learning to Gen AI to autonomous agents, and where to start.",
    },
  ];

export default function BlogPage() {
  return (
    <div className="min-h-screen bg-white">
      <Section className="pt-12 pb-16">
        <div className="max-w-3xl mx-auto">
          <a href="/" className="inline-flex items-center mb-8 -ml-2 text-gray-500 hover:text-gray-700 transition-colors text-sm">
            <ArrowLeft className="w-4 h-4 mr-1" />
            Back
          </a>

          <p className="text-sm font-mono tracking-widest text-gray-400 uppercase mb-3">
            Writing
          </p>
          <SectionHeading level={1} className="text-4xl sm:text-5xl mb-4">
            Blog
          </SectionHeading>
          <p className="text-gray-500 mb-12">
            DevSecOps, Kubernetes security, edge infrastructure, and AI-driven
            automation.
          </p>

          {posts.length === 0 ? (
            <div className="rounded-xl border border-dashed border-gray-200 bg-gray-50 py-20 text-center">
              <p className="text-gray-400 font-mono text-sm tracking-wide">
                Posts coming soon
              </p>
            </div>
          ) : (
            <div className="space-y-8">
              {posts.map((post) => (
                <a key={post.slug} href={`/blog/${post.slug}/`} className="block group">
                  <article className="border-b border-gray-100 pb-8">
                    <time className="text-xs font-mono text-gray-400 tracking-wide">
                      {post.date}
                    </time>
                    <h2 className="text-xl font-semibold text-gray-900 mt-1 mb-2 group-hover:text-[#59D5E0] transition-colors">
                      {post.title}
                    </h2>
                    <p className="text-gray-600 text-sm">{post.summary}</p>
                  </article>
                </a>
              ))}
            </div>
          )}
        </div>
      </Section>
    </div>
  );
}
