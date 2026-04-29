"use client";

import React, { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import type { Project } from "@/content/types";
import type { Cta } from "@/content/types";

const MAX_BADGES = 4;

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

export function HeroCarousel({
  projects,
  secondaryCta,
  ghostCta,
}: {
  projects: Project[];
  secondaryCta: Cta;
  ghostCta: Cta;
}) {
  const [current, setCurrent] = useState(0);
  const [visible, setVisible] = useState(true);
  const [resetKey, setResetKey] = useState(0);

  const goTo = useCallback(
    (index: number) => {
      setVisible(false);
      setTimeout(() => {
        setCurrent(index);
        setVisible(true);
        setResetKey((k) => k + 1);
      }, 150);
    },
    []
  );

  const prev = useCallback(
    () => goTo((current - 1 + projects.length) % projects.length),
    [current, projects.length, goTo]
  );

  const next = useCallback(
    () => goTo((current + 1) % projects.length),
    [current, projects.length, goTo]
  );

  // Auto-advance; resets whenever the user manually navigates (resetKey changes)
  useEffect(() => {
    const id = setInterval(() => {
      setVisible(false);
      setTimeout(() => {
        setCurrent((c) => (c + 1) % projects.length);
        setVisible(true);
      }, 150);
    }, 5000);
    return () => clearInterval(id);
  }, [resetKey, projects.length]);

  const project = projects[current];
  const href = ensureTrailingSlash(`/projects/${project.slug}`);

  return (
    <section className="bg-gradient-to-br from-[#59D5E0]/20 to-[#F5DD61]/20 py-36 md:py-56">
      <div className="max-w-5xl mx-auto px-4 text-center">
        {/* Slide content */}
        <div
          style={{ transition: "opacity 0.15s ease" }}
          className={visible ? "opacity-100" : "opacity-0"}
        >
          <p className="text-xs font-mono text-gray-400 tracking-[0.2em] uppercase mb-6">
            {String(current + 1).padStart(2, "0")} /{" "}
            {String(projects.length).padStart(2, "0")}
          </p>

          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-4">
            {project.title}
          </h1>

          {project.tagline && (
            <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto mb-6">
              {project.tagline}
            </p>
          )}

          <div className="flex flex-wrap justify-center gap-2 mb-8">
            {project.stack.slice(0, MAX_BADGES).map((tech) => (
              <Badge key={tech}>{tech}</Badge>
            ))}
          </div>

          <a
            href={href}
            className="inline-flex items-center justify-center rounded-2xl font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 bg-[#59D5E0] text-white hover:bg-[#4BC4CF] focus:ring-[#59D5E0] shadow-lg hover:shadow-xl px-8 py-4 text-lg"
          >
            {project.buttonText ?? "View Case Study"} →
          </a>
        </div>

        {/* Dot indicators + prev/next */}
        <div className="flex items-center justify-center gap-4 mt-10">
          <button
            onClick={prev}
            aria-label="Previous project"
            className="p-2 rounded-full text-gray-400 hover:text-gray-700 hover:bg-black/5 transition-colors"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>

          <div className="flex gap-2 items-center">
            {projects.map((_, i) => (
              <button
                key={i}
                onClick={() => goTo(i)}
                aria-label={`Go to project ${i + 1}`}
                className={`rounded-full transition-all duration-300 ${
                  i === current
                    ? "bg-[#59D5E0] w-6 h-2"
                    : "bg-gray-300 hover:bg-gray-400 w-2 h-2"
                }`}
              />
            ))}
          </div>

          <button
            onClick={next}
            aria-label="Next project"
            className="p-2 rounded-full text-gray-400 hover:text-gray-700 hover:bg-black/5 transition-colors"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>

        {/* Persistent CTAs (Resume + GitHub) */}
        <div className="flex flex-wrap justify-center gap-4 mt-8">
          <Button asChild size="lg" variant="accent">
            <Link
              href={secondaryCta.href}
              target="_blank"
              rel="noopener noreferrer"
            >
              {secondaryCta.text}
            </Link>
          </Button>
          <Button asChild size="lg" variant="ghost">
            <Link
              href={ghostCta.href}
              target="_blank"
              rel="noopener noreferrer"
            >
              {ghostCta.text}
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
