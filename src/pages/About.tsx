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
                src="zdjeciezaparatem.webp"
                alt="Fotograf z aparatem"
                className="w-full h-96 object-cover rounded-2xl shadow-lg"
              />
            </div>
            
            <div className="animate-fade-in">
              <h2 className="text-3xl font-playfair font-semibold text-gray-900 mb-6">
                Cześć, jestem Wiktoria
              </h2>
              <p className="text-gray-600 font-inter mb-6 leading-relaxed">
                Fotografią interesuję się od najmłodszych lat – tak samo jak końmi i psami. 
                Dorastałam w przydomowej stajni hodowlanej, gdzie od zawsze towarzyszyły mi 
                zwierzęta, które nauczyły mnie cierpliwości, uważności i szacunku do ich natury.
              </p>
              <p className="text-gray-600 font-inter mb-6 leading-relaxed">
                Z wykształcenia jestem technikiem weterynarii, a prywatnie – szczęśliwą opiekunką 
                trzech kundelków. Z miłości do fotografii i zwierząt postanowiłam połączyć te dwie 
                pasje w jedno, tworząc sesje zdjęciowe, które ukazują prawdziwą więź między 
                człowiekiem a jego pupilem.
              </p>
              <p className="text-gray-600 font-inter leading-relaxed">
                Przez lata byłam również zawodniczką w skokach przez przeszkody i brałam udział 
                w licznych wydarzeniach hodowlanych. To doświadczenie pozwala mi doskonale 
                rozumieć potrzeby zarówno hodowców, jak i sportowców – wiem, na co zwracają 
                uwagę i co chcą zobaczyć na zdjęciach.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            <div className="bg-white rounded-2xl p-8 text-center shadow-lg animate-fade-in">
              <Camera className="h-12 w-12 text-gray-900 mx-auto mb-4" />
              <h3 className="text-xl font-playfair font-semibold text-gray-900 mb-2">
                Wykształcenie
              </h3>
              <p className="text-gray-600 font-inter">
                Technik weterynarii z pasją do fotografii
              </p>
            </div>
            
            <div className="bg-white rounded-2xl p-8 text-center shadow-lg animate-fade-in">
              <Award className="h-12 w-12 text-gray-900 mx-auto mb-4" />
              <h3 className="text-xl font-playfair font-semibold text-gray-900 mb-2">
                Doświadczenie
              </h3>
              <p className="text-gray-600 font-inter">
                Zawodniczka w skokach przez przeszkody
              </p>
            </div>
            
            <div className="bg-white rounded-2xl p-8 text-center shadow-lg animate-fade-in">
              <Heart className="h-12 w-12 text-gray-900 mx-auto mb-4" />
              <h3 className="text-xl font-playfair font-semibold text-gray-900 mb-2">
                Pasja
              </h3>
              <p className="text-gray-600 font-inter">
                Opiekunka trzech kundelków, miłośniczka koni
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
                  Codzienne obcowanie z końmi i psami sprawia, że praca z nimi podczas 
                  sesji jest dla mnie naturalna i bezproblemowa.
                </p>
              </div>
              <div>
                <h4 className="text-xl font-playfair font-semibold text-gray-900 mb-3">
                  Zrozumienie
                </h4>
                <p className="text-gray-600 font-inter">
                  Doświadczenie w hodowli i sporcie jeździeckim pozwala mi rozumieć 
                  potrzeby zarówno hodowców, jak i sportowców.
                </p>
              </div>
              <div>
                <h4 className="text-xl font-playfair font-semibold text-gray-900 mb-3">
                  Komfort zwierząt
                </h4>
                <p className="text-gray-600 font-inter">
                  Potrafię zbudować spokojną atmosferę, w której zwierzęta czują się 
                  swobodnie i bezpiecznie. Ich komfort stawiam na pierwszym miejscu.
                </p>
              </div>
              <div>
                <h4 className="text-xl font-playfair font-semibold text-gray-900 mb-3">
                  Autentyczność
                </h4>
                <p className="text-gray-600 font-inter">
                  Dzięki cierpliwości i szacunkowi do natury zwierząt tworzę 
                  autentyczne, pełne emocji kadry ukazujące prawdziwą więź.
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