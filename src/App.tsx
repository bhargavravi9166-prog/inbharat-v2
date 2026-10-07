import React, { useState, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  'https://xllmsjytvskzlyvynuzv.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhsbG1zanl0dnNremx5dnludXp2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDk4NTYzMjQsImV4cCI6MjAyNTQzMjMyNH0.placeholder'
);

export default function App() {
  const [searchTerm, setSearchTerm] = useState('');
  const [results, setResults] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState('overview');
  const [showAdd, setShowAdd] = useState(false);
  const [showBiz, setShowBiz] = useState(false);

  const [form, setForm] = useState({ Name: '', City: '', State: 'Rajasthan', Type: 'Fort', history: '', image_url: 'https://images.unsplash.com/photo-1599661046289-e31897846e41?auto=format&fit=crop&w=800&q=80', famous_markets: '', famous_food: '', temples_and_spots: '', route_transport: '', emergency_services: 'Police: 100' });

  useEffect(() => { loadData(); }, []);

  const loadData = async () => {
    setLoading(true);
    const { data } = await supabase.from('Heritage and tourism palace').select('*').limit(5);
    if (data && data.length) setResults(data);
    setLoading(false);
  };

  const search = async (q: string) => {
    if (!q.trim()) return loadData();
    setLoading(true);
    const { data } = await supabase.from('Heritage and tourism palace').select('*').ilike('Name', `%${q}%`);
    if (data && data.length) setResults(data);
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 pb-24 font-sans">
      <header className="sticky top-0 z-50 bg-slate-900/95 border-b border-slate-800 px-4 py-3 flex justify-between items-center backdrop-blur">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-xl bg-orange-500 flex items-center justify-center font-bold">🇮🇳</div>
          <span className="font-black tracking-wider text-orange-500">IN<span className="text-white">BHARAT</span></span>
        </div>
        <div className="flex gap-2">
          <button onClick={() => setShowBiz(true)} className="bg-emerald-500/20 text-emerald-400 text-xs font-bold px-3 py-1.5 rounded-xl border border-emerald-500/30">List Biz</button>
          <button onClick={() => setShowAdd(true)} className="bg-orange-500/20 text-orange-400 text-xs font-bold px-3 py-1.5 rounded-xl border border-orange-500/30">+ Spot</button>
        </div>
      </header>

      <section className="px-4 pt-6 max-w-xl mx-auto text-center">
        <h1 className="text-2xl font-black mb-3">Explore India <span className="text-orange-500">Instantly</span></h1>
        <div className="flex bg-slate-800 rounded-2xl p-1.5 border border-slate-700">
          <input type="text" placeholder="Search city (e.g. Jaipur)..." value={searchTerm} onChange={e => setSearchTerm(e.target.value)} className="flex-1 bg-transparent px-3 py-2 text-xs outline-none text-white" />
          <button onClick={() => search(searchTerm)} className="bg-orange-500 text-white px-4 py-2 rounded-xl text-xs font-bold">Search</button>
        </div>
      </section>

      <main className="px-4 max-w-xl mx-auto mt-6 space-y-4">
        {loading ? <p className="text-center text-xs text-slate-400 py-10">Loading...</p> : results.map((item, idx) => (
          <div key={idx} className="bg-slate-800 border border-slate-700 rounded-2xl overflow-hidden shadow-xl">
            <div className="relative h-48 bg-slate-950">
              <img src={item.image_url} alt={item.Name} className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent"></div>
              <div className="absolute bottom-3 left-3 right-3">
                <span className="bg-orange-500 text-white text-[9px] font-bold px-2 py-0.5 rounded">{item.Type || 'Destination'}</span>
                <h3 className="text-lg font-black text-white mt-1">{item.Name}</h3>
                <p className="text-xs text-amber-300">📍 {item.City}, {item.State}</p>
              </div>
            </div>

            <div className="flex border-b border-slate-700 bg-slate-900 text-[10px] font-bold text-slate-400">
              {['overview', 'spots', 'food', 'transit', 'sos'].map(t => (
                <button key={t} onClick={() => setActiveTab(t)} className={`flex-1 py-2 text-center border-b-2 ${activeTab === t ? 'border-orange-500 text-orange-400 bg-slate-800' : 'border-transparent'}`}>{t.toUpperCase()}</button>
              ))}
            </div>

            <div className="p-4 text-xs text-slate-300">
              {activeTab === 'overview' && <p>📜 {item.history}</p>}
              {activeTab === 'spots' && <p>🏛️ {item.temples_and_spots || 'Historic sightseeing monuments.'}</p>}
              {activeTab === 'food' && <p>🍲 <b>Food:</b> {item.famous_food} <br/><br/> 🛍️ <b>Markets:</b> {item.famous_markets}</p>}
              {activeTab === 'transit' && <p>🚌 {item.route_transport || 'Well connected via roads.'}</p>}
              {activeTab === 'sos' && <p className="text-red-400 font-bold">🚨 {item.emergency_services || 'Police: 100'}</p>}
            </div>
          </div>
        ))}
      </main>

      {showBiz && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center p-4 z-50">
          <div className="bg-slate-900 border border-slate-700 rounded-2xl w-full max-w-sm p-5 text-xs">
            <h3 className="font-bold text-white mb-3">List Your Business</h3>
            <input type="text" placeholder="Business Name" className="w-full bg-slate-800 p-2.5 rounded-xl border border-slate-700 mb-2 outline-none text-white" />
            <input type="tel" placeholder="Phone Number" className="w-full bg-slate-800 p-2.5 rounded-xl border border-slate-700 mb-3 outline-none text-white" />
            <button onClick={() => { alert('Success!'); setShowBiz(false); }} className="w-full bg-emerald-600 text-white py-2 rounded-xl font-bold mb-2">Submit</button>
            <button onClick={() => setShowBiz(false)} className="w-full text-slate-500 py-1">Cancel</button>
          </div>
        </div>
      )}

      {showAdd && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center p-4 z-50">
          <div className="bg-slate-900 border border-slate-700 rounded-2xl w-full max-w-sm p-5 text-xs">
            <h3 className="font-bold text-white mb-3">Add New Spot</h3>
            <input type="text" placeholder="Spot Name" value={form.Name} onChange={e => setForm({...form, Name: e.target.value})} className="w-full bg-slate-800 p-2.5 rounded-xl border border-slate-700 mb-2 outline-none text-white" />
            <input type="text" placeholder="City" value={form.City} onChange={e => setForm({...form, City: e.target.value})} className="w-full bg-slate-800 p-2.5 rounded-xl border border-slate-700 mb-3 outline-none text-white" />
            <button onClick={async () => { await supabase.from('Heritage and tourism palace').insert([form]); alert('Added!'); setShowAdd(false); loadData(); }} className="w-full bg-orange-500 text-white py-2 rounded-xl font-bold mb-2">Publish</button>
            <button onClick={() => setShowAdd(false)} className="w-full text-slate-500 py-1">Cancel</button>
          </div>
        </div>
      )}
    </div>
  );
}
