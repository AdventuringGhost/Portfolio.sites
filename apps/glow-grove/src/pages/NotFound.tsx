import { Link } from 'react-router-dom';
import { SEO } from '../components/SEO';

export const NotFound = () => {
  return (
    <>
      <SEO
        title="Page Not Found - Glow+Grove"
        description="The page you are looking for does not exist."
      />
      
      <div className="text-center py-16 space-y-6">
        <h1 className="text-4xl font-bold text-gray-800">Page Not Found</h1>
        <p className="text-lg text-gray-600">
          We couldn't find the page you're looking for.
        </p>
        <Link to="/" className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-sunrise-pink hover:bg-sunrise-orange transition-colors duration-200">
          Back to Home
        </Link>
      </div>
    </>
  );
};









