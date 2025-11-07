import React, { useState, useEffect, createContext, useContext } from 'react';

import {
  Menu,
  X,
  Zap,
  Workflow as WorkflowIcon,
  Send,
  Target,
  PenTool,
  Share2,
  BarChart2,
  Check,
  Quote,
  User,
  Github,
  Twitter,
  Linkedin,
  MoveRight,
  ChevronRight,
  Sun,
  Moon,
  LogIn,
  ArrowLeft,
  Building,
  Users,
  DollarSign,
  ArrowRight,
  // --- NEW ICONS for Dashboard ---
  Home, // For Content Hub
  LayoutGrid, // For Campaign Orchestrator
  Calendar, // For Content Calendar
  Search as SearchIcon, // For Content Autopsy
  Bot, // For Resonance Engine
  BarChartHorizontal, // For Performance Dashboard
  Bell, // For Notifications
  Plus, // For Create New
  UploadCloud, // For Upload
  FileText, // For Document
  Video, // For Video
  Image, // For Image
  MessageSquare, // For Blog Post
  MoreVertical, // For Actions
  Edit, // For Edit
  Trash2, // For Delete
  Download, // For Download
  Copy, // For Copy
  Filter, // For Filter
  RefreshCw, // For Refresh
  ChevronsUpDown, // For Dropdowns
  Grid, // For View Toggle
  List, // For View Toggle
  Database, // For Source Content
  CheckSquare, // For Checkbox
  Mail, // For Email
  MessageCircle, // For Tweet Threads
  File, // For Landing Page Copy
} from 'lucide-react';
import { useInView } from 'react-intersection-observer';

// --- API Service ---
const BASE_URL = 'http://localhost:3000/api/v1';

const apiService = {
  async request(endpoint, method, body = null) {
    const options = {
      method: method,
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include', // Send cookies
    };

    if (body) {
      options.body = JSON.stringify(body);
    }

    const response = await fetch(`${BASE_URL}${endpoint}`, options);
    const data = await response.json();

    if (!response.ok || data.status !== 200) {
      throw new Error(data.message || data.error || 'API request failed');
    }
    return data;
  },

  login(email, password) {
    return this.request('/auth/login', 'POST', { email, password });
  },

  signup(email, password) {
    return this.request('/auth/signup', 'POST', { email, password });
  },

  logout() {
    return this.request('/auth/logout', 'GET');
  },

  onboard(onboardingData) {
    return this.request('/auth/onboarding', 'POST', onboardingData);
  },
};

// --- Auth Context ---
const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const login = async (email, password) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await apiService.login(email, password);
      setUser(response.data);
      setIsAuthenticated(true);
      return response.data;
    } catch (err) {
      setError(err.message);
      setIsAuthenticated(false);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const signup = async (email, password) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await apiService.signup(email, password);
      setUser(response.data);
      setIsAuthenticated(true);
      return response.data;
    } catch (err) {
      setError(err.message);
      setIsAuthenticated(false);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    setIsLoading(true);
    setError(null);
    try {
      await apiService.logout();
      setUser(null);
      setIsAuthenticated(false);
    } catch (err) {
      setError(err.message);
      setUser(null);
      setIsAuthenticated(false);
    } finally {
      setIsLoading(false);
    }
  };

  const completeOnboarding = async (onboardingData) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await apiService.onboard(onboardingData);
      setUser(response.user);
      return response.user;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const value = {
    user,
    isAuthenticated,
    isLoading,
    error,
    login,
    signup,
    logout,
    completeOnboarding,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};


// --- Theme Context ---
const ThemeContext = createContext();

const ThemeProvider = ({ children }) => {
  const [isDarkMode, setIsDarkMode] = useState(false); // Default to light

  useEffect(() => {
    const root = window.document.documentElement;
    if (isDarkMode) {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
  }, [isDarkMode]);

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  return (
    <ThemeContext.Provider value={{ isDarkMode, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

// --- Reusable Animated Components ---
const FadeIn = ({ children, delay = 0, duration = 500, triggerOnce = true }) => {
  const { ref, inView } = useInView({
    triggerOnce: triggerOnce,
    threshold: 0.1,
  });

  return (
    <div
      ref={ref}
      className={`transition-all ${
        inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
      }`}
      style={{
        transitionDuration: `${duration}ms`,
        transitionDelay: `${delay}ms`,
      }}
    >
      {children}
    </div>
  );
};

// --- Theme Toggle Button ---
const ThemeToggle = () => {
  const { isDarkMode, toggleTheme } = useContext(ThemeContext);
  return (
    <button
      onClick={toggleTheme}
      className="rounded-full p-2 text-gray-600 transition-colors hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800"
      aria-label="Toggle dark mode"
    >
      {isDarkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
    </button>
  );
};

// --- 
// --- 
// --- LANDING PAGE COMPONENTS ---
// --- 
// --- 

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

const AnimatedWaves = () => (
  <div className="absolute inset-0 z-0 overflow-hidden" aria-hidden="true">
    <div className="wave absolute -bottom-1/4 left-1/2 h-[40rem] w-[80rem] -translate-x-1/2 rounded-full bg-indigo-100 opacity-20 dark:bg-indigo-900/30" />
    <div className="wave absolute -bottom-1/3 left-1/2 h-[35rem] w-[70rem] -translate-x-1/2 rounded-full bg-indigo-100 opacity-20 dark:bg-indigo-900/30" style={{ animationDelay: '2s' }} />
    <div className="wave absolute -bottom-1/2 left-1/2 h-[30rem] w-[60rem] -translate-x-1/2 rounded-full bg-indigo-100 opacity-20 dark:bg-indigo-900/30" style={{ animationDelay: '4s' }} />
  </div>
);

const Hero = ({ onNavigate }) => (
  <section className="relative overflow-hidden bg-white pt-20 pb-24 dark:bg-gray-900 sm:pt-28 sm:pb-32">
    <div className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80" aria-hidden="true">
      <div className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem] dark:opacity-20" style={{ clipPath: 'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)' }} />
    </div>
    <AnimatedWaves />
    <div className="container relative z-10 mx-auto max-w-7xl px-4 lg:px-8">
      <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2">
        <div className="max-w-2xl text-center lg:text-left">
          <h1 className="animate-fade-in-up text-4xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-6xl [animation-delay:200ms]">
            Transform Your Marketing Content with AI
          </h1>
          <p className="mt-6 animate-fade-in-up text-lg leading-8 text-gray-600 dark:text-gray-300 [animation-delay:400ms]">
            With Aura, create high-quality, engaging content that's designed
            to convert. Our AI-powered platform helps you streamline your
            workflow.
          </p>
          <div className="mt-10 flex animate-fade-in-up items-center justify-center gap-x-6 [animation-delay:600ms] lg:justify-start">
            <button
              onClick={() => onNavigate('login')}
              className="group inline-flex items-center justify-center rounded-full bg-indigo-600 px-7 py-3 text-base font-medium text-white shadow-lg transition-all duration-300 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            >
              Start Free Trial
              <MoveRight className="ml-2 h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
            </button>
            <a href="#features" className="group inline-flex items-center text-base font-medium leading-6 text-gray-700 transition-colors duration-300 hover:text-gray-900 dark:text-gray-200 dark:hover:text-white">
              Learn More{' '}
              <ChevronRight className="ml-1 h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
            </a>
          </div>
        </div>
        <div className="relative mt-10 animate-fade-in-up [animation-delay:600ms] lg:mt-0">
          <div className="aspect-[3/2] w-full overflow-hidden rounded-2xl shadow-2xl ring-1 ring-gray-900/10 dark:ring-white/10">
            <video className="h-full w-full object-cover" autoPlay loop muted playsInline>
              <source src="https://cdn.pixabay.com/video/2024/05/27/211516_large.mp4" type="video/mp4" />
            </video>
          </div>
        </div>
      </div>
      <div className="mt-20 animate-fade-in-up [animation-delay:800ms] sm:mt-24">
        <p className="text-center text-sm font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400">
          Trusted by leading marketing teams
        </p>
        <div className="mx-auto mt-8 grid max-w-lg grid-cols-2 items-center gap-x-8 gap-y-10 sm:max-w-xl sm:grid-cols-4 sm:gap-x-10 lg:mx-0 lg:max-w-none">
          <div className="text-center text-2xl font-bold text-gray-400 opacity-80 transition-opacity hover:opacity-100 dark:text-gray-600 dark:hover:text-gray-500">Nexus</div>
          <div className="text-center text-2xl font-bold text-gray-400 opacity-80 transition-opacity hover:opacity-100 dark:text-gray-600 dark:hover:text-gray-500">Quantum</div>
          <div className="text-center text-2xl font-bold text-gray-400 opacity-80 transition-opacity hover:opacity-100 dark:text-gray-600 dark:hover:text-gray-500">Echo</div>
          <div className="text-center text-2xl font-bold text-gray-400 opacity-80 transition-opacity hover:opacity-100 dark:text-gray-600 dark:hover:text-gray-500">Apex</div>
        </div>
      </div>
    </div>
  </section>
);

const FeatureCard = ({ icon, title, children }) => (
  <div className="group relative transform rounded-2xl border border-gray-200/80 bg-white p-8 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-indigo-300 hover:shadow-lg dark:border-gray-700/80 dark:bg-gray-800 dark:hover:border-indigo-600 dark:hover:shadow-indigo-500/10">
    <div className="absolute -top-5 left-8 flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 text-white shadow-lg transition-all duration-300 group-hover:scale-110">
      {icon}
    </div>
    <h3 className="mt-8 text-xl font-semibold text-gray-900 dark:text-white">{title}</h3>
    <p className="mt-4 text-base text-gray-600 dark:text-gray-300">{children}</p>
    <a href="#" className="mt-6 inline-flex items-center text-sm font-medium text-indigo-600 transition-all duration-300 group-hover:text-indigo-800 dark:text-indigo-400 dark:group-hover:text-indigo-300">
      Learn more
      <ChevronRight className="ml-1 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
    </a>
  </div>
);

const Features = () => (
  <section id="features" className="bg-gray-50 py-24 dark:bg-gray-950 sm:py-32">
    <div className="container mx-auto max-w-7xl px-4 lg:px-8">
      <FadeIn>
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
            Unlock Your Content Potential
          </h2>
          <p className="mt-6 text-lg leading-8 text-gray-600 dark:text-gray-300">
            Aura's intelligent features are designed to supercharge your
            creativity and efficiency.
          </p>
        </div>
      </FadeIn>
      <div className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-12 sm:mt-20 lg:max-w-none lg:grid-cols-3">
        <FadeIn delay={0}>
          <FeatureCard icon={<Zap className="h-6 w-6" />} title="AI-Powered Content">
            Our advanced AI generates everything from blog posts to ad copy,
            tailored to your brand's voice.
          </FeatureCard>
        </FadeIn>
        <FadeIn delay={200}>
          <FeatureCard icon={<WorkflowIcon className="h-6 w-6" />} title="Seamless Workflow">
            Manage your entire content lifecycle from one intuitive
            dashboard. Plan, create, and publish with ease.
          </FeatureCard>
        </FadeIn>
        <FadeIn delay={400}>
          <FeatureCard icon={<Send className="h-6 w-6" />} title="Multi-Channel Publishing">
            Distribute your content across all your channels with a single
            click. Natively post to social, blogs, and more.
          </FeatureCard>
        </FadeIn>
      </div>
    </div>
  </section>
);

const WorkflowStep = ({ icon, title, children, isLast = false }) => (
  <div className="relative flex flex-col items-center text-center">
    {!isLast && (
      <div className="absolute left-1/2 top-6 hidden h-full w-px -translate-x-1/2 -translate-y-4 border-l-2 border-dashed border-gray-300 dark:border-gray-700 md:block" />
    )}
    <div className="z-10 flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-indigo-100 to-purple-100 text-indigo-600 ring-8 ring-white dark:from-indigo-900/50 dark:to-purple-900/50 dark:text-indigo-400 dark:ring-gray-900">
      {icon}
    </div>
    <h3 className="mt-6 text-lg font-semibold text-gray-900 dark:text-white">{title}</h3>
    <p className="mt-2 text-base text-gray-600 dark:text-gray-300">{children}</p>
  </div>
);

const Workflow = () => (
  <section id="workflow" className="bg-white py-24 dark:bg-gray-900 sm:py-32">
    <div className="container mx-auto max-w-7xl px-4 lg:px-8">
      <FadeIn>
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
            How Aura Transforms Your Workflow
          </h2>
          <p className="mt-6 text-lg leading-8 text-gray-600 dark:text-gray-300">
            From idea to analysis, our platform simplifies every step of
            your content operation.
          </p>
        </div>
      </FadeIn>
      <div className="relative mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-16 md:grid-cols-4 lg:max-w-none">
        <div className="absolute left-6 top-0 h-full w-px border-l-2 border-dashed border-gray-300 dark:border-gray-700 md:hidden" />
        <FadeIn delay={0}><WorkflowStep icon={<Target className="h-7 w-7" />} title="1. Plan & Strategize">Define your content goals and map out your editorial calendar.</WorkflowStep></FadeIn>
        <FadeIn delay={200}><WorkflowStep icon={<PenTool className="h-7 w-7" />} title="2. Create with AI">Use our AI tools to draft, refine, and perfect your content.</WorkflowStep></FadeIn>
        <FadeIn delay={400}><WorkflowStep icon={<Share2 className="h-7 w-7" />} title="3. Publish & Distribute">Schedule and publish content to all your platforms seamlessly.</WorkflowStep></FadeIn>
        <FadeIn delay={600}><WorkflowStep icon={<BarChart2 className="h-7 w-7" />} title="4. Analyze & Optimize" isLast={true}>Track performance and get AI-driven insights to improve.</WorkflowStep></FadeIn>
      </div>
    </div>
  </section>
);

const PricingCard = ({ plan, price, description, features, isHighlighted = false }) => (
  <div className={`relative h-full w-full transform rounded-3xl p-8 transition-all duration-300 ${isHighlighted ? 'border-2 border-indigo-600 bg-white shadow-2xl dark:border-indigo-500 dark:bg-gray-800' : 'border border-gray-200 bg-gray-50 dark:border-gray-700 dark:bg-gray-800'}`}>
    {isHighlighted && (<div className="absolute -top-3 left-1/2 -translate-x-1/2 transform rounded-full bg-indigo-600 px-4 py-1 text-sm font-semibold text-white">Most Popular</div>)}
    <h3 className="text-xl font-semibold text-gray-900 dark:text-white">{plan}</h3>
    <p className={`mt-4 flex items-baseline gap-x-2 ${price.startsWith('Contact') ? 'text-2xl' : 'text-4xl'} font-bold tracking-tight text-gray-900 dark:text-white`}>
      {price.startsWith('Contact') ? ('Contact Us') : (<>{price}<span className="text-base font-normal text-gray-500 dark:text-gray-400">/month</span></>)}
    </p>
    <p className="mt-4 text-base text-gray-600 dark:text-gray-300">{description}</p>
    <ul role="list" className="mt-8 space-y-4 text-base text-gray-600 dark:text-gray-300">
      {features.map((feature, i) => (
        <li key={i} className="flex items-start gap-3">
          <Check className="h-6 w-6 flex-shrink-0 text-indigo-600 dark:text-indigo-400" aria-hidden="true" />
          <span>{feature}</span>
        </li>
      ))}
    </ul>
    <a href="#" className={`group mt-10 block w-full rounded-full px-5 py-3 text-center text-base font-medium transition-all duration-300 ${isHighlighted ? 'bg-indigo-600 text-white shadow-lg hover:bg-indigo-700' : 'bg-white text-indigo-600 ring-1 ring-inset ring-indigo-300 hover:bg-indigo-50 dark:bg-gray-700 dark:text-indigo-400 dark:ring-indigo-700 dark:hover:bg-gray-600'}`}>
      {price.startsWith('Contact') ? 'Contact Sales' : `Choose ${plan}`}
    </a>
  </div>
);

const Pricing = () => {
  const [isAnnual, setIsAnnual] = useState(false);
  const plans = {
    monthly: [
      { plan: 'Starter', price: '$29', description: 'Perfect for individuals and small teams.', features: ['10,000 AI Words/mo', '1 User Seat', '3 Content Projects', 'Basic Analytics', 'Email Support'] },
      { plan: 'Pro', price: '$79', description: 'For growing businesses and content teams.', features: ['50,000 AI Words/mo', '5 User Seats', 'Unlimited Projects', 'Advanced Analytics', 'Priority Support', 'SEO Recommendations'], isHighlighted: true },
      { plan: 'Enterprise', price: 'Contact Us', description: 'Scalable solutions for large organizations.', features: ['Unlimited AI Words', 'Custom User Seats', 'Dedicated Account Manager', 'SSO & Advanced Security', 'Custom Integrations'] },
    ],
    annual: [
      { plan: 'Starter', price: '$24', description: 'Perfect for individuals and small teams.', features: ['10,000 AI Words/mo', '1 User Seat', '3 Content Projects', 'Basic Analytics', 'Email Support'] },
      { plan: 'Pro', price: '$65', description: 'For growing businesses and content teams.', features: ['50,000 AI Words/mo', '5 User Seats', 'Unlimited Projects', 'Advanced Analytics', 'Priority Support', 'SEO Recommendations'], isHighlighted: true },
      { plan: 'Enterprise', price: 'Contact Us', description: 'Scalable solutions for large organizations.', features: ['Unlimited AI Words', 'Custom User Seats', 'Dedicated Account Manager', 'SSO & Advanced Security', 'Custom Integrations'] },
    ],
  };
  const currentPlans = isAnnual ? plans.annual : plans.monthly;

  return (
    <section id="pricing" className="bg-gray-50 py-24 dark:bg-gray-950 sm:py-32">
      <div className="container mx-auto max-w-7xl px-4 lg:px-8">
        <FadeIn>
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl">Simple & Transparent Pricing</h2>
            <p className="mt-6 text-lg leading-8 text-gray-600 dark:text-gray-300">Choose the plan that's right for your team. No hidden fees, ever.</p>
          </div>
        </FadeIn>
        <FadeIn delay={200}>
          <div className="mt-10 flex justify-center">
            <div className="relative flex rounded-full bg-gray-200 p-1 dark:bg-gray-800">
              <span className={`absolute inset-0 z-0 m-1 w-1/2 transform rounded-full bg-white shadow-md transition-transform duration-300 ease-in-out dark:bg-gray-900 ${isAnnual ? 'translate-x-full' : 'translate-x-0'}`} />
              <button onClick={() => setIsAnnual(false)} className={`relative z-10 w-1/2 rounded-full px-5 py-2 text-sm font-medium transition-colors duration-300 ${!isAnnual ? 'text-indigo-600 dark:text-indigo-400' : 'text-gray-600 dark:text-gray-400'}`}>Monthly</button>
              <button onClick={() => setIsAnnual(true)} className={`relative z-10 w-1/2 rounded-full px-5 py-2 text-sm font-medium transition-colors duration-300 ${isAnnual ? 'text-indigo-600 dark:text-indigo-400' : 'text-gray-600 dark:text-gray-400'}`}>Annual (Save 20%)</button>
            </div>
          </div>
        </FadeIn>
        <div className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-8 lg:max-w-none lg:grid-cols-3">
          {currentPlans.map((plan, i) => (<FadeIn key={plan.plan} delay={i * 200}><PricingCard {...plan} /></FadeIn>))}
        </div>
      </div>
    </section>
  );
};

const TestimonialCard = ({ quote, name, title }) => (
  <figure className="flex h-full flex-col justify-between rounded-2xl border border-gray-200/80 bg-white p-8 shadow-sm dark:border-gray-700/80 dark:bg-gray-800">
    <blockquote className="text-gray-900 dark:text-white">
      <Quote className="h-8 w-8 text-gray-300 dark:text-gray-600" />
      <p className="mt-4 text-lg font-medium">"{quote}"</p>
    </blockquote>
    <figcaption className="mt-8 flex items-center gap-4 border-t border-gray-200/80 pt-6 dark:border-gray-700/80">
      <img className="h-12 w-12 rounded-full bg-gray-200 object-cover dark:bg-gray-700" src={`https://avatar.vercel.sh/${name.split(' ').join('')}.png?size=48`} alt={name} />
      <div>
        <div className="text-base font-semibold text-gray-900 dark:text-white">{name}</div>
        <div className="text-sm text-gray-600 dark:text-gray-400">{title}</div>
      </div>
    </figcaption>
  </figure>
);

const Testimonials = () => (
  <section id="testimonials" className="bg-white py-24 dark:bg-gray-900 sm:py-32">
    <div className="container mx-auto max-w-7xl px-4 lg:px-8">
      <FadeIn>
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl">What Our Clients Say</h2>
          <p className="mt-6 text-lg leading-8 text-gray-600 dark:text-gray-300">Don't just take our word for it. Hear from marketing leaders who trust Aura.</p>
        </div>
      </FadeIn>
      <div className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-8 lg:max-w-none lg:grid-cols-2">
        <FadeIn delay={0}><TestimonialCard quote="Aura has been a game-changer for our content team. We're producing twice the content in half the time, and the quality is better than ever." name="Jane Doe" title="CMO, TechSolutions" /></FadeIn>
        <FadeIn delay={200}><TestimonialCard quote="The AI-powered insights are incredibly accurate. We've optimized our strategy and seen a 40% increase in engagement. Highly recommend!" name="John Smith" title="Content Lead, CreativeCo" /></FadeIn>
      </div>
    </div>
  </section>
);

const CTA = ({ onNavigate }) => (
  <section className="relative overflow-hidden bg-indigo-600 py-24 sm:py-32">
    <svg viewBox="0 0 1024 1024" className="absolute left-1/2 top-1/2 -z-10 h-[64rem] w-[64rem] -translate-x-1/2 -translate-y-1/2 [mask-image:radial-gradient(closest-side,white,transparent)]" aria-hidden="true">
      <circle cx={512} cy={512} r={512} fill="url(#cta-gradient)" fillOpacity="0.7" />
      <defs><radialGradient id="cta-gradient"><stop stopColor="#7775D6" /><stop offset={1} stopColor="#A855F7" /></radialGradient></defs>
    </svg>
    <div className="container relative z-10 mx-auto max-w-7xl px-4 lg:px-8">
      <FadeIn>
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">Ready to Revolutionize Your Content Operations?</h2>
          <p className="mt-6 text-lg leading-8 text-indigo-100">Join thousands of leading marketing teams who are creating better content, faster with Aura.</p>
          <div className="mt-10 flex items-center justify-center gap-x-6">
            <button
              onClick={() => onNavigate('login')}
              className="group inline-flex items-center justify-center rounded-full bg-white px-7 py-3 text-base font-medium text-indigo-600 shadow-lg transition-all duration-300 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-indigo-600"
            >
              Get Started Free
              <MoveRight className="ml-2 h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
            </button>
          </div>
        </div>
      </FadeIn>
    </div>
  </section>
);

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

// --- This component wraps all the individual landing page sections ---
const LandingPage = ({ onNavigate, isAuthenticated, onLogout }) => (
    <div className="App bg-white text-gray-800 antialiased dark:bg-gray-900 dark:text-gray-200">
      <Header 
        onNavigate={onNavigate} 
        isAuthenticated={isAuthenticated} 
        onLogout={onLogout} 
      />
      <main>
        <Hero onNavigate={onNavigate} />
        <Features />
        <Workflow />
        <Pricing />
        <Testimonials />
        <CTA onNavigate={onNavigate} />
      </main>
      <Footer />
    </div>
);


// --- 
// --- 
// --- LOGIN & ONBOARDING COMPONENTS ---
// --- 
// --- 

const LoginPage = ({ onNavigate }) => {
  const { login, signup, isLoading, error: authError } = useContext(AuthContext);
  const [email, setEmail] = useState('manish@gmail.com');
  const [password, setPassword] = useState('1');
  const [error, setError] = useState(null);

  useEffect(() => {
    if(authError) setError(authError);
  }, [authError]);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError(null);
    try {
      await login(email, password);
    } catch (err) {
      setError(err.message);
    }
  };
  
  const handleSignup = async (e) => {
    e.preventDefault();
    setError(null);
    try {
      await signup(email, password);
    } catch (err) {
      setError(err.message);
    }
  };


  return (
    <div className="flex min-h-screen w-full items-center justify-center bg-gray-100 p-4 font-sans dark:bg-gray-900">
      <div className="w-full max-w-md animate-fade-in rounded-2xl bg-white p-8 shadow-2xl dark:bg-gray-800">
        <div className="flex flex-col items-center">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-indigo-100 text-indigo-600 dark:bg-indigo-900/50 dark:text-indigo-400">
            <LogIn className="h-8 w-8" />
          </div>
          <h2 className="mt-6 text-2xl font-bold text-gray-900 dark:text-white">Welcome Back</h2>
          <p className="mt-2 text-sm text-gray-600 dark:text-gray-300">
            Sign in or create an account to continue.
          </p>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleLogin}>
          {error && (
              <div className="rounded-md bg-red-50 p-4 dark:bg-red-900/30">
                  <p className="text-sm font-medium text-red-700 dark:text-red-300">
                      {error}
                  </p>
              </div>
          )}
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-200">Email Address</label>
            <div className="mt-1">
              <input id="email" name="email" type="email" autoComplete="email" required value={email} onChange={(e) => setEmail(e.target.value)} className="w-full rounded-md border border-gray-300 bg-white px-3 py-2 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:focus:border-indigo-400 dark:focus:ring-indigo-400 sm:text-sm" />
            </div>
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 dark:text-gray-200">Password</label>
            <div className="mt-1">
              <input id="password" name="password" type="password" autoComplete="current-password" required value={password} onChange={(e) => setPassword(e.target.value)} className="w-full rounded-md border border-gray-300 bg-white px-3 py-2 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:focus:border-indigo-400 dark:focus:ring-indigo-400 sm:text-sm" />
            </div>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <input id="remember-me" name="remember-me" type="checkbox" className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500 dark:border-gray-600" />
              <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900 dark:text-gray-200">Remember me</label>
            </div>
            <div className="text-sm">
              <a href="#" className="font-medium text-indigo-600 hover:text-indigo-500 dark:text-indigo-400 dark:hover:text-indigo-300">Forgot password?</a>
            </div>
          </div>
          <div>
            <button type="submit" disabled={isLoading} className="group relative flex w-full justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-lg transition-all duration-300 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:opacity-50">
              {isLoading ? 'Signing In...' : 'Sign In'}
            </button>
          </div>
        </form>
        <div className="mt-6 space-y-4 text-center text-sm text-gray-600 dark:text-gray-300">
          <p>
            Not a member?{' '}
            <button onClick={handleSignup} disabled={isLoading} className="font-medium text-indigo-600 hover:text-indigo-500 dark:text-indigo-400 dark:hover:text-indigo-300 disabled:opacity-50">
              {isLoading ? 'Signing Up...' : 'Start your 14-day free trial'}
            </button>
          </p>
          <p>
            <button onClick={() => onNavigate('landing')} className="font-medium text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200">
              &larr; Back to Home
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

const OnboardingWizard = ({ formData, setFormData, onExit }) => {
  const [step, setStep] = useState(1);
  const totalSteps = 4;
  const { completeOnboarding, isLoading, error: authError } = useContext(AuthContext);
  const [error, setError] = useState(null);

  useEffect(() => {
    if(authError) setError(authError);
  }, [authError]);

  const handleNext = async () => {
    if (step === totalSteps) {
      setError(null);
      try {
        const onboardingData = {
          companyName: formData.companyName,
          industry: formData.industry,
          brandTone: formData.brandVoice,
          teamSize: formData.companySize,
        };
        await completeOnboarding(onboardingData);
      } catch (err) {
        setError(err.message);
      }
    } else {
      setStep((prev) => Math.min(prev + 1, totalSteps));
    }
  };

  const handleBack = () => {
    setStep((prev) => Math.max(prev - 1, 1));
  };

  const progressPercentage = (step / totalSteps) * 100;

  return (
    <div className="flex min-h-screen w-full items-center justify-center bg-gray-100 p-4 font-sans dark:bg-gray-900">
      <div className="w-full max-w-2xl animate-fade-in rounded-2xl bg-white shadow-2xl dark:bg-gray-900">
        <div className="p-8">
          <div className="flex items-start justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Welcome to Aura - Onboarding Wizard</h1>
              <p className="mt-1 text-sm text-gray-600 dark:text-gray-300">Let's set up your content operations to elevate your marketing strategy.</p>
            </div>
            <button onClick={onExit} className="ml-4 rounded-full p-2 text-gray-400 transition-colors hover:bg-gray-100 hover:text-gray-600 dark:text-gray-500 dark:hover:bg-gray-800 dark:hover:text-gray-300">
              <X className="h-5 w-5" />
            </button>
          </div>
          <div className="mt-8">
            <p className="text-sm font-medium text-gray-700 dark:text-gray-300">Step {step} of {totalSteps}</p>
            <div className="mt-2 w-full overflow-hidden rounded-full bg-gray-200 dark:bg-gray-700">
              <div className="h-2 rounded-full bg-blue-600 transition-all duration-500" style={{ width: `${progressPercentage}%` }}></div>
            </div>
          </div>
          {error && (
              <div className="mt-4 rounded-md bg-red-50 p-4 dark:bg-red-900/30">
                  <p className="text-sm font-medium text-red-700 dark:text-red-300">{error}</p>
              </div>
          )}
          <div className="mt-8 min-h-[300px]">
            {step === 1 && <Step1 formData={formData} setFormData={setFormData} />}
            {step === 2 && <Step2 formData={formData} setFormData={setFormData} />}
            {step === 3 && <Step3 formData={formData} setFormData={setFormData} />}
            {step === 4 && <Step4 />}
          </div>
        </div>
        <div className="flex justify-between rounded-b-2xl border-t border-gray-200 bg-gray-50 p-6 dark:border-gray-800 dark:bg-gray-950">
          <button onClick={handleBack} disabled={step === 1 || isLoading} className="group flex items-center gap-2 rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm transition-colors hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-200 dark:hover:bg-gray-700">
            <ArrowLeft className="h-4 w-4" /> Back
          </button>
          <button onClick={handleNext} disabled={isLoading} className="group flex items-center gap-2 rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow-lg transition-all duration-300 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50">
            {step === totalSteps ? (isLoading ? 'Finishing...' : 'Finish') : 'Next'}
            <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
          </button>
        </div>
      </div>
    </div>
  );
};

// --- Onboarding Steps ---
const Step1 = ({ formData, setFormData }) => {
  const handleInputChange = (e) => setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  const handleSliderChange = (e) => setFormData((prev) => ({ ...prev, companySize: parseInt(e.target.value, 10) }));
  return (
    <div className="animate-fade-in-sm space-y-6">
      <h2 className="text-xl font-semibold text-gray-900 dark:text-white">1. Business Identity: Laying the Foundation</h2>
      <p className="text-sm text-gray-600 dark:text-gray-300">Provide key details to tailor Aura to your business needs.</p>
      <div>
        <label htmlFor="companyName" className="block text-sm font-medium text-gray-700 dark:text-gray-200">Company Name</label>
        <input type="text" name="companyName" id="companyName" value={formData.companyName} onChange={handleInputChange} className="mt-1 block w-full rounded-md border-gray-300 bg-white shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-800 dark:text-white sm:text-sm" />
      </div>
      <div>
        <label htmlFor="industry" className="block text-sm font-medium text-gray-700 dark:text-gray-200">Industry</label>
        <input type="text" name="industry" id="industry" value={formData.industry} onChange={handleInputChange} className="mt-1 block w-full rounded-md border-gray-300 bg-white shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-800 dark:text-white sm:text-sm" />
      </div>
      <div>
        <label htmlFor="companySize" className="flex justify-between text-sm font-medium text-gray-700 dark:text-gray-200">
          <span>Company Size (Employees)</span>
          <span className="font-bold text-blue-600 dark:text-blue-400">{formData.companySize}</span>
        </label>
        <input type="range" min="1" max="1000" name="companySize" id="companySize" value={formData.companySize} onChange={handleSliderChange} className="mt-2 h-2 w-full cursor-pointer appearance-none rounded-lg bg-gray-200 accent-blue-600 dark:bg-gray-700" />
      </div>
      <div>
        <label htmlFor="annualRevenue" className="block text-sm font-medium text-gray-700 dark:text-gray-200">Target Annual Revenue</label>
        <input type="text" name="annualRevenue" id="annualRevenue" value={formData.annualRevenue} onChange={handleInputChange} className="mt-1 block w-full rounded-md border-gray-300 bg-white shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-800 dark:text-white sm:text-sm" />
      </div>
    </div>
  );
};
const Step2 = ({ formData, setFormData }) => (
  <div className="animate-fade-in-sm space-y-6">
    <h2 className="text-xl font-semibold text-gray-900 dark:text-white">2. Define Your Audience</h2>
    <p className="text-sm text-gray-600 dark:text-gray-300">Help us understand who you're talking to.</p>
    <div>
      <label htmlFor="targetAudience" className="block text-sm font-medium text-gray-700 dark:text-gray-200">Describe your target audience</label>
      <textarea name="targetAudience" id="targetAudience" rows={5} value={formData.targetAudience} onChange={(e) => setFormData(prev => ({ ...prev, targetAudience: e.target.value }))} className="mt-1 block w-full rounded-md border-gray-300 bg-white shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-800 dark:text-white sm:text-sm" placeholder="e.g., Marketing managers at B2B tech companies, small business owners..." />
    </div>
  </div>
);
const Step3 = ({ formData, setFormData }) => (
  <div className="animate-fade-in-sm space-y-6">
    <h2 className="text-xl font-semibold text-gray-900 dark:text-white">3. Set Your Brand Voice</h2>
    <p className="text-sm text-gray-600 dark:text-gray-300">What should your content sound like?</p>
    <div className="space-y-2">
      {['Professional', 'Casual', 'Witty', 'Enthusiastic', 'Informative'].map(voice => (
        <label key={voice} className="flex items-center rounded-md border border-gray-300 p-3 has-[:checked]:border-blue-600 has-[:checked]:bg-blue-50 dark:border-gray-700 dark:has-[:checked]:border-blue-500 dark:has-[:checked]:bg-blue-900/20">
          <input type="radio" name="brandVoice" value={voice} checked={formData.brandVoice === voice} onChange={(e) => setFormData(prev => ({ ...prev, brandVoice: e.target.value }))} className="h-4 w-4 border-gray-300 text-blue-600 focus:ring-blue-500" />
          <span className="ml-3 block text-sm font-medium text-gray-700 dark:text-gray-200">{voice}</span>
        </label>
      ))}
    </div>
  </div>
);
const Step4 = () => (
  <div className="animate-fade-in-sm flex flex-col items-center justify-center text-center">
    <div className="flex h-20 w-20 items-center justify-center rounded-full bg-green-100 text-green-600 dark:bg-green-900/50 dark:text-green-400">
      <Check className="h-10 w-10" />
    </div>
    <h2 className="mt-6 text-2xl font-semibold text-gray-900 dark:text-white">You're All Set!</h2>
    <p className="mt-2 text-sm text-gray-600 dark:text-gray-300">Your Aura workspace is ready. Click "Finish" to dive in.</p>
  </div>
);


// --- 
// --- 
// --- NEW DASHBOARD COMPONENTS ---
// --- 
// --- 

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

// --- Main Dashboard Layout (Shell) ---
const DashboardLayout = ({ dashboardView, onNavigate }) => {
  const [pageTitle, setPageTitle] = useState('Content Hub');

  // Update title based on view
  useEffect(() => {
    switch (dashboardView) {
      case 'content-hub': setPageTitle('Content Hub'); break;
      case 'campaign-orchestrator': setPageTitle('Campaign Orchestrator'); break;
      case 'content-calendar': setPageTitle('Content Calendar'); break;
      case 'content-autopsy': setPageTitle('Content Autopsy'); break;
      case 'resonance-engine': setPageTitle('Resonance Engine'); break;
      case 'performance-dashboard': setPageTitle('Performance Dashboard'); break;
      default: setPageTitle('Dashboard');
    }
  }, [dashboardView]);

  return (
    <div className="flex h-screen bg-gray-50 text-gray-900 dark:bg-gray-900 dark:text-gray-100">
      <Sidebar dashboardView={dashboardView} onNavigate={onNavigate} />
      <div className="flex flex-1 flex-col overflow-hidden">
        <DashboardHeader title={pageTitle} />
        <main className="flex-1 overflow-y-auto p-6">
          {/* This is where the active page will be rendered */}
          {dashboardView === 'content-hub' && <ContentHub />}
          {dashboardView === 'campaign-orchestrator' && <CampaignOrchestrator />}
          {dashboardView === 'content-calendar' && <ContentCalendar />}
          {dashboardView === 'content-autopsy' && <ContentAutopsy />}
          {dashboardView === 'resonance-engine' && <ResonanceEngine />}
          {dashboardView === 'performance-dashboard' && <PerformanceDashboard />}
        </main>
      </div>
    </div>
  );
};


// --- 
// --- 
// --- NEW STATIC DASHBOARD PAGES ---
// --- 
// --- 

// --- Content Hub Page ---
const ContentHub = () => {
  const contentItems = [
    { name: 'Q3 Marketing Report Draft', type: 'Document', status: 'Draft', date: '2024-07-20', icon: FileText },
    { name: 'New Product Launch Video Ad', type: 'Video', status: 'Review', date: '2024-07-18', icon: Video },
    { name: 'Summer Campaign Visuals', type: 'Image', status: 'Published', date: '2024-07-15', icon: Image },
    { name: 'AI-Generated Blog Post: Future of Content', type: 'Blog Post', status: 'Pending', date: '2024-07-10', icon: MessageSquare },
    { name: 'Social Media Captions - August', type: 'Social Post', status: 'Published', date: '2024-07-05', icon: MessageCircle },
  ];

  const getStatusChip = (status) => {
    switch (status) {
      case 'Draft': return 'bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-300';
      case 'Review': return 'bg-yellow-100 text-yellow-700 dark:bg-yellow-700 dark:text-yellow-200';
      case 'Published': return 'bg-green-100 text-green-700 dark:bg-green-700 dark:text-green-200';
      case 'Pending': return 'bg-orange-100 text-orange-700 dark:bg-orange-700 dark:text-orange-200';
      default: return 'bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-300';
    }
  };

  return (
    <div className="animate-fade-in-sm space-y-6">
      {/* Quick Actions */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* Drag & Drop */}
        <div className="rounded-lg border-2 border-dashed border-gray-300 bg-white p-8 text-center dark:border-gray-700 dark:bg-gray-950">
          <UploadCloud className="mx-auto h-12 w-12 text-gray-400" />
          <h3 className="mt-4 text-lg font-medium text-gray-900 dark:text-white">Drag & Drop Files</h3>
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">Upload images, documents, videos, and more. Max file size 50MB.</p>
          <button className="mt-4 rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-200 dark:hover:bg-gray-700">
            Browse Files
          </button>
        </div>
        {/* Generate Content */}
        <div className="rounded-lg bg-white p-8 shadow-sm dark:bg-gray-950">
          <div className="flex items-center gap-4">
            <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-indigo-100 text-indigo-600 dark:bg-indigo-900/50">
              <Zap className="h-6 w-6" />
            </div>
            <div>
              <h3 className="text-lg font-medium text-gray-900 dark:text-white">Generate Content with AI</h3>
              <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">Get instant content ideas, outlines, or full drafts using AI.</p>
            </div>
          </div>
          <textarea
            className="mt-4 w-full rounded-md border border-gray-300 p-3 text-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 dark:border-gray-700 dark:bg-gray-800 dark:text-white"
            rows="3"
            placeholder="Describe the content you need (e.g., 'a blog post outline about Q3 marketing strategies')..."
          ></textarea>
          <button className="mt-4 w-full rounded-md bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700">
            Generate Content
          </button>
        </div>
      </div>

      {/* Content Library */}
      <div className="rounded-lg bg-white shadow-sm dark:bg-gray-950">
        <div className="flex items-center justify-between border-b border-gray-200 p-4 dark:border-gray-800">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Your Content Library</h2>
          <div className="flex items-center gap-2">
            <button className="rounded-md border border-gray-300 bg-white px-3 py-1.5 text-sm text-gray-700 shadow-sm hover:bg-gray-50 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-200 dark:hover:bg-gray-700">
              <Filter className="mr-1.5 h-4 w-4 inline-block" /> Filter
            </button>
            <button className="flex items-center gap-2 rounded-md bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700">
              <Plus className="h-4 w-4" /> Create New Content
            </button>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-800">
            <thead className="bg-gray-50 dark:bg-gray-900">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400">Content Name</th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400">Type</th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400">Date Added</th>
                <th className="px-6 py-3 text-right text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 bg-white dark:divide-gray-800 dark:bg-gray-950">
              {contentItems.map((item) => {
                const ItemIcon = item.icon;
                return (
                  <tr key={item.name}>
                    <td className="whitespace-nowrap px-6 py-4 text-sm font-medium text-gray-900 dark:text-white">
                      <div className="flex items-center gap-2">
                        <ItemIcon className="h-5 w-5 text-gray-500" />
                        {item.name}
                      </div>
                    </td>
                    <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500 dark:text-gray-400">{item.type}</td>
                    <td className="whitespace-nowrap px-6 py-4 text-sm">
                      <span className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${getStatusChip(item.status)}`}>
                        {item.status}
                      </span>
                    </td>
                    <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500 dark:text-gray-400">{item.date}</td>
                    <td className="whitespace-nowrap px-6 py-4 text-right text-sm font-medium">
                      <button className="p-1 text-gray-500 hover:text-indigo-600 dark:text-gray-400 dark:hover:text-indigo-400"><Download className="h-4 w-4" /></button>
                      <button className="p-1 text-gray-500 hover:text-indigo-600 dark:text-gray-400 dark:hover:text-indigo-400"><Edit className="h-4 w-4" /></button>
                      <button className="p-1 text-gray-500 hover:text-red-600 dark:text-gray-400 dark:hover:text-red-500"><Trash2 className="h-4 w-4" /></button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

// --- Campaign Orchestrator Page ---
const CampaignOrchestrator = () => {
  const channels = [
    { name: 'Blog Post', icon: MessageSquare, desc: 'Atomize the core message into a compelling blog article for organic reach and SEO.' },
    { name: 'LinkedIn Carousel', icon: Linkedin, desc: 'Transform key takeaways into an engaging visual carousel for professional audiences.' },
    { name: 'Instagram Reels Scripts', icon: Video, desc: 'Generate short, dynamic video scripts optimized for Instagram Reels with trending audio suggestions.' },
    { name: 'Email Nurture Campaigns', icon: Mail, desc: 'Develop a series of segmented email campaigns to nurture leads and drive conversions.' },
    { name: 'Tweet Threads', icon: Twitter, desc: 'Break down complex information into digestible, engaging tweet threads for X (Twitter) outreach.' },
    { name: 'Landing Page Copy', icon: File, desc: 'Craft concise, high-converting copy for dedicated landing pages to support campaign objectives.' },
  ];

  return (
    <div className="animate-fade-in-sm space-y-6">
      <p className="text-base text-gray-600 dark:text-gray-300">
        Effortlessly transform your core content assets into multi-channel campaigns tailored for
        various platforms, maximizing your reach and impact.
      </p>

      {/* Step 1: Select Source */}
      <div className="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-950">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Select Source Content Asset</h2>
        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">Choose the primary content asset to atomize into various channels.</p>
        <label className="mt-4 block text-sm font-medium text-gray-700 dark:text-gray-200">Content Asset</label>
        <div className="relative mt-1">
          <select className="w-full appearance-none rounded-md border border-gray-300 bg-white px-3 py-2 pr-10 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 dark:border-gray-600 dark:bg-gray-800 dark:text-white">
            <option>Q3 2024 Product Roadmap Webinar (Video & Transcript)</option>
            <option>AI-Generated Blog Post: Future of Content</option>
          </select>
          <ChevronsUpDown className="pointer-events-none absolute right-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
        </div>
        
        {/* Selected Asset Preview */}
        <div className="mt-4 flex gap-4 rounded-lg border border-gray-200 bg-gray-50 p-4 dark:border-gray-800 dark:bg-gray-900">
          <img src="https://i.imgur.com/8Q1Rj6A.png" alt="Webinar" className="h-24 w-32 rounded object-cover" />
          <div>
            <h3 className="font-medium text-gray-900 dark:text-white">Q3 2024 Product Roadmap Webinar</h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">Type: Video & Transcript</p>
            <p className="mt-2 text-sm text-gray-600 dark:text-gray-300">A comprehensive webinar outlining new features and strategic directions for our product in Q3 2024. Ideal for B2B customers and partners.</p>
          </div>
        </div>
        
        <button className="mt-4 text-sm font-medium text-indigo-600 hover:text-indigo-500 dark:text-indigo-400 dark:hover:text-indigo-300">
          + Add New Asset
        </button>
      </div>

      {/* Step 2: Atomize Content */}
      <div className="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-950">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Atomize Content to Channels</h2>
        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
          Select the desired output channels to atomize your chosen source asset. Aura's AI will
          adapt the content for each platform.
        </p>
        
        <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {channels.map((channel) => {
            const Icon = channel.icon;
            return (
              <div key={channel.name} className="relative rounded-lg border border-gray-200 p-4 dark:border-gray-700">
                <div className="flex items-center gap-3">
                  <Icon className="h-6 w-6 text-indigo-600 dark:text-indigo-400" />
                  <h3 className="text-base font-medium text-gray-900 dark:text-white">{channel.name}</h3>
                </div>
                <p className="mt-2 text-sm text-gray-600 dark:text-gray-300">{channel.desc}</p>
                <div className="mt-4 flex items-center justify-between">
                  <a href="#" className="text-sm font-medium text-indigo-600 hover:underline dark:text-indigo-400">View Details </a>
                  <input type="checkbox" className="h-5 w-5 rounded text-indigo-600 focus:ring-indigo-500" />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Actions */}
      <div className="flex justify-end gap-3">
        <button className="rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-200 dark:hover:bg-gray-700">
          Save Draft
        </button>
        <button className="rounded-md bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700">
          Orchestrate Campaign
        </button>
      </div>
    </div>
  );
};

// --- Content Calendar Page ---
const ContentCalendar = () => {
  // Static data for a September 2025 calendar view
  const calendarDays = [
    { day: 31, isCurrentMonth: false, events: [{ title: 'Campaign Asset', status: 'red' }] },
    { day: 1, isCurrentMonth: true, events: [] },
    { day: 2, isCurrentMonth: true, events: [{ title: 'Campaign Asset', status: 'gray' }] },
    { day: 3, isCurrentMonth: true, events: [] },
    { day: 4, isCurrentMonth: true, events: [] },
    { day: 5, isCurrentMonth: true, events: [{ title: 'Campaign Asset', status: 'gray' }] },
    { day: 6, isCurrentMonth: true, events: [{ title: 'Campaign Asset', status: 'gray' }] },
    { day: 7, isCurrentMonth: true, events: [] },
    { day: 8, isCurrentMonth: true, events: [] },
    { day: 9, isCurrentMonth: true, events: [] },
    { day: 10, isCurrentMonth: true, events: [{ title: 'Campaign Asset', status: 'blue' }] },
    { day: 11, isCurrentMonth: true, events: [{ title: 'Campaign Asset', status: 'blue' }, { title: 'Campaign Asset', status: 'blue' }] },
    { day: 12, isCurrentMonth: true, events: [] },
    { day: 13, isCurrentMonth: true, events: [] },
    { day: 14, isCurrentMonth: true, events: [{ title: 'Campaign Asset', status: 'gray' }] },
    { day: 15, isCurrentMonth: true, events: [] },
    { day: 16, isCurrentMonth: true, events: [] },
    { day: 17, isCurrentMonth: true, events: [] },
    { day: 18, isCurrentMonth: true, events: [] },
    { day: 19, isCurrentMonth: true, events: [] },
    { day: 20, isCurrentMonth: true, events: [] },
    { day: 21, isCurrentMonth: true, events: [{ title: 'Campaign Asset', status: 'red' }, { title: 'Campaign Asset', status: 'red' }] },
    { day: 22, isCurrentMonth: true, events: [] },
    { day: 23, isCurrentMonth: true, events: [] },
    { day: 24, isCurrentMonth: true, events: [] },
    { day: 25, isCurrentMonth: true, events: [{ title: 'Campaign Asset', status: 'blue' }, { title: 'Campaign Asset', status: 'red' }] },
    { day: 26, isCurrentMonth: true, events: [] },
    { day: 27, isCurrentMonth: true, events: [{ title: 'Campaign Asset', status: 'red' }, { title: 'Campaign Asset', status: 'red' }] },
    { day: 28, isCurrentMonth: true, events: [{ title: 'Campaign Asset', status: 'red' }, { title: 'Campaign Asset', status: 'red' }] },
    { day: 29, isCurrentMonth: true, events: [] },
    { day: 30, isCurrentMonth: true, events: [{ title: 'Campaign Asset', status: 'blue' }] },
    { day: 1, isCurrentMonth: false, events: [] },
    { day: 2, isCurrentMonth: false, events: [] },
    { day: 3, isCurrentMonth: false, events: [] },
    { day: 4, isCurrentMonth: false, events: [] },
  ];
  
  const weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  const getStatusColor = (status) => {
    if (status === 'red') return 'bg-red-100 text-red-700 dark:bg-red-900/50 dark:text-red-300';
    if (status === 'blue') return 'bg-blue-100 text-blue-700 dark:bg-blue-900/50 dark:text-blue-300';
    return 'bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-300';
  }

  return (
    <div className="animate-fade-in-sm">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <button className="p-2 text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"><ChevronLeft className="h-5 w-5" /></button>
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white">September 2025</h2>
          <button className="p-2 text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"><ChevronRight className="h-5 w-5" /></button>
        </div>
        <button className="flex items-center gap-2 rounded-md bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700">
          <Plus className="h-4 w-4" /> Quick Create
        </button>
      </div>

      <div className="mt-4 grid grid-cols-7 gap-px rounded-lg border border-gray-200 bg-gray-200 dark:border-gray-800 dark:bg-gray-800">
        {weekDays.map(day => (
          <div key={day} className="bg-gray-50 p-2 text-center text-sm font-medium text-gray-500 dark:bg-gray-950 dark:text-gray-400">
            {day}
          </div>
        ))}
        
        {calendarDays.map((day, index) => (
          <div key={index} className={`relative h-36 overflow-y-auto bg-white p-2 dark:bg-gray-950 ${!day.isCurrentMonth ? 'opacity-50' : ''}`}>
            <span className="text-sm font-medium text-gray-900 dark:text-white">{day.day}</span>
            <div className="mt-1 space-y-1">
              {day.events.map((event, i) => (
                <div key={i} className={`flex items-center rounded px-2 py-0.5 text-xs font-medium ${getStatusColor(event.status)}`}>
                  <X className="h-3 w-3 mr-1" /> {event.title}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// --- Content Autopsy Page ---
const ContentAutopsy = () => {
  return (
    <div className="animate-fade-in-sm space-y-6">
      <p className="text-base text-gray-600 dark:text-gray-300">
        Diagnose performance differences between successful and failed content pieces. Input
        URLs to receive AI-driven insights on what worked and what didn't.
      </p>

      {/* Input Section */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        {/* Successful Content */}
        <div className="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-950">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Compare Content Performance</h2>
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">Enter URLs for successful and failed content to diagnose performance differences.</p>
          
          <label className="mt-4 block text-sm font-medium text-gray-700 dark:text-gray-200">Successful Content URL</label>
          <input type="text" placeholder="e.g., https://example.com/successful-post" className="mt-1 w-full rounded-md border border-gray-300 bg-white px-3 py-2 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 dark:border-gray-600 dark:bg-gray-800 dark:text-white" />
          
          <label className="mt-4 block text-sm font-medium text-gray-700 dark:text-gray-200">Additional Context / Notes</label>
          <textarea rows="3" placeholder="Key factors, target audience, content goals..." className="mt-1 w-full rounded-md border border-gray-300 bg-white px-3 py-2 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 dark:border-gray-600 dark:bg-gray-800 dark:text-white"></textarea>
        </div>
        
        {/* Failed Content */}
        <div className="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-950">
          <label className="mt-12 block text-sm font-medium text-gray-700 dark:text-gray-200">Failed Content URL</label>
          <input type="text" placeholder="e.g., https://example.com/failed-campaign" className="mt-1 w-full rounded-md border border-gray-300 bg-white px-3 py-2 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 dark:border-gray-600 dark:bg-gray-800 dark:text-white" />
          
          <label className="mt-4 block text-sm font-medium text-gray-700 dark:text-gray-200">Additional Context / Notes</label>
          <textarea rows="3" placeholder="Observed issues, missed targets, audience feedback..." className="mt-1 w-full rounded-md border border-gray-300 bg-white px-3 py-2 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 dark:border-gray-600 dark:bg-gray-800 dark:text-white"></textarea>
        </div>
      </div>
      
      <button className="w-full rounded-md bg-indigo-600 px-4 py-2.5 text-sm font-medium text-white shadow-sm hover:bg-indigo-700">
        Analyze Content
      </button>

      {/* Analysis Results */}
      <div className="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-950">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white">AI Analysis Report</h2>
        {/* This is a placeholder. A real app would show a loading state then results */}
        <p className="mt-4 text-center text-gray-500 dark:text-gray-400">
          Click "Analyze Content" to generate the AI-driven report.
        </p>
      </div>
    </div>
  );
};

// --- Resonance Engine Page ---
const ResonanceEngine = () => {
  const articles = [
    {
      source: 'MarketingInsights',
      title: 'The Future of AI in Content Strategy: 2025 Trends',
      image: 'https://i.imgur.com/g8vBw0B.png',
      excerpt: "AI-driven content generation is rapidly transforming how brands create and distribute content. From personalized recommendations to automated copywriting, the landscape is shifting..."
    },
    {
      source: 'DigitalGrowthDaily',
      title: 'Mastering SEO in 2025: Beyond Keywords and Backlinks',
      image: 'https://i.imgur.com/5yA8mXg.png',
      excerpt: "SEO is no longer just about stuffing keywords and building links. The landscape has shifted dramatically, from semantic search to a holistic approach centered on user intent and topical authority..."
    },
    {
      source: 'PR&CommunicationsWeekly',
      title: 'Building Authentic Brand Trust in a Skeptical Market',
      image: 'https://i.imgur.com/kP8Bv7D.png',
      excerpt: "In an era of misinformation and digital noise, building genuine brand trust is paramount. It requires transparency, consistent values, and a commitment to authentic communication..."
    },
  ];

  return (
    <div className="animate-fade-in-sm mx-auto max-w-3xl space-y-8">
      {articles.map((article, i) => (
        <div key={i} className="overflow-hidden rounded-lg bg-white shadow-sm dark:bg-gray-950">
          <div className="p-6">
            <p className="text-sm font-medium text-gray-600 dark:text-gray-400">{article.source}</p>
            <h2 className="mt-1 text-xl font-semibold text-gray-900 dark:text-white">{article.title}</h2>
          </div>
          <img src={article.image} alt={article.title} className="h-64 w-full object-cover" />
          <div className="p-6">
            <p className="text-base text-gray-700 dark:text-gray-300">{article.excerpt}</p>
            <div className="mt-4 rounded-lg bg-indigo-50 p-4 dark:bg-indigo-900/50">
              <h4 className="flex items-center text-sm font-semibold text-indigo-700 dark:text-indigo-300">
                <Bot className="mr-2 h-5 w-5" /> AI Suggestion
              </h4>
              <p className="mt-2 text-sm text-indigo-600 dark:text-indigo-200">
                This trend aligns with our Q4 "Future of Tech" campaign. Consider atomizing this into a LinkedIn post and a short blog article.
              </p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

// --- Performance Dashboard Page ---
const PerformanceDashboard = () => {
  const kpiCards = [
    { title: 'Conversion Rate', value: '4.7%', change: 'up', prev: 'previous period' },
    { title: 'Content Reach', value: '1.2M', change: 'up', prev: 'previous period' },
    { title: 'Engagement Score', value: '78.5', change: 'up', prev: 'previous period' },
    { title: 'Marketing ROI', value: '$1.8M', change: 'up', prev: 'previous period' },
  ];

  const leaderboard = [
    { title: 'The Future of AI in Marketing', type: 'Webinar', views: '18.5k', engagement: '4.2%', conversions: '3.1%' },
    { title: 'Crafting Compelling CTAs for SaaS', type: 'Article', views: '15.1k', engagement: '5.8%', conversions: '4.5%' },
    { title: 'Maximizing LinkedIn Engagement', type: 'Guide', views: '12.0k', engagement: '6.1%', conversions: '3.0%' },
    { title: 'Video Content Strategy for 2024', type: 'Video', views: '9.8k', engagement: '3.7%', conversions: '2.8%' },
    { title: 'Email Nurture Sequences That Convert', type: 'E-book', views: '7.2k', engagement: '7.0%', conversions: '8.2%' },
  ];

  const aiInsights = [
    "Optimize top content headlines with stronger emotional triggers to increase click-through rates by an estimated 10-15% over the next quarter.",
    "Segment your audience further based on initial content interaction to deliver more personalized follow-up campaigns, potentially boosting conversion by 8%.",
    "Re-promote underlying evergreen content on new channels, focusing on platforms where similar content has historically resonated, to extend its lifecycle.",
    "Experiment with interactive content formats (e.g., quizzes, polls) in the middle of the funnel to enhance engagement and data collection for future personalization."
  ];

  return (
    <div className="animate-fade-in-sm space-y-6">
      {/* KPI Cards */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {kpiCards.map((card) => (
          <div key={card.title} className="overflow-hidden rounded-lg bg-white p-5 shadow-sm dark:bg-gray-950">
            <p className="truncate text-sm font-medium text-gray-500 dark:text-gray-400">{card.title}</p>
            <p className="mt-1 text-3xl font-semibold text-gray-900 dark:text-white">{card.value}</p>
            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">Compared to {card.prev}</p>
          </div>
        ))}
      </div>

      {/* Engagement Funnel */}
      <div className="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-950">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Engagement Funnel</h2>
        {/* Placeholder for chart */}
        <div className="mt-4 flex h-64 items-center justify-center rounded-md bg-gray-100 text-gray-500 dark:bg-gray-800">
          [Line Chart: Impressions, Clicks, Revenue]
        </div>
      </div>

      {/* Content Leaderboard */}
      <div className="rounded-lg bg-white shadow-sm dark:bg-gray-950">
        <h2 className="border-b border-gray-200 p-4 text-lg font-semibold text-gray-900 dark:border-gray-800 dark:text-white">Content Leaderboard</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-800">
            <thead className="bg-gray-50 dark:bg-gray-900">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400">Content</th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400">Type</th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400">Views</th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400">Engagement</th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400">Conversions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 bg-white dark:divide-gray-800 dark:bg-gray-950">
              {leaderboard.map((item) => (
                <tr key={item.title}>
                  <td className="whitespace-nowrap px-6 py-4 text-sm font-medium text-gray-900 dark:text-white">{item.title}</td>
                  <td className="whitespace-nowrap px-6 py-4 text-sm"><span className="rounded-full bg-indigo-100 px-2 py-0.5 text-xs font-medium text-indigo-700 dark:bg-indigo-900/50 dark:text-indigo-300">{item.type}</span></td>
                  <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500 dark:text-gray-400">{item.views}</td>
                  <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500 dark:text-gray-400">{item.engagement}</td>
                  <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500 dark:text-gray-400">{item.conversions}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* AI CMO Insights */}
      <div className="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-950">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white">AI CMO Insights</h2>
        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">Strategic marketing recommendations for continuous improvement.</p>
        <div className="mt-4 space-y-3">
          {aiInsights.map((insight, i) => (
            <div key={i} className="flex items-start gap-3 rounded-lg bg-gray-50 p-4 dark:bg-gray-800">
              <Zap className="h-5 w-5 flex-shrink-0 text-indigo-600 dark:text-indigo-400" />
              <p className="text-sm text-gray-700 dark:text-gray-300">{insight}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};


// --- 
// --- 
// --- Main App Controller ---
// --- 
// --- 

function AppContent() {
  const [currentView, setCurrentView] = useState('landing');
  const [dashboardView, setDashboardView] = useState('content-hub'); // Default dashboard page
  
  const { isAuthenticated, user, logout } = useContext(AuthContext);

  const [formData, setFormData] = useState({
    companyName: 'Acme Marketing Solutions',
    industry: 'Digital Marketing, SaaS, E-commerce',
    companySize: 50,
    annualRevenue: '5,000,000',
    targetAudience: '',
    brandVoice: 'Professional',
  });

  // Main router effect
  useEffect(() => {
    if (isAuthenticated) {
      if (user && !user.onboardingCompleted) {
        setCurrentView('onboarding');
      } else if (user && user.onboardingCompleted) {
        setCurrentView('dashboard');
      }
    } else {
      if (currentView !== 'login') {
        setCurrentView('landing');
      }
    }
  }, [isAuthenticated, user, currentView]);

  // Main navigation function
  const navigate = (view) => {
    setCurrentView(view);
  };
  
  // Dashboard-specific navigation
  const navigateDashboard = (view) => {
    setDashboardView(view);
  }

  // Render logic
  if (currentView === 'login') {
    return <LoginPage onNavigate={navigate} />;
  }

  if (currentView === 'onboarding') {
    return <OnboardingWizard formData={formData} setFormData={setFormData} onExit={() => logout()} />;
  }

  if (currentView === 'dashboard') {
    return <DashboardLayout dashboardView={dashboardView} onNavigate={navigateDashboard} />;
  }

  // Default view: 'landing'
  return <LandingPage onNavigate={navigate} isAuthenticated={isAuthenticated} onLogout={logout} />;
}

// Final App component
export default function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <AppContent />
      </AuthProvider>
    </ThemeProvider>
  );
}