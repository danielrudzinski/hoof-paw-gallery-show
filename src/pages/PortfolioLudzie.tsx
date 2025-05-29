import React from 'react';
import Portfolio from '@/components/Portfolio';

const PortfolioLudzie = () => {
  const peopleImages = [
    '/ludzie/ppl.jpeg',
    '/ludziezwierzeta/ppl2.jpeg',
  ];

  return (
    <Portfolio
      title="Portfolio - Ludzie"
      description="Profesjonalne sesje portretowe i fotograficzne z ludźmi"
      images={peopleImages}
      backLink="/portfolio"
      backText="Powrót do Portfolio"
    />
  );
};

export default PortfolioLudzie;