import React, { useState } from 'react';
import { X, Calendar, Clock, Users, MapPin, CheckCircle2, MessageSquare, Phone, Sparkles } from 'lucide-react';
import { RESTAURANT_INFO } from '../data/restaurantData';

interface ReservationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ReservationModal: React.FC<ReservationModalProps> = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    date: new Date().toISOString().split('T')[0],
    time: '19:30',
    guests: '2',
    seatingArea: 'sidewalk',
    specialNotes: '',
  });

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [bookingRef, setBookingRef] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const randomRef = `PATA-${Math.floor(1000 + Math.random() * 9000)}`;
    setBookingRef(randomRef);
    setIsSubmitted(true);
  };

  const seatingOptions = [
    {
      id: 'sidewalk',
      title: 'Fox Street Sidewalk Alfresco',
      desc: 'Bustling outdoor atmosphere, Maboneng people-watching under warm festoon lights',
    },
    {
      id: 'stage',
      title: 'Main Jazz Stage Hall',
      desc: 'Near the live musicians, saxophone, and upright bass — intimate Sophiatown energy',
    },
    {
      id: 'lounge',
      title: 'Sophiatown Vintage Lounge',
      desc: 'Cozy retro leather & velvet armchairs with vinyl record walls and relaxed conversation',
    },
  ];

  const handleWhatsAppConfirm = () => {
    const text = encodeURIComponent(
      `Hello Pata Pata team! I'd like to confirm my table reservation:\n\nReference: ${bookingRef}\nName: ${formData.name}\nDate: ${formData.date} at ${formData.time}\nGuests: ${formData.guests}\nSeating Area: ${formData.seatingArea}\nNotes: ${formData.specialNotes || 'None'}`,
    );
    window.open(`https://wa.me/27728807772?text=${text}`, '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-[#18130e] border border-[#3d2e20] rounded-3xl max-w-xl w-full max-h-[92vh] flex flex-col shadow-2xl overflow-hidden text-[#faf5ee]">
        {/* Header */}
        <div className="p-5 border-b border-[#2e2319] flex items-center justify-between bg-[#1f1913]">
          <div className="flex items-center gap-2.5">
            <div className="p-2 bg-[#c2410c] text-white rounded-xl">
              <Calendar className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-serif text-lg font-bold text-[#faf5ee]">
                Reserve a Table at Pata Pata
              </h3>
              <p className="text-xs text-[#a69683]">
                286 Fox Street, Maboneng Precinct · Daily 08:00 – 23:00
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-[#998977] hover:text-white rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 overflow-y-auto flex-1">
          {isSubmitted ? (
            <div className="text-center py-6 space-y-5">
              <div className="w-16 h-16 bg-emerald-500/20 text-emerald-400 rounded-full flex items-center justify-center mx-auto border border-emerald-500/30">
                <CheckCircle2 className="w-10 h-10" />
              </div>

              <div>
                <span className="text-xs uppercase tracking-widest text-[#f59e0b] font-bold">
                  Table Reservation Confirmed
                </span>
                <h4 className="font-serif text-2xl font-bold text-[#faf5ee] mt-1">
                  We Can’t Wait to Welcome You!
                </h4>
                <p className="text-xs text-[#b8a794] mt-2 max-w-sm mx-auto">
                  Your table has been reserved under reference{' '}
                  <strong className="text-[#f59e0b] font-mono text-sm">{bookingRef}</strong>.
                </p>
              </div>

              {/* Booking Summary Ticket */}
              <div className="bg-[#1f1812] border border-[#33261a] rounded-2xl p-4 text-left text-xs space-y-2 max-w-md mx-auto">
                <div className="flex justify-between border-b border-[#2e2319] pb-2">
                  <span className="text-[#8c7d6c]">Guest Name:</span>
                  <span className="font-semibold text-[#faf5ee]">{formData.name}</span>
                </div>
                <div className="flex justify-between border-b border-[#2e2319] pb-2">
                  <span className="text-[#8c7d6c]">Date & Time:</span>
                  <span className="font-semibold text-[#faf5ee]">
                    {formData.date} at {formData.time}
                  </span>
                </div>
                <div className="flex justify-between border-b border-[#2e2319] pb-2">
                  <span className="text-[#8c7d6c]">Party Size:</span>
                  <span className="font-semibold text-[#faf5ee]">{formData.guests} Guests</span>
                </div>
                <div className="flex justify-between border-b border-[#2e2319] pb-2">
                  <span className="text-[#8c7d6c]">Seating:</span>
                  <span className="font-semibold text-[#f59e0b] capitalize">
                    {formData.seatingArea}
                  </span>
                </div>
                <div className="flex justify-between pt-1 text-[11px] text-[#8c7d6c]">
                  <span>Location:</span>
                  <span className="text-right">286 Fox St, Maboneng</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
                <button
                  onClick={handleWhatsAppConfirm}
                  className="w-full sm:w-auto px-5 py-2.5 bg-[#1e2e1e] hover:bg-[#253d25] border border-emerald-600/40 text-emerald-300 rounded-xl text-xs font-semibold flex items-center justify-center gap-2"
                >
                  <MessageSquare className="w-4 h-4 text-emerald-400" />
                  Send WhatsApp Confirmation
                </button>
                <button
                  onClick={onClose}
                  className="w-full sm:w-auto px-5 py-2.5 bg-[#291f16] text-[#e8dccd] hover:bg-[#382b1f] rounded-xl text-xs font-semibold"
                >
                  Done
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Contact info row */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-[#d4c5b3] mb-1.5">
                    Your Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Lerato Molefe"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full bg-[#12100e] border border-[#382b20] focus:border-[#e67329] focus:outline-none rounded-xl px-3.5 py-2.5 text-xs text-[#faf5ee]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-[#d4c5b3] mb-1.5">
                    Phone / WhatsApp Number *
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="e.g. +27 82 123 4567"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full bg-[#12100e] border border-[#382b20] focus:border-[#e67329] focus:outline-none rounded-xl px-3.5 py-2.5 text-xs text-[#faf5ee]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-[#d4c5b3] mb-1.5">
                  Email Address (Optional)
                </label>
                <input
                  type="email"
                  placeholder="name@example.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full bg-[#12100e] border border-[#382b20] focus:border-[#e67329] focus:outline-none rounded-xl px-3.5 py-2.5 text-xs text-[#faf5ee]"
                />
              </div>

              {/* Date, Time & Party size */}
              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="block text-xs font-medium text-[#d4c5b3] mb-1.5">
                    Date *
                  </label>
                  <input
                    type="date"
                    required
                    value={formData.date}
                    onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                    className="w-full bg-[#12100e] border border-[#382b20] focus:border-[#e67329] focus:outline-none rounded-xl px-3 py-2 text-xs text-[#faf5ee]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-[#d4c5b3] mb-1.5">
                    Time Slot *
                  </label>
                  <select
                    value={formData.time}
                    onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                    className="w-full bg-[#12100e] border border-[#382b20] focus:border-[#e67329] focus:outline-none rounded-xl px-3 py-2 text-xs text-[#faf5ee]"
                  >
                    <option value="12:00">12:00 PM (Lunch)</option>
                    <option value="13:30">1:30 PM</option>
                    <option value="17:30">5:30 PM (Sunset)</option>
                    <option value="18:30">6:30 PM</option>
                    <option value="19:30">7:30 PM (Jazz Start)</option>
                    <option value="20:30">8:30 PM (Peak Jazz)</option>
                    <option value="21:30">9:30 PM</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-medium text-[#d4c5b3] mb-1.5">
                    Guests *
                  </label>
                  <select
                    value={formData.guests}
                    onChange={(e) => setFormData({ ...formData, guests: e.target.value })}
                    className="w-full bg-[#12100e] border border-[#382b20] focus:border-[#e67329] focus:outline-none rounded-xl px-3 py-2 text-xs text-[#faf5ee]"
                  >
                    {[1, 2, 3, 4, 5, 6, 7, 8, 10, 12, 15, 20].map((num) => (
                      <option key={num} value={num}>
                        {num} {num === 1 ? 'Guest' : 'Guests'}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Seating Preference */}
              <div>
                <label className="block text-xs font-medium text-[#d4c5b3] mb-2">
                  Preferred Seating Atmosphere
                </label>
                <div className="space-y-2">
                  {seatingOptions.map((opt) => (
                    <label
                      key={opt.id}
                      className={`flex items-start gap-3 p-3 rounded-xl border cursor-pointer transition-colors ${
                        formData.seatingArea === opt.id
                          ? 'bg-[#261d15] border-[#e67329]'
                          : 'bg-[#14100c] border-[#2b2118] hover:border-[#382b20]'
                      }`}
                    >
                      <input
                        type="radio"
                        name="seating"
                        value={opt.id}
                        checked={formData.seatingArea === opt.id}
                        onChange={(e) => setFormData({ ...formData, seatingArea: e.target.value })}
                        className="mt-1 text-[#e67329] focus:ring-0"
                      />
                      <div>
                        <p className="text-xs font-semibold text-[#faf5ee]">{opt.title}</p>
                        <p className="text-[11px] text-[#9c8b78] leading-tight mt-0.5">
                          {opt.desc}
                        </p>
                      </div>
                    </label>
                  ))}
                </div>
              </div>

              {/* Special Notes */}
              <div>
                <label className="block text-xs font-medium text-[#d4c5b3] mb-1.5">
                  Special Notes or Occasion
                </label>
                <textarea
                  rows={2}
                  placeholder="e.g. Birthday celebration, anniversary, high chair needed, dietary restrictions..."
                  value={formData.specialNotes}
                  onChange={(e) => setFormData({ ...formData, specialNotes: e.target.value })}
                  className="w-full bg-[#12100e] border border-[#382b20] focus:border-[#e67329] focus:outline-none rounded-xl p-3 text-xs text-[#faf5ee] placeholder:text-[#6e6150]"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 px-4 bg-gradient-to-r from-[#c2410c] to-[#e67329] hover:from-[#b91c1c] hover:to-[#d97706] text-white font-bold text-sm rounded-xl shadow-lg transition-all"
              >
                Confirm Table Reservation
              </button>

              <p className="text-[11px] text-[#8c7d6c] text-center">
                Need immediate assistance? Call us directly at{' '}
                <a href={`tel:${RESTAURANT_INFO.phone}`} className="text-[#f59e0b] underline">
                  {RESTAURANT_INFO.phone}
                </a>
              </p>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
