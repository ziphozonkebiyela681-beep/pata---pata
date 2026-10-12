import React, { useState } from 'react';
import { MENU_ITEMS, MenuItem, RESTAURANT_INFO } from '../data/restaurantData';
import { X, Plus, Minus, Trash2, Users, Share2, MessageCircle, Calendar, Receipt, Check } from 'lucide-react';

interface BillEstimatorModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedItemsMap: { [id: string]: number };
  onUpdateQuantity: (id: string, delta: number) => void;
  onClear: () => void;
  onOpenReservation: () => void;
}

export const BillEstimatorModal: React.FC<BillEstimatorModalProps> = ({
  isOpen,
  onClose,
  selectedItemsMap,
  onUpdateQuantity,
  onClear,
  onOpenReservation,
}) => {
  const [guestCount, setGuestCount] = useState<number>(2);
  const [tipPercentage, setTipPercentage] = useState<number>(10);
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const selectedItemsWithDetails = Object.entries(selectedItemsMap)
    .filter(([_, qty]) => qty > 0)
    .map(([id, qty]) => {
      const item = MENU_ITEMS.find((m) => m.id === id);
      return { item, qty };
    })
    .filter((entry): entry is { item: MenuItem; qty: number } => entry.item !== undefined);

  const subtotal = selectedItemsWithDetails.reduce((sum, { item, qty }) => {
    return sum + item.price * qty;
  }, 0);

  const tipAmount = Math.round((subtotal * tipPercentage) / 100);
  const total = subtotal + tipAmount;
  const perPerson = guestCount > 0 ? Math.round(total / guestCount) : total;

  const buildSummaryText = () => {
    let text = `Pata Pata (286 Fox St, Maboneng) - Table Plan Estimate\n`;
    text += `Guests: ${guestCount}\n`;
    text += `--------------------------\n`;
    selectedItemsWithDetails.forEach(({ item, qty }) => {
      text += `• ${qty}x ${item.name} - R${item.price * qty}\n`;
    });
    text += `--------------------------\n`;
    text += `Subtotal: R${subtotal}\n`;
    text += `Tip (${tipPercentage}%): R${tipAmount}\n`;
    text += `Total: R${total} (Approx. R${perPerson} per person)\n`;
    return text;
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(buildSummaryText());
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleWhatsApp = () => {
    const text = encodeURIComponent(
      `Hi Pata Pata team! We are planning a table reservation at 286 Fox Street with the following order estimate:\n\n${buildSummaryText()}`,
    );
    window.open(`https://wa.me/27728807772?text=${text}`, '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-[#18130e] border border-[#3d2e20] rounded-3xl max-w-lg w-full max-h-[90vh] flex flex-col shadow-2xl overflow-hidden text-[#faf5ee]">
        {/* Modal Header */}
        <div className="p-5 border-b border-[#2e2319] flex items-center justify-between bg-[#1f1913]">
          <div className="flex items-center gap-2.5">
            <div className="p-2 bg-[#e67329] text-white rounded-xl">
              <Receipt className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-serif text-lg font-bold text-[#faf5ee]">
                Table Plan & Bill Estimator
              </h3>
              <p className="text-xs text-[#a69683]">
                Plan your meal, estimate total in Rands & split costs
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

        {/* Modal Body */}
        <div className="p-5 overflow-y-auto flex-1 space-y-5">
          {selectedItemsWithDetails.length === 0 ? (
            <div className="text-center py-10">
              <Receipt className="w-12 h-12 text-[#4a3a2c] mx-auto mb-3" />
              <p className="text-sm text-[#b3a290] font-medium mb-1">
                Your Table Plan is empty
              </p>
              <p className="text-xs text-[#806f5e] mb-4">
                Browse our menu and click "+ Add" on your favorite dishes to estimate your bill.
              </p>
              <button
                onClick={onClose}
                className="px-4 py-2 bg-[#291f16] border border-[#3d2f21] text-xs font-semibold text-[#f59e0b] rounded-xl hover:bg-[#382b1e]"
              >
                Browse Menu Dishes
              </button>
            </div>
          ) : (
            <>
              {/* Selected Dishes List */}
              <div className="space-y-2.5">
                <div className="flex items-center justify-between text-xs text-[#8f7e6b] px-1">
                  <span>Selected Dishes ({selectedItemsWithDetails.length})</span>
                  <button
                    onClick={onClear}
                    className="text-[#e67329] hover:underline flex items-center gap-1"
                  >
                    <Trash2 className="w-3 h-3" /> Clear list
                  </button>
                </div>

                <div className="space-y-2 max-h-52 overflow-y-auto pr-1">
                  {selectedItemsWithDetails.map(({ item, qty }) => (
                    <div
                      key={item.id}
                      className="flex items-center justify-between bg-[#1f1812] border border-[#2e2319] p-3 rounded-xl gap-2 text-xs"
                    >
                      <div className="flex-1 min-w-0">
                        <p className="font-serif font-bold text-[#faf5ee] truncate">
                          {item.name}
                        </p>
                        <p className="text-[11px] text-[#9c8b78]">
                          R{item.price} each · <span className="text-[#f59e0b]">R{item.price * qty}</span>
                        </p>
                      </div>

                      {/* Quantity Controls */}
                      <div className="flex items-center gap-1.5 bg-[#14100c] px-2 py-1 rounded-lg border border-[#33261a]">
                        <button
                          onClick={() => onUpdateQuantity(item.id, -1)}
                          className="text-[#998977] hover:text-white p-0.5"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="font-bold text-[#faf5ee] w-4 text-center">
                          {qty}
                        </span>
                        <button
                          onClick={() => onUpdateQuantity(item.id, 1)}
                          className="text-[#998977] hover:text-white p-0.5"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Guest Count & Split Calculator */}
              <div className="bg-[#1f1812] border border-[#2e2319] p-4 rounded-2xl space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-medium text-[#d4c5b3] flex items-center gap-1.5">
                    <Users className="w-3.5 h-3.5 text-[#e67329]" /> Number of Guests at Table:
                  </span>
                  <div className="flex items-center gap-2">
                    {[1, 2, 4, 6, 8].map((num) => (
                      <button
                        key={num}
                        onClick={() => setGuestCount(num)}
                        className={`w-7 h-7 text-xs rounded-lg font-bold transition-colors ${
                          guestCount === num
                            ? 'bg-[#e67329] text-white'
                            : 'bg-[#291f16] text-[#b3a290] hover:text-white'
                        }`}
                      >
                        {num}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Tip Percentage Selection */}
                <div className="flex items-center justify-between pt-2 border-t border-[#2e2319]">
                  <span className="text-xs text-[#a39380]">Staff Service Tip:</span>
                  <div className="flex items-center gap-1.5">
                    {[0, 10, 12, 15].map((pct) => (
                      <button
                        key={pct}
                        onClick={() => setTipPercentage(pct)}
                        className={`px-2 py-1 text-[11px] rounded-lg font-medium transition-colors ${
                          tipPercentage === pct
                            ? 'bg-[#3b2d20] text-[#f59e0b] border border-[#e67329]/50'
                            : 'text-[#8a7b69] hover:text-[#faf5ee]'
                        }`}
                      >
                        {pct}%
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Bill Totals Summary */}
              <div className="bg-[#130f0c] border border-[#2b2016] p-4 rounded-2xl space-y-2 text-xs">
                <div className="flex justify-between text-[#a39380]">
                  <span>Food & Beverage Subtotal</span>
                  <span className="text-[#faf5ee] font-semibold">R{subtotal}</span>
                </div>
                <div className="flex justify-between text-[#a39380]">
                  <span>Service Tip ({tipPercentage}%)</span>
                  <span className="text-[#faf5ee]">R{tipAmount}</span>
                </div>
                <div className="pt-2 border-t border-[#261d15] flex justify-between items-baseline">
                  <span className="font-serif text-sm font-bold text-[#faf5ee]">
                    Estimated Total
                  </span>
                  <span className="font-serif text-xl font-bold text-[#f59e0b]">
                    R{total}
                  </span>
                </div>
                <div className="flex justify-between text-[11px] text-[#e67329] font-medium pt-1">
                  <span>Per Person ({guestCount} {guestCount === 1 ? 'guest' : 'guests'})</span>
                  <span>≈ R{perPerson} each</span>
                </div>
              </div>
            </>
          )}
        </div>

        {/* Modal Footer */}
        {selectedItemsWithDetails.length > 0 && (
          <div className="p-4 bg-[#1f1913] border-t border-[#2e2319] flex flex-col sm:flex-row items-center gap-2.5">
            <button
              onClick={handleCopy}
              className="w-full sm:w-auto flex-1 flex items-center justify-center gap-1.5 py-2.5 px-3 bg-[#2a2017] hover:bg-[#382b1f] border border-[#403123] rounded-xl text-xs font-semibold text-[#d4c5b3] transition-colors"
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-400" /> Copied to Clipboard
                </>
              ) : (
                <>
                  <Share2 className="w-3.5 h-3.5 text-[#f59e0b]" /> Copy Order Summary
                </>
              )}
            </button>

            <button
              onClick={handleWhatsApp}
              className="w-full sm:w-auto flex-1 flex items-center justify-center gap-1.5 py-2.5 px-3 bg-[#1e2e1e] hover:bg-[#253d25] border border-emerald-600/40 text-emerald-300 rounded-xl text-xs font-semibold transition-colors"
            >
              <MessageCircle className="w-3.5 h-3.5 text-emerald-400" /> Share to WhatsApp
            </button>

            <button
              onClick={() => {
                onClose();
                onOpenReservation();
              }}
              className="w-full sm:w-auto flex-1 flex items-center justify-center gap-1.5 py-2.5 px-4 bg-gradient-to-r from-[#c2410c] to-[#e67329] text-white rounded-xl text-xs font-bold shadow-md hover:brightness-110"
            >
              <Calendar className="w-3.5 h-3.5" /> Book Table
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
