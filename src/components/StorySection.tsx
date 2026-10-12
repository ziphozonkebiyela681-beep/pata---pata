import React from 'react';
import { PataPataImages } from '../assets/images';
import { Disc, Heart, MapPin, Sparkles, Award } from 'lucide-react';
import { RESTAURANT_INFO } from '../data/restaurantData';

export const StorySection: React.FC = () => {
  return (
    <section id="our-story" className="py-20 bg-[#120f0c] text-[#faf5ee] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Visual Column: Authentic Miriam Makeba Portrait & Atmosphere */}
          <div className="lg:col-span-6 relative">
            {/* The Authentic Miriam Makeba Oil Canvas Artwork inside Pata Pata */}
            <div className="relative rounded-3xl overflow-hidden border-2 border-[#e67329]/50 shadow-2xl bg-[#18130e] group">
              <img
                src={PataPataImages.miriamPainting}
                alt="Authentic portrait painting of Miriam Makeba inside Pata Pata restaurant Maboneng, by O. Dowery 2015"
                className="w-full h-96 sm:h-[430px] object-cover object-center group-hover:scale-105 transition-transform duration-700"
              />
              {/* Subtle vignette and bottom label */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#0f0d0b] via-transparent to-transparent opacity-90" />

              <div className="absolute bottom-4 left-4 right-4 bg-[#14100c]/90 backdrop-blur-md border border-[#3d2e21] rounded-2xl p-4 flex items-center justify-between">
                <div>
                  <span className="text-[10px] font-sans font-bold tracking-widest text-[#f59e0b] uppercase block">
                    Original Artwork at 286 Fox Street
                  </span>
                  <p className="font-serif text-sm font-bold text-[#faf5ee]">
                    Mama Africa Miriam Makeba
                  </p>
                  <p className="text-[11px] text-[#9c8b78]">
                    Hand-painted canvas hanging above the Pata Pata bar
                  </p>
                </div>
                <div className="text-right shrink-0">
                  <span className="text-[10px] text-[#e67329] font-mono font-semibold px-2 py-1 bg-[#1e1711] rounded-lg border border-[#3b2d1f]">
                    O. Dowery · 2015
                  </span>
                </div>
              </div>
            </div>

            {/* Overlapping terrace photo card */}
            <div className="hidden sm:block absolute -top-6 -right-6 w-48 rounded-2xl overflow-hidden border-2 border-[#382b20] shadow-2xl">
              <img
                src={PataPataImages.hero}
                alt="Fox Street terrace dining"
                className="w-full h-32 object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#120f0c] via-transparent to-transparent" />
              <div className="absolute bottom-1.5 left-2 right-2 text-center">
                <span className="text-[9px] font-sans font-bold tracking-wider text-[#faf5ee] uppercase px-1.5 py-0.5 bg-[#12100e]/85 rounded">
                  Fox Street Terrace
                </span>
              </div>
            </div>

            {/* Heritage Year Stamp */}
            <div className="absolute -bottom-4 -left-3 bg-[#18130e]/95 border border-[#e67329]/60 rounded-2xl p-3 backdrop-blur-md shadow-xl flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#c2410c] to-[#e67329] flex items-center justify-center text-white font-serif font-black text-sm">
                '11
              </div>
              <div>
                <p className="text-[10px] font-sans uppercase tracking-widest text-[#e67329] font-bold">
                  Established 2011
                </p>
                <p className="text-xs font-serif font-semibold text-[#faf5ee]">
                  The Soul of Maboneng
                </p>
              </div>
            </div>
          </div>

          {/* Right Text Column: The Narrative */}
          <div className="lg:col-span-6 space-y-6">
            <div>
              <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-[#e67329] mb-3 font-sans">
                <Disc className="w-3.5 h-3.5 text-[#f59e0b]" />
                <span>Our Heritage & Spirit</span>
              </div>
              <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[#faf5ee] leading-tight">
                Born on Fox Street, <br />
                <span className="text-[#f59e0b] italic">Inspired by Mama Africa</span>
              </h2>
            </div>

            <p className="font-sans text-sm sm:text-base text-[#c4b5a3] leading-relaxed">
              In isiXhosa, <strong className="text-[#faf5ee]">“Pata Pata”</strong> literally translates to 
              <em> “Touch Touch”</em> — named after the spirited township dance that Miriam Makeba took 
              to world stages in 1967. When Pata Pata opened its doors at 286 Fox Street in 2011, 
              it was founded on a simple promise: to offer an authentic home away from home where food, 
              heritage, and music bring people together.
            </p>

            <p className="font-sans text-sm sm:text-base text-[#c4b5a3] leading-relaxed">
              Step inside and you are instantly enveloped by 1960s Sophiatown nostalgia. Hanging proudly 
              above the bar counter is our original hand-painted canvas portrait of young Miriam Makeba 
              (created by O. Dowery in 2015). Her radiant, joyful smile watches over our diners and musicians 
              every night — a daily reminder of Mama Africa’s warmth, freedom, and timeless music.
            </p>

            {/* Three Pillar Points (Clean Unboxed Grid) */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 border-t border-[#2e2319]">
              <div className="space-y-1">
                <span className="text-sm font-serif font-bold text-[#faf5ee] block">
                  Ukudla Kwesintu
                </span>
                <p className="text-xs text-[#9c8b78] leading-normal">
                  Authentic indigenous recipes passed down through generations.
                </p>
              </div>

              <div className="space-y-1">
                <span className="text-sm font-serif font-bold text-[#f59e0b] block">
                  Live Jazz Stage
                </span>
                <p className="text-xs text-[#9c8b78] leading-normal">
                  Soul, Kwela, and Rumba performed weekly by top Joburg artists.
                </p>
              </div>

              <div className="space-y-1">
                <span className="text-sm font-serif font-bold text-[#e67329] block">
                  Maboneng Anchor
                </span>
                <p className="text-xs text-[#9c8b78] leading-normal">
                  A foundational cultural cornerstone in the city of gold.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
