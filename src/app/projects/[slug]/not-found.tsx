import React from "react";
import Link from "next/link";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/Button";
import { siteContent } from "@/content/site";
import { ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-white">
      <Nav navItems={siteContent.nav} />
      <main className="pt-16">
        <div className="container mx-auto px-4 py-16">
          <div className="text-center max-w-2xl mx-auto">
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
              Project Not Found
            </h1>
            <p className="text-xl text-gray-600 mb-8">
              The project you&apos;re looking for doesn&apos;t exist or has been
              moved.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild variant="primary" size="lg">
                <a href="/#projects">
                  <ArrowLeft className="w-5 h-5 mr-2" />
                  Back to Projects
                </a>
              </Button>
              <Button asChild variant="secondary" size="lg">
                <a href="/">Go Home</a>
              </Button>
            </div>
          </div>
        </div>
      </main>

      <Footer links={siteContent.links} />
    </div>
  );
}
