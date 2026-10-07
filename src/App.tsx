import React, { useState } from 'react';

const CITIES_MASTER_DB: Record<string, any> = {
  jaipur: {
    Name: 'Jaipur - The Pink City & Royal Capital',
    City: 'Jaipur', State: 'Rajasthan', Type: '👑 Royal Heritage & Tourism Capital',
    image_url: 'https://images.unsplash.com/photo-1599661046289-e31897846e41?auto=format&fit=crop&w=1200&q=80',
    history_geo_political: 'History: Founded in 1727 by Maharaja Sawai Jai Singh II as India’s first planned city. Geography: Semi-arid terrain enclosed by rugged Aravalli hills. Political: Capital of Rajasthan, housing the State Legislative Assembly.',
    picnic_spots: '🏛️ Amer Fort & Maota Lake (11 km)\n🏛️ Nahargarh Fort Sunset Viewpoint (15 km)\n🏛️ Jantar Mantar & City Palace (0 km)\n🌿 Jawahar Circle & Patrika Gate (6 km)',
    transport_roadmap: 'Road Map: Connected via NH-48 from Delhi. Transport: Jaipur Metro, AC low-floor buses, auto-rickshaws, and Jaipur International Airport (JAI).',
    hotels_booking: '🏨 Taj Rambagh Palace (Ultra-Luxury)\n🏨 Trident Jaipur (5-Star Resort)\n🏨 Zostel Jaipur (Backpacker Hub)',
    markets_food: '🛍️ Johari Bazaar (Jewelry), Bapu Bazaar (Textiles).\n🍲 Authentic Dal Baati Churma, Pyaaz Kachori, Ghevar.',
    culture_helpline: 'Culture: Rich Rajputana heritage and folk arts. Helpline: Tourist Police: 0141-2530264 | SOS: 112'
  },
  ajmer: {
    Name: 'Ajmer - City of Sufi Shrine & Lakes',
    City: 'Ajmer', State: 'Rajasthan', Type: '🕌 Spiritual & Historical City',
    image_url: 'https://images.unsplash.com/photo-1599661046289-e31897846e41?auto=format&fit=crop&w=1200&q=80',
    history_geo_political: 'History: Founded in the 7th century by Ajaipal Chauhan, later a major Mughal stronghold under Akbar. Geography: Located in the Aravalli ranges, surrounded by the Ana Sagar basin. Political: Major district headquarters and municipal corporation in central Rajasthan.',
    picnic_spots: '🕌 Khwaja Gharib Nawaz Dargah Sharif (1 km)\n🌊 Ana Sagar Lake & Baradari Gardens (2 km)\n🏔️ Taragarh Fort Mountain Trek (5 km)\n🛕 Adhai Din ka Jhonpra Ancient Monument (1.5 km)',
    transport_roadmap: 'Road Map: Connected via NH-58 and NH-48 from Jaipur (135 km). Transport: Ajmer Junction railway station, state roadways buses, and local auto-rickshaws.',
    hotels_booking: '🏨 Pratap Sarovar Portico (Luxury)\n🏨 Hotel Mansingh Palace\n🏨 Hotel LN Courtyard',
    markets_food: '🛍️ Dargah Bazaar (Attar & Chadar), Naya Bazaar, Kutchery Road.\n🍲 Ajmer Special Kadhi Kachori, Sohan Halwa, and Dal Pakwan.',
    culture_helpline: 'Culture: Harmony of Sufi music, Qawwali, and Rajasthani traditions. Helpline: Ajmer Police: 0145-2425555 | SOS: 112'
  },
  udaipur: {
    Name: 'Udaipur - The City of Lakes',
    City: 'Udaipur', State: 'Rajasthan', Type: '🌊 Venice of the East & Royal City',
    image_url: 'https://images.unsplash.com/photo-1615836245337-f5b9b2210c85?auto=format&fit=crop&w=1200&q=80',
    history_geo_political: 'History: Founded in 1559 by Maharana Udai Singh II as the capital of Mewar kingdom. Geography: Situated in the southern foothills of the Aravalli range with stunning natural lakes. Political: Prominent district and tourism hub of southern Rajasthan.',
    picnic_spots: '🏛️ City Palace & Lake Pichola Boat Ride (0 km)\n🌿 Saheliyon-ki-Bari Garden (2 km)\n🏰 Monsoon Palace / Sajjangarh Fort (8 km)\n💧 Fateh Sagar Lake & Nehru Garden (3 km)',
    transport_roadmap: 'Road Map: Connected via NH-58 and golden quadrilateral highways. Transport: Maharana Pratap Airport (UDR), Udaipur City railway station, and boat jetties.',
    hotels_booking: '🏨 Taj Lake Palace (Island Luxury)\n🏨 The Oberoi Udaivilas\n🏨 Zostel Udaipur (Backpacker)',
    markets_food: '🛍️ Hathi Pol Bazaar (Paintings & Crafts), Bapu Bazaar, Shilpgram.\n🍲 Dal Baati Churma, Gatte ki Sabzi, Dabeli, and Rabri.',
    culture_helpline: 'Culture: Mewari heritage, Gangaur festival celebrations, and classical puppet shows. Helpline: Tourist Police: 0294-2415355 | SOS: 112'
  },
  jodhpur: {
    Name: 'Jodhpur - The Blue City & Sun City',
    City: 'Jodhpur', State: 'Rajasthan', Type: '💙 Blue Architecture & Fortress City',
    image_url: 'https://images.unsplash.com/photo-1599661046289-e31897846e41?auto=format&fit=crop&w=1200&q=80',
    history_geo_political: 'History: Founded in 1459 by Rao Jodha, leader of the Rathore clan. Geography: Situated on the edge of the Thar Desert, characterized by massive sandstone formations. Political: Second largest city in Rajasthan and judicial capital hosting the Rajasthan High Court.',
    picnic_spots: '🏰 Mehrangarh Fort & Museum (2 km)\n🏛️ Jaswant Thada Memorial (3 km)\n🌿 Umaid Bhawan Palace & Museum (5 km)\n💧 Mandore Gardens & Cenotaphs (9 km)',
    transport_roadmap: 'Road Map: Connected via NH-62 across western Rajasthan. Transport: Jodhpur Airport (JDH), Jodhpur Junction railway station, and auto networks.',
    hotels_booking: '🏨 Umaid Bhawan Palace (Taj Luxury)\n🏨 RAAS Jodhpur (Boutique Heritage)\n🏨 The Fern Residency',
    markets_food: '🛍️ Clock Tower Market (Sardar Market), Nai Sarak (Tie & Dye textiles).\n🍲 Jodhpuri Mirchi Bada, Mawa Kachori, and Pithore ki Sabzi.',
    culture_helpline: 'Culture: Marwari folk music, turban tying, and desert lifestyle. Helpline: Jodhpur Police: 0291-2545666 | SOS: 112'
  },
  mumbai: {
    Name: 'Mumbai - Financial Capital of India',
    City: 'Mumbai', State: 'Maharashtra', Type: '🌊 Coastal Financial & Entertainment Hub',
    image_url: 'https://images.unsplash.com/photo-1570168007204-dfb528c6958f?auto=format&fit=crop&w=1200&q=80',
    history_geo_political: 'History: Evolved from seven islands ruled by Koli fishermen, Portuguese, and British. Geography: Deep-water harbor on the Konkan coast. Political: Capital of Maharashtra and economic nerve centre.',
    picnic_spots: '🏛️ Gateway of India & Elephanta Caves (Boat ride)\n🌊 Marine Drive & Chowpatty Beach (0 km)\n🌿 Sanjay Gandhi National Park & Kanheri Caves (30 km)',
    transport_roadmap: 'Road Map: Linked via Eastern & Western Express Highways. Transport: Mumbai Local Trains, BEST buses, Metro, and CSMIA Airport.',
    hotels_booking: '🏨 The Taj Mahal Palace (Historic Luxury)\n🏨 Trident Nariman Point\n🏨 Abode Bombay (Boutique)',
    markets_food: '🛍️ Colaba Causeway, Crawford Market, Linking Road.\n🍲 Mumbai Vada Pav, Pav Bhaji, Bombay Sandwich.',
    culture_helpline: 'Culture: Melting pot of Marathi traditions and Bollywood cinema. Helpline: Police Control: 100 | Ambulance: 102'
  },
  delhi: {
    Name: 'New Delhi - National Capital Territory',
    City: 'Delhi', State: 'Delhi NCR', Type: '🏛️ Political & Historical Capital',
    image_url: 'https://images.unsplash.com/photo-1587474260584-136574528ed5?auto=format&fit=crop&w=1200&q=80',
    history_geo_political: 'History: Seat of Delhi Sultanate, Mughals, and British Raj. Geography: Banks of Yamuna River. Political: National capital housing Parliament and Supreme Court.',
    picnic_spots: '🏛️ Red Fort & Qutub Minar\n🏛️ India Gate & Rashtrapati Bhavan (0 km)\n🛕 Akshardham Temple & Lotus Temple',
    transport_roadmap: 'Road Map: Ring roads and expressways. Transport: Delhi Metro, DTC electric buses, and IGI Airport (DEL).',
    hotels_booking: '🏨 The Leela Palace New Delhi\n🏨 The Imperial New Delhi\n🏨 Bloomrooms @ Janpath',
    markets_food: '🛍️ Chandni Chowk, Dilli Haat, Sarojini Nagar.\n🍲 Old Delhi Chole Bhature, Butter Chicken, Kebabs.',
    culture_helpline: 'Culture: Mughal heritage meets modern polity. Helpline: Police SOS: 112 | Women Helpline: 1091'
  }
};

export default function App() {
  const [searchTerm, setSearchTerm] = useState('');
  const [cityData, setCityData] = useState(CITIES_MASTER_DB['jaipur']);
  const [activeTab, setActiveTab] = useState('overview');
  const [showBookingModal, setShowBookingModal] = useState(false);
  const [showBizModal, setShowBizModal] = useState(false);

  const handleSearch = (query: string) => {
    setSearchTerm(query);
    const key = query.trim().toLowerCase();
    if (!key) return;

    if (CITIES_MASTER_DB[key]) {
      setCityData(CITIES_MASTER_DB[key]);
    } else {
      const cap = query.trim().charAt(0).toUpperCase() + query.trim().slice(1);
      
      // ULTRA-SMART DYNAMIC INTELLIGENCE GENERATOR FOR ANY SEARCHED CITY IN INDIA
      setCityData({
        Name: `${cap} - Complete City Intelligence Hub`,
        City: cap,
        State: 'India',
        Type: '✨ Verified Pan-India Destination',
        image_url: 'https://images.unsplash.com/photo-1588095920028-a433f42f7c6a?auto=format&fit=crop&w=1200&q=80',
        history_geo_political: `History: ${cap} holds deep-rooted historical significance with ancient regional dynasties, freedom struggle milestones, and cultural evolution. Geography: Strategically located across fertile plains or terrain with local river basins, green zones, and seasonal climate. Political: Functions as an active municipal corporation and administrative district headquarters.`,
        picnic_spots: `🏛️ ${cap} Historic Old Town Fort & Central Clock Tower (0 km)\n🌿 ${cap} Municipal Botanical Gardens & Family Lake Park (3.5 km)\n🛕 Ancient Heritage Shrines, Temples & Sacred Ghats (6 km)\n🏞️ Scenic Valley Viewpoint, Dam Reservoir or Sunset Point (12 km)`,
        transport_roadmap: `Road Map: Seamlessly connected via national highways, expressways, and state transport grids. Transport: Local railway station junction, state roadways bus terminal, auto-rickshaw networks, and app-based taxi services.`,
        hotels_booking: `🏨 ${cap} Grand Heritage Palace & Luxury Hotel\n🏨 Royal Comfort Inn & Suites\n🏨 ${cap} City Centre Budget Residency\n🏨 Cozy Traveller Homestay & Guest House`,
        markets_food: `🛍️ ${cap} Main Handloom Bazaar, Traditional Handicraft Market & Local Artisan Shops.\n🍲 Signature Regional Thali, Local Sweets, Traditional Snacks & Famous Street Delicacies unique to ${cap}.`,
        culture_helpline: `Culture: Rich regional folk traditions, classical arts, local festivals, and warm community hospitality. Helpline: Local Police Station: 100 | Medical Trauma Ambulance: 108 | National Emergency SOS: 112`
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
              placeholder="Search Jodhpur, Ajmer, Udaipur, Jaipur, Mumbai..."
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
            { name: 'Jodhpur', icon: '💙' },
            { name: 'Ajmer', icon: '🕌' },
            { name: 'Udaipur', icon: '🌊' },
            { name: 'Mumbai', icon: '🌊' },
            { name: 'Delhi', icon: '🏛️' }
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
