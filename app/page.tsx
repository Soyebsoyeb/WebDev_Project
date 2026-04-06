'use client';
import Link from 'next/link';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/Card';
import { inventoryMock } from '@/lib/data/inventory.mock';
import Image from 'next/image';
import { ArrowRight, Sparkles } from 'lucide-react';
import { useRef } from 'react';

// Animation variants
const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.2 }
  }
};

const itemAnim = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
};

export default function Home() {
  const trending = inventoryMock.slice(0, 4);
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  });

  const heroY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const heroOpacity = useTransform(scrollYProgress, [0, 1], [1, 0]);

  return (
    <main className="flex min-h-screen flex-col items-center bg-[var(--color-background)]">
      {/* Hero Section */}
      <section ref={heroRef} className="w-full flex-col md:flex-row flex min-h-[85vh] relative overflow-hidden bg-[var(--color-surface)]">
        
        {/* Left Typography */}
        <div className="w-full md:w-1/2 flex flex-col justify-center px-6 md:px-16 lg:px-24 border-r border-[var(--color-surface-elevation-1)] z-10 py-20 lg:py-0 bg-[var(--color-surface)]">
          <motion.div variants={container} initial="hidden" animate="show" className="max-w-xl">
             <motion.div variants={itemAnim} className="inline-flex items-center gap-2 px-4 py-2 mb-8 rounded-full bg-[var(--color-accent)]/10 text-[var(--color-accent)] font-bold text-xs uppercase tracking-widest border border-[var(--color-accent)]/20 shadow-sm backdrop-blur-sm">
                <Sparkles className="w-4 h-4" /> V2.0 Collections Live
             </motion.div>
             
             <motion.h1 variants={itemAnim} className="font-serif text-[4rem] md:text-[5.5rem] font-bold leading-[1.05] tracking-tight text-[var(--color-text-primary)] mb-6 drop-shadow-sm">
               Style without <span className="text-[var(--color-accent)] italic">Permanence.</span>
             </motion.h1>
             
             <motion.p variants={itemAnim} className="text-xl text-[var(--color-text-secondary)] leading-relaxed mb-10 font-medium">
               Rent ultra-premium furniture flexible to your life. Upgrade, swap, or return whenever your space evolves. Zero commitment.
             </motion.p>
             
             <motion.div variants={itemAnim} className="flex flex-col sm:flex-row gap-5">
               <Link href="/catalog" className="inline-flex h-14 items-center justify-center rounded-full bg-[var(--color-accent)] px-10 text-base font-bold text-white transition-all shadow-[0_8px_20px_-4px_rgba(196,101,61,0.5)] hover:shadow-[0_16px_32px_-4px_rgba(196,101,61,0.6)] hover:scale-[1.03] active:scale-[0.98] group">
                 Design Your Room <ArrowRight className="ml-3 w-5 h-5 group-hover:translate-x-1.5 transition-transform duration-300" />
               </Link>
               <Link href="/catalog" className="inline-flex h-14 items-center justify-center rounded-full border-2 border-[var(--color-text-tertiary)] hover:border-[var(--color-accent)] bg-transparent px-10 text-base font-bold text-[var(--color-text-primary)] transition-all hover:text-[var(--color-accent)] focus:outline-none hover:shadow-md">
                 Browse Collection
               </Link>
             </motion.div>

             <motion.div variants={itemAnim} className="mt-12 flex items-center gap-4">
                <div className="flex -space-x-3">
                   {[
                     "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=100",
                     "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=100",
                     "https://images.unsplash.com/photo-1517841905240-472988babdf9?q=80&w=100"
                   ].map((url, i) => (
                     <div key={i} className="w-10 h-10 rounded-full border-2 border-[var(--color-surface)] bg-gray-200 shadow-md overflow-hidden relative transition-transform hover:scale-110 hover:z-10">
                        <Image src={url} alt="User" fill className="object-cover" />
                     </div>
                   ))}
                </div>
                <p className="text-sm font-semibold text-[var(--color-text-secondary)]">Join <span className="text-[var(--color-text-primary)] font-bold">12,500+</span> flexible renters.</p>
             </motion.div>
          </motion.div>
        </div>

        {/* Right Imagery Fixed Layout */}
        <motion.div 
           style={{ y: heroY, opacity: heroOpacity }}
           initial={{ opacity: 0, scale: 1.05 }}
           animate={{ opacity: 1, scale: 1 }}
           transition={{ duration: 1.2, ease: "easeOut" }}
           className="hidden md:block absolute right-0 top-0 bottom-0 w-1/2 shadow-2xl bg-[var(--color-surface-elevation-1)]"
        >
          <div className="absolute inset-y-0 left-0 bg-gradient-to-r from-[var(--color-surface)] via-[var(--color-surface)]/20 to-transparent z-10 w-32" />
          <Image 
            src="https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=1600&q=80" 
            alt="Beautiful modern living room" 
            fill 
            className="object-cover object-center"
            priority
          />
        </motion.div>
      </section>

      {/* Value Props Section */}
      <section className="w-full bg-[var(--color-surface-elevation-1)] py-32 border-y border-[var(--color-surface)] relative overflow-hidden">
         <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-gradient-to-b from-[var(--color-accent)]/10 to-transparent rounded-full blur-3xl opacity-50 -translate-y-1/2 translate-x-1/3" />
         
         <div className="max-w-[1440px] mx-auto px-6 md:px-16 grid grid-cols-1 md:grid-cols-3 gap-16 relative z-10">
            {[
               { title: "Curated Excellence", desc: "Every piece passes a 50-point quality check. Premium materials only." },
               { title: "Swap Anytime", desc: "Tired of the sofa? Swap it out. We'll pick up the old and drop off the new." },
               { title: "White-Glove Delivery", desc: "We assemble everything and clean up the boxes. You just point." }
            ].map((prop, i) => (
              <motion.div 
                 key={i}
                 initial={{ opacity: 0, y: 30 }}
                 whileInView={{ opacity: 1, y: 0 }}
                 viewport={{ once: true, margin: "-100px" }}
                 transition={{ delay: i * 0.2, duration: 0.6 }}
                 className="flex flex-col gap-5 text-center md:text-left group"
              >
                 <div className="w-16 h-16 bg-[var(--color-surface)] rounded-2xl shadow-sm border border-[var(--color-surface-elevation-1)] flex items-center justify-center font-bold text-2xl text-[var(--color-accent)] mx-auto md:mx-0 group-hover:scale-110 group-hover:shadow-md transition-all duration-300">
                    0{i+1}
                 </div>
                 <h3 className="text-3xl font-serif font-bold text-[var(--color-text-primary)]">{prop.title}</h3>
                 <p className="text-[var(--color-text-secondary)] font-medium leading-relaxed">{prop.desc}</p>
              </motion.div>
            ))}
         </div>
      </section>

      {/* Trending Section */}
      <section className="w-full max-w-[1440px] px-6 md:px-16 py-32 mx-auto bg-[var(--color-background)]">
        <motion.div 
           initial={{ opacity: 0, y: 20 }}
           whileInView={{ opacity: 1, y: 0 }}
           viewport={{ once: true }}
           className="flex justify-between items-end mb-16"
        >
          <div>
            <h2 className="font-serif text-5xl font-semibold tracking-tight text-[var(--color-text-primary)]">Trending Pieces.</h2>
            <p className="text-lg text-[var(--color-text-secondary)] mt-4 font-medium max-w-2xl">The silhouettes currently commanding the most attention. Instantly upgrade your space with our curated favorites.</p>
          </div>
          <Link href="/catalog" className="hidden md:inline-flex items-center justify-center whitespace-nowrap text-sm font-bold transition-all duration-300 bg-[var(--color-surface)] text-[var(--color-text-primary)] hover:text-[var(--color-accent)] rounded-full h-12 px-8 py-2 border-2 border-[var(--color-surface-elevation-1)] hover:border-[var(--color-accent)] hover:shadow-md">
             View All Collection
          </Link>
        </motion.div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {trending.map((item, i) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: i * 0.1, duration: 0.6, ease: "easeOut" }}
            >
              <Link href={`/catalog/${item.sku}`} className="block group">
                <Card className="h-full flex flex-col bg-[var(--color-surface)] border border-[var(--color-surface-elevation-1)] shadow-sm hover:shadow-[0_32px_64px_-12px_rgba(0,0,0,0.15)] transition-all duration-500 rounded-[32px] overflow-hidden group-hover:-translate-y-2">
                  <div className="relative h-[320px] w-full bg-[var(--color-surface-elevation-1)] overflow-hidden">
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
                      <div className="flex justify-between items-start mb-3">
                        <h3 className="font-sans font-bold text-2xl leading-tight text-[var(--color-text-primary)] group-hover:text-[var(--color-accent)] transition-colors">{item.name}</h3>
                      </div>
                      <p className="text-xs font-bold text-[var(--color-text-secondary)] bg-[var(--color-surface-elevation-1)] w-fit px-3 py-1.5 rounded-lg uppercase tracking-widest">{item.style}</p>
                    </div>
                    <div className="mt-8 flex justify-between items-end border-t border-[var(--color-surface-elevation-1)] pt-6">
                      <div>
                        <span className="text-[11px] font-bold text-[var(--color-text-tertiary)] uppercase tracking-widest block mb-1">From</span>
                        <div className="font-extrabold text-[var(--color-accent)] text-3xl">
                          ${item.monthly_price}<span className="text-sm text-[var(--color-text-secondary)] font-medium ml-1">/mo</span>
                        </div>
                      </div>
                      <div className="w-12 h-12 rounded-full bg-[var(--color-surface-elevation-1)] flex items-center justify-center group-hover:bg-[var(--color-accent)] group-hover:text-white transition-all duration-300 text-[var(--color-text-secondary)] -translate-x-4 group-hover:translate-x-0 opacity-0 group-hover:opacity-100 shadow-sm border border-transparent group-hover:border-[var(--color-accent-hover)]">
                         <ArrowRight className="w-6 h-6" />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            </motion.div>
          ))}
        </div>
      </section>
    </main>
  );
}
