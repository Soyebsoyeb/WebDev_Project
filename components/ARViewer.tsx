'use client';
import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Maximize, Move, Camera as CameraIcon } from 'lucide-react';
import Image from 'next/image';
import { toast } from 'sonner';

interface ARViewerProps {
  item: {
    name: string;
    images: string[];
  };
  onClose: () => void;
}

export function ARViewer({ item, onClose }: ARViewerProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [streamActive, setStreamActive] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [phase, setPhase] = useState<'initializing' | 'scanning' | 'ready'>('initializing');

  useEffect(() => {
    let stream: MediaStream | null = null;
    
    async function startCamera() {
      try {
        stream = await navigator.mediaDevices.getUserMedia({ 
          video: true 
        });
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
        setStreamActive(true);
        setPhase('scanning');
        
        // Simulate Lidar surface mapping duration
        setTimeout(() => {
           setPhase('ready');
           toast.success('Surface mapped. Item placed.', { id: 'ar' });
        }, 3000);
        
      } catch (err) {
        console.error("Camera access denied or unavailable", err);
        setError("Camera access is required for AR view.");
        toast.error("Could not access camera for AR view.");
      }
    }
    
    startCamera();

    return () => {
      if (stream) stream.getTracks().forEach(track => track.stop());
    };
  }, []);

  return (
    <motion.div 
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] bg-black flex flex-col overflow-hidden font-sans"
    >
      <div className="absolute top-0 left-0 right-0 p-6 z-30 flex justify-between items-center bg-gradient-to-b from-black/80 to-transparent">
        <div>
          <h2 className="text-white font-bold text-lg drop-shadow-md tracking-wide flex items-center gap-2">
             <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" /> AR Mode
          </h2>
          <p className="text-white/80 text-sm font-medium drop-shadow-md">
             {phase === 'scanning' ? 'Mapping floor surface...' : 'Tap and drag to reposition'}
          </p>
        </div>
        <button onClick={onClose} className="w-12 h-12 bg-white/20 hover:bg-white/30 backdrop-blur-md rounded-full flex items-center justify-center text-white transition-colors">
          <X className="w-6 h-6" />
        </button>
      </div>

      <div className="absolute inset-0 z-0 bg-slate-950 flex flex-col items-center justify-center overflow-hidden">
         {error ? (
            <div className="text-white bg-red-500/20 px-6 py-4 rounded-xl border border-red-500/50 backdrop-blur-md text-center max-w-sm z-20">
               <p className="font-bold mb-2">{error}</p>
               <p className="opacity-80 text-sm">Please allow camera permissions in your browser or ensure HTTPS connection.</p>
            </div>
         ) : (
            <video 
              ref={videoRef} autoPlay playsInline muted 
              className={`w-full h-full object-cover transition-all duration-[2000ms] ease-out ${phase === 'scanning' ? 'scale-105 blur-[1px]' : 'scale-100 blur-0'}`}
              style={{ filter: streamActive ? undefined : 'blur(20px)' }}
            />
         )}

         {/* Scanning Phase UI Overlay */}
         <AnimatePresence>
           {phase === 'scanning' && (
              <motion.div 
                 initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                 className="absolute inset-0 z-10 flex items-center justify-center pointer-events-none"
              >
                 {/* Perspective Grid mimicking floor detection */}
                 <div className="absolute bottom-[-20%] w-[200%] h-[100%] [transform:rotateX(75deg)] [transform-origin:bottom] perspective-[1000px] border-t-2 border-white/20">
                    <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.2)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.2)_1px,transparent_1px)] bg-[size:40px_40px] animate-[slide_2s_linear_infinite]" />
                 </div>
                 
                 {/* Scanning Reticle */}
                 <div className="relative w-48 h-48">
                    <div className="absolute inset-0 border-2 border-white/40 rounded-xl" />
                    <div className="absolute inset-x-0 h-1 bg-white/80 shadow-[0_0_15px_#fff] animate-[scan_2s_ease-in-out_infinite_alternate]" />
                    <div className="absolute -inset-4 border border-white/20 rounded-2xl animate-pulse" />
                 </div>
              </motion.div>
           )}
         </AnimatePresence>

         {/* Object Drop Phase */}
         <AnimatePresence>
           {phase === 'ready' && (
             <div className="absolute inset-0 z-20 pointer-events-none flex items-center justify-center">
                <motion.div
                   drag dragConstraints={{ left: -300, right: 300, top: -400, bottom: 400 }} dragElastic={0.2} dragMomentum={false}
                   initial={{ scale: 0.5, y: -500, opacity: 0, rotateX: 45 }}
                   animate={{ scale: 1, y: 0, opacity: 1, rotateX: 0 }}
                   transition={{ type: "spring", damping: 12, stiffness: 100, delay: 0.2 }}
                   className="pointer-events-auto relative cursor-grab active:cursor-grabbing w-80 h-80 lg:w-[500px] lg:h-[500px]"
                >
                   {/* Contextual Drag Hint */}
                   <div className="absolute -top-12 left-1/2 -translate-x-1/2 bg-black/60 backdrop-blur-md px-4 py-2 rounded-full text-white text-xs font-bold whitespace-nowrap flex items-center gap-2 opacity-0 hover:opacity-100 transition-opacity">
                      <Move className="w-3 h-3" /> Position Item
                   </div>
                   
                   {/* The Magical 'Multiply' Blend Item making white bgs disappear */}
                   <div className="w-full h-full relative" style={{ mixBlendMode: 'multiply' }}>
                      <Image src={item.images[0]} alt={item.name} fill className="object-contain drop-shadow-[0_40px_30px_rgba(0,0,0,0.4)]" />
                   </div>

                   <div className="absolute -bottom-4 right-0 w-8 h-8 bg-black/40 backdrop-blur-md rounded-full flex items-center justify-center text-white/80 border border-white/20">
                      <Maximize className="w-4 h-4" />
                   </div>
                </motion.div>
             </div>
           )}
         </AnimatePresence>

         {!streamActive && phase === 'initializing' && !error && (
            <div className="absolute inset-0 flex flex-col items-center justify-center bg-slate-950 z-30 text-white">
               <div className="w-12 h-12 border-4 border-slate-700 border-t-white rounded-full animate-spin mb-4" />
               <p className="font-bold tracking-widest uppercase text-xs animate-pulse text-slate-400">Booting WebRTC...</p>
            </div>
         )}
      </div>

      <div className="absolute bottom-0 left-0 right-0 p-8 z-30 flex justify-center bg-gradient-to-t from-black/80 to-transparent pb-12">
        <button onClick={() => toast.success('Snapshot saved to gallery!')} className="w-16 h-16 rounded-full border-4 border-white flex items-center justify-center bg-white/20 hover:bg-white/40 transition-colors backdrop-blur-sm shadow-[0_0_20px_rgba(255,255,255,0.3)]">
           <CameraIcon className="w-6 h-6 text-white" />
        </button>
      </div>

      <style dangerouslySetInnerHTML={{__html: `
        @keyframes scan { 0% { top: 0%; } 100% { top: 100%; } }
        @keyframes slide { 0% { transform: translateY(0); } 100% { transform: translateY(40px); } }
      `}} />
    </motion.div>
  );
}
