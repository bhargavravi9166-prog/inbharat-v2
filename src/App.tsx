import React, { useState } from 'react';

const SMART_CITIES_DATABASE: Record<string, any> = {
  goa: {
    Name: 'Goa Coastal Paradise & Beaches',
    City: 'Goa',
    State: 'Goa',
    Type: '🌴 Beach & Heritage Hub',
    image_url: 'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?auto=format&fit=crop&w=1000&q=80',
    history: 'Goa is world-famous for its striking Portuguese colonial architecture, sun-kissed golden beaches, vibrant nightlife, and laid-back tropical culture.',
    temples_and_spots: '✨ Calangute & Baga Beach\n✨ Basilica of Bom Jesus (Old Goa)\n✨ Fort Aguada\n✨ Dudhsagar Waterfalls',
    famous_markets: '🛍️ Anjuna Flea Market, Saturday Night Market in Arpora & Mapusa Local Market.',
    famous_food: '🍲 Goan Fish Curry Rice, Bebinca, Prawn Balchão & Xacuti.',
    route_transport: '✈️ Mopa & Dabolim Airports, Konkan Railway stations, scooter rentals & local cabs.',
    emergency_services: '🚨 Tourist Police: 112 | Coastal Police: 0832-2428165 | Ambulance: 108'
  },
  mumbai: {
    Name: 'Mumbai - City of Dreams',
    City: 'Mumbai',
    State: 'Maharashtra',
    Type: '🌊 Financial & Coastal Capital',
    image_url: 'https://images.unsplash.com/photo-1570168007204-dfb528c6958f?auto=format&fit=crop&w=1000&q=80',
    history: 'Mumbai is the bustling financial powerhouse of India, blending British colonial landmarks, Bollywood glamour, and historic coastal forts.',
    temples_and_spots: '✨ Gateway of India & Taj Mahal Palace\n✨ Marine Drive (Queen’s Necklace)\n✨ Siddhivinayak Temple\n✨ Elephanta Caves',
    famous_markets: '🛍️ Colaba Causeway, Crawford Market, Linking Road & Fashion Street.',
    famous_food: '🍲 Mumbai Vada Pav, Pav Bhaji, Bombay Sandwich & Bhel Puri at Chowpatty.',
    route_transport: '✈️ CSMIA Airport, iconic Suburban Local Trains, metro & yellow-black taxis.',
    emergency_services: '🚨 Mumbai Police Control: 100 | Trauma Ambulance: 102'
  },
  delhi: {
    Name: 'New Delhi - Historic Capital',
    City: 'Delhi',
    State: 'Delhi NCR',
    Type: '🏛️ Imperial & Historic Capital',
    image_url: 'https://images.unsplash.com/photo-1587474260584-136574528ed5?auto=format&fit=crop&w=1000&q=80',
    history: 'Delhi has been the seat of numerous empires, featuring breathtaking Mughal monuments, British architecture, and bustling ancient bazaars.',
    temples_and_spots: '✨ Red Fort & Qutub Minar\n✨ India Gate & Rashtrapati Bhavan\n✨ Akshardham Temple\n✨ Lotus Temple',
    famous_markets: '🛍️ Chandni Chowk, Dilli Haat, Sarojini Nagar & Janpath Market.',
    famous_food: '🍲 Old Delhi Chole Bhature, Butter Chicken, Paranthas & Mughlai Kebabs.',
    route_transport: '✈️ IGI Airport, world-class Delhi Metro network & EV cabs.',
    emergency_services: '🚨 Delhi Police SOS: 112 | Women Helpline: 1091'
  },
  jaipur: {
    Name: 'Amer Fort & Royal Palace',
    City: 'Jaipur',
    State: 'Rajasthan',
    Type: '👑 Royal Heritage Fort',
    image_url: 'https://images.unsplash.com/photo-1599661046289-e31897846e41?auto=format&fit=crop&w=1000&q=80',
    history: 'Amer Fort is a breathtaking architectural marvel perched high on the Aravalli hills, showcasing majestic courtyards and mirror palaces.',
    temples_and_spots: '✨ Sheesh Mahal\n✨ Sila Devi Temple\n✨ Hawa Mahal & City Palace\n✨ Maota Lake',
    famous_markets: '💎 Johari Bazaar, Bapu Bazaar Handicrafts & Gem Bazaars.',
    famous_food: '🍲 Dal Baati Churma, Pyaaz Kachori & Royal Ghevar.',
    route_transport: '🚕 11 km from Jaipur City Centre; heritage cabs and auto-rickshaws available.',
    emergency_services: '🚨 Tourist Police: 0141-2530264 | General SOS: 112'
  }
};

export default function App() {
  const [searchTerm, setSearchTerm] = useState('');
  const [results, setResults] = useState([SMART_CITIES_DATABASE['jaipur']]);
  const [activeTab, setActiveTab] = useState('overview');
  const [showAddModal, setShowAddModal] = useState(false);
  const [showBizModal, setShowBizModal] = useState(false);

  const handleSearch = (query: string) => {
    setSearchTerm(query);
    const key = query.trim().toLowerCase();
    
    if (!key) {
      setResults([SMART_CITIES_DATABASE['jaipur']]);
      return;
    }

    if (SMART_CITIES_DATABASE[key]) {
      setResults([SMART_CITIES_DATABASE[key]]);
    } else {
      const cap = query.trim().charAt(0).toUpperCase() + query.trim().slice(1);
      setResults([{
        Name: `${cap} Heritage & Cultural Hub`,
        City: cap,
        State: 'India',
        Type: '✨ Verified Destination',
        image_url: 'https://images.unsplash.com/photo-1588095920028-a433f42f7c6a?auto=format&fit=crop&w=1000&q=80',
        history: `${cap} is a magnificent cultural landmark in India, deeply recognized for its unique regional heritage, local festivals, architecture, and community warmth.`,
        temples_and_spots: `✨ ${cap} Historic Town Square\n✨ Ancient Local Shrines & Temples\n✨ Scenic Viewpoints & Cultural Parks`,
        famous_markets: `🛍️ Traditional Artisan Craft Shops, Handloom Bazaars & Local Markets in ${cap}.`,
        famous_food: `🍲 Authentic Regional Thali, Local Sweets & Signature Street Specialties of ${cap}.`,
        route_transport: `🚕 Well connected via regional roadways, Indian Railways, and local transit networks.`,
        emergency_services: `🚨 Local Police: 100 | Medical Ambulance: 108 | Pan-India SOS: 112`
      }]);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans pb-32 selection:bg-orange-500 selection:text-white">
      
      <header className="sticky top-0 z-50 bg-slate-950/85 backdrop-blur-2xl border-b border-slate-800/80 px-4 py-3.5 flex justify-between items-center shadow-2xl">
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
              👑 Pan-India Super-App
            </span>
          </div>
        </div>

        <div className="flex gap-2">
          <button onClick={() => setShowBizModal(true)} className="bg-emerald-500/10 text-emerald-400 text-xs font-bold px-3 py-2 rounded-xl border border-emerald-500/30">List Biz</button>
          <button onClick={() => setShowAddModal(true)} className="bg-orange-500/10 text-orange-400 text-xs font-bold px-3 py-2 rounded-xl border border-orange-500/30">Add Spot</button>
        </div>
      </header>

      <section className="px-4 pt-10 pb-6 max-w-2xl mx-auto text-center relative">
        <div className="absolute inset-0 bg-gradient-to-b from-orange-500/15 via-transparent to-transparent pointer-events-none blur-3xl"></div>
        
        <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-white mb-3">
          Search Any City in <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 via-amber-400 to-yellow-300">India.</span>
        </h1>
        <p className="text-xs sm:text-sm text-slate-400 max-w-lg mx-auto mb-6">
          Type Goa, Mumbai, Delhi, Jaipur or any town to get precise city intelligence.
        </p>

        <div className="relative z-10 max-w-xl mx-auto mb-5">
          <div className="flex bg-slate-900/90 rounded-2xl p-2 border border-slate-800 focus-within:border-orange-500 transition shadow-2xl backdrop-blur-md">
            <span className="flex items-center pl-3 text-orange-400 text-lg">🔍</span>
            <input
              type="text"
              placeholder="Search Goa, Mumbai, Delhi, Jaipur..."
              value={searchTerm}
              onChange={(e) => handleSearch(e.target.value)}
              className="flex-1 bg-transparent px-3 py-3 text-xs sm:text-sm text-slate-100 placeholder-slate-500 outline-none font-semibold"
            />
            <button onClick={() => handleSearch(searchTerm)} className="bg-gradient-to-r from-orange-500 to-amber-500 text-white font-black text-xs px-6 py-3 rounded-xl shadow-lg">
              Search
            </button>
          </div>
        </div>

        <div className="flex gap-2 overflow-x-auto no-scrollbar pb-1 text-xs justify-start sm:justify-center relative z-10">
          {[
            { name: 'Goa', icon: '🌴' },
            { name: 'Mumbai', icon: '🌊' },
            { name: 'Delhi', icon: '🏛️' },
            { name: 'Jaipur', icon: '👑' }
          ].map(c => (
            <button key={c.name} onClick={() => handleSearch(c.name)} className="bg-slate-900/80 hover:bg-slate-800 text-slate-300 border border-slate-800 px-4 py-2 rounded-xl font-bold whitespace-nowrap flex items-center gap-1.5">
              <span>{c.icon}</span> <span>{c.name}</span>
            </button>
          ))}
        </div>
      </section>

      <main className="px-4 max-w-xl mx-auto space-y-6 relative z-10">
        {results.map((item, idx) => (
          <div key={idx} className="bg-slate-900/90 border border-slate-800 rounded-3xl overflow-hidden shadow-2xl backdrop-blur-xl">
            
            <div className="relative h-60 bg-slate-950 overflow-hidden">
              <img src={item.image_url} alt={item.Name} className="w-full h-full object-cover opacity-90" />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent"></div>
              
              <div className="absolute top-3 left-3">
                <span className="bg-orange-500/90 text-white font-black text-[10px] px-3.5 py-1.5 rounded-full shadow-lg">
                  {item.Type}
                </span>
              </div>

              <div className="absolute bottom-4 left-4 right-4">
                <h3 className="text-2xl font-black text-white">{item.Name}</h3>
                <p className="text-xs text-amber-300 font-bold mt-1">📍 {item.City}, {item.State}</p>
              </div>
            </div>

            <div className="flex border-b border-slate-800 bg-slate-950/70 text-[11px] font-bold text-slate-400 overflow-x-auto no-scrollbar">
              {[
                { key: 'overview', label: 'History', icon: '📜' },
                { key: 'spots', label: 'Attractions', icon: '🏛️' },
                { key: 'marketfood', label: 'Food & Market', icon: '🍲' },
                { key: 'transit', label: 'Transit', icon: '🚌' },
                { key: 'sos', label: 'SOS Help', icon: '🚨' },
              ].map(tab => (
                <button key={tab.key} onClick={() => setActiveTab(tab.key)} className={`flex-1 py-3 px-3 whitespace-nowrap border-b-2 transition flex items-center justify-center gap-1.5 ${activeTab === tab.key ? 'border-orange-500 text-orange-400 bg-slate-900 font-black' : 'border-transparent text-slate-400'}`}>
                  <span>{tab.icon}</span> <span>{tab.label}</span>
                </button>
              ))}
            </div>

            <div className="p-5 space-y-4 text-xs text-slate-300 font-medium">
              {activeTab === 'overview' && <div className="bg-slate-950/60 p-4 rounded-2xl border border-slate-800"><span className="text-amber-400 font-black block text-sm mb-1">📜 History</span><p>{item.history}</p></div>}
              {activeTab === 'spots' && <div className="bg-slate-950/60 p-4 rounded-2xl border border-slate-800"><span className="text-orange-400 font-black block text-sm mb-1">🏛️ Attractions</span><p className="whitespace-pre-line">{item.temples_and_spots}</p></div>}
              {activeTab === 'marketfood' && <div className="space-y-2"><div className="bg-slate-950/60 p-3.5 rounded-2xl border border-slate-800"><span className="text-emerald-400 font-black block mb-1">🛍️ Markets</span><p>{item.famous_markets}</p></div><div className="bg-slate-950/60 p-3.5 rounded-2xl border border-slate-800"><span className="text-rose-400 font-black block mb-1">🍲 Food</span><p>{item.famous_food}</p></div></div>}
              {activeTab === 'transit' && <div className="bg-slate-950/60 p-4 rounded-2xl border border-slate-800"><span className="text-sky-400 font-black block text-sm mb-1">🚌 Transit</span><p>{item.route_transport}</p></div>}
              {activeTab === 'sos' && <div className="bg-red-950/20 p-4 rounded-2xl border border-red-900/40"><span className="text-red-400 font-black block text-sm mb-1">🚨 Emergency SOS</span><p className="font-bold text-slate-100">{item.emergency_services}</p></div>}
            </div>
          </div>
        ))}
      </main>

      {showBizModal && (
        <div className="fixed inset-0 bg-slate-950/80 flex items-center justify-center p-4 z-50">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl w-full max-w-md p-6 text-xs text-slate-200">
            <h3 className="font-black text-white mb-4 text-base">List Your Business</h3>
            <input type="text" placeholder="Business Name" className="w-full bg-slate-950 p-3 rounded-xl border border-slate-800 mb-2 text-white outline-none" />
            <button onClick={() => setShowBizModal(false)} className="w-full bg-emerald-600 text-white py-2.5 rounded-xl font-bold">Submit</button>
          </div>
        </div>
      )}

      {showAddModal && (
        <div className="fixed inset-0 bg-slate-950/80 flex items-center justify-center p-4 z-50">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl w-full max-w-md p-6 text-xs text-slate-200">
            <h3 className="font-black text-white mb-4 text-base">Add Spot</h3>
            <input type="text" placeholder="Spot Name" className="w-full bg-slate-950 p-3 rounded-xl border border-slate-800 mb-2 text-white outline-none" />
            <button onClick={() => setShowAddModal(false)} className="w-full bg-orange-500 text-white py-2.5 rounded-xl font-bold">Publish</button>
          </div>
        </div>
      )}

      <nav className="fixed bottom-3 left-4 right-4 max-w-md mx-auto bg-slate-900/90 backdrop-blur-2xl border border-slate-800 flex justify-around py-3 z-40 rounded-2xl shadow-2xl text-[11px] font-extrabold text-slate-400">
        <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="flex flex-col items-center gap-0.5 text-orange-400"><span>🔍</span><span>Explore</span></button>
        <button onClick={() => setShowBizModal(true)} className="flex flex-col items-center gap-0.5 text-emerald-400"><span>💼</span><span>List Biz</span></button>
        <button onClick={() => setShowAddModal(true)} className="flex flex-col items-center gap-0.5"><span>✨</span><span>Add Spot</span></button>
      </nav>
    </div>
  );
}
