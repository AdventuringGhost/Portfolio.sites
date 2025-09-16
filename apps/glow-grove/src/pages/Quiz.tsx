import { useState } from 'react';
import { SEO } from '../components/SEO';

// interface QuizAnswer {
//   question: string;
//   answer: string;
// }

interface QuizResult {
  title: string;
  items: string[];
}

const questions = [
  {
    id: 'lifestyle',
    question: 'What best describes your lifestyle?',
    options: ['Outdoorsy', 'Urban', 'Minimalist', 'Luxury']
  },
  {
    id: 'budget',
    question: 'What\'s your skincare budget?',
    options: ['$', '$$', '$$$', '$$$$']
  },
  {
    id: 'concerns',
    question: 'What are your main skin concerns?',
    options: ['Acne', 'Aging', 'Dryness', 'Sensitivity']
  }
];

const recommend = (answers: string[]): QuizResult => {
  // Simple recommendation logic based on answers
  const [lifestyle, budget, concerns] = answers;
  
  if (lifestyle === 'Outdoorsy' && budget === '$$' && concerns === 'Sensitivity') {
    return {
      title: 'Trail-Ready',
      items: ['Eco-friendly mugs', 'Sunscreen', 'Gentle cleanser']
    };
  }
  
  if (lifestyle === 'Urban' && budget === '$$$') {
    return {
      title: 'City Glow',
      items: ['Anti-pollution serum', 'Hydrating mist', 'Night cream']
    };
  }
  
  if (lifestyle === 'Minimalist') {
    return {
      title: 'Simple & Effective',
      items: ['All-in-one cleanser', 'Moisturizer', 'SPF']
    };
  }
  
  return {
    title: 'Custom Care',
    items: ['Gentle cleanser', 'Moisturizer', 'Sunscreen']
  };
};

export const Quiz = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<string[]>([]);
  const [result, setResult] = useState<QuizResult | null>(null);

  const handleAnswer = (answer: string) => {
    const newAnswers = [...answers, answer];
    setAnswers(newAnswers);

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      const rec = recommend(newAnswers);
      setResult(rec);
      
      // Send to local API (best-effort; non-blocking)
      const base = import.meta.env.VITE_API_BASE || 'http://localhost:4001';
      fetch(base + '/api/quiz-results', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          answers: newAnswers,
          result: rec,
          meta: { ua: navigator.userAgent }
        })
      })
      .then(()=>{})
      .catch(() => {});
    }
  };

  const resetQuiz = () => {
    setCurrentQuestion(0);
    setAnswers([]);
    setResult(null);
  };

  if (result) {
    return (
      <>
        <SEO
          title="Quiz Results - Glow+Grove"
          description="Your personalized skincare recommendations."
        />
        <div className="max-w-2xl mx-auto text-center py-16">
          <h1 className="text-4xl font-bold mb-8 text-gray-900">Your Results</h1>
          <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
            <h2 className="text-2xl font-semibold mb-4 text-sunrise-green">{result.title}</h2>
            <p className="text-gray-600 mb-6">Based on your answers, here are our recommendations:</p>
            <ul className="space-y-2">
              {result.items.map((item, index) => (
                <li key={index} className="text-lg text-gray-800">• {item}</li>
              ))}
            </ul>
          </div>
          <button
            onClick={resetQuiz}
            className="btn-primary"
          >
            Take Quiz Again
          </button>
        </div>
      </>
    );
  }

  const question = questions[currentQuestion];

  return (
    <>
      <SEO
        title="Skincare Quiz - Glow+Grove"
        description="Find your perfect skincare routine with our personalized quiz."
      />
      <div className="max-w-2xl mx-auto text-center py-16">
        <h1 className="text-4xl font-bold mb-8 text-gray-900">Find Your Perfect Skincare</h1>
        
        <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
          <div className="mb-6">
            <div className="text-sm text-gray-500 mb-2">
              Question {currentQuestion + 1} of {questions.length}
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className="bg-sunrise-green h-2 rounded-full transition-all duration-300"
                style={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
              ></div>
            </div>
          </div>
          
          <h2 className="text-2xl font-semibold mb-8 text-gray-900">{question.question}</h2>
          
          <div className="space-y-4">
            {question.options.map((option) => (
              <button
                key={option}
                onClick={() => handleAnswer(option)}
                className="w-full p-4 text-left border-2 border-gray-200 rounded-lg hover:border-sunrise-green hover:bg-sunrise-green/5 transition-all duration-200"
              >
                {option}
              </button>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};
