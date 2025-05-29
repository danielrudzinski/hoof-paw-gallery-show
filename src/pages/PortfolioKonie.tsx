import React from 'react';
import Portfolio from '@/components/Portfolio';

const PortfolioKonie = () => {
  const peopleHorses = [
      '/konie/kon1.webp',
      '/konie/kon2.webp',
      '/konie/kon3.webp',
      '/konie/kon4.webp',
      '/konie/kon5.webp',
      '/konie/kon6.webp',
      '/konie/kon7.webp',
      '/konie/kon8.webp',
      '/jezdziectwo/jazda1.webp',
      '/jezdziectwo/jazda2.webp',
      '/jezdziectwo/jazda3.webp',
      '/jezdziectwo/jazda4.webp',
      '/jezdziectwo/jazda5.webp',
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