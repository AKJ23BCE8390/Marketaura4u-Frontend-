import React from 'react';
import {
  MessageSquare,
  Linkedin,
  Video,
  Mail,
  Twitter,
  File,
  ChevronsUpDown,
} from 'lucide-react';

// --- Campaign Orchestrator Page ---
const CampaignOrchestrator = () => {
  const channels = [
    { name: 'Blog Post', icon: MessageSquare, desc: 'Atomize the core message into a compelling blog article for organic reach and SEO.' },
    { name: 'LinkedIn Carousel', icon: Linkedin, desc: 'Transform key takeaways into an engaging visual carousel for professional audiences.' },
    { name: 'Instagram Reels Scripts', icon: Video, desc: 'Generate short, dynamic video scripts optimized for Instagram Reels with trending audio suggestions.' },
    { name: 'Email Nurture Campaigns', icon: Mail, desc: 'Develop a series of segmented email campaigns to nurture leads and drive conversions.' },
    { name: 'Tweet Threads', icon: Twitter, desc: 'Break down complex information into digestible, engaging tweet threads for X (Twitter) outreach.' },
    { name: 'Landing Page Copy', icon: File, desc: 'Craft concise, high-converting copy for dedicated landing pages to support campaign objectives.' },  ];

  return (
    <div className="animate-fade-in-sm space-y-6">
      <p className="text-base text-gray-600 dark:text-gray-300">
        Effortlessly transform your core content assets into multi-channel campaigns tailored for
        various platforms, maximizing your reach and impact.
      </p>

      {/* Step 1: Select Source */}
      <div className="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-950">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Select Source Content Asset</h2>
        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">Choose the primary content asset to atomize into various channels.</p>
        <label className="mt-4 block text-sm font-medium text-gray-700 dark:text-gray-200">Content Asset</label>
        <div className="relative mt-1">
          <select className="w-full appearance-none rounded-md border border-gray-300 bg-white px-3 py-2 pr-10 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 dark:border-gray-600 dark:bg-gray-800 dark:text-white">
            <option>Q3 2024 Product Roadmap Webinar (Video & Transcript)</option>
            <option>AI-Generated Blog Post: Future of Content</option>
          </select>
          <ChevronsUpDown className="pointer-events-none absolute right-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
        </div>
        
        {/* Selected Asset Preview */}
        <div className="mt-4 flex gap-4 rounded-lg border border-gray-200 bg-gray-50 p-4 dark:border-gray-800 dark:bg-gray-900">
          <img src="https://i.imgur.com/8Q1Rj6A.png" alt="Webinar" className="h-24 w-32 rounded object-cover" />
          <div>
            <h3 className="font-medium text-gray-900 dark:text-white">Q3 2024 Product Roadmap Webinar</h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">Type: Video & Transcript</p>
            <p className="mt-2 text-sm text-gray-600 dark:text-gray-300">A comprehensive webinar outlining new features and strategic directions for our product in Q3 2024. Ideal for B2B customers and partners.</p>
          </div>
        </div>
        
        <button className="mt-4 text-sm font-medium text-indigo-600 hover:text-indigo-500 dark:text-indigo-400 dark:hover:text-indigo-300">
          + Add New Asset
        </button>
      </div>

      {/* Step 2: Atomize Content */}
      <div className="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-950">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Atomize Content to Channels</h2>
        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
          Select the desired output channels to atomize your chosen source asset. Aura's AI will
          adapt the content for each platform.
        </p>
        
        <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {channels.map((channel) => {
            const Icon = channel.icon;
            return (
              <div key={channel.name} className="relative rounded-lg border border-gray-200 p-4 dark:border-gray-700">
                <div className="flex items-center gap-3">
                  <Icon className="h-6 w-6 text-indigo-600 dark:text-indigo-400" />
                  <h3 className="text-base font-medium text-gray-900 dark:text-white">{channel.name}</h3>
                </div>
                <p className="mt-2 text-sm text-gray-600 dark:text-gray-300">{channel.desc}</p>
                <div className="mt-4 flex items-center justify-between">
                  <a href="#" className="text-sm font-medium text-indigo-600 hover:underline dark:text-indigo-400">View Details </a>
                  <input type="checkbox" className="h-5 w-5 rounded text-indigo-600 focus:ring-indigo-500" />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Actions */}
      <div className="flex justify-end gap-3">
        <button className="rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-200 dark:hover:bg-gray-700">
          Save Draft
        </button>
        <button className="rounded-md bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700">
          Orchestrate Campaign
        </button>
      </div>
    </div>
  );
};

export default CampaignOrchestrator;