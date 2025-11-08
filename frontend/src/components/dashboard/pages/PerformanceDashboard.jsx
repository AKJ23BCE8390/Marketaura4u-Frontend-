import React from 'react';
import { Zap } from 'lucide-react';

// --- Performance Dashboard Page ---
const PerformanceDashboard = () => {
  const kpiCards = [
    { title: 'Conversion Rate', value: '4.7%', change: 'up', prev: 'previous period' },
    { title: 'Content Reach', value: '1.2M', change: 'up', prev: 'previous period' },
    { title: 'Engagement Score', value: '78.5', change: 'up', prev: 'previous period' },
    { title: 'Marketing ROI', value: '$1.8M', change: 'up', prev: 'previous period' },
  ];

  const leaderboard = [
    { title: 'The Future of AI in Marketing', type: 'Webinar', views: '18.5k', engagement: '4.2%', conversions: '3.1%' },
    { title: 'Crafting Compelling CTAs for SaaS', type: 'Article', views: '15.1k', engagement: '5.8%', conversions: '4.5%' },
    { title: 'Maximizing LinkedIn Engagement', type: 'Guide', views: '12.0k', engagement: '6.1%', conversions: '3.0%' },
    { title: 'Video Content Strategy for 2024', type: 'Video', views: '9.8k', engagement: '3.7%', conversions: '2.8%' },
    { title: 'Email Nurture Sequences That Convert', type: 'E-book', views: '7.2k', engagement: '7.0%', conversions: '8.2%' },
  ];

  const aiInsights = [
    "Optimize top content headlines with stronger emotional triggers to increase click-through rates by an estimated 10-15% over the next quarter.",
    "Segment your audience further based on initial content interaction to deliver more personalized follow-up campaigns, potentially boosting conversion by 8%.",
    "Re-promote underlying evergreen content on new channels, focusing on platforms where similar content has historically resonated, to extend its lifecycle.",
    "Experiment with interactive content formats (e.g., quizzes, polls) in the middle of the funnel to enhance engagement and data collection for future personalization."
  ];

  return (
    <div className="animate-fade-in-sm space-y-6">
      {/* KPI Cards */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {kpiCards.map((card) => (
          <div key={card.title} className="overflow-hidden rounded-lg bg-white p-5 shadow-sm dark:bg-gray-950">
            <p className="truncate text-sm font-medium text-gray-500 dark:text-gray-400">{card.title}</p>
            <p className="mt-1 text-3xl font-semibold text-gray-900 dark:text-white">{card.value}</p>
            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">Compared to {card.prev}</p>
          </div>
        ))}
      </div>

      {/* Engagement Funnel */}
      <div className="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-950">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Engagement Funnel</h2>
        {/* Placeholder for chart */}
        <div className="mt-4 flex h-64 items-center justify-center rounded-md bg-gray-100 text-gray-500 dark:bg-gray-800">
          [Line Chart: Impressions, Clicks, Revenue]
        </div>
      </div>

      {/* Content Leaderboard */}
      <div className="rounded-lg bg-white shadow-sm dark:bg-gray-950">
        <h2 className="border-b border-gray-200 p-4 text-lg font-semibold text-gray-900 dark:border-gray-800 dark:text-white">Content Leaderboard</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-800">
            <thead className="bg-gray-50 dark:bg-gray-900">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400">Content</th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400">Type</th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400">Views</th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400">Engagement</th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400">Conversions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 bg-white dark:divide-gray-800 dark:bg-gray-950">
              {leaderboard.map((item) => (
                <tr key={item.title}>
                  <td className="whitespace-nowrap px-6 py-4 text-sm font-medium text-gray-900 dark:text-white">{item.title}</td>
                  <td className="whitespace-nowrap px-6 py-4 text-sm"><span className="rounded-full bg-indigo-100 px-2 py-0.5 text-xs font-medium text-indigo-700 dark:bg-indigo-900/50 dark:text-indigo-300">{item.type}</span></td>
                  <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500 dark:text-gray-400">{item.views}</td>
                  <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500 dark:text-gray-400">{item.engagement}</td>
                  <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500 dark:text-gray-400">{item.conversions}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* AI CMO Insights */}
      <div className="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-950">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white">AI CMO Insights</h2>
        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">Strategic marketing recommendations for continuous improvement.</p>
        <div className="mt-4 space-y-3">
          {aiInsights.map((insight, i) => (
            <div key={i} className="flex items-start gap-3 rounded-lg bg-gray-50 p-4 dark:bg-gray-800">
              <Zap className="h-5 w-5 flex-shrink-0 text-indigo-600 dark:text-indigo-400" />
              <p className="text-sm text-gray-700 dark:text-gray-300">{insight}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PerformanceDashboard;