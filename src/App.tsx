/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { MenuSection } from './components/MenuSection';
import { LiveMusicSection } from './components/LiveMusicSection';
import { StorySection } from './components/StorySection';
import { GallerySection } from './components/GallerySection';
import { ReviewsSection } from './components/ReviewsSection';
import { LocationSection } from './components/LocationSection';
import { Footer } from './components/Footer';

export default function App() {
  return (
    <div className="min-h-screen bg-[#0f0e0c] text-[#faf5ee] font-sans selection:bg-[#e67329] selection:text-white flex flex-col">
      {/* Top Fixed Header with Original Logo & Direct Phone Number */}
      <Navbar />

      {/* Main Page Sections */}
      <main className="flex-1">
        {/* Hero Section with Custom Background & Direct Phone Number */}
        <HeroSection />

        {/* Traditional & Braai Menu Section */}
        <MenuSection />

        {/* Live Sophiatown Jazz & Vinyl Turntable Section */}
        <LiveMusicSection />

        {/* Miriam Makeba Heritage & Fox Street Story */}
        <StorySection />

        {/* Fox Street Atmosphere Gallery & Lightbox */}
        <GallerySection />

        {/* Customer Reviews & Google Ratings */}
        <ReviewsSection />

        {/* Interactive Location & Fox Street Maboneng Guide */}
        <LocationSection />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
