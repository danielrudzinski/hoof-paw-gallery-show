import { useState, useEffect } from 'react';
import Navigation from '../components/Navigation';
import { Link } from 'react-router-dom';

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
        '/jezdziectwo/jazda1.jpg',
        '/jezdziectwo/jazda2.jpg',
        '/jezdziectwo/jazda7.jpg',
        '/jezdziectwo/jazda8.jpg',
        '/jezdziectwo/jazda10.jpg',
        '/jezdziectwo/jazda6.jpg',
        '/jezdziectwo/jazda12.png',
        '/jezdziectwo/jazda13.png',
      ],
      reverse: false
    },
    {
      id: 'kon',
      title: 'Sesja z koniem',
      description: 'Wyjątkowa sesja ukazująca więź człowieka z koniem. Plenerowe zdjęcia pełne emocji, bliskości i elegancji. Doskonała pamiątka dla każdego miłośnika koni.',
      images: [
        '/konie/kon1.png',
        '/konie/kon4.png',
        '/konie/kon3.png',
        '/konie/kon5.png',
        '/konie/kon6.png',
        '/konie/kon7.png',
        '/konie/kon8.jpeg',
        '/konie/kon9.png',
        '/konie/kon10.png',
        '/konie/kon11.png',
        '/konie/kon19.png'
      ],
      reverse: true
    },
    {
      id: 'produktowa',
      title: 'Sesja produktowa',
      description: 'Profesjonalne zdjęcia Twoich produktów – estetyczne, spójne i dopasowane do marki. Idealne do sklepu internetowego, social mediów i materiałów reklamowych.',
      images: [
        '/konie/kon17.png',
        '/konie/kon2.jpg',
        '/konie/kon18.png',
        '/koty/kot1.png',
        '/psy/bulldog.jpeg',
        '/psy/dog2.jpg',
        '/psy/dog3.jpg',
        '/psy/dog5.png'
      ],
      reverse: false
    },
    {
      id: 'sprzedaz',
      title: 'Sesja sprzedażowa koni',
      description: 'Zadbam o to, by Twój koń prezentował się jak najlepiej! Sesja podkreślająca sylwetkę, ruch i charakter konia – idealna do ogłoszeń sprzedażowych i katalogów hodowlanych.',
      images: [
        '/konie/kon16.png',
        '/konie/kon17.png',
        '/konie/kon18.png',
        '/konie/kon19.png',
        '/konie/kon20.png',
        '/konie/kon21.png'
      ],
      reverse: true
    },
    {
      id: 'psy',
      title: 'Sesja z psami',
      description: 'Naturalne, pełne czułości kadry ukazujące charakter i osobowość Twojego psa. W plenerze lub w domu – dla właścicieli, którzy chcą mieć piękną pamiątkę ze swoim pupilem.',
      images: [
        '/psy/bulldog.jpeg',
        '/psy/dog.png',
        '/psy/dog2.jpg',
        '/psy/dog3.jpg',
        '/psy/dog4.jpeg',
        '/psy/dog5.png'
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
                  
              <Link 
                to="/kontakt" 
                className="bg-gray-900 text-white px-8 py-3 rounded-lg font-inter font-medium hover:bg-gray-800 transition-colors duration-200 transform hover:scale-105 inline-block text-center"
              >
                Umów sesję
              </Link>
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
              <Link 
                to="/kontakt" 
                className="bg-white text-gray-900 px-8 py-3 rounded-lg font-inter font-medium hover:bg-gray-100 transition-colors duration-200 inline-block text-center"
              >
                Umów sesję
              </Link>
              <Link 
                to="/kontakt" 
                className="border-2 border-white text-white px-8 py-3 rounded-lg font-inter font-medium hover:bg-white hover:text-gray-900 transition-all duration-200 inline-block text-center"
              >
                Skontaktuj się
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Services;