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
  const [activeTab, setActiveTab] = useState<Record<number, string>>({});

  const [showAddModal, setShowAddModal] = useState(false);
  const [showVendorModal, setShowVendorModal] = useState(false);
  const [showGovtModal, setShowGovtModal] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const [formData, setFormData] = useState({
    Name: '', State: '', City: '', Type: '', Zone: '',
    geography_politics: '', history: '', famous_personalities: '',
    culture: '', famous_food: '', famous_markets: '',
    temples_and_spots: '', route_transport: '',
    image_url: '',
    panchayat_sarpanch: '', local_government: '', emergency_services: '', public_utilities: ''
  });

  const [vendorData, setVendorData] = useState({ businessName: '', ownerName: '', phone: '', city: '' });
  const [govtData, setGovtData] = useState({ repName: '', designation: '', villageCity: '', phone: '' });

  useEffect(() => {
    loadDefaultData();
  }, []);

  const loadDefaultData = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('Heritage and tourism palace')
      .select('*')
      .limit(10);

    if (!error && data && data.length > 0) {
      setResults(data);
    }
    setLoading(false);
  };

  // Direct Supabase Multi-Card Matcher & Live Fallback
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

    // Search Supabase database matching Name, City, or State
    const { data, error } = await supabase
      .from('Heritage and tourism palace')
      .select('*')
      .or(`Name.ilike.%${cleanQuery}%,City.ilike.%${cleanQuery}%,State.ilike.%${cleanQuery}%,temples_and_spots.ilike.%${cleanQuery}%`);

    if (!error && data && data.length > 0) {
      // Deduplicate results by Name to ensure unique cards
      const uniqueMap = new Map();
      data.forEach(item => {
        const key = (item.Name || '').trim().toLowerCase();
        if (key && !uniqueMap.has(key)) {
          uniqueMap.set(key, item);
        }
      });
      setResults(Array.from(uniqueMap.values()));
    } else {
      // Fallback: If not in DB, fetch dynamic Wikipedia Summary Card
      try {
        const wikiRes = await fetch(
          `https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(cleanQuery)}`
        );
        if (wikiRes.ok) {
          const wikiData = await wikiRes.json();
          if (wikiData.extract) {
            setResults([{
              Name: wikiData.title,
              City: cleanQuery,
              State: 'Bharat / India',
              Type: wikiData.description || 'Verified Tourism Destination',
              image_url: wikiData.thumbnail?.source || 'https://images.unsplash.com/photo-1599661046289-e31897846e41?auto=format&fit=crop&w=800&q=80',
              history: wikiData.extract,
              temples_and_spots: `Popular local heritage spots and monuments around ${wikiData.title}.`,
              famous_markets: `${wikiData.title} Traditional Bazaar & Handicraft Market.`,
              famous_food: `Authentic Regional Cuisine and Local Specialities.`,
              route_transport: `Well connected via roadways, local taxis and transit hubs.`,
              emergency_services: `Local Police Station (100) & Emergency Ambulance (108).`
            }]);
          } else {
            setResults([]);
          }
        } else {
          setResults([]);
        }
      } catch (err) {
        console.error('Fetch Error:', err);
        setResults([]);
      }
    }
    setLoading(false);
  };

  const handleTabChange = (cardIdx: number, tabName: string) => {
    setActiveTab(prev => ({ ...prev, [cardIdx]: tabName }));
  };

  const handleAddSpotSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.Name || !formData.City) {
      alert('Kripya Palace/Spot Name aur City zaroor bharein!');
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
      alert('Naya Spot successfully InBharat database me add ho gaya hai!');
      setShowAddModal(false);
      handleSearch(formData.City);
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 text-slate-800 flex flex-col font-sans pb-24 selection:bg-orange-500 selection:text-white">
      
      {/* Top Banner */}
      <div className="bg-[#0F2C59] text-amber-300 text-xs py-2 px-4 shadow-inner">
        <div className="max-w-4xl mx-auto flex justify-between items-center font-semibold">
          <span className="truncate">🏛️ InBharat Multi-Card Tourism & Palace Radar</span>
          <div className="flex gap-2">
            <button onClick={() => setShowGovtModal(true)} className="bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold px-2.5 py-0.5 rounded-full text-[10px] transition shadow whitespace-nowrap">
              Update Info
            </button>
            <button onClick={() => setShowVendorModal(true)} className="bg-orange-500 hover:bg-orange-600 text-white font-extrabold px-2.5 py-0.5 rounded-full text-[10px] transition shadow whitespace-nowrap">
              List Business
            </button>
          </div>
        </div>
      </div>

      {/* Navbar */}
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200 px-4 py-2.5 flex justify-between items-center shadow-sm">
        <div className="flex items-center gap-2 cursor-pointer" onClick={() => window.location.reload()}>
          <div className="w-9 h-9 rounded-xl bg-[#0F2C59] flex items-center justify-center text-orange-500 font-black text-xl shadow-md border border-orange-500/20">
            🏰
          </div>
          <div>
            <div className="flex items-center font-black tracking-tight text-xl leading-none">
              <span className="text-orange-500">IN</span>
              <span className="text-[#0F2C59]">BHARAT</span>
            </div>
            <span className="text-[9px] text-slate-400 font-bold uppercase tracking-widest block -mt-0.5">
              Tourism & Local Super-App
            </span>
          </div>
        </div>

        <button onClick={() => setShowAddModal(true)} className="bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold px-3 py-1.5 rounded-xl border border-slate-200 transition">
          + Add Palace Spot
        </button>
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-to-b from-[#0F2C59] via-[#143B73] to-slate-900 text-white p-4 pt-8 pb-10 max-w-4xl mx-auto w-full relative overflow-hidden">
        <div className="text-center mb-6 relative z-10">
          <span className="inline-flex items-center gap-1.5 bg-orange-500/20 text-orange-300 border border-orange-500/30 text-[10px] font-extrabold px-3 py-1 rounded-full mb-3 uppercase tracking-wider">
            🌍 Database Synced Multi-Card Radar
          </span>
          <h2 className="text-2xl sm:text-4xl font-black tracking-tight leading-tight mb-2">
            Explore Nearby Palaces & Heritage Spots
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 max-w-lg mx-auto">
            Search any city or monument to get exact database-synced individual cards!
          </p>
        </div>

        <form onSubmit={(e) => handleSearch(undefined, e)} className="relative max-w-2xl mx-auto z-10">
          <div className="flex bg-white rounded-2xl p-1.5 shadow-2xl border-2 border-orange-500">
            <span className="flex items-center pl-3 text-slate-400 text-base">🔍</span>
            <input
              type="text"
              placeholder="Search city or palace (e.g. Jaipur, Amer Fort, Mount Abu)..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="flex-1 bg-transparent px-2.5 py-2.5 text-xs sm:text-sm text-slate-800 placeholder-slate-400 outline-none font-semibold"
            />
            <button type="submit" disabled={loading} className="bg-orange-500 hover:bg-orange-600 text-white font-black text-xs sm:text-sm px-6 py-2.5 rounded-xl transition shadow-lg disabled:opacity-50">
              {loading ? '...' : 'Explore'}
            </button>
          </div>
        </form>

        <div className="flex gap-2 overflow-x-auto mt-4 no-scrollbar pb-1 text-[11px] justify-start sm:justify-center relative z-10">
          {['Jaipur', 'Mount Abu', 'Ujjain', 'Varanasi', 'Agra', 'Udaipur'].map(city => (
            <button
              key={city}
              type="button"
              onClick={() => handleSearch(city)}
              className="bg-white/10 hover:bg-orange-500/20 text-slate-200 border border-white/20 px-3 py-1 rounded-full font-semibold whitespace-nowrap backdrop-blur-md active:scale-95 transition"
            >
              🏛️ {city}
            </button>
          ))}
        </div>
      </section>

      {/* Results Section - Multi Cards */}
      <main className="p-4 max-w-3xl mx-auto w-full flex-1 -mt-4 relative z-20">
        {loading && (
          <div className="text-center py-16 bg-white rounded-3xl shadow-md border border-slate-200">
            <div className="w-10 h-10 border-4 border-orange-500 border-t-transparent rounded-full animate-spin mx-auto mb-3"></div>
            <p className="text-xs text-slate-600 font-bold">Syncing Database Records & Fetching Cards...</p>
          </div>
        )}

        {!loading && results.length > 0 && (
          <div className="space-y-6">
            <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">
              Found {results.length} Database Synced Card(s)
            </p>
            {results.map((item, idx) => {
              const currentTab = activeTab[idx] || 'overview';

              return (
                <div key={idx} className="bg-white border border-slate-200 rounded-3xl overflow-hidden shadow-lg transition hover:shadow-xl">
                  
                  {/* Card Image Header */}
                  <div className="relative h-52 bg-slate-900 overflow-hidden">
                    <img 
                      src={item.image_url || 'https://images.unsplash.com/photo-1599661046289-e31897846e41?auto=format&fit=crop&w=800&q=80'} 
                      alt={item.Name} 
                      className="w-full h-full object-cover opacity-90 hover:scale-105 transition duration-500" 
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent"></div>
                    <div className="absolute top-3 left-3">
                      <span className="bg-orange-500 text-white font-extrabold text-[10px] px-3 py-1 rounded-full shadow-md">
                        ⭐ {item.Type || 'Heritage Spot'}
                      </span>
                    </div>
                    <div className="absolute bottom-3 left-3 right-3 text-white">
                      <h3 className="text-2xl font-black tracking-tight drop-shadow-md">{item.Name}</h3>
                      <p className="text-xs text-amber-200 font-semibold mt-0.5">📍 {item.City ? `${item.City}, ` : ''}{item.State}</p>
                    </div>
                  </div>

                  {/* Tabs per Card */}
                  <div className="flex border-b border-slate-200 bg-slate-50 text-[11px] font-bold text-slate-500 overflow-x-auto no-scrollbar">
                    {[
                      { key: 'overview', label: '📌 History & Details' },
                      { key: 'spots', label: '🏛️ Inside Attractions' },
                      { key: 'market', label: '🛍️ Market & Food' },
                      { key: 'emergency', label: '🚑 Transport & Help' },
                    ].map(tab => (
                      <button
                        key={tab.key}
                        onClick={() => handleTabChange(idx, tab.key)}
                        className={`flex-1 py-3 px-3 whitespace-nowrap border-b-2 transition ${
                          currentTab === tab.key
                            ? 'border-orange-500 text-orange-600 bg-white font-black shadow-sm'
                            : 'border-transparent text-slate-500 hover:text-slate-800'
                        }`}
                      >
                        {tab.label}
                      </button>
                    ))}
                  </div>

                  {/* Tab Content */}
                  <div className="p-5 text-xs text-slate-700 space-y-3 bg-white">
                    {currentTab === 'overview' && (
                      <div className="space-y-3">
                        <div className="bg-slate-50 p-3.5 rounded-2xl border border-slate-200">
                          <strong className="text-[#0F2C59] block mb-1 font-bold">📜 Palace History & Significance:</strong>
                          <p className="leading-relaxed">{item.history || item.geography_politics || 'Historical background record.'}</p>
                        </div>
                      </div>
                    )}

                    {currentTab === 'spots' && (
                      <div className="space-y-3">
                        <div className="bg-amber-50 p-3.5 rounded-2xl border border-amber-200">
                          <strong className="text-amber-900 block font-bold mb-1 font-bold">🏛️ Key Attractions Here:</strong>
                          <p className="leading-relaxed text-slate-800">{item.temples_and_spots || 'Nearby local monuments and spots.'}</p>
                        </div>
                      </div>
                    )}

                    {currentTab === 'market' && (
                      <div className="space-y-3">
                        <div className="bg-slate-50 p-3.5 rounded-2xl border border-slate-200">
                          <strong className="text-[#0F2C59] block mb-1 font-bold">🍲 Nearby Bazaars & Famous Food:</strong>
                          <p className="leading-relaxed mb-1.5">🛍️ <strong>Market:</strong> {item.famous_markets || 'Local Handloom & Handicraft Bazaar.'}</p>
                          <p className="leading-relaxed">🍛 <strong>Food:</strong> {item.famous_food || 'Traditional Regional Delicacies.'}</p>
                        </div>
                      </div>
                    )}

                    {currentTab === 'emergency' && (
                      <div className="space-y-3">
                        <div className="bg-slate-50 p-3.5 rounded-2xl border border-slate-200">
                          <strong className="text-[#0F2C59] block mb-1 font-bold">🚗 Route & Transport:</strong>
                          <p className="leading-relaxed mb-2">{item.route_transport || 'Well connected via state highways and local transport.'}</p>
                        </div>
                        <div className="bg-rose-50 p-3.5 rounded-2xl border border-rose-200">
                          <strong className="text-rose-900 block font-bold">🚑 Emergency & Tourist Help:</strong>
                          <p className="leading-relaxed text-slate-800">{item.emergency_services || 'Tourist Police (100), Hospital (108).'}</p>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </main>

      {/* Add Place Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-3xl border border-slate-200 w-full max-w-sm p-5 text-xs text-slate-700 shadow-2xl max-h-[90vh] overflow-y-auto">
            <h3 className="font-extrabold text-[#0F2C59] mb-3 text-sm">🏰 Add New Palace / Spot to Database</h3>
            <form onSubmit={handleAddSpotSubmit} className="space-y-2.5">
              <input type="text" required placeholder="Palace / Spot Name *" value={formData.Name} onChange={(e) => setFormData({...formData, Name: e.target.value})} className="w-full bg-slate-50 p-2.5 rounded-xl border border-slate-200 outline-none focus:border-orange-500" />
              <input type="text" required placeholder="City Name (e.g. Jaipur) *" value={formData.City} onChange={(e) => setFormData({...formData, City: e.target.value})} className="w-full bg-slate-50 p-2.5 rounded-xl border border-slate-200 outline-none focus:border-orange-500" />
              <input type="text" required placeholder="State Name (e.g. Rajasthan) *" value={formData.State} onChange={(e) => setFormData({...formData, State: e.target.value})} className="w-full bg-slate-50 p-2.5 rounded-xl border border-slate-200 outline-none focus:border-orange-500" />
              <input type="text" placeholder="Spot Type (e.g. Fort / Temple) *" value={formData.Type} onChange={(e) => setFormData({...formData, Type: e.target.value})} className="w-full bg-slate-50 p-2.5 rounded-xl border border-slate-200 outline-none focus:border-orange-500" />
              <input type="url" placeholder="Image URL (Unsplash Link) *" value={formData.image_url} onChange={(e) => setFormData({...formData, image_url: e.target.value})} className="w-full bg-slate-50 p-2.5 rounded-xl border border-slate-200 outline-none focus:border-orange-500" />
              <textarea placeholder="History & Description *" value={formData.history} onChange={(e) => setFormData({...formData, history: e.target.value})} className="w-full bg-slate-50 p-2.5 rounded-xl border border-slate-200 outline-none focus:border-orange-500 h-20"></textarea>
              <input type="text" placeholder="Nearby Attractions & Spots *" value={formData.temples_and_spots} onChange={(e) => setFormData({...formData, temples_and_spots: e.target.value})} className="w-full bg-slate-50 p-2.5 rounded-xl border border-slate-200 outline-none focus:border-orange-500" />
              <button type="submit" disabled={submitting} className="w-full bg-orange-500 hover:bg-orange-600 text-white font-bold py-2.5 rounded-xl mt-2 shadow-md">{submitting ? 'Saving...' : 'Save to DB'}</button>
              <button type="button" onClick={() => setShowAddModal(false)} className="w-full text-slate-400 py-1 font-semibold">Cancel</button>
            </form>
          </div>
        </div>
      )}

      {/* Bottom Nav */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur-md border-t border-slate-200 flex justify-around py-2 z-40 text-[10px] font-extrabold text-slate-500 shadow-xl">
        <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="flex flex-col items-center gap-0.5 text-orange-500">
          <span className="text-lg">🔍</span>
          <span>Explore</span>
        </button>
        <button onClick={() => setShowGovtModal(true)} className="flex flex-col items-center gap-0.5 text-slate-500 hover:text-slate-900">
          <span className="text-lg">🏛️</span>
          <span>Update Info</span>
        </button>
        <button onClick={() => setShowVendorModal(true)} className="flex flex-col items-center gap-0.5 text-slate-500 hover:text-slate-900">
          <span className="text-lg">💼</span>
          <span>List Business</span>
        </button>
      </nav>

    </div>
  );
}
