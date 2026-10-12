import React, { useState } from 'react';
import { RESTAURANT_INFO, FOX_STREET_LANDMARKS } from '../data/restaurantData';
import { MapPin, Navigation, Car, ShieldCheck, Copy, Check, Phone, ExternalLink, Compass } from 'lucide-react';

export const LocationSection: React.FC = () => {
  const [copied, setCopied] = useState(false);

  const handleCopyAddress = () => {
    navigator.clipboard.writeText(RESTAURANT_INFO.address);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section id="location" className="py-20 bg-[#0d0b09] text-[#faf5ee] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-[#e67329] mb-3 font-sans">
            <Compass className="w-3.5 h-3.5 text-[#f59e0b]" />
            <span>Finding Pata Pata</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-[#faf5ee] mb-4">
            Fox Street, Maboneng
          </h2>
          <p className="font-sans text-sm sm:text-base text-[#b0a08e]">
            Located in the heart of Johannesburg’s premier creative cultural precinct.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Left Column: Interactive Map Representation & Nearby Spots */}
          <div className="lg:col-span-7 bg-[#16120e] border border-[#33261a] rounded-3xl p-6 sm:p-8 flex flex-col justify-between shadow-2xl relative overflow-hidden">
            {/* Visual stylised precinct schematic */}
            <div className="relative bg-[#110e0b] border border-[#2b2118] rounded-2xl p-6 mb-6">
              <div className="flex items-center justify-between mb-4 border-b border-[#241a12] pb-3">
                <span className="text-xs uppercase font-sans tracking-widest text-[#f59e0b] font-bold flex items-center gap-1.5">
                  <MapPin className="w-4 h-4 text-[#e67329]" /> Maboneng Fox Street Strip
                </span>
                <span className="text-[11px] text-[#8c7d6c]">East Joburg Arts Quarter</span>
              </div>

              {/* Schematic Map Visual */}
              <div className="space-y-3 relative">
                {/* Fox Street Line */}
                <div className="h-10 bg-[#1c1611] border border-[#3b2d1f] rounded-xl flex items-center px-4 justify-between relative">
                  <span className="text-xs font-mono font-bold text-[#c7b7a4]">
                    FOX STREET (Pedestrian-Friendly Boulevard)
                  </span>
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                    <span className="text-[10px] text-emerald-400 font-bold uppercase">
                      286 Fox St (Pata Pata)
                    </span>
                  </div>
                </div>

                {/* Nearby Nodes */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                  {FOX_STREET_LANDMARKS.map((landmark) => (
                    <div
                      key={landmark.name}
                      className="bg-[#1a140f] border border-[#2b2016] p-3 rounded-xl text-xs space-y-1"
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-serif font-bold text-[#faf5ee]">
                          {landmark.name}
                        </span>
                        <span className="text-[10px] text-[#e67329] font-medium">
                          {landmark.distance}
                        </span>
                      </div>
                      <p className="text-[11px] text-[#8f7e6b] leading-tight">
                        {landmark.desc}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Practical Arrival Details */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div className="bg-[#1c1611] border border-[#2d2218] p-4 rounded-xl flex items-start gap-3">
                <Car className="w-5 h-5 text-[#f59e0b] shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-bold text-[#faf5ee] mb-1">Safe Street Parking</h4>
                  <p className="text-[#a1907d] leading-relaxed">
                    Dedicated precinct car guards in reflective vests operate along Fox & Kruger streets. Underground secure parking is also available at Main Street Life.
                  </p>
                </div>
              </div>

              <div className="bg-[#1c1611] border border-[#2d2218] p-4 rounded-xl flex items-start gap-3">
                <Navigation className="w-5 h-5 text-[#e67329] shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-bold text-[#faf5ee] mb-1">Uber & Bolt Rideshare</h4>
                  <p className="text-[#a1907d] leading-relaxed">
                    Set destination pin to <strong className="text-[#faf5ee]">286 Fox Street, Maboneng</strong>. Drivers can drop you off directly opposite our entrance terrace.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Address Card & Action Buttons */}
          <div className="lg:col-span-5 bg-[#18130e] border border-[#382b20] rounded-3xl p-6 sm:p-8 flex flex-col justify-between shadow-2xl">
            <div className="space-y-6">
              <div>
                <span className="text-xs uppercase font-sans tracking-widest text-[#e67329] font-bold">
                  Physical Address
                </span>
                <h3 className="font-serif text-2xl font-bold text-[#faf5ee] mt-1 mb-2">
                  286 Fox Street, Jeppestown
                </h3>
                <p className="text-xs sm:text-sm text-[#b5a592] leading-relaxed">
                  Maboneng Precinct, Johannesburg, 2094, Gauteng, South Africa
                </p>
              </div>

              {/* Operating hours list */}
              <div className="bg-[#14100c] border border-[#291e14] p-4 rounded-2xl space-y-2.5 text-xs">
                <div className="flex justify-between pb-2 border-b border-[#241a12]">
                  <span className="text-[#a1907d]">Monday – Thursday:</span>
                  <span className="font-semibold text-[#faf5ee]">{RESTAURANT_INFO.openingHours.weekdays}</span>
                </div>
                <div className="flex justify-between pb-2 border-b border-[#241a12]">
                  <span className="text-[#a1907d]">Friday & Saturday:</span>
                  <span className="font-semibold text-[#f59e0b]">{RESTAURANT_INFO.openingHours.saturday}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#a1907d]">Sunday Soul Brunch:</span>
                  <span className="font-semibold text-[#faf5ee]">{RESTAURANT_INFO.openingHours.sunday}</span>
                </div>
              </div>

              {/* Telephone & Contact Quick Call */}
              <div className="flex items-center justify-between p-4 bg-[#211a13] border border-[#382b1e] rounded-2xl">
                <div>
                  <span className="text-[11px] text-[#8c7d6c]">Direct Reservations & Enquiries</span>
                  <p className="font-bold text-sm text-[#faf5ee]">{RESTAURANT_INFO.phone}</p>
                </div>
                <a
                  href={`tel:${RESTAURANT_INFO.phone}`}
                  className="p-3 bg-[#e67329] text-white rounded-xl hover:bg-[#d97706] transition-colors"
                  aria-label="Call Pata Pata"
                >
                  <Phone className="w-4 h-4" />
                </a>
              </div>
            </div>

            {/* Navigation Actions */}
            <div className="space-y-2.5 pt-6 border-t border-[#291e14]">
              <a
                href={RESTAURANT_INFO.mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center justify-center gap-2 py-3 px-4 bg-gradient-to-r from-[#c2410c] to-[#e67329] hover:from-[#b91c1c] hover:to-[#d97706] text-white text-xs sm:text-sm font-bold rounded-xl shadow-lg transition-all"
              >
                <Navigation className="w-4 h-4" /> Open in Google Maps
                <ExternalLink className="w-3.5 h-3.5 opacity-80" />
              </a>

              <button
                onClick={handleCopyAddress}
                className="w-full flex items-center justify-center gap-2 py-2.5 px-4 bg-[#231b14] hover:bg-[#2d221a] border border-[#3b2d1f] text-[#d6c7b2] text-xs font-semibold rounded-xl transition-colors"
              >
                {copied ? (
                  <>
                    <Check className="w-4 h-4 text-emerald-400" /> Address Copied to Clipboard
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4 text-[#f59e0b]" /> Copy Full Address
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
