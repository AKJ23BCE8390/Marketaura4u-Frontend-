import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Mail, Lock, Eye, EyeOff, ArrowRight, Loader2, Rocket } from "lucide-react";

function Signup() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSignup = async (e) => {
    e.preventDefault();
    setError("");

    if (!email || !password) {
      setError("Please fill in all fields");
      return;
    }

    try {
      setLoading(true);

      const res = await fetch("http://localhost:5000/api/v1/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();
      
      if (!res.ok) {
        throw new Error(data.message || "Signup failed");
      }

      // On success, redirect to login
      navigate("/login");
    } catch (err) {
      setError(err.message || "Failed to create account. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex bg-slate-50 dark:bg-slate-950">
      
      {/* --- LEFT SIDE: Visual Banner (Hidden on mobile) --- */}
      <div className="hidden lg:flex w-1/2 relative overflow-hidden bg-slate-900 text-white items-center justify-center">
        {/* Abstract Background Effects - Slightly different gradient for Signup */}
        <div className="absolute inset-0 bg-gradient-to-br from-purple-600/20 via-pink-600/20 to-slate-900 z-10" />
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob" />
        <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-pink-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000" />
        
        {/* Content */}
        <div className="relative z-20 p-12 text-center max-w-lg">
          <div className="mb-6 flex justify-center">
            <div className="p-3 bg-white/10 rounded-xl backdrop-blur-lg border border-white/20">
              <Rocket size={32} className="text-purple-400" />
            </div>
          </div>
          <h2 className="text-4xl font-bold mb-6 tracking-tight">
            Start Creating <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">Today</span>
          </h2>
          <p className="text-slate-300 text-lg leading-relaxed">
            Join thousands of creators using AI to supercharge their content. Create your free account and start generating in seconds.
          </p>
        </div>
      </div>

      {/* --- RIGHT SIDE: Signup Form --- */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 sm:p-12 lg:p-16">
        <div className="w-full max-w-md space-y-8">
          
          {/* Header */}
          <div className="text-center">
            <h2 className="text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
              Create Account
            </h2>
            <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">
              Enter your details to get started.
            </p>
          </div>

          {/* Form */}
          <form className="mt-8 space-y-6" onSubmit={handleSignup}>
            
            <div className="space-y-4">
              {/* Email Field */}
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-slate-400 group-focus-within:text-purple-500 transition-colors" />
                </div>
                <input
                  type="email"
                  placeholder="Email address"
                  className="block w-full pl-10 pr-3 py-3 border border-slate-300 dark:border-slate-700 rounded-lg leading-5 bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all sm:text-sm"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              {/* Password Field */}
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-slate-400 group-focus-within:text-purple-500 transition-colors" />
                </div>
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Create a password"
                  className="block w-full pl-10 pr-10 py-3 border border-slate-300 dark:border-slate-700 rounded-lg leading-5 bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all sm:text-sm"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5 text-slate-400 hover:text-slate-600 cursor-pointer" />
                  ) : (
                    <Eye className="h-5 w-5 text-slate-400 hover:text-slate-600 cursor-pointer" />
                  )}
                </button>
              </div>
            </div>

            {/* Error Message */}
            {error && (
              <div className="p-3 rounded-lg bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 text-sm font-medium text-center animate-pulse">
                {error}
              </div>
            )}

            {/* Signup Button */}
            <button
              type="submit"
              disabled={loading}
              className={`
                group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-bold rounded-lg text-white 
                ${loading 
                  ? "bg-purple-400 cursor-not-allowed" 
                  : "bg-purple-600 hover:bg-purple-700 focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 shadow-lg hover:shadow-purple-500/30"}
                transition-all duration-200
              `}
            >
              {loading ? (
                <>
                  <Loader2 className="animate-spin -ml-1 mr-2 h-5 w-5" />
                  Creating Account...
                </>
              ) : (
                <>
                  Get Started
                  <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </>
              )}
            </button>

            {/* Footer Links */}
            <div className="text-center mt-4">
              <p className="text-sm text-slate-600 dark:text-slate-400">
                Already have an account?{" "}
                <Link to="/login" className="font-semibold text-purple-600 hover:text-purple-500 dark:text-purple-400 transition-colors">
                  Log in
                </Link>
              </p>
            </div>

          </form>
        </div>
      </div>
    </div>
  );
}

export default Signup;