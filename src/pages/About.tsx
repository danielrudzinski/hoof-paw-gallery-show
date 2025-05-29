
import Navigation from '../components/Navigation';
import { Camera, Award, Heart } from 'lucide-react';

const About = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      
      <div className="pt-24 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16 animate-fade-in">
            <h1 className="text-4xl md:text-6xl font-playfair font-bold text-gray-900 mb-6">
              O mnie
            </h1>
            <p className="text-lg text-gray-600 font-inter">
              Poznaj historię i pasję, która kryje się za obiektywem
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
            <div className="animate-fade-in">
              <img
                src="zdjeciezaparatem.jpg"
                alt="Fotograf z aparatem"
                className="w-full h-96 object-cover rounded-2xl shadow-lg"
              />
            </div>
            
            <div className="animate-fade-in">
              <h2 className="text-3xl font-playfair font-semibold text-gray-900 mb-6">
                Cześć, jestem fotografem specjalizującym się w fotografii ludzi i zwierząt
              </h2>
              <p className="text-gray-600 font-inter mb-6 leading-relaxed">
                Od ponad 8 lat dokumentuję najpiękniejsze momenty w życiu ludzi i ich 
                czworonożnych przyjaciół. Moja pasja do fotografii rozpoczęła się podczas 
                studiów, kiedy po raz pierwszy złapałem za aparat i odkryłem magię 
                uwieczniania emocji i chwil.
              </p>
              <p className="text-gray-600 font-inter leading-relaxed">
                Wierzę, że każda sesja jest wyjątkowa i wymaga indywidualnego podejścia. 
                Moim celem jest stworzenie atmosfery, w której zarówno ludzie, jak i zwierzęta 
                czują się komfortowo i naturalnie.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            <div className="bg-white rounded-2xl p-8 text-center shadow-lg animate-fade-in">
              <Camera className="h-12 w-12 text-gray-900 mx-auto mb-4" />
              <h3 className="text-xl font-playfair font-semibold text-gray-900 mb-2">
                Doświadczenie
              </h3>
              <p className="text-gray-600 font-inter">
                Ponad 8 lat w branży fotograficznej
              </p>
            </div>
            
            <div className="bg-white rounded-2xl p-8 text-center shadow-lg animate-fade-in">
              <Award className="h-12 w-12 text-gray-900 mx-auto mb-4" />
              <h3 className="text-xl font-playfair font-semibold text-gray-900 mb-2">
                Certyfikaty
              </h3>
              <p className="text-gray-600 font-inter">
                Certyfikowany fotografik portretowy
              </p>
            </div>
            
            <div className="bg-white rounded-2xl p-8 text-center shadow-lg animate-fade-in">
              <Heart className="h-12 w-12 text-gray-900 mx-auto mb-4" />
              <h3 className="text-xl font-playfair font-semibold text-gray-900 mb-2">
                Pasja
              </h3>
              <p className="text-gray-600 font-inter">
                Miłość do zwierząt i fotografii
              </p>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-8 md:p-12 shadow-lg animate-fade-in">
            <h2 className="text-3xl font-playfair font-semibold text-gray-900 mb-6 text-center">
              Moja Filozofia
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h4 className="text-xl font-playfair font-semibold text-gray-900 mb-3">
                  Naturalność
                </h4>
                <p className="text-gray-600 font-inter">
                  Najpiękniejsze zdjęcia powstają, gdy modele czują się swobodnie. 
                  Staram się tworzyć atmosferę pełną spokoju i zaufania.
                </p>
              </div>
              <div>
                <h4 className="text-xl font-playfair font-semibold text-gray-900 mb-3">
                  Emocje
                </h4>
                <p className="text-gray-600 font-inter">
                  Każde zdjęcie powinno opowiadać historię i wzbudzać emocje. 
                  To właśnie czyni fotografię wyjątkową.
                </p>
              </div>
              <div>
                <h4 className="text-xl font-playfair font-semibold text-gray-900 mb-3">
                  Cierpliwość
                </h4>
                <p className="text-gray-600 font-inter">
                  Praca ze zwierzętami wymaga szczególnej cierpliwości i zrozumienia 
                  ich naturalnych zachowań.
                </p>
              </div>
              <div>
                <h4 className="text-xl font-playfair font-semibold text-gray-900 mb-3">
                  Jakość
                </h4>
                <p className="text-gray-600 font-inter">
                  Używam profesjonalnego sprzętu i nowoczesnych technik obróbki, 
                  aby zapewnić najwyższą jakość zdjęć.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
