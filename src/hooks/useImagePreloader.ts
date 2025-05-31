import { useState, useEffect, useCallback } from 'react';

interface UseImagePreloaderProps {
  images: string[];
  priority?: number;
  preloadNext?: number;
}

export const useImagePreloader = ({ 
  images, 
  priority = 0, 
  preloadNext = 3 
}: UseImagePreloaderProps) => {
  const [loadedImages, setLoadedImages] = useState<Set<string>>(new Set());
  const [loadingImages, setLoadingImages] = useState<Set<string>>(new Set());
  const [errors, setErrors] = useState<Set<string>>(new Set());

  const preloadImage = useCallback((src: string): Promise<void> => {
    return new Promise((resolve, reject) => {
      if (loadedImages.has(src)) {
        resolve();
        return;
      }

      setLoadingImages(prev => new Set(prev.add(src)));

      const img = new Image();
      
      img.onload = () => {
        setLoadedImages(prev => new Set(prev.add(src)));
        setLoadingImages(prev => {
          const newSet = new Set(prev);
          newSet.delete(src);
          return newSet;
        });
        resolve();
      };

      img.onerror = () => {
        setErrors(prev => new Set(prev.add(src)));
        setLoadingImages(prev => {
          const newSet = new Set(prev);
          newSet.delete(src);
          return newSet;
        });
        reject(new Error(`Failed to load image: ${src}`));
      };

      img.src = src;
    });
  }, [loadedImages]);

  const preloadImages = useCallback(async (imagesToLoad: string[]) => {
    const promises = imagesToLoad.map(src => preloadImage(src));
    await Promise.allSettled(promises);
  }, [preloadImage]);

  useEffect(() => {
    if (images.length === 0) return;

    // Preload priority images first
    const priorityImages = images.slice(0, Math.max(1, priority));
    preloadImages(priorityImages);

    // Then preload next batch
    const nextImages = images.slice(priority, priority + preloadNext);
    setTimeout(() => preloadImages(nextImages), 100);

  }, [images, priority, preloadNext, preloadImages]);

  return {
    loadedImages,
    loadingImages,
    errors,
    preloadImage,
    preloadImages,
    isLoaded: (src: string) => loadedImages.has(src),
    isLoading: (src: string) => loadingImages.has(src),
    hasError: (src: string) => errors.has(src)
  };
};