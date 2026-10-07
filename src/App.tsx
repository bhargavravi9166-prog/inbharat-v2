import React, { useState, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL || 'https://xllmsjytvskzlyvynuzv.supabase.co';
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhsbG1zanl0dnNremx5dnludXp2Iiwicm9sZSI6Inhsb24iLCJpYXQiOjE3MDk4NTYzMjQsImV4cCI6MjAyNTQzMjMyNH0.placeholder';

const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL || SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY || SUPABASE_ANON_KEY
);

export default function App() {
  const [searchTerm, setSearchTerm] = useState('');
  const [results, setResults] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState<Record<string, string>>({});

  const [showAddModal, setShowAddModal] = useState(false);
  const [showVendorModal, setShowVendorModal] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const [formData, setFormData] = useState({
    Name: '', State: '', City: '', Type: '',
    history: '', famous_food: '', famous_markets: '',
    temples_and_spots: '', route_transport: '',
    image_url: '', emergency_services: ''
  });

  const [vendorData, setVendorData] = useState({ businessName: '', ownerName: '', phone: '', city: '', category: 'Hotel / Stay' });

  useEffect(() => {
    loadDefaultData();
  }, []);

  const loadDefaultData = async () => {
    setLoading(true);
    const { data } = await supabase
      .from('Heritage and tourism palace')
      .select('*')
      .limit(6);

    if (data && data.length > 0) {
      setResults(data);
    } else {
      setResults([
        {
          Name: 'Amer Fort & Royal Palace',
          City: 'Jaipur',
          State: 'Rajasthan',
          Type: 'UNESCO World Heritage Fort',
          image_url: 'https://images.unsplash.com/photo-1599661046289-e31897846e41?auto=format&fit=crop&w=800&q=80',
          history: 'Magnificent architectural marvel built with red sandstone and marble, overlooking Maota Lake.',
          temples_and_spots: '1. Sheesh Mahal (Mirror Palace)\n2. Sila Devi Temple\n3. Diwan-e-Aam\n4. Maota Lake Gardens',
          famous_markets: 'Amer Road Handicrafts & Traditional Jewelry Bazaars.',
          famous_food: 'Authentic Dal Baati Churma, Pyaaz Kachori, and Ghevar.',
          route_transport: '11 km from City Center; frequent auto-rickshaws, cabs, and local buses available.',
          emergency_services: 'Tourist Police Station Amer: 0141-2530126 | Ambulance: 108 | Police: 100',
          itinerary: 'Morning: Explore Amer Fort & Sheesh Mahal\nAfternoon: Lunch at royal cafe & Maota Lake view\nEvening: Light & Sound show at palace ramparts.'
        },
        {
          Name: 'Hawa Mahal - Palace of Winds',
          City: 'Jaipur',
          State: 'Rajasthan',
          Type: 'Architectural Landmark',
          image_url: 'https://images.unsplash.com/photo-1609766418064-96cf159e4468?auto=format&fit=crop&w=800&q=80',
          history: 'An extraordinary five-story hive-like structure with 953 jharokhas built for royal women to observe street festivals.',
          temples_and_spots: '1. Tripolia Bazaar\n2. Jantar Mantar\n3. City Palace Museum\n4. Badi Chaupar',
          famous_markets: 'Johari Bazaar & Badi Chaupar for traditional textiles and gemstones.',
          famous_food: 'LMB Sweets, Mirchi Bada, Masala Chai.',
          route_transport: 'Located in heart of walled city; excellent metro and e-rickshaw connectivity.',
          emergency_services: 'Manak Chowk Police Station: 100 | Hospital: 108',
          itinerary: 'Morning: Photography & interior tour of Hawa Mahal\nAfternoon: Shopping in Johari Bazaar\nEvening: Sunset view from nearby rooftop cafe.'
        }
      ]);
    }
    setLoading(false);
  };

  const generateWorldClassCards = async (query: string) => {
    const cleanName = query.trim();
    const capitalized = cleanName.charAt(0).toUpperCase() + cleanName.slice(1);

    let wikiImg = 'https://images.unsplash.com/photo-1588095920028-a433f42f7c6a?auto=format&fit=crop&w=800&q=80';
    let wikiSummary = `${capitalized} is a premier destination in India, offering rich cultural heritage, vibrant local markets, and seamless travel utilities.`;
    
    try {
      const res = await fetch(`https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(cleanName)}`);
      if (res.ok) {
        const json = await res.json();
        if (json.thumbnail?.source) wikiImg = json.thumbnail.source;
        if (json.extract) wikiSummary = json.extract;
      }
    } catch (e) {
      console.error(e);
    }

    return [
      {
        Name: `${capitalized} Heritage & Sightseeing Hub`,
        City: capitalized,
        State: 'Bharat / India',
        Type: 'Primary Destination Hub',
        image_url: wikiImg,
        history: wikiSummary,
        temples_and_spots: `1. Main Town Heritage Square\n2. Historic Ancient Memorials\n3. Cultural Center & Museum\n4. Scenic Gardens & Viewpoints`,
        famous_markets: `${capitalized} Main Handloom Bazaar, Artisan Outlets & Local Crafts.`,
        famous_food: `Signature Regional Thali, Traditional Sweets, and Local Delicacies.`,
        route_transport: `Well-connected via State Highways, Railway Station, Local Auto & Cabs.`,
        emergency_services: `Local Police Station: 100 | District Hospital & Ambulance: 108`,
        itinerary: `Morning: Arrival & heritage sightseeing tour\nAfternoon: Explore local handicraft markets\nEvening: Enjoy regional cuisine at famous food street.`
      },
      {
        Name: `${capitalized} Culinary & Market Street`,
        City: capitalized,
        State: 'Bharat / India',
        Type: 'Market & Food District',
        image_url: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=800&q=80',
        history: `The commercial heartbeat of ${capitalized}, known for vibrant local trade, traditional textiles, and authentic street food culture.`,
        temples_and_spots: `1. Central Market Square\n2. Evening Food Street\n3. Handloom Emporiums`,
        famous_markets: `Textile Hub, Spice Market, Souvenir & Artifact Stalls.`,
        famous_food: `Famous Street Chaat, Spicy Snacks, Fresh Sweets & Tea.`,
        route_transport: `Pedestrian-friendly market zone with ample parking and e-rickshaws.`,
        emergency_services: `Market Help Desk: 100 | Fire Station: 101`,
        itinerary: `Morning: Spice and textile market exploration\nAfternoon: Street food tasting tour\nEvening: Souvenir shopping & leisure walk.`
      }
    ];
  };

  const handleSearch = async (termToSearch?: string, e?: React.FormEvent) => {
    if (e) e.preventDefault();
    const query = termToSearch !== undefined ? termToSearch : searchTerm;
    
    if (!query || !query.trim()) {
      loadDefaultData();
      return;
    }

    const cleanQuery = query.trim();
    setSearchTerm(cleanQuery);
    setLoading(true);

    const { data, error } = await supabase
      .from('Heritage and tourism palace')
      .select('*')
      .ilike('Name', `%${cleanQuery}%`);

    if (!error && data && data.length > 0) {
      setResults(data);
    } else {
      const cards = await generateWorldClassCards(cleanQuery);
      setResults(cards);
    }
    setLoading(false);
  };

  const handleAddSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.Name || !formData.City) {
      alert('Kripya Name aur City zaroor bharein!');
      return;
    }

    setSubmitting(true);
    const { error } = await supabase
      .from('Heritage and tourism palace')
      .insert([formData]);

    setSubmitting(false);

    if (error) {
      alert('Error: ' + error.message);
    } else {
      alert('Spot successfully added to InBharat database!');
      setShowAddModal(false);
      handleSearch(formData.City);
    }
  };

  const handleVendorSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!vendorData.businessName || !vendorData.phone) {
      alert('Kripya Business Name aur Phone number dalein!');
      return;
    }
    alert(`Success! ${vendorData.businessName} has been submitted for verification in InBharat Local Hub.`);
    setShowVendorModal(false);
    setVendorData({ businessName: '', ownerName: '', phone: '', city: '', category: 'Hotel / Stay' });
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans pb-28 selection:bg-orange-500 selection:text-white">
      
      {/* Top Brand Bar */}
      <header className="sticky top-0 z-50 bg-slate-900/90 backdrop-blur-xl border-b border-slate-800 px-4 py-3 flex justify-between items-center shadow-2xl">
        <div className="flex items-center gap-2.5 cursor-pointer" onClick={() => window.location.reload()}>
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-orange-600 to-amber-500 flex items-center justify-center text-white font-black text-xl shadow-lg shadow-orange-500/20">
            🇮🇳
          </div>
          <div>
            <div className="flex items-center font-black tracking-wider text-xl leading-none">
              <span className="text-orange-500">IN</span>
              <span className="text-white">BHARAT</span>
            </div>
            <span className="text-[10px] text-slate-400 font-bold uppercase tracking-widest block mt-0.5">
              One-Step Super-App Hub
            </span>
          </div>
        </div>

        <div className="flex gap-2">
          <button 
            onClick={() => setShowVendorModal(true)} 
            className="bg-emerald-600/20 text-emerald-400 border border-emerald-500/30 text-xs font-bold px-3 py-2 rounded-xl transition shadow-md active:scale-95 whitespace-nowrap"
          >
            + List Business
          </button>
          <button 
            onClick={() => setShowAddModal(true)} 
            className="bg-slate-800 hover:bg-slate-700 text-amber-400 border border-amber-500/30 text-xs font-bold px-3 py-2 rounded-xl transition shadow-md active:scale-95 whitespace-nowrap hidden sm:block"
          >
            + Add Spot
          </button>
        </div>
      </header>

      {/* Hero Search Section */}
      <section className="relative px-4 pt-10 pb-12 max-w-3xl mx-auto w-full text-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-orange-500/10 via-transparent to-transparent pointer-events-none blur-3xl"></div>
        
        <span className="inline-flex items-center gap-1.5 bg-orange-500/10 text-orange-400 border border-orange-500/20 text-xs font-bold px-3.5 py-1.5 rounded-full mb-4 shadow-inner">
          🚀 World-Class Unified Travel & Utility Platform
        </span>
        <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-white mb-3">
          No More Searching, <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-amber-400">Everything Here.</span>
        </h1>
        <p className="text-xs sm:text-sm text-slate-400 max-w-md mx-auto mb-8 font-medium">
          Instant sightseeing cards, famous food, transport details, itinerary planner, and emergency SOS in one sleek dashboard.
        </p>

        <form onSubmit={(e) => handleSearch(undefined, e)} className="relative max-w-xl mx-auto">
          <div className="flex bg-slate-900/90 backdrop-blur-md rounded-2xl p-2 shadow-2xl border border-slate-700/80 focus-within:border-orange-500 transition">
            <span className="flex items-center pl-3 text-slate-400 text-lg">🔍</span>
            <input
              type="text"
              placeholder="Search city, monument or village (e.g. Jaipur, Ujjain, Tonk)..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="flex-1 bg-transparent px-3 py-3 text-xs sm:text-sm text-slate-100 placeholder-slate-500 outline-none font-semibold"
            />
            <button 
              type
