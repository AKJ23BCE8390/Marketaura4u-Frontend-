import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import demoVideo from "../assets/sample.mp4"

function LandingPage() {
  return (
    <div className="flex flex-col min-h-screen bg-white dark:bg-black dark:text-white">

      {/* Header / Hero */}
      <Header />

      {/* Features Section */}
      <section className="max-w-6xl mx-auto px-4 py-20">
        <h2 className="text-2xl font-bold text-center mb-12 text-black dark:text-blue-400">
          What You Can Do With AI Marketing
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="p-6 rounded-lg border border-gray-200 dark:border-slate-800 hover:shadow-lg transition">
            <h3 className="text-lg font-semibold mb-2">Generate Campaigns</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Instantly create high-performing ad copies and creatives using AI.
            </p>
          </div>

          <div className="p-6 rounded-lg border border-gray-200 dark:border-slate-800 hover:shadow-lg transition">
            <h3 className="text-lg font-semibold mb-2">Launch in One Click</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Deploy campaigns across platforms with a single click.
            </p>
          </div>

          <div className="p-6 rounded-lg border border-gray-200 dark:border-slate-800 hover:shadow-lg transition">
            <h3 className="text-lg font-semibold mb-2">Optimize Automatically</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              AI continuously improves performance to maximize ROI.
            </p>
          </div>
        </div>
      </section>

      {/* Product Demo Video Section */}
      <section className="bg-slate-50 dark:bg-slate-900 py-20">
        <div className="max-w-5xl mx-auto px-4 text-center">
          <h2 className="text-2xl font-bold mb-4 text-black dark:text-blue-400">
            See AI Marketing in Action
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mb-10">
            Watch how campaigns are generated, launched, and optimized in seconds.
          </p>

          <div className="relative aspect-video max-w-4xl mx-auto rounded-xl overflow-hidden shadow-lg border border-gray-200 dark:border-slate-800">
            {/* Put your video in /public/demo.mp4 */}
            <video
              className="w-full h-full object-cover"
              src={demoVideo}
              controls
              preload="metadata"
            />
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="bg-slate-50 dark:bg-slate-900 py-20">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <h2 className="text-2xl font-bold mb-4 text-black dark:text-blue-400">
            Simple, Transparent Pricing
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mb-12">
            Choose a plan that fits your growth stage.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

            {/* Starter */}
            <div className="p-8 rounded-lg border border-gray-200 dark:border-slate-800 bg-white dark:bg-black">
              <h3 className="text-lg font-semibold mb-2">Starter</h3>
              <p className="text-3xl font-bold mb-4">₹0</p>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-6">
                Perfect for individuals & testing AI marketing.
              </p>
              <ul className="text-sm space-y-2 mb-6">
                <li>✔ AI Campaign Generator</li>
                <li>✔ Limited Launches</li>
                <li>✔ Basic Analytics</li>
              </ul>
              <button className="w-full px-4 py-2 border border-blue-500 text-blue-500 rounded-md hover:bg-blue-50 dark:hover:bg-slate-800 transition">
                Get Started
              </button>
            </div>

            {/* Pro */}
            <div className="p-8 rounded-lg border-2 border-blue-500 bg-white dark:bg-black scale-105">
              <h3 className="text-lg font-semibold mb-2">Pro</h3>
              <p className="text-3xl font-bold mb-4">
                ₹999<span className="text-sm font-medium">/mo</span>
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-6">
                Best for startups and growing teams.
              </p>
              <ul className="text-sm space-y-2 mb-6">
                <li>✔ Unlimited Campaigns</li>
                <li>✔ One-Click Launch</li>
                <li>✔ Advanced Analytics</li>
                <li>✔ Priority Support</li>
              </ul>
              <button className="w-full px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition">
                Start Pro
              </button>
            </div>

            {/* Enterprise */}
            <div className="p-8 rounded-lg border border-gray-200 dark:border-slate-800 bg-white dark:bg-black">
              <h3 className="text-lg font-semibold mb-2">Enterprise</h3>
              <p className="text-3xl font-bold mb-4">Custom</p>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-6">
                Tailored solutions for large organizations.
              </p>
              <ul className="text-sm space-y-2 mb-6">
                <li>✔ Custom AI Models</li>
                <li>✔ Dedicated Manager</li>
                <li>✔ SLA & Security</li>
              </ul>
              <button className="w-full px-4 py-2 border border-blue-500 text-blue-500 rounded-md hover:bg-blue-50 dark:hover:bg-slate-800 transition">
                Contact Sales
              </button>
            </div>

          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 text-center">
        <h2 className="text-2xl font-bold mb-4 text-black dark:text-blue-400">
          Start Marketing Smarter Today
        </h2>
        <p className="text-gray-600 dark:text-gray-400 mb-6">
          Let AI handle your campaigns while you focus on growth.
        </p>
        <button className="px-8 py-3 rounded-md bg-blue-500 text-white font-medium hover:bg-blue-600 transition">
          Try It Free
        </button>
      </section>
      <Footer/>

    </div>
  );
}

export default LandingPage;
