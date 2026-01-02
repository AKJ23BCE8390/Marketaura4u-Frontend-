import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Campaigns = () => {
  const [campaigns, setCampaigns] = useState([]);
  const [loading, setLoading] = useState(true);
  const [launchingId, setLaunchingId] = useState(null);

  useEffect(() => {
    fetch("http://localhost:5000/api/v1/campaign/my", {
      credentials: "include",
    })
      .then((res) => res.json())
      .then((data) => {
        setCampaigns(data.data || []);
        setLoading(false);
      })
      .catch((err) => {
        console.error("❌ Failed to load campaigns:", err);
        setLoading(false);
      });
  }, []);

  // 🚀 LAUNCH HANDLER (TWITTER)
  const handleLaunch = async (campaignId) => {
    try {
      setLaunchingId(campaignId);

      const res = await fetch(
        "http://localhost:5000/api/v1/content/publish",
        {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            campaignId,
            platform: "twitter",
          }),
        }
      );

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Publish failed");
      }

      alert("🚀 Twitter post published successfully!");
    } catch (err) {
      console.error("❌ Launch error:", err);
      alert("Failed to publish on Twitter");
    } finally {
      setLaunchingId(null);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 p-6">
      <div className="max-w-6xl mx-auto">

        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-10">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">My Campaigns</h1>
            <p className="text-gray-500 dark:text-gray-400 mt-1">
              Manage and launch your AI-powered campaigns.
            </p>
          </div>
        </div>

        {/* Empty State */}
        {campaigns.length === 0 ? (
          <div className="text-center py-20 bg-white dark:bg-gray-800 rounded-2xl border border-dashed border-gray-300 dark:border-gray-700">
            <p className="text-gray-500 dark:text-gray-400 text-lg">
              No campaigns found.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {campaigns.map((c) => (
              <Link
                key={c._id}
                to={`/campaign/${c._id}`}
                className="group relative flex flex-col justify-between p-6 bg-white dark:bg-gray-800 rounded-2xl shadow-sm hover:shadow-xl border border-gray-200 dark:border-gray-700 transition-all hover:-translate-y-1"
              >
                {/* Top */}
                <div>
                  <div className="flex justify-between items-start mb-4">
                    <div className="h-10 w-10 flex items-center justify-center rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400">
                      🚀
                    </div>

                    <span className="text-xs font-medium px-2.5 py-1 rounded-full bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300">
                      {new Date(c.createdAt).toLocaleDateString()}
                    </span>
                  </div>

                  <h2 className="text-xl font-bold mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                    {c.title || "Untitled Campaign"}
                  </h2>

                  <p className="text-sm text-gray-500 dark:text-gray-400 line-clamp-2">
                    Click to view details or launch instantly.
                  </p>
                </div>

                {/* Bottom Actions */}
                <div className="mt-6 flex items-center justify-between">
                  {/* View Details */}
                  <span className="text-sm font-semibold text-blue-600 dark:text-blue-400">
                    View Details →
                  </span>

                  {/* 🚀 Launch Button */}
                  <button
                    onClick={(e) => {
                      e.preventDefault(); // stop Link navigation
                      handleLaunch(c._id);
                    }}
                    disabled={launchingId === c._id}
                    className={`px-3 py-1.5 text-xs font-semibold rounded-lg text-white transition
                      ${
                        launchingId === c._id
                          ? "bg-gray-400 cursor-not-allowed"
                          : "bg-green-600 hover:bg-green-700"
                      }
                    `}
                  >
                    {launchingId === c._id ? "Launching..." : "🚀 Launch"}
                  </button>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Campaigns;
