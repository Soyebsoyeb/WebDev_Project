'use client';
import { useState } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useUserStore } from '@/lib/store';
import { Input } from '@/components/ui/Input';
import { ArrowLeft, Loader2 } from 'lucide-react';
import { toast } from 'sonner';

export default function ClientLogin() {
  const login = useUserStore(state => state.login);
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simulate slight natural delay
    setTimeout(() => {
       login('renter');
       router.push('/catalog');
       toast.success('Successfully signed in as Sarah Jenkins');
    }, 800);
  };

  const handlePendingFeature = (feature: string) => {
    toast.info(`${feature} currently unlinked in UI mock.`, {
      description: "This button intercept proves interactivity."
    });
  };

  return (
    <main className="flex h-screen w-full bg-[#FBF9F6]">
      {/* Left panel format - Hidden on mobile */}
      <div className="relative hidden w-1/2 lg:block overflow-hidden">
        <Image 
          src="https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?q=80&w=1200&auto=format&fit=crop" 
          alt="Premium furniture interior" 
          fill 
          priority
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
        
        <div className="absolute bottom-20 left-20 max-w-xl text-white">
          <motion.h2 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="font-serif text-6xl font-medium leading-[1.1] drop-shadow-2xl"
          >
            "My entire space transforms every six months, beautifully and effortlessly."
          </motion.h2>
          <motion.div 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="mt-8 flex items-center space-x-5"
          >
             <div className="h-16 w-16 rounded-full overflow-hidden relative border-2 border-white/20 shadow-lg">
               <Image src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=150" alt="Avatar" fill className="object-cover" />
             </div>
             <div>
               <p className="font-semibold text-lg text-white drop-shadow-md">Sarah Jenkins</p>
               <p className="text-white/80 font-medium">Member since 2024</p>
             </div>
          </motion.div>
        </div>
      </div>

      {/* Right panel scaled up */}
      <div className="flex w-full flex-col justify-center px-8 lg:w-1/2 sm:px-20 xl:px-32 bg-[var(--color-surface)] relative">
        <Link href="/" className="absolute top-10 left-10 sm:left-20 xl:left-32 text-text-secondary hover:text-[var(--color-accent)] transition-colors flex items-center gap-2 text-base font-semibold">
          <ArrowLeft className="w-5 h-5" /> Back to home
        </Link>

        <motion.div 
           initial={{ x: 30, opacity: 0 }}
           animate={{ x: 0, opacity: 1 }}
           transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
           className="w-full max-w-md mx-auto"
        >
          <h1 className="font-serif text-6xl font-semibold text-text-primary tracking-tight">Sign In.</h1>
          <p className="mt-4 text-lg text-text-secondary font-medium">Welcome back to Rentique. Enter your details to access your portal space.</p>

          <form onSubmit={handleLogin} className="mt-10 space-y-8">
            <div className="space-y-6">
              <div className="group">
                 <label className="block text-base font-semibold text-text-secondary mb-2 transition-colors group-focus-within:text-[var(--color-accent)]">Email Address</label>
                 <Input 
                   type="email" 
                   value={email}
                   onChange={e => setEmail(e.target.value)}
                   className="h-16 text-lg font-medium px-4 transition-all hover:shadow-md focus:shadow-md border-gray-200" 
                   placeholder="you@example.com" 
                   required
                 />
              </div>
              <div className="group">
                 <div className="flex justify-between items-center mb-2">
                    <label className="block text-base font-semibold text-text-secondary transition-colors group-focus-within:text-[var(--color-accent)]">Password</label>
                    <button type="button" onClick={() => handlePendingFeature('Password Recovery')} className="text-sm font-bold text-[var(--color-accent)] hover:text-[var(--color-accent-hover)] transition-colors">Forgot password?</button>
                 </div>
                 <Input 
                   type="password" 
                   value={password}
                   onChange={e => setPassword(e.target.value)}
                   className="h-16 text-lg font-medium px-4 transition-all hover:shadow-md focus:shadow-md border-gray-200 tracking-[0.2em] placeholder:tracking-normal" 
                   placeholder="••••••••" 
                   required
                 />
              </div>
            </div>

            <button type="submit" disabled={isSubmitting} className="w-full h-16 rounded-full bg-[var(--color-accent)] hover:bg-[var(--color-accent-hover)] text-white text-lg font-bold shadow-[0_8px_16px_-4px_rgba(196,101,61,0.3)] hover:shadow-[0_12px_24px_-4px_rgba(196,101,61,0.4)] transition-all hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center">
              {isSubmitting ? <Loader2 className="w-6 h-6 animate-spin" /> : "Sign In to Dashboard"}
            </button>
            
            <div className="relative flex py-6 items-center">
              <div className="flex-grow border-t border-gray-200"></div>
              <span className="flex-shrink-0 mx-6 text-sm font-bold text-gray-400 uppercase tracking-widest">Or continue with</span>
              <div className="flex-grow border-t border-gray-200"></div>
            </div>

            <button type="button" onClick={() => handlePendingFeature('Google OAuth')} className="flex h-16 w-full items-center justify-center gap-4 rounded-full border-2 border-gray-200 bg-white px-6 text-lg font-bold text-text-primary transition-all hover:bg-gray-50 focus:outline-none hover:shadow-md hover:border-gray-300">
              <svg viewBox="0 0 24 24" className="h-6 w-6 border-r border-gray-200 pr-4 box-content" aria-hidden="true">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
              </svg>
              Sign in with Google
            </button>
          </form>
          
          <div className="mt-10 text-center text-base font-medium">
            <span className="text-text-tertiary">Don't have an account? </span>
            <button onClick={() => handlePendingFeature('Sign Up Routing')} className="font-bold text-[var(--color-accent)] hover:text-[var(--color-accent-hover)] transition-colors border-b border-transparent hover:border-[var(--color-accent-hover)]">Create one now</button>
          </div>
        </motion.div>
      </div>
    </main>
  );
}
