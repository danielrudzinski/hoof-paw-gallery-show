
import { useState, useEffect } from 'react';

const Slideshow = () => {
  const images = [
    '/psy/bulldog.webp',
    '/koty/kot1.webp',
    '/konie/kon1.webp',
    '/konie/kon2.webp',
    '/konie/kon5.webp',
    '/konie/kon6.webp',
    '/konie/kon7.webp',
    '/psy/dog.webp',
    '/psy/dog2.webp',
    '/psy/dog3.webp',
    '/psy/dog4.webp',
    '/psy/dog5.webp',
    '/jezdziectwo/jazda1.webp',
    '/jezdziectwo/jazda2.webp',
    '/jezdziectwo/jazda3.webp',
    '/jezdziectwo/jazda4.webp',
    '/jezdziectwo/jazda5.webp',
    '/jezdziectwo/jazda6.webp',
    '/jezdziectwo/jazda7.webp',
    '/jezdziectwo/jazda8.webp',
    '/jezdziectwo/jazda9.webp',
    '/jezdziectwo/jazda10.webp',
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
