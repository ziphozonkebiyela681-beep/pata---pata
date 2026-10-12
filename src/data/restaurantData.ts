export interface MenuItem {
  id: string;
  name: string;
  category: 'traditional' | 'grills' | 'burgers' | 'starters' | 'drinks' | 'desserts';
  price: number; // in South African Rands (ZAR)
  description: string;
  isPopular?: boolean;
  isSpicy?: boolean;
  isVegetarian?: boolean;
  image?: string;
  tag?: string;
}

export interface LiveEvent {
  day: string;
  time: string;
  title: string;
  artist: string;
  genre: string;
  description: string;
  badge?: string;
}

export interface Review {
  id: string;
  name: string;
  location: string;
  rating: number;
  date: string;
  text: string;
  source: string;
}

export const RESTAURANT_INFO = {
  name: "Pata Pata",
  fullName: "Pata Pata African Restaurant & Live Jazz",
  address: "286 Fox Street, Jeppestown, Maboneng Precinct, Johannesburg, 2094",
  street: "286 Fox Street",
  precinct: "Maboneng Precinct",
  city: "Johannesburg",
  province: "Gauteng",
  country: "South Africa",
  phone: "+27 11 334 0696",
  whatsapp: "+27 72 880 7772",
  email: "info@patapatamaboneng.co.za",
  tiktok: "@pata.pata_maboneng",
  tiktokUrl: "https://www.tiktok.com/@pata.pata_maboneng",
  instagram: "@pata.pata_maboneng",
  instagramUrl: "https://www.instagram.com/pata.pata_maboneng",
  openingHours: {
    weekdays: "08:00 – 23:00",
    saturday: "08:00 – 00:00",
    sunday: "08:00 – 23:00",
  },
  uberEatsUrl: "https://www.ubereats.com",
  mrdFoodUrl: "https://www.mrdfood.com",
  mapsUrl: "https://maps.google.com/?q=Pata+Pata+286+Fox+Street+Maboneng+Johannesburg",
};

export const MENU_ITEMS: MenuItem[] = [
  // Ukudla Kwesintu (Traditional Heritage)
  {
    id: 'trad-1',
    name: 'Slow-Cooked Oxtail Potjie',
    category: 'traditional',
    price: 215,
    description: 'Tender oxtail braised for five hours in rich red wine and aromatic herb gravy. Served with creamy samp & beans or traditional fluffy phutu pap and homemade spicy chakalaka.',
    isPopular: true,
    tag: "Chef's Pride",
  },
  {
    id: 'trad-2',
    name: 'Mogodu (Traditional Beef Tripe)',
    category: 'traditional',
    price: 145,
    description: 'Slow-simmered tender beef tripe seasoned with African spices and savory bone broth. Accompanied by steaming dombolo (dumplings) or phutu pap.',
    isPopular: true,
    tag: "Heritage Classic",
  },
  {
    id: 'trad-3',
    name: 'Umleqwa (Hardbody Village Chicken)',
    category: 'traditional',
    price: 165,
    description: 'Free-range indigenous chicken slow-stewed on the bone with rosemary, garlic, and wild thyme. Served with braised morogo (spinach) and warm pap.',
    isPopular: false,
    tag: "Authentic Farm",
  },
  {
    id: 'trad-4',
    name: 'Inyama Yenhloko (Cow Head Delicacy)',
    category: 'traditional',
    price: 155,
    description: 'Rich, gelatinous slow-simmered beef head meat seasoned to township perfection. Served with freshly steamed warm dombolo and onion relish.',
    isPopular: false,
  },
  {
    id: 'trad-5',
    name: 'Durban Mutton Curry',
    category: 'traditional',
    price: 175,
    description: 'Tender mutton cooked on the bone with toasted cumin, coriander, and curry leaves in a deep tomato-ginger gravy. Served with sambals and roti.',
    isSpicy: true,
  },

  // Sizzling Grills & Braai
  {
    id: 'grill-1',
    name: '500g Prime T-Bone Steak',
    category: 'grills',
    price: 235,
    description: 'Flame-grilled prime cut featuring both succulent fillet and flavorful sirloin, basted in our signature Maboneng braai glaze. Served with golden rustic chips.',
    isPopular: true,
    tag: 'House Special',
  },
  {
    id: 'grill-2',
    name: 'Pata Pata Mixed Braai Platter',
    category: 'grills',
    price: 295,
    description: 'The ultimate township braai feast: 300g rump steak, coil of farm boerewors, spicy peri-peri chicken wings, roasted sweet corn, chakalaka, and crispy chips.',
    isPopular: true,
    tag: 'Perfect for Sharing',
  },
  {
    id: 'grill-3',
    name: 'Fillet Supreme',
    category: 'grills',
    price: 245,
    description: '300g tender grilled beef tenderloin crowned with pan-fried peri-peri chicken livers and melted garlic butter. A legendary Pata Pata favorite.',
    isPopular: true,
    isSpicy: true,
  },
  {
    id: 'grill-4',
    name: 'Traditional Boerewors & Pap Smoor',
    category: 'grills',
    price: 135,
    description: 'Artisanal spiced beef and pork sausage spiral grilled over hot coals, smothered in rich tomato-onion braai relish with buttery phutu pap.',
  },
  {
    id: 'grill-5',
    name: 'Flame-Kissed Half Spring Chicken',
    category: 'grills',
    price: 155,
    description: 'Basted in lemon-herb marinade or fiery bird’s-eye Mozambique peri-peri sauce, flame-charred to juicy perfection. Served with hand-cut chips.',
    isSpicy: true,
  },

  // Burgers & Sandwiches
  {
    id: 'burger-1',
    name: 'The Legendary Pata Pata Burger',
    category: 'burgers',
    price: 148,
    description: '200g pure beef patty, melted mature cheddar, spicy homemade chakalaka, crispy streaky bacon, and a sunny farm egg on a toasted brioche bun with hand-cut potato wedges.',
    isPopular: true,
    isSpicy: true,
    tag: 'Famous Signature',
  },
  {
    id: 'burger-2',
    name: 'The Big Cheese Burger',
    category: 'burgers',
    price: 135,
    description: 'Flame-broiled beef patty loaded with double cheddar, sweet caramelized balsamic onions, gherkins, and house smoked aioli.',
  },
  {
    id: 'burger-3',
    name: 'Blue Cheese & Walnut Veggie Burger',
    category: 'burgers',
    price: 130,
    description: 'Hearty portobello and black bean patty topped with creamy gorgonzola dressing, sliced avocado, toasted walnuts, and fresh wild rocket.',
    isVegetarian: true,
  },
  {
    id: 'burger-4',
    name: 'Peri-Peri Grilled Chicken Burger',
    category: 'burgers',
    price: 125,
    description: 'Succulent chicken breast basted in spicy lemon-chili glaze, crisp shredded lettuce, pickled red onions, and herb mayo on seeded bun.',
    isSpicy: true,
  },

  // Starters & Tapas
  {
    id: 'start-1',
    name: 'Pan-Fried Peri-Peri Chicken Livers',
    category: 'starters',
    price: 88,
    description: 'Flash-fried fresh chicken livers in a velvety garlic, peri-peri chili, and cream reduction. Served with toasted Portuguese crusty bread.',
    isPopular: true,
    isSpicy: true,
  },
  {
    id: 'start-2',
    name: 'Cape Malay Bobotie Spring Rolls',
    category: 'starters',
    price: 82,
    description: 'Crisp golden pastry rolls stuffed with aromatic Cape bobotie spiced minced beef and raisins. Accompanied by homemade Mrs. H.S. Ball’s style peach chutney.',
    isPopular: true,
  },
  {
    id: 'start-3',
    name: 'Rooibos Smoked Ostrich Carpaccio',
    category: 'starters',
    price: 105,
    description: 'Thinly sliced cured ostrich fillet gently cold-smoked over organic rooibos tea leaves, dressed with shaved Grana Padano, capers, and truffle oil.',
  },
  {
    id: 'start-4',
    name: 'West Coast Mussels in White Wine Garlic',
    category: 'starters',
    price: 110,
    description: 'Fresh plump black mussels steamed in Sauvignon Blanc, shallots, garlic cream broth with charred sourdough.',
  },
  {
    id: 'start-5',
    name: 'Grilled Cypriot Haloumi & Parma Ham',
    category: 'starters',
    price: 94,
    description: 'Charred golden haloumi fingers wrapped with Italian cured ham, drizzled with pomegranate molasses and fresh mint.',
  },

  // Cocktails & Signature Drinks
  {
    id: 'drink-1',
    name: 'The Miriam Makeba Sunset',
    category: 'drinks',
    price: 98,
    description: 'Inverroche Amber Fynbos Gin, elderflower liqueur, fresh ruby grapefruit juice, a splash of sparkling tonic, and a torched rosemary sprig.',
    isPopular: true,
    tag: 'Signature Cocktail',
  },
  {
    id: 'drink-2',
    name: 'Maboneng Rooibos Old Fashioned',
    category: 'drinks',
    price: 105,
    description: 'Bain’s Cape Mountain single-grain whisky stirred with our house-crafted organic rooibos honey syrup, Angostura bitters, and flamed orange peel.',
    isPopular: true,
  },
  {
    id: 'drink-3',
    name: 'Sophiatown Passion Spritz',
    category: 'drinks',
    price: 92,
    description: 'Aperol, fresh granadilla (passion fruit) pulp, Valdo prosecco, soda water, and fresh mint over crushed ice.',
  },
  {
    id: 'drink-4',
    name: 'Soweto Gold Craft Lager on Tap',
    category: 'drinks',
    price: 52,
    description: 'Crisp, golden local craft beer with balanced maltiness and clean finish. Served chilled in a frosty mug.',
  },
  {
    id: 'drink-5',
    name: 'Kanonkop Kadette Pinotage (Glass)',
    category: 'drinks',
    price: 85,
    description: 'Renowned Stellenbosch red wine with rich dark berry flavors, hints of spice, and subtle oak maturation.',
  },

  // Desserts
  {
    id: 'des-1',
    name: 'Warm Traditional Malva Pudding',
    category: 'desserts',
    price: 75,
    description: 'Spongy caramelized apricot pudding soaked in warm sweet vanilla butter sauce, served with artisan Madagascar vanilla bean ice cream.',
    isPopular: true,
  },
  {
    id: 'des-2',
    name: 'Amarula Infused Tiramisu',
    category: 'desserts',
    price: 80,
    description: 'Espresso-soaked ladyfingers layered with mascarpone cream enriched with indigenous Amarula wild marula cream liqueur.',
  },
];

export const LIVE_SCHEDULE: LiveEvent[] = [
  {
    day: 'Thursday Night',
    time: '19:30 – 22:30',
    title: 'Afro-Soul Acoustic Sessions',
    artist: 'The Fox Street Collective ft. Lindiwe Khumalo',
    genre: 'Afro-Soul & Acoustic Ballads',
    description: 'Intimate candlelight sets featuring soulful vocals, nylon acoustic guitars, and gentle percussion celebrating South African songbooks.',
    badge: 'Intimate & Warm',
  },
  {
    day: 'Friday Night',
    time: '20:00 – 23:30',
    title: 'Sophiatown 1960s Revival',
    artist: 'Bra Hugh Memorial Sextet & Horns',
    genre: 'Kwela, Mbaqanga & Classic Township Jazz',
    description: 'Step back into the legendary golden age of Sophiatown! Swinging saxophones, upright bass, and infectious rhythms that get the whole floor dancing.',
    badge: 'Crowd Favorite',
  },
  {
    day: 'Saturday Night',
    time: '19:30 – 00:00',
    title: 'Fox Street Rhythm & Rhumba',
    artist: 'Afro-Fusion All-Stars ft. Papa Gaston',
    genre: 'Congolese Rumba, Afrobeat & Pan-African Funk',
    description: 'High-energy brass, polyrhythms, and hypnotic guitar licks spanning Johannesburg to Kinshasa and Lagos. The beating heart of Maboneng nightlife.',
    badge: 'Party Energy',
  },
  {
    day: 'Sunday Afternoon',
    time: '13:00 – 17:30',
    title: 'Soulful Sunday Jazz Brunch',
    artist: 'Vuyo Sings Miriam (Tribute Ensemble)',
    genre: 'Classic Makeba, Abdullah Ibrahim & Cool Joburg Jazz',
    description: 'Relaxed alfresco dining on Fox Street accompanied by legendary melodies, cool brass, chilled wine, and hearty potjies.',
    badge: 'Laid-back Sunday',
  },
];

export const REVIEWS: Review[] = [
  {
    id: 'rev-1',
    name: 'Sipho Ndlovu',
    location: 'Johannesburg, ZA',
    rating: 5,
    date: '2 weeks ago',
    source: 'Google Reviews',
    text: 'Pata Pata is undeniably the heartbeat of Fox Street. The oxtail stew melts like butter in your mouth, the chakalaka has just the right kick, and when the live jazz band starts playing on Friday night, there is no place in Joburg with better energy!',
  },
  {
    id: 'rev-2',
    name: 'Chloe van der Merwe',
    location: 'Cape Town, ZA',
    rating: 5,
    date: '1 month ago',
    source: 'TripAdvisor',
    text: 'Whenever I visit Johannesburg, Pata Pata is my first stop. Sitting outside on the sidewalk watching the creative pulse of Maboneng while sipping their Miriam Makeba Sunset cocktail is pure magic. Vintage shebeen aesthetic at its absolute finest.',
  },
  {
    id: 'rev-3',
    name: 'Kwame Asante',
    location: 'Accra, Ghana',
    rating: 5,
    date: '3 weeks ago',
    source: 'Google Reviews',
    text: 'Authentic African food done with immense love and respect. The Mogodu took me straight to heaven, and the braai platter fed four of us with plenty to spare. You feel like family the moment you walk through the door.',
  },
  {
    id: 'rev-4',
    name: 'Sarah Jenkins',
    location: 'London, UK',
    rating: 5,
    date: 'Recent Visit',
    source: 'Travel Foodies',
    text: 'The best night of our two-week South Africa trip! Live saxophone, incredible lamb chops, warm staff, and an atmosphere full of laughter, diverse people, and soul. Do not miss this gem when you are in Johannesburg!',
  },
];

export const FOX_STREET_LANDMARKS = [
  {
    name: "Arts on Main",
    distance: "60 meters away",
    desc: "Renowned contemporary art studios, galleries, and William Kentridge's workspace.",
  },
  {
    name: "The Bioscope Independent Cinema",
    distance: "120 meters away",
    desc: "Joburg's iconic indie cinema showcasing African cinema and retro film nights.",
  },
  {
    name: "Market on Main",
    distance: "70 meters away",
    desc: "Sunday lifestyle food and design market drawing creatives from across Gauteng.",
  },
  {
    name: "Drivelines Studios",
    distance: "150 meters away",
    desc: "Architectural upcycled shipping-container building featuring local design shops.",
  },
];
