import React, { useState } from 'react';
import { MASTER_INDIA_TOURISM_DIRECTORY } from './Data';

export default function App() {
  const [tab, setTab] = useState<'home' | 'planner' | 'business'>('home');
  const [shrineKey, setShrineKey] = useState<string | null>(null);
  const [search, setSearch] = useState<string>("");

  const items = Object.entries(MASTER_INDIA_TOURISM_DIRECTORY).filter(([_, s]) => 
    s.Name.toLowerCase().includes(search.toLowerCase()) || 
    s.City.toLowerCase().includes(search.toLowerCase()) || 
    s.State.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 pb-20">
      <header className="bg-white border-b p-4 text-center sticky top-0 z-30 shadow-xs">
        <h1 className="text-xl font-black text-amber-800">🛕 Bharat Yatra Pro</h1>
      </header>

      <main className="max-w-3xl mx-auto p-4">
        {tab === 'home' && (
          <div>
            <input 
              type="text"
              placeholder="Search temples, cities..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full p-3 bg-white rounded-xl border border-slate-300 text-sm mb-4"
            />
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {items.map(([key, s]) => (
                <div key={key} className="bg-white rounded-2xl shadow-sm p-4 border flex flex-col justify-between">
                  <div>
                    <img src={s.image_url} alt={s.Name} className="w-full h-40 object-cover rounded-xl mb-3"/>
                    <h3 className="font-bold text-base">{s.Name}</h3>
                    <p className="text-xs text-slate-500 mb-2">📍 {s.City}, {s.State}</p>
                  </div>
                  <button 
                    onClick={() => setShrineKey(key)}
                    className="w-full bg-amber-700 text-white py-2 rounded-xl text-xs font-semibold mt-2"
                  >
                    View Guide & Bookings
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {tab === 'planner' && (
          <div className="bg-white p-6 rounded-2xl shadow-sm border text-center">
            <h2 className="font-bold text-lg mb-2">🚆 Transit & Booking Hub</h2>
            <p className="text-xs text-slate-500 mb-4">Book Train tickets, Cabs, and Hotels instantly.</p>
            <button onClick={() => alert("Redirecting to partner booking...")} className="bg-amber-700 text-white py-2.5 px-4 rounded-xl text-xs font-bold">Book Service</button>
          </div>
        )}

        {tab === 'business' && (
          <div className="bg-white p-6 rounded-2xl shadow-sm border text-center">
            <h2 className="font-bold text-lg mb-2">💼 Revenue Dashboard</h2>
            <p className="text-xs text-slate-600">Total Affiliate & Prasad Earnings: <b>₹14,800</b></p>
          </div>
        )}

        {shrineKey && (
          <div className="fixed inset-0 bg-black/60 flex items-center justify-center p-4 z-50 overflow-y-auto">
            <div className="bg-white rounded-2xl max-w-lg w-full p-6 relative max-h-[90vh] overflow-y-auto">
              <button onClick={() => setShrineKey(null)} className="absolute top-4 right-4 bg-slate-100 w-8 h-8 rounded-full font-bold">✕</button>
              {(() => {
                const s = MASTER_INDIA_TOURISM_DIRECTORY[shrineKey];
                if (!s) return null;
                return (
                  <div>
                    <img src={s.image_url} alt={s.Name} className="w-full h-48 object-cover rounded-xl mb-4"/>
                    <h2 className="text-lg font-bold mb-2">{s.Name}</h2>
                    <div className="grid grid-cols-2 gap-2 mb-4">
                      <button onClick={() => alert("Hotel booking link opened")} className="bg-amber-100 text-amber-900 p-2 rounded-xl text-xs font-bold">🏨 Book Hotel</button>
                      <button onClick={() => alert("Train booking link opened")} className="bg-amber-100 text-amber-900 p-2 rounded-xl text-xs font-bold">🚆 Book Train</button>
                      <button onClick={() => alert("Taxi booking link opened")} className="bg-amber-100 text-amber-900 p-2 rounded-xl text-xs font-bold">🚕 Hire Taxi</button>
                      <button onClick={() => alert("Prasad order placed")} className="bg-amber-100 text-amber-900 p-2 rounded-xl text-xs font-bold">🎁 Order Prasad</button>
                    </div>
                    <p className="text-xs text-slate-600 mb-4">{s.history_geo_political}</p>
                    <button onClick={() => setShrineKey(null)} className="w-full bg-slate-800 text-white py-2 rounded-xl text-xs">Close</button>
                  </div>
                );
              })()}
            </div>
          </div>
        )}
      </main>

      <nav className="fixed bottom-0 left-0 right-0 bg-white border-t py-3 px-6 shadow-lg z-40">
        <div className="max-w-xs mx-auto flex justify-between text-xs font-bold text-slate-600">
          <button onClick={() => setTab('home')} className={tab === 'home' ? 'text-amber-800' : ''}>🛕 Teerth</button>
          <button onClick={() => setTab('planner')} className={tab === 'planner' ? 'text-amber-800' : ''}>🚆 Transit</button>
          <button onClick={() => setTab('business')} className={tab === 'business' ? 'text-amber-800' : ''}>💼 Revenue</button>
        </div>
      </nav>
    </div>
  );
}
