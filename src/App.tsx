import React, { useState } from 'react';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';
const supabase = createClient(supabaseUrl, supabaseAnonKey);

export default function App() {
  const [searchTerm, setSearchTerm] = useState('');
  const [results, setResults] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [searched, setSearched] = useState(false);
  const [activeTab, setActiveTab] = useState<Record<number, string>>({});
  
  // Add Spot Modal / Form State
  const [showAddModal, setShowAddModal] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [formData, setFormData] = useState({
    Name: '',
    State: '',
    City: '',
    Type: '',
    Zone: '',
    geography_politics: '',
    history: '',
    famous_personalities: '',
    culture: '',
    famous_food: '',
    famous_markets: '',
    temples_and_spots: '',
    route_transport: '',
  });

  const handleSearch = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!searchTerm.trim()) return;

    setLoading(true);
    setSearched(true);

    const { data, error } = await supabase
      .from('Heritage and tourism palace')
      .select('*')
      .or(`Name.ilike.%${searchTerm}%,State.ilike.%${searchTerm}%,City.ilike.%${searchTerm}%`);

    if (error) {
      console.error('Fetch error:', error);
    }

    setResults(data || []);
    setLoading(false);
  };

  const handleTabChange = (cardIdx: number, tabName: string) => {
    setActiveTab(prev => ({ ...prev, [cardIdx]: tabName }));
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleAddSpotSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.Name || !formData.State) {
      alert('Kripya Kam se kam Place Name aur State zaroor bharein!');
      return;
    }

    setSubmitting(true);
    const { error } = await supabase
      .from('Heritage and tourism palace')
      .insert([formData]);

    setSubmitting(false);

    if (error) {
      console.error('Insert error:', error);
      alert('Spot submit karne me dikkat aayi: ' + error.message);
    } else {
      setSubmitSuccess(true);
      setTimeout(() => {
        setSubmitSuccess(false);
        setShowAddModal(false);
        setFormData({
          Name: '', State: '', City: '', Type: '', Zone: '',
          geography_politics: '', history: '', famous_personalities: '',
          culture: '', famous_food: '', famous_markets: '',
          temples_and_spots: '', route_transport: ''
        });
      }, 2000);
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 text-slate-800 flex flex-col font-sans">
      {/* Header */}
      <header className="bg-gradient-to-r from-orange-600 via-amber-500 to-emerald-600 text-white shadow-md">
        <div className="max-w-4xl mx-auto px-4 py-8 text-center relative">
          <span className="inline-block bg-white/20 backdrop-blur-md px-4 py-1 rounded-full text-xs font-semibold mb-2">
            ✨ InBharat Heritage & Tourism Super-App
          </span>
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">InBharat</h1>
          <p className="text-orange-100 text-sm sm:text-base mt-1">
            Bharat ki kisi bhi jagah ka itihas, bhugol, khana, market, mandir aur route janiye.
          </p>
          <button
            onClick={() => setShowAddModal(true)}
            className="mt-4 bg-white text-orange-700 font-bold px-4 py-2 rounded-lg text-sm shadow hover:bg-orange-50 transition"
          >
            ➕ Add Your Local Spot
          </button>
        </div>
      </header>

      {/* Main Container */}
      <main className="max-w-4xl mx-auto px-4 -mt-6 flex-1 w-full pb-12">
        {/* Search Bar */}
        <form onSubmit={handleSearch} className="bg-white p-3 rounded-xl shadow-lg border border-slate-200 flex flex-col sm:flex-row gap-2">
          <input
            type="text"
            placeholder="Search city, state, or place (e.g. Jaipur, Tonk, Agra, Amer)..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="flex-1 px-4 py-3 rounded-lg border border-slate-200 text-slate-700 outline-none focus:ring-2 focus:ring-orange-500"
          />
          <button
            type="submit"
            disabled={loading}
            className="bg-orange-600 hover:bg-orange-700 text-white font-semibold px-6 py-3 rounded-lg transition disabled:opacity-50"
          >
            {loading ? 'Searching...' : 'Explore Bharat'}
          </button>
        </form>

        {/* Results Section */}
        <div className="mt-6">
          {loading && (
            <div className="text-center py-8 text-slate-500 font-medium">
              Searching heritage database...
            </div>
          )}

          {!loading && searched && results.length === 0 && (
            <div className="bg-white rounded-xl p-6 text-center border border-slate-200 shadow-sm text-slate-500">
              No places found for "{searchTerm}".
            </div>
          )}

          {!loading && results.length > 0 && (
            <div className="space-y-6">
              <p className="text-slate-500 text-xs font-bold uppercase tracking-wider">
                Found {results.length} Place(s)
              </p>

              {results.map((item, idx) => {
                const currentTab = activeTab[idx] || 'overview';

                return (
                  <div key={idx} className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
                    {/* Card Header */}
                    <div className="p-5 border-b border-slate-100 bg-slate-50 flex justify-between items-start">
                      <div>
                        <h2 className="text-2xl font-bold text-slate-900">{item.Name || 'Unnamed Location'}</h2>
                        <p className="text-sm text-slate-600 mt-1">
                          📍 {item.City ? `${item.City}, ` : ''}{item.State} {item.Zone ? `(${item.Zone} Zone)` : ''}
                        </p>
                      </div>
                      {item.Type && (
                        <span className="bg-orange-100 text-orange-800 text-xs font-bold px-3 py-1 rounded-full">
                          {item.Type}
                        </span>
                      )}
                    </div>

                    {/* Navigation Tabs */}
                    <div className="flex border-b border-slate-200 overflow-x-auto bg-white text-xs sm:text-sm font-medium text-slate-600">
                      {[
                        { key: 'overview', label: '📌 Overview' },
                        { key: 'history', label: '📜 History & Politics' },
                        { key: 'culture', label: '🎨 Culture & Food' },
                        { key: 'travel', label: '🛍️ Market & Routes' },
                      ].map(tab => (
                        <button
                          key={tab.key}
                          onClick={() => handleTabChange(idx, tab.key)}
                          className={`px-4 py-3 whitespace-nowrap border-b-2 transition ${
                            currentTab === tab.key
                              ? 'border-orange-600 text-orange-600 font-bold bg-orange-50/50'
                              : 'border-transparent hover:text-slate-900'
                          }`}
                        >
                          {tab.label}
                        </button>
                      ))}
                    </div>

                    {/* Tab Content Details */}
                    <div className="p-5 space-y-4 text-sm leading-relaxed text-slate-700">
                      {currentTab === 'overview' && (
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <div><strong className="text-slate-900">Establishment Year:</strong> {item['Establishment Year'] || 'N/A'}</div>
                          <div><strong className="text-slate-900">Rating:</strong> ⭐ {item['Google review rating'] || 'N/A'}</div>
                          <div className="sm:col-span-2"><strong className="text-slate-900">Geography & Politics:</strong> {item.geography_politics || 'Information updating soon.'}</div>
                        </div>
                      )}

                      {currentTab === 'history' && (
                        <div className="space-y-3">
                          <div>
                            <h4 className="font-bold text-slate-900 mb-1">📜 History (Itihas):</h4>
                            <p>{item.history || 'Historical details updating soon.'}</p>
                          </div>
                          <div>
                            <h4 className="font-bold text-slate-900 mb-1">👑 Mahan Hastiya (Famous Personalities):</h4>
                            <p>{item.famous_personalities || 'Famous personalities details updating soon.'}</p>
                          </div>
                        </div>
                      )}

                      {currentTab === 'culture' && (
                        <div className="space-y-3">
                          <div>
                            <h4 className="font-bold text-slate-900 mb-1">🎨 Culture & Heritage:</h4>
                            <p>{item.culture || 'Cultural details updating soon.'}</p>
                          </div>
                          <div>
                            <h4 className="font-bold text-slate-900 mb-1">🍲 Prasiddh Khana (Famous Food):</h4>
                            <p>{item.famous_food || 'Food recommendations updating soon.'}</p>
                          </div>
                        </div>
                      )}

                      {currentTab === 'travel' && (
                        <div className="space-y-3">
                          <div>
                            <h4 className="font-bold text-slate-900 mb-1">🛍️ Famous Markets:</h4>
                            <p>{item.famous_markets || 'Shopping & market details updating soon.'}</p>
                          </div>
                          <div>
                            <h4 className="font-bold text-slate-900 mb-1">🛕 Mandir & Picnic Spots:</h4>
                            <p>{item.temples_and_spots || 'Famous spots & temples updating soon.'}</p>
                          </div>
                          <div>
                            <h4 className="font-bold text-slate-900 mb-1">🚌 Routes & Transport:</h4>
                            <p>{item.route_transport || 'Transport routes updating soon.'}</p>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </main>

      {/* Add Spot Modal Form */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50 overflow-y-auto">
          <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full p-6 my-8 max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-4 border-b pb-2">
              <h3 className="text-xl font-bold text-slate-900">➕ Add New Tourism / Heritage Spot</h3>
              <button onClick={() => setShowAddModal(false)} className="text-slate-400 hover:text-slate-600 text-lg font-bold">✕</button>
            </div>

            {submitSuccess ? (
              <div className="bg-green-100 text-green-800 p-4 rounded-lg text-center font-semibold my-6">
                🎉 Spot successfully add ho gaya hai! Database me save ho gaya.
              </div>
            ) : (
              <form onSubmit={handleAddSpotSubmit} className="space-y-4 text-sm">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Place Name *</label>
                    <input type="text" name="Name" required value={formData.Name} onChange={handleInputChange} placeholder="e.g. Amer Fort" className="w-full p-2 border rounded" />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">State *</label>
                    <input type="text" name="State" required value={formData.State} onChange={handleInputChange} placeholder="e.g. Rajasthan" className="w-full p-2 border rounded" />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">City / District</label>
                    <input type="text" name="City" value={formData.City} onChange={handleInputChange} placeholder="e.g. Jaipur" className="w-full p-2 border rounded" />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Type (Fort, Temple, Market, Spot)</label>
                    <input type="text" name="Type" value={formData.Type} onChange={handleInputChange} placeholder="e.g. Fort" className="w-full p-2 border rounded" />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Geography & Politics</label>
                  <input type="text" name="geography_politics" value={formData.geography_politics} onChange={handleInputChange} placeholder="Pahadi, Zila, Panchayat..." className="w-full p-2 border rounded" />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">History (Itihas)</label>
                  <textarea name="history" value={formData.history} onChange={handleInputChange} rows={2} placeholder="Kabb bana, kisne banwaya..." className="w-full p-2 border rounded" />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Mahan Hastiya (Famous Personalities)</label>
                  <input type="text" name="famous_personalities" value={formData.famous_personalities} onChange={handleInputChange} placeholder="Raja, Neta, Freedom Fighters..." className="w-full p-2 border rounded" />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Culture & Famous Food</label>
                  <input type="text" name="famous_food" value={formData.famous_food} onChange={handleInputChange} placeholder="Prasiddh Khana, Mithai..." className="w-full p-2 border rounded" />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Famous Markets & Shopping</label>
                  <input type="text" name="famous_markets" value={formData.famous_markets} onChange={handleInputChange} placeholder="Bazaar, Handicraft..." className="w-full p-2 border rounded" />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Mandir & Picnic Spots</label>
                  <input type="text" name="temples_and_spots" value={formData.temples_and_spots} onChange={handleInputChange} placeholder="Aas pass ke mandir, jheel..." className="w-full p-2 border rounded" />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Route & Transport</label>
                  <input type="text" name="route_transport" value={formData.route_transport} onChange={handleInputChange} placeholder="Bus, Train, Airport, Taxi Route..." className="w-full p-2 border rounded" />
                </div>

                <div className="flex justify-end gap-2 pt-2 border-t">
                  <button type="button" onClick={() => setShowAddModal(false)} className="px-4 py-2 bg-slate-200 text-slate-700 rounded font-bold">Cancel</button>
                  <button type="submit" disabled={submitting} className="px-6 py-2 bg-orange-600 text-white rounded font-bold hover:bg-orange-700 transition">
                    {submitting ? 'Submitting...' : 'Save Spot'}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="bg-slate-900 text-slate-400 py-4 text-center text-xs">
        InBharat Super App &copy; {new Date().getFullYear()}
      </footer>
    </div>
  );
}
