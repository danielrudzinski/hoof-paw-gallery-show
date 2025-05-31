import React, { useState, useEffect, useCallback } from 'react';
import { ArrowLeft, Grid, Image as ImageIcon } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import CachedImage from './CachedImage';
import { useImagePreloader } from '@/hooks/useImagePreloader';
import { useImageCache } from '@/hooks/useImageCache';

interface PortfolioProps {
  title: string;
  description: string;
  images: string[];
  backLink: string;
  backText?: string;
}

const Portfolio: React.FC<PortfolioProps> = ({
  title,
  description,
  images,
  backLink,
  backText = "Powrót do Portfolio"
}) => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<'grid' | 'slideshow'>('grid');
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const [hoveredImage, setHoveredImage] = useState<string | null>(null);

  // Preload images with priority
  const { loadedImages, isLoaded, preloadImage } = useImagePreloader({
    images,
    priority: viewMode === 'slideshow' ? 1 : 4,
    preloadNext: viewMode === 'slideshow' ? 3 : 8
  });

  // Image cache for manual preloading
  const { cacheImage } = useImageCache();

  // Preload image on hover with caching
  const handleImageHover = useCallback(async (imageSrc: string) => {
    if (hoveredImage === imageSrc) return;
    
    setHoveredImage(imageSrc);
    
    // Don't preload if already loaded
    if (loadedImages.has(imageSrc)) return;
    
    try {
      // Use the preloader to load the image
      await preloadImage(imageSrc);
      
      // Also cache it for immediate lightbox usage
      const response = await fetch(imageSrc);
      if (response.ok) {
        const blob = await response.blob();
        await cacheImage(imageSrc, blob);
      }
    } catch (error) {
      console.warn('Failed to preload image on hover:', error);
    }
  }, [hoveredImage, loadedImages, preloadImage, cacheImage]);

  // Debounced hover handler to avoid excessive preloading
  const debouncedHover = useCallback(() => {
    let timeoutId: NodeJS.Timeout;
    
    return (imageSrc: string) => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        handleImageHover(imageSrc);
      }, 150); // 150ms delay to avoid preloading on quick mouse movements
    };
  }, [handleImageHover]);

  const debouncedHoverHandler = debouncedHover();

  const openLightbox = (image: string) => {
    setSelectedImage(image);
  };

  const closeLightbox = () => {
    setSelectedImage(null);
  };

  const nextImage = () => {
    if (!selectedImage) return;
    const currentIndex = images.indexOf(selectedImage);
    const nextIndex = (currentIndex + 1) % images.length;
    const nextImg = images[nextIndex];
    setSelectedImage(nextImg);
    
    // Preload the next image in sequence for smooth navigation
    const followingIndex = (nextIndex + 1) % images.length;
    if (followingIndex !== currentIndex) {
      debouncedHoverHandler(images[followingIndex]);
    }
  };

  const prevImage = () => {
    if (!selectedImage) return;
    const currentIndex = images.indexOf(selectedImage);
    const prevIndex = (currentIndex - 1 + images.length) % images.length;
    const prevImg = images[prevIndex];
    setSelectedImage(prevImg);
    
    // Preload the previous image in sequence for smooth navigation
    const precedingIndex = (prevIndex - 1 + images.length) % images.length;
    if (precedingIndex !== currentIndex) {
      debouncedHoverHandler(images[precedingIndex]);
    }
  };

  // Auto-advance slideshow
  useEffect(() => {
    if (viewMode === 'slideshow' && images.length > 0) {
      const interval = setInterval(() => {
        setCurrentSlideIndex((prev) => (prev + 1) % images.length);
      }, 3000);
      return () => clearInterval(interval);
    }
  }, [viewMode, images.length]);

  // Handle keyboard navigation in lightbox
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (!selectedImage) return;
      
      switch (event.key) {
        case 'ArrowLeft':
          prevImage();
          break;
        case 'ArrowRight':
          nextImage();
          break;
        case 'Escape':
          closeLightbox();
          break;
      }
    };

    if (selectedImage) {
      document.addEventListener('keydown', handleKeyDown);
      return () => document.removeEventListener('keydown', handleKeyDown);
    }
  }, [selectedImage, images]);

  // Generate structured data for image gallery
  const generateImageGallerySchema = () => {
    return {
      "@context": "https://schema.org",
      "@type": "ImageGallery",
      "name": title,
      "description": description,
      "image": images.map((image, index) => ({
        "@type": "ImageObject",
        "contentUrl": `https://wiktoriaputzphoto.pl${image}`,
        "name": `${title} - Zdjęcie ${index + 1}`,
        "description": `Profesjonalne zdjęcie z galerii: ${title}`,
        "creator": {
          "@type": "Person",
          "name": "Wiktoria Putz"
        }
      }))
    };
  };

  return (
    <article className="min-h-screen bg-white">
      {/* SEO Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(generateImageGallerySchema())
        }}
      />

      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div className="flex items-center gap-4">
              <Link to={backLink} aria-label={backText}>
                <Button variant="ghost" size="sm" className="gap-2">
                  <ArrowLeft className="w-4 h-4" aria-hidden="true" />
                  {backText}
                </Button>
              </Link>
              <div>
                <h1 className="text-3xl font-playfair font-bold text-gray-900">
                  {title}
                </h1>
                <p className="text-gray-600 mt-1">
                  {description}
                </p>
              </div>
            </div>
            {images.length > 0 && (
              <div className="flex gap-2" role="group" aria-label="Opcje wyświetlania galerii">
                <Button
                  variant={viewMode === 'grid' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setViewMode('grid')}
                  className="gap-2"
                  aria-pressed={viewMode === 'grid'}
                  aria-label="Widok siatki"
                >
                  <Grid className="w-4 h-4" aria-hidden="true" />
                  Galeria
                </Button>
                <Button
                  variant={viewMode === 'slideshow' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setViewMode('slideshow')}
                  className="gap-2"
                  aria-pressed={viewMode === 'slideshow'}
                  aria-label="Widok pokazu slajdów"
                >
                  <ImageIcon className="w-4 h-4" aria-hidden="true" />
                  Pokaz slajdów
                </Button>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        {images.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-gray-500 text-lg">Brak zdjęć w galerii.</p>
          </div>
        ) : viewMode === 'grid' ? (
          <section aria-label="Galeria zdjęć w widoku siatki">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {images.map((image, index) => (
                <article
                  key={index}
                  className="group cursor-pointer overflow-hidden rounded-lg bg-white shadow-md hover:shadow-lg transition-all duration-300"
                  onClick={() => openLightbox(image)}
                  onMouseEnter={() => debouncedHoverHandler(image)}
                  onFocus={() => debouncedHoverHandler(image)}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      openLightbox(image);
                    }
                  }}
                  aria-label={`Otwórz zdjęcie ${index + 1} w powiększeniu`}
                >
                  <div className="aspect-square relative overflow-hidden">
                    <CachedImage
                      src={image}
                      alt={`${title} - Zdjęcie ${index + 1}`}
                      className="w-full h-full group-hover:scale-105 transition-transform duration-300"
                      priority={index < 4}
                      lazy={index >= 4}
                      width={400}
                      height={400}
                    />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
                    {/* Loading indicator for hover preloading */}
                    {hoveredImage === image && !loadedImages.has(image) && (
                      <div className="absolute top-2 right-2 w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin bg-black/30 backdrop-blur-sm" />
                    )}
                  </div>
                </article>
              ))}
            </div>
          </section>
        ) : (
          <section aria-label="Pokaz slajdów">
            <div className="max-w-4xl mx-auto">
              <div className="aspect-video relative overflow-hidden rounded-lg bg-white shadow-lg">
                {images.map((image, index) => (
                  <div
                    key={index}
                    className={`absolute inset-0 w-full h-full transition-opacity duration-1000 ${
                      index === currentSlideIndex ? 'opacity-100' : 'opacity-0'
                    }`}
                    aria-hidden={index !== currentSlideIndex}
                  >
                    <CachedImage
                      src={image}
                      alt={`${title} - Slajd ${index + 1}`}
                      className="w-full h-full object-cover"
                      priority={index <= 2}
                      lazy={index > 2}
                      width={800}
                      height={450}
                    />
                  </div>
                ))}
              </div>
              {/* Slideshow indicators */}
              <nav aria-label="Nawigacja pokazu slajdów" className="flex justify-center mt-4 gap-2">
                {images.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentSlideIndex(index)}
                    className={`w-3 h-3 rounded-full transition-colors ${
                      index === currentSlideIndex ? 'bg-blue-600' : 'bg-gray-300'
                    }`}
                    aria-label={`Przejdź do slajdu ${index + 1}`}
                    aria-current={index === currentSlideIndex ? 'true' : 'false'}
                  />
                ))}
              </nav>
            </div>
          </section>
        )}
      </main>

      {/* Lightbox */}
      {selectedImage && (
        <div 
          className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4 overflow-auto"
          onClick={closeLightbox}
          role="dialog"
          aria-modal="true"
          aria-label="Podgląd zdjęcia"
        >
          <div 
            className="relative w-full h-full flex items-center justify-center"
            onClick={(e) => e.stopPropagation()}
          >
            <CachedImage
              src={selectedImage}
              alt={`${title} - Podgląd zdjęcia`}
              className="max-w-full max-h-full object-contain w-auto h-auto"
              style={{ maxWidth: '95vw', maxHeight: '95vh' }}
              priority={true}
              lazy={false}
            />
            <button
              onClick={closeLightbox}
              className="absolute top-4 right-4 text-white hover:text-gray-300 text-2xl font-bold w-8 h-8 flex items-center justify-center rounded-full bg-black/50 hover:bg-black/70 transition-colors z-10"
              aria-label="Zamknij podgląd"
            >
              ×
            </button>
            {images.length > 1 && (
              <>
                <button
                  onClick={prevImage}
                  className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white hover:text-gray-300 text-2xl font-bold w-8 h-8 flex items-center justify-center rounded-full bg-black/50 hover:bg-black/70 transition-colors z-10"
                  aria-label="Poprzednie zdjęcie"
                >
                  ‹
                </button>
                <button
                  onClick={nextImage}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white hover:text-gray-300 text-2xl font-bold w-8 h-8 flex items-center justify-center rounded-full bg-black/50 hover:bg-black/70 transition-colors z-10"
                  aria-label="Następne zdjęcie"
                >
                  ›
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </article>
  );
};

export default Portfolio;