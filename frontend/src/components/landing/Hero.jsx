import React from 'react';
import { MoveRight, ChevronRight } from 'lucide-react';
import AnimatedWaves from './AnimatedWaves';

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
              <source src="src/assets/sample.mp4" type="video/mp4" />
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

export default Hero;