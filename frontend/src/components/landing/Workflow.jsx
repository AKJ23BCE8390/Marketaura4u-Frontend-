import React from 'react';
import { Target, PenTool, Share2, BarChart2 } from 'lucide-react';
import FadeIn from '../common/FadeIn';

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

export default Workflow;