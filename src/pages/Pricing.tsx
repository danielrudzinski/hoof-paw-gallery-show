
import Navigation from '../components/Navigation';
import { Check } from 'lucide-react';

const Pricing = () => {
  const packages = [
    {
      name: 'Pakiet Podstawowy',
      price: '299 zł',
      duration: '1 godzina',
      features: [
        '1 godzina sesji fotograficznej',
        '10 obrobionych zdjęć',
        'Galeria online',
        'Zdjęcia w wysokiej rozdzielczości',
      ]
    },
    {
      name: 'Pakiet Standard',
      price: '499 zł',
      duration: '2 godziny',
      popular: true,
      features: [
        '2 godziny sesji fotograficznej',
        '25 obrobionych zdjęć',
        'Galeria online',
        'Zdjęcia w wysokiej rozdzielczości',
        'Podstawowa obróbka kolorystyczna',
        '1 zmiana lokalizacji',
      ]
    },
    {
      name: 'Pakiet Premium',
      price: '799 zł',
      duration: '3 godziny',
      features: [
        '3 godziny sesji fotograficznej',
        '50 obrobionych zdjęć',
        'Galeria online',
        'Zdjęcia w wysokiej rozdzielczości',
        'Zaawansowana obróbka kolorystyczna',
        '2 zmiany lokalizacji',
        'Konsultacja przed sesją',
        'USB z wszystkimi zdjęciami',
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      
      <div className="pt-24 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16 animate-fade-in">
            <h1 className="text-4xl md:text-6xl font-playfair font-bold text-gray-900 mb-6">
              Cennik
            </h1>
            <p className="text-lg text-gray-600 font-inter max-w-2xl mx-auto">
              Wybierz pakiet idealnie dopasowany do Twoich potrzeb i budżetu.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {packages.map((pkg, index) => (
              <div
                key={index}
                className={`relative bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 animate-fade-in ${
                  pkg.popular ? 'ring-2 ring-gray-900 scale-105' : ''
                }`}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                {pkg.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <span className="bg-gray-900 text-white px-4 py-2 rounded-full text-sm font-inter font-medium">
                      Najpopularniejszy
                    </span>
                  </div>
                )}
                
                <div className="p-8">
                  <h3 className="text-2xl font-playfair font-semibold text-gray-900 mb-2">
                    {pkg.name}
                  </h3>
                  <div className="mb-6">
                    <span className="text-4xl font-bold text-gray-900">{pkg.price}</span>
                    <span className="text-gray-600 ml-2">/ {pkg.duration}</span>
                  </div>
                  
                  <ul className="space-y-4 mb-8">
                    {pkg.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-start">
                        <Check className="h-5 w-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                        <span className="text-gray-700 font-inter">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  
                  <button className="w-full bg-gray-900 text-white py-3 px-6 rounded-lg font-inter font-medium hover:bg-gray-800 transition-colors duration-200">
                    Wybierz pakiet
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-16 text-center">
            <p className="text-gray-600 font-inter mb-4">
              Potrzebujesz czegoś innego? Skontaktuj się ze mną!
            </p>
            <button className="bg-white text-gray-900 border-2 border-gray-900 py-3 px-8 rounded-lg font-inter font-medium hover:bg-gray-900 hover:text-white transition-all duration-200">
              Kontakt
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Pricing;
