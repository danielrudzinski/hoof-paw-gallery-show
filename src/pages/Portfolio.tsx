import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import Navigation from '../components/Navigation';

const Portfolio = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState({ 
    horses: 0, 
    pets: 0 
  });
  const navigate = useNavigate();

  const portfolioCategories = [
    {
      id: 'horses',
      title: 'Konie i Jeździectwo',
      route: '/portfolio/konie-jezdziectwo',
      images: [
        '/konie/kon1.webp',
        '/konie/kon2.webp',
        '/konie/kon3.webp',
        '/konie/kon4.webp',
        '/konie/kon5.webp',
        '/konie/kon6.webp',
        '/konie/kon7.webp',
        '/konie/kon8.webp',
        '/jezdziectwo/jazda1.webp',
        '/jezdziectwo/jazda2.webp',
        '/jezdziectwo/jazda3.webp',
        '/jezdziectwo/jazda4.webp',
        '/jezdziectwo/jazda5.webp',
      ]
    },
    {
      id: 'pets',
      title: 'Psy i Koty',
      route: '/portfolio/psyikoty',
      images: [
        '/psy/bulldog.webp',
        '/psy/dog2.webp',
        '/koty/kot1.webp',
        '/psy/dog.webp',
        '/psy/dog3.webp',
        '/psy/dog4.webp',
        '/psy/dog5.webp',
      ]
    }
  ];

  // Automatyczne przełączanie slajdów
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex(prev => ({
        horses: (prev.horses + 1) % portfolioCategories[0].images.length,
        pets: (prev.pets + 1) % portfolioCategories[1].images.length,
      }));
    }, 3000);

    return () => clearInterval(interval);
  }, [portfolioCategories]);

  const handleCategoryClick = (route: string) => {
    navigate(route);
  };

  const portfolioSchema = {
    "@context": "https://schema.org",
    "@type": "ImageGallery",
    "name": "Portfolio - Wiktoria Putz Photography",
    "description": "Odkryj magię chwil uchwyconych obiektywem. Portfolio fotografii ludzi i zwierząt.",
    "url": "https://wiktoriaputzphoto.pl/portfolio",
    "author": {
      "@type": "Person",
      "name": "Wiktoria Putz"
    },
    "about": ["Fotografia koni", "Fotografia psów", "Fotografia kotów", "Jeździectwo"]
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Strona główna",
        "item": "https://wiktoriaputzphoto.pl"
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "Portfolio",
        "item": "https://wiktoriaputzphoto.pl/portfolio"
      }
    ]
  };

  return (
    <div className="min-h-screen bg-white">
      <Helmet>
        <title>Portfolio - Wiktoria Putz | Galeria Zdjęć Koni, Psów i Kotów</title>
        <meta name="description" content="Odkryj magię chwil uchwyconych obiektywem. Portfolio fotografii ludzi i zwierząt - konie, psy, koty. Profesjonalne sesje zdjęciowe w Bydgoszczy." />
        <meta name="keywords" content="portfolio fotograf, galeria zdjęć koni, fotografia psów, fotografia kotów, jeździectwo Bydgoszcz, sesje zwierząt" />
        <link rel="canonical" href="https://wiktoriaputzphoto.pl/portfolio" />
        
        {/* Open Graph */}
        <meta property="og:title" content="Portfolio - Wiktoria Putz | Galeria Zdjęć Koni, Psów i Kotów" />
        <meta property="og:description" content="Odkryj magię chwil uchwyconych obiektywem. Portfolio fotografii ludzi i zwierząt - konie, psy, koty." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://wiktoriaputzphoto.pl/portfolio" />
        <meta property="og:image" content="https://wiktoriaputzphoto.pl/konie/kon1.webp" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        
        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Portfolio - Wiktoria Putz | Galeria Zdjęć Koni, Psów i Kotów" />
        <meta name="twitter:description" content="Odkryj magię chwil uchwyconych obiektywem. Portfolio fotografii ludzi i zwierząt." />
        <meta name="twitter:image" content="https://wiktoriaputzphoto.pl/konie/kon1.webp" />
        
        {/* Structured Data */}
        <script type="application/ld+json">
          {JSON.stringify(portfolioSchema)}
        </script>
        <script type="application/ld+json">
          {JSON.stringify(breadcrumbSchema)}
        </script>
      </Helmet>

      <Navigation />
      
      <div className="pt-24 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16 animate-fade-in">
            <h1 className="text-4xl md:text-6xl font-playfair font-bold text-gray-900 mb-6">
              Portfolio
            </h1>
            <p className="text-lg text-gray-600 font-inter max-w-2xl mx-auto">
              Odkryj magię chwil uchwyconych obiektywem. Wybierz kategorię, aby zobaczyć więcej.
            </p>
          </div>

          {/* Kafelki z slideshow - zmienione na 2 kolumny */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {portfolioCategories.map((category, index) => (
              <div
                key={category.id}
                onClick={() => handleCategoryClick(category.route)}
                className="group relative overflow-hidden rounded-2xl shadow-2xl hover:shadow-3xl transition-all duration-500 cursor-pointer transform hover:-translate-y-2 animate-fade-in h-80"
                style={{ animationDelay: `${index * 0.2}s` }}
              >
                {/* Slideshow images */}
                <div className="relative w-full h-full">
                  {category.images.map((image, imageIndex) => (
                    <img
                      key={imageIndex}
                      src={image}
                      alt={`${category.title} ${imageIndex + 1}`}
                      className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${
                        imageIndex === currentImageIndex[category.id] ? 'opacity-100' : 'opacity-0'
                      }`}
                    />
                  ))}
                </div>

                {/* Overlay z gradientem */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent group-hover:from-black/60 transition-all duration-300" />
                
                {/* Tytuł kategorii */}
                <div className="absolute inset-0 flex items-center justify-center px-4">
                  <h2 className={`font-playfair font-bold text-white text-center group-hover:scale-110 transition-transform duration-300 ${
                    category.title === 'Konie i Jeździectwo' 
                      ? 'text-2xl md:text-3xl leading-tight' 
                      : 'text-3xl md:text-4xl'
                  }`}>
                    {category.title === 'Konie i Jeździectwo' ? (
                      <>
                        Konie<br />i Jeździectwo
                      </>
                    ) : (
                      category.title
                    )}
                  </h2>
                </div>

                {/* Wskaźniki slajdów */}
                <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
                  {category.images.map((_, dotIndex) => (
                    <div
                      key={dotIndex}
                      className={`w-2 h-2 rounded-full transition-all duration-300 ${
                        dotIndex === currentImageIndex[category.id] 
                          ? 'bg-white scale-125' 
                          : 'bg-white/50'
                      }`}
                    />
                  ))}
                </div>

                {/* Efekt hover - strzałka */}
                <div className="absolute top-1/2 right-6 transform -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-x-4 group-hover:translate-x-0">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </div>
            ))}
          </div>

          {/* Informacja o funkcjonalności */}
          <div className="text-center mt-12">
            <p className="text-sm text-gray-500 font-inter">
              Kliknij na kategorię, aby przejść do galerii
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Portfolio;