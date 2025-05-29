import React from 'react';
import Portfolio from '@/components/Portfolio';

const PortfolioZwierzeta = () => {
  const animalImages = [
    '/psy/bulldog.jpeg',
    '/psy/dog2.jpg',
    '/koty/kot1.png',
    '/psy/dog.png',
    '/psy/dog3.jpg',
    '/psy/dog4.jpeg',
    '/psy/dog5.png',
  ];

  return (
    <Portfolio
      title="Portfolio - Psy i Koty"
      description="Profesjonalne sesje fotograficzne ze zwierzętami"
      images={animalImages}
      backLink="/portfolio"
      backText="Powrót do Portfolio"
    />
  );
};

export default PortfolioZwierzeta;