'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useCartStore } from '@/lib/cartStore';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { toast } from 'sonner';
import { motion, AnimatePresence } from 'framer-motion';
import { Lock, ShieldCheck, CheckCircle2, CreditCard, Apple, Loader2 } from 'lucide-react';
import Image from 'next/image';

export default function CheckoutPage() {
  const router = useRouter();
  const { items, totalMonthly, clearCart } = useCartStore();
  const [isProcessing, setIsProcessing] = useState(false);
  const [success, setSuccess] = useState(false);

  // Redirect to cart if empty
  useEffect(() => {
    if (items.length === 0 && !success) {
       router.push('/cart');
    }
  }, [items, router, success]);

  if (items.length === 0 && !success) return null;

  const handlePayment = (e: React.FormEvent) => {
     e.preventDefault();
     setIsProcessing(true);
     toast.loading('Contacting payment gateway...', { id: 'pay' });

     setTimeout(() => {
        setIsProcessing(false);
        setSuccess(true);
        toast.success('Payment successful! Subscription active.', { id: 'pay' });
        clearCart();

        setTimeout(() => {
           router.push('/rentals');
        }, 3000); // Route to dashboard after seeing celebration
     }, 2500);
  };

  return (
    <main className="mx-auto max-w-[1440px] px-4 md:px-8 py-12 flex-1 w-full relative">
      <AnimatePresence>
         {success && (
            <motion.div 
               initial={{ opacity: 0 }} animate={{ opacity: 1 }}
               className="fixed inset-0 z-50 bg-[var(--color-background)] flex flex-col items-center justify-center p-6 text-center"
            >
               <motion.div 
                  initial={{ scale: 0.5, rotate: -180 }} animate={{ scale: 1, rotate: 0 }} transition={{ type: "spring", damping: 15 }}
                  className="w-32 h-32 rounded-full bg-green-500/20 flex items-center justify-center mb-8"
               >
                  <CheckCircle2 className="w-16 h-16 text-green-500" />
               </motion.div>
               <h1 className="font-serif text-5xl font-bold mb-4 text-[var(--color-text-primary)]">Payment Successful!</h1>
               <p className="text-xl text-[var(--color-text-secondary)] mb-8 max-w-lg">Your furniture subscription has been confirmed. Redirecting you to your delivery dashboard...</p>
               <Loader2 className="w-8 h-8 text-[var(--color-accent)] animate-spin" />
            </motion.div>
         )}
      </AnimatePresence>

      <div className="flex items-center gap-2 text-sm text-[var(--color-text-tertiary)] mb-8 font-medium">
         <span>Cart</span> <span>/</span> <span className="text-[var(--color-text-primary)]">Checkout</span>
      </div>

      <div className="flex flex-col-reverse lg:flex-row gap-16">
        {/* Left Form Panel */}
        <div className="flex-1 w-full max-w-2xl">
           <form onSubmit={handlePayment} className="space-y-12">
              
              {/* Contact Information */}
              <section>
                 <h2 className="font-sans font-bold text-2xl mb-6 text-[var(--color-text-primary)]">Contact Information</h2>
                 <div className="space-y-4">
                    <Input required type="email" placeholder="Email address" className="h-14 rounded-xl bg-[var(--color-surface-elevation-1)] text-[var(--color-text-primary)] border-transparent" />
                    <Input required type="tel" placeholder="Phone number" className="h-14 rounded-xl bg-[var(--color-surface-elevation-1)] text-[var(--color-text-primary)] border-transparent" />
                 </div>
              </section>

              {/* Shipping Address */}
              <section>
                 <h2 className="font-sans font-bold text-2xl mb-6 text-[var(--color-text-primary)]">Delivery Address</h2>
                 <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                       <Input required placeholder="First Name" className="h-14 rounded-xl bg-[var(--color-surface-elevation-1)] text-[var(--color-text-primary)] border-transparent" />
                       <Input required placeholder="Last Name" className="h-14 rounded-xl bg-[var(--color-surface-elevation-1)] text-[var(--color-text-primary)] border-transparent" />
                    </div>
                    <Input required placeholder="Street Address" className="h-14 rounded-xl bg-[var(--color-surface-elevation-1)] text-[var(--color-text-primary)] border-transparent" />
                    <Input placeholder="Apartment, suite, etc. (optional)" className="h-14 rounded-xl bg-[var(--color-surface-elevation-1)] text-[var(--color-text-primary)] border-transparent" />
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                       <Input required placeholder="City" className="h-14 rounded-xl bg-[var(--color-surface-elevation-1)] text-[var(--color-text-primary)] border-transparent md:col-span-1" />
                       <Input required placeholder="State" className="h-14 rounded-xl bg-[var(--color-surface-elevation-1)] text-[var(--color-text-primary)] border-transparent" />
                       <Input required placeholder="Zip Code" className="h-14 rounded-xl bg-[var(--color-surface-elevation-1)] text-[var(--color-text-primary)] border-transparent" />
                    </div>
                 </div>
              </section>

              {/* Payment Processing */}
              <section>
                 <div className="flex justify-between items-end mb-6">
                    <h2 className="font-sans font-bold text-2xl text-[var(--color-text-primary)]">Payment Engine</h2>
                    <div className="flex items-center gap-1 text-xs font-bold text-[var(--color-text-tertiary)]">
                       <Lock className="w-3 h-3" /> SECURE 256-BIT SSL
                    </div>
                 </div>

                 <div className="border border-[var(--color-surface-elevation-1)] rounded-2xl p-6 bg-[var(--color-surface)] shadow-xl relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-[var(--color-accent)]/10 rounded-full blur-3xl -mr-10 -mt-10 pointer-events-none" />
                    
                    {/* Simulated Express Checkout */}
                    <div className="flex gap-4 mb-8">
                       <button type="button" disabled className="h-12 flex-1 bg-black text-white hover:bg-gray-800 rounded-xl flex items-center justify-center font-bold tracking-tight gap-1 transition-colors">
                          <Apple className="w-5 h-5 -mt-0.5" /> Pay
                       </button>
                    </div>

                    <div className="flex items-center gap-4 mb-8 text-xs font-bold text-[var(--color-text-tertiary)] uppercase tracking-widest">
                       <div className="flex-1 h-px bg-[var(--color-surface-elevation-1)]" /> OR PAY WITH CARD <div className="flex-1 h-px bg-[var(--color-surface-elevation-1)]" />
                    </div>

                    <div className="space-y-4 relative z-10">
                       <div className="relative">
                          <Input required placeholder="Card number" className="h-14 rounded-xl bg-[var(--color-surface-elevation-1)] pl-12 font-mono text-lg text-[var(--color-text-primary)] border-transparent" maxLength={19} pattern="[0-9]*" />
                          <CreditCard className="absolute left-4 top-4 text-[var(--color-text-tertiary)] w-6 h-6" />
                       </div>
                       <div className="grid grid-cols-2 gap-4">
                          <Input required placeholder="MM / YY" className="h-14 rounded-xl bg-[var(--color-surface-elevation-1)] font-mono text-center text-lg text-[var(--color-text-primary)] border-transparent" maxLength={5} />
                          <Input required placeholder="CVC" type="password" className="h-14 rounded-xl bg-[var(--color-surface-elevation-1)] font-mono text-center text-lg text-[var(--color-text-primary)] border-transparent" maxLength={4} />
                       </div>
                       <Input required placeholder="Name on card" className="h-14 rounded-xl bg-[var(--color-surface-elevation-1)] text-[var(--color-text-primary)] border-transparent" />
                    </div>
                 </div>
              </section>

              <Button 
                 type="submit" 
                 size="lg" 
                 disabled={isProcessing || success}
                 className="w-full h-16 text-lg tracking-wide rounded-2xl mt-8 flex items-center justify-center transition-all bg-[var(--color-text-primary)] text-[var(--color-surface)] hover:scale-[1.01] shadow-[0_8px_30px_rgba(0,0,0,0.12)] disabled:opacity-90 relative overflow-hidden group border-none"
              >
                 {isProcessing && <motion.div initial={{width:0}} animate={{width:'100%'}} transition={{duration:2.5}} className="absolute bottom-0 left-0 h-1.5 bg-[var(--color-accent)]" />}
                 
                 {isProcessing ? (
                    <span className="flex items-center gap-3 relative z-10">
                       <Loader2 className="w-5 h-5 animate-spin" /> Processing Payment...
                    </span>
                 ) : (
                    <span className="flex items-center gap-2 relative z-10 font-bold">
                       <Lock className="w-4 h-4 opacity-70" /> Pay ${totalMonthly()} & Subscribe
                    </span>
                 )}
              </Button>
           </form>
        </div>

        {/* Right Info Panel - Order Summary */}
        <div className="w-full lg:w-[450px]">
           <div className="bg-[var(--color-surface)] rounded-[32px] p-8 border border-[var(--color-surface-elevation-1)] shadow-sm sticky top-24">
              <h3 className="font-serif font-bold text-2xl mb-6 text-[var(--color-text-primary)]">Order Summary</h3>

              <div className="space-y-6 mb-8 max-h-[300px] overflow-y-auto pr-2 scrollbar-hide">
                 {items.map(item => (
                    <div key={item.inventory.sku} className="flex gap-4 items-center">
                       <div className="relative w-16 h-16 rounded-xl bg-[var(--color-surface-elevation-1)] border border-[var(--color-surface-elevation-1)] overflow-hidden shrink-0">
                          <Image src={item.inventory.images[0]} alt={item.inventory.name} fill className="object-cover" />
                          <div className="absolute -top-2 -right-2 w-6 h-6 bg-[var(--color-text-primary)] text-[var(--color-surface)] rounded-full text-xs font-bold flex items-center justify-center">
                             {item.quantity}
                          </div>
                       </div>
                       <div className="flex-1">
                          <p className="font-bold text-sm leading-tight text-[var(--color-text-primary)]">{item.inventory.name}</p>
                          <p className="text-xs text-[var(--color-text-secondary)] mt-1 capitalize">Tier: {item.tier}</p>
                       </div>
                       <div className="font-bold text-[var(--color-text-primary)]">${item.inventory.monthly_price * item.quantity}/mo</div>
                    </div>
                 ))}
              </div>

              <div className="space-y-3 pt-6 border-t border-[var(--color-surface-elevation-1)] text-sm font-medium text-[var(--color-text-secondary)]">
                 <div className="flex justify-between">
                    <span>Monthly Subtotal</span>
                    <span className="text-[var(--color-text-primary)] font-bold">${totalMonthly()}</span>
                 </div>
                 <div className="flex justify-between items-center">
                    <span>White-glove Delivery</span>
                    <span className="text-green-500 font-bold uppercase tracking-wider text-xs bg-green-500/10 px-2 py-0.5 rounded">Free</span>
                 </div>
                 <div className="flex justify-between">
                    <span>Estimated Tax</span>
                    <span className="text-[var(--color-text-primary)] font-bold">${Math.round(totalMonthly() * 0.0825)}</span>
                 </div>
              </div>

              <div className="mt-6 pt-6 border-t border-[var(--color-surface-elevation-1)]">
                 <div className="flex justify-between items-end mb-2">
                    <span className="text-[var(--color-text-primary)] font-bold text-lg">Total Due Today</span>
                    <span className="text-4xl font-black text-[var(--color-accent)] tracking-tighter">${totalMonthly() + Math.round(totalMonthly() * 0.0825)}</span>
                 </div>
                 <p className="text-xs text-[var(--color-text-tertiary)] text-right">Includes applicable taxes</p>
              </div>

              <div className="mt-8 bg-blue-500/10 border border-blue-500/20 rounded-xl p-4 flex gap-3 text-blue-800 dark:text-blue-300">
                 <ShieldCheck className="w-5 h-5 shrink-0 text-blue-500" />
                 <div>
                   <p className="font-bold text-sm text-blue-600 dark:text-blue-400">Rentique Guarantee</p>
                   <p className="text-xs font-medium mt-1 opacity-80 leading-relaxed text-blue-800/70 dark:text-blue-200/70">Cancel anytime. Free swaps on select tiers. 100% insured against minor damages.</p>
                 </div>
              </div>
           </div>
        </div>
      </div>
    </main>
  );
}
