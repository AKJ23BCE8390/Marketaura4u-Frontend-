import React from 'react';
import { Zap, Workflow as WorkflowIcon, Send, ChevronRight } from 'lucide-react';
import FadeIn from '../common/FadeIn';

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

export default Features;