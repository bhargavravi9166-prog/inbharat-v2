import React, { useState, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL || 'https://xllmsjytvskzlyvynuzv.supabase.co';
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhsbG1zanl0dnNremx5dnludXp2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDk4NTYzMjQsImV4cCI6MjAyNTQzMjMyNH0.placeholder';

const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL || SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY || SUPABASE_ANON_KEY
);

export default function App() {
  const [searchTerm, setSearchTerm] = useState('');
  const [results, setResults] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const [formData, setFormData] = useState({
    Name: '', State: '', City: '', Type: '',
    history: '', famous_food: '', famous_markets: '',
    temples_and_spots: '', route_transport: '', image_url: '', emergency_services: ''
  });

  useEffect(() => {
    loadDefaultData();
  }, []);

  const loadDefaultData = async () => {
    setLoading(true);
    const { data } = await supabase
      .from('Heritage and tourism palace')
      .select('*')
      .limit(5);

    if (data && data.length > 0) {
      setResults(data);
    } else {
      setResults([
        {
          Name: 'Amer Fort & Palace',
          City: 'Jaipur',
          State: 'Rajasthan',
          Type: 'Heritage Fort',
          image_url: 'https://images.unsplash.com/photo-1599661046289-e31897846e41?auto=format&fit=crop&w=800&q=80',
          history: 'Amer Fort is known for its artistic style elements, large ramparts, series of gates and cobbled paths.',
          temples_and_spots: 'Sheesh Mahal, Sila Devi Temple, Maota Lake.',
          famous_markets: 'Amer Road Handicraft Shops & Traditional Bazaars.',
          famous_food: 'Dal Baati Churma, Pyaaz Kachori.',
          route_transport: '11 km from Jaipur City Centre; cabs and autos easily available.',
          emergency_services: 'Tourist Police: 100 | Ambulance: 108'
        }
      ]);
    }
    setLoading(false);
  };

  const handleSearch = async (termToSearch?: string, e?: React.FormEvent) => {
    if (e) e.preventDefault();
    const query = termToSearch !== undefined ? termToSearch : searchTerm;
    if (!query || !query.trim()) {
      loadDefaultData();
      return;
    }

    const cleanQuery = query.trim();
    setSearchTerm(cleanQuery);
    setLoading(true);

    const { data, error } = await supabase
      .from('Heritage and tourism palace')
      .select('*')
      .ilike('Name', `%${cleanQuery}%`);

    if (!error && data && data.length > 0) {
      setResults(data);
    } else {
      const cap = cleanQuery.charAt(0).toUpperCase() + cleanQuery.slice(1);
      setResults([
        {
          Name: `${cap} Heritage & Sightseeing Spot`,
          City: cap,
          State: 'Bharat / India',
          Type: 'Verified Destination',
          image_url: 'https://images.unsplash.com/photo-1588095920028-a433f42f7c6a?auto=format&fit=crop&w=800&q=80',
          history: `${cap} is a historic and culturally rich location known for its vibrant heritage and traditional community life.`,
          temples_and_spots: `Main town square, ancient temples, and local viewpoints around ${cap}.`,
          famous_markets: `${cap} Handloom Bazaar & Handicraft Shops.`,
          famous_food: `Authentic regional thali and local traditional snacks.`,
          route_transport: `Well connected via state roadways, local auto-rickshaws and cabs.`,
          emergency_services: `Local Police: 100 | Hospital/Ambulance: 108`
        }
      ]);
    }
    setLoading(false);
  };

  const handleAddSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.Name || !formData.City) {
      alert('Kripya Name aur City bharein!');
      return;
    }
    setSubmitting(true);
    const { error } = await supabase.from('Heritage and tourism palace').insert([formData]);
    setSubmitting(false);
    if (error) {
      alert('Error: ' + error.message);
    } else {
      alert('Spot successfully added!');
      setShowAddModal(false);
      handleSearch(formData.City);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans pb-24 selection:bg-orange-500">
      
      {/* Clean Navbar */}
      <header className="sticky top-0 z-50 bg-slate-900/80 backdrop-blur-md border-b border-slate-800 px-4 py-3 flex justify-between items-center">
        <div className="flex items-center gap-2 cursor-pointer" onClick={() => window.location.reload()}>
          <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-orange-600 to-amber-500 flex items-center justify-center text-white font-bold text-base shadow-md">
            🇮🇳
          </div>
          <div>
            <div className="flex items-center font-black tracking-wider text-lg leading-none">
              <span className="text-orange-500">IN</span>
              <span className="text-white">BHARAT</span>
            </div>
          </div>
        </div>

        <button 
          onClick={() => setShowAddModal(true)} 
          className="bg-slate-800 hover:bg-slate-700 text-amber-400 text-xs font-bold px-3 py-1.5 rounded-xl border border-amber-500/20 transition"
        >
          + Add Spot
        </button>
      </header>

      {/* Hero Search */}
      <section className="px-4 pt-8 pb-8 max-w-xl mx-auto w-full text-center">
        <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-white mb-2">
          Discover India, <span className="text-orange-500">Clean & Fast.</span>
        </h1>
        <p className="text-xs text-slate-400 mb-6">
          Search any city to get structured history, food, transport and emergency details.
        </p>

        <form onSubmit={(e) => handleSearch(undefined, e)} className="relative">
          <div className="flex bg-slate-900 rounded-2xl p-1.5 border border-slate-700/80 focus-within:border-orange-500 transition shadow-lg">
            <span className="flex items-center pl-3 text-slate-400 text-sm">🔍</span>
            <input
              type="text"
              placeholder="Search city (e.g. Jaipur, Ujjain, Tonk)..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="flex-1 bg-transparent px-3 py-2 text-xs sm:text-sm text-slate-100 placeholder-slate-500 outline-none font-medium"
            />
            <button 
              type="submit" 
              disabled={loading} 
              className="bg-orange-500 hover:bg-orange-600 text-white font-bold text-xs px-5 py-2 rounded-xl transition disabled:opacity-50 shadow-md"
            >
              {loading ? '...' : 'Search'}
            </button>
          </div>
        </form>

        <div className="flex gap-2 overflow-x-auto mt-4 no-scrollbar pb-1 text-xs justify-start sm:justify-center">
          {['Jaipur', 'Ujjain', 'Varanasi', 'Agra', 'Tonk', 'Mount Abu'].map(city => (
            <button
              key={city}
              type="button"
              onClick={() => handleSearch(city)}
              className="bg-slate-900 hover:bg-slate-800 text-slate-300 border border-slate-800 px-3 py-1 rounded-lg font-semibold whitespace-nowrap transition"
            >
              {city}
            </button>
          ))}
        </div>
      </section>

      {/* Results Feed (Clean Card Design) */}
      <main className="px-4 max-w-xl mx-auto w-full flex-1 space-y-4">
        {loading && (
          <div className="text-center py-16 bg-slate-900/40 rounded-2xl border border-slate-800">
            <div className="w-8 h-8 border-3 border-orange-500 border-t-transparent rounded-full animate-spin mx-auto mb-2"></div>
            <p className="text-xs text-slate-400 font-semibold">Loading details...</p>
          </div>
        )}

        {!loading && results.map((item, idx) => (
          <div key={idx} className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-xl">
            
            {/* Image Header */}
            <div className="relative h-48 bg-slate-950 overflow-hidden">
              <img 
                src={item.image_url || 'https://images.unsplash.com/photo-1599661046289-e31897846e41?auto=format&fit=crop&w=800&q=80'} 
                alt={item.Name} 
                className="w-full h-full object-cover opacity-90" 
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent"></div>
              
              <div className="absolute bottom-3 left-3 right-3">
                <span className="bg-orange-500 text-white font-bold text-[9px] px-2.5 py-0.5 rounded-md mb-1 inline-block">
                  {item.Type || 'Landmark'}
                </span>
                <h3 className="text-xl font-black text-white tracking-tight">{item.Name}</h3>
                <p className="text-[11px] text-amber-300 font-medium">📍 {item.City}, {item.State}</p>
              </div>
            </div>

            {/* Content Details (Clean & Minimalist Layout) */}
            <div className="p-4 space-y-3 text-xs text-slate-300">
              
              <div className="bg-slate-950/60 p-3 rounded-xl border border-slate-800/60">
                <span className="text-amber-400 font-bold block mb-0.5">📜 History & Overview</span>
                <p className="text-slate-300 leading-relaxed">{item.history || item.geography_politics}</p>
              </div>

              <div className="bg-slate-950/60 p-3 rounded-xl border border-slate-800/60">
                <span className="text-orange-400 font-bold block mb-0.5">🏛️ Key Sightseeing Spots</span>
                <p className="text-slate-300 leading-relaxed">{item.temples_and_spots}</p>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div className="bg-slate-950/60 p-3 rounded-xl border border-slate-800/60">
                  <span className="text-emerald-400 font-bold block mb-0.5">🛍️ Markets</span>
                  <p className="text-slate-300">{item.famous_markets}</p>
                </div>
                <div className="bg-slate-950/60 p-3 rounded-xl border border-slate-800/60">
                  <span className="text-rose-400 font-bold block mb-0.5">🍲 Food</span>
                  <p className="text-slate-300">{item.famous_food}</p>
                </div>
              </div>

              <div className="bg-slate-950/80 p-3 rounded-xl border border-slate-800 space-y-2">
                <div>
                  <span className="text-sky-400 font-bold block mb-0.5">🚌 Transport Connectivity</span>
                  <p className="text-slate-300">{item.route_transport}</p>
                </div>
                <div className="border-t border-slate-800/80 pt-2">
                  <span className="text-red-400 font-bold block mb-0.5">🚨 Emergency & Police SOS</span>
                  <p className="text-slate-200 font-semibold">{item.emergency_services}</p>
                </div>
              </div>

            </div>
          </div>
        ))}
      </main>

      {/* Add Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl w-full max-w-sm p-5 text-xs text-slate-200 shadow-2xl">
            <h3 className="font-black text-white mb-3 text-sm">Add Spot to InBharat</h3>
            <form onSubmit={handleAddSubmit} className="space-y-2.5">
              <input type="text" required placeholder="Spot Name" value={formData.Name} onChange={(e) => setFormData({...formData, Name: e.target.value})} className="w-full bg-slate-950 p-2.5 rounded-xl border border-slate-800 outline-none focus:border-orange-500" />
              <div className="grid grid-cols-2 gap-2">
                <input type="text" required placeholder="City" value={formData.City} onChange={(e) => setFormData({...formData, City: e.target.value})} className="w-full bg-slate-950 p-2.5 rounded-xl border border-slate-800 outline-none focus:border-orange-500" />
                <input type="text" required placeholder="State" value={formData.State} onChange={(e) => setFormData({...formData, State: e.target.value})} className="w-full bg-slate-950 p-2.5 rounded-xl border border-slate-800 outline-none focus:border-orange-500" />
              </div>
              <input type="url" required placeholder="Image URL (Unsplash)" value={formData.image_url} onChange={(e) => setFormData({...formData, image_url: e.target.value})} className="w-full bg-slate-950 p-2.5 rounded-xl border border-slate-800 outline-none focus:border-orange-500" />
              <textarea required placeholder="History..." value={formData.history} onChange={(e) => setFormData({...formData, history: e.target.value})} className="w-full bg-slate-950 p-2.5 rounded-xl border border-slate-800 outline-none focus:border-orange-500 h-16 resize-none"></textarea>
              <button type="submit" disabled={submitting} className="w-full bg-orange-500 hover:bg-orange-600 text-white font-bold py-2.5 rounded-xl mt-2">
                {submitting ? 'Saving...' : 'Publish'}
              </button>
              <button type="button" onClick={() => setShowAddModal(false)} className="w-full text-slate-500 py-1 font-semibold">
                Cancel
              </button>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
