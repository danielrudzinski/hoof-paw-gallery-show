import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
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
        'konie/kon1.png',
        'konie/kon2.jpg',
        'konie/kon3.png',
        'konie/kon4.png',
        'konie/kon5.png',
        'konie/kon6.png',
        'konie/kon7.png',
        'konie/kon8.jpeg',
        'jezdziectwo/jazda1.jpg',
        'jezdziectwo/jazda2.jpg',
        'jezdziectwo/jazda3.png',
        'jezdziectwo/jazda4.jpg',
        'jezdziectwo/jazda5.png',
      ]
    },
    {
      id: 'pets',
      title: 'Psy i Koty',
      route: '/portfolio/psyikoty',
      images: [
        'psy/bulldog.jpeg',
        'psy/dog2.jpg',
        'koty/kot1.png',
        'psy/dog.png',
        'psy/dog3.jpg',
        'psy/dog4.jpeg',
        'psy/dog5.png',
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