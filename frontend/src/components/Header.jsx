import React from "react";
import logo from "/logo.png";
import Navbar from "./Navbar";
import ThemeToggle from "./ThemeToggle";
import { Link, useLocation, useNavigate } from "react-router-dom";

function Header() {
  const location = useLocation();
  const navigate = useNavigate();

  const isHomePage = location.pathname === "/homepage";

  // Get user initial safely
  const user = JSON.parse(localStorage.getItem("user"));
  const userInitial = user?.email?.[0]?.toUpperCase() || "U";

  // 🔴 LOGOUT HANDLER
  const handleLogout = async () => {
    try {
      await fetch("http://localhost:5000/api/v1/auth/logout", {
        method: "POST",
        credentials: "include",
      });

      localStorage.clear();
      sessionStorage.clear();

      navigate("/");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <header className="relative w-full bg-white dark:bg-slate-950 dark:text-white">

      {/* ================= DASHBOARD HEADER ================= */}
      {isHomePage && (
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200 dark:border-slate-800">
          
          {/* Left (empty for spacing / future breadcrumb) */}
          <div></div>

          {/* Right: Theme + Profile */}
          <div className="flex items-center gap-4">
            <ThemeToggle />

            <div className="flex items-center gap-2">
              
              {/* PROFILE LINK */}
              <Link to="/profile" title="View Profile">
                <div
                  className="
                    h-8 w-8 rounded-full 
                    bg-blue-500 text-white 
                    flex items-center justify-center 
                    text-sm font-semibold 
                    cursor-pointer 
                    hover:bg-blue-600 
                    transition
                  "
                >
                  {userInitial}
                </div>
              </Link>

              {/* LOGOUT */}
              <button
                onClick={handleLogout}
                className="
                  text-sm px-3 py-1 rounded-md 
                  border border-gray-300 dark:border-slate-700 
                  hover:bg-gray-100 dark:hover:bg-slate-900 
                  transition
                "
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ================= LANDING PAGE HEADER ================= */}
      {!isHomePage && (
        <>
          {/* Theme Toggle */}
          <div className="absolute top-4 right-4">
            <ThemeToggle />
          </div>

          <div className="max-w-6xl mx-auto flex flex-col items-center text-center gap-6 py-14 px-4">

            {/* Logo */}
            <img
              src={logo}
              alt="AI Marketing Logo"
              className="h-32 w-auto object-contain"
            />

            {/* Heading */}
            <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-black dark:text-blue-400">
              Next-Gen Marketing Platform
            </h1>

            {/* Subheading */}
            <p className="max-w-2xl text-base md:text-lg text-gray-600 dark:text-blue-300">
              AI-powered one-click campaign generation, launch, and optimization —
              all in one intelligent platform.
            </p>

            {/* CTA */}
            <Link to="/login">
              <button className="px-6 py-2.5 rounded-md bg-blue-500 text-white font-medium hover:bg-blue-600 transition">
                Get Started
              </button>
            </Link>

            {/* Navigation */}
            <Navbar />
          </div>

          <div className="h-px bg-gray-200 dark:bg-slate-800"></div>
        </>
      )}
    </header>
  );
}

export default Header;
