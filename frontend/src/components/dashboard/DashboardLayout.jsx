import React, { useState, useEffect } from 'react';
import Sidebar from './Sidebar';
import DashboardHeader from './DashboardHeader';
import ContentHub from './pages/ContentHub';
import CampaignOrchestrator from './pages/CampaignOrchestrator';
import ContentCalendar from './pages/ContentCalendar';
import ContentAutopsy from './pages/ContentAutopsy';
import ResonanceEngine from './pages/ResonanceEngine';
import PerformanceDashboard from './pages/PerformanceDashboard';

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

export default DashboardLayout;