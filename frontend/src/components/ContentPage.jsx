import React, { useState } from "react";
import {
  Copy,
  Check,
  Twitter,
  Linkedin,
  Mail,
  FileText,
  Sparkles,
  Image as ImageIcon,
  Loader2,
} from "lucide-react";

// --- Helper Component: Content Card ---
// Update: Now accepts optional 'imageUrl' prop
const ContentCard = ({ title, icon: Icon, content, colorClass, onCopy, imageUrl }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    // If content is an object (like email), turn it into a string
    const textToCopy = typeof content === "object"
      ? `Subject: ${content.subject}\n\n${content.body}`
      : content;

    navigator.clipboard.writeText(textToCopy);
    setCopied(true);
    onCopy && onCopy();
    setTimeout(() => setCopied(false), 2000);
  };

  if (!content) return null;

  return (
    <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm overflow-hidden flex flex-col h-full hover:shadow-md transition-shadow">
      {/* Card Header */}
      <div className={`px-4 py-3 border-b border-slate-100 dark:border-slate-700 flex justify-between items-center ${colorClass} bg-opacity-10`}>
        <div className="flex items-center gap-2">
          <div className={`p-1.5 rounded-md ${colorClass} text-white`}>
            <Icon size={16} />
          </div>
          <h3 className="font-semibold text-slate-700 dark:text-slate-200 text-sm uppercase tracking-wide">
            {title}
          </h3>
        </div>
        <button
          onClick={handleCopy}
          className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 transition-colors"
          title="Copy to clipboard"
        >
          {copied ? <Check size={16} className="text-green-500" /> : <Copy size={16} />}
        </button>
      </div>

      {/* Card Body */}
      <div className="p-5 flex-grow flex flex-col gap-4">
        {/* Text Content */}
        <div className="whitespace-pre-wrap text-slate-600 dark:text-slate-300 text-sm leading-relaxed font-medium">
          {typeof content === "object" ? (
            // Handle Email Object specifically
            <>
              <p className="mb-2 text-xs font-bold text-slate-400 uppercase">Subject</p>
              <p className="mb-4 font-semibold text-slate-800 dark:text-white border-b border-slate-100 dark:border-slate-700 pb-2">
                {content.subject}
              </p>
              <p className="text-xs font-bold text-slate-400 uppercase mb-1">Body</p>
              {content.body}
            </>
          ) : (
            content
          )}
        </div>

        {/* NEW: Attached Image (if provided) */}
        {imageUrl && (
          <div className="mt-auto pt-2">
            <img 
              src={imageUrl} 
              alt="Post attachment" 
              className="w-full h-48 object-cover rounded-lg border border-slate-200 dark:border-slate-700"
            />
          </div>
        )}
      </div>
    </div>
  );
};

function ContentPage() {
  const [prompt, setPrompt] = useState("");
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState(null);
  const [error, setError] = useState("");

  const handleGenerate = async () => {
    if (!prompt.trim()) {
      setError("Please enter a topic to generate content.");
      return;
    }

    setLoading(true);
    setError("");
    setData(null);

    try {
      const response = await fetch("http://localhost:5000/api/v1/content/generate", {
        method: "POST",
        // 🔴 CRITICAL FIX: Include credentials to send cookies/auth token
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ prompt }),
      });

      const resJson = await response.json();

      if (!response.ok) {
        throw new Error(resJson.message || "Failed to generate content");
      }

      const generated = resJson?.job?.generatedContent;

      if (!generated) {
        throw new Error("No content found in response.");
      }

      setData(generated);
    } catch (err) {
      console.error(err);
      setError(err.message || "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 py-12 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto space-y-10">
        {/* --- Header Section --- */}
        <div className="text-center space-y-3">
          <h1 className="text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            AI Content <span className="text-blue-600">Studio</span>
          </h1>
          <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
            Turn one idea into a complete marketing campaign. Generate blogs, tweets, emails, and images instantly.
          </p>
        </div>

        {/* --- Input Section --- */}
        <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-xl border border-slate-200 dark:border-slate-800 overflow-hidden max-w-3xl mx-auto">
          <div className="p-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500"></div>
          <div className="p-6 sm:p-8">
            <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-3 flex items-center gap-2">
              <Sparkles size={18} className="text-purple-500" />
              What should we write about today?
            </label>
            <textarea
              rows={4}
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              className="w-full p-4 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-950 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all resize-none text-slate-800 dark:text-slate-100 placeholder-slate-400"
              placeholder="e.g. A launch post for our new eco-friendly coffee cups made from bamboo..."
            />

            <div className="mt-6 flex justify-end items-center gap-4">
              {error && <span className="text-red-500 text-sm font-medium animate-pulse">{error}</span>}
              <button
                onClick={handleGenerate}
                disabled={loading}
                className={`
                  flex items-center gap-2 px-8 py-3 rounded-lg font-bold text-white shadow-lg transition-all transform hover:-translate-y-0.5
                  ${
                    loading
                      ? "bg-slate-400 cursor-not-allowed"
                      : "bg-blue-600 hover:bg-blue-700 hover:shadow-blue-500/25 active:scale-95"
                  }
                `}
              >
                {loading ? (
                  <>
                    <Loader2 size={20} className="animate-spin" />
                    Creating Magic...
                  </>
                ) : (
                  <>
                    <Sparkles size={20} />
                    Generate Campaign
                  </>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* --- Results Grid --- */}
        {data && (
          <div className="animate-in fade-in slide-in-from-bottom-8 duration-700 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            
            {/* 1. Main Visual Asset Card (Keep this as a standalone high-res view) */}
            {data.imageUrl && (
              <div className="lg:col-span-1 md:col-span-2">
                <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm overflow-hidden h-full flex flex-col">
                  <div className="px-4 py-3 border-b border-slate-100 dark:border-slate-700 flex items-center gap-2 bg-pink-50 dark:bg-pink-900/20">
                    <ImageIcon size={16} className="text-pink-600 dark:text-pink-400" />
                    <h3 className="font-semibold text-slate-700 dark:text-slate-200 text-sm uppercase">
                      Generated Visual
                    </h3>
                  </div>
                  <div className="relative group h-full bg-slate-100 dark:bg-slate-900 flex items-center justify-center overflow-hidden">
                    <img
                      src={data.imageUrl}
                      alt="AI Generated"
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <a
                      href={data.imageUrl}
                      download="generated-image.jpg"
                      target="_blank"
                      rel="noreferrer"
                      className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white font-medium"
                    >
                      View Full Size
                    </a>
                  </div>
                </div>
              </div>
            )}

            {/* 2. Twitter Post - NOW WITH IMAGE */}
            <div className="lg:col-span-1">
              <ContentCard
                title="Twitter Thread / Post"
                icon={Twitter}
                content={data.twitter}
                colorClass="bg-sky-500"
                imageUrl={data.imageUrl} // Pass image here
              />
            </div>

            {/* 3. LinkedIn Post - NOW WITH IMAGE */}
            <div className="lg:col-span-1">
              <ContentCard
                title="LinkedIn Update"
                icon={Linkedin}
                content={data.linkedin}
                colorClass="bg-blue-700"
                imageUrl={data.imageUrl} // Pass image here
              />
            </div>

            {/* 4. Email Newsletter */}
            <div className="lg:col-span-2">
              <ContentCard
                title="Email Newsletter"
                icon={Mail}
                content={data.email}
                colorClass="bg-emerald-500"
                // Usually emails don't have the main hero image right at the top like socials, but you can add it if you want:
                // imageUrl={data.imageUrl} 
              />
            </div>

            {/* 5. Blog Post */}
            <div className="lg:col-span-1">
              <ContentCard
                title="Blog Introduction"
                icon={FileText}
                content={data.blog}
                colorClass="bg-orange-500"
                // A blog intro might not need the image directly in the card if the "Visual Asset" card exists.
              />
            </div>
          </div>
        )}

        {!data && !loading && (
          <div className="text-center py-20 opacity-30">
            <Sparkles size={48} className="mx-auto mb-4 text-slate-400" />
            <p className="text-slate-500 font-medium">Results will appear here</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default ContentPage;