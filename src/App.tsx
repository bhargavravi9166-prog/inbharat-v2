import React, { useState, useEffect } from 'react';

const MASTER_DIRECTORY: Record<string, any> = {
  somnath: { Name: "Somnath Temple", City: "Veraval", State: "Gujarat", Type: "Jyotirlinga", weather: "28°C", budget: "₹2,000", image_url: "https://images.unsplash.com/photo-1621996346565-e3d5d6281298?auto=format&fit=crop&w=1200&q=80", history: "First among the twelve jyotirlinga shrines of Shiva." },
  varanasi: { Name: "Kashi Vishwanath", City: "Varanasi", State: "Uttar Pradesh", Type: "Jyotirlinga", weather: "30°C", budget: "₹1,500", image_url: "https://images.unsplash.com/photo-1561640494-eb9b26e5e22e?auto=format&fit=crop&w=1200&q=80", history: "Famous temple dedicated to Lord Shiva on the banks of Ganga." }
};

export default function App() {
  const [tab, setTab] = useState<'home' | 'reels' | 'planner' | 'travel' | 'profile'>('home');
  const [search, setSearch] = useState("");
  
  // Real Video Reels State (Instagram Style)
  const [reels, setReels] = useState([
    { id: 1, user: "incredible_india", caption: "Varanasi Ganga Aarti Live View ✨", likes: 2450, video_url: "https://assets.mixkit.co/videos/preview/mixkit-aerial-view-of-city-traffic-at-night-41555-large.mp4", location: "Varanasi, UP", liked: false },
    { id: 2, user: "rajasthan_tours", caption: "Royal Heritage Highway Ride 🏰", likes: 1120, video_url: "https://assets.mixkit.co/videos/preview/mixkit-traveller-walking-on-a-mountain-ridge-41627-large.mp4", location: "Jaipur, RJ", liked: false }
  ]);
  const [videoUrlInput, setVideoUrlInput] = useState("");
  const [captionInput, setCaptionInput] = useState("");

  // Travel Booking State (Ixigo Style)
  const [trainSource, setTrainSource] = useState("");
  const [trainDest, setTrainDest] = useState("");
  const [trainResults, setTrainResults] = useState<any[] | null>(null);
  const [hotelDestination, setHotelDestination] = useState("");
  const [hotelResults, setHotelResults] = useState<any[] | null>(null);

  // Live GPS Tracking State (Road Trip Mode)
  const [isTracking, setIsTracking] = useState(false);
  const [currentSpeed, setCurrentSpeed] = useState(0);
  const [distanceCovered, setDistanceCovered] = useState(0);

  // Simulate Live GPS Movement when tracking is active
  useEffect(() => {
    let interval: any;
    if (isTracking) {
      interval = setInterval(() => {
        setCurrentSpeed(Math.floor(Math.random() * (75 - 45 + 1)) + 45); // 45-75 km/h
        setDistanceCovered(prev => Number((prev + 0.5).toFixed(1)));
      }, 2000);
    } else {
      setCurrentSpeed(0);
    }
    return () => clearInterval(interval);
  }, [isTracking]);

  return (
    <div className="min-h-screen bg-black text-white pb-24 font-sans select-none">
      
      {/* Top Header */}
      <div className="bg-black/90 backdrop-blur-md border-b border-neutral-800 px-4 py-3 flex justify-between items-center sticky top-0 z-40">
        <h1 className="font-extrabold text-base tracking-wider bg-gradient-to-r from-amber-400 via-orange-500 to-rose-500 bg-clip-text text-transparent">
          IN BHARAT PRO 🚀
        </h1>
        <div className="flex items-center gap-3 text-lg">
          <span className="cursor-pointer">🔔</span>
          <span className="cursor-pointer">💬</span>
        </div>
      </div>

      <div className="max-w-md mx-auto">
        
        {/* TAB 1: HOME (Directory) */}
        {tab === 'home' && (
          <div className="space-y-4 p-3">
            <input 
              type="text" 
              placeholder="Search places, temples..." 
              value={search} 
              onChange={(e) => setSearch(e.target.value)}
              className="w-full px-4 py-2.5 bg-neutral-900 rounded-xl border border-neutral-800 text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-orange-500"
            />
            <div className="space-y-4">
              {Object.entries(MASTER_DIRECTORY).map(([k, s]: [string, any]) => (
                <div key={k} className="bg-neutral-900 rounded-2xl border border-neutral-800 overflow-hidden shadow-xl">
                  <div className="relative h-56 bg-neutral-950">
                    <img src={s.image_url} alt="" className="w-full h-full object-cover" />
                    <span className="absolute top-3 right-3 text-[10px] bg-black/70 text-orange-400 px-2.5 py-1 rounded-full font-bold">{s.Type}</span>
                  </div>
                  <div className="p-3 space-y-2">
                    <h3 className="font-bold text-sm text-white">{s.Name}</h3>
                    <p className="text-[10px] text-neutral-400">📍 {s.City}, {s.State} | Weather: {s.weather}</p>
                    <p className="text-xs text-neutral-300">{s.history}</p>
                    <button onClick={() => setTab('travel')} className="w-full mt-2 py-2 bg-orange-500 text-white font-bold rounded-xl text-xs">Book Train & Hotels Here</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 2: REELS (Actual Video Feed + Instagram Upload) */}
        {tab === 'reels' && (
          <div className="space-y-4 p-3">
            {/* Upload Actual Video Reel Box */}
            <div className="bg-neutral-900 p-3 rounded-xl border border-neutral-800 space-y-2">
              <h2 className="font-bold text-xs text-orange-400">📹 Upload Video Reel (MP4 Link)</h2>
              <input 
                type="text" 
                placeholder="Paste MP4 Video URL..." 
                value={videoUrlInput} 
                onChange={(e) => setVideoUrlInput(e.target.value)}
                className="w-full p-2 bg-neutral-950 rounded-lg border border-neutral-800 text-xs text-white"
              />
              <input 
                type="text" 
                placeholder="Caption & Location..." 
                value={captionInput} 
                onChange={(e) => setCaptionInput(e.target.value)}
                className="w-full p-2 bg-neutral-950 rounded-lg border border-neutral-800 text-xs text-white"
              />
              <button 
                onClick={() => {
                  if(!videoUrlInput || !captionInput) return alert("Enter video link & caption!");
                  setReels([{ id: Date.now(), user: "ravi_bharggav", caption: captionInput, likes: 1, video_url: videoUrlInput, location: "India", liked: false }, ...reels]);
                  setVideoUrlInput(""); setCaptionInput("");
                  alert("Video Reel Published!");
                }}
                className="w-full py-2 bg-gradient-to-r from-amber-500 to-rose-500 text-white font-bold text-xs rounded-lg">
                Post Video Reel
              </button>
            </div>

            {/* Video Reels Feed */}
            <div className="space-y-6">
              {reels.map(r => (
                <div key={r.id} className="relative h-[450px] rounded-2xl overflow-hidden bg-neutral-950 border border-neutral-800 shadow-2xl flex items-center justify-center">
                  <video 
                    src={r.video_url} 
                    controls 
                    autoPlay 
                    muted 
                    loop 
                    playsInline
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-3 left-3 flex items-center gap-2 bg-black/60 px-3 py-1 rounded-full backdrop-blur-md">
                    <span className="text-xs font-bold text-white">@{r.user}</span>
                  </div>
                  <div className="absolute bottom-4 left-4 right-4 space-y-1 bg-gradient-to-t from-black/90 p-2 rounded-xl">
                    <p className="text-xs font-semibold text-white">{r.caption}</p>
                    <p className="text-[10px] text-neutral-300">📍 {r.location}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 3: PLANNER & TRAVEL (Ixigo Style Train/Hotel & Live GPS Tracker) */}
        {tab === 'travel' && (
          <div className="p-3 space-y-4 text-xs">
            
            {/* Train & Hotel Booking Section */}
            <div className="bg-neutral-900 p-4 rounded-2xl border border-neutral-800 space-y-3">
              <h2 className="font-bold text-sm text-orange-400">🚂 Ixigo Style Train & Hotel Booking</h2>
              
              <div className="space-y-2">
                <input type="text" placeholder="From Station (e.g. NDLS)" value={trainSource} onChange={e=>setTrainSource(e.target.value)} className="w-full p-2.5 bg-neutral-950 rounded-xl border border-neutral-800 text-white"/>
                <input type="text" placeholder="To Station (e.g. BSB)" value={trainDest} onChange={e=>setTrainDest(e.target.value)} className="w-full p-2.5 bg-neutral-950 rounded-xl border border-neutral-800 text-white"/>
                <button onClick={() => {
                  if(!trainSource || !trainDest) return alert("Enter stations!");
                  setTrainResults([
                    { name: "Shiv Ganga Express (12560)", time: "18:25 → 06:40", cls: "3A, 2A, SL", price: "₹1,250" },
                    { name: "Vande Bharat Express (22436)", time: "06:00 → 14:00", cls: "CC, EC", price: "₹2,100" }
                  ]);
                }} className="w-full py-2 bg-blue-600 text-white font-bold rounded-xl">Search Trains</button>
              </div>

              {trainResults && (
                <div className="space-y-2 pt-2 border-t border-neutral-800">
                  <p className="font-bold text-amber-400">Available Trains:</p>
                  {trainResults.map((t, idx) => (
                    <div key={idx} className="bg-neutral-950 p-2.5 rounded-xl border border-neutral-800 flex justify-between items-center">
                      <div>
                        <p className="font-bold text-white">{t.name}</p>
                        <p className="text-[10px] text-neutral-400">{t.time} | {t.cls}</p>
                      </div>
                      <button onClick={()=>alert(`Booking Confirmed for ${t.name}!`)} className="bg-orange-500 px-3 py-1.5 rounded-lg font-bold text-white">Book {t.price}</button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Live GPS Road Trip Tracker (Self-Driving Mode) */}
            <div className="bg-neutral-900 p-4 rounded-2xl border border-neutral-800 space-y-3">
              <h2 className="font-bold text-sm text-emerald-400">🚗 Live Road Trip GPS Tracker</h2>
              <p className="text-[11px] text-neutral-400">Self-driving? Track your live vehicle speed, route coordinate simulation, and distance covered in real-time.</p>
              
              <div className="grid grid-cols-2 gap-3 bg-neutral-950 p-3 rounded-xl border border-neutral-800 text-center">
                <div>
                  <p className="text-[10px] text-neutral-400">Current Speed</p>
                  <h3 className="text-xl font-black text-emerald-400 mt-1">{currentSpeed} <span className="text-xs">km/h</span></h3>
                </div>
                <div>
                  <p className="text-[10px] text-neutral-400">Distance Covered</p>
                  <h3 className="text-xl font-black text-white mt-1">{distanceCovered} <span className="text-xs">km</span></h3>
                </div>
              </div>

              <button 
                onClick={() => setIsTracking(!isTracking)} 
                className={`w-full py-2.5 font-bold rounded-xl text-white ${isTracking ? 'bg-rose-600' : 'bg-emerald-600'}`}>
                {isTracking ? '🛑 Stop Live Trip Tracking' : '▶️ Start Live Trip Tracking'}
              </button>
            </div>

          </div>
        )}

        {/* TAB 4: PROFILE */}
        {tab === 'profile' && (
          <div className="p-3 space-y-4">
            <div className="bg-neutral-900 p-5 rounded-2xl border border-neutral-800 text-center space-y-3">
              <div className="w-20 h-20 rounded-full p-[2px] bg-gradient-to-tr from-amber-400 to-rose-500 mx-auto">
                <div className="w-full h-full bg-neutral-950 rounded-full flex items-center justify-center text-xl font-black text-white">RB</div>
              </div>
              <div>
                <h2 className="font-bold text-sm text-white">Ravi Bharggav</h2>
                <p className="text-[11px] text-orange-400">Pro Explorer & Developer</p>
              </div>
            </div>
          </div>
        )}

      </div>

      {/* Bottom Navigation */}
      <div className="fixed bottom-0 left-0 right-0 bg-black/95 border-t border-neutral-800 py-3 px-6 flex justify-between items-center z-40 text-xl">
        <button onClick={() => setTab('home')} className={`${tab === 'home' ? 'text-white scale-110' : 'text-neutral-500'} transition-all`}>🏠</button>
        <button onClick={() => setTab('reels')} className={`${tab === 'reels' ? 'text-white scale-110' : 'text-neutral-500'} transition-all`}>🎬</button>
        <button onClick={() => setTab('travel')} className={`${tab === 'travel' ? 'text-white scale-110' : 'text-neutral-500'} transition-all`}>🚂</button>
        <button onClick={() => setTab('profile')} className={`${tab === 'profile' ? 'text-white scale-110' : 'text-neutral-500'} transition-all`}>👤</button>
      </div>

    </div>
  );
}
