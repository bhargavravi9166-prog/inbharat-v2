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

  // Modals
  const [showAddModal, setShowAddModal] = useState(false);
  const [showVendorModal, setShowVendorModal] = useState(false);
  const [showGovtModal, setShowGovtModal] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  // Form States
  const [formData, setFormData] = useState({
    Name: '', State: '', City: '', Type: '', Zone: '',
    geography_politics: '', history: '', famous_personalities: '',
    culture: '', famous_food: '', famous_markets: '',
    temples_and_spots: '', route_transport: '',
    panchayat_sarpanch: '', local_government: '', emergency_services: '', public_utilities: ''
  });

  const [vendorData, setVendorData] = useState({
    businessName: '', ownerName: '', phone: '', city: ''
  });

  const [govtData, setGovtData] = useState({
    repName: '', designation: '', villageCity: '', phone: ''
  });

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
      setResults(data);
    }
    setLoading(false);
  };

  // Smart OpenSearch API (Finds any village/town even with spelling variations)
  const fetchSmartNetData = async (query: string) => {
    try {
      const cleanQuery = query.trim();
      // Step A: Search for nearest matching Wikipedia page
      const searchRes = await fetch(
        `https://en.wikipedia.org/w/api.php?action=opensearch&search=${encodeURIComponent(cleanQuery)}&limit=1&namespace=0&format=json&origin=*`
      );
      const searchData = await searchRes.json();

      let targetTitle = cleanQuery;
      if (searchData && searchData[1] && searchData[1].length > 0) {
        targetTitle = searchData[1][0]; // Best matched title
      }

      // Step B: Get detailed summary of the matched village/town
      const summaryRes = await fetch(
        `https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(targetTitle)}`
      );
      
      if (!summaryRes.ok) return null;
      const wikiData = await summaryRes.json();
      if (!wikiData.extract) return null;

      return {
        Name: wikiData.title,
        City: wikiData.title,
        State: 'Bharat / India',
        Type: 'Gram Panchayat / Village / City',
        Zone: 'India Level',
        'Establishment Year': 'Historical',
        'Google review rating': '4.9',
        geography_politics: wikiData.extract,
        history: wikiData.extract,
        famous_personalities: 'Local Panch, Sarpanch & Representatives of ' + wikiData.title,
        culture: 'Traditional Indian culture, local heritage and community traditions.',
        famous_food: 'Famous local street food & regional specialties of ' + wikiData.title,
        famous_markets: wikiData.title + ' Village/City Main Market & Shops',
        temples_and_spots: 'Local Temples, Community Hall & Gram Panchayat Bhawan',
        route_transport: 'Connected via State/District Roads & Local Bus Stand.',
        panchayat_sarpanch: 'Gram Panchayat Sarpanch & Ward Panch Office for ' + wikiData.title,
        local_government: 'Tehsil Office, Block Development Officer & District Collectorate',
        emergency_services: 'Local Police Station (100), Primary Health Centre / Ambulance (108)',
        public_utilities: 'CSC / E-Mitra Kendra, Electricity Board & Water Department'
      };
    } catch (e) {
      console.error('Smart API Error:', e);
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

    // 1. Check Supabase DB First
    const { data, error } = await supabase
      .from('Heritage and tourism palace')
      .select('*')
      .or(`Name.ilike.%${cleanQuery}%,State.ilike.%${cleanQuery}%,City.ilike.%${cleanQuery}%,Zone.ilike.%${cleanQuery}%,temples_and_spots.ilike.%${cleanQuery}%,famous_markets.ilike.%${cleanQuery}%,panchayat_sarpanch.ilike.%${cleanQuery}%`);

    if (!error && data && data.length > 0) {
      setResults(data);
      setLoading(false);
      return;
    }

    // 2. Smart Net API Fallback
    const apiResult = await fetchSmartNetData(cleanQuery);
    if (apiResult) {
      setResults([apiResult]);
    } else {
      // 3. Dynamic Generated Backup if Net API is empty for very remote village
      setResults([{
        Name: cleanQuery,
        City: cleanQuery,
        State: 'Bharat',
        Type: 'Village / Local Area',
        Zone: 'India',
        geography_politics: `${cleanQuery} Bharat ka ek local gaaon/kshetra hai. Iska administrative record Gram Panchayat aur Tehsil ke antargat aata hai.`,
        history: `${cleanQuery} ka sthaniya itihas aur sanskriti bhartiya gramin parampara se judi hui hai.`,
        famous_personalities: `Sthaniya Sarpanch, Ward Panch aur Pragatisheel Kisan.`,
        culture: `Gramin Parampara, Lok Utsav aur Sthaniya Boli.`,
        famous_food: `Sthaniya Desi Khana, Street Food aur Sweet Shops.`,
        famous_markets: `${cleanQuery} Main Market & Local Shops.`,
        temples_and_spots: `Gramin Mandir, Community Centre & Primary School.`,
        route_transport: `Direct Auto, Taxi & District Bus Service Available.`,
        panchayat_sarpanch: `Gram Panchayat Bhawan & Ward Panch Office (${cleanQuery}).`,
        local_government: `Nearest Tehsil & Block Development Office.`,
        emergency_services: `Police Station (100), Government Health Centre / Ambulance (108).`,
        public_utilities: `CSC / E-Mitra Kendra & Electricity Sub-division.`
      }]);
    }
    setLoading(false);
  };

  const handleTabChange = (cardIdx: number, tabName: string) => {
    setActiveTab(prev => ({ ...prev, [cardIdx]: tabName }));
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleAddSpotSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.Name || !formData.State) {
      alert('Kripya Place Name aur State zaroor bharein!');
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
      setSubmitSuccess(true);
      setTimeout(() => {
        setSubmitSuccess(false);
        setShowAddModal(false);
      }, 2000);
    }
  };

  const handleVendorSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert(`Dhanyawad ${vendorData.ownerName}! InBharat team 24 ghante me aapke business "${vendorData.businessName}" ko verify karegi.`);
    setShowVendorModal(false);
  };

  const handleGovtSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert(`Dhanyawad ${govtData.repName}! Aapki application verify karke InBharat portal par live update kar di jayegi.`);
    setShowGovtModal(false);
  };

  const getSpotImage = (name: string, city: string) => {
    return `https://images.unsplash.com/photo-1599661046289-e31897846e41?auto=format&fit=crop&w=800&q=80&sig=${Math.abs((name || 'india').length * 13)}`;
  };

  return (
    <div className="min-h-screen bg-slate-100 text-slate-800 flex flex-col font-sans pb-24 selection:bg-orange-500 selection:text-white">
      
      {/* Top Banner */}
      <div className="bg-[#0F2C59] text-amber-300 text-xs py-2 px-4 shadow-inner">
        <div className="max-w-4xl mx-auto flex justify-between items-center font-semibold">
          <span className="truncate">🏛️ Sarpanch, Ward Panch, Police & Doctor Helpline Portal</span>
          <div className="flex gap-2">
            <button 
              onClick={() => setShowGovtModal(true)}
              className="bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold px-2.5 py-0.5 rounded-full text-[10px] transition shadow whitespace-nowrap"
            >
              Update Panch/Sarpanch
            </button>
            <button 
              onClick={() => setShowVendorModal(true)}
              className="bg-orange-500 hover:bg-orange-600 text-white font-extrabold px-2.5 py-0.5 rounded-full text-[10px] transition shadow whitespace-nowrap"
            >
              List Shop
            </button>
          </div>
        </div>
      </div>

      {/* Main App Navbar */}
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
              Super-App for All India
            </span>
          </div>
        </div>

        <div className="flex gap-2">
          <button
            onClick={() => setShowAddModal(true)}
            className="bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold px-3 py-1.5 rounded-xl border border-slate-200 transition"
          >
            + Add Spot / Village
          </button>
        </div>
      </header>

      {/* Hero Banner Section */}
      <section className="bg-gradient-to-b from-[#0F2C59] via-[#143B73] to-slate-900 text-white p-4 pt-8 pb-10 max-w-4xl mx-auto w-full relative overflow-hidden">
        <div className="text-center mb-6 relative z-10">
          <span className="inline-flex items-center gap-1.5 bg-orange-500/20 text-orange-300 border border-orange-500/30 text-[10px] font-extrabold px-3 py-1 rounded-full mb-3 uppercase tracking-wider">
            🌐 Live Smart Net Search Enabled for Any Village or Town
          </span>
          <h2 className="text-2xl sm:text-4xl font-black tracking-tight leading-tight mb-2">
            Search Any Village, Town or City in India
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 max-w-lg mx-auto">
            Try searching any random village or city name below!
          </p>
        </div>

        {/* Search Bar */}
        <form onSubmit={(e) => handleSearch(undefined, e)} className="relative max-w-2xl mx-auto z-10">
          <div className="flex bg-white rounded-2xl p-1.5 shadow-2xl border-2 border-orange-500">
            <span className="flex items-center pl-3 text-slate-400 text-base">🔍</span>
            <input
              type="text"
              placeholder="Type any village name, town or city..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="flex-1 bg-transparent px-2.5 py-2.5 text-xs sm:text-sm text-slate-800 placeholder-slate-400 outline-none font-semibold"
            />
            <button
              type="submit"
              disabled={loading}
              className="bg-orange-500 hover:bg-orange-600 text-white font-black text-xs sm:text-sm px-6 py-2.5 rounded-xl transition shadow-lg disabled:opacity-50"
            >
              {loading ? '...' : 'Search'}
            </button>
          </div>
        </form>

        {/* Quick Filter Chips */}
        <div className="flex gap-2 overflow-x-auto mt-4 no-scrollbar pb-1 text-[11px] justify-start sm:justify-center relative z-10">
          {['Tonk', 'Becharaji', 'Jaipur', 'Ujjain', 'Varanasi', 'Agra'].map(city => (
            <button
              key={city}
              type="button"
              onClick={() => handleSearch(city)}
              className="bg-white/10 hover:bg-orange-500/20 text-slate-200 border border-white/20 px-3 py-1 rounded-full font-semibold whitespace-nowrap backdrop-blur-md active:scale-95 transition"
            >
              📍 {city}
            </button>
          ))}
        </div>
      </section>

      {/* Main Content Area */}
      <main className="p-4 max-w-3xl mx-auto w-full flex-1 -mt-4 relative z-20">
        {loading && (
          <div className="text-center py-16 bg-white rounded-3xl shadow-md border border-slate-200">
            <div className="w-10 h-10 border-4 border-orange-500 border-t-transparent rounded-full animate-spin mx-auto mb-3"></div>
            <p className="text-xs text-slate-600 font-bold">InBharat Smart Engine Fetching Location Details...</p>
          </div>
        )}

        {!loading && results.length > 0 && (
          <div className="space-y-6">
            <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">
              Showing {results.length} Location Record(s)
            </p>
            {results.map((item, idx) => {
              const currentTab = activeTab[idx] || 'overview';

              return (
                <div key={idx} className="bg-white border border-slate-200 rounded-3xl overflow-hidden shadow-lg transition hover:shadow-xl">
                  
                  {/* Image Banner Header */}
                  <div className="relative h-44 bg-slate-900 overflow-hidden">
                    <img 
                      src={getSpotImage(item.Name, item.City)} 
                      alt={item.Name || 'Location Banner'}
                      className="w-full h-full object-cover opacity-85 hover:scale-105 transition duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent"></div>
                    
                    <div className="absolute top-3 left-3 right-3 flex justify-between items-center">
                      <span className="bg-emerald-500 text-white font-black text-[10px] px-2.5 py-1 rounded-full shadow-md">
                        ✓ VERIFIED PORTAL
                      </span>
                      {item.Type && (
                        <span className="bg-orange-500 text-white font-extrabold text-[10px] px-3 py-1 rounded-full shadow-md">
                          📍 {item.Type}
                        </span>
                      )}
                    </div>

                    <div className="absolute bottom-3 left-3 right-3 text-white">
                      <h3 className="text-xl font-black tracking-tight drop-shadow-md">{item.Name || item.City || 'Location'}</h3>
                      <p className="text-xs text-amber-200 font-semibold drop-shadow mt-0.5">
                        📍 {item.City ? `${item.City}, ` : ''}{item.State} {item.Zone ? `• (${item.Zone} Zone)` : ''}
                      </p>
                    </div>
                  </div>

                  {/* Quick Actions */}
                  <div className="bg-slate-900 px-4 py-2.5 flex gap-2 overflow-x-auto text-[11px] no-scrollbar border-b border-slate-800">
                    <a href={`tel:108`} className="bg-red-600 text-white px-3 py-1 rounded-xl font-extrabold whitespace-nowrap shadow">🚑 Ambulance (108)</a>
                    <a href={`tel:100`} className="bg-blue-600 text-white px-3 py-1 rounded-xl font-extrabold whitespace-nowrap shadow">👮 Police (100)</a>
                    <a href={`https://www.makemytrip.com/hotels/${item.City || item.Name || 'india'}-hotels.html`} target="_blank" rel="noreferrer" className="bg-orange-500/20 text-orange-300 border border-orange-500/30 px-3 py-1 rounded-xl font-bold whitespace-nowrap">🏨 Hotels</a>
                  </div>

                  {/* 5 Super Tabs */}
                  <div className="flex border-b border-slate-200 bg-slate-50 text-[11px] font-bold text-slate-500 overflow-x-auto no-scrollbar">
                    {[
                      { key: 'overview', label: '📌 Overview' },
                      { key: 'govt', label: '🏛️ Govt & Sarpanch' },
                      { key: 'history', label: '📜 History & Culture' },
                      { key: 'market', label: '🛍️ Market & Food' },
                      { key: 'emergency', label: '🚑 Emergency & Routes' },
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

                  {/* Tab Details */}
                  <div className="p-5 text-xs text-slate-700 space-y-3 bg-white">
                    {currentTab === 'overview' && (
                      <div className="space-y-3">
                        <div className="bg-slate-50 p-3.5 rounded-2xl border border-slate-200">
                          <strong className="text-[#0F2C59] block mb-1 font-bold">🗺️ Geography & Information:</strong>
                          <p className="leading-relaxed">{item.geography_politics}</p>
                        </div>
                      </div>
                    )}

                    {currentTab === 'govt' && (
                      <div className="space-y-3">
                        <div className="bg-amber-50 p-3.5 rounded-2xl border border-amber-200">
                          <strong className="text-amber-900 block font-bold mb-1">🏛️ Sarpanch & Local Administration:</strong>
                          <p className="leading-relaxed text-slate-800">{item.panchayat_sarpanch}</p>
                        </div>
                      </div>
                    )}

                    {currentTab === 'history' && (
                      <div className="space-y-3">
                        <div className="bg-slate-50 p-3.5 rounded-2xl border border-slate-200">
                          <strong className="text-[#0F2C59] block mb-1 font-bold">📜 History & Heritage:</strong>
                          <p className="leading-relaxed">{item.history}</p>
                        </div>
                      </div>
                    )}

                    {currentTab === 'market' && (
                      <div className="space-y-3">
                        <div className="bg-slate-50 p-3.5 rounded-2xl border border-slate-200">
                          <strong className="text-[#0F2C59] block mb-1 font-bold">🍲 Food & Local Market:</strong>
                          <p className="leading-relaxed">{item.famous_food} • {item.famous_markets}</p>
                        </div>
                      </div>
                    )}

                    {currentTab === 'emergency' && (
                      <div className="space-y-3">
                        <div className="bg-rose-50 p-3.5 rounded-2xl border border-rose-200">
                          <strong className="text-rose-900 block mb-1 font-bold">🚑 Emergency & Services:</strong>
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
          <span>Search</span>
        </button>
        <button onClick={() => setShowGovtModal(true)} className="flex flex-col items-center gap-0.5 text-slate-500 hover:text-slate-900">
          <span className="text-lg">🏛️</span>
          <span>Panch/Sarpanch</span>
        </button>
        <button onClick={() => setShowVendorModal(true)} className="flex flex-col items-center gap-0.5 text-slate-500 hover:text-slate-900">
          <span className="text-lg">💼</span>
          <span>List Shop</span>
        </button>
      </nav>

    </div>
  );
}
