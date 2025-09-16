import { useState, useMemo } from 'react'
import { Card, Input } from '@adventuringghost/ui'
import { SEO } from '../components/SEO'
import { ProjectCard } from '../components/ProjectCard'
import { projects } from '../data/projects'

export const ProjectsIndex = () => {
  const [searchTerm, setSearchTerm] = useState('')

  const filteredProjects = useMemo(() => {
    const filtered = projects.filter(project => {
      const searchLower = searchTerm.toLowerCase()
      return (
        project.title.toLowerCase().includes(searchLower) ||
        project.tagline.toLowerCase().includes(searchLower) ||
        project.tech.some(tech => tech.toLowerCase().includes(searchLower))
      )
    })

    // Sort by date (undefined dates at bottom)
    return filtered.sort((a, b) => {
      if (!a.date && !b.date) return 0
      if (!a.date) return 1
      if (!b.date) return -1
      return new Date(b.date).getTime() - new Date(a.date).getTime()
    })
  }, [searchTerm])

  return (
    <>
      <SEO 
        title="Projects - Adventuring Ghost"
        description="A collection of projects showcasing my skills in web development, from simple websites to complex full-stack applications."
        keywords="projects, web development, react, typescript, full-stack, portfolio"
      />
      
      <div className="space-y-8">
        <div className="text-center">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4">Projects</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            A collection of projects showcasing my skills in web development, 
            from simple websites to complex full-stack applications.
          </p>
        </div>

        <div className="max-w-md mx-auto">
          <Input
            type="text"
            placeholder="Search projects by title, tagline, or tech..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full"
          />
        </div>

        {filteredProjects.length === 0 ? (
          <Card className="text-center py-12">
            <div className="space-y-4">
              <svg className="w-16 h-16 mx-auto text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <h3 className="text-lg font-semibold text-gray-900">No projects found</h3>
              <p className="text-gray-600">
                Try adjusting your search terms or browse all projects.
              </p>
              {searchTerm && (
                <button
                  onClick={() => setSearchTerm('')}
                  className="text-sunrise-cyan hover:text-sunrise-orange transition-colors"
                >
                  Clear search
                </button>
              )}
            </div>
          </Card>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProjects.map((project) => (
              <ProjectCard key={project.slug} project={project} />
            ))}
          </div>
        )}

        {searchTerm && filteredProjects.length > 0 && (
          <div className="text-center text-sm text-gray-600">
            Showing {filteredProjects.length} of {projects.length} projects
          </div>
        )}
      </div>
    </>
  )
}
