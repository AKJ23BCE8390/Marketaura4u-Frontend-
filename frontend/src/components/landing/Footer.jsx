import React from 'react';
import { Github, Twitter, Linkedin } from 'lucide-react';

const Footer = () => {
  const footerLinks = {
    Product: [{ name: 'Features', href: '#' }, { name: 'Pricing', href: '#' }, { name: 'Integrations', href: '#' }, { name: 'Status', href: '#' }],
    Company: [{ name: 'About', href: '#' }, { name: 'Careers', href: '#' }, { name: 'Blog', href: '#' }, { name: 'Press', href: '#' }],
    Resources: [{ name: 'Help Center', href: '#' }, { name: 'Community', href: '#' }, { name: 'API Docs', href: '#' }, { name: 'Partners', href: '#' }],
    Legal: [{ name: 'Privacy', href: '#' }, { name: 'Terms', href: '#' }, { name: 'Security', href: '#' }],
  };

  return (
    <footer className="bg-gray-50 pt-20 pb-12 dark:bg-gray-950">
      <div className="container mx-auto max-w-7xl px-4 lg:px-8">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-4 lg:grid-cols-5">
          <div className="col-span-2 lg:col-span-1">
            <a href="#" className="flex items-center gap-2">
              <span className="text-2xl font-bold text-gray-900 dark:text-white">Aura</span>
            </a>
            <p className="mt-4 text-sm text-gray-600 dark:text-gray-300">AI-powered content marketing.</p>
            <div className="mt-6 flex space-x-5">
              <a href="#" className="text-gray-400 transition-colors hover:text-gray-500 dark:text-gray-500 dark:hover:text-gray-400"><Github className="h-5 w-5" /><span className="sr-only">GitHub</span></a>
              <a href="#" className="text-gray-400 transition-colors hover:text-gray-500 dark:text-gray-500 dark:hover:text-gray-400"><Twitter className="h-5 w-5" /><span className="sr-only">Twitter</span></a>
              <a href="#" className="text-gray-400 transition-colors hover:text-gray-500 dark:text-gray-500 dark:hover:text-gray-400"><Linkedin className="h-5 w-5" /><span className="sr-only">LinkedIn</span></a>
            </div>
          </div>
          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h3 className="text-sm font-semibold uppercase tracking-wide text-gray-900 dark:text-white">{title}</h3>
              <ul role="list" className="mt-4 space-y-3">
                {links.map((link) => (<li key={link.name}><a href={link.href} className="text-sm text-gray-600 transition-colors hover:text-gray-900 dark:text-gray-300 dark:hover:text-white">{link.name}</a></li>))}
              </ul>
            </div>
          ))}
        </div>
        <div className="mt-16 border-t border-gray-900/10 pt-8 text-center dark:border-white/10">
          <p className="text-sm text-gray-600 dark:text-gray-400">&copy; {new Date().getFullYear()} Aura AI, Inc. All rights reserved.</p>
          <p className="mt-2 text-xs text-gray-500">Made with <a href="https://visily.ai/" target="_blank" rel="noopener noreferrer" className="font-medium text-indigo-600 hover:underline">Visily</a></p>
        </div>
      </div>
      <style>{`
        @keyframes slide-in-right { from { transform: translateX(100%); } to { transform: translateX(0); } }
        .animate-slide-in-right { animation: slide-in-right 0.3s ease-out forwards; }
        @keyframes fade-in-up { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
        .animate-fade-in-up { animation: fade-in-up 0.6s ease-out forwards; opacity: 0; }
        @keyframes wave-float { 0% { transform: translateX(-50%) translateY(0) rotate(0deg); opacity: 0.2; } 50% { transform: translateX(-50%) translateY(-20px) rotate(5deg); opacity: 0.3; } 100% { transform: translateX(-50%) translateY(0) rotate(0deg); opacity: 0.2; } }
        .wave { animation: wave-float 8s ease-in-out infinite; }
        @keyframes fade-in { from { opacity: 0; transform: scale(0.95); } to { opacity: 1; transform: scale(1); } }
        @keyframes fade-in-sm { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
        .animate-fade-in { animation: fade-in 0.3s ease-out forwards; }
        .animate-fade-in-sm { animation: fade-in-sm 0.3s ease-out forwards; }
      `}</style>
    </footer>
  );
};

export default Footer;