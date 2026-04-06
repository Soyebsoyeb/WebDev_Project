'use client';
import { useCartStore } from '@/lib/cartStore';
import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/Button';
import { Trash2 } from 'lucide-react';

import { useRouter } from 'next/navigation';

export default function CartPage() {
  const { items, removeItem, totalMonthly } = useCartStore();
  const router = useRouter();

  const handleCheckout = () => {
    router.push('/checkout');
  };

  return (
    <main className="mx-auto max-w-[1440px] px-4 md:px-8 py-12 flex-1 w-full">
      <h1 className="font-serif text-4xl font-semibold mb-8">Your Cart</h1>
      
      {items.length === 0 ? (
        <div className="text-center py-20 bg-[var(--color-surface-elevation-1)] rounded-[24px]">
          <p className="text-text-secondary text-lg mb-6 tracking-tight">Your cart is feeling a bit empty.</p>
          <Link href="/catalog" className="inline-flex items-center justify-center whitespace-nowrap text-sm font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent bg-[var(--color-accent)] text-white hover:bg-[var(--color-accent-hover)] hover:scale-[1.02] active:scale-[0.98] rounded-full shadow-sm hover:shadow-md h-12 px-8 py-2">
            Browse Furniture
          </Link>
        </div>
      ) : (
        <div className="flex flex-col lg:flex-row gap-12">
          {/* Cart Items List */}
          <div className="flex-1 flex flex-col gap-6">
            {items.map(item => {
              const basePrice = item.inventory.monthly_price;
              const price = item.tier === 'flex' ? Math.round(basePrice * 1.2) : item.tier === 'lock' ? Math.round(basePrice * 0.85) : basePrice;

              return (
                 <div key={item.inventory.sku} className="flex gap-6 p-4 rounded-[24px] border border-gray-100 shadow-[var(--shadow-low)] bg-[var(--color-surface)]">
                   <div className="relative w-32 h-32 rounded-xl overflow-hidden bg-[var(--color-surface-elevation-1)] shrink-0">
                      <Image src={item.inventory.images[0]} alt={item.inventory.name} fill className="object-cover" />
                   </div>
                   <div className="flex-1 flex flex-col justify-between py-1">
                     <div className="flex justify-between">
                       <div>
                         <h3 className="font-sans font-semibold text-lg">{item.inventory.name}</h3>
                         <div className="inline-flex mt-1 text-xs font-medium text-text-secondary bg-gray-100 px-2 py-0.5 rounded capitalize">Tier: {item.tier}</div>
                       </div>
                       <button onClick={() => removeItem(item.inventory.sku)} className="text-gray-400 hover:text-red-500 transition-colors bg-gray-50 hover:bg-red-50 p-2 rounded-full h-fit">
                         <Trash2 className="w-5 h-5" />
                       </button>
                     </div>
                     <div className="flex justify-between items-end">
                       <span className="text-sm font-medium text-text-secondary">Qty: {item.quantity}</span>
                       <span className="font-bold text-xl">${price}/mo</span>
                     </div>
                   </div>
                 </div>
              );
            })}
          </div>

          {/* Cart Summary pane */}
          <div className="w-full lg:w-[400px]">
            <div className="bg-[var(--color-surface-elevation-1)] rounded-[24px] p-8 border border-gray-200 sticky top-24">
              <h2 className="font-sans font-semibold text-2xl mb-6">Order Summary</h2>
              
              <div className="space-y-4 text-[15px] mb-6 pb-6 border-b border-gray-200">
                <div className="flex justify-between">
                  <span className="text-text-secondary">Monthly Subtotal</span>
                  <span className="font-medium">${totalMonthly()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-text-secondary">Swap Protection</span>
                  <span className="font-medium text-text-tertiary">Optional ($5/mo)</span>
                </div>
              </div>

              <div className="flex justify-between items-end mb-8">
                <span className="font-medium text-text-primary text-lg">Total Monthly</span>
                <span className="text-4xl font-bold text-[var(--color-accent)]">${totalMonthly()}</span>
              </div>

              <Button size="lg" className="w-full" onClick={handleCheckout}>
                Proceed to Checkout
              </Button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
