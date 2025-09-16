import { Link } from 'react-router-dom'
import { Card, Button } from '@adventuringghost/ui'
import { SEO } from '../components/SEO'

export const NotFound = () => {
  return (
    <>
      <SEO 
        title="Page Not Found - Adventuring Ghost"
        description="The page you're looking for doesn't exist."
      />
      
      <div className="min-h-[60vh] flex items-center justify-center">
        <Card className="max-w-md mx-auto text-center">
          <div className="space-y-6">
            <div className="space-y-2">
              <h1 className="text-6xl font-bold text-sunrise-cyan">404</h1>
              <h2 className="text-2xl font-semibold text-gray-900">Page Not Found</h2>
            </div>
            
            <p className="text-gray-600">
              The page you're looking for doesn't exist or has been moved.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link to="/">
                <Button>Go Home</Button>
              </Link>
              <Link to="/projects">
                <Button variant="secondary">View Projects</Button>
              </Link>
            </div>
          </div>
        </Card>
      </div>
    </>
  )
}
