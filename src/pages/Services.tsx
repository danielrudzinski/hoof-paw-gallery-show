import { Helmet } from 'react-helmet-async';
import Navigation from '../components/Navigation';
import { Phone, Instagram, Facebook, Camera, Heart } from 'lucide-react';

const Contact = () => {
  const contactMethods = [
      {
      icon: <Phone className="h-12 w-12" />,
      title: 'Telefon',
      description: 'Zadzwoń lub napisz SMS, aby umówić sesję lub zadać pytania.',
      contact: '696 919 545',
      link: 'tel:696919545',
      action: 'Zadzwoń'
    },
    {
      icon: <Instagram className="h-12 w-12" />,
      title: 'Instagram',
      description: 'Śledź moje najnowsze prace i kulisy sesji na Instagramie.',
      contact: '@hoofandpawphoto',
      link: 'https://www.instagram.com/hoofandpawphoto/',
      action: 'Obserwuj'
    },
    {
      icon: <Facebook className="h-12 w-12" />,
      title: 'Facebook',
      description: 'Dołącz do społeczności miłośników fotografii na Facebooku.',
      contact: 'Hoof and Paw Photo',
      link: 'https://www.facebook.com/profile.php?id=100064821888953&locale=pl_PL',
      action: 'Polub'
    }
  ];

  const contactSchema = {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    "name": "Kontakt - Wiktoria Putz Photography",
    "description": "Skontaktuj się ze mną, aby umówić sesję lub zadać pytania. Chętnie porozmawiam o Twoich potrzebach i pomysłach.",
    "url": "https://wiktoriaputzphoto.pl/kontakt",
    "mainEntity": {
      "@type": "Person",
      "name": "Wiktoria Putz",
      "telephone": "+48696919545",
      "sameAs": [
        "https://www.instagram.com/hoofandpawphoto/",
        "https://www.facebook.com/profile.php?id=100064821888953&locale=pl_PL"
      ]
    }
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
        "name": "Kontakt",
        "item": "https://wiktoriaputzphoto.pl/kontakt"
      }
    ]
  };

  return (
    <div className="min-h-screen bg-white">
      <Helmet>
        <title>Kontakt - Wiktoria Putz | Umów Sesję Zdjęciową w Bydgoszczy</title>
        <meta name="description" content="Skontaktuj się ze mną, aby umówić sesję lub zadać pytania. Telefon: 696 919 545. Profesjonalne sesje zdjęciowe w Bydgoszczy i okolicach." />
        <meta name="keywords" content="kontakt fotograf Bydgoszcz, umów sesję zdjęciową, telefon fotograf, sesje zwierząt kontakt, Wiktoria Putz telefon" />
        <link rel="canonical" href="https://wiktoriaputzphoto.pl/kontakt" />
        
        {/* Open Graph */}
        <meta property="og:title" content="Kontakt - Wiktoria Putz | Umów Sesję Zdjęciową w Bydgoszczy" />
        <meta property="og:description" content="Skontaktuj się ze mną, aby umówić sesję lub zadać pytania. Telefon: 696 919 545." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://wiktoriaputzphoto.pl/kontakt" />
        <meta property="og:image" content="https://wiktoriaputzphoto.pl/logo2.webp" />
        
        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Kontakt - Wiktoria Putz | Umów Sesję Zdjęciową w Bydgoszczy" />
        <meta name="twitter:description" content="Skontaktuj się ze mną, aby umówić sesję lub zadać pytania. Telefon: 696 919 545." />
        <meta name="twitter:image" content="https://wiktoriaputzphoto.pl/logo2.webp" />
        
        {/* Local Business Schema */}
        <meta name="geo.region" content="PL-KP" />
        <meta name="geo.placename" content="Bydgoszcz" />
        <meta name="geo.position" content="53.1235;18.0084" />
        <meta name="ICBM" content="53.1235, 18.0084" />
        
        {/* Structured Data */}
        <script type="application/ld+json">
          {JSON.stringify(contactSchema)}
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
              Kontakt
            </h1>
            <p className="text-lg text-gray-600 font-inter max-w-2xl mx-auto">
              Skontaktuj się ze mną, aby umówić sesję lub zadać pytania. 
              Chętnie porozmawiam o Twoich potrzebach i pomysłach.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            {contactMethods.map((method, index) => (
              <div
                key={index}
                className="bg-gray-50 rounded-2xl p-8 hover:shadow-lg transition-all duration-300 animate-fade-in group"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="text-gray-900 mb-6 group-hover:scale-110 transition-transform duration-300">
                  {method.icon}
                </div>
                
                <h3 className="text-2xl font-playfair font-semibold text-gray-900 mb-4">
                  {method.title}
                </h3>
                
                <p className="text-gray-600 font-inter mb-6">
                  {method.description}
                </p>
                
                <div className="space-y-4">
                  <p className="text-gray-800 font-inter font-medium text-lg">
                    {method.contact}
                  </p>
                  
                  <a
                    href={method.link}
                    target={method.link.startsWith('http') ? '_blank' : '_self'}
                    rel={method.link.startsWith('http') ? 'noopener noreferrer' : ''}
                    className="inline-block bg-gray-900 text-white px-6 py-3 rounded-lg font-inter font-medium hover:bg-gray-800 transition-all duration-200 transform hover:scale-105"
                  >
                    {method.action}
                  </a>
                </div>
              </div>
            ))}
          </div>

          <div className="bg-gray-900 text-white rounded-2xl p-8 md:p-12 text-center">
            <div className="flex justify-center mb-6">
              <div className="flex space-x-4">
                <Camera className="h-8 w-8 opacity-80" />
                <Heart className="h-8 w-8 opacity-80" />
              </div>
            </div>
            
            <h2 className="text-3xl md:text-4xl font-playfair font-bold mb-6">
              Gotowy na wyjątkową sesję?
            </h2>
            
            <p className="text-lg font-inter mb-8 max-w-3xl mx-auto opacity-90">
              Każda sesja jest dostosowana do indywidualnych potrzeb klienta. 
              Przed każdą sesją przeprowadzam bezpłatną konsultację, aby zrozumieć 
              Twoje oczekiwania i stworzyć wyjątkowe zdjęcia.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
              <div className="animate-fade-in" style={{ animationDelay: '0.2s' }}>
                <h4 className="text-xl font-playfair font-semibold mb-2">Konsultacja</h4>
                <p className="font-inter opacity-80">Bezpłatna rozmowa przed sesją</p>
              </div>
              <div className="animate-fade-in" style={{ animationDelay: '0.4s' }}>
                <h4 className="text-xl font-playfair font-semibold mb-2">Elastyczność</h4>
                <p className="font-inter opacity-80">Dostosowanie do Twojego harmonogramu</p>
              </div>
              <div className="animate-fade-in" style={{ animationDelay: '0.6s' }}>
                <h4 className="text-xl font-playfair font-semibold mb-2">Jakość</h4>
                <p className="font-inter opacity-80">Profesjonalny sprzęt i obróbka</p>
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
              <a
                href="https://www.instagram.com/hoofandpawphoto/"
                target="_blank"
                rel="noopener noreferrer"
                className="border-2 border-white text-white px-8 py-3 rounded-lg font-inter font-medium hover:bg-white hover:text-gray-900 transition-all duration-200 transform hover:scale-105"
              >
                Zobacz Instagram
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;