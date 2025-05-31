import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'

// Service Worker registration only in production
if ('serviceWorker' in navigator && import.meta.env.PROD) {
  window.addEventListener('load', async () => {
    try {
      const registration = await navigator.serviceWorker.register('/sw.js', {
        scope: '/',
        updateViaCache: 'imports'
      });
      
      console.log('Service Worker registered successfully:', registration);
      
      // Check for updates periodically
      setInterval(() => {
        registration.update();
      }, 60000); // Check every minute
      
      // Add periodic recaching functionality
      setInterval(() => {
        // Force cache refresh for critical resources
        if (navigator.serviceWorker.controller) {
          navigator.serviceWorker.controller.postMessage({ 
            type: 'FORCE_RECACHE',
            resources: [
              '/',
              '/logo2.webp',
              '/favicon.ico'
            ]
          });
        }
      }, 15 * 60 * 1000); // Recache every 15 minutes
      
      // Listen for updates
      registration.addEventListener('updatefound', () => {
        const newWorker = registration.installing;
        if (newWorker) {
          newWorker.addEventListener('statechange', () => {
            if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
              // New content is available, prompt user to refresh
              if (window.confirm('Nowa wersja strony jest dostępna. Odświeżyć teraz?')) {
                window.location.reload();
              }
            }
          });
        }
      });
      
      // Clean up cache periodically - keep existing interval but reduce frequency
      setInterval(() => {
        if (navigator.serviceWorker.controller) {
          navigator.serviceWorker.controller.postMessage({ type: 'CLEAN_CACHE' });
        }
      }, 60 * 60 * 1000); // Clean every hour instead of 30 minutes
      
    } catch (error) {
      console.error('Service Worker registration failed:', error);
    }
  });
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)