import { Camera, Mail, Phone, MapPin, Facebook, Instagram } from 'lucide-react';
import { Link } from 'react-router-dom';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  // Structured data for organization
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "name": "Wiktoria Putz Photography",
    "description": "Profesjonalny fotograf w Bydgoszczy specjalizujący się w fotografii ludzi i zwierząt",
    "url": "https://wiktoriaputzphoto.pl",
    "telephone": "+48696919545",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Bydgoszcz",
      "addressRegion": "Kujawsko-Pomorskie",
      "addressCountry": "PL"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": "53.1235",
      "longitude": "18.0084"
    },
    "serviceType": ["Fotografia portretowa", "Fotografia zwierząt", "Sesje rodzinne"],
    "areaServed": "Bydgoszcz",
    "sameAs": [
      "https://www.facebook.com/profile.php?id=100064821888953&locale=pl_PL",
      "https://www.instagram.com/hoofandpawphoto/"
    ]
  };

  return (
    <footer className="bg-gray-900 text-white" role="contentinfo">
      {/* SEO Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(organizationSchema)
        }}
      />

      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Brand Section */}
          <div className="lg:col-span-1">
            <div className="flex items-center mb-2">
              <Camera className="h-6 w-6 mr-2" aria-hidden="true" />
              <h2 className="text-xl font-playfair font-bold">Wiktoria Putz</h2>
            </div>
            <p className="text-gray-300 font-inter text-sm mb-3">
              Profesjonalny fotograf w Bydgoszczy specjalizujący się w fotografii ludzi i zwierząt.
            </p>
            <div className="flex space-x-3" role="list" aria-label="Media społecznościowe">
              <a 
                href="https://www.facebook.com/profile.php?id=100064821888953&locale=pl_PL" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-gray-300 hover:text-white transition-colors"
                aria-label="Facebook - Wiktoria Putz Photography"
              >
                <Facebook className="h-8 w-8" aria-hidden="true" />
              </a>
              <a 
                href="https://www.instagram.com/hoofandpawphoto/" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-gray-300 hover:text-white transition-colors"
                aria-label="Instagram - @hoofandpawphoto"
              >
                <Instagram className="h-8 w-8" aria-hidden="true" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <nav aria-label="Linki nawigacyjne w stopce">
            <h3 className="text-base font-playfair font-semibold mb-2">Nawigacja</h3>
            <ul className="space-y-1 font-inter text-sm">
              <li>
                <Link 
                  to="/" 
                  className="text-gray-300 hover:text-white transition-colors"
                  aria-label="Przejdź do strony głównej"
                >
                  Strona główna
                </Link>
              </li>
              <li>
                <Link 
                  to="/portfolio" 
                  className="text-gray-300 hover:text-white transition-colors"
                  aria-label="Zobacz portfolio zdjęć"
                >
                  Galeria
                </Link>
              </li>
              <li>
                <Link 
                  to="/cennik" 
                  className="text-gray-300 hover:text-white transition-colors"
                  aria-label="Sprawdź cennik usług fotograficznych"
                >
                  Cennik
                </Link>
              </li>
              <li>
                <Link 
                  to="/kontakt" 
                  className="text-gray-300 hover:text-white transition-colors"
                  aria-label="Skontaktuj się z fotografem"
                >
                  Kontakt
                </Link>
              </li>
            </ul>
          </nav>

          {/* Services */}
          <div>
            <h3 className="text-base font-playfair font-semibold mb-2">Usługi</h3>
            <ul className="space-y-1 font-inter text-sm text-gray-300" role="list">
              <li>Sesje portretowe</li>
              <li>Fotografia zwierząt</li>
              <li>Sesje rodzinne</li>
              <li>Fotografia koni</li>
            </ul>
          </div>

          {/* Contact Info */}
          <address className="not-italic">
            <h3 className="text-base font-playfair font-semibold mb-2">Kontakt</h3>
            <div className="space-y-1 font-inter text-sm">
              <div className="flex items-center text-gray-300">
                <MapPin className="h-3 w-3 mr-2 flex-shrink-0" aria-hidden="true" />
                <span>Bydgoszcz</span>
              </div>
              <div className="flex items-center text-gray-300">
                <Phone className="h-3 w-3 mr-2 flex-shrink-0" aria-hidden="true" />
                <a 
                  href="tel:+48696919545" 
                  className="hover:text-white transition-colors"
                  aria-label="Zadzwoń pod numer 696 919 545"
                >
                  696 919 545
                </a>
              </div>
            </div>
          </address>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="text-gray-300 font-inter text-xs mb-2 md:mb-0">
              <p>© {currentYear} Wiktoria Putz Photography. Wszystkie prawa zastrzeżone.</p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;