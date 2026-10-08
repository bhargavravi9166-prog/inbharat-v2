import React, { useState } from 'react';
import { MASTER_INDIA_TOURISM_DIRECTORY } from './tourismData';

export default function App() {
  const [activeTab, setActiveTab] = useState<'home' | 'add' | 'business' | 'profile'>('home');
  const [selectedKey, setSelectedKey] = useState<string | null>(null);
  const [search, setSearch] = useState<string>("");
  const [spots, setSpots] = useState(MASTER_INDIA_TOURISM_DIRECTORY);

  // Form state for adding custom spot
  const [form, setForm] = useState({
    id: '', Name: '', City: '', State: '', Type: 'Custom Spot',
    weather: '25°C', bestTime: 'All year', packing: 'Casual wear',
    budget: '₹1,500 / day', history_geo_political: '', picnic_spots: '',
    transport_roadmap: '', hotels_booking: '', markets_food: '', culture_helpline: ''
  });

  const handleAddSpot = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.Name || !form.City) return alert("Please fill name and city!");
    const key = form.Name.toLowerCase().replace(/\s+/g, '_');
    setSpots({
      ...spots,
      [key]: {
        ...form,
        image_url: "https://images.unsplash.com/photo-1570168007204-dfb528c6958f?auto=format&fit=crop&w=1200&q=80"
      }
    });
    alert("Spot added successfully!");
    setActiveTab('home');
  };

  const filteredItems = Object.entries(spots).filter(([_, s]) => 
    s.Name.toLowerCase().includes(search.toLowerCase()) || 
    s.City.toLowerCase().includes(search.toLowerCase()) || 
    s.State.toLowerCase().includes(search.toLowerCase()) ||
    s.Type.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-slate-100 text-slate-900 pb-24 font-sans">
      {/* Top App Header */}
      <div className="bg-gradient-to-r from-amber-600 to-orange-600 text-white p-4 shadow-md sticky top-0 z-30 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-xl">🛕</span>
          <h1 className="font-bold text-lg tracking-wide">Bharat Yatra Pro</h1>
        </div>
        <div className="text-xs bg-white/20 px-2.5 py-1 rounded-full font-medium">🇮🇳 Explore India</div>
      </div>

      <div className="max-w-md mx-auto p-4 space-y-4">
        
        {/* TAB 1: HOME / EXPLORE */}
        {activeTab === 'home' && (
          <>
            {/* Search Bar */}
            <div className="relative">
              <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-slate-400">🔍</span>
              <input 
                type="text"
                placeholder="Search temples, cities, states..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-white rounded-2xl border border-slate-200 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-amber-500"
              />
            </div>

            {/* Category Pills */}
            <div className="flex gap-2 overflow-x-auto pb-1 text-xs no-scrollbar">
              <span className="px-3 py-1.5 bg-amber-600 text-white font-semibold rounded-full shadow-sm whitespace-nowrap">🌟 All Spots</span>
              <span className="px-3 py-1.5 bg-white text-slate-700 font-medium rounded-full border border-slate-200 whitespace-nowrap">🛕 Char Dham</span>
              <span className="px-3 py-1.5 bg-white text-slate-700 font-medium rounded-full border border-slate-200 whitespace-nowrap">🔱 Jyotirlinga</span>
              <span className="px-3 py-1.5 bg-white text-slate-700 font-medium rounded-full border border-slate-200 whitespace-nowrap">🏖️ Coastal</span>
            </div>

            {/* Cards List */}
            <div className="space-y-3.5">
              {filteredItems.length === 0 ? (
                <div className="text-center py-10 text-slate-500 text-sm">No destination found! Try searching another name.</div>
              ) : (
                filteredItems.map(([k, s]) => (
                  <div key={k} className="bg-white rounded-2xl shadow-sm border border-slate-200/80 overflow-hidden hover:shadow-md transition">
                    <div className="relative h-36">
                      <img src={s.image_url} alt={s.Name} className="w-full h-full object-cover" />
                      <div className="absolute top-2 right-2 bg-black/60 backdrop-blur-md text-white text-[10px] px-2.5 py-1 rounded-full font-medium">
                        {s.Type}
                      </div>
                    </div>
                    <div className="p-4">
                      <h3 className="font-bold text-base text-slate-800">{s.Name}</h3>
                      <p className="text-xs text-slate-500 mt-0.5">📍 {s.City}, {s.State}</p>
                      
                      {/* Pillars / Tags */}
                      <div className="flex flex-wrap gap-1.5 mt-3">
                        <span className="text-[10px] bg-amber-50 text-amber-800 px-2 py-0.5 rounded-md font-medium border border-amber-200/50">🌡️ {s.weather}</span>
                        <span className="text-[10px] bg-blue-50 text-blue-800 px-2 py-0.5 rounded-md font-medium border border-blue-200/50">💰 {s.budget}</span>
                      </div>

                      <button 
                        onClick={() => setSelectedKey(k)} 
                        className="w-full mt-3.5 bg-amber-600 hover:bg-amber-700 text-white text-xs py-2.5 rounded-xl font-semibold shadow-sm transition flex items-center justify-center gap-1.5">
                        <span>📖 View Full Guide & Booking</span>
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
          <div className="bg-white p-5 rounded-2xl shadow-sm border border-slate-200">
            <h2 className="font-bold text-base mb-1 text-slate-800">✨ Add New Pilgrimage Spot</h2>
            <p className="text-xs text-slate-500 mb-4">Contribute your favorite religious or tourist destination.</p>
            
            <form onSubmit={handleAddSpot} className="space-y-3 text-xs">
              <div>
                <label className="font-semibold text-slate-700">Temple / Place Name</label>
                <input type="text" placeholder="e.g. Mahakaleshwar" value={form.Name} onChange={e=>setForm({...form, Name: e.target.value})} className="w-full mt-1 p-2.5 border rounded-xl" required />
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="font-semibold text-slate-700">City</label>
                  <input type="text" placeholder="Ujjain" value={form.City} onChange={e=>setForm({...form, City: e.target.value})} className="w-full mt-1 p-2.5 border rounded-xl" required />
                </div>
                <div>
                  <label className="font-semibold text-slate-700">State</label>
                  <input type="text" placeholder="Madhya Pradesh" value={form.State} onChange={e=>setForm({...form, State: e.target.value})} className="w-full mt-1 p-2.5 border rounded-xl" required />
                </div>
              </div>
              <div>
                <label className="font-semibold text-slate-700">History & Significance</label>
                <textarea rows={2} placeholder="Write brief history..." value={form.history_geo_political} onChange={e=>setForm({...form, history_geo_political: e.target.value})} className="w-full mt-1 p-2.5 border rounded-xl"></textarea>
              </div>
              <div>
                <label className="font-semibold text-slate-700">Attractions / Spots</label>
                <input type="text" placeholder="Main Temple | Corridor" value={form.picnic_spots} onChange={e=>setForm({...form, picnic_spots: e.target.value})} className="w-full mt-1 p-2.5 border rounded-xl" />
              </div>
              <button type="submit" className="w-full py-3 bg-amber-600 text-white font-bold rounded-xl shadow mt-2">Publish Spot</button>
            </form>
          </div>
        )}

        {/* TAB 3: BUSINESS & REVENUE */}
        {activeTab === 'business' && (
          <div className="bg-white p-5 rounded-2xl shadow-sm border border-slate-200 space-y-4">
            <h2 className="font-bold text-base text-slate-800">💼 Business Dashboard</h2>
            <div className="bg-amber-50 border border-amber-200 p-4 rounded-xl text-center">
              <p className="text-xs text-amber-800 font-medium">Total Platform Revenue</p>
              <h3 className="text-2xl font-extrabold text-amber-900 mt-1">₹14,800</h3>
            </div>
            <div className="text-xs space-y-2 text-slate-600">
              <p className="font-semibold text-slate-800">📊 Active Services:</p>
              <div className="p-3 bg-slate-50 rounded-xl border flex justify-between items-center">
                <span>🏨 Hotel Affiliates Booking</span>
                <span className="font-bold text-green-600">Active</span>
              </div>
              <div className="p-3 bg-slate-50 rounded-xl border flex justify-between items-center">
                <span>🛺 Local Cab & Taxi Integration</span>
                <span className="font-bold text-green-600">Active</span>
              </div>
            </div>
          </div>
        )}

        {/* TAB 4: PROFILE */}
        {activeTab === 'profile' && (
          <div className="bg-white p-5 rounded-2xl shadow-sm border border-slate-200 text-center space-y-3">
            <div className="w-16 h-16 bg-amber-100 text-amber-700 rounded-full flex items-center justify-center text-2xl font-bold mx-auto">RB</div>
            <h2 className="font-bold text-base text-slate-800">Ravi Bharggav</h2>
            <p className="text-xs text-slate-500">Quality Engineer • Creator & Developer</p>
            <div className="pt-2 border-t text-left text-xs space-y-2 text-slate-600">
              <p>📍 Location: Gujarat, India</p>
              <p>🌐 Project: Bharat Yatra Pro V2</p>
              <p>⭐ Saved Destinations: 12</p>
            </div>
          </div>
        )}

      </div>

      {/* DETAILED MODAL POPUP */}
      {selectedKey && spots[selectedKey] && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-end sm:items-center justify-center z-50 p-0 sm:p-4">
          <div className="bg-white rounded-t-3xl sm:rounded-2xl max-w-md w-full max-h-[90vh] overflow-y-auto shadow-2xl animate-in fade-in duration-200">
            
            <div className="relative h-48">
              <img src={spots[selectedKey].image_url} alt="" className="w-full h-full object-cover" />
              <button onClick={() => setSelectedKey(null)} className="absolute top-3 right-3 bg-black/50 hover:bg-black/70 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold text-sm">✕</button>
            </div>

            <div className="p-5 space-y-4 text-xs">
              <div>
                <span className="bg-amber-100 text-amber-800 px-2 py-0.5 rounded font-semibold text-[10px]">{spots[selectedKey].Type}</span>
                <h2 className="font-extrabold text-lg text-slate-900 mt-1">{spots[selectedKey].Name}</h2>
                <p className="text-slate-500">📍 {spots[selectedKey].City}, {spots[selectedKey].State}</p>
              </div>

              {/* Pillars Section */}
              <div className="grid grid-cols-2 gap-2">
                <div className="bg-amber-50 p-3 rounded-xl border border-amber-200/50">
                  <p className="font-semibold text-amber-900">🌤️ Weather</p>
                  <p className="text-slate-600 mt-0.5">{spots[selectedKey].weather}</p>
                </div>
                <div className="bg-blue-50 p-3 rounded-xl border border-blue-200/50">
                  <p className="font-semibold text-blue-900">💰 Budget</p>
                  <p className="text-slate-600 mt-0.5">{spots[selectedKey].budget}</p>
                </div>
              </div>

              <div>
                <p className="font-semibold text-slate-800 text-sm">🏛️ History & Significance</p>
                <p className="text-slate-600 mt-1 leading-relaxed">{spots[selectedKey].history_geo_political}</p>
              </div>

              <div>
                <p className="font-semibold text-slate-800 text-sm">🌿 Attractions & Picnic Spots</p>
                <p className="text-slate-600 mt-1 whitespace-pre-line">{spots[selectedKey].picnic_spots}</p>
              </div>

              <div>
                <p className="font-semibold text-slate-800 text-sm">🎒 Packing Guide</p>
                <p className="text-slate-600 mt-1">{spots[selectedKey].packing}</p>
              </div>

              <div>
                <p className="font-semibold text-slate-800 text-sm">🚗 Transport & Roadmap</p>
                <p className="text-slate-600 mt-1">{spots[selectedKey].transport_roadmap}</p>
              </div>

              <div>
                <p className="font-semibold text-slate-800 text-sm">🏨 Hotels & Stays</p>
                <p className="text-slate-600 mt-1">{spots[selectedKey].hotels_booking}</p>
              </div>

              <div>
                <p className="font-semibold text-slate-800 text-sm">🍲 Local Food & Markets</p>
                <p className="text-slate-600 mt-1">{spots[selectedKey].markets_food}</p>
              </div>

              <button 
                onClick={() => alert("Booking & navigation portal initiated!")} 
                className="w-full bg-amber-600 hover:bg-amber-700 text-white py-3 rounded-xl font-bold text-xs shadow-md">
                🚀 Book Hotel / Train / Taxi Now
              </button>
            </div>
          </div>
        </div>
      )}

      {/* BOTTOM NAVIGATION APP BAR */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-slate-200 py-2.5 px-6 flex justify-around items-center z-40 shadow-lg">
        <button onClick={() => setActiveTab('home')} className={`flex flex-col items-center gap-1 ${activeTab === 'home' ? 'text-amber-600 font-bold' : 'text-slate-400 font-medium'}`}>
          <span className="text-lg">🏠</span>
          <span className="text-[10px]">Home</span>
        </button>
        <button onClick={() => setActiveTab('add')} className={`flex flex-col items-center gap-1 ${activeTab === 'add' ? 'text-amber-600 font-bold' : 'text-slate-400 font-medium'}`}>
          <span className="text-lg">➕</span>
          <span className="text-[10px]">Add Spot</span>
        </button>
        <button onClick={() => setActiveTab('business')} className={`flex flex-col items-center gap-1 ${activeTab === 'business' ? 'text-amber-600 font-bold' : 'text-slate-400 font-medium'}`}>
          <span className="text-lg">💼</span>
          <span className="text-[10px]">Business</span>
        </button>
        <button onClick={() => setActiveTab('profile')} className={`flex flex-col items-center gap-1 ${activeTab === 'profile' ? 'text-amber-600 font-bold' : 'text-slate-400 font-medium'}`}>
          <span className="text-lg">👤</span>
          <span className="text-[10px]">Profile</span>
        </button>
      </div>

    </div>
  );
}
