import React from 'react';
import { Bot } from 'lucide-react';

// --- Resonance Engine Page ---
const ResonanceEngine = () => {
  const articles = [
    {
      source: 'MarketingInsights',
      title: 'The Future of AI in Content Strategy: 2025 Trends',
      image: 'https://i.imgur.com/g8vBw0B.png',
      excerpt: "AI-driven content generation is rapidly transforming how brands create and distribute content. From personalized recommendations to automated copywriting, the landscape is shifting..."
    },
    {
      source: 'DigitalGrowthDaily',
      title: 'Mastering SEO in 2025: Beyond Keywords and Backlinks',
      image: 'https://i.imgur.com/5yA8mXg.png',
      excerpt: "SEO is no longer just about stuffing keywords and building links. The landscape has shifted dramatically, from semantic search to a holistic approach centered on user intent and topical authority..."
    },
    {
      source: 'PR&CommunicationsWeekly',
      title: 'Building Authentic Brand Trust in a Skeptical Market',
      image: 'https://i.imgur.com/kP8Bv7D.png',
      excerpt: "In an era of misinformation and digital noise, building genuine brand trust is paramount. It requires transparency, consistent values, and a commitment to authentic communication..."
    },
  ];

  return (
    <div className="animate-fade-in-sm mx-auto max-w-3xl space-y-8">
      {articles.map((article, i) => (
        <div key={i} className="overflow-hidden rounded-lg bg-white shadow-sm dark:bg-gray-950">
          <div className="p-6">
            <p className="text-sm font-medium text-gray-600 dark:text-gray-400">{article.source}</p>
            <h2 className="mt-1 text-xl font-semibold text-gray-900 dark:text-white">{article.title}</h2>
          </div>
          <img src={article.image} alt={article.title} className="h-64 w-full object-cover" />
          <div className="p-6">
            <p className="text-base text-gray-700 dark:text-gray-300">{article.excerpt}</p>
            <div className="mt-4 rounded-lg bg-indigo-50 p-4 dark:bg-indigo-900/50">
              <h4 className="flex items-center text-sm font-semibold text-indigo-700 dark:text-indigo-300">
                <Bot className="mr-2 h-5 w-5" /> AI Suggestion
              </h4>
              <p className="mt-2 text-sm text-indigo-600 dark:text-indigo-200">
                This trend aligns with our Q4 "Future of Tech" campaign. Consider atomizing this into a LinkedIn post and a short blog article.
              </p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ResonanceEngine;