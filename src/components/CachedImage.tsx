import React, { useState, useRef, useEffect } from 'react';
import { useImageCache } from '@/hooks/useImageCache';

interface CachedImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  alt: string;
  fallbackSrc?: string;
  lazy?: boolean;
  priority?: boolean;
  onLoadComplete?: () => void;
}

const CachedImage: React.FC<CachedImageProps> = ({
  src,
  alt,
  fallbackSrc = '/placeholder.svg',
  lazy = true,
  priority = false,
  onLoadComplete,
  className = '',
  ...props
}) => {
  const [imageSrc, setImageSrc] = useState<string>(priority ? src : '');
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [isInView, setIsInView] = useState(!lazy);
  const imgRef = useRef<HTMLImageElement>(null);
  const observerRef = useRef<IntersectionObserver | null>(null);
  
  const { isSupported, cacheImage, getCachedImage } = useImageCache();

  // Intersection Observer for lazy loading
  useEffect(() => {
    if (!lazy || isInView) return;

    observerRef.current = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observerRef.current?.disconnect();
        }
      },
      {
        rootMargin: '50px 0px',
        threshold: 0.1
      }
    );

    if (imgRef.current) {
      observerRef.current.observe(imgRef.current);
    }

    return () => observerRef.current?.disconnect();
  }, [lazy, isInView]);

  // Load image when in view or if priority
  useEffect(() => {
    if ((isInView || priority) && !imageSrc && src) {
      loadImage();
    }
  }, [isInView, priority, src]);

  const loadImage = async () => {
    try {
      // Try to get from IndexedDB cache first
      if (isSupported) {
        const cachedUrl = await getCachedImage(src);
        if (cachedUrl) {
          setImageSrc(cachedUrl);
          return;
        }
      }

      // If not in cache, fetch from network
      const response = await fetch(src);
      if (!response.ok) throw new Error('Network response was not ok');
      
      const blob = await response.blob();
      const objectUrl = URL.createObjectURL(blob);
      
      // Cache the blob if IndexedDB is supported
      if (isSupported) {
        await cacheImage(src, blob);
      }
      
      setImageSrc(objectUrl);
    } catch (error) {
      console.error('Failed to load image:', error);
      setImageSrc(src); // Fallback to original src
    }
  };

  const handleLoad = () => {
    setIsLoaded(true);
    onLoadComplete?.();
  };

  const handleError = () => {
    if (!hasError) {
      setHasError(true);
      setImageSrc(fallbackSrc);
    }
  };

  // Cleanup object URLs to prevent memory leaks
  useEffect(() => {
    return () => {
      if (imageSrc && imageSrc.startsWith('blob:')) {
        URL.revokeObjectURL(imageSrc);
      }
    };
  }, [imageSrc]);

  return (
    <div className={`relative overflow-hidden ${className}`} ref={imgRef}>
      {/* Placeholder/Loading state */}
      {!isLoaded && (
        <div className="absolute inset-0 bg-gray-200 animate-pulse flex items-center justify-center">
          <div className="w-8 h-8 border-4 border-gray-300 border-t-gray-600 rounded-full animate-spin"></div>
        </div>
      )}
      
      {/* Actual image */}
      {imageSrc && (
        <img
          src={imageSrc}
          alt={alt}
          onLoad={handleLoad}
          onError={handleError}
          className={`transition-opacity duration-300 ${
            isLoaded ? 'opacity-100' : 'opacity-0'
          } w-full h-full object-cover`}
          {...props}
        />
      )}
    </div>
  );
};

export default CachedImage;