import React from 'react';

// --- Content Autopsy Page ---
const ContentAutopsy = () => {
  return (
    <div className="animate-fade-in-sm space-y-6">
      <p className="text-base text-gray-600 dark:text-gray-300">
        Diagnose performance differences between successful and failed content pieces. Input
        URLs to receive AI-driven insights on what worked and what didn't.
      </p>

      {/* Input Section */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        {/* Successful Content */}
        <div className="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-950">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Compare Content Performance</h2>
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">Enter URLs for successful and failed content to diagnose performance differences.</p>
          
          <label className="mt-4 block text-sm font-medium text-gray-700 dark:text-gray-200">Successful Content URL</label>
          <input type="text" placeholder="e.g., https://example.com/successful-post" className="mt-1 w-full rounded-md border border-gray-300 bg-white px-3 py-2 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 dark:border-gray-600 dark:bg-gray-800 dark:text-white" />
          
          <label className="mt-4 block text-sm font-medium text-gray-700 dark:text-gray-200">Additional Context / Notes</label>
          <textarea rows="3" placeholder="Key factors, target audience, content goals..." className="mt-1 w-full rounded-md border border-gray-300 bg-white px-3 py-2 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 dark:border-gray-600 dark:bg-gray-800 dark:text-white"></textarea>
        </div>
        
        {/* Failed Content */}
        <div className="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-950">
          <label className="mt-12 block text-sm font-medium text-gray-700 dark:text-gray-200">Failed Content URL</label>
          <input type="text" placeholder="e.g., https://example.com/failed-campaign" className="mt-1 w-full rounded-md border border-gray-300 bg-white px-3 py-2 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 dark:border-gray-600 dark:bg-gray-800 dark:text-white" />
          
          <label className="mt-4 block text-sm font-medium text-gray-700 dark:text-gray-200">Additional Context / Notes</label>
          <textarea rows="3" placeholder="Observed issues, missed targets, audience feedback..." className="mt-1 w-full rounded-md border border-gray-300 bg-white px-3 py-2 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 dark:border-gray-600 dark:bg-gray-800 dark:text-white"></textarea>
        </div>
      </div>
      
      <button className="w-full rounded-md bg-indigo-600 px-4 py-2.5 text-sm font-medium text-white shadow-sm hover:bg-indigo-700">
        Analyze Content
      </button>

      {/* Analysis Results */}
      <div className="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-950">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white">AI Analysis Report</h2>
        {/* This is a placeholder. A real app would show a loading state then results */}
        <p className="mt-4 text-center text-gray-500 dark:text-gray-400">
          Click "Analyze Content" to generate the AI-driven report.
        </p>
      </div>
    </div>
  );
};

export default ContentAutopsy;