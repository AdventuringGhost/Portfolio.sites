import { Link } from 'react-router-dom';
import { SEO } from '../components/SEO';
import { ProductCard } from '../components/ProductCard';
import { PostCard } from '../components/PostCard';
import { products } from '../data/products';
import { posts } from '../data/posts';

export const Home = () => {
  const featuredProduct = products[0];
  const featuredPost = posts[0];

  return (
    <>
      <SEO
        title="Glow+Grove - Gentle Skincare for Every Skin"
        description="Discover gentle, effective skincare products that work with your skin's natural processes."
      />
      
      <main>
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-sunrise-green to-sunrise-lime text-white py-20">
          <div className="container mx-auto px-6 text-center">
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              Gentle Skincare, 
              <span className="block">Natural Results</span>
            </h1>
            <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto opacity-90">
              Discover our collection of gentle, effective products that work with your skin's natural processes.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/products" className="bg-white text-sunrise-green hover:bg-gray-100 font-semibold py-4 px-8 rounded-lg transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5">
                Shop Products
              </Link>
              <Link to="/quiz" className="bg-white text-sunrise-green hover:bg-gray-100 font-semibold py-4 px-8 rounded-lg transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5">
                Take Quiz
              </Link>
              <Link to="/about" className="border-2 border-white text-white hover:bg-white hover:text-sunrise-green font-semibold py-4 px-8 rounded-lg transition-all duration-200">
                Learn More
              </Link>
            </div>
          </div>
        </section>

        {/* Featured Content */}
        <section className="py-20 bg-gray-50">
          <div className="container mx-auto px-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
              {/* Featured Product */}
              <div>
                <h2 className="text-3xl font-bold mb-8 text-gray-900">Featured Product</h2>
                <ProductCard product={featuredProduct} />
              </div>

              {/* Featured Post */}
              <div className="mt-8">
                <h2 className="text-3xl font-bold mb-8 text-gray-900">Latest from Our Blog</h2>
                <PostCard post={featuredPost} />
              </div>
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-6 text-center">
            <h2 className="text-3xl font-bold mb-4 text-gray-900">Ready to Transform Your Skincare?</h2>
            <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
              Join thousands of customers who have discovered the power of gentle, effective skincare.
            </p>
            <Link to="/products" className="btn-primary text-lg px-8 py-4">
              Start Your Journey
            </Link>
          </div>
        </section>
      </main>
    </>
  );
};
