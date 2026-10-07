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
  const [searched, setSearched] = useState(false);
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
    panchayat_sarpanch: '', local_government: '', emergency_services: '', public_utilities: ''
  });

  const [vendorData, setVendorData] = useState({ businessName: '', ownerName: '', phone: '', city: '' });
  const [govtData, setGovtData] = useState({ repName: '', designation: '', villageCity: '', phone: '' });

  useEffect(() => {
    loadDefaultData();
  }, []);

  const loadDefaultData = async () => {
    setLoading(true);
    const { data } = await supabase
      .from('Heritage and tourism palace')
      .select('*')
      .limit(10);

    if (data && data.length > 0) {
      // Remove duplicates by Name using Map
      const uniqueData = Array.from(new Map(data.map(item => [item.Name?.toLowerCase(), item])).values());
      setResults(uniqueData);
    }
    setLoading(false);
  };

  const fetchTourismAndLocationData = async (query: string) => {
    try {
      const cleanQuery = query.trim();
      
      const searchRes = await fetch(
        `https://en.wikipedia.org/w/api.php?action=opensearch&search=${encodeURIComponent(cleanQuery)}&limit=1&namespace=0&format=json&origin=*`
      );
      const searchData = await searchRes.json();

      let targetTitle = cleanQuery;
      if (searchData && searchData[1] && searchData[1].length > 0) {
        targetTitle = searchData[1][0];
      }

      const summaryRes = await fetch(
        `https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(targetTitle)}`
      );
      
      if (!summaryRes.ok) return null;
      const wikiData = await summaryRes.json();
      if (!wikiData.extract) return null;

      const realImg = wikiData.thumbnail?.source || wikiData.originalimage?.source || null;
      const extractText = wikiData.extract || '';

      return {
        Name: wikiData.title,
        City: wikiData.title,
        State: 'Bharat / India',
        Type: wikiData.description || 'Tourism & Heritage Destination',
        Zone: 'InBharat Tourism Radar',
        image_url: realImg,
        geography_politics: extractText,
        history: extractText,
        temples_and_spots: `Top Nearby Spots around ${wikiData.title}: 1. Main Heritage Fort & Palace 2. Historic Ancient Temple 3. Local Cultural Museum 4. Scenic Viewpoint & Lake Gardens.`,
        famous_markets: `${wikiData.title} Handloom Bazaar, Traditional Handicrafts & Street Food Hub.`,
        famous_food: `Authentic Regional Thali, Local Sweets & Famous Street Snacks of ${wikiData.title}.`,
        route_transport: `Well connected via State Highways, Taxi Services, Railway Station & Local Buses.`,
        panchayat_sarpanch: `Local Tourism Help Desk & Municipal Office (${wikiData.title}).`,
        emergency_services: `Tourist Police Helpline, District Hospital (108) & Police Station (100).`,
        public_utilities: `ATM, Fuel Stations, EV Charging & E-Mitra Tourism Kiosk.`
      };
    } catch (e) {
      console.error('Tourism API Error:', e);
      return null;
    }
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
    setSearched(true);

    let combinedResults: any[] = [];

    // 1. Fetch from Supabase
    const { data, error } = await supabase
      .from('Heritage and tourism palace')
      .select('*')
      .or(`Name.ilike.%${cleanQuery}%,State.ilike.%${cleanQuery}%,City.ilike.%${cleanQuery}%,temples_and_spots.ilike.%${cleanQuery}%,famous_markets.ilike.%${cleanQuery}%`);

    if (!error && data && data.length > 0) {
      combinedResults = [...data];
    }

    // 2. Fetch from Wikipedia Net API
    const apiResult = await fetchTourismAndLocationData(cleanQuery);
    if (apiResult) {
      combinedResults.push(apiResult);
    }

    // 3. Deduplicate results by Name so nothing shows double/triple
    const uniqueResults = Array.from(
      new Map(combinedResults.map(item => [item.Name?.trim().toLowerCase(), item])).values()
    );

    setResults(uniqueResults);
    setLoading(false);
  };

  const handleTabChange = (cardIdx: number, tabName: string) => {
    setActiveTab(prev => ({ ...prev, [cardIdx]: tabName }));
  };

  return (
    <div className="min-h-screen bg-slate-100 text-slate-800 flex flex-col font-sans pb-24 selection:bg-orange-500 selection:text-white">
      
      {/* Top Banner */}
      <div className="bg-[#0F2C59] text-amber-300 text-xs py-2 px-4 shadow-inner">
        <div className="max-w-4xl mx-auto flex justify-between items-center font-semibold">
          <span className="truncate">🏛️ InBharat Tourism & Nearby Spots Discovery Hub</span>
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

      {/* Main Navbar */}
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
          + Add Place
        </button>
      </header>

      {/* Hero Search Section */}
      <section className="bg-gradient-to-b from-[#0F2C59] via-[#143B73] to-slate-900 text-white p-4 pt-8 pb-10 max-w-4xl mx-auto w-full relative overflow-hidden">
        <div className="text-center mb-6 relative z-10">
          <span className="inline-flex items-center gap-1.5 bg-orange-500/20 text-orange-300 border border-orange-500/30 text-[10px] font-extrabold px-3 py-1 rounded-full mb-3 uppercase tracking-wider">
            🌍 Explore Cities, Monuments & Nearby Tourist Attractions
          </span>
          <h2 className="text-2xl sm:text-4xl font-black tracking-tight leading-tight mb-2">
            Discover India's Best Heritage & Spots
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 max-w-lg mx-auto">
            Search any city to instantly view unique sightseeing, monuments and local culture!
          </p>
        </div>

        <form onSubmit={(e) => handleSearch(undefined, e)} className="relative max-w-2xl mx-auto z-10">
          <div className="flex bg-white rounded-2xl p-1.5 shadow-2xl border-2 border-orange-500">
            <span className="flex items-center pl-3 text-slate-400 text-base">🔍</span>
            <input
              type="text"
              placeholder="Search city or tourist destination (e.g. Jaipur, Ujjain, Tonk)..."
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
          {['Jaipur', 'Ujjain', 'Tonk', 'Varanasi', 'Agra', 'Jodhpur', 'Udaipur'].map(city => (
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

      {/* Results Section */}
      <main className="p-4 max-w-3xl mx-auto w-full flex-1 -mt-4 relative z-20">
        {loading && (
          <div className="text-center py-16 bg-white rounded-3xl shadow-md border border-slate-200">
            <div className="w-10 h-10 border-4 border-orange-500 border-t-transparent rounded-full animate-spin mx-auto mb-3"></div>
            <p className="text-xs text-slate-600 font-bold">Scanning Tourism & Nearby Attractions...</p>
          </div>
        )}

        {!loading && results.length > 0 && (
          <div className="space-y-6">
            <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">
              Showing {results.length} Unique Destination Record(s)
            </p>
            {results.map((item, idx) => {
              const currentTab = activeTab[idx] || 'tourism';

              return (
                <div key={idx} className="bg-white border border-slate-200 rounded-3xl overflow-hidden shadow-lg transition hover:shadow-xl">
                  
                  {item.image_url ? (
                    <div className="relative h-52 bg-slate-900 overflow-hidden">
                      <img src={item.image_url} alt={item.Name || 'Destination'} className="w-full h-full object-cover opacity-90" />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent"></div>
                      <div className="absolute top-3 left-3">
                        <span className="bg-orange-500 text-white font-extrabold text-[10px] px-3 py-1 rounded-full shadow-md">
                          ⭐ TOP TOURIST SPOT
                        </span>
                      </div>
                      <div className="absolute bottom-3 left-3 right-3 text-white">
                        <h3 className="text-2xl font-black tracking-tight">{item.Name || item.City}</h3>
                        <p className="text-xs text-amber-200 font-semibold mt-0.5">📍 {item.State}</p>
                      </div>
                    </div>
                  ) : (
                    <div className="relative h-40 bg-gradient-to-r from-[#0F2C59] via-[#143B73] to-slate-900 p-5 flex flex-col justify-end text-white">
                      <span className="bg-orange-500/20 text-orange-300 border border-orange-500/30 text-[10px] font-extrabold px-2.5 py-0.5 rounded-full w-fit mb-1">
                        🏛️ Heritage Destination
                      </span>
                      <h3 className="text-2xl font-black tracking-tight">{item.Name || item.City}</h3>
                      <p className="text-xs text-amber-200 font-semibold">📍 InBharat Tourism Radar</p>
                    </div>
                  )}

                  {/* Tabs */}
                  <div className="flex border-b border-slate-200 bg-slate-50 text-[11px] font-bold text-slate-500 overflow-x-auto no-scrollbar">
                    {[
                      { key: 'tourism', label: '🏛️ Nearby Sightseeing' },
                      { key: 'overview', label: '📌 Overview & History' },
                      { key: 'market', label: '🛍️ Markets & Food' },
                      { key: 'emergency', label: '🚑 Travel Help & Police' },
                    ].map(tab => (
                      <button
                        key={tab.key}
                        onClick={() => handleTabChange(idx, tab.key)}
                        className={`flex-1 py-3 px-4 whitespace-nowrap border-b-2 transition ${
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
                    {currentTab === 'tourism' && (
                      <div className="space-y-3">
                        <div className="bg-amber-50 p-4 rounded-2xl border border-amber-200">
                          <strong className="text-amber-900 block font-bold mb-1.5 text-sm">🎯 Aas-Paas Ki Ghumne Ki Jagah (Nearby Spots):</strong>
                          <p className="leading-relaxed text-slate-800 whitespace-pre-line">{item.temples_and_spots}</p>
                        </div>
                        <div className="bg-slate-50 p-3.5 rounded-2xl border border-slate-200">
                          <strong className="text-[#0F2C59] block mb-1 font-bold">🚗 Route & Transport:</strong>
                          <p className="leading-relaxed">{item.route_transport}</p>
                        </div>
                      </div>
                    )}

                    {currentTab === 'overview' && (
                      <div className="space-y-3">
                        <div className="bg-slate-50 p-3.5 rounded-2xl border border-slate-200">
                          <strong className="text-[#0F2C59] block mb-1 font-bold">📜 Destination History & Profile:</strong>
                          <p className="leading-relaxed">{item.history || item.geography_politics}</p>
                        </div>
                      </div>
                    )}

                    {currentTab === 'market' && (
                      <div className="space-y-3">
                        <div className="bg-slate-50 p-3.5 rounded-2xl border border-slate-200">
                          <strong className="text-[#0F2C59] block mb-1 font-bold">🍲 Famous Food & Shopping Markets:</strong>
                          <p className="leading-relaxed mb-2">🛍️ <strong>Markets:</strong> {item.famous_markets}</p>
                          <p className="leading-relaxed">🍛 <strong>Special Food:</strong> {item.famous_food}</p>
                        </div>
                      </div>
                    )}

                    {currentTab === 'emergency' && (
                      <div className="space-y-3">
                        <div className="bg-rose-50 p-3.5 rounded-2xl border border-rose-200">
                          <strong className="text-rose-900 block mb-1 font-bold">🚑 Tourist Helplines & Emergency:</strong>
                          <p className="leading-relaxed text-slate-800">{item.emergency_services}</p>
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
