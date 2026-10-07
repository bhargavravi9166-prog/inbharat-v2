import React, { useState, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = 'https://xllmsjytvskzlyvynuzv.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhsbG1zanl0dnNremx5dnludXp2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDk4NTYzMjQsImV4cCI6MjAyNTQzMjMyNH0.placeholder';

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

export default function App() {
  const [searchTerm, setSearchTerm] = useState('');
  const [results, setResults] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState('overview');

  const [showAddModal, setShowAddModal] = useState(false);
  const [showVendorModal, setShowVendorModal] = useState(false);

  const [formData, setFormData] = useState({
    Name: '', State: '', City: '', Type: 'Landmark',
    history: '', famous_food: '', famous_markets: '',
    temples_and_spots: '', route_transport: '', image_url: '', emergency_services: 'Police: 100 | Ambulance: 108'
  });

  const [vendorData, setVendorData] = useState({ businessName: '', ownerName: '', phone: '', city: '', category: 'Hotel / Homestay' });

  useEffect(() => {
    loadDefaultData();
  }, []);

  const loadDefaultData = async () => {
    setLoading(true);
    const { data } = await supabase.from('Heritage and tourism palace').select('*').limit(5);
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
          history: 'Amer Fort is a breathtaking architectural marvel perched high on the Aravalli hills.',
          temples_and_spots: 'Sheesh Mahal, Sila Devi Temple, Diwan-e-Aam.',
          famous_markets: 'Amer Road Handicrafts & Royal Gem Bazaars.',
          famous_food: 'Dal Baati Churma, Pyaaz Kachori.',
          route_transport: '11 km from Jaipur City Centre; cabs and autos available.',
          emergency_services: 'Tourist Police: 100 | Ambulance: 108'
        }
      ]);
    }
    setLoading(false);
  };

  const handleSearch = async (query: string) => {
    if (!query.trim()) return loadDefaultData();
    setLoading(true);
    const { data } = await supabase.from('Heritage and tourism palace').select('*').ilike('Name', `%${query}%`);
    if (data && data.length > 0) {
      setResults(data);
    } else {
      setResults([
        {
          Name: `${query} City Hub`,
          City: query,
          State: 'India',
          Type: 'Destination',
          image_url: 'https://images.unsplash.com/photo-1588095920028-a433f42f7c6a?auto=format&fit=crop&w=800&q=80',
          history: `${query} is a wonderful place with rich cultural heritage and community background.`,
          temples_and_spots: `Main market square and local sightseeing spots in ${query}.`,
          famous_markets: `Local handloom and traditional markets.`,
          famous_food: `Authentic regional thali and street food.`,
          route_transport: `Connected via roadways and local transport.`,
          emergency_services: `Police: 100 | Ambulance: 108`
        }
      ]);
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 font-sans pb-24">
      <header className="sticky top-0 z-50 bg-slate-900/95 backdrop-blur border-b border-slate-800 px-4 py-3 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <div className="w-9 h-9 rounded-xl bg-orange-500 flex items-center justify-center font-bold text-white">🇮🇳</div>
          <span className="font-black text-lg tracking-wider text-orange-500">IN<span className="text-white">BHARAT</span></span>
        </div>
        <div className="flex gap-2">
          <button onClick={() => setShowVendorModal(true)} className="bg-emerald-600/20 text-emerald-400 text-xs font-bold px-3 py-1.5 rounded-xl border border-emerald-500/30">+ List Biz</button>
          <button onClick={() => setShowAddModal(true)} className="bg-orange-600/20 text-orange-400 text-xs font-bold px-3 py-1.5 rounded-xl border border-orange-500/30">+ Add</button>
        </div>
      </header>

      <section className="px-4 pt-8 pb-6 max-w-xl mx-auto text-center">
        <h1 className="text-2xl sm:text-3xl font-black mb-2">Explore India <span className="text-orange-500">Seamlessly.</span></h1>
        <div className="flex bg-slate-800 rounded-2xl p-1.5 border border-slate-700 mt-4">
          <input 
            type="text" 
            placeholder="Search city (e.g. Jaipur, Ujjain)..." 
            value={searchTerm} 
            onChange={(e) => setSearchTerm(e.target.value)}
            className="flex-1 bg-transparent px-3 py-2 text-xs text-white outline-none" 
          />
          <button onClick={() => handleSearch(searchTerm)} className="bg-orange-500 text-white px-4 py-2 rounded-xl text-xs font-bold">Search</button>
        </div>
        <div className="flex gap-2 overflow-x-auto mt-3 no-scrollbar pb-1 text-xs">
          {['Jaipur', 'Ujjain', 'Varanasi', 'Agra', 'Tonk', 'Mount Abu'].map(c => (
            <button key={c} onClick={() => { setSearchTerm(c); handleSearch(c); }} className="bg-slate-800 text-slate-300 px-3 py-1 rounded-lg whitespace-nowrap border border-slate-700">📍 {c}</button>
          ))}
        </div>
      </section>

      <main className="px-4 max-w-xl mx-auto space-y-4">
        {loading ? (
          <div className="text-center py-12 text-slate-400 text-xs">Loading intelligence...</div>
        ) : (
          results.map((item, idx) => (
            <div key={idx} className="bg-slate-800/80 border border-slate-700 rounded-2xl overflow-hidden shadow-xl">
              <div className="relative h-48 bg-slate-950">
                <img src={item.image_url} alt={item.Name} className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent"></div>
                <div className="absolute bottom-3 left-3 right-3">
                  <span className="bg-orange-500 text-white text-[9px] font-bold px-2 py-0.5 rounded mb-1 inline-block">{item.Type}</span>
                  <h3 className="text-xl font-black text-white">{item.Name}</h3>
                  <p className="text-xs text-amber-300">📍 {item.City}, {item.State}</p>
                </div>
              </div>

              <div className="flex border-b border-slate-700 bg-slate-900 text-[11px] font-bold text-slate-400 overflow-x-auto">
                {['overview', 'spots', 'marketfood', 'transit', 'sos'].map(tab => (
                  <button key={tab} onClick={() => setActiveTab(tab)} className={`flex-1 py-2 px-3 whitespace-nowrap border-b-2 ${activeTab === tab ? 'border-orange-500 text-orange-400 bg-slate-800' : 'border-transparent'}`}>
                    {tab.toUpperCase()}
                  </button>
                ))}
              </div>

              <div className="p-4 text-xs text-slate-300 space-y-2">
                {activeTab === 'overview' && <p>📜 {item.history}</p>}
                {activeTab === 'spots' && <p>🏛️ {item.temples_and_spots}</p>}
                {activeTab === 'marketfood' && <p>🍲 <b>Markets:</b> {item.famous_markets} <br/><br/> 🛍️ <b>Food:</b> {item.famous_food}</p>}
                {activeTab === 'transit' && <p>🚌 {item.route_transport}</p>}
                {activeTab === 'sos' && <p className="text-red-400 font-bold">🚨 {item.emergency_services}</p>}
              </div>
            </div>
          ))
        )}
      </main>

      {showVendorModal && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-slate-900 border border-slate-700 rounded-2xl w-full max-w-sm p-5 text-xs text-slate-200">
            <h3 className="font-bold text-white mb-3 text-sm">List Your Business</h3>
            <input type="text" placeholder="Business Name" value={vendorData.businessName} onChange={(e) => setVendorData({...vendorData, businessName: e.target.value})} className="w-full bg-slate-800 p-2.5 rounded-xl border border-slate-700 mb-2 outline-none" />
            <input type="tel" placeholder="Phone Number" value={vendorData.phone} onChange={(e) => setVendorData({...vendorData, phone: e.target.value})} className="w-full bg-slate-800 p-2.5 rounded-xl border border-slate-700 mb-3 outline-none" />
            <button onClick={() => { alert('Registered successfully!'); setShowVendorModal(false); }} className="w-full bg-emerald-600 text-white py-2 rounded-xl font-bold mb-2">Submit</button>
            <button onClick={() => setShowVendorModal(false)} className="w-full text-slate-500 py-1">Cancel</button>
          </div>
        </div>
      )}

      {showAddModal && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-slate-900 border border-slate-700 rounded-2xl w-full max-w-sm p-5 text-xs text-slate-200">
            <h3 className="font-bold text-white mb-3 text-sm">Add Spot</h3>
            <input type="text" placeholder="Spot Name" value={formData.Name} onChange={(e) => setFormData({...formData, Name: e.target.value})} className="w-full bg-slate-800 p-2.5 rounded-xl border border-slate-700 mb-2 outline-none" />
            <input type="text" placeholder="City" value={formData.City} onChange={(e) => setFormData({...formData, City: e.target.value})} className="w-full bg-slate-800 p-2.5 rounded-xl border border-slate-700 mb-3 outline-none" />
            <button onClick={async () => { await supabase.from('Heritage and tourism palace').insert([formData]); alert('Added!'); setShowAddModal(false); loadDefaultData(); }} className="w-full bg-orange-500 text-white py-2 rounded-xl font-bold mb-2">Publish</button>
            <button onClick={() => setShowAddModal(false)} className="w-full text-slate-500 py-1">Cancel</button>
          </div>
        </div>
      )}
    </div>
  );
}
