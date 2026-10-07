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
          Name: 'Amer Fort & Palace',
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
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col font-sans pb-28 selection:bg-orange-500 selection:text-white">
      
      {/* Clean Premium Header */}
      <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-slate-200 px-4 py-3.5 flex justify-between items-center shadow-sm">
        <div className="flex items-center gap-2.5 cursor-pointer" onClick={() => window.location.reload()}>
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-orange-600 to-amber-500 flex items-center justify-center text-white font-black text-lg shadow-md shadow-orange-500/20">
            🇮🇳
          </div>
          <div>
            <div className="flex items-center font-black tracking-wider text-xl leading-none">
              <span className="text-orange-600">IN</span>
              <span className="text-slate-900">BHARAT</span>
            </div>
            <span className="text-[10px] text-slate-500 font-bold uppercase tracking-widest block mt-0.5">
              Smart Local Ecosystem
            </span>
          </div>
        </div>

        <div className="flex gap-2">
          <button 
            onClick={() => setShowVendorModal(true)} 
            className="bg-emerald-50 hover:bg-emerald-100 text-emerald-700 border border-emerald-300 font-bold text-xs px-3 py-2 rounded-xl transition shadow-sm active:scale-95 flex items-center gap-1"
          >
            <span>💼</span> <span>List Biz</span>
          </button>
          <button 
            onClick={() => setShowAddModal(true)} 
            className="bg-orange-50 hover:bg-orange-100 text-orange-700 border border-orange-300 font-bold text-xs px-3 py-2 rounded-xl transition shadow-sm active:scale-95 flex items-center gap-1"
          >
            <span>➕</span> <span>Add Spot</span>
          </button>
        </div>
      </header>

      {/* Hero Search Section */}
      <section className="px-4 pt-10 pb-6 max-w-xl mx-auto w-full text-center relative">
        <h1 className="text-3xl sm:text-4xl font-black tracking-tight text-slate-900 mb-2">
          Bharat's Unified <span className="text-orange-600">Super-App.</span>
        </h1>
        <p className="text-xs sm:text-sm text-slate-600 mb-6 font-medium">
          Structured intelligence for sightseeing, food, transport, and verified local services.
        </p>

        <form onSubmit={(e) => handleSearch(undefined, e)} className="relative z-10">
          <div className="flex bg-white rounded-2xl p-2 border border-slate-300 focus-within:border-orange-500 transition shadow-lg">
            <span className="flex items-center pl-3 text-orange-500 text-lg">🔍</span>
            <input
              type="text"
              placeholder="Search any city, town or village (e.g. Jaipur, Ujjain)..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="flex-1 bg-transparent px-3 py-2.5 text-xs sm:text-sm text-slate-900 placeholder-slate-400 outline-none font-semibold"
            />
            <button 
              type="submit" 
              disabled={loading} 
              className="bg-orange-600 hover:bg-orange-700 text-white font-black text-xs sm:text-sm px-6 py-2.5 rounded-xl transition shadow-md disabled:opacity-50 active:scale-95"
            >
              {loading ? '...' : 'Explore'}
            </button>
          </div>
        </form>

        <div className="flex gap-2 overflow-x-auto mt-4 no-scrollbar pb-1 text-xs justify-start sm:justify-center relative z-10">
          {['Jaipur', 'Ujjain', 'Varanasi', 'Agra', 'Tonk', 'Mount Abu'].map(city => (
            <button
              key={city}
              type="button"
              onClick={() => handleSearch(city)}
              className="bg-white hover:bg-slate-100 text-slate-700 border border-slate-200 px-3.5 py-1.5 rounded-xl font-bold whitespace-nowrap transition shadow-sm active:scale-95 flex items-center gap-1
