import { useState, useEffect } from 'react';
import Navigation from '../components/Navigation';
import Slideshow from '../components/Slideshow';
import { Link } from 'react-router-dom';

const Index = () => {
  const testimonials = [
    {
      name: "Karolina",
      text: "Serdecznie polecam! Sesja w przemiłej atmosferze, a zdjęcia to magia."
    },
    {
      name: "Sylwia",
      text: "Super zdjęcia i profesjonalizm. Wspaniałe ujęcia w przemiłej atmosferze!"
    },
    {
      name: "Asia",
      text: "Polecam Wiktorię! Robi super fotki z treningów i zawodów. Kontaktowa i przesympatyczna."
    },
    {
      name: "Monika",
      text: "Cudowne zdjęcia i bardzo szybka realizacja. Polecam gorąco!"
    },
    {
      name: "Szukała Team",
      text: "Piękne zdjęcia, profesjonalne sesje, miła atmosfera. Dobrze uchwycone konie w skoku! Polecamy całym sercem."
    },
    {
      name: "Julia",
      text: "Sesja z koniem przebiegła profesjonalnie. Zdjęcia dostałam tego samego dnia! Jestem zachwycona, na pewno wrócę."
    }
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => 
        prevIndex === testimonials.length - 1 ? 0 : prevIndex + 1
      );
    }, 4000);

    return () => clearInterval(interval);
  }, [testimonials.length]);
  return (
    <div className="relative w-full">
      {/* Main Hero Section */}
      <div className="relative w-full h-screen overflow-hidden">
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

      {/* Testimonials Section */}
      <div className="relative w-full py-20 bg-black">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <div className="mb-16">
            <h2 className="text-2xl md:text-3xl font-playfair font-light text-white mb-2 tracking-wide">
              Opinie
            </h2>
            <div className="w-12 h-px bg-white/30 mx-auto"></div>
          </div>
          
          {/* Minimalist Testimonials Slideshow */}
          <div className="relative">
            <div className="overflow-hidden">
              <div 
                className="flex transition-transform duration-700 ease-out"
                style={{ transform: `translateX(-${currentIndex * 100}%)` }}
              >
                {testimonials.map((testimonial, index) => (
                  <div key={index} className="w-full flex-shrink-0 px-4">
                    <div className="max-w-2xl mx-auto">
                      {/* 5 Stars */}
                      <div className="flex justify-center mb-6">
                        {[...Array(5)].map((_, starIndex) => (
                          <svg
                            key={starIndex}
                            className="w-5 h-5 text-white/80 mx-1"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                        ))}
                      </div>
                      
                      <p className="text-white/90 text-lg md:text-xl font-inter font-light mb-8 leading-relaxed tracking-wide">
                        "{testimonial.text}"
                      </p>
                      <p className="text-white/60 font-playfair text-sm tracking-widest uppercase">
                        {testimonial.name}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Minimal Dots */}
            <div className="flex justify-center mt-12 space-x-3">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${
                    index === currentIndex 
                      ? 'bg-white/80' 
                      : 'bg-white/20 hover:bg-white/40'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;