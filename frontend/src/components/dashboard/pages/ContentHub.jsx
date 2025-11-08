import React, { useState } from 'react';
import {
  UploadCloud,
  Zap,
  FileText,
  Video,
  Image,
  MessageSquare,
  MessageCircle,
  Plus,
  Download,
  Edit,
  Trash2,
  Filter,
} from 'lucide-react';
import apiService from '../../../services/apiService';
import GeneratedContentDisplay from './GeneratedContentDisplay'; // <-- 1. IMPORT new component

// --- Content Hub Page ---
const ContentHub = () => {
  // ... (contentItems and getStatusChip functions remain the same) ...
  const contentItems = [
    { name: 'Q3 Marketing Report Draft', type: 'Document', status: 'Draft', date: '2024-07-20', icon: FileText },
    { name: 'New Product Launch Video Ad', type: 'Video', status: 'Review', date: '2024-07-18', icon: Video },
    { name: 'Summer Campaign Visuals', type: 'Image', status: 'Published', date: '2024-07-15', icon: Image },
    { name: 'AI-Generated Blog Post: Future of Content', type: 'Blog Post', status: 'Pending', date: '2024-07-10', icon: MessageSquare },
    { name: 'Social Media Captions - August', type: 'Social Post', status: 'Published', date: '2024-07-05', icon: MessageCircle },
  ];

  const [prompt, setPrompt] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [generatedContent, setGeneratedContent] = useState(null); // This will now store the OBJECT
  const [error, setError] = useState(null);
  
  const getStatusChip = (status) => {
    switch (status) {
      case 'Draft': return 'bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-300';
      case 'Review': return 'bg-yellow-100 text-yellow-700 dark:bg-yellow-700 dark:text-yellow-200';
      case 'Published': return 'bg-green-100 text-green-700 dark:bg-green-700 dark:text-green-200';
      case 'Pending': return 'bg-orange-100 text-orange-700 dark:bg-orange-700 dark:text-orange-200';
      default: return 'bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-300';
    }
  };

  // --- 2. UPDATE handleGenerateContent ---
  const handleGenerateContent = async () => {
    setIsLoading(true);
    setError(null);
    setGeneratedContent(null);
    try {
      const response = await apiService.generateContent(prompt);

      // Store the actual JSON object from the job
      if (response.success && response.job && response.job.generatedContent) {
        setGeneratedContent(response.job.generatedContent); // <-- NO JSON.stringify
      } else {
        throw new Error(response.message || 'Invalid response format from API');
      }
    } catch (err) {
      setGeneratedContent(null);
      setError(err.message || 'Something went wrong');
    } finally {
      setIsLoading(false);
    }
  };
  // ----------------------------------------

  return (
    <div className="animate-fade-in-sm space-y-6">
      {/* Quick Actions */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* Drag & Drop */}
        <div className="rounded-lg border-2 border-dashed border-gray-300 bg-white p-8 text-center dark:border-gray-700 dark:bg-gray-950">
          <UploadCloud className="mx-auto h-12 w-12 text-gray-400" />
          <h3 className="mt-4 text-lg font-medium text-gray-900 dark:text-white">Drag & Drop Files</h3>
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">Upload images, documents, videos, and more. Max file size 50MB.</p>
          <button className="mt-4 rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-200 dark:hover:bg-gray-700">
            Browse Files
          </button>
        </div>
        
        {/* Generate Content */}
        <div className="rounded-lg bg-white p-8 shadow-sm dark:bg-gray-950">
          <div className="flex items-center gap-4">
            <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-indigo-100 text-indigo-600 dark:bg-indigo-900/50">
              <Zap className="h-6 w-6" />
            </div>
            <div>
              <h3 className="text-lg font-medium text-gray-900 dark:text-white">Generate Content with AI</h3>
              <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">Get instant content ideas, outlines, or full drafts using AI.</p>
            </div>
          </div>
          <textarea
            className="mt-4 w-full rounded-md border border-gray-300 p-3 text-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 dark:border-gray-700 dark:bg-gray-800 dark:text-white"
            rows="3"
            placeholder="Describe the content you need (e.g., 'a blog post outline...')"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
          ></textarea>
          <button
            className="mt-4 w-full rounded-md bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 disabled:opacity-50"
            onClick={handleGenerateContent}
            disabled={isLoading || !prompt}
          >
            {isLoading ? 'Generating (this may take 10s)...' : 'Generate Content'}
          </button>
        </div>
      </div>

      {/* --- 3. UPDATE The Display Logic --- */}
      
      {/* Show error if one exists */}
      {error && (
        <div className="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-950">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Error</h3>
          <div className="mt-4 rounded-md bg-red-50 p-4 dark:bg-red-900/30">
            <p className="text-sm font-medium text-red-700 dark:text-red-300">{error}</p>
          </div>
        </div>
      )}

      {/* Show the formatted content component */}
      {generatedContent && !error && (
        <GeneratedContentDisplay content={generatedContent} />
      )}
      {/* ------------------------------- */}


      {/* Content Library */}
      <div className="rounded-lg bg-white shadow-sm dark:bg-gray-950">
        <div className="flex items-center justify-between border-b border-gray-200 p-4 dark:border-gray-800">
          {/* ... (rest of the table) ... */}
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Your Content Library</h2>
          <div className="flex items-center gap-2">
            <button className="rounded-md border border-gray-300 bg-white px-3 py-1.5 text-sm text-gray-700 shadow-sm hover:bg-gray-50 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-200 dark:hover:bg-gray-700">
              <Filter className="mr-1.5 h-4 w-4 inline-block" /> Filter
            </button>
            <button className="flex items-center gap-2 rounded-md bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700">
              <Plus className="h-4 w-4" /> Create New Content
            </button>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-800">
            <thead className="bg-gray-50 dark:bg-gray-900">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400">Content Name</th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400">Type</th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400">Date Added</th>
                <th className="px-6 py-3 text-right text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 bg-white dark:divide-gray-800 dark:bg-gray-950">
              {contentItems.map((item) => {
                const ItemIcon = item.icon;
                return (
                  <tr key={item.name}>
                    <td className="whitespace-nowrap px-6 py-4 text-sm font-medium text-gray-900 dark:text-white">
                      <div className="flex items-center gap-2">
                        <ItemIcon className="h-5 w-5 text-gray-500" />
                        {item.name}
                      </div>
                    </td>
                    <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500 dark:text-gray-400">{item.type}</td>
                    <td className="whitespace-nowHrap px-6 py-4 text-sm">
                      <span className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${getStatusChip(item.status)}`}>
                        {item.status}
                      </span>
                    </td>
                    <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500 dark:text-gray-400">{item.date}</td>
                    <td className="whitespace-nowrap px-6 py-4 text-right text-sm font-medium">
                      <button className="p-1 text-gray-500 hover:text-indigo-600 dark:text-gray-400 dark:hover:text-indigo-400"><Download className="h-4 w-4" /></button>
                      <button className="p-1 text-gray-500 hover:text-indigo-600 dark:text-gray-400 dark:hover:text-indigo-400"><Edit className="h-4 w-4" /></button>
                      <button className="p-1 text-gray-500 hover:text-red-600 dark:text-gray-400 dark:hover:text-red-500"><Trash2 className="h-4 w-4" /></button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ContentHub;