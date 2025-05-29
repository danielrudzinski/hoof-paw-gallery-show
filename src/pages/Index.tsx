
import Navigation from '../components/Navigation';
import Slideshow from '../components/Slideshow';

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
            Hoof & Paw
          </h1>
          <p className="text-xl md:text-2xl font-inter font-light tracking-wider opacity-90">
            Fotografia Ludzi i Zwierząt
          </p>
        </div>
      </div>
    </div>
  );
};

export default Index;
