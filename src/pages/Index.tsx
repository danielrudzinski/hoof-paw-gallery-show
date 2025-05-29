import Navigation from '../components/Navigation';
import Slideshow from '../components/Slideshow';
import { Link } from 'react-router-dom';

const Index = () => {
  return (
    <div className="relative h-screen overflow-hidden">
      <Navigation />
      
      {/* Background Slideshow - Full Screen */}
      <Slideshow />
      
      {/* Main Content */}
      <div className="relative z-10 h-full flex items-center justify-center">
        <div className="text-center text-white animate-fade-in">
          <h1 className="text-6xl md:text-8xl font-playfair font-bold mb-6 tracking-wide">
            Wiktoria Putz
          </h1>
          <p className="text-xl md:text-2xl font-inter font-light tracking-wider opacity-90 mb-12">
            Fotografia Ludzi i Zwierząt
          </p>

          {/* CTA Button */}
          <Link
            to="/portfolio"
            className="inline-block bg-white/10 backdrop-blur-md border border-white/20 text-white px-8 py-4 rounded-lg font-inter font-medium text-lg hover:bg-white/20 hover:border-white/30 transition-all duration-300 transform hover:scale-105 shadow-lg"
          >
            Zobacz Portfolio
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Index;