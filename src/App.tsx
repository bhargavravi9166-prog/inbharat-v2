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
  
  // Mobile Active Tab State per card (default: overview)
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
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans pb-20 select-none">
      
      {/* App Mobile Header */}
      <header className="sticky top-0 z-40 bg-slate-900/90 backdrop-blur-lg border-b border-slate-800 px-4 py-3 flex justify-between items-center shadow-lg">
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-orange-500 to-amber-400 flex items-center justify-center text-white font-black text-lg shadow-md shadow-orange-500/20">
            In
          </div>
          <div>
            <h1 className="text-lg font-black tracking-wide bg-gradient-to-r from-orange-400 to-amber-200 bg-clip-text text-transparent leading-none">
              InBharat
            </h1>
            <span className="text-[9px] text-slate-400 font-bold uppercase tracking-widest">
              Super App
            </span>
          </div>
        </div>

        <div className="flex gap-2">
          <button
            onClick={() => setShowAddModal(true)}
            className="bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold px-3 py-1.5 rounded-lg border border-slate-700"
          >
            + Add Spot
          </button>
          <button
            onClick={() => setShowVendorModal(true)}
            className="bg-gradient-to-r from-orange-500 to-amber-500 text-white text-xs font-bold px-3 py-1.5 rounded-lg shadow"
          >
            Business
          </button>
        </div>
      </header>

      {/* Hero Search Section */}
      <section className="p-4 bg-gradient-to-b from-slate-900 to-slate-950 border-b border-slate-800/80">
        <p className="text-xs font-semibold text-orange-400 mb-2">🇮🇳 Discover Places, Food, Culture & Markets</p>
        <form onSubmit={(e) => handleSearch(undefined, e)} className="flex gap-2">
          <input
            type="text"
            placeholder="Search city, state, or spot (e.g. Jaipur, Tonk)..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="flex-1 bg-slate-900 border border-slate-700 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-slate-500 outline-none focus:border-orange-500"
          />
          <button
            type="submit"
            disabled={loading}
            className="bg-orange-500 hover:bg-orange-600 text-white font-bold text-xs px-4 py-2.5 rounded-xl transition shadow-lg shadow-orange-500/20"
          >
            {loading ? '...' : 'Search'}
          </button>
        </form>

        {/* Quick Chips */}
        <div className="flex gap-1.5 overflow-x-auto mt-3 no-scrollbar pb-1 text-[11px]">
          {['Jaipur', 'Tonk', 'Agra', 'Amer', 'Varanasi', 'Udaipur'].map(city => (
            <button
              key={city}
              type="button"
              onClick={() => handleSearch(city)}
              className="bg-slate-800 text-slate-300 px-2.5 py-1 rounded-full border border-slate-700/80 whitespace-nowrap active:scale-95 transition"
            >
              {city}
            </button>
          ))}
        </div>
      </section>

      {/* Main App Content Area */}
      <main className="p-4 flex-1">
        {loading && (
          <div className="text-center py-12">
            <div className="w-8 h-8 border-3 border-orange-500 border-t-transparent rounded-full animate-spin mx-auto mb-3"></div>
            <p className="text-xs text-slate-400 font-medium">Loading InBharat data...</p>
          </div>
        )}

        {!loading && searched && results.length === 0 && (
          <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl text-center my-6">
            <span className="text-3xl block mb-2">🔍</span>
            <p className="text-xs text-slate-400 mb-4">No results for "{searchTerm}". Add this spot to InBharat!</p>
            <button
              onClick={() => setShowAddModal(true)}
              className="bg-orange-500 text-white text-xs font-bold px-4 py-2 rounded-xl"
            >
              + Add {searchTerm}
            </button>
          </div>
        )}

        {!loading && results.length > 0 && (
          <div className="space-y-5">
            {results.map((item, idx) => {
              const currentTab = activeTab[idx] || 'overview';

              return (
                <div key={idx} className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-xl">
                  {/* Card Header */}
                  <div className="p-4 border-b border-slate-800/80 flex justify-between items-start bg-slate-900/50">
                    <div>
                      <div className="flex items-center gap-1.5">
                        <h2 className="text-lg font-black text-white">{item.Name || 'Unnamed Spot'}</h2>
                        <span className="text-[10px] bg-emerald-500/20 text-emerald-400 px-1.5 py-0.2 rounded font-extrabold">✓</span>
                      </div>
                      <p className="text-xs text-slate-400 mt-0.5">
                        📍 {item.City ? `${item.City}, ` : ''}{item.State}
                      </p>
                    </div>
                    {item.Type && (
                      <span className="text-[10px] bg-orange-500/20 text-orange-300 font-bold px-2 py-0.5 rounded-full border border-orange-500/30">
                        {item.Type}
                      </span>
                    )}
                  </div>

                  {/* App Quick Action Strip */}
                  <div className="bg-slate-950 px-4 py-2 border-b border-slate-800 flex gap-2 overflow-x-auto text-[11px]">
                    <a 
                      href={`https://www.makemytrip.com/hotels/${item.City || item.Name}-hotels.html`} 
                      target="_blank" rel="noreferrer"
                      className="bg-slate-800 text-orange-300 border border-orange-500/30 px-2.5 py-1 rounded-lg font-semibold whitespace-nowrap"
                    >
                      🏨 Hotels
                    </a>
                    <a 
                      href={`https://www.redbus.in/bus-tickets/${item.City || item.Name}`} 
                      target="_blank" rel="noreferrer"
                      className="bg-slate-800 text-red-300 border border-red-500/30 px-2.5 py-1 rounded-lg font-semibold whitespace-nowrap"
                    >
                      🚌 Buses
                    </a>
                    <button 
                      onClick={() => alert(`InBharat Local Guide: Call +91-9876543210`)}
                      className="bg-emerald-600 text-white font-bold px-2.5 py-1 rounded-lg whitespace-nowrap"
                    >
                      🚩 Local Guide
                    </button>
                  </div>

                  {/* Mobile Tab Pills */}
                  <div className="flex border-b border-slate-800 bg-slate-950/40 text-[11px] font-bold text-slate-400 overflow-x-auto no-scrollbar">
                    {[
                      { key: 'overview', label: 'Overview' },
                      { key: 'history', label: 'History' },
                      { key: 'culture', label: 'Culture & Food' },
                      { key: 'travel', label: 'Market & Routes' },
                    ].map(tab => (
                      <button
                        key={tab.key}
                        onClick={() => handleTabChange(idx, tab.key)}
                        className={`flex-1 py-2.5 px-3 whitespace-nowrap border-b-2 transition ${
                          currentTab === tab.key
                            ? 'border-orange-500 text-orange-400 bg-orange-500/10'
                            : 'border-transparent text-slate-400'
                        }`}
                      >
                        {tab.label}
                      </button>
                    ))}
                  </div>

                  {/* Tab Details */}
                  <div className="p-4 text-xs text-slate-300 space-y-3">
                    {currentTab === 'overview' && (
                      <div className="space-y-2">
                        <div className="flex justify-between bg-slate-950/60 p-2.5 rounded-lg border border-slate-800">
                          <span>Est. Year: <strong className="text-white">{item['Establishment Year'] || 'N/A'}</strong></span>
                          <span>Rating: <strong className="text-amber-400">⭐ {item['Google review rating'] || '4.5'}</strong></span>
                        </div>
                        <div className="bg-slate-950/60 p-2.5 rounded-lg border border-slate-800">
                          <strong className="text-amber-400 block mb-1">Geography & Politics:</strong>
                          <p className="leading-relaxed">{item.geography_politics || 'Information updating soon.'}</p>
                        </div>
                      </div>
                    )}

                    {currentTab === 'history' && (
                      <div className="space-y-2">
                        <div className="bg-slate-950/60 p-2.5 rounded-lg border border-slate-800">
                          <strong className="text-amber-400 block mb-1">📜 History (Itihas):</strong>
                          <p className="leading-relaxed">{item.history || 'Historical details updating soon.'}</p>
                        </div>
                        <div className="bg-slate-950/60 p-2.5 rounded-lg border border-slate-800">
                          <strong className="text-amber-400 block mb-1">👑 Famous Personalities:</strong>
                          <p className="leading-relaxed">{item.famous_personalities || 'Personalities updating soon.'}</p>
                        </div>
                      </div>
                    )}

                    {currentTab === 'culture' && (
                      <div className="space-y-2">
                        <div className="bg-slate-950/60 p-2.5 rounded-lg border border-slate-800">
                          <strong className="text-amber-400 block mb-1">🎨 Culture & Heritage:</strong>
                          <p className="leading-relaxed">{item.culture || 'Culture updating soon.'}</p>
                        </div>
                        <div className="bg-slate-950/60 p-2.5 rounded-lg border border-slate-800">
                          <strong className="text-amber-400 block mb-1">🍲 Prasiddh Khana (Famous Food):</strong>
                          <p className="leading-relaxed">{item.famous_food || 'Food options updating soon.'}</p>
                        </div>
                      </div>
                    )}

                    {currentTab === 'travel' && (
                      <div className="space-y-2">
                        <div className="bg-slate-950/60 p-2.5 rounded-lg border border-slate-800">
                          <strong className="text-amber-400 block mb-1">🛍️ Famous Markets:</strong>
                          <p className="leading-relaxed">{item.famous_markets || 'Markets updating soon.'}</p>
                        </div>
                        <div className="bg-slate-950/60 p-2.5 rounded-lg border border-slate-800">
                          <strong className="text-amber-400 block mb-1">🛕 Mandir & Picnic Spots:</strong>
                          <p className="leading-relaxed">{item.temples_and_spots || 'Spots updating soon.'}</p>
                        </div>
                        <div className="bg-slate-950/60 p-2.5 rounded-lg border border-slate-800">
                          <strong className="text-amber-400 block mb-1">🚌 Route & Transport:</strong>
                          <p className="leading-relaxed">{item.route_transport || 'Transport updating soon.'}</p>
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

      {/* App Fixed Bottom Navigation Bar (App Like Feeling) */}
      <nav className="fixed bottom-0 left-0 right-0 bg-slate-900/95 backdrop-blur-xl border-t border-slate-800 flex justify-around py-2 z-40 text-[10px] font-bold text-slate-400">
        <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="flex flex-col items-center gap-0.5 text-orange-400">
          <span className="text-base">🔍</span>
          <span>Explore</span>
        </button>
        <button onClick={() => setShowAddModal(true)} className="flex flex-col items-center gap-0.5 text-slate-400 hover:text-white">
          <span className="text-base">➕</span>
          <span>Add Spot</span>
        </button>
        <button onClick={() => setShowVendorModal(true)} className="flex flex-col items-center gap-0.5 text-slate-400 hover:text-white">
          <span className="text-base">💼</span>
          <span>Business</span>
        </button>
      </nav>

      {/* Modals */}
      {showVendorModal && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl w-full max-w-xs p-5 text-xs">
            <h3 className="font-bold text-white mb-3 text-sm">🏪 List Shop / Business</h3>
            <form onSubmit={handleVendorSubmit} className="space-y-2.5">
              <input type="text" required placeholder="Shop Name" value={vendorData.businessName} onChange={(e) => setVendorData({...vendorData, businessName: e.target.value})} className="w-full bg-slate-800 p-2 rounded border border-slate-700 text-white" />
              <input type="text" required placeholder="Owner Name" value={vendorData.ownerName} onChange={(e) => setVendorData({...vendorData, ownerName: e.target.value})} className="w-full bg-slate-800 p-2 rounded border border-slate-700 text-white" />
              <input type="tel" required placeholder="Mobile / WhatsApp" value={vendorData.phone} onChange={(e) => setVendorData({...vendorData, phone: e.target.value})} className="w-full bg-slate-800 p-2 rounded border border-slate-700 text-white" />
              <button type="submit" className="w-full bg-orange-500 text-white font-bold py-2 rounded-lg mt-2">Submit</button>
              <button type="button" onClick={() => setShowVendorModal(false)} className="w-full text-slate-400 py-1">Close</button>
            </form>
          </div>
        </div>
      )}

      {showAddModal && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl w-full max-w-sm p-5 text-xs max-h-[85vh] overflow-y-auto">
            <h3 className="font-bold text-white mb-3 text-sm">➕ Add Spot</h3>
            {submitSuccess ? (
              <div className="text-emerald-400 text-center font-bold my-4">🎉 Spot Saved!</div>
            ) : (
              <form onSubmit={handleAddSpotSubmit} className="space-y-2.5">
                <input type="text" name="Name" required placeholder="Spot Name *" value={formData.Name} onChange={handleInputChange} className="w-full bg-slate-800 p-2 rounded border border-slate-700 text-white" />
                <input type="text" name="State" required placeholder="State *" value={formData.State} onChange={handleInputChange} className="w-full bg-slate-800 p-2 rounded border border-slate-700 text-white" />
                <textarea name="history" placeholder="History..." value={formData.history} onChange={handleInputChange} className="w-full bg-slate-800 p-2 rounded border border-slate-700 text-white" />
                <button type="submit" disabled={submitting} className="w-full bg-orange-500 text-white font-bold py-2 rounded-lg">{submitting ? '...' : 'Save Spot'}</button>
                <button type="button" onClick={() => setShowAddModal(false)} className="w-full text-slate-400 py-1">Cancel</button>
              </form>
            )}
          </div>
        </div>
      )}

    </div>
  );
}
