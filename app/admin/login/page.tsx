'use client';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { useUserStore } from '@/lib/store';
import { Fingerprint, Lock, ShieldCheck } from 'lucide-react';
import { toast } from 'sonner';

export default function AdminLogin() {
  const login = useUserStore(state => state.login);
  const router = useRouter();
  const [code, setCode] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    toast.loading('Encrypted handshake initiated...', { id: 'admin-login' });
    setTimeout(() => {
      login('admin');
      toast.success('Access Granted', { id: 'admin-login' });
      router.push('/admin');
    }, 1500); 
  };

  return (
    <main className="flex min-h-screen items-center justify-center bg-[#F1F4F8] relative overflow-hidden">
      {/* Animated blob backgrounds representing data flow */}
      <motion.div 
         animate={{ rotate: 360 }}
         transition={{ repeat: Infinity, duration: 50, ease: "linear" }}
         className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-r from-[#1B3B6F]/5 to-transparent rounded-full blur-3xl opacity-60" 
      />
      <motion.div 
         animate={{ rotate: -360 }}
         transition={{ repeat: Infinity, duration: 80, ease: "linear" }}
         className="absolute top-1/3 left-1/3 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[600px] bg-gradient-to-r from-cyan-400/5 to-transparent rounded-full blur-3xl opacity-50 block" 
      />
      
      <motion.div 
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        className="w-full max-w-xl relative z-10"
      >
        <div className="bg-white/90 rounded-[40px] p-16 shadow-[0_32px_64px_-16px_rgba(27,59,111,0.15)] border border-white backdrop-blur-2xl">
           <div className="flex flex-col items-center text-center">
             <div className="h-20 w-20 bg-slate-100/80 rounded-2xl flex items-center justify-center shadow-inner mb-8 border border-slate-200">
                <ShieldCheck className="w-10 h-10 text-[#1B3B6F]" />
             </div>
             
             <h1 className="font-sans text-4xl font-bold text-slate-800 tracking-tight">System Operator</h1>
             <p className="text-slate-500 text-lg mt-3 mb-10 px-4 font-medium max-w-sm">Authorized personnel only. Authenticate to access security dashboard.</p>
           </div>

           <form onSubmit={handleLogin} className="space-y-8">
             <div className="space-y-4">
                <div className="relative group">
                   <div className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-[#1B3B6F] transition-colors">
                     <Lock className="w-6 h-6" />
                   </div>
                   <input 
                     type="password"
                     value={code}
                     onChange={(e) => setCode(e.target.value)}
                     placeholder="Enter operator code..."
                     className="w-full h-20 pl-16 pr-6 bg-white border-2 border-slate-200 rounded-2xl focus:outline-none focus:ring-4 focus:ring-[#1B3B6F]/20 focus:border-[#1B3B6F] transition-all text-slate-800 text-xl font-mono tracking-[0.2em] placeholder:tracking-normal placeholder:font-sans placeholder:text-lg font-medium shadow-sm hover:shadow-md"
                     required
                   />
                </div>
             </div>

             <button 
                type="submit" 
                disabled={isLoading}
                className="w-full h-20 bg-[#1B3B6F] hover:bg-[#152e5a] text-white text-lg rounded-2xl font-bold flex items-center justify-center transition-all disabled:opacity-70 disabled:cursor-not-allowed group shadow-[0_12px_24px_-8px_rgba(27,59,111,0.4)] hover:shadow-[0_16px_32px_-8px_rgba(27,59,111,0.5)] hover:scale-[1.02] active:scale-[0.98]"
             >
                {isLoading ? (
                  <div className="flex items-center gap-4">
                    <div className="w-6 h-6 border-4 border-white/30 border-t-white rounded-full animate-spin" />
                    <span>Verifying Cryptography...</span>
                  </div>
                ) : (
                  <span className="flex items-center gap-3">
                    <Fingerprint className="w-6 h-6 group-hover:scale-110 group-hover:opacity-100 opacity-80 transition-all" /> Validate Session
                  </span>
                )}
             </button>
           </form>

           <div className="mt-12 pt-8 border-t border-slate-100 text-center text-sm text-slate-400 font-medium">
             <p>IP logged. Unrecognized activity will be reported.</p>
             <p className="mt-2 font-mono text-xs tracking-widest text-[#1B3B6F]/40 font-bold">VER: 4.1.92-BETA</p>
           </div>
        </div>
      </motion.div>
    </main>
  );
}
