import React, { useState, useEffect } from 'react';

// MASTER ECOSYSTEM DATABASE: Tourism, Temples, Local Food, & Shopping Markets
const TOURISM_ECOSYSTEM: Record<string, any> = {
  varanasi: {
    name: "Varanasi (Kashi)",
    state: "Uttar Pradesh",
    tagline: "The Spiritual Capital of India",
    image: "https://images.unsplash.com/photo-1561640494-eb9b26e5e22e?auto=format&fit=crop&w=1200&q=80",
    weather: "30°C",
    bestTime: "October to March",
    description: "One of the oldest living cities in the world, famous for its sacred ghats, evening Ganga Aarti, and ancient temples.",
    temples: [
      { name: "Kashi Vishwanath Temple", significance: "One of the 12 sacred Jyotirlingas of Lord Shiva." },
      { name: "Sankat Mochan Hanuman Temple", significance: "Historic shrine built by poet-saint Tulsidas." },
      { name: "Kaal Bhairav Temple", significance: "Dedicated to the fierce guardian deity of Varanasi." }
    ],
    foods: [
      { dish: "Banarasi Kachori Jalebi", spot: "Thatheri Bazaar", price: "₹60" },
      { dish: "Malaiyyo (Winter Cream Sweet)", spot: "Godowla Chowk", price: "₹80" },
      { dish: "Authentic Banarasi Paan", spot: "Aksar Gali", price: "₹50" }
    ],
    markets: [
      { market: "Banarasi Silk Saree Market", specialty: "Handwoven pure silk brocades and sarees", location: "Chowk" },
      { market: "Vishwanath Galli", specialty: "Brass artifacts, rudraksha beads, and wooden toys", location: "Near Temple Gate" }
    ]
  },
  jaipur: {
    name: "Jaipur",
    state: "Rajasthan",
    tagline: "The Pink City of Royal Heritage",
    image: "https://images.unsplash.com/photo-1599661046827-dacff0c0f09a?auto=format&fit=crop&w=1200&q=80",
    weather: "32°C",
    bestTime: "September to March",
    description: "Famous for majestic forts, royal palaces, vibrant pink-hued architecture, and rich Rajasthani culture.",
    temples: [
      { name: "Govind Dev Ji Temple", significance: "Most revered temple located inside City Palace complex." },
      { name: "Birla Mandir", significance: "Stunning modern white marble temple dedicated to Lord Vishnu & Laxmi." },
      { name: "Galtaji Monkey Temple", significance: "Ancient pilgrimage site featuring natural spring water tanks." }
    ],
    foods: [
      { dish: "Dal Baati Churma", spot: "Chokhi Dhani / MI Road", price: "₹350" },
      { dish: "Pyaaz Kachori", spot: "Rawat Mishtan Bhandar", price: "₹45" },
      { dish: "Traditional Ghevar", spot: "Laxmi Misthan Bhandar (LMB)", price: "₹200" }
    ],
    markets: [
      { market: "Johri Bazaar", specialty: "Traditional Kundan, Polki jewelry, and precious gemstones", location: "Old City" },
      { market: "Bapu Bazaar", specialty: "Jaipuri quilts, block-print textiles, and traditional mojris", location: "Bapu Bazaar Road" }
    ]
  },
  somnath: {
    name: "Somnath",
    state: "Gujarat",
    tagline: "The Eternal Shrine by the Arabian Sea",
    image: "https://images.unsplash.com/photo-1621996346565-e3d5d6281298?auto=format&fit=crop&w=1200&q=80",
    weather: "29°C",
    bestTime: "November to February",
    description: "Home to the first among the twelve Jyotirlinga shrines of Lord Shiva, overlooking the majestic ocean waves.",
    temples: [
      { name: "Somnath Jyotirlinga Temple", significance: "First and foremost Jyotirlinga shrine with breathtaking architecture." },
      { name: "Bhalka Tirth", significance: "Sacred spot where Lord Krishna took his last earthly journey." }
    ],
    foods: [
      { dish: "Gujarati Thali", spot: "Local Heritage Restaurants", price: "₹250" },
      { dish: "Khaman Dhokla & Fafda", spot: "Veraval Chowpatty", price: "₹60" }
    ],
    markets: [
      { market: "Somnath Souvenir Market", specialty: "Shell crafts, handloom items, and religious artifacts", location: "Near Temple Promenade" }
    ]
  }
};

export default function App() {
  const [tab, setTab] = useState<'home' | 'planner' | 'reels' | 'travel' | 'profile'>('home');
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCityKey, setActiveCityKey] = useState<string | null>(null);

  // AI Trip Planner State
  const [selectedDest, setSelectedDest] = useState("varanasi");
  const [tripDuration, setTripDuration] = useState("3 Days");
  const [generatedItinerary, setGeneratedItinerary] = useState<any>(null);

  // Reels Engagement State
  const [reelsList, setReelsList] = useState([
    { id: 1, user: "incredible_india", caption: "Ganga Aarti Grand View at Dashashwamedh Ghat ✨", likes: 4210, video: "https://assets.mixkit.co/videos/preview/mixkit-aerial-view-of-city-traffic-at-night-41555-large.mp4", location: "Varanasi, UP", liked: false },
    { id: 2, user: "rajasthan_tourism", caption: "Sunset reflection at Amer Fort walls 🏰", likes: 2150, video: "https://assets.mixkit.co/videos/preview/mixkit-traveller-walking-on-a-mountain-ridge-41627-large.mp4", location: "Jaipur, RJ", liked: false }
  ]);
  const [newReelUrl, setNewReelUrl] = useState("");
  const [newReelCaption, setNewReelCaption] = useState("");

  // Ixigo Booking State
  const [trainFrom, setTrainFrom] = useState("");
  const [trainTo, setTrainTo] = useState("");
  const [trainResults, setTrainResults] = useState<any[] | null>(null);

  // Live GPS Trip Tracker State
  const [gpsActive, setGpsActive] = useState(false);
  const [vehicleSpeed, setVehicleSpeed] = useState(0);
  const [totalKm, setTotalKm] = useState(0);

  useEffect(() => {
    let timer: any;
    if (gpsActive) {
      timer = setInterval(() => {
        setVehicleSpeed(Math.floor(Math.random() * (75 - 45 + 1)) + 45);
        setTotalKm(prev => Number((prev + 0.6).toFixed(1)));
      }, 2000);
    } else {
      setVehicleSpeed(0);
    }
    return () => clearInterval(timer);
  }, [gpsActive]);

  const filteredDestinations = Object.entries(TOURISM_ECOSYSTEM).filter(([_, data]: [string, any]) =>
    data.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    data.state.toLowerCase().includes(search.toLowerCase()) ||
    data.tagline.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-black text-white pb-24 font-sans select-none">
      
      {/* Top Header */}
      <div className="bg-black/90 backdrop-blur-md border-b border-neutral-800 px-4 py-3 flex justify-between items-center sticky top-0 z-40">
        <div>
          <h1 className="font-black text-sm tracking-wider bg-gradient-to-r from-amber-400 via-orange-500 to-rose-500 bg-clip-text text-transparent">
            IN BHARAT PRO 🇮🇳
          </h1>
          <p className="text-[9px] text-neutral-400">Tourism, Heritage, Food & Markets</p>
        </div>
        <span className="text-[10px] bg-orange-500/20 text-orange-400 font-bold px-2.5 py-1 rounded-full border border-orange-500/30">Pro Live</span>
      </div>

      <div className="max-w-md mx-auto p-3 space-y-4">
        
        {/* TAB 1: HOME (Tourism Directory - Temples, Food & Markets) */}
        {tab === 'home' && (
          <div className="space-y-4">
            {/* Search Input */}
            <div className="relative">
              <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-neutral-400 text-xs">🔍</span>
              <input 
                type="text" 
                placeholder="Search destinations, states, or temples..." 
                value={searchQuery} 
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-4 py-2.5 bg-neutral-900 rounded-xl border border-neutral-800 text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-orange-500"
              />
            </div>

            {/* Destination Feed Cards */}
            <div className="space-y-4">
              {filteredDestinations.length === 0 ? (
                <div className="text-center py-16 text-neutral-500 text-xs">No matching destinations found.</div>
              ) : (
                filteredDestinations.map(([key, dest]: [string, any]) => (
                  <div key={key} className="bg-neutral-900 rounded-2xl border border-neutral-800 overflow-hidden shadow-xl space-y-3 pb-3">
                    <div className="relative h-52 bg-neutral-950">
                      <img src={dest.image} alt="" className="w-full h-full object-cover" />
                      <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-transparent to-transparent"></div>
                      <div className="absolute top-3 right-3 bg-black/70 backdrop-blur-md px-2.5 py-1 rounded-full text-[10px] text-orange-400 font-bold border border-neutral-800">
                        ☀️ {dest.weather}
                      </div>
                      <div className="absolute bottom-3 left-3 right-3">
                        <h2 className="text-base font-bold text-white">{dest.name} <span className="text-xs text-orange-400 font-normal">({dest.state})</span></h2>
                        <p className="text-[10px] text-neutral-300">{dest.tagline}</p>
                      </div>
                    </div>

                    <div className="px-3 space-y-3 text-xs">
                      <p className="text-neutral-300 text-[11px] leading-relaxed">{dest.description}</p>
                      
                      {/* Highlights Pill Grid */}
                      <div className="grid grid-cols-2 gap-2">
                        <div className="bg-neutral-950 p-2.5 rounded-xl border border-neutral-800">
                          <p className="font-bold text-amber-400 mb-1">🍲 Famous Food</p>
                          <p className="text-[10px] text-neutral-300 truncate">{dest.foods[0].dish}</p>
                          <span className="text-[9px] text-orange-400 font-semibold">{dest.foods[0].price}</span>
                        </div>
                        <div className="bg-neutral-950 p-2.5 rounded-xl border border-neutral-800">
                          <p className="font-bold text-rose-400 mb-1">🛍️ Local Market</p>
                          <p className="text-[10px] text-neutral-300 truncate">{dest.markets[0].market}</p>
                          <span className="text-[9px] text-neutral-400">{dest.markets[0].location}</span>
                        </div>
                      </div>

                      <button 
                        onClick={() => setActiveCityKey(key)} 
                        className="w-full py-2.5 bg-gradient-to-r from-orange-500 to-amber-500 font-bold text-white rounded-xl shadow-lg active:scale-95 transition-transform">
                        Explore Full Tourism & Food Guide →
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        )}

        {/* TAB 2: AI TRIP PLANNER */}
        {tab === 'planner' && (
          <div className="space-y-4 text-xs">
            <div className="bg-neutral-900 p-4 rounded-2xl border border-neutral-800 space-y-3">
              <h2 className="font-bold text-sm text-orange-400">🗺️ Smart AI Tourism & Itinerary Planner</h2>
              <p className="text-[11px] text-neutral-400">Generate a complete custom schedule covering heritage temples, famous local food spots, and shopping markets.</p>
              
              <div className="space-y-2">
                <label className="text-[10px] text-neutral-400 font-bold">Select Destination</label>
                <select 
                  value={selectedDest} 
                  onChange={(e) => setSelectedDest(e.target.value)}
                  className="w-full p-2.5 bg-neutral-950 rounded-xl border border-neutral-800 text-white">
                  <option value="varanasi">Varanasi (Spiritual Ghats & Street Food)</option>
                  <option value="jaipur">Jaipur (Royal Forts & Jewelry Markets)</option>
                  <option value="somnath">Somnath (Coastal Temples & Heritage)</option>
                </select>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] text-neutral-400 font-bold">Trip Duration</label>
                <select 
                  value={tripDuration} 
                  onChange={(e) => setTripDuration(e.target.value)}
                  className="w-full p-2.5 bg-neutral-950 rounded-xl border border-neutral-800 text-white">
                  <option value="2 Days">2 Days Weekend Tour</option>
                  <option value="3 Days">3 Days Comprehensive Tour</option>
                  <option value="5 Days">5 Days Immersive Tour</option>
                </select>
              </div>

              <button 
                onClick={() => {
                  const data = TOURISM_ECOSYSTEM[selectedDest];
                  setGeneratedItinerary(data);
                }}
                className="w-full py-2.5 bg-gradient-to-r from-orange-500 to-amber-500 font-bold text-white rounded-xl shadow-lg">
                Generate Custom Itinerary Plan
              </button>
            </div>

            {generatedItinerary && (
              <div className="bg-neutral-900 p-4 rounded-2xl border border-neutral-800 space-y-3">
                <div className="flex justify-between items-center border-b border-neutral-800 pb-2">
                  <h3 className="font-bold text-amber-400 text-sm">📍 {generatedItinerary.name} ({tripDuration})</h3>
                  <span className="text-[10px] bg-orange-500/20 text-orange-400 px-2 py-0.5 rounded font-bold">Ready</span>
                </div>
                
                <div className="space-y-3 text-neutral-300">
                  <div>
                    <p className="font-bold text-orange-400 mb-1">🏛️ Day 1: Heritage & Temples</p>
                    <p className="text-[11px]">• Morning Visit: <strong>{generatedItinerary.temples[0].name}</strong> ({generatedItinerary.temples[0].significance})</p>
                  </div>
                  <div>
                    <p className="font-bold text-amber-400 mb-1">🍲 Day 2: Food Exploration</p>
                    <p className="text-[11px]">• Must-Try: <strong>{generatedItinerary.foods[0].dish}</strong> at {generatedItinerary.foods[0].spot} ({generatedItinerary.foods[0].price})</p>
                  </div>
                  <div>
                    <p className="font-bold text-rose-400 mb-1">🛍️ Day 3: Shopping & Markets</p>
                    <p className="text-[11px]">• Explore: <strong>{generatedItinerary.markets[0].market}</strong> for {generatedItinerary.markets[0].specialty}</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* TAB 3: REELS (Engagement Support) */}
        {tab === 'reels' && (
          <div className="space-y-4 text-xs">
            <div className="bg-neutral-900 p-3 rounded-xl border border-neutral-800 space-y-2">
              <h2 className="font-bold text-orange-400">📹 Upload Travel & Food Reel</h2>
              <input 
                type="text" 
                placeholder="MP4 Video URL..." 
                value={newReelUrl} 
                onChange={(e) => setNewReelUrl(e.target.value)}
                className="w-full p-2.5 bg-neutral-950 rounded-lg border border-neutral-800 text-white"
              />
              <input 
                type="text" 
                placeholder="Caption & Location (e.g. Varanasi Ghats)..." 
                value={newReelCaption} 
                onChange={(e) => setNewReelCaption(e.target.value)}
                className="w-full p-2.5 bg-neutral-950 rounded-lg border border-neutral-800 text-white"
              />
              <button 
                onClick={() => {
                  if(!newReelUrl || !newReelCaption) return alert("Enter video link & caption!");
                  setReelsList([{ id: Date.now(), user: "ravi_bharggav", caption: newReelCaption, likes: 1, video: newReelUrl, location: "In Bharat", liked: false }, ...reelsList]);
                  setNewReelUrl(""); setNewReelCaption("");
                  alert("Reel Published Successfully!");
                }}
                className="w-full py-2.5 bg-gradient-to-r from-amber-500 to-rose-500 font-bold text-white rounded-lg">
                Post Travel Reel
              </button>
            </div>

            <div className="space-y-4">
              {reelsList.map(r => (
                <div key={r.id} className="relative h-[400px] rounded-2xl overflow-hidden bg-neutral-950 border border-neutral-800 shadow-xl flex items-center justify-center">
                  <video src={r.video} controls autoPlay muted loop playsInline className="w-full h-full object-cover"/>
                  <div className="absolute top-3 left-3 bg-black/60 px-3 py-1 rounded-full text-xs font-bold text-white backdrop-blur-md">@{r.user}</div>
                  <div className="absolute bottom-4 left-4 right-4 bg-gradient-to-t from-black/90 p-3 rounded-xl space-y-1">
                    <p className="text-xs font-semibold text-white">{r.caption}</p>
                    <p className="text-[10px] text-neutral-300">📍 {r.location}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 4: TRAVEL TOOLS (Ixigo Bookings & GPS Tracker) */}
        {tab === 'travel' && (
          <div className="space-y-4 text-xs">
            
            {/* Train Booking Support */}
            <div className="bg-neutral-900 p-4 rounded-2xl border border-neutral-800 space-y-3">
              <h2 className="font-bold text-sm text-blue-400">🚂 Ixigo Style Train Booking</h2>
              <input 
                type="text" 
                placeholder="From Station (e.g. NDLS)" 
                value={trainFrom} 
                onChange={(e) => setTrainFrom(e.target.value)}
                className="w-full p-2.5 bg-neutral-950 rounded-xl border border-neutral-800 text-white"
              />
              <input 
                type="text" 
                placeholder="To Station (e.g. BSB / JP)" 
                value={trainTo} 
                onChange={(e) => setTrainTo(e.target.value)}
                className="w-full p-2.5 bg-neutral-950 rounded-xl border border-neutral-800 text-white"
              />
              <button 
                onClick={() => {
                  if(!trainFrom || !trainTo) return alert("Please enter both stations!");
                  setTrainResults([
                    { name: "Vande Bharat Express (22436)", timing: "06:00 AM → 02:00 PM", price: "₹2,100" },
                    { name: "Shiv Ganga Express (12560)", timing: "06:25 PM → 06:40 AM", price: "₹1,250" }
                  ]);
                }}
                className="w-full py-2.5 bg-blue-600 font-bold text-white rounded-xl shadow-lg">
                Search Trains
              </button>

              {trainResults && (
                <div className="space-y-2 pt-2 border-t border-neutral-800">
                  {trainResults.map((t, idx) => (
                    <div key={idx} className="bg-neutral-950 p-2.5 rounded-xl border border-neutral-800 flex justify-between items-center">
                      <div>
                        <p className="font-bold text-white">{t.name}</p>
                        <p className="text-[10px] text-neutral-400">{t.timing}</p>
                      </div>
                      <button onClick={()=>alert(`Booking Confirmed for ${t.name}!`)} className="bg-orange-500 px-3 py-1.5 rounded-lg font-bold text-white">Book {t.price}</button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Live GPS Road Trip Tracker */}
            <div className="bg-neutral-900 p-4 rounded-2xl border border-neutral-800 space-y-3">
              <h2 className="font-bold text-sm text-emerald-400">🚗 Live Road Trip GPS Tracker</h2>
              <p className="text-[11px] text-neutral-400">Traveling by road? Track your live vehicle speed and distance covered in real-time.</p>
              
              <div className="grid grid-cols-2 gap-3 bg-neutral-950 p-3 rounded-xl border border-neutral-800 text-center">
                <div>
                  <p className="text-[10px] text-neutral-400">Current Speed</p>
                  <h3 className="text-xl font-black text-emerald-400 mt-1">{vehicleSpeed} <span className="text-xs">km/h</span></h3>
                </div>
                <div>
                  <p className="text-[10px] text-neutral-400">Distance Covered</p>
                  <h3 className="text-xl font-black text-white mt-1">{totalKm} <span className="text-xs">km</span></h3>
                </div>
              </div>

              <button 
                onClick={() => setGpsActive(!gpsActive)} 
                className={`w-full py-2.5 font-bold rounded-xl text-white ${gpsActive ? 'bg-rose-600' : 'bg-emerald-600'}`}>
                {gpsActive ? '🛑 Stop GPS Tracker' : '▶️ Start Live Trip Tracker'}
              </button>
            </div>

          </div>
        )}

        {/* TAB 5: PROFILE */}
        {tab === 'profile' && (
          <div className="space-y-4 text-xs">
            <div className="bg-neutral-900 p-5 rounded-2xl border border-neutral-800 text-center space-y-3">
              <div className="w-20 h-20 rounded-full p-[2px] bg-gradient-to-tr from-amber-400 via-orange-500 to-rose-500 mx-auto">
                <div className="w-full h-full bg-neutral-950 rounded-full flex items-center justify-center text-xl font-black text-white">RB</div>
              </div>
              <div>
                <h2 className="font-bold text-sm text-white">Ravi Bharggav</h2>
                <p className="text-[11px] text-orange-400">Quality Engineer & Founder</p>
              </div>
              <div className="flex justify-center gap-6 pt-2 text-xs border-t border-neutral-800">
                <div><strong className="block text-white">3</strong>Cities</div>
                <div><strong className="block text-white">1.4K</strong>Travelers</div>
                <div><strong className="block text-white">12</strong>Reels</div>
              </div>
            </div>
          </div>
        )}

      </div>

      {/* DETAILED CITY GUIDE MODAL */}
      {activeCityKey && (
        <div className="fixed inset-0 bg-black/85 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-neutral-900 border border-neutral-800 w-full max-w-sm rounded-2xl overflow-hidden shadow-2xl p-4 space-y-3 text-xs max-h-[85vh] overflow-y-auto">
            <div className="flex justify-between items-center border-b border-neutral-800 pb-2">
              <h3 className="font-bold text-sm text-white">{TOURISM_ECOSYSTEM[activeCityKey].name} Guide</h3>
              <button onClick={() => setActiveCityKey(null)} className="text-neutral-400 font-bold text-base">✕</button>
            </div>

            <div className="space-y-3 text-neutral-300">
              <div>
                <p className="font-bold text-orange-400 mb-1">🏛️ Heritage & Temples:</p>
                {TOURISM_ECOSYSTEM[activeCityKey].temples.map((t: any, idx: number) => (
                  <p key={idx} className="text-[11px] mb-1.5">• <strong>{t.name}:</strong> {t.significance}</p>
                ))}
              </div>

              <div>
                <p className="font-bold text-amber-400 mb-1">🍲 Famous Local Food & Cuisines:</p>
                {TOURISM_ECOSYSTEM[activeCityKey].foods.map((f: any, idx: number) => (
                  <p key={idx} className="text-[11px] mb-1.5">• {f.dish} at <strong>{f.spot}</strong> ({f.price})</p>
                ))}
              </div>

              <div>
                <p className="font-bold text-rose-400 mb-1">🛍️ Famous Shopping Markets:</p>
                {TOURISM_ECOSYSTEM[activeCityKey].markets.map((m: any, idx: number) => (
                  <p key={idx} className="text-[11px] mb-1.5">• <strong>{m.market}:</strong> {m.specialty} ({m.location})</p>
                ))}
              </div>
            </div>

            <button onClick={() => setActiveCityKey(null)} className="w-full py-2.5 bg-neutral-800 font-bold text-white rounded-xl shadow">Close Guide</button>
          </div>
        </div>
      )}

      {/* Bottom Navigation */}
      <div className="fixed bottom-0 left-0 right-0 bg-black/95 border-t border-neutral-800 py-3 px-6 flex justify-between items-center z-40 text-xl">
        <button onClick={() => setTab('home')} className={`${tab === 'home' ? 'text-white scale-110' : 'text-neutral-500'} transition-all`}>🏠</button>
        <button onClick={() => setTab('planner')} className={`${tab === 'planner' ? 'text-white scale-110' : 'text-neutral-500'} transition-all`}>🗺️</button>
        <button onClick={() => setTab('reels')} className={`${tab === 'reels' ? 'text-white scale-110' : 'text-neutral-500'} transition-all`}>🎬</button>
        <button onClick={() => setTab('travel')} className={`${tab === 'travel' ? 'text-white scale-110' : 'text-neutral-500'} transition-all`}>🚗</button>
        <button onClick={() => setTab('profile')} className={`${tab === 'profile' ? 'text-white scale-110' : 'text-neutral-500'} transition-all`}>👤</button>
      </div>

    </div>
  );
}
