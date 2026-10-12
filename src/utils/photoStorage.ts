/**
 * Types and storage helpers for authentic guest photos.
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
const HERO_IMAGE_STORAGE_KEY = 'patapata_hero_image_custom';
const BAND_IMAGE_STORAGE_KEY = 'patapata_band_image_custom';
const ALFRESCO_IMAGE_STORAGE_KEY = 'patapata_alfresco_image_custom';
const SONG_IMAGE_STORAGE_KEY = 'patapata_song_image_custom';

export function loadStoredHeroImage(): string | null {
  try {
    return localStorage.getItem(HERO_IMAGE_STORAGE_KEY);
  } catch (err) {
    console.warn('Failed to load hero image from localStorage:', err);
    return null;
  }
}

export function saveStoredHeroImage(dataUrl: string): void {
  try {
    localStorage.setItem(HERO_IMAGE_STORAGE_KEY, dataUrl);
  } catch (err) {
    console.warn('Failed to save hero image to localStorage:', err);
  }
}

export function clearStoredHeroImage(): void {
  try {
    localStorage.removeItem(HERO_IMAGE_STORAGE_KEY);
  } catch (err) {
    console.warn('Failed to clear hero image from localStorage:', err);
  }
}

export function loadStoredBandImage(): string | null {
  try {
    return localStorage.getItem(BAND_IMAGE_STORAGE_KEY);
  } catch (err) {
    console.warn('Failed to load band image from localStorage:', err);
    return null;
  }
}

export function saveStoredBandImage(dataUrl: string): void {
  try {
    localStorage.setItem(BAND_IMAGE_STORAGE_KEY, dataUrl);
  } catch (err) {
    console.warn('Failed to save band image to localStorage:', err);
  }
}

export function clearStoredBandImage(): void {
  try {
    localStorage.removeItem(BAND_IMAGE_STORAGE_KEY);
  } catch (err) {
    console.warn('Failed to clear band image from localStorage:', err);
  }
}

export function loadStoredAlfrescoImage(): string | null {
  try {
    return localStorage.getItem(ALFRESCO_IMAGE_STORAGE_KEY);
  } catch (err) {
    console.warn('Failed to load alfresco image from localStorage:', err);
    return null;
  }
}

export function saveStoredAlfrescoImage(dataUrl: string): void {
  try {
    localStorage.setItem(ALFRESCO_IMAGE_STORAGE_KEY, dataUrl);
  } catch (err) {
    console.warn('Failed to save alfresco image to localStorage:', err);
  }
}

export function clearStoredAlfrescoImage(): void {
  try {
    localStorage.removeItem(ALFRESCO_IMAGE_STORAGE_KEY);
  } catch (err) {
    console.warn('Failed to clear alfresco image from localStorage:', err);
  }
}

export function loadStoredSongImage(): string | null {
  try {
    return localStorage.getItem(SONG_IMAGE_STORAGE_KEY);
  } catch (err) {
    console.warn('Failed to load song image from localStorage:', err);
    return null;
  }
}

export function saveStoredSongImage(dataUrl: string): void {
  try {
    localStorage.setItem(SONG_IMAGE_STORAGE_KEY, dataUrl);
  } catch (err) {
    console.warn('Failed to save song image to localStorage:', err);
  }
}

export function clearStoredSongImage(): void {
  try {
    localStorage.removeItem(SONG_IMAGE_STORAGE_KEY);
  } catch (err) {
    console.warn('Failed to clear song image from localStorage:', err);
  }
}

export function saveStoredSlots(slots: GuestPhoto[]): void {
  try {
    localStorage.setItem(SLOTS_STORAGE_KEY, JSON.stringify(slots));
  } catch (err) {
    console.warn('Failed to save slots to localStorage:', err);
  }
}

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
