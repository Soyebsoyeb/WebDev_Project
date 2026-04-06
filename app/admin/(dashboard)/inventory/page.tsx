import { inventoryMock } from '@/lib/data/inventory.mock';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { MoreHorizontal, Plus } from 'lucide-react';
import Image from 'next/image';

export default function AdminInventory() {
  return (
    <div className="w-full">
      <div className="flex justify-between items-center mb-8">
         <h1 className="text-3xl font-bold text-slate-800">Inventory Management</h1>
         <Button className="rounded-xl h-10 px-6"><Plus className="w-4 h-4 mr-2" /> Add Item</Button>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="text-xs text-slate-500 uppercase bg-slate-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-4 font-semibold tracking-wider">Item</th>
                <th className="px-6 py-4 font-semibold tracking-wider">SKU</th>
                <th className="px-6 py-4 font-semibold tracking-wider">Category</th>
                <th className="px-6 py-4 font-semibold tracking-wider">Monthly Rate</th>
                <th className="px-6 py-4 font-semibold tracking-wider">Status</th>
                <th className="px-6 py-4 text-right font-semibold tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody>
              {inventoryMock.map((item, i) => (
                <tr key={item.id} className="bg-white border-b border-gray-100 hover:bg-slate-50 transition-colors">
                  <td className="px-6 py-4 font-medium text-slate-900 flex items-center gap-4">
                    <div className="w-12 h-12 bg-gray-100 rounded-lg relative overflow-hidden shrink-0 border border-gray-200">
                      <Image src={item.images[0]} alt={item.name} fill className="object-cover" />
                    </div>
                    <span className="font-semibold text-base">{item.name}</span>
                  </td>
                  <td className="px-6 py-4 font-mono text-slate-500 tracking-tight">{item.sku}</td>
                  <td className="px-6 py-4 text-slate-600">{item.category}</td>
                  <td className="px-6 py-4 font-semibold text-slate-700">${item.monthly_price}</td>
                  <td className="px-6 py-4">
                     <Badge variant={i % 3 === 0 ? 'success' : (i % 3 === 1 ? 'warning' : 'default')} className="font-medium px-3">
                        {i % 3 === 0 ? 'Available' : (i % 3 === 1 ? 'Out for Delivery' : 'Rented')}
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
