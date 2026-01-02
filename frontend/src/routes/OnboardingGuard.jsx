import { Navigate } from "react-router-dom";

const OnboardingGuard = ({ children }) => {
  const user = JSON.parse(localStorage.getItem("user"));

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // 🚧 Logged in but not onboarded
  if (!user.onboardingCompleted) {
    return <Navigate to="/onboarding" replace />;
  }

  return children;
};

export default OnboardingGuard;
