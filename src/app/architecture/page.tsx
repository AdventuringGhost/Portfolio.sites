import type { Metadata } from "next";
import Link from "next/link";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { ArrowLeft } from "lucide-react";
import { ArchStackDiagram } from "@/components/diagrams/ArchStackDiagram";

export const metadata: Metadata = {
  title: "Architecture Philosophy | AdventuringGhost",
  description: "Three projects. One stack. Security enforced at every layer.",
};

const principles = [
  {
    title: "Policy before AI",
    body: "AI is a reasoning layer, not a gatekeeper. In Covenant, OPA Rego makes the hard access-control decision before Claude ever sees a query. The model can't grant what policy already denied — which means the safety invariant holds even if the model is wrong.",
  },
  {
    title: "Edge-first resilience",
    body: "Connectivity loss isn't an edge case in agricultural and remote environments — it's the baseline condition. Watershed buffers locally in SQLite and syncs when a path is available. The telemetry pipeline keeps running whether or not a cloud endpoint is reachable.",
  },
  {
    title: "Runtime over perimeter",
    body: "Preventing bad configurations at admission (OPA Gatekeeper) is necessary but not sufficient. Warden adds Falco eBPF syscall probes so that anomalous behaviour after a workload is admitted is detected and remediated within 3 seconds — without waiting for a human on-call.",
  },
];

const projects = [
  {
    slug: "warden",
    label: "Runtime Security",
    title: "Warden",
    description:
      "Self-healing Kubernetes security agent. OPA admission control + Falco eBPF runtime detection + Claude triage → auto-patch in under 3 seconds.",
    color: "border-blue-400",
    labelColor: "text-blue-400",
  },
  {
    slug: "covenant",
    label: "Access Control",
    title: "Covenant",
    description:
      "Policy-enforced AI access control. OPA Rego is the hard gate before Claude — the model only ever sees what the identity policy already permitted.",
    color: "border-amber-400",
    labelColor: "text-amber-400",
  },
  {
    slug: "watershed",
    label: "Edge Telemetry",
    title: "Watershed",
    description:
      "Edge-resilient IoT pipeline. Offline SQLite buffer, MQTT ingestion, AWS IoT Core sync, and Claude thermal anomaly detection — survives network partition.",
    color: "border-cyan-400",
    labelColor: "text-cyan-400",
  },
];

export default function ArchitecturePage() {
  return (
    <main>
      <Section className="pt-12 pb-8">
        <div className="max-w-4xl mx-auto">
          <Button asChild variant="ghost" className="mb-8 -ml-2 text-gray-500">
            <Link href="/">
              <ArrowLeft className="w-4 h-4 mr-1" />
              Back
            </Link>
          </Button>

          <p className="text-sm font-mono tracking-widest text-gray-400 uppercase mb-3">
            Architecture Philosophy
          </p>
          <SectionHeading level={1} className="text-4xl sm:text-5xl mb-4">
            Three projects. One stack.
          </SectionHeading>
          <p className="text-xl text-gray-500 mb-4">
            Security enforced at every layer.
          </p>
          <p className="text-gray-600 max-w-2xl leading-relaxed">
            Warden, Covenant, and Watershed were built independently but fit
            together as a coherent infrastructure story — edge telemetry that
            survives connectivity loss, access control that keeps policy out of
            the model, and runtime security that detects and remediates without
            waiting for a human. Each layer is a deliberate constraint on where
            AI is allowed to operate and what it is allowed to decide.
          </p>
        </div>
      </Section>

      {/* Stack Diagram */}
      <Section className="py-8 bg-gray-950">
        <div className="max-w-5xl mx-auto">
          <p className="text-xs font-mono tracking-widest text-gray-500 uppercase mb-6 text-center">
            Full Stack — Edge → Access Control → Runtime
          </p>
          <ArchStackDiagram />
        </div>
      </Section>

      {/* Design Principles */}
      <Section className="py-16">
        <div className="max-w-4xl mx-auto">
          <p className="text-xs font-mono tracking-widest text-gray-400 uppercase mb-8">
            Design Principles
          </p>
          <div className="grid gap-6 sm:grid-cols-3">
            {principles.map((p) => (
              <Card key={p.title} className="p-6">
                <SectionHeading level={3} className="text-base mb-3">
                  {p.title}
                </SectionHeading>
                <p className="text-gray-600 text-sm leading-relaxed">{p.body}</p>
              </Card>
            ))}
          </div>
        </div>
      </Section>

      {/* Project Cards */}
      <Section className="py-16 bg-gray-50">
        <div className="max-w-4xl mx-auto">
          <p className="text-xs font-mono tracking-widest text-gray-400 uppercase mb-8">
            The Projects
          </p>
          <div className="grid gap-6 sm:grid-cols-3">
            {projects.map((proj) => (
              <Link
                key={proj.slug}
                href={`/projects/${proj.slug}/`}
                className={`block rounded-xl border-2 bg-white p-6 hover:shadow-md transition-shadow ${proj.color}`}
              >
                <p className={`text-xs font-mono tracking-widest uppercase mb-2 ${proj.labelColor}`}>
                  {proj.label}
                </p>
                <p className="text-lg font-semibold text-gray-900 mb-3">
                  {proj.title}
                </p>
                <p className="text-sm text-gray-600 leading-relaxed">
                  {proj.description}
                </p>
              </Link>
            ))}
          </div>

          <div className="mt-10 text-center">
            <Button asChild variant="secondary">
              <Link href="/#projects">View all projects →</Link>
            </Button>
          </div>
        </div>
      </Section>
    </main>
  );
}
