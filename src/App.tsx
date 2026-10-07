import React, { useState } from 'react';

const RICH_TRAVEL_DATA = [
  {
    id: 1,
    Name: 'Amer Fort & Royal Palace',
    City: 'Jaipur',
    State: 'Rajasthan',
    category: 'Monuments',
    Type: '👑 Royal Heritage Fort',
    image_url: 'https://images.unsplash.com/photo-1599661046289-e31897846e41?auto=format&fit=crop&w=1000&q=80',
    history: 'Amer Fort is a breathtaking architectural marvel perched high on the Aravalli hills, showcasing majestic courtyards, mirror palaces (Sheesh Mahal), and rich Rajputana grandeur.',
    temples_and_spots: '✨ Sheesh Mahal (Mirror Palace)\n✨ Sila Devi Temple\n✨ Diwan-e-Aam & Diwan-e-Khas\n✨ Maota Lake Boat Ride',
    famous_markets: '💎 Amer Road Handicrafts, Royal Gem Bazaars, Kundan Meena Jewelry & Block-print textiles.',
    famous_food: '🍲 Authentic Dal Baati Churma, Spicy Pyaaz Kachori, Ker Sangri & Sweet Royal Ghevar.',
    route_transport: '🚕 11 km from Jaipur City Centre; heritage luxury cabs, auto-rickshaws, and electric buses readily available.',
    emergency_services: '🚨 Tourist Police Station (Amer): 0141-2530264 | General SOS: 112 | Ambulance: 108'
  },
  {
    id: 2,
    Name: 'Mahakaleshwar Jyotirlinga',
    City: 'Ujjain',
    State: 'Madhya Pradesh',
    category: 'Temples',
    Type: '🛕 Divine Spiritual Hub',
    image_url: 'https://images.unsplash.com/photo-1588095920028-a433f42f7c6a?auto=format&fit=crop&w=1000&q=80',
    history: 'Ujjain is one of the holiest Sapta Puris, famous worldwide for the powerful Swayambhu Mahakal Jyotirlinga and the magnificent Mahakal Lok corridor.',
    temples_and_spots: '✨ Mahakal Lok Corridor (Shiv Stambh & murals)\n✨ Harsiddhi Shakti Peeth\n✨ Kshipra River Ram Ghat\n✨ Kaal Bhairav Temple',
    famous_markets: '📿 Sacred Rudraksha Beads, Traditional Malwa Handicrafts, Brass Idols & Pooja items.',
    famous_food: '🍲 Indori Poha-Jalebi, Dal Bafla, Bhutte ka Kees & Malvani Sweets.',
    route_transport: '🚆 Well connected via Ujjain Junction railway station and Devi Ahilya Bai Holkar Airport Indore (55 km).',
    emergency_services: '🚨 Mahakal Police Station: 0734-2550122 | Emergency Helpline: 112'
  },
  {
    id: 3,
    Name: 'Kashi Vishwanath Temple',
    City: 'Varanasi',
    State: 'Uttar Pradesh',
    category: 'Temples',
    Type: '✨ Eternal Cultural Capital',
    image_url: 'https://images.unsplash.com/photo-1561359313-0639aad49f6d?auto=format&fit=crop&w=1000&q=80',
    history: 'Varanasi, or Kashi, is one of the oldest living cities in the world, situated on the sacred crescent banks of the holy Ganges river.',
    temples_and_spots: '✨ Dashashwamedh Ghat Grand Ganga Aarti\n✨ Kashi Vishwanath Dham Corridor\n✨ Sarnath Buddhist Excavations\n✨ Manikarnika Ghat',
    famous_markets: '👘 World-famous Banarasi Silk Sarees, Brocade Fabrics, Wooden Toys & Brassware.',
    famous_food: '🍲 Banarasi Paan, Malaiyyo Winter Delicacy, Tamatar Chaat & Kachori Jalebi.',
    route_transport: '✈️ Lal Bahadur Shastri International Airport, Varanasi Cantt Railway Station & iconic boat rides.',
    emergency_services: '🚨 Chowk Police Station: 0542-2393044 | Tourist Helpline: 1363'
  },
  {
    id: 4,
    Name: 'Taj Mahal & Agra Fort',
    City: 'Agra',
    State: 'Uttar Pradesh',
    category: 'Monuments',
    Type: '🕌 World Wonder & Heritage',
    image_url: 'https://images.unsplash.com/photo-1564507592333-c60657eea523?auto=format&fit=crop&w=1000&q=80',
    history: 'Agra is home to the timeless Taj Mahal, an ivory-white marble mausoleum on the right bank of the river Yamuna, built by Mughal Emperor Shah Jahan.',
    temples_and_spots: '✨ Taj Mahal Sunrise View\n✨ Agra Fort Red Sandstone Palaces\n✨ Mehtab Bagh Sunset Point\n✨ Fatehpur Sikri (35 km)',
    famous_markets: '🏺 Pietra Dura Marble Inlay Artifacts, Leather Footwear & Zari Zardozi Embroidery.',
    famous_food: '🍲 Agra ka Petha (Multiple flavors), Bedmi Puri & Mughlai Kebabs.',
    route_transport: '🚆 Agra Cantt Railway Station, Yamuna Expressway Cabs & Battery Rickshaws near monuments.',
    emergency_services: '🚨 Tajganj Police Station: 0562-2330012 | Police SOS: 112'
  }
];

export default function App() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [results, setResults] = useState(RICH_TRAVEL_DATA);
  const [activeTab, setActiveTab] = useState('overview');
  const [showAddModal, setShowAddModal] = useState(false);
  const [showBizModal, setShowBizModal] = useState(false);

  const [newSpot, setNewSpot] = useState({ Name: '', City: '', State: 'Rajasthan', Type: '🌟 Premium Spot', history: '', image_url: 'https://images.unsplash.com/photo-1588095920028-a433f42f7c6a?auto=format&fit=crop&w=1000&q=80' });
  const [newBiz, setNewBiz] = useState({ bizName: '', owner: '', phone: '', category: 'Hotel / Resort' });

  const filterByCategory = (cat: string) => {
    setSelectedCategory(cat);
    if (cat === 'All') {
      setResults(RICH_TRAVEL_DATA);
    } else {
      setResults(RICH_TRAVEL_DATA.filter(item => item.category === cat));
    }
  };

  const handleSearch = (query: string) => {
    setSearchTerm(query);
    if (!query.trim()) {
      setResults(RICH_TRAVEL_DATA);
      return;
    }
    const filtered = RICH_TRAVEL_DATA.filter(s => 
      s.Name.toLowerCase().includes(query.toLowerCase()) || 
      s.City.toLowerCase().includes(query.toLowerCase())
    );
    if (filtered.length > 0) {
      setResults(filtered);
    } else {
      setResults([{
        id: 99,
        Name: `${query} Verified Cultural Hub`,
        City: query,
        State: 'InBharat Network',
        category: 'Custom',
        Type: '✨ Verified Destination',
        image_url: 'https://images.unsplash.com/photo-1588095920028-a433f42f7c6a?auto=format&fit=crop&w=1000&q=80',
        history: `${query} is an incredible cultural landmark rich in regional history, traditional festivals, and vibrant local community networks.`,
        temples_and_spots: `✨ Historic Town Square\n✨ Ancient Temples\n✨ Scenic Riverfront Viewpoints`,
        famous_markets: `🛍️ Local Handloom Bazaar, Traditional Artisan Shops & Handicrafts.`,
        famous_food: `🍲 Authentic Regional Thali, Local Sweets & Famous Street Delicacies.`,
        route_transport: `🚕 Connected via major state highways, local auto-rickshaws, and taxi services.`,
        emergency_services: `🚨 Local Police: 100 | Hospital & Ambulance: 108`
      }]);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans pb-32 selection:bg-orange-500 selection:text-white">
      
      {/* Luxurious Glass Header */}
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
              👑 Ultra Travel Super-App
            </span>
          </div>
        </div>

        <div className="flex gap-2">
          <button onClick={() => setShowBizModal(true)} className="bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 font-bold text-xs px-3 py-2 rounded-xl transition shadow-sm active:scale-95 flex items-center gap-1.5">
            <span>💼</span> <span className="hidden sm:inline">List Biz</span>
          </button>
          <button onClick={() => setShowAddModal(true)} className="bg-orange-500/10 hover:bg-orange-500/20 text-orange-400 border border-orange-500/30 font-bold text-xs px-3 py-2 rounded-xl transition shadow-sm active:scale-95 flex items-center gap-1.5">
            <span>✨</span> <span className="hidden sm:inline">Add Spot</span>
          </button>
        </div>
      </header>

      {/* Hero Search Section */}
      <section className="px-4 pt-10 pb-6 max-w-2xl mx-auto text-center relative">
        <div className="absolute inset-0 bg-gradient-to-b from-orange-500/15 via-transparent to-transparent pointer-events-none blur-3xl"></div>
        
        <span className="inline-flex items-center gap-1.5 bg-gradient-to-r from-orange-500/10 to-amber-500/10 text-orange-400 border border-orange-500/20 text-xs font-bold px-4 py-1.5 rounded-full mb-4 shadow-inner">
          🌟 India's Premier Heritage & Utility Ecosystem
        </span>
        <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-white mb-3">
          Explore Any Destination, <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 via-amber-400 to-yellow-300">Luxuriously.</span>
        </h1>
        <p className="text-xs sm:text-sm text-slate-400 max-w-lg mx-auto mb-6 font-medium">
          Verified heritage history, exclusive sightseeing spots, royal food, transit maps, and instant emergency SOS.
        </p>

        {/* Search Bar */}
        <div className="relative z-10 max-w-xl mx-auto mb-5">
          <div className="flex bg-slate-900/90 rounded-2xl p-2 border border-slate-800 focus-within:border-orange-500 transition shadow-2xl backdrop-blur-md">
            <span className="flex items-center pl-3 text-orange-400 text-lg">🔍</span>
            <input
              type="text"
              placeholder="Search city, fort or temple (e.g. Jaipur, Ujjain)..."
              value={searchTerm}
              onChange={(e) => handleSearch(e.target.value)}
              className="flex-1 bg-transparent px-3 py-3 text-xs sm:text-sm text-slate-100 placeholder-slate-500 outline-none font-semibold"
            />
            <button onClick={() => handleSearch(searchTerm)} className="bg-gradient-to-r from-orange-500 to-amber-500 text-white font-black text-xs sm:text-sm px-6 py-3 rounded-xl transition shadow-lg shadow-orange-500/25 active:scale-95">
              Explore
            </button>
          </div>
        </div>

        {/* Category Filter Tabs */}
        <div className="flex gap-2 overflow-x-auto no-scrollbar pb-1 text-xs justify-start sm:justify-center relative z-10">
          {[
            { label: 'All Destinations', icon: '🌟', val: 'All' },
            { label: 'Royal Forts', icon: '🏰', val: 'Monuments' },
            { label: 'Divine Temples', icon: '🛕', val: 'Temples' }
          ].map(cat => (
            <button
              key={cat.val}
              onClick={() => filterByCategory(cat.val)}
              className={`px-4 py-2 rounded-xl font-bold whitespace-nowrap transition shadow-sm active:scale-95 flex items-center gap-1.5 border ${
                selectedCategory === cat.val
                  ? 'bg-orange-500 text-white border-orange-400 shadow-lg shadow-orange-500/20'
                  : 'bg-slate-900/80 text-slate-300 border-slate-800 hover:bg-slate-800'
              }`}
            >
              <span>{cat.icon}</span> <span>{cat.label}</span>
            </button>
          ))}
        </div>
      </section>

      {/* Main Cards Feed */}
      <main className="px-4 max-w-xl mx-auto space-y-6 relative z-10">
        {results.map((item) => (
          <div key={item.id} className="bg-slate-900/90 border border-slate-800 rounded-3xl overflow-hidden shadow-2xl backdrop-blur-xl">
            
            <div className="relative h-60 bg-slate-950 overflow-hidden">
              <img src={item.image_url} alt={item.Name} className="w-full h-full object-cover opacity-90 hover:scale-105 transition duration-700" />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent"></div>
              
              <div className="absolute top-3 left-3">
                <span className="bg-orange-500/90 backdrop-blur-md text-white font-black text-[10px] px-3.5 py-1.5 rounded-full shadow-lg border border-orange-400/30">
                  {item.Type}
                </span>
              </div>

              <div className="absolute bottom-4 left-4 right-4">
                <h3 className="text-2xl font-black text-white tracking-tight drop-shadow-md">{item.Name}</h3>
                <p className="text-xs text-amber-300 font-bold mt-1 flex items-center gap-1">
                  <span>📍</span> {item.City}, {item.State}
                </p>
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
                <button
                  key={tab.key}
                  onClick={() => setActiveTab(tab.key)}
                  className={`flex-1 py-3 px-3 whitespace-nowrap border-b-2 transition flex items-center justify-center gap-1.5 ${
                    activeTab === tab.key
                      ? 'border-orange-500 text-orange-400 bg-slate-900 font-black shadow-sm'
                      : 'border-transparent text-slate-400 hover:text-slate-200'
                  }`}
                >
                  <span className="text-sm">{tab.icon}</span>
                  <span>{tab.label}</span>
                </button>
              ))}
            </div>

            <div className="p-5 space-y-4 text-xs text-slate-300 font-medium">
              {activeTab === 'overview' && (
                <div className="bg-slate-950/60 p-4 rounded-2xl border border-slate-800 shadow-inner space-y-1.5">
                  <span className="text-amber-400 font-black block text-sm flex items-center gap-2">
                    <span>📜</span> Heritage & History Overview
                  </span>
                  <p className="text-slate-300 leading-relaxed pt-1">{item.history}</p>
                </div>
              )}

              {activeTab === 'spots' && (
                <div className="bg-slate-950/60 p-4 rounded-2xl border border-slate-800 shadow-inner space-y-1.5">
                  <span className="text-orange-400 font-black block text-sm flex items-center gap-2">
                    <span>🏛️</span> Key Sightseeing Monuments
                  </span>
                  <p className="text-slate-300 leading-relaxed pt-1 whitespace-pre-line">{item.temples_and_spots}</p>
                </div>
              )}

              {activeTab === 'marketfood' && (
                <div className="grid grid-cols-1 gap-3">
                  <div className="bg-slate-950/60 p-3.5 rounded-2xl border border-slate-800">
                    <span className="text-emerald-400 font-black block mb-1 flex items-center gap-2">
                      <span>🛍️</span> Famous Local Markets
                    </span>
                    <p className="text-slate-300">{item.famous_markets}</p>
                  </div>
                  <div className="bg-slate-950/60 p-3.5 rounded-2xl border border-slate-800">
                    <span className="text-rose-400 font-black block mb-1 flex items-center gap-2">
                      <span>🍲</span> Famous Food & Delicacies
                    </span>
                    <p className="text-slate-300">{item.famous_food}</p>
                  </div>
                </div>
              )}

              {activeTab === 'transit' && (
                <div className="bg-slate-950/60 p-4 rounded-2xl border border-slate-800 shadow-inner space-y-1.5">
                  <span className="text-sky-400 font-black block text-sm flex items-center gap-2">
                    <span>🚌</span> Bus, Taxi & Route Connectivity
                  </span>
                  <p className="text-slate-300 leading-relaxed pt-1">{item.route_transport}</p>
                </div>
              )}

              {activeTab === 'sos' && (
                <div className="bg-red-950/20 p-4 rounded-2xl border border-red-900/40 shadow-inner space-y-1.5">
                  <span className="text-red-400 font-black block text-sm flex items-center gap-2">
                    <span>🚨</span> Emergency & Police SOS Hub
                  </span>
                  <p className="text-slate-100 font-bold pt-1 text-sm">{item.emergency_services}</p>
                </div>
              )}
            </div>

          </div>
        ))}
      </main>

      {/* Modals */}
      {showBizModal && (
        <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4 z-50">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl w-full max-w-md p-6 text-xs text-slate-200 shadow-2xl">
            <h3 className="font-black text-white mb-4 text-base flex items-center gap-2">
              <span>💼</span> List Your Business on InBharat
            </h3>
            <div className="space-y-3">
              <input type="text" placeholder="Business Name *" value={newBiz.bizName} onChange={e => setNewBiz({...newBiz, bizName: e.target.value})} className="w-full bg-slate-950 p-3 rounded-xl border border-slate-800 outline-none focus:border-emerald-500 font-semibold text-white" />
              <input type="tel" placeholder="Phone Number *" value={newBiz.phone} onChange={e => setNewBiz({...newBiz, phone: e.target.value})} className="w-full bg-slate-950 p-3 rounded-xl border border-slate-800 outline-none focus:border-emerald-500 font-semibold text-white" />
              <button onClick={() => { alert('Business Registered Successfully!'); setShowBizModal(false); }} className="w-full bg-gradient-to-r from-emerald-600 to-teal-600 text-white font-black py-3 rounded-xl mt-2 shadow-lg">Submit</button>
              <button onClick={() => setShowBizModal(false)} className="w-full text-slate-500 py-2">Cancel</button>
            </div>
          </div>
        </div>
      )}

      {showAddModal && (
        <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4 z-50">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl w-full max-w-md p-6 text-xs text-slate-200 shadow-2xl">
            <h3 className="font-black text-white mb-4 text-base flex items-center gap-2">
              <span>✨</span> Contribute Destination
            </h3>
            <div className="space-y-3">
              <input type="text" placeholder="Spot Name *" value={newSpot.Name} onChange={e => setNewSpot({...newSpot, Name: e.target.value})} className="w-full bg-slate-950 p-3 rounded-xl border border-slate-800 outline-none focus:border-orange-500 font-semibold text-white" />
              <input type="text" placeholder="City *" value={newSpot.City} onChange={e => setNewSpot({...newSpot, City: e.target.value})} className="w-full bg-slate-950 p-3 rounded-xl border border-slate-800 outline-none focus:border-orange-500 font-semibold text-white" />
              <button onClick={() => { alert('Spot Published!'); setShowAddModal(false); }} className="w-full bg-gradient-to-r from-orange-500 to-amber-500 text-white font-black py-3 rounded-xl mt-2 shadow-lg">Publish</button>
              <button onClick={() => setShowAddModal(false)} className="w-full text-slate-500 py-2">Cancel</button>
            </div>
          </div>
        </div>
      )}

      {/* Floating Bottom Navigation */}
      <nav className="fixed bottom-3 left-4 right-4 max-w-md mx-auto bg-slate-900/90 backdrop-blur-2xl border border-slate-800 flex justify-around py-3 z-40 rounded-2xl shadow-2xl text-[11px] font-extrabold text-slate-400">
        <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="flex flex-col items-center gap-0.5 text-orange-400">
          <span className="text-base">🔍</span>
          <span>Explore</span>
        </button>
        <button onClick={() => setShowBizModal(true)} className="flex flex-col items-center gap-0.5 text-emerald-400">
          <span className="text-base">💼</span>
          <span>List Biz</span>
        </button>
        <button onClick={() => setShowAddModal(true)} className="flex flex-col items-center gap-0.5 hover:text-white">
          <span className="text-base">✨</span>
          <span>Add Spot</span>
        </button>
      </nav>

    </div>
  );
}
