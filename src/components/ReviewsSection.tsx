import React, { useState, useEffect, useRef } from 'react';
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
  ShieldCheck, 
  RefreshCw, 
  CheckCircle2, 
  UploadCloud,
  Edit2,
  RotateCcw,
  EyeOff,
  FileText
} from 'lucide-react';
import { 
  GuestPhoto, 
  loadStoredSlots, 
  saveStoredSlots, 
  clearStoredSlots,
  loadHideAiPreference,
  saveHideAiPreference,
  optimizeUserImage 
} from '../utils/photoStorage';
import { UploadGuestPhotoModal } from './UploadGuestPhotoModal';

const DEFAULT_SLOTS: GuestPhoto[] = [
  {
    id: 'slot-1',
    image: PataPataImages.guestsLadies,
    caption: 'Ladies Day Out & Traditional Pots',
    tag: 'Ukudla Kwesintu',
    detail: 'Sharing traditional Durban curries, potjie stews, hot rotis, and laughs in our sunlit dining room at 286 Fox Street.',
    isUserUpload: false,
  },
  {
    id: 'slot-2',
    image: PataPataImages.guestsPeaceSign,
    caption: 'Peace & Unmatched Joburg Energy',
    tag: 'Braai & Good Vibes',
    detail: 'Sizzling braai ribs, slow-cooked lamb with creamy mash, and ice-cold drinks by our vintage pressed-tin ceiling wall.',
    isUserUpload: false,
  },
  {
    id: 'slot-3',
    image: PataPataImages.guestsCoupleTable,
    caption: 'Cozy Dates & Township Classics',
    tag: 'Soul Food',
    detail: 'Tucking into flavorful chicken curries and crispy hand-cut chips in rustic enamel mugs surrounded by vintage decor.',
    isUserUpload: false,
  },
  {
    id: 'slot-4',
    image: PataPataImages.guestsCoupleBurger,
    caption: 'Towering Burgers & Cold Draughts',
    tag: 'Burgers & Beers',
    detail: 'Enjoying the famous Pata Pata burger with golden onion rings and craft beer under the watchful smile of Mama Africa.',
    isUserUpload: false,
  },
];

export const ReviewsSection: React.FC = () => {
  const [slots, setSlots] = useState<GuestPhoto[]>(DEFAULT_SLOTS);
  const [hideAiPlaceholders, setHideAiPlaceholders] = useState<boolean>(false);
  const [activePhoto, setActivePhoto] = useState<GuestPhoto | null>(null);
  const [isBatchModalOpen, setIsBatchModalOpen] = useState(false);
  const [targetSlotIndex, setTargetSlotIndex] = useState<number | null>(null);
  const [notification, setNotification] = useState<string | null>(null);
  const [editingPhoto, setEditingPhoto] = useState<GuestPhoto | null>(null);

  // Hidden file inputs for 1-click replacement on each card
  const singleSlotInputRefs = useRef<(HTMLInputElement | null)[]>([]);

  // Initialize from localStorage and preserve original authentic captions
  useEffect(() => {
    const savedSlots = loadStoredSlots();
    if (savedSlots && savedSlots.length > 0) {
      // Ensure authentic slot captions remain as they were even if previously overridden by test filenames
      const sanitized = savedSlots.map((slot, idx) => {
        const defaultInfo = DEFAULT_SLOTS[idx];
        if (defaultInfo && (!slot.caption || slot.caption.startsWith('Fox Street Real Moment') || slot.caption.includes('.jpg') || slot.caption.includes('.png'))) {
          return {
            ...slot,
            caption: defaultInfo.caption,
            tag: defaultInfo.tag,
            detail: defaultInfo.detail,
          };
        }
        return slot;
      });
      setSlots(sanitized);
    }
    setHideAiPlaceholders(loadHideAiPreference());
  }, []);

  const showToast = (msg: string) => {
    setNotification(msg);
    setTimeout(() => setNotification(null), 4000);
  };

  // Direct 1-click single-slot file replacement (strictly keeps captions as they were)
  const handleSingleSlotFileSelected = async (slotIndex: number, e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      showToast('Processing original photo with zero AI alterations...');
      const optimizedUrl = await optimizeUserImage(file);
      const existing = slots[slotIndex];
      const defaultInfo = DEFAULT_SLOTS[slotIndex];

      // Strictly keep original caption, tag, detail as they were
      const captionToKeep = existing?.caption && !existing.caption.startsWith('Fox Street Real Moment')
        ? existing.caption
        : defaultInfo?.caption || 'Authentic Moment';

      const tagToKeep = existing?.tag && existing.tag !== 'Real Diners at 286 Fox'
        ? existing.tag
        : defaultInfo?.tag || 'Ukudla Kwesintu';

      const detailToKeep = existing?.detail && existing.detail !== 'Authentic camera photo with zero AI alterations.'
        ? existing.detail
        : defaultInfo?.detail || 'Original moment at 286 Fox Street.';

      const updated = [...slots];
      updated[slotIndex] = {
        ...existing,
        id: `user-photo-${Date.now()}-${slotIndex}`,
        image: optimizedUrl,
        // Captions remain as they were
        caption: captionToKeep,
        tag: tagToKeep,
        detail: detailToKeep,
        isUserUpload: true,
        uploadedAt: Date.now(),
      };

      setSlots(updated);
      saveStoredSlots(updated);
      showToast(`Picture updated for “${captionToKeep}” (caption preserved)!`);

      if (activePhoto && activePhoto.id === slots[slotIndex]?.id) {
        setActivePhoto(updated[slotIndex]);
      }
    } catch (err) {
      console.error('Failed to replace photo:', err);
      showToast('Failed to process image file. Please try another JPG/PNG file.');
    } finally {
      e.target.value = '';
    }
  };

  // Batch replacement from modal (strictly keeps captions as they were)
  const handleBatchReplaceSlots = (newPhotos: GuestPhoto[], clearRemainingAi: boolean) => {
    let updated = [...slots];

    if (targetSlotIndex !== null && targetSlotIndex !== undefined) {
      // Replaced single targeted slot
      if (newPhotos[0]) {
        const existing = updated[targetSlotIndex];
        const defaultInfo = DEFAULT_SLOTS[targetSlotIndex];
        updated[targetSlotIndex] = {
          ...existing,
          image: newPhotos[0].image,
          caption: existing?.caption || defaultInfo?.caption || 'Authentic Moment',
          tag: existing?.tag || defaultInfo?.tag || 'Real Diners',
          detail: existing?.detail || defaultInfo?.detail || 'Original moment at 286 Fox Street.',
          isUserUpload: true,
          uploadedAt: Date.now(),
        };
      }
    } else {
      // Sequentially replace pictures in order, keeping captions as they were
      for (let i = 0; i < newPhotos.length; i++) {
        if (i < updated.length) {
          const existing = updated[i];
          const defaultInfo = DEFAULT_SLOTS[i];
          updated[i] = {
            ...existing,
            image: newPhotos[i].image,
            caption: existing?.caption || defaultInfo?.caption || 'Authentic Moment',
            tag: existing?.tag || defaultInfo?.tag || 'Real Diners',
            detail: existing?.detail || defaultInfo?.detail || 'Original moment at 286 Fox Street.',
            isUserUpload: true,
            uploadedAt: Date.now(),
          };
        }
      }

      // If user chose to clear remaining AI photos, filter out non-uploaded slots
      if (clearRemainingAi && newPhotos.length < updated.length) {
        updated = updated.filter((s) => s.isUserUpload);
      }
    }

    setSlots(updated);
    saveStoredSlots(updated);
    setTargetSlotIndex(null);
    showToast(`Updated ${newPhotos.length} photo(s) in place — captions kept intact!`);
  };

  // Reset a specific slot back to default
  const handleResetSlot = (slotIndex: number, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    if (!window.confirm('Reset this slot back to the default image?')) return;

    const defaultFallback = DEFAULT_SLOTS[slotIndex] || {
      id: `slot-${slotIndex + 1}`,
      image: PataPataImages.hero,
      caption: `Diner Moment #${slotIndex + 1}`,
      tag: 'Fox Street',
      detail: 'Pata Pata dining experience.',
      isUserUpload: false,
    };

    const updated = [...slots];
    updated[slotIndex] = defaultFallback;
    setSlots(updated);
    saveStoredSlots(updated);
    if (activePhoto?.id === slots[slotIndex]?.id) {
      setActivePhoto(null);
    }
    showToast(`Slot #${slotIndex + 1} reset to default.`);
  };

  // Reset all slots
  const handleResetAllSlots = () => {
    if (!window.confirm('Reset all 4 photos back to the original sample slots?')) return;
    clearStoredSlots();
    setSlots(DEFAULT_SLOTS);
    setHideAiPlaceholders(false);
    saveHideAiPreference(false);
    setActivePhoto(null);
    showToast('Reset all slots to default.');
  };

  // Toggle hiding AI placeholders
  const handleToggleHideAi = () => {
    const nextVal = !hideAiPlaceholders;
    setHideAiPlaceholders(nextVal);
    saveHideAiPreference(nextVal);
    showToast(nextVal ? 'Hiding AI sample photos.' : 'Showing all photo slots.');
  };

  // Save manual edits from edit modal
  const handleSavePhotoEdit = () => {
    if (!editingPhoto) return;
    const updated = slots.map((s) => (s.id === editingPhoto.id ? editingPhoto : s));
    setSlots(updated);
    saveStoredSlots(updated);
    if (activePhoto?.id === editingPhoto.id) {
      setActivePhoto(editingPhoto);
    }
    setEditingPhoto(null);
    showToast('Updated photo details.');
  };

  const userPhotosCount = slots.filter((s) => s.isUserUpload).length;
  const displayedSlots = hideAiPlaceholders ? slots.filter((s) => s.isUserUpload) : slots;

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

        {/* Notification Toast */}
        {notification && (
          <div className="max-w-md mx-auto mb-6 p-3 bg-emerald-950/80 border border-emerald-600/50 rounded-xl flex items-center justify-between gap-3 text-xs text-emerald-200 animate-in fade-in duration-200 shadow-lg">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>{notification}</span>
            </div>
            <button
              onClick={() => setNotification(null)}
              className="text-emerald-400 hover:text-white"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        )}

        {/* Real Guests, Real Moments Header & Direct Replacement Toolbar */}
        <div className="mb-8 p-6 bg-[#18130e] border border-[#35271a] rounded-3xl flex flex-col lg:flex-row lg:items-center justify-between gap-6 shadow-xl">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <Camera className="w-5 h-5 text-[#e67329]" />
              <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#faf5ee]">
                Real Guests, Real Moments
              </h3>
            </div>
            <p className="text-xs sm:text-sm text-[#b8a794] flex flex-wrap items-center gap-x-2 gap-y-1">
              <span className="inline-flex items-center gap-1 text-[#f59e0b] font-medium">
                <ShieldCheck className="w-3.5 h-3.5 text-[#f59e0b]" />
                100% Authentic diner snapshots
              </span>
              <span className="text-[#6d5e4f] hidden sm:inline">•</span>
              <span>Click <strong>“Change Picture”</strong> on any card to put your photo in place of the AI picture. <strong>Captions & stories remain as they are.</strong></span>
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2.5 shrink-0">
            {/* Replace All Button */}
            <button
              onClick={() => {
                setTargetSlotIndex(null);
                setIsBatchModalOpen(true);
              }}
              className="px-4 py-2.5 bg-gradient-to-r from-[#c2410c] to-[#e67329] hover:from-[#b03a0a] hover:to-[#d4651e] text-white rounded-xl text-xs font-bold flex items-center gap-2 shadow-lg shadow-[#c2410c]/20 transition-all transform hover:-translate-y-0.5"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>Replace AI Pictures (Keep Captions)</span>
            </button>

            {/* Toggle Hide AI Samples */}
            <button
              onClick={handleToggleHideAi}
              className={`px-3 py-2.5 rounded-xl text-xs font-semibold border transition-all flex items-center gap-1.5 ${
                hideAiPlaceholders
                  ? 'bg-[#291b12] border-[#e67329] text-[#f59e0b]'
                  : 'bg-[#1e1711] border-[#382b1e] text-[#a89885] hover:text-[#faf5ee]'
              }`}
              title="Toggle AI placeholder cards"
            >
              <EyeOff className="w-3.5 h-3.5" />
              <span>{hideAiPlaceholders ? 'Show All Slots' : 'Hide AI Samples'}</span>
            </button>

            {/* Reset All (if any replaced) */}
            {userPhotosCount > 0 && (
              <button
                onClick={handleResetAllSlots}
                className="p-2.5 bg-[#1f1711] hover:bg-[#2d1e13] text-[#9c8b78] hover:text-red-400 border border-[#382b1e] rounded-xl text-xs transition-colors"
                title="Reset all slots back to original"
              >
                <RotateCcw className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>

        {/* Empty state if user hid AI placeholders and hasn't uploaded any yet */}
        {displayedSlots.length === 0 && (
          <div className="text-center py-16 px-4 bg-[#18130e] border-2 border-dashed border-[#3d2e20] rounded-3xl mb-16">
            <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-[#261d15] flex items-center justify-center text-[#e67329]">
              <UploadCloud className="w-8 h-8" />
            </div>
            <h4 className="font-serif text-xl font-bold text-[#faf5ee] mb-2">
              All AI Photos Hidden
            </h4>
            <p className="text-xs text-[#9c8b78] max-w-md mx-auto mb-6 leading-relaxed">
              Upload your genuine restaurant photos to take the place of the sample placeholders. Your captions and stories will be preserved.
            </p>
            <button
              onClick={() => {
                setTargetSlotIndex(null);
                setIsBatchModalOpen(true);
              }}
              className="px-5 py-3 bg-[#e67329] hover:bg-[#c2410c] text-white text-xs font-bold rounded-xl shadow-lg transition-all inline-flex items-center gap-2"
            >
              <Camera className="w-4 h-4" />
              <span>Upload Your Real Photos Now</span>
            </button>
          </div>
        )}

        {/* 4 Photo Slots Grid: Direct In-Place Replacement While Preserving Captions */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-16">
          {displayedSlots.map((slot, index) => {
            const originalIndex = slots.findIndex((s) => s.id === slot.id);
            const actualIndex = originalIndex >= 0 ? originalIndex : index;

            return (
              <div
                key={slot.id}
                className={`group relative rounded-2xl overflow-hidden bg-[#18130e] border transition-all duration-300 shadow-xl flex flex-col ${
                  slot.isUserUpload
                    ? 'border-emerald-600/60 hover:border-emerald-500'
                    : 'border-[#302419] hover:border-[#e67329]/70'
                }`}
              >
                {/* Hidden File Input for this specific slot */}
                <input
                  ref={(el) => {
                    singleSlotInputRefs.current[actualIndex] = el;
                  }}
                  type="file"
                  accept="image/*"
                  onChange={(e) => handleSingleSlotFileSelected(actualIndex, e)}
                  className="hidden"
                />

                {/* Photo Image Container */}
                <div 
                  onClick={() => setActivePhoto(slot)}
                  className="relative h-64 sm:h-60 overflow-hidden bg-black/60 cursor-pointer"
                >
                  <img
                    src={slot.image}
                    alt={slot.caption}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#18130e] via-transparent to-transparent opacity-80" />

                  {/* Top Status Badge */}
                  <div className="absolute top-3 left-3 right-3 flex items-center justify-between gap-2 z-10">
                    {slot.isUserUpload ? (
                      <span className="text-[10px] font-sans font-bold tracking-wider uppercase px-2 py-0.5 rounded-md border bg-emerald-950/90 text-emerald-300 border-emerald-500/60 backdrop-blur-sm flex items-center gap-1 shadow">
                        <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                        <span>Your Real Photo</span>
                      </span>
                    ) : (
                      <span className="text-[10px] font-sans font-bold tracking-wider uppercase px-2 py-0.5 rounded-md border bg-[#12100e]/90 text-[#f59e0b] border-[#e67329]/50 backdrop-blur-sm shadow">
                        Sample Photo #{actualIndex + 1}
                      </span>
                    )}

                    {slot.isUserUpload && (
                      <button
                        onClick={(e) => handleResetSlot(actualIndex, e)}
                        className="p-1 bg-black/75 hover:bg-red-700 text-[#d4c3b2] hover:text-white rounded-lg transition-colors border border-black/40 text-[10px]"
                        title="Reset to default placeholder"
                      >
                        <RotateCcw className="w-3 h-3" />
                      </button>
                    )}
                  </div>

                  {/* Hover Quick Actions */}
                  <div className="absolute inset-0 flex items-center justify-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity bg-black/50 backdrop-blur-xs">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        singleSlotInputRefs.current[actualIndex]?.click();
                      }}
                      className="px-3 py-2 bg-[#e67329] hover:bg-[#c2410c] text-white rounded-xl text-xs font-bold shadow-lg flex items-center gap-1.5 transition-transform transform hover:scale-105"
                    >
                      <Camera className="w-3.5 h-3.5" />
                      <span>Change Picture</span>
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setActivePhoto(slot);
                      }}
                      className="p-2 bg-black/70 hover:bg-black text-white rounded-xl shadow-lg transition-colors"
                      title="View full image"
                    >
                      <Eye className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* Card Content & In-Place Controls: Captions are strictly preserved */}
                <div className="p-4 flex-1 flex flex-col justify-between">
                  <div>
                    {/* Tag badge */}
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="text-[10px] font-sans font-bold uppercase tracking-wider text-[#e67329] px-2 py-0.5 bg-[#14100c] rounded border border-[#2b2118]">
                        {slot.tag}
                      </span>
                      {slot.isUserUpload && (
                        <button
                          onClick={() => setEditingPhoto(slot)}
                          className="text-[#8c7d6c] hover:text-[#e67329] p-0.5 shrink-0"
                          title="Edit title & tags"
                        >
                          <Edit2 className="w-3.5 h-3.5" />
                        </button>
                      )}
                    </div>

                    <h4 className="font-serif font-bold text-sm text-[#faf5ee] group-hover:text-[#f59e0b] transition-colors leading-snug mb-1.5">
                      {slot.caption}
                    </h4>

                    <p className="text-xs text-[#9e8f7e] leading-relaxed line-clamp-2 mb-3">
                      {slot.detail}
                    </p>
                  </div>

                  {/* Direct bottom replace button */}
                  <div className="pt-3 border-t border-[#261d15] flex items-center justify-between gap-2">
                    <button
                      onClick={() => singleSlotInputRefs.current[actualIndex]?.click()}
                      className={`w-full py-1.5 px-3 rounded-xl text-xs font-semibold transition-all flex items-center justify-center gap-1.5 ${
                        slot.isUserUpload
                          ? 'bg-[#1e1711] hover:bg-[#2b1f15] text-[#d4c3b2] hover:text-white border border-[#3b2d1f]'
                          : 'bg-[#291b12] hover:bg-[#e67329] text-[#f59e0b] hover:text-white border border-[#e67329]/50 shadow-sm'
                      }`}
                    >
                      <Camera className="w-3.5 h-3.5" />
                      <span>{slot.isUserUpload ? 'Change Picture' : 'Replace Picture (Keep Caption)'}</span>
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
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

      {/* Lightbox Modal for Full Authentic Guest Photo View */}
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
                  {activePhoto.isUserUpload ? '100% Genuine · In Place of AI' : 'Sample Photo'}
                </span>
              </div>

              <div className="flex items-center gap-2">
                <a
                  href={activePhoto.image}
                  download={`patapata-${activePhoto.caption.toLowerCase().replace(/\s+/g, '-')}.jpg`}
                  className="p-2 bg-[#221811] hover:bg-[#33261a] text-[#c9b9a6] hover:text-[#f59e0b] rounded-xl transition-colors border border-[#3d2c1e] text-xs flex items-center gap-1.5"
                  title="Download full image"
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

            {/* Native Resolution & Unfiltered Image Container */}
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
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-[10px] uppercase font-sans font-bold tracking-widest text-[#e67329] block">
                    {activePhoto.tag} · Real Moment
                  </span>
                  {activePhoto.isUserUpload && (
                    <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-950 border border-emerald-600/40 text-emerald-400 font-medium">
                      ✓ Authentic Camera Photo
                    </span>
                  )}
                </div>
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

      {/* Quick Edit Details Modal */}
      {editingPhoto && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
          <div className="bg-[#18130e] border border-[#3d2e20] rounded-3xl p-6 max-w-md w-full shadow-2xl space-y-4">
            <div className="flex items-center justify-between">
              <h4 className="font-serif text-lg font-bold text-[#faf5ee]">
                Edit Photo Details
              </h4>
              <button
                onClick={() => setEditingPhoto(null)}
                className="text-[#9c8b78] hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div>
                <label className="text-[#a89885] uppercase block font-bold mb-1">
                  Title / Caption
                </label>
                <input
                  type="text"
                  value={editingPhoto.caption}
                  onChange={(e) =>
                    setEditingPhoto({ ...editingPhoto, caption: e.target.value })
                  }
                  className="w-full px-3 py-2 bg-[#120f0c] border border-[#382b1e] rounded-xl text-[#faf5ee] focus:border-[#e67329] focus:outline-none"
                />
              </div>

              <div>
                <label className="text-[#a89885] uppercase block font-bold mb-1">
                  Vibe / Category Tag
                </label>
                <input
                  type="text"
                  value={editingPhoto.tag}
                  onChange={(e) =>
                    setEditingPhoto({ ...editingPhoto, tag: e.target.value })
                  }
                  className="w-full px-3 py-2 bg-[#120f0c] border border-[#382b1e] rounded-xl text-[#faf5ee] focus:border-[#e67329] focus:outline-none"
                />
              </div>

              <div>
                <label className="text-[#a89885] uppercase block font-bold mb-1">
                  Details / Story
                </label>
                <textarea
                  value={editingPhoto.detail}
                  onChange={(e) =>
                    setEditingPhoto({ ...editingPhoto, detail: e.target.value })
                  }
                  rows={3}
                  className="w-full px-3 py-2 bg-[#120f0c] border border-[#382b1e] rounded-xl text-[#faf5ee] focus:border-[#e67329] focus:outline-none"
                />
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-2">
              <button
                onClick={() => setEditingPhoto(null)}
                className="px-4 py-2 bg-[#221811] text-[#b8a794] text-xs font-semibold rounded-xl hover:bg-[#2e2017]"
              >
                Cancel
              </button>
              <button
                onClick={handleSavePhotoEdit}
                className="px-4 py-2 bg-[#e67329] text-white text-xs font-bold rounded-xl hover:bg-[#c2410c]"
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Batch or Slot Upload Modal with Current Slots passed for Caption Preservation */}
      <UploadGuestPhotoModal
        isOpen={isBatchModalOpen}
        onClose={() => {
          setIsBatchModalOpen(false);
          setTargetSlotIndex(null);
        }}
        onReplaceSlots={handleBatchReplaceSlots}
        targetSlotIndex={targetSlotIndex}
        currentSlots={slots}
      />
    </section>
  );
};
