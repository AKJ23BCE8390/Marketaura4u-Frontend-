import React, { useState } from 'react';
import { Check } from 'lucide-react';
import FadeIn from '../common/FadeIn';

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

export default Pricing;