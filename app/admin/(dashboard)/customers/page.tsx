import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { MoreHorizontal, Search, Mail } from 'lucide-react';
import { Input } from '@/components/ui/Input';

const mockCustomers = [
  { id: 'CUST-391', name: 'Sarah Jenkins', email: 'sarah.j@example.com', joined: 'Jan 2026', totalOrders: 4, ltv: 1250, status: 'Active VIP' },
  { id: 'CUST-842', name: 'Michael Chen', email: 'mchen22@example.com', joined: 'Mar 2026', totalOrders: 1, ltv: 85, status: 'New' },
  { id: 'CUST-119', name: 'Emma Thompson', email: 'emmat@example.com', joined: 'Dec 2025', totalOrders: 6, ltv: 3400, status: 'Active VIP' },
  { id: 'CUST-774', name: 'David Rodriguez', email: 'drod@example.com', joined: 'Sep 2026', totalOrders: 1, ltv: 45, status: 'Churned' },
  { id: 'CUST-502', name: 'Olivia Bennett', email: 'oliviab@example.com', joined: 'Feb 2026', totalOrders: 2, ltv: 420, status: 'Active' },
  { id: 'CUST-299', name: 'James Wilson', email: 'jwilson@example.com', joined: 'Aug 2026', totalOrders: 1, ltv: 330, status: 'At Risk' }
];

export default function AdminCustomers() {
  return (
    <div className="w-full">
      <div className="flex justify-between items-center mb-8">
         <h1 className="text-3xl font-bold text-slate-800 tracking-tight">Customer CRM</h1>
         <div className="relative w-72">
           <Input placeholder="Search records by email..." className="h-10 pl-10 rounded-xl" />
           <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
         </div>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="text-xs text-slate-500 uppercase bg-slate-50 border-b border-gray-200">
              <tr>
                 <th className="w-12 px-6 py-4"><input type="checkbox" className="rounded text-[#1B3B6F] focus:ring-[#1B3B6F]" /></th>
                <th className="px-6 py-4 font-semibold tracking-wider">Customer</th>
                <th className="px-6 py-4 font-semibold tracking-wider">Joined</th>
                <th className="px-6 py-4 font-semibold tracking-wider text-center">Total Orders</th>
                <th className="px-6 py-4 font-semibold tracking-wider text-right">LTV</th>
                <th className="px-6 py-4 font-semibold tracking-wider text-center">Status</th>
                <th className="px-6 py-4 text-right font-semibold tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody>
              {mockCustomers.map((customer, i) => (
                <tr key={customer.id} className="bg-white border-b border-gray-100 hover:bg-slate-50 transition-colors">
                  <td className="px-6 py-4"><input type="checkbox" className="rounded text-[#1B3B6F] focus:ring-[#1B3B6F]" /></td>
                  <td className="px-6 py-4">
                     <div className="font-semibold text-slate-800 text-base">{customer.name}</div>
                     <div className="flex items-center gap-2 text-xs text-slate-400 mt-0.5">
                        <Mail className="w-3 h-3" /> {customer.email}
                     </div>
                  </td>
                  <td className="px-6 py-4 text-slate-600 font-medium">{customer.joined}</td>
                  <td className="px-6 py-4 text-slate-600 font-bold text-center">{customer.totalOrders}</td>
                  <td className="px-6 py-4 font-bold text-[#1B3B6F] text-right text-base">${customer.ltv}</td>
                  <td className="px-6 py-4 text-center">
                     <Badge 
                       variant={
                         customer.status.includes('VIP') ? 'success' : 
                         (customer.status === 'New' || customer.status === 'Active' ? 'default' : 
                         (customer.status === 'At Risk' ? 'warning' : 'error'))
                       } 
                       className={`font-medium px-3 uppercase tracking-wider text-[10px] ${customer.status === 'New' ? 'bg-blue-100 text-blue-700' : ''}`}
                     >
                        {customer.status}
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
    </div>
  );
}
