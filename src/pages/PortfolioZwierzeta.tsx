import React from 'react';
import { Helmet } from 'react-helmet-async';
import Portfolio from '@/components/Portfolio';

const PortfolioZwierzeta = () => {
  const petsImages = [
    '/psy/bulldog.webp',
    '/psy/dog2.webp',
    '/koty/kot1.webp',
    '/psy/dog.webp',
    '/psy/dog3.webp',
    '/psy/dog4.webp',
    '/psy/dog5.webp',
  ];

  const petsPortfolioSchema = {
    "@context": "https://schema.org",
    "@type": "ImageGallery",
    "name": "Portfolio - Psy i Koty",
    "description": "Profesjonalne sesje fotograficzne z psami i kotami",
    "url": "https://wiktoriaputzphoto.pl/portfolio/psyikoty",
    "author": {
      "@type": "Person",
      "name": "Wiktoria Putz"
    },
    "about": ["Fotografia psów", "Fotografia kotów", "Sesje ze zwierzętami", "Portreta zwierząt"]
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
        "name": "Psy i Koty",
        "item": "https://wiktoriaputzphoto.pl/portfolio/psyikoty"
      }
    ]
  };

  return (
    <>
      <Helmet>
        <title>Portfolio Psy i Koty - Wiktoria Putz | Fotografia Psów i Kotów Bydgoszcz</title>
        <meta name="description" content="Profesjonalne sesje fotograficzne z psami i kotami. Galeria zdjęć zwierząt domowych. Naturalne portrety psów i kotów w Bydgoszczy." />
        <meta name="keywords" content="fotografia psów, fotografia kotów, sesje ze zwierzętami, portrety zwierząt, fotograf psów Bydgoszcz, zdjęcia kotów" />
        <link rel="canonical" href="https://wiktoriaputzphoto.pl/portfolio/psyikoty" />
        
        {/* Open Graph */}
        <meta property="og:title" content="Portfolio Psy i Koty - Wiktoria Putz | Fotografia Psów i Kotów Bydgoszcz" />
        <meta property="og:description" content="Profesjonalne sesje fotograficzne z psami i kotami. Galeria zdjęć zwierząt domowych." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://wiktoriaputzphoto.pl/portfolio/psyikoty" />
        <meta property="og:image" content="https://wiktoriaputzphoto.pl/psy/bulldog.webp" />
        
        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Portfolio Psy i Koty - Wiktoria Putz | Fotografia Psów i Kotów Bydgoszcz" />
        <meta name="twitter:description" content="Profesjonalne sesje fotograficzne z psami i kotami. Galeria zdjęć zwierząt domowych." />
        <meta name="twitter:image" content="https://wiktoriaputzphoto.pl/psy/bulldog.webp" />
        
        {/* Structured Data */}
        <script type="application/ld+json">
          {JSON.stringify(petsPortfolioSchema)}
        </script>
        <script type="application/ld+json">
          {JSON.stringify(breadcrumbSchema)}
        </script>
      </Helmet>

      <Portfolio
        title="Portfolio - Psy i Koty"
        description="Profesjonalne sesje fotograficzne z psami i kotami"
        images={petsImages}
        backLink="/portfolio"
        backText="Powrót do Portfolio"
      />
    </>
  );
};

export default PortfolioZwierzeta;