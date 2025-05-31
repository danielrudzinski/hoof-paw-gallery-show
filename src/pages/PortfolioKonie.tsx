import React from 'react';
import { Helmet } from 'react-helmet-async';
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

  const horsePortfolioSchema = {
    "@context": "https://schema.org",
    "@type": "ImageGallery",
    "name": "Portfolio - Konie i Jeździectwo",
    "description": "Profesjonalne sesje portretowe i fotograficzne z końmi",
    "url": "https://wiktoriaputzphoto.pl/portfolio/konie-jezdziectwo",
    "author": {
      "@type": "Person",
      "name": "Wiktoria Putz"
    },
    "about": ["Fotografia koni", "Jeździectwo", "Skoki przez przeszkody", "Sesje z końmi"]
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Strona główna",
        "item": "https://wiktoriaputzphoto.pl"
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "Portfolio",
        "item": "https://wiktoriaputzphoto.pl/portfolio"
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": "Konie i Jeździectwo",
        "item": "https://wiktoriaputzphoto.pl/portfolio/konie-jezdziectwo"
      }
    ]
  };

  return (
    <>
      <Helmet>
        <title>Portfolio Konie i Jeździectwo - Wiktoria Putz | Fotografia Koni Bydgoszcz</title>
        <meta name="description" content="Profesjonalne sesje portretowe i fotograficzne z końmi. Galeria zdjęć koni, jeździectwo, skoki przez przeszkody. Wiktoria Putz - fotograf koni w Bydgoszczy." />
        <meta name="keywords" content="fotografia koni, sesje z końmi, jeździectwo fotografia, skoki przez przeszkody zdjęcia, portfolio koni Bydgoszcz" />
        <link rel="canonical" href="https://wiktoriaputzphoto.pl/portfolio/konie-jezdziectwo" />
        
        {/* Open Graph */}
        <meta property="og:title" content="Portfolio Konie i Jeździectwo - Wiktoria Putz | Fotografia Koni Bydgoszcz" />
        <meta property="og:description" content="Profesjonalne sesje portretowe i fotograficzne z końmi. Galeria zdjęć koni, jeździectwo, skoki przez przeszkody." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://wiktoriaputzphoto.pl/portfolio/konie-jezdziectwo" />
        <meta property="og:image" content="https://wiktoriaputzphoto.pl/konie/kon1.webp" />
        
        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Portfolio Konie i Jeździectwo - Wiktoria Putz | Fotografia Koni Bydgoszcz" />
        <meta name="twitter:description" content="Profesjonalne sesje portretowe i fotograficzne z końmi. Galeria zdjęć koni, jeździectwo, skoki przez przeszkody." />
        <meta name="twitter:image" content="https://wiktoriaputzphoto.pl/konie/kon1.webp" />
        
        {/* Structured Data */}
        <script type="application/ld+json">
          {JSON.stringify(horsePortfolioSchema)}
        </script>
        <script type="application/ld+json">
          {JSON.stringify(breadcrumbSchema)}
        </script>
      </Helmet>

      <Portfolio
        title="Portfolio - Konie i Jeździectwo"
        description="Profesjonalne sesje portretowe i fotograficzne z końmi"
        images={peopleHorses}
        backLink="/portfolio"
        backText="Powrót do Portfolio"
      />
    </>
  );
};

export default PortfolioKonie;