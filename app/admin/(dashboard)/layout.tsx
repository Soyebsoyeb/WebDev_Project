'use client';
import Link from 'next/link';
import { LayoutDashboard, Package, ShoppingBag, ArrowLeftRight, Users, Truck, LogOut } from 'lucide-react';
import { toast } from 'sonner';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen w-full bg-[var(--color-admin-background)]">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r border-gray-200 flex flex-col fixed h-full z-10">
         <div className="p-6 border-b border-gray-200">
           <div className="font-serif text-2xl font-bold text-[var(--color-admin-data-highlight)]">Rentique <span className="text-sm font-sans font-normal text-text-tertiary uppercase ml-2 tracking-widest">Admin</span></div>
         </div>
         <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
           <Link href="/admin" className="flex items-center gap-3 px-3 py-2.5 bg-gray-50 text-[var(--color-admin-data-highlight)] font-medium rounded-lg transition-colors">
             <LayoutDashboard className="w-5 h-5"/> Dashboard
           </Link>
           <Link href="/admin/inventory" className="flex items-center gap-3 px-3 py-2.5 text-text-secondary hover:bg-gray-50 hover:text-text-primary font-medium rounded-lg transition-colors">
             <Package className="w-5 h-5"/> Inventory
           </Link>
           <Link href="/admin/orders" className="flex items-center gap-3 px-3 py-2.5 text-[var(--color-text-secondary)] hover:bg-slate-50 hover:text-[var(--color-text-primary)] font-medium rounded-lg transition-colors">
             <ShoppingBag className="w-5 h-5"/> Orders
           </Link>
           <Link href="/admin/returns" className="flex items-center gap-3 px-3 py-2.5 text-[var(--color-text-secondary)] hover:bg-slate-50 hover:text-[var(--color-text-primary)] font-medium rounded-lg transition-colors">
             <ArrowLeftRight className="w-5 h-5"/> Returns
           </Link>
           <Link href="/admin/customers" className="flex items-center gap-3 px-3 py-2.5 text-[var(--color-text-secondary)] hover:bg-slate-50 hover:text-[var(--color-text-primary)] font-medium rounded-lg transition-colors">
             <Users className="w-5 h-5"/> Customers
           </Link>
           <Link href="/admin/logistics" className="flex items-center gap-3 px-3 py-2.5 text-[var(--color-text-secondary)] hover:bg-slate-50 hover:text-[var(--color-text-primary)] font-medium rounded-lg transition-colors">
             <Truck className="w-5 h-5"/> Logistics
           </Link>
         </nav>
         <div className="p-4 border-t border-gray-200">
            <Link href="/" className="flex items-center gap-3 px-3 py-2.5 text-text-secondary hover:bg-red-50 hover:text-red-600 font-medium rounded-lg transition-colors">
             <LogOut className="w-5 h-5"/> Exit to Store
           </Link>
         </div>
      </aside>
      
      {/* Main content */}
      <main className="flex-1 ml-64 flex flex-col min-h-screen">
        <header className="h-16 bg-white border-b border-gray-200 flex items-center px-8 justify-between sticky top-0 z-10 shadow-sm">
          <div className="font-medium text-lg text-slate-800">Command Center</div>
          <div className="flex gap-4 items-center">
             <div className="w-9 h-9 rounded-full bg-slate-200 border-2 border-white shadow-sm ring-2 ring-[var(--color-admin-data-highlight)] cursor-pointer"></div>
          </div>
        </header>
        <div className="p-8 flex-1">
          {children}
        </div>
      </main>
    </div>
  );
}
