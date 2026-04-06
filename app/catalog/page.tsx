'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/Card';
import { Input } from '@/components/ui/Input';
import { inventoryMock } from '@/lib/data/inventory.mock';
import Image from 'next/image';
import { Search, Filter, X, Check } from 'lucide-react';

export default function Catalog() {
  const [activeCategory, setActiveCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  
  // Advanced Filter States
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [selectedStyles, setSelectedStyles] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState('all');
  const [sortOrder, setSortOrder] = useState('featured');

  const categories = ['All', 'Living', 'Bedroom', 'Office', 'Any'];
  const availableStyles = Array.from(new Set(inventoryMock.map(i => i.style))).sort();

  // Disable body scroll when drawer is open
  useEffect(() => {
    if (isFilterOpen) document.body.style.overflow = 'hidden';
    else document.body.style.overflow = 'unset';
    return () => { document.body.style.overflow = 'unset'; }
  }, [isFilterOpen]);

  const toggleStyle = (style: string) => {
     if (selectedStyles.includes(style)) {
        setSelectedStyles(selectedStyles.filter(s => s !== style));
     } else {
        setSelectedStyles([...selectedStyles, style]);
     }
  };

  const getFilteredItems = () => {
    let result = [...inventoryMock];

    // 1. Text Search
    if (searchQuery) {
       result = result.filter(item => 
          item.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
          item.style.toLowerCase().includes(searchQuery.toLowerCase())
       );
    }

    // 2. Room Category
    if (activeCategory !== 'All') {
       result = result.filter(item => item.category === activeCategory || item.category === 'Any');
    }

    // 3. Styles
    if (selectedStyles.length > 0) {
       result = result.filter(item => selectedStyles.includes(item.style));
    }

    // 4. Price Bracket
    if (priceRange === 'under30') result = result.filter(item => item.monthly_price < 30);
    if (priceRange === '30to60') result = result.filter(item => item.monthly_price >= 30 && item.monthly_price <= 60);
    if (priceRange === 'over60') result = result.filter(item => item.monthly_price > 60);

    // 5. Sorting
    if (sortOrder === 'priceAsc') result.sort((a,b) => a.monthly_price - b.monthly_price);
    if (sortOrder === 'priceDesc') result.sort((a,b) => b.monthly_price - a.monthly_price);

    return result;
  };

  const filteredItems = getFilteredItems();
  const activeFiltersCount = selectedStyles.length + (priceRange !== 'all' ? 1 : 0) + (sortOrder !== 'featured' ? 1 : 0);

  return (
    <main className="mx-auto max-w-[1440px] px-6 md:px-16 py-16 w-full flex-1 bg-[var(--color-background)] relative">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-8">
        <div>
          <h1 className="font-serif text-5xl font-bold tracking-tight text-[var(--color-text-primary)] drop-shadow-sm">Furniture Catalog</h1>
          <p className="text-[var(--color-text-secondary)] mt-3 text-lg font-medium">Discover pieces that elevate your space.</p>
        </div>
        <div className="relative w-full md:w-96 group z-0">
          <Input 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search silhouettes or styles..." 
            className="pr-12 h-14 rounded-full text-base font-medium shadow-sm border-[var(--color-surface-elevation-1)] focus:shadow-md transition-all pl-6" 
          />
          <button className="absolute right-2 top-2 h-10 w-10 bg-[var(--color-accent)] hover:bg-[var(--color-accent-hover)] text-white rounded-full flex items-center justify-center transition-colors">
            <Search className="h-5 w-5" />
          </button>
        </div>
      </div>

      <div className="flex gap-4 mb-12 overflow-x-auto pb-4 scrollbar-hide items-center">
        {categories.map((category) => (
           <button 
             key={category}
             onClick={() => setActiveCategory(category)}
             className={`text-sm px-6 py-2.5 rounded-full font-bold transition-all shadow-sm ${activeCategory === category ? 'bg-slate-900 text-white scale-[1.02]' : 'bg-[var(--color-surface)] text-[var(--color-text-secondary)] hover:bg-[var(--color-surface-elevation-1)] border border-[var(--color-surface-elevation-1)]'}`}
           >
             {category === 'Any' ? 'Decor' : category}
           </button>
        ))}
        
        <div className="w-[1px] h-8 bg-[var(--color-surface-elevation-1)] mx-2 hidden sm:block"></div>

        <button 
           onClick={() => setIsFilterOpen(true)} 
           className="text-sm px-6 py-2.5 rounded-full font-bold transition-all shadow-sm bg-[var(--color-surface)] text-[var(--color-text-primary)] hover:border-[var(--color-accent)] border-2 border-transparent flex items-center gap-2 relative ring-1 ring-[var(--color-surface-elevation-1)]"
        >
           <Filter className="w-4 h-4"/> 
           Filters & Sort
           {activeFiltersCount > 0 && (
              <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-[var(--color-accent)] text-white text-xs flex items-center justify-center border-2 border-white">{activeFiltersCount}</span>
           )}
        </button>
      </div>

      {/* Main Grid */}
      {filteredItems.length === 0 ? (
        <div className="text-center py-32 bg-[var(--color-surface)] rounded-[32px] border border-[var(--color-surface-elevation-1)] shadow-sm">
           <p className="text-xl text-[var(--color-text-secondary)] font-medium">No pieces found matching your exact criteria.</p>
           <button onClick={() => { setActiveCategory('All'); setSearchQuery(''); setSelectedStyles([]); setPriceRange('all'); setSortOrder('featured'); }} className="mt-6 px-8 py-3 rounded-full border-2 border-[var(--color-accent)] text-[var(--color-accent)] font-bold hover:bg-[var(--color-accent)] hover:text-white transition-colors">Clear all filters</button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {filteredItems.map(item => (
            <Link key={item.id} href={`/catalog/${item.sku}`}>
              <Card className="h-full flex flex-col cursor-pointer border-none shadow-sm hover:shadow-xl transition-all duration-300 bg-[var(--color-surface)] rounded-[32px] group overflow-hidden hover:-translate-y-2">
                <div className="relative h-[320px] w-full overflow-hidden bg-[var(--color-surface-elevation-1)]">
                  <Image 
                    src={item.images[0] || 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=1600&q=80'} 
                    alt={item.name} 
                    fill 
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors duration-500" />
                </div>
                <CardContent className="p-8 flex-grow flex flex-col justify-between">
                  <div>
                    <h3 className="font-sans font-bold text-xl text-[var(--color-text-primary)] group-hover:text-[var(--color-accent)] transition-colors">{item.name}</h3>
                    <p className="text-xs font-bold text-[var(--color-text-secondary)] bg-[var(--color-surface-elevation-1)] w-fit px-2.5 py-1 rounded-lg mt-3 uppercase tracking-widest">{item.style}</p>
                  </div>
                  <div className="mt-6 font-extrabold text-[var(--color-accent)] text-2xl border-t border-[var(--color-surface-elevation-1)] pt-5">
                    ${item.monthly_price} <span className="text-sm font-medium text-[var(--color-text-tertiary)]">/ mo</span>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      )}

      {/* Slide-over Overlay */}
      <AnimatePresence>
        {isFilterOpen && (
          <div className="fixed inset-0 z-50 flex justify-end">
            <motion.div 
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }} 
              exit={{ opacity: 0 }} 
              onClick={() => setIsFilterOpen(false)}
              className="absolute inset-0 bg-black/30 backdrop-blur-sm"
            />
            
            <motion.div 
               initial={{ x: '100%' }} 
               animate={{ x: 0 }} 
               exit={{ x: '100%' }} 
               transition={{ type: 'spring', damping: 25, stiffness: 200 }}
               className="w-full max-w-md h-full bg-[var(--color-surface)] shadow-2xl relative z-10 flex flex-col overflow-y-auto"
            >
               <div className="flex items-center justify-between p-8 border-b border-[var(--color-surface-elevation-1)] sticky top-0 bg-[var(--color-surface)]/80 backdrop-blur-lg z-20">
                  <h2 className="text-2xl font-serif font-bold text-[var(--color-text-primary)]">Filter & Sort</h2>
                  <button onClick={() => setIsFilterOpen(false)} className="p-2 hover:bg-slate-100 rounded-full transition-colors">
                     <X className="w-6 h-6 text-slate-500" />
                  </button>
               </div>

               <div className="p-8 space-y-10 flex-1">
                  {/* Sorting */}
                  <div>
                    <h3 className="text-sm font-bold uppercase tracking-widest text-[var(--color-text-secondary)] mb-4">Sort By</h3>
                    <div className="flex flex-col gap-3">
                       {[{id:'featured', label:'Featured Matches'}, {id:'priceAsc', label:'Price: Low to High'}, {id:'priceDesc', label:'Price: High to Low'}].map(o => (
                         <label key={o.id} className="flex items-center gap-3 cursor-pointer group">
                            <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-colors ${sortOrder === o.id ? 'border-[var(--color-accent)] bg-[var(--color-accent)]' : 'border-slate-300 group-hover:border-[var(--color-accent)]'}`}>
                               {sortOrder === o.id && <div className="w-2 h-2 bg-white rounded-full" />}
                            </div>
                            <span className={`font-semibold ${sortOrder === o.id ? 'text-[var(--color-text-primary)]' : 'text-slate-500'}`}>{o.label}</span>
                            <input type="radio" className="hidden" checked={sortOrder === o.id} onChange={() => setSortOrder(o.id)} />
                         </label>
                       ))}
                    </div>
                  </div>

                  {/* Price */}
                  <div>
                    <h3 className="text-sm font-bold uppercase tracking-widest text-[var(--color-text-secondary)] mb-4">Price Bracket</h3>
                    <div className="flex flex-wrap gap-3">
                       {[{id:'all', label:'All Prices'}, {id:'under30', label:'Under $30/mo'}, {id:'30to60', label:'$30 - $60/mo'}, {id:'over60', label:'Over $60/mo'}].map(p => (
                         <button 
                           key={p.id}
                           onClick={() => setPriceRange(p.id)}
                           className={`px-4 py-2 rounded-xl text-sm font-bold border transition-colors ${priceRange === p.id ? 'bg-[var(--color-accent)]/10 border-[var(--color-accent)] text-[var(--color-accent)]' : 'bg-transparent border-slate-200 text-slate-600 hover:border-slate-400'}`}
                         >
                           {p.label}
                         </button>
                       ))}
                    </div>
                  </div>

                  {/* Styles */}
                  <div>
                    <h3 className="text-sm font-bold uppercase tracking-widest text-[var(--color-text-secondary)] mb-4">Interior Styles</h3>
                    <div className="flex flex-col gap-4">
                       {availableStyles.map(style => (
                         <label key={style} className="flex items-center gap-4 cursor-pointer group">
                           <div className={`w-6 h-6 border-2 rounded transition-all flex items-center justify-center ${selectedStyles.includes(style) ? 'bg-slate-900 border-slate-900 text-white' : 'border-slate-300 group-hover:border-slate-500 bg-white'}`}>
                              {selectedStyles.includes(style) && <Check className="w-4 h-4" />}
                           </div>
                           <span className="font-semibold text-slate-700">{style}</span>
                           <input type="checkbox" className="hidden" checked={selectedStyles.includes(style)} onChange={() => toggleStyle(style)} />
                         </label>
                       ))}
                    </div>
                  </div>
               </div>

               <div className="p-8 border-t border-[var(--color-surface-elevation-1)] sticky bottom-0 bg-[var(--color-surface)]">
                  <button onClick={() => setIsFilterOpen(false)} className="w-full h-14 rounded-full bg-[var(--color-accent)] hover:bg-[var(--color-accent-hover)] text-white font-bold text-lg shadow-lg hover:scale-[1.02] active:scale-[0.98] transition-all">
                     View {filteredItems.length} Products
                  </button>
                  <button onClick={() => { setSelectedStyles([]); setPriceRange('all'); setSortOrder('featured'); }} className="w-full mt-4 text-sm font-bold text-slate-500 hover:text-slate-800 transition-colors">
                     Reset all filters
                  </button>
               </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </main>
  );
}
