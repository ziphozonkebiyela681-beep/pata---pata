import React, { useState, useEffect } from 'react';
import { PataPataLogo } from './PataPataLogo';
import { PataPataImages } from '../assets/images';
import { Phone, UtensilsCrossed, Music, MapPin, Sparkles, Clock, ArrowDown } from 'lucide-react';
import { RESTAURANT_INFO } from '../data/restaurantData';
import { loadStoredHeroImage } from '../utils/photoStorage';

interface HeroSectionProps {
  heroImageVersion?: number;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ 
  heroImageVersion = 0,
}) => {
  const [heroSrc, setHeroSrc] = useState<string>(PataPataImages.hero);

  useEffect(() => {
    const customHero = loadStoredHeroImage();
    if (customHero) {
      setHeroSrc(customHero);
    } else {
      setHeroSrc(PataPataImages.hero);
    }
  }, [heroImageVersion]);

  return (
    <section className="relative min-h-[92vh] flex items-center justify-center pt-24 pb-16 overflow-hidden">
      {/* Background Photography with Warm Atmospheric Gradient */}
      <div className="absolute inset-0 z-0">
        <img
          src={heroSrc}
          alt="Pata Pata restaurant outdoor sidewalk dining on Fox Street Maboneng at twilight"
          className="w-full h-full object-cover object-center scale-105 transition-transform duration-1000 ease-out"
        />
        {/* Layered cinematic overlays: vignette, warm amber glow, and dark readability backdrop */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0f0e0c] via-[#0f0e0c]/75 to-[#0f0e0c]/50" />
        <div className="absolute inset-0 bg-radial-at-c from-transparent via-[#0f0e0c]/30 to-[#0f0e0c]/90" />
        <div className="absolute inset-0 bg-[#e67329]/10 mix-blend-color-burn" />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center flex flex-col items-center">
        {/* Top Heritage Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#1e1711]/85 border border-[#e67329]/40 backdrop-blur-md mb-6 shadow-lg">
          <Sparkles className="w-3.5 h-3.5 text-[#f59e0b]" />
          <span className="text-xs uppercase tracking-widest text-[#f59e0b] font-medium font-sans">
            Johannesburg’s Legendary Cultural & Culinary Hub
          </span>
        </div>

        {/* The Authentic Original Logo Presentation */}
        <div className="mb-6 w-full flex flex-col items-center">
          <PataPataLogo variant="full" showSubtitle={true} />
        </div>

        {/* Subtitle & Story Hook */}
        <p className="font-serif italic text-xl sm:text-2xl md:text-3xl text-[#f3ece0] max-w-3xl mb-4 font-light leading-relaxed">
          “A taste of Africa, the rhythm of Sophiatown, and the vibrant beating heart of Fox Street.”
        </p>

        <p className="font-sans text-sm sm:text-base text-[#c7baa8] max-w-2xl mb-8 leading-relaxed">
          Honoring the iconic song by Mama Africa <strong className="text-[#f59e0b] font-semibold">Miriam Makeba</strong>. 
          Indulge in authentic slow-cooked oxtail potjies, sizzling prime braai cuts, handcrafted cocktails, 
          and soulful live jazz inside our 1960s vintage haven.
        </p>

        {/* Primary Action Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-3.5 w-full max-w-md mb-10">
          <a
            href={`tel:${RESTAURANT_INFO.phone}`}
            className="flex-1 min-w-[160px] flex items-center justify-center gap-2 px-6 py-3.5 text-sm sm:text-base font-bold text-white bg-gradient-to-r from-[#c2410c] to-[#e67329] hover:from-[#b91c1c] hover:to-[#d97706] rounded-xl shadow-lg hover:shadow-[#e67329]/25 transition-all transform hover:-translate-y-0.5"
          >
            <Phone className="w-4 h-4" />
            <span>Call {RESTAURANT_INFO.phone}</span>
          </a>

          <a
            href="#menu"
            className="flex-1 min-w-[160px] flex items-center justify-center gap-2 px-6 py-3.5 text-sm sm:text-base font-semibold text-[#faf5ee] bg-[#221a14]/90 hover:bg-[#32251c] border border-[#523e2d] rounded-xl backdrop-blur-sm transition-all"
          >
            <UtensilsCrossed className="w-4 h-4 text-[#f59e0b]" />
            <span>Explore Menu</span>
          </a>
        </div>

        {/* Clean Unboxed Metadata Strip (Anti-slop Zero-Pill Rule) */}
        <div className="w-full max-w-3xl border-t border-[#3a2c20] pt-6 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-xs sm:text-sm text-[#b5a794]">
          <span className="flex items-center gap-1.5 text-[#faf5ee] font-medium">
            <MapPin className="w-4 h-4 text-[#e67329]" />
            {RESTAURANT_INFO.street}, {RESTAURANT_INFO.precinct}
          </span>
          <span aria-hidden="true" className="text-[#e67329] hidden sm:inline">·</span>
          <span className="flex items-center gap-1.5">
            <Clock className="w-4 h-4 text-[#f59e0b]" />
            Daily 08:00 – 23:00 (Fridays & Saturdays till late)
          </span>
          <span aria-hidden="true" className="text-[#e67329] hidden sm:inline">·</span>
          <a
            href="#live-jazz"
            className="flex items-center gap-1.5 text-[#f59e0b] hover:text-[#fbbf24] transition-colors"
          >
            <Music className="w-4 h-4" />
            Live Jazz Stage Every Weekend
          </a>
        </div>

        {/* Gentle scroll down indicator */}
        <a
          href="#menu"
          aria-label="Scroll to menu section"
          className="mt-10 text-[#a89984] hover:text-[#f59e0b] transition-colors flex flex-col items-center gap-1 animate-bounce"
        >
          <span className="text-[10px] uppercase tracking-widest font-sans">Discover More</span>
          <ArrowDown className="w-4 h-4" />
        </a>
      </div>
    </section>
  );
};
