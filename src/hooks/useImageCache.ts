import { useState, useEffect } from 'react';

// Simplified cache hook - let Service Worker handle the heavy lifting
export const useImageCache = () => {
  const [isSupported] = useState(
    typeof window !== 'undefined' && 'serviceWorker' in navigator
  );

  // Simple cache warming function that works with Service Worker
  const warmCache = async (urls: string[]) => {
    if (!isSupported) return;

    // Use fetch with cache mode to warm Service Worker cache
    const promises = urls.slice(0, 5).map(url => // Limit to 5 images
      fetch(url, { 
        mode: 'cors',
        cache: 'force-cache' 
      }).catch(() => {}) // Ignore errors
    );
    
    await Promise.allSettled(promises);
  };

  return {
    isSupported,
    warmCache
  };
};