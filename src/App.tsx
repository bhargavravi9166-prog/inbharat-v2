import React, { useState } from 'react';
import { MASTER_INDIA_TOURISM_DIRECTORY } from './Data';

export default function App() {
  const [selectedShrine, setSelectedShrine] = useState<string | null>(null);
  const [selectedState, setSelectedState] = useState<string>("All");
  const [bookingSuccess, setBookingSuccess] = useState<string | null>(null);

  // Trip Planner States
  const [startCity, setStartCity] = useState<string>("");
  const [tripPlanResult, setTripPlanResult] = useState<{ route: string; distanceEstimate: string } | null>(null);

  const states = ["All", ...Array.from(new Set(Object.values(MASTER_INDIA_TOURISM_DIRECTORY).map(s => s.State)))];

  const filteredShrines = Object.entries(MASTER_INDIA_TOURISM_DIRECTORY).filter(([_, shrine]) => {
    if (selectedState === "All") return true;
    return shrine.State === selectedState;
  });

  const handleBookingAction = (type: string, name: string) => {
    setBookingSuccess(`🎉 Redirecting to secure partner for ${type} at ${name}... (Affiliate tracking active)`);
    setTimeout(() => setBookingSuccess(null), 5000);
  };

  const handleGenerateTripPlan = (shrineName: string, defaultTransport: string) => {
    if (!startCity.trim()) {
      alert("Pehle apni starting city ka naam daalein (e.g., Ahmedabad, Delhi)");
      return;
    }
    // Dynamic simulated route generation based on user input
    setTripPlanResult({
      route: `From ${startcity.toUpperCase()} to ${shrineName}: Route via National Highway / Expressways. ${defaultTransport}`,
      distanceEstimate: "Calculated via optimal national driving corridors & connecting rail/air hubs."
    });
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans p-4 sm:p-6">
      <header className="max-w-6xl mx-auto mb-8 text-center">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-amber-600 mb-2">
          🛕 India Sacred Shrines Directory & Trip Planner
        </h1>
        <p className="text-slate-600 text-sm sm:text-base">
          Discover divine heritage, trusted hotels, and customized travel routes across India.
        </p>

        {bookingSuccess && (
          <div className="mt-4 max-w-xl mx-auto bg-emerald-50 border border-emerald-200 text-emerald-800 px-4 py-3 rounded-lg text-sm shadow-md transition-all">
            {bookingSuccess}
          </div>
        )}

        {/* State Filter Pills */}
        <div className="flex flex-wrap justify-center gap-2 mt-6">
          {states.map((state) => (
            <button
              key={state}
              onClick={() => setSelectedState(state)}
              className={`px-4 py-2 rounded-full text-xs font-semibold transition-all shadow-sm ${
                selectedState === state
                  ? 'bg-amber-600 text-white shadow-md'
                  : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-100'
              }`}
            >
              {state}
            </button>
          ))}
        </div>
      </header>

      <main className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredShrines.map(([key, shrine]) => (
            <div 
              key={key} 
              className="bg-white rounded-xl shadow-md overflow-hidden border border-slate-200 hover:shadow-lg transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                <img 
                  src={shrine.image_url} 
                  alt={shrine.Name} 
                  className="w-full h-48 object-cover"
                />
                <div className="p-5">
                  <span className="inline-block px-3 py-1 text-xs font-semibold bg-amber-100 text-amber-800 rounded-full mb-2">
                    {shrine.Type}
                  </span>
                  <h3 className="text-xl font-bold text-slate-800 mb-1">
                    {shrine.Name}
                  </h3>
                  <p className="text-slate-500 text-sm mb-3">
                    📍 {shrine.City}, {shrine.State}
                  </p>
                  <p className="text-slate-600 text-sm line-clamp-2">
                    {shrine.history_geo_political}
                  </p>
                </div>
              </div>

              <div className="p-5 pt-0 border-t border-slate-100 mt-4">
                <div className="flex justify-between items-center text-xs text-slate-500 mb-4 pt-3">
                  <span>🌤️ {shrine.weather}</span>
                  <span>💰 {shrine.budget}</span>
                </div>
                <button 
                  onClick={() => {
                    setSelectedShrine(key);
                    setTripPlanResult(null);
                    setStartCity("");
                  }}
                  className="w-full bg-amber-600 hover:bg-amber-700 text-white font-medium py-2 px-4 rounded-lg transition-colors text-sm shadow-sm"
                >
                  View Travel & Plan Trip
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Modal / Detailed Business & Trip Planner View */}
        {selectedShrine && (
          <div className="fixed inset-0 bg-black/60 flex items-center justify-center p-4 z-50 overflow-y-auto">
            <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6 relative shadow-2xl">
              <button 
                onClick={() => setSelectedShrine(null)}
                className="absolute top-4 right-4 bg-slate-100 hover:bg-slate-200 text-slate-700 w-8 h-8 rounded-full flex items-center justify-center font-bold"
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
                      className="w-full h-64 object-cover rounded-xl mb-4"
                    />
                    <h2 className="text-2xl font-bold text-slate-900 mb-1">{shrine.Name}</h2>
                    <p className="text-slate-500 text-sm mb-4">📍 {shrine.City}, {shrine.State} | {shrine.Type}</p>
                    
                    {/* BUSINESS REVENUE SECTION: Online Prasad & E-Puja */}
                    <div className="bg-gradient-to-r from-amber-500 to-orange-600 text-white p-4 rounded-xl mb-6 shadow-md">
                      <h4 className="font-bold text-base mb-1">🎁 Book Home Delivery Prasad & Special E-Puja</h4>
                      <p className="text-xs text-amber-100 mb-3">Get sacred prasad directly from this temple delivered to your doorstep with certified rituals.</p>
                      <button 
                        onClick={() => handleBookingAction("Online Puja & Prasad", shrine.Name)}
                        className="bg-white text-amber-900 hover:bg-amber-50 font-bold py-2 px-4 rounded-lg text-xs transition-colors shadow"
                      >
                        Book Prasad / Puja Now (Partner Service)
                      </button>
                    </div>

                    <div className="space-y-4 text-sm text-slate-700">
                      
                      {/* NEW FEATURE: SMART TRIP PLANNER & ROUTE GENERATOR */}
                      <div className="bg-blue-50 p-4 rounded-xl border border-blue-200">
                        <h4 className="font-bold text-blue-900 mb-2 flex items-center gap-2">
                          🗺️ Custom Trip & Route Planner
                        </h4>
                        <p className="text-xs text-blue-700 mb-3">Apni current starting city daaliye aur is mandir tak ka best route aur travel guide paiye:</p>
                        
                        <div className="flex gap-2 mb-3">
                          <input 
                            type="text" 
                            placeholder="e.g., Ahmedabad, Delhi, Mumbai..." 
                            value={startCity}
                            onChange={(e) => setStartCity(e.target.value)}
                            className="flex-1 bg-white border border-blue-300 rounded-lg px-3 py-2 text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
                          />
                          <button 
                            onClick={() => handleGenerateTripPlan(shrine.Name, shrine.transport_roadmap)}
                            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-4 py-2 rounded-lg text-xs transition-colors shadow-sm"
                          >
                            Generate Route
                          </button>
                        </div>

                        {tripPlanResult && (
                          <div className="bg-white p-3 rounded-lg border border-blue-100 text-xs text-slate-700 space-y-1 mt-2">
                            <p className="font-semibold text-blue-900">🚗 Custom Route Plan:</p>
                            <p>{tripPlanResult.route}</p>
                            <p className="text-slate-500 italic mt-1">💡 {tripPlanResult.distanceEstimate}</p>
                          </div>
                        )}
                      </div>

                      <div className="bg-slate-50 p-3 rounded-lg border border-slate-100">
                        <strong className="block text-slate-900 mb-1">🏛️ History & Significance:</strong>
                        {shrine.history_geo_political}
                      </div>

                      <div className="bg-slate-50 p-3 rounded-lg border border-slate-100">
                        <strong className="block text-slate-900 mb-1">🌿 Nearby Picnic & Sightseeing Spots:</strong>
                        <p className="whitespace-pre-line">{shrine.picnic_spots}</p>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <div className="bg-slate-50 p-3 rounded-lg border border-slate-100">
                          <strong className="block text-slate-900 mb-1">🌤️ Weather & Best Time:</strong>
                          <p>{shrine.weather}</p>
                          <p className="text-xs text-slate-500 mt-1">Best: {shrine.bestTime}</p>
                        </div>
                        <div className="bg-slate-50 p-3 rounded-lg border border-slate-100">
                          <strong className="block text-slate-900 mb-1">💰 Estimated Budget:</strong>
                          <p>{shrine.budget}</p>
                        </div>
                      </div>

                      <div className="bg-slate-50 p-3 rounded-lg border border-slate-100">
                        <strong className="block text-slate-900 mb-1">🧳 Packing Essentials:</strong>
                        <p>{shrine.packing}</p>
                      </div>

                      <div className="bg-slate-50 p-3 rounded-lg border border-slate-100">
                        <strong className="block text-slate-900 mb-1">🚗 Transport & Road Map:</strong>
                        <p>{shrine.transport_roadmap}</p>
                      </div>

                      {/* BUSINESS REVENUE SECTION: Hotel Affiliate Booking */}
                      <div className="bg-amber-50 p-4 rounded-lg border border-amber-200">
                        <strong className="block text-amber-900 mb-1">🏨 Recommended Hotels & Stay Booking (Affiliate):</strong>
                        <p className="whitespace-pre-line text-xs text-slate-700 mb-3">{shrine.hotels_booking}</p>
                        <button 
                          onClick={() => handleBookingAction("Hotel Stay", shrine.Name)}
                          className="w-full bg-amber-600 hover:bg-amber-700 text-white font-semibold py-2 px-3 rounded-lg text-xs transition-colors shadow-sm"
                        >
                          Find & Book Best Hotel Rates Nearby
                        </button>
                      </div>

                      <div className="bg-slate-50 p-3 rounded-lg border border-slate-100">
                        <strong className="block text-slate-900 mb-1">🛍️ Local Markets & Food:**</strong>
                        <p className="whitespace-pre-line">{shrine.markets_food}</p>
                      </div>

                      <div className="bg-slate-50 p-3 rounded-lg border border-slate-100">
                        <strong className="block text-slate-900 mb-1">📞 Culture & Helpline:</strong>
                        <p>{shrine.culture_helpline}</p>
                      </div>
                    </div>

                    <button 
                      onClick={() => setSelectedShrine(null)}
                      className="mt-6 w-full bg-slate-800 hover:bg-slate-900 text-white font-medium py-2 px-4 rounded-lg transition-colors"
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
    </div>
  );
}
