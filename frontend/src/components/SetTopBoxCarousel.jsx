import { useState } from 'react';

const BOXES = [
  {
    id: 'standard-hd',
    name: 'Dualsky Standard HD Box',
    price: '₹1,199',
    badge: 'Best Seller',
    color: '#00796B',
    svg: (
      <svg width="120" height="90" viewBox="0 0 120 90" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="10" y="12" width="100" height="54" rx="6" fill="#e2e8f0" stroke="#94a3b8" strokeWidth="1.5" />
        <rect x="18" y="22" width="84" height="8" rx="3" fill="#0f172a" />
        <rect x="18" y="34" width="32" height="6" rx="2" fill="#475569" />
        <rect x="60" y="34" width="42" height="6" rx="2" fill="#475569" />
        <rect x="38" y="46" width="10" height="10" rx="2" fill="#00796B" />
        <rect x="72" y="46" width="10" height="10" rx="2" fill="#94a3b8" />
        <rect x="10" y="70" width="100" height="10" rx="4" fill="#f1f5f9" stroke="#cbd5e1" strokeWidth="1" />
      </svg>
    ),
    features: ['1080i Full HD', 'Dolby Digital Sound', '1-Year Warranty'],
  },
  {
    id: 'hd-recorder',
    name: 'Dualsky HD+ Recorder Box',
    price: '₹1,699',
    badge: 'Premium',
    color: '#00796B',
    svg: (
      <svg width="120" height="90" viewBox="0 0 120 90" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="8" y="10" width="104" height="58" rx="6" fill="#f8fafc" stroke="#cbd5e1" strokeWidth="1.5" />
        <rect x="16" y="20" width="88" height="10" rx="3" fill="#0f172a" />
        <rect x="16" y="36" width="24" height="6" rx="2" fill="#64748b" />
        <rect x="50" y="36" width="24" height="6" rx="2" fill="#64748b" />
        <rect x="84" y="36" width="20" height="6" rx="2" fill="#64748b" />
        <circle cx="34" cy="52" r="3" fill="#00796B" />
        <circle cx="58" cy="52" r="3" fill="#94a3b8" />
        <circle cx="82" cy="52" r="3" fill="#94a3b8" />
        <rect x="8" y="70" width="104" height="12" rx="4" fill="#f1f5f9" stroke="#cbd5e1" strokeWidth="1" />
      </svg>
    ),
    features: ['Pause, Rewind & Record Live TV', 'USB/External Recording', 'Dual Tuner'],
  },
  {
    id: '4k-smart',
    name: 'Dualsky 4K Smart Android Box',
    price: '₹2,299',
    badge: '4K Ultra HD',
    color: '#00796B',
    svg: (
      <svg width="120" height="90" viewBox="0 0 120 90" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="10" y="12" width="100" height="52" rx="6" fill="#ffffff" stroke="#94a3b8" strokeWidth="1.5" />
        <rect x="18" y="22" width="84" height="8" rx="3" fill="#f1f5f9" />
        <rect x="18" y="36" width="30" height="6" rx="2" fill="#cbd5e1" />
        <rect x="58" y="36" width="44" height="6" rx="2" fill="#cbd5e1" />
        <rect x="28" y="48" width="12" height="10" rx="2" fill="#00796B" />
        <rect x="80" y="48" width="12" height="10" rx="2" fill="#94a3b8" />
        <rect x="10" y="64" width="100" height="8" rx="2" fill="#f8fafc" stroke="#e2e8f0" strokeWidth="1" />
        <rect x="10" y="76" width="100" height="8" rx="2" fill="#e2e8f0" stroke="#cbd5e1" strokeWidth="1" />
      </svg>
    ),
    features: ['4K Ultra HD', 'Built-in OTT Apps', 'Voice Remote'],
  },
  {
    id: 'multi-tv',
    name: 'Dualsky Multi-TV Connection Box',
    price: '₹999',
    badge: 'Value',
    color: '#00796B',
    svg: (
      <svg width="120" height="90" viewBox="0 0 120 90" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="8" y="14" width="104" height="50" rx="6" fill="#f1f5f9" stroke="#cbd5e1" strokeWidth="1.5" />
        <rect x="16" y="24" width="88" height="8" rx="3" fill="#e2e8f0" />
        <rect x="16" y="38" width="38" height="6" rx="2" fill="#94a3b8" />
        <rect x="64" y="38" width="40" height="6" rx="2" fill="#94a3b8" />
        <rect x="32" y="50" width="12" height="10" rx="2" fill="#00796B" />
        <rect x="76" y="50" width="12" height="10" rx="2" fill="#94a3b8" />
        <rect x="8" y="68" width="104" height="10" rx="4" fill="#f8fafc" stroke="#cbd5e1" strokeWidth="1" />
      </svg>
    ),
    features: ['Independent Channels on 2nd TV', 'Lower Monthly Multi-TV Fee'],
  },
];
export default function SetTopBoxCarousel() {
  const [selectedBox, setSelectedBox] = useState(null);
  const [isBooking, setIsBooking] = useState(false);

  const openBooking = (box) => {
    setSelectedBox(box);
    setIsBooking(true);
  };

  const closeBooking = () => {
    setIsBooking(false);
    setSelectedBox(null);
  };

  const handleBook = async (e) => {
    e.preventDefault();
    setIsBooking(false);
    setSelectedBox(null);
    alert(`Connection booked for ${selectedBox?.name}! Our team will contact you shortly.`);
  };

  return (
    <section className="py-12 bg-teal-50">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-10">
          <h2 className="text-2xl font-bold text-teal-900 mb-2">Set-Top Boxes</h2>
          <p className="text-teal-600 text-sm">Choose your viewing experience</p>
        </div>

        <div className="relative w-full overflow-x-auto snap-x snap-mandatory scrollbar-hide pb-8">
          <div
            className="flex items-stretch gap-6 snap-start px-2"
            style={{
              scrollBehavior: 'smooth',
              touchAction: 'pan-x',
            }}
          >
            {BOXES.map((box) => (
              <div
                key={box.id}
                className="flex-shrink-0 w-[280px] flex flex-col justify-between h-auto bg-white rounded-2xl border border-teal-100 shadow-sm p-6 snap-start"
              >
                <div className="space-y-5">
                  <span className="inline-block px-3 py-1 rounded-full text-xs font-bold bg-teal-100 text-teal-700 mb-4">
                    {box.badge}
                  </span>
                  <div className="flex items-center justify-center mb-6 h-48">
                    {box.svg}
                  </div>
                  <h3 className="text-xl font-bold text-teal-900 mb-1">{box.name}</h3>
                  <div className="text-teal-700 font-bold text-lg mb-4">{box.price}</div>
                  <div className="space-y-2">
                    {box.features.map((feat, i) => (
                      <div key={i} className="flex items-center gap-2 text-sm text-teal-800">
                        <svg className="w-4 h-4 text-teal-600 shrink-0" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                        {feat}
                      </div>
                    ))}
                  </div>
                </div>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    openBooking(box);
                  }}
                  className="w-full bg-teal-700 hover:bg-teal-800 text-white py-3 rounded-xl font-medium transition shadow-sm flex items-center justify-center gap-2"
                >
                  Get Connection
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </button>
              </div>
            ))}
          </div>

          <button
            onClick={() => {
              const container = document.querySelector('.overflow-x-auto');
              if (container) container.scrollBy({ left: -300, behavior: 'smooth' });
            }}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-20 bg-teal-700 text-white w-10 h-10 rounded-full flex items-center justify-center shadow-lg hover:bg-teal-800 transition opacity-60"
            aria-label="Previous"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          <button
            onClick={() => {
              const container = document.querySelector('.overflow-x-auto');
              if (container) container.scrollBy({ left: 300, behavior: 'smooth' });
            }}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-20 bg-teal-700 text-white w-10 h-10 rounded-full flex items-center justify-center shadow-lg hover:bg-teal-800 transition opacity-60"
            aria-label="Next"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>

        {/* Booking Confirmation Modal */}
        {isBooking && selectedBox && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div
              onClick={closeBooking}
              className="fixed inset-0 bg-black/40 backdrop-blur-sm"
            />
            <div className="bg-white w-full max-w-md rounded-2xl shadow-xl relative">
              <button
                onClick={closeBooking}
                className="absolute top-4 right-4 text-teal-600 hover:text-teal-800"
              >
                &times;
              </button>
              <div className="px-6 pt-6 pb-6">
                <h2 className="text-xl font-bold text-teal-900 mb-1">
                  Book Connection
                </h2>
                <p className="text-sm text-teal-600 mb-6">
                  Confirm your Dualsky set-top box connection
                </p>

                <div className="bg-teal-50 rounded-xl p-4 mb-6 border border-teal-100">
                  <div className="flex items-center gap-4 mb-3">
                    <div className="w-12 h-12 bg-white rounded-lg flex items-center justify-center text-teal-700 shadow-sm">
                      {selectedBox.svg}
                    </div>
                    <div>
                      <h3 className="text-sm font-bold text-teal-900">
                        {selectedBox.name}
                      </h3>
                      <p className="text-xs text-teal-600">
                        {selectedBox.price}
                      </p>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-2 text-xs text-teal-700">
                    {selectedBox.features.map((f, i) => (
                      <span
                        key={i}
                        className="border border-teal-100 rounded px-2 py-1 bg-white text-teal-800"
                      >
                        {f}
                      </span>
                    ))}
                  </div>
                </div>

                <form onSubmit={handleBook} className="space-y-3">
                  <button
                    type="submit"
                    disabled={isBooking}
                    className="w-full bg-teal-700 hover:bg-teal-800 text-white py-3 rounded-xl font-medium transition disabled:opacity-70"
                  >
                    Confirm Booking
                  </button>
                  <button
                    type="button"
                    onClick={closeBooking}
                    className="w-full bg-white text-teal-700 py-3 rounded-xl font-medium border border-teal-200 hover:bg-teal-50 transition"
                  >
                    Cancel
                  </button>
                </form>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}