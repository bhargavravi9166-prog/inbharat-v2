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
  const [activeCategory, setActiveCategory] = useState<string>('all');

  const [showAddModal, setShowAddModal] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const [formData, setFormData] = useState({
    Name: '', State: '', City: '', Type: '',
    history: '', famous_food: '', famous_markets: '',
    temples_and_spots: '', route_transport: '',
    image_url: '', emergency_services: ''
  });

  useEffect(() => {
    loadDefaultData();
  }, []);

  const loadDefaultData = async () => {
    setLoading(true);
    const { data } = await supabase
      .from('Heritage and tourism palace')
      .select('*')
      .limit(6);

    if (data && data.length > 0) {
      setResults(data);
    } else {
      setResults([
        {
          Name: 'Amer Fort & Royal Palace',
          City: 'Jaipur',
          State: 'Rajasthan',
          Type: 'Heritage Fort',
          image_url: 'https://images.unsplash.com/photo-1599661046289-e31897846e41?auto=format&fit=crop&w=800&q=80',
          history: 'Magnificent architectural marvel built with red sandstone and marble, overlooking Maota Lake.',
          temples_and_spots: 'Sheesh Mahal, Sila Devi Temple, Diwan-e-Aam.',
          famous_markets: 'Amer Road Handicrafts & Traditional Jewelry Bazaars.',
          famous_food: 'Authentic Dal Baati Churma, Pyaaz Kachori, and Ghevar.',
          route_transport: '11 km from City Center; frequent auto-rickshaws, cabs, and local buses available.',
          emergency_services: 'Tourist Police Station Amer: 0141-2530126 | Ambulance: 108'
        },
        {
          Name: 'Hawa Mahal - Palace of Winds',
          City: 'Jaipur',
          State: 'Rajasthan',
          Type: 'Architectural Landmark',
          image_url: 'https://images.unsplash.com/photo-1609766418064-96cf159e4468?auto=format&fit=crop&w=800&q=80',
          history: 'An extraordinary five-story hive-like structure with 953 jharokhas built for royal women to observe street festivals.',
          temples_and_spots: 'Tripolia Bazaar, Jantar Mantar, City Palace.',
          famous_markets: 'Johari Bazaar & Badi Chaupar for traditional textiles and gems.',
          famous_food: 'LMB Sweets, Mirchi Bada, Masala Chai.',
          route_transport: 'Located in heart of walled city; excellent metro and e-rickshaw connectivity.',
          emergency_services: 'Manak Chowk Police Station: 100 | Hospital: 108'
        }
      ]);
    }
    setLoading(false);
  };

  const generatePremiumCards = async (query: string) => {
    const cleanName = query.trim();
    const capitalized = cleanName.charAt(0).toUpperCase() + cleanName.slice(1);

    let wikiImg = 'https://images.unsplash.com/photo-1588095920028-a433f42f7c6a?auto=format&fit=crop&w=800&q=80';
    let wikiSummary = `${capitalized} is a vibrant cultural and historical destination in India, offering rich heritage, local traditions, and seamless community experiences.`;
    
    try {
      const res = await fetch(`https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(cleanName)}`);
      if (res.ok) {
        const json = await res.json();
        if (json.thumbnail?.source) wikiImg = json.thumbnail.source;
        if (json.extract) wikiSummary = json.extract;
      }
    } catch (e) {
      console.error(e);
    }

    return [
      {
        Name: `${capitalized} Heritage & Sightseeing Hub`,
        City: capitalized,
        State: 'Bharat / India',
        Type: 'Primary Landmark',
        image_url: wikiImg,
        history: wikiSummary,
        temples_and_spots: `Central monuments, historic viewpoints, and ancient landmarks across ${capitalized}.`,
        famous_markets: `${capitalized} Main Handloom Bazaar & Artisan Street Shops.`,
        famous_food: `Signature Regional Thali, Local Sweets, and Traditional Snacks.`,
        route_transport: `Well-connected via State Highways, Railway Station, Local Auto & Cabs.`,
        emergency_services: `Local Police Station: 100 | District Hospital & Ambulance: 108`
      },
      {
        Name: `${capitalized} Food & Local Market Street`,
        City: capitalized,
        State: 'Bharat / India',
        Type: 'Market & Culinary Spot',
        image_url: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=800&q=80',
        history: `The bustling commercial center of ${capitalized}, famous for vibrant local trade, ethnic wear, and authentic street food culture.`,
        temples_and_spots: `Central Town Square, Night Food Street, Handicraft Outlets.`,
        famous_markets: `Textile Hub, Spice Markets, Handcrafted Souvenir Stores.`,
        famous_food: `Famous Local Street Delicacies, Spicy Chaat, and Fresh Rabri-Jalebi.`,
        route_transport: `Pedestrian-friendly market zone with ample parking and e-rickshaws.`,
        emergency_services: `Market Help Desk: 100 | Fire Station: 101`
      }
    ];
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
      const cards = await generatePremiumCards(cleanQuery);
      setResults(cards);
    }
    setLoading(false);
  };

  const handleAddSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.Name || !formData.City) {
      alert('Kripya Name aur City zaroor bharein!');
      return;
    }

    setSubmitting(true);
    const { error } = await supabase
      .from('Heritage and tourism palace')
      .insert([formData]);

    setSubmitting(false);

    if (error) {
      alert('Error: ' + error.message);
    } else {
      alert('Spot successfully added to InBharat database!');
      setShowAddModal(false);
      handleSearch(formData.City);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans pb-28 selection:bg-orange-500 selection:text-white">
      
      {/* Top Brand Bar */}
      <header className="sticky top-0 z-50 bg-slate-900/80 backdrop-blur-xl border-b border-slate-800 px-4 py-3 flex justify-between items-center shadow-2xl">
        <div className="flex items-center gap-2.5 cursor-pointer" onClick={() => window.location.reload()}>
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-orange-600 to-amber-500 flex items-center justify-center text-white font-black text-xl shadow-lg shadow-orange-500/20">
            🇮🇳
          </div>
          <div>
            <div className="flex items-center font-black tracking-wider text-xl leading-none">
              <span className="text-orange-500">IN</span>
              <span className="text-white">BHARAT</span>
            </div>
            <span className="text-[10px] text-slate-400 font-bold uppercase tracking-widest block mt-0.5">
              Super-App & Travel Hub
            </span>
          </div>
        </div>

        <button 
          onClick={() => setShowAddModal(true)} 
          className="bg-slate-800 hover:bg-slate-700 text-amber-400 border border-amber-500/30 text-xs font-bold px-3.5 py-2 rounded-xl transition shadow-md active:scale-95"
        >
          + Contribute Spot
        </button>
      </header>

      {/* Hero Search Section */}
      <section className="relative px-4 pt-10 pb-12 max-w-3xl mx-auto w-full text-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-orange-500/10 via-transparent to-transparent pointer-events-none blur-3xl"></div>
        
        <span className="inline-flex items-center gap-1.5 bg-orange-500/10 text-orange-400 border border-orange-500/20 text-xs font-bold px-3.5 py-1.5 rounded-full mb-4 shadow-inner">
          ✨ Premium Structured Local Intelligence
        </span>
        <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-white mb-3">
          Explore Any Indian City, <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-amber-400">Instantly.</span>
        </h1>
        <p className="text-xs sm:text-sm text-slate-400 max-w-md mx-auto mb-8 font-medium">
          Get verified history, local food spots, transport connectivity, and emergency help in one clean dashboard.
        </p>

        <form onSubmit={(e) => handleSearch(undefined, e)} className="relative max-w-xl mx-auto">
          <div className="flex bg-slate-900/90 backdrop-blur-md rounded-2xl p-2 shadow-2xl border border-slate-700/80 focus-within:border-orange-500 transition">
            <span className="flex items-center pl-3 text-slate-400 text-lg">🔍</span>
            <input
              type="text"
              placeholder="Search city, fort or temple (e.g. Jaipur, Ujjain, Tonk)..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="flex-1 bg-transparent px-3 py-3 text-xs sm:text-sm text-slate-100 placeholder-slate-500 outline-none font-semibold"
            />
            <button 
              type="submit" 
              disabled={loading} 
              className="bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white font-black text-xs sm:text-sm px-6 py-3 rounded-xl transition shadow-lg shadow-orange-500/25 active:scale-95 disabled:opacity-50"
            >
              {loading ? 'Searching...' : 'Explore'}
            </button>
          </div>
        </form>

        <div className="flex gap-2 overflow-x-auto mt-5 no-scrollbar pb-1 text-xs justify-start sm:justify-center">
          {['Jaipur', 'Ujjain', 'Varanasi', 'Agra', 'Udaipur', 'Jodhpur', 'Tonk'].map(city => (
            <button
              key={city}
              type="button"
              onClick={() => handleSearch(city)}
              className="bg-slate-900 hover:bg-slate-800 text-slate-300 border border-slate-800 px-3.5 py-1.5 rounded-xl font-bold whitespace-nowrap transition active:scale-95 shadow-sm"
            >
              📍 {city}
            </button>
          ))}
        </div>
      </section>

      {/* Main Results Dashboard */}
      <main className="px-4 max-w-3xl mx-auto w-full flex-1">
        {loading && (
          <div className="text-center py-20 bg-slate-900/50 backdrop-blur-md rounded-3xl border border-slate-800 shadow-xl">
            <div className="w-10 h-10 border-4 border-orange-500 border-t-transparent rounded-full animate-spin mx-auto mb-3"></div>
            <p className="text-xs text-slate-400 font-bold tracking-wide">Assembling Structured Travel Intelligence...</p>
          </div>
        )}

        {!loading && results.length > 0 && (
          <div className="space-y-6">
            <div className="flex justify-between items-center px-1">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                Showing {results.length} Structured Destination Card(s)
              </span>
            </div>

            {results.map((item, idx) => (
              <div key={idx} className="bg-slate-900/80 backdrop-blur-xl border border-slate-800/80 rounded-3xl overflow-hidden shadow-2xl transition hover:border-slate-700">
                
                {/* Hero Card Image */}
                <div className="relative h-56 bg-slate-950 overflow-hidden">
                  <img 
                    src={item.image_url || 'https://images.unsplash.com/photo-1599661046289-e31897846e41?auto=format&fit=crop&w=800&q=80'} 
                    alt={item.Name} 
                    className="w-full h-full object-cover opacity-85 hover:scale-105 transition duration-700" 
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/30 to-transparent"></div>
                  
                  <div className="absolute top-3 left-3 flex gap-2">
                    <span className="bg-orange-500/90 backdrop-blur-md text-white font-black text-[10px] px-3 py-1 rounded-full shadow-lg">
                      ⭐ {item.Type || 'Verified Landmark'}
                    </span>
                  </div>

                  <div className="absolute bottom-4 left-4 right-4">
                    <h3 className="text-2xl font-black tracking-tight text-white drop-shadow-md">{item.Name}</h3>
                    <p className="text-xs text-amber-300 font-semibold mt-0.5 flex items-center gap-1">
                      <span>📍</span> {item.City ? `${item.City}, ` : ''}{item.State}
                    </p>
                  </div>
                </div>

                {/* Structured Information Grid (No Glitch Tabs, Direct Clean Sections) */}
                <div className="p-5 space-y-4 text-xs text-slate-300">
                  
                  {/* History Section */}
                  <div className="bg-slate-950/60 p-4 rounded-2xl border border-slate-800/60 shadow-inner">
                    <strong className="text-amber-400 block font-black text-sm mb-1 flex items-center gap-1.5">
                      <span>📜</span> History & Heritage Overview
                    </strong>
                    <p className="leading-relaxed text-slate-300 font-medium">{item.history || item.geography_politics || 'Rich historical legacy and community background.'}</p>
                  </div>

                  {/* Inside Attractions */}
                  <div className="bg-slate-950/60 p-4 rounded-2xl border border-slate-800/60 shadow-inner">
                    <strong className="text-orange-400 block font-black text-sm mb-1 flex items-center gap-1.5">
                      <span>🏛️</span> Key Sightseeing & Nearby Spots
                    </strong>
                    <p className="leading-relaxed text-slate-300 font-medium">{item.temples_and_spots || 'Local monuments and cultural centers.'}</p>
                  </div>

                  {/* Market & Food Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div className="bg-slate-950/60 p-3.5 rounded-2xl border border-slate-800/60">
                      <strong className="text-emerald-400 block font-bold mb-1 flex items-center gap-1">
                        <span>🛍️</span> Famous Markets
                      </strong>
                      <p className="text-slate-300 leading-snug font-medium">{item.famous_markets || 'Local Handicrafts & Handloom Bazaar.'}</p>
                    </div>
                    <div className="bg-slate-950/60 p-3.5 rounded-2xl border border-slate-800/60">
                      <strong className="text-rose-400 block font-bold mb-1 flex items-center gap-1">
                        <span>🍲</span> Special Local Food
                      </strong>
                      <p className="text-slate-300 leading-snug font-medium">{item.famous_food || 'Traditional Regional Delicacies.'}</p>
                    </div>
                  </div>

                  {/* Transport & Emergency */}
                  <div className="bg-slate-950/80 p-4 rounded-2xl border border-slate-800">
                    <div className="mb-3">
                      <strong className="text-sky-400 block font-bold mb-0.5 flex items-center gap-1">
                        <span>🚌</span> Bus & Taxi Connectivity
                      </strong>
                      <p className="text-slate-300 font-medium">{item.route_transport || 'Well connected via state roadways and local transit.'}</p>
                    </div>
                    <div className="border-t border-slate-800 pt-3">
                      <strong className="text-red-400 block font-bold mb-0.5 flex items-center gap-1">
                        <span>🚨</span> Emergency & Police Help
                      </strong>
                      <p className="text-slate-200 font-bold">{item.emergency_services || 'Tourist Police: 100 | Ambulance: 108'}</p>
                    </div>
                  </div>

                </div>
              </div>
            ))}
          </div>
        )}
      </main>

      {/* Contribute Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4 z-50">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl w-full max-w-md p-6 text-xs text-slate-200 shadow-2xl max-h-[90vh] overflow-y-auto">
            <h3 className="font-black text-white mb-4 text-base flex items-center gap-2">
              <span>🏰</span> Contribute Place to InBharat
            </h3>
            <form onSubmit={handleAddSubmit} className="space-y-3">
              <div>
                <label className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block mb-1">Spot Name *</label>
                <input type="text" required placeholder="e.g. Nahargarh Fort" value={formData.Name} onChange={(e) => setFormData({...formData, Name: e.target.value})} className="w-full bg-slate-950 p-3 rounded-xl border border-slate-800 outline-none focus:border-orange-500 font-semibold" />
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block mb-1">City *</label>
                  <input type="text" required placeholder="Jaipur" value={formData.City} onChange={(e) => setFormData({...formData, City: e.target.value})} className="w-full bg-slate-950 p-3 rounded-xl border border-slate-800 outline-none focus:border-orange-500 font-semibold" />
                </div>
                <div>
                  <label className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block mb-1">State *</label>
                  <input type="text" required placeholder="Rajasthan" value={formData.State} onChange={(e) => setFormData({...formData, State: e.target.value})} className="w-full bg-slate-950 p-3 rounded-xl border border-slate-800 outline-none focus:border-orange-500 font-semibold" />
                </div>
              </div>
              <div>
                <label className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block mb-1">Image URL (Unsplash) *</label>
                <input type="url" required placeholder="https://images.unsplash.com/..." value={formData.image_url} onChange={(e) => setFormData({...formData, image_url: e.target.value})} className="w-full bg-slate-950 p-3 rounded-xl border border-slate-800 outline-none focus:border-orange-500 font-semibold" />
              </div>
              <div>
                <label className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block mb-1">History & Details *</label>
                <textarea required placeholder="Write history..." value={formData.history} onChange={(e) => setFormData({...formData, history: e.target.value})} className="w-full bg-slate-950 p-3 rounded-xl border border-slate-800 outline-none focus:border-orange-500 font-semibold h-20 resize-none"></textarea>
              </div>
              <div>
                <label className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block mb-1">Famous Food & Markets</label>
                <input type="text" placeholder="Dal Baati, Johari Bazaar" value={formData.famous_food} onChange={(e) => setFormData({...formData, famous_food: e.target.value})} className="w-full bg-slate-950 p-3 rounded-xl border border-slate-800 outline-none focus:border-orange-500 font-semibold" />
              </div>
              <button type="submit" disabled={submitting} className="w-full bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white font-black py-3 rounded-xl mt-3 shadow-lg shadow-orange-500/20">
                {submitting ? 'Saving to Database...' : 'Publish to InBharat'}
              </button>
              <button type="button" onClick={() => setShowAddModal(false)} className="w-full text-slate-500 hover:text-slate-300 py-2 font-semibold">
                Cancel
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Bottom Floating Navigation */}
      <nav className="fixed bottom-3 left-4 right-4 max-w-md mx-auto bg-slate-900/90 backdrop-blur-2xl border border-slate-800 flex justify-around py-3 z-40 rounded-2xl shadow-2xl text-[11px] font-extrabold text-slate-400">
        <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="flex flex-col items-center gap-0.5 text-orange-400">
          <span className="text-base">🔍</span>
          <span>Explore</span>
        </button>
        <button onClick={() => setShowAddModal(true)} className="flex flex-col items-center gap-0.5 hover:text-slate-200">
          <span className="text-base">➕</span>
          <span>Add Spot</span>
        </button>
        <button onClick={() => alert('InBharat Premium Local Intelligence Engine v2.0 Active.')} className="flex flex-col items-center gap-0.5 hover:text-slate-200">
          <span className="text-base">🛡️</span>
          <span>Verified Hub</span>
        </button>
      </nav>

    </div>
  );
}
