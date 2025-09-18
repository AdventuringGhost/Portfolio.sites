import { useParams, Link } from 'react-router-dom'
import { Card, Button } from '@adventuringghost/ui'
import { SEO } from '../components/SEO'
import { ProjectLinks } from '../components/ProjectLinks'
import { projects } from '../data/projects'
import { images } from '../assets/images'

export const ProjectDetail = () => {
  const { slug } = useParams<{ slug: string }>()
  
  const project = projects.find(p => p.slug === slug)

  if (!project) {
    return (
      <>
        <SEO 
          title="Project Not Found - Adventuring Ghost"
          description="The requested project could not be found."
        />
        <div className="text-center py-12">
          <Card className="max-w-md mx-auto">
            <div className="space-y-4">
              <svg className="w-16 h-16 mx-auto text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 12h6m-6-4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              <h1 className="text-2xl font-bold text-gray-900">Project Not Found</h1>
              <p className="text-gray-600">
                The project you're looking for doesn't exist or has been moved.
              </p>
              <Link to="/projects">
                <Button>Back to Projects</Button>
              </Link>
            </div>
          </Card>
        </div>
      </>
    )
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Live':
        return 'bg-green-100 text-green-800'
      case 'Complete':
        return 'bg-blue-100 text-blue-800'
      case 'WIP':
        return 'bg-sunrise-yellow/20 text-sunrise-orange'
      case 'Archived':
        return 'bg-gray-100 text-gray-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  // Special handling for portfolio project
  if (project.slug === 'portfolio') {
    return (
      <>
        <SEO 
          title="AdventuringGhost Portfolio — Sunrise-themed developer site"
          description="Monorepo-based portfolio with shared UI, SEO/accessibility, and structured project pages."
          keywords="portfolio, react, typescript, monorepo, developer, frontend"
        />
        
        <div className="max-w-4xl mx-auto space-y-12">
          {/* Header */}
          <section className="text-center">
            <div className="flex items-center justify-center gap-4 mb-6">
              <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900">AdventuringGhost Portfolio</h1>
              <span className={`px-3 py-1 text-sm font-medium rounded-full ${getStatusColor(project.status || '')}`}>
                {project.status}
              </span>
            </div>
            <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
              {project.tagline}
            </p>
            
            {/* CTAs */}
            <div className="flex flex-wrap justify-center gap-4">
              {project.links.live && project.links.live !== 'LIVE_URL_PLACEHOLDER' && (
                <Button size="lg" onClick={() => window.open(project.links.live, '_blank')}>
                  View Live
                </Button>
              )}
              {project.links.github && project.links.github !== 'CODE_URL_PLACEHOLDER' && (
                <Button variant="secondary" size="lg" onClick={() => window.open(project.links.github, '_blank')}>
                  View Code
                </Button>
              )}
              {project.links.caseStudy && project.links.caseStudy !== 'CASE_STUDY_URL_PLACEHOLDER' && (
                <Button variant="secondary" size="lg" onClick={() => window.open(project.links.caseStudy, '_blank')}>
                  Case Study
                </Button>
              )}
            </div>
          </section>

          {/* Portfolio Screenshot */}
          {project.thumbnail && (
            <section>
              <div className="overflow-hidden rounded-2xl bg-gray-100">
                <img
                  src={project.thumbnail}
                  alt={`${project.title} screenshot`}
                  className="w-full max-h-96 object-cover"
                  onError={(e) => {
                    console.error('Failed to load Portfolio image:', project.thumbnail)
                    // Hide the image if it fails to load
                    e.currentTarget.style.display = 'none'
                  }}
                  onLoad={() => {
                    console.log('Successfully loaded Portfolio image:', project.thumbnail)
                  }}
                />
              </div>
            </section>
          )}

          {/* Overview */}
          <section>
            <Card className="p-8">
              <h2 className="text-3xl font-bold mb-6 text-gray-900">Overview</h2>
              <p className="text-lg text-gray-700 leading-relaxed">
                The AdventuringGhost Portfolio is my sleek, sunrise-themed developer showcase built inside a monorepo. The one you're on right now!
                It highlights projects,  my resume, and my case studies with a consistent design system based on the custom 
                sunrise palette. Beyond visuals, it demonstrates scalable architecture with npm workspaces and shared UI.
              </p>
            </Card>
          </section>

          {/* Tech Stack */}
          <section>
            <div className="bg-gray-100 rounded-2xl p-8 text-center">
            <Card className="p-8">
              <h2 className="text-3xl font-bold mb-6 text-gray-900">Tech Stack</h2>
              <ul className="space-y-3 text-lg text-gray-700">
                <li className="flex items-start gap-3">
                  <span className="text-sunrise-cyan mt-1">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </span>
                  <span><strong>React (Vite + TypeScript)</strong> — fast, strongly typed development</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-sunrise-cyan mt-1">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </span>
                  <span><strong>TailwindCSS</strong> — custom theming & responsive layouts</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-sunrise-cyan mt-1">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </span>
                  <span><strong>Monorepo (npm workspaces)</strong> — shared packages across apps</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-sunrise-cyan mt-1">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </span>
                  <span><strong>Accessibility & SEO</strong> — ARIA support, dynamic meta tags</span>
                </li>
              </ul>
            </Card>
            </div>
          </section>

          {/* Key Features */}
          <section>
            <Card className="p-8">
              <h2 className="text-3xl font-bold mb-6 text-gray-900">Key Features</h2>
              <ul className="space-y-3 text-lg text-gray-700">
                <li className="flex items-start gap-3">
                  <span className="text-sunrise-orange mt-1">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </span>
                  <span><strong>Project System</strong> — structured detail pages with routing (live, code, case study, video)</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-sunrise-orange mt-1">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </span>
                  <span><strong>Shared UI Library</strong> — reusable buttons, cards, inputs, theme components</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-sunrise-orange mt-1">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </span>
                  <span><strong>Contact Page</strong> — functional form with integrated social links</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-sunrise-orange mt-1">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </span>
                  <span><strong>Responsive Layout</strong> — simplified flex approach to avoid "bottom-up" loading</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-sunrise-orange mt-1">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </span>
                  <span><strong>Error Handling</strong> — image load failures handled gracefully to prevent layout shifts</span>
                </li>
              </ul>
            </Card>
          </section>

          {/* Architecture Decisions */}
          <section>
            <Card className="p-8">
              <h2 className="text-3xl font-bold mb-6 text-gray-900">Architecture Decisions</h2>
              <ul className="space-y-3 text-lg text-gray-700">
                <li className="flex items-start gap-3">
                  <span className="text-sunrise-pink mt-1">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </span>
                  <span><strong>File-based dependencies</strong> (e.g., file:../../) for stability across packages</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-sunrise-pink mt-1">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </span>
                  <span><strong>Direct CSS imports</strong> over Tailwind presets for simpler theme handling</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-sunrise-pink mt-1">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </span>
                  <span><strong>React Router v6</strong> with nested routes and lazy loading where applicable</span>
                </li>
              </ul>
            </Card>
          </section>

          {/* Lessons Learned */}
          <section>
            <Card className="p-8">
              <h2 className="text-3xl font-bold mb-6 text-gray-900">Lessons Learned</h2>
              <ul className="space-y-3 text-lg text-gray-700">
                <li className="flex items-start gap-3">
                  <span className="text-sunrise-yellow mt-1">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </span>
                  <span><strong>Keep hooks and logic inside component scope</strong> to avoid syntax errors</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-sunrise-yellow mt-1">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </span>
                  <span><strong>Prefer simple layout primitives</strong> over complex flex chains</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-sunrise-yellow mt-1">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </span>
                  <span><strong>Always handle asset errors</strong> for better UX</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-sunrise-yellow mt-1">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </span>
                  <span><strong>Share CSS/themes via imports</strong> rather than complex Tailwind preset chains</span>
                </li>
              </ul>
            </Card>
          </section>

          {/* Outcomes */}
          <section>
            <Card className="p-8">
              <h2 className="text-3xl font-bold mb-6 text-gray-900">Outcomes</h2>
              <ul className="space-y-3 text-lg text-gray-700">
                <li className="flex items-start gap-3">
                  <span className="text-green-500 mt-1">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </span>
                  <span><strong>Resolved 11 major issues</strong> during build</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-green-500 mt-1">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </span>
                  <span><strong>Production-ready in ~3 hours</strong></span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-green-500 mt-1">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </span>
                  <span><strong>Scalable base</strong> for future AdventuringGhost apps (Hike & Harvest, Glow+Grove)</span>
                </li>
              </ul>
            </Card>
          </section>

          {/* Footer */}
          <section className="text-center py-8 border-t border-gray-200">
            <div className="flex justify-center space-x-6 mb-4">
              <a href="#" className="text-gray-400 hover:text-sunrise-cyan transition-colors" aria-label="GitHub">
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                </svg>
              </a>
              <a href="#" className="text-gray-400 hover:text-sunrise-cyan transition-colors" aria-label="LinkedIn">
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
              </a>
              <a href="#" className="text-gray-400 hover:text-sunrise-cyan transition-colors" aria-label="Instagram">
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
              </a>
              <a href="#" className="text-gray-400 hover:text-sunrise-cyan transition-colors" aria-label="TikTok">
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z"/>
                </svg>
              </a>
              <a href="#" className="text-gray-400 hover:text-sunrise-cyan transition-colors" aria-label="RedNote">
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-1 16H6c-.55 0-1-.45-1-1V6c0-.55.45-1 1-1h12c.55 0 1 .45 1 1v12c0 .55-.45 1-1 1z"/>
                  <path d="M8 8h8v2H8V8zm0 3h6v2H8v-2zm0 3h4v2H8v-2z"/>
                </svg>
              </a>
            </div>
            <p className="text-sm text-gray-500">
              Sunrise palette: <span className="font-mono">#59D5E0</span> • <span className="font-mono">#F5DD61</span> • <span className="font-mono">#FAA300</span> • <span className="font-mono">#F4538A</span>
            </p>
          </section>

          {/* Back to Projects */}
          <div className="text-center">
            <Link to="/projects">
              <Button variant="secondary" size="lg">
                ← Back to Projects
              </Button>
            </Link>
          </div>
        </div>
      </>
    )
  }

  // Special handling for glow-grove project
  if (project.slug === 'glow-grove') {
    return (
      <>
        <SEO 
          title="Glow + Grove — E-commerce Demo"
          description="React/Vite demo store with full cart/checkout, localStorage persistence, analytics events, and demo-safe checkout."
          ogUrl="/projects/glow-grove"
        />
        
        <div className="max-w-4xl mx-auto space-y-12">
          {/* Header */}
          <section className="text-center">
            <div className="flex items-center justify-center gap-4 mb-6">
              <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900">Glow + Grove — E-commerce Demo</h1>
              <span className={`px-3 py-1 text-sm font-medium rounded-full ${getStatusColor(project.status || '')}`}>
                {project.status}
              </span>
            </div>
            <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
              Modern, demo-safe e-commerce with complete shopping flow and localStorage persistence
            </p>
            
            {/* CTAs */}
            <div className="flex flex-wrap justify-center gap-4">
              {project.links.live && project.links.live !== 'LIVE_URL_PLACEHOLDER' && (
                <Button size="lg" onClick={() => window.open(project.links.live, '_blank')} aria-label="View live Glow + Grove demo">
                  View Live
                </Button>
              )}
              {project.links.github && project.links.github !== 'CODE_URL_PLACEHOLDER' && (
                <Button variant="secondary" size="lg" onClick={() => window.open(project.links.github, '_blank')} aria-label="View Glow + Grove source code">
                  View Code
                </Button>
              )}
            </div>
          </section>

          {/* Thumbnail Placeholder */}
          <section>
            <div className="bg-gray-100 rounded-2xl p-8 text-center">
              <div className="w-full h-64 bg-gradient-to-br from-green-100 to-lime-100 rounded-xl flex items-center justify-center">
                <div className="text-center">
                  <svg className="w-16 h-16 mx-auto text-gray-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                  </svg>
                  <p className="text-gray-500 sr-only">No image available</p>
                </div>
              </div>
            </div>
          </section>

          {/* Overview */}
          <section>
            <Card className="p-8">
              <h2 className="text-3xl font-bold mb-6 text-gray-900">Overview</h2>
              <p className="text-lg text-gray-700 leading-relaxed">
                Glow + Grove is a modern e-commerce demo built with React 18, Vite 5, and TailwindCSS. It features a complete shopping flow (browse → cart → checkout → confirmation), robust state using Context + useReducer, and localStorage persistence. A demo notice replaces real payment to keep testing safe.
              </p>
            </Card>
          </section>

          {/* Theme & Palette */}
          <section>
            <Card className="p-8">
              <h2 className="text-3xl font-bold mb-6 text-gray-900">Theme & Palette</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="text-center">
                  <div className="w-full h-16 bg-[#78C841] rounded-lg mb-2"></div>
                  <p className="font-medium text-gray-900">sunrise-green</p>
                  <p className="text-sm text-gray-600">#78C841</p>
                </div>
                <div className="text-center">
                  <div className="w-full h-16 bg-[#B4E50D] rounded-lg mb-2"></div>
                  <p className="font-medium text-gray-900">sunrise-lime</p>
                  <p className="text-sm text-gray-600">#B4E50D</p>
                </div>
                <div className="text-center">
                  <div className="w-full h-16 bg-[#FF9B2F] rounded-lg mb-2"></div>
                  <p className="font-medium text-gray-900">sunrise-orange</p>
                  <p className="text-sm text-gray-600">#FF9B2F</p>
                </div>
                <div className="text-center">
                  <div className="w-full h-16 bg-[#FB4141] rounded-lg mb-2"></div>
                  <p className="font-medium text-gray-900">sunrise-red</p>
                  <p className="text-sm text-gray-600">#FB4141</p>
                </div>
              </div>
              <p className="text-gray-600 mt-4 text-center">50% pastel variants used as background accents</p>
            </Card>
          </section>

          {/* Key Features */}
          <section>
            <Card className="p-8">
              <h2 className="text-3xl font-bold mb-6 text-gray-900">Key Features</h2>
              <ul className="space-y-3 text-lg text-gray-700">
                <li className="flex items-start gap-3">
                  <span className="text-[#78C841] mt-1">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </span>
                  <span><strong>Shopping Cart:</strong> add/remove/set qty, clear, persisted via localStorage</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-[#78C841] mt-1">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </span>
                  <span><strong>Product Catalog:</strong> product grid, 12 dummy products, detail pages (`/products/:id`)</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-[#78C841] mt-1">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </span>
                  <span><strong>Checkout:</strong> shipping options (Standard $5.99, Express $12.99, Overnight $24.99, Free $0)</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-[#78C841] mt-1">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </span>
                  <span><strong>Orders:</strong> mock order IDs, confirmation page (`/order/:id`)</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-[#78C841] mt-1">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </span>
                  <span><strong>SEO:</strong> Product JSON-LD on detail pages</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-[#78C841] mt-1">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </span>
                  <span><strong>Demo Safety:</strong> clear disclaimer in checkout</span>
                </li>
              </ul>
            </Card>
          </section>

          {/* Analytics */}
          <section>
            <Card className="p-8">
              <h2 className="text-3xl font-bold mb-6 text-gray-900">Analytics</h2>
              <ul className="space-y-3 text-lg text-gray-700">
                <li className="flex items-start gap-3">
                  <span className="text-[#B4E50D] mt-1">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </span>
                  <span>Console events: <code className="bg-gray-100 px-2 py-1 rounded">view_item_list</code>, <code className="bg-gray-100 px-2 py-1 rounded">view_item</code>, <code className="bg-gray-100 px-2 py-1 rounded">add_to_cart</code>, <code className="bg-gray-100 px-2 py-1 rounded">begin_checkout</code>, <code className="bg-gray-100 px-2 py-1 rounded">purchase</code></span>
                </li>
              </ul>
            </Card>
          </section>

          {/* Pages & Routes */}
          <section>
            <Card className="p-8">
              <h2 className="text-3xl font-bold mb-6 text-gray-900">Pages & Routes</h2>
              <ul className="space-y-3 text-lg text-gray-700">
                <li className="flex items-start gap-3">
                  <span className="text-[#FF9B2F] mt-1">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </span>
                  <span>Home, Products, Product Detail, Cart, Checkout, Order Confirmation, Posts (12 dummy), Feedback, About</span>
                </li>
              </ul>
            </Card>
          </section>

          {/* Components */}
          <section>
            <Card className="p-8">
              <h2 className="text-3xl font-bold mb-6 text-gray-900">Components</h2>
              <ul className="space-y-3 text-lg text-gray-700">
                <li className="flex items-start gap-3">
                  <span className="text-[#FB4141] mt-1">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </span>
                  <span>Header + MiniCart, ProductCard, Price, SEO, FeedbackForm</span>
                </li>
              </ul>
            </Card>
          </section>

          {/* Lessons Learned */}
          <section>
            <Card className="p-8">
              <h2 className="text-3xl font-bold mb-6 text-gray-900">Lessons Learned</h2>
              <ul className="space-y-3 text-lg text-gray-700">
                <li className="flex items-start gap-3">
                  <span className="text-[#78C841] mt-1">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </span>
                  <span><strong>Consistent currency handling</strong> via &lt;Price /&gt; component</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-[#78C841] mt-1">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </span>
                  <span><strong>Keep cart derivations pure</strong> in reducer; avoid side effects in components</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-[#78C841] mt-1">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </span>
                  <span><strong>Use JSON-LD for product SEO</strong> even in demos</span>
                </li>
              </ul>
            </Card>
          </section>

          {/* Outcomes */}
          <section>
            <Card className="p-8">
              <h2 className="text-3xl font-bold mb-6 text-gray-900">Outcomes</h2>
              <ul className="space-y-3 text-lg text-gray-700">
                <li className="flex items-start gap-3">
                  <span className="text-green-500 mt-1">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </span>
                  <span><strong>Complete demo flow</strong> end-to-end</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-green-500 mt-1">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </span>
                  <span><strong>Clean navigation</strong> and green gradient hero</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-green-500 mt-1">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </span>
                  <span><strong>Clear demo notice</strong> prevents confusion</span>
                </li>
              </ul>
            </Card>
          </section>

          {/* Back to Projects */}
          <div className="text-center">
            <Link to="/projects">
              <Button variant="secondary" size="lg">
                ← Back to Projects
              </Button>
            </Link>
          </div>
        </div>
      </>
    )
     }

   // Special handling for hike-harvest project
   if (project.slug === 'hike-harvest') {
     return (
       <>
         <SEO 
           title="Hike Harvest — Trail Recipe Collection"
           description="A comprehensive recipe website designed for outdoor enthusiasts and trail cooking. Features recipe browsing by category, detailed cooking instructions, nutrition information, equipment lists, and community features."
           ogUrl="/projects/hike-harvest"
         />
         
         <div className="max-w-4xl mx-auto space-y-12">
           {/* Header */}
           <section className="text-center">
             <div className="flex items-center justify-center gap-4 mb-6">
               <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900">Hike Harvest — Trail Recipe Collection</h1>
               <span className={`px-3 py-1 text-sm font-medium rounded-full ${getStatusColor(project.status || '')}`}>
                 {project.status}
               </span>
             </div>
             <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
               Outdoor cooking companion with recipe sharing and trail tips
             </p>
             
             {/* CTAs */}
             <div className="flex flex-wrap justify-center gap-4">
               {project.links.live && project.links.live !== 'LIVE_URL_PLACEHOLDER' && (
                 <Button size="lg" onClick={() => window.open(project.links.live, '_blank')} aria-label="View live Hike Harvest site">
                   View Live Site
                 </Button>
               )}
               {project.links.github && project.links.github !== 'CODE_URL_PLACEHOLDER' && (
                 <Button variant="secondary" size="lg" onClick={() => window.open(project.links.github, '_blank')} aria-label="View Hike Harvest source code">
                   View Code
                 </Button>
               )}
             </div>
           </section>


           {/* Overview */}
           <section>
             <Card className="p-8">
               <h2 className="text-3xl font-bold mb-6 text-gray-900">Overview</h2>
               <p className="text-lg text-gray-700 leading-relaxed">
                 Hike Harvest is a comprehensive recipe website designed specifically for outdoor enthusiasts and trail cooking. It features a complete recipe management system with photo support, detailed cooking instructions, nutrition information, equipment lists, and community features. Built with React, TypeScript, and Tailwind CSS, it provides a mobile-first, accessible experience for discovering and sharing trail-ready recipes.
               </p>
             </Card>
           </section>

           {/* Key Features */}
           <section>
             <Card className="p-8">
               <h2 className="text-3xl font-bold mb-6 text-gray-900">Key Features</h2>
               <ul className="space-y-3 text-lg text-gray-700">
                 <li className="flex items-start gap-3">
                   <span className="text-sunrise-cyan mt-1">
                     <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                       <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                     </svg>
                   </span>
                   <span><strong>Recipe Categories:</strong> Breakfast, Lunch, Dinner, Snack, Dessert, and Drinks</span>
                 </li>
                 <li className="flex items-start gap-3">
                   <span className="text-sunrise-cyan mt-1">
                     <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                       <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                     </svg>
                   </span>
                   <span><strong>Photo Support:</strong> High-quality food imagery with fallback to category emojis</span>
                 </li>
                 <li className="flex items-start gap-3">
                   <span className="text-sunrise-cyan mt-1">
                     <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                       <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                     </svg>
                   </span>
                   <span><strong>Detailed Information:</strong> Nutrition facts, equipment lists, prep/cook times, and difficulty ratings</span>
                 </li>
                 <li className="flex items-start gap-3">
                   <span className="text-sunrise-cyan mt-1">
                     <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                       <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                     </svg>
                   </span>
                   <span><strong>Community Features:</strong> Trail cooking tips, community guidelines, and recipe submission</span>
                 </li>
                 <li className="flex items-start gap-3">
                   <span className="text-sunrise-cyan mt-1">
                     <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                       <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                     </svg>
                   </span>
                   <span><strong>Accessibility:</strong> Alt text support, keyboard navigation, and screen reader compatibility</span>
                 </li>
               </ul>
             </Card>
           </section>

           {/* Tech Stack */}
           <section>
             <Card className="p-8">
               <h2 className="text-3xl font-bold mb-6 text-gray-900">Tech Stack</h2>
               <ul className="space-y-3 text-lg text-gray-700">
                 <li className="flex items-start gap-3">
                   <span className="text-sunrise-orange mt-1">
                     <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                       <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                     </svg>
                   </span>
                   <span><strong>React 18:</strong> Modern component-based architecture with hooks</span>
                 </li>
                 <li className="flex items-start gap-3">
                   <span className="text-sunrise-orange mt-1">
                     <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                       <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                     </svg>
                   </span>
                   <span><strong>TypeScript:</strong> Full type safety throughout the application</span>
                 </li>
                 <li className="flex items-start gap-3">
                   <span className="text-sunrise-orange mt-1">
                     <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                       <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                     </svg>
                   </span>
                   <span><strong>Vite:</strong> Fast development server and build tooling</span>
                 </li>
                 <li className="flex items-start gap-3">
                   <span className="text-sunrise-orange mt-1">
                     <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                       <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                     </svg>
                   </span>
                   <span><strong>Tailwind CSS:</strong> Utility-first styling with custom color palette</span>
                 </li>
                 <li className="flex items-start gap-3">
                   <span className="text-sunrise-orange mt-1">
                     <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                       <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                     </svg>
                   </span>
                   <span><strong>React Router:</strong> Client-side routing with dynamic parameters</span>
                 </li>
                 <li className="flex items-start gap-3">
                   <span className="text-sunrise-orange mt-1">
                     <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                       <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                     </svg>
                   </span>
                   <span><strong>Mock API:</strong> Simulated backend with realistic data and delays</span>
                 </li>
               </ul>
             </Card>
           </section>

           {/* Design & UX */}
           <section>
             <Card className="p-8">
               <h2 className="text-3xl font-bold mb-6 text-gray-900">Design & UX</h2>
               <ul className="space-y-3 text-lg text-gray-700">
                 <li className="flex items-start gap-3">
                   <span className="text-sunrise-pink mt-1">
                     <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                       <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                     </svg>
                   </span>
                   <span><strong>Custom Color Palette:</strong> Earthy tones (#F0F2BD, #B2CD9C, #CA7842, #4B352A)</span>
                 </li>
                 <li className="flex items-start gap-3">
                   <span className="text-sunrise-pink mt-1">
                     <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                       <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                     </svg>
                   </span>
                   <span><strong>Inward Animations:</strong> Consistent hover effects that scale inward for polished feel</span>
                 </li>
                 <li className="flex items-start gap-3">
                   <span className="text-sunrise-pink mt-1">
                     <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                       <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                     </svg>
                   </span>
                   <span><strong>Mobile-First:</strong> Responsive design optimized for mobile devices</span>
                 </li>
                 <li className="flex items-start gap-3">
                   <span className="text-sunrise-pink mt-1">
                     <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                       <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                     </svg>
                   </span>
                   <span><strong>Visual Hierarchy:</strong> Clear content organization with containers and spacing</span>
                 </li>
                 <li className="flex items-start gap-3">
                   <span className="text-sunrise-pink mt-1">
                     <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                       <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                     </svg>
                   </span>
                   <span><strong>Accessibility:</strong> Alt text, keyboard navigation, and screen reader support</span>
                 </li>
               </ul>
             </Card>
           </section>

           {/* Development Progress */}
           <section>
             <Card className="p-8">
               <h2 className="text-3xl font-bold mb-6 text-gray-900">Development Progress</h2>
               <ul className="space-y-3 text-lg text-gray-700">
                 <li className="flex items-start gap-3">
                   <span className="text-green-500 mt-1">
                     <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                       <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                     </svg>
                   </span>
                   <span><strong>Core Architecture:</strong> React + TypeScript + Vite setup with routing</span>
                 </li>
                 <li className="flex items-start gap-3">
                   <span className="text-green-500 mt-1">
                     <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                       <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                     </svg>
                   </span>
                   <span><strong>Recipe System:</strong> Complete CRUD operations with mock API</span>
                 </li>
                 <li className="flex items-start gap-3">
                   <span className="text-green-500 mt-1">
                     <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                       <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                     </svg>
                   </span>
                   <span><strong>Photo Support:</strong> Image display with fallbacks and accessibility</span>
                 </li>
                 <li className="flex items-start gap-3">
                   <span className="text-green-500 mt-1">
                     <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                       <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                     </svg>
                   </span>
                   <span><strong>Category System:</strong> Recipe browsing by category with dedicated pages</span>
                 </li>
                 <li className="flex items-start gap-3">
                   <span className="text-green-500 mt-1">
                     <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                       <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                     </svg>
                   </span>
                   <span><strong>Community Features:</strong> Trail tips and community guidelines pages</span>
                 </li>
                 <li className="flex items-start gap-3">
                   <span className="text-green-500 mt-1">
                     <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                       <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                     </svg>
                   </span>
                   <span><strong>UI/UX Polish:</strong> Inward animations, responsive design, accessibility</span>
                 </li>
                 <li className="flex items-start gap-3">
                   <span className="text-gray-400 mt-1">
                     <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                       <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                       <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" />
                     </svg>
                   </span>
                   <span>Real backend integration (currently using mock data)</span>
                 </li>
                 <li className="flex items-start gap-3">
                   <span className="text-gray-400 mt-1">
                     <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                       <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                       <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" />
                     </svg>
                   </span>
                   <span>User authentication and recipe ownership</span>
                 </li>
               </ul>
             </Card>
           </section>

           {/* Project Outcomes */}
           <section>
             <Card className="p-8">
               <h2 className="text-3xl font-bold mb-6 text-gray-900">Project Outcomes</h2>
               <ul className="space-y-3 text-lg text-gray-700">
                 <li className="flex items-start gap-3">
                   <span className="text-green-500 mt-1">
                     <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                       <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                     </svg>
                   </span>
                   <span><strong>Complete Recipe System:</strong> Full CRUD operations with photo support</span>
                 </li>
                 <li className="flex items-start gap-3">
                   <span className="text-green-500 mt-1">
                     <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                       <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                     </svg>
                   </span>
                   <span><strong>Professional UI/UX:</strong> Polished design with consistent animations and accessibility</span>
                 </li>
                 <li className="flex items-start gap-3">
                   <span className="text-green-500 mt-1">
                     <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                       <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                     </svg>
                   </span>
                   <span><strong>Mobile-First Design:</strong> Responsive layout optimized for all devices</span>
                 </li>
                 <li className="flex items-start gap-3">
                   <span className="text-green-500 mt-1">
                     <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                       <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                     </svg>
                   </span>
                   <span><strong>Type Safety:</strong> Full TypeScript implementation with proper interfaces</span>
                 </li>
                 <li className="flex items-start gap-3">
                   <span className="text-green-500 mt-1">
                     <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                       <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                     </svg>
                   </span>
                   <span><strong>Production Ready:</strong> Live site with working functionality and mock data</span>
                 </li>
               </ul>
             </Card>
           </section>

           {/* Live Demo */}
           <section>
             <Card className="p-8 bg-sunrise-yellow/5 border-sunrise-yellow/20">
               <div className="flex items-start gap-4">
                 <svg className="w-6 h-6 text-sunrise-yellow mt-1 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                   <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
                 </svg>
                 <div>
                   <h3 className="text-lg font-semibold text-gray-900 mb-2">Live Demo Available</h3>
                   <p className="text-gray-700 mb-4">
                     Hike Harvest is fully functional and ready to explore! Browse recipes by category, view detailed cooking instructions, and experience the mobile-first design.
                   </p>
                   <div className="flex gap-4">
                     <Button size="lg" onClick={() => window.open('https://hike-harvest.com', '_blank')}>
                       View Live Site
                     </Button>
                     <Button variant="secondary" size="lg" onClick={() => window.open('https://hike-harvest.com/recipes', '_blank')}>
                       Browse Recipes
                     </Button>
                   </div>
                 </div>
               </div>
             </Card>
           </section>

           {/* Back to Projects */}
           <div className="text-center">
             <Link to="/projects">
               <Button variant="secondary" size="lg">
                 ← Back to Projects
               </Button>
             </Link>
           </div>
         </div>
       </>
     )
   }

   // Special handling for netops-showcase project
   if (project.slug === 'netops-showcase') {
     return (
       <>
         <SEO 
           title="NetOps Campus Build — CCNA-Level Network Project"
           description="Realistic campus network build with VLAN segmentation, inter-VLAN routing, DHCP services, NAT/PAT, and end-to-end connectivity verification."
           ogUrl="/projects/netops-showcase"
         />
         
         <div className="max-w-4xl mx-auto space-y-12 pt-8">
           {/* Header */}
           <section className="text-center">
             <div className="flex items-center justify-center gap-4 mb-6">
               <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900">NetOps Campus Build</h1>
               <span className={`px-3 py-1 text-sm font-medium rounded-full ${getStatusColor(project.status || '')}`}>
                 {project.status}
               </span>
             </div>
             <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
               Realistic CCNA-level campus network with comprehensive troubleshooting documentation
             </p>
             
             {/* CTAs */}
             <div className="flex flex-wrap justify-center gap-4">
               {project.links.github && project.links.github !== 'CODE_URL_PLACEHOLDER' && (
                 <Button variant="secondary" size="lg" onClick={() => window.open(project.links.github, '_blank')} aria-label="View NetOps source code">
                   View Documentation
                 </Button>
               )}
             </div>
           </section>

           {/* Project Timeline */}
           <section>
             <Card className="p-8">
               <h2 className="text-3xl font-bold mb-6 text-gray-900">📅 Project Timeline</h2>
               <div className="space-y-6">
                 <div className="flex items-start gap-4">
                   <div className="w-4 h-4 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                   <div>
                     <h3 className="text-lg font-semibold text-gray-900">Phase 1 – Building the Foundation</h3>
                     <p className="text-gray-600">Set up Core, Distribution, and Access switches; added the Core Router.</p>
                     <p className="text-sm text-gray-500 mt-1"><strong>Challenge:</strong> Tried to configure router subinterfaces on a switch → got errors.</p>
                     <p className="text-sm text-gray-500"><strong>Fix:</strong> Moved subinterface config to the Core Router (router-on-a-stick).</p>
                   </div>
                 </div>
                 
                 <div className="flex items-start gap-4">
                   <div className="w-4 h-4 bg-yellow-500 rounded-full mt-2 flex-shrink-0"></div>
                   <div>
                     <h3 className="text-lg font-semibold text-gray-900">Phase 2 – VLANs + DHCP</h3>
                     <p className="text-gray-600">Created VLANs for Students, Faculty, Labs, Admins, Mgmt. Configured DHCP pools on the Core Router.</p>
                     <p className="text-sm text-gray-500 mt-1"><strong>Challenge:</strong> PCs weren't getting IPs.</p>
                     <p className="text-sm text-gray-500"><strong>Fix:</strong> Realized PCs were still in VLAN 1. Configured access switchports to the right VLANs.</p>
                   </div>
                 </div>
                 
                 <div className="flex items-start gap-4">
                   <div className="w-4 h-4 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                   <div>
                     <h3 className="text-lg font-semibold text-gray-900">Phase 3 – NAT/PAT Setup</h3>
                     <p className="text-gray-600">Configured NAT overload so campus clients could reach the Internet.</p>
                     <p className="text-sm text-gray-500 mt-1"><strong>Challenge:</strong> NAT commands invalid on fa0/0/0 (a switch module port).</p>
                     <p className="text-sm text-gray-500"><strong>Fix:</strong> Re-cabled ISP link into a true routed interface (g0/0).</p>
                   </div>
                 </div>
                 
                 <div className="flex items-start gap-4">
                   <div className="w-4 h-4 bg-purple-500 rounded-full mt-2 flex-shrink-0"></div>
                   <div>
                     <h3 className="text-lg font-semibold text-gray-900">Phase 4 – Adding ISP Router + Internet Server</h3>
                     <p className="text-gray-600">Added a dedicated ISP Router (WAN side /30 to Core, LAN side to 8.8.8.8 server).</p>
                     <p className="text-sm text-gray-500 mt-1"><strong>Challenge:</strong> Core ↔ ISP pings failed.</p>
                     <p className="text-sm text-gray-500"><strong>Fix:</strong> Wrong cable/port used. Corrected cabling and assigned proper /30 IPs.</p>
                   </div>
                 </div>
                 
                 <div className="flex items-start gap-4">
                   <div className="w-4 h-4 bg-red-500 rounded-full mt-2 flex-shrink-0"></div>
                   <div>
                     <h3 className="text-lg font-semibold text-gray-900">Phase 5 – Full Verification</h3>
                     <p className="text-gray-600">End-to-end connectivity achieved (LAN ↔ Core ↔ ISP ↔ Internet Server).</p>
                     <ul className="text-sm text-gray-500 mt-1 list-disc list-inside">
                       <li>PCs pulled DHCP addresses</li>
                       <li>Clients pinged their gateways</li>
                       <li>Core Router ↔ ISP Router link stable</li>
                       <li>NAT translations visible</li>
                       <li>Student PC pinged 8.8.8.8 successfully</li>
                       <li>HTTP from Student PC to 8.8.8.8 showed the default server page</li>
                     </ul>
                   </div>
                 </div>
               </div>
             </Card>
           </section>

           {/* Project Screenshots */}
           <section>
             <Card className="p-8">
               <h2 className="text-3xl font-bold mb-6 text-gray-900">📸 Project Screenshots</h2>
               <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                 <div className="space-y-4">
                   <div>
                     <h3 className="text-lg font-semibold text-gray-900 mb-2">Network Topology</h3>
                     <img 
                       src={images.netopsShowcase} 
                       alt="Campus Network Topology showing Core Router, Distribution Switches, Access Switches, and ISP Router"
                       className="w-full rounded-lg border border-gray-200"
                       onError={(e) => {
                         console.error('Failed to load NetOps topology image')
                         e.currentTarget.style.display = 'none'
                       }}
                       onLoad={() => {
                         console.log('Successfully loaded NetOps topology image')
                       }}
                     />
                   </div>
                 </div>
                 <div className="space-y-4">
                   <div>
                     <h3 className="text-lg font-semibold text-gray-900 mb-2">Project Overview</h3>
                     <p className="text-gray-600 mb-4">
                       This campus network build demonstrates comprehensive CCNA-level networking skills including VLAN segmentation, 
                       inter-VLAN routing, DHCP services, and NAT/PAT configuration for internet connectivity.
                     </p>
                     <div className="bg-gray-50 rounded-lg p-4">
                       <h4 className="font-semibold text-gray-900 mb-2">Key Achievements:</h4>
                       <ul className="text-sm text-gray-700 space-y-1">
                         <li>• End-to-end connectivity verification</li>
                         <li>• Successful DHCP address assignment</li>
                         <li>• NAT translations working properly</li>
                         <li>• HTTP connectivity to internet server</li>
                       </ul>
                     </div>
                   </div>
                 </div>
               </div>
             </Card>
           </section>

           {/* Detailed Configuration Screenshots */}
           <section>
             <Card className="p-8">
               <h2 className="text-3xl font-bold mb-6 text-gray-900">🔧 Configuration Details</h2>
               <p className="text-gray-600 mb-6">
                 Here's a detailed look at the key configuration steps and troubleshooting process that made this network build successful.
               </p>
               
               <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                 <div className="space-y-6">
                   <div>
                     <h3 className="text-lg font-semibold text-gray-900 mb-3">Core Router Configuration</h3>
                     <img 
                       src={images.netopsCoreRouter} 
                       alt="Core Router running configuration showing VLAN subinterfaces, DHCP pools, and NAT configuration"
                       className="w-full rounded-lg border border-gray-200"
                       onError={(e) => {
                         console.error('Failed to load Core Router config')
                         e.currentTarget.style.display = 'none'
                       }}
                     />
                     <p className="text-sm text-gray-600 mt-2">
                       Router-on-a-stick configuration with VLAN subinterfaces, DHCP pools for each VLAN, and NAT overload for internet access.
                     </p>
                   </div>
                   
                   <div>
                     <h3 className="text-lg font-semibold text-gray-900 mb-3">VLAN Configuration</h3>
                     <img 
                       src={images.netopsVlanConfig} 
                       alt="Switch VLAN configuration showing VLAN assignments and trunking setup"
                       className="w-full rounded-lg border border-gray-200"
                       onError={(e) => {
                         console.error('Failed to load VLAN config')
                         e.currentTarget.style.display = 'none'
                       }}
                     />
                     <p className="text-sm text-gray-600 mt-2">
                       Access switch port configuration ensuring PCs are assigned to the correct VLANs for proper network segmentation.
                     </p>
                   </div>
                 </div>
                 
                 <div className="space-y-6">
                   <div>
                     <h3 className="text-lg font-semibold text-gray-900 mb-3">DHCP Configuration</h3>
                     <img 
                       src={images.netopsDhcpConfig} 
                       alt="DHCP pool configuration showing IP ranges and exclusions for each VLAN"
                       className="w-full rounded-lg border border-gray-200"
                       onError={(e) => {
                         console.error('Failed to load DHCP config')
                         e.currentTarget.style.display = 'none'
                       }}
                     />
                     <p className="text-sm text-gray-600 mt-2">
                       DHCP pools configured with proper IP ranges and exclusions to prevent conflicts with gateway and infrastructure addresses.
                     </p>
                   </div>
                   
                   <div>
                     <h3 className="text-lg font-semibold text-gray-900 mb-3">NAT Configuration</h3>
                     <img 
                       src={images.netopsNatConfig} 
                       alt="NAT overload configuration showing inside and outside interface assignments"
                       className="w-full rounded-lg border border-gray-200"
                       onError={(e) => {
                         console.error('Failed to load NAT config')
                         e.currentTarget.style.display = 'none'
                       }}
                     />
                     <p className="text-sm text-gray-600 mt-2">
                       NAT overload (PAT) configuration enabling internet access for all internal VLANs through the ISP connection.
                     </p>
                   </div>
                 </div>
               </div>
               
               <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
                 <div>
                   <h3 className="text-lg font-semibold text-gray-900 mb-3">ISP Router Setup</h3>
                   <img 
                     src={images.netopsIspRouter} 
                     alt="ISP Router configuration showing WAN and LAN interface setup"
                     className="w-full rounded-lg border border-gray-200"
                     onError={(e) => {
                       console.error('Failed to load ISP Router config')
                       e.currentTarget.style.display = 'none'
                     }}
                   />
                   <p className="text-sm text-gray-600 mt-2">
                     ISP Router configured with /30 WAN link to Core Router and connection to internet server (8.8.8.8).
                   </p>
                 </div>
                 
                 <div>
                   <h3 className="text-lg font-semibold text-gray-900 mb-3">End-to-End Connectivity Test</h3>
                   <img 
                     src={images.netopsConnectivity} 
                     alt="PC connectivity test showing successful ping to gateway and internet server"
                     className="w-full rounded-lg border border-gray-200"
                     onError={(e) => {
                         console.error('Failed to load connectivity test')
                         e.currentTarget.style.display = 'none'
                       }}
                   />
                   <p className="text-sm text-gray-600 mt-2">
                     Final verification showing successful ping from Student PC to gateway (192.168.10.1) and internet server (8.8.8.8).
                   </p>
                 </div>
               </div>
             </Card>
           </section>

           {/* Key Problems & Fixes */}
           <section>
             <Card className="p-8">
               <h2 className="text-3xl font-bold mb-6 text-gray-900">🔧 Key Problems & Fixes</h2>
               <div className="space-y-4">
                 <div className="border-l-4 border-red-400 pl-4">
                   <h3 className="font-semibold text-gray-900">Wrong device for router commands</h3>
                   <p className="text-gray-600">→ Fixed by configuring subinterfaces on Core Router</p>
                 </div>
                 <div className="border-l-4 border-yellow-400 pl-4">
                   <h3 className="font-semibold text-gray-900">DHCP leases not working</h3>
                   <p className="text-gray-600">→ Fixed by reassigning access ports into correct VLANs</p>
                 </div>
                 <div className="border-l-4 border-blue-400 pl-4">
                   <h3 className="font-semibold text-gray-900">IP conflicts</h3>
                   <p className="text-gray-600">→ Fixed by excluding gateway + infra IPs in DHCP pools</p>
                 </div>
                 <div className="border-l-4 border-purple-400 pl-4">
                   <h3 className="font-semibold text-gray-900">NAT invalid</h3>
                   <p className="text-gray-600">→ Fixed by moving ISP link to a true routed port</p>
                 </div>
                 <div className="border-l-4 border-green-400 pl-4">
                   <h3 className="font-semibold text-gray-900">Core ↔ ISP ping failed</h3>
                   <p className="text-gray-600">→ Fixed cabling and IP subnet mismatch</p>
                 </div>
               </div>
             </Card>
           </section>

           {/* Network Components */}
           <section>
             <Card className="p-8">
               <h2 className="text-3xl font-bold mb-6 text-gray-900">🛠️ Network Components</h2>
               <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                 <div>
                   <h3 className="text-lg font-semibold text-gray-900 mb-3">Core Infrastructure</h3>
                   <ul className="space-y-2 text-gray-700">
                     <li className="flex items-center gap-2">
                       <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                       <span>Core Router: Inter-VLAN routing, DHCP server, NAT/PAT</span>
                     </li>
                     <li className="flex items-center gap-2">
                       <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                       <span>Distribution Switches: VLAN trunking, spanning tree</span>
                     </li>
                     <li className="flex items-center gap-2">
                       <span className="w-2 h-2 bg-yellow-500 rounded-full"></span>
                       <span>Access Switches: Port configuration, VLAN assignment</span>
                     </li>
                     <li className="flex items-center gap-2">
                       <span className="w-2 h-2 bg-purple-500 rounded-full"></span>
                       <span>ISP Router: Internet connectivity simulation</span>
                     </li>
                   </ul>
                 </div>
                 <div>
                   <h3 className="text-lg font-semibold text-gray-900 mb-3">VLAN Configuration</h3>
                   <ul className="space-y-2 text-gray-700">
                     <li className="flex items-center gap-2">
                       <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                       <span>VLAN 10: Students (192.168.10.0/24)</span>
                     </li>
                     <li className="flex items-center gap-2">
                       <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                       <span>VLAN 20: Faculty (192.168.20.0/24)</span>
                     </li>
                     <li className="flex items-center gap-2">
                       <span className="w-2 h-2 bg-yellow-500 rounded-full"></span>
                       <span>VLAN 30: Labs (192.168.30.0/24)</span>
                     </li>
                     <li className="flex items-center gap-2">
                       <span className="w-2 h-2 bg-purple-500 rounded-full"></span>
                       <span>VLAN 40: Admins (192.168.40.0/24)</span>
                     </li>
                     <li className="flex items-center gap-2">
                       <span className="w-2 h-2 bg-red-500 rounded-full"></span>
                       <span>VLAN 50: Management (192.168.50.0/24)</span>
                     </li>
                   </ul>
                 </div>
               </div>
             </Card>
           </section>

           {/* Skills Demonstrated */}
           <section>
             <Card className="p-8">
               <h2 className="text-3xl font-bold mb-6 text-gray-900">🎓 Skills Demonstrated</h2>
               <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                 <ul className="space-y-3 text-lg text-gray-700">
                   <li className="flex items-start gap-3">
                     <span className="text-sunrise-cyan mt-1">
                       <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                         <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                       </svg>
                     </span>
                     <span><strong>Network Design:</strong> Hierarchical campus network architecture</span>
                   </li>
                   <li className="flex items-start gap-3">
                     <span className="text-sunrise-cyan mt-1">
                       <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                         <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                       </svg>
                     </span>
                     <span><strong>VLAN Implementation:</strong> Segmentation and inter-VLAN routing</span>
                   </li>
                   <li className="flex items-start gap-3">
                     <span className="text-sunrise-cyan mt-1">
                       <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                         <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                       </svg>
                     </span>
                     <span><strong>DHCP Services:</strong> Dynamic IP address assignment</span>
                   </li>
                 </ul>
                 <ul className="space-y-3 text-lg text-gray-700">
                   <li className="flex items-start gap-3">
                     <span className="text-sunrise-orange mt-1">
                       <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                         <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                       </svg>
                     </span>
                     <span><strong>NAT/PAT:</strong> Internet connectivity for private networks</span>
                   </li>
                   <li className="flex items-start gap-3">
                     <span className="text-sunrise-orange mt-1">
                       <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                         <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                       </svg>
                     </span>
                     <span><strong>Troubleshooting:</strong> Systematic problem identification and resolution</span>
                   </li>
                   <li className="flex items-start gap-3">
                     <span className="text-sunrise-orange mt-1">
                       <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                         <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                       </svg>
                     </span>
                     <span><strong>Documentation:</strong> Clear project timeline and problem-solving process</span>
                   </li>
                 </ul>
               </div>
             </Card>
           </section>

           {/* Final Outcome */}
           <section>
             <Card className="p-8 bg-green-50 border-green-200">
               <h2 className="text-3xl font-bold mb-6 text-gray-900">🏆 Final Outcome</h2>
               <p className="text-lg text-gray-700 mb-4">
                 This project shows a <strong>realistic CCNA-level campus build</strong> with:
               </p>
               <ul className="space-y-2 text-gray-700">
                 <li className="flex items-center gap-2">
                   <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                   <span>VLAN segmentation</span>
                 </li>
                 <li className="flex items-center gap-2">
                   <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                   <span>Inter-VLAN routing</span>
                 </li>
                 <li className="flex items-center gap-2">
                   <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                   <span>DHCP services</span>
                 </li>
                 <li className="flex items-center gap-2">
                   <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                   <span>NAT/PAT for Internet access</span>
                 </li>
                 <li className="flex items-center gap-2">
                   <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                   <span>ISP router simulation</span>
                 </li>
                 <li className="flex items-center gap-2">
                   <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                   <span>End-to-end verification</span>
                 </li>
               </ul>
               <p className="text-gray-600 mt-4">
                 It's portfolio-ready as a <strong>case study in network design, troubleshooting, and problem-solving</strong>.
               </p>
             </Card>
           </section>

           {/* Back to Projects */}
           <div className="text-center">
             <Link to="/projects">
               <Button variant="secondary" size="lg">
                 ← Back to Projects
               </Button>
             </Link>
           </div>
         </div>
       </>
     )
   }

   // Default project detail rendering for other projects
  return (
    <>
      <SEO 
        title={`${project.title} - Portfolio`}
        description={project.tagline}
        keywords={project.tech.join(', ')}
      />
      
      <div className="space-y-8">
        {/* Header */}
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-2">{project.title}</h1>
            <p className="text-xl text-gray-600 mb-4">{project.tagline}</p>
          </div>
          <span className={`px-3 py-1 text-sm font-medium rounded-full ${getStatusColor(project.status || '')}`}>
            {project.status}
          </span>
        </div>

        {/* Project Links */}
        <ProjectLinks links={project.links} />

        {/* Thumbnail */}
        {project.thumbnail && (
          <div className="overflow-hidden rounded-lg bg-gray-100">
            <img
              src={project.thumbnail}
              alt={`${project.title} screenshot`}
              className="w-full max-h-96 object-cover"
              onError={(e) => {
                // Hide the image if it fails to load
                e.currentTarget.style.display = 'none'
              }}
            />
          </div>
        )}

        {/* Tech Stack */}
        <div>
          <h2 className="text-2xl font-semibold mb-4">Tech Stack</h2>
          <div className="flex flex-wrap gap-2">
            {project.tech.map((tech) => (
              <span
                key={tech}
                className="px-3 py-1 bg-sunrise-cyan/10 text-sunrise-cyan text-sm rounded-full"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>

        {/* Highlights */}
        {project.highlights && project.highlights.length > 0 && (
          <div>
            <h2 className="text-2xl font-semibold mb-4">Key Features</h2>
            <ul className="space-y-2">
              {project.highlights.map((highlight, index) => (
                <li key={index} className="flex items-start gap-3">
                  <span className="text-sunrise-cyan mt-1">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </span>
                  <span className="text-gray-700">{highlight}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Description */}
        <div>
          <h2 className="text-2xl font-semibold mb-4">About This Project</h2>
          <div className="prose prose-gray max-w-none">
            <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">
              {project.description}
            </p>
          </div>
        </div>

        {/* Back to Projects */}
        <div className="pt-8 border-t border-gray-200">
          <Link to="/projects">
            <Button variant="secondary">
              ← Back to Projects
            </Button>
          </Link>
        </div>
      </div>
    </>
  )
}

