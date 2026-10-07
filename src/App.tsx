import React, { useState } from 'react';

// Ultimate Comprehensive Indian Tourism & Sacred Temples Directory
const MASTER_INDIA_TOURISM_DIRECTORY: Record<string, any> = {
  // --- RAJASTHAN ---
  "jaipur": {
    Name: "Jaipur - The Pink City & Royal Capital",
    City: "Jaipur", State: "Rajasthan", Type: "👑 Royal Heritage Capital",
    image_url: "https://images.unsplash.com/photo-1599661046289-e31897846e41?auto=format&fit=crop&w=1200&q=80",
    weather: "☀️ 28°C (Sunny & Pleasant)", bestTime: "October to March",
    packing: "🧳 Light cotton clothes, sunglasses, sunscreen, comfortable walking shoes.",
    budget: "💰 Est. Budget: ₹2,500 - ₹5,000 / day",
    history_geo_political: "History: Founded in 1727 by Maharaja Sawai Jai Singh II. Capital of Rajasthan.",
    picnic_spots: "🏛️ Amer Fort & Maota Lake\n🛕 Govind Dev Ji Temple (Sacred Krishna shrine), Birla Mandir & Moti Doongri Ganesh Temple\n🌿 Jawahar Circle & Patrika Gate\n🏞️ Jal Mahal Water Palace",
    transport_roadmap: "Road Map: Connected via NH-48. Transport: Jaipur Metro, low-floor buses, and JAI Airport.",
    hotels_booking: "🏨 Taj Rambagh Palace\n🏨 Trident Jaipur\n🏨 Zostel Jaipur",
    markets_food: "🛍️ Johari Bazaar, Bapu Bazaar.\n🍲 Dal Baati Churma, Pyaaz Kachori, Ghevar.",
    culture_helpline: "Culture: Rajputana folk arts. Helpline: Tourist Police: 0141-2530264 | SOS: 112"
  },
  "udaipur": {
    Name: "Udaipur - The Venice of the East",
    City: "Udaipur", State: "Rajasthan", Type: "🏰 City of Lakes",
    image_url: "https://images.unsplash.com/photo-1615836245337-f5b9b224c5dd?auto=format&fit=crop&w=1200&q=80",
    weather: "☀️ 27°C (Pleasant Breeze)", bestTime: "September to March",
    packing: "🧳 Casual cotton wear, evening wraps, camera, comfortable walking shoes.",
    budget: "💰 Est. Budget: ₹3,000 - ₹6,500 / day",
    history_geo_political: "History: Founded in 1559 by Maharana Udai Singh II. Surrounded by Aravalli hills.",
    picnic_spots: "🏛️ City Palace & Lake Pichola Boat Ride\n🛕 Jagdish Temple (17th Century architectural marvel) & Eklingji Temple (Ancient Lord Shiva temple complex)\n🌿 Saheliyon-ki-Bari Garden\n🏞️ Fateh Sagar Lake & Monsoon Palace",
    transport_roadmap: "Road Map: Connected via NH-27. Transport: Udaipur Railway Station & UDR Airport.",
    hotels_booking: "🏨 Taj Lake Palace\n🏨 The Oberoi Udaivilas\n🏨 Radisson Blu",
    markets_food: "🛍️ Hathi Pol Bazaar, Bapu Bazaar.\n🍲 Dal Baati Churma, Gatte ki Sabzi.",
    culture_helpline: "Culture: Mewari folk dance. Helpline: Police: 100 | SOS: 112"
  },
  "jaisalmer": {
    Name: "Jaisalmer - The Golden City",
    City: "Jaisalmer", State: "Rajasthan", Type: "🐪 Desert Fortress City",
    image_url: "https://images.unsplash.com/photo-1599661046289-e31897846e41?auto=format&fit=crop&w=1200&q=80",
    weather: "☀️ 30°C (Warm Desert Sun)", bestTime: "October to March",
    packing: "🧳 Light cottons for day, heavy woolens for cold desert nights, sunglasses.",
    budget: "💰 Est. Budget: ₹2,500 - ₹5,500 / day",
    history_geo_political: "History: Founded in 1156 by Rawal Jaisal. Located in heart of Thar Desert.",
    picnic_spots: "🏛️ Jaisalmer Golden Fort & Patwon Ki Haveli\n🛕 Tanot Mata Temple (Miraculous border shrine) & Ancient Jain Temples inside Jaisalmer Fort\n🌿 Sam Sand Dunes Desert Safari\n🏞️ Gadisar Lake & Sunset Point",
    transport_roadmap: "Road Map: Connected via NH-15. Transport: Jaisalmer Railway Station & Airport.",
    hotels_booking: "🏨 Suryagarh Jaisalmer\n🏨 Desert Tulip Hotel\n🏨 Heritage Camp Stays",
    markets_food: "🛍️ Sadar Bazaar, Bhatia Bazaar.\n🍲 Gatte ki Sabzi, Ker Sangri, Pyaaz Kachori.",
    culture_helpline: "Culture: Desert folk music. Helpline: Police: 100 | SOS: 112"
  },
  "jodhpur": {
    Name: "Jodhpur - The Blue City & Sun City",
    City: "Jodhpur", State: "Rajasthan", Type: "🏰 Blue Heritage Hub",
    image_url: "https://images.unsplash.com/photo-1599661046289-e31897846e41?auto=format&fit=crop&w=1200&q=80",
    weather: "☀️ 29°C (Sunny)", bestTime: "October to March",
    packing: "🧳 Comfortable clothing, sunglasses, hat, walking shoes.",
    budget: "💰 Est. Budget: ₹2,500 - ₹5,000 / day",
    history_geo_political: "History: Founded in 1459 by Rao Jodha. Famous for blue-painted houses.",
    picnic_spots: "🏛️ Mehrangarh Fort & Jaswant Thada\n🛕 Umaid Bhawan Palace & Achnath Mahadev Temple (Historic Shiva shrine)\n🌿 Mandore Gardens & Desert Rock Park\n🏞️ Balsamand Lake & Palace",
    transport_roadmap: "Road Map: Connected via NH-62. Transport: Jodhpur Junction & Airport (JDH).",
    hotels_booking: "🏨 Umaid Bhawan Palace\n🏨 RAAS Jodhpur\n🏨 Ajit Bhawan",
    markets_food: "🛍️ Nai Sarak, Clock Tower Market.\n🍲 Jodhpuri Mirchi Bada, Mawa Kachori.",
    culture_helpline: "Culture: Marwar traditions. Helpline: Police: 100 | SOS: 112"
  },
  "mount abu": {
    Name: "Mount Abu - Rajasthan's Only Hill Station",
    City: "Mount Abu", State: "Rajasthan", Type: "⛰️ Scenic Hill Station",
    image_url: "https://images.unsplash.com/photo-1601784551446-20c9e07cdbdb?auto=format&fit=crop&w=1200&q=80",
    weather: "🍃 20°C (Pleasant & Breezy)", bestTime: "July to February",
    packing: "🧳 Light woolens for evenings, comfortable walking shoes.",
    budget: "💰 Est. Budget: ₹2,000 - ₹4,500 / day",
    history_geo_political: "History: Ancient mythological history. Nestled in Aravalli hills with Nakki Lake.",
    picnic_spots: "🏛️ Dilwara Jain Temples (World-renowned white marble carvings)\n🛕 Adhar Devi Temple (Goddess Durga shrine carved inside mountain cave) & Rasiya Balam Temple\n🌿 Nakki Lake Boating & Sunset Point\n🏞️ Guru Shikhar Peak",
    transport_roadmap: "Road Map: Connected via NH-27. Transport: Abu Road Railway Station (28 km).",
    hotels_booking: "🏨 Hotel Hillock\n🏨 Cama Rajputana Club Resort\n🏨 Sunset Inn Resort",
    markets_food: "🛍️ Nakki Lake Market.\n🍲 Rajasthani Dal Baati, Rabdi.",
    culture_helpline: "Culture: Tribal heritage. Helpline: Police: 100 | SOS: 112"
  },
  "pushkar": {
    Name: "Pushkar - Sacred Brahma Temple Town",
    City: "Pushkar", State: "Rajasthan", Type: "🌸 Holy Oasis Town",
    image_url: "https://images.unsplash.com/photo-1599661046289-e31897846e41?auto=format&fit=crop&w=1200&q=80",
    weather: "☀️ 28°C (Sunny)", bestTime: "October to March",
    packing: "🧳 Modest ethnic wear, comfortable footwear (shoes removed at ghats).",
    budget: "💰 Est. Budget: ₹1,500 - ₹3,500 / day",
    history_geo_political: "History: One of the oldest cities in India. Famous for rare Lord Brahma Temple.",
    picnic_spots: "🛕 Jagatpita Brahma Temple (Only prominent temple dedicated to Lord Brahma) & Savitri Temple hilltop\n🏛️ Pushkar Lake & 52 Sacred Ghats Aarti\n🌿 Varaha Temple & Rangji Temple\n🏞️ Desert Camping Sites",
    transport_roadmap: "Road Map: Connected via Ajmer-Pushkar road. Transport: Ajmer Railway Station (15 km).",
    hotels_booking: "🏨 Ananta Spa & Resort\n🏨 Pushkar Bagh Resort\n🏨 Zostel Pushkar",
    markets_food: "🛍️ Main Market, Bazaars.\n🍲 Malpua, Falooda, Special Lassi, Poha.",
    culture_helpline: "Culture: Spiritual fairs & rituals. Helpline: Police: 100 | SOS: 112"
  },

  // --- UTTAR PRADESH ---
  "agra": {
    Name: "Agra - City of the Taj Mahal",
    City: "Agra", State: "Uttar Pradesh", Type: "🕌 World Heritage City",
    image_url: "https://images.unsplash.com/photo-1564507592333-c60657eea523?auto=format&fit=crop&w=1200&q=80",
    weather: "🌤️ 29°C (Clear Sky)", bestTime: "October to March",
    packing: "🧳 Light casual clothes, camera, comfortable walking shoes.",
    budget: "💰 Est. Budget: ₹2,500 - ₹5,500 / day",
    history_geo_political: "History: Capital of the Mughal Empire. Situated on the banks of the Yamuna River.",
    picnic_spots: "🏛️ Taj Mahal & Mehtab Bagh\n🏛️ Agra Fort & Jahangiri Mahal\n🛕 Mankameshwar Temple (Ancient Lord Shiva temple) & Balkeshwar Temple\n🌿 Taj Nature Walk",
    transport_roadmap: "Road Map: Connected via Yamuna Expressway & NH-19. Transport: Agra Cantt Station.",
    hotels_booking: "🏨 The Oberoi Amarvilas\n🏨 ITC Mughal\n🏨 Hotel Taj Resorts",
    markets_food: "🛍️ Sadar Bazaar, Kinari Bazaar.\n🍲 Agra Petha, Bedmi Puri, Mughlai Cuisine.",
    culture_helpline: "Culture: Mughal art & inlay. Helpline: Police: 100 | SOS: 112"
  },
  "varanasi": {
    Name: "Varanasi - The Spiritual Heart of India",
    City: "Varanasi", State: "Uttar Pradesh", Type: "🛕 Ancient Holy City",
    image_url: "https://images.unsplash.com/photo-1561359313-0639aad49ff6?auto=format&fit=crop&w=1200&q=80",
    weather: "🌡️ 30°C (Warm & Humid)", bestTime: "October to March",
    packing: "🧳 Modest ethnic clothing, comfortable footwear for ghats, scarf.",
    budget: "💰 Est. Budget: ₹2,000 - ₹4,500 / day",
    history_geo_political: "History: One of the oldest continuously inhabited cities. Situated on the bank of Ganges.",
    picnic_spots: "🛕 Kashi Vishwanath Temple (One of 12 sacred Jyotirlingas) & Annapurna Temple\n🏛️ Dashashwamedh Ghat & Ganga Aarti Boat Ride\n🌿 Sarnath Deer Park & Museum\n🏞️ Assi Ghat Sunrise Point",
    transport_roadmap: "Road Map: Connected via NH-19. Transport: Varanasi Junction & Airport.",
    hotels_booking: "🏨 BrijRama Palace\n🏨 Taj Ganges Varanasi\n🏨 Hotel Surya",
    markets_food: "🛍️ Vishwanath Gali, Thatheri Bazaar.\n🍲 Banarasi Paan, Kachori Jalebi, Malaiyyo.",
    culture_helpline: "Culture: Spirituality. Helpline: Police: 100 | SOS: 112"
  },
  "ayodhya": {
    Name: "Ayodhya - Birthplace of Lord Rama",
    City: "Ayodhya", State: "Uttar Pradesh", Type: "🛕 Sacred Ram Janmabhoomi",
    image_url: "https://images.unsplash.com/photo-1561359313-0639aad49ff6?auto=format&fit=crop&w=1200&q=80",
    weather: "⛅ 28°C (Peaceful)", bestTime: "October to March",
    packing: "🧳 Traditional modest clothing, comfortable shoes.",
    budget: "💰 Est. Budget: ₹1,800 - ₹4,000 / day",
    history_geo_political: "History: Ancient holy city on the banks of Saryu River, mentioned in the Ramayana.",
    picnic_spots: "🛕 Sri Ram Janmabhoomi Mandir (Magnificent newly built architectural marvel) & Hanumangarhi Temple\n🏛️ Kanak Bhawan & Treta Ke Thakur\n🌿 Saryu River Ghat Aarti & Lata Mangeshkar Chowk\n🏞️ Guptar Ghat",
    transport_roadmap: "Road Map: Connected via NH-27. Transport: Ayodhya Dham Junction & Valmiki Airport.",
    hotels_booking: "🏨 Ramada by Wyndham Ayodhya\n🏨 Hotel Krishna Palace\n🏨 Taraji Resort",
    markets_food: "🛍️ Ram Path Market, Chowk Bazaar.\n🍲 Awadhi Thali, Rabri Jalebi, Chaat.",
    culture_helpline: "Culture: Sanatan Vedic heritage. Helpline: Police: 100 | SOS: 112"
  },
  "mathura": {
    Name: "Mathura - Birthplace of Lord Krishna",
    City: "Mathura", State: "Uttar Pradesh", Type: "🛕 Divine Braj Bhumi",
    image_url: "https://images.unsplash.com/photo-1561359313-0639aad49ff6?auto=format&fit=crop&w=1200&q=80",
    weather: "☀️ 29°C (Sunny)", bestTime: "October to March",
    packing: "🧳 Traditional Indian wear, comfortable walking shoes.",
    budget: "💰 Est. Budget: ₹1,500 - ₹3,500 / day",
    history_geo_political: "History: Sacred Hindu pilgrimage city where Lord Krishna was born.",
    picnic_spots: "🛕 Shri Krishna Janmabhoomi Temple (Garbhgriha shrine) & Dwarkadhish Temple\n🏛️ Vishram Ghat Yamuna Boat Ride\n🌿 Gita Mandir & Kans Quila\n🏞️ Govardhan Hill Parikrama",
    transport_roadmap: "Road Map: Connected via NH-19. Transport: Mathura Junction.",
    hotels_booking: "🏨 Brijwasi Royal Hotel\n🏨 Hotel Goverdhan Palace\n🏨 Nidhivan Hotel",
    markets_food: "🛍️ Holi Gate Bazaar, Chatta Bazaar.\n🍲 Mathura Peda, Bedmi Puri, Lassi.",
    culture_helpline: "Culture: Braj folk culture. Helpline: Police: 100 | SOS: 112"
  },
  "vrindavan": {
    Name: "Vrindavan - City of Temples & Leelas",
    City: "Vrindavan", State: "Uttar Pradesh", Type: "🌸 Divine Spiritual Town",
    image_url: "https://images.unsplash.com/photo-1561359313-0639aad49ff6?auto=format&fit=crop&w=1200&q=80",
    weather: "☀️ 29°C (Sunny)", bestTime: "October to March",
    packing: "🧳 Traditional clothes, light shawl for evening breeze.",
    budget: "💰 Est. Budget: ₹1,500 - ₹3,500 / day",
    history_geo_political: "History: Major pilgrimage town associated with Lord Krishna's childhood pastimes.",
    picnic_spots: "🛕 Banke Bihari Temple (Famous deity shrine), ISKCON Temple & Prem Mandir\n🏛️ Nidhivan Sacred Forest & Seva Kunj\n🌿 Kesi Ghat Yamuna Aarti\n🏞️ Radha Raman Temple",
    transport_roadmap: "Road Map: Connected via NH-19. Transport: Mathura Junction (12 km).",
    hotels_booking: "🏨 Nidhivan Sarovar Portico\n🏨 MVT Guesthouse\n🏨 Hotel Ananda",
    markets_food: "🛍️ Loi Bazaar, Banke Bihari Street.\n🍲 Pedas, Rabri, Kachori, Thandai.",
    culture_helpline: "Culture: Bhakti movement hub. Helpline: Police: 100 | SOS: 112"
  },

  // --- UTTARAKHAND ---
  "haridwar": {
    Name: "Haridwar - Gateway to the Gods",
    City: "Haridwar", State: "Uttarakhand", Type: "🌊 Sacred Pilgrimage City",
    image_url: "https://images.unsplash.com/photo-1561359313-0639aad49ff6?auto=format&fit=crop&w=1200&q=80",
    weather: "⛅ 24°C (Cool & Fresh)", bestTime: "October to April",
    packing: "🧳 Modest clothing, comfortable walking shoes for ghats.",
    budget: "💰 Est. Budget: ₹1,500 - ₹3,500 / day",
    history_geo_political: "History: One of the seven holiest places in Hinduism where Ganges exits Himalayas.",
    picnic_spots: "🏛️ Har Ki Pauri Ganga Aarti Ghat\n🛕 Mansa Devi Temple & Chandi Devi Temple (Hilltop ropeway shrines)\n🌿 Shantikunj Ashram & Daksh Mahadev Temple\n🏞️ Rajaji National Park Safari",
    transport_roadmap: "Road Map: Connected via NH-334. Transport: Haridwar Junction & Jolly Grant Airport.",
    hotels_booking: "🏨 Hotel Ganga Lahari\n🏨 Radisson Blu Haridwar\n🏨 Amatra Ganges",
    markets_food: "🛍️ Moti Bazar, Bara Bazar.\n🍲 Chole Bhature, Aloo Puri, Rabri Malai.",
    culture_helpline: "Culture: Vedic rituals. Helpline: Police: 100 | SOS: 112"
  },
  "rishikesh": {
    Name: "Rishikesh - Yoga Capital of the World",
    City: "Rishikesh", State: "Uttarakhand", Type: "🧘 Spiritual & Adventure Hub",
    image_url: "https://images.unsplash.com/photo-1561359313-0639aad49ff6?auto=format&fit=crop&w=1200&q=80",
    weather: "🌿 25°C (Serene & Pleasant)", bestTime: "September to April",
    packing: "🧳 Comfortable yoga wear, modest clothes, river sandals.",
    budget: "💰 Est. Budget: ₹2,000 - ₹4,500 / day",
    history_geo_political: "History: Ancient sanctuary for sages. Situated where Ganges flows from the Himalayas.",
    picnic_spots: "🏛️ Triveni Ghat Ganga Aarti\n🛕 Parmarth Niketan, Beatles Ashram & Neelkanth Mahadev Temple (Nearby forest shrine)\n🌿 Ram Jhula & Lakshman Jhula Bridges\n🏞️ Shivpuri River Rafting Camps",
    transport_roadmap: "Road Map: Connected via NH-7. Transport: Rishikesh Station & Dehradun Airport.",
    hotels_booking: "🏨 Ananda in the Himalayas\n🏨 Aloha On The Ganges\n🏨 Zostel Rishikesh",
    markets_food: "🛍️ Lakshman Jhula Market, Swarg Ashram.\n🍲 Ayurvedic Sattvic Thali, Organic Cafes.",
    culture_helpline: "Culture: Spirituality. Helpline: Police: 100 | SOS: 112"
  },

  // --- HIMACHAL PRADESH ---
  "shimla": {
    Name: "Shimla - Queen of Hill Stations",
    City: "Shimla", State: "Himachal Pradesh", Type: "❄️ Himalayan Hill Station",
    image_url: "https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?auto=format&fit=crop&w=1200&q=80",
    weather: "❄️ 15°C (Chilly & Clear)", bestTime: "March to June & December",
    packing: "🧳 Woolens, heavy jacket for night, comfortable walking shoes.",
    budget: "💰 Est. Budget: ₹2,500 - ₹5,500 / day",
    history_geo_political: "History: Former summer capital of British India. Nestled in lower Himalayan ranges.",
    picnic_spots: "🏛️ The Ridge & Viceregal Lodge\n🛕 Jakhoo Temple (Famous hilltop shrine with massive Hanuman statue) & Tara Devi Temple\n🌿 Mall Road & Kufri Snow Valley\n🏞️ Christ Church",
    transport_roadmap: "Road Map: Connected via NH-5. Transport: Kalka-Shimla Toy Train.",
    hotels_booking: "🏨 The Oberoi Cecil\n🏨 Clarkes Hotel\n🏨 Hotel Combermere",
    markets_food: "🛍️ Mall Road Shopping Center, Lakkar Bazaar.\n🍲 Madra, Siddu, Himachali Thali.",
    culture_helpline: "Culture: Pahari tradition. Helpline: Police: 100 | SOS: 112"
  },
  "manali": {
    Name: "Manali - Valley of the Gods",
    City: "Manali", State: "Himachal Pradesh", Type: "🏔️ Adventure & Snow Hub",
    image_url: "https://images.unsplash.com/photo-1605648916361-9bc12ad6a563?auto=format&fit=crop&w=1200&q=80",
    weather: "🌨️ 12°C (Cold Mountain Air)", bestTime: "October to June",
    packing: "🧳 Heavy woolens, thermals, gloves, snow boots.",
    budget: "💰 Est. Budget: ₹2,500 - ₹6,000 / day",
    history_geo_political: "History: Ancient trade route town situated in Beas River valley.",
    picnic_spots: "🏛️ Naggar Castle & Old Manali Village\n🛕 Hadimba Temple (Sacred wooden pagoda shrine nestled in dense deodar forest) & Vashisht Hot Springs\n🌿 Solang Valley & Rohtang Pass\n🏞️ Atal Tunnel",
    transport_roadmap: "Road Map: Connected via NH-3. Transport: Bhuntar Airport (50 km).",
    hotels_booking: "🏨 The Span Resort & Spa\n🏨 Manu All Seasons\n🏨 Zostel Manali",
    markets_food: "🛍️ Mall Road Manali, Tibetan Market.\n🍲 Trout Fish, Dham, Hot Maggi.",
    culture_helpline: "Culture: Himalayan culture. Helpline: Police: 100 | SOS: 112"
  },

  // --- JAMMU & KASHMIR ---
  "katra": {
    Name: "Katra - Base Camp of Vaishno Devi",
    City: "Katra", State: "Jammu and Kashmir", Type: "🛕 Sacred Yatra Town",
    image_url: "https://images.unsplash.com/photo-1595815771614-ade9d652a65d?auto=format&fit=crop&w=1200&q=80",
    weather: "☀️ 26°C (Pleasant)", bestTime: "Year-round",
    packing: "🧳 Comfortable trek shoes, track pants, light woolens for Trikuta hills.",
    budget: "💰 Est. Budget: ₹1,500 - ₹3,500 / day",
    history_geo_political: "History: Foothill town of Trikuta mountains serving as gateway to Mata Vaishno Devi Shrine.",
    picnic_spots: "🛕 Mata Vaishno Devi Bhavan Cave Shrine (Sacred manifestation of Goddess Mahalakshmi, Mahakali & Saraswati)\n🏛️ Bhairon Temple & Adhkund\n🌿 Sanji Chhat Helipad\n🏞️ Baba Dhansar Waterfall",
    transport_roadmap: "Road Map: Connected via NH-44. Transport: SVDK Katra Railway Station.",
    hotels_booking: "🏨 Vivanta Katra - Vaishno Devi\n🏨 Lemon Tree Hotel Katra\n🏨 Hotel Shree Mata",
    markets_food: "🛍️ Main Bazaar Katra, Jammu Road.\n🍲 Rajma Chawal, Kalari Cheese, Prasad Dry Sweets.",
    culture_helpline: "Culture: Dogra devotion. Helpline: Police: 100 | SOS: 112"
  },

  // --- PUNJAB ---
  "amritsar": {
    Name: "Amritsar - City of the Golden Temple",
    City: "Amritsar", State: "Punjab", Type: "🛕 Sikh Spiritual Capital",
    image_url: "https://images.unsplash.com/photo-1514222134-b57cbb8ce073?auto=format&fit=crop&w=1200&q=80",
    weather: "☀️ 27°C (Clear)", bestTime: "October to March",
    packing: "🧳 Head scarves/dupattas (mandatory for Golden Temple), modest clothing.",
    budget: "💰 Est. Budget: ₹2,000 - ₹4,000 / day",
    history_geo_political: "History: Founded in 1577 by Guru Ram Das Ji. Known for Sikh history and patriotism.",
    picnic_spots: "🛕 Sri Harmandir Sahib (Golden Temple - Holiest Sikh Shrine open to all faiths) & Jallianwala Bagh\n🏛️ Partition Museum & Gobindgarh Fort\n🌿 Wagah Border Beating Retreat Ceremony\n🏞️ Durgiana Temple (Historic silver temple dedicated to Goddess Durga)",
    transport_roadmap: "Road Map: Connected via Grand Trunk Road. Transport: Amritsar Station & ATQ Airport.",
    hotels_booking: "🏨 Taj Swarna Amritsar\n🏨 Hyatt Amritsar\n🏨 Hotel City Park",
    markets_food: "🛍️ Hall Bazaar, Katra Jaimal Singh.\n🍲 Amritsari Kulcha, Lassi, Makki di Roti.",
    culture_helpline: "Culture: Punjabi hospitality. Helpline: Police: 100 | SOS: 112"
  },

  // --- MAHARASHTRA ---
  "mumbai": {
    Name: "Mumbai - The City of Dreams",
    City: "Mumbai", State: "Maharashtra", Type: "🌊 Financial Capital",
    image_url: "https://images.unsplash.com/photo-1570168007204-dfb528c6958f?auto=format&fit=crop&w=1200&q=80",
    weather: "🌊 31°C (Tropical & Humid)", bestTime: "November to February",
    packing: "🧳 Light cotton clothes, sunglasses, umbrella.",
    budget: "💰 Est. Budget: ₹3,500 - ₹7,000 / day",
    history_geo_political: "History: Major port city on Konkan coast. Financial & entertainment capital of India.",
    picnic_spots: "🏛️ Gateway of India & Elephanta Caves\n🛕 Siddhivinayak Temple (Revered 200-year-old Ganesha shrine), Mumbadevi Temple & Babulnath Temple\n🌿 Marine Drive, Hanging Gardens, Juhu Beach\n🏞️ Bandra-Worli Sea Link",
    transport_roadmap: "Road Map: Western/Central Express Highways. Transport: CSMIA Airport & Trains.",
    hotels_booking: "🏨 The Taj Mahal Palace\n🏨 Trident Nariman Point\n🏨 Hotel Sea Princess",
    markets_food: "🛍️ Colaba Causeway, Crawford Market.\n🍲 Vada Pav, Pav Bhaji, Bombay Duck.",
    culture_helpline: "Culture: Bollywood & Marathi culture. Helpline: Police: 100 | SOS: 112"
  },
  "pune": {
    Name: "Pune - Oxford of the East & Cultural Capital",
    City: "Pune", State: "Maharashtra", Type: "🏰 Maratha Heritage City",
    image_url: "https://images.unsplash.com/photo-1570168007204-dfb528c6958f?auto=format&fit=crop&w=1200&q=80",
    weather: "☀️ 28°C (Pleasant)", bestTime: "July to February",
    packing: "🧳 Casual cottons, light sweater for evenings.",
    budget: "💰 Est. Budget: ₹2,500 - ₹5,000 / day",
    history_geo_political: "History: Former base of the Maratha Empire under Chhatrapati Shivaji Maharaj.",
    picnic_spots: "🏛️ Shaniwar Wada & Aga Khan Palace\n🛕 Dagdusheth Halwai Ganpati Temple & Pataleshwar Cave Temple (8th-century rock-cut Shiva temple)\n🌿 Sinhagad Fort & Panshet Dam\n🏞️ Osho Ashram",
    transport_roadmap: "Road Map: Connected via Mumbai-Pune Expressway. Transport: Pune Junction & Airport.",
    hotels_booking: "🏨 JW Marriott Pune\n🏨 The Corinthians Resort\n🏨 Conrad Pune",
    markets_food: "🛍️ FC Road, Tulshibaug Market.\n🍲 Puneri Misal Pav, Bakarwadi, Mastani.",
    culture_helpline: "Culture: Maratha martial history. Helpline: Police: 100 | SOS: 112"
  },

  // --- KARNATAKA ---
  "mysuru": {
    Name: "Mysuru - The Heritage City",
    City: "Mysuru", State: "Karnataka", Type: "🏛️ Royal Palace City",
    image_url: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80",
    weather: "🌤️ 26°C (Breezy)", bestTime: "October to March",
    packing: "🧳 Comfortable clothing, walking shoes for palace tours.",
    budget: "💰 Est. Budget: ₹2,000 - ₹4,500 / day",
    history_geo_political: "History: Capital of Wodeyar dynasty. Famous for grand Dasara festivals and palaces.",
    picnic_spots: "🏛️ Mysore Palace\n🛕 Chamundeshwari Temple (Sacred hilltop shrine dedicated to Goddess Durga) & Nandi Bull Statue\n🌿 Brindavan Gardens & Karanji Lake\n🏞️ Ranganathittu Bird Sanctuary",
    transport_roadmap: "Road Map: Connected via NH-275. Transport: Mysore Junction & Mysore Airport.",
    hotels_booking: "🏨 Lalitha Mahal Palace\n🏨 Radisson Blu Plaza\n🏨 Hotel Roopa",
    markets_food: "🛍️ Devaraja Market, Mysore Silk Emporium.\n🍲 Mysore Pak, Bisi Bele Bath, Masala Dosa.",
    culture_helpline: "Culture: Karnataka heritage. Helpline: Police: 100 | SOS: 112"
  },
  "hampi": {
    Name: "Hampi - Ruins of the Vijayanagara Empire",
    City: "Hampi", State: "Karnataka", Type: "🏛️ UNESCO World Heritage Ruins",
    image_url: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80",
    weather: "☀️ 33°C (Warm & Sunny)", bestTime: "October to February",
    packing: "🧳 Light cottons, hat, sunglasses, sturdy walking shoes for boulder climbing.",
    budget: "💰 Est. Budget: ₹1,800 - ₹4,000 / day",
    history_geo_political: "History: Capital of the 14th-century Vijayanagara Empire.",
    picnic_spots: "🏛️ Virupaksha Temple (Towering ancient architectural sanctuary still active in worship) & Vittula Temple\n🛕 Lotus Mahal & Elephant Stables\n🌿 Matanga Hill Sunrise Point & Sanapur Lake\n🏞️ Tungabhadra River Bank",
    transport_roadmap: "Road Map: Connected via NH-50. Transport: Hospet Junction Railway Station (13 km).",
    hotels_booking: "🏨 Evolve Back Hampi\n🏨 Heritage Resort Hampi\n🏨 Gopi Guest House",
    markets_food: "🛍️ Hampi Bazaar Street.\n🍲 South Indian Thali, Banana Leaf Meals, Mango Juice.",
    culture_helpline: "Culture: Vijayanagara architectural glory. Helpline: Police: 100 | SOS: 112"
  },

  // --- KERALA ---
  "kochi": {
    Name: "Kochi (Cochin) - Queen of the Arabian Sea",
    City: "Kochi", State: "Kerala", Type: "🌴 Coastal Heritage Port",
    image_url: "https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?auto=format&fit=crop&w=1200&q=80",
    weather: "🌴 30°C (Tropical Coastal)", bestTime: "October to March",
    packing: "🧳 Light cotton clothing, sunscreen, sunglasses, umbrella.",
    budget: "💰 Est. Budget: ₹2,500 - ₹5,500 / day",
    history_geo_political: "History: Ancient spice trading port influenced by Portuguese, Dutch, and British.",
    picnic_spots: "🏛️ Fort Kochi Chinese Fishing Nets & Mattancherry Palace\n🛕 Paradesi Synagogue, St. Francis Church & Ernakulam Shiva Temple (Centuries-old regional shrine)\n🌿 Marine Drive Kochi & Cherai Beach\n🏞️ Kerala Kathakali Center",
    transport_roadmap: "Road Map: Connected via NH-66. Transport: Cochin International Airport (COK) & Metro.",
    hotels_booking: "🏨 Taj Malabar Resort & Spa\n🏨 Brunton Boatyard\n🏨 Zostel Kochi",
    markets_food: "🛍️ Jew Town Antique Market, Broadway Bazaar.\n🍲 Kerala Fish Curry, Appam with Stew, Karimeen Pollichathu.",
    culture_helpline: "Culture: Multicultural maritime history. Helpline: Tourist Police: 0484-2666579 | SOS: 112"
  },

  // --- TAMIL NADU ---
  "chennai": {
    Name: "Chennai - Gateway to South India",
    City: "Chennai", State: "Tamil Nadu", Type: "🏛️ Cultural & Coastal Capital",
    image_url: "https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&w=1200&q=80",
    weather: "🌴 32°C (Warm & Coastal)", bestTime: "November to February",
    packing: "🧳 Light cotton clothes, sunglasses, sun hat, comfortable sandals.",
    budget: "💰 Est. Budget: ₹2,500 - ₹5,500 / day",
    history_geo_political: "History: Formerly Madras. Established by East India Company in 1639.",
    picnic_spots: "🏛️ Fort St. George Museum & San Thome Basilica\n🛕 Kapaleeshwarar Temple (Mylapore - Magnificent 7th-century Pallava architectural shrine) & Parthasarathy Temple\n🌿 Marina Beach & Elliot's Beach\n🏞️ Mahabalipuram Shore Temples",
    transport_roadmap: "Road Map: Connected via NH-48. Transport: Chennai Airport (MAA) & Metro.",
    hotels_booking: "🏨 Taj Coromandel Chennai\n🏨 ITC Grand Chola\n🏨 Zostel Chennai",
    markets_food: "🛍️ T. Nagar Pondy Bazaar, Ranganathan Street.\n🍲 Chettinad Meals, Filter Coffee, Idli Sambar.",
    culture_helpline: "Culture: Classical music & dance. Helpline: Police: 100 | SOS: 112"
  },
  "madurai": {
    Name: "Madurai - Athens of the East",
    City: "Madurai", State: "Tamil Nadu", Type: "🛕 Ancient Temple City",
    image_url: "https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&w=1200&q=80",
    weather: "☀️ 33°C (Warm)", bestTime: "October to March",
    packing: "🧳 Modest ethnic clothing, comfortable slip-on footwear for temple visits.",
    budget: "💰 Est. Budget: ₹1,800 - ₹4,000 / day",
    history_geo_political: "History: Over 2,500 years old. Capital of ancient Pandya kings.",
    picnic_spots: "🛕 Arulmigu Meenakshi Amman Temple (World-famous architectural marvel featuring towering gopurams and thousand-pillared hall)\n🏛️ Thirumalai Nayakkar Palace & Gandhi Memorial Museum\n🌿 Vandiyur Marippulam Teppakulam Tank\n🏞️ Alagar Kovil Temple",
    transport_roadmap: "Road Map: Connected via NH-38. Transport: Madurai Junction & IXM Airport.",
    hotels_booking: "🏨 Heritage Madurai\n🏨 The Gateway Hotel Pasumalai\n🏨 Hotel Royal Court",
    markets_food: "🛍️ Puthu Mandapam Market, Avani Moola Street.\n🍲 Madurai Jigarthanda, Paruthi Paal, Kothu Parotta.",
    culture_helpline: "Culture: Tamil Sangam heritage. Helpline: Police: 100 | SOS: 112"
  },
  "rameswaram": {
    Name: "Rameswaram - Sacred Island & Temple Town",
    City: "Rameswaram", State: "Tamil Nadu", Type: "🛕 Holy Island Pilgrimage",
    image_url: "https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&w=1200&q=80",
    weather: "☀️ 31°C (Coastal Breeze)", bestTime: "October to April",
    packing: "🧳 Traditional modest clothing, extra change of clothes for holy theertham baths.",
    budget: "💰 Est. Budget: ₹1,800 - ₹4,000 / day",
    history_geo_political: "History: Sacred island town connected to mainland by Pamban Bridge.",
    picnic_spots: "🛕 Ramanathaswamy Temple (Famous for the world's longest pillared corridor and 22 sacred holy theertham wells)\n🏛️ Pamban Rail Bridge & Dr. A.P.J. Abdul Kalam Memorial\n🌿 Dhanushkodi Beach (Land's End)\n🏞️ Agnitheertham Sea Bath",
    transport_roadmap: "Road Map: Connected via NH-87. Transport: Rameswaram Railway Station.",
    hotels_booking: "🏨 Daiwik Hotels Rameswaram\n🏨 Hotel Rameshwaram Grand\n🏨 Hotel Pearl Residency",
    markets_food: "🛍️ Temple Car Street Bazaar.\n🍲 South Indian Meals, Fresh Seafood.",
    culture_helpline: "Culture: Epical heritage. Helpline: Police: 100 | SOS: 112"
  },

  // --- ANDHRA PRADESH & TELANGANA ---
  "hyderabad": {
    Name: "Hyderabad - The City of Pearls",
    City: "Hyderabad", State: "Telangana", Type: "🕌 Historic Tech Hub",
    image_url: "https://images.unsplash.com/photo-1588416936002-3163fc68997b?auto=format&fit=crop&w=1200&q=80",
    weather: "☀️ 28°C (Pleasant)", bestTime: "October to March",
    packing: "🧳 Comfortable casual clothes, walking shoes.",
    budget: "💰 Est. Budget: ₹2,500 - ₹5,500 / day",
    history_geo_political: "History: Ruled by Qutb Shahis and Nizams. Famous blend of history and modern IT industry.",
    picnic_spots: "🏛️ Charminar, Golconda Fort, Chowmahalla Palace\n🛕 Birla Mandir (Exquisite white marble Venkateswara shrine) & Chilkur Balaji Temple (Visa Balaji Temple)\n🌿 Hussain Sagar Lake & Lumbini Park\n🏞️ Ramoji Film City",
    transport_roadmap: "Road Map: NH-44 connectivity. Transport: RGIA Airport (HYD) & Metro.",
    hotels_booking: "🏨 Taj Falaknuma Palace\n🏨 ITC Kakatiya\n🏨 Green Park Hotel",
    markets_food: "🛍️ Laad Bazaar, Sultan Bazaar.\n🍲 Hyderabadi Dum Biryani, Irani Chai, Haleem.",
    culture_helpline: "Culture: Deccani tehzeeb. Helpline: Police: 100 | SOS: 112"
  },
  "tirupati": {
    Name: "Tirupati - Abode of Lord Venkateswara",
    City: "Tirupati", State: "Andhra Pradesh", Type: "🛕 Richest Spiritual Shrine",
    image_url: "https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&w=1200&q=80",
    weather: "☀️ 32°C (Warm)", bestTime: "September to March",
    packing: "🧳 Traditional Indian attire (Dhoti/Kurta for men, Saree/Salwar for women).",
    budget: "💰 Est. Budget: ₹2,000 - ₹4,500 / day",
    history_geo_political: "History: World-renowned temple town nestled in the Seshachalam Hills.",
    picnic_spots: "🛕 Sri Venkateswara Swami Temple (Tirumala Hills - The supreme and richest pilgrimage shrine in the world)\n🏛️ Govindaraja Swamy Temple & Alamelu Mangapuram (Tiruchanur)\n🌿 Sri Venkateswara Zoological Park & Silathoranam (Natural rock arch)\n🏞️ Akasaganga Waterfalls",
    transport_roadmap: "Road Map: Connected via NH-716. Transport: Tirupati Main Station & TIR Airport.",
    hotels_booking: "🏨 Fortune Select Grand Ridge\n🏨 Marasa Sarovar Premiere\n🏨 Hotel Bliss",
    markets_food: "🛍️ Tirumala Bazaar, Municipal Market.\n🍲 World famous Tirupati Laddu Prasadam, Andhra Meals.",
    culture_helpline: "Culture: Ancient Hindu devotional heritage. Helpline: Police: 100 | SOS: 112"
  },

  // --- ODISHA & WEST BENGAL ---
  "puri": {
    Name: "Puri - Sacred Jagannath Dham & Beach",
    City: "Puri", State: "Odisha", Type: "🛕 Holy Coastal Dham",
    image_url: "https://images.unsplash.com/photo-1561359313-0639aad49ff6?auto=format&fit=crop&w=1200&q=80",
    weather: "🌴 31°C (Coastal & Warm)", bestTime: "July to March",
    packing: "🧳 Traditional Indian wear, cotton clothes, beachwear.",
    budget: "💰 Est. Budget: ₹1,800 - ₹4,000 / day",
    history_geo_political: "History: One of the four Char Dhams in Hinduism. Renowned for Lord Jagannath Temple.",
    picnic_spots: "🛕 Sri Jagannath Temple (Famous 12th-century Char Dham shrine renowned for Rath Yatra) & Gundicha Temple\n🏛️ Puri Beach & Swargadwar Beach\n🌿 Konark Sun Temple (UNESCO World Heritage architectural chariot - 35 km)\n🏞️ Chilika Lake Dolphin Sanctuary",
    transport_roadmap: "Road Map: Connected via NH-316. Transport: Puri Station & Bhubaneswar Airport (60 km).",
    hotels_booking: "🏨 Mayfair Heritage Puri\n🏨 Sterling Puri\n🏨 Hotel Golden Dust",
    markets_food: "🛍️ Grand Road (Bada Danda) Market, Sea Beach Stalls.\n🍲 Mahaprasad, Dalma, Chhena Poda, Khaja.",
    culture_helpline: "Culture: Odia religious heritage. Helpline: Police: 100 | SOS: 112"
  },
  "kolkata": {
    Name: "Kolkata - The City of Joy",
    City: "Kolkata", State: "West Bengal", Type: "🎨 Cultural Capital",
    image_url: "https://images.unsplash.com/photo-1558431382-27e303142255?auto=format&fit=crop&w=1200&q=80",
    weather: "⛅ 29°C (Humid)", bestTime: "October to March",
    packing: "🧳 Comfortable casuals, cotton clothing, umbrella.",
    budget: "💰 Est. Budget: ₹2,500 - ₹5,500 / day",
    history_geo_political: "History: Capital during British Raj, renowned for literature, art, and history.",
    picnic_spots: "🏛️ Victoria Memorial & Howrah Bridge\n🛕 Dakshineswar Kali Temple (Revered spiritual temple built by Rani Rashmoni) & Kalighat Kali Temple (Prominent Shakti Peeth)\n🌿 Eco Park, Maidan, Princep Ghat\n🏞️ Indian Museum",
    transport_roadmap: "Road Map: NH-12 connectivity. Transport: Netaji Subhash Chandra Bose Airport (CCU) & Metro.",
    hotels_booking: "🏨 The Oberoi Grand\n🏨 ITC Sonar\n🏨 The Peerless Inn",
    markets_food: "🛍️ New Market, Gariahat Market.\n🍲 Rosogolla, Mishti Doi, Kathi Roll, Biryani.",
    culture_helpline: "Culture: Bengali literature. Helpline: Police: 100 | SOS: 112"
  },

  // --- ASSAM ---
  "guwahati": {
    Name: "Guwahati - Gateway to North-East India",
    City: "Guwahati", State: "Assam", Type: "🌊 Gateway Temple City",
    image_url: "https://images.unsplash.com/photo-1558431382-27e303142255?auto=format&fit=crop&w=1200&q=80",
    weather: "☀️ 30°C (Humid & Warm)", bestTime: "October to April",
    packing: "🧳 Light cotton clothing, umbrella, comfortable walking shoes.",
    budget: "💰 Est. Budget: ₹2,000 - ₹4,500 / day",
    history_geo_political: "History: Ancient city of Pragjyotishpura situated on the banks of the Brahmaputra.",
    picnic_spots: "🛕 Kamakhya Temple (One of the oldest and most revered Shakti Peeth shrines atop Nilachal Hills) & Umananda Temple\n🏛️ Assam State Zoo & Botanical Garden\n🌿 Basistha Ashram\n🏞️ Pobitora Wildlife Sanctuary (40 km)",
    transport_roadmap: "Road Map: Connected via NH-27. Transport: Guwahati Station & LGBI Airport (GAU).",
    hotels_booking: "🏨 Radisson Blu Hotel Guwahati\n🏨 Vivanta Guwahati\n🏨 Hotel Brahmaputra Ashok",
    markets_food: "🛍️ Fancy Bazaar, Paltan Bazaar.\n🍲 Assamese Thali, Masor Tenga, Kamrupi Pitha.",
    culture_helpline: "Culture: Assamese traditions. Helpline: Police: 100 | SOS: 112"
  },  // --- UTTARAKHAND CHAR DHAM & SACRED SHRINES ---
  "kedarnath": {
    Name: "Kedarnath - Sacred Abode of Lord Shiva",
    City: "Kedarnath", State: "Uttarakhand", Type: "🏔️ Jyotirlinga & Char Dham",
    image_url: "https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?auto=format&fit=crop&w=1200&q=80",
    weather: "❄️ 02°C to 12°C (Very Cold)", bestTime: "May to June & September to October",
    packing: "🧳 Heavy woolens, thermal innerwear, heavy jacket, trekking shoes, rain gear, walking stick, medicines.",
    budget: "💰 Est. Budget: ₹3,000 - ₹6,000 / day",
    history_geo_political: "History: One of the 12 Jyotirlingas of Lord Shiva and part of Uttarakhand Char Dham. Situated near Mandakini river in Himalayas.",
    picnic_spots: "🛕 Kedarnath Main Temple (Ancient stone structure built by Adi Shankaracharya)\n🏛️ Bhairavnath Temple (Guardian deity shrine)\n🌿 Gandhi Saragarh Lake (Trek from temple)\n🏞️ Chorabari Glacier Viewpoint",
    transport_roadmap: "Road Map: Accessible via Gaurikund trek (16 km trek from Gaurikund). Transport: Jolly Grant Airport Dehradun & Rishikesh Station.",
    hotels_booking: "🏨 GMVN Tourist Rest House Kedarnath\n🏨 Kedar Camp Resorts\n🏨 Private Lodges & Tents at Kedarnath Base",
    markets_food: "🛍️ Kedarnath Base Market Stalls.\n🍲 Hot Khichdi, Tea, Simple Sattvic Vegetarian Food.",
    culture_helpline: "Culture: Himalayan spiritual heritage. Helpline: Police: 100 | Disaster Helpline: 1070 | SOS: 112"
  },
  "badrinath": {
    Name: "Badrinath - Sacred Abode of Lord Vishnu",
    City: "Badrinath", State: "Uttarakhand", Type: "🛕 Holy Char Dham Shrine",
    image_url: "https://images.unsplash.com/photo-1561359313-0639aad49ff6?auto=format&fit=crop&w=1200&q=80",
    weather: "⛅ 08°C to 18°C (Chilly)", bestTime: "May to June & September to November",
    packing: "🧳 Heavy woolens, windproof jacket, comfortable trekking shoes, moisturizer.",
    budget: "💰 Est. Budget: ₹2,500 - ₹5,500 / day",
    history_geo_political: "History: Prominent Char Dham pilgrimage site located along Alaknanda River, dedicated to Lord Badrinarayan.",
    picnic_spots: "🛕 Badrinath Temple (Sacred black stone deity shrine)\n🏛️ Tapt Kund (Natural thermal sulfur spring)\n🌿 Mana Village (Last village of India) & Vyas Gufa\n🏞️ Vasudhara Falls (Trek from Mana)",
    transport_roadmap: "Road Map: Connected via NH-7 motorable road right up to the temple town. Transport: Haridwar/Rishikesh bus and cab services.",
    hotels_booking: "🏨 GMVN Badrinath Dham\n🏨 Hotel Sarovar Portico\n🏨 Hotel Narayan Palace",
    markets_food: "🛍️ Badrinath Market Bazaar.\n🍲 North Indian Thali, Prasad Sweets, Hot Tea.",
    culture_helpline: "Culture: Vedic traditions. Helpline: Police: 100 | SOS: 112"
  },
  "gangotri": {
    Name: "Gangotri - Origin of River Ganges",
    City: "Gangotri", State: "Uttarakhand", Type: "🌊 Sacred River Origin Dham",
    image_url: "https://images.unsplash.com/photo-1561359313-0639aad49ff6?auto=format&fit=crop&w=1200&q=80",
    weather: "❄️ 05°C to 15°C (Cold Mountain Weather)", bestTime: "May to June & September to October",
    packing: "🧳 Woolens, thermal wear, sturdy walking shoes, raincoat.",
    budget: "💰 Est. Budget: ₹2,000 - ₹4,500 / day",
    history_geo_political: "History: Origin point of the holy river Bhagirathi (Ganges). Part of the sacred Char Dham Yatra.",
    picnic_spots: "🛕 Gangotri Temple (Dedicated to Goddess Ganga where King Bhagirath prayed)\n🏛️ Bhagirath Shila (Sacred rock)\n🌿 Subandhu & Pandava Cave\n🏞️ Gaumukh Glacier Trek (18 km trek from Gangotri)",
    transport_roadmap: "Road Map: Connected via NH-34 from Rishikesh/Dehradun. Transport: Dehradun Jolly Grant Airport.",
    hotels_booking: "🏨 GMVN Gangotri Rest House\n🏨 Hotel Himalayan Heritage\n🏨 Local Pilgrim Lodges",
    markets_food: "🛍️ Gangotri Dham Market.\n🍲 Pure Vegetarian Sattvic Food, Local Pahari Dal.",
    culture_helpline: "Culture: Ganga river worship traditions. Helpline: Police: 100 | SOS: 112"
  },
  "yamunotri": {
    Name: "Yamunotri - Origin of River Yamuna",
    City: "Yamunotri", State: "Uttarakhand", Type: "🌊 Sacred River Shrine",
    image_url: "https://images.unsplash.com/photo-1561359313-0639aad49ff6?auto=format&fit=crop&w=1200&q=80",
    weather: "🍃 06°C to 16°C (Mountain Cool)", bestTime: "May to June & September to October",
    packing: "🧳 Warm woolen clothes, walking stick, trekking shoes, water bottle.",
    budget: "💰 Est. Budget: ₹2,000 - ₹4,500 / day",
    history_geo_political: "History: The westernmost shrine of Uttarakhand Char Dham, originating source of River Yamuna.",
    picnic_spots: "🛕 Yamunotri Temple (Dedicated to Goddess Yamuna)\n🏛️ Surya Kund (Thermal hot water spring used to boil rice prasad)\n🌿 Divya Shila (Rock pillar worshipped before entering temple)\n🏞️ Saptarshi Kund Trek",
    transport_roadmap: "Road Map: Accessible via Jankichatti trek (5 km trek to shrine). Transport: Dehradun Airport.",
    hotels_booking: "🏨 GMVN Yamunotri\n🏨 Hotel Yamuna Classic\n🏨 Pilgrim Guest Houses at Jankichatti",
    markets_food: "🛍️ Jankichatti & Yamunotri Path Stalls.\n🍲 Freshly boiled rice prasad, local vegetarian meals.",
    culture_helpline: "Culture: River goddess heritage. Helpline: Police: 100 | SOS: 112"
  },

  // --- MAJOR JYOTIRLINGAS & SHRINES ---
  "somnath": {
    Name: "Somnath - First Among 12 Jyotirlingas",
    City: "Somnath", State: "Gujarat", Type: "🛕 Ancient Jyotirlinga Shrine",
    image_url: "https://images.unsplash.com/photo-1570168007204-dfb528c6958f?auto=format&fit=crop&w=1200&q=80",
    weather: "☀️ 31°C (Warm Coastal Air)", bestTime: "October to March",
    packing: "🧳 Light cotton clothing, traditional temple wear, sunglasses.",
    budget: "💰 Est. Budget: ₹2,000 - ₹4,500 / day",
    history_geo_political: "History: First of the 12 sacred Jyotirlinga shrines of Lord Shiva. Rebuilt several times over centuries on the shore of Arabian Sea.",
    picnic_spots: "🛕 Somnath Temple & Evening Light and Sound Show\n🏛️ Bhalka Tirth (Where Lord Krishna took his last journey)\n🌿 Triveni Sangam (Confluence of Hiran, Kapila and Saraswati rivers)\n🏞️ Somnath Beach Promenade",
    transport_roadmap: "Road Map: Connected via NH-51. Transport: Veraval Railway Station (6 km) & Diu Airport (55 km).",
    hotels_booking: "🏨 The Fern Residency Somnath\n🏨 Lords Inn Somnath\n🏨 Hotel Somnath Sagar",
    markets_food: "🛍️ Somnath Temple Market Road.\n🍲 Gujarati Thali, Kathiyawadi Khichdi, Ghatiya.",
    culture_helpline: "Culture: Saurashtra cultural heritage. Helpline: Police: 100 | SOS: 112"
  },
  "mahakaleshwar": {
    Name: "Ujjain (Mahakaleshwar) - City of Mahakal",
    City: "Ujjain", State: "Madhya Pradesh", Type: "🛕 Famous Jyotirlinga & Bhasma Aarti",
    image_url: "https://images.unsplash.com/photo-1588416936002-3163fc68997b?auto=format&fit=crop&w=1200&q=80",
    weather: "☀️ 30°C (Warm)", bestTime: "October to March (Mahashivratri is grand)",
    packing: "🧳 Traditional dhoti/kurta (mandatory for sacred Bhasma Aarti inner sanctum entry), modest clothing.",
    budget: "💰 Est. Budget: ₹2,000 - ₹4,500 / day",
    history_geo_political: "History: Ancient historic city situated on the banks of Kshipra River. Home to the legendary Mahakaleshwar Jyotirlinga.",
    picnic_spots: "🛕 Mahakaleshwar Jyotirlinga Temple & Kal Bhairav Temple\n🏛️ Ram Ghat Kshipra River Aarti & Harsiddhi Temple\n🌿 Mangalnath Temple (Known as center of the earth)\n🏞️ Jantar Mantar Observatory Ujjain",
    transport_roadmap: "Road Map: Connected via NH-52. Transport: Ujjain Junction & Indore Airport (55 km).",
    hotels_booking: "🏨 Hotel Imperial Executive\n🏨 Anjushree Ujjain\n🏨 Hotel Mittal Paradise",
    markets_food: "🛍️ Freeganj Market, Mahakal Lok Bazaar.\n🍲 Ujjaini Poha, Bhutte ka Kees, Malpua.",
    culture_helpline: "Culture: Malwa spiritual traditions. Helpline: Police: 100 | SOS: 112"
  },
  "shirdi": {
    Name: "Shirdi - Sacred Abode of Sai Baba",
    City: "Shirdi", State: "Maharashtra", Type: "🕊️ Saint Shrine & Pilgrimage",
    image_url: "https://images.unsplash.com/photo-1570168007204-dfb528c6958f?auto=format&fit=crop&w=1200&q=80",
    weather: "☀️ 31°C (Warm)", bestTime: "October to March",
    packing: "🧳 Simple modest clothing, comfortable footwear for temple queues.",
    budget: "💰 Est. Budget: ₹1,500 - ₹3,500 / day",
    history_geo_political: "History: Town sacred to the 19th-century spiritual master Shri Sai Baba who preached 'Sabka Malik Ek'.",
    picnic_spots: "🛕 Shri Saibaba Sansthan Temple & Samadhi Mandir\n🏛️ Dwarkamai Mosque & Chavadi\n🌿 Sai Heritage Village & Gurusthan\n🏞️ Wet N Joy Water Park Shirdi",
    transport_roadmap: "Road Map: Connected via Ahmednagar-Manmad highway. Transport: Sainagar Shirdi Railway Station & Shirdi Airport (SAG).",
    hotels_booking: "🏨 Sun-n-Sand Shirdi\n🏨 St. Laurn The Temple Hotel\n🏨 Hotel Sai Leela",
    markets_food: "🛍️ Temple Road Market, Palki Stalls.\n🍲 Shirdi Prasad Bhojnalaya Meals, North/South Thali.",
    culture_helpline: "Culture: Universal devotion & harmony. Helpline: Police: 100 | SOS: 112"
  },  "khatushyam": {
    Name: "Khatu Shyam Ji - Abode of Shyam Baba",
    City: "Khatu", State: "Rajasthan", Type: "🛕 Devotional Shrine",
    image_url: "https://images.unsplash.com/photo-1599661046827-dacff0c0f09a?auto=format&fit=crop&w=1200&q=80",
    weather: "☀️ 30°C to 40°C (Warm & Dry)", bestTime: "October to March (Falgun Mela is grand)",
    packing: "🧳 Traditional or comfortable cotton clothes, woolen stoles in winter.",
    budget: "💰 Est. Budget: ₹1,500 - ₹3,500 / day",
    history_geo_political: "History: Highly revered shrine dedicated to Barbarika (Shyam Baba), who is worshipped as an avatar of Krishna in Kaliyuga.",
    picnic_spots: "🛕 Khatu Shyam Ji Main Temple\n🏛️ Shyam Kund (Sacred pond)\n🌿 Shyam Vatika & Suraj Kund\n🏞️ Ringas Local Market",
    transport_roadmap: "Road Map: Connected via Jaipur-Bikaner highway. Transport: Ringas Junction (17 km) & Jaipur Airport (80 km).",
    hotels_booking: "🏨 Hotel Shyam Residency\n🏨 Shri Shyam Sarovar\n🏨 Local Pilgrim Dharamshalas",
    markets_food: "🛍️ Temple Street Bazaar.\n🍲 Rajasthani Dal Baati Churma, Peda Prasad, Mirchi Bada.",
    culture_helpline: "Culture: Marwari devotional traditions. Helpline: Police: 100 | SOS: 112"
  },
  "salasar": {
    Name: "Salasar Balaji - Shrine of Lord Hanuman",
    City: "Salasar", State: "Rajasthan", Type: "🛕 Sacred Hanuman Temple",
    image_url: "https://images.unsplash.com/photo-1599661046827-dacff0c0f09a?auto=format&fit=crop&w=1200&q=80",
    weather: "☀️ 32°C (Dry & Warm)", bestTime: "October to March",
    packing: "🧳 Simple traditional clothing, comfortable footwear.",
    budget: "💰 Est. Budget: ₹1,500 - ₹3,000 / day",
    history_geo_political: "History: One of the most famous temples dedicated to Lord Hanuman, featuring a unique idol with a beard and mustache.",
    picnic_spots: "🛕 Salasar Balaji Main Temple\n🏛️ Anjani Mata Temple (Mother of Hanuman)\n🌿 Mohan Dham\n🏞️ Local Salasar Town Bazaar",
    transport_roadmap: "Road Map: Connected via Sujangarh-Salasar road. Transport: Sujangarh Railway Station (25 km).",
    hotels_booking: "🏨 Hotel Anjani\n🏨 Bhawani Niketan\n🏨 Local Dharamshalas",
    markets_food: "🛍️ Salasar Market.\n🍲 Besan Ke Gatte, Traditional Rajasthani Thali, Churma.",
    culture_helpline: "Culture: Rajasthani folk devotion. Helpline: Police: 100 | SOS: 112"
  },
  "pushkar_brahma": {
    Name: "Brahma Temple Pushkar - Unique Creator Shrine",
    City: "Pushkar", State: "Rajasthan", Type: "🛕 Rare Brahma Temple",
    image_url: "https://images.unsplash.com/photo-1599661046827-dacff0c0f09a?auto=format&fit=crop&w=1200&q=80",
    weather: "🌤️ 25°C to 35°C", bestTime: "October to March (Pushkar Camel Fair time)",
    packing: "🧳 Light cottons, comfortable slip-on shoes for temple ghats.",
    budget: "💰 Est. Budget: ₹1,800 - ₹4,000 / day",
    history_geo_political: "History: One of the very few existing temples dedicated to Lord Brahma in the world, situated beside the holy Pushkar Lake.",
    picnic_spots: "🛕 Brahma Temple Pushkar\n🏛️ Pushkar Lake & Varaha Ghat (Evening Aarti)\n🌿 Savitri Temple (On Ratnagiri hill top)\n🏞️ Rangji Temple",
    transport_roadmap: "Road Map: Connected via Ajmer-Pushkar road. Transport: Ajmer Junction (15 km) & Kishangarh Airport (40 km).",
    hotels_booking: "🏨 The Westin Pushkar Resort & Spa\n🏨 Hotel Brahma Horizon\n🏨 Pushkar Bagh",
    markets_food: "🛍️ Brahma Temple Road Bazaar, Main Market.\n🍲 Malpua of Pushkar, Falooda, Cafe vegan food, Dal Baati.",
    culture_helpline: "Culture: Spiritual temple town vibe. Helpline: Police: 100 | SOS: 112"
  },
  "eklingji": {
    Name: "Eklingji Temple - Historic Deity of Mewar",
    City: "Kailashnagar (Udaipur)", State: "Rajasthan", Type: "🛕 Historic Shiva Temple",
    image_url: "https://images.unsplash.com/photo-1599661046827-dacff0c0f09a?auto=format&fit=crop&w=1200&q=80",
    weather: "🌤️ 26°C to 36°C", bestTime: "September to March",
    packing: "🧳 Decent traditional clothing required inside the temple premises.",
    budget: "💰 Est. Budget: ₹2,000 - ₹4,500 / day",
    history_geo_political: "History: Double-storied magnificent temple complex built in 734 AD by Bappa Rawal, dedicated to Lord Shiva (Eklingji), the ruling deity of Mewar rulers.",
    picnic_spots: "🛕 Eklingji Temple Complex (108 temples inside)\n🏛️ Sas-Bahu Temples Nagda (Ancient ruins nearby)\n🌿 Baghela Lake view\n🏞️ Nagda Ancient Village",
    transport_roadmap: "Road Map: Located 22 km north of Udaipur on NH-8. Transport: Udaipur City Station & Maharana Pratap Airport (UDR).",
    hotels_booking: "🏨 Raffles Udaipur (Nearby)\n🏨 Aurika Udaipur\n🏨 Local Heritage Stays",
    markets_food: "🛍️ Nagda Road Stalls.\n🍲 Mewari Dal Baati, Mirchi Bada, Traditional Sweets.",
    culture_helpline: "Culture: Royal Mewar heritage. Helpline: Police: 100 | SOS: 112"
  },
  "mehandipur": {
    Name: "Mehandipur Balaji - Mystical Healing Shrine",
    City: "Mehandipur", State: "Rajasthan", Type: "🛕 Spiritual Exorcism & Faith Shrine",
    image_url: "https://images.unsplash.com/photo-1599661046827-dacff00c0f09a?auto=format&fit=crop&w=1200&q=80",
    weather: "☀️ 32°C (Warm)", bestTime: "October to March",
    packing: "🧳 Simple traditional clothes, strict rules regarding prasad and temple rituals.",
    budget: "💰 Est. Budget: ₹1,200 - ₹3,000 / day",
    history_geo_political: "History: Prominent temple dedicated to Lord Hanuman, widely visited for spiritual healing and faith-based rituals.",
    picnic_spots: "🛕 Mehandipur Balaji Main Temple\n🏛️ Pret Raj Sarkar Temple\n🌿 Bhairav Ji Temple\n🏞️ Local Town Market",
    transport_roadmap: "Road Map: Situated on Jaipur-Agra National Highway-21. Transport: Bandikui Junction (35 km) & Jaipur Airport (95 km).",
    hotels_booking: "🏨 Hotel Balaji Darshan\n🏨 Pilgrim Guest Houses",
    markets_food: "🛍️ Balaji Chowk Market.\n🍲 Simple North Indian Sattvic Food, Boondi Prasad.",
    culture_helpline: "Culture: Faith-based spiritual customs. Helpline: Police: 100 | SOS: 112"
  }
};

export default function App() {
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState('overview');
  const [showBookingModal, setShowBookingModal] = useState(false);
  const [showBizModal, setShowBizModal] = useState(false);
  const [wishlist, setWishlist] = useState<string[]>([]);
  
  const [cityData, setCityData] = useState(MASTER_INDIA_TOURISM_DIRECTORY["jaipur"]);

  const handleUniversalSearch = (query: string) => {
    if (!query.trim()) return;
    const cleanQuery = query.trim().toLowerCase();
    const cap = query.trim().charAt(0).toUpperCase() + query.trim().slice(1);
    setSearchTerm(query);
    setLoading(true);

    setTimeout(() => {
      if (MASTER_INDIA_TOURISM_DIRECTORY[cleanQuery]) {
        setCityData(MASTER_INDIA_TOURISM_DIRECTORY[cleanQuery]);
      } else {
        setCityData({
          Name: `${cap} - Verified Destination Hub`,
          City: cap,
          State: 'India',
          Type: '✨ Master Tourist Intelligence',
          weather: '☀️ 28°C (Pleasant Local Weather)',
          bestTime: 'October to March (Ideal Season)',
          packing: `🧳 Comfortable travel clothes, walking shoes, sunglasses, water bottle, and personal medical kit for ${cap}.`,
          budget: '💰 Est. Budget: ₹2,000 - ₹4,500 / day (Per Person)',
          image_url: 'https://images.unsplash.com/photo-1588095920028-a433f42f7c6a?auto=format&fit=crop&w=1200&q=80',
          history_geo_political: `${cap} is a prominent cultural and geographical region in India, recognized for its local heritage roots, traditional community lifestyle, and regional landscape.`,
          picnic_spots: `🏛️ ${cap} Heritage Old Town Gateway & Monuments (0 km)\n🛕 Famous Prachin Shri Mandir & Local Shrines (2.5 km)\n🌿 ${cap} Central Public Park & Green Garden (4 km)\n🏞️ Scenic Water Reservoir & Sunset Point (6 km)`,
          transport_roadmap: `Road Map: Connected via state highways and district roads. Transport: Local railway station, bus depots, auto-rickshaws, and cab services in ${cap}.`,
          hotels_booking: `🏨 Premium Hotels & Tourist Lodges in ${cap}\n🏨 Comfort Stays & Heritage Guest Houses\n🏨 Verified Local Homestays`,
          markets_food: `🛍️ Main Town Bazaar & Traditional Artisan Markets of ${cap}.\n🍲 Signature Regional Thali, Local Street Snacks, and Traditional Sweets.`,
          culture_helpline: `Culture: Rich regional arts and local festivals. Helpline: Police: 100 | Ambulance: 108 | SOS: 112`
        });
      }
      setLoading(false);
    }, 200);
  };

  const toggleWishlist = (cityName: string) => {
    if (wishlist.includes(cityName)) {
      setWishlist(wishlist.filter(c => c !== cityName));
      alert(`${cityName} wishlist se hata diya gaya hai!`);
    } else {
      setWishlist([...wishlist, cityName]);
      alert(`${cityName} wishlist mein jod diya gaya hai! ❤️`);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans pb-32 selection:bg-orange-500 selection:text-white">
      
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
              👑 Master Tourism Super-App
            </span>
          </div>
        </div>

        <div className="flex gap-2">
          <button onClick={() => setShowBizModal(true)} className="bg-emerald-500/10 text-emerald-400 text-xs font-bold px-3 py-2 rounded-xl border border-emerald-500/30 flex items-center gap-1">
            <span>💼</span> <span>List Biz</span>
          </button>
          <button onClick={() => setShowBookingModal(true)} className="bg-orange-500/10 text-orange-400 text-xs font-bold px-3 py-2 rounded-xl border border-orange-500/30 flex items-center gap-1">
            <span>🏨</span> <span>Book</span>
          </button>
        </div>
      </header>

      <section className="px-4 pt-10 pb-6 max-w-2xl mx-auto text-center relative">
        <div className="absolute inset-0 bg-gradient-to-b from-orange-500/15 via-transparent to-transparent pointer-events-none blur-3xl"></div>
        
        <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-white mb-3">
          Explore India. <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 via-amber-400 to-yellow-300">Mandirs & Heritage.</span>
        </h1>
        <p className="text-xs sm:text-sm text-slate-400 max-w-lg mx-auto mb-6">
          Search any destination or holy city to discover verified temples, picnic spots and hotels.
        </p>

        <div className="relative z-10 max-w-xl mx-auto mb-5">
          <div className="flex bg-slate-900/90 rounded-2xl p-2 border border-slate-800 focus-within:border-orange-500 transition shadow-2xl backdrop-blur-md">
            <span className="flex items-center pl-3 text-orange-400 text-lg">🔍</span>
            <input
              type="text"
              placeholder="Search holy city or temple town (e.g. Varanasi, Ayodhya, Tirupati, Puri)..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleUniversalSearch(searchTerm)}
              className="flex-1 bg-transparent px-3 py-3 text-xs sm:text-sm text-slate-100 placeholder-slate-500 outline-none font-semibold"
            />
            <button onClick={() => handleUniversalSearch(searchTerm)} className="bg-gradient-to-r from-orange-500 to-amber-500 text-white font-black text-xs px-6 py-3 rounded-xl shadow-lg">
              {loading ? 'Searching...' : 'Search'}
            </button>
          </div>
        </div>

        <div className="flex gap-2 overflow-x-auto no-scrollbar pb-1 text-xs justify-start sm:justify-center relative z-10">
          {[
            { name: 'Varanasi', icon: '🛕' },
            { name: 'Ayodhya', icon: '🛕' },
            { name: 'Tirupati', icon: '🌸' },
            { name: 'Puri', icon: '🌊' },
            { name: 'Amritsar', icon: '✨' },
            { name: 'Madurai', icon: '🏛️' }
          ].map(c => (
            <button key={c.name} onClick={() => handleUniversalSearch(c.name)} className="bg-slate-900/80 hover:bg-slate-800 text-slate-300 border border-slate-800 px-4 py-2 rounded-xl font-bold whitespace-nowrap flex items-center gap-1.5 shadow-sm active:scale-95">
              <span>{c.icon}</span> <span>{c.name}</span>
            </button>
          ))}
        </div>
      </section>

      <main className="px-4 max-w-xl mx-auto space-y-6 relative z-10">
        <div className="bg-slate-900/90 border border-slate-800 rounded-3xl overflow-hidden shadow-2xl backdrop-blur-xl">
          
          <div className="relative h-64 bg-slate-950 overflow-hidden">
            <img src={cityData.image_url} alt={cityData.Name} className="w-full h-full object-cover opacity-90" />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/50 to-transparent"></div>
            
            <div className="absolute top-3 left-3 flex gap-2">
              <span className="bg-orange-500/90 text-white font-black text-[10px] px-3 py-1.5 rounded-full shadow-lg">
                {cityData.Type}
              </span>
            </div>

            <button 
              onClick={() => toggleWishlist(cityData.City)} 
              className="absolute top-3 right-3 bg-slate-900/80 backdrop-blur-md p-2 rounded-full border border-slate-700 text-lg shadow-lg active:scale-90 transition">
              {wishlist.includes(cityData.City) ? '❤️' : '🤍'}
            </button>

            <div className="absolute bottom-4 left-4 right-4">
              <h3 className="text-2xl font-black text-white">{cityData.Name}</h3>
              <div className="flex justify-between items-center mt-1">
                <p className="text-xs text-amber-300 font-bold">📍 {cityData.City}, {cityData.State}</p>
                <div className="flex gap-2 text-[10px] font-bold">
                  <span className="bg-slate-900/80 px-2.5 py-1 rounded-lg border border-slate-700 text-sky-300">{cityData.weather}</span>
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2 p-4 bg-slate-950/40 border-b border-slate-800 text-[11px]">
            <div className="bg-slate-900/80 p-3 rounded-2xl border border-slate-800 space-y-1">
              <span className="text-amber-400 font-black block">🎒 Packing Guide</span>
              <p className="text-slate-300 font-medium">{cityData.packing}</p>
            </div>
            <div className="bg-slate-900/80 p-3 rounded-2xl border border-slate-800 space-y-1">
              <span className="text-emerald-400 font-black block">💵 Trip Budget</span>
              <p className="text-slate-300 font-medium">{cityData.budget}</p>
            </div>
          </div>

          <div className="flex border-b border-slate-800 bg-slate-950/70 text-[10px] sm:text-[11px] font-bold text-slate-400 overflow-x-auto no-scrollbar">
            {[
              { key: 'overview', label: 'History & Geo', icon: '📜' },
              { key: 'picnic', label: 'Picnic & Mandir', icon: '🛕' },
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

          <div className="p-5 space-y-4 text-xs text-slate-300 font-medium">
            
            {activeTab === 'overview' && (
              <div className="bg-slate-950/60 p-4 rounded-2xl border border-slate-800 space-y-2">
                <span className="text-amber-400 font-black block text-sm flex items-center gap-2">
                  <span>📜</span> History & Geography
                </span>
                <p className="leading-relaxed pt-1 whitespace-pre-line">{cityData.history_geo_political}</p>
              </div>
            )}

            {activeTab === 'picnic' && (
              <div className="bg-slate-950/60 p-4 rounded-2xl border border-slate-800 space-y-2">
                <span className="text-orange-400 font-black block text-sm flex items-center gap-2">
                  <span>🛕</span> Famous Mandirs & Picnic Spots
                </span>
                <p className="leading-relaxed pt-1 whitespace-pre-line">{cityData.picnic_spots}</p>
              </div>
            )}

            {activeTab === 'transit' && (
              <div className="bg-slate-950/60 p-4 rounded-2xl border border-slate-800 space-y-2">
                <span className="text-sky-400 font-black block text-sm flex items-center gap-2">
                  <span>🚗</span> Road Maps & Transport
                </span>
                <p className="leading-relaxed pt-1 whitespace-pre-line">{cityData.transport_roadmap}</p>
              </div>
            )}

            {activeTab === 'hotel' && (
              <div className="bg-slate-950/60 p-4 rounded-2xl border border-slate-800 space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-emerald-400 font-black block text-sm flex items-center gap-2">
                    <span>🏨</span> Hotel & Stay Options
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
                    <span>🛍️</span> Famous Markets & Food
                  </span>
                  <p className="whitespace-pre-line">{cityData.markets_food}</p>
                </div>
              </div>
            )}

            {activeTab === 'sos' && (
              <div className="bg-red-950/20 p-4 rounded-2xl border border-red-900/40 space-y-3">
                <span className="text-red-400 font-black block text-sm flex items-center gap-2">
                  <span>🚨</span> Emergency Helpline SOS
                </span>
                <p className="font-bold text-slate-100 text-sm leading-relaxed whitespace-pre-line">{cityData.culture_helpline}</p>
                
                <div className="grid grid-cols-3 gap-2 pt-2">
                  <a href="tel:100" className="bg-red-600 hover:bg-red-500 text-white text-center py-2.5 rounded-xl font-black shadow-lg block">
                    📞 Police (100)
                  </a>
                  <a href="tel:108" className="bg-red-600 hover:bg-red-500 text-white text-center py-2.5 rounded-xl font-black shadow-lg block">
                    🚑 Ambulance (108)
                  </a>
                  <a href="tel:112" className="bg-red-600 hover:bg-red-500 text-white text-center py-2.5 rounded-xl font-black shadow-lg block">
                    🚨 Pan-India (112)
                  </a>
                </div>
              </div>
            )}

          </div>

        </div>
      </main>

      {showBookingModal && (
        <div className="fixed inset-0 bg-slate-950/85 backdrop-blur-md flex items-center justify-center p-4 z-50">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl w-full max-w-md p-6 text-xs text-slate-200 shadow-2xl space-y-3">
            <h3 className="font-black text-white text-base flex items-center gap-2">
              <span>🏨</span> Book Hotel / Stay in {cityData.City}
            </h3>
            <input type="text" placeholder="Full Name *" className="w-full bg-slate-950 p-3 rounded-xl border border-slate-800 text-white outline-none" />
            <input type="tel" placeholder="Mobile Number *" className="w-full bg-slate-950 p-3 rounded-xl border border-slate-800 text-white outline-none" />
            <button onClick={() => { alert('Hotel booking confirmed!'); setShowBookingModal(false); }} className="w-full bg-gradient-to-r from-emerald-600 to-teal-600 text-white font-black py-3 rounded-xl mt-2 shadow-lg">
              Confirm Booking
            </button>
            <button onClick={() => setShowBookingModal(false)} className="w-full text-slate-500 py-1 font-semibold">Cancel</button>
          </div>
        </div>
      )}

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

      <nav className="fixed bottom-3 left-4 right-4 max-w-md mx-auto bg-slate-900/90 backdrop-blur-2xl border border-slate-800 flex justify-around py-3 z-40 rounded-2xl shadow-2xl text-[11px] font-extrabold text-slate-400">
        <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="flex flex-col items-center gap-0.5 text-orange-400"><span>🔍</span><span>Search</span></button>
        <button onClick={() => setShowBizModal(true)} className="flex flex-col items-center gap-0.5 text-emerald-400"><span>💼</span><span>List Biz</span></button>
        <button onClick={() => setShowBookingModal(true)} className="flex flex-col items-center gap-0.5"><span>🏨</span><span>Book</span></button>
      </nav>

    </div>
  );
}
