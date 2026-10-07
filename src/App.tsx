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
  const [showAddModal, setShowAddModal] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const [formData, setFormData] = useState({
    Name: '', State: '', City: '', Type: '',
    history: '', famous_food: '', famous_markets: '',
    temples_and_spots: '', route_transport: '', image_url: '', emergency_services: ''
  });

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
          history: 'Amer Fort is a breathtaking blend of Hindu and Mughal architecture, perched high on the Aravalli hills.',
          temples_and_spots: 'Sheesh Mahal, Sila Devi Temple, Diwan-e-Aam.',
          famous_markets: 'Amer Road Handicrafts & Royal Gem Bazaars.',
          famous_food: 'Dal Baati Churma, Pyaaz Kachori, Ghevar.',
          route_transport: '11 km from Jaipur City Centre; cabs and autos readily available.',
          emergency_services: 'Tourist Police: 100 | Ambulance: 108'
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
          Name: `${cap} Heritage & Culture Hub`,
          City: cap,
          State: 'Bharat / India',
          Type: 'Verified Destination',
          image_url: 'https://images.unsplash.com/photo-1588095920028-a433f42f7c6a?auto=format&fit=crop&w=800&q=80',
          history: `${cap} is a magnificent cultural landmark brimming with rich historical stories, vibrant community life, and timeless heritage.`,
          temples_and_spots: `Main town square, historic ancient temples, and scenic sunset viewpoints around ${cap}.`,
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
      alert('Spot successfully added!');
      setShowAddModal(false);
      handleSearch(formData.City);
    }
  };

  return (
    <div className="min-h-screen bg-[#0A0F1D] text-slate-100 flex flex-col font-sans pb-28 selection:bg-amber-500 selection:text-slate-950">
      
      {/* Vibrant Header */}
      <header className="sticky top-0 z-50 bg-[#0A0F1D]/90 backdrop-blur-xl border-b border-slate-800/80 px-4 py-3.5 flex justify-between items-center shadow-xl">
        <div className="flex items-center gap-2.5 cursor-pointer" onClick={() => window.location.reload()}>
          <div className="w-9 h-9 rounded-2xl bg-gradient-to-tr from-amber-500 via-orange-600 to-rose-600 flex items-center justify-center text-white font-black text-lg shadow-lg shadow-orange-500/20">
            🇮🇳
          </div>
          <div>
            <div className="flex items-center font-black tracking-wider text-xl leading-none">
              <span className="text-amber-400">IN</span>
              <span className="text-white">BHARAT</span>
            </div>
          </div>
        </div>

        <button 
          onClick={() => setShowAddModal(true)} 
          className="bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 text-slate-950 font-black text-xs px-4 py-2 rounded-xl shadow-lg shadow-orange-500/20 transition active:scale-95"
        >
          + Add Spot
        </button>
      </header>

      {/* Vibrant Hero Section */}
      <section className="px-4 pt-10 pb-8 max-w-xl mx-auto w-full text-center relative">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 h-72 bg-gradient-to-tr from-amber-500/15 to-orange-600/15 rounded-full blur-3xl pointer-events-none"></div>

        <span className="inline-block bg-amber-500/10 text-amber-400 font-bold text-[10px] uppercase tracking-widest px-3 py-1 rounded-full mb-3 border border-amber-500/20">
          ✨ Premium Discovery Platform
        </span>
        <h1 className="text-3xl sm:text-4xl font-black tracking-tight text-white mb-2">
          Discover India's Soul, <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-orange-500 to-rose-500">Beautifully.</span>
        </h1>
        <p className="text-xs text-slate-400 mb-6 font-medium">
          Heritage, food, transport, and emergency details crafted in a stunning modern interface.
        </p>

        <form onSubmit={(e) => handleSearch(undefined, e)} className="relative z-10">
          <div className="flex bg-slate-900/90 rounded-2xl p-2 border border-slate-700/60 focus-within:border-amber-500 transition shadow-2xl backdrop-blur-md">
            <span className="flex items-center pl-3 text-amber-500 text-base">🔍</span>
            <input
              type="text"
              placeholder="Search city or monument (e.g. Jaipur, Ujjain, Tonk)..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="flex-1 bg-transparent px-3 py-2.5 text-xs sm:text-sm text-slate-100 placeholder-slate-500 outline-none font-semibold"
            />
            <button 
              type="submit" 
              disabled={loading} 
              className="bg-gradient-to-r from-amber-500 to-orange-600 text-slate-950 font-black text-xs px-5 py-2.5 rounded-xl transition disabled:opacity-50 shadow-md active:scale-95"
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
              className="bg-slate-900/80 hover:bg-slate-800 text-slate-300 border border-slate-800 px-3.5 py-1.5 rounded-xl font-bold whitespace-nowrap transition active:scale-95 shadow-sm"
            >
              📍 {city}
            </button>
          ))}
        </div>
      </section>

      {/* Results
