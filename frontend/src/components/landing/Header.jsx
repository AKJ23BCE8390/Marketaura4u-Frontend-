import React, { useState } from 'react';
import { Menu, X, MoveRight } from 'lucide-react';
import ThemeToggle from '../common/ThemeToggle';

const Header = ({ onNavigate, isAuthenticated, onLogout }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navLinks = [
    { name: 'Features', href: '#features' },
    { name: 'Workflow', href: '#workflow' },
    { name: 'Pricing', href: '#pricing' },
    { name: 'Testimonials', href: '#testimonials' },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b border-gray-200/50 bg-white/80 backdrop-blur-sm dark:border-gray-700/50 dark:bg-gray-900/80">
      <nav className="container mx-auto flex max-w-7xl items-center justify-between p-4 lg:px-8">
        {/* Logo */}
        <a href="#" className="flex items-center gap-2" onClick={() => onNavigate('landing')}>
          <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M14 0C21.732 0 28 6.26801 28 14C28 21.732 21.732 28 14 28C6.26801 28 0 21.732 0 14C0 6.26801 6.26801 0 14 0ZM14 2.33333C7.56 2.33333 2.33333 7.56 2.33333 14C2.33333 20.44 7.56 25.6667 14 25.6667C20.44 25.6667 25.6667 20.44 25.6667 14C25.6667 7.56 20.44 2.33333 14 2.33333ZM19.3433 7.74667L19.348 7.74199C20.44 9.42667 21 11.62 21 14C21 17.8033 18.1367 20.9533 14.4667 21.58C14.315 21.5587 14.158 21.5427 14 21.5427C13.842 21.5427 13.685 21.5587 13.5333 21.58C9.86333 20.9533 7 17.8033 7 14C7 11.62 7.56 9.42667 8.652 7.74199L8.65667 7.74667L14 17.3333L19.3433 7.74667Z" fill="url(#logo-gradient)" />
            <defs>
              <linearGradient id="logo-gradient" x1="14" y1="0" x2="14" y2="28" gradientUnits="userSpaceOnUse">
                <stop stopColor="#6366F1" />
                <stop offset="1" stopColor="#8B5CF6" />
              </linearGradient>
            </defs>
          </svg>
          <span className="text-2xl font-bold text-gray-900 dark:text-white">Aura</span>
        </a>

        {/* Desktop Nav */}
        <div className="hidden items-center gap-6 lg:flex">
          {navLinks.map((link) => (
            <a key={link.name} href={link.href} className="text-sm font-medium text-gray-600 transition-colors hover:text-indigo-600 dark:text-gray-300 dark:hover:text-indigo-400">
              {link.name}
            </a>
          ))}
        </div>

        {/* Desktop Login & Theme Toggle */}
        <div className="hidden items-center gap-4 lg:flex">
          <ThemeToggle />
          {isAuthenticated ? (
            <button onClick={onLogout} className="text-sm font-medium text-gray-600 transition-colors hover:text-indigo-600 dark:text-gray-300 dark:hover:text-indigo-400">
              Logout
            </button>
          ) : (
            <button onClick={() => onNavigate('login')} className="text-sm font-medium text-gray-600 transition-colors hover:text-indigo-600 dark:text-gray-300 dark:hover:text-indigo-400">
              Login
            </button>
          )}
          <button
            onClick={() => onNavigate(isAuthenticated ? 'dashboard' : 'login')}
            className="group inline-flex items-center justify-center rounded-full bg-indigo-600 px-5 py-2.5 text-sm font-medium text-white shadow-lg transition-all duration-300 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          >
            {isAuthenticated ? 'Go to Dashboard' : 'Get Started'}
            <MoveRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
          </button>
        </div>

        {/* Mobile Menu Button */}
        <div className="flex items-center gap-2 lg:hidden">
          <ThemeToggle />
          <button onClick={() => setIsMenuOpen(true)} className="rounded-md p-2 text-gray-700 dark:text-gray-200" aria-label="Open menu">
            <Menu className="h-6 w-6" />
          </button>
        </div>
      </nav>

      {/* Mobile Menu Panel */}
      {isMenuOpen && (
        <div className="fixed inset-0 z-50 bg-gray-900/40 backdrop-blur-sm lg:hidden" onClick={() => setIsMenuOpen(false)}>
          <div className="fixed right-0 top-0 h-full w-full max-w-xs animate-slide-in-right bg-white p-6 shadow-xl dark:bg-gray-950" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between">
              <a href="#" className="text-2xl font-bold text-gray-900 dark:text-white" onClick={() => onNavigate('landing')}>
                Aura
              </a>
              <button onClick={() => setIsMenuOpen(false)} className="rounded-md p-2 text-gray-700 dark:text-gray-200" aria-label="Close menu">
                <X className="h-6 w-6" />
              </button>
            </div>
            <div className="mt-8 flex flex-col gap-y-4">
              {navLinks.map((link) => (
                <a key={link.name} href={link.href} onClick={() => setIsMenuOpen(false)} className="block rounded-lg px-3 py-2 text-base font-medium text-gray-700 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-800">
                  {link.name}
                </a>
              ))}
            </div>
            <div className="mt-8 border-t border-gray-200 pt-6 dark:border-gray-700">
              <button
                onClick={() => { onNavigate(isAuthenticated ? 'dashboard' : 'login'); setIsMenuOpen(false); }}
                className="block w-full rounded-full bg-indigo-600 px-5 py-3 text-center text-sm font-medium text-white shadow-lg transition-all duration-300 hover:bg-indigo-700"
              >
                {isAuthenticated ? 'Go to Dashboard' : 'Get Started'}
              </button>
              {isAuthenticated ? (
                  <button onClick={() => { onLogout(); setIsMenuOpen(false); }} className="mt-4 block w-full rounded-full py-3 text-center text-sm font-medium text-gray-700 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-800">
                    Logout
                  </button>
              ) : (
                <button onClick={() => { onNavigate('login'); setIsMenuOpen(false); }} className="mt-4 block w-full rounded-full py-3 text-center text-sm font-medium text-gray-700 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-800">
                  Login
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;