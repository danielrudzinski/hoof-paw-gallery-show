
import { useState, useEffect } from 'react';

const Slideshow = () => {
  const images = [
    'https://images.unsplash.com/photo-1649972904349-6e44c42644a7?w=1920&q=80',
    'https://images.unsplash.com/photo-1582562124811-c09040d0a901?w=1920&q=80',
    'https://images.unsplash.com/photo-1517022812141-23620dba5c23?w=1920&q=80',
    'https://images.unsplash.com/photo-1466721591366-2d5fba72006d?w=1920&q=80',
    'https://images.unsplash.com/photo-1535268647677-300dbf3d78d1?w=1920&q=80',
    'https://images.unsplash.com/photo-1439886183900-e79ec0057170?w=1920&q=80',
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
