const HERO_BG = 'linear-gradient(135deg, #00796B 0%, #004D40 100%)';

const features = [
  { icon: '📺', text: '93+ SD & HD Channels' },
  { icon: '🇮🇳', text: '4 South Indian Languages' },
  { icon: '⚡', text: 'Instant Activation' },
];

const pricingPlans = [
  { name: 'Basic Base Pack', price: '₹153/mo', desc: 'All FTA channels' },
  { name: 'Regional HD Packs', price: 'From ₹359/mo', desc: 'Premium regional content' },
];

export default function HeroBanner() {
  return (
    <section className="relative w-full" style={{ background: HERO_BG }}>
      <div className="absolute inset-0 opacity-20" style={{ background: 'radial-gradient(circle at 50% 50%, rgba(255,255,255,0.15), transparent 70%)' }} />
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center py-16 lg:py-24">
          <div className="relative h-[320px] w-full lg:w-full flex items-center justify-center">
            <div className="relative w-[300px] h-[200px] bg-white rounded-2xl shadow-2xl border-4 border-teal-100 overflow-hidden">
              <div className="absolute inset-4 bg-[#003B33] rounded-lg overflow-hidden flex items-center justify-center">
                <div className="text-center text-teal-200">
                  <div className="text-3xl font-bold mb-2">DUALSKY</div>
                  <div className="text-sm">HD Entertainment</div>
                  <div className="mt-4 flex justify-center gap-2">
                    {[1,2,3,4,5].map((i) => (
                      <div key={i} className="w-2 h-2 rounded-full bg-teal-400 animate-pulse" style={{ animationDelay: `${i * 0.1}s` }} />
                    ))}
                  </div>
                </div>
              </div>
              <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-12 h-4 bg-teal-900 rounded-t-lg" />
              <div className="absolute bottom-[-8px] left-1/2 -translate-x-1/2 w-24 h-1 bg-teal-800 rounded-full" />
            </div>
            <div className="absolute bottom-10 right-0 w-40 h-24 bg-teal-700 rounded-lg border border-teal-500 shadow-lg flex items-center justify-center p-4">
              <div className="text-center text-teal-100">
                <div className="w-6 h-6 bg-white rounded-full flex items-center justify-center text-teal-700 font-bold mx-auto mb-2">
                  D
                </div>
                <div className="text-xs font-medium">STB Box</div>
                <div className="text-[10px] text-teal-300 mt-1">1080i HD</div>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <h1 className="text-3xl lg:text-5xl font-bold text-white leading-tight">
              Sky Without Limits — Pure HD Entertainment
            </h1>
            <p className="text-teal-100 text-lg lg:text-xl max-w-lg">
              Experience crystal-clear picture quality with 93+ SD and HD channels
              across 4 South Indian languages. Instant activation, no hidden
              charges.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {features.map((f, i) => (
                <div
                  key={i}
                  className="flex items-center gap-3 bg-teal-500/10 p-3 rounded-xl border border-teal-500/30"
                >
                  <span className="text-2xl">{f.icon}</span>
                  <span className="text-white text-sm font-medium">{f.text}</span>
                </div>
              ))}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {pricingPlans.map((p, i) => (
                <div
                  key={i}
                  className="bg-white rounded-xl p-5 border border-teal-200 shadow-sm"
                >
                  <h4 className="text-sm font-semibold text-teal-700 uppercase tracking-wider mb-1">
                    {p.name}
                  </h4>
                  <div className="flex items-baseline gap-1 mb-3">
                    <span className="text-3xl font-bold text-[#00796B]">{p.price}</span>
                  </div>
                  <p className="text-xs text-teal-600">{p.desc}</p>
                </div>
              ))}
            </div>



          </div>
        </div>
      </div>
    </section>
  );
}