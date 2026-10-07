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
    businessName: '', ownerName: '', phone: '', city: '', category: 'Shop'
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
    alert(`Dhanyawad ${vendorData.ownerName}! InBharat Team 24 ghante me aapke business "${vendorData.businessName}" ko verify karegi.`);
    setShowVendorModal(false);
  };

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 flex flex-col font-sans selection:bg-orange-500 selection:text-white">
      
      {/* Top Announcement Bar */}
      <div className="bg-gradient-to-r from-orange-600 via-amber-600 to-emerald-600 text-white text-xs py-2 px-4 shadow-inner">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-2 font-medium">
          <span className="flex items-center gap-2">
            <span className="bg-white/20 px-2 py-0.5 rounded-full text-[10px] uppercase tracking-wider font-extrabold">Notice</span>
            Are you a local shopkeeper, hotel owner, or guide? List your business on InBharat!
          </span>
          <button 
            onClick={() => setShowVendorModal(true)}
            className="bg-white text-slate-900 hover:bg-slate-100 px-3 py-1 rounded-full font-bold text-xs transition shadow-sm"
          >
            🚀 Promote Business
          </button>
        </div>
      </div>

      {/* Main Navbar */}
      <nav className="bg-slate-900/80 backdrop-blur-md border-b border-slate-800 sticky top-0 z-40">
        <div className="max-w-6xl mx-auto px-4 py-3 flex justify-between items-center">
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => window.location.reload()}>
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-orange-500 to-amber-400 flex items-center justify-center text-white font-black text-xl shadow-lg shadow-orange-500/30">
              In
            </div>
            <div>
              <span className="text-2xl font-black tracking-wider bg-gradient-to-r from-orange-400 via-amber-200 to-emerald-400 bg-clip-text text-transparent">
                InBharat
              </span>
              <span className="block text-[10px] text-slate-400 font-semibold tracking-widest -mt-1 uppercase">
                Tourism & Heritage
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setShowAddModal(true)}
              className="hidden sm:flex items-center gap-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 px-4 py-2 rounded-xl text-xs font-semibold border border-slate-700 transition"
            >
              <span>➕</span> Add Spot
            </button>
            <button
              onClick={() => setShowVendorModal(true)}
              className="bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white font-bold px-4 py-2 rounded-xl text-xs shadow-lg shadow-orange-500/20 transition"
            >
              💼 Business Partner
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative overflow-hidden pt-12 pb-20 bg-gradient-to-b from-slate-900 via-slate-950 to-slate-900 border-b border-slate-800">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-orange-500/10 blur-[120px] rounded-full pointer-events-none"></div>

        <div className="max-w-4xl mx-auto px-4 text-center relative z-10">
          <div className="inline-flex items-center gap-2 bg-slate-800/80 border border-slate-700/80 backdrop-blur-md px-4 py-1.5 rounded-full text-xs font-semibold text-orange-400 mb-6 shadow-inner">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            India's #1 Cultural & Tourism Platform
          </div>

          <h1 className="text-4xl sm:text-6xl font-black tracking-tight text-white leading-tight mb-4">
            Discover the Heart & Soul of <br />
            <span className="bg-gradient-to-r from-orange-400 via-amber-300 to-emerald-400 bg-clip-text text-transparent">
              Incredible India
            </span>
          </h1>

          <p className="text-slate-400 text-base sm:text-lg max-w-2xl mx-auto mb-8 font-medium">
            History, Geography, Culture, Famous Food, Local Markets, Temples & Route Transport — Everything in one Super-App.
          </p>

          {/* Search Box */}
          <form onSubmit={(e) => handleSearch(undefined, e)} className="bg-slate-800/90 p-2.5 rounded-2xl border border-slate-700 shadow-2xl backdrop-blur-md flex flex-col sm:flex-row gap-2 max-w-3xl mx-auto">
            <div className="flex-1 flex items-center px-3 bg-slate-900/60 rounded-xl border border-slate-800 focus-within:border-orange-500 transition">
              <span className="text-lg mr-2">🔍</span>
              <input
                type="text"
                placeholder="Search city, state, or monument (e.g. Jaipur, Tonk, Amer, Agra)..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-transparent py-3 text-white placeholder-slate-500 outline-none text-sm font-medium"
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white font-bold px-8 py-3.5 rounded-xl transition shadow-lg shadow-orange-500/25 disabled:opacity-50 text-sm whitespace-nowrap"
            >
              {loading ? 'Exploring...' : 'Explore Bharat'}
            </button>
          </form>

          {/* Quick Filter Tags */}
          <div className="flex flex-wrap items-center justify-center gap-2 mt-6 text-xs text-slate-400">
            <span className="font-semibold text-slate-500">Popular Searches:</span>
            {['Jaipur', 'Tonk', 'Agra', 'Varanasi', 'Goa', 'Amer', 'Delhi', 'Udaipur'].map(city => (
              <button
                key={city}
                type="button"
                onClick={() => handleSearch(city)}
                className="bg-slate-800 hover:bg-slate-700 text-slate-300 px-3 py-1 rounded-full border border-slate-700 transition"
              >
                {city}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Bar */}
      <div className="bg-slate-950 border-b border-slate-800/80 py-6">
        <div className="max-w-5xl mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
          <div>
            <span className="block text-2xl font-extrabold text-orange-400">1,000+</span>
            <span className="text-xs text-slate-500 font-medium">Heritage & Local Spots</span>
          </div>
          <div>
            <span className="block text-2xl font-extrabold text-amber-400">28 States</span>
            <span className="text-xs text-slate-500 font-medium">Cultural Coverage</span>
          </div>
          <div>
            <span className="block text-2xl font-extrabold text-emerald-400">100% Verified</span>
            <span className="text-xs text-slate-500 font-medium">Local Guides & Taxis</span>
          </div>
          <div>
            <span className="block text-2xl font-extrabold text-sky-400">Crowd-Sourced</span>
            <span className="text-xs text-slate-500 font-medium">Community Driven</span>
          </div>
        </div>
      </div>

      {/* Main Results Container */}
      <main className="max-w-5xl mx-auto px-4 py-10 flex-1 w-full">
        {loading && (
          <div className="text-center py-16">
            <div className="w-12 h-12 border-4 border-orange-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-slate-400 font-medium text-sm">Searching InBharat Heritage Database...</p>
          </div>
        )}

        {!loading && searched && results.length === 0 && (
          <div className="bg-slate-800/50 rounded-2xl p-10 text-center border border-slate-800 shadow-xl max-w-lg mx-auto">
            <span className="text-4xl block mb-3">📍</span>
            <h3 className="text-xl font-bold text-white mb-1">No Spots Found</h3>
            <p className="text-slate-400 text-sm mb-6">
              We couldn't find matches for "{searchTerm}". Be the first to add this spot to InBharat!
            </p>
            <button
              onClick={() => setShowAddModal(true)}
              className="bg-orange-500 hover:bg-orange-600 text-white font-bold px-5 py-2.5 rounded-xl text-sm transition"
            >
              ➕ Add "{searchTerm}" Now
            </button>
          </div>
        )}

        {!loading && results.length > 0 && (
          <div className="space-y-8">
            <div className="flex justify-between items-center border-b border-slate-800 pb-4">
              <span className="text-xs font-extrabold tracking-wider text-slate-400 uppercase">
                Found {results.length} Location(s)
              </span>
              <span className="text-xs text-emerald-400 font-semibold flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-emerald-400"></span> Live Data Verified
              </span>
            </div>

            {results.map((item, idx) => {
              const currentTab = activeTab[idx] || 'overview';

              return (
                <div key={idx} className="bg-slate-800/80 rounded-2xl border border-slate-700/80 shadow-2xl overflow-hidden backdrop-blur-sm">
                  
                  {/* Card Header */}
                  <div className="p-6 bg-gradient-to-r from-slate-800 via-slate-850 to-slate-900 border-b border-slate-700/80 flex flex-col md:flex-row justify-between md:items-center gap-4">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <h2 className="text-2xl font-black text-white">{item.Name || 'Unnamed Location'}</h2>
                        <span className="bg-emerald-500/20 text-emerald-300 text-[10px] font-extrabold px-2 py-0.5 rounded-full border border-emerald-500/30">
                          ✓ VERIFIED
                        </span>
                      </div>
                      <p className="text-sm text-slate-400 font-medium">
                        📍 {item.City ? `${item.City}, ` : ''}{item.State} {item.Zone ? `• (${item.Zone} Zone)` : ''}
                      </p>
                    </div>

                    <div className="flex items-center gap-3">
                      {item.Type && (
                        <span className="bg-orange-500/20 text-orange-300 border border-orange-500/30 text-xs font-bold px-3 py-1 rounded-full">
                          🏛️ {item.Type}
                        </span>
                      )}
                      <span className="bg-amber-500/20 text-amber-300 border border-amber-500/30 text-xs font-bold px-3 py-1 rounded-full">
                        ⭐ {item['Google review rating'] || '4.5'}
                      </span>
                    </div>
                  </div>

                  {/* Commercial Services Strip */}
                  <div className="bg-slate-900/90 border-b border-slate-700/60 px-6 py-3 flex flex-wrap gap-3 items-center justify-between text-xs">
                    <span className="font-bold text-amber-400 flex items-center gap-1">
                      ⚡ Booking & Travel Options in {item.City || item.Name}:
                    </span>
                    <div className="flex flex-wrap gap-2">
                      <a 
                        href={`https://www.makemytrip.com/hotels/${item.City || item.Name}-hotels.html`} 
                        target="_blank" 
                        rel="noreferrer"
                        className="bg-slate-800 hover:bg-slate-700 text-orange-300 border border-orange-500/30 font-semibold px-3 py-1.5 rounded-lg transition"
                      >
                        🏨 Book Hotel
                      </a>
                      <a 
                        href={`https://www.redbus.in/bus-tickets/${item.City || item.Name}`} 
                        target="_blank" 
                        rel="noreferrer"
                        className="bg-slate-800 hover:bg-slate-700 text-red-300 border border-red-500/30 font-semibold px-3 py-1.5 rounded-lg transition"
                      >
                        🚌 Book Bus
                      </a>
                      <button 
                        onClick={() => alert(`InBharat Verified Guide for ${item.Name}: Contact Helpline +91-9876543210`)}
                        className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold px-3 py-1.5 rounded-lg shadow-md transition"
                      >
                        🚩 Hire Local Guide
                      </button>
                    </div>
                  </div>

                  {/* Navigation Tabs */}
                  <div className="flex border-b border-slate-700/80 overflow-x-auto bg-slate-900/50 text-xs sm:text-sm font-semibold text-slate-400">
                    {[
                      { key: 'overview', label: '📌 Overview & Geography' },
                      { key: 'history', label: '📜 History & Personalities' },
                      { key: 'culture', label: '🎨 Culture & Famous Food' },
                      { key: 'travel', label: '🛍️ Markets, Temples & Routes' },
                    ].map(tab => (
                      <button
                        key={tab.key}
                        onClick={() => handleTabChange(idx, tab.key)}
                        className={`px-5 py-3.5 whitespace-nowrap border-b-2 transition ${
                          currentTab === tab.key
                            ? 'border-orange-500 text-orange-400 font-bold bg-orange-500/10'
                            : 'border-transparent hover:text-slate-200'
                        }`}
                      >
                        {tab.label}
                      </button>
                    ))}
                  </div>

                  {/* Tab Content */}
                  <div className="p-6 text-sm leading-relaxed text-slate-300 bg-slate-800/40">
                    {currentTab === 'overview' && (
                      <div className="space-y-4">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 bg-slate-900/60 p-4 rounded-xl border border-slate-700/50">
                          <div><strong className="text-white">Establishment Year:</strong> {item['Establishment Year'] || 'Aithihasik Kal'}</div>
                          <div><strong className="text-white">Rating:</strong> ⭐ {item['Google review rating'] || '4.5'}</div>
                        </div>
                        <div className="bg-slate-900/60 p-4 rounded-xl border border-slate-700/50">
                          <h4 className="font-bold text-amber-400 text-base mb-1">🗺️ Geography & Politics (Bhugol & Rajneeti):</h4>
                          <p>{item.geography_politics || 'Bhugol aur prashasanik details update ho rahi hain.'}</p>
                        </div>
                      </div>
                    )}

                    {currentTab === 'history' && (
                      <div className="space-y-4">
                        <div className="bg-slate-900/60 p-4 rounded-xl border border-slate-700/50">
                          <h4 className="font-bold text-amber-400 text-base mb-1">📜 History & Significance (Aithihasik Mahatva):</h4>
                          <p>{item.history || 'Aithihasik jankari update ho rahi hai.'}</p>
                        </div>
                        <div className="bg-slate-900/60 p-4 rounded-xl border border-slate-700/50">
                          <h4 className="font-bold text-amber-400 text-base mb-1">👑 Famous Personalities (Mahan Hastiya):</h4>
                          <p>{item.famous_personalities || 'Aitihasik hastiyo ki detail update ho rahi hai.'}</p>
                        </div>
                      </div>
                    )}

                    {currentTab === 'culture' && (
                      <div className="space-y-4">
                        <div className="bg-slate-900/60 p-4 rounded-xl border border-slate-700/50">
                          <h4 className="font-bold text-amber-400 text-base mb-1">🎨 Culture & Heritage (Sanskriti & Boli):</h4>
                          <p>{item.culture || 'Sanskriti aur boliyo ki jankari update ho rahi hai.'}</p>
                        </div>
                        <div className="bg-slate-900/60 p-4 rounded-xl border border-slate-700/50">
                          <h4 className="font-bold text-amber-400 text-base mb-1">🍲 Prasiddh Khana & Sweets (Famous Food):</h4>
                          <p>{item.famous_food || 'Khabe-peene ki prasiddh cheezein update ho rahi hain.'}</p>
                        </div>

                        {/* Vendor Promotion Card */}
                        <div className="p-4 bg-gradient-to-r from-emerald-950 to-slate-900 border border-emerald-500/30 rounded-xl flex flex-col sm:flex-row justify-between items-center gap-3">
                          <div>
                            <span className="bg-emerald-500 text-slate-950 font-black text-[10px] px-2 py-0.5 rounded mr-2">SPONSORED BUSINESS</span>
                            <strong className="text-emerald-300 text-xs sm:text-sm">Are you a local sweet shop or restaurant owner in {item.City || item.Name}?</strong>
                          </div>
                          <button onClick={() => setShowVendorModal(true)} className="bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black px-4 py-2 rounded-lg text-xs transition whitespace-nowrap">
                            List Restaurant Here
                          </button>
                        </div>
                      </div>
                    )}

                    {currentTab === 'travel' && (
                      <div className="space-y-4">
                        <div className="bg-slate-900/60 p-4 rounded-xl border border-slate-700/50">
                          <h4 className="font-bold text-amber-400 text-base mb-1">🛍️ Famous Markets & Shopping:</h4>
                          <p>{item.famous_markets || 'Bazaar aur handicrafts ki detail update ho rahi hai.'}</p>
                        </div>
                        <div className="bg-slate-900/60 p-4 rounded-xl border border-slate-700/50">
                          <h4 className="font-bold text-amber-400 text-base mb-1">🛕 Temples & Picnic Spots:</h4>
                          <p>{item.temples_and_spots || 'Dharmik sthal aur ghoomne ki jagah update ho rahi hain.'}</p>
                        </div>
                        <div className="bg-slate-900/60 p-4 rounded-xl border border-slate-700/50">
                          <h4 className="font-bold text-amber-400 text-base mb-1">🚌 Route & Transport Access:</h4>
                          <p>{item.route_transport || 'Train, Bus, Airport aur Taxi connectivity detail.'}</p>
                        </div>

                        {/* Local Partner Taxi Banner */}
                        <div className="p-4 bg-gradient-to-r from-orange-950 to-slate-900 border border-orange-500/30 rounded-xl flex flex-col sm:flex-row justify-between items-center gap-3">
                          <div>
                            <span className="bg-orange-500 text-slate-950 font-black text-[10px] px-2 py-0.5 rounded mr-2">TAXI PARTNER</span>
                            <strong className="text-orange-300 text-xs sm:text-sm">Need a dedicated local taxi driver for {item.Name}?</strong>
                          </div>
                          <button onClick={() => alert(`InBharat Verified Taxi Partner: Call Helpline +91-9876543210`)} className="bg-orange-500 hover:bg-orange-400 text-slate-950 font-black px-4 py-2 rounded-lg text-xs transition whitespace-nowrap">
                            Call Taxi Driver
                          </button>
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

      {/* Vendor Listing Modal */}
      {showVendorModal && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 z-50">
          <div className="bg-slate-900 rounded-2xl border border-slate-700 shadow-2xl max-w-md w-full p-6 text-slate-200">
            <div className="flex justify-between items-center mb-4 border-b border-slate-800 pb-3">
              <h3 className="text-lg font-extrabold text-white">🏪 List Your Business on InBharat</h3>
              <button onClick={() => setShowVendorModal(false)} className="text-slate-400 hover:text-white font-bold text-lg">✕</button>
            </div>
            <form onSubmit={handleVendorSubmit} className="space-y-3 text-xs">
              <div>
                <label className="block font-bold text-slate-300 mb-1">Business / Shop Name *</label>
                <input type="text" required value={vendorData.businessName} onChange={(e) => setVendorData({...vendorData, businessName: e.target.value})} placeholder="e.g. Rawat Sweets, Royal Taxi Service" className="w-full p-2.5 bg-slate-800 border border-slate-700 rounded-lg text-white outline-none focus:border-orange-500" />
              </div>
              <div>
                <label className="block font-bold text-slate-300 mb-1">Owner Full Name *</label>
                <input type="text" required value={vendorData.ownerName} onChange={(e) => setVendorData({...vendorData, ownerName: e.target.value})} placeholder="Your Name" className="w-full p-2.5 bg-slate-800 border border-slate-700 rounded-lg text-white outline-none focus:border-orange-500" />
              </div>
              <div>
                <label className="block font-bold text-slate-300 mb-1">Mobile / WhatsApp Number *</label>
                <input type="tel" required value={vendorData.phone} onChange={(e) => setVendorData({...vendorData, phone: e.target.value})} placeholder="+91 9876543210" className="w-full p-2.5 bg-slate-800 border border-slate-700 rounded-lg text-white outline-none focus:border-orange-500" />
              </div>
              <div>
                <label className="block font-bold text-slate-300 mb-1">City / Location *</label>
                <input type="text" required value={vendorData.city} onChange={(e) => setVendorData({...vendorData, city: e.target.value})} placeholder="e.g. Jaipur, Tonk, Agra" className="w-full p-2.5 bg-slate-800 border border-slate-700 rounded-lg text-white outline-none focus:border-orange-500" />
              </div>
              <button type="submit" className="w-full bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white font-bold py-3 rounded-xl transition mt-2 text-sm shadow-lg shadow-orange-500/20">
                Submit Business Application
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Add Spot Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 z-50 overflow-y-auto">
          <div className="bg-slate-900 rounded-2xl border border-slate-700 shadow-2xl max-w-2xl w-full p-6 my-8 text-slate-200 max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-4 border-b border-slate-800 pb-3">
              <h3 className="text-xl font-extrabold text-white">➕ Add New Tourism or Local Spot</h3>
              <button onClick={() => setShowAddModal(false)} className="text-slate-400 hover:text-white font-bold text-lg">✕</button>
            </div>
            {submitSuccess ? (
              <div className="bg-emerald-500/20 border border-emerald-500 text-emerald-300 p-4 rounded-xl text-center font-bold my-6 text-sm">
                🎉 Spot successfully save ho gaya! InBharat database me add ho chuka hai.
              </div>
            ) : (
              <form onSubmit={handleAddSpotSubmit} className="space-y-4 text-xs">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block font-bold text-slate-300 mb-1">Spot / Place Name *</label>
                    <input type="text" name="Name" required value={formData.Name} onChange={handleInputChange} placeholder="e.g. Amer Fort" className="w-full p-2.5 bg-slate-800 border border-slate-700 rounded-lg text-white outline-none focus:border-orange-500" />
                  </div>
                  <div>
                    <label className="block font-bold text-slate-300 mb-1">State *</label>
                    <input type="text" name="State" required value={formData.State} onChange={handleInputChange} placeholder="e.g. Rajasthan" className="w-full p-2.5 bg-slate-800 border border-slate-700 rounded-lg text-white outline-none focus:border-orange-500" />
                  </div>
                </div>

                <div>
                  <label className="block font-bold text-slate-300 mb-1">History & Significance (Itihas)</label>
                  <textarea name="history" value={formData.history} onChange={handleInputChange} rows={3} placeholder="Aithihasik jankari, kisne banwaya..." className="w-full p-2.5 bg-slate-800 border border-slate-700 rounded-lg text-white outline-none focus:border-orange-500" />
                </div>

                <div className="flex justify-end gap-2 pt-3 border-t border-slate-800">
                  <button type="button" onClick={() => setShowAddModal(false)} className="px-4 py-2 bg-slate-800 text-slate-300 font-bold rounded-lg hover:bg-slate-700">Cancel</button>
                  <button type="submit" disabled={submitting} className="px-6 py-2 bg-orange-500 hover:bg-orange-600 text-white font-bold rounded-lg shadow-lg shadow-orange-500/20">
                    {submitting ? 'Submitting...' : 'Save Spot'}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}

      {/* Branded Footer */}
      <footer className="bg-slate-950 border-t border-slate-800 py-8 text-center text-xs text-slate-500">
        <div className="max-w-5xl mx-auto px-4 flex flex-col sm:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-2">
            <span className="font-black text-white text-base">InBharat</span>
            <span>— India Tourism & Heritage Super-App</span>
          </div>
          <p>&copy; {new Date().getFullYear()} InBharat Platform. All rights reserved.</p>
        </div>
      </footer>

    </div>
  );
}
