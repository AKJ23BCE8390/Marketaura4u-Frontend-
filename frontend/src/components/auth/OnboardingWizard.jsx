import React, { useState, useEffect, useContext } from 'react';
import { X, ArrowLeft, ArrowRight, Check } from 'lucide-react';
import { AuthContext } from '../../contexts/AuthContext';

// --- Onboarding Steps ---
const Step1 = ({ formData, setFormData }) => {
  const handleInputChange = (e) => setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  const handleSliderChange = (e) => setFormData((prev) => ({ ...prev, companySize: parseInt(e.target.value, 10) }));
  return (
    <div className="animate-fade-in-sm space-y-6">
      <h2 className="text-xl font-semibold text-gray-900 dark:text-white">1. Business Identity: Laying the Foundation</h2>
      <p className="text-sm text-gray-600 dark:text-gray-300">Provide key details to tailor Aura to your business needs.</p>
      <div>
        <label htmlFor="companyName" className="block text-sm font-medium text-gray-700 dark:text-gray-200">Company Name</label>
        <input type="text" name="companyName" id="companyName" value={formData.companyName} onChange={handleInputChange} className="mt-1 block w-full rounded-md border-gray-300 bg-white shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-800 dark:text-white sm:text-sm" />
      </div>
      <div>
        <label htmlFor="industry" className="block text-sm font-medium text-gray-700 dark:text-gray-200">Industry</label>
        <input type="text" name="industry" id="industry" value={formData.industry} onChange={handleInputChange} className="mt-1 block w-full rounded-md border-gray-300 bg-white shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-800 dark:text-white sm:text-sm" />
      </div>
      <div>
        <label htmlFor="companySize" className="flex justify-between text-sm font-medium text-gray-700 dark:text-gray-200">
          <span>Company Size (Employees)</span>
          <span className="font-bold text-blue-600 dark:text-blue-400">{formData.companySize}</span>
        </label>
        <input type="range" min="1" max="1000" name="companySize" id="companySize" value={formData.companySize} onChange={handleSliderChange} className="mt-2 h-2 w-full cursor-pointer appearance-none rounded-lg bg-gray-200 accent-blue-600 dark:bg-gray-700" />
      </div>
      <div>
        <label htmlFor="annualRevenue" className="block text-sm font-medium text-gray-700 dark:text-gray-200">Target Annual Revenue</label>
        <input type="text" name="annualRevenue" id="annualRevenue" value={formData.annualRevenue} onChange={handleInputChange} className="mt-1 block w-full rounded-md border-gray-300 bg-white shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-800 dark:text-white sm:text-sm" />
      </div>
    </div>
  );
};
const Step2 = ({ formData, setFormData }) => (
  <div className="animate-fade-in-sm space-y-6">
    <h2 className="text-xl font-semibold text-gray-900 dark:text-white">2. Define Your Audience</h2>
    <p className="text-sm text-gray-600 dark:text-gray-300">Help us understand who you're talking to.</p>
    <div>
      <label htmlFor="targetAudience" className="block text-sm font-medium text-gray-700 dark:text-gray-200">Describe your target audience</label>
      <textarea name="targetAudience" id="targetAudience" rows={5} value={formData.targetAudience} onChange={(e) => setFormData(prev => ({ ...prev, targetAudience: e.target.value }))} className="mt-1 block w-full rounded-md border-gray-300 bg-white shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-800 dark:text-white sm:text-sm" placeholder="e.g., Marketing managers at B2B tech companies, small business owners..." />
    </div>
  </div>
);
const Step3 = ({ formData, setFormData }) => (
  <div className="animate-fade-in-sm space-y-6">
    <h2 className="text-xl font-semibold text-gray-900 dark:text-white">3. Set Your Brand Voice</h2>
    <p className="text-sm text-gray-600 dark:text-gray-300">What should your content sound like?</p>
    <div className="space-y-2">
      {['Professional', 'Casual', 'Witty', 'Enthusiastic', 'Informative'].map(voice => (
        <label key={voice} className="flex items-center rounded-md border border-gray-300 p-3 has-[:checked]:border-blue-600 has-[:checked]:bg-blue-50 dark:border-gray-700 dark:has-[:checked]:border-blue-500 dark:has-[:checked]:bg-blue-900/20">
          <input type="radio" name="brandVoice" value={voice} checked={formData.brandVoice === voice} onChange={(e) => setFormData(prev => ({ ...prev, brandVoice: e.target.value }))} className="h-4 w-4 border-gray-300 text-blue-600 focus:ring-blue-500" />
          <span className="ml-3 block text-sm font-medium text-gray-700 dark:text-gray-200">{voice}</span>
        </label>
      ))}
    </div>
  </div>
);
const Step4 = () => (
  <div className="animate-fade-in-sm flex flex-col items-center justify-center text-center">
    <div className="flex h-20 w-20 items-center justify-center rounded-full bg-green-100 text-green-600 dark:bg-green-900/50 dark:text-green-400">
      <Check className="h-10 w-10" />
    </div>
    <h2 className="mt-6 text-2xl font-semibold text-gray-900 dark:text-white">You're All Set!</h2>
    <p className="mt-2 text-sm text-gray-600 dark:text-gray-300">Your Aura workspace is ready. Click "Finish" to dive in.</p>
  </div>
);


const OnboardingWizard = ({ formData, setFormData, onExit }) => {
  const [step, setStep] = useState(1);
  const totalSteps = 4;
  const { completeOnboarding, isLoading, error: authError } = useContext(AuthContext);
  const [error, setError] = useState(null);

  useEffect(() => {
    if(authError) setError(authError);
  }, [authError]);

  const handleNext = async () => {
    if (step === totalSteps) {
      setError(null);
      try {
        const onboardingData = {
          companyName: formData.companyName,
          industry: formData.industry,
          brandTone: formData.brandVoice,
          teamSize: formData.companySize,
        };
        await completeOnboarding(onboardingData);
      } catch (err) {
        setError(err.message);
      }
    } else {
      setStep((prev) => Math.min(prev + 1, totalSteps));
    }
  };

  const handleBack = () => {
    setStep((prev) => Math.max(prev - 1, 1));
  };

  const progressPercentage = (step / totalSteps) * 100;

  return (
    <div className="flex min-h-screen w-full items-center justify-center bg-gray-100 p-4 font-sans dark:bg-gray-900">
      <div className="w-full max-w-2xl animate-fade-in rounded-2xl bg-white shadow-2xl dark:bg-gray-900">
        <div className="p-8">
          <div className="flex items-start justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Welcome to Aura - Onboarding Wizard</h1>
              <p className="mt-1 text-sm text-gray-600 dark:text-gray-300">Let's set up your content operations to elevate your marketing strategy.</p>
            </div>
            <button onClick={onExit} className="ml-4 rounded-full p-2 text-gray-400 transition-colors hover:bg-gray-100 hover:text-gray-600 dark:text-gray-500 dark:hover:bg-gray-800 dark:hover:text-gray-300">
              <X className="h-5 w-5" />
            </button>
          </div>
          <div className="mt-8">
            <p className="text-sm font-medium text-gray-700 dark:text-gray-300">Step {step} of {totalSteps}</p>
            <div className="mt-2 w-full overflow-hidden rounded-full bg-gray-200 dark:bg-gray-700">
              <div className="h-2 rounded-full bg-blue-600 transition-all duration-500" style={{ width: `${progressPercentage}%` }}></div>
            </div>
          </div>
          {error && (
              <div className="mt-4 rounded-md bg-red-50 p-4 dark:bg-red-900/30">
                  <p className="text-sm font-medium text-red-700 dark:text-red-300">{error}</p>
              </div>
          )}
          <div className="mt-8 min-h-[300px]">
            {step === 1 && <Step1 formData={formData} setFormData={setFormData} />}
            {step === 2 && <Step2 formData={formData} setFormData={setFormData} />}
            {step === 3 && <Step3 formData={formData} setFormData={setFormData} />}
            {step === 4 && <Step4 />}
          </div>
        </div>
        <div className="flex justify-between rounded-b-2xl border-t border-gray-200 bg-gray-50 p-6 dark:border-gray-800 dark:bg-gray-950">
          <button onClick={handleBack} disabled={step === 1 || isLoading} className="group flex items-center gap-2 rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm transition-colors hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-200 dark:hover:bg-gray-700">
            <ArrowLeft className="h-4 w-4" /> Back
          </button>
          <button onClick={handleNext} disabled={isLoading} className="group flex items-center gap-2 rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow-lg transition-all duration-300 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50">
            {step === totalSteps ? (isLoading ? 'Finishing...' : 'Finish') : 'Next'}
            <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default OnboardingWizard;