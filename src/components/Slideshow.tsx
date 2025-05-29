
import { useState, useEffect } from 'react';

const Slideshow = () => {
  const images = [
    '/psy/bulldog.jpeg',
    '/koty/kot1.png',
    '/konie/kon1.png',
    '/konie/kon2.jpg',
    '/konie/kon5.png',
    '/konie/kon6.png',
    '/konie/kon7.png',
    '/psy/dog.png',
    '/psy/dog2.jpg',
    '/psy/dog3.jpg',
    '/psy/dog4.jpeg',
    '/psy/dog5.png',
    '/jezdziectwo/jazda1.jpg',
    '/jezdziectwo/jazda2.jpg',
    '/jezdziectwo/jazda3.png',
    '/jezdziectwo/jazda4.jpg',
    '/jezdziectwo/jazda5.png',
    '/jezdziectwo/jazda6.jpg',
    '/jezdziectwo/jazda7.jpg',
    '/jezdziectwo/jazda8.jpg',
    '/jezdziectwo/jazda9.jpg',
    '/jezdziectwo/jazda10.jpg',
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
