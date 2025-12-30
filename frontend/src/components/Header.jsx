import React from "react";
import logo from "/logo.png";
import Navbar from "./Navbar";
import ThemeToggle from "./ThemeToggle";

function Header() {
  return (
    <header className="relative w-full bg-white dark:bg-slate-950 dark:text-white">

      {/* Theme Toggle Button */}
      <div className="absolute top-4 right-4">
        <ThemeToggle />
      </div>

      {/* Hero Content */}
      <div className="max-w-6xl mx-auto flex flex-col items-center text-center gap-6 py-14 px-4">

        {/* Logo */}
        <img
          src={logo}
          alt="AI Marketing Logo"
          className="h-38 w-auto object-contain"
        />

        {/* Main Heading */}
        <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-black dark:text-blue-400">
          Next-Gen Marketing Platform
        </h1>

        {/* Subheading */}
        <p className="max-w-2xl text-base md:text-lg text-gray-600 dark:text-blue-300">
          AI-powered one-click campaign generation, launch, and optimization —
          all in one intelligent platform.
        </p>

        {/* CTA Buttons */}
        <div className="flex gap-4 mt-2">
          <button className="px-6 py-2.5 rounded-md bg-blue-500 text-white font-medium hover:bg-blue-600 transition">
            Get Started
          </button>
        </div>

        {/* Navigation */}
        <Navbar />

      </div>

      {/* Divider */}
      <div className="h-px bg-gray-200 dark:bg-slate-800"></div>
    </header>
  );
}

export default Header;
