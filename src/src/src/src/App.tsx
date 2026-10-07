import React, { useState } from 'react';
import { createClient } from '@supabase/supabase-js';
import { Search, MapPin, Landmark, Compass, Sparkles, AlertCircle } from 'lucide-react';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';
const supabase = createClient(supabaseUrl, supabaseAnonKey);

export default function App() {
  const [searchTerm, setSearchTerm] = useState('');
  const [results, setResults] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [searched, setSearched] = useState(false);

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
      console.error('Supabase Error:', error);
      setResults([]);
    } else {
      setResults(data || []);
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <header className="bg-gradient-to-r from-orange-600 via-amber-500 to-emerald-600 text-white shadow-lg">
        <div className="max-w-6xl mx-auto px-4 py-8 text-center">
          <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-md px-4 py-1.5 rounded-full text-sm font-medium mb-4">
            <Sparkles className="w-4 h-4 text-yellow-300" /> Discover Incredible India
          </div>
          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight mb-2">InBharat</h1>
          <p className="text-orange-100 text-base sm:text-lg max-w-xl mx-auto">
            Explore heritage palaces, monuments, and iconic destinations across Indian states & cities.
          </p>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-4 -mt-6 flex-1 w-full pb-16">
        <form onSubmit={handleSearch} className="bg-white p-3 rounded-2xl shadow-xl border border-slate-100 flex flex-col sm:flex-row gap-2">
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search by monument, city, or state (e.g. Fort, Agra, Rajasthan)..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-3.5 rounded-xl border-0 focus:ring-2 focus:ring-orange-500 text-slate-700 placeholder-slate-400 font-medium outline-none text-base"
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="bg-orange-600 hover:bg-orange-700 text-white font-semibold px-8 py-3.5 rounded-xl transition flex items-center justify-center gap-2 shadow-md shadow-orange-500/20 active:scale-95 disabled:opacity-50"
          >
            {loading ? (
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
            ) : (
              <>
                <Compass className="w-5 h-5" /> Explore
              </>
            )}
          </button>
        </form>

        <div className="mt-8">
          {loading && (
            <div className="text-center py-12">
              <div className="inline-block w-8 h-8 border-4 border-orange-500 border-t-transparent rounded-full animate-spin mb-3"></div>
              <p className="text-slate-500 font-medium">Searching Indian heritage destinations...</p>
            </div>
          )}

          {!loading && searched && results.length === 0 && (
            <div className="bg-white rounded-2xl p-8 text-center border border-slate-200/80 shadow-sm">
              <AlertCircle className="w-12 h-12 text-slate-400 mx-auto mb-3" />
              <h3 className="text-lg font-bold text-slate-700">No destinations found</h3>
              <p className="text-slate-500 mt-1">Try searching with a different state, city, or keyword.</p>
            </div>
          )}

          {!loading && results.length > 0 && (
            <div>
              <p className="text-slate-500 text-sm font-medium mb-4">
                Found <span className="font-bold text-slate-800">{results.length}</span> destinations matching "{searchTerm}"
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {results.map((item, idx) => (
                  <div
                    key={idx}
                    className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm hover:shadow-md transition duration-200 flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-start justify-between gap-2 mb-2">
                        <h3 className="text-xl font-bold text-slate-900 leading-snug">{item.Name}</h3>
                        {item.Type && (
                          <span className="text-xs font-semibold bg-orange-50 text-orange-700 px-2.5 py-1 rounded-full whitespace-nowrap border border-orange-200/60">
                            {item.Type}
                          </span>
                        )}
                      </div>

                      <div className="flex items-center gap-1.5 text-slate-600 text-sm mb-3">
                        <MapPin className="w-4 h-4 text-emerald-600 shrink-0" />
                        <span>{item.City ? `${item.City}, ` : ''}{item.State}</span>
                      </div>
                    </div>

                    {item.Zone && (
                      <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
                        <span className="flex items-center gap-1">
                          <Landmark className="w-3.5 h-3.5 text-amber-600" /> Zone: {item.Zone}
                        </span>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </main>

      <footer className="bg-slate-900 text-slate-400 py-6 text-center text-sm border-t border-slate-800">
        InBharat &copy; {new Date().getFullYear()} — Powered by Supabase & React
      </footer>
    </div>
  );
}
