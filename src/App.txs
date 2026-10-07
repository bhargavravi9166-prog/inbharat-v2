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
    <div className="min-h-screen bg-slate-50 text-slate-800 flex flex-col">
      <header className="bg-gradient-to-r from-orange-600 via-amber-500 to-emerald-600 text-white shadow-lg">
        <div className="max-w-4xl mx-auto px-4 py-8 text-center">
          <span className="inline-block bg-white/20 backdrop-blur-md px-4 py-1 rounded-full text-xs font-semibold mb-3">
            ✨ Discover Incredible India
          </span>
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight mb-2">InBharat</h1>
          <p className="text-orange-100 text-sm sm:text-base">
            Search heritage palaces, monuments, and tourism places.
          </p>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 -mt-6 flex-1 w-full pb-12">
        <form onSubmit={handleSearch} className="bg-white p-3 rounded-xl shadow-lg border border-slate-200 flex flex-col sm:flex-row gap-2">
          <input
            type="text"
            placeholder="Search monument, city, or state..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="flex-1 px-4 py-3 rounded-lg border border-slate-200 text-slate-700 outline-none focus:ring-2 focus:ring-orange-500"
          />
          <button
            type="submit"
            disabled={loading}
            className="bg-orange-600 hover:bg-orange-700 text-white font-semibold px-6 py-3 rounded-lg transition disabled:opacity-50"
          >
            {loading ? 'Searching...' : 'Search'}
          </button>
        </form>

        <div className="mt-6">
          {loading && (
            <div className="text-center py-8 text-slate-500 font-medium">
              Searching database...
            </div>
          )}

          {!loading && searched && results.length === 0 && (
            <div className="bg-white rounded-xl p-6 text-center border border-slate-200 shadow-sm text-slate-500">
              No places found for "{searchTerm}".
            </div>
          )}

          {!loading && results.length > 0 && (
            <div className="space-y-4">
              <p className="text-slate-500 text-xs font-bold uppercase tracking-wider">
                Results ({results.length})
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {results.map((item, idx) => (
                  <div key={idx} className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="font-bold text-slate-900 text-lg">{item.Name}</h3>
                      {item.Type && (
                        <span className="text-xs bg-orange-100 text-orange-800 font-semibold px-2 py-0.5 rounded">
                          {item.Type}
                        </span>
                      )}
                    </div>
                    <p className="text-sm text-slate-600">
                      📍 {item.City ? `${item.City}, ` : ''}{item.State}
                    </p>
                    {item.Zone && (
                      <p className="text-xs text-slate-400 mt-2">
                        Zone: {item.Zone}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </main>

      <footer className="bg-slate-900 text-slate-400 py-4 text-center text-xs">
        InBharat &copy; {new Date().getFullYear()}
      </footer>
    </div>
  );
}
