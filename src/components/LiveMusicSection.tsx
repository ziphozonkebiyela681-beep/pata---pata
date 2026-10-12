import React, { useState, useEffect } from 'react';
import { LIVE_SCHEDULE, RESTAURANT_INFO } from '../data/restaurantData';
import { PataPataImages } from '../assets/images';
import { Music, Calendar, Radio, ExternalLink, Disc, Sparkles, Camera, Phone } from 'lucide-react';
import { loadStoredBandImage, loadStoredSongImage } from '../utils/photoStorage';

interface LiveMusicSectionProps {
  bandVersion?: number;
  songVersion?: number;
}

export const LiveMusicSection: React.FC<LiveMusicSectionProps> = ({
  bandVersion = 0,
  songVersion = 0,
}) => {
  const [activeDay, setActiveDay] = useState<number>(1); // Friday by default
  const [bandImage, setBandImage] = useState<string>(PataPataImages.band);
  const [songBgImage, setSongBgImage] = useState<string>(PataPataImages.songBg || PataPataImages.band);

  useEffect(() => {
    const savedBand = loadStoredBandImage();
    if (savedBand) {
      setBandImage(savedBand);
    } else {
      setBandImage(PataPataImages.band);
    }

    const savedSong = loadStoredSongImage();
    if (savedSong) {
      setSongBgImage(savedSong);
    } else {
      setSongBgImage(PataPataImages.songBg || PataPataImages.band);
    }
  }, [bandVersion, songVersion]);

  return (
    <section id="live-jazz" className="py-20 bg-[#0d0b09] text-[#faf5ee] relative overflow-hidden">
      {/* Warm stage spotlight overlay */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-96 bg-gradient-to-b from-[#e67329]/15 via-[#f59e0b]/5 to-transparent blur-3xl pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-[#f59e0b] mb-3">
            <Radio className="w-3.5 h-3.5 text-[#e67329]" />
            <span>Sophiatown Heritage & Live Sound</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-[#faf5ee] mb-4">
            The Live Jazz Stage
          </h2>
          <p className="font-sans text-sm sm:text-base text-[#bfb09c] leading-relaxed">
            In the 1950s and 60s, Sophiatown defined South African urban soul. At Pata Pata, we keep that fire burning every week with the country’s finest brass players, vocalists, and Afro-rhythm masters.
          </p>
        </div>

        {/* Two-Column Feature: Authentic Miriam Makeba Tribute + Live Schedule */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch mb-16">
          {/* Left Column: Authentic Miriam Makeba "Pata Pata" Tribute Card */}
          <div className="lg:col-span-6 bg-[#16120e] rounded-3xl p-6 sm:p-8 border border-[#382b20] shadow-2xl relative overflow-hidden flex flex-col justify-between">
            {/* Customizable background of the "Song Behind Our Name" block (replaces the band background) */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden rounded-3xl">
              <img
                src={songBgImage}
                alt="Background of The Song Behind Our Name block"
                className="w-full h-full object-cover opacity-25"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#16120e] via-[#16120e]/85 to-[#16120e]/60" />
            </div>

            <div className="relative z-10 space-y-6">
              {/* Artwork & Header Header */}
              <div className="flex flex-col sm:flex-row items-center sm:items-start gap-5">
                {/* Authentic painting of Miriam Makeba from the restaurant */}
                <div className="relative shrink-0">
                  <img
                    src={PataPataImages.miriamPainting}
                    alt="Authentic portrait painting of Miriam Makeba inside Pata Pata"
                    className="w-28 h-36 sm:w-32 sm:h-40 object-cover rounded-2xl border-2 border-[#e67329]/60 shadow-xl"
                  />
                  <span className="absolute -bottom-2 left-1/2 -translate-x-1/2 whitespace-nowrap text-[9px] font-sans font-bold tracking-wider text-[#f59e0b] uppercase px-2 py-0.5 bg-[#12100e] border border-[#e67329]/40 rounded-md shadow">
                    Art at 286 Fox
                  </span>
                </div>

                <div className="flex-1 text-center sm:text-left">
                  <div className="flex items-center justify-center sm:justify-start gap-2 mb-1">
                    <div className="inline-flex items-center gap-1.5 text-[11px] font-sans uppercase tracking-widest text-[#e67329] font-bold">
                      <Disc className="w-3.5 h-3.5 text-[#f59e0b]" />
                      <span>The Song Behind Our Name</span>
                    </div>
                  </div>
                  <h3 className="font-serif text-2xl font-bold text-[#faf5ee] mb-1">
                    “Pata Pata” (1967)
                  </h3>
                  <p className="text-xs text-[#d1c2af] font-medium mb-3">
                    By Mama Africa Miriam Makeba
                  </p>
                  <p className="text-xs text-[#a89986] leading-relaxed">
                    Written about the joyful township dance parties in 1950s Johannesburg, Miriam Makeba’s <em>Pata Pata</em> became a worldwide sensation and an enduring symbol of South African resilience and celebration.
                  </p>
                </div>
              </div>

              {/* Iconic Quote Plaque */}
              <div className="bg-[#1f1812]/95 border border-[#3d2e21] rounded-2xl p-4 relative">
                <p className="text-xs sm:text-sm italic text-[#ede3d5] leading-relaxed mb-2 font-serif">
                  “‘Pata Pata’ is the name of a dance we do down in Johannesburg way... And everybody starts to move as soon as Pata Pata starts to play!”
                </p>
                <div className="flex items-center justify-between text-[11px] pt-2 border-t border-[#2e2319]">
                  <span className="text-[#f59e0b] font-sans font-bold tracking-wider uppercase">
                    — Miriam Makeba
                  </span>
                  <span className="text-[#8c7d6c]">Reprise Records · 1967</span>
                </div>
              </div>

              {/* Direct Link to Official Original Song */}
              <div className="bg-[#241c15] border border-[#3d2e20] rounded-2xl p-4 flex flex-col sm:flex-row items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 bg-[#c2410c] text-white rounded-xl">
                    <Music className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-[#faf5ee]">
                      Listen to the Original Song
                    </p>
                    <p className="text-[11px] text-[#9c8b78]">
                      Miriam Makeba — Pata Pata (Official Audio)
                    </p>
                  </div>
                </div>

                <a
                  href="https://www.youtube.com/results?search_query=Miriam+Makeba+Pata+Pata+original"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto px-4 py-2 bg-[#18130e] hover:bg-[#2b2016] border border-[#4a3a2d] text-[#f59e0b] hover:text-white text-xs font-bold rounded-xl flex items-center justify-center gap-1.5 transition-colors whitespace-nowrap shadow-sm"
                >
                  <span>Play Original Track</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>

            {/* Bottom note */}
            <div className="relative z-10 pt-4 mt-4 border-t border-[#261d15] flex items-center justify-between text-xs text-[#8c7d6c]">
              <span>Live acoustic & jazz bands weekly</span>
              <span className="text-[#e67329] font-medium">Free for dining patrons</span>
            </div>
          </div>

          {/* Right Column: Weekly Schedule Breakdown */}
          <div className="lg:col-span-6 flex flex-col justify-between gap-4">
            <div>
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#faf5ee] flex items-center gap-2">
                  <Calendar className="w-5 h-5 text-[#e67329]" /> Weekly Stage Line-Up
                </h3>
                <span className="text-xs text-[#a69683]">Thursday – Sunday</span>
              </div>

              <div className="space-y-3">
                {LIVE_SCHEDULE.map((event, idx) => {
                  const isSelected = activeDay === idx;
                  return (
                    <div
                      key={event.day}
                      onClick={() => setActiveDay(idx)}
                      className={`cursor-pointer p-4 sm:p-5 rounded-2xl border transition-all ${
                        isSelected
                          ? 'bg-[#221a14] border-[#e67329] shadow-lg shadow-[#c2410c]/10'
                          : 'bg-[#16120e] border-[#2b2118] hover:border-[#3d2e20]'
                      }`}
                    >
                      <div className="flex items-start justify-between gap-3 mb-1.5">
                        <div className="flex items-center gap-2">
                          <span className="font-sans font-bold text-xs uppercase tracking-wider text-[#f59e0b]">
                            {event.day}
                          </span>
                          <span className="text-xs text-[#8c7d6c]">·</span>
                          <span className="text-xs text-[#d1c2af] font-medium">{event.time}</span>
                        </div>
                        {event.badge && (
                          <span className="text-[10px] uppercase font-sans tracking-wide text-[#e67329] font-semibold px-2 py-0.5 bg-[#12100e] rounded-md border border-[#e67329]/30">
                            {event.badge}
                          </span>
                        )}
                      </div>

                      <h4 className="font-serif text-lg font-bold text-[#faf5ee] mb-1">
                        {event.title}
                      </h4>

                      <p className="text-xs font-medium text-[#e67329] mb-2">
                        {event.artist} <span className="text-[#8c7d6c] font-normal">({event.genre})</span>
                      </p>

                      <p className="text-xs text-[#b0a08e] leading-relaxed">
                        {event.description}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Direct phone call for music sets */}
            <div className="pt-4 border-t border-[#261d15] flex flex-col sm:flex-row items-center justify-between gap-4">
              <span className="text-xs text-[#a69683]">
                Weekend sets fill up early. Call us directly:
              </span>
              <a
                href={`tel:${RESTAURANT_INFO.phone}`}
                className="w-full sm:w-auto px-5 py-2.5 bg-[#e67329] hover:bg-[#d97706] text-white text-xs font-bold rounded-xl shadow transition-colors whitespace-nowrap flex items-center justify-center gap-1.5"
              >
                <Phone className="w-3.5 h-3.5" />
                <span>Call {RESTAURANT_INFO.phone}</span>
              </a>
            </div>
          </div>
        </div>

        {/* Interior Live Jazz Photo Showcase */}
        <div className="rounded-3xl overflow-hidden border border-[#382b20] relative h-64 sm:h-80 shadow-2xl group">
          <img
            src={bandImage}
            alt="Intimate jazz saxophonist and patrons at Pata Pata in Maboneng"
            className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-700"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0d0b09] via-[#0d0b09]/50 to-transparent" />

          <div className="absolute bottom-6 left-6 right-6 flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4">
            <div>
              <p className="text-xs uppercase tracking-widest text-[#f59e0b] font-semibold mb-1 font-sans">
                The Stage Atmosphere
              </p>
              <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#faf5ee]">
                Where Every Meal Has A Soundtrack
              </h3>
            </div>
            <div className="flex items-center gap-2.5">
              <a
                href={`tel:${RESTAURANT_INFO.phone}`}
                className="px-4 py-2 bg-[#1c1611]/90 border border-[#e67329]/50 hover:bg-[#e67329] text-white text-xs font-semibold rounded-xl backdrop-blur-sm transition-all flex items-center gap-1.5"
              >
                <Phone className="w-3.5 h-3.5 text-[#f59e0b]" />
                <span>Call {RESTAURANT_INFO.phone}</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
