import express from 'express';
import { createServer as createViteServer } from 'vite';
import fs from 'fs';
import path from 'path';

const app = express();
const PORT = 3000;

app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));

const IMAGES_DIR = path.resolve('src/assets/images');

// Ensure image directory exists
if (!fs.existsSync(IMAGES_DIR)) {
  fs.mkdirSync(IMAGES_DIR, { recursive: true });
}

// Helper to write base64 / data-url to jpg file
function writeImageDataUrl(dataUrl: string, targetPath: string): boolean {
  try {
    let base64Data = dataUrl;
    if (dataUrl.includes(';base64,')) {
      base64Data = dataUrl.split(';base64,')[1];
    }
    const buffer = Buffer.from(base64Data, 'base64');
    fs.writeFileSync(targetPath, buffer);
    return true;
  } catch (err) {
    console.error(`Failed to write image to ${targetPath}:`, err);
    return false;
  }
}

// API: Get current status of code photo assets
app.get('/api/photos-status', (req, res) => {
  try {
    const momentFiles = [1, 2, 3, 4].map((num) => {
      const filename = `patapata_guest_moment_${num}.jpg`;
      const fullPath = path.join(IMAGES_DIR, filename);
      const exists = fs.existsSync(fullPath);
      let size = 0;
      let mtime = null;
      if (exists) {
        const stats = fs.statSync(fullPath);
        size = stats.size;
        mtime = stats.mtime;
      }
      return { type: 'guest_moment', num, filename, exists, size, mtime };
    });

    const heroFile = path.join(IMAGES_DIR, 'patapata_hero_custom.jpg');
    const heroExists = fs.existsSync(heroFile);
    let heroSize = 0;
    let heroMtime = null;
    if (heroExists) {
      const stats = fs.statSync(heroFile);
      heroSize = stats.size;
      heroMtime = stats.mtime;
    }

    const bandFile = path.join(IMAGES_DIR, 'patapata_band_custom.jpg');
    const bandExists = fs.existsSync(bandFile);
    let bandSize = 0;
    let bandMtime = null;
    if (bandExists) {
      const stats = fs.statSync(bandFile);
      bandSize = stats.size;
      bandMtime = stats.mtime;
    }

    const alfrescoFile = path.join(IMAGES_DIR, 'patapata_alfresco_custom.jpg');
    const alfrescoExists = fs.existsSync(alfrescoFile);
    let alfrescoSize = 0;
    let alfrescoMtime = null;
    if (alfrescoExists) {
      const stats = fs.statSync(alfrescoFile);
      alfrescoSize = stats.size;
      alfrescoMtime = stats.mtime;
    }

    const songFile = path.join(IMAGES_DIR, 'patapata_song_custom.jpg');
    const songExists = fs.existsSync(songFile);
    let songSize = 0;
    let songMtime = null;
    if (songExists) {
      const stats = fs.statSync(songFile);
      songSize = stats.size;
      songMtime = stats.mtime;
    }

    res.json({
      ok: true,
      files: momentFiles,
      hero: {
        filename: 'patapata_hero_custom.jpg',
        exists: heroExists,
        size: heroSize,
        mtime: heroMtime,
      },
      band: {
        filename: 'patapata_band_custom.jpg',
        exists: bandExists,
        size: bandSize,
        mtime: bandMtime,
      },
      alfresco: {
        filename: 'patapata_alfresco_custom.jpg',
        exists: alfrescoExists,
        size: alfrescoSize,
        mtime: alfrescoMtime,
      },
      song: {
        filename: 'patapata_song_custom.jpg',
        exists: songExists,
        size: songSize,
        mtime: songMtime,
      },
    });
  } catch (err) {
    res.status(500).json({ ok: false, error: String(err) });
  }
});

// API: Save / Sync uploaded photos directly into codebase image files
app.post('/api/sync-photos', (req, res) => {
  try {
    const { target, slots, slotIndex, imageBase64 } = req.body;
    const updatedFiles: string[] = [];

    // Target = hero background
    if (target === 'hero' && imageBase64) {
      const heroFilename = 'patapata_hero_custom.jpg';
      const targetPath = path.join(IMAGES_DIR, heroFilename);
      const success = writeImageDataUrl(imageBase64, targetPath);
      if (success) {
        updatedFiles.push(heroFilename);
      }
    }

    // Target = atmosphere band picture
    if ((target === 'band' || target === 'jazz') && imageBase64) {
      const bandFilename = 'patapata_band_custom.jpg';
      const targetPath = path.join(IMAGES_DIR, bandFilename);
      const success = writeImageDataUrl(imageBase64, targetPath);
      if (success) {
        updatedFiles.push(bandFilename);
      }
    }

    // Target = alfresco sidewalk dining photo
    if (target === 'alfresco' && imageBase64) {
      const alfrescoFilename = 'patapata_alfresco_custom.jpg';
      const targetPath = path.join(IMAGES_DIR, alfrescoFilename);
      const success = writeImageDataUrl(imageBase64, targetPath);
      if (success) {
        updatedFiles.push(alfrescoFilename);
      }
    }

    // Target = song behind the name photo
    if ((target === 'song' || target === 'makeba' || target === 'painting') && imageBase64) {
      const songFilename = 'patapata_song_custom.jpg';
      const targetPath = path.join(IMAGES_DIR, songFilename);
      const success = writeImageDataUrl(imageBase64, targetPath);
      if (success) {
        updatedFiles.push(songFilename);
      }
    }

    // Single guest moment slot replacement
    if (typeof slotIndex === 'number' && imageBase64) {
      const filename = `patapata_guest_moment_${slotIndex + 1}.jpg`;
      const targetPath = path.join(IMAGES_DIR, filename);
      const success = writeImageDataUrl(imageBase64, targetPath);
      if (success) {
        updatedFiles.push(filename);
      }
    }

    // Batch slots sync
    if (Array.isArray(slots)) {
      slots.forEach((slot: any, index: number) => {
        if (slot && slot.image && (slot.image.startsWith('data:image') || slot.isUserUpload)) {
          const filename = `patapata_guest_moment_${index + 1}.jpg`;
          const targetPath = path.join(IMAGES_DIR, filename);
          if (slot.image.startsWith('data:image')) {
            const success = writeImageDataUrl(slot.image, targetPath);
            if (success) {
              updatedFiles.push(filename);
            }
          }
        }
      });
    }

    console.log(`[Codebase Sync] Successfully written ${updatedFiles.length} original photos to src/assets/images:`, updatedFiles);

    res.json({
      ok: true,
      message: `Saved ${updatedFiles.length} photos directly into codebase src/assets/images/`,
      files: updatedFiles,
    });
  } catch (err) {
    console.error('Error in /api/sync-photos:', err);
    res.status(500).json({ ok: false, error: String(err) });
  }
});

async function start() {
  const isProd = process.env.NODE_ENV === 'production';

  if (!isProd) {
    // Mount Vite dev server in middleware mode
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    // In production serve dist
    const distPath = path.resolve('dist');
    if (fs.existsSync(distPath)) {
      app.use(express.static(distPath));
      app.get('*', (req, res) => {
        res.sendFile(path.join(distPath, 'index.html'));
      });
    }
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Pata Pata Server running on port ${PORT}`);
  });
}

start();
