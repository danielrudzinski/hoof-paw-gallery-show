import { Camera, Mail, Phone, MapPin, Facebook, Instagram } from 'lucide-react';
import { Link } from 'react-router-dom';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-white">
      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Brand Section */}
          <div className="lg:col-span-1">
            <div className="flex items-center mb-2">
              <Camera className="h-6 w-6 mr-2" />
              <h3 className="text-xl font-playfair font-bold">Wiktoria Putz</h3>
            </div>
            <p className="text-gray-300 font-inter text-sm mb-3">
              Profesjonalny fotograf w Bydgoszczy specjalizujący się w fotografii ludzi i zwierząt.
            </p>
            <div className="flex space-x-3">
              <a href="#" className="text-gray-300 hover:text-white transition-colors">
                <Facebook className="h-4 w-4" />
              </a>
              <a href="#" className="text-gray-300 hover:text-white transition-colors">
                <Instagram className="h-4 w-4" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-base font-playfair font-semibold mb-2">Nawigacja</h4>
            <ul className="space-y-1 font-inter text-sm">
              <li>
                <Link to="/" className="text-gray-300 hover:text-white transition-colors">
                  Strona główna
                </Link>
              </li>
              <li>
                <Link to="/portfolio" className="text-gray-300 hover:text-white transition-colors">
                  Galeria
                </Link>
              </li>
              <li>
                <Link to="/cennik" className="text-gray-300 hover:text-white transition-colors">
                  Cennik
                </Link>
              </li>
              <li>
                <Link to="/oferta" className="text-gray-300 hover:text-white transition-colors">
                  Kontakt
                </Link>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-base font-playfair font-semibold mb-2">Usługi</h4>
            <ul className="space-y-1 font-inter text-sm text-gray-300">
              <li>Sesje portretowe</li>
              <li>Fotografia zwierząt</li>
              <li>Sesje rodzinne</li>
              <li>Fotografia koni</li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-base font-playfair font-semibold mb-2">Kontakt</h4>
            <div className="space-y-1 font-inter text-sm">
              <div className="flex items-center text-gray-300">
                <MapPin className="h-3 w-3 mr-2 flex-shrink-0" />
                <span>Bydgoszcz</span>
              </div>
              <div className="flex items-center text-gray-300">
                <Phone className="h-3 w-3 mr-2 flex-shrink-0" />
                <a href="tel:+48123456789" className="hover:text-white transition-colors">
                  +48 123 456 789
                </a>
              </div>
              <div className="flex items-center text-gray-300">
                <Mail className="h-3 w-3 mr-2 flex-shrink-0" />
                <a href="mailto:kontakt@wiktoriaputz.pl" className="hover:text-white transition-colors">
                  kontakt@wiktoriaputz.pl
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="text-gray-300 font-inter text-xs mb-2 md:mb-0">
              © {currentYear} Wiktoria Putz Photography. Wszystkie prawa zastrzeżone.
            </div>
            <div className="flex space-x-4 text-xs font-inter">
              <a href="/" className="text-gray-300 hover:text-white transition-colors">
                Polityka prywatności
              </a>
              <a href="/" className="text-gray-300 hover:text-white transition-colors">
                Regulamin
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* SEO Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "ProfessionalService",
            "name": "Wiktoria Putz Photography",
            "description": "Profesjonalny fotograf w Bydgoszczy specjalizujący się w fotografii ludzi i zwierząt",
            "url": "https://your-domain.com",
            "telephone": "+48123456789",
            "email": "kontakt@wiktoriaputz.pl",
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
            "areaServed": "Bydgoszcz"
          })
        }}
      />
    </footer>
  );
};

export default Footer;