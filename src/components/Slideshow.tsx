
import { useState, useEffect } from 'react';

const Slideshow = () => {
  const images = [
    'ludziezwierzeta/kon3.png',
    'ludziezwierzeta/kon4.png',
    'ludziezwierzeta/kon9.png',
    'zwierzeta/bulldog.jpeg',
    'zwierzeta/kon1.png',
    'zwierzeta/kon2.png',
    'zwierzeta/kon5.png',
    'zwierzeta/kon6.png',
    'zwierzeta/kon7.png',
    'zwierzeta/dog.png',
  ];

  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => 
        prevIndex === images.length - 1 ? 0 : prevIndex + 1
      );
    }, 4000); // Change image every 4 seconds

    return () => clearInterval(interval);
  }, [images.length]);

  return (
    <div className="absolute inset-0 w-full h-full overflow-hidden">
      {images.map((image, index) => (
        <div
          key={index}
          className={`absolute inset-0 w-full h-full transition-opacity duration-1000 ${
            index === currentImageIndex ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <img
            src={image}
            alt={`Slide ${index + 1}`}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/30" />
        </div>
      ))}
    </div>
  );
};

export default Slideshow;
