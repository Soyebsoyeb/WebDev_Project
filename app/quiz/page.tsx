'use client';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/Card';
import { inventoryMock } from '@/lib/data/inventory.mock';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, ArrowLeft, RefreshCw, Sparkles, CheckCircle2 } from 'lucide-react';
import { toast } from 'sonner';

export default function StyleQuiz() {
  const [step, setStep] = useState(1);
  const [vibe, setVibe] = useState('');
  const [room, setRoom] = useState('');
  const [isCalculating, setIsCalculating] = useState(false);
  const [showResults, setShowResults] = useState(false);

  const handleNext = () => {
    if (step === 1 && vibe) setStep(2);
    else if (step === 2 && room) {
       setIsCalculating(true);
       toast.loading('Analyzing your preferences...', { id: 'quiz' });
       setTimeout(() => {
          setIsCalculating(false);
          setShowResults(true);
          toast.success('Style match complete!', { id: 'quiz' });
       }, 2500);
    }
  };

  const getRecommendations = () => {
     let recommended = [...inventoryMock];
     
     // Room filter
     if (room === 'Living') recommended = recommended.filter(i => i.category === 'Living' || i.category === 'Any');
     else if (room === 'Office') recommended = recommended.filter(i => i.category === 'Office' || i.category === 'Any');
     else if (room === 'Bedroom') recommended = recommended.filter(i => i.category === 'Bedroom' || i.category === 'Any');

     // Vibe filter
     if (vibe === 'Warm') {
        recommended = recommended.filter(item => ['Mid-Century', 'Japandi', 'Bohemian'].includes(item.style));
     } else if (vibe === 'Airy') {
        recommended = recommended.filter(item => ['Scandi', 'Minimalist', 'Japandi'].includes(item.style));
     } else if (vibe === 'Moody') {
        recommended = recommended.filter(item => ['Industrial', 'Maximalist', 'Modern'].includes(item.style));
     }
     
     if (recommended.length === 0) return inventoryMock.slice(0, 4); // Fallback
     return recommended.slice(0, 4);
  };

  const vibes = [
    { id: 'Warm', title: 'Warm & Earthy', image: 'https://images.unsplash.com/photo-1533090481720-856c6e3c1fdc?q=80&w=800' },
    { id: 'Airy', title: 'Bright & Airy', image: 'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?q=80&w=800' },
    { id: 'Moody', title: 'Dark & Moody', image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?q=80&w=800' }
  ];

  const rooms = [
    { id: 'Living', title: 'Living Room Vibe' },
    { id: 'Office', title: 'Productive Office' },
    { id: 'Bedroom', title: 'Restful Sanctuary' }
  ];

  return (
    <main className="min-h-screen bg-[var(--color-background)] flex flex-col pt-10 px-6 pb-20 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-gradient-to-l from-[var(--color-accent)]/10 to-transparent rounded-full blur-3xl opacity-50" />
      
      <div className="max-w-4xl mx-auto w-full z-10 flex-1 flex flex-col">
          <div className="mb-8">
            <Link href="/" className="inline-flex items-center gap-2 text-[var(--color-text-tertiary)] hover:text-[var(--color-text-primary)] transition-colors font-semibold">
               <ArrowLeft className="w-4 h-4" /> Exit Quiz
            </Link>
          </div>

          <AnimatePresence mode="wait">
            {!showResults && !isCalculating && step === 1 && (
               <motion.div 
                 key="step1"
                 initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -50 }}
                 className="flex flex-col flex-1 justify-center"
               >
                  <h1 className="text-5xl font-serif font-bold text-[var(--color-text-primary)] tracking-tight leading-tight mb-4">What visual tone naturally draws you in?</h1>
                  <p className="text-xl text-[var(--color-text-secondary)] font-medium mb-12">Select the palette that feels most like "home" to you.</p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {vibes.map(v => (
                       <div 
                         key={v.id} 
                         onClick={() => setVibe(v.id)}
                         className={`relative h-[400px] rounded-[32px] overflow-hidden cursor-pointer transition-all duration-300 ${vibe === v.id ? 'ring-4 ring-[var(--color-accent)] scale-[1.02] shadow-xl' : 'hover:shadow-lg hover:-translate-y-2'}`}
                       >
                         <Image src={v.image} alt={v.title} fill className="object-cover" />
                         <div className={`absolute inset-0 transition-colors ${vibe === v.id ? 'bg-black/10' : 'bg-black/30 hover:bg-black/10'}`} />
                         <div className="absolute bottom-6 left-6 right-6 z-20">
                            <h3 className="text-white text-2xl font-bold drop-shadow-md">{v.title}</h3>
                         </div>
                         {vibe === v.id && (
                           <div className="absolute top-6 right-6 w-8 h-8 bg-[var(--color-accent)] rounded-full flex items-center justify-center shadow-lg z-20">
                             <CheckCircle2 className="w-5 h-5 text-white" />
                           </div>
                         )}
                       </div>
                    ))}
                  </div>

                  <div className="mt-12 flex justify-end">
                     <button 
                       onClick={handleNext} 
                       disabled={!vibe}
                       className="h-16 px-10 rounded-full bg-[var(--color-text-primary)] text-[var(--color-background)] font-bold text-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-[var(--color-text-secondary)] transition-all flex items-center gap-3"
                     >
                        Next Step <ArrowRight className="w-5 h-5" />
                     </button>
                  </div>
               </motion.div>
            )}

            {!showResults && !isCalculating && step === 2 && (
               <motion.div 
                 key="step2"
                 initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -50 }}
                 className="flex flex-col flex-1 justify-center"
               >
                  <h1 className="text-5xl font-serif font-bold text-[var(--color-text-primary)] tracking-tight leading-tight mb-4">Which space are you prioritizing right now?</h1>
                  <p className="text-xl text-[var(--color-text-secondary)] font-medium mb-12">We'll tailor our catalog recommendations directly to this room.</p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {rooms.map(r => (
                       <div 
                         key={r.id} 
                         onClick={() => setRoom(r.id)}
                         className={`p-10 rounded-[32px] cursor-pointer transition-all duration-300 border-2 ${room === r.id ? 'border-[var(--color-accent)] bg-[var(--color-accent)]/5 shadow-lg scale-[1.02]' : 'border-[var(--color-surface-elevation-1)] bg-[var(--color-surface)] hover:border-[var(--color-text-tertiary)] hover:shadow-md hover:-translate-y-1'}`}
                       >
                         <h3 className={`text-2xl font-bold ${room === r.id ? 'text-[var(--color-accent)]' : 'text-[var(--color-text-primary)]'}`}>{r.title}</h3>
                         <div className="mt-8 flex justify-center opacity-30">
                            {r.id === 'Living' && <div className="w-32 h-16 rounded-3xl bg-[var(--color-text-tertiary)]"></div>}
                            {r.id === 'Office' && <div className="w-24 h-4 rounded-full bg-[var(--color-text-tertiary)] mb-2"></div>}
                            {r.id === 'Bedroom' && <div className="w-32 h-20 rounded-t-3xl bg-[var(--color-text-tertiary)]"></div>}
                         </div>
                         {room === r.id && (
                            <div className="mt-8 flex justify-end">
                               <CheckCircle2 className="w-6 h-6 text-[var(--color-accent)]" />
                            </div>
                         )}
                       </div>
                    ))}
                  </div>

                  <div className="mt-12 flex justify-between">
                     <button onClick={() => setStep(1)} className="h-16 px-10 rounded-full border-2 border-[var(--color-surface-elevation-1)] text-[var(--color-text-secondary)] font-bold text-lg hover:bg-[var(--color-surface-elevation-1)] transition-all">Back</button>
                     <button 
                       onClick={handleNext} 
                       disabled={!room}
                       className="h-16 px-10 rounded-full bg-[var(--color-accent)] hover:bg-[var(--color-accent-hover)] hover:shadow-lg text-white font-bold text-lg disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center gap-3"
                     >
                        Discover My Matches <Sparkles className="w-5 h-5" />
                     </button>
                  </div>
               </motion.div>
            )}

            {isCalculating && (
               <motion.div 
                 key="calculating"
                 initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                 className="flex flex-col flex-1 items-center justify-center text-center py-32"
               >
                  <RefreshCw className="w-16 h-16 animate-spin text-[var(--color-accent)] mb-8" />
                  <h2 className="text-3xl font-serif font-bold text-[var(--color-text-primary)] mb-3">Curating your distinct style...</h2>
                  <p className="text-[var(--color-text-secondary)] font-medium">Cross-referencing {inventoryMock.length * 42} data points across inventory.</p>
               </motion.div>
            )}

            {showResults && (
               <motion.div 
                 key="results"
                 initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}
                 className="flex flex-col flex-1 items-center"
               >
                  <div className="text-center mb-16 max-w-2xl bg-[var(--color-surface)] p-12 rounded-[40px] shadow-sm border border-[var(--color-surface-elevation-1)]">
                     <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-green-500/10 text-green-600 font-bold text-sm mb-6 uppercase tracking-widest border border-green-500/20">
                       <CheckCircle2 className="w-4 h-4" /> Analysis Complete
                     </div>
                     <h1 className="text-5xl font-serif font-bold text-[var(--color-text-primary)] tracking-tight leading-tight mb-4">
                       Your style is <span className="text-[var(--color-accent)] italic">{vibe} {room === 'Office' ? 'Professional' : room === 'Bedroom' ? 'Sanctuary' : 'Living'}</span> 
                     </h1>
                     <p className="text-lg text-[var(--color-text-secondary)] font-medium">We've selected pieces that harmonize structural comfort with natural warmth. These core items perfectly anchor your designated space.</p>
                  </div>

                  <div className="w-full">
                     <div className="flex justify-between items-end mb-8 w-full max-w-[1440px] mx-auto px-4">
                        <h2 className="text-3xl font-serif font-bold text-[var(--color-text-primary)]">Your Tailored Collection</h2>
                        <button onClick={() => toast.success("Entire collection seamlessly added to cart!")} className="hidden md:inline-flex items-center gap-2 text-sm font-bold bg-[var(--color-text-primary)] text-[var(--color-surface)] px-6 py-3 rounded-full hover:bg-[var(--color-text-secondary)] transition-colors shadow-md hover:scale-[1.02]">
                           Add Set to Cart
                        </button>
                     </div>
                     
                     <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 w-full max-w-[1440px] mx-auto">
                        {getRecommendations().map((item, i) => (
                           <motion.div key={item.id} initial={{opacity:0, y:20}} animate={{opacity:1, y:0}} transition={{delay: 0.1 * i}} className="group">
                             <Link href={`/catalog/${item.sku}`}>
                               <Card className="h-full flex flex-col bg-[var(--color-surface)] border border-[var(--color-surface-elevation-1)] shadow-sm hover:shadow-xl transition-all duration-300 rounded-[32px] overflow-hidden group-hover:-translate-y-2">
                                 <div className="relative h-[250px] w-full overflow-hidden bg-[var(--color-surface-elevation-1)]">
                                   <Image 
                                     src={item.images[0] || 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=1600&q=80'} 
                                     alt={item.name} 
                                     fill 
                                     className="object-cover transition-transform duration-700 group-hover:scale-110"
                                   />
                                 </div>
                                 <CardContent className="p-6">
                                   <h3 className="font-bold text-lg text-[var(--color-text-primary)] group-hover:text-[var(--color-accent)] transition-colors mb-2">{item.name}</h3>
                                   <p className="text-xs font-bold text-[var(--color-text-secondary)] bg-[var(--color-surface-elevation-1)] w-fit px-2 py-1 rounded capitalize tracking-wider">${item.monthly_price}/mo</p>
                                 </CardContent>
                               </Card>
                             </Link>
                           </motion.div>
                        ))}
                     </div>
                  </div>
               </motion.div>
            )}
          </AnimatePresence>
      </div>
    </main>
  );
}
