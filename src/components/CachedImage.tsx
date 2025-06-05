import React, { useState, useRef, useEffect, useCallback } from 'react';

interface CachedImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  alt: string;
  fallbackSrc?: string;
  lazy?: boolean;
  priority?: boolean;
  onLoadComplete?: () => void;
  className?: string;
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
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);
  // Fix: Priority images should start loading immediately
  const [hasStartedLoading, setHasStartedLoading] = useState(priority || !lazy);
  const imgRef = useRef<HTMLDivElement>(null);
  const observerRef = useRef<IntersectionObserver | null>(null);
  const imageRef = useRef<HTMLImageElement | null>(null);
  const hasObserved = useRef(false);
  const isLoadingRef = useRef(false);

  // Intersection Observer for lazy loading - only for non-priority images
  useEffect(() => {
    // Don't setup observer for priority images or when already started loading
    if (!lazy || priority || hasStartedLoading || hasObserved.current) return;

    const currentRef = imgRef.current;
    if (!currentRef) return;

    observerRef.current = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasObserved.current && !isLoadingRef.current) {
          hasObserved.current = true;
          isLoadingRef.current = true;
          setHasStartedLoading(true);
          observerRef.current?.disconnect();
        }
      },
      {
        rootMargin: '100px 0px',
        threshold: 0.1
      }
    );

    observerRef.current.observe(currentRef);

    return () => {
      observerRef.current?.disconnect();
    };
  }, [lazy, priority, hasStartedLoading]);

  // Force loading for priority images
  useEffect(() => {
    if (priority && !hasStartedLoading && !isLoadingRef.current) {
      isLoadingRef.current = true;
      setHasStartedLoading(true);
    }
  }, [priority, hasStartedLoading]);

  const handleLoad = useCallback(() => {
    if (!isLoaded) {
      setIsLoaded(true);
      isLoadingRef.current = false;
      onLoadComplete?.();
    }
  }, [isLoaded, onLoadComplete]);

  const handleError = useCallback(() => {
    console.warn('Image failed to load:', src);
    if (!hasError) {
      setHasError(true);
      isLoadingRef.current = false;
      if (imageRef.current && !imageRef.current.src.includes(fallbackSrc)) {
        imageRef.current.src = fallbackSrc;
      }
    }
  }, [hasError, fallbackSrc, src]);

  const imageSrc = hasError ? fallbackSrc : src;

  return (
    <div className={`relative overflow-hidden ${className}`} ref={imgRef}>
      {/* Loading placeholder - only show if we're loading and haven't loaded yet */}
      {hasStartedLoading && !isLoaded && !hasError && (
        <div className="absolute inset-0 bg-gray-100 flex items-center justify-center">
          <div className="w-4 h-4 border-2 border-gray-300 border-t-gray-600 rounded-full animate-spin"></div>
        </div>
      )}
      
      {/* Image - render when we should start loading */}
      {hasStartedLoading && (
        <img
          ref={imageRef}
          src={imageSrc}
          alt={alt}
          onLoad={handleLoad}
          onError={handleError}
          className={`transition-opacity duration-200 ${
            isLoaded ? 'opacity-100' : 'opacity-0'
          } w-full h-full object-cover`}
          loading={priority ? 'eager' : 'lazy'}
          decoding="async"
          {...props}
        />
      )}
      
      {/* Fallback background for images that haven't started loading */}
      {!hasStartedLoading && (
        <div className="absolute inset-0 bg-gray-50" />
      )}
    </div>
  );
};

export default CachedImage;