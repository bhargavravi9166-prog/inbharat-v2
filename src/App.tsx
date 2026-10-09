import React, { useState } from 'react';

// Complete integrated Tourism Directory database
const MASTER_DIRECTORY: Record<string, any> = {
  somnath: { Name: "Somnath Temple", City: "Veraval", State: "Gujarat", Type: "Jyotirlinga", weather: "28°C", budget: "₹2,000", image_url: "https://images.unsplash.com/photo-1621996346565-e3d5d6281298?auto=format&fit=crop&w=1200&q=80", history_geo_political: "First among the twelve jyotirlinga shrines of Shiva, located in Gujarat." },
  varanasi: { Name: "Kashi Vishwanath", City: "Varanasi", State: "Uttar Pradesh", Type: "Jyotirlinga", weather: "30°C", budget: "₹1,500", image_url: "https://images.unsplash.com/photo-1561640494-eb9b26e5e22e?auto=format&fit=crop&w=1200&q=80", history_geo_political: "One of the most famous Hindu temples dedicated to Lord Shiva on the banks of Ganga." },
  jaipur: { Name: "Hawa Mahal & Palace", City: "Jaipur", State: "Rajasthan", Type: "Heritage", weather: "32°C", budget: "₹2,500", image_url: "https://images.unsplash.com/photo-1599661046827-dacff0c0f09a?auto=format&fit=crop&w=1200&q=80", history_geo_political: "The Pink City of India known for majestic forts and royal heritage palaces." },
  kerala: { Name: "Munnar Tea Hills", City: "Munnar", State: "Kerala", Type: "Nature", weather: "22°C", budget: "₹4,000", image_url: "https://images.unsplash.com/photo-1593693397690-362cb9666fc2?auto=format&fit=crop&w=1200&q=80", history_geo_political: "Breathtaking green hills, endless tea plantations, and misty mountains." }
};

export default function App() {
  const [tab, setTab] = useState<'home' | 'reels' | 'planner' | 'business' | 'profile'>('home');
  const [search, setSearch] = useState("");
  const [selectedSpot, setSelectedSpot] = useState<any>(null); // Detail Modal State

  // Reels System State
  const [reels, setReels] = useState([
    { id: 1, user: "incredible_india", caption: "Varanasi Ganga Aarti ✨", likes: 1420, url: "https://images.unsplash.com/photo-1570168007204-dfb528c6958f?auto=format&fit=crop&w=1200&q=80", location: "Varanasi, UP", liked: false },
    { id: 2, user: "rajasthan_diaries", caption: "Majestic Amer Fort, Jaipur 🏰", likes: 850, url: "https://images.unsplash.com/photo-1599661046827-dacff0c0f09a?auto=format&fit=crop&w=1200&q=80", location: "Jaipur, RJ", liked: false }
  ]);
  const [newCaption, setNewCaption] = useState("");
  const [newLoc, setNewLoc] = useState("");

  // AI Planner System State
  const [planDest, setPlanDest] = useState("");
  const [planDays, setPlanDays] = useState("3 Days");
  const [itineraryResult, setItineraryResult] = useState<any>(null);

  // Filter Logic for Search & Directory
  const filteredSpots = Object.entries(MASTER_DIRECTORY).filter(([_, s]: [string, any]) =>
    s.Name.toLowerCase().includes(search.toLowerCase()) ||
    s.City.toLowerCase().includes(search.toLowerCase()) ||
    s.State.toLowerCase().includes(search.toLowerCase()) ||
    s.Type.toLowerCase().includes(search.toLowerCase())
  );

  // Like Reel Handler
  const handleLike = (id: number) => {
    setReels(reels.map(r => r.id === id ? { ...r, likes: r.liked ? r.likes - 1 : r.likes + 1, liked: !r.liked } : r));
  };

  return (
    <div className="min-h-screen bg-black text-white pb-24 font-sans select-none">
      
      {/* Top Header */}
      <div className="bg-black/90 backdrop-blur-md border-b border-neutral-800 px-4 py-3 flex justify-between items-center sticky top-0 z-40">
        <h1 className="font-extrabold text-base tracking-wider bg-gradient-to-r from-amber-400 via-orange-500 to-rose-500 bg-clip-text text-transparent">
          IN BHARAT PRO
        </h1>
        <div className="flex items-center gap-3 text-lg">
          <span className="cursor-pointer">❤️</span>
          <span className="cursor-pointer">✈️</span>
        </div>
      </div>

      <div className="max-w-md mx-auto">
        
        {/* TAB 1: HOME (Tourism Directory & Interactive Search) */}
        {tab === 'home' && (
          <div className="space-y-4 p-3">
            {/* Live Search Bar */}
            <div className="relative">
              <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-neutral-400 text-sm">🔍</span>
              <input 
                type="text" 
                placeholder="Search places, cities, or type (e.g. Jyotirlinga)..." 
                value={search} 
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 bg-neutral-900 rounded-xl border border-neutral-800 text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-orange-500"
              />
            </div>

            {/* Stories Shortcut Bar */}
            <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-none">
              {Object.entries(MASTER_DIRECTORY).map(([k, s]: [string, any]) => (
                <div key={k} className="flex flex-col items-center space-y-1 shrink-0 cursor-pointer" onClick={() => setSearch(s.City)}>
                  <div className="w-16 h-16 rounded-full p-[2px] bg-gradient-to-tr from-amber-400 via-orange-500 to-rose-500">
                    <img src={s.image_url} alt="" className="w-full h-full object-cover rounded-full border-2 border-black" />
                  </div>
                  <span className="text-[10px] text-neutral-300 font-medium truncate w-16 text-center">{s.City}</span>
                </div>
              ))}
            </div>

            {/* Feed Cards */}
            <div className="space-y-4">
              {filteredSpots.length === 0 ? (
                <div className="text-center py-16 text-neutral-500 text-xs">No destinations found matching your search.</div>
              ) : (
                filteredSpots.map(([k, s]: [string, any]) => (
                  <div key={k} className="bg-neutral-900 rounded-2xl border border-neutral-800 overflow-hidden shadow-xl">
                    <div className="p-3 flex items-center justify-between border-b border-neutral-800/60">
                      <div className="flex items-center gap-2">
                        <div className="w-7 h-7 rounded-full bg-orange-500 flex items-center justify-center font-bold text-xs">🏛️</div>
                        <div>
                          <p className="font-bold text-xs text-white">{s.Name}</p>
                          <p className="text-[9px] text-neutral-400">📍 {s.City}, {s.State}</p>
                        </div>
                      </div>
                      <span className="text-[10px] bg-orange-500/20 text-orange-400 px-2.5 py-0.5 rounded-full font-bold">{s.Type}</span>
                    </div>

                    <div className="relative h-60 bg-neutral-950">
                      <img src={s.image_url} alt="" className="w-full h-full object-cover" />
                    </div>

                    <div className="p-3 space-y-2">
                      <div className="flex items-center justify-between text-xs">
                        <div className="flex gap-4 text-lg">
                          <span className="cursor-pointer">❤️</span>
                          <span className="cursor-pointer">💬</span>
                          <span className="cursor-pointer">↗️</span>
                        </div>
                        <span className="text-orange-400 font-bold text-xs">☀️ {s.weather}</span>
                      </div>
                      <p className="text-xs text-neutral-300 leading-relaxed">{s.history_geo_political}</p>
                      <div className="pt-2 flex items-center justify-between text-xs border-t border-neutral-800">
                        <span className="text-neutral-400">Budget: <strong className="text-white">{s.budget}</strong></span>
                        <button onClick={() => setSelectedSpot(s)} className="bg-orange-500 text-white font-bold px-3 py-1.5 rounded-lg text-[10px]">View Guide</button>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        )}

        {/* TAB 2: REELS (Working Upload & Feed System) */}
        {tab === 'reels' && (
          <div className="space-y-4 p-3">
            <div className="bg-neutral-900 p-3 rounded-xl border border-neutral-800 space-y-2">
              <h2 className="font-bold text-xs text-orange-400">⚡ Upload New Travel Reel</h2>
              <input 
                type="text" 
                placeholder="Caption (e.g. Sunset vibes)" 
                value={newCaption} 
                onChange={(e) => setNewCaption(e.target.value)}
                className="w-full p-2.5 bg-neutral-950 rounded-lg border border-neutral-800 text-xs text-white"
              />
              <input 
                type="text" 
                placeholder="Location (e.g. Goa Beach)" 
                value={newLoc} 
                onChange={(e) => setNewLoc(e.target.value)}
                className="w-full p-2.5 bg-neutral-950 rounded-lg border border-neutral-800 text-xs text-white"
              />
              <button 
                onClick={() => {
                  if(!newCaption || !newLoc) return alert("Enter caption & location!");
                  setReels([{ id: Date.now(), user: "ravi_bharggav", caption: newCaption, likes: 1, url: "https://images.unsplash.com/photo-1570168007204-dfb528c6958f?auto=format&fit=crop&w=1200&q=80", location: newLoc, liked: true }, ...reels]);
                  setNewCaption(""); setNewLoc("");
                  alert("Reel Posted Successfully!");
                }}
                className="w-full py-2.5 bg-gradient-to-r from-amber-500 to-rose-500 text-white font-bold text-xs rounded-lg shadow-lg">
                Post Reel
              </button>
            </div>

            <div className="space-y-4">
              {reels.map(r => (
                <div key={r.id} className="relative h-[400px] rounded-2xl overflow-hidden bg-neutral-900 border border-neutral-800">
                  <img src={r.url} alt="" className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-80"></div>
                  <div className="absolute top-3 left-3 flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-amber-400 to-rose-500 p-[1px]">
                      <div className="w-full h-full bg-black rounded-full flex items-center justify-center text-[10px] font-bold">RB</div>
                    </div>
                    <span className="text-xs font-bold text-white">@{r.user}</span>
                  </div>
                  <div className="absolute bottom-4 left-4 right-4 space-y-1">
                    <p className="text-xs font-semibold text-white">{r.caption}</p>
                    <p className="text-[10px] text-neutral-300">📍 {r.location}</p>
                  </div>
                  <div className="absolute right-4 bottom-16 flex flex-col items-center gap-2 text-white">
                    <button onClick={() => handleLike(r.id)} className="text-2xl">{r.liked ? '❤️' : '🤍'}</button>
                    <span className="text-[10px] font-bold">{r.likes}</span>
                    <span className="text-xl">💬</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 3: PLANNER (Interactive AI Itinerary Generator) */}
        {tab === 'planner' && (
          <div className="p-3 space-y-4">
            <div className="bg-neutral-900 p-4 rounded-2xl border border-neutral-800 space-y-3">
              <h2 className="font-bold text-sm text-orange-400">🗺️ Smart AI Trip Planner</h2>
              <p className="text-[11px] text-neutral-400">Generate a comprehensive day-by-day customized travel schedule instantly.</p>
              
              <input 
                type="text" 
                placeholder="Enter Destination (e.g. Jaipur, Varanasi)" 
                value={planDest} 
                onChange={(e) => setPlanDest(e.target.value)}
                className="w-full p-2.5 bg-neutral-950 rounded-xl border border-neutral-800 text-xs text-white"
              />

              <select 
                value={planDays} 
                onChange={(e) => setPlanDays(e.target.value)}
                className="w-full p-2.5 bg-neutral-950 rounded-xl border border-neutral-800 text-xs text-white">
                <option value="2 Days">2 Days Trip</option>
                <option value="3 Days">3 Days Trip</option>
                <option value="5 Days">5 Days Trip</option>
              </select>

              <button 
                onClick={() => {
                  if(!planDest) return alert("Please enter a destination!");
                  setItineraryResult({
                    destination: planDest,
                    duration: planDays,
                    day1: "Arrival, hotel check-in, and exploring prime local heritage spots during sunset.",
                    day2: "Full-day guided historical monuments tour, local food tasting, and shopping.",
                    day3: "Morning scenic views, photography session, and departure."
                  });
                }}
                className="w-full py-2.5 bg-gradient-to-r from-orange-500 to-amber-500 text-white font-bold text-xs rounded-xl shadow-lg">
                Generate Itinerary Plan
              </button>
            </div>

            {itineraryResult && (
              <div className="bg-neutral-900 p-4 rounded-2xl border border-neutral-800 space-y-3">
                <div className="flex justify-between items-center border-b border-neutral-800 pb-2">
                  <h3 className="font-bold text-xs text-amber-400">📍 {itineraryResult.destination} ({itineraryResult.duration})</h3>
                  <span className="text-[10px] bg-orange-500/20 text-orange-400 px-2 py-0.5 rounded font-bold">Ready</span>
                </div>
                <div className="space-y-2 text-xs text-neutral-300">
                  <p><strong>Day 1:</strong> {itineraryResult.day1}</p>
                  <p><strong>Day 2:</strong> {itineraryResult.day2}</p>
                  <p><strong>Day 3:</strong> {itineraryResult.day3}</p>
                </div>
              </div>
            )}
          </div>
        )}

        {/* TAB 4: BUSINESS */}
        {tab === 'business' && (
          <div className="p-3 space-y-4">
            <div className="bg-neutral-900 p-4 rounded-2xl border border-neutral-800 text-center space-y-3">
              <h2 className="font-bold text-sm text-orange-400">💼 Business Dashboard</h2>
              <div className="bg-neutral-950 p-4 rounded-xl border border-neutral-800">
                <p className="text-[10px] text-neutral-400 uppercase tracking-wider">Total Ecosystem Revenue</p>
                <h3 className="text-2xl font-black text-white mt-1">₹14,800</h3>
              </div>
            </div>
          </div>
        )}

        {/* TAB 5: PROFILE */}
        {tab === 'profile' && (
          <div className="p-3 space-y-4">
            <div className="bg-neutral-900 p-5 rounded-2xl border border-neutral-800 text-center space-y-3">
              <div className="w-20 h-20 rounded-full p-[2px] bg-gradient-to-tr from-amber-400 via-orange-500 to-rose-500 mx-auto">
                <div className="w-full h-full bg-neutral-950 rounded-full flex items-center justify-center text-xl font-black text-white">RB</div>
              </div>
              <div>
                <h2 className="font-bold text-sm text-white">Ravi Bharggav</h2>
                <p className="text-[11px] text-orange-400">Quality Engineer & Creator</p>
              </div>
              <div className="flex justify-center gap-6 pt-2 text-xs border-t border-neutral-800">
                <div><strong className="block text-white">4</strong>Posts</div>
                <div><strong className="block text-white">1.2K</strong>Followers</div>
                <div><strong className="block text-white">340</strong>Following</div>
              </div>
            </div>
          </div>
        )}

      </div>

      {/* Detail Popup Modal */}
      {selectedSpot && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-neutral-900 border border-neutral-800 w-full max-w-sm rounded-2xl overflow-hidden shadow-2xl space-y-3 p-4">
            <div className="flex justify-between items-center">
              <h3 className="font-bold text-sm text-white">{selectedSpot.Name}</h3>
              <button onClick={() => setSelectedSpot(null)} className="text-neutral-400 hover:text-white text-base font-bold">✕</button>
            </div>
            <img src={selectedSpot.image_url} alt="" className="w-full h-40 object-cover rounded-xl" />
            <p className="text-xs text-neutral-300 leading-relaxed">{selectedSpot.history_geo_political}</p>
            <div className="flex justify-between text-xs pt-2 border-t border-neutral-800 text-neutral-400">
              <span>Weather: <strong className="text-white">{selectedSpot.weather}</strong></span>
              <span>Budget: <strong className="text-orange-400">{selectedSpot.budget}</strong></span>
            </div>
            <button onClick={() => setSelectedSpot(null)} className="w-full py-2 bg-neutral-800 text-white font-bold text-xs rounded-xl">Close Guide</button>
          </div>
        </div>
      )}

      {/* Instagram Bottom Navigation */}
      <div className="fixed bottom-0 left-0 right-0 bg-black/95 border-t border-neutral-800 py-3 px-6 flex justify-between items-center z-40 text-xl">
        <button onClick={() => setTab('home')} className={`${tab === 'home' ? 'text-white scale-110' : 'text-neutral-500'} transition-all`}>🏠</button>
        <button onClick={() => setTab('reels')} className={`${tab === 'reels' ? 'text-white scale-110' : 'text-neutral-500'} transition-all`}>🎬</button>
        <button onClick={() => setTab('planner')} className={`${tab === 'planner' ? 'text-white scale-110' : 'text-neutral-500'} transition-all`}>🗺️</button>
        <button onClick={() => setTab('business')} className={`${tab === 'business' ? 'text-white scale-110' : 'text-neutral-500'} transition-all`}>💼</button>
        <button onClick={() => setTab('profile')} className={`${tab === 'profile' ? 'text-white scale-110' : 'text-neutral-500'} transition-all`}>👤</button>
      </div>

    </div>
  );
}
