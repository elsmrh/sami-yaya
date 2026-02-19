import React from 'react';
import { MapPin, Clock, Calendar, Wine, ExternalLink } from 'lucide-react';

const Details: React.FC = () => {
  return (
    <section id="details" className="py-24 bg-white relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 left-0 w-full h-full opacity-30 pointer-events-none">
        <div className="absolute top-20 left-10 w-64 h-64 rounded-full bg-wedding-cream blur-3xl" />
        <div className="absolute bottom-20 right-10 w-96 h-96 rounded-full bg-wedding-rose/30 blur-3xl" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-24">
          <span className="font-sans text-sm tracking-[0.3em] uppercase text-wedding-gold mb-4 block">Le Grand Jour</span>
          <h2 className="font-script text-6xl md:text-7xl text-wedding-dark">Notre Programme</h2>
          <p className="mt-6 font-serif text-xl text-gray-500 max-w-2xl mx-auto italic">
            "Chaque histoire d'amour est belle, mais la nôtre est ma préférée."
          </p>
        </div>

        <div className="flex flex-col gap-16 md:gap-24 max-w-6xl mx-auto">
          {/* Event 1: Ceremony */}
          {/* Mobile: card with background image */}
          <div className="block md:hidden relative rounded-2xl overflow-hidden shadow-xl">
            <div className="absolute inset-0">
              <img src="/images/mairiefleurs.jpg" alt="Mairie" className="w-full h-full object-cover blur-[2px] scale-105" />
              <div className="absolute inset-0 bg-black/60" />
            </div>
            <div className="relative z-10 p-8 h-full flex flex-col items-center justify-center text-center text-white">
              <div className="inline-flex items-center gap-3 px-5 py-2 rounded-full bg-black/40 backdrop-blur-md font-serif text-lg border border-white/30 mb-6 shadow-lg">
                <Clock className="w-4 h-4 text-wedding-gold" />
                <span>14h00</span>
              </div>
              <h3 className="font-serif text-4xl mb-4 drop-shadow-md text-white">La Cérémonie Civile</h3>
              <div className="w-20 h-1 bg-wedding-gold mx-auto mb-6 shadow-sm" />
              <p className="font-sans text-white text-base leading-relaxed mb-8 drop-shadow-sm max-w-xs mx-auto font-light tracking-wide">
                C'est avec beaucoup d'émotion que nous échangerons nos vœux.
                Retrouvez-nous pour célébrer notre union officielle.
              </p>
              <div className="flex items-center justify-center gap-2 mb-6">
                <MapPin className="w-5 h-5 text-wedding-gold drop-shadow-md" />
                <span className="font-serif text-xl text-white drop-shadow-md">Mairie de Rosny-sous-Bois</span>
              </div>
              <a
                href="https://www.google.com/maps/search/?api=1&query=Mairie+de+Rosny+sous+Bois"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-sm font-sans uppercase tracking-[0.2em] text-wedding-gold font-bold hover:text-white transition-colors bg-black/40 px-6 py-3 rounded-full border border-wedding-gold/30 hover:bg-wedding-gold/20"
              >
                Itinéraire <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>

          {/* Desktop: original side-by-side layout */}
          <div className="hidden md:flex flex-row items-center gap-24">
            <div className="w-1/2 relative group">
              <div className="absolute inset-0 border-[1px] border-wedding-gold rounded-t-[12rem] rounded-b-lg transform translate-x-6 translate-y-6 transition-transform duration-500 group-hover:translate-x-4 group-hover:translate-y-4" />
              <div className="relative h-[500px] w-full overflow-hidden rounded-t-[12rem] rounded-b-lg shadow-2xl">
                <img
                  src="/images/mairiefleurs.jpg"
                  alt="Mairie"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
              </div>
            </div>
            <div className="w-1/2 space-y-8 text-left">
              <div className="inline-flex items-center gap-3 px-6 py-2 rounded-full bg-wedding-cream text-wedding-dark font-serif text-lg border border-wedding-gold/20">
                <Clock className="w-5 h-5 text-wedding-gold" />
                <span>14h00</span>
              </div>
              <div>
                <h3 className="font-serif text-5xl text-wedding-dark mb-4">La Cérémonie Civile</h3>
                <div className="w-20 h-1 bg-wedding-sage/30 rounded-full mb-6" />
                <p className="font-sans text-gray-600 leading-relaxed text-lg font-light">
                  C'est avec beaucoup d'émotion que nous échangerons nos vœux.
                  Retrouvez-nous pour célébrer notre union officielle devant le maire.
                </p>
              </div>
              <div className="flex flex-row items-center gap-6 pt-4">
                <div className="flex items-center gap-3 text-wedding-dark/80">
                  <div className="w-10 h-10 rounded-full bg-wedding-cream flex items-center justify-center">
                    <MapPin className="w-5 h-5 text-wedding-sage" />
                  </div>
                  <span className="font-serif text-xl">Mairie de Rosny-sous-Bois</span>
                </div>
                <a
                  href="https://www.google.com/maps/search/?api=1&query=Mairie+de+Rosny+sous+Bois"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-sm font-sans uppercase tracking-widest text-wedding-gold hover:text-wedding-dark transition-colors border-b border-transparent hover:border-wedding-dark pb-1"
                >
                  Itinéraire <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>
          </div>

          {/* Event 2: Reception */}
          {/* Mobile: card with background image */}
          <div className="block md:hidden relative rounded-2xl overflow-hidden shadow-xl">
            <div className="absolute inset-0">
              <img src="https://images.unsplash.com/photo-1511795409834-ef04bbd61622?q=80&w=2069&auto=format&fit=crop" alt="Réception" className="w-full h-full object-cover blur-[2px] scale-105" />
              <div className="absolute inset-0 bg-black/60" />
            </div>
            <div className="relative z-10 p-8 h-full flex flex-col items-center justify-center text-center text-white">
              <div className="inline-flex items-center gap-3 px-5 py-2 rounded-full bg-black/40 backdrop-blur-md font-serif text-lg border border-white/30 mb-6 shadow-lg">
                <Clock className="w-4 h-4 text-wedding-gold" />
                <span>18h00</span>
              </div>
              <h3 className="font-serif text-4xl mb-4 drop-shadow-md text-white">Cocktail & Dîner</h3>
              <div className="w-20 h-1 bg-wedding-gold mx-auto mb-6 shadow-sm" />
              <p className="font-sans text-white text-base leading-relaxed mb-8 drop-shadow-sm max-w-xs mx-auto font-light tracking-wide">
                Place à la fête ! Rejoignez-nous pour un cocktail rafraîchissant,
                suivi d'un dîner et d'une soirée inoubliable.
              </p>
              <div className="flex flex-col items-center gap-1 mb-6">
                <div className="flex items-center gap-2">
                  <Wine className="w-5 h-5 text-wedding-gold drop-shadow-md" />
                  <span className="font-serif text-xl text-white drop-shadow-md">5 bis Bd des Astronautes</span>
                </div>
                <span className="font-sans text-xs text-white/70 uppercase tracking-widest drop-shadow-sm">93160 Noisy-le-Grand</span>
              </div>
              <a
                href="https://www.google.com/maps/search/?api=1&query=5+bis+bd+des+astronautes+93160+noisy+le+grand"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-sm font-sans uppercase tracking-[0.2em] text-wedding-gold font-bold hover:text-white transition-colors bg-black/40 px-6 py-3 rounded-full border border-wedding-gold/30 hover:bg-wedding-gold/20"
              >
                Itinéraire <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>

          {/* Desktop: original side-by-side layout (reversed) */}
          <div className="hidden md:flex flex-row-reverse items-center gap-24">
            <div className="w-1/2 relative group">
              <div className="absolute inset-0 border-[1px] border-wedding-sage rounded-t-[12rem] rounded-b-lg transform -translate-x-6 translate-y-6 transition-transform duration-500 group-hover:-translate-x-4 group-hover:translate-y-4" />
              <div className="relative h-[500px] w-full overflow-hidden rounded-t-[12rem] rounded-b-lg shadow-2xl">
                <img
                  src="https://images.unsplash.com/photo-1511795409834-ef04bbd61622?q=80&w=2069&auto=format&fit=crop"
                  alt="Réception"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
              </div>
            </div>
            <div className="w-1/2 space-y-8 text-right">
              <div className="inline-flex items-center gap-3 px-6 py-2 rounded-full bg-wedding-cream text-wedding-dark font-serif text-lg border border-wedding-sage/20">
                <Clock className="w-5 h-5 text-wedding-sage" />
                <span>18h00</span>
              </div>
              <div>
                <h3 className="font-serif text-5xl text-wedding-dark mb-4">Cocktail & Dîner</h3>
                <div className="w-20 h-1 bg-wedding-gold/30 rounded-full ml-auto mb-6" />
                <p className="font-sans text-gray-600 leading-relaxed text-lg font-light">
                  Place à la fête ! Rejoignez-nous pour un cocktail rafraîchissant,
                  suivi d'un dîner gastronomique et d'une soirée inoubliable sous les étoiles.
                </p>
              </div>
              <div className="flex flex-row-reverse items-center gap-6 pt-4">
                <div className="flex items-center gap-3 text-wedding-dark/80">
                  <div className="w-10 h-10 rounded-full bg-wedding-cream flex items-center justify-center">
                    <Wine className="w-5 h-5 text-wedding-gold" />
                  </div>
                  <div className="text-left">
                    <span className="font-serif text-xl block">5 bis Bd des Astronautes</span>
                    <span className="font-sans text-xs text-gray-500 uppercase tracking-wider">93160 Noisy-le-Grand</span>
                  </div>
                </div>
                <a
                  href="https://www.google.com/maps/search/?api=1&query=5+bis+bd+des+astronautes+93160+noisy+le+grand"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-sm font-sans uppercase tracking-widest text-wedding-gold hover:text-wedding-dark transition-colors border-b border-transparent hover:border-wedding-dark pb-1"
                >
                  Itinéraire <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Details;