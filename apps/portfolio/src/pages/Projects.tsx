import { Card, Button } from '@adventuringghost/ui'
import { SEO } from '../components/SEO'
import { Link } from 'react-router-dom'
import { projects } from '../data/projects'

export const Projects = () => {

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

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project) => (
            <Card key={project.slug} className="flex flex-col hover:shadow-xl transition-shadow duration-300">
              {/* Project Thumbnail */}
              {project.thumbnail && (
                <div className="mb-4 overflow-hidden rounded-lg bg-gray-100">
                  <img
                    src={project.thumbnail}
                    alt={`${project.title} screenshot`}
                    className="w-full h-48 object-cover"
                    onError={(e) => {
                      console.error('Failed to load image:', project.thumbnail)
                      // Hide the image if it fails to load
                      e.currentTarget.style.display = 'none'
                    }}
                    onLoad={() => {
                      console.log('Successfully loaded image:', project.thumbnail)
                    }}
                  />
                </div>
              )}
              
              <div className="flex-1">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-xl font-semibold">{project.title}</h3>
                  <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(project.status || '')}`}>
                    {project.status}
                  </span>
                </div>
                <p className="text-gray-600 mb-4 flex-1">{project.tagline}</p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.tech.slice(0, 3).map((tech) => (
                    <span
                      key={tech}
                      className="px-2 py-1 bg-sunrise-cyan/10 text-sunrise-cyan text-sm rounded"
                    >
                      {tech}
                    </span>
                  ))}
                  {project.tech.length > 3 && (
                    <span className="px-2 py-1 bg-gray-100 text-gray-600 text-sm rounded">
                      +{project.tech.length - 3} more
                    </span>
                  )}
                </div>
              </div>
              <div className="flex gap-2">
                <Link to={`/projects/${project.slug}`} className="flex-1">
                  <Button size="sm" className="w-full">
                    View Project
                  </Button>
                </Link>
                {project.links.live && project.links.live !== 'LIVE_URL_PLACEHOLDER' && (
                  <Button 
                    variant="secondary" 
                    size="sm"
                    onClick={() => window.open(project.links.live, '_blank')}
                  >
                    Live
                  </Button>
                )}
              </div>
            </Card>
          ))}
        </div>

        <div className="text-center">
          <Card className="max-w-md mx-auto">
            <h3 className="text-xl font-semibold mb-2">Have a project in mind?</h3>
            <p className="text-gray-600 mb-4">
              I'm always interested in new opportunities and exciting projects.
            </p>
            <Link to="/contact">
              <Button>Let's Talk</Button>
            </Link>
          </Card>
        </div>
      </div>
    </>
  )
}
