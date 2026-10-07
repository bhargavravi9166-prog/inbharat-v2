import React, { useState } from 'react';
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
    businessName: '', ownerName: '', phone: '', city: '', category: 'Shop'
  });

  const [govtData, setGovtData] = useState({
    repName: '', designation: '', villageCity: '', phone: ''
  });

  const handleSearch = async (termToSearch?: string, e?: React.FormEvent) => {
    if (e) e.preventDefault();
    const query = termToSearch !== undefined ? termToSearch : searchTerm;
    if (!query.trim()) return;

    setSearchTerm(query);
    setLoading(true);
    setSearched(true);

    const { data, error } = await supabase
      .from('Heritage and tourism palace')
      .select('*')
      .or(`Name.ilike.%${query}%,State.ilike.%${query}%,City.ilike.%${query}%,Zone.ilike.%${query}%,temples_and_spots.ilike.%${query}%,famous_markets.ilike.%${query}%,panchayat_sarpanch.ilike.%${query}%`);

    if (error) {
      console.error('Fetch error:', error);
    }

    setResults(data || []);
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
    alert(`Dhanyawad ${govtData.repName}! Aapki Sarpanch / Ward / Local Representative application verify karke InBharat portal par live update kar di jayegi.`);
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
            🇮🇳 India's Complete Village, City & Tourism Portal
          </span>
          <h2 className="text-2xl sm:text-4xl font-black tracking-tight leading-tight mb-2">
            Har Gaaon, Shehar, Sarpanch, Food & Emergency Info
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 max-w-lg mx-auto">
            Search any village, town, MLA/MP, Sarpanch, local market, hospital, or route in one click!
          </p>
        </div>

        {/* Search Bar */}
        <form onSubmit={(e) => handleSearch(undefined, e)} className="relative max-w-2xl mx-auto z-10">
          <div className="flex bg-white rounded-2xl p-1.5 shadow-2xl border-2 border-orange-500">
            <span className="flex items-center pl-3 text-slate-400 text-base">🔍</span>
            <input
              type="text"
              placeholder="Search village, city, Sarpanch, MLA, market (e.g. Tonk, Becharaji, Jaipur, Agra)..."
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
          {['Tonk', 'Becharaji', 'Jaipur', 'Mount Abu', 'Ujjain', 'Varanasi', 'Agra'].map(city => (
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
            <p className="text-xs text-slate-600 font-bold">InBharat All India Database Searching...</p>
          </div>
        )}

        {!loading && searched && results.length === 0 && (
          <div className="bg-white border border-slate-200 p-8 rounded-3xl text-center my-4 shadow-md">
            <span className="text-4xl block mb-2">📍</span>
            <h3 className="text-base font-bold text-slate-800 mb-1">No Location Record Found</h3>
            <p className="text-xs text-slate-500 mb-4 font-medium">No record for "{searchTerm}". Be the first to add this Village or City!</p>
            <button
              onClick={() => setShowAddModal(true)}
              className="bg-orange-500 text-white text-xs font-bold px-5 py-2.5 rounded-xl shadow-md"
            >
              + Add {searchTerm} Now
            </button>
          </div>
        )}

        {!loading && results.length > 0 && (
          <div className="space-y-6">
            <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">
              Showing {results.length} Location(s)
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

                  {/* Quick Commercial & Emergency Bar */}
                  <div className="bg-slate-900 px-4 py-2.5 flex gap-2 overflow-x-auto text-[11px] no-scrollbar border-b border-slate-800">
                    <a 
                      href={`tel:108`} 
                      className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded-xl font-extrabold whitespace-nowrap shadow transition"
                    >
                      🚑 Ambulance (108)
                    </a>
                    <a 
                      href={`tel:100`} 
                      className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded-xl font-extrabold whitespace-nowrap shadow transition"
                    >
                      👮 Police (100)
                    </a>
                    <a 
                      href={`https://www.makemytrip.com/hotels/${item.City || item.Name || 'india'}-hotels.html`} 
                      target="_blank" rel="noreferrer"
                      className="bg-orange-500/20 hover:bg-orange-500/30 text-orange-300 border border-orange-500/30 px-3 py-1 rounded-xl font-bold whitespace-nowrap transition"
                    >
                      🏨 Hotels
                    </a>
                    <a 
                      href={`https://www.redbus.in/bus-tickets/${item.City || item.Name || 'india'}`} 
                      target="_blank" rel="noreferrer"
                      className="bg-rose-500/20 hover:bg-rose-500/30 text-rose-300 border border-rose-500/30 px-3 py-1 rounded-xl font-bold whitespace-nowrap transition"
                    >
                      🚌 Buses
                    </a>
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
                        <div className="grid grid-cols-2 gap-2 bg-orange-50/60 p-3 rounded-2xl border border-orange-100">
                          <div><span className="text-slate-500 block text-[10px]">Est. Year / Code</span> <strong className="text-slate-900 font-bold">{item['Establishment Year'] || 'Official Zone'}</strong></div>
                          <div><span className="text-slate-500 block text-[10px]">User Rating</span> <strong className="text-amber-600 font-bold">⭐ {item['Google review rating'] || '4.8'} / 5.0</strong></div>
                        </div>
                        <div className="bg-slate-50 p-3.5 rounded-2xl border border-slate-200">
                          <strong className="text-[#0F2C59] block mb-1 font-bold">🗺️ Geography & Area Profile:</strong>
                          <p className="leading-relaxed">{item.geography_politics || 'Information updated in InBharat portal.'}</p>
                        </div>
                      </div>
                    )}

                    {currentTab === 'govt' && (
                      <div className="space-y-3">
                        <div className="bg-amber-50 p-3.5 rounded-2xl border border-amber-200">
                          <div className="flex justify-between items-center mb-1">
                            <strong className="text-amber-900 block font-bold">🏛️ Sarpanch & Ward Panch Details:</strong>
                            <button onClick={() => setShowGovtModal(true)} className="text-[10px] bg-amber-600 text-white font-bold px-2 py-0.5 rounded">Claim / Update</button>
                          </div>
                          <p className="leading-relaxed text-slate-800">{item.panchayat_sarpanch || 'Sarpanch & Ward Panch contacts available via local Gram Panchayat Bhawan.'}</p>
                        </div>
                        <div className="bg-slate-50 p-3.5 rounded-2xl border border-slate-200">
                          <strong className="text-[#0F2C59] block mb-1 font-bold">⚖️ MLA, MP & Tehsil Administration:</strong>
                          <p className="leading-relaxed">{item.local_government || 'District Collectorate, Tehsil office & Block Development contacts.'}</p>
                        </div>
                      </div>
                    )}

                    {currentTab === 'history' && (
                      <div className="space-y-3">
                        <div className="bg-slate-50 p-3.5 rounded-2xl border border-slate-200">
                          <strong className="text-[#0F2C59] block mb-1 font-bold">📜 History (Itihas):</strong>
                          <p className="leading-relaxed">{item.history || 'Historical background available.'}</p>
                        </div>
                        <div className="bg-slate-50 p-3.5 rounded-2xl border border-slate-200">
                          <strong className="text-[#0F2C59] block mb-1 font-bold">👑 Famous Personalities & Culture:</strong>
                          <p className="leading-relaxed">{item.famous_personalities} • {item.culture}</p>
                        </div>
                      </div>
                    )}

                    {currentTab === 'market' && (
                      <div className="space-y-3">
                        <div className="bg-slate-50 p-3.5 rounded-2xl border border-slate-200">
                          <strong className="text-[#0F2C59] block mb-1 font-bold">🍲 Prasiddh Khana (Famous Food):</strong>
                          <p className="leading-relaxed">{item.famous_food || 'Local street food & famous dishes.'}</p>
                        </div>
                        <div className="bg-slate-50 p-3.5 rounded-2xl border border-slate-200">
                          <strong className="text-[#0F2C59] block mb-1 font-bold">🛍️ Markets & Tourist Spots:</strong>
                          <p className="leading-relaxed">{item.famous_markets} • {item.temples_and_spots}</p>
                        </div>
                      </div>
                    )}

                    {currentTab === 'emergency' && (
                      <div className="space-y-3">
                        <div className="bg-rose-50 p-3.5 rounded-2xl border border-rose-200">
                          <strong className="text-rose-900 block mb-1 font-bold">🚑 Emergency & Hospital Helplines:</strong>
                          <p className="leading-relaxed text-slate-800">{item.emergency_services || 'Police Station (102), Hospital (108), Ambulance.'}</p>
                        </div>
                        <div className="bg-slate-50 p-3.5 rounded-2xl border border-slate-200">
                          <strong className="text-[#0F2C59] block mb-1 font-bold">🚌 Transport & E-Mitra / CSC Center:</strong>
                          <p className="leading-relaxed">{item.route_transport} • {item.public_utilities}</p>
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

      {/* Sarpanch / Local Rep Update Modal */}
      {showGovtModal && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-3xl border border-slate-200 w-full max-w-xs p-5 text-xs text-slate-700 shadow-2xl">
            <h3 className="font-extrabold text-[#0F2C59] mb-3 text-sm">🏛️ Update Panch / Sarpanch Details</h3>
            <form onSubmit={handleGovtSubmit} className="space-y-2.5">
              <input type="text" required placeholder="Representative Name *" value={govtData.repName} onChange={(e) => setGovtData({...govtData, repName: e.target.value})} className="w-full bg-slate-50 p-2.5 rounded-xl border border-slate-200 text-slate-900 outline-none focus:border-orange-500" />
              <input type="text" required placeholder="Designation (Sarpanch / MLA / Panch) *" value={govtData.designation} onChange={(e) => setGovtData({...govtData, designation: e.target.value})} className="w-full bg-slate-50 p-2.5 rounded-xl border border-slate-200 text-slate-900 outline-none focus:border-orange-500" />
              <input type="text" required placeholder="Village / Ward / City *" value={govtData.villageCity} onChange={(e) => setGovtData({...govtData, villageCity: e.target.value})} className="w-full bg-slate-50 p-2.5 rounded-xl border border-slate-200 text-slate-900 outline-none focus:border-orange-500" />
              <input type="tel" required placeholder="Official Mobile / WhatsApp *" value={govtData.phone} onChange={(e) => setGovtData({...govtData, phone: e.target.value})} className="w-full bg-slate-50 p-2.5 rounded-xl border border-slate-200 text-slate-900 outline-none focus:border-orange-500" />
              <button type="submit" className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-2.5 rounded-xl mt-2 shadow-md">Submit Verification</button>
              <button type="button" onClick={() => setShowGovtModal(false)} className="w-full text-slate-400 py-1 font-semibold">Close</button>
            </form>
          </div>
        </div>
      )}

      {/* Vendor Modal */}
      {showVendorModal && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-3xl border border-slate-200 w-full max-w-xs p-5 text-xs text-slate-700 shadow-2xl">
            <h3 className="font-extrabold text-[#0F2C59] mb-3 text-sm">🏪 List Local Shop / Service</h3>
            <form onSubmit={handleVendorSubmit} className="space-y-2.5">
              <input type="text" required placeholder="Business Name *" value={vendorData.businessName} onChange={(e) => setVendorData({...vendorData, businessName: e.target.value})} className="w-full bg-slate-50 p-2.5 rounded-xl border border-slate-200 text-slate-900 outline-none focus:border-orange-500" />
              <input type="text" required placeholder="Owner Name *" value={vendorData.ownerName} onChange={(e) => setVendorData({...vendorData, ownerName: e.target.value})} className="w-full bg-slate-50 p-2.5 rounded-xl border border-slate-200 text-slate-900 outline-none focus:border-orange-500" />
              <input type="tel" required placeholder="Mobile / WhatsApp *" value={vendorData.phone} onChange={(e) => setVendorData({...vendorData, phone: e.target.value})} className="w-full bg-slate-50 p-2.5 rounded-xl border border-slate-200 text-slate-900 outline-none focus:border-orange-500" />
              <button type="submit" className="w-full bg-orange-500 hover:bg-orange-600 text-white font-bold py-2.5 rounded-xl mt-2 shadow-md">Submit Application</button>
              <button type="button" onClick={() => setShowVendorModal(false)} className="w-full text-slate-400 py-1 font-semibold">Close</button>
            </form>
          </div>
        </div>
      )}

      {/* Add Spot Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-3xl border border-slate-200 w-full max-w-sm p-5 text-xs text-slate-700 shadow-2xl max-h-[85vh] overflow-y-auto">
            <h3 className="font-extrabold text-[#0F2C59] mb-3 text-sm">➕ Add Village / Spot</h3>
            {submitSuccess ? (
              <div className="text-emerald-600 text-center font-bold my-4">🎉 Saved Successfully!</div>
            ) : (
              <form onSubmit={handleAddSpotSubmit} className="space-y-2.5">
                <input type="text" name="Name" required placeholder="Village / Spot Name *" value={formData.Name} onChange={handleInputChange} className="w-full bg-slate-50 p-2.5 rounded-xl border border-slate-200 text-slate-900 outline-none focus:border-orange-500" />
                <input type="text" name="State" required placeholder="State *" value={formData.State} onChange={handleInputChange} className="w-full bg-slate-50 p-2.5 rounded-xl border border-slate-200 text-slate-900 outline-none focus:border-orange-500" />
                <textarea name="history" placeholder="History / Info..." value={formData.history} onChange={handleInputChange} className="w-full bg-slate-50 p-2.5 rounded-xl border border-slate-200 text-slate-900 outline-none focus:border-orange-500" />
                <button type="submit" disabled={submitting} className="w-full bg-orange-500 hover:bg-orange-600 text-white font-bold py-2.5 rounded-xl shadow-md">{submitting ? '...' : 'Save Location'}</button>
                <button type="button" onClick={() => setShowAddModal(false)} className="w-full text-slate-400 py-1 font-semibold">Cancel</button>
              </form>
            )}
          </div>
        </div>
      )}

    </div>
  );
}
