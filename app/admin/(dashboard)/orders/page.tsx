import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { MoreHorizontal, Download, Filter } from 'lucide-react';
import Image from 'next/image';

const mockOrders = [
  { id: 'ORD-7729-A', customer: 'Sarah Jenkins', email: 'sarah.j@example.com', date: 'Oct 12, 2026', amount: 145, status: 'Active', items: 3 },
  { id: 'ORD-8812-B', customer: 'Michael Chen', email: 'mchen22@example.com', date: 'Oct 10, 2026', amount: 85, status: 'Pending Delivery', items: 1 },
  { id: 'ORD-9021-C', customer: 'Emma Thompson', email: 'emmat@example.com', date: 'Oct 08, 2026', amount: 210, status: 'Active', items: 4 },
  { id: 'ORD-3341-X', customer: 'David Rodriguez', email: 'drod@example.com', date: 'Sep 29, 2026', amount: 45, status: 'Returned', items: 1 },
  { id: 'ORD-5511-Y', customer: 'Olivia Bennett', email: 'oliviab@example.com', date: 'Sep 25, 2026', amount: 120, status: 'Active', items: 2 },
  { id: 'ORD-7612-Z', customer: 'James Wilson', email: 'jwilson@example.com', date: 'Sep 15, 2026', amount: 330, status: 'Overdue', items: 5 }
];

export default function AdminOrders() {
  return (
    <div className="w-full">
      <div className="flex justify-between items-center mb-8">
         <h1 className="text-3xl font-bold text-slate-800 tracking-tight">Active Subscriptions</h1>
         <div className="flex gap-3">
           <Button variant="secondary" className="rounded-xl h-10 px-4 bg-white"><Filter className="w-4 h-4 mr-2" /> Filter</Button>
           <Button className="rounded-xl h-10 px-6 bg-[#1B3B6F] hover:bg-[#152e5a] text-white"><Download className="w-4 h-4 mr-2" /> Export CSV</Button>
         </div>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="text-xs text-slate-500 uppercase bg-slate-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-4 font-semibold tracking-wider">Order ID</th>
                <th className="px-6 py-4 font-semibold tracking-wider">Customer</th>
                <th className="px-6 py-4 font-semibold tracking-wider">Date</th>
                <th className="px-6 py-4 font-semibold tracking-wider">MRR</th>
                <th className="px-6 py-4 font-semibold tracking-wider">Items</th>
                <th className="px-6 py-4 font-semibold tracking-wider">Status</th>
                <th className="px-6 py-4 text-right font-semibold tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody>
              {mockOrders.map((order, i) => (
                <tr key={order.id} className="bg-white border-b border-gray-100 hover:bg-slate-50 transition-colors">
                  <td className="px-6 py-4 font-mono text-slate-500 font-medium tracking-tight">{order.id}</td>
                  <td className="px-6 py-4">
                     <div className="font-semibold text-slate-800 text-base">{order.customer}</div>
                     <div className="text-xs text-slate-400 mt-0.5">{order.email}</div>
                  </td>
                  <td className="px-6 py-4 text-slate-600 font-medium">{order.date}</td>
                  <td className="px-6 py-4 font-bold text-[#1B3B6F] text-base">${order.amount}<span className="text-xs text-slate-400 ml-1 font-medium">/mo</span></td>
                  <td className="px-6 py-4 text-slate-600 font-medium">{order.items} items</td>
                  <td className="px-6 py-4">
                     <Badge 
                       variant={
                         order.status === 'Active' ? 'success' : 
                         (order.status === 'Pending Delivery' ? 'warning' : 'error')
                       } 
                       className={`font-medium px-3 uppercase tracking-wider text-[10px] ${order.status === 'Returned' ? 'bg-slate-100 text-slate-500' : ''}`}
                     >
                        {order.status}
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
        <div className="px-6 py-4 border-t border-gray-100 bg-slate-50 text-xs text-slate-500 font-medium flex justify-between items-center">
           <span>Showing 6 of 1,249 orders</span>
           <div className="flex gap-2">
              <button className="px-3 py-1 rounded bg-white border border-gray-200 hover:bg-gray-50">Prev</button>
              <button className="px-3 py-1 rounded bg-white border border-gray-200 hover:bg-gray-50">Next</button>
           </div>
        </div>
      </div>
    </div>
  );
}
