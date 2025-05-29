import React from 'react';
import Portfolio from '@/components/Portfolio';

const PortfolioKonie = () => {
  const peopleHorses = [
      '/konie/kon1.png',
      '/konie/kon2.jpg',
      '/konie/kon3.png',
      '/konie/kon4.png',
      '/konie/kon5.png',
      '/konie/kon6.png',
      '/konie/kon7.png',
      '/konie/kon8.jpeg',
      '/jezdziectwo/jazda1.jpg',
      '/jezdziectwo/jazda2.jpg',
      '/jezdziectwo/jazda3.png',
      '/jezdziectwo/jazda4.jpg',
      '/jezdziectwo/jazda5.png',
  ];

  return (
    <Portfolio
      title="Portfolio - Konie i Jeździectwo"
      description="Profesjonalne sesje portretowe i fotograficzne z końmi"
      images={peopleHorses}
      backLink="/portfolio"
      backText="Powrót do Portfolio"
    />
  );
};

export default PortfolioKonie;