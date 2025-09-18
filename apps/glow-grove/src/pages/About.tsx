import { SEO } from '../components/SEO';
import { Link } from 'react-router-dom';

export const About = () => {
  return (
    <>
      <SEO
        title="About - Glow+Grove"
        description="Learn about our mission to provide gentle, effective skincare products and expert advice."
      />
      
      <main className="p-6 space-y-6">
        <header className="space-y-2">
          <h1 className="text-3xl font-bold">About Glow+Grove</h1>
          <p className="text-zinc-600">nurture your skin, embrace your glow</p>
        </header>

        <section className="space-y-3">
          <h2 className="text-xl font-semibold">Our Mission</h2>
          <p className="leading-relaxed">
            At Glow+Grove, we believe that skincare should be simple, effective, and enjoyable. 
            We're passionate about creating gentle, science-backed products that work with your 
            skin's natural processes rather than against them.
          </p>
        </section>

        <section className="grid gap-4 md:grid-cols-2">
          <div className="rounded-2xl border border-sunrise-orange/30 bg-white p-5 shadow">
            <h3 className="font-semibold mb-1">Our Philosophy</h3>
            <p className="text-zinc-700">
              Less is more. We focus on proven ingredients, gentle formulations, and 
              sustainable practices that respect both your skin and the environment.
            </p>
          </div>
          <div className="rounded-2xl border border-sunrise-orange/30 bg-white p-5 shadow">
            <h3 className="font-semibold mb-1">Our Promise</h3>
            <p className="text-zinc-700">
              Every product is thoughtfully formulated, thoroughly tested, and designed 
              to become a trusted part of your daily skincare ritual.
            </p>
          </div>
        </section>

        <section className="rounded-2xl border border-sunrise-orange/30 bg-white p-5 shadow space-y-2">
          <h3 className="font-semibold">Our Values</h3>
          <ul className="list-disc pl-6 space-y-1 text-zinc-700">
            <li><strong>Gentle Effectiveness:</strong> Products that work without irritation</li>
            <li><strong>Transparency:</strong> Clear ingredient lists and honest communication</li>
            <li><strong>Sustainability:</strong> Eco-friendly packaging and responsible sourcing</li>
            <li><strong>Education:</strong> Empowering you with knowledge about your skin</li>
            <li><strong>Community:</strong> Building a supportive skincare community</li>
          </ul>
        </section>

        <section className="grid gap-4 md:grid-cols-2">
          <div className="rounded-2xl border border-sunrise-orange/30 bg-white p-5 shadow">
            <h3 className="font-semibold mb-1">Our Story</h3>
            <p className="text-zinc-700">
              Founded by skincare enthusiasts who were tired of complicated routines and 
              harsh products, Glow+Grove was born from a simple idea: skincare should 
              make you feel good, not overwhelmed.
            </p>
          </div>
          <div className="rounded-2xl border border-sunrise-orange/30 bg-white p-5 shadow">
            <h3 className="font-semibold mb-1">Join Our Journey</h3>
            <p className="text-zinc-700">
              Whether you're a skincare newbie or a seasoned enthusiast, we're here to 
              support your glow journey with products and advice you can trust.
            </p>
          </div>
        </section>

        <section className="text-center pt-8 border-t border-gray-200">
          <p className="text-gray-600 mb-4">
            Built with the same care as our skincare products.
          </p>
          <Link
            to="http://localhost:3000"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-sunrise-pink hover:text-sunrise-orange transition-colors duration-200"
          >
            <span>View the Portfolio</span>
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
          </Link>
        </section>
      </main>
    </>
  );
};












