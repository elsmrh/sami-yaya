import React from 'react';
import { Heart, ChevronDown } from 'lucide-react';

const Hero: React.FC = () => {
  return (
    <div className="relative h-screen w-full overflow-hidden flex items-end md:items-center justify-center bg-gray-900">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-[center_20%] md:bg-center bg-no-repeat scale-105"
        style={{
          backgroundImage: 'url("/images/hero.jpg")',
          filter: 'brightness(0.45)'
        }}
      />

      {/* Gradient overlay for readability */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-black/40" />


      {/* Content */}
      <div className="relative z-10 text-white px-6 md:px-16 lg:px-20 pb-28 md:pb-0 w-full">
        <div className="text-center md:inline-block">

          {/* Decorative line */}
          <div className="hidden md:flex items-center justify-center gap-4 mb-6 animate-fade-in">
            <div className="w-12 h-[1px] bg-wedding-gold/60" />
            <Heart className="w-3 h-3 text-wedding-gold/60 fill-wedding-gold/30" />
          </div>

          <p className="font-sans text-[10px] md:text-sm tracking-[0.4em] uppercase mb-4 md:mb-5 text-wedding-gold/90 animate-fade-in" style={{ animationDelay: '0.2s' }}>
            Nous nous marions
          </p>

          <h1 className="font-script mb-5 md:mb-8 text-5xl md:text-8xl lg:text-9xl drop-shadow-[0_2px_10px_rgba(0,0,0,0.5)] leading-[1.1] animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
            Prescillia <span className="text-wedding-gold">&</span>
            <br className="hidden md:block" />
            <span> Sami </span>
          </h1>

          {/* Decorative separator */}
          <div className="flex items-center justify-center gap-3 mb-5 md:mb-6 animate-fade-in" style={{ animationDelay: '0.6s' }}>
            <div className="w-8 md:w-12 h-[1px] bg-white/20" />
            <Heart className="w-3 h-3 text-wedding-gold fill-wedding-gold/50" />
            <div className="w-8 md:w-12 h-[1px] bg-white/20" />
          </div>

          <div className="flex items-center justify-center gap-4 md:gap-5 text-base md:text-xl font-serif italic mb-8 md:mb-10 text-white/80 animate-fade-in" style={{ animationDelay: '0.8s' }}>
            <span>23</span>
            <span className="text-wedding-gold text-xs">✦</span>
            <span>Octobre</span>
            <span className="text-wedding-gold text-xs">✦</span>
            <span>2026</span>
          </div>

          <div className="hidden md:flex md:flex-row items-center justify-center gap-4 animate-fade-in-up" style={{ animationDelay: '1s' }}>
            <a
              href="#details"
              className="w-full md:w-auto text-center border-2 border-wedding-gold/80 bg-wedding-gold/10 backdrop-blur-sm hover:bg-wedding-gold text-white transition-all duration-500 px-10 py-3.5 rounded-full font-sans text-[11px] md:text-xs tracking-[0.2em] uppercase hover:shadow-[0_0_30px_rgba(212,175,55,0.3)]"
            >
              Le Programme
            </a>
            <a
              href="#rsvp"
              className="w-full md:w-auto text-center border border-white/30 bg-white/5 backdrop-blur-sm hover:bg-white hover:text-wedding-dark transition-all duration-500 px-10 py-3.5 rounded-full font-sans text-[11px] md:text-xs tracking-[0.2em] uppercase hover:shadow-lg"
            >
              Répondre
            </a>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <a href="#details" className="absolute bottom-6 md:bottom-8 left-0 right-0 text-center animate-bounce cursor-pointer group">
        <span className="text-white/30 group-hover:text-wedding-gold text-[10px] md:text-xs font-sans tracking-[0.3em] block mb-1 transition-colors">DÉCOUVRIR</span>
        <ChevronDown className="w-4 h-4 md:w-5 md:h-5 text-white/30 group-hover:text-wedding-gold mx-auto transition-colors" />
      </a>
    </div>
  );
};

export default Hero;