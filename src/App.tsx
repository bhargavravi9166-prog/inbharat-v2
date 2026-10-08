// Force fresh build trigger - Bharat Yatra Pro Final
import React, { useState } from 'react';
import { MASTER_INDIA_TOURISM_DIRECTORY } from './tourismData';

export default function App() {
  const [tab, setTab] = useState<'home' | 'business'>('home');
  const [key, setKey] = useState<string | null>(null);
  const [search, setSearch] = useState<string>("");

  const items = Object.entries(MASTER_INDIA_TOURISM_DIRECTORY).filter(([_, s]) => 
    s.Name.toLowerCase().includes(search.toLowerCase()) || 
    s.City.toLowerCase().includes(search.toLowerCase()) || 
    s.State.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 p-4 pb-20">
      <h1 className="text-xl font-bold text-center text-amber-700 mb-4">🛕 Bharat Yatra Pro</h1>
      
      {tab === 'home' && (
        <div className="max-w-md mx-auto space-y-4">
          <input 
            type="text"
            placeholder="Search temples..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full p-3 bg-white rounded-xl border border-slate-300 text-sm"
          />
          
          {items.map(([k, s]) => (
            <div key={k} className="bg-white p-4 rounded-xl shadow border">
              <h3 className="font-bold">{s.Name}</h3>
              <p className="text-xs text-slate-500">{s.City}, {s.State}</p>
              <button onClick={() => setKey(k)} className="mt-2 bg-amber-600 text-white text-xs px-3 py-1.5 rounded-lg">View Details & Book</button>
            </div>
          ))}
        </div>
      )}

      {key && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white p-6 rounded-2xl max-w-sm w-full relative">
            <button onClick={() => setKey(null)} className="absolute top-3 right-3 font-bold">✕</button>
            <h2 className="font-bold text-lg mb-2">{MASTER_INDIA_TOURISM_DIRECTORY[key]?.Name}</h2>
            <p className="text-xs text-slate-600 mb-4">{MASTER_INDIA_TOURISM_DIRECTORY[key]?.history_geo_political}</p>
            <button onClick={() => alert("Booking redirect active!")} className="w-full bg-amber-600 text-white py-2 rounded-xl text-xs font-bold">Book Hotel / Train / Taxi</button>
          </div>
        </div>
      )}

      <div className="fixed bottom-0 left-0 right-0 bg-white border-t p-3 flex justify-center gap-6 text-xs font-bold z-40">
        <button onClick={() => setTab('home')} className={tab === 'home' ? 'text-amber-700' : 'text-slate-600'}>🛕 Teerth</button>
        <button onClick={() => setTab('business')} className={tab === 'business' ? 'text-amber-700' : 'text-slate-600'}>💼 Revenue: ₹14,800</button>
      </div>
    </div>
  );
}
