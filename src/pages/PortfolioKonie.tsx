import React from 'react';
import Portfolio from '@/components/Portfolio';

const PortfolioLudzie = () => {
  const peopleImages = [
        'https://images.unsplash.com/photo-1553284965-83fd3e82fa5a?w=800&q=80',
        'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&q=80',
        'https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?w=800&q=80',
        'https://images.unsplash.com/photo-1544966503-7cc5ac882d5b?w=800&q=80',
        'https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=800&q=80',
        'https://images.unsplash.com/photo-1580110465896-cc08c0aeb6af?w=800&q=80',
  ];

  return (
    <Portfolio
      title="Portfolio - Konie i Jeździectwo"
      description="Profesjonalne sesje portretowe i fotograficzne z końmi"
      images={peopleImages}
      backLink="/portfolio"
      backText="Powrót do Portfolio"
    />
  );
};

export default PortfolioLudzie;