import React, { useState, useEffect } from 'react';
import { PataPataLogo } from './PataPataLogo';
import { Phone, Menu as MenuIcon, X, MapPin, Music, UtensilsCrossed, Clock } from 'lucide-react';
import { RESTAURANT_INFO } from '../data/restaurantData';

interface NavbarProps {}

export const Navbar: React.FC<NavbarProps> = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Menu', href: '#menu', icon: UtensilsCrossed },
    { name: 'Live Jazz', href: '#live-jazz', icon: Music },
    { name: 'Our Story', href: '#our-story', icon: Clock },
    { name: 'Atmosphere', href: '#gallery', icon: null },
    { name: 'Location', href: '#location', icon: MapPin },
  ];

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          isScrolled
            ? 'bg-[#12100e]/95 backdrop-blur-md shadow-xl border-b border-[#2e261f]'
            : 'bg-gradient-to-b from-[#0f0e0c]/90 via-[#0f0e0c]/60 to-transparent'
        }`}
      >
        {/* Top Info Notice Bar */}
        <div className="bg-[#1c1611] text-[#d6c7b2] text-[11px] font-sans py-1.5 px-4 border-b border-[#2a221b] hidden sm:block">
          <div className="max-w-7xl mx-auto flex items-center justify-between">
            <div className="flex items-center gap-4">
              <span className="flex items-center gap-1.5 text-[#e67329]">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <span className="font-medium text-[#faf5ee]">Open Today:</span> 08:00 – 23:00
              </span>
              <span className="text-[#64594c]">|</span>
              <span className="flex items-center gap-1">
                <MapPin className="w-3 h-3 text-[#f59e0b]" />
                286 Fox Street, Maboneng Precinct, Joburg
              </span>
            </div>

            <div className="flex items-center gap-5">
              <span className="text-[#f59e0b] font-medium flex items-center gap-1">
                <Music className="w-3 h-3" /> Live Afro-Jazz & Soul Weekends
              </span>
              <span className="text-[#64594c]">|</span>
              <a
                href={`tel:${RESTAURANT_INFO.phone}`}
                className="hover:text-[#f59e0b] transition-colors flex items-center gap-1.5 font-bold text-[#faf5ee]"
              >
                <Phone className="w-3 h-3 text-[#e67329]" /> {RESTAURANT_INFO.phone}
              </a>
            </div>
          </div>
        </div>

        {/* Main Navbar */}
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex items-center justify-between">
          {/* Logo with Original Identity */}
          <a href="#" className="flex items-center group">
            <PataPataLogo variant="compact" showSubtitle={true} />
          </a>

          {/* Desktop Navigation Links */}
          <div className="hidden lg:flex items-center gap-8 text-sm font-sans font-medium">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="text-[#dcd1c4] hover:text-[#f59e0b] transition-colors py-1 relative after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-[#e67329] hover:after:w-full after:transition-all"
              >
                {link.name}
              </a>
            ))}
          </div>

          {/* Action Buttons: Just the phone number directly */}
          <div className="hidden sm:flex items-center gap-3">
            <a
              href={`tel:${RESTAURANT_INFO.phone}`}
              className="flex items-center gap-2.5 px-4 py-2 text-sm font-bold text-white bg-gradient-to-r from-[#c2410c] to-[#e67329] hover:from-[#b91c1c] hover:to-[#d97706] rounded-xl shadow-md hover:shadow-lg transition-all duration-200 transform hover:-translate-y-0.5"
            >
              <Phone className="w-4 h-4 text-[#faf5ee]" />
              <span>{RESTAURANT_INFO.phone}</span>
            </a>
          </div>

          {/* Mobile Direct Call & Menu Toggle */}
          <div className="flex items-center gap-2 lg:hidden">
            <a
              href={`tel:${RESTAURANT_INFO.phone}`}
              className="flex items-center gap-1.5 px-3 py-2 text-xs font-bold text-white bg-gradient-to-r from-[#c2410c] to-[#e67329] rounded-lg shadow"
              aria-label={`Call ${RESTAURANT_INFO.phone}`}
            >
              <Phone className="w-3.5 h-3.5" />
              <span>{RESTAURANT_INFO.phone}</span>
            </a>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-[#e2d5c3] hover:text-[#f59e0b] focus:outline-none"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <MenuIcon className="w-6 h-6" />}
            </button>
          </div>
        </nav>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-[#18130e] border-b border-[#33281e] px-4 pt-3 pb-6 shadow-2xl animate-in slide-in-from-top duration-200">
            <div className="flex flex-col gap-3">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center gap-3 py-2 px-3 text-[#f2e9dc] hover:text-[#f59e0b] hover:bg-[#241c15] rounded-lg text-base font-medium transition-colors"
                >
                  {link.icon && <link.icon className="w-4 h-4 text-[#e67329]" />}
                  {link.name}
                </a>
              ))}

              <div className="pt-3 border-t border-[#2e2319] flex flex-col gap-2.5">
                <a
                  href={`tel:${RESTAURANT_INFO.phone}`}
                  className="w-full py-3 px-4 text-center font-bold text-sm text-white bg-gradient-to-r from-[#c2410c] to-[#e67329] rounded-xl shadow flex items-center justify-center gap-2"
                >
                  <Phone className="w-4 h-4" /> Call {RESTAURANT_INFO.phone}
                </a>
              </div>
            </div>
          </div>
        )}
      </header>
    </>
  );
};
