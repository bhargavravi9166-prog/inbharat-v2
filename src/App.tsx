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
  const [activeTab, setActiveTab] = useState<Record<number, string>>({});

  const [showAddModal, setShowAddModal] = useState(false);
  const [showVendorModal, setShowVendorModal] = useState(false);
  const [showGovtModal, setShowGovtModal] = useState(false);

  const [formData, setFormData] = useState({
    Name: '', State: '', City: '', Type: '', Zone: '',
    geography_politics: '', history: '', famous_personalities: '',
    culture: '', famous_food: '', famous_markets: '',
    temples_and_spots: '', route_transport: '',
    panchayat_sarpanch: '', local_government: '', emergency_services: '', public_utilities: ''
  });

  const [vendorData, setVendorData] = useState({ businessName: '', ownerName: '', phone: '', city: '' });
  const [govtData, setGovtData] = useState({ repName: '', designation: '', villageCity: '', phone: '' });

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
    }
    setLoading(false);
  };

  // Multi-Card Generator for Main City + Nearby Palaces
  const fetchNearbyPalacesCards = async (query: string) => {
    try {
      const cleanQuery = query.trim().toLowerCase();
      let generatedCards: any[] = [];

      // If user searches Jaipur, generate individual cards for Jaipur palaces
      if (cleanQuery.includes('jaipur')) {
        generatedCards = [
          {
            Name: 'Amer Fort & Palace',
            City: 'Jaipur',
            State: 'Rajasthan, Bharat',
            Type: 'UNESCO World Heritage Fort',
            image_url: 'https://images.unsplash.com/photo-1599661046289-e31897846e41?auto=format&fit=crop&w=800&q=80',
            history: 'Amer Fort is known for its artistic style elements, large ramparts, series of gates and cobbled paths.',
            temples_and_spots: 'Sheesh Mahal (Mirror Palace), Sila Devi Temple, Maota Lake.',
            famous_markets: 'Amer Road Handicraft Shops & Traditional Jewelry Bazaars.',
            famous_food: 'Rajasthani Dal Baati Churma, Pyaaz Kachori.',
            route_transport: '11 km from Jaipur City Centre, easily accessible via cabs and auto-rickshaws.',
            emergency_services: 'Tourist Police Station Amer (100 / 108).'
          },
          {
            Name: 'Hawa Mahal',
            City: 'Jaipur',
            State: 'Rajasthan, Bharat',
            Type: 'Iconic Heritage Palace',
            image_url: 'https://images.unsplash.com/photo-1609766418064-96cf159e4468?auto=format&fit=crop&w=800&q=80',
            history: 'Built in 1799 by Maharaja Sawai Pratap Singh, known as the Palace of Winds with 953 intricate windows.',
            temples_and_spots: 'Tripolia Bazaar, Jantar Mantar, City Palace nearby.',
            famous_markets: 'Badi Chaupar & Johari Bazaar for gemstones and textiles.',
            famous_food: 'LMB Sweets, Ghevar, Mirchi Bada.',
            route_transport: 'Located right in the heart of Jaipur walled city.',
            emergency_services: 'Manak Chowk Police Station (100).'
          },
          {
            Name: 'City Palace, Jaipur',
            City: 'Jaipur',
            State: 'Rajasthan, Bharat',
            Type: 'Royal Residence & Museum',
            image_url: 'https://images.unsplash.com/photo-1588095920028-a433f42f7c6a?auto=format&fit=crop&w=800&q=80',
            history: 'The royal seat of the Maharaja of Jaipur, featuring a blend of Rajasthani and Mughal architectural styles.',
            temples_and_spots: 'Mubarak Mahal, Chandra Mahal, Peacock Gate.',
            famous_markets: 'Tripolia Bazaar & Sireh Deori Bazaar.',
            famous_food: 'Traditional Royal Thali at Palace Cafe.',
            route_transport: 'Central location in old Jaipur city.',
            emergency_
