import { useState, useEffect } from 'react';

const Slideshow = () => {
  const images = [
    { src: '/psy/bulldog.webp', alt: 'Zdjęcie buldoga francuskiego - sesja fotograficzna psów' },
    { src: '/koty/kot1.webp', alt: 'Portret kota - profesjonalna fotografia zwierząt' },
    { src: '/konie/kon1.webp', alt: 'Zdjęcie konia - fotografia equestrian Bydgoszcz' },
    { src: '/konie/kon2.webp', alt: 'Portret konia - sesja fotograficzna koni' },
    { src: '/konie/kon5.webp', alt: 'Profesjonalne zdjęcie konia - fotograf Bydgoszcz' },
    { src: '/konie/kon6.webp', alt: 'Fotografia konia w ruchu - sesja equestrian' },
    { src: '/konie/kon7.webp', alt: 'Artystyczne zdjęcie konia - fotografia zwierząt' },
    { src: '/psy/dog.webp', alt: 'Sesja fotograficzna psa - profesjonalny fotograf zwierząt' },
    { src: '/psy/dog4.webp', alt: 'Profesjonalne zdjęcie psa - fotograf zwierząt' },
    { src: '/psy/dog5.webp', alt: 'Artystyczny portret psa - fotografia zwierząt' },
    { src: '/jezdziectwo/jazda1.webp', alt: 'Fotoreportaż z zawodów jeździeckich - sport equestrian' },
    { src: '/jezdziectwo/jazda2.webp', alt: 'Zdjęcie z treningu jeździeckiego - fotografia sportowa' },
    { src: '/jezdziectwo/jazda3.webp', alt: 'Skoki przez przeszkody - fotoreportaż jeździecki' },
    { src: '/jezdziectwo/jazda4.webp', alt: 'Zawody jeździeckie - profesjonalna fotografia sportowa' },
    { src: '/jezdziectwo/jazda5.webp', alt: 'Jeździec na koniu - fotografia equestrian' },
    { src: '/jezdziectwo/jazda6.webp', alt: 'Dynamiczne zdjęcie z zawodów konnych' },
    { src: '/jezdziectwo/jazda7.webp', alt: 'Fotoreportaż z treningów jeździeckich' },
    { src: '/jezdziectwo/jazda8.webp', alt: 'Profesjonalne zdjęcia z zawodów konnych' },
    { src: '/jezdziectwo/jazda9.webp', alt: 'Sesja fotograficzna jeździec z koniem' },
    { src: '/jezdziectwo/jazda10.webp', alt: 'Artystyczne zdjęcie z jeździectwa - fotografia sportowa' },
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
          <div className="absolute inset-0 bg-black/30" aria-hidden="true" />
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