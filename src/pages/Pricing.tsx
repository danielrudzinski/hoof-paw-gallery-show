import { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
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
        '/jezdziectwo/jazda1.webp',
        '/jezdziectwo/jazda2.webp',
        '/jezdziectwo/jazda7.webp',
        '/jezdziectwo/jazda8.webp',
        '/jezdziectwo/jazda10.webp',
        '/jezdziectwo/jazda6.webp',
        '/jezdziectwo/jazda12.webp',
        '/jezdziectwo/jazda13.webp',
      ],
      reverse: false
    },
    {
      id: 'kon',
      title: 'Sesja z koniem',
      description: 'Wyjątkowa sesja ukazująca więź człowieka z koniem. Plenerowe zdjęcia pełne emocji, bliskości i elegancji. Doskonała pamiątka dla każdego miłośnika koni.',
      images: [
        '/konie/kon1.webp',
        '/konie/kon4.webp',
        '/konie/kon3.webp',
        '/konie/kon5.webp',
        '/konie/kon6.webp',
        '/konie/kon7.webp',
        '/konie/kon8.webp',
        '/konie/kon9.webp',
        '/konie/kon10.webp',
        '/konie/kon11.webp',
        '/konie/kon19.webp'
      ],
      reverse: true
    },
    {
      id: 'produktowa',
      title: 'Sesja produktowa',
      description: 'Profesjonalne zdjęcia Twoich produktów – estetyczne, spójne i dopasowane do marki. Idealne do sklepu internetowego, social mediów i materiałów reklamowych.',
      images: [
        '/konie/kon17.webp',
        '/konie/kon2.webp',
        '/konie/kon18.webp',
        '/koty/kot1.webp',
        '/psy/bulldog.webp',
        '/psy/dog2.webp',
        '/psy/dog3.webp',
        '/psy/dog5.webp'
      ],
      reverse: false
    },
    {
      id: 'sprzedaz',
      title: 'Sesja sprzedażowa koni',
      description: 'Zadbam o to, by Twój koń prezentował się jak najlepiej! Sesja podkreślająca sylwetkę, ruch i charakter konia – idealna do ogłoszeń sprzedażowych i katalogów hodowlanych.',
      images: [
        '/konie/kon16.webp',
        '/konie/kon17.webp',
        '/konie/kon18.webp',
        '/konie/kon19.webp',
        '/konie/kon20.webp',
        '/konie/kon21.webp'
      ],
      reverse: true
    },
    {
      id: 'psy',
      title: 'Sesja z psami',
      description: 'Naturalne, pełne czułości kadry ukazujące charakter i osobowość Twojego psa. W plenerze lub w domu – dla właścicieli, którzy chcą mieć piękną pamiątkę ze swoim pupilem.',
      images: [
        '/psy/bulldog.webp',
        '/psy/dog.webp',
        '/psy/dog2.webp',
        '/psy/dog3.webp',
        '/psy/dog4.webp',
        '/psy/dog5.webp'
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

  const servicesSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": "Usługi Fotograficzne - Wiktoria Putz",
    "description": "Profesjonalne usługi fotograficzne dostosowane do Twoich potrzeb. Specjalizuję się w fotografii ludzi i zwierząt z pasją i zaangażowaniem.",
    "url": "https://wiktoriaputzphoto.pl/cennik",
    "provider": {
      "@type": "Person",
      "name": "Wiktoria Putz"
    },
    "serviceType": "Photography",
    "areaServed": {
      "@type": "City",
      "name": "Bydgoszcz"
    },
    "offers": services.map(service => ({
      "@type": "Offer",
      "name": service.title,
      "description": service.description,
      "priceCurrency": "PLN",
      "price": service.id === 'fotoreportaz' ? 'Na zapytanie' :
              service.id === 'kon' ? '150' :
              service.id === 'produktowa' ? '300+' :
              service.id === 'sprzedaz' ? '250+' :
              service.id === 'psy' ? '150+' : 'Na zapytanie'
    }))
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
        "name": "Cennik",
        "item": "https://wiktoriaputzphoto.pl/cennik"
      }
    ]
  };

  return (
    <div className="min-h-screen bg-white">
      <Helmet>
        <title>Cennik - Wiktoria Putz | Ceny Sesji Fotograficznych z Końmi i Psami</title>
        <meta name="description" content="Cennik sesji fotograficznych - fotoreportaże, sesje z końmi od 150 zł, sesje z psami, fotografia produktowa. Profesjonalne usługi fotograficzne w Bydgoszczy." />
        <meta name="keywords" content="cennik fotograf Bydgoszcz, ceny sesji zdjęciowych, sesja z koniem cena, fotografia zwierząt cennik, fotoreportaż cena" />
        <link rel="canonical" href="https://wiktoriaputzphoto.pl/cennik" />
        
        {/* Open Graph */}
        <meta property="og:title" content="Cennik - Wiktoria Putz | Ceny Sesji Fotograficznych z Końmi i Psami" />
        <meta property="og:description" content="Cennik sesji fotograficznych - fotoreportaże, sesje z końmi od 150 zł, sesje z psami, fotografia produktowa." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://wiktoriaputzphoto.pl/cennik" />
        <meta property="og:image" content="https://wiktoriaputzphoto.pl/konie/kon1.webp" />
        
        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Cennik - Wiktoria Putz | Ceny Sesji Fotograficznych z Końmi i Psami" />
        <meta name="twitter:description" content="Cennik sesji fotograficznych - fotoreportaże, sesje z końmi od 150 zł, sesje z psami, fotografia produktowa." />
        <meta name="twitter:image" content="https://wiktoriaputzphoto.pl/konie/kon1.webp" />
        
        {/* Structured Data */}
        <script type="application/ld+json">
          {JSON.stringify(servicesSchema)}
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
                        {service.id === 'kon' && 'Od 150 zł'}
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