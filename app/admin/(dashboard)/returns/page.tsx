'use client';
import { useState } from 'react';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { MoreHorizontal, Search, RefreshCcw, AlertTriangle } from 'lucide-react';
import { Input } from '@/components/ui/Input';
import { toast } from 'sonner';
import { motion, AnimatePresence } from 'framer-motion';

const initialReturns = [
  { id: 'RMA-4421-A', customer: 'David Rodriguez', date: 'Oct 14, 2026', reason: 'Moving to new city', condition: 'Excellent', status: 'Pending Insp.', type: 'Standard Return' },
  { id: 'RMA-8812-B', customer: 'Sarah L.', date: 'Oct 12, 2026', reason: 'Minor fabric tear', condition: 'Damaged', status: 'Requires Review', type: 'Warranty Claim' },
  { id: 'RMA-9021-C', customer: 'James Wilson', date: 'Oct 10, 2026', reason: 'Does not fit space', condition: 'Like New', status: 'Approved', type: 'Exchange' },
  { id: 'RMA-3341-X', address: 'Unassigned', customer: 'Alice Cooper', date: 'Oct 05, 2026', reason: 'End of lease term', condition: 'Pending', status: 'Scheduled Pickup', type: 'Standard Return' },
  { id: 'RMA-5511-Y', customer: 'Marcus R.', date: 'Sep 29, 2026', reason: 'Style mismatch', condition: 'Excellent', status: 'Refunded', type: 'Standard Return' }
];

export default function AdminReturns() {
  const [isSyncing, setIsSyncing] = useState(false);
  const [returns, setReturns] = useState(initialReturns);
  const [pendingCount, setPendingCount] = useState(14);

  const handleSync = () => {
     setIsSyncing(true);
     toast.loading('Synchronizing with Stripe Gateway...', { id: 'sync' });
     
     // Simulate intricate network handshake and data fetching
     setTimeout(() => {
        setIsSyncing(false);
        const newRMA = {
           id: `RMA-${Math.floor(Math.random() * 9000)}-N`,
           customer: 'New Synchronization',
           date: 'Just Now',
           reason: 'Color mismatch',
           condition: 'Pending',
           status: 'Pending Insp.',
           type: 'Exchange'
        };
        // Inject new data to simulate a live system
        setReturns(prev => [newRMA, ...prev]);
        setPendingCount(prev => prev + 1);
        toast.success(`Gateway synchronized: 1 New RMA retrieved.`, { id: 'sync' });
     }, 2000);
  };

  return (
    <div className="w-full relative overflow-hidden">
      <div className="flex justify-between items-center mb-8">
         <h1 className="text-3xl font-bold text-slate-800 tracking-tight">Returns & RMAs</h1>
         <div className="flex gap-4">
           <div className="relative w-80">
             <Input placeholder="Search RMA or Customer..." className="h-10 pl-10 rounded-xl bg-white" />
             <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
           </div>
           <Button 
             onClick={handleSync}
             disabled={isSyncing}
             variant="secondary" 
             className="rounded-xl h-10 px-6 bg-white shadow-sm border border-slate-200 transition-all active:scale-95 disabled:opacity-80 relative overflow-hidden group"
           >
             {/* Progress bar effect under button */}
             {isSyncing && <motion.div initial={{width:0}} animate={{width:'100%'}} transition={{duration:2}} className="absolute bottom-0 left-0 h-1 bg-blue-500" />}
             
             <RefreshCcw className={`w-4 h-4 mr-2 relative z-10 ${isSyncing ? 'animate-spin text-blue-500' : 'text-slate-500 group-hover:text-blue-500 transition-colors'}`} /> 
             <span className="relative z-10">{isSyncing ? 'Syncing...' : 'Sync Gateway'}</span>
           </Button>
         </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
         {[
           { label: 'Pending Inspections', value: pendingCount, alert: true },
           { label: 'Scheduled Pickups', value: 8, alert: false },
           { label: 'Avg Processing Time', value: '1.2 Days', alert: false },
           { label: 'Damaged Rate', value: '4.1%', alert: false }
         ].map(stat => (
            <motion.div 
               key={stat.label} 
               layout // Allows the number inside to smoothly iterate width blocks
               className={`bg-white p-6 rounded-2xl shadow-sm border ${stat.alert ? 'border-amber-200 bg-amber-50/30' : 'border-gray-200'}`}
            >
               <div className="text-sm font-semibold text-slate-500 uppercase tracking-wider flex items-center gap-2">
                 {stat.alert && <AlertTriangle className={`w-4 h-4 ${isSyncing ? 'animate-pulse text-amber-400' : 'text-amber-500'}`} />} {stat.label}
               </div>
               <motion.div layout className={`text-3xl font-bold mt-2 ${stat.alert ? 'text-amber-600' : 'text-[#1B3B6F]'}`}>{stat.value}</motion.div>
            </motion.div>
         ))}
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto min-h-[400px]">
          <table className="w-full text-sm text-left">
            <thead className="text-xs text-slate-500 uppercase bg-slate-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-4 font-semibold tracking-wider">RMA #</th>
                <th className="px-6 py-4 font-semibold tracking-wider">Customer</th>
                <th className="px-6 py-4 font-semibold tracking-wider">Return Type</th>
                <th className="px-6 py-4 font-semibold tracking-wider">Reason</th>
                <th className="px-6 py-4 font-semibold tracking-wider">Condition</th>
                <th className="px-6 py-4 font-semibold tracking-wider text-center">Status</th>
                <th className="px-6 py-4 text-right font-semibold tracking-wider">Actions</th>
              </tr>
            </thead>
            {/* Must use motion.tbody for AnimatePresence of children rows to work correctly in tables visually */}
            <motion.tbody>
              <AnimatePresence initial={false}>
                 {returns.map((rma, i) => (
                   <motion.tr 
                     key={rma.id}
                     initial={{ opacity: 0, backgroundColor: '#f0f9ff' }}
                     animate={{ opacity: 1, backgroundColor: '#ffffff' }}
                     transition={{ duration: 1 }}
                     className="border-b border-gray-100 hover:bg-slate-50 transition-colors"
                   >
                     <td className="px-6 py-4">
                        <span className="font-mono text-slate-800 font-bold tracking-tight">{rma.id}</span>
                        {rma.date === 'Just Now' && <span className="ml-2 px-1.5 py-0.5 rounded text-[9px] font-bold bg-blue-100 text-blue-600 uppercase">New</span>}
                     </td>
                     <td className="px-6 py-4 font-semibold text-slate-800">{rma.customer}</td>
                     <td className="px-6 py-4">
                        <span className={`px-2 py-1 text-xs font-bold rounded capitalize tracking-wider ${rma.type === 'Warranty Claim' ? 'bg-amber-100 text-amber-800' : (rma.type === 'Exchange' ? 'bg-blue-100 text-blue-800' : 'bg-slate-100 text-slate-600')}`}>
                           {rma.type}
                        </span>
                     </td>
                     <td className="px-6 py-4 text-slate-600 italic">"{rma.reason}"</td>
                     <td className="px-6 py-4 font-semibold text-slate-800">{rma.condition}</td>
                     <td className="px-6 py-4 text-center">
                        <Badge 
                          variant={
                            rma.status === 'Refunded' || rma.status === 'Approved' ? 'success' : 
                            (rma.status === 'Pending Insp.' || rma.status === 'Scheduled Pickup' ? 'warning' : 'error')
                          } 
                          className="font-medium px-3 uppercase tracking-wider text-[10px]"
                        >
                           {rma.status}
                        </Badge>
                     </td>
                     <td className="px-6 py-4 text-right">
                       <button className="p-2 hover:bg-slate-200 rounded-lg text-slate-500 transition-colors">
                         <MoreHorizontal className="w-5 h-5" />
                       </button>
                     </td>
                   </motion.tr>
                 ))}
              </AnimatePresence>
            </motion.tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
