'use client';
import { useUserStore } from '@/lib/store';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { Package, CalendarClock, CreditCard, RefreshCcw, ChevronRight, AlertCircle, ArrowLeftRight } from 'lucide-react';
import Image from 'next/image';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { toast } from 'sonner';

const mockActiveRentals = [
  { 
    id: 'SUB-A8B9C',
    name: 'Etta Velvet Sofa', 
    price: 45, 
    status: 'Active', 
    nextBilling: 'Nov 01, 2026', 
    image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=800&q=80',
    monthsRented: 4
  },
  { 
    id: 'SUB-X9Y2Z',
    name: 'Scandi Wood Coffee Table', 
    price: 22, 
    status: 'Pending Delivery', 
    deliveryDate: 'Tomorrow, 9:00 AM - 12:00 PM', 
    image: 'https://images.unsplash.com/photo-1533090481720-856c6e3c1fdc?w=800&q=80',
    monthsRented: 0
  }
];

export default function MyRentals() {
  const { user, role } = useUserStore();
  const router = useRouter();

  useEffect(() => {
    if (!user || role !== 'renter') {
      toast.error('Authentication required to view rentals.');
      router.push('/login');
    }
  }, [user, role, router]);

  if (!user) return null;

  return (
    <div className="min-h-screen bg-[var(--color-surface)] py-16 px-6">
      <div className="max-w-5xl mx-auto w-full">
        <h1 className="text-4xl font-sans font-black text-[var(--color-text-primary)] tracking-tight mb-2">My Rentals Dashboard</h1>
        <p className="text-lg text-[var(--color-text-secondary)] mb-10 font-medium tracking-wide">Manage your active subscriptions and deliveries.</p>

        {/* Dashboard Overview Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
           <div className="bg-[var(--color-surface)] rounded-3xl p-6 border border-[var(--color-surface-elevation-1)] shadow-sm">
             <div className="flex items-center gap-3 text-[var(--color-text-secondary)] mb-3">
               <Package className="w-5 h-5" /> <span className="font-bold text-sm uppercase tracking-wider">Active Items</span>
             </div>
             <div className="text-4xl font-black text-[var(--color-text-primary)]">2</div>
           </div>
           
           <div className="bg-[var(--color-surface)] rounded-3xl p-6 border border-[var(--color-surface-elevation-1)] shadow-sm">
             <div className="flex items-center gap-3 text-[var(--color-text-secondary)] mb-3">
               <CalendarClock className="w-5 h-5" /> <span className="font-bold text-sm uppercase tracking-wider">Next Billing</span>
             </div>
             <div className="text-3xl font-black text-[var(--color-text-primary)]">Nov 01</div>
             <div className="text-sm font-bold text-[var(--color-text-secondary)] mt-1">$67.00 Total</div>
           </div>

           <div className="bg-slate-900 shadow-[var(--shadow-medium)] text-white rounded-3xl p-6 shadow-md flex justify-between flex-col relative overflow-hidden group cursor-pointer hover:bg-slate-800 transition-colors">
             <div className="absolute right-0 top-0 w-32 h-32 bg-white/5 rounded-full blur-2xl -mt-10 -mr-10" />
             <div className="flex items-center gap-3 text-slate-300 mb-3 relative z-10">
               <CreditCard className="w-5 h-5" /> <span className="font-bold text-sm uppercase tracking-wider">Payment Method</span>
             </div>
             <div className="text-lg font-mono font-bold tracking-widest relative z-10 text-white">**** **** 4242</div>
             <div className="text-xs font-bold text-blue-400 mt-1 uppercase relative z-10 flex items-center justify-between tracking-wider">
                Visa via Stripe <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
             </div>
           </div>
        </div>

        <h2 className="text-2xl font-sans font-black text-[var(--color-text-primary)] mb-6 tracking-tight">Current Subscriptions</h2>
        
        <div className="space-y-6">
          {mockActiveRentals.map(rental => (
            <div key={rental.id} className="bg-[var(--color-surface)] rounded-[32px] p-6 sm:p-8 border border-[var(--color-surface-elevation-1)] flex flex-col md:flex-row gap-8 shadow-sm hover:shadow-[var(--shadow-medium)] transition-shadow">
               {/* Image */}
               <div className="relative w-full md:w-56 h-48 md:h-full bg-slate-50 rounded-2xl overflow-hidden shrink-0">
                  <Image src={rental.image} alt={rental.name} fill className="object-cover" />
               </div>

               {/* Content */}
               <div className="flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex justify-between items-start mb-2">
                       <h3 className="text-2xl font-bold text-[var(--color-text-primary)]">{rental.name}</h3>
                       <Badge variant={rental.status === 'Active' ? 'success' : 'warning'} className="uppercase tracking-widest text-[10px] px-3">
                         {rental.status}
                       </Badge>
                    </div>
                    <p className="text-slate-400 font-mono text-xs font-bold mb-6">{rental.id}</p>

                    {rental.status === 'Pending Delivery' ? (
                       <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 flex gap-3 text-amber-800">
                          <AlertCircle className="w-5 h-5 shrink-0" />
                          <div>
                            <p className="font-bold text-sm">Scheduled Delivery</p>
                            <p className="text-sm font-medium mt-0.5">{rental.deliveryDate}</p>
                          </div>
                       </div>
                    ) : (
                       <div className="grid grid-cols-2 gap-4 max-w-sm">
                          <div>
                            <p className="text-[10px] uppercase tracking-widest text-slate-400 font-bold">Monthly Rate</p>
                            <p className="text-lg font-bold text-[var(--color-text-primary)]">${rental.price}<span className="text-sm text-slate-400">/mo</span></p>
                          </div>
                          <div>
                            <p className="text-[10px] uppercase tracking-widest text-slate-400 font-bold">Tenure</p>
                            <p className="text-lg font-bold text-[var(--color-text-primary)]">{rental.monthsRented} Months</p>
                          </div>
                       </div>
                    )}
                  </div>

                  <div className="mt-8 pt-6 border-t border-[var(--color-surface-elevation-1)] flex flex-wrap gap-4">
                     <Button variant="secondary" onClick={() => toast.info('Initiating RMA Swap protocol...')} className="rounded-xl bg-white flex-1 sm:flex-none">
                       <ArrowLeftRight className="w-4 h-4 mr-2" /> Swap Item
                     </Button>
                     <Button variant="secondary" onClick={() => toast.info('Return process initiated. Route scheduled.')} className="rounded-xl bg-white flex-1 sm:flex-none">
                       <RefreshCcw className="w-4 h-4 mr-2" /> Return
                     </Button>
                     <Button variant="secondary" className="rounded-xl lg:ml-auto w-full lg:w-auto font-bold bg-slate-100 text-slate-700 hover:bg-slate-200">
                       Subscription Details
                     </Button>
                  </div>
               </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
