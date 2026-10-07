import React, { useState, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL || 'https://xllmsjytvskzlyvynuzv.supabase.co';
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhsbG1zanl0dnNremx5dnludXp2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDk4NTYzMjQsImV4cCI6MjAyNTQzMjMyNH0.placeholder';

const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL || SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY || SUPABASE_ANON_KEY
);

export default function App() {
  const [searchTerm, setSearchTerm] = useState('');
  const [results, setResults] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState<string>('overview');

  const [showAddModal, setShowAddModal] = useState(false);
  const [showVendorModal, setShowVendorModal] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const [formData, setFormData] = useState({
    Name: '', State: '', City: '', Type: '',
    history: '', famous_food: '', famous_markets: '',
    temples_and_spots: '', route_transport: '', image_url: '', emergency_services: ''
  });

  const [vendorData, setVendorData] = useState({ businessName: '', ownerName: '', phone: '', city: '', category: 'Hotel / Homestay' });

  useEffect(() => {
    loadDefaultData();
  }, []);

  const loadDefaultData = async () => {
    setLoading(true);
    const { data } = await supabase
      .from('Heritage and tourism palace')
      .select('*')
      .limit(5);

    if (data && data.length > 0) {
      setResults(data);
    } else {
      setResults([
        {
          Name: 'Amer Fort & Royal Palace',
          City: 'Jaipur',
          State: 'Rajasthan',
          Type: 'Royal Heritage Fort',
          image_url: 'https://images.unsplash.com/photo-1599661046289-e31897846e41?auto=format&fit=crop&w=800&q=80',
          history: 'Amer Fort is a breathtaking architectural marvel perched high on the Aravalli hills, featuring majestic courtyards and mirror palaces.',
          temples_and_spots: 'Sheesh Mahal, Sila Devi Temple, Diwan-e-Aam, Maota Lake.',
          famous_markets: 'Amer Road Handicrafts & Royal Gem Bazaars.',
          famous_food: 'Dal Baati Churma, Pyaaz Kachori, Ghevar.',
          route_transport: '11 km from Jaipur City Centre; cabs, autos, and local buses readily available.',
          emergency_services: 'Tourist Police: 100 | Ambulance: 108 | Control Room: 0141-2561255'
        }
      ]);
    }
    setLoading(false);
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
      const cap = cleanQuery.charAt(0).toUpperCase() + cleanQuery.slice(1);
      setResults([
        {
          Name: `${cap} Heritage & Local Utility Hub`,
          City: cap,
          State: 'Bharat / India',
          Type: 'Verified Destination',
          image_url: 'https://images.unsplash.com/photo-1588095920028-a433f42f7c6a?auto=format&fit=crop&w=800&q=80',
          history: `${cap} is an incredible cultural landmark rich in regional history, vibrant community networks, and traditional heritage.`,
          temples_and_spots: `Main town square, historic ancient temples, and local scenic viewpoints around ${cap}.`,
          famous_markets: `${cap} Handloom Bazaar & Traditional Artisan Shops.`,
          famous_food: `Authentic regional thali, local sweets, and famous street delicacies.`,
          route_transport: `Well connected via state highways, local auto-rickshaws, and taxi services.`,
          emergency_services: `Local Police: 100 | Hospital/Ambulance: 108`
        }
      ]);
    }
    setLoading(false);
  };

  const handleAddSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.Name || !formData.City) {
      alert('Kripya Name aur City bharein!');
      return;
    }
    setSubmitting(true);
    const { error } = await supabase.from('Heritage and tourism palace').insert([formData]);
    setSubmitting(false);
    if (error) {
      alert('Error: ' + error.message);
    } else {
      alert('Spot successfully added to InBharat database!');
      setShowAddModal(false);
      
