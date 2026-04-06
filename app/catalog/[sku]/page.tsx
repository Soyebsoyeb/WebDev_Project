'use client';
import { useParams } from 'next/navigation';
import { inventoryMock } from '@/lib/data/inventory.mock';
import Image from 'next/image';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { useCartStore } from '@/lib/cartStore';
import { useState } from 'react';
import { Check, Box } from 'lucide-react';
import { ARViewer } from '@/components/ARViewer';
import { AnimatePresence } from 'framer-motion';

export default function ProductDetail() {
  const { sku } = useParams<{ sku: string }>();
  const item = inventoryMock.find(i => i.sku === sku);
  const addItem = useCartStore(state => state.addItem);
  const [added, setAdded] = useState(false);
  const [tier, setTier] = useState<'flex' | 'steady' | 'lock'>('steady');
  const [isAROpen, setIsAROpen] = useState(false);

  if (!item) return <div className="p-12 text-center text-xl">Item not found.</div>;

  const handleAdd = () => {
    addItem({ inventory: item, quantity: 1, tier, hasSwapProtection: false });
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  const getPrice = () => {
    if (tier === 'flex') return Math.round(item.monthly_price * 1.2);
    if (tier === 'lock') return Math.round(item.monthly_price * 0.85);
    return item.monthly_price;
  };

  return (
    <main className="mx-auto max-w-[1440px] px-4 md:px-8 py-12 flex-1 w-full relative">
      <div className="flex text-sm text-text-tertiary mb-8 gap-2">
        <span>Catalog</span>
        <span>/</span>
        <span>{item.category}</span>
        <span>/</span>
        <span className="text-text-primary font-medium">{item.name}</span>
      </div>

      <div className="flex flex-col lg:flex-row gap-12">
        {/* Left Gallery */}
        <div className="w-full lg:w-3/5 flex flex-col gap-4">
          <div className="relative aspect-[4/3] w-full rounded-2xl overflow-hidden bg-[var(--color-surface-elevation-1)] border border-gray-100">
            <Image src={item.images[0]} alt={item.name} fill className="object-cover" priority />
          </div>
          <div className="grid grid-cols-4 gap-4">
            {[1, 2, 3, 4].map(idx => (
               <div key={idx} className="relative aspect-square rounded-xl overflow-hidden bg-[var(--color-surface-elevation-1)] border-2 border-transparent hover:border-gray-200 cursor-pointer transition-colors">
                  <Image src={item.images[0]} alt="Thumbnail" fill className="object-cover opacity-80 hover:opacity-100" />
               </div>
            ))}
          </div>
        </div>

        {/* Right Details */}
        <div className="w-full lg:w-2/5 flex flex-col pt-2">
          <Badge variant="info" className="w-fit mb-4">{item.style}</Badge>
          <h1 className="font-serif text-4xl font-semibold leading-tight">{item.name}</h1>
          <div className="flex items-center gap-2 mt-2 mb-6">
            <span className="text-yellow-500 text-lg">★★★★★</span>
            <span className="text-sm text-text-tertiary">(128 reviews)</span>
          </div>

          <p className="text-text-secondary leading-relaxed mb-8">
            {item.description}
          </p>

          <div className="bg-[var(--color-surface-elevation-1)] rounded-2xl p-6 mb-8 border border-gray-100">
             <div className="flex justify-between items-end mb-6">
               <span className="text-sm font-medium text-text-secondary">Rental Tier</span>
               <span className="text-4xl font-bold text-[var(--color-accent)]">${getPrice()}<span className="text-lg font-normal text-text-secondary">/mo</span></span>
             </div>
             
             <div className="flex bg-[var(--color-surface)] rounded-xl p-1 mb-6 border border-gray-200 shadow-sm">
               {(['flex', 'steady', 'lock'] as const).map(t => (
                 <button 
                  key={t}
                  onClick={() => setTier(t)}
                  className={`flex-1 capitalize py-2.5 text-sm font-semibold rounded-lg transition-all duration-200 ${tier === t ? 'bg-[var(--color-accent)] text-white shadow-md' : 'text-text-secondary hover:bg-gray-50'}`}
                 >
                   {t}
                 </button>
               ))}
             </div>
             
             <div className="text-sm text-text-secondary mb-6 flex items-center justify-between">
                <span className="font-medium bg-gray-100 px-3 py-1 rounded-md">{tier === 'flex' ? '1 mo. min' : tier === 'steady' ? '6 mo. min' : '12 mo. min'}</span>
                <span className="text-[var(--color-success)] flex items-center gap-1 font-medium"><Check className="w-4 h-4"/> Swap allowable</span>
             </div>

             <div className="flex flex-col gap-3">
               <Button size="lg" className="w-full relative transition-all overflow-hidden group" onClick={handleAdd}>
                 {added ? (
                    <span className="flex items-center justify-center gap-2">
                      <Check className="w-5 h-5"/> Added to Cart
                    </span>
                 ) : (
                    "Add to Cart"
                 )}
               </Button>
               <Button onClick={() => setIsAROpen(true)} variant="secondary" size="lg" className="w-full flex items-center justify-center gap-2">
                 <Box className="w-5 h-5 opacity-70" /> Try in my room (3D)
               </Button>
             </div>
          </div>

          <div>
             <h3 className="font-semibold text-xl mb-4">Specifications</h3>
             <ul className="space-y-3 text-sm">
                <li className="flex justify-between border-b border-gray-100 pb-2"><span className="text-text-tertiary">Dimensions</span> <span className="font-medium text-text-primary">{item.dimensions}</span></li>
                <li className="flex justify-between border-b border-gray-100 pb-2"><span className="text-text-tertiary">Material</span> <span className="font-medium text-text-primary">{item.material}</span></li>
                <li className="flex justify-between border-b border-gray-100 pb-2"><span className="text-text-tertiary">SKU</span> <span className="font-medium text-text-primary">{item.sku}</span></li>
             </ul>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {isAROpen && <ARViewer item={item} onClose={() => setIsAROpen(false)} />}
      </AnimatePresence>
    </main>
  );
}
