import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";

const CampaignDetail = () => {
  const { id } = useParams();
  const [campaign, setCampaign] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`http://localhost:5000/api/v1/campaign/${id}`, {
      credentials: "include",
    })
      .then((res) => res.json())
      .then((data) => {
        setCampaign(data.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (!campaign) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
        <h2 className="text-2xl font-bold">Campaign not found</h2>
        <Link to="/campaigns" className="mt-4 text-blue-600 hover:underline">
          &larr; Go back to campaigns
        </Link>
      </div>
    );
  }

  const { title, createdAt, prompt, content, imageUrl } = campaign;

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 p-6 transition-colors duration-300">
      <div className="max-w-6xl mx-auto">
        
        {/* Navigation & Header */}
        <div className="mb-8">
          <Link
            to="/campaigns"
            className="inline-flex items-center text-sm text-gray-500 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400 mb-4 transition-colors"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4 mr-1">
              <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18" />
            </svg>
            Back to Campaigns
          </Link>
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight">{title}</h1>
              <p className="text-gray-500 dark:text-gray-400 mt-2 text-sm">
                Generated on {new Date(createdAt).toLocaleDateString(undefined, { dateStyle: "long" })}
              </p>
            </div>
          </div>
        </div>

        {/* Top Section: Prompt & Image */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-10">
          {/* Prompt Card */}
          <div className="lg:col-span-2 bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm border border-gray-100 dark:border-gray-700">
            <h3 className="text-xs font-bold uppercase tracking-wide text-gray-400 dark:text-gray-500 mb-3">
              Original Prompt
            </h3>
            <p className="text-lg leading-relaxed text-gray-700 dark:text-gray-300 italic">
              "{prompt}"
            </p>
          </div>

          {/* Image Card (if exists) */}
          {imageUrl && (
            <div className="relative group overflow-hidden rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 bg-white dark:bg-gray-800">
               <img
                src={imageUrl}
                alt="Campaign Visual"
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                style={{ minHeight: "200px" }}
              />
            </div>
          )}
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
          
          {/* Left Column: Short Form & Socials */}
          <div className="space-y-6">
            
            {/* Twitter Post */}
            {content?.twitter && (
              <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm border border-gray-100 dark:border-gray-700">
                <div className="flex items-center mb-4">
                  <div className="bg-blue-500 text-white p-2 rounded-full">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/></svg>
                  </div>
                  <span className="ml-3 font-semibold text-gray-900 dark:text-white">X (Twitter)</span>
                </div>
                <p className="whitespace-pre-wrap text-gray-700 dark:text-gray-300 leading-relaxed">
                  {content.twitter}
                </p>
                <div className="mt-4 pt-4 border-t border-gray-100 dark:border-gray-700 flex text-sm text-gray-400">
                   <span className="hover:text-blue-500 cursor-pointer transition">#Generated</span>
                   <span className="ml-2 hover:text-blue-500 cursor-pointer transition">#AI</span>
                </div>
              </div>
            )}

            {/* LinkedIn Post */}
            {content?.linkedin && (
              <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm border border-gray-100 dark:border-gray-700">
                <div className="flex items-center mb-4">
                  <div className="bg-[#0077b5] text-white p-2 rounded-md">
                     <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
                  </div>
                  <span className="ml-3 font-semibold text-gray-900 dark:text-white">LinkedIn</span>
                </div>
                <p className="whitespace-pre-wrap text-gray-700 dark:text-gray-300 text-sm leading-relaxed">
                  {content.linkedin}
                </p>
              </div>
            )}
          </div>

          {/* Right Column: Long Form */}
          <div className="space-y-6">
            
            {/* Email Template */}
            {content?.email && (
              <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden">
                <div className="bg-gray-50 dark:bg-gray-700/50 p-4 border-b border-gray-100 dark:border-gray-700 flex items-center gap-3">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-gray-500">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75" />
                  </svg>
                  <span className="text-sm font-medium text-gray-900 dark:text-gray-200">Email Draft</span>
                </div>
                <div className="p-6">
                  <div className="mb-4 pb-4 border-b border-gray-100 dark:border-gray-700/50">
                    <span className="text-xs font-bold text-gray-400 uppercase">Subject</span>
                    <h4 className="text-lg font-semibold text-gray-900 dark:text-white">
                      {content.email.subject}
                    </h4>
                  </div>
                  <div className="whitespace-pre-wrap text-gray-700 dark:text-gray-300 leading-relaxed font-sans">
                    {content.email.body}
                  </div>
                </div>
              </div>
            )}

            {/* Blog Post */}
            {content?.blog && (
              <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-sm border border-gray-100 dark:border-gray-700">
                <div className="flex items-center gap-2 mb-6">
                   <span className="px-3 py-1 bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-300 text-xs font-bold rounded-full uppercase">
                     Blog Post
                   </span>
                </div>
                <article className="prose dark:prose-invert max-w-none">
                  <div className="whitespace-pre-wrap text-gray-800 dark:text-gray-200 leading-7 font-serif text-lg">
                    {content.blog}
                  </div>
                </article>
              </div>
            )}
          </div>

        </div>
      </div>
    </div>
  );
};

export default CampaignDetail;