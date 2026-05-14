import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { ArrowLeft } from "lucide-react";
import { Section } from "@/components/ui/Section";

import NomadEdgeCost from "@/content/blog/nomad-edge-cost-architecture.mdx";
import WardenPostMortem from "@/content/blog/warden-post-mortem.mdx";
import CovenantPolicy from "@/content/blog/covenant-policy-as-code.mdx";
import WatershedOffline from "@/content/blog/watershed-offline-first.mdx";
import AiCloudFinanceBusiness from "@/content/blog/ai-cloud-finance-business.mdx";
import AiAgentIdentitySecurityGaps from "@/content/blog/ai-agent-identity-security-gaps.mdx";
import AiActiveSecurityMonitoring from "@/content/blog/ai-active-security-monitoring.mdx";
import AiStreamliningExpenses from "@/content/blog/ai-streamlining-expenses.mdx";
import ForecastingRoiAiAgents from "@/content/blog/forecasting-roi-ai-agents.mdx";
import AiGhostMachine from "@/content/blog/ai-ghost-machine.mdx";

type PostMeta = {
  slug: string;
  title: string;
  date: string;
  summary: string;
  Component: React.ComponentType;
};

const POSTS: PostMeta[] = [
  {
    slug: "nomad-edge-cost-architecture",
    title:
      "SNS vs Kinesis, Nomad vs EKS: The Cost Architecture of Rural Edge Computing",
    date: "May 5, 2026",
    summary:
      "Why the \"cheaper\" choices aren't compromises — they're the right answers when you're building for environments hours from the nearest city.",
    Component: NomadEdgeCost,
  },
  {
    slug: "warden-post-mortem",
    title:
      "Post-Mortem: Warden vs Simulated Shell Spawn — Detection to Auto-Patch in 3 Seconds",
    date: "May 4, 2026",
    summary:
      "A structured SRE post-mortem of the Warden security pipeline proving end-to-end Kubernetes threat detection and automated remediation on a live AKS cluster.",
    Component: WardenPostMortem,
  },
  {
    slug: "covenant-policy-as-code",
    title:
      "Why Policy Lives in Code: Building OPA Rego Access Control for a Multi-Tenant AI System",
    date: "May 2, 2026",
    summary:
      "Prompt-based access control isn't access control. Here's how Covenant puts OPA Rego as a hard gate between JWT identity and Claude — and why the distinction matters.",
    Component: CovenantPolicy,
  },
  {
    slug: "watershed-offline-first",
    title:
      "Offline-First by Default: Building IoT Telemetry for Environments Where the Network Fails",
    date: "April 30, 2026",
    summary:
      "Standard IoT pipelines assume connectivity. Watershed doesn't. Here's how a SQLite buffer, async reconnect loop, and rolling anomaly detection handle rural edge reality.",
    Component: WatershedOffline,
  },
  {
    slug: "ai-cloud-finance-business",
    title:
      "AI in the Cloud: What Business Owners Need to Understand About Finance-Driven Infrastructure",
    date: "May 13, 2026",
    summary:
      "Cloud-based AI changes the financial architecture of a business — what you can observe, what you can act on, and how fast. The most important shift isn't in the product; it's in the operating layer.",
    Component: AiCloudFinanceBusiness,
  },
  {
    slug: "ai-agent-identity-security-gaps",
    title: "Identity Systems Weren't Built for AI Agents — and That's a Security Problem",
    date: "May 12, 2026",
    summary:
      "AI agents authenticate programmatically, act continuously, and hold permissions that can combine in ways no one anticipated. Here's what that means for your identity and access management architecture.",
    Component: AiAgentIdentitySecurityGaps,
  },
  {
    slug: "ai-active-security-monitoring",
    title: "Why AI Belongs in Your Active Security Monitoring Stack",
    date: "May 11, 2026",
    summary:
      "AI doesn't solve the alert volume problem by being smarter about which alerts matter. It solves it by changing the relationship between alert volume and analyst capacity.",
    Component: AiActiveSecurityMonitoring,
  },
  {
    slug: "ai-streamlining-expenses",
    title: "How AI Streamlines Business Expense Management",
    date: "May 9, 2026",
    summary:
      "AI fixes expense management by removing the parts that shouldn't require human attention — categorization, policy compliance, anomaly detection — so finance teams focus on judgment, not receipt chasing.",
    Component: AiStreamliningExpenses,
  },
  {
    slug: "forecasting-roi-ai-agents",
    title: "Forecasting ROI for Your Business with AI Agents",
    date: "May 7, 2026",
    summary:
      "How to build a defensible ROI forecast for AI agent adoption before you've committed to anything, using the same discipline you'd apply to any infrastructure investment.",
    Component: ForecastingRoiAiAgents,
  },
  {
    slug: "ai-ghost-machine",
    title: "The Ghost in the Machine: Why AI is the New Currency of Intent",
    date: "April 29, 2026",
    summary:
      "AI is no longer just a chatbot feature set. From capability stacks to agentic action — how to understand the progression from Deep Learning to Gen AI to autonomous agents, and where to start.",
    Component: AiGhostMachine,
  },
];

export function generateStaticParams() {
  return POSTS.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = POSTS.find((p) => p.slug === slug);
  if (!post) return { title: "Post not found | Katherine Schlosser" };
  return {
    title: `${post.title} | Katherine Schlosser`,
    description: post.summary,
  };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = POSTS.find((p) => p.slug === slug);
  if (!post) notFound();

  const { Component } = post;

  return (
    <div className="min-h-screen bg-white">
      <Section className="pt-12 pb-20">
        <div className="max-w-3xl mx-auto">
          <a href="/blog/" className="inline-flex items-center mb-8 -ml-2 text-gray-500 hover:text-gray-700 transition-colors text-sm">
            <ArrowLeft className="w-4 h-4 mr-1" />
            All posts
          </a>

          <p className="text-sm font-mono tracking-widest text-gray-400 uppercase mb-3">
            Writing
          </p>
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4 leading-tight">
            {post.title}
          </h1>
          <time className="block text-sm font-mono text-gray-400 tracking-wide mb-2">
            {post.date}
          </time>
          <p className="text-gray-500 text-base mb-8">{post.summary}</p>

          <hr className="border-gray-100 mb-10" />

          <div className="blog-prose">
            <Component />
          </div>
        </div>
      </Section>
    </div>
  );
}
