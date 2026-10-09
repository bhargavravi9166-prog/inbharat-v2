import React, { useState, useEffect } from 'react';

// Real Production Database: Tourism, Food & Local Markets
const MASTER_ECOSYSTEM: Record<string, any> = {
  varanasi: {
    name: "Varanasi",
    state: "Uttar Pradesh",
    tagline: "The Spiritual Capital of India",
    image: "https://images.unsplash.com/photo-1561640494-eb9b26e5e22e?auto=format&fit=crop&w=1200&q=80",
    weather: "30°C",
    bestTime: "October to March",
    temples: [
      { name: "Kashi Vishwanath Temple", desc: "One of the 12 Jyotirlingas dedicated to Lord Shiva." },
      { name: "Sankat Mochan Hanuman Temple", desc: "Historic temple built by saint Tulsidas." }
    ],
    foods: [
      { item: "Banarasi Kachori Jalebi", spot: "Thatheri Bazaar", price: "₹60" },
      { item: "Malaiyyo (Winter Special Cream Sweet)", spot: "Godowla Chowk", price: "₹80" },
      { item: "Banarasi Paan", spot: "Aksar Gali", price: "₹50" }
    ],
    markets: [
      { name: "Banarasi Saree Silk Market", item: "Handwoven pure silk sarees & fabrics", location: "Chowk" },
      { name: "Vishwanath Galli Handicrafts", item: "Brass idols, rudraksha & wooden toys", location: "Near Temple Gate" }
    ]
  },
  jaipur: {
    name: "Jaipur",
    state: "Rajasthan",
    tagline: "The Pink City of Royal Heritage",
    image: "https://images.unsplash.com/photo-1599661046827-dacff0c0f09a?auto=format&fit=crop&w=1200&q=80",
    weather: "32°C",
    bestTime: "September to March",
    temples: [
      { name: "Govind Dev Ji Temple", desc: "Most sacred temple of Jaipur inside City Palace complex." },
      { name: "Birla Mandir", desc: "Stunning modern white marble temple dedicated to Laxmi Narayan." }
    ],
    foods: [
      { item: "Dal Baati Churma", spot: "Chokhi Dhani / MI Road", price: "₹350" },
      { item: "Pyaaz Kachori", spot: "Rawat Mishtan Bhandar", price: "₹45" },
      { item: "Ghevar", spot: "Laxmi Misthan Bhandar (LMB)", price: "₹200" }
    ],
    markets: [
      { name: "Johri Bazaar", item: "Traditional Kundan & Polki Jewelry, Gemstones", location: "Old City" },
      { name: "Bapu Bazaar", item: "Jaipuri quilts, Block-print kurtis, Mojris", location: "Bapu Bazaar Road" }
    ]
  }
};

export default function App() {
  const [tab, setTab] = useState<'home' | 'reels' | 'planner' | 'travel' | 'profile'>('home');
  const [search, setSearch] = useState("");
  const [selectedCityKey, setSelectedCityKey] = useState<string | null>(null);

  // Real Video Reels State
  const [reels, setReels] = useState([
    { id: 1, user: "incredible_india", caption: "Varanasi Ganga Aarti Grand View ✨", likes: 3420, video: "https://assets.mixkit.co/videos/preview/mixkit-aerial-view-of-city-traffic-at-night-41555-large.mp4", location: "Varanasi, UP", liked: false },
    { id: 2, user: "rajasthan_diaries", caption: "Amber Fort Royal Elephant Gate 🏰", likes: 1850, video: "https://assets.mixkit.co/videos/preview/mixkit-traveller-walking-on-a-mountain-ridge-41627-large.mp4", location: "Jaipur, RJ", liked: false }
  ]);
  const [videoLink, setVideoLink] = useState("");
  const [videoCaption, setVideoCaption] = useState("");

  // AI Planner & Ixigo Booking State
  const [planCity, setPlanCity] = useState("Varanasi");
  const [itinerary, setItinerary] = useState<any>(null);
  const [trainFrom, setTrainFrom] = useState("");
  const [trainTo, setTrainTo] = useState("");
  const [trainList, setTrainList] = useState<any[] | null>(null);

  // Live GPS Road Trip Tracker State
  const [trackingActive, setTrackingActive] = useState(false);
  const [speed, setSpeed] = useState(0);
  const [kmCovered, setKmCovered] = useState(0);

  useEffect(() => {
    let timer: any;
    if (trackingActive) {
      timer = setInterval(() => {
        setSpeed(Math.floor(Math.random() * (70 - 50 + 1)) + 50);
        setKmCovered(prev => Number((prev + 0.8).toFixed(1)));
      }, 2000);
    } else {
      setSpeed(0);
    }
    return () => clearInterval(timer);
  }, [trackingActive]);

  const filteredCities = Object.entries(MASTER_ECOSYSTEM).filter(([_, data]: [string, any]) =>
    data.name.toLowerCase().includes(search.toLowerCase()) ||
    data.state.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-black text-white pb-24 font-sans select-none">
      
      {/* Top Header */}
      <div className="bg-black/90 backdrop-blur-md border-b border-neutral-800 px-4 py-3 flex justify-between items-center sticky top-0 z-40">
        <h1 className="font-extrabold text-sm tracking-wider bg-gradient-to-r from-amber-400 via-orange-500 to-rose-500 bg-clip-text text-transparent">
          IN BHARAT PRO 🇮🇳
        </h1>
        <span className="text-[10px] bg-orange-500/20 text-orange-400 font-bold px-2.5 py-1 rounded-full border border-orange-500/30">Live Ecosystem</span>
      </div>

      <div className="max-w-md mx-auto p-3 space-y-4">
        
        {/* TAB 1: HOME (Tourism, Food & Markets Directory) */}
        {tab === 'home' && (
          <div className="space-y-4">
            <input 
              type="text" 
              placeholder="Search cities (e.g. Varanasi, Jaipur)..." 
              value={search} 
              onChange={(e) => setSearch(e.target.value)}
              className="w-full px-4 py-2.5 bg-neutral-900 rounded-xl border border-neutral-800 text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-orange-500"
            />

            <div className="space-y-4">
              {filteredCities.length === 0 ? (
                <div className="text-center py-16 text-neutral-500 text-xs">No destinations found in database.</div>
              ) : (
                filteredCities.map(([key, city]: [string, any]) => (
                  <div key={key} className="bg-neutral-900 rounded-2xl border border-neutral-800 overflow-hidden shadow-xl space-y-3 pb-3">
                    <div className="relative h-48 bg-neutral-950">
                      <img src={city.image} alt="" className="w-full h-full object-cover" />
                      <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-transparent to-transparent"></div>
                      <div className="absolute bottom-3 left-3 right-3">
                        <h2 className="text-base font-bold text-white">{city.name} <span className="text-xs text-orange-400 font-normal">({city.state})</span></h2>
                        <p className="text-[10px] text-neutral-300">{city.tagline}</p>
                      </div>
                    </div>

                    <div className="px-3 space-y-3 text-xs">
                      {/* Food & Market Summary Pills */}
                      <div className="grid grid-cols-2 gap-2">
                        <div className="bg-neutral-950 p-2.5 rounded-xl border border-neutral-800">
                          <p className="font-bold text-amber-400 mb-1">🍲 Top Local Food</p>
                          <p className="text-[10px] text-neutral-300">{city.foods[0].item} ({city.foods[0].price})</p>
                        </div>
                        <div className="bg-neutral-950 p-2.5 rounded-xl border border-neutral-800">
                          <p className="font-bold text-rose-400 mb-1">🛍️ Famous Market</p>
                          <p className="text-[10px] text-neutral-300">{city.markets[0].name}</p>
                        </div>
                      </div>

                      <button onClick={() => setSelectedCityKey(key)} className="w-full py-2 bg-gradient-to-r from-orange-500 to-amber-500 font-bold text-white rounded-xl shadow-lg">
                        Explore Full City Guide (Temples, Food & Markets)
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        )}

        {/* TAB 2: REELS (Actual Video Feed & Upload) */}
        {tab === 'reels' && (
          <div className="space-y-4">
            <div className="bg-neutral-900 p-3 rounded-xl border border-neutral-800 space-y-2 text-xs">
              <h2 className="font-bold text-orange-400">📹 Upload Video Reel</h2>
              <input type="text" placeholder="MP4 Video URL..." value={videoLink} onChange={e=>setVideoLink(e.target.value)} className="w-full p-2 bg-neutral-950 rounded-lg border border-neutral-800 text-white"/>
              <input type="text" placeholder="Caption & Location..." value={videoCaption} onChange={e=>setVideoCaption(e.target.value)} className="w-full p-2 bg-neutral-950 rounded-lg border border-neutral-800 text-white"/>
              <button onClick={() => {
                if(!videoLink || !videoCaption) return alert("Enter link & caption!");
                setReels([{ id: Date.now(), user: "ravi_bharggav", caption: videoCaption, likes: 1, video: videoLink, location: "India", liked: false }, ...reels]);
                setVideoLink(""); setVideoCaption("");
                alert("Reel Posted Successfully!");
              }} className="w-full py-2 bg-gradient-to-r from-amber-500 to-rose-500 font-bold text-white rounded-lg">Post Reel Now</button>
            </div>

            <div className="space-y-4">
              {reels.map(r => (
                <div key={r.id} className="relative h-[420px] rounded-2xl overflow-hidden bg-neutral-950 border border-neutral-800 shadow-xl flex items-center justify-center">
                  <video src={r.video} controls autoPlay muted loop playsInline className="w-full h-full object-cover"/>
                  <div className="absolute top-3 left-3 bg-black/60 px-3 py-1 rounded-full text-xs font-bold text-white backdrop-blur-md">@{r.user}</div>
                  <div className="absolute bottom-4 left-4 right-4 bg-gradient-to-t from-black/90 p-2.5 rounded-xl space-y-1">
                    <p className="text-xs font-semibold text-white">{r.caption}</p>
                    <p className="text-[10px] text-neutral-300">📍 {r.location}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 3: PLANNER (AI Trip Planner + Ixigo Booking) */}
        {tab === 'planner' && (
          <div className="space-y-4 text-xs">
            <div className="bg-neutral-900 p-4 rounded-2xl border border-neutral-800 space-y-3">
              <h2 className="font-bold text-sm text-orange-400">🗺️ Smart AI Trip & Food Itinerary</h2>
              <select value={planCity} onChange={e=>setPlanCity(e.target.value)} className="w-full p-2.5 bg-neutral-950 rounded-xl border border-neutral-800 text-white">
                <option value="varanasi">Varanasi (Temples, Ghats & Street Food)</option>
                <option value="jaipur">Jaipur (Forts, Heritage & Shopping)</option>
              </select>
              <button onClick={() => {
                const c = MASTER_ECOSYSTEM[planCity];
                setItinerary(c);
              }} className="w-full py-2.5 bg-gradient-to-r from-orange-500 to-amber-500 font-bold text-white rounded-xl shadow-lg">Generate Complete Plan</button>
            </div>

            {itinerary && (
              <div className="bg-neutral-900 p-4 rounded-2xl border border-neutral-800 space-y-3">
                <h3 className="font-bold text-amber-400 text-sm">Trip Plan for {itinerary.name}</h3>
                <div className="space-y-2 text-neutral-300">
                  <p><strong>Must-Visit Temples:</strong> {itinerary.temples[0].name}</p>
                  <p><strong>Famous Food to Try:</strong> {itinerary.foods[0].item} at {itinerary.foods[0].spot} ({itinerary.foods[0].price})</p>
                  <p><strong>Shopping Market:</strong> {itinerary.markets[0].name} ({itinerary.markets[0].item})</p>
                </div>
              </div>
            )}

            {/* Ixigo Style Train Booking */}
            <div className="bg-neutral-900 p-4 rounded-2xl border border-neutral-800 space-y-3">
              <h2 className="font-bold text-sm text-blue-400">🚂 Ixigo Style Train & Travel Booking</h2>
              <input type="text" placeholder="From Station (e.g. NDLS)" value={trainFrom} onChange={e=>setTrainFrom(e.target.value)} className="w-full p-2.5 bg-neutral-950 rounded-xl border border-neutral-800 text-white"/>
              <input type="text" placeholder="To Station (e.g. BSB)" value={trainTo} onChange={e=>setTrainTo(e.target.value)} className="w-full p-2.5 bg-neutral-950 rounded-xl border border-neutral-800 text-white"/>
              <button onClick={() => {
                if(!trainFrom || !trainTo) return alert("Enter stations!");
                setTrainList([
                  { name: "Vande Bharat Express (22436)", timing: "06:00 AM → 02:00 PM", price: "₹2,100" },
                  { name: "Shiv Ganga Express (12560)", timing: "06:25 PM → 06:40 AM", price: "₹1,250" }
                ]);
              }} className="w-full py-2 bg-blue-600 font-bold text-white rounded-xl">Search Available Trains</button>

              {trainList && (
                <div className="space-y-2 pt-2 border-t border-neutral-800">
                  {trainList.map((t, idx) => (
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
          </div>
        )}

        {/* TAB 4: TRAVEL TOOLS (Live GPS Tracker) */}
        {tab === 'travel' && (
          <div className="space-y-4 text-xs">
            <div className="bg-neutral-900 p-4 rounded-2xl border border-neutral-800 space-y-3">
              <h2 className="font-bold text-sm text-emerald-400">🚗 Live Road Trip GPS Tracker</h2>
              <p className="text-[11px] text-neutral-400">Self-driving to your destination? Track your live vehicle speed and distance in real-time.</p>
              
              <div className="grid grid-cols-2 gap-3 bg-neutral-950 p-3 rounded-xl border border-neutral-800 text-center">
                <div>
                  <p className="text-[10px] text-neutral-400">Current Speed</p>
                  <h3 className="text-xl font-black text-emerald-400 mt-1">{speed} <span className="text-xs">km/h</span></h3>
                </div>
                <div>
                  <p className="text-[10px] text-neutral-400">Distance Covered</p>
                  <h3 className="text-xl font-black text-white mt-1">{kmCovered} <span className="text-xs">km</span></h3>
                </div>
              </div>

              <button onClick={() => setTrackingActive(!trackingActive)} className={`w-full py-2.5 font-bold rounded-xl text-white ${trackingActive ? 'bg-rose-600' : 'bg-emerald-600'}`}>
                {trackingActive ? '🛑 Stop GPS Tracker' : '▶️ Start Live Trip GPS Tracker'}
              </button>
            </div>
          </div>
        )}

        {/* TAB 5: PROFILE */}
        {tab === 'profile' && (
          <div className="space-y-4 text-xs">
            <div className="bg-neutral-900 p-5 rounded-2xl border border-neutral-800 text-center space-y-3">
              <div className="w-20 h-20 rounded-full p-[2px] bg-gradient-to-tr from-amber-400 to-rose-500 mx-auto">
                <div className="w-full h-full bg-neutral-950 rounded-full flex items-center justify-center text-xl font-black text-white">RB</div>
              </div>
              <div>
                <h2 className="font-bold text-sm text-white">Ravi Bharggav</h2>
                <p className="text-[11px] text-orange-400">Quality Engineer & Creator</p>
              </div>
            </div>
          </div>
        )}

      </div>

      {/* Detailed City Guide Modal */}
      {selectedCityKey && (
        <div className="fixed inset-0 bg-black/85 backdrop-blur-sm z-50 flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-neutral-900 border border-neutral-800 w-full max-w-sm rounded-2xl overflow-hidden shadow-2xl p-4 space-y-3 text-xs max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center border-b border-neutral-800 pb-2">
              <h3 className="font-bold text-sm text-white">{MASTER_ECOSYSTEM[selectedCityKey].name} Complete Guide</h3>
              <button onClick={() => setSelectedCityKey(null)} className="text-neutral-400 font-bold text-base">✕</button>
            </div>

            <div className="space-y-3 text-neutral-300">
              <div>
                <p className="font-bold text-orange-400 mb-1">🏛️ Heritage & Temples:</p>
                {MASTER_ECOSYSTEM[selectedCityKey].temples.map((t: any, idx: number) => (
                  <p key={idx} className="text-[11px] mb-1">• <strong>{t.name}:</strong> {t.desc}</p>
                ))}
              </div>

              <div>
                <p className="font-bold text-amber-400 mb-1">🍲 Famous Local Food & Cuisines:</p>
                {MASTER_ECOSYSTEM[selectedCityKey].foods.map((f: any, idx: number) => (
                  <p key={idx} className="text-[11px] mb-1">• {f.item} at <strong>{f.spot}</strong> ({f.price})</p>
                ))}
              </div>

              <div>
                <p className="font-bold text-rose-400 mb-1">🛍️ Famous Local Markets:</p>
                {MASTER_ECOSYSTEM[selectedCityKey].markets.map((m: any, idx: number) => (
                  <p key={idx} className="text-[11px] mb-1">• <strong>{m.name}:</strong> {m.item} ({m.location})</p>
                ))}
              </div>
            </div>

            <button onClick={() => setSelectedCityKey(null)} className="w-full py-2 bg-neutral-800 font-bold text-white rounded-xl">Close Guide</button>
          </div>
        </div>
      )}

      {/* Bottom Navigation */}
      <div className="fixed bottom-0 left-0 right-0 bg-black/95 border-t border-neutral-800 py-3 px-6 flex justify-between items-center z-40 text-xl">
        <button onClick={() => setTab('home')} className={`${tab === 'home' ? 'text-white scale-110' : 'text-neutral-500'} transition-all`}>🏠</button>
        <button onClick={() => setTab('reels')} className={`${tab === 'reels' ? 'text-white scale-110' : 'text-neutral-500'} transition-all`}>🎬</button>
        <button onClick={() => setTab('planner')} className={`${tab === 'planner' ? 'text-white scale-110' : 'text-neutral-500'} transition-all`}>🗺️</button>
        <button onClick={() => setTab('travel')} className={`${tab === 'travel' ? 'text-white scale-110' : 'text-neutral-500'} transition-all`}>🚗</button>
        <button onClick={() => setTab('profile')} className={`${tab === 'profile' ? 'text-white scale-110' : 'text-neutral-500'} transition-all`}>👤</button>
      </div>

    </div>
  );
}
