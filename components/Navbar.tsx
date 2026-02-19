import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';

const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    // Check initial scroll position
    handleScroll();

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Accueil', href: '#' },
    { name: 'Notre Programme', href: '#details' },
    { name: 'Répondre', href: '#rsvp' },
  ];

  // Determine text color based on scroll state and menu state
  const getTextColor = () => {
    if (isMenuOpen) return 'text-wedding-dark';
    if (isScrolled) return 'text-wedding-dark';
    return 'text-white';
  };

  return (
    <nav
      className={`fixed top-0 w-full z-50 transition-all duration-500 ${isScrolled
          ? 'bg-white/95 backdrop-blur-md py-4 shadow-sm'
          : 'bg-transparent py-6'
        }`}
    >
      <div className="container mx-auto px-6 flex justify-between items-center">
        {/* Logo */}
        <a
          href="#"
          className={`font-script text-3xl md:text-4xl relative z-50 transition-colors duration-300 ${getTextColor()}`}
        >
          S & P
        </a>

        {/* Desktop Menu */}
        <div className={`hidden md:flex items-center gap-8 ${isScrolled ? 'text-wedding-dark' : 'text-white'}`}>
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="font-sans text-xs uppercase tracking-[0.2em] hover:text-wedding-gold transition-colors pb-1 border-b-2 border-transparent hover:border-wedding-gold"
            >
              {link.name}
            </a>
          ))}
        </div>

        {/* Mobile Menu Toggle */}
        <button
          className={`md:hidden z-50 relative transition-colors duration-300 ${getTextColor()}`}
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="Menu"
        >
          {isMenuOpen ? <X className="w-8 h-8" /> : <Menu className="w-8 h-8" />}
        </button>

        {/* Mobile Overlay */}
        <div className={`fixed inset-0 bg-wedding-cream/95 backdrop-blur-xl flex flex-col items-center justify-center gap-10 transition-all duration-500 ease-in-out md:hidden ${isMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible pointer-events-none'
          }`}>
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              onClick={() => setIsMenuOpen(false)}
              className="font-serif text-4xl text-wedding-dark hover:text-wedding-gold transition-colors"
            >
              {link.name}
            </a>
          ))}
          <div className="absolute bottom-10 text-center">
            <p className="font-script text-2xl text-wedding-gold">Sami & Prescillia</p>
            <p className="font-sans text-xs text-wedding-dark/50 mt-2 uppercase tracking-widest">23 Octobre 2026</p>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;