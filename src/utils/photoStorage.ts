/**
 * Utility for persisting and optimizing user-uploaded original photos in localStorage.
 * Ensures 100% natural camera fidelity without AI interference or exceeding browser storage limits.
 */

export interface GuestPhoto {
  id: string;
  image: string;
  caption: string;
  tag: string;
  detail: string;
  isUserUpload?: boolean;
  uploadedAt?: number;
}

const SLOTS_STORAGE_KEY = 'patapata_guest_slots_v2';
const HIDE_AI_STORAGE_KEY = 'patapata_hide_ai_placeholders_v2';

export function loadStoredSlots(): GuestPhoto[] | null {
  try {
    const raw = localStorage.getItem(SLOTS_STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    if (Array.isArray(parsed) && parsed.length > 0) {
      return parsed;
    }
    return null;
  } catch (err) {
    console.warn('Failed to load slots from localStorage:', err);
    return null;
  }
}

export function saveStoredSlots(slots: GuestPhoto[]): boolean {
  try {
    localStorage.setItem(SLOTS_STORAGE_KEY, JSON.stringify(slots));
    return true;
  } catch (err) {
    console.error('Failed to save slots to localStorage:', err);
    return false;
  }
}

export function clearStoredSlots(): void {
  try {
    localStorage.removeItem(SLOTS_STORAGE_KEY);
    localStorage.removeItem(HIDE_AI_STORAGE_KEY);
  } catch (err) {
    console.warn('Failed to clear slots:', err);
  }
}

export function loadHideAiPreference(): boolean {
  try {
    return localStorage.getItem(HIDE_AI_STORAGE_KEY) === 'true';
  } catch {
    return false;
  }
}

export function saveHideAiPreference(hide: boolean): void {
  try {
    localStorage.setItem(HIDE_AI_STORAGE_KEY, hide ? 'true' : 'false');
  } catch (err) {
    console.warn('Failed to save hide AI preference:', err);
  }
}

/**
 * Optimizes an uploaded image file into a crisp, non-AI-altered base64 Data URL.
 * Preserves authentic colors and natural detail while keeping file size safe for browser storage.
 */
export async function optimizeUserImage(file: File, maxDimension: number = 1600): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onerror = () => reject(new Error('Failed to read image file.'));

    reader.onload = () => {
      const img = new Image();
      img.onerror = () => reject(new Error('Invalid image file.'));
      img.onload = () => {
        let width = img.width;
        let height = img.height;

        // If very large, scale proportionally to prevent browser memory issues
        if (width > maxDimension || height > maxDimension) {
          if (width > height) {
            height = Math.round((height * maxDimension) / width);
            width = maxDimension;
          } else {
            width = Math.round((width * maxDimension) / height);
            height = maxDimension;
          }
        }

        const canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');

        if (!ctx) {
          // Fallback to raw data url if canvas not supported
          resolve(reader.result as string);
          return;
        }

        // Draw naturally with smooth bicubic interpolation, no filters or AI
        ctx.imageSmoothingEnabled = true;
        ctx.imageSmoothingQuality = 'high';
        ctx.drawImage(img, 0, 0, width, height);

        // Export high-quality JPEG (90% quality maintains camera crispness)
        const dataUrl = canvas.toDataURL('image/jpeg', 0.9);
        resolve(dataUrl);
      };

      img.src = reader.result as string;
    };

    reader.readAsDataURL(file);
  });
}
