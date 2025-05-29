import React from 'react';
import Portfolio from '@/components/Portfolio';

const PortfolioZwierzeta = () => {
  const animalImages = [
    '/psy/bulldog.webp',
    '/psy/dog2.webp',
    '/koty/kot1.webp',
    '/psy/dog.webp',
    '/psy/dog3.webp',
    '/psy/dog4.webp',
    '/psy/dog5.webp',
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