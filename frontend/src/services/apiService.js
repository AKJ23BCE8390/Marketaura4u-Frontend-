// --- API Service ---
const BASE_URL = 'http://localhost:3000/api/v1';

const apiService = {
  async request(endpoint, method, body = null) {
    const options = {
      method: method,
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include', // Send cookies
    };

    if (body) {
      options.body = JSON.stringify(body);
    }

    const response = await fetch(`${BASE_URL}${endpoint}`, options);
    const data = await response.json();

    // --- THIS IS THE FIX ---
    // We only check response.ok. This correctly handles all
    // 4xx (client) and 5xx (server) errors.
    if (!response.ok) {
      throw new Error(data.message || data.error || 'API request failed');
    }
    // -----------------------

    return data;
  },

  login(email, password) {
    return this.request('/auth/login', 'POST', { email, password });
  },

  signup(email, password) {
    return this.request('/auth/signup', 'POST', { email, password });
  },

  logout() {
    return this.request('/auth/logout', 'GET');
  },

  onboard(onboardingData) {
    return this.request('/auth/onboarding', 'POST', onboardingData);
  },

  generateContent(prompt, contentType = 'blog') {
    return this.request('/content/generate', 'POST', { prompt, contentType });
  },
};

export default apiService;