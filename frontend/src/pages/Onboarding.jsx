import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Building2,
  Instagram,
  Linkedin,
  Twitter,
  Youtube,
  Facebook,
  Check,
  Loader2,
  MessageSquare,
  Sparkles,
  ArrowRight,
} from "lucide-react";

// Platform Config
const PLATFORMS_CONFIG = [
  { id: "Twitter", label: "Twitter / X", icon: Twitter, color: "group-hover:text-sky-500" },
  { id: "LinkedIn", label: "LinkedIn", icon: Linkedin, color: "group-hover:text-blue-700" },
  { id: "Instagram", label: "Instagram", icon: Instagram, color: "group-hover:text-pink-600" },
  { id: "YouTube", label: "YouTube", icon: Youtube, color: "group-hover:text-red-600" },
  { id: "Facebook", label: "Facebook", icon: Facebook, color: "group-hover:text-blue-600" },
];

const Onboarding = () => {
  const navigate = useNavigate();

  const [companyName, setCompanyName] = useState("");
  const [platforms, setPlatforms] = useState([]);
  const [tone, setTone] = useState("Professional");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const togglePlatform = (platform) => {
    setPlatforms((prev) =>
      prev.includes(platform)
        ? prev.filter((p) => p !== platform)
        : [...prev, platform]
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!companyName.trim()) {
      setError("Please enter your company name.");
      return;
    }
    if (platforms.length === 0) {
      setError("Please select at least one platform.");
      return;
    }

    try {
      setLoading(true);

      const res = await fetch("http://localhost:5000/api/v1/auth/onboarding", {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          companyName: companyName.trim(),
          platforms,
          brandVoice: { tone, description },
        }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Onboarding failed");

      localStorage.setItem("user", JSON.stringify(data.data));
      navigate("/homepage");
    } catch (err) {
      setError(err.message || "Onboarding failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-slate-950 p-4 relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-24 -left-24 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl" />
        <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl" />
      </div>

      <div className="w-full max-w-2xl z-10">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center p-3 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 mb-4">
            <Sparkles className="w-6 h-6 text-blue-500" />
          </div>
          <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">
            Let's Get Started With a Short Intro
          </h1>
          <p className="text-slate-600 dark:text-slate-400">
            Tell us about your brand so we can generate content that sounds like you.
          </p>
        </div>

        {/* Card */}
        <form
          onSubmit={handleSubmit}
          className="bg-white dark:bg-slate-900 rounded-2xl shadow-xl border border-slate-200 dark:border-slate-800 p-6 md:p-8 space-y-8"
        >
          {/* Company Name */}
          <div className="space-y-4">
            <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">
              What is your company name?
            </label>
            <div className="relative">
              <Building2 className="absolute left-3 top-3.5 h-5 w-5 text-slate-400" />
              <input
                type="text"
                placeholder="e.g. Acme Innovations"
                className="
                  w-full pl-10 pr-4 py-3
                  bg-slate-50 dark:bg-slate-950
                  text-slate-900 dark:text-slate-100
                  placeholder-slate-400 dark:placeholder-slate-500
                  border border-slate-200 dark:border-slate-700
                  rounded-xl
                  focus:ring-2 focus:ring-blue-500 focus:border-transparent
                  outline-none transition-all
                "
                value={companyName}
                onChange={(e) => setCompanyName(e.target.value)}
              />
            </div>
          </div>

          {/* Platforms */}
          <div className="space-y-4">
            <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">
              Where do you post content?
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {PLATFORMS_CONFIG.map((p) => {
                const selected = platforms.includes(p.id);
                return (
                  <button
                    key={p.id}
                    type="button"
                    onClick={() => togglePlatform(p.id)}
                    className={`group relative flex items-center gap-3 p-3 rounded-xl border transition-all
                      ${
                        selected
                          ? "border-blue-500 bg-blue-50 dark:bg-blue-900/20 ring-1 ring-blue-500"
                          : "border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-950 hover:border-blue-300"
                      }`}
                  >
                    <p.icon
                      className={`h-5 w-5 ${
                        selected ? "text-blue-600 dark:text-blue-400" : "text-slate-400 " + p.color
                      }`}
                    />
                    <span
                      className={`text-sm font-medium ${
                        selected
                          ? "text-blue-900 dark:text-blue-100"
                          : "text-slate-600 dark:text-slate-300"
                      }`}
                    >
                      {p.label}
                    </span>
                    {selected && (
                      <Check className="absolute top-2 right-2 h-4 w-4 text-blue-500" />
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Brand Voice */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">
                Brand Tone
              </label>
              <div className="relative">
                <MessageSquare className="absolute left-3 top-3.5 h-5 w-5 text-slate-400" />
                <select
                  className="
                    w-full pl-10 pr-4 py-3
                    bg-slate-50 dark:bg-slate-950
                    text-slate-900 dark:text-slate-100
                    border border-slate-200 dark:border-slate-700
                    rounded-xl
                    focus:ring-2 focus:ring-blue-500 focus:border-transparent
                    outline-none appearance-none cursor-pointer
                  "
                  value={tone}
                  onChange={(e) => setTone(e.target.value)}
                >
                  <option>Professional</option>
                  <option>Friendly</option>
                  <option>Witty / Humorous</option>
                  <option>Bold / Aggressive</option>
                  <option>Luxury / Elegant</option>
                  <option>Educational</option>
                </select>
              </div>
            </div>

            <div className="space-y-4">
              <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">
                Short Description (Optional)
              </label>
              <textarea
                placeholder="e.g. We sell eco-friendly coffee cups..."
                className="
                  w-full p-3 min-h-[52px]
                  bg-slate-50 dark:bg-slate-950
                  text-slate-900 dark:text-slate-100
                  placeholder-slate-400 dark:placeholder-slate-500
                  border border-slate-200 dark:border-slate-700
                  rounded-xl
                  focus:ring-2 focus:ring-blue-500 focus:border-transparent
                  outline-none resize-none transition-all
                "
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>
          </div>

          {error && (
            <div className="p-3 bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 rounded-lg text-sm text-center font-medium">
              {error}
            </div>
          )}

          <button
            disabled={loading}
            type="submit"
            className={`w-full py-4 rounded-xl text-white font-bold text-lg flex items-center justify-center gap-2 transition-all
              ${
                loading
                  ? "bg-slate-400 cursor-not-allowed"
                  : "bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 shadow-lg shadow-blue-500/30"
              }`}
          >
            {loading ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                Saving Profile...
              </>
            ) : (
              <>
                Finish Setup
                <ArrowRight className="w-5 h-5" />
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Onboarding;
