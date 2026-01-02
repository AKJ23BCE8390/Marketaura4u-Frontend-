import React from "react";

import ContentPage from "./ContentPage";
import Campaigns from "./Campaigns";

function HomeContent({ active }) {
  return (
    <main className="flex-1 p-6 overflow-y-auto">
      {active === "dashboard" && (
        <div>
          <h2 className="text-xl font-bold mb-4">Dashboard Overview</h2>
          <p className="text-gray-600 dark:text-gray-400">
            Welcome to your AI-powered marketing workspace.
          </p>
        </div>
      )}

      {active === "campaigns" && (
        <Campaigns/>
      )}

      {active === "content" && (
        <ContentPage/>
      )}

      {active === "analytics" && (
        <div>
          <h2 className="text-xl font-bold mb-4">Analytics</h2>
          <p className="text-gray-600 dark:text-gray-400">
            Performance metrics and insights.
          </p>
        </div>
      )}
    </main>
  );
}

export default HomeContent;
