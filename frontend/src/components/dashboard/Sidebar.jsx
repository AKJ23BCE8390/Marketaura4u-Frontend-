import React from 'react';
import {
  Home,
  LayoutGrid,
  Calendar,
  Search as SearchIcon,
  Bot,
  BarChartHorizontal,
} from 'lucide-react';

// --- Sidebar ---
const Sidebar = ({ dashboardView, onNavigate }) => {
  const navItems = [
    { name: 'Content Hub', view: 'content-hub', icon: Home },
    { name: 'Campaign Orchestrator', view: 'campaign-orchestrator', icon: LayoutGrid },
    { name: 'Content Calendar', view: 'content-calendar', icon: Calendar },
    { name: 'Content Autopsy', view: 'content-autopsy', icon: SearchIcon },
    { name: 'Resonance Engine', view: 'resonance-engine', icon: Bot },
    { name: 'Performance Dashboard', view: 'performance-dashboard', icon: BarChartHorizontal },
  ];

  return (
    <div className="flex h-screen w-64 flex-col border-r border-gray-200 bg-white dark:border-gray-800 dark:bg-gray-950">
      {/* Logo */}
      <div className="flex h-16 items-center border-b border-gray-200 px-6 dark:border-gray-800">
          <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M14 0C21.732 0 28 6.26801 28 14C28 21.732 21.732 28 14 28C6.26801 28 0 21.732 0 14C0 6.26801 6.26801 0 14 0ZM14 2.33333C7.56 2.33333 2.33333 7.56 2.33333 14C2.33333 20.44 7.56 25.6667 14 25.6667C20.44 25.6667 25.6667 20.44 25.6667 14C25.6667 7.56 20.44 2.33333 14 2.33333ZM19.3433 7.74667L19.348 7.74199C20.44 9.42667 21 11.62 21 14C21 17.8033 18.1367 20.9533 14.4667 21.58C14.315 21.5587 14.158 21.5427 14 21.5427C13.842 21.5427 13.685 21.5587 13.5333 21.58C9.86333 20.9533 7 17.8033 7 14C7 11.62 7.56 9.42667 8.652 7.74199L8.65667 7.74667L14 17.3333L19.3433 7.74667Z" fill="url(#logo-gradient)" />
          </svg>
          <span className="ml-2 text-2xl font-bold text-gray-900 dark:text-white">Aura</span>
      </div>
      
      {/* Navigation */}
      <nav className="flex-1 space-y-2 p-4">
        <h3 className="px-3 text-xs font-semibold uppercase text-gray-500 dark:text-gray-400">Core Modules</h3>
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = dashboardView === item.view;
          return (
            <button
              key={item.name}
              onClick={() => onNavigate(item.view)}
              className={`flex w-full items-center rounded-lg px-3 py-2.5 text-sm font-medium transition-colors
                ${isActive
                  ? 'bg-indigo-50 text-indigo-700 dark:bg-indigo-900/50 dark:text-indigo-300'
                  : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-gray-50'
                }`}
            >
              <Icon className="mr-3 h-5 w-5" />
              {item.name}
            </button>
          );
        })}
      </nav>

      {/* Footer / User Account */}
      <div className="border-t border-gray-200 p-4 dark:border-gray-800">
        <div className="flex items-center gap-3">
          <img
            className="h-10 w-10 rounded-full"
            src="https://avatar.vercel.sh/sam.png?size=40"
            alt="Sam Lee"
          />
          <div>
            <p className="text-sm font-medium text-gray-900 dark:text-white">Sam Lee</p>
            <p className="text-xs text-gray-500 dark:text-gray-400">sam@aura-ai.com</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;