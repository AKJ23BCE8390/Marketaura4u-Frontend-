import React, { useState, useEffect, useContext } from 'react';
import { LogIn } from 'lucide-react';
import { AuthContext } from '../../contexts/AuthContext';

const LoginPage = ({ onNavigate }) => {
  const { login, signup, isLoading, error: authError } = useContext(AuthContext);
  const [email, setEmail] = useState('manish@gmail.com');
  const [password, setPassword] = useState('1');
  const [error, setError] = useState(null);

  useEffect(() => {
    if(authError) setError(authError);
  }, [authError]);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError(null);
    try {
      await login(email, password);
    } catch (err) {
      setError(err.message);
    }
  };
  
  const handleSignup = async (e) => {
    e.preventDefault();
    setError(null);
    try {
      await signup(email, password);
    } catch (err) {
      setError(err.message);
    }
  };


  return (
    <div className="flex min-h-screen w-full items-center justify-center bg-gray-100 p-4 font-sans dark:bg-gray-900">
      <div className="w-full max-w-md animate-fade-in rounded-2xl bg-white p-8 shadow-2xl dark:bg-gray-800">
        <div className="flex flex-col items-center">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-indigo-100 text-indigo-600 dark:bg-indigo-900/50 dark:text-indigo-400">
            <LogIn className="h-8 w-8" />
          </div>
          <h2 className="mt-6 text-2xl font-bold text-gray-900 dark:text-white">Welcome Back</h2>
          <p className="mt-2 text-sm text-gray-600 dark:text-gray-300">
            Sign in or create an account to continue.
          </p>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleLogin}>
          {error && (
              <div className="rounded-md bg-red-50 p-4 dark:bg-red-900/30">
                  <p className="text-sm font-medium text-red-700 dark:text-red-300">
                      {error}
                  </p>
              </div>
          )}
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-200">Email Address</label>
            <div className="mt-1">
              <input id="email" name="email" type="email" autoComplete="email" required value={email} onChange={(e) => setEmail(e.target.value)} className="w-full rounded-md border border-gray-300 bg-white px-3 py-2 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:focus:border-indigo-400 dark:focus:ring-indigo-400 sm:text-sm" />
            </div>
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 dark:text-gray-200">Password</label>
            <div className="mt-1">
              <input id="password" name="password" type="password" autoComplete="current-password" required value={password} onChange={(e) => setPassword(e.target.value)} className="w-full rounded-md border border-gray-300 bg-white px-3 py-2 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:focus:border-indigo-400 dark:focus:ring-indigo-400 sm:text-sm" />
            </div>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <input id="remember-me" name="remember-me" type="checkbox" className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500 dark:border-gray-600" />
              <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900 dark:text-gray-200">Remember me</label>
            </div>
            <div className="text-sm">
              <a href="#" className="font-medium text-indigo-600 hover:text-indigo-500 dark:text-indigo-400 dark:hover:text-indigo-300">Forgot password?</a>
            </div>
          </div>
          <div>
            <button type="submit" disabled={isLoading} className="group relative flex w-full justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-lg transition-all duration-300 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:opacity-50">
              {isLoading ? 'Signing In...' : 'Sign In'}
            </button>
          </div>
        </form>
        <div className="mt-6 space-y-4 text-center text-sm text-gray-600 dark:text-gray-300">
          <p>
            Not a member?{' '}
            <button onClick={handleSignup} disabled={isLoading} className="font-medium text-indigo-600 hover:text-indigo-500 dark:text-indigo-400 dark:hover:text-indigo-300 disabled:opacity-50">
              {isLoading ? 'Signing Up...' : 'Start your 14-day free trial'}
            </button>
          </p>
          <p>
            <button onClick={() => onNavigate('landing')} className="font-medium text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200">
              &larr; Back to Home
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;