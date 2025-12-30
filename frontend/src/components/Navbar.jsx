import React from "react";

function Navbar() {
  return (
    <nav className="flex gap-6 mt-4 text-sm font-medium text-black dark:text-white">
      <span className="cursor-pointer hover:text-blue-500">Features</span>
      <span className="text-gray-400">|</span>
      <span className="cursor-pointer hover:text-blue-500">Pricing</span>
      <span className="text-gray-400">|</span>
      <span className="cursor-pointer hover:text-blue-500">About Us</span>
      <span className="text-gray-400">|</span>
      <span className="cursor-pointer hover:text-blue-500">Contact Us</span>
    </nav>
  );
}

export default Navbar;
