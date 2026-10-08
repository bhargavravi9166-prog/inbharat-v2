import React, { useState } from 'react';

const DIRECTORY_DATA: Record<string, any> = {
  somnath: { Name: "Somnath Temple", City: "Veraval", State: "Gujarat", Type: "Jyotirlinga", weather: "28°C", budget: "₹2,000", distance: "5 km", history_geo_political: "First among the twelve jyotirlinga shrines of Shiva, located in Gujarat." },
  varanasi: { Name: "Kashi Vishwanath Temple", City: "Varanasi", State: "Uttar Pradesh", Type: "Jyotirlinga", weather: "30°C", budget: "₹1,500", distance: "2 km", history_geo_political: "One of the most famous Hindu temples dedicated to Lord Shiva on the banks of Ganga." }
};

export default function App() {
  const [tab, setTab] = useState<'home' | 'reels' | 'planner' | 'business' | 'profile'>('home');
  const [search, setSearch] = useState<string>("");
  const [spots] = useState(DIRECTORY_DATA);

  const [reelsList, setReelsList] = useState([
    { id: 1, title: "Varanasi Ganga Aarti", location: "Varanasi, UP", url: "https://images.unsplash.com/photo-1570168007204-dfb528c6958f?auto=format&fit=crop&w=1200&q=80" }
  ]);
  const [newTitle, setNewTitle] = useState("");
  const [newLoc, setNewLoc] = useState("");

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 pb-28 font-sans">
      
      <div className="bg-slate-900 border-b border-slate-800 p-4 flex justify-between items-center sticky top-0 z-30">
        <h1 className="font-black text-sm tracking-wider text-orange-400">IN BHARAT PRO</h1>
        <span className="text-[10px] bg-orange-500/20 text-orange-400 px-2 py-0.5 rounded-full font-bold">Fresh Edition</span>
      </div>

      <div className="max-w-md mx-auto p-4 space-y-4">
        
        {tab === 'home' && (
          <div className="space-y-4">
            <input 
              type="text" 
              placeholder="Search destinations, temples..." 
              value={search} 
              onChange={(e) => setSearch(e.target.value)}
              className="w-full p-3 bg-slate-900 rounded-xl border border-slate-800 text-xs text-white focus:outline-none focus:border-orange-500"
            />
            <div className="space-y-3">
              {Object.entries(spots).map(([k, s]: [string, any]) => (
                <div key={k} className="bg-slate-900 rounded-xl border border-slate-800 overflow-hidden shadow-lg p-3 space-y-2">
                  <h3 className="font-bold text-sm text-white">{s.Name}</h3>
                  <p className="text-[10px] text-slate-400">📍 {s.City}, {s.State}</p>
                  <p className="text-xs text-slate-300">{s.history_geo_political}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {tab === 'reels' && (
          <div className="space-y-4">
            <div className="bg-slate-900 p-4 rounded-xl border border-slate-800 space-y-2">
              <h2 className="font-bold text-xs text-orange-400">Upload New Reel</h2>
              <input 
                type="text" 
                placeholder="Reel Title" 
                value={newTitle} 
                onChange={(e) => setNewTitle(e.target.value)}
                className="w-full p-2.5 bg-slate-950 rounded-lg border border-slate-800 text-xs text-white"
              />
              <input 
                type="text" 
                placeholder="Location" 
                value={newLoc} 
                onChange={(e) => setNewLoc(e.target.value)}
                className="w-full p-2.5 bg-slate-950 rounded-lg border border-slate-800 text-xs text-white"
              />
              <button 
                onClick={() => {
                  if(!newTitle || !newLoc) return alert("Enter title & location!");
                  setReelsList([{ id: Date.now(), title: newTitle, location: newLoc, url: "https://images.unsplash.com/photo-1570168007204-dfb528c6958f?auto=format&fit=crop&w=1200&q=80" }, ...reelsList]);
                  setNewTitle(""); setNewLoc("");
                  alert("Reel Uploaded!");
                }}
                className="w-full py-2 bg-orange-500 text-white font-bold text-xs rounded-lg">
                Publish Reel
              </button>
            </div>

            <div className="space-y-4">
              {reelsList.map(r => (
                <div key={r.id} className="relative h-80 rounded-xl overflow-hidden bg-slate-900 border border-slate-800">
                  <img src={r.url} alt="" className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent"></div>
                  <div className="absolute bottom-3 left-3 right-3">
                    <h3 className="font-bold text-sm text-white">{r.title}</h3>
                    <p className="text-[10px] text-slate-300">📍 {r.location}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {tab === 'planner' && (
          <div className="bg-slate-900 p-4 rounded-xl border border-slate-800 space-y-3 text-xs">
            <h2 className="font-bold text-sm text-orange-400">AI Trip Planner</h2>
            <input type="text" placeholder="Enter Destination (e.g. Jaipur)" className="w-full p-2.5 bg-slate-950 rounded-lg border border-slate-800 text-white" />
            <button onClick={() => alert("Itinerary Generated!")} className="w-full py-2 bg-orange-500 text-white font-bold rounded-lg">Generate Plan</button>
          </div>
        )}

        {tab === 'business' && (
          <div className="bg-slate-900 p-4 rounded-xl border border-slate-800 text-center space-y-3">
            <h2 className="font-bold text-sm text-orange-400">Business Dashboard</h2>
            <div className="bg-slate-950 p-4 rounded-lg border border-slate-800">
              <p className="text-[10px] text-slate-400">Total Ecosystem Revenue</p>
              <h3 className="text-xl font-extrabold text-white mt-1">₹14,800</h3>
            </div>
          </div>
        )}

        {tab === 'profile' && (
          <div className="bg-slate-900 p-4 rounded-xl border border-slate-800 text-center space-y-2">
            <div className="w-14 h-14 bg-gradient-to-tr from-orange-500 to-blue-600 text-white rounded-full flex items-center justify-center text-lg font-black mx-auto">RB</div>
            <h2 className="font-bold text-sm text-white">Ravi Bharggav</h2>
            <p className="text-[10px] text-orange-400">Quality Engineer & Creator</p>
          </div>
        )}

      </div>

      <div className="fixed bottom-0 left-0 right-0 bg-slate-900 border-t border-slate-800 py-2.5 flex justify-around items-center z-40">
        <button onClick={() => setTab('home')} className={`text-xs ${tab === 'home' ? 'text-orange-400 font-bold' : 'text-slate-400'}`}>Home</button>
        <button onClick={() => setTab('reels')} className={`text-xs ${tab === 'reels' ? 'text-orange-400 font-bold' : 'text-slate-400'}`}>Reels</button>
        <button onClick={() => setTab('planner')} className={`text-xs ${tab === 'planner' ? 'text-orange-400 font-bold' : 'text-slate-400'}`}>Planner</button>
        <button onClick={() => setTab('business')} className={`text-xs ${tab === 'business' ? 'text-orange-400 font-bold' : 'text-slate-400'}`}>Business</button>
        <button onClick={() => setTab('profile')} className={`text-xs ${tab === 'profile' ? 'text-orange-400 font-bold' : 'text-slate-400'}`}>Profile</button>
      </div>

    </div>
  );
}
