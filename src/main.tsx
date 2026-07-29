import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App.tsx';
import ScrollToTop from './components/ScrollToTop.tsx';
import { ThemeProvider } from './context/ThemeContext.tsx';
import './index.css';

// Global fetch interceptor to route /api requests to the Cloudflare Worker Backend
const originalFetch = window.fetch;
window.fetch = async (...args) => {
  let [resource, config] = args;
  // @ts-expect-error
  const ENABLE_LOGS = import.meta.env.VITE_ENABLE_LOGS === 'true';
  // @ts-expect-error
  const baseUrl = import.meta.env.VITE_API_URL || '';
  if (typeof resource === 'string' && resource.startsWith('/api')) {
    const cleanBase = baseUrl.endsWith('/api') ? baseUrl.slice(0, -4) : baseUrl;
    resource = cleanBase + resource;
  }
  return originalFetch(resource, config);
};
createRoot(document.getElementById('root')!).render(
  <ThemeProvider>
    <BrowserRouter>
      <ScrollToTop />
      <App />
    </BrowserRouter>
  </ThemeProvider>
);
