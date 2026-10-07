// Fresh build update - Bharat Yatra Pro
import React, { useState } from 'react';
import { MASTER_INDIA_TOURISM_DIRECTORY } from './Data';

export default function App() {
  const [tab, setTab] = useState<'home' | 'business'>('home');
  const [key, setKey] = useState<string | null>(null);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 p-4">
      <h1 className="text-xl font-bold text-center text-amber-700 mb-4">🛕 Bharat Yatra Pro</h1>
      
      {tab === 'home' && (
        <div className="grid grid-cols-1 gap-4 max-w-md mx-auto">
          {Object.entries(MASTER_INDIA_TOURISM_DIRECTORY).slice(0, 3).map(([k, s]) => (
            <div key={k} className="bg-white p-4 rounded-xl shadow border">
              <h3 className="font-bold">{s.Name}</h3>
              <p className="text-xs text-slate-500">{s.City}, {s.State}</p>
              <button onClick={() => setKey(k)} className="mt-2 bg-amber-600 text-white text-xs px-3 py-1.5 rounded-lg">View Details</button>
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
            <button onClick={() => alert("Booking clicked!")} className="w-full bg-amber-600 text-white py-2 rounded-xl text-xs font-bold">Book Hotel / Train / Taxi</button>
          </div>
        </div>
      )}

      <div className="flex justify-center gap-4 mt-6">
        <button onClick={() => setTab('home')} className="text-xs font-bold bg-slate-200 px-4 py-2 rounded-lg">Home</button>
        <button onClick={() => setTab('business')} className="text-xs font-bold bg-slate-200 px-4 py-2 rounded-lg">Revenue: ₹14,800</button>
      </div>
    </div>
  );
}
