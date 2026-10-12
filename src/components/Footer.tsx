import React from 'react';
import { PataPataLogo } from './PataPataLogo';
import { RESTAURANT_INFO } from '../data/restaurantData';
import { Phone, Mail, MapPin, Utensils, Heart, MessageSquare, Instagram } from 'lucide-react';

const TikTokIcon: React.FC<{ className?: string }> = ({ className = 'w-4 h-4' }) => (
  <svg
    viewBox="0 0 24 24"
    fill="currentColor"
    className={className}
    aria-hidden="true"
  >
    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1.04-.1z" />
  </svg>
);

export const Footer: React.FC<{ onOpenReservation: () => void }> = ({ onOpenReservation }) => {
  return (
    <footer className="bg-[#090807] text-[#a89986] border-t border-[#261d15] pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-12 border-b border-[#211912]">
          {/* Brand & Original Logo Presentation */}
          <div className="lg:col-span-5 space-y-4">
            <div className="flex items-center gap-3">
              <PataPataLogo variant="compact" showSubtitle={true} />
            </div>
            <p className="text-xs sm:text-sm text-[#948473] leading-relaxed max-w-sm">
              Named in tribute to Miriam Makeba’s iconic 1967 anthem. 
              Pata Pata is Johannesburg’s beloved meeting place for traditional South African heritage food, 
              sizzling braai grills, craft cocktails, and soulful weekend live jazz at 286 Fox Street, Maboneng.
            </p>
            <div className="flex flex-wrap items-center gap-2.5 pt-2">
              {/* TikTok @pata.pata_maboneng */}
              <a
                href={RESTAURANT_INFO.tiktokUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-3 py-2 bg-[#18130e] hover:bg-[#251b14] border border-[#382b1e] hover:border-[#e67329]/70 rounded-xl text-xs font-semibold text-[#faf5ee] hover:text-[#f59e0b] transition-all group shadow-sm"
                aria-label="Follow Pata Pata on TikTok @pata.pata_maboneng"
              >
                <TikTokIcon className="w-4 h-4 text-[#e67329] group-hover:scale-110 transition-transform" />
                <span>TikTok: <strong className="text-[#f59e0b]">@pata.pata_maboneng</strong></span>
              </a>

              {/* Instagram @pata.pata_maboneng */}
              <a
                href={RESTAURANT_INFO.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-3 py-2 bg-[#18130e] hover:bg-[#251b14] border border-[#382b1e] hover:border-[#e67329]/70 rounded-xl text-xs font-semibold text-[#faf5ee] hover:text-[#f59e0b] transition-all group shadow-sm"
                aria-label="Follow Pata Pata on Instagram @pata.pata_maboneng"
              >
                <Instagram className="w-4 h-4 text-[#e67329] group-hover:scale-110 transition-transform" />
                <span>Instagram: <strong className="text-[#f59e0b]">@pata.pata_maboneng</strong></span>
              </a>

              {/* WhatsApp direct chat */}
              <a
                href={`https://wa.me/27728807772`}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 bg-[#18130e] hover:bg-[#202c20] border border-[#302419] hover:border-emerald-600/60 rounded-xl text-emerald-400 hover:text-emerald-300 transition-colors"
                aria-label="WhatsApp Pata Pata"
                title="WhatsApp Direct Contact"
              >
                <Phone className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="font-serif font-bold text-sm text-[#faf5ee] uppercase tracking-wider">
              Explore
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <a href="#menu" className="hover:text-[#f59e0b] transition-colors">
                  Traditional Menu
                </a>
              </li>
              <li>
                <a href="#live-jazz" className="hover:text-[#f59e0b] transition-colors">
                  Live Jazz Stage
                </a>
              </li>
              <li>
                <a href="#our-story" className="hover:text-[#f59e0b] transition-colors">
                  Miriam Makeba Legacy
                </a>
              </li>
              <li>
                <a href="#gallery" className="hover:text-[#f59e0b] transition-colors">
                  Restaurant Atmosphere
                </a>
              </li>
              <li>
                <a href="#location" className="hover:text-[#f59e0b] transition-colors">
                  Fox Street Map & Parking
                </a>
              </li>
              <li>
                <button
                  onClick={onOpenReservation}
                  className="text-[#e67329] hover:underline font-semibold text-left"
                >
                  Book a Table
                </button>
              </li>
            </ul>
          </div>

          {/* Hours & Contact */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="font-serif font-bold text-sm text-[#faf5ee] uppercase tracking-wider">
              Hours & Contact
            </h4>
            <div className="space-y-2 text-xs text-[#948473]">
              <p>
                <strong className="text-[#faf5ee] font-medium block">Daily Operating Hours:</strong>
                Monday – Thursday: 08:00 – 23:00<br />
                Friday & Saturday: 08:00 – 00:00<br />
                Sunday Soul: 08:00 – 23:00
              </p>
              <p className="pt-1">
                <strong className="text-[#faf5ee] font-medium block">Address:</strong>
                286 Fox Street, Jeppestown, Maboneng, Joburg 2094
              </p>
              <p>
                <a href={`tel:${RESTAURANT_INFO.phone}`} className="text-[#f59e0b] hover:underline">
                  {RESTAURANT_INFO.phone}
                </a>
              </p>
            </div>
          </div>

          {/* Online Delivery Partners */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="font-serif font-bold text-sm text-[#faf5ee] uppercase tracking-wider">
              Order Online
            </h4>
            <p className="text-xs text-[#948473]">
              Craving Pata Pata at home or at your hotel? Order via our verified partners:
            </p>
            <div className="flex flex-col gap-2">
              <a
                href={RESTAURANT_INFO.uberEatsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-3 py-2 bg-[#18130e] hover:bg-[#261d15] border border-[#302419] rounded-xl text-xs font-semibold text-[#faf5ee] flex items-center justify-between transition-colors"
              >
                <span>Uber Eats</span>
                <span className="text-[10px] text-emerald-400">Available</span>
              </a>
              <a
                href={RESTAURANT_INFO.mrdFoodUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-3 py-2 bg-[#18130e] hover:bg-[#261d15] border border-[#302419] rounded-xl text-xs font-semibold text-[#faf5ee] flex items-center justify-between transition-colors"
              >
                <span>Mr D Food</span>
                <span className="text-[10px] text-emerald-400">Available</span>
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar (Quiet, Anti-slop Restraint) */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#6e6050]">
          <p>
            © {new Date().getFullYear()} Pata Pata African Restaurant (Pty) Ltd. 286 Fox Street, Maboneng. All rights reserved.
          </p>
          <p className="flex items-center gap-1">
            Made with <Heart className="w-3.5 h-3.5 text-[#c2410c] fill-current" /> in Johannesburg, South Africa
          </p>
        </div>
      </div>
    </footer>
  );
};
