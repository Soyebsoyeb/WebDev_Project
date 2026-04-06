'use client';
import { useState } from 'react';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { MoreHorizontal, Search, MapPin, Navigation, X, Truck as TruckIcon } from 'lucide-react';
import { Input } from '@/components/ui/Input';
import { motion, AnimatePresence } from 'framer-motion';

const mockLogistics = [
  { id: 'TRK-9921-A', address: '1423 Market St, SF', driver: 'Marcus R.', window: '09:00 - 11:00 AM', items: 3, status: 'In Transit', pos: { x: 30, y: 40 } },
  { id: 'TRK-8812-B', address: '882 Valencia St, SF', driver: 'Sarah L.', window: '11:30 - 01:00 PM', items: 1, status: 'Out for Delivery', pos: { x: 60, y: 20 } },
  { id: 'TRK-9021-C', address: '1200 4th St, Mission Bay', driver: 'David K.', window: '02:00 - 04:00 PM', items: 4, status: 'Allocating', pos: { x: 75, y: 65 } },
  { id: 'TRK-3341-X', address: '550 Battery St, FiDi', driver: 'Unassigned', window: 'Tomorrow', items: 2, status: 'Pending Pickup', pos: { x: 45, y: 80 } },
  { id: 'TRK-5511-Y', address: '900 Point Lobos Ave, SF', driver: 'Marcus R.', window: '08:00 - 10:00 AM', items: 5, status: 'Delivered', pos: { x: 10, y: 15 } }
];

export default function AdminLogistics() {
  const [isMapOpen, setIsMapOpen] = useState(false);

  return (
    <div className="w-full relative">
      <div className="flex justify-between items-center mb-8">
         <h1 className="text-3xl font-bold text-slate-800 tracking-tight">Active Dispatches</h1>
         <div className="flex gap-4">
           <div className="relative w-80">
             <Input placeholder="Search route or tracking ID..." className="h-10 pl-10 rounded-xl bg-white" />
             <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
           </div>
           <Button onClick={() => setIsMapOpen(true)} className="rounded-xl h-10 px-6 bg-[#1B3B6F] hover:bg-[#152e5a] text-white transition-all shadow-md">
             <MapPin className="w-4 h-4 mr-2" /> Live Map View
           </Button>
         </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
         {[
           { label: 'Active Drivers', value: 12 },
           { label: 'Deliveries Today', value: 48 },
           { label: 'Pending Pickups', value: 15 },
           { label: 'On-Time Accuracy', value: '98.2%' }
         ].map(stat => (
            <div key={stat.label} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200">
               <div className="text-sm font-semibold text-slate-500 uppercase tracking-wider">{stat.label}</div>
               <div className="text-3xl font-bold text-[#1B3B6F] mt-2">{stat.value}</div>
            </div>
         ))}
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="text-xs text-slate-500 uppercase bg-slate-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-4 font-semibold tracking-wider">Tracking / Route</th>
                <th className="px-6 py-4 font-semibold tracking-wider">Destination</th>
                <th className="px-6 py-4 font-semibold tracking-wider">Assigned Driver</th>
                <th className="px-6 py-4 font-semibold tracking-wider">Delivery Window</th>
                <th className="px-6 py-4 font-semibold tracking-wider text-center">Payload</th>
                <th className="px-6 py-4 font-semibold tracking-wider text-center">Status</th>
                <th className="px-6 py-4 text-right font-semibold tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody>
              {mockLogistics.map((logistics, i) => (
                <tr key={logistics.id} className="bg-white border-b border-gray-100 hover:bg-slate-50 transition-colors">
                  <td className="px-6 py-4">
                     <div className="font-mono text-slate-800 font-bold tracking-tight">{logistics.id}</div>
                     <div className="text-xs text-[#1B3B6F] mt-1 font-semibold flex items-center gap-1 cursor-pointer hover:underline"><Navigation className="w-3 h-3"/> Route Details</div>
                  </td>
                  <td className="px-6 py-4 text-slate-600 font-medium">{logistics.address}</td>
                  <td className="px-6 py-4 font-semibold text-slate-800 flex items-center gap-2">
                     <div className={`w-6 h-6 rounded-full border border-white shadow-sm flex items-center justify-center text-[8px] text-white font-bold ${logistics.driver === 'Unassigned' ? 'bg-slate-300' : 'bg-[#1B3B6F]'}`}>
                        {logistics.driver !== 'Unassigned' ? logistics.driver[0] : '?'}
                     </div> 
                     {logistics.driver}
                  </td>
                  <td className="px-6 py-4 text-slate-600 font-medium">{logistics.window}</td>
                  <td className="px-6 py-4 text-slate-600 font-bold text-center">{logistics.items} items</td>
                  <td className="px-6 py-4 text-center">
                     <Badge 
                       variant={
                         logistics.status === 'Delivered' ? 'success' : 
                         (logistics.status === 'In Transit' || logistics.status === 'Out for Delivery' ? 'warning' : 
                         (logistics.status === 'Pending Pickup' ? 'error' : 'default'))
                       } 
                       className="font-medium px-3 uppercase tracking-wider text-[10px]"
                     >
                        {logistics.status}
                     </Badge>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button className="p-2 hover:bg-slate-200 rounded-lg text-slate-500 transition-colors">
                      <MoreHorizontal className="w-5 h-5" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Live Map Radar Overlay */}
      <AnimatePresence>
         {isMapOpen && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-8">
               <motion.div 
                 initial={{ opacity: 0 }} 
                 animate={{ opacity: 1 }} 
                 exit={{ opacity: 0 }} 
                 onClick={() => setIsMapOpen(false)}
                 className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
               />

               <motion.div 
                 initial={{ opacity: 0, scale: 0.95, y: 20 }}
                 animate={{ opacity: 1, scale: 1, y: 0 }}
                 exit={{ opacity: 0, scale: 0.95, y: 20 }}
                 className="relative w-full max-w-5xl h-[80vh] bg-slate-900 rounded-[32px] overflow-hidden shadow-2xl border border-slate-700/50 flex flex-col"
               >
                  {/* Header */}
                  <div className="h-16 px-6 border-b border-slate-700/50 flex items-center justify-between bg-slate-900/80 backdrop-blur-md z-10">
                     <div className="flex items-center gap-3 text-white">
                        <MapPin className="w-5 h-5 text-green-400" />
                        <h2 className="font-bold tracking-widest uppercase text-sm">System Radar Interface</h2>
                        <span className="ml-2 px-2 py-0.5 rounded bg-green-500/20 text-green-400 text-xs font-mono font-bold animate-pulse">LIVE SYS</span>
                     </div>
                     <button onClick={() => setIsMapOpen(false)} className="text-slate-400 hover:text-white transition-colors">
                        <X className="w-6 h-6" />
                     </button>
                  </div>

                  {/* Grid Map Body */}
                  <div className="flex-1 relative bg-[#0B1121] overflow-hidden">
                     {/* CSS Grid Pattern simulating radar map */}
                     <div 
                        className="absolute inset-0 opacity-20" 
                        style={{
                          backgroundImage: 'linear-gradient(to right, #1e293b 1px, transparent 1px), linear-gradient(to bottom, #1e293b 1px, transparent 1px)',
                          backgroundSize: '40px 40px'
                        }}
                     />
                     <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-transparent via-[#0B1121]/50 to-[#0B1121] pointer-events-none" />
                     
                     {/* Scanning Radar Line */}
                     <motion.div 
                        animate={{ rotate: 360 }} 
                        transition={{ repeat: Infinity, duration: 8, ease: "linear" }}
                        className="absolute top-1/2 left-1/2 w-[800px] h-[800px] -mt-[400px] -ml-[400px] rounded-full border border-green-500/10 pointer-events-none flex"
                     >
                        <div className="w-1/2 h-1/2 bg-gradient-to-tr from-transparent via-green-500/5 to-transparent rounded-tl-full origin-bottom-right shadow-[0_0_15px_rgba(34,197,94,0.1)]" />
                     </motion.div>

                     {/* Dynamic Location Markers */}
                     {mockLogistics.filter(l => l.driver !== 'Unassigned').map((truck, i) => (
                        <motion.div 
                           key={truck.id}
                           initial={{ left: `${truck.pos.x}%`, top: `${truck.pos.y}%` }}
                           animate={{ 
                             left: [`${truck.pos.x}%`, `${truck.pos.x + (i % 2 === 0 ? 5 : -5)}%`, `${truck.pos.x}%`],
                             top: [`${truck.pos.y}%`, `${truck.pos.y + (i % 3 === 0 ? -4 : 4)}%`, `${truck.pos.y}%`]
                           }}
                           transition={{ repeat: Infinity, duration: 15 + i*2, ease: "linear" }}
                           className="absolute flex flex-col items-center group cursor-pointer"
                        >
                           {/* Ping ripple */}
                           <div className="absolute w-8 h-8 bg-green-500/20 rounded-full animate-ping -z-10" />
                           {/* Marker */}
                           <div className="w-8 h-8 rounded-full bg-slate-800 border-2 border-green-400 flex items-center justify-center text-green-400 shadow-[0_0_15px_rgba(34,197,94,0.3)]">
                              <TruckIcon className="w-4 h-4" />
                           </div>
                           {/* Hover Info */}
                           <div className="mt-2 bg-slate-800 border border-slate-700 px-3 py-1.5 rounded shadow-xl opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none absolute top-full">
                              <p className="text-white font-bold text-xs">{truck.driver}</p>
                              <p className="text-slate-400 text-[10px] font-mono mt-0.5">{truck.id}</p>
                           </div>
                        </motion.div>
                     ))}

                     {/* Headquarter Marker */}
                     <div className="absolute top-1/2 left-1/2 -mt-4 -ml-4 flex flex-col items-center">
                        <div className="w-8 h-8 rounded border-2 border-blue-500 bg-blue-500/20 flex items-center justify-center shadow-[0_0_20px_rgba(59,130,246,0.3)]">
                           <div className="w-2 h-2 bg-blue-400 rounded-full" />
                        </div>
                        <div className="mt-2 bg-blue-900/50 border border-blue-500/30 px-2 py-1 rounded">
                           <p className="text-blue-300 font-bold text-[10px] tracking-widest uppercase">Warehouse A</p>
                        </div>
                     </div>
                  </div>
               </motion.div>
            </div>
         )}
      </AnimatePresence>
    </div>
  );
}
