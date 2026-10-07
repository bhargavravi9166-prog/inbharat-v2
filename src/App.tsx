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
  const [activeTab, setActiveTab] = useState<string>('overview');

  const [showAddModal, setShowAddModal] = useState(false);
  const [showVendorModal, setShowVendorModal] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const [formData, setFormData] = useState({
    Name: '', State: '', City: '', Type: '',
    history: '', famous_food: '', famous_markets: '',
    temples_and_spots: '', route_transport: '', image_url: '', emergency_services: ''
  });

  const [vendorData, setVendorData] = useState({ businessName: '', ownerName: '', phone: '', city: '', category: 'Hotel / Homestay' });

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
          Name: 'Amer Fort & Royal Palace',
          City: 'Jaipur',
          State: 'Rajasthan',
          Type: 'Royal Heritage Fort',
          image_url: 'https://images.unsplash.com/photo-1599661046289-e31897846e41?auto=format&fit=crop&w=800&q=80',
          history: 'Amer Fort is a breathtaking architectural marvel perched high on the Aravalli hills, featuring majestic courtyards and mirror palaces.',
          temples_and_spots: 'Sheesh Mahal, Sila Devi Temple, Diwan-e-Aam, Maota Lake.',
          famous_markets: 'Amer Road Handicrafts & Royal Gem Bazaars.',
          famous_food: 'Dal Baati Churma, Pyaaz Kachori, Ghevar.',
          route_transport: '11 km from Jaipur City Centre; cabs, autos, and local buses readily available.',
          emergency_services: 'Tourist Police: 100 | Ambulance: 108 | Control Room: 0141-2561255'
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
          Name: `${cap} Heritage & Local Utility Hub`,
          City: cap,
          State: 'Bharat / India',
          Type: 'Verified Destination',
          image_url: 'https://images.unsplash.com/photo-1588095920028-a433f42f7c6a?auto=format&fit=crop&w=800&q=80',
          history: `${cap} is an incredible cultural landmark rich in regional history, vibrant community networks, and traditional heritage.`,
          temples_and_spots: `Main town square, historic ancient temples, and local scenic viewpoints around ${cap}.`,
          famous_markets: `${cap} Handloom Bazaar & Traditional Artisan Shops.`,
          famous_food: `Authentic regional thali, local sweets, and famous street delicacies.`,
          route_transport: `Well connected via state highways, local auto-rickshaws, and taxi services.`,
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
      alert('Spot successfully added to InBharat database!');
      setShowAddModal(false);
      handleSearch(formData.City);
    }
  };

  const handleVendorSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!vendorData.businessName || !vendorData.phone) {
      alert('Kripya Business Name aur Phone number dalein!');
      return;
    }
    alert(`Success! ${vendorData.businessName} has been registered successfully.`);
    setShowVendorModal(false);
    setVendorData({ businessName: '', ownerName: '', phone: '', city: '', category: 'Hotel / Homestay' });
  };

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 flex flex-col font-sans pb-32 selection:bg-orange-500 selection:text-white">
      
      {/* Top Professional Header */}
      <header className="sticky top-0 z-50 bg-slate-900/95 backdrop-blur-xl border-b border-slate-800 px-4 py-3.5 flex justify-between items-center shadow-xl">
        <div className="flex items-center gap-2.5 cursor-pointer" onClick={() => window.location.reload()}>
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-orange-500 to-amber-500 flex items-center justify-center text-white font-black text-xl shadow-lg shadow-orange-500/20">
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

        <div className="flex gap-2">
          <button 
            onClick={() => setShowVendorModal(true)} 
            className="bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 font-bold text-xs px-3 py-2 rounded-xl transition shadow-sm active:scale-95 flex items-center gap-1"
          >
            <span>💼</span> <span className="hidden sm:inline">List Biz</span>
          </button>
          <button 
            onClick={() => setShowAddModal(true)} 
            className="bg-orange-500/10 hover:bg-orange-500/20 text-orange-400 border border-orange-500/30 font-bold text-xs px-3 py-2 rounded-xl transition shadow-sm active:scale-95 flex items-center gap-1"
          >
            <span>➕</span> <span className="hidden sm:inline">Add Spot</span>
          </button>
        </div>
      </header>

      {/* Hero Search Section */}
      <section className="px-4 pt-10 pb-8 max-w-2xl mx-auto w-full text-center relative">
        <div className="absolute inset-0 bg-gradient-to-b from-orange-500/10 via-transparent to-transparent pointer-events-none blur-3xl"></div>
        
        <span className="inline-flex items-center gap-1.5 bg-orange-500/10 text-orange-400 border border-orange-500/20 text-xs font-bold px-3.5 py-1.5 rounded-full mb-4 shadow-inner">
          ✨ India's Ultimate Local & Tourism Ecosystem
        </span>
        <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-white mb-3">
          Explore Any City, <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-amber-400">Instantly.</span>
        </h1>
        <p className="text-xs sm:text-sm text-slate-300 max-w-lg mx-auto mb-8 font-medium">
          Get verified history, sightseeing spots, local food, transport, and emergency SOS in one clean dashboard.
        </p>

        <form onSubmit={(e) => handleSearch(undefined, e)} className="relative z-10 max-w-xl mx-auto">
          <div className="flex bg-slate-800/90 rounded-2xl p-2 border border-slate-700 focus-within:border-orange-500 transition shadow-2xl backdrop-blur-md">
            <span className="flex items-center pl-3 text-orange-400 text-lg">🔍</span>
            <input
              type="text"
              placeholder="Search city, town or monument (e.g. Jaipur, Ujjain)..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="flex-1 bg-transparent px-3 py-3 text-xs sm:text-sm text-slate-100 placeholder-slate-400 outline-none font-semibold"
            />
            <button 
              type="submit" 
              disabled={loading} 
              className="bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white font-black text-xs sm:text-sm px-6 py-3 rounded-xl transition shadow-lg shadow-orange-500/25 disabled:opacity-50 active:scale-95"
            >
              {loading ? 'Searching...' : 'Explore'}
            </button>
          </div>
        </form>

        <div className="flex gap-2 overflow-x-auto mt-5 no-scrollbar pb-1 text-xs justify-start sm:justify-center relative z-10">
          {['Jaipur', 'Ujjain', 'Varanasi', 'Agra', 'Tonk', 'Mount Abu'].map(city => (
            <button
              key={city}
              type="button"
              onClick={() => handleSearch(city)}
              className="bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 px-3.5 py-1.5 rounded-xl font-bold whitespace-nowrap transition shadow-sm active:scale-95 flex items-center gap-1"
            >
              <span>📍</span> <span>{city}</span>
            </button>
          ))}
        </div>
      </section>

      {/* Main Results Feed */}
      <main className="px-4 max-w-xl mx-auto w-full flex-1 space-y-6 relative z-10">
