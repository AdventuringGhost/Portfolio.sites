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
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  return (
    <Link to={`/projects/${project.slug}`} className="block group">
      <Card className="h-full hover:shadow-xl transition-all duration-300 group-hover:scale-[1.02]">
        {project.thumbnail && (
          <div className="mb-4 overflow-hidden rounded-lg bg-gray-100">
            <img
              src={project.thumbnail}
              alt={`${project.title} thumbnail`}
              className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
              onError={(e) => {
                // Hide the image if it fails to load
                e.currentTarget.style.display = 'none'
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
