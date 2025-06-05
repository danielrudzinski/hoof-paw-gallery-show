import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { ArrowLeft, Grid, Image as ImageIcon } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import CachedImage from './CachedImage';

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

  // Memoize schema generation to avoid recalculation
  const imageGallerySchema = useMemo(() => ({
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
  }), [title, description, images]);

  const openLightbox = useCallback((image: string) => {
    setSelectedImage(image);
  }, []);

  const closeLightbox = useCallback(() => {
    setSelectedImage(null);
  }, []);

  const nextImage = useCallback(() => {
    if (!selectedImage) return;
    const currentIndex = images.indexOf(selectedImage);
    const nextIndex = (currentIndex + 1) % images.length;
    setSelectedImage(images[nextIndex]);
  }, [selectedImage, images]);

  const prevImage = useCallback(() => {
    if (!selectedImage) return;
    const currentIndex = images.indexOf(selectedImage);
    const prevIndex = (currentIndex - 1 + images.length) % images.length;
    setSelectedImage(images[prevIndex]);
  }, [selectedImage, images]);

  // Auto-advance slideshow with cleanup
  useEffect(() => {
    if (viewMode !== 'slideshow' || images.length <= 1) return;
    
    const interval = setInterval(() => {
      setCurrentSlideIndex((prev) => (prev + 1) % images.length);
    }, 4000); // Increased interval for better UX
    
    return () => clearInterval(interval);
  }, [viewMode, images.length]);

  // Keyboard navigation
  useEffect(() => {
    if (!selectedImage) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      switch (event.key) {
        case 'ArrowLeft':
          event.preventDefault();
          prevImage();
          break;
        case 'ArrowRight':
          event.preventDefault();
          nextImage();
          break;
        case 'Escape':
          event.preventDefault();
          closeLightbox();
          break;
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [selectedImage, nextImage, prevImage, closeLightbox]);

  return (
    <article className="min-h-screen bg-white">
      {/* SEO Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(imageGallerySchema)
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
                  key={`${image}-${index}`}
                  className="group cursor-pointer overflow-hidden rounded-lg bg-white shadow-md hover:shadow-lg transition-all duration-300 ease-out" // Dodaj ease-out
                  onClick={() => openLightbox(image)}
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
                      className="w-full h-full object-cover transition-transform duration-300 ease-out group-hover:scale-105" // Dodaj ease-out i wydłuż czas
                      priority={index < 8}
                      lazy={index >= 8}
                      width={300}
                      height={300}
                      sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors duration-300 ease-out" /> {/* Zmniejsz opacity */}
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
                    key={`slide-${index}`}
                    className={`absolute inset-0 w-full h-full transition-opacity duration-700 ${
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
                    key={`indicator-${index}`}
                    onClick={() => setCurrentSlideIndex(index)}
                    className={`w-3 h-3 rounded-full transition-colors duration-200 ${
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

      {/* Optimized Lightbox */}
      {selectedImage && (
        <div 
          className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
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
              className="max-w-full max-h-full object-contain"
              style={{ maxWidth: '95vw', maxHeight: '95vh' }}
              priority={true}
              lazy={false}
            />
            
            {/* Navigation buttons */}
            <button
              onClick={closeLightbox}
              className="absolute top-4 right-4 text-white hover:text-gray-300 text-2xl font-bold w-10 h-10 flex items-center justify-center rounded-full bg-black/50 hover:bg-black/70 transition-colors"
              aria-label="Zamknij podgląd"
            >
              ×
            </button>
            
            {images.length > 1 && (
              <>
                <button
                  onClick={prevImage}
                  className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white hover:text-gray-300 text-2xl font-bold w-10 h-10 flex items-center justify-center rounded-full bg-black/50 hover:bg-black/70 transition-colors"
                  aria-label="Poprzednie zdjęcie"
                >
                  ‹
                </button>
                <button
                  onClick={nextImage}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white hover:text-gray-300 text-2xl font-bold w-10 h-10 flex items-center justify-center rounded-full bg-black/50 hover:bg-black/70 transition-colors"
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