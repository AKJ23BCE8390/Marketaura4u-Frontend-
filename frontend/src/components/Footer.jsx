import React from "react";

function Footer() {
  return (
    <footer className="bg-white dark:bg-slate-950 border-t border-gray-200 dark:border-slate-800">
      <div className="max-w-6xl mx-auto px-4 py-8 flex flex-col md:flex-row items-center justify-between gap-4">

        {/* Left */}
        <p className="text-sm text-gray-600 dark:text-gray-400">
          © {new Date().getFullYear()} AI-Marketing. All rights reserved.
        </p>

        {/* Right */}
        <div className="flex gap-6 text-sm">
          <span className="cursor-pointer hover:text-blue-500">Privacy</span>
          <span className="cursor-pointer hover:text-blue-500">Terms</span>
          <span className="cursor-pointer hover:text-blue-500">Support</span>
        </div>

      </div>
    </footer>
  );
}

export default Footer;
