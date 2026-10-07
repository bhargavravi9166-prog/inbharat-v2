import React, { useState, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://xyknkghkndyryfpybqqo.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inh5a25rZ2hrbmR5cnlmcHlicXFvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDEyMzg2NjYsImV4cCI6MjA1NjgxNDY2Nn0';
const supabase = createClient(supabaseUrl, supabaseKey);

const CITIES_DB: Record<string, any> = {
  jaipur: {
    Name: 'Jaipur - The Pink City & Royal Capital',
    City: 'Jaipur', State: 'Rajasthan', Type: '👑 Royal Heritage Capital',
    image_url: 'https://images.unsplash.com/photo-1599661046289-e31897846e41?auto=format&fit=crop&w=1200&q=80',
    history_geo_political: 'History: Founded in 1727 by Maharaja Sawai Jai Singh II. Geography: Enclosed by Aravalli hills. Political: Capital of Rajasthan.',
    picnic_spots: '🏛️ Amer Fort & Maota Lake (11 km)\n🏛️ Nahargarh Fort Sunset Point (15 km)\n🏛️ Jantar Mantar & City Palace (0 km)\n🌿 Jawahar Circle & Patrika Gate (6 km)',
    transport_roadmap: 'Road Map: Connected via NH-48. Transport: Jaipur Metro, low-floor buses, autos, and Jaipur Airport (JAI).',
    hotels_booking: '🏨 Taj Rambagh Palace (Luxury)\n🏨 Trident Jaipur (5-Star)\n🏨 Zostel Jaipur',
    markets_food: '🛍️ Johari Bazaar, Bapu Bazaar.\n🍲 Dal Baati Churma, Pyaaz Kachori, Ghevar.',
    culture_helpline: 'Culture: Rajputana folk arts and turban tradition. Helpline: Tourist Police: 0141-2530264 | SOS: 112'
  }
};

export default function App() {
  const [searchTerm, setSearchTerm] = useState('');
  const [cityData, setCityData] = useState(CITIES_DB['jaipur']);
  const [activeTab, setActiveTab] = useState('overview');
  const [showBookingModal, setShowBookingModal] = useState(false);
  const [showBizModal, setShowBizModal] = useState(false);
  const [supabaseData, setSupabaseData] = useState<any[]>([]);

  useEffect(() => {
    async function loadData() {
      const { data, error } = await supabase.from('india_directory').select('*');
      if (error) {
        console.error('Supabase error:', error);
      } else if (data) {
        console.log("Loaded Supabase Data:", data); // Console mein check karne ke liye
        setSupabaseData(data);
      }
    }
    loadData();
  }, []);

  const handleSearch = (query: string) => {
    setSearchTerm(query);
    const key = query.trim().toLowerCase();
    if (!key) return;

    const foundInSupabase = supabaseData.find(
      (item) => {
        const textToSearch = Object.values(item).join(' ').toLowerCase();
        // Item ke kisi bhi column mein agar query match hoti hai
        return (
          (item.city_name && item.city_name.toLowerCase().includes(key)) ||
          (item.state_name && item.state_name.toLowerCase().includes(key)) ||
          (item.name && item.name.toLowerCase().includes(key)) ||
          textToSearch.includes(key)
        );
      }
    );

    if (foundInSupabase) {
      setCityData({
        Name: foundInSupabase.name || foundInSupabase.city_name || foundInSupabase.title || 'Destination',
        City: foundInSupabase.city_name || foundInSupabase.city || query,
        State: foundInSupabase.state_name || foundInSupabase.state || 'India',
        Type: '✨ Database Verified Location',
        image_url: foundInSupabase.image_url || foundInSupabase.image || 'https://images.unsplash.com/photo-1588095920028-a433f42f7c6a?auto=format&fit=crop&w=1200&q=80',
        history_geo_political: foundInSupabase.history_geo_political || foundInSupabase.history || foundInSupabase.description || foundInSupabase.details || 'Details loaded from Supabase directory.',
        picnic_spots: foundInSupabase.picnic_spots || foundInSupabase.spots || foundInSupabase.attractions || foundInSupabase.sightseeing || '🏛️ Local heritage points and attractions.',
        transport_roadmap: foundInSupabase.transport_roadmap || foundInSupabase.transport || foundInSupabase.road || 'Road & rail connectivity available.',
        hotels_booking: foundInSupabase.hotels_booking || foundInSupabase.hotels || foundInSupabase.stays || '🏨 Local stays and verified hotels.',
        markets_food: foundInSupabase.markets_food || foundInSupabase.food || foundInSupabase.markets || '🛍️ Local markets and regional food.',
        culture_helpline: foundInSupabase.culture_helpline || foundInSupabase.helpline || foundInSupabase.sos || 'Helpline: SOS: 112'
      });
    } else if (CITIES_DB[key]) {
      setCityData(CITIES_DB[key]);
    } else {
      const cap = query.trim().charAt(0).toUpperCase() + query.trim().slice(1);
      setCityData({
        Name: `${cap} - Heritage & Culture Hub`,
        City: cap,
        State: 'India',
        Type: '✨ Verified Regional Destination',
        image_url: 'https://images.unsplash.com/photo-1588095920028-a433f42f7c6a?auto=format&fit=crop&w=1200&q=80',
        history_geo_political: `History & Geography details for ${cap}.`,
        picnic_spots: `🏛️ Main attractions of ${cap}`,
        transport_roadmap: `Transport links for ${cap}`,
        hotels_booking: `Hotels in ${cap}`,
        markets_food: `Markets and food of ${cap}`,
        culture_helpline: `Helpline: 112`
      });
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans pb-32 selection:bg-orange-500 selection:text-white">
      
      {/* Header */}
      <header className="sticky top-0 z-50 bg-slate-950/90 backdrop-blur-2xl border-b border-slate-800/80 px-4 py-3.5 flex justify-between items-center shadow-2xl">
        <div className="flex items-center gap-3 cursor-pointer" onClick={() => window.location.reload()}>
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-orange-600 via-amber-500 to-orange-400 flex items-center justify-center text-xl shadow-lg shadow-orange-500/20">
            🇮🇳
          </div>
          <div>
            <div className="flex items-center font-black tracking-wider text-xl leading-none">
              <span className="text-orange-500">IN</span>
              <span className="text-white">BHARAT</span>
            </div>
            <span className="text-[10px] text-amber-400 font-bold uppercase tracking-widest block mt-0.5">
              👑 Ultimate Travel Super-App
            </span>
          </div>
        </div>

        <div className="flex gap-2">
          <button onClick={() => setShowBizModal(true)} className="bg-emerald-500/10 text-emerald-400 text-xs font-bold px-3 py-2 rounded-xl border border-emerald-500/30 flex items-center gap-1">
            <span>💼</span> <span>List Biz</span>
          </button>
          <button onClick={() => setShowBookingModal(true)} className="bg-orange-500/10 text-orange-400 text-xs font-bold px-3 py-2 rounded-xl border border-orange-500/30 flex items-center gap-1">
            <span>🏨</span> <span>Book</span>
          </button>
        </div>
      </header>

      {/* Hero Search Section */}
      <section className="px-4 pt-10 pb-6 max-w-2xl mx-auto text-center relative">
        <div className="absolute inset-0 bg-gradient-to-b from-orange-500/15 via-transparent to-transparent pointer-events-none blur-3xl"></div>
        
        <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-white mb-3">
          One Search. <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 via-amber-400 to-yellow-300">Complete India.</span>
        </h1>
        <p className="text-xs sm:text-sm text-slate-400 max-w-lg mx-auto mb-6">
          Unifying scattered Google data into a single click: History, Geography, Picnic Spots with distance, Road Maps, Hotels & SOS.
        </p>

        <div className="relative z-10 max-w-xl mx-auto mb-5">
          <div className="flex bg-slate-900/90 rounded-2xl p-2 border border-slate-800 focus-within:border-orange-500 transition shadow-2xl backdrop-blur-md">
            <span className="flex items-center pl-3 text-orange-400 text-lg">🔍</span>
            <input
              type="text"
              placeholder="Search any city from your database..."
              value={searchTerm}
              onChange={(e) => handleSearch(e.target.value)}
              className="flex-1 bg-transparent px-3 py-3 text-xs sm:text-sm text-slate-100 placeholder-slate-500 outline-none font-semibold"
            />
            <button onClick={() => handleSearch(searchTerm)} className="bg-gradient-to-r from-orange-500 to-amber-500 text-white font-black text-xs px-6 py-3 rounded-xl shadow-lg">
              Search
            </button>
          </div>
        </div>
      </section>

      {/* Comprehensive Intelligence Card */}
      <main className="px-4 max-w-xl mx-auto space-y-6 relative z-10">
        <div className="bg-slate-900/90 border border-slate-800 rounded-3xl overflow-hidden shadow-2xl backdrop-blur-xl">
          
          <div className="relative h-64 bg-slate-950 overflow-hidden">
            <img src={cityData.image_url} alt={cityData.Name} className="w-full h-full object-cover opacity-90" />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/50 to-transparent"></div>
            
            <div className="absolute top-3 left-3">
              <span className="bg-orange-500/90 text-white font-black text-[10px] px-3.5 py-1.5 rounded-full shadow-lg">
                {cityData.Type}
              </span>
            </div>

            <div className="absolute bottom-4 left-4 right-4">
              <h3 className="text-2xl font-black text-white">{cityData.Name}</h3>
              <p className="text-xs text-amber-300 font-bold mt-1">📍 {cityData.City}, {cityData.State}</p>
            </div>
          </div>

          {/* Navigation Tabs */}
          <div className="flex border-b border-slate-800 bg-slate-950/70 text-[10px] sm:text-[11px] font-bold text-slate-400 overflow-x-auto no-scrollbar">
            {[
              { key: 'overview', label: 'History & Geo', icon: '📜' },
              { key: 'picnic', label: 'Picnic Spots', icon: '🌿' },
              { key: 'transit', label: 'Road & Transit', icon: '🚗' },
              { key: 'hotel', label: 'Hotels', icon: '🏨' },
              { key: 'marketfood', label: 'Food & Market', icon: '🍲' },
              { key: 'sos', label: 'Helpline SOS', icon: '🚨' },
            ].map(tab => (
              <button key={tab.key} onClick={() => setActiveTab(tab.key)} className={`flex-1 py-3 px-2.5 whitespace-nowrap border-b-2 transition flex flex-col items-center gap-1 ${activeTab === tab.key ? 'border-orange-500 text-orange-400 bg-slate-900 font-black' : 'border-transparent text-slate-400'}`}>
                <span className="text-sm">{tab.icon}</span> <span>{tab.label}</span>
              </button>
            ))}
          </div>

          {/* Tab Content Panels */}
          <div className="p-5 space-y-4 text-xs text-slate-300 font-medium">
            
            {activeTab === 'overview' && (
              <div className="bg-slate-950/60 p-4 rounded-2xl border border-slate-800 space-y-2">
                <span className="text-amber-400 font-black block text-sm flex items-center gap-2">
                  <span>📜</span> History, Geography & Political Profile
                </span>
                <p className="leading-relaxed pt-1 whitespace-pre-line">{cityData.history_geo_political}</p>
              </div>
            )}

            {activeTab === 'picnic' && (
              <div className="bg-slate-950/60 p-4 rounded-2xl border border-slate-800 space-y-2">
                <span className="text-orange-400 font-black block text-sm flex items-center gap-2">
                  <span>🌿</span> Picnic Spots & Sightseeing with Distance
                </span>
                <p className="leading-relaxed pt-1 whitespace-pre-line">{cityData.picnic_spots}</p>
              </div>
            )}

            {activeTab === 'transit' && (
              <div className="bg-slate-950/60 p-4 rounded-2xl border border-slate-800 space-y-2">
                <span className="text-sky-400 font-black block text-sm flex items-center gap-2">
                  <span>🚗</span> Road Maps, Route & Transport Taxi
                </span>
                <p className="leading-relaxed pt-1 whitespace-pre-line">{cityData.transport_roadmap}</p>
              </div>
            )}

            {activeTab === 'hotel' && (
              <div className="bg-slate-950/60 p-4 rounded-2xl border border-slate-800 space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-emerald-400 font-black block text-sm flex items-center gap-2">
                    <span>🏨</span> Hotel & Homestay Booking Options
                  </span>
                  <button onClick={() => setShowBookingModal(true)} className="bg-emerald-500 text-slate-950 font-black text-[10px] px-3 py-1.5 rounded-lg shadow">
                    Book Now
                  </button>
                </div>
                <p className="leading-relaxed pt-1 whitespace-pre-line">{cityData.hotels_booking}</p>
              </div>
            )}

            {activeTab === 'marketfood' && (
              <div className="space-y-3">
                <div className="bg-slate-950/60 p-3.5 rounded-2xl border border-slate-800">
                  <span className="text-emerald-400 font-black block mb-1 flex items-center gap-2">
                    <span>🛍️</span> Famous Markets & Shopping
                  </span>
                  <p className="whitespace-pre-line">{cityData.markets_food}</p>
                </div>
              </div>
            )}

            {activeTab === 'sos' && (
              <div className="bg-red-950/20 p-4 rounded-2xl border border-red-900/40 space-y-2">
                <span className="text-red-400 font-black block text-sm flex items-center gap-2">
                  <span>🚨</span> Emergency Helpline & Culture SOS
                </span>
                <p className="font-bold text-slate-100 text-sm leading-relaxed whitespace-pre-line">{cityData.culture_helpline}</p>
              </div>
            )}

          </div>

        </div>
      </main>

      {/* Booking Modal */}
      {showBookingModal && (
        <div className="fixed inset-0 bg-slate-950/85 backdrop-blur-md flex items-center justify-center p-4 z-50">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl w-full max-w-md p-6 text-xs text-slate-200 shadow-2xl space-y-3">
            <h3 className="font-black text-white text-base flex items-center gap-2">
              <span>🏨</span> Book Hotel / Stay in {cityData.City}
            </h3>
            <input type="text" placeholder="Full Name *" className="w-full bg-slate-950 p-3 rounded-xl border border-slate-800 text-white outline-none" />
            <input type="tel" placeholder="Mobile Number *" className="w-full bg-slate-950 p-3 rounded-xl border border-slate-800 text-white outline-none" />
            <button onClick={() => { alert('Hotel booking confirmed!'); setShowBookingModal(false); }} className="w-full bg-gradient-to-r from-emerald-600 to-teal-600 text-white font-black py-3 rounded-xl mt-2 shadow-lg">
              Confirm Booking
            </button>
            <button onClick={() => setShowBookingModal(false)} className="w-full text-slate-500 py-1 font-semibold">Cancel</button>
          </div>
        </div>
      )}

      {/* Business Listing Modal */}
      {showBizModal && (
        <div className="fixed inset-0 bg-slate-950/85 backdrop-blur-md flex items-center justify-center p-4 z-50">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl w-full max-w-md p-6 text-xs text-slate-200 shadow-2xl space-y-3">
            <h3 className="font-black text-white text-base flex items-center gap-2">
              <span>💼</span> List Your Business / Hotel
            </h3>
            <input type="text" placeholder="Business Name *" className="w-full bg-slate-950 p-3 rounded-xl border border-slate-800 text-white outline-none" />
            <input type="tel" placeholder="Phone Number *" className="w-full bg-slate-950 p-3 rounded-xl border border-slate-800 text-white outline-none" />
            <button onClick={() => { alert('Business listed successfully!'); setShowBizModal(false); }} className="w-full bg-gradient-to-r from-orange-500 to-amber-500 text-white font-black py-3 rounded-xl mt-2 shadow-lg">
              Submit Listing
            </button>
            <button onClick={() => setShowBizModal(false)} className="w-full text-slate-500 py-1 font-semibold">Cancel</button>
          </div>
        </div>
      )}

      {/* Bottom Nav */}
      <nav className="fixed bottom-3 left-4 right-4 max-w-md mx-auto bg-slate-900/90 backdrop-blur-2xl border border-slate-800 flex justify-around py-3 z-40 rounded-2xl shadow-2xl text-[11px] font-extrabold text-slate-400">
        <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="flex flex-col items-center gap-0.5 text-orange-400"><span>🔍</span><span>Search</span></button>
        <button onClick={() => setShowBizModal(true)} className="flex flex-col items-center gap-0.5 text-emerald-400"><span>💼</span><span>List Biz</span></button>
        <button onClick={() => setShowBookingModal(true)} className="flex flex-col items-center gap-0.5"><span>🏨</span><span>Book</span></button>
      </nav>

    </div>
  );
}
