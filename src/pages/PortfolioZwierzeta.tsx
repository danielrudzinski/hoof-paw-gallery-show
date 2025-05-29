import React from 'react';
import Portfolio from '@/components/Portfolio';

const PortfolioZwierzeta = () => {
  const animalImages = [
    '/zwierzeta/bulldog.jpeg',
    '/zwierzeta/kon1.png',
    '/zwierzeta/kon2.png',
    '/zwierzeta/kon5.png',
    '/zwierzeta/kon6.png',
    '/zwierzeta/kon7.png',
    '/zwierzeta/dog.png',
    '/ludziezwierzeta/kon3.png',
    '/ludziezwierzeta/kon4.png',
    '/ludziezwierzeta/kon8.jpeg',
    '/ludziezwierzeta/kon9.png',
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