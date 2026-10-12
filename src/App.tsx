/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { MenuSection } from './components/MenuSection';
import { LiveMusicSection } from './components/LiveMusicSection';
import { StorySection } from './components/StorySection';
import { GallerySection } from './components/GallerySection';
import { ReviewsSection } from './components/ReviewsSection';
import { LocationSection } from './components/LocationSection';
import { Footer } from './components/Footer';
import { ReservationModal } from './components/ReservationModal';
import { BillEstimatorModal } from './components/BillEstimatorModal';
import { MenuItem } from './data/restaurantData';

export default function App() {
  const [isReservationOpen, setIsReservationOpen] = useState(false);
  const [isBillEstimatorOpen, setIsBillEstimatorOpen] = useState(false);
  const [selectedItemsMap, setSelectedItemsMap] = useState<{ [id: string]: number }>({});

  const handleAddItem = (item: MenuItem) => {
    setSelectedItemsMap((prev) => ({
      ...prev,
      [item.id]: (prev[item.id] || 0) + 1,
    }));
  };

  const handleUpdateQuantity = (id: string, delta: number) => {
    setSelectedItemsMap((prev) => {
      const current = prev[id] || 0;
      const next = current + delta;
      if (next <= 0) {
        const copy = { ...prev };
        delete copy[id];
        return copy;
      }
      return { ...prev, [id]: next };
    });
  };

  const handleClearCart = () => {
    setSelectedItemsMap({});
  };

  const cartTotalCount = Object.values(selectedItemsMap).reduce((a, b) => a + b, 0);

  return (
    <div className="min-h-screen bg-[#0f0e0c] text-[#faf5ee] font-sans selection:bg-[#e67329] selection:text-white flex flex-col">
      {/* Top Fixed Header with Original Logo */}
      <Navbar
        onOpenReservation={() => setIsReservationOpen(true)}
        onOpenBillEstimator={() => setIsBillEstimatorOpen(true)}
        cartCount={cartTotalCount}
      />

      {/* Main Page Sections */}
      <main className="flex-1">
        {/* Hero Section */}
        <HeroSection onOpenReservation={() => setIsReservationOpen(true)} />

        {/* Traditional & Braai Menu Section */}
        <MenuSection
          onAddItem={handleAddItem}
          selectedItemsMap={selectedItemsMap}
          onOpenBillEstimator={() => setIsBillEstimatorOpen(true)}
        />

        {/* Live Sophiatown Jazz & Vinyl Turntable Section */}
        <LiveMusicSection onOpenReservation={() => setIsReservationOpen(true)} />

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
      <Footer onOpenReservation={() => setIsReservationOpen(true)} />

      {/* Interactive Reservation Modal */}
      <ReservationModal
        isOpen={isReservationOpen}
        onClose={() => setIsReservationOpen(false)}
      />

      {/* Interactive Table Plan & Bill Estimator Modal */}
      <BillEstimatorModal
        isOpen={isBillEstimatorOpen}
        onClose={() => setIsBillEstimatorOpen(false)}
        selectedItemsMap={selectedItemsMap}
        onUpdateQuantity={handleUpdateQuantity}
        onClear={handleClearCart}
        onOpenReservation={() => {
          setIsBillEstimatorOpen(false);
          setIsReservationOpen(true);
        }}
      />
    </div>
  );
}
