
import Navigation from '../components/Navigation';
import { Camera, Heart, Users, PawPrint } from 'lucide-react';

const Services = () => {
  const services = [
    {
      icon: <Users className="h-12 w-12" />,
      title: 'Sesje Portretowe',
      description: 'Profesjonalne sesje portretowe w studiu lub plenerze. Indywidualne podejście do każdego klienta.',
      features: ['Sesje indywidualne', 'Sesje rodzinne', 'Portrety biznesowe', 'Sesje lifestyle']
    },
    {
      icon: <PawPrint className="h-12 w-12" />,
      title: 'Fotografia Zwierząt',
      description: 'Specjalizuję się w fotografii zwierząt domowych. Uwieczniam naturalne zachowania i emocje.',
      features: ['Sesje z psami', 'Sesje z kotami', 'Inne zwierzęta domowe', 'Fotografia w naturalnym środowisku']
    },
    {
      icon: <Heart className="h-12 w-12" />,
      title: 'Sesje Specjalne',
      description: 'Wyjątkowe momenty wymagają wyjątkowego podejścia. Specjalne sesje dla ważnych wydarzeń.',
      features: ['Sesje ciążowe', 'Sesje noworodkowe', 'Rocznice', 'Urodziny zwierząt']
    },
    {
      icon: <Camera className="h-12 w-12" />,
      title: 'Eventy i Wydarzenia',
      description: 'Dokumentacja ważnych wydarzeń z udziałem ludzi i zwierząt.',
      features: ['Wystawy zwierząt', 'Wydarzenia rodzinne', 'Adopcje zwierząt', 'Imprezy tematyczne']
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      
      <div className="pt-24 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16 animate-fade-in">
            <h1 className="text-4xl md:text-6xl font-playfair font-bold text-gray-900 mb-6">
              Oferta
            </h1>
            <p className="text-lg text-gray-600 font-inter max-w-2xl mx-auto">
              Profesjonalne usługi fotograficzne dostosowane do Twoich potrzeb. 
              Specjalizuję się w fotografii ludzi i zwierząt z pasją i zaangażowaniem.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
            {services.map((service, index) => (
              <div
                key={index}
                className="bg-gray-50 rounded-2xl p-8 hover:shadow-lg transition-all duration-300 animate-fade-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="text-gray-900 mb-6">
                  {service.icon}
                </div>
                
                <h3 className="text-2xl font-playfair font-semibold text-gray-900 mb-4">
                  {service.title}
                </h3>
                
                <p className="text-gray-600 font-inter mb-6">
                  {service.description}
                </p>
                
                <ul className="space-y-2">
                  {service.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="text-gray-700 font-inter">
                      • {feature}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="bg-gray-900 text-white rounded-2xl p-8 md:p-12 text-center">
            <h2 className="text-3xl md:text-4xl font-playfair font-bold mb-6">
              Indywidualne Podejście
            </h2>
            <p className="text-lg font-inter mb-8 max-w-3xl mx-auto opacity-90">
              Każda sesja jest dostosowana do indywidualnych potrzeb klienta. 
              Przed każdą sesją przeprowadzam konsultację, aby zrozumieć Twoje oczekiwania 
              i stworzyć wyjątkowe zdjęcia.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
              <div>
                <h4 className="text-xl font-playfair font-semibold mb-2">Konsultacja</h4>
                <p className="font-inter opacity-80">Bezpłatna rozmowa przed sesją</p>
              </div>
              <div>
                <h4 className="text-xl font-playfair font-semibold mb-2">Elastyczność</h4>
                <p className="font-inter opacity-80">Dostosowanie do Twojego harmonogramu</p>
              </div>
              <div>
                <h4 className="text-xl font-playfair font-semibold mb-2">Jakość</h4>
                <p className="font-inter opacity-80">Profesjonalny sprzęt i obróbka</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Services;
