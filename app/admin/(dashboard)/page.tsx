import { Card, CardContent } from "@/components/ui/Card";
import { ArrowUpRight, Clock, Package } from "lucide-react";

export default function AdminDashboard() {
  return (
    <div className="w-full">
      <h1 className="text-3xl font-bold mb-8 text-slate-800">Operational Dashboard</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <Card className="rounded-[20px] border-none shadow-sm hover:shadow-md transition-shadow">
          <CardContent className="p-6">
             <div className="text-sm font-medium text-slate-500 mb-1">Monthly Revenue</div>
             <div className="text-3xl font-bold text-slate-800">$124,500</div>
             <div className="text-sm text-green-600 font-medium flex items-center mt-2 group cursor-pointer w-fit">
                <ArrowUpRight className="w-4 h-4 mr-1 transition-transform duration-300 group-hover:-translate-y-1 group-hover:translate-x-1" /> +12.5% MTM
             </div>
          </CardContent>
        </Card>
        
        <Card className="rounded-[20px] border-none shadow-sm hover:shadow-md transition-shadow">
          <CardContent className="p-6">
             <div className="text-sm font-medium text-slate-500 mb-1">Active Rentals</div>
             <div className="text-3xl font-bold text-slate-800">1,492</div>
             <div className="text-sm text-green-600 font-medium flex items-center mt-2 group cursor-pointer w-fit">
                <ArrowUpRight className="w-4 h-4 mr-1 transition-transform duration-300 group-hover:-translate-y-1 group-hover:translate-x-1" /> +8.2% MTM
             </div>
          </CardContent>
        </Card>

        <Card className="rounded-[20px] border-none shadow-sm hover:shadow-md transition-shadow">
          <CardContent className="p-6">
             <div className="text-sm font-medium text-slate-500 mb-1">Pending Returns</div>
             <div className="text-3xl font-bold text-amber-600">32</div>
             <div className="text-sm text-amber-700 font-medium flex items-center mt-2">
                <Clock className="w-4 h-4 mr-1" /> 4 Overdue
             </div>
          </CardContent>
        </Card>

        <Card className="rounded-[20px] border-none shadow-sm hover:shadow-md transition-shadow">
          <CardContent className="p-6">
             <div className="text-sm font-medium text-slate-500 mb-1">Low Stock Alerts</div>
             <div className="text-3xl font-bold text-red-600">5</div>
             <div className="text-sm text-red-600 font-medium flex items-center mt-2">
                <Package className="w-4 h-4 mr-1" /> Reorder needed
             </div>
          </CardContent>
        </Card>
      </div>
      
      <div className="bg-white rounded-[24px] shadow-sm p-6 mb-8 h-[400px] border border-gray-200 flex items-center justify-center">
         <div className="text-center">
           <div className="w-16 h-16 border-4 border-dashed border-slate-200 rounded-full mx-auto mb-4 animate-spin-slow"></div>
           <p className="text-slate-500 font-medium">Predictive AI Logistics Map Loading...</p>
         </div>
      </div>
    </div>
  );
}
