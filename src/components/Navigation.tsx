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

  // Different styles for homepage vs other pages
  const navStyle = isHomePage 
    ? "fixed top-0 left-0 w-full z-50 bg-transparent backdrop-blur-sm"
    : "fixed top-0 left-0 w-full z-50 bg-white/95 backdrop-blur-md border-b border-gray-200";

  const logoStyle = isHomePage
    ? "text-2xl font-playfair font-bold text-white hover:text-white/80 transition-colors"
    : "text-2xl font-playfair font-bold text-gray-900 hover:text-gray-700 transition-colors";

  const linkActiveStyle = isHomePage
    ? 'text-white border-b-2 border-white'
    : 'text-gray-900 border-b-2 border-gray-900';

  const linkInactiveStyle = isHomePage
    ? 'text-white/80 hover:text-white'
    : 'text-gray-600 hover:text-gray-900';

  const mobileButtonStyle = isHomePage
    ? "text-white/80 hover:text-white transition-colors"
    : "text-gray-600 hover:text-gray-900 transition-colors";

  return (
    <nav className={navStyle} role="navigation" aria-label="Nawigacja główna">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-6">
          {/* Logo */}
          <Link 
            to="/" 
            className={logoStyle}
            aria-label="Wiktoria Putz Photography - Strona główna"
          >
            <h1 className="text-2xl font-playfair font-bold">Wiktoria Putz</h1>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex space-x-8" role="menubar">
            {navItems.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                className={`font-inter text-sm font-medium transition-colors duration-200 ${
                  isActive(item.path)
                    ? linkActiveStyle
                    : linkInactiveStyle
                }`}
                aria-label={item.ariaLabel}
                aria-current={isActive(item.path) ? 'page' : undefined}
                role="menuitem"
              >
                {item.name}
              </Link>
            ))}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className={mobileButtonStyle}
              aria-expanded={isOpen}
              aria-controls="mobile-menu"
              aria-label={isOpen ? "Zamknij menu" : "Otwórz menu"}
            >
              {isOpen ? <X size={24} aria-hidden="true" /> : <Menu size={24} aria-hidden="true" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div 
            id="mobile-menu"
            className={`md:hidden pb-4 mx-4 ${isHomePage ? 'bg-black/50 backdrop-blur-md rounded-lg' : 'bg-white/95 backdrop-blur-md rounded-lg border border-gray-200'}`}
            role="menu"
            aria-label="Menu mobilne"
          >
            <div className="flex flex-col space-y-3 p-4">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  to={item.path}
                  onClick={() => setIsOpen(false)}
                  className={`font-inter text-sm font-medium transition-colors duration-200 ${
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