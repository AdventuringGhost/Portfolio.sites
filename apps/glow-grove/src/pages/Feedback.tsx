import { SEO } from '../components/SEO';
import { FeedbackForm } from '../components/FeedbackForm';

export const Feedback = () => {
  return (
    <>
      <SEO
        title="Feedback - Glow+Grove"
        description="Share your thoughts and experiences with our products and skincare journey."
      />
      
      <main className="p-6">
        <div className="max-w-4xl mx-auto">
          <header className="text-center mb-12">
            <h1 className="text-3xl font-bold mb-4">Feedback</h1>
            <p className="text-lg text-gray-600">
              We'd love to hear from you! Share your experience, ask questions, or suggest improvements.
            </p>
          </header>

          <FeedbackForm />
        </div>
      </main>
    </>
  );
};












