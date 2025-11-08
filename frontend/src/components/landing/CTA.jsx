import React from 'react';
import { MoveRight } from 'lucide-react';
import FadeIn from '../common/FadeIn';

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

export default CTA;