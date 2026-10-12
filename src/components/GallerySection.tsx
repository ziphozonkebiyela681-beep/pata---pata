import React, { useState } from 'react';
import { PataPataImages } from '../assets/images';
import { RESTAURANT_INFO } from '../data/restaurantData';
import { Eye, X, Camera, Sparkles, ExternalLink, Instagram } from 'lucide-react';

interface GalleryItem {
  id: string;
  image: string;
  title: string;
  category: string;
  desc: string;
}

export const GallerySection: React.FC = () => {
  const [activePhoto, setActivePhoto] = useState<GalleryItem | null>(null);

  const galleryItems: GalleryItem[] = [
    {
      id: 'g-1',
      image: PataPataImages.miriamPainting,
      title: 'Mama Africa Miriam Makeba Canvas',
      category: 'Original Restaurant Artwork',
      desc: 'The iconic hand-painted portrait of Miriam Makeba hanging proudly inside Pata Pata at 286 Fox Street, painted in 2015 by O. Dowery to honor our namesake.',
    },
    {
      id: 'g-2',
      image: PataPataImages.hero,
      title: 'Twilight on Fox Street',
      category: 'Alfresco Sidewalk Dining',
      desc: 'Diners laughing under string lights as the artistic energy of Maboneng comes alive around 286 Fox Street.',
    },
    {
      id: 'g-3',
      image: PataPataImages.oxtail,
      title: 'Slow-Braised Oxtail Potjie',
      category: 'Ukudla Kwesintu',
      desc: 'Simmered gently for five hours with rich aromatics, served with traditional pap and fiery chakalaka relish.',
    },
    {
      id: 'g-4',
      image: PataPataImages.jazz,
      title: 'Live Afro-Jazz & Soul',
      category: 'Sophiatown Stage',
      desc: 'The heart and rhythm of Joburg: live brass, upright bass, and soulful melodies inside our vintage haven.',
    },
    {
      id: 'g-5',
      image: PataPataImages.grill,
      title: 'Sizzling Braai Platter',
      category: 'Open Flame Grills',
      desc: 'T-bone steak, boerewors coils, peri-peri wings, and golden chips straight from the fire.',
    },
    {
      id: 'g-6',
      image: PataPataImages.cocktails,
      title: 'Artisanal African Spirits',
      category: 'Craft Bar & Cocktails',
      desc: 'Botanical Fynbos gin infusions, house rooibos honey syrups, and crisp Joburg craft draughts.',
    },
  ];

  return (
    <section id="gallery" className="py-20 bg-[#0d0b09] text-[#faf5ee] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-[#e67329] mb-3 font-sans">
            <Camera className="w-3.5 h-3.5 text-[#f59e0b]" />
            <span>The Atmosphere & Tastes</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-[#faf5ee] mb-4">
            Fox Street Moments
          </h2>
          <p className="font-sans text-sm sm:text-base text-[#b0a08e]">
            A glimpse into the warm laughter, soulful jazz notes, and mouthwatering pans that make Pata Pata iconic.
          </p>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {galleryItems.map((item) => (
            <div
              key={item.id}
              onClick={() => setActivePhoto(item)}
              className="group relative rounded-2xl overflow-hidden bg-[#16120e] border border-[#2e2319] hover:border-[#e67329]/60 cursor-pointer shadow-xl transition-all duration-300 transform hover:-translate-y-1"
            >
              <div className="relative h-64 overflow-hidden">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0d0b09] via-[#0d0b09]/30 to-transparent opacity-80 group-hover:opacity-60 transition-opacity" />

                {/* Hover overlay hint */}
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/30 backdrop-blur-xs">
                  <span className="p-3 bg-[#e67329] text-white rounded-full shadow-lg">
                    <Eye className="w-5 h-5" />
                  </span>
                </div>

                <div className="absolute bottom-4 left-4 right-4">
                  <span className="text-[10px] uppercase font-sans font-bold tracking-wider text-[#f59e0b] block mb-1">
                    {item.category}
                  </span>
                  <h3 className="font-serif text-lg font-bold text-[#faf5ee]">
                    {item.title}
                  </h3>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Official Social Media Community Callout */}
        <div className="mt-12 flex flex-wrap items-center justify-center gap-3.5 text-center">
          <a
            href={RESTAURANT_INFO.tiktokUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2.5 px-5 py-2.5 bg-[#18130e] hover:bg-[#251b14] border border-[#382b1e] hover:border-[#e67329] text-xs sm:text-sm font-semibold text-[#faf5ee] rounded-2xl transition-all shadow-lg group transform hover:-translate-y-0.5"
          >
            <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 text-[#e67329] group-hover:scale-110 transition-transform">
              <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1.04-.1z" />
            </svg>
            <span>TikTok: <strong className="text-[#f59e0b]">@pata.pata_maboneng</strong></span>
            <ExternalLink className="w-3.5 h-3.5 opacity-70 group-hover:opacity-100" />
          </a>

          <a
            href={RESTAURANT_INFO.instagramUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2.5 px-5 py-2.5 bg-[#18130e] hover:bg-[#251b14] border border-[#382b1e] hover:border-[#e67329] text-xs sm:text-sm font-semibold text-[#faf5ee] rounded-2xl transition-all shadow-lg group transform hover:-translate-y-0.5"
          >
            <Instagram className="w-4 h-4 text-[#e67329] group-hover:scale-110 transition-transform" />
            <span>Instagram: <strong className="text-[#f59e0b]">@pata.pata_maboneng</strong></span>
            <ExternalLink className="w-3.5 h-3.5 opacity-70 group-hover:opacity-100" />
          </a>
        </div>
      </div>

      {/* Lightbox Modal */}
      {activePhoto && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md animate-in fade-in duration-200">
          <div className="relative max-w-4xl w-full bg-[#18130e] border border-[#3d2e20] rounded-3xl overflow-hidden shadow-2xl flex flex-col md:flex-row">
            <button
              onClick={() => setActivePhoto(null)}
              className="absolute top-4 right-4 z-10 p-2 bg-[#12100e]/80 text-[#faf5ee] hover:bg-[#e67329] rounded-full transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="md:w-3/5 relative h-72 md:h-auto min-h-[320px]">
              <img
                src={activePhoto.image}
                alt={activePhoto.title}
                className="w-full h-full object-cover"
              />
            </div>

            <div className="md:w-2/5 p-6 sm:p-8 flex flex-col justify-between bg-[#1c1611]">
              <div>
                <span className="text-xs uppercase font-sans tracking-widest text-[#e67329] font-bold">
                  {activePhoto.category}
                </span>
                <h3 className="font-serif text-2xl font-bold text-[#faf5ee] mt-1 mb-3">
                  {activePhoto.title}
                </h3>
                <p className="text-xs sm:text-sm text-[#b8a794] leading-relaxed">
                  {activePhoto.desc}
                </p>
              </div>

              <div className="mt-8 pt-4 border-t border-[#2e2319] text-xs text-[#8c7d6c]">
                <p>286 Fox Street, Maboneng Precinct, Johannesburg</p>
                <p className="text-[#f59e0b] font-medium mt-1">Open Daily from 08:00 to 23:00</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
