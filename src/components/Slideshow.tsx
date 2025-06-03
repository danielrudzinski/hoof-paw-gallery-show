import { useState, useEffect } from 'react';

const Slideshow = () => {
  const images = [
    { src: '/glowna/1.png', alt: 'Zdjęcie 1 - portfolio fotografii' },
    { src: '/glowna/2.png', alt: 'Zdjęcie 2 - portfolio fotografii' },
    { src: '/glowna/3.jpg', alt: 'Zdjęcie 3 - portfolio fotografii' },
    { src: '/glowna/4.png', alt: 'Zdjęcie 4 - portfolio fotografii' },
    { src: '/glowna/5.png', alt: 'Zdjęcie 5 - portfolio fotografii' },
    { src: '/glowna/6.jpg', alt: 'Zdjęcie 6 - portfolio fotografii' },
    { src: '/glowna/1.png', alt: 'Zdjęcie 1 - portfolio fotografii' },
    { src: '/glowna/2.png', alt: 'Zdjęcie 2 - portfolio fotografii' },
    { src: '/glowna/3.jpg', alt: 'Zdjęcie 3 - portfolio fotografii' },
    { src: '/glowna/4.png', alt: 'Zdjęcie 4 - portfolio fotografii' },
    { src: '/glowna/5.png', alt: 'Zdjęcie 5 - portfolio fotografii' },
    { src: '/glowna/6.jpg', alt: 'Zdjęcie 6 - portfolio fotografii' },
    { src: '/glowna/1.png', alt: 'Zdjęcie 1 - portfolio fotografii' },
    { src: '/glowna/2.png', alt: 'Zdjęcie 2 - portfolio fotografii' },
    { src: '/glowna/3.jpg', alt: 'Zdjęcie 3 - portfolio fotografii' },
    { src: '/glowna/4.png', alt: 'Zdjęcie 4 - portfolio fotografii' },
    { src: '/glowna/5.png', alt: 'Zdjęcie 5 - portfolio fotografii' },
    { src: '/glowna/6.jpg', alt: 'Zdjęcie 6 - portfolio fotografii' },
    { src: '/glowna/1.png', alt: 'Zdjęcie 1 - portfolio fotografii' },
  ];

  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => 
        prevIndex === images.length - 1 ? 0 : prevIndex + 1
      );
    }, 4000); // Change image every 4 seconds

    return () => clearInterval(interval);
  }, [images.length]);

  // Generate structured data for the slideshow
  const generateSlideshowSchema = () => {
    return {
      "@context": "https://schema.org",
      "@type": "ImageGallery",
      "name": "Portfolio Fotografii Wiktoria Putz - Slideshow",
      "description": "Pokaz slajdów prezentujący najlepsze prace fotograficzne - zdjęcia koni, psów, kotów i sesje jeździeckie",
      "creator": {
        "@type": "Person",
        "name": "Wiktoria Putz"
      },
      "image": images.map((image, index) => ({
        "@type": "ImageObject",
        "contentUrl": `https://wiktoriaputzphoto.pl${image.src}`,
        "name": image.alt,
        "description": image.alt
      }))
    };
  };

  return (
    <section 
      className="absolute inset-0 w-full h-full overflow-hidden"
      aria-label="Pokaz slajdów portfolio fotografii"
      role="img"
      aria-live="polite"
    >
      {/* SEO Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(generateSlideshowSchema())
        }}
      />

      {images.map((image, index) => (
        <div
          key={index}
          className={`absolute inset-0 w-full h-full transition-opacity duration-1000 ${
            index === currentImageIndex ? 'opacity-100' : 'opacity-0'
          }`}
          aria-hidden={index !== currentImageIndex}
        >
          <img
            src={image.src}
            alt={image.alt}
            className="w-full h-full object-cover"
            loading={index === 0 ? "eager" : "lazy"}
            width="1920"
            height="1080"
            // Fix: Use lowercase fetchpriority instead of fetchPriority
            {...(index === 0 ? { fetchpriority: "high" } : { fetchpriority: "low" })}
          />

        </div>
      ))}

      {/* Screen reader announcement for current slide */}
      <div className="sr-only" aria-live="polite" aria-atomic="true">
        Aktualnie wyświetlane zdjęcie {currentImageIndex + 1} z {images.length}: {images[currentImageIndex]?.alt}
      </div>

      {/* Slideshow progress indicator for screen readers */}
      <div className="sr-only">
        <p>Pokaz slajdów automatycznie zmienia zdjęcia co 4 sekundy.</p>
        <p>Wyświetlane są profesjonalne zdjęcia fotografa Wiktorii Putz z Bydgoszczy.</p>
      </div>
    </section>
  );
};

export default Slideshow;