import React, { useState, useEffect, useContext } from 'react';
import { ThemeProvider } from './contexts/ThemeContext';
import { AuthProvider, AuthContext } from './contexts/AuthContext';

import LandingPage from './components/landing/LandingPage';
import LoginPage from './components/auth/LoginPage';
import OnboardingWizard from './components/auth/OnboardingWizard';
import DashboardLayout from './components/dashboard/DashboardLayout';

// --- Main App Controller ---
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