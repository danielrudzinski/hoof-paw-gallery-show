import { useState, useEffect } from 'react';
import Navigation from '../components/Navigation';

const Portfolio = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState({ people: 0, animals: 0 });

  const portfolioCategories = [
    {
      id: 'people',
      title: 'Ludzie',
      route: '/portfolio/ludzie', // przyszła podstrona
      images: [
        'https://images.unsplash.com/photo-1649972904349-6e44c42644a7?w=800&q=80',
        'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=800&q=80',
        'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&q=80',
        'https://images.unsplash.com/photo-1494790108755-2616c4d3a9f0?w=800&q=80',
      ]
    },
    {
      id: 'animals',
      title: 'Zwierzęta',
      route: '/portfolio/zwierzeta', // przyszła podstrona
      images: [
        'https://images.unsplash.com/photo-1582562124811-c09040d0a901?w=800&q=80',
        'https://images.unsplash.com/photo-1535268647677-300dbf3d78d1?w=800&q=80',
        'https://images.unsplash.com/photo-1517022812141-23620dba5c23?w=800&q=80',
        'https://images.unsplash.com/photo-1439886183900-e79ec0057170?w=800&q=80',
      ]
    }
  ];

  // Automatyczne przełączanie slajdów
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex(prev => ({
        people: (prev.people + 1) % portfolioCategories[0].images.length,
        animals: (prev.animals + 1) % portfolioCategories[1].images.length,
      }));
    }, 3000); // zmiana co 3 sekundy

    return () => clearInterval(interval);
  }, [portfolioCategories]);

  const handleCategoryClick = (route) => {
    // Na razie console.log, później można użyć react-router
    console.log(`Przekierowanie do: ${route}`);
    // window.location.href = route; // lub użyj navigate z react-router
    alert(`Funkcja w przygotowaniu: ${route}`);
  };

  return (
    <div className="min-h-screen bg-white">
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

          {/* Kafelki z slideshow */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {portfolioCategories.map((category, index) => (
              <div
                key={category.id}
                onClick={() => handleCategoryClick(category.route)}
                className="group relative overflow-hidden rounded-2xl shadow-2xl hover:shadow-3xl transition-all duration-500 cursor-pointer transform hover:-translate-y-2 animate-fade-in h-96"
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
                <div className="absolute inset-0 flex items-center justify-center">
                  <h2 className="text-4xl md:text-5xl font-playfair font-bold text-white text-center group-hover:scale-110 transition-transform duration-300">
                    {category.title}
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