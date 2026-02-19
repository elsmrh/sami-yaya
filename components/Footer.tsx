import React from 'react';
import { ArrowUp, Heart } from 'lucide-react';

const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-wedding-dark text-wedding-cream py-16 border-t border-wedding-gold/30">
      <div className="container mx-auto px-4 flex flex-col items-center gap-8 text-center">

        {/* Titre */}
        <h2 className="font-script text-5xl text-wedding-gold">Sami & Prescillia</h2>

        {/* Date et Lieu */}
        <p className="font-sans text-xs tracking-[0.2em] opacity-60 uppercase">
          23 Octobre 2026 • Paris
        </p>

        {/* Textes mignons */}
        <div className="max-w-md space-y-4 opacity-80 my-2">
          <p className="font-serif italic text-lg">
            "L'amour est la seule chose qui grandit quand on la partage."
          </p>
          <div className="flex justify-center items-center gap-3 text-wedding-gold/90">
            <Heart className="w-4 h-4 fill-current" />
            <span className="font-script text-2xl">Merci de partager ce moment avec nous</span>
            <Heart className="w-4 h-4 fill-current" />
          </div>
        </div>

        {/* Bouton Retour en haut */}
        <button
          onClick={scrollToTop}
          className="mt-4 p-3 rounded-full border border-wedding-gold/30 text-wedding-gold hover:bg-wedding-gold hover:text-wedding-dark transition-all duration-300 group"
          aria-label="Retour en haut"
        >
          <ArrowUp className="w-4 h-4 group-hover:-translate-y-1 transition-transform" />
        </button>

        {/* Copyrights & Crédits */}
        <div className="mt-8 pt-8 border-t border-wedding-gold/10 w-full max-w-sm flex flex-col items-center gap-3">
          <p className="text-[10px] font-sans opacity-40">
            © 2026 Tous droits réservés.
          </p>
          <a
            href="https://homika-studio.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[10px] font-sans opacity-50 hover:opacity-100 hover:text-wedding-gold transition-colors tracking-widest uppercase"
          >
            Développé par HOMIKA Studio
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;