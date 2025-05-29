
import Navigation from '../components/Navigation';

const Portfolio = () => {
  const portfolioCategories = [
    {
      title: 'Portrety Ludzi',
      images: [
        'https://images.unsplash.com/photo-1649972904349-6e44c42644a7?w=800&q=80',
        'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=800&q=80',
      ]
    },
    {
      title: 'Fotografia Zwierząt',
      images: [
        'https://images.unsplash.com/photo-1582562124811-c09040d0a901?w=800&q=80',
        'https://images.unsplash.com/photo-1535268647677-300dbf3d78d1?w=800&q=80',
        'https://images.unsplash.com/photo-1517022812141-23620dba5c23?w=800&q=80',
        'https://images.unsplash.com/photo-1439886183900-e79ec0057170?w=800&q=80',
      ]
    }
  ];

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
              Odkryj magię chwil uchwyconych obiektywem. Każde zdjęcie opowiada unikalną historię.
            </p>
          </div>

          {portfolioCategories.map((category, categoryIndex) => (
            <div key={categoryIndex} className="mb-16">
              <h2 className="text-3xl font-playfair font-semibold text-gray-900 mb-8 text-center">
                {category.title}
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {category.images.map((image, imageIndex) => (
                  <div
                    key={imageIndex}
                    className="group relative overflow-hidden rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 animate-fade-in"
                    style={{ animationDelay: `${imageIndex * 0.1}s` }}
                  >
                    <img
                      src={image}
                      alt={`${category.title} ${imageIndex + 1}`}
                      className="w-full h-80 object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300" />
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Portfolio;
