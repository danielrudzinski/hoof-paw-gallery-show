import { useState, useEffect } from 'react';
import Navigation from '../components/Navigation';

const Services = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState({
    fotoreportaz: 0,
    kon: 0,
    produktowa: 0,
    sprzedaz: 0,
    psy: 0
  });

  const services = [
    {
      id: 'fotoreportaz',
      title: 'Fotoreportaż z zawodów i treningów',
      description: 'Dynamiczne ujęcia pełne emocji i pasji! Uchwycę najważniejsze momenty zawodów, a także kulisy treningów – z naturalnością i wyczuciem chwili. Idealna pamiątka i świetny materiał promocyjny.',
      images: [
        'https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=800&q=80',
        'https://images.unsplash.com/photo-1553284965-83fd3e82fa5a?w=800&q=80',
        'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&q=80',
        'https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?w=800&q=80'
      ],
      reverse: false
    },
    {
      id: 'kon',
      title: 'Sesja z koniem',
      description: 'Wyjątkowa sesja ukazująca więź człowieka z koniem. Plenerowe zdjęcia pełne emocji, bliskości i elegancji. Doskonała pamiątka dla każdego miłośnika koni.',
      images: [
        'https://images.unsplash.com/photo-1544966503-7cc5ac882d5b?w=800&q=80',
        'https://images.unsplash.com/photo-1580110465896-cc08c0aeb6af?w=800&q=80',
        'https://images.unsplash.com/photo-1602250725115-1d99d2b3e98b?w=800&q=80',
        'https://images.unsplash.com/photo-1570026818076-1a3e3c5eb751?w=800&q=80'
      ],
      reverse: true
    },
    {
      id: 'produktowa',
      title: 'Sesja produktowa',
      description: 'Profesjonalne zdjęcia Twoich produktów – estetyczne, spójne i dopasowane do marki. Idealne do sklepu internetowego, social mediów i materiałów reklamowych.',
      images: [
        'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=800&q=80',
        'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=800&q=80',
        'https://images.unsplash.com/photo-1586198937331-c6b746b816c0?w=800&q=80',
        'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800&q=80'
      ],
      reverse: false
    },
    {
      id: 'sprzedaz',
      title: 'Sesja sprzedażowa koni',
      description: 'Zadbam o to, by Twój koń prezentował się jak najlepiej! Sesja podkreślająca sylwetkę, ruch i charakter konia – idealna do ogłoszeń sprzedażowych i katalogów hodowlanych.',
      images: [
        'https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?w=800&q=80',
        'https://images.unsplash.com/photo-1553284965-83fd3e82fa5a?w=800&q=80',
        'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&q=80',
        'https://images.unsplash.com/photo-1544966503-7cc5ac882d5b?w=800&q=80'
      ],
      reverse: true
    },
    {
      id: 'psy',
      title: 'Sesja z psami',
      description: 'Naturalne, pełne czułości kadry ukazujące charakter i osobowość Twojego psa. W plenerze lub w domu – dla właścicieli, którzy chcą mieć piękną pamiątkę ze swoim pupilem.',
      images: [
        'https://images.unsplash.com/photo-1552053831-71594a27632d?w=800&q=80',
        'https://images.unsplash.com/photo-1583337130417-3346a1be7dee?w=800&q=80',
        'https://images.unsplash.com/photo-1574158622682-e40e69881006?w=800&q=80',
        'https://images.unsplash.com/photo-1596854407944-bf87f6fdd49e?w=800&q=80'
      ],
      reverse: false
    }
  ];

  // Automatyczne przełączanie slajdów
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex(prev => {
        const newIndex = { ...prev };
        services.forEach(service => {
          newIndex[service.id] = (prev[service.id] + 1) % service.images.length;
        });
        return newIndex;
      });
    }, 4000); // zmiana co 4 sekundy

    return () => clearInterval(interval);
  }, [services]);

  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      
      <div className="pt-24 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16 animate-fade-in">
            <h1 className="text-4xl md:text-6xl font-playfair font-bold text-gray-900 mb-6">
              Usługi
            </h1>
            <p className="text-lg text-gray-600 font-inter max-w-2xl mx-auto">
              Profesjonalne usługi fotograficzne dostosowane do Twoich potrzeb. 
              Specjalizuję się w fotografii ludzi i zwierząt z pasją i zaangażowaniem.
            </p>
          </div>

          {/* Sekcje usług */}
          <div className="space-y-24">
            {services.map((service, index) => (
              <div
                key={service.id}
                className={`grid grid-cols-1 lg:grid-cols-2 gap-12 items-center animate-fade-in ${
                  service.reverse ? 'lg:grid-flow-col-dense' : ''
                }`}
                style={{ animationDelay: `${index * 0.2}s` }}
              >
                {/* Zdjęcia - slideshow */}
                <div className={`relative overflow-hidden rounded-2xl shadow-2xl h-96 lg:h-[500px] ${
                  service.reverse ? 'lg:col-start-2' : ''
                }`}>
                  {service.images.map((image, imageIndex) => (
                    <img
                      key={imageIndex}
                      src={image}
                      alt={`${service.title} ${imageIndex + 1}`}
                      className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${
                        imageIndex === currentImageIndex[service.id] ? 'opacity-100' : 'opacity-0'
                      }`}
                    />
                  ))}
                  
                  {/* Gradient overlay dla lepszej czytelności */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                  
                  {/* Wskaźniki slajdów */}
                  <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
                    {service.images.map((_, dotIndex) => (
                      <div
                        key={dotIndex}
                        className={`w-2 h-2 rounded-full transition-all duration-300 ${
                          dotIndex === currentImageIndex[service.id] 
                            ? 'bg-white scale-125' 
                            : 'bg-white/50'
                        }`}
                      />
                    ))}
                  </div>
                </div>

                {/* Opis */}
                <div className={`space-y-6 ${service.reverse ? 'lg:col-start-1 lg:row-start-1' : ''}`}>
                  <h2 className="text-3xl md:text-4xl font-playfair font-bold text-gray-900">
                    {service.title}
                  </h2>
                  <p className="text-lg text-gray-600 font-inter leading-relaxed">
                    {service.description}
                  </p>
                  
                  {/* Cena */}
                  <div className="bg-gray-50 rounded-xl p-6 border-l-4 border-gray-900">
                    <div className="flex items-center justify-between">
                      <span className="text-2xl font-playfair font-bold text-gray-900">
                        {service.id === 'fotoreportaz' && 'Na zapytanie'}
                        {service.id === 'kon' && '150 zł'}
                        {service.id === 'produktowa' && 'Od 300 zł'}
                        {service.id === 'sprzedaz' && 'Od 250 zł'}
                        {service.id === 'psy' && 'Od 150 zł'}
                      </span>
                      <span className="text-sm text-gray-500 font-inter">za sesję</span>
                    </div>
                  </div>
                  
                  <button className="bg-gray-900 text-white px-8 py-3 rounded-lg font-inter font-medium hover:bg-gray-800 transition-colors duration-200 transform hover:scale-105">
                    Umów sesję
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Sekcja CTA */}
          <div className="mt-24 bg-gray-900 text-white rounded-2xl p-8 md:p-12 text-center">
            <h2 className="text-3xl md:text-4xl font-playfair font-bold mb-6">
              Gotowy na wyjątkową sesję?
            </h2>
            <p className="text-lg font-inter mb-8 max-w-3xl mx-auto opacity-90">
              Każda sesja jest dostosowana do indywidualnych potrzeb klienta. 
              Przed każdą sesją przeprowadzam konsultację, aby zrozumieć Twoje oczekiwania 
              i stworzyć wyjątkowe zdjęcia.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-white text-gray-900 px-8 py-3 rounded-lg font-inter font-medium hover:bg-gray-100 transition-colors duration-200">
                Umów sesję
              </button>
              <button className="border-2 border-white text-white px-8 py-3 rounded-lg font-inter font-medium hover:bg-white hover:text-gray-900 transition-all duration-200">
                Skontaktuj się
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Services;