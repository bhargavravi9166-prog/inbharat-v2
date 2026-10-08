import React, { useState } from 'react';
import { MASTER_INDIA_TOURISM_DIRECTORY } from './tourismData';

export default function App() {
  const [activeTab, setActiveTab] = useState<'home' | 'reels' | 'add' | 'planner' | 'business' | 'profile'>('home');
  const [selectedKey, setSelectedKey] = useState<string | null>(null);
  const [search, setSearch] = useState<string>("");

  const [reelsList, setReelsList] = useState<any[]>([
    { id: 1, title: "Varanasi Ganga Aarti Cinematic View", location: "Varanasi, Uttar Pradesh", url: "https://images.unsplash.com/photo-1570168007204-dfb528c6958f?auto=format&fit=crop&w=1200&q=80" },
    { id: 2, title: "Mount Abu Sunset Point Vibe", location: "Mount Abu, Rajasthan", url: "https://images.unsplash.com/photo-1570168007204-dfb528c6958f?auto=format&fit=crop&w=1200&q=80" }
  ]);

  const [reelForm, setReelForm] = useState({ title: '', location: '', url: '' });
  const [plannerForm, setPlannerForm] = useState({ destination: '', days: '3 Days', budget: 'Moderate (₹10,000)' });
  const [itineraryResult, setItineraryResult] = useState<any>(null);

  const [spots] = useState(() => {
    try {
      const savedSpots = localStorage.getItem("in_bharat_custom_spots");
      if (savedSpots) {
        const parsed = JSON.parse(savedSpots);
        return { ...MASTER_INDIA_TOURISM_DIRECTORY, ...parsed };
      }
    } catch (e) {
      console.error(e);
    }
    return MASTER_INDIA_TOURISM_DIRECTORY;
  });

  const [form, setForm] = useState({
    id: '', Name: '', City: '', State: '', Type: 'Cultural Spot',
    weather: '26°C', bestTime: 'October to March', packing: 'Comfortable casual wear',
    budget: '₹2,000 / day', distance: '5 km from city center', history_geo_political: '', picnic_spots: '',
    transport_roadmap: '', hotels_booking: '', markets_food: '', culture_helpline: ''
  });

  const handleAddSpot = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.Name || !form.City) return alert("Please enter name and city!");
    const key = form.Name.toLowerCase().replace(/\s+/g, '_');
    
    const updatedSpots = {
      ...spots,
      [key]: {
        ...form,
        image_url: "https://images.unsplash.com/photo-1570168007204-dfb528c6958f?auto=format&fit=crop&w=1200&q=80"
      }
    };

    localStorage.setItem("in_bharat_custom_spots", JSON.stringify(updatedSpots));
    alert("Spot published successfully!");
    setActiveTab('home');
  };

  const handleUploadReel = (e: React.FormEvent) => {
    e.preventDefault();
    if (!reelForm.title || !reelForm.location) return alert("Please enter reel title and location!");
    const newReel = {
      id: Date.now(),
      title: reelForm.title,
      location: reelForm.location,
      url: reelForm.url || "https://images.unsplash.com/photo-1570168007204-dfb528c6958f?auto=format&fit=crop&w=1200&q=80"
    };
    setReelsList([newReel, ...reelsList]);
    setReelForm({ title: '', location: '', url: '' });
    alert("Reel uploaded successfully!");
    setActiveTab('reels');
  };

  const handleGenerateItinerary = (e: React.FormEvent) => {
    e.preventDefault();
    if (!plannerForm.destination) return alert("Please enter a destination!");
    setItineraryResult({
      title: `Yatra Plan for ${plannerForm.destination}`,
      duration: plannerForm.days,
      budget: plannerForm.budget,
      daysPlan: [
        "Day 1: Arrival, hotel check-in, local heritage sightseeing & evening Aarti.",
        "Day 2: Major pilgrimage shrines, historical exploration & local food markets.",
        "Day 3: Scenic viewpoints, souvenir shopping & return journey roadmap."
      ]
    });
  };

  const filteredItems = Object.entries(spots).filter(([k, s]: [string, any]) => {
    if (!s) return false;
    const rawQuery = search.toLowerCase().trim();
    if (!rawQuery) return true;

    const queryTokens = rawQuery.split(/\s+/).filter(Boolean);
    const targetString = [
      s.Name || '',
      s.City || '',
      s.State || '',
      s.Type || '',
      s.history_geo_political || '',
      s.picnic_spots || '',
      s.distance || '',
      k || ''
    ].join(' ').toLowerCase();

    const cleanQuery = rawQuery.replace(/[^a-z0-9]/g, '');
    const cleanTarget = targetString.replace(/[^a-z0-9]/g, '');

    if (cleanTarget.includes(cleanQuery)) {
      return true;
    }

    const matchedTokensCount = queryTokens.filter(token => targetString.includes(token)).length;
    return matchedTokensCount >= Math.ceil(queryTokens.length / 2);
  });

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 pb-28 font-sans selection:bg-orange-500 selection:text-white">
      
      {/* Header */}
      <div className="bg-slate-900/95 backdrop-blur-md border-b border-slate-800 sticky top-0 z-30 px-4 py-3 flex items-center justify-between shadow-lg">
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-orange-500 via-amber-500 to-blue-900 p-0.5 shadow-md flex items-center justify-center overflow-hidden border border-orange-500/30">
            <span className="text-white font-black text-sm tracking-tighter">IN</span>
          </div>
          <div>
            <h1 className="font-black text-sm tracking-widest bg-gradient-to-r from-orange-400 via-white to-blue-400 bg-clip-text text-transparent">IN BHARAT</h1>
            <p className="text-[9px] text-slate-400 font-semibold tracking-widest uppercase">Pro Travel Network</p>
          </div>
        </div>
        <span className="bg-orange-500/10 border border-orange-500/30 text-orange-400 text-[10px] px-2.5 py-1 rounded-full font-bold">Pro Edition</span>
      </div>

      <div className="max-w-md mx-auto p-4 space-y-4">
        
        {/* TAB 1: HOME */}
        {activeTab === 'home' && (
          <>
            <div className="relative group">
              <span className="absolute inset-y-0 left-0 flex items-center pl-3.5 text-slate-400 text-sm">🔍</span>
              <input 
                type="text"
                placeholder="Search states, cities, distance, temples..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-11 pr-4 py-3 bg-slate-900/90 rounded-2xl border border-slate-800 text-xs text-slate-100 placeholder-slate-500 shadow-inner focus:outline-none focus:ring-2 focus:ring-orange-500 transition"
              />
            </div>

            <div className="space-y-5 pt-2">
              {filteredItems.length === 0 ? (
                <div className="text-center py-16 text-slate-500 text-xs">
                  No destinations found matching "{search}". Try searching another keyword!
                </div>
              ) : (
                filteredItems.map(([k, s]: [string, any]) => (
                  <div key={k} className="bg-slate-900 rounded-2xl border border-slate-800/80 overflow-hidden shadow-xl">
                    <div className="px-3.5 py-2.5 flex items-center justify-between border-b border-slate-800/50">
                      <div className="flex items-center gap-2.5">
                        <div className="w-7 h-7 rounded-full bg-gradient-to-br from-orange-500 to-blue-900 flex items-center justify-center text-[10px] font-bold text-white">IN</div>
                        <div>
                          <p className="text-xs font-bold text-slate-200">{s.Name}</p>
                          <p className="text-[9px] text-slate-400">📍 {s.City}, {s.State}</p>
                        </div>
                      </div>
                      <span className="text-[10px] bg-orange-500/10 text-orange-400 px-2 py-0.5 rounded-md font-semibold border border-orange-500/20">{s.Type}</span>
                    </div>

                    <div className="relative h-64 w-full bg-slate-950 overflow-hidden">
                      <img src={s.image_url} alt={s.Name} className="w-full h-full object-cover" />
                      <div className="absolute bottom-3 right-3 bg-slate-900/80 backdrop-blur-md text-emerald-400 text-[10px] px-2.5 py-1 rounded-lg font-bold border border-emerald-500/30 shadow">
                        🛣️ {s.distance || "City Center"}
                      </div>
                    </div>

                    <div className="p-3.5 space-y-2.5">
                      <div className="flex gap-2 text-[10px]">
                        <span className="bg-slate-800 text-orange-300 px-2 py-1 rounded-md font-medium border border-slate-700">🌡️ {s.weather}</span>
                        <span className="bg-slate-800 text-blue-300 px-2 py-1 rounded-lg font-medium border border-slate-700">💰 {s.budget}</span>
                      </div>
                      <p className="text-xs text-slate-300 line-clamp-2 leading-relaxed">{s.history_geo_political}</p>
                      <button 
                        onClick={() => setSelectedKey(k)} 
                        className="w-full mt-1 bg-gradient-to-r from-orange-500 to-amber-600 text-white text-xs py-2.5 rounded-xl font-bold shadow transition flex items-center justify-center gap-1.5">
                        <span>Explore Full Heritage & Services</span>
                        <span>→</span>
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </>
        )}

        {/* TAB 2: REELS */}
        {activeTab === 'reels' && (
          <div className="space-y-5">
            <div className="flex items-center justify-between bg-slate-900 p-3.5 rounded-2xl border border-slate-800">
              <div>
                <h2 className="font-bold text-xs text-slate-100">🎬 Cinematic Travel Reels</h2>
                <p className="text-[9px] text-slate-400">Share your travel moments with the community.</p>
              </div>
              <button 
                onClick={() => setActiveTab('add')} 
                className="bg-orange-500 hover:bg-orange-600 text-white text-[10px] font-bold px-3 py-2 rounded-xl shadow transition">
                + Upload Reel
              </button>
            </div>

            <div className="space-y-4">
              {reelsList.map((reel) => (
                <div key={reel.id} className="relative h-[400px] w-full rounded-2xl overflow-hidden bg-slate-900 border border-slate-800 shadow-2xl">
                  <img src={reel.url} alt="" className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent"></div>
                  <div className="absolute bottom-4 left-4 right-4 space-y-1.5">
                    <span className="bg-orange-500/80 text-white text-[9px] px-2 py-0.5 rounded font-bold">Featured Reel</span>
                    <h3 className="text-sm font-extrabold text-white">{reel.title}</h3>
                    <p className="text-[11px] text-slate-300">📍 {reel.location}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 3: ADD SPOT */}
        {activeTab === 'add' && (
          <div className="space-y-5">
            <div className="bg-slate-900 p-5 rounded-2xl shadow-xl border border-slate-800 space-y-4">
              <div>
                <h2 className="font-bold text-sm text-slate-100">✨ Add New Destination Spot</h2>
                <p className="text-[10px] text-slate-400">Contribute heritage spots to the network.</p>
              </div>
              
              <form onSubmit={handleAddSpot} className="space-y-3 text-xs">
                <div>
                  <label className="font-semibold text-slate-300">Location Name</label>
                  <input type="text" placeholder="e.g. Somnath Temple" value={form.Name} onChange={e=>setForm({...form, Name: e.target.value})} className="w-full mt-1 p-2.5 bg-slate-950 border border-slate-800 rounded-xl text-slate-100 focus:ring-2 focus:ring-orange-500 focus:outline-none" required />
                </div>
                <div className="grid grid-cols-2 gap-2.5">
                  <div>
                    <label className="font-semibold text-slate-300">City</label>
                    <input type="text" placeholder="City name" value={form.City} onChange={e=>setForm({...form, City: e.target.value})} className="w-full mt-1 p-2.5 bg-slate-950 border border-slate-800 rounded-xl text-slate-100 focus:ring-2 focus:ring-orange-500 focus:outline-none" required />
                  </div>
                  <div>
                    <label className="font-semibold text-slate-300">State</label>
                    <input type="text" placeholder="State name" value={form.State} onChange={e=>setForm({...form, State: e.target.value})} className="w-full mt-1 p-2.5 bg-slate-950 border border-slate-800 rounded-xl text-slate-100 focus:ring-2 focus:ring-orange-500 focus:outline-none" required />
                  </div>
                </div>
                <div>
                  <label className="font-semibold text-slate-300">Distance / Proximity</label>
                  <input type="text" placeholder="e.g. 5 km from station" value={form.distance} onChange={e=>setForm({...form, distance: e.target.value})} className="w-full mt-1 p-2.5 bg-slate-950 border border-slate-800 rounded-xl text-slate-100 focus:ring-2 focus:ring-orange-500 focus:outline-none" />
                </div>
                <div>
                  <label className="font-semibold text-slate-300">History & Significance</label>
                  <textarea rows={2} placeholder="Write details..." value={form.history_geo_political} onChange={e=>setForm({...form, history_geo_political: e.target.value})} className="w-full mt-1 p-2.5 bg-slate-950 border border-slate-800 rounded-xl text-slate-100 focus:ring-2 focus:ring-orange-500 focus:outline-none"></textarea>
                </div>
                <button type="submit" className="w-full py-3 bg-gradient-to-r from-orange-500 to-amber-600 text-white font-bold rounded-xl shadow-lg mt-2 hover:opacity-95 transition">Publish Spot</button>
              </form>
            </div>

            <div className="bg-slate-900 p-5 rounded-2xl shadow-xl border border-slate-800 space-y-4">
              <div>
                <h2 className="font-bold text-sm text-slate-100">🎥 Upload Travel Reel</h2>
                <p className="text-[10px] text-slate-400">Publish your short reel directly to the Reels feed.</p>
              </div>

              <form onSubmit={handleUploadReel} className="space-y-3 text-xs">
                <div>
                  <label className="font-semibold text-slate-300">Reel Title / Caption</label>
                  <input type="text" placeholder="e.g. Evening Ghat Vibe" value={reelForm.title} onChange={e=>setReelForm({...reelForm, title: e.target.value})} className="w-full mt-1 p-2.5 bg-slate-950 border border-slate-800 rounded-xl text-slate-100 focus:ring-2 focus:ring-orange-500 focus:outline-none" required />
                </div>
                <div>
                  <label className="font-semibold text-slate-300">Location</label>
                  <input type="text" placeholder="e.g. Varanasi, UP" value={reelForm.location} onChange={e=>setReelForm({...reelForm, location: e.target.value})} className="w-full mt-1 p-2.5 bg-slate-950 border border-slate-800 rounded-xl text-slate-100 focus:ring-2 focus:ring-orange-500 focus:outline-none" required />
                </div>
                <div>
                  <label className="font-semibold text-slate-300">Thumbnail URL</label>
                  <input type="text" placeholder="Paste image link..." value={reelForm.url} onChange={e=>setReelForm({...reelForm, url: e.target.value})} className="w-full mt-1 p-2.5 bg-slate-950 border border-slate-800 rounded-xl text-slate-100 focus:ring-2 focus:ring-orange-500 focus:outline-none" />
                </div>
                <button type="submit" className="w-full py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-bold rounded-xl shadow-lg mt-2 hover:opacity-95 transition">Publish Reel Now</button>
              </form>
            </div>
          </div>
        )}

        {/* TAB 4: PLANNER */}
        {activeTab === 'planner' && (
          <div className="bg-slate-900 p-5 rounded-2xl shadow-xl border border-slate-800 space-y-4">
            <div>
              <h2 className="font-bold text-sm text-slate-100">🗺️ AI Trip Planner</h2>
              <p className="text-[10px] text-slate-400">Plan your custom heritage yatra with intelligent routing.</p>
            </div>
            
            <form onSubmit={handleGenerateItinerary} className="space-y-3 text-xs">
              <div>
                <label className="font-semibold text-slate-300">Target Destination</label>
                <input type="text" placeholder="e.g. Varanasi" value={plannerForm.destination} onChange={e=>setPlannerForm({...plannerForm, destination: e.target.value})} className="w-full mt-1 p-2.5 bg-slate-950 border border-slate-800 rounded-xl text-slate-100 focus:ring-2 focus:ring-orange-500 focus:outline-none" required />
              </div>
              <div className="grid grid-cols-2 gap-2.5">
                <div>
                  <label className="font-semibold text-slate-300">Duration</label>
                  <select value={plannerForm.days} onChange={e=>setPlannerForm({...plannerForm, days: e.target.value})} className="w-full mt-1 p-2.5 bg-slate-950 border border-slate-800 rounded-xl text-slate-100 focus:ring-2 focus:ring-orange-500 focus:outline-none">
                    <option>2 Days</option>
                    <option>3 Days</option>
                    <option>5 Days</option>
                  </select>
                </div>
                <div>
                  <label className="font-semibold text-slate-300">Budget Tier</label>
                  <select value={plannerForm.budget} onChange={e=>setPlannerForm({...plannerForm, budget: e.target.value})} className="w-full mt-1 p-2.5 bg-slate-950 border border-slate-800 rounded-xl text-slate-100 focus:ring-2 focus:ring-orange-500 focus:outline-none">
                    <option>Budget (₹5,000)</option>
                    <option>Moderate (₹10,000)</option>
                    <option>Luxury (₹25,000+)</option>
                  </select>
                </div>
              </div>
              <button type="submit" className="w-full py-3 bg-gradient-to-r from-orange-500 to-amber-600 text-white font-bold rounded-xl shadow-lg mt-2 hover:opacity-95 transition">Generate Smart Itinerary</button>
            </form>

            {itineraryResult && (
              <div className="mt-4 p-4 bg-slate-950 rounded-xl border border-orange-500/30 space-y-2 text-xs">
                <h3 className="font-extrabold text-orange-400 text-sm">{itineraryResult.title}</h3>
                <p className="text-slate-300">Duration: {itineraryResult.duration} | Budget: {itineraryResult.budget}</p>
                <div className="space-y-1 pt-2">
                  {itineraryResult.daysPlan.map((d: string, i: number) => (
                    <p key={i} className="text-slate-400">• {d}</p>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* TAB 5: BUSINESS */}
        {activeTab === 'business' && (
          <div className="bg-slate-900 p-5 rounded-2xl shadow-xl border border-slate-800 space-y-4">
            <div>
              <h2 className="font-bold text-sm text-slate-100">💼 Business & Revenue Model</h2>
              <p className="text-[10px] text-slate-400">Live platform monetization & booking commission streams.</p>
            </div>
            
            <div className="bg-gradient-to-br from-orange-950/60 to-slate-950 border border-orange-500/30 p-4 rounded-2xl text-center shadow-inner">
              <p className="text-[10px] text-orange-300 font-semibold uppercase tracking-wider">Total Ecosystem Revenue</p>
              <h3 className="text-2xl font-extrabold text-white mt-1">₹14,800</h3>
            </div>

            <div className="text-xs space-y-2 text-slate-300">
              <p className="font-semibold text-slate-200">🚀 Active Streams:</p>
              <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 flex justify-between items-center">
                <span>🏨 Luxury & Budget Hotel Stays</span>
                <span className="font-bold text-emerald-400 bg-emerald-950/50 px-2 py-0.5 rounded border border-emerald-500/30 text-[10px]">Active</span>
              </div>
            </div>
          </div>
        )}

        {/* TAB 6: PROFILE */}
        {activeTab === 'profile' && (
          <div className="bg-slate-900 p-5 rounded-2xl shadow-xl border border-slate-800 text-center space-y-4">
            <div className="w-16 h-16 bg-gradient-to-tr from-orange-500 to-blue-900 text-white rounded-2xl flex items-center justify-center text-xl font-black mx-auto shadow-lg border-2 border-orange-400/30">
              RB
            </div>
            <div>
              <h2 className="font-bold text-base text-slate-100">Ravi Bharggav</h2>
              <p className="text-[10px] text-orange-400 font-semibold mt-0.5">Quality Engineer & Network Creator</p>
            </div>
            <div className="grid grid-cols-3 gap-2 py-2 text-xs border-y border-slate-800">
              <div>
                <p className="font-bold text-white">42</p>
                <p className="text-[9px] text-slate-400">Spots Saved</p>
              </div>
              <div>
                <p className="font-bold text-white">12</p>
                <p className="text-[9px] text-slate-400">Trips Planned</p>
              </div>
              <div>
                <p className="font-bold text-white">{reelsList.length}</p>
                <p className="text-[9px] text-slate-400">Reels Shared</p>
              </div>
            </div>
          </div>
        )}

      </div>

      {selectedKey && spots[selectedKey] && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-md flex items-end sm:items-center justify-center z-50 p-0 sm:p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-t-3xl sm:rounded-2xl max-w-md w-full max-h-[90vh] overflow-y-auto shadow-2xl p-4 space-y-3.5 text-xs text-slate-300">
            <div className="flex justify-between items-center">
              <h2 className="font-extrabold text-lg text-white">{spots[selectedKey].Name}</h2>
              <button onClick={() => setSelectedKey(null)} className="bg-slate-800 text-white px-2 py-1 rounded-full">✕</button>
            </div>
            <img src={spots[selectedKey].image_url} alt="" className="w-full h-48 object-cover rounded-xl" />
            <p>{spots[selectedKey].history_geo_political}</p>
          </div>
        </div>
      )}

      {/* 6-Tab Bottom Navigation Bar */}
      <div className="fixed bottom-0 left-0 right-0 bg-slate-900/95 backdrop-blur-md border-t border-slate-800 py-2 px-1 flex justify-around items-center z-40 shadow-2xl">
        <button onClick={() => setActiveTab('home')} className={`flex flex-col items-center gap-0.5 ${activeTab === 'home' ? 'text-orange-400 font-bold scale-105' : 'text-slate-400'}`}>
          <span className="text-base">🏠</span>
          <span className="text-[8px]">Home</span>
        </button>
        <button onClick={() => setActiveTab('reels')} className={`flex flex-col items-center gap-0.5 ${activeTab === 'reels' ? 'text-orange-400 font-bold scale-105' : 'text-slate-400'}`}>
          <span className="text-base">🎬</span>
          <span className="text-[8px]">Reels</span>
        </button>
        <button onClick={() => setActiveTab('add')} className={`flex flex-col items-center gap-0.5 ${activeTab === 'add' ? 'text-orange-400 font-bold scale-105' : 'text-slate-400'}`}>
          <span className="text-base">➕</span>
          <span className="text-[8px]">Add Spot</span>
        </button>
        <button onClick={() => setActiveTab('planner')} className={`flex flex-col items-center gap-0.5 ${activeTab === 'planner' ? 'text-orange-400 font-bold scale-105' : 'text-slate-400'}`}>
          <span className="text-base">🗺️</span>
          <span className="text-[8px]">Planner</span>
        </button>
        <button onClick={() => setActiveTab('business')} className={`flex flex-col items-center gap-0.5 ${activeTab === 'business' ? 'text-orange-400 font-bold scale-105' : 'text-slate-400'}`}>
          <span className="text-base">💼</span>
          <span className="text-[8px]">Business</span>
        </button>
        <button onClick={() => setActiveTab('profile')} className={`flex flex-col items-center gap-0.5 ${activeTab === 'profile' ? 'text-orange-400 font-bold scale-105' : 'text-slate-400'}`}>
          <span className="text-base">👤</span>
          <span className="text-[8px]">Profile</span>
        </button>
      </div>

    </div>
  );
}
