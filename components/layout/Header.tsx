'use client';
import { useState } from 'react';
import Link from 'next/link';
import { ShoppingCart, Camera, LayoutDashboard, LogOut, Package } from 'lucide-react';
import { useCartStore } from '@/lib/cartStore';
import { useUserStore } from '@/lib/store';
import { toast } from 'sonner';
import { ARViewer } from '@/components/ARViewer';
import { AnimatePresence } from 'framer-motion';
import { inventoryMock } from '@/lib/data/inventory.mock';

export function Header() {
  const cartItems = useCartStore(state => state.items);
  const cartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);
  const { user, role, logout } = useUserStore();
  const [isGlobalAROpen, setIsGlobalAROpen] = useState(false);

  const handlePendingFeature = (feature: string) => {
    toast.info(`${feature} currently unlinked in UI mock.`, {
      description: "Action intercepted successfully."
    });
  };

  return (
    <header className="sticky top-0 z-50 w-full bg-white/70 backdrop-blur-2xl shadow-[0_8px_32px_0_rgba(31,38,135,0.04)] text-text-primary border-b border-white/40 transition-all">
      <div className="mx-auto flex h-24 max-w-[1440px] items-center justify-between px-4 md:px-8">
        <Link href="/" className="font-serif text-4xl font-bold tracking-tight text-[var(--color-accent)] hover:opacity-90 transition-opacity">
          Rentique
        </Link>
        
        <nav className="hidden md:flex gap-10">
          <Link href="/catalog" className="text-lg font-semibold tracking-wide text-text-primary hover:text-[var(--color-accent)] transition-colors relative group">
            Catalog
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[var(--color-accent)] transition-all group-hover:w-full"></span>
          </Link>
          <Link href="/quiz" className="text-lg font-semibold tracking-wide text-text-primary hover:text-[var(--color-accent)] transition-colors relative group">
            Find My Style
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[var(--color-accent)] transition-all group-hover:w-full"></span>
          </Link>
          <Link href="/admin/login" className="text-lg font-semibold tracking-wide text-gray-400 hover:text-[var(--color-accent)] transition-colors">
            Operator
          </Link>
        </nav>

        <div className="flex items-center gap-2 lg:gap-4">
          <button onClick={() => setIsGlobalAROpen(true)} className="p-3 hover:bg-black/5 rounded-full transition-colors hidden sm:block">
            <Camera className="w-6 h-6 text-gray-500" />
          </button>
          
          <Link href="/cart" className="relative p-3 hover:bg-black/5 rounded-full transition-colors mr-2">
            <ShoppingCart className="w-6 h-6 text-gray-500" />
            {cartCount > 0 && (
              <span className="absolute -top-0.5 -right-0.5 flex h-6 w-6 items-center justify-center rounded-full bg-[var(--color-accent)] text-xs text-white font-bold shadow-md ring-2 ring-white">
                {cartCount}
              </span>
            )}
          </Link>

          <div className="h-8 w-[1px] bg-gray-200 mx-2 hidden sm:block"></div>

          {user && role === 'renter' ? (
            <div className="flex items-center gap-3 group relative cursor-pointer p-2 pr-6 rounded-full hover:bg-black/5 transition-colors border border-transparent hover:border-gray-100">
              <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-[var(--color-accent)] to-[var(--color-accent-hover)] text-white flex items-center justify-center text-sm font-bold shadow-md ring-2 ring-white">
                 {user.name.charAt(0)}
              </div>
              <span className="text-base font-bold hidden md:block text-text-primary">{user.name}</span>
              
              {/* Dropdown Menu */}
              <div className="absolute top-16 right-0 w-56 bg-white/90 backdrop-blur-xl rounded-2xl shadow-[0_20px_40px_-10px_rgba(0,0,0,0.1)] border border-gray-100 opacity-0 pointer-events-none group-hover:opacity-100 group-hover:pointer-events-auto transition-all translate-y-3 group-hover:translate-y-0 p-3 z-50">
                 <div className="px-3 py-2 border-b border-gray-100 mb-2">
                   <p className="text-sm font-bold text-text-primary">{user.name}</p>
                   <p className="text-xs text-text-tertiary mt-0.5 truncate">{user.email}</p>
                 </div>
                 <Link href="/rentals" className="flex w-full items-center gap-2.5 px-3 py-2.5 text-sm hover:bg-gray-50 rounded-xl font-semibold text-text-secondary transition-colors">
                   <Package className="w-4 h-4"/> My Rentals
                 </Link>
                 <Link href="/catalog" className="flex items-center gap-2.5 px-3 py-2.5 text-sm hover:bg-gray-50 rounded-xl font-semibold text-text-secondary transition-colors">
                   <LayoutDashboard className="w-4 h-4"/> Browse Catalog
                 </Link>
                 <button onClick={() => {
                    logout();
                    toast.success("Successfully signed out.");
                 }} className="w-full mt-1 flex items-center gap-2.5 px-3 py-2.5 text-sm hover:bg-red-50 text-red-600 rounded-xl font-semibold transition-colors">
                   <LogOut className="w-4 h-4"/> Sign Out
                 </button>
              </div>
            </div>
          ) : (
            <Link href="/login" className="inline-flex h-12 items-center justify-center whitespace-nowrap rounded-full bg-[var(--color-accent)] px-8 text-base font-bold text-white transition-all shadow-[0_4px_12px_-4px_rgba(196,101,61,0.5)] hover:shadow-[0_8px_16px_-4px_rgba(196,101,61,0.6)] hover:scale-[1.02] active:scale-[0.98]">
              Sign In
            </Link>
          )}
        </div>
      </div>
      <AnimatePresence>
         {isGlobalAROpen && <ARViewer item={inventoryMock[0]} onClose={() => setIsGlobalAROpen(false)} />}
      </AnimatePresence>
    </header>
  );
}
