import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const navItems = [
    { name: 'Home', path: '/', ariaLabel: 'Strona główna' },
    { name: 'Galeria', path: '/portfolio', ariaLabel: 'Portfolio zdjęć' },
    { name: 'Oferta', path: '/cennik', ariaLabel: 'Cennik usług fotograficznych' },
    { name: 'Kontakt', path: '/kontakt', ariaLabel: 'Informacje kontaktowe' },
    { name: 'O mnie', path: '/o-mnie', ariaLabel: 'Informacje o fotografie' },
  ];

  const isActive = (path: string) => location.pathname === path;
  const isHomePage = location.pathname === '/';

  const navStyle = isHomePage 
    ? "fixed top-0 left-0 w-full z-50 bg-transparent backdrop-blur-sm"
    : "fixed top-0 left-0 w-full z-50 bg-white/95 backdrop-blur-md border-b border-gray-200";

  const logoStyle = "hover:opacity-80 transition-opacity";

  const linkActiveStyle = isHomePage
    ? 'text-white border-b-2 border-white'
    : 'text-gray-900 border-b-2 border-gray-900';

  const linkInactiveStyle = isHomePage
    ? 'text-white/80 hover:text-white'
    : 'text-gray-600 hover:text-gray-900';

  const mobileButtonStyle = isHomePage
    ? "text-white/80 hover:text-white transition-colors"
    : "text-gray-600 hover:text-gray-900 transition-colors";

  // Wybór odpowiedniego logo w zależności od strony
  const logoSrc = isHomePage ? "/logo-white.png" : "/logo-dark.png";
  const logoAlt = isHomePage ? "Wiktoria Putz Photography Logo - białe" : "Wiktoria Putz Photography Logo - ciemne";

  return (
    <nav className={navStyle} role="navigation" aria-label="Nawigacja główna">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* DESKTOP Logo - duże jak wcześniej */}
        <Link 
          to="/" 
          className={`${logoStyle} hidden md:block absolute top-1/2 left-4 transform -translate-y-1/2 z-[100]`}
          aria-label="Wiktoria Putz Photography - Strona główna"
        >
          <img 
            src={logoSrc}
            alt={logoAlt}
            className="h-60 md:h-72 lg:h-84 w-auto"
          />
        </Link>

        {/* MOBILE - cały navbar w flexbox */}
        <div className="md:hidden flex justify-between items-center py-4 h-24">
          {/* MOBILE Logo - 3x większe z overflow hidden */}
          <div className="flex-shrink-0 overflow-hidden">
            <Link 
              to="/" 
              className={`${logoStyle} block z-[100]`}
              aria-label="Wiktoria Putz Photography - Strona główna"
            >
              <img 
                src={logoSrc}
                alt={logoAlt}
                className="h-48 sm:h-56 w-auto"
              />
            </Link>
          </div>

          {/* Mobile menu button */}
          <button
            className={`p-2 flex-shrink-0 ${mobileButtonStyle}`}
            onClick={() => setIsOpen(!isOpen)}
            aria-expanded={isOpen}
            aria-controls="mobile-menu"
            aria-label={isOpen ? "Zamknij menu" : "Otwórz menu"}
          >
            {isOpen ? <X size={24} aria-hidden="true" /> : <Menu size={24} aria-hidden="true" />}
          </button>
        </div>

        {/* DESKTOP - menu po prawej jak wcześniej */}
        <div className="hidden md:flex justify-end items-center py-6">
          <div className="flex space-x-8" role="menubar">
            {navItems.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                className={`font-inter text-sm font-medium transition-colors duration-200 ${
                  isActive(item.path) ? linkActiveStyle : linkInactiveStyle
                }`}
                aria-label={item.ariaLabel}
                aria-current={isActive(item.path) ? 'page' : undefined}
                role="menuitem"
              >
                {item.name}
              </Link>
            ))}
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div 
            id="mobile-menu"
            className={`md:hidden absolute top-full left-0 right-0 mx-4 mt-2 ${isHomePage ? 'bg-black/90 backdrop-blur-md rounded-lg' : 'bg-white/95 backdrop-blur-md rounded-lg border border-gray-200'}`}
            role="menu"
            aria-label="Menu mobilne"
          >
            <div className="flex flex-col space-y-3 p-4">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  to={item.path}
                  onClick={() => setIsOpen(false)}
                  className={`font-inter text-sm font-medium transition-colors duration-200 py-2 ${
                    isActive(item.path)
                      ? (isHomePage ? 'text-white font-semibold' : 'text-gray-900 font-semibold')
                      : (isHomePage ? 'text-white/80 hover:text-white' : 'text-gray-600 hover:text-gray-900')
                  }`}
                  aria-label={item.ariaLabel}
                  aria-current={isActive(item.path) ? 'page' : undefined}
                  role="menuitem"
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;