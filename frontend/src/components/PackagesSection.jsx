import { useState, useEffect } from 'react';

const API_BASE = 'http://127.0.0.1:8000';

const LANGUAGES = ['All', 'Malayalam', 'Tamil', 'Telugu', 'Kannada'];

export default function PackagesSection() {
  const [packages, setPackages] = useState([]);
  const [channels, setChannels] = useState([]);
  const [selectedLang, setSelectedLang] = useState('All');
  const [viewChannelsModal, setViewChannelsModal] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    const fetchData = async () => {
      try {
        const [pkgRes, chRes] = await Promise.all([
          fetch(`${API_BASE}/packages`),
          fetch(`${API_BASE}/channels`),
        ]);
        const pkgData = await pkgRes.json();
        const chData = await chRes.json();
        if (!cancelled) {
          setPackages(pkgData);
          setChannels(chData);
          setLoading(false);
        }
      } catch (err) {
        console.error('Failed to load packages:', err);
        setLoading(false);
      }
    };
    fetchData();
    return () => { cancelled = true; };
  }, []);

  const filteredPackages = selectedLang === 'All'
    ? packages
    : packages.filter((p) => p.language === selectedLang);

  const channelMap = new Map();
  channels.forEach((c) => channelMap.set(c.channel_no, c));

  return (
    <>
      <section className="py-12 bg-teal-50">
        <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-10">
          <h2 className="text-2xl font-bold text-teal-900 mb-2">Packages</h2>
          <p className="text-teal-600 text-sm">Choose your channel pack</p>
        </div>

        {/* Language filter tabs */}
        <div className="flex flex-wrap justify-center gap-2 mb-8">
          {LANGUAGES.map((lang) => (
            <button
              key={lang}
              onClick={() => setSelectedLang(lang)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition ${
                selectedLang === lang
                  ? 'bg-teal-700 text-white shadow-sm'
                  : 'bg-white text-teal-700 border border-teal-200 hover:bg-teal-50'
              }`}
            >
              {lang}
            </button>
          ))}
        </div>

        {/* Packages grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPackages.map((pkg) => (
            <div
              key={pkg.pack_id}
              className="bg-white rounded-2xl border border-teal-100 shadow-sm p-6 flex flex-col h-full"
            >
              <div className="flex items-start justify-between mb-3">
                <span className="inline-block px-2.5 py-1 rounded-full text-[10px] font-bold bg-teal-100 text-teal-700 uppercase tracking-tighter">
                  {pkg.pack_id}
                </span>
                <span className="text-xs font-medium text-teal-600 bg-teal-50 px-2 py-1 rounded">
                  {pkg.language}
                </span>
              </div>

              <h3 className="text-xl font-bold text-teal-900 mb-1">{pkg.pack_name}</h3>

              <div className="mb-4">
                <span className="text-2xl font-bold text-teal-700">₹{pkg.price}</span>
                <span className="text-sm text-teal-500 font-medium ml-1">/month</span>
              </div>

              <div className="flex items-center gap-2 text-sm text-teal-800 mb-6">
                <svg className="w-4 h-4 text-teal-600 shrink-0" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span>{pkg.channel_nos.length} channels</span>
                <span className="ml-auto text-xs text-teal-500">{pkg.category}</span>
              </div>

              <div className="mt-auto pt-4 border-t border-teal-50 flex flex-col gap-3">
                <button
                  onClick={() => setViewChannelsModal(pkg)}
                  className="w-full bg-white text-teal-700 py-2.5 rounded-xl font-medium border border-teal-200 hover:bg-teal-50 transition shadow-sm"
                >
                  View Channels
                </button>
                <button
                  className="w-full bg-teal-700 hover:bg-teal-800 text-white py-2.5 rounded-xl font-medium transition shadow-sm"
                >
                  Select / Recharge
                </button>
              </div>
            </div>
          ))}
          {filteredPackages.length === 0 && (
            <div className="col-span-3 text-center py-20 text-teal-500">
              No packages found for {selectedLang}.
            </div>
          )}
        </div>

        <p className="text-center text-xs text-teal-600 mt-8 italic">
          Note: DSK-BASIC (₹153) base pack applies to all connections.
        </p>
      </div>
    </section>

    {viewChannelsModal && (
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <div
          onClick={() => setViewChannelsModal(null)}
          className="fixed inset-0 bg-black/40 backdrop-blur-sm"
        />
        <div className="bg-white w-full max-w-md rounded-2xl shadow-xl relative">
          <button
            onClick={() => setViewChannelsModal(null)}
            className="absolute top-4 right-4 text-teal-600 hover:text-teal-800"
          >
            &times;
          </button>
          <div className="px-6 pt-6 pb-6">
            <h2 className="text-xl font-bold text-teal-900 mb-1">
              Channels in {viewChannelsModal.pack_name}
            </h2>
            <p className="text-sm text-teal-600 mb-6">
              {viewChannelsModal.channel_nos.length} channels
            </p>

            <div className="space-y-2 max-h-96 overflow-y-auto pr-2">
              {viewChannelsModal.channel_nos.map((chNo) => {
                const ch = channelMap.get(String(chNo));
                if (!ch) return null;
                const resColor =
                  ch.resolution === 'HD' ? 'text-teal-700' : 'text-teal-500';
                return (
                  <div
                    key={ch.channel_no}
                    className="flex items-center justify-between px-3 py-2 rounded-lg bg-teal-50 border border-teal-100"
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-sm font-medium text-teal-900">
                        {ch.channel_no}
                      </span>
                      <span className="text-sm text-teal-800">{ch.channel_name}</span>
                      <span className={`text-xs font-medium px-1.5 py-0.5 rounded ${resColor}`}>
                        {ch.resolution}
                      </span>
                    </div>
                    <span className="text-xs text-teal-500">{ch.genre}</span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    )}
    </>
  );
}