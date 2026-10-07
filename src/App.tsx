import React, { useState } from 'react';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';
const supabase = createClient(supabaseUrl, supabaseAnonKey);

export default function App() {
  const [searchTerm, setSearchTerm] = useState('');
  const [results, setResults] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [searched, setSearched] = useState(false);
  const [activeTab, setActiveTab] = useState<Record<number, string>>({});

  // Modals
  const [showAddModal, setShowAddModal] = useState(false);
  const [showVendorModal, setShowVendorModal] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  // Form States
  const [formData, setFormData] = useState({
    Name: '', State: '', City: '', Type: '', Zone: '',
    geography_politics: '', history: '', famous_personalities: '',
    culture: '', famous_food: '', famous_markets: '',
    temples_and_spots: '', route_transport: '',
  });

  const [vendorData, setVendorData] = useState({
    businessName: '', ownerName: '', phone: '', city: ''
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
      .or(`Name.ilike.%${query}%,State.ilike.%${query}%,City.ilike.%${query}%`);

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

  return (
    <div className="min-h-screen bg-[#0b0f17] text-slate-100 flex flex-col font-sans pb-24 selection:bg-amber-500 selection:text-black">
      
      {/* Glow Backdrop Effects */}
      <div className="fixed top-0 left-1/2 -translate-x-1/2 w-full max-w-lg h-96 bg-gradient-to-b from-amber-500/10 via-orange-600/5 to-transparent blur-3xl pointer-events-none -z-10"></div>

      {/* Top Header */}
      <header className="sticky top-0 z-40 bg-[#0b0f17]/85 backdrop-blur-xl border-b border-white/10 px-4 py-3 flex justify-between items-center shadow-2xl">
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-amber-500 via-orange-500 to-rose-500 flex items-center justify-center text-white font-black text-lg shadow-lg shadow-amber-500/25">
            🇮🇳
          </div>
          <div>
            <h1 className="text-lg font-black tracking-wide bg-gradient-to-r from-amber-200 via-orange-300 to-amber-500 bg-clip-text text-transparent leading-none">
              InBharat
            </h1>
            <span className="text-[9px] text-amber-400/80 font-bold uppercase tracking-widest">
              Super App
            </span>
          </div>
        </div>

        <div className="flex gap-2">
          <button
            onClick={() => setShowAddModal(true)}
            className="bg-slate-900/80 hover:bg-slate-800 text-slate-300 text-xs font-semibold px-3 py-1.5 rounded-xl border border-white/10 transition active:scale-95"
          >
            + Add Spot
          </button>
          <button
            onClick={() => setShowVendorModal(true)}
            className="bg-gradient-to-r from-amber-500 via-orange-500 to-rose-500 text-white text-xs font-bold px-3 py-1.5 rounded-xl shadow-lg shadow-orange-500/20 transition active:scale-95"
          >
            Business
          </button>
        </div>
      </header>

      {/* Hero Search Section */}
      <section className="p-4 pt-6 max-w-3xl mx-auto w-full">
        <div className="text-center mb-5">
          <span className="inline-block bg-amber-500/10 border border-amber-500/20 text-amber-300 text-[10px] font-extrabold px-3 py-1 rounded-full mb-2 uppercase tracking-wider">
            ✨ India's Tourism & Cultural Super-App
          </span>
          <h2 className="text-2xl font-black text-white tracking-tight">
            Explore Heritage, Food & Markets
          </h2>
        </div>

        <form onSubmit={(e) => handleSearch(undefined, e)} className="relative group">
          <div className="absolute -inset-0.5 bg-gradient-to-r from-amber-500 via-orange-500 to-rose-500 rounded-2xl blur opacity-30 group-hover:opacity-60 transition duration-300"></div>
          <div className="relative flex bg-[#131926] border border-white/10 rounded-2xl p-1.5">
            <input
              type="text"
              placeholder="Search city, state, or spot (e.g. Jaipur, Tonk)..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="flex-1 bg-transparent px-3 py-2.5 text-xs text-white placeholder-slate-500 outline-none font-medium"
            />
            <button
              type="submit"
              disabled={loading}
              className="bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white font-black text-xs px-5 py-2.5 rounded-xl transition shadow-md disabled:opacity-50"
            >
              {loading ? '...' : 'Explore'}
            </button>
          </div>
        </form>

        {/* Quick Filter Chips */}
        <div className="flex gap-2 overflow-x-auto mt-4 no-scrollbar pb-1 text-[11px]">
          {['Jaipur', 'Tonk', 'Agra', 'Amer', 'Varanasi', 'Udaipur'].map(city => (
            <button
              key={city}
              type="button"
              onClick={() => handleSearch(city)}
              className="bg-slate-900/80 hover:bg-amber-500/10 text-slate-300 hover:text-amber-300 px-3 py-1 rounded-full border border-white/10 whitespace-nowrap active:scale-95 transition"
            >
              📍 {city}
            </button>
          ))}
        </div>
      </section>

      {/* Main Content Area */}
      <main className="p-4 max-w-3xl mx-auto w-full flex-1">
        {loading && (
          <div className="text-center py-16">
            <div className="w-9 h-9 border-3 border-amber-500 border-t-transparent rounded-full animate-spin mx-auto mb-3"></div>
            <p className="text-xs text-slate-400 font-medium">Fetching InBharat verified details...</p>
          </div>
        )}

        {!loading && searched && results.length === 0 && (
          <div className="bg-[#131926] border border-white/10 p-8 rounded-3xl text-center my-6 shadow-2xl">
            <span className="text-4xl block mb-2">🔍</span>
            <p className="text-xs text-slate-400 mb-4 font-medium">No details found for "{searchTerm}". Be the first to add it!</p>
            <button
              onClick={() => setShowAddModal(true)}
              className="bg-gradient-to-r from-amber-500 to-orange-500 text-white text-xs font-bold px-5 py-2.5 rounded-xl shadow-lg"
            >
              + Add {searchTerm} Now
            </button>
          </div>
        )}

        {!loading && results.length > 0 && (
          <div className="space-y-6">
            {results.map((item, idx) => {
              const currentTab = activeTab[idx] || 'overview';

              return (
                <div key={idx} className="bg-[#131926]/90 border border-white/10 rounded-3xl overflow-hidden shadow-2xl backdrop-blur-xl transition hover:border-white/20">
                  
                  {/* Card Header */}
                  <div className="p-5 border-b border-white/10 flex justify-between items-start bg-gradient-to-r from-slate-900/80 to-transparent">
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="text-xl font-black text-white">{item.Name || 'Unnamed Spot'}</h3>
                        <span className="text-[10px] bg-emerald-500/20 border border-emerald-500/30 text-emerald-400 px-2 py-0.5 rounded-full font-bold">
                          ✓ VERIFIED
                        </span>
                      </div>
                      <p className="text-xs text-slate-400 mt-1 font-medium">
                        📍 {item.City ? `${item.City}, ` : ''}{item.State}
                      </p>
                    </div>
                    {item.Type && (
                      <span className="text-[10px] bg-amber-500/10 text-amber-300 font-bold px-3 py-1 rounded-full border border-amber-500/20">
                        {item.Type}
                      </span>
                    )}
                  </div>

                  {/* Commercial Options Strip */}
                  <div className="bg-[#0b0f17]/80 px-5 py-2.5 border-b border-white/5 flex gap-2 overflow-x-auto text-[11px] no-scrollbar">
                    <a 
                      href={`https://www.makemytrip.com/hotels/${item.City || item.Name}-hotels.html`} 
                      target="_blank" rel="noreferrer"
                      className="bg-amber-500/10 hover:bg-amber-500/20 text-amber-300 border border-amber-500/30 px-3 py-1 rounded-xl font-bold whitespace-nowrap transition"
                    >
                      🏨 Book Hotel
                    </a>
                    <a 
                      href={`https://www.redbus.in/bus-tickets/${item.City || item.Name}`} 
                      target="_blank" rel="noreferrer"
                      className="bg-rose-500/10 hover:bg-rose-500/20 text-rose-300 border border-rose-500/30 px-3 py-1 rounded-xl font-bold whitespace-nowrap transition"
                    >
                      🚌 Book Bus
                    </a>
                    <button 
                      onClick={() => alert(`InBharat Verified Guide Helpline: +91-9876543210`)}
                      className="bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold px-3 py-1 rounded-xl whitespace-nowrap shadow-md transition"
                    >
                      🚩 Hire Local Guide
                    </button>
                  </div>

                  {/* Tab Navigation Buttons */}
                  <div className="flex border-b border-white/10 bg-[#0b0f17]/40 text-[11px] font-bold text-slate-400 overflow-x-auto no-scrollbar">
                    {[
                      { key: 'overview', label: '📌 Overview' },
                      { key: 'history', label: '📜 History' },
                      { key: 'culture', label: '🎨 Culture & Food' },
                      { key: 'travel', label: '🛍️ Market & Routes' },
                    ].map(tab => (
                      <button
                        key={tab.key}
                        onClick={() => handleTabChange(idx, tab.key)}
                        className={`flex-1 py-3 px-3 whitespace-nowrap border-b-2 transition ${
                          currentTab === tab.key
                            ? 'border-amber-500 text-amber-300 bg-amber-500/10 font-black'
                            : 'border-transparent text-slate-400 hover:text-slate-200'
                        }`}
                      >
                        {tab.label}
                      </button>
                    ))}
                  </div>

                  {/* Tab Contents */}
                  <div className="p-5 text-xs text-slate-300 space-y-3">
                    {currentTab === 'overview' && (
                      <div className="space-y-3">
                        <div className="flex justify-between bg-[#0b0f17]/60 p-3 rounded-2xl border border-white/5">
                          <span>Est. Year: <strong className="text-white">{item['Establishment Year'] || 'Historical'}</strong></span>
                          <span>Rating: <strong className="text-amber-400">⭐ {item['Google review rating'] || '4.8'}</strong></span>
                        </div>
                        <div className="bg-[#0b0f17]/60 p-3.5 rounded-2xl border border-white/5">
                          <strong className="text-amber-400 block mb-1 font-bold">🗺️ Geography & Politics:</strong>
                          <p className="leading-relaxed text-slate-300">{item.geography_politics || 'Information updating soon.'}</p>
                        </div>
                      </div>
                    )}

                    {currentTab === 'history' && (
                      <div className="space-y-3">
                        <div className="bg-[#0b0f17]/60 p-3.5 rounded-2xl border border-white/5">
                          <strong className="text-amber-400 block mb-1 font-bold">📜 History (Itihas):</strong>
                          <p className="leading-relaxed text-slate-300">{item.history || 'Historical details updating soon.'}</p>
                        </div>
                        <div className="bg-[#0b0f17]/60 p-3.5
