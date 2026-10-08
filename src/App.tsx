import React, { useState } from 'react';
import { MASTER_INDIA_TOURISM_DIRECTORY } from './tourismData';

export default function App() {
  const [activeTab, setActiveTab] = useState<'home' | 'add' | 'business' | 'profile'>('home');
  const [selectedKey, setSelectedKey] = useState<string | null>(null);
  const [search, setSearch] = useState<string>("");
  const [spots, setSpots] = useState(MASTER_INDIA_TOURISM_DIRECTORY);

  // Form state for adding custom spot
  const [form, setForm] = useState({
    id: '', Name: '', City: '', State: '', Type: 'Cultural Spot',
    weather: '26°C', bestTime: 'October to March', packing: 'Comfortable casual wear',
    budget: '₹2,000 / day', history_geo_political: '', picnic_spots: '',
    transport_roadmap: '', hotels_booking: '', markets_food: '', culture_helpline: ''
  });

  const handleAddSpot = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.Name || !form.City) return alert("Please enter name and city!");
    const key = form.Name.toLowerCase().replace(/\s+/g, '_');
    setSpots({
      ...spots,
      [key]: {
        ...form,
        image_url: "https://images.unsplash.com/photo-1570168007204-dfb528c6958f?auto=format&fit=crop&w=1200&q=80"
      }
    });
    alert("Spot published successfully!");
    setActiveTab('home');
  };

  // Smart multi-field & auto key-derived state search filter
  const filteredItems = Object.entries(spots).filter(([k, s]) => {
    const query = search.toLowerCase().trim();
    if (!query) return true;

    const keyLower = k.toLowerCase();
    let derivedState = "";
    if (keyLower.startsWith("punjab")) derivedState = "punjab";
    else if (keyLower.startsWith("hp") || keyLower.includes("shimla") || keyLower.includes("manali") || keyLower.includes("kullu") || keyLower.includes("spiti") || keyLower.includes("bir") || keyLower.includes("dharamshala") || keyLower.includes("dalhousie") || keyLower.includes("kasol") || keyLower.includes("palampur")) derivedState = "himachal pradesh";
    else if (keyLower.startsWith("uk") || keyLower.includes("rishikesh") || keyLower.includes("haridwar") || keyLower.includes("nainital") || keyLower.includes("kedarnath") || keyLower.includes("badrinath") || keyLower.includes("mussoorie") || keyLower.includes("corbett") || keyLower.includes("auli") || keyLower.includes("chakrata") || keyLower.includes("lansdowne")) derivedState = "uttarakhand";
    else if (keyLower.startsWith("bihar")) derivedState = "bihar";
    else if (keyLower.startsWith("rajasthan")) derivedState = "rajasthan";
    else if (keyLower.startsWith("jk")) derivedState = "jammu and kashmir";
    else if (keyLower.startsWith("ladakh")) derivedState = "ladakh";

    const nameMatch = s.Name?.toLowerCase().includes(query);
    const cityMatch = s.City?.toLowerCase().includes(query);
    const stateMatch = s.State?.toLowerCase().includes(query) || derivedState.includes(query);
    const typeMatch = s.Type?.toLowerCase().includes(query);
    const descMatch = s.history_geo_political?.toLowerCase().includes(query);

    return nameMatch || cityMatch || stateMatch || typeMatch || descMatch;
  });

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 pb-28 font-sans selection:bg-orange-500 selection:text-white">
      
      {/* Premium Header with Logo & Brand Theme */}
      <div className="bg-slate-900/90 backdrop-blur-md border-b border-slate-800 sticky top-0 z-30 px-4 py-3 flex items-center justify-between shadow-lg">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-orange-500 to-blue-900 p-0.5 shadow-md flex items-center justify-center overflow-hidden border border-orange-500/30">
            <span className="text-white font-extrabold text-base tracking-tighter">IN</span>
          </div>
          <div>
            <h1 className="font-extrabold text-base tracking-wider bg-gradient-to-r from-orange-400 via-white to-blue-400 bg-clip-text text-transparent">IN BHARAT</h1>
            <p className="text-[10px] text-slate-400 font-medium tracking-widest uppercase">Heritage & Tourism Pro</p>
          </div>
        </div>
        <div className="flex items-center gap-1.5 bg-slate-800/80 border border-slate-700/60 px-3 py-1 rounded-full text-[11px] font-semibold text-orange-400 shadow-inner">
          <span>🇮🇳</span> <span>Explore</span>
        </div>
      </div>

      <div className="max-w-md mx-auto p-4 space-y-5">
        
        {/* TAB 1: HOME / EXPLORE */}
        {activeTab === 'home' && (
          <>
            {/* Premium Search Bar */}
            <div className="relative group">
              <span className="absolute inset-y-0 left-0 flex items-center pl-3.5 text-slate-400 text-sm">🔍</span>
              <input 
                type="text"
                placeholder="Search states, cities, or temples..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-11 pr-4 py-3.5 bg-slate-800/90 rounded-2xl border border-slate-700 text-sm text-slate-100 placeholder-slate-400 shadow-inner focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition"
              />
            </div>

            {/* Filter Pills */}
            <div className="flex gap-2 overflow-x-auto pb-1 text-xs no-scrollbar">
              <span className="px-4 py-2 bg-gradient-to-r from-orange-500 to-amber-600 text-white font-bold rounded-xl shadow-md whitespace-nowrap">✨ All Destinations</span>
              <span className="px-4 py-2 bg-slate-800 text-slate-300 font-medium rounded-xl border border-slate-700 whitespace-nowrap hover:bg-slate-700 transition">🛕 Char Dham</span>
              <span className="px-4 py-2 bg-slate-800 text-slate-300 font-medium rounded-xl border border-slate-700 whitespace-nowrap hover:bg-slate-700 transition">🔱 Jyotirlinga</span>
              <span className="px-4 py-2 bg-slate-800 text-slate-300 font-medium rounded-xl border border-slate-700 whitespace-nowrap hover:bg-slate-700 transition">🏖️ Coastal Shrines</span>
            </div>

            {/* Premium Cards List */}
            <div className="space-y-4">
              {filteredItems.length === 0 ? (
                <div className="text-center py-16 text-slate-400 text-sm">
                  No destinations found matching "{search}". Try searching another city or state!
                </div>
              ) : (
                filteredItems.map(([k, s]) => (
                  <div key={k} className="bg-slate-800/70 backdrop-blur-sm rounded-2xl shadow-xl border border-slate-700/80 overflow-hidden hover:border-orange-500/50 transition-all duration-300 group">
                    <div className="relative h-42 overflow-hidden">
                      <img src={s.image_url} alt={s.Name} className="w-full h-full object-cover group-hover:scale-105 transition duration-500" />
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent to-transparent"></div>
                      <div className="absolute top-3 right-3 bg-slate-900/80 backdrop-blur-md text-orange-400 text-[10px] px-3 py-1 rounded-full font-bold border border-orange-500/30 shadow">
                        {s.Type}
                      </div>
                    </div>
                    <div className="p-4.5 space-y-3">
                      <div>
                        <h3 className="font-bold text-base text-slate-100 group-hover:text-orange-400 transition">{s.Name}</h3>
                        <p className="text-xs text-slate-400 mt-0.5">📍 {s.City}, {s.State}</p>
                      </div>
                      
                      {/* Key Attribute Pills */}
                      <div className="flex flex-wrap gap-2 pt-0.5">
                        <span className="text-[10px] bg-slate-900/80 text-orange-300 px-2.5 py-1 rounded-lg font-medium border border-orange-500/20">🌡️ {s.weather}</span>
                        <span className="text-[10px] bg-slate-900/80 text-blue-300 px-2.5 py-1 rounded-lg font-medium border border-blue-500/20">💰 {s.budget}</span>
                      </div>

                      <button 
                        onClick={() => setSelectedKey(k)} 
                        className="w-full mt-2 bg-gradient-to-r from-orange-500 to-amber-600 hover:from-orange-600 hover:to-amber-700 text-white text-xs py-3 rounded-xl font-bold shadow-md transition flex items-center justify-center gap-2">
                        <span>Explore Heritage & Services</span>
                        <span className="text-sm">→</span>
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </>
        )}

        {/* TAB 2: ADD SPOT */}
        {activeTab === 'add' && (
          <div className="bg-slate-800/80 backdrop-blur-md p-5 rounded-2xl shadow-xl border border-slate-700 space-y-4">
            <div>
              <h2 className="font-bold text-base text-slate-100">✨ Add New Destination</h2>
              <p className="text-xs text-slate-400 mt-0.5">Contribute a sacred or heritage location to IN BHARAT.</p>
            </div>
            
            <form onSubmit={handleAddSpot} className="space-y-3.5 text-xs">
              <div>
                <label className="font-semibold text-slate-300">Temple / Location Name</label>
                <input type="text" placeholder="e.g. Somnath Temple" value={form.Name} onChange={e=>setForm({...form, Name: e.target.value})} className="w-full mt-1.5 p-3 bg-slate-900 border border-slate-700 rounded-xl text-slate-100 focus:ring-2 focus:ring-orange-500 focus:outline-none" required />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-semibold text-slate-300">City</label>
                  <input type="text" placeholder="Prabhas Patan" value={form.City} onChange={e=>setForm({...form, City: e.target.value})} className="w-full mt-1.5 p-3 bg-slate-900 border border-slate-700 rounded-xl text-slate-100 focus:ring-2 focus:ring-orange-500 focus:outline-none" required />
                </div>
                <div>
                  <label className="font-semibold text-slate-300">State</label>
                  <input type="text" placeholder="Gujarat" value={form.State} onChange={e=>setForm({...form, State: e.target.value})} className="w-full mt-1.5 p-3 bg-slate-900 border border-slate-700 rounded-xl text-slate-100 focus:ring-2 focus:ring-orange-500 focus:outline-none" required />
                </div>
              </div>
              <div>
                <label className="font-semibold text-slate-300">History & Significance</label>
                <textarea rows={3} placeholder="Write historical details..." value={form.history_geo_political} onChange={e=>setForm({...form, history_geo_political: e.target.value})} className="w-full mt-1.5 p-3 bg-slate-900 border border-slate-700 rounded-xl text-slate-100 focus:ring-2 focus:ring-orange-500 focus:outline-none"></textarea>
              </div>
              <div>
                <label className="font-semibold text-slate-300">Key Attractions / Spots</label>
                <input type="text" placeholder="Main Shrine | Light Show" value={form.picnic_spots} onChange={e=>setForm({...form, picnic_spots: e.target.value})} className="w-full mt-1.5 p-3 bg-slate-900 border border-slate-700 rounded-xl text-slate-100 focus:ring-2 focus:ring-orange-500 focus:outline-none" />
              </div>
              <button type="submit" className="w-full py-3.5 bg-gradient-to-r from-orange-500 to-amber-600 text-white font-bold rounded-xl shadow-lg mt-3 hover:opacity-95 transition">Publish to Directory</button>
            </form>
          </div>
        )}

        {/* TAB 3: BUSINESS & REVENUE */}
        {activeTab === 'business' && (
          <div className="bg-slate-800/80 backdrop-blur-md p-5 rounded-2xl shadow-xl border border-slate-700 space-y-5">
            <div>
              <h2 className="font-bold text-base text-slate-100">💼 Business Dashboard</h2>
              <p className="text-xs text-slate-400 mt-0.5">Live platform monetization & affiliate integration.</p>
            </div>
            
            <div className="bg-gradient-to-br from-orange-950/60 to-slate-900 border border-orange-500/30 p-5 rounded-2xl text-center shadow-inner">
              <p className="text-xs text-orange-300 font-semibold uppercase tracking-wider">Total Ecosystem Revenue</p>
              <h3 className="text-3xl font-extrabold text-white mt-1.5">₹14,800</h3>
              <p className="text-[10px] text-slate-400 mt-1">Updated in real-time via booking API</p>
            </div>

            <div className="text-xs space-y-2.5 text-slate-300">
              <p className="font-semibold text-slate-200">🚀 Active Revenue Streams:</p>
              <div className="p-3.5 bg-slate-900/90 rounded-xl border border-slate-700/80 flex justify-between items-center">
                <span>🏨 Luxury & Budget Hotel Stays</span>
                <span className="font-bold text-emerald-400 bg-emerald-950/50 px-2.5 py-1 rounded-lg border border-emerald-500/30">Active</span>
              </div>
              <div className="p-3.5 bg-slate-900/90 rounded-xl border border-slate-700/80 flex justify-between items-center">
                <span>🛺 Pilgrim Cab & Taxi Transfers</span>
                <span className="font-bold text-emerald-400 bg-emerald-950/50 px-2.5 py-1 rounded-lg border border-emerald-500/30">Active</span>
              </div>
            </div>
          </div>
        )}

        {/* TAB 4: PROFILE */}
        {activeTab === 'profile' && (
          <div className="bg-slate-800/80 backdrop-blur-md p-6 rounded-2xl shadow-xl border border-slate-700 text-center space-y-4">
            <div className="w-20 h-20 bg-gradient-to-br from-orange-500 to-blue-900 text-white rounded-2xl flex items-center justify-center text-2xl font-extrabold mx-auto shadow-lg border-2 border-orange-400/30">
              RB
            </div>
            <div>
              <h2 className="font-bold text-lg text-slate-100">Ravi Bharggav</h2>
              <p className="text-xs text-orange-400 font-medium mt-0.5">Quality Engineer & Lead Creator</p>
            </div>
            <div className="pt-3 border-t border-slate-700/80 text-left text-xs space-y-2.5 text-slate-300">
              <p className="flex items-center gap-2"><span>📍</span> Location: Gujarat, India</p>
              <p className="flex items-center gap-2"><span>🌐</span> Brand: IN BHARAT Pro</p>
              <p className="flex items-center gap-2"><span>⭐</span> Verified Publisher Status: Active</p>
            </div>
          </div>
        )}

      </div>

      {/* DETAILED MODAL POPUP */}
      {selectedKey && spots[selectedKey] && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-md flex items-end sm:items-center justify-center z-50 p-0 sm:p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-t-3xl sm:rounded-2xl max-w-md w-full max-h-[90vh] overflow-y-auto shadow-2xl animate-in fade-in duration-300">
            
            <div className="relative h-52">
              <img src={spots[selectedKey].image_url} alt="" className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent"></div>
              <button onClick={() => setSelectedKey(null)} className="absolute top-3.5 right-3.5 bg-slate-900/80 hover:bg-slate-800 text-slate-200 rounded-full w-8 h-8 flex items-center justify-center font-bold text-sm border border-slate-700 shadow">✕</button>
            </div>

            <div className="p-5 space-y-4 text-xs text-slate-300">
              <div>
                <span className="bg-orange-950/80 text-orange-300 border border-orange-500/30 px-2.5 py-1 rounded-lg font-bold text-[10px]">{spots[selectedKey].Type}</span>
                <h2 className="font-extrabold text-xl text-white mt-2">{spots[selectedKey].Name}</h2>
                <p className="text-slate-400 mt-0.5">📍 {spots[selectedKey].City}, {spots[selectedKey].State}</p>
              </div>

              {/* Grid Pillars */}
              <div className="grid grid-cols-2 gap-2.5">
                <div className="bg-slate-800/80 p-3 rounded-xl border border-slate-700">
                  <p className="font-bold text-orange-400">🌤️ Weather</p>
                  <p className="text-slate-300 mt-1">{spots[selectedKey].weather}</p>
                </div>
                <div className="bg-slate-800/80 p-3 rounded-xl border border-slate-700">
                  <p className="font-bold text-blue-400">💰 Budget</p>
                  <p className="text-slate-300 mt-1">{spots[selectedKey].budget}</p>
                </div>
              </div>

              <div>
                <p className="font-bold text-slate-200 text-sm">🏛️ History & Significance</p>
                <p className="text-slate-400 mt-1 leading-relaxed">{spots[selectedKey].history_geo_political}</p>
              </div>

              <div>
                <p className="font-bold text-slate-200 text-sm">🌿 Attractions & Sightseeing</p>
                <p className="text-slate-400 mt-1 whitespace-pre-line">{spots[selectedKey].picnic_spots}</p>
              </div>

              <div>
                <p className="font-bold text-slate-200 text-sm">🎒 Packing Guide</p>
                <p className="text-slate-400 mt-1">{spots[selectedKey].packing}</p>
              </div>

              <div>
                <p className="font-bold text-slate-200 text-sm">🚗 Transport & Roadmap</p>
                <p className="text-slate-400 mt-1">{spots[selectedKey].transport_roadmap}</p>
              </div>

              <div>
                <p className="font-bold text-slate-200 text-sm">🏨 Recommended Stays</p>
                <p className="text-slate-400 mt-1">{spots[selectedKey].hotels_booking}</p>
              </div>

              <div>
                <p className="font-bold text-slate-200 text-sm">🍲 Local Food & Markets</p>
                <p className="text-slate-400 mt-1">{spots[selectedKey].markets_food}</p>
              </div>

              <button 
                onClick={() => alert("Booking & Yatra portal initiated successfully!")} 
                className="w-full bg-gradient-to-r from-orange-500 to-amber-600 hover:from-orange-600 hover:to-amber-700 text-white py-3.5 rounded-xl font-bold text-xs shadow-lg transition mt-2">
                🚀 Book Hotel / Train / Taxi Now
              </button>
            </div>
          </div>
        </div>
      )}

      {/* BOTTOM NAVIGATION APP BAR */}
      <div className="fixed bottom-0 left-0 right-0 bg-slate-900/95 backdrop-blur-md border-t border-slate-800 py-3 px-6 flex justify-around items-center z-40 shadow-2xl">
        <button onClick={() => setActiveTab('home')} className={`flex flex-col items-center gap-1 transition ${activeTab === 'home' ? 'text-orange-400 font-bold scale-105' : 'text-slate-400 font-medium'}`}>
          <span className="text-lg">🏠</span>
          <span className="text-[10px]">Home</span>
        </button>
        <button onClick={() => setActiveTab('add')} className={`flex flex-col items-center gap-1 transition ${activeTab === 'add' ? 'text-orange-400 font-bold scale-105' : 'text-slate-400 font-medium'}`}>
          <span className="text-lg">➕</span>
          <span className="text-[10px]">Add Spot</span>
        </button>
        <button onClick={() => setActiveTab('business')} className={`flex flex-col items-center gap-1 transition ${activeTab === 'business' ? 'text-orange-400 font-bold scale-105' : 'text-slate-400 font-medium'}`}>
          <span className="text-lg">💼</span>
          <span className="text-[10px]">Business</span>
        </button>
        <button onClick={() => setActiveTab('profile')} className={`flex flex-col items-center gap-1 transition ${activeTab === 'profile' ? 'text-orange-400 font-bold scale-105' : 'text-slate-400 font-medium'}`}>
          <span className="text-lg">👤</span>
          <span className="text-[10px]">Profile</span>
        </button>
      </div>

    </div>
  );
}
