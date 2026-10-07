// Bharat Yatra Pro - Premium Edition
import React, { useState } from 'react';
import { MASTER_INDIA_TOURISM_DIRECTORY } from './Data';

export default function App() {
  const [activeTab, setActiveTab] = useState<'home' | 'planner' | 'addspot' | 'business' | 'profile'>('home');
  const [selectedShrine, setSelectedShrine] = useState<string | null>(null);
  const [selectedState, setSelectedState] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [notification, setNotification] = useState<string | null>(null);

  // Planner States
  const [startCity, setStartCity] = useState<string>("");
  const [travelMode, setTravelMode] = useState<string>("train");
  const [yatraPlan, setYatraPlan] = useState<{ title: string; desc: string } | null>(null);

  // Add Spot States
  const [spotForm, setSpotForm] = useState({ name: '', city: '', state: '', desc: '' });
  const [spotSubmitted, setSpotSubmitted] = useState(false);

  // Extract unique states cleanly from Data.ts
  const states = ["All", ...Array.from(new Set(Object.values(MASTER_INDIA_TOURISM_DIRECTORY).map(s => s.State)))];

  // Robust Search & Filter Logic linked with Data.ts
  const filteredShrines = Object.entries(MASTER_INDIA_TOURISM_DIRECTORY).filter(([_, shrine]) => {
    const matchesState = selectedState === "All" || shrine.State.toLowerCase() === selectedState.toLowerCase();
    
    const query = searchQuery.toLowerCase().trim();
    const matchesSearch = !query || 
                          shrine.Name.toLowerCase().includes(query) ||
                          shrine.City.toLowerCase().includes(query) ||
                          shrine.State.toLowerCase().includes(query) ||
                          shrine.Type.toLowerCase().includes(query);

    return matchesState && matchesSearch;
  });

  const triggerAction = (msg: string) => {
    setNotification(msg);
    setTimeout(() => setNotification(null), 4500);
  };

  const handleFullBooking = (serviceType: string, itemName: string) => {
    triggerAction(`🚀 Redirecting to secure affiliate partner for ${serviceType} (${itemName}). Commission tracking active!`);
  };

  const handleGenerateCompleteTrip = (shrineName: string) => {
    if (!startCity.trim()) {
      alert("Kripya apni starting city enter karein (e.g., Delhi, Jaipur)");
      return;
    }
    setYatraPlan({
      title: `Full Itinerary: ${startCity.toUpperCase()} ➔ ${shrineName}`,
      desc: `Mode: ${travelMode.toUpperCase()} | Estimated distance calculated. Hotel, Cab & Train booking links enabled below.`
    });
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans pb-28">
      {/* Top Header */}
      <header className="bg-white border-b border-amber-200 sticky top-0 z-30 shadow-xs">
        <div className="max-w-6xl mx-auto px-4 py-3.5 flex justify-between items-center">
          <div>
            <h1 className="text-xl sm:text-2xl font-black text-amber-800 flex items-center gap-2">
              <span>🛕</span> <span>Bharat Yatra Pro</span>
            </h1>
            <p className="text-[10px] sm:text-xs text-amber-700 font-medium">All-in-One Pilgrimage, Hotel, Train & Taxi Booking Portal</p>
          </div>
          <span className="text-xs font-bold bg-amber-600 text-white px-3 py-1 rounded-full shadow-xs">
            Affiliate Active
          </span>
        </div>
      </header>

      {/* Floating Notification */}
      {notification && (
        <div className="max-w-md mx-auto px-4 fixed top-16 left-0 right-0 z-50">
          <div className="bg-amber-900 text-amber-50 px-4 py-3 rounded-2xl text-xs shadow-xl text-center font-bold border border-amber-700 animate-bounce">
            {notification}
          </div>
        </div>
      )}

      <main className="max-w-6xl mx-auto p-4 sm:p-6">
        {/* TAB 1: HOME */}
        {activeTab === 'home' && (
          <div>
            <div className="text-center mb-6">
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-800 mb-1">Book Your Holy Yatra & Stays</h2>
              <p className="text-slate-600 text-sm">Explore divine temples, book hotels, hire cabs, and order prasad instantly.</p>
            </div>

            {/* Search & State Filter */}
            <div className="max-w-2xl mx-auto space-y-3 mb-8">
              <div className="relative">
                <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-amber-600">
                  🔍
                </span>
                <input 
                  type="text"
                  placeholder="Search temples, cities, Jyotirlingas..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-white rounded-2xl border border-amber-200 shadow-sm text-sm focus:outline-none focus:ring-2 focus:ring-amber-600"
                />
              </div>

              <div className="flex flex-wrap justify-center gap-1.5">
                {states.map((st) => (
                  <button
                    key={st}
                    onClick={() => setSelectedState(st)}
                    className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-all ${
                      selectedState === st
                        ? 'bg-amber-800 text-white shadow-md'
                        : 'bg-white text-slate-700 border border-slate-200 hover:bg-amber-50'
                    }`}
                  >
                    {st}
                  </button>
                ))}
              </div>
            </div>

            {/* Shrines Grid or No Results Message */}
            {filteredShrines.length === 0 ? (
              <div className="text-center py-12 bg-white rounded-3xl border border-amber-100 shadow-xs max-w-md mx-auto">
                <p className="text-3xl mb-2">🔍</p>
                <h3 className="font-bold text-slate-800 text-base">Koi mandir nahi mila</h3>
                <p className="text-xs text-slate-500 mt-1">Kripya koi doosra keyword ya state select karein.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredShrines.map(([key, shrine]) => (
                  <div 
                    key={key} 
                    className="bg-white rounded-3xl shadow-md overflow-hidden border border-amber-100 hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
                  >
                    <div>
                      <div className="relative">
                        <img 
                          src={shrine.image_url} 
                          alt={shrine.Name} 
                          className="w-full h-48 object-cover"
                        />
                        <span className="absolute top-3 left-3 bg-amber-900/80 backdrop-blur-md text-amber-100 px-3 py-1 rounded-full text-xs font-bold">
                          {shrine.Type}
                        </span>
                      </div>
                      <div className="p-5">
                        <h3 className="text-xl font-bold text-slate-800 mb-1">{shrine.Name}</h3>
                        <p className="text-slate-500 text-sm mb-3 flex items-center gap-1">
                          <span>📍</span> {shrine.City}, {shrine.State}
                        </p>
                        <p className="text-slate-600 text-sm line-clamp-2">{shrine.history_geo_political}</p>
                      </div>
                    </div>

                    <div className="p-5 pt-0 border-t border-slate-100 mt-4">
                      <div className="flex justify-between items-center text-xs text-slate-500 mb-4 pt-3">
                        <span className="flex items-center gap-1">🌤️ {shrine.weather}</span>
                        <span className="flex items-center gap-1 font-semibold text-amber-700">{shrine.budget}</span>
                      </div>
                      <button 
                        onClick={() => {
                          setSelectedShrine(key);
                          setYatraPlan(null);
                          setStartCity("");
                        }}
                        className="w-full bg-amber-700 hover:bg-amber-800 text-white font-semibold py-2.5 px-4 rounded-xl transition-colors text-sm shadow-sm flex items-center justify-center gap-2"
                      >
                        <span>🎫</span> Book Hotels, Cabs & Guide
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* TAB 2: PLANNER */}
        {activeTab === 'planner' && (
          <div className="max-w-xl mx-auto bg-white p-6 sm:p-8 rounded-3xl shadow-md border border-amber-200">
            <h2 className="text-2xl font-bold text-slate-800 mb-2 flex items-center gap-2">
              <span>🚆</span> Complete Yatra Booking Hub
            </h2>
            <p className="text-slate-600 text-sm mb-6">Book your Train tickets, Bus rides, and Highway Cabs instantly.</p>
            
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Starting City:</label>
                <input 
                  type="text" 
                  placeholder="e.g., Ahmedabad, Delhi..."
                  value={startCity}
                  onChange={(e) => setStartCity(e.target.value)}
                  className="w-full border border-amber-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-amber-600"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Select Mode of Travel:</label>
                <select 
                  value={travelMode}
                  onChange={(e) => setTravelMode(e.target.value)}
                  className="w-full border border-amber-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-amber-600 bg-white"
                >
                  <option value="train">🚆 Train Ticket (IRCTC Partner)</option>
                  <option value="bus">🚌 Volvo / Luxury Bus Booking</option>
                  <option value="taxi">🚕 Outstation Cab / Taxi Rental</option>
                  <option value="flight">✈️ Flight Booking</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Destination Shrine:</label>
                <select className="w-full border border-amber-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-amber-600 bg-white">
                  {Object.entries(MASTER_INDIA_TOURISM_DIRECTORY).map(([key, s]) => (
                    <option key={key} value={key}>{s.Name} ({s.State})</option>
                  ))}
                </select>
              </div>

              <button 
                onClick={() => handleFullBooking(travelMode.toUpperCase(), "Yatra Transit")}
                className="w-full bg-amber-700 hover:bg-amber-800 text-white font-semibold py-3 px-4 rounded-xl transition-colors text-sm shadow-md"
              >
                Proceed to Instant Booking & Earn Cashback
              </button>
            </div>
          </div>
        )}

        {/* TAB 3: ADD SPOT */}
        {activeTab === 'addspot' && (
          <div className="max-w-xl mx-auto bg-white p-6 sm:p-8 rounded-3xl shadow-md border border-amber-200">
            <h2 className="text-2xl font-bold text-slate-800 mb-2 flex items-center gap-2">
              <span>➕</span> Add Local / Hidden Temple
            </h2>
            <p className="text-slate-600 text-sm mb-6">List unlisted local shrines to help travelers discover spiritual heritage.</p>
            
            {spotSubmitted && (
              <div className="mb-4 bg-emerald-50 border border-emerald-200 text-emerald-800 p-3 rounded-xl text-xs font-medium">
                ✅ Spot submitted successfully! Admin review in progress.
              </div>
            )}

            <form onSubmit={(e) => {
              e.preventDefault();
              if(!spotForm.name || !spotForm.city) { alert("Please fill details!"); return; }
              setSpotSubmitted(true);
              setTimeout(() => { setSpotSubmitted(false); setSpotForm({ name: '', city: '', state: '', desc: '' }); }, 4000);
            }} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Temple Name *</label>
                <input 
                  type="text" 
                  placeholder="e.g., Gupt Mahadev Temple"
                  value={spotForm.name}
                  onChange={(e) => setSpotForm({...spotForm, name: e.target.value})}
                  className="w-full border border-amber-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-amber-600"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">City *</label>
                  <input 
                    type="text" 
                    placeholder="e.g., Becharaji"
                    value={spotForm.city}
                    onChange={(e) => setSpotForm({...spotForm, city: e.target.value})}
                    className="w-full border border-amber-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-amber-600"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">State *</label>
                  <input 
                    type="text" 
                    placeholder="e.g., Gujarat"
                    value={spotForm.state}
                    onChange={(e) => setSpotForm({...spotForm, state: e.target.value})}
                    className="w-full border border-amber-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-amber-600"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Significance</label>
                <textarea 
                  rows={3}
                  placeholder="Write history..."
                  value={spotForm.desc}
                  onChange={(e) => setSpotForm({...spotForm, desc: e.target.value})}
                  className="w-full border border-amber-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-amber-600"
                ></textarea>
              </div>

              <button 
                type="submit"
                className="w-full bg-amber-700 hover:bg-amber-800 text-white font-semibold py-3 px-4 rounded-xl transition-colors text-sm shadow-md"
              >
                Submit Spot
              </button>
            </form>
          </div>
        )}

        {/* TAB 4: BUSINESS */}
        {activeTab === 'business' && (
          <div className="max-w-xl mx-auto bg-white p-6 sm:p-8 rounded-3xl shadow-md border border-amber-200">
            <h2 className="text-2xl font-bold text-slate-800 mb-2 flex items-center gap-2">
              <span>💼</span> Revenue & Affiliate Dashboard
            </h2>
            <p className="text-slate-600 text-sm mb-6">Track your multi-stream earnings from Hotels, Cabs, Trains, and Prasad orders.</p>

            <div className="space-y-4">
              <div className="bg-amber-50 border border-amber-200 p-4 rounded-2xl">
                <h4 className="font-bold text-amber-900 text-sm mb-1">🏨 Hotel Stays & Dharamshalas</h4>
                <p className="text-xs text-slate-600 mb-2">Makemytrip / Agoda Affiliate Feed</p>
                <div className="flex justify-between text-xs font-bold text-amber-900 bg-white p-3 rounded-xl border border-amber-100">
                  <span>Bookings: 84</span>
                  <span>Commission: ₹3,400</span>
                </div>
              </div>

              <div className="bg-blue-50 border border-blue-200 p-4 rounded-2xl">
                <h4 className="font-bold text-blue-900 text-sm mb-1">🚆 Train & Taxi Cab Referrals</h4>
                <p className="text-xs text-slate-600 mb-2">IRCTC & Outstation Cab Partners</p>
                <div className="flex justify-between text-xs font-bold text-blue-900 bg-white p-3 rounded-xl border border-blue-100">
                  <span>Trips Booked: 112</span>
                  <span>Commission: ₹4,150</span>
                </div>
              </div>

              <div className="bg-orange-50 border border-orange-200 p-4 rounded-2xl">
                <h4 className="font-bold text-orange-900 text-sm mb-1">🎁 E-Puja & Prasad Orders</h4>
                <p className="text-xs text-slate-600 mb-2">Direct Temple Trust Fulfillment</p>
                <div className="flex justify-between text-xs font-bold text-orange-900 bg-white p-3 rounded-xl border border-orange-100">
                  <span>Dispatched: 145</span>
                  <span>Margin Profit: ₹7,250</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 5: PROFILE */}
        {activeTab === 'profile' && (
          <div className="max-w-xl mx-auto bg-white p-6 sm:p-8 rounded-3xl shadow-md border border-amber-200 text-center">
            <div className="w-20 h-20 bg-amber-700 text-white font-bold text-2xl rounded-full flex items-center justify-center mx-auto mb-4 shadow-md">
              RB
            </div>
            <h2 className="text-xl font-bold text-slate-800 mb-1">Ravi Bharggav</h2>
            <p className="text-slate-500 text-xs mb-6">Founder & CEO, Bharat Yatra Pro</p>

            <div className="space-y-2 text-left">
              <div className="bg-amber-50/50 p-3 rounded-xl border border-amber-100 text-xs flex justify-between items-center">
                <span>🎫 Active Bookings</span>
                <span className="font-bold text-amber-800">2 Trips</span>
              </div>
              <div className="bg-amber-50/50 p-3 rounded-xl border border-amber-100 text-xs flex justify-between items-center">
                <span>💰 Total Earnings Generated</span>
                <span className="font-bold text-emerald-700">₹14,800</span>
              </div>
            </div>
          </div>
        )}

        {/* Detailed Shrine Modal */}
        {selectedShrine && (
          <div className="fixed inset-0 bg-black/70 backdrop-blur-xs flex items-center justify-center p-4 z-50 overflow-y-auto">
            <div className="bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6 sm:p-8 relative shadow-2xl">
              <button 
                onClick={() => setSelectedShrine(null)}
                className="absolute top-4 right-4 bg-slate-100 hover:bg-slate-200 text-slate-700 w-9 h-9 rounded-full flex items-center justify-center font-bold text-sm transition-colors z-10"
              >
                ✕
              </button>

              {(() => {
                const shrine = MASTER_INDIA_TOURISM_DIRECTORY[selectedShrine];
                if (!shrine) return null;
                return (
                  <div>
                    <img 
                      src={shrine.image_url} 
                      alt={shrine.Name} 
                      className="w-full h-64 object-cover rounded-2xl mb-4 shadow-md"
                    />
                    <h2 className="text-2xl font-bold text-slate-900 mb-1">{shrine.Name}</h2>
                    <p className="text-slate-500 text-sm mb-6 flex items-center gap-1">
                      <span>📍</span> {shrine.City}, {shrine.State} &bull; <span className="font-bold text-amber-700">{shrine.Type}</span>
                    </p>
                    
                    {/* Booking Revenue Panel */}
                    <div className="bg-gradient-to-r from-amber-700 to-orange-700 text-white p-5 rounded-2xl mb-6 shadow-md space-y-3">
                      <h4 className="font-bold text-base flex items-center gap-2">
                        <span>⚡</span> Instant Yatra Booking & Services
                      </h4>
                      <p className="text-xs text-amber-100">Book everything required for this trip in 1 click and get instant cashback/commission.</p>
                      
                      <div className="grid grid-cols-2 gap-2 pt-1">
                        <button 
                          onClick={() => handleFullBooking("Hotel Stay", shrine.Name)}
                          className="bg-white text-amber-900 font-bold py-2 px-3 rounded-xl text-xs hover:bg-amber-50 shadow transition-colors flex items-center justify-center gap-1"
                        >
                          <span>🏨</span> Book Hotel
                        </button>
                        <button 
                          onClick={() => handleFullBooking("Train Ticket", shrine.Name)}
                          className="bg-white text-amber-900 font-bold py-2 px-3 rounded-xl text-xs hover:bg-amber-50 shadow transition-colors flex items-center justify-center gap-1"
                        >
                          <span>🚆</span> Book Train
                        </button>
                        <button 
                          onClick={() => handleFullBooking("Taxi / Cab", shrine.Name)}
                          className="bg-white text-amber-900 font-bold py-2 px-3 rounded-xl text-xs hover:bg-amber-50 shadow transition-colors flex items-center justify-center gap-1"
                        >
                          <span>🚕</span> Hire Taxi
                        </button>
                        <button 
                          onClick={() => handleFullBooking("Prasad & Puja", shrine.Name)}
                          className="bg-white text-amber-900 font-bold py-2 px-3 rounded-xl text-xs hover:bg-amber-50 shadow transition-colors flex items-center justify-center gap-1"
                        >
                          <span>🎁</span> Order Prasad
                        </button>
                      </div>
                    </div>

                    <div className="space-y-4 text-sm text-slate-700">
                      
                      <div className="bg-amber-50 p-4 rounded-2xl border border-amber-200">
                        <h4 className="font-bold text-amber-900 mb-2 text-sm flex items-center gap-1">
                          <span>🗺️</span> Custom Route & Transit Planner
                        </h4>
                        <div className="flex gap-2 mb-2">
                          <input 
                            type="text" 
                            placeholder="Enter starting city (e.g., Delhi, Jaipur)" 
                            value={startCity}
                            onChange={(e) => setStartCity(e.target.value)}
                            className="flex-1 bg-white border border-amber-300 rounded-xl px-3 py-2 text-xs text-slate-800"
                          />
                          <button 
                            onClick={() => handleGenerateCompleteTrip(shrine.Name)}
                            className="bg-amber-700 text-white font-semibold px-3 py-2 rounded-xl text-xs"
                          >
                            Plan Route
                          </button>
                        </div>
                        {yatraPlan && (
                          <div className="bg-white p-3 rounded-xl border border-amber-200 text-xs text-slate-700 mt-2">
                            <p className="font-bold text-amber-900">{yatraPlan.title}</p>
                            <p>{yatraPlan.desc}</p>
                          </div>
                        )}
                      </div>

                      <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200">
                        <strong className="block text-slate-900 mb-1 flex items-center gap-2"><span>🏛️</span> History & Significance:</strong>
                        <p className="text-slate-600">{shrine.history_geo_political}</p>
                      </div>

                      <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200">
                        <strong className="block text-slate-900 mb-1 flex items-center gap-2"><span>🌿</span> Sightseeing Spots:</strong>
                        <p className="whitespace-pre-line text-slate-600">{shrine.picnic_spots}</p>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200">
                          <strong className="block text-slate-900 mb-1 flex items-center gap-2"><span>🌤️</span> Weather:</strong>
                          <p className="text-slate-600">{shrine.weather}</p>
                        </div>
                        <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200">
                          <strong className="block text-slate-900 mb-1 flex items-center gap-2"><span>💰</span> Est. Budget:</strong>
                          <p className="text-slate-600">{shrine.budget}</p>
                        </div>
                      </div>

                      <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200">
                        <strong className="block text-slate-900 mb-1 flex items-center gap-2"><span>🚗</span> Transport Roadmap:</strong>
                        <p className="text-slate-600">{shrine.transport_roadmap}</p>
                      </div>

                      <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200">
                        <strong className="block text-slate-900 mb-1 flex items-center gap-2"><span>🏨</span> Hotel & Stay Recommendations:</strong>
                        <p className="whitespace-pre-line text-xs text-slate-700">{shrine.hotels_booking}</p>
                      </div>

                      <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200">
                        <strong className="block text-slate-900 mb-1 flex items-center gap-2"><span>🛍️</span> Local Food & Markets:</strong>
                        <p className="whitespace-pre-line text-slate-600">{shrine.markets_food}</p>
                      </div>
                    </div>

                    <button 
                      onClick={() => setSelectedShrine(null)}
                      className="mt-6 w-full bg-slate-800 hover:bg-slate-900 text-white font-medium py-3 px-4 rounded-xl transition-colors text-sm shadow-md"
                    >
                      Close Guide
                    </button>
                  </div>
                );
              })()}
            </div>
          </div>
        )}
      </main>

      {/* FIXED BOTTOM NAVIGATION BAR */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-amber-200 shadow-xl z-40 py-2.5 px-4">
        <div className="max-w-md mx-auto flex justify-between items-center text-xs font-semibold text-slate-600">
          <button 
            onClick={() => setActiveTab('home')}
            className={`flex flex-col items-center gap-1 transition-colors ${activeTab === 'home' ? 'text-amber-800 font-bold' : 'hover:text-amber-700'}`}
          >
            <span className="text-lg">🛕</span>
            <span>Teerth</span>
          </button>

          <button 
            onClick={() => setActiveTab('planner')}
            className={`flex flex-col items-center gap-1 transition-colors ${activeTab === 'planner' ? 'text-amber-800 font-bold' : 'hover:text-amber-700'}`}
          >
            <span className="text-lg">🚆</span>
            <span>Transit & Book</span>
          </button>

          <button 
            onClick={() => setActiveTab('addspot')}
            className={`flex flex-col items-center gap-1 transition-colors ${activeTab === 'addspot' ? 'text-amber-800 font-bold' : 'hover:text-amber-700'}`}
          >
            <span className="text-lg">➕</span>
            <span>Add Spot</span>
          </button>

          <button 
            onClick={() => setActiveTab('business')}
            className={`flex flex-col items-center gap-1 transition-colors ${activeTab === 'business' ? 'text-amber-800 font-bold' : 'hover:text-amber-700'}`}
          >
            <span className="text-lg">💼</span>
            <span>Revenue</span>
          </button>

          <button 
            onClick={() => setActiveTab('profile')}
            className={`flex flex-col items-center gap-1 transition-colors ${activeTab === 'profile' ? 'text-amber-800 font-bold' : 'hover:text-amber-700'}`}
          >
            <span className="text-lg">👤</span>
            <span>Profile</span>
          </button>
        </div>
      </nav>
    </div>
  );
}
