import React, { useState, useRef, ChangeEvent, DragEvent } from 'react';
import { X, UploadCloud, Image as ImageIcon, Trash2, CheckCircle2, ShieldCheck, AlertCircle, RefreshCw, FileText } from 'lucide-react';
import { GuestPhoto, optimizeUserImage } from '../utils/photoStorage';

interface UploadGuestPhotoModalProps {
  isOpen: boolean;
  onClose: () => void;
  onReplaceSlots: (newPhotos: GuestPhoto[], clearRemainingAi: boolean) => void;
  targetSlotIndex?: number | null; // If replacing a specific slot, 0-indexed
  currentSlots: GuestPhoto[];
}

interface PendingPhoto {
  id: string;
  dataUrl: string;
  name: string;
  caption: string;
  tag: string;
  detail: string;
  slotIndex: number;
}

export const UploadGuestPhotoModal: React.FC<UploadGuestPhotoModalProps> = ({
  isOpen,
  onClose,
  onReplaceSlots,
  targetSlotIndex,
  currentSlots,
}) => {
  const [pendingPhotos, setPendingPhotos] = useState<PendingPhoto[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [clearRemainingAi, setClearRemainingAi] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  if (!isOpen) return null;

  const isSingleSlot = targetSlotIndex !== null && targetSlotIndex !== undefined;

  const handleFiles = async (files: FileList | null) => {
    if (!files || files.length === 0) return;
    setErrorMessage(null);
    setIsProcessing(true);

    const newPending: PendingPhoto[] = [];
    const maxFiles = isSingleSlot ? 1 : Math.max(currentSlots.length, 4);

    for (let i = 0; i < Math.min(files.length, maxFiles); i++) {
      const file = files[i];
      if (!file.type.startsWith('image/')) {
        continue;
      }

      const assignedSlotIndex = isSingleSlot ? (targetSlotIndex ?? 0) : i;
      const targetSlot = currentSlots[assignedSlotIndex];

      try {
        const optimizedUrl = await optimizeUserImage(file);

        // Keep the exact existing caption, tag, and detail of that slot as they were
        newPending.push({
          id: `user-photo-${Date.now()}-${i}`,
          dataUrl: optimizedUrl,
          name: file.name,
          caption: targetSlot?.caption || 'Authentic Pata Pata Moment',
          tag: targetSlot?.tag || 'Real Diners',
          detail: targetSlot?.detail || 'Original photo at 286 Fox Street.',
          slotIndex: assignedSlotIndex,
        });
      } catch (err) {
        console.error('Error processing file:', file.name, err);
        setErrorMessage('One or more images could not be loaded. Please ensure valid JPG, PNG, or WEBP files.');
      }
    }

    if (isSingleSlot) {
      setPendingPhotos(newPending);
    } else {
      setPendingPhotos((prev) => [...prev, ...newPending]);
    }
    setIsProcessing(false);
  };

  const onFileInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    handleFiles(e.target.files);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const onDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const onDragLeave = () => {
    setIsDragging(false);
  };

  const onDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    handleFiles(e.dataTransfer.files);
  };

  const handleRemovePending = (id: string) => {
    setPendingPhotos((prev) => prev.filter((p) => p.id !== id));
  };

  const handleSubmit = () => {
    if (pendingPhotos.length === 0) return;

    const formattedPhotos: GuestPhoto[] = pendingPhotos.map((p) => ({
      id: p.id,
      image: p.dataUrl,
      // Keep existing caption, tag, detail as they were
      caption: p.caption,
      tag: p.tag,
      detail: p.detail,
      isUserUpload: true,
      uploadedAt: Date.now(),
    }));

    onReplaceSlots(formattedPhotos, clearRemainingAi);
    setPendingPhotos([]);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-200 overflow-y-auto">
      <div className="relative w-full max-w-2xl bg-[#16120e] border border-[#3d2e20] rounded-3xl overflow-hidden shadow-2xl my-8 flex flex-col max-h-[90vh]">
        {/* Modal Header */}
        <div className="p-6 bg-[#1f1812] border-b border-[#302318] flex items-center justify-between shrink-0">
          <div>
            <div className="inline-flex items-center gap-2 text-[10px] font-sans font-bold tracking-widest text-[#f59e0b] uppercase mb-1">
              <ShieldCheck className="w-3.5 h-3.5 text-[#e67329]" />
              <span>Preserving Original Captions · Zero AI</span>
            </div>
            <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#faf5ee]">
              {isSingleSlot
                ? `Change Picture for “${currentSlots[targetSlotIndex ?? 0]?.caption}”`
                : 'Replace AI Pictures (Captions Remain Intact)'}
            </h3>
            <p className="text-xs text-[#a89885] mt-0.5">
              Your new picture will take the place of the image, keeping the exact title and story as they were.
            </p>
          </div>

          <button
            onClick={onClose}
            className="p-2 bg-[#261d15] hover:bg-[#e67329] text-[#c9b9a6] hover:text-white rounded-full transition-colors"
            aria-label="Close upload modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto space-y-6 flex-1">
          {/* Caption Preservation Notice */}
          <div className="p-4 rounded-2xl bg-[#221810] border border-[#e67329]/40 flex items-start gap-3.5">
            <div className="p-2 bg-[#e67329]/20 text-[#f59e0b] rounded-xl shrink-0 mt-0.5">
              <FileText className="w-5 h-5 text-[#f59e0b]" />
            </div>
            <div className="text-xs text-[#d1c2af] leading-relaxed">
              <strong className="text-[#faf5ee] block font-semibold mb-0.5">
                Captions & Stories Remain Exactly As They Were
              </strong>
              Only the photo image will be replaced with your authentic camera snapshot. The original title (e.g. <em>Ladies Day Out</em>, <em>Peace & Unmatched Joburg Energy</em>, <em>Ukudla Kwesintu</em>) and descriptive text are preserved.
            </div>
          </div>

          {/* Upload Dropzone */}
          <div
            onDragOver={onDragOver}
            onDragLeave={onDragLeave}
            onDrop={onDrop}
            onClick={() => fileInputRef.current?.click()}
            className={`border-2 border-dashed rounded-2xl p-8 text-center cursor-pointer transition-all ${
              isDragging
                ? 'border-[#f59e0b] bg-[#2d1e12]'
                : 'border-[#423122] hover:border-[#e67329] bg-[#1a140f] hover:bg-[#201812]'
            }`}
          >
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              multiple={!isSingleSlot}
              onChange={onFileInputChange}
              className="hidden"
            />

            <div className="w-14 h-14 mx-auto mb-3 rounded-2xl bg-[#261d15] flex items-center justify-center text-[#f59e0b] shadow-inner group-hover:scale-105 transition-transform">
              <UploadCloud className="w-7 h-7" />
            </div>

            <p className="font-serif text-base font-bold text-[#faf5ee] mb-1">
              {isSingleSlot ? 'Choose Your Photo' : 'Select Photos to Replace AI Images'}
            </p>
            <p className="text-xs text-[#9c8b78] max-w-sm mx-auto mb-3">
              {isSingleSlot
                ? `Select an original camera photo to swap into Slot #${(targetSlotIndex ?? 0) + 1}.`
                : 'Select 1 to 4 original photos to replace the sample pictures in order.'}
            </p>

            <button
              type="button"
              className="px-4 py-2 bg-[#e67329] hover:bg-[#c2410c] text-white text-xs font-semibold rounded-xl transition-colors shadow-md inline-flex items-center gap-1.5"
            >
              <ImageIcon className="w-4 h-4" /> Browse Your Device
            </button>
          </div>

          {errorMessage && (
            <div className="p-3 bg-red-950/60 border border-red-800 rounded-xl flex items-center gap-2.5 text-xs text-red-200">
              <AlertCircle className="w-4 h-4 text-red-400 shrink-0" />
              <span>{errorMessage}</span>
            </div>
          )}

          {isProcessing && (
            <div className="text-center py-6 text-xs text-[#f59e0b] flex items-center justify-center gap-2">
              <div className="w-4 h-4 border-2 border-[#f59e0b] border-t-transparent rounded-full animate-spin" />
              <span>Processing your camera photo...</span>
            </div>
          )}

          {/* Pending Photos Preview & Customization List */}
          {pendingPhotos.length > 0 && (
            <div className="space-y-4 pt-2">
              <div className="flex items-center justify-between">
                <h4 className="font-serif text-sm font-bold text-[#faf5ee] flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  Ready to Apply ({pendingPhotos.length} {pendingPhotos.length === 1 ? 'photo' : 'photos'})
                </h4>
                <button
                  type="button"
                  onClick={() => setPendingPhotos([])}
                  className="text-xs text-[#a69683] hover:text-red-400 transition-colors"
                >
                  Clear
                </button>
              </div>

              <div className="space-y-3">
                {pendingPhotos.map((photo) => (
                  <div
                    key={photo.id}
                    className="p-3.5 bg-[#1f1812] border border-[#382b1f] rounded-2xl flex items-center gap-4 shadow-sm"
                  >
                    {/* Thumbnail */}
                    <div className="relative w-24 h-24 shrink-0 rounded-xl overflow-hidden bg-black border border-[#423122]">
                      <img
                        src={photo.dataUrl}
                        alt="Preview"
                        className="w-full h-full object-cover"
                      />
                      <span className="absolute bottom-1 left-1 bg-black/75 text-[9px] text-emerald-400 px-1 py-0.5 rounded font-mono">
                        Slot #{photo.slotIndex + 1}
                      </span>
                    </div>

                    {/* Preserved Metadata details */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-2 mb-1">
                        <span className="text-[10px] font-sans font-bold uppercase tracking-wider text-[#e67329] px-2 py-0.5 bg-[#16120e] rounded border border-[#33251a]">
                          {photo.tag}
                        </span>
                        <button
                          type="button"
                          onClick={() => handleRemovePending(photo.id)}
                          className="p-1 text-[#8c7d6c] hover:text-red-400 transition-colors"
                          title="Remove"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>

                      <h5 className="font-serif font-bold text-sm text-[#faf5ee] truncate">
                        {photo.caption}
                      </h5>

                      <p className="text-xs text-[#9e8f7e] line-clamp-1 mt-0.5">
                        {photo.detail}
                      </p>

                      <div className="mt-1.5 flex items-center gap-1.5 text-[11px] text-emerald-400">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        <span>Caption remains intact</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="p-5 bg-[#1a140f] border-t border-[#302318] flex items-center justify-between gap-3 shrink-0">
          <p className="text-[11px] text-[#8f7e6d] hidden sm:block">
            Captions remain preserved automatically.
          </p>

          <div className="flex items-center gap-2.5 w-full sm:w-auto justify-end">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2.5 bg-[#241c15] hover:bg-[#30241b] text-[#c9b9a6] text-xs font-semibold rounded-xl transition-colors"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={handleSubmit}
              disabled={pendingPhotos.length === 0 || isProcessing}
              className="px-5 py-2.5 bg-gradient-to-r from-[#c2410c] to-[#e67329] hover:from-[#b03a0a] hover:to-[#d4651e] disabled:opacity-50 disabled:cursor-not-allowed text-white text-xs font-bold rounded-xl transition-all shadow-md flex items-center gap-1.5"
            >
              <RefreshCw className="w-4 h-4" />
              <span>Update Pictures ({pendingPhotos.length})</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
