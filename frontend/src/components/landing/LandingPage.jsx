import React from 'react';
import Header from './Header';
import Hero from './Hero';
import Features from './Features';
import Workflow from './Workflow';
import Pricing from './Pricing';
import Testimonials from './Testimonials';
import CTA from './CTA';
import Footer from './Footer';

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

export default LandingPage;