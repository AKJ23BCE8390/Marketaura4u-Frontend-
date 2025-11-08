import React, { useContext } from 'react';
import { Search as SearchIcon, Bell } from 'lucide-react';
import ThemeToggle from '../common/ThemeToggle';
import { AuthContext } from '../../contexts/AuthContext';

// --- Dashboard Header ---
const DashboardHeader = ({ title }) => {
  const { user } = useContext(AuthContext);
  return (
    <header className="flex h-16 flex-shrink-0 items-center justify-between border-b border-gray-200 bg-white px-6 dark:border-gray-800 dark:bg-gray-950">
      {/* Page Title */}
      <h1 className="text-xl font-semibold text-gray-900 dark:text-white">{title}</h1>

      {/* Right Side */}
      <div className="flex items-center gap-4">
        {/* Search Bar */}
        <div className="relative">
          <SearchIcon className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search..."
            className="w-64 rounded-lg border border-gray-300 py-2 pl-9 pr-3 text-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 dark:border-gray-700 dark:bg-gray-900 dark:text-white"
          />
        </div>

        <ThemeToggle />

        <button className="rounded-full p-2 text-gray-600 transition-colors hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800">
          <Bell className="h-5 w-5" />
        </button>

        {/* User Profile */}
        <div className="flex items-center">
          <img
            className="h-9 w-9 rounded-full"
            src="https://avatar.vercel.sh/sam.png?size=36"
            alt={user?.email || 'User'}
          />
        </div>
      </div>
    </header>
  );
};

export default DashboardHeader;