import React, { useState, createContext } from 'react';
import apiService from '../services/apiService';

// --- Auth Context ---
const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const login = async (email, password) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await apiService.login(email, password);
      setUser(response.data);
      setIsAuthenticated(true);
      return response.data;
    } catch (err) {
      setError(err.message);
      setIsAuthenticated(false);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const signup = async (email, password) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await apiService.signup(email, password);
      setUser(response.data);
      setIsAuthenticated(true);
      return response.data;
    } catch (err) {
      setError(err.message);
      setIsAuthenticated(false);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    setIsLoading(true);
    setError(null);
    try {
      await apiService.logout();
      setUser(null);
      setIsAuthenticated(false);
    } catch (err) {
      setError(err.message);
      setUser(null);
      setIsAuthenticated(false);
    } finally {
      setIsLoading(false);
    }
  };

  const completeOnboarding = async (onboardingData) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await apiService.onboard(onboardingData);
      setUser(response.user);
      return response.user;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const value = {
    user,
    isAuthenticated,
    isLoading,
    error,
    login,
    signup,
    logout,
    completeOnboarding,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export { AuthContext, AuthProvider };