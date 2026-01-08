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
  ArrowLeft,
  AlertCircle,
  Briefcase,
  Users,
  Target,
  AtSign, // Added for the ID inputs
} from "lucide-react";

/* ---------------- Platform Config ---------------- */

const PLATFORMS_CONFIG = [
  { id: "twitter", label: "Twitter / X", icon: Twitter, color: "text-black dark:text-white", activeBorder: "border-slate-800 dark:border-slate-200", bg: "hover:bg-slate-100 dark:hover:bg-slate-800", placeholder: "@username" },
  { id: "linkedin", label: "LinkedIn", icon: Linkedin, color: "text-[#0A66C2]", activeBorder: "border-[#0A66C2]", bg: "hover:bg-blue-50 dark:hover:bg-blue-900/20", placeholder: "Profile URL or ID" },
  { id: "instagram", label: "Instagram", icon: Instagram, color: "text-[#E4405F]", activeBorder: "border-[#E4405F]", bg: "hover:bg-pink-50 dark:hover:bg-pink-900/20", placeholder: "@username" },
  { id: "youtube", label: "YouTube", icon: Youtube, color: "text-[#FF0000]", activeBorder: "border-[#FF0000]", bg: "hover:bg-red-50 dark:hover:bg-red-900/20", placeholder: "Channel Name" },
  { id: "facebook", label: "Facebook", icon: Facebook, color: "text-[#1877F2]", activeBorder: "border-[#1877F2]", bg: "hover:bg-blue-50 dark:hover:bg-blue-900/20", placeholder: "Page Name/ID" },
];

const Onboarding = () => {
  const navigate = useNavigate();

  // State
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    companyName: "",
    industry: "",
    brandTone: "Professional",
    uvp: "",
    targetAudience: "",
    platform: ""
  });
  const [platforms, setPlatforms] = useState([]);
  const [platformIds, setPlatformIds] = useState({}); // New State for Platform IDs
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [platformStatus, setPlatformStatus] = useState({});


  /* ---------------- Helpers ---------------- */

  const togglePlatform = (platformId) => {
    setPlatforms((prev) => {
      const isSelected = prev.includes(platformId);
      let newPlatforms;
      
      if (isSelected) {
        // Remove platform and its data
        newPlatforms = prev.filter((p) => p !== platformId);
        const newIds = { ...platformIds };
        delete newIds[platformId];
        setPlatformIds(newIds);
      } else {
        // Add platform
        newPlatforms = [...prev, platformId];
      }
      
      if (newPlatforms.length > 0 && errors.platforms) {
        setErrors(prevErr => ({ ...prevErr, platforms: null }));
      }
      return newPlatforms;
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: null }));
  };

  const handlePlatformIdChange = (id, value) => {
    setPlatformIds(prev => ({ ...prev, [id]: value }));
  };

  /* ---------------- Navigation & Submit ---------------- */

  const handleNext = (e) => {
    e.preventDefault();
    const newErrors = {};
    if (!formData.companyName.trim()) newErrors.companyName = "Company name is required";
    
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    setErrors({});
    setStep(2);
  };

  const handleBack = () => {
    setStep(1);
  };

  const handleValidatePlatform = async (platformId) => {
  try {
    setPlatformStatus(prev => ({
      ...prev,
      [platformId]: "loading"
    }));

    if (platformId === "twitter") {
      // Redirect to Twitter OAuth (backend handles rest)
      window.location.href ="http://localhost:5000/api/v1/platform/twitter/connect";

      return;
    }

    // Placeholder for other platforms
    setTimeout(() => {
      setPlatformStatus(prev => ({
        ...prev,
        [platformId]: "validated"
      }));
    }, 1000);

  } catch (err) {
    setPlatformStatus(prev => ({
      ...prev,
      [platformId]: "error"
    }));
  }
};


  const handleSubmit = async (e) => {
    e.preventDefault();

    if (platforms.length === 0) {
      setErrors({ platforms: "Please select at least one platform." });
      return;
    }

    const emptyIds = platforms.filter(
      (p) => !platformIds[p] || !platformIds[p].trim()
    );

    if (emptyIds.length > 0) {
      const missingNames = emptyIds
        .map(id => PLATFORMS_CONFIG.find(p => p.id === id)?.label)
        .join(", ");
      setErrors({ platforms: `Please enter details for: ${missingNames}` });
      return;
    }

    try {
      setLoading(true);
      setErrors({});

      const payload = {
        brandProfile: {
          companyName: formData.companyName.trim(),
          industry: formData.industry.trim(),
          uvp: formData.uvp.trim(),
          platforms,
          targetAudience: formData.targetAudience.trim(),
          brandVoice: {
            tone: formData.brandTone,
            description: ""
          }
        },
        platformIds
      };

      if (platforms.some(p => platformStatus[p] !== "validated")) {
  setErrors({
    platforms: "Please validate all selected platforms"
  });
  return;
}


      const res = await fetch(
        "http://localhost:5000/api/v1/auth/onboarding",
        {
          method: "POST",
          credentials: "include",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload)
        }
      );

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Onboarding failed");
      }

      localStorage.setItem("user", JSON.stringify(data.data));
      navigate("/homepage");

    } catch (err) {
      setErrors({ server: err.message || "Something went wrong." });
    } finally {
      setLoading(false);
    }
  };

  /* ---------------- UI Components ---------------- */

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#F8FAFC] dark:bg-[#0F172A] p-4 relative overflow-hidden font-sans selection:bg-indigo-100 dark:selection:bg-indigo-900">
      
      {/* Soft Background Globs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-indigo-500/10 rounded-full blur-[120px] mix-blend-multiply dark:mix-blend-screen animate-pulse" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] bg-purple-500/10 rounded-full blur-[120px] mix-blend-multiply dark:mix-blend-screen animate-pulse delay-1000" />
      </div>

      <div className="w-full max-w-2xl z-10">
        
        {/* Header Section */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-12 h-12 bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 mb-6">
            <Sparkles className="w-6 h-6 text-indigo-600 dark:text-indigo-400" />
          </div>
          <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900 dark:text-white mb-3 tracking-tight">
            Setup your Profile
          </h1>
          <p className="text-slate-500 dark:text-slate-400 max-w-md mx-auto">
            Step {step} of 2: {step === 1 ? "Brand Details" : "Platform Integration"}
          </p>
        </div>

        {/* Glass Card */}
        <div className="bg-white/70 dark:bg-slate-900/70 backdrop-blur-xl rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] dark:shadow-[0_8px_30px_rgb(0,0,0,0.2)] border border-white/50 dark:border-slate-700/50 p-6 md:p-10 transition-all duration-500">
          
          {/* Progress Bar */}
          <div className="w-full bg-slate-100 dark:bg-slate-800 h-1.5 rounded-full mb-8 overflow-hidden">
            <div 
              className="bg-indigo-600 h-full rounded-full transition-all duration-500 ease-out"
              style={{ width: step === 1 ? '50%' : '100%' }}
            />
          </div>

          {errors.server && (
            <div className="mb-6 p-4 rounded-xl bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 flex items-center gap-3 text-red-600 dark:text-red-400 animate-fade-in">
              <AlertCircle className="h-5 w-5 flex-shrink-0" />
              <p className="text-sm font-medium">{errors.server}</p>
            </div>
          )}

          <form onSubmit={step === 1 ? handleNext : handleSubmit}>
            
            {/* STEP 1: Details */}
            {step === 1 && (
              <div className="space-y-6 animate-in slide-in-from-right-4 fade-in duration-300">
                
                {/* Company Name */}
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">Company Name</label>
                  <div className="relative group">
                    <Building2 className={`absolute left-4 top-3.5 h-5 w-5 transition-colors ${errors.companyName ? "text-red-400" : "text-slate-400 group-focus-within:text-indigo-500"}`} />
                    <input
                      type="text"
                      name="companyName"
                      placeholder="e.g. Acme Innovations"
                      className={`w-full pl-12 pr-4 py-3 bg-white dark:bg-slate-950 text-slate-900 dark:text-white placeholder:text-slate-400 border rounded-xl outline-none transition-all duration-200 shadow-sm
                        ${errors.companyName 
                          ? "border-red-300 focus:border-red-500 focus:ring-2 focus:ring-red-500/20" 
                          : "border-slate-200 dark:border-slate-700 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20"
                        }`}
                      value={formData.companyName}
                      onChange={handleInputChange}
                      autoFocus
                    />
                  </div>
                  {errors.companyName && <p className="text-xs text-red-500 font-medium">{errors.companyName}</p>}
                </div>

                {/* Industry & Audience Grid */}
                <div className="grid md:grid-cols-2 gap-5">
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">Industry</label>
                    <div className="relative group">
                      <Briefcase className="absolute left-4 top-3.5 h-5 w-5 text-slate-400 group-focus-within:text-indigo-500 transition-colors" />
                      <input
                        type="text"
                        name="industry"
                        placeholder="e.g. SaaS"
                        className="w-full pl-12 pr-4 py-3 bg-white dark:bg-slate-950 text-slate-900 dark:text-white placeholder:text-slate-400 border border-slate-200 dark:border-slate-700 rounded-xl focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 outline-none transition-all duration-200 shadow-sm"
                        value={formData.industry}
                        onChange={handleInputChange}
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">Target Audience</label>
                    <div className="relative group">
                      <Users className="absolute left-4 top-3.5 h-5 w-5 text-slate-400 group-focus-within:text-indigo-500 transition-colors" />
                      <input
                        type="text"
                        name="targetAudience"
                        placeholder="e.g. Startups"
                        className="w-full pl-12 pr-4 py-3 bg-white dark:bg-slate-950 text-slate-900 dark:text-white placeholder:text-slate-400 border border-slate-200 dark:border-slate-700 rounded-xl focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 outline-none transition-all duration-200 shadow-sm"
                        value={formData.targetAudience}
                        onChange={handleInputChange}
                      />
                    </div>
                  </div>
                </div>

                {/* Brand Tone */}
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">Brand Tone</label>
                  <div className="relative">
                    <MessageSquare className="absolute left-4 top-3.5 h-5 w-5 text-slate-400 pointer-events-none" />
                    <select
                      name="brandTone"
                      className="w-full pl-12 pr-10 py-3 appearance-none bg-white dark:bg-slate-950 text-slate-900 dark:text-white border border-slate-200 dark:border-slate-700 rounded-xl focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 outline-none cursor-pointer shadow-sm transition-all"
                      value={formData.brandTone}
                      onChange={handleInputChange}
                    >
                      <option>Professional</option>
                      <option>Friendly</option>
                      <option>Witty / Humorous</option>
                      <option>Bold / Aggressive</option>
                      <option>Luxury / Elegant</option>
                      <option>Educational</option>
                    </select>
                    <div className="absolute right-4 top-3.5 pointer-events-none text-slate-400">
                      <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" /></svg>
                    </div>
                  </div>
                </div>

                {/* UVP */}
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">
                    One Sentence Pitch <span className="text-slate-400 font-normal text-xs ml-1">(Optional)</span>
                  </label>
                  <div className="relative group">
                    <Target className="absolute left-4 top-3.5 h-5 w-5 text-slate-400 group-focus-within:text-indigo-500 transition-colors" />
                    <textarea
                      name="uvp"
                      rows={2}
                      className="w-full pl-12 pr-4 py-3 bg-white dark:bg-slate-950 text-slate-900 dark:text-white placeholder:text-slate-400 border border-slate-200 dark:border-slate-700 rounded-xl focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 outline-none resize-none shadow-sm transition-all"
                      placeholder="What makes your brand unique?"
                      value={formData.uvp}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>

                {/* Next Button */}
                <button
                  type="submit"
                  className="w-full py-3.5 mt-2 rounded-xl text-white font-bold text-base shadow-lg shadow-indigo-500/25 flex items-center justify-center gap-2 transition-all transform hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.99] bg-indigo-600 hover:bg-indigo-700"
                >
                  <span>Continue</span>
                  <ArrowRight className="h-4 w-4" />
                </button>
              </div>
            )}

            {/* STEP 2: Platforms */}
            {step === 2 && (
              <div className="space-y-8 animate-in slide-in-from-right-4 fade-in duration-300">
                
                {/* 2A. Selection Grid */}
                <div className="space-y-4">
                  <div className="text-center">
                    <h3 className="text-lg font-semibold text-slate-900 dark:text-white">Choose your platforms</h3>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {PLATFORMS_CONFIG.map((p) => {
                      const isSelected = platforms.includes(p.id);
                      return (
                        <button
                          key={p.id}
                          type="button"
                          onClick={() => togglePlatform(p.id)}
                          className={`relative flex items-center gap-4 p-4 rounded-xl border transition-all duration-200 text-left outline-none ${
                            isSelected
                              ? `border-transparent ring-2 ring-indigo-500 bg-indigo-50 dark:bg-indigo-900/20`
                              : `border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-950 ${p.bg}`
                          }`}
                        >
                          <div className={`flex-shrink-0 transition-transform duration-300 ${isSelected ? "scale-110" : "grayscale opacity-70"}`}>
                             <p.icon className={`h-6 w-6 ${isSelected ? p.color : "text-slate-500"}`} />
                          </div>
                          <span className={`text-sm font-semibold transition-colors ${isSelected ? "text-slate-900 dark:text-white" : "text-slate-600 dark:text-slate-400"}`}>
                            {p.label}
                          </span>
                          
                          {isSelected && (
                            <div className="absolute right-4 bg-indigo-500 rounded-full p-0.5 animate-in zoom-in duration-200">
                              <Check className="h-3 w-3 text-white" strokeWidth={3} />
                            </div>
                          )}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* 2B. Platform IDs Inputs (Dynamic) */}
                {platforms.length > 0 && (
                  <div className="space-y-4 pt-6 border-t border-slate-200 dark:border-slate-800 animate-in fade-in slide-in-from-bottom-2">
                    <h3 className="text-md font-semibold text-slate-900 dark:text-white px-1">Account Details</h3>
                    <div className="space-y-4">
                      {platforms.map((pId) => {
                        const platform = PLATFORMS_CONFIG.find(p => p.id === pId);
                        return (
                          <div key={pId} className="space-y-2">
                            <label className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider ml-1">
                              {platform.label}
                            </label>
                            <div className="relative group">
                              <div className="absolute left-4 top-3.5 text-slate-400">
                                <platform.icon className="h-5 w-5" />
                              </div>
                              <div className="flex gap-2">
  <input
    type="text"
    placeholder={platform.placeholder}
    value={platformIds[pId] || ""}
    onChange={(e) => handlePlatformIdChange(pId, e.target.value)}
    className="flex-1 pl-12 pr-4 py-3 bg-white dark:bg-slate-950 text-slate-900 dark:text-white placeholder:text-slate-400 border border-slate-200 dark:border-slate-700 rounded-xl focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 outline-none transition-all duration-200 shadow-sm"
  />

  <button
    type="button"
    onClick={() => handleValidatePlatform(pId)}
    disabled={platformStatus[pId] === "loading"}
    className={`px-4 rounded-xl text-sm font-semibold transition-all ${
      platformStatus[pId] === "validated"
        ? "bg-green-500 text-white"
        : platformStatus[pId] === "error"
        ? "bg-red-500 text-white"
        : "bg-indigo-600 text-white hover:bg-indigo-700"
    }`}
  >
    {platformStatus[pId] === "loading" && "Checking…"}
    {platformStatus[pId] === "validated" && "✓ Valid"}
    {platformStatus[pId] === "error" && "Retry"}
    {!platformStatus[pId] && "Validate"}
  </button>
</div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}
                
                {errors.platforms && <div className="text-center text-red-500 text-sm font-medium bg-red-50 dark:bg-red-900/10 p-3 rounded-lg border border-red-100 dark:border-red-900/20">{errors.platforms}</div>}

                {/* Step 2 Buttons */}
                <div className="flex gap-3 pt-2">
                  <button
                    type="button"
                    onClick={handleBack}
                    className="w-1/3 py-3.5 rounded-xl font-semibold text-base border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors flex items-center justify-center gap-2"
                  >
                    <ArrowLeft className="h-4 w-4" />
                    <span>Back</span>
                  </button>

                  <button
                    disabled={loading}
                    type="submit"
                    className={`w-2/3 py-3.5 rounded-xl text-white font-bold text-base shadow-lg shadow-indigo-500/25 flex items-center justify-center gap-2 transition-all transform hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.99] ${
                      loading
                        ? "bg-slate-400 cursor-not-allowed shadow-none"
                        : "bg-indigo-600 hover:bg-indigo-700"
                    }`}
                  >
                    {loading ? (
                      <>
                        <Loader2 className="animate-spin h-4 w-4" />
                        <span>Saving...</span>
                      </>
                    ) : (
                      <>
                        <span>Complete Setup</span>
                        <Check className="h-4 w-4" />
                      </>
                    )}
                  </button>
                </div>
              </div>
            )}
          </form>
        </div>
        
        {/* Footer */}
        <p className="text-center text-xs text-slate-400 dark:text-slate-500 mt-8">
          Need help? <a href="#" className="hover:text-indigo-500 underline decoration-indigo-500/30">Contact Support</a>
        </p>
      </div>
    </div>
  );
};

export default Onboarding;