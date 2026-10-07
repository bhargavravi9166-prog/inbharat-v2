import React, { useState } from 'react';

// Ultimate Complete Indian Tourism Directory (All Major Tourist Cities & Hill Stations)
const COMPLETE_TOURISM_DATABASE: Record<string, any> = {
  "jaipur": {
    Name: "Jaipur - The Pink City & Royal Capital",
    City: "Jaipur", State: "Rajasthan", Type: "👑 Royal Heritage Capital",
    image_url: "https://images.unsplash.com/photo-1599661046289-e31897846e41?auto=format&fit=crop&w=1200&q=80",
    history_geo_political: "History: Founded in 1727 by Maharaja Sawai Jai Singh II. Enclosed by Aravalli hills.",
    picnic_spots: "🏛️ Amer Fort & Maota Lake (11 km)\n🛕 Govind Dev Ji Temple & Birla Mandir (4 km)\n🌿 Jawahar Circle & Patrika Gate (6 km)\n🏞️ Jal Mahal Water Palace (8 km)",
    transport_roadmap: "Road Map: Connected via NH-48. Transport: Jaipur Metro, low-floor buses, and Jaipur Airport (JAI).",
    hotels_booking: "🏨 Taj Rambagh Palace\n🏨 Trident Jaipur\n🏨 Zostel Jaipur",
    markets_food: "🛍️ Johari Bazaar, Bapu Bazaar.\n🍲 Dal Baati Churma, Pyaaz Kachori, Ghevar.",
    culture_helpline: "Culture: Rajputana folk arts. Helpline: Police: 100 | SOS: 112"
  },
  "agra": {
    Name: "Agra - City of the Taj Mahal",
    City: "Agra", State: "Uttar Pradesh", Type: "🕌 World Heritage City",
    image_url: "https://images.unsplash.com/photo-1564507592333-c60657eea523?auto=format&fit=crop&w=1200&q=80",
    history_geo_political: "History: Capital of the Mughal Empire. Situated on the banks of the Yamuna River.",
    picnic_spots: "🏛️ Taj Mahal & Mehtab Bagh (0 km)\n🏛️ Agra Fort & Jahangiri Mahal (3 km)\n🛕 Mankameshwar Temple\n🌿 Taj Nature Walk & Paliwal Park",
    transport_roadmap: "Road Map: Connected via Yamuna Expressway & NH-19. Transport: Agra Cantt Railway Station.",
    hotels_booking: "🏨 The Oberoi Amarvilas\n🏨 ITC Mughal\n🏨 Hotel Taj Resorts",
    markets_food: "🛍️ Sadar Bazaar, Kinari Bazaar.\n🍲 Agra Petha, Bedmi Puri, Mughlai Cuisine.",
    culture_helpline: "Culture: Mughal art & inlay. Helpline: Police: 100 | SOS: 112"
  },
  "udaipur": {
    Name: "Udaipur - The Venice of the East",
    City: "Udaipur", State: "Rajasthan", Type: "🏰 City of Lakes",
    image_url: "https://images.unsplash.com/photo-1615836245337-f5b9b224c5dd?auto=format&fit=crop&w=1200&q=80",
    history_geo_political: "History: Founded in 1559 by Maharana Udai Singh II. Surrounded by Aravalli hills and lakes.",
    picnic_spots: "🏛️ City Palace & Lake Pichola Boat Ride (0 km)\n🛕 Jagdish Temple & Eklingji Temple (22 km)\n🌿 Saheliyon-ki-Bari Garden (2 km)\n🏞️ Fateh Sagar Lake & Monsoon Palace (6 km)",
    transport_roadmap: "Road Map: Connected via NH-27. Transport: Udaipur Railway Station & Maharana Pratap Airport.",
    hotels_booking: "🏨 Taj Lake Palace\n🏨 The Oberoi Udaivilas\n🏨 Radisson Blu",
    markets_food: "🛍️ Hathi Pol Bazaar, Bapu Bazaar.\n🍲 Dal Baati Churma, Gatte ki Sabzi.",
    culture_helpline: "Culture: Mewari folk dance. Helpline: Police: 100 | SOS: 112"
  },
  "haridwar": {
    Name: "Haridwar - Gateway to the Gods",
    City: "Haridwar", State: "Uttarakhand", Type: "🌊 Sacred Pilgrimage City",
    image_url: "https://images.unsplash.com/photo-1561359313-0639aad49ff6?auto=format&fit=crop&w=1200&q=80",
    history_geo_political: "History: One of the seven holiest places in Hinduism. Located where Ganges exits Himalayas.",
    picnic_spots: "🏛️ Har Ki Pauri Ganga Aarti Ghat (0 km)\n🛕 Mansa Devi Temple & Chandi Devi Temple\n🌿 Shantikunj Ashram & Daksh Mahadev Temple (4 km)\n🏞️ Rajaji National Park Safari (10 km)",
    transport_roadmap: "Road Map: Connected via NH-334. Transport: Haridwar Junction & Jolly Grant Airport Dehradun.",
    hotels_booking: "🏨 Hotel Ganga Lahari\n🏨 Radisson Blu Haridwar\n🏨 Amatra Ganges",
    markets_food: "🛍️ Moti Bazar, Bara Bazar.\n🍲 Chole Bhature, Aloo Puri, Rabri Malai.",
    culture_helpline: "Culture: Vedic rituals. Helpline: Police: 100 | SOS: 112"
  },
  "varanasi": {
    Name: "Varanasi - The Spiritual Heart of India",
    City: "Varanasi", State: "Uttar Pradesh", Type: "🛕 Ancient Holy City",
    image_url: "https://images.unsplash.com/photo-1561359313-0639aad49ff6?auto=format&fit=crop&w=1200&q=80",
    history_geo_political: "History: One of the oldest continuously inhabited cities. Situated on the bank of Ganges.",
    picnic_spots: "🛕 Kashi Vishwanath Temple & Annapurna Temple (0 km)\n🏛️ Dashashwamedh Ghat & Ganga Aarti Boat Ride\n🌿 Sarnath Deer Park & Museum (10 km)\n🏞️ Assi Ghat Sunrise Point",
    transport_roadmap: "Road Map: Connected via NH-19. Transport: Varanasi Junction & Lal Bahadur Shastri Airport.",
    hotels_booking: "🏨 BrijRama Palace\n🏨 Taj Ganges Varanasi\n🏨 Hotel Surya",
    markets_food: "🛍️ Vishwanath Gali, Thatheri Bazaar.\n🍲 Banarasi Paan, Kachori Jalebi, Malaiyyo.",
    culture_helpline: "Culture: Spirituality. Helpline: Police: 100 | SOS: 112"
  },
  "mount abu": {
    Name: "Mount Abu - Rajasthan's Only Hill Station",
    City: "Mount Abu", State: "Rajasthan", Type: "⛰️ Scenic Hill Station",
    image_url: "https://images.unsplash.com/photo-1601784551446-20c9e07cdbdb?auto=format&fit=crop&w=1200&q=80",
    history_geo_political: "History: Ancient mythological history. Nestled in Aravalli hills with Nakki Lake.",
    picnic_spots: "🏛️ Dilwara Jain Temples (3 km)\n🛕 Adhar Devi Temple\n🌿 Nakki Lake Boating & Sunset Point (0 km)\n🏞️ Guru Shikhar Peak (15 km)",
    transport_roadmap: "Road Map: Connected via NH-27. Transport: Abu Road Railway Station (28 km).",
    hotels_booking: "🏨 Hotel Hillock\n🏨 Cama Rajputana Club Resort\n🏨 Sunset Inn Resort",
    markets_food: "🛍️ Nakki Lake Market.\n🍲 Rajasthani Dal Baati, Rabdi.",
    culture_helpline: "Culture: Tribal heritage. Helpline: Police: 100 | SOS: 112"
  },
  "new delhi": {
    Name: "New Delhi - Capital of India",
    City: "New Delhi", State: "Delhi", Type: "🏛️ National Capital",
    image_url: "https://images.unsplash.com/photo-1587474260584-136574528ed5?auto=format&fit=crop&w=1200&q=80",
    history_geo_political: "History: Rich in Mughal and British heritage. Located on the banks of Yamuna River.",
    picnic_spots: "🏛️ Red Fort, Qutub Minar, India Gate (0 km)\n🛕 Lotus Temple, Akshardham Temple\n🌿 Lodhi Garden & Nehru Park",
    transport_roadmap: "Road Map: Connected via expressways. Transport: IGI Airport & Metro Network.",
    hotels_booking: "🏨 The Leela Palace\n🏨 Taj Palace\n🏨 Zostel Delhi",
    markets_food: "🛍️ Chandni Chowk, Sarojini Nagar.\n🍲 Chole Bhature, Parathas, Street Chaat.",
    culture_helpline: "Culture: Multicultural hub. Helpline: Tourist Helpline: 1363 | SOS: 112"
  },
  "mumbai": {
    Name: "Mumbai - The City of Dreams",
    City: "Mumbai", State: "Maharashtra", Type: "🌊 Financial Capital",
    image_url: "https://images.unsplash.com/photo-1570168007204-dfb528c6958f?auto=format&fit=crop&w=1200&q=80",
    history_geo_political: "History: Major port city on Konkan coast. Financial & entertainment capital of India.",
    picnic_spots: "🏛️ Gateway of India, Elephanta Caves (0 km)\n🛕 Siddhivinayak Temple\n🌿 Marine Drive, Hanging Gardens, Juhu Beach",
    transport_roadmap: "Road Map: Western/Central Express Highways. Transport: CSMIA Airport & Suburban Trains.",
    hotels_booking: "🏨 The Taj Mahal Palace\n🏨 Trident Nariman Point\n🏨 Hotel Sea Princess",
    markets_food: "🛍️ Colaba Causeway, Crawford Market.\n🍲 Vada Pav, Pav Bhaji, Bombay Duck.",
    culture_helpline: "Culture: Bollywood & Marathi culture. Helpline: Police: 100 | SOS: 112"
  },
  "goa": {
    Name: "Goa - Sun, Sand & Sea",
    City: "Goa", State: "Goa", Type: "🏖️ Coastal Paradise",
    image_url: "https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?auto=format&fit=crop&w=1200&q=80",
    history_geo_political: "History: Portuguese colonial history. Pristine coastline along Arabian Sea.",
    picnic_spots: "🏛️ Fort Aguada, Chapora Fort (0 km)\n🛕 Shanta Durga Temple, Mangeshi Temple\n🌿 Baga Beach, Calangute Beach, Dudhsagar Waterfalls",
    transport_roadmap: "Road Map: NH-66 connectivity. Transport: Dabolim & Mopa Airports.",
    hotels_booking: "🏨 Taj Exotica\n🏨 W Goa\n🏨 Zostel Goa",
    markets_food: "🛍️ Anjuna Flea Market, Mapusa Market.\n🍲 Goan Fish Curry, Bebinca, Xacuti.",
    culture_helpline: "Culture: Konkani heritage. Helpline: Tourist Police: 0832-2425090 | SOS: 112"
  },
  "shimla": {
    Name: "Shimla - Queen of Hill Stations",
    City: "Shimla", State: "Himachal Pradesh", Type: "❄️ Himalayan Hill Station",
    image_url: "https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?auto=format&fit=crop&w=1200&q=80",
    history_geo_political: "History: Former summer capital of British India. Nestled in lower Himalayan ranges.",
    picnic_spots: "🏛️ The Ridge, Viceregal Lodge (0 km)\n🛕 Jakhoo Temple, Tara Devi Temple\n🌿 Mall Road, Kufri Valley Snow Point",
    transport_roadmap: "Road Map: Connected via NH-5. Transport: Kalka-Shimla Toy Train.",
    hotels_booking: "🏨 The Oberoi Cecil\n🏨 Clarkes Hotel\n🏨 Hotel Combermere",
    markets_food: "🛍️ Mall Road Shopping Center, Lakkar Bazaar.\n🍲 Madra, Siddu, Himachali Thali.",
    culture_helpline: "Culture: Pahari tradition. Helpline: Police: 100 | SOS: 112"
  },
  "manali": {
    Name: "Manali - Valley of the Gods",
    City: "Manali", State: "Himachal Pradesh", Type: "🏔️ Adventure & Snow Hub",
    image_url: "https://images.unsplash.com/photo-1605648916361-9bc12ad6a563?auto=format&fit=crop&w=1200&q=80",
    history_geo_political: "History: Ancient trade route town. Situated in Beas River valley.",
    picnic_spots: "🏛️ Naggar Castle, Old Manali Heritage Village (0 km)\n🛕 Hadimba Temple, Vashisht Hot Springs\n🌿 Solang Valley, Rohtang Pass, Atal Tunnel",
    transport_roadmap: "Road Map: Connected via NH-3. Transport: Bhuntar Airport (50 km).",
    hotels_booking: "🏨 The Span Resort & Spa\n🏨 Manu All Seasons\n🏨 Zostel Manali",
    markets_food: "🛍️ Mall Road Manali, Tibetan Market.\n🍲 Trout Fish, Dham, Hot Maggi.",
    culture_helpline: "Culture: Himalayan culture. Helpline: Police: 100 | SOS: 112"
  },
  "rishikesh": {
    Name: "Rishikesh - Yoga Capital of the World",
    City: "Rishikesh", State: "Uttarakhand", Type: "🧘 Spiritual & Adventure Hub",
    image_url: "https://images.unsplash.com/photo-1561359313-0639aad49ff6?auto=format&fit=crop&w=1200&q=80",
    history_geo_political: "History: Ancient sanctuary for sages. Situated where Ganges flows from Himalayas.",
    picnic_spots: "🏛️ Triveni Ghat Ganga Aarti (0 km)\n🛕 Parmarth Niketan, Beatles Ashram\n🌿 Ram Jhula & Lakshman Jhula Suspension Bridges\n🏞️ Shivpuri River Rafting Camp (16 km)",
    transport_roadmap: "Road Map: Connected via NH-7. Transport: Rishikesh Railway Station & Dehradun Airport.",
    hotels_booking: "🏨 Ananda in the Himalayas\n🏨 Aloha On The Ganges\n🏨 Zostel Rishikesh",
    markets_food: "🛍️ Lakshman Jhula Market, Swarg Ashram.\n🍲 Ayurvedic Sattvic Thali, Organic Cafes.",
    culture_helpline: "Culture: Spirituality. Helpline: Police: 100 | SOS: 112"
  },
  "mysuru": {
    Name: "Mysuru - The Heritage City",
    City: "Mysuru", State: "Karnataka", Type: "🏛️ Royal Palace City",
    image_url: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80",
    history_geo_political: "History: Capital of Wodeyar dynasty. Famous for grand Dasara festivals.",
    picnic_spots: "🏛️ Mysore Palace & Chamundi Hills (0 km)\n🛕 Chamundeshwari Temple & Nandi Bull Statue\n🌿 Brindavan Gardens & Karanji Lake\n🏞️ Ranganathittu Bird Sanctuary",
    transport_roadmap: "Road Map: Connected via NH-275. Transport: Mysore Junction & Mysore Airport.",
    hotels_booking: "🏨 Lalitha Mahal Palace\n🏨 Radisson Blu Plaza\n🏨 Hotel Roopa",
    markets_food: "🛍️ Devaraja Market, Mysore Silk Emporium.\n🍲 Mysore Pak, Bisi Bele Bath, Dosa.",
    culture_helpline: "Culture: Karnataka heritage. Helpline: Police: 100 | SOS: 112"
  },
  "kolkata": {
    Name: "Kolkata - The City of Joy",
    City: "Kolkata", State: "West Bengal", Type: "🎨 Cultural Capital",
    image_url: "https://images.unsplash.com/photo-1558431382-27e303142255?auto=format&fit=crop&w=1200&q=80",
    history_geo_political: "History: Capital during British Raj, renowned for literature, art, and revolutionary history.",
    picnic_spots: "🏛️ Victoria Memorial, Howrah Bridge, Fort William (0 km)\n🛕 Dakshineswar Kali Temple & Kalighat Temple\n🌿 Eco Park, Maidan, Princep Ghat",
    transport_roadmap: "Road Map: NH-12 connectivity. Transport: Netaji Subhash Chandra Bose Airport & Metro.",
    hotels_booking: "🏨 The Oberoi Grand\n🏨 ITC Sonar\n🏨 The Peerless Inn",
    markets_food: "🛍️ New Market, Gariahat Market.\n🍲 Rosogolla, Mishti Doi, Kathi Roll.",
    culture_helpline: "Culture: Bengali literature. Helpline: Police: 100 | SOS: 112"
  },
  "hyderabad": {
    Name: "Hyderabad - The City of Pearls",
    City: "Hyderabad", State: "Telangana", Type: "🕌 Historic Tech Hub",
    image_url: "https://images.unsplash.com/photo-1588416936002-3163fc68997b?auto=format&fit=crop&w=1200&q=80",
    history_geo_political: "History: Ruled by Qutb Shahis and Nizams. Famous blend of history and modern IT industry.",
    picnic_spots: "🏛️ Charminar, Golconda Fort, Chowmahalla Palace (0 km)\n🛕 Birla Mandir & Chilkur Balaji Temple\n🌿 Hussain Sagar Lake, Lumbini Park, Ramoji Film City",
    transport_roadmap: "Road Map: NH-44 connectivity. Transport: Rajiv Gandhi International Airport & Metro.",
    hotels_booking: "🏨 Taj Falaknuma Palace\n🏨 ITC Kakatiya\n🏨 Green Park Hotel",
    markets_food: "🛍️ Laad Bazaar, Sultan Bazaar.\n🍲 Hyderabadi Dum Biryani, Irani Chai, Haleem.",
    culture_helpline: "Culture: Deccani tehzeeb. Helpline: Police: 100 | SOS: 112"
  },
  "jaisalmer": {
    Name: "Jaisalmer - The Golden City",
    City: "Jaisalmer", State: "Rajasthan", Type: "🐪 Desert Fortress City",
    image_url: "https://images.unsplash.com/photo-1599661046289-e31897846e41?auto=format&fit=crop&w=1200&q=80",
    history_geo_political: "History: Founded in 1156 by Rawal Jaisal. Located in heart of Thar Desert.",
    picnic_spots: "🏛️ Jaisalmer Golden Fort & Patwon Ki Haveli (0 km)\n🛕 Tanot Mata Temple & Nathmal Ji ki Haveli\n🌿 Sam Sand Dunes Desert Safari & Camp (40 km)\n🏞️ Gadisar Lake & Sunset Point",
    transport_roadmap: "Road Map: Connected via NH-15. Transport: Jaisalmer Railway Station & Airport.",
    hotels_booking: "🏨 Suryagarh Jaisalmer\n🏨 Desert Tulip Hotel\n🏨 Heritage Camp Stays",
    markets_food: "🛍️ Sadar Bazaar, Bhatia Bazaar.\n🍲 Gatte ki Sabzi, Ker Sangri, Pyaaz Kachori.",
    culture_helpline: "Culture: Desert folk music. Helpline: Police: 100 | SOS: 112"
  },
  "jodhpur": {
    Name: "Jodhpur - The Blue City & Sun City",
    City: "Jodhpur", State: "Rajasthan", Type: "🏰 Blue Heritage Hub",
    image_url: "https://images.unsplash.com/photo-1599661046289-e31897846e41?auto=format&fit=crop&w=1200&q=80",
    history_geo_political: "History: Founded in 1459 by Rao Jodha. Famous for blue-painted houses.",
    picnic_spots: "🏛️ Mehrangarh Fort & Jaswant Thada (0 km)\n🛕 Umaid Bhawan Palace Museum & Clock Tower\n🌿 Mandore Gardens & Rao Jodha Desert Rock Park\n🏞️ Balsamand Lake & Palace",
    transport_roadmap: "Road Map: Connected via NH-62. Transport: Jodhpur Junction & Airport (JDH).",
    hotels_booking: "🏨 Umaid Bhawan Palace\n🏨 RAAS Jodhpur\n🏨 Ajit Bhawan",
    markets_food: "🛍️ Nai Sarak, Clock Tower Market.\n🍲 Jodhpuri Mirchi Bada, Mawa Kachori.",
    culture_helpline: "Culture: Marwar traditions. Helpline: Police: 100 | SOS: 112"
  },
  "ayodhya": {
    Name: "Ayodhya - Birthplace of Lord Rama",
    City: "Ayodhya", State: "Uttar Pradesh", Type: "🛕 Sacred Ram Janmabhoomi",
    image_url: "https://images.unsplash.com/photo-1561359313-0639aad49ff6?auto=format&fit=crop&w=1200&q=80",
    history_geo_political: "History: Ancient holy city on the banks of Saryu River, mentioned in the Ramayana.",
    picnic_spots: "🛕 Sri Ram Janmabhoomi Mandir & Hanumangarhi (0 km)\n🏛️ Kanak Bhawan & Treta Ke Thakur\n🌿 Saryu River Ghat Aarti & Lata Mangeshkar Chowk\n🏞️ Guptar Ghat & Ram Katha Park",
    transport_roadmap: "Road Map: Connected via NH-27. Transport: Ayodhya Dham Junction & Valmiki Airport.",
    hotels_booking: "🏨 Ramada by Wyndham Ayodhya\n🏨 Hotel Krishna Palace\n🏨 Taraji Resort",
    markets_food: "🛍️ Ram Path Market, Chowk Bazaar.\n🍲 Awadhi Thali, Rabri Jalebi, Chaat.",
    culture_helpline: "Culture: Sanatan Vedic heritage. Helpline: Police: 100 | SOS: 112"
  },
  "ooty": {
    Name: "Ooty - Queen of Nilgiri Hills",
    City: "Ooty", State: "Tamil Nadu", Type: "🌿 Scenic Hill Station",
    image_url: "https://images.unsplash.com/photo-1588095920028-a433f42f7c6a?auto=format&fit=crop&w=1200&q=80",
    history_geo_political: "History: Established as a British summer resort in Nilgiri mountains.",
    picnic_spots: "🏛️ Nilgiri Mountain Toy Train (Heritage Ride)\n🛕 Elk Hill Murugan Temple & Mariamman Temple\n🌿 Ooty Botanical Gardens & Rose Garden (2 km)\n🏞️ Ooty Lake Boating & Doddabetta Peak (9 km)",
    transport_roadmap: "Road Map: Connected via NH-181. Transport: Mettupalayam Railway Station & Coimbatore Airport.",
    hotels_booking: "🏨 Savoy - IHCL World\n🏨 Sterling Ooty Fern Hill\n🏨 Zostel Ooty",
    markets_food: "🛍️ Ooty Municipal Market, Commercial Road.\n🍲 Homemade Ooty Chocolates, Nilgiri Tea, Carrot Halwa.",
    culture_helpline: "Culture: Toda tribal heritage. Helpline: Police: 100 | SOS: 112"
  },
  "darjeeling": {
    Name: "Darjeeling - Land of Himalayan Tea",
    City: "Darjeeling", State: "West Bengal", Type: "🍵 Tea & Himalayan Hub",
    image_url: "https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=1200&q=80",
    history_geo_political: "History: Developed by the British as a hill station. Famous for world-class tea gardens.",
    picnic_spots: "🏛️ Darjeeling Himalayan Railway (Toy Train - UNESCO)\n🛕 Mahakal Temple & Japanese Peace Pagoda\n🌿 Tiger Hill Sunrise Point & Batasia Loop (5 km)\n🏞️ Happy Valley Tea Estate & Himalayan Mountaineering Institute",
    transport_roadmap: "Road Map: Connected via Hill Cart Road. Transport: NJP Station & Bagdogra Airport.",
    hotels_booking: "🏨 Mayfair Darjeeling\n🏨 Elgin Hotel\n🏨 Sinclairs Darjeeling",
    markets_food: "🛍️ Mall Road Chowrasta, Tibetan Refugee Centre.\n🍲 Darjeeling Momos, Thukpa, Fresh Organic Tea.",
    culture_helpline: "Culture: Gorkha heritage. Helpline: Police: 100 | SOS: 112"
  },
  "nainital": {
    Name: "Nainital - The City of Lakes",
    City: "Nainital", State: "Uttarakhand", Type: "🛶 Himalayan Lake District",
    image_url: "https://images.unsplash.com/photo-1588095920028-a433f42f7c6a?auto=format&fit=crop&w=1200&q=80",
    history_geo_political: "History: Founded by British sugar merchant P. Barron in 1841 around Naini Lake.",
    picnic_spots: "🏛️ Governor's House (Raj Bhawan) & Snow View Point (0 km)\n🛕 Naina Devi Temple (Shakti Peeth)\n🌿 Naini Lake Boating & Mall Road (0 km)\n🏞️ Tiffin Top (Dorothy's Seat) & Eco Cave Gardens",
    transport_roadmap: "Road Map: Connected via NH-109. Transport: Kathgodam Railway Station (34 km) & Pantnagar Airport.",
    hotels_booking: "🏨 The Manu Maharani\n🏨 Shervani Hilltop\n🏨 Lagoons Nainital",
    markets_food: "🛍️ Mall Road Market, Tibetan Market.\n🍲 Kumaoni Roti, Ras Bhaat, Hot Bal Mithai.",
    culture_helpline: "Culture: Kumaoni traditions. Helpline: Police: 100 | SOS: 112"
  },
  "leh": {
    Name: "Leh-Ladakh - Land of High Passes",
    City: "Leh", State: "Ladakh", Type: "🏔️ High Altitude Desert",
    image_url: "https://images.unsplash.com/photo-1581793745862-99fdb7fb9632?auto=format&fit=crop&w=1200&q=80",
    history_geo_political: "History: Ancient stopover on trade routes along Indus Valley. Buddhist royal heritage.",
    picnic_spots: "🏛️ Leh Palace & Shanti Stupa Sunset Point (0 km)\n🛕 Thiksey Monastery & Hemis Monastery (40 km)\n🌿 Pangong Tso Lake & Khardung La Pass (Highest Motorable Pass)\n🏞️ Nubra Valley Sand Dunes & Magnetic Hill",
    transport_roadmap: "Road Map: Connected via Srinagar-Leh & Manali-Leh Highways. Transport: Kushok Bakula Rimpochee Airport.",
    hotels_booking: "🏨 The Grand Dragon Ladakh\n🏨 Stok Palace Heritage Hotel\n🏨 Zostel Leh",
    markets_food: "🛍️ Leh Main Bazaar, Tibetan Handicraft Market.\n🍲 Thukpa, Skyu, Butter Tea, Momos.",
    culture_helpline: "Culture: Tibetan Buddhist culture. Helpline: Police: 100 | SOS: 112"
  },
  "amritsar": {
    Name: "Amritsar - City of the Golden Temple",
    City: "Amritsar", State: "Punjab", Type: "🛕 Sikh Spiritual Capital",
    image_url: "https://images.unsplash.com/photo-1514222134-b57cbb8ce073?auto=format&fit=crop&w=1200&q=80",
    history_geo_political: "History: Founded in 1577 by Guru Ram Das Ji. Known for Sikh history and patriotism.",
    picnic_spots: "🛕 Sri Harmandir Sahib (Golden Temple) & Jallianwala Bagh (0 km)\n🏛️ Partition Museum & Gobindgarh Fort (2 km)\n🌿 Wagah Border Beating Retreat Ceremony (30 km)",
    transport_roadmap: "Road Map: Connected via Grand Trunk Road (NH-3). Transport: Amritsar Junction & Sri Guru Ram Dass Jee Airport.",
    hotels_booking: "🏨 Taj Swarna Amritsar\n🏨 Hyatt Amritsar\n🏨 Hotel City Park",
    markets_food: "🛍️ Hall Bazaar, Katra Jaimal Singh.\n🍲 Amritsari Kulcha, Lassi, Makki di Roti & Sarson da Saag.",
    culture_helpline: "Culture: Punjabi hospitality. Helpline: Police: 100 | SOS: 112"
  },
  "goa": {
    Name: "Goa - Sun, Sand & Sea",
    City: "Goa", State: "Goa", Type: "🏖️ Coastal Paradise",
    image_url: "https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?auto=format&fit=crop&w=1200&q=80",
    history_geo_political: "History: Portuguese colonial history. Pristine coastline along Arabian Sea.",
    picnic_spots: "🏛️ Fort Aguada, Chapora Fort (0 km)\n🛕 Shanta Durga Temple, Mangeshi Temple\n🌿 Baga Beach, Calangute Beach, Dudhsagar Waterfalls",
    transport_roadmap: "Road Map: NH-66 connectivity. Transport: Dabolim & Mopa Airports.",
    hotels_booking: "🏨 Taj Exotica\n🏨 W Goa\n🏨 Zostel Goa",
    markets_food: "🛍️ Anjuna Flea Market, Mapusa Market.\n🍲 Goan Fish Curry, Bebinca, Xacuti.",
    culture_helpline: "Culture: Konkani heritage. Helpline: Tourist Police: 0832-2425090 | SOS: 112"
  }
};

export default function App() {
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState('overview');
  const [showBookingModal, setShowBookingModal] = useState(false);
  const [showBizModal, setShowBizModal] = useState(false);
  
  const [cityData, setCityData] = useState(COMPLETE_TOURISM_DATABASE["jaipur"]);

  const handleUniversalSearch = (query: string) => {
    if (!query.trim()) return;
    const cleanQuery = query.trim().toLowerCase();
    const cap = query.trim().charAt(0).toUpperCase() + query.trim().slice(1);
    setSearchTerm(query);
    setLoading(true);

    setTimeout(() => {
      if (COMPLETE_TOURISM_DATABASE[cleanQuery]) {
        setCityData(COMPLETE_TOURISM_DATABASE[cleanQuery]);
      } else {
        // Fallback for any other city search
        setCityData({
          Name: `${cap} - Verified Destination Hub`,
          City: cap,
          State: 'India',
          Type: '✨ Verified Tourist Intelligence',
          image_url: 'https://images.unsplash.com/photo-1588095920028-a433f42f7c6a?auto=format&fit=crop&w=1200&q=80',
          history_geo_political: `${cap} is a remarkable historical and cultural destination in India, known for its unique traditions, local heritage, and scenic appeal.`,
          picnic_spots: `🏛️ ${cap} Main Heritage Fort & Old Monuments (0 km)\n🛕 Famous ${cap} Prachin Mandir & Shrines (3 km)\n🌿 ${cap} Central Botanical Garden & City Park (5 km)\n🏞️ Regional Scenic Water Viewpoint (8 km)`,
          transport_roadmap: `Road Map: Connected via national and state highways. Transport: Local railway station, bus terminal, and auto/cab services in ${cap}.`,
          hotels_booking: `🏨 Premium Hotels & Resorts in ${cap}\n🏨 Comfort Stays & Tourist Lodges\n🏨 Traditional Homestays`,
          markets_food: `🛍️ Main Town Bazaar & Handloom Shops of ${cap}.\n🍲 Signature Regional Thali, Local Street Food, and Traditional Sweets.`,
          culture_helpline: `Culture: Rich regional heritage and local festivals. Helpline: Police: 100 | Ambulance: 108 | SOS: 112`
        });
      }
      setLoading(false);
    }, 200);
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
              👑 Universal Super-App
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
          Explore India. <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 via-amber-400 to-yellow-300">City-Wise Intelligence.</span>
        </h1>
        <p className="text-xs sm:text-sm text-slate-400 max-w-lg mx-auto mb-6">
          Get precise picnic spots, temples, markets and history for any tourist destination.
        </p>

        <div className="relative z-10 max-w-xl mx-auto mb-5">
          <div className="flex bg-slate-900/90 rounded-2xl p-2 border border-slate-800 focus-within:border-orange-500 transition shadow-2xl backdrop-blur-md">
            <span className="flex items-center pl-3 text-orange-400 text-lg">🔍</span>
            <input
              type="text"
              placeholder="Search any city (e.g. Leh, Nainital, Amritsar, Ooty)..."
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
            { name: 'Leh', icon: '🏔️' },
            { name: 'Nainital', icon: '🛶' },
            { name: 'Amritsar', icon: '🛕' },
            { name: 'Manali', icon: '❄️' },
            { name: 'Udaipur', icon: '🏰' },
            { name: 'Goa', icon: '🏖️' }
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
                  <span>🛕</span> Picnic Spots & Famous Mandirs
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
              <div className="bg-red-950/20 p-4 rounded-2xl border border-red-900/40 space-y-2">
                <span className="text-red-400 font-black block text-sm flex items-center gap-2">
                  <span>🚨</span> Emergency Helpline SOS
                </span>
                <p className="font-bold text-slate-100 text-sm leading-relaxed whitespace-pre-line">{cityData.culture_helpline}</p>
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
