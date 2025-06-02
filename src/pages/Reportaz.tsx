import { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import Navigation from '../components/Navigation';
import { ExternalLink, Lock, Eye } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

const Reportaz = () => {
  const [hoveredGallery, setHoveredGallery] = useState<string | null>(null);

  const reportageGalleries = [
    {
      id: 'reportaz-1',
      title: 'Mierzęcin Horse Show',
      date: '17 maja 2025',
      thumbnail: '/jezdziectwo/jazda1.webp',
      description: 'klasa mini LL do LL',
      galleryUrl: 'https://pg.mafelo.com/gallery/jzmpqzzd',
      password: '1234',
      photos: 45
    },
    {
      id: 'reportaz-2', 
      title: 'Mierzęcin Horse Show',
      date: '17 maja 2025',
      thumbnail: '/jezdziectwo/jazda2.webp',
      description: 'klasa L-C',
      galleryUrl: 'https://pg.mafelo.com/gallery/weqydang',
      password: '1234',
      photos: 38
    },
    {
      id: 'reportaz-3',
      title: 'Mierzęcin Horse Show',
      date: '18 maja 2025', 
      thumbnail: '/konie/kon1.webp',
      description: 'Klasa LL-P',
      galleryUrl: 'https://pg.mafelo.com/gallery/nedwawpz',
      password: '1234',
      photos: 52
    },
    {
      id: 'reportaz-4',
      title: 'Kwalifikacje do CSiO Sopot Young Stars 2025****',
      date: '-',
      thumbnail: '/psy/dog4.webp', 
      description: 'Zawody Ogólnopolskie Dzieci i Młodzieży, Zawody Regionalne i Towarzyskie w skokach przez przeszkody',
      galleryUrl: 'https://pg.mafelo.com/gallery/mpxyqyex',
      password: '1234',
      photos: 41
    },
  ];

  const handleGalleryClick = (galleryUrl: string) => {
    window.open(galleryUrl, '_blank', 'noopener,noreferrer');
  };

  const copyPassword = (password: string) => {
    navigator.clipboard.writeText(password).then(() => {
      toast({
        title: "Hasło skopiowane!",
        description: `Hasło "${password}" zostało skopiowane do schowka.`,
        duration: 3000,
      });
    });
  };

  const reportageSchema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "name": "Miniaturki Reportaży - Wiktoria Putz Photography",
    "description": "Galerie zdjęć z reportaży, zawodów jeździeckich, pokazów zwierząt i wydarzeń sportowych.",
    "url": "https://wiktoriaputzphoto.pl/miniaturki-reportaz",
    "author": {
      "@type": "Person", 
      "name": "Wiktoria Putz"
    },
    "about": ["Fotoreportaże", "Zawody jeździeckie", "Wydarzenia sportowe", "Pokazy zwierząt"],
    "hasPart": reportageGalleries.map(gallery => ({
      "@type": "ImageGallery",
      "name": gallery.title,
      "description": gallery.description,
      "dateCreated": gallery.date,
      "url": gallery.galleryUrl
    }))
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
        "name": "Miniaturki Reportaży",
        "item": "https://wiktoriaputzphoto.pl/miniaturki-reportaz"
      }
    ]
  };

  return (
    <div className="min-h-screen bg-white">
      <Helmet>
        <title>Miniaturki Reportaży - Wiktoria Putz | Galerie Zdjęć z Wydarzeń</title>
        <meta name="description" content="Galerie zdjęć z reportaży sportowych, zawodów jeździeckich, pokazów zwierząt. Profesjonalne fotoreportaże z wydarzeń w Bydgoszczy i okolicach." />
        <meta name="keywords" content="fotoreportaże, zawody jeździeckie zdjęcia, pokazy zwierząt fotografia, reportaż sportowy, galerie zdjęć Bydgoszcz" />
        <link rel="canonical" href="https://wiktoriaputzphoto.pl/miniaturki-reportaz" />
        
        {/* Open Graph */}
        <meta property="og:title" content="Miniaturki Reportaży - Wiktoria Putz | Galerie Zdjęć z Wydarzeń" />
        <meta property="og:description" content="Galerie zdjęć z reportaży sportowych, zawodów jeździeckich, pokazów zwierząt." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://wiktoriaputzphoto.pl/miniaturki-reportaz" />
        <meta property="og:image" content="https://wiktoriaputzphoto.pl/jezdziectwo/jazda1.webp" />
        
        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Miniaturki Reportaży - Wiktoria Putz | Galerie Zdjęć z Wydarzeń" />
        <meta name="twitter:description" content="Galerie zdjęć z reportaży sportowych, zawodów jeździeckich, pokazów zwierząt." />
        <meta name="twitter:image" content="https://wiktoriaputzphoto.pl/jezdziectwo/jazda1.webp" />
        
        {/* Structured Data */}
        <script type="application/ld+json">
          {JSON.stringify(reportageSchema)}
        </script>
        <script type="application/ld+json">
          {JSON.stringify(breadcrumbSchema)}
        </script>
      </Helmet>

      <Navigation />
      
      <div className="pt-24 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16 animate-fade-in">
            <h1 className="text-4xl md:text-6xl font-playfair font-bold text-gray-900 mb-6">
              Miniaturki Reportaży
            </h1>
            <p className="text-lg text-gray-600 font-inter max-w-2xl mx-auto">
              Galerie zdjęć z reportaży sportowych, zawodów jeździeckich i pokazów zwierząt. 
              Kliknij na miniaturkę, aby przejść do pełnej galerii.
            </p>
          </div>

          {/* Gallery Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {reportageGalleries.map((gallery, index) => (
              <article
                key={gallery.id}
                className="group bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-500 overflow-hidden animate-fade-in transform hover:-translate-y-2 cursor-pointer"
                style={{ animationDelay: `${index * 0.1}s` }}
                onClick={() => handleGalleryClick(gallery.galleryUrl)}
                onMouseEnter={() => setHoveredGallery(gallery.id)}
                onMouseLeave={() => setHoveredGallery(null)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    handleGalleryClick(gallery.galleryUrl);
                  }
                }}
                aria-label={`Otwórz galerię: ${gallery.title}`}
              >
                {/* Image Container */}
                <div className="relative aspect-video overflow-hidden">
                  <img
                    src={gallery.thumbnail}
                    alt={gallery.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  
                  {/* Hover Overlay */}
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-all duration-300" />
                  
                  {/* Click Indicator */}
                  <div className={`absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-full p-2 transition-all duration-300 ${
                    hoveredGallery === gallery.id ? 'opacity-100 scale-110' : 'opacity-0 scale-100'
                  }`}>
                    <ExternalLink className="w-5 h-5 text-gray-700" />
                  </div>
                  
                  {/* Photo Count */}
                  <div className="absolute top-4 left-4 bg-black/70 backdrop-blur-sm text-white px-3 py-1 rounded-full text-sm font-inter flex items-center gap-1">
                    <Eye className="w-4 h-4" />
                    {gallery.photos} zdjęć
                  </div>
                  
                  {/* Center Click Indicator */}
                  <div className={`absolute inset-0 flex items-center justify-center transition-all duration-300 ${
                    hoveredGallery === gallery.id ? 'opacity-100' : 'opacity-0'
                  }`}>
                    <div className="bg-white/90 backdrop-blur-sm rounded-full p-4 transform scale-75 group-hover:scale-100 transition-transform duration-300">
                      <ExternalLink className="w-8 h-8 text-gray-700" />
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h2 className="text-xl font-playfair font-bold text-gray-900 mb-1 group-hover:text-gray-700 transition-colors">
                        {gallery.title}
                      </h2>
                      <p className="text-sm text-gray-500 font-inter">
                        {gallery.date}
                      </p>
                    </div>
                  </div>
                  
                  <p className="text-gray-600 font-inter mb-4 leading-relaxed">
                    {gallery.description}
                  </p>
                  
                  {/* Password Section */}
                  <div className="bg-gray-50 rounded-lg p-4 border-l-4 border-gray-300">
                    <div className="flex items-center gap-2 mb-2">
                      <Lock className="w-4 h-4 text-gray-600" />
                      <span className="text-sm font-medium text-gray-700 font-inter">
                        Hasło do galerii:
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <code className="bg-white px-3 py-1 rounded border text-gray-800 font-mono text-sm">
                        {gallery.password}
                      </code>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          copyPassword(gallery.password);
                        }}
                        className="text-xs text-gray-600 hover:text-gray-800 font-inter underline"
                        aria-label={`Skopiuj hasło ${gallery.password}`}
                      >
                        Kopiuj
                      </button>
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>

          {/* Info Section */}
          <div className="mt-16 bg-gray-50 rounded-2xl p-8 text-center animate-fade-in">
            <h3 className="text-2xl font-playfair font-bold text-gray-900 mb-4">
              Jak skorzystać z galerii?
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-gray-600 font-inter">
              <div>
                <div className="bg-white rounded-lg p-4 mb-3 mx-auto w-fit">
                  <ExternalLink className="w-6 h-6 text-gray-700" />
                </div>
                <p className="text-sm">
                  <strong>1. Kliknij</strong> na wybraną miniaturkę, aby przejść do galerii
                </p>
              </div>
              <div>
                <div className="bg-white rounded-lg p-4 mb-3 mx-auto w-fit">
                  <Lock className="w-6 h-6 text-gray-700" />
                </div>
                <p className="text-sm">
                  <strong>2. Użyj hasła</strong> podanego pod opisem do dostępu
                </p>
              </div>
              <div>
                <div className="bg-white rounded-lg p-4 mb-3 mx-auto w-fit">
                  <Eye className="w-6 h-6 text-gray-700" />
                </div>
                <p className="text-sm">
                  <strong>3. Przeglądaj</strong> i pobieraj swoje zdjęcia
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Reportaz;