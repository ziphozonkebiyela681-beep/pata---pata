import React, { useState, useEffect } from 'react';
import { REVIEWS } from '../data/restaurantData';
import { PataPataImages } from '../assets/images';
import { 
  Star, 
  ThumbsUp, 
  Heart, 
  Camera, 
  X, 
  Eye, 
  Download, 
  MapPin
} from 'lucide-react';
import { 
  GuestPhoto, 
  loadStoredSlots 
} from '../utils/photoStorage';

const DEFAULT_MOMENTS: GuestPhoto[] = [
  {
    id: 'moment-1',
    image: PataPataImages.guestMoment1,
    caption: 'Ladies Day Out & Traditional Pots',
    tag: 'Ukudla Kwesintu',
    detail: 'Sharing traditional Durban curries, potjie stews, hot rotis, and laughs in our sunlit dining room at 286 Fox Street.',
    isUserUpload: true,
  },
  {
    id: 'moment-2',
    image: PataPataImages.guestMoment2,
    caption: 'Peace & Unmatched Joburg Energy',
    tag: 'Braai & Good Vibes',
    detail: 'Sizzling braai ribs, slow-cooked lamb with creamy mash, and ice-cold drinks by our vintage pressed-tin ceiling wall.',
    isUserUpload: true,
  },
  {
    id: 'moment-3',
    image: PataPataImages.guestMoment3,
    caption: 'Cozy Dates & Township Classics',
    tag: 'Soul Food',
    detail: 'Tucking into flavorful chicken curries and crispy hand-cut chips in rustic enamel mugs surrounded by vintage decor.',
    isUserUpload: true,
  },
  {
    id: 'moment-4',
    image: PataPataImages.guestMoment4,
    caption: 'Towering Burgers & Cold Draughts',
    tag: 'Burgers & Beers',
    detail: 'Enjoying the famous Pata Pata burger with golden onion rings and craft beer under the watchful smile of Mama Africa.',
    isUserUpload: true,
  },
];

interface ReviewsSectionProps {
  momentsVersion?: number;
}

export const ReviewsSection: React.FC<ReviewsSectionProps> = ({ 
  momentsVersion = 0,
}) => {
  const [moments, setMoments] = useState<GuestPhoto[]>(DEFAULT_MOMENTS);
  const [activePhoto, setActivePhoto] = useState<GuestPhoto | null>(null);

  // Preserve user images if saved in browser storage
  useEffect(() => {
    const saved = loadStoredSlots();
    if (saved && saved.length > 0) {
      const merged = DEFAULT_MOMENTS.map((defMoment, idx) => {
        const item = saved[idx];
        return {
          ...defMoment,
          image: item?.image || defMoment.image,
        };
      });
      setMoments(merged);
    }
  }, [momentsVersion]);

  return (
    <section className="py-20 bg-[#120f0c] text-[#faf5ee] relative border-t border-[#241c14]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-[#f59e0b] mb-3 font-sans">
            <Heart className="w-3.5 h-3.5 text-[#e67329] fill-current" />
            <span>Voices & Smiles of 286 Fox Street</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-[#faf5ee] mb-4">
            Loved on Fox Street
          </h2>
          <p className="font-sans text-sm sm:text-base text-[#b3a28f]">
            Real people, authentic smiles, and the vibrant township energy that makes Pata Pata a home away from home.
          </p>
        </div>

        {/* Aggregated Score & Rating Highlight Card */}
        <div className="mb-14 bg-[#1a140f] border border-[#35271a] rounded-2xl p-6 max-w-3xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-6 text-center sm:text-left shadow-xl">
          <div className="flex items-center gap-4">
            <div className="text-4xl sm:text-5xl font-serif font-black text-[#f59e0b]">
              4.6 <span className="text-lg text-[#8c7d6c]">/ 5</span>
            </div>
            <div>
              <div className="flex items-center gap-1 text-[#f59e0b] mb-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-current" />
                ))}
              </div>
              <p className="text-xs font-bold uppercase tracking-wider text-[#faf5ee]">
                Google & TripAdvisor Rating
              </p>
              <p className="text-[11px] text-[#9c8b78]">
                Based on 2,400+ verified diner ratings & reviews
              </p>
            </div>
          </div>

          <a
            href="https://maps.google.com/?q=Pata+Pata+286+Fox+Street+Maboneng"
            target="_blank"
            rel="noopener noreferrer"
            className="px-5 py-2.5 bg-[#261c14] hover:bg-[#33261a] border border-[#423122] rounded-xl text-xs font-semibold text-[#f59e0b] flex items-center gap-2 transition-colors whitespace-nowrap shadow-sm"
          >
            <ThumbsUp className="w-3.5 h-3.5" /> Read All Google Reviews
          </a>
        </div>

        {/* Real Guests, Real Moments Header */}
        <div className="mb-8 p-6 bg-[#18130e] border border-[#35271a] rounded-3xl flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-xl">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-[#261c14] text-[#e67329] border border-[#3d2b1c]">
              <Camera className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#faf5ee]">
                Real Guests, Real Moments
              </h3>
              <p className="text-xs sm:text-sm text-[#b8a794]">
                Authentic diner snapshots, warm hospitality, and the vibrant township energy that fills 286 Fox Street.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2.5 shrink-0 self-start sm:self-auto">
            <div className="flex items-center gap-1.5 text-xs text-[#a89885] bg-[#201812] px-3.5 py-1.5 rounded-xl border border-[#332418]">
              <MapPin className="w-3.5 h-3.5 text-[#e67329]" />
              <span>Maboneng Precinct, Joburg</span>
            </div>
          </div>
        </div>

        {/* 4 Guest Photo Moments Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {moments.map((slot) => (
            <div
              key={slot.id}
              onClick={() => setActivePhoto(slot)}
              className="group cursor-pointer rounded-2xl overflow-hidden bg-[#18130e] border border-[#302419] hover:border-[#e67329]/70 transition-all duration-300 shadow-xl flex flex-col hover:-translate-y-1"
            >
              {/* Photo Image Container */}
              <div className="relative h-64 sm:h-60 overflow-hidden bg-black/60">
                <img
                  src={slot.image}
                  alt={slot.caption}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#18130e] via-transparent to-transparent opacity-80" />

                {/* Hover overlay hint */}
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/40 backdrop-blur-xs">
                  <span className="px-3.5 py-1.5 bg-[#e67329] text-white rounded-xl text-xs font-semibold shadow-lg flex items-center gap-1.5">
                    <Eye className="w-3.5 h-3.5" />
                    <span>View Photo</span>
                  </span>
                </div>
              </div>

              {/* Card Content with Authentic Captions & Details */}
              <div className="p-5 flex-1 flex flex-col justify-between">
                <div>
                  <div className="mb-2">
                    <span className="text-[10px] font-sans font-bold uppercase tracking-wider text-[#e67329] px-2 py-0.5 bg-[#14100c] rounded border border-[#2b2118]">
                      {slot.tag}
                    </span>
                  </div>

                  <h4 className="font-serif font-bold text-base text-[#faf5ee] group-hover:text-[#f59e0b] transition-colors leading-snug mb-2">
                    {slot.caption}
                  </h4>

                  <p className="text-xs text-[#9e8f7e] leading-relaxed">
                    {slot.detail}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Written Verified Diner Reviews Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {REVIEWS.map((rev) => (
            <div
              key={rev.id}
              className="bg-[#18130e] border border-[#2b2118] hover:border-[#e67329]/50 p-6 rounded-2xl flex flex-col justify-between shadow-lg transition-all"
            >
              <div>
                <div className="flex items-center gap-1 text-[#f59e0b] mb-3">
                  {[...Array(rev.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-current" />
                  ))}
                </div>

                <p className="text-xs sm:text-sm text-[#c7b7a4] italic leading-relaxed mb-6 font-serif">
                  “{rev.text}”
                </p>
              </div>

              <div className="pt-4 border-t border-[#261d15] flex items-center justify-between text-xs">
                <div>
                  <h4 className="font-sans font-bold text-[#faf5ee]">{rev.name}</h4>
                  <p className="text-[11px] text-[#8c7c6a]">{rev.location}</p>
                </div>
                <span className="text-[10px] text-[#e67329] font-medium bg-[#1f1812] px-2 py-0.5 rounded border border-[#382a1d]">
                  {rev.source}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox Modal for Full Guest Photo View */}
      {activePhoto && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/92 backdrop-blur-md animate-in fade-in duration-200">
          <div className="relative max-w-4xl w-full bg-[#18130e] border border-[#3d2e20] rounded-3xl overflow-hidden shadow-2xl flex flex-col max-h-[92vh]">
            {/* Top Bar with Close & Actions */}
            <div className="p-4 bg-[#14100c] border-b border-[#2d2218] flex items-center justify-between z-10 shrink-0">
              <div className="flex items-center gap-2">
                <span className="text-xs font-sans font-bold uppercase tracking-wider text-[#e67329]">
                  {activePhoto.tag}
                </span>
                <span className="text-xs text-[#8c7d6c]">·</span>
                <span className="text-xs text-[#a69683]">
                  Pata Pata Experience
                </span>
              </div>

              <div className="flex items-center gap-2">
                <a
                  href={activePhoto.image}
                  download={`patapata-${activePhoto.caption.toLowerCase().replace(/\s+/g, '-')}.jpg`}
                  className="p-2 bg-[#221811] hover:bg-[#33261a] text-[#c9b9a6] hover:text-[#f59e0b] rounded-xl transition-colors border border-[#3d2c1e] text-xs flex items-center gap-1.5"
                  title="Download photo"
                >
                  <Download className="w-4 h-4" />
                  <span className="hidden sm:inline">Download</span>
                </a>

                <button
                  onClick={() => setActivePhoto(null)}
                  className="p-2 bg-[#221811] text-[#faf5ee] hover:bg-[#e67329] rounded-xl transition-colors border border-[#3d2c1e]"
                  aria-label="Close photo preview"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Native Resolution Photo View */}
            <div className="relative w-full flex-1 bg-black flex items-center justify-center overflow-hidden p-2 min-h-[300px]">
              <img
                src={activePhoto.image}
                alt={activePhoto.caption}
                className="w-auto h-auto max-w-full max-h-[65vh] object-contain rounded-lg"
              />
            </div>

            {/* Bottom Details Plaque */}
            <div className="p-5 sm:p-6 bg-[#1a140f] border-t border-[#2e2319] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shrink-0">
              <div>
                <span className="text-[10px] uppercase font-sans font-bold tracking-widest text-[#e67329] block mb-1">
                  {activePhoto.tag} · Real Diner Moment
                </span>
                <h3 className="font-serif text-lg sm:text-xl font-bold text-[#faf5ee]">
                  {activePhoto.caption}
                </h3>
                <p className="text-xs text-[#b8a794] mt-1 max-w-xl leading-relaxed">
                  {activePhoto.detail}
                </p>
              </div>

              <div className="text-left sm:text-right shrink-0">
                <span className="text-xs text-[#8c7d6c] font-medium bg-[#241c15] px-3 py-1.5 rounded-xl border border-[#382b1e] inline-block">
                  286 Fox St, Maboneng
                </span>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
