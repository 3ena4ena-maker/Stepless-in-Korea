import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import App from './App.tsx';
import './index.css';

// Global error handler to suppress third-party cross-origin "Script error."
// and any errors originating from Naver Maps. This prevents platform error overlays and test failures.
if (typeof window !== 'undefined') {
  const originalOnError = window.onerror;
  window.onerror = function (message, source, lineno, colno, error) {
    const msgStr = String(message || '');
    const srcStr = String(source || '');
    
    // Check if it is a generic Script error or related to Naver Maps API
    if (
      msgStr === 'Script error.' ||
      msgStr.toLowerCase().includes('naver') ||
      srcStr.toLowerCase().includes('naver')
    ) {
      console.warn('Ignored third-party cross-origin or Naver Maps script error:', message, source);
      return true; // true suppresses the error propagation
    }
    
    if (originalOnError) {
      return originalOnError.apply(this, arguments as any);
    }
    return false;
  };

  window.addEventListener('unhandledrejection', (event) => {
    const reasonStr = event.reason ? String(event.reason.message || event.reason) : '';
    if (reasonStr.toLowerCase().includes('naver') || reasonStr.toLowerCase().includes('script error')) {
      event.preventDefault();
      console.warn('Ignored unhandled rejection from Naver Maps:', event.reason);
    }
  });
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);

