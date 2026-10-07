import React, { useState } from 'react';

const PAN_INDIA_MASTER_DB: Record<string, any> = {
  jaipur: {
    Name: 'Jaipur - The Pink City & Royal Capital',
    City: 'Jaipur',
    State: 'Rajasthan',
    Type: '👑 Royal Heritage & Tourism Capital',
    image_url: 'https://images.unsplash.com/photo-1599661046289-e31897846e41?auto=format&fit=crop&w=1200&q=80',
    history_geo_political: 'History: Founded in 1727 by Maharaja Sawai Jai Singh II as India’s first planned city. Geography: Semi-arid terrain enclosed by rugged Aravalli hills. Political: Capital of Rajasthan, housing the State Legislative Assembly and administrative headquarters.',
    picnic_spots: '🏛️ Amer Fort & Maota Lake (11 km from centre)\n🏛️ Nahargarh Fort Sunset Viewpoint (15 km)\n🏛️ Jantar Mantar & City Palace (0 km)\n🌿 Jawahar Circle & Patrika Gate (6 km)\n💧 Jal Mahal Water Palace (4 km)',
    transport_roadmap: 'Road Map: Connected via NH-48 (Delhi-Mumbai Expressway) and NH-21. Transport: Jaipur Metro, low-floor AC buses, auto-rickshaws, Ola/Uber cabs, and Jaipur International Airport (JAI).',
    hotels_booking: '🏨 Taj Rambagh Palace (Ultra-Luxury)\n🏨 Trident Jaipur (5-Star Resort)\n🏨 Zostel Jaipur (Backpacker Hub)\n🏨 Pearl Palace Heritage (Boutique Stay)',
    markets_food: '🛍️ Johari Bazaar (Jewelry), Bapu Bazaar (Textiles), Tripolia Bazaar (Bangles).\n🍲 Authentic Dal Baati Churma, Pyaaz Kachori (Rawat), Ghevar (LMB).',
    culture_helpline: 'Culture: Rich Rajputana heritage, vibrant folk dance (Kalbeliya), and traditional turban culture. Helpline: Tourist Police: 0141-2530264 | General SOS: 112 | Ambulance: 108'
  },
  mumbai: {
    Name: 'Mumbai - Financial Capital of India',
    City: 'Mumbai',
    State: 'Maharashtra',
    Type: '🌊 Coastal Financial & Entertainment Hub',
    image_url: 'https://images.unsplash.com/photo-1570168007204-dfb528c6958f?auto=format&fit=crop&w=1200&q=80',
    history_geo_political: 'History: Evolved from a cluster of seven islands ruled by Koli fishermen, Portuguese, and the British East India Company. Geography: Natural deep-water harbor on the Konkan coast. Political: Capital of Maharashtra and India’s financial nerve centre.',
    picnic_spots: '🏛️ Gateway of India & Elephanta Caves (Boat ride)\n🌊 Marine Drive & Chowpatty Beach (0 km)\n🌿 Sanjay Gandhi National Park & Kanheri Caves (30 km)\n🏰 Bandra-Worli Sea Link Promenade (8 km)',
    transport_roadmap: 'Road Map: Linked via Eastern & Western Express Highways and coastal roads. Transport: Iconic Mumbai Suburban Railway, BEST buses, Metro lines, black-and-yellow cabs, and CSMIA Airport.',
    hotels_booking: '🏨 The Taj Mahal Palace (Historic Luxury)\n🏨 Trident Nariman Point (Sea View)\n🏨 Abode Bombay (Heritage Boutique)\n🏨 Backpacker Panda Colaba',
    markets_food: '🛍️ Colaba Causeway, Crawford Market, Linking Road (Bandra).\n🍲 Mumbai Vada Pav, Pav Bhaji, Bombay Sandwich, Bhel Puri.',
    culture_helpline: 'Culture: Vibrant melting pot of Marathi traditions, cosmopolitan lifestyle, and Bollywood cinema. Helpline: Mumbai Police Control: 100 | Ambulance: 102'
  },
  goa: {
    Name: 'Goa - Sun, Sand & Heritage Paradise',
    City: 'Goa',
    State: 'Goa',
    Type: '🌴 Tropical Beach & Cultural State',
    image_url: 'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?auto=format&fit=crop&w=1200&q=80',
    history_geo_political: 'History: Ruled by Portuguese colonizers for over 450 years until liberation in December 1961. Geography: Bounded by Maharashtra, Karnataka, and the Arabian Sea coastline. Political: India smallest state by area, governed from Panaji.',
    picnic_spots: '🏖️ Baga, Calangute & Palolem Beaches (0 km)\n🏛️ Basilica of Bom Jesus & Se Cathedral (Old Goa - 10 km)\n🌊 Dudhsagar Waterfalls (60 km)\n🏰 Fort Aguada & Chapora Fort',
    transport_roadmap: 'Road Map: Connected via NH-66 and scenic coastal routes. Transport: Mopa & Dabolim International Airports, Konkan Railway network, self-drive rental cars, and scooties.',
    hotels_booking: '🏨 W Goa Vagator (Luxury Resort)\n🏨 Taj Exotica Resort & Spa Benaulim\n🏨 The Hosteller Goa (Stays)\n🏨 Beleza By The Beach',
    markets_food: '🛍️ Anjuna Flea Market, Saturday Night Market (Arpora), Mapusa Friday Market.\n🍲 Goan Fish Curry Rice, Bebinca, Prawn Balchão & Xacuti.',
    culture_helpline: 'Culture: Unique Indo-Portuguese fusion, vibrant Carnival festivals, and coastal music. Helpline: Tourist Police: 112 | Coastal SOS: 0832-2428165'
  },
  delhi: {
    Name: 'New Delhi - National Capital Territory',
    City: 'Delhi',
    State: 'Delhi NCR',
    Type: '🏛️ Political & Historical Capital',
    image_url: 'https://images.unsplash.com/photo-1587474260584-136574528ed5?auto=format&fit=crop&w=1200&q=80',
    history_geo_political: 'History: Ruled by successive empires including the Delhi Sultanate, Mughals, and British Raj. Geography: Situated along the banks of the Yamuna River. Political: National capital territory housing Parliament, Supreme Court, and Central Government.',
    picnic_spots: '🏛️ Red Fort & Qutub Minar (World Heritage)\n🏛️ India Gate & Rashtrapati Bhavan (0 km)\n🛕 Akshardham Temple & Lotus Temple\n🌿 Lodhi Gardens & Humayun Tomb',
    transport_roadmap: 'Road Map: Connected via outer/inner ring roads and expressways. Transport: World-class Delhi Metro network, DTC electric buses, EV cabs, and Indira Gandhi International Airport (DEL).',
    hotels_booking: '🏨 The Leela Palace New Delhi (Luxury)\n🏨 The Imperial New Delhi (Heritage)\n🏨 Bloomrooms @ Janpath\n🏨 Smyle Inn Backpacker Stay',
    markets_food: '🛍️ Chandni Chowk, Dilli Haat, Sarojini Nagar, Janpath.\n🍲 Old Delhi Chole Bhature, Butter Chicken, Paranthas & Kebabs.',
    culture_helpline: 'Culture: Cosmopolitan hub blending ancient Mughal heritage with modern Indian polity. Helpline: Delhi Police SOS: 112 | Women Helpline: 1091'
  }
};

export default function App() {
  const [searchTerm, setSearchTerm] = useState('');
  const [cityData, setCityData] = useState(PAN_INDIA_MASTER_DB['jaipur']);
  const [activeTab, setActiveTab] = useState('overview');
  const [showBookingModal, setShowBookingModal] = useState(false);
  const [showBizModal, setShowBizModal] = useState(false);

  const handleSearch = (query: string) => {
    setSearchTerm(query);
    const key = query.trim().toLowerCase();
    if (!key) return;

    if (PAN_INDIA_MASTER_DB[key]) {
      setCityData(PAN_INDIA_MASTER_DB[key]);
    } else {
      const cap = query.trim().charAt(0).toUpperCase() + query.trim().slice(1);
      setCityData({
        Name: `${cap} - Unified City Intelligence Hub`,
        City: cap,
        State: 'Bharat / India',
        Type: '✨ Verified Pan-India Destination',
        image_url: 'https://images.unsplash.com/photo-1588095920028-a433f42f7c6a?auto=format&fit=crop&w=1200&q=80',
        history_geo_political: `History: ${cap} holds remarkable historical significance with traditional roots and cultural evolution. Geography: Strategically positioned regional topography featuring local water bodies and green surroundings. Political: Serves as a vital municipal district administrative centre.`,
        picnic_spots: `🏛️ ${cap} Historic Town Square & Landmark (0 km)\n🌿 Central Botanical Park & Family Gardens (4 km)\n🏛️ Ancient Heritage Shrines & Temples (6 km)\n🏞️ Scenic Valley or Riverfront Viewpoint (10 km)`,
        transport_roadmap: `Road Map: Connected via national and state highway grids. Transport: Indian Railways station, state roadways bus depot, local auto-rickshaws, and taxi rental services.`,
        hotels_booking: `🏨 ${cap} Grand Heritage Hotel & Resort\n🏨 Royal Comfort Inn & Suites\n🏨 Budget Traveller Lodge & Homestay\n🏨 City Centre Residency`,
        markets_food: `🛍️ ${cap} Traditional Handloom Bazaar, Main Handicraft Market & Local Shops.\n🍲 Signature Regional Thali, Local Sweets, Traditional Snacks & Famous Street Delicacies.`,
        culture_helpline: `Culture: Rich regional customs, folk arts, local crafts, and vibrant seasonal celebrations. Helpline: Local Police: 100 | Medical Ambulance: 108 | National Emergency SOS: 112`
      });
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans pb-32 selection:bg-orange-500 selection:text-white">
      
      {/* Top Header */}
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
            <span>🏨</span> <span>Book Hotel</span>
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
              placeholder="Search Jaipur, Mumbai, Goa, Delhi, Shimla..."
              value={searchTerm}
              onChange={(e) => handleSearch(e.target.value)}
              className="flex-1 bg-transparent px-3 py-3 text-xs sm:text-sm text-slate-100 placeholder-slate-500 outline-none font-semibold"
            />
            <button onClick={() => handleSearch(searchTerm)} className="bg-gradient-to-r from-orange-500 to-amber-500 text-white font-black text-xs px-6 py-3 rounded-xl shadow-lg">
              Search
            </button>
          </div>
        </div>

        {/* Quick Suggestion Chips */}
        <div className="flex gap-2 overflow-x-auto no-scrollbar pb-1 text-xs justify-start sm:justify-center relative z-10">
          {[
            { name: 'Jaipur', icon: '👑' },
            { name: 'Mumbai', icon: '🌊' },
            { name: 'Goa', icon: '🌴' },
            { name: 'Delhi', icon: '🏛️' },
            { name: 'Udaipur', icon: '🏰' },
            { name: 'Varanasi', icon: '✨' }
          ].map(c => (
            <button key={c.name} onClick={() => handleSearch(c.name)} className="bg-slate-900/80 hover:bg-slate-800 text-slate-300 border border-slate-800 px-4 py-2 rounded-xl font-bold whitespace-nowrap flex items-center gap-1.5 shadow-sm active:scale-95">
              <span>{c.icon}</span> <span>{c.name}</span>
            </button>
          ))}
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
                <p className="leading-relaxed pt-1">{cityData.history_geo_political}</p>
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
                <p className="leading-relaxed pt-1">{cityData.transport_roadmap}</p>
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
                  <p>{cityData.markets_food.split('🍲')[0]}</p>
                </div>
                <div className="bg-slate-950/60 p-3.5 rounded-2xl border border-slate-800">
                  <span className="text-rose-400 font-black block mb-1 flex items-center gap-2">
                    <span>🍲</span> Authentic Local Food & Culture
                  </span>
                  <p>{cityData.markets_food.split('🍲')[1] ? '🍲 ' + cityData.markets_food.split('🍲')[1] : ''}</p>
                </div>
              </div>
            )}

            {activeTab === 'sos' && (
              <div className="bg-red-950/20 p-4 rounded-2xl border border-red-900/40 space-y-2">
                <span className="text-red-400 font-black block text-sm flex items-center gap-2">
                  <span>🚨</span> Emergency Helpline & Culture SOS
                </span>
                <p className="font-bold text-slate-100 text-sm leading-relaxed">{cityData.culture_helpline}</p>
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
            <button onClick={() => { alert('Hotel booking request confirmed!'); setShowBookingModal(false); }} className="w-full bg-gradient-to-r from-emerald-600 to-teal-600 text-white font-black py-3 rounded-xl mt-2 shadow-lg">
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
        <button onClick={() => setShowBookingModal(true)} className="flex flex-col items-center gap-0.5 text-emerald-400"><span>🏨</span><span>Hotels</span></button>
        <button onClick={() => setShowBizModal(true)} className="flex flex-col items-center gap-0.5"><span>💼</span><span>List Biz</span></button>
      </nav>

    </div>
  );
}
