import { Link } from 'react-router-dom'

export const NotFound = () => {
  return (
    <div className="text-center py-16">
      <div className="text-8xl mb-6">🏔️</div>
      <h1 className="text-4xl font-bold text-mountain-900 mb-4">Lost on the Trail?</h1>
      <p className="text-xl text-mountain-600 mb-8 max-w-md mx-auto">
        Looks like you've wandered off the beaten path. Let's get you back to the main trail.
      </p>
      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <Link to="/">
          <button className="btn-primary">
            Back to Home
          </button>
        </Link>
        <Link to="/recipes">
          <button className="btn-secondary">
            Browse Recipes
          </button>
        </Link>
      </div>
    </div>
  )
}
