import React, { useState, useMemo } from 'react';
import { MENU_ITEMS } from '../data/restaurantData';
import { PataPataImages } from '../assets/images';
import { Flame, Leaf, Star, Search, Sparkles, Phone } from 'lucide-react';
import { RESTAURANT_INFO } from '../data/restaurantData';

export const MenuSection: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [filterPreference, setFilterPreference] = useState<'all' | 'popular' | 'spicy' | 'veg'>('all');

  const categories = [
    { id: 'all', label: 'All Offerings' },
    { id: 'traditional', label: 'Ukudla Kwesintu (Traditional)' },
    { id: 'grills', label: 'Sizzling Braai & Grills' },
    { id: 'burgers', label: 'Burgers & Mains' },
    { id: 'starters', label: 'Starters & Tapas' },
    { id: 'drinks', label: 'Craft Cocktails & Wine' },
    { id: 'desserts', label: 'Sweet Finishes' },
  ];

  const filteredItems = useMemo(() => {
    return MENU_ITEMS.filter((item) => {
      const matchesCategory = activeCategory === 'all' || item.category === activeCategory;
      const matchesSearch =
        item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.description.toLowerCase().includes(searchQuery.toLowerCase());
      
      let matchesPref = true;
      if (filterPreference === 'popular') matchesPref = !!item.isPopular;
      if (filterPreference === 'spicy') matchesPref = !!item.isSpicy;
      if (filterPreference === 'veg') matchesPref = !!item.isVegetarian;

      return matchesCategory && matchesSearch && matchesPref;
    });
  }, [activeCategory, searchQuery, filterPreference]);

  // Featured visual showcase dishes
  const featuredHighlights = [
    {
      title: 'Slow-Cooked Oxtail Potjie',
      tag: "Pata Pata's #1 Heritage Dish",
      price: 'R215',
      desc: 'Simmered 5 hours with red wine and fresh thyme, served with creamy samp & beans or pap and spicy chakalaka.',
      image: PataPataImages.oxtail,
      id: 'trad-1',
    },
    {
      title: 'Pata Pata Mixed Braai Platter',
      tag: 'Legendary Township Feast',
      price: 'R295',
      desc: 'Prime 300g rump, juicy boerewors coil, peri-peri wings, sweet corn cob, and golden hand-cut chips.',
      image: PataPataImages.grill,
      id: 'grill-2',
    },
    {
      title: 'The Famous Pata Pata Burger',
      tag: 'Chef Signature with Chakalaka',
      price: 'R148',
      desc: 'Pure beef patty, mature cheddar, homemade spicy chakalaka, sunny egg, crispy bacon, and potato wedges.',
      image: PataPataImages.burger,
      id: 'burger-1',
    },
    {
      title: 'The Miriam Makeba Sunset',
      tag: 'Signature African Botanical Cocktail',
      price: 'R98',
      desc: 'Inverroche Amber Fynbos Gin, ruby grapefruit, elderflower, tonic water, and a flame-torched rosemary sprig.',
      image: PataPataImages.cocktails,
      id: 'drink-1',
    },
  ];

  return (
    <section id="menu" className="py-20 bg-[#12100e] text-[#faf5ee] relative">
      {/* Decorative subtle texture */}
      <div className="absolute inset-0 bg-grain opacity-40 pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-[#e67329] mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Culinary Heritage & Pan-African Flavours</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-[#faf5ee] mb-4">
            The Pata Pata Menu
          </h2>
          <p className="font-sans text-base text-[#bfb19f] leading-relaxed">
            From the hearty township pots of <em className="text-[#f59e0b] not-italic font-medium">Ukudla Kwesintu</em> to sizzling braai grills, 
            everything is crafted fresh in our kitchen with genuine South African soul and hospitality.
          </p>
        </div>

        {/* Featured Visual Dish Highlights (4-Card Showcase) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {featuredHighlights.map((item) => (
            <div
              key={item.id}
              className="group relative bg-[#1c1611] rounded-2xl overflow-hidden border border-[#382b20] hover:border-[#e67329]/60 shadow-xl transition-all duration-300 flex flex-col justify-between"
            >
              <div className="relative h-48 overflow-hidden">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#1c1611] via-transparent to-transparent" />
                <span className="absolute top-3 left-3 text-[11px] font-sans font-semibold tracking-wider uppercase px-2.5 py-1 bg-[#12100e]/85 border border-[#e67329]/40 text-[#f59e0b] rounded-md backdrop-blur-sm">
                  {item.tag}
                </span>
                <span className="absolute bottom-3 right-3 text-lg font-serif font-bold text-white bg-[#c2410c] px-3 py-0.5 rounded-lg shadow-md">
                  {item.price}
                </span>
              </div>

              <div className="p-5 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="font-serif text-lg font-bold text-[#faf5ee] mb-2 group-hover:text-[#f59e0b] transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-xs text-[#b8a996] leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Filter Controls & Search Bar */}
        <div className="bg-[#18130e] border border-[#2f241a] rounded-2xl p-4 sm:p-6 mb-10 shadow-lg">
          {/* Category Tabs (Segmented Buttons) */}
          <div className="flex items-center gap-2 overflow-x-auto pb-3 mb-4 scrollbar-none">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`px-4 py-2 text-xs sm:text-sm font-medium rounded-xl whitespace-nowrap transition-all ${
                  activeCategory === cat.id
                    ? 'bg-gradient-to-r from-[#c2410c] to-[#e67329] text-white shadow-md'
                    : 'bg-[#231b14] text-[#cfbfab] hover:text-white hover:bg-[#2d221a]'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Search and Secondary Filter Row */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 pt-3 border-t border-[#261d15]">
            {/* Search Input */}
            <div className="relative flex-1 max-w-md">
              <Search className="w-4 h-4 text-[#8a7a67] absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search by dish name, spice, or ingredients (e.g. oxtail, pap, rump)..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-[#12100e] border border-[#382b20] focus:border-[#e67329] focus:outline-none rounded-xl pl-10 pr-4 py-2 text-xs sm:text-sm text-[#faf5ee] placeholder:text-[#6e6150]"
              />
            </div>

            {/* Filter buttons */}
            <div className="flex items-center gap-1.5 flex-wrap">
              <button
                onClick={() => setFilterPreference('all')}
                className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors ${
                  filterPreference === 'all'
                    ? 'bg-[#3b2d21] text-[#f59e0b] border border-[#e67329]/40'
                    : 'text-[#9c8d7b] hover:text-[#faf5ee]'
                }`}
              >
                All Diets
              </button>
              <button
                onClick={() => setFilterPreference('popular')}
                className={`flex items-center gap-1 px-3 py-1.5 text-xs font-medium rounded-lg transition-colors ${
                  filterPreference === 'popular'
                    ? 'bg-[#3b2d21] text-[#f59e0b] border border-[#e67329]/40'
                    : 'text-[#9c8d7b] hover:text-[#faf5ee]'
                }`}
              >
                <Star className="w-3 h-3 text-[#f59e0b]" /> Favorites
              </button>
              <button
                onClick={() => setFilterPreference('spicy')}
                className={`flex items-center gap-1 px-3 py-1.5 text-xs font-medium rounded-lg transition-colors ${
                  filterPreference === 'spicy'
                    ? 'bg-[#3b2d21] text-[#e67329] border border-[#e67329]/40'
                    : 'text-[#9c8d7b] hover:text-[#faf5ee]'
                }`}
              >
                <Flame className="w-3 h-3 text-[#e67329]" /> Spicy
              </button>
              <button
                onClick={() => setFilterPreference('veg')}
                className={`flex items-center gap-1 px-3 py-1.5 text-xs font-medium rounded-lg transition-colors ${
                  filterPreference === 'veg'
                    ? 'bg-[#3b2d21] text-emerald-400 border border-emerald-500/40'
                    : 'text-[#9c8d7b] hover:text-[#faf5ee]'
                }`}
              >
                <Leaf className="w-3 h-3 text-emerald-400" /> Vegetarian
              </button>
            </div>
          </div>
        </div>

        {/* Menu Items Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
          {filteredItems.map((item) => (
            <div
              key={item.id}
              className="bg-[#18130e] border border-[#2b2118] hover:border-[#e67329]/50 rounded-2xl p-5 transition-all shadow-md flex flex-col justify-between"
            >
              <div>
                <div className="flex items-baseline justify-between gap-4 mb-2">
                  <div className="flex items-center gap-2">
                    <h3 className="font-serif text-lg font-bold text-[#faf5ee]">
                      {item.name}
                    </h3>
                    {item.isPopular && (
                      <span className="text-[10px] uppercase font-sans tracking-wide text-[#e67329] font-bold px-1.5 py-0.5 bg-[#e67329]/10 rounded border border-[#e67329]/30">
                        Popular
                      </span>
                    )}
                  </div>
                  <span className="font-serif font-bold text-lg text-[#f59e0b] whitespace-nowrap">
                    R{item.price}
                  </span>
                </div>

                <p className="text-xs text-[#b8a996] leading-relaxed mb-4">
                  {item.description}
                </p>
              </div>

              <div className="flex items-center justify-between pt-3 border-t border-[#231b14] text-xs">
                <div className="flex items-center gap-3">
                  {item.isSpicy && (
                    <span className="flex items-center gap-1 text-[#e67329]">
                      <Flame className="w-3 h-3" /> Spicy
                    </span>
                  )}
                  {item.isVegetarian && (
                    <span className="flex items-center gap-1 text-emerald-400">
                      <Leaf className="w-3 h-3" /> Veg
                    </span>
                  )}
                </div>

                <a
                  href={`tel:${RESTAURANT_INFO.phone}`}
                  className="px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 text-[#d4c5b3] hover:text-[#f59e0b] bg-[#261c14] hover:bg-[#382b20] border border-[#3d2e20] transition-colors"
                >
                  <Phone className="w-3 h-3 text-[#e67329]" />
                  <span>Call to Order: {RESTAURANT_INFO.phone}</span>
                </a>
              </div>
            </div>
          ))}
        </div>

        {filteredItems.length === 0 && (
          <div className="text-center py-16 bg-[#18130e] rounded-2xl border border-[#2b2118]">
            <p className="text-[#a39481] text-sm mb-3">No dishes found matching your search.</p>
            <button
              onClick={() => {
                setActiveCategory('all');
                setSearchQuery('');
                setFilterPreference('all');
              }}
              className="text-xs text-[#f59e0b] underline font-medium"
            >
              Reset all menu filters
            </button>
          </div>
        )}
      </div>
    </section>
  );
};
