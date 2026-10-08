import React, { useState } from 'react';

const SAMPLE_DIRECTORY = {
  somnath: { Name: "Somnath Temple", City: "Veraval", State: "Gujarat", Type: "Jyotirlinga", weather: "28°C", budget: "₹2,000", distance: "5 km", history_geo_political: "First among the twelve jyotirlinga shrines of Shiva." },
  varanasi: { Name: "Kashi Vishwanath Temple", City: "Varanasi", State: "Uttar Pradesh", Type: "Jyotirlinga", weather: "30°C", budget: "₹1,500", distance: "2 km", history_geo_political: "One of the most famous Hindu temples dedicated to Lord Shiva." }
};

export default function App() {
  const [activeTab, setActiveTab] = useState<'home' | 'reels' | 'add' | 'planner' | 'business' | 'profile'>('home');
  const [search, setSearch] = useState<string>("");
  const [spots] = useState(SAMPLE_DIRECTORY);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 pb-28 font-sans">
      <div className="bg-slate-900 border-b border-slate-800 p-4 text-center">
        <h1 className="font-extrabold text-sm text-orange-400">IN BHARAT PRO</h1>
      </div>

      <div className="p-4">
        {activeTab === 'home' && (
          <div className="space-y-4">
            <input 
              type="text" 
              placeholder="Search destinations..." 
              value={search} 
              onChange={(e) => setSearch(e.target.value)}
              className="w-full p-3 bg-slate-900 rounded-xl border border-slate-800 text-xs text-white"
            />
            <div className="space-y-3">
              {Object.entries(spots).map(([k, s]: [string, any]) => (
                <div key={k} className="bg-slate-900 p-3 rounded-xl border border-slate-800">
                  <h3 className="font-bold text-sm text-white">{s.Name}</h3>
                  <p className="text-[10px] text-slate-400">{s.City}, {s.State}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'reels' && <div className="text-center py-20 text-slate-400 text-xs">🎬 Reels Feed Active</div>}
        {activeTab === 'add' && <div className="text-center py-20 text-slate-400 text-xs">➕ Add Spot & Reels Form</div>}
        {activeTab === 'planner' && <div className="text-center py-20 text-slate-400 text-xs">🗺️ AI Trip Planner Active</div>}
        {activeTab === 'business' && <div className="text-center py-20 text-slate-400 text-xs">💼 Business Dashboard (₹14,800)</div>}
        {activeTab === 'profile' && <div className="text-center py-20 text-slate-400 text-xs">👤 Ravi Bharggav Profile</div>}
      </div>

      {/* 6-Tab Bottom Bar */}
      <div className="fixed bottom-0 left-0 right-0 bg-slate-900 border-t border-slate-800 py-3 flex justify-around items-center z-40">
        <button onClick={() => setActiveTab('home')} className={`text-xs ${activeTab === 'home' ? 'text-orange-400 font-bold' : 'text-slate-400'}`}>🏠 Home</button>
        <button onClick={() => setActiveTab('reels')} className={`text-xs ${activeTab === 'reels' ? 'text-orange-400 font-bold' : 'text-slate-400'}`}>🎬 Reels</button>
        <button onClick={() => setActiveTab('add')} className={`text-xs ${activeTab === 'add' ? 'text-orange-400 font-bold' : 'text-slate-400'}`}>➕ Add</button>
        <button onClick={() => setActiveTab('planner')} className={`text-xs ${activeTab === 'planner' ? 'text-orange-400 font-bold' : 'text-slate-400'}`}>🗺️ Planner</button>
        <button onClick={() => setActiveTab('business')} className={`text-xs ${activeTab === 'business' ? 'text-orange-400 font-bold' : 'text-slate-400'}`}>💼 Business</button>
        <button onClick={() => setActiveTab('profile')} className={`text-xs ${activeTab === 'profile' ? 'text-orange-400 font-bold' : 'text-slate-400'}`}>👤 Profile</button>
      </div>
    </div>
  );
}
