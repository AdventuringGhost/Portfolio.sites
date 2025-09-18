import { Link } from 'react-router-dom'
import { Card } from '@adventuringghost/ui'
import type { Project } from '@adventuringghost/types'

interface ProjectCardProps {
  project: Project
}

export const ProjectCard = ({ project }: ProjectCardProps) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Live':
        return 'bg-green-100 text-green-800'
      case 'WIP':
        return 'bg-sunrise-yellow/20 text-sunrise-orange'
      case 'Archived':
        return 'bg-gray-100 text-gray-800'
      case 'You Are Here':
        return 'bg-red-600 text-white font-bold'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  // Special styling for Portfolio project
  const isPortfolio = project.slug === 'portfolio'

  return (
    <Link to={`/projects/${project.slug}`} className="block group">
      <Card className={`h-full hover:shadow-xl transition-all duration-300 group-hover:scale-[1.02] ${
        isPortfolio ? 'bg-custom-mint/20 border-2 border-custom-mint' : ''
      }`}>
        {project.thumbnail && (
          <div className="mb-4 overflow-hidden rounded-lg bg-gray-100">
            <img
              src={project.thumbnail}
              alt={`${project.title} thumbnail`}
              className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
              onError={(e) => {
                console.error('Failed to load image:', project.thumbnail)
                // Show a placeholder instead of hiding
                e.currentTarget.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZjNmNGY2Ii8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJBcmlhbCwgc2Fucy1zZXJpZiIgZm9udC1zaXplPSIxNCIgZmlsbD0iIzZiNzI4MCIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iPkltYWdlIG5vdCBmb3VuZDwvdGV4dD48L3N2Zz4='
              }}
              onLoad={() => {
                console.log('Successfully loaded image:', project.thumbnail)
              }}
            />
          </div>
        )}
        
        <div className="flex items-start justify-between mb-2">
          <h3 className="text-xl font-semibold text-gray-900 group-hover:text-sunrise-cyan transition-colors">
            {project.title}
          </h3>
          <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(project.status || '')}`}>
            {project.status}
          </span>
        </div>
        
        <p className="text-gray-600 mb-3 text-sm">
          {project.tagline}
        </p>
        
        <div className="flex flex-wrap gap-2">
          {project.tech.slice(0, 3).map((tech) => (
            <span
              key={tech}
              className="px-2 py-1 bg-sunrise-cyan/10 text-sunrise-cyan text-xs rounded"
            >
              {tech}
            </span>
          ))}
          {project.tech.length > 3 && (
            <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded">
              +{project.tech.length - 3} more
            </span>
          )}
        </div>
      </Card>
    </Link>
  )
}
