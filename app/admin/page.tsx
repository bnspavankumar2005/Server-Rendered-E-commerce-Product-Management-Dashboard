import { db } from "@/lib/db";
import Link from "next/link";
import StockChart from "@/components/admin/StockChart";

// ⚠️ CRITICAL: Forces Next.js to fetch fresh data on every visit
export const dynamic = 'force-dynamic';

export default async function AdminDashboardPage() {
  
  const totalProducts = await db.product.count();
  const outOfStock = await db.product.count({ where: { stock: 0 } });
  
  // Fetch products for the chart (Limit to top 10)
  const products = await db.product.findMany({
    take: 10,
    orderBy: { stock: 'desc' },
    select: { name: true, stock: true }
  });

  // Calculate Value
  const allProducts = await db.product.findMany();
  const totalValue = allProducts.reduce((sum, p) => sum + (Number(p.price) * p.stock), 0);

  return (
    <div className="p-10 max-w-6xl mx-auto min-h-screen">
      
      {/* Back Button */}
      <div className="mb-8">
        <Link 
          href="/" 
          className="text-gray-400 hover:text-white transition-colors flex items-center gap-2 text-sm font-medium"
        >
          ← Back to Store
        </Link>
      </div>

      <div className="flex justify-between items-end mb-10">
        <h1 className="text-4xl font-extrabold text-white tracking-tight">Admin Dashboard</h1>
        <span className="text-gray-500 text-sm">Overview of your store performance</span>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        
        {/* Card 1: Total Products - Blue Accent */}
        <div className="bg-gray-900 border border-gray-800 p-6 rounded-xl shadow-lg relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-20 h-20 bg-blue-500/10 rounded-bl-full -mr-4 -mt-4 transition group-hover:bg-blue-500/20"></div>
          <h3 className="text-gray-400 font-medium mb-1 text-sm uppercase tracking-wider">Total Products</h3>
          <p className="text-4xl font-bold text-white group-hover:text-blue-400 transition-colors">{totalProducts}</p>
        </div>

        {/* Card 2: Inventory Value - Green Accent */}
        <div className="bg-gray-900 border border-gray-800 p-6 rounded-xl shadow-lg relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-20 h-20 bg-green-500/10 rounded-bl-full -mr-4 -mt-4 transition group-hover:bg-green-500/20"></div>
          <h3 className="text-gray-400 font-medium mb-1 text-sm uppercase tracking-wider">Inventory Value</h3>
          <p className="text-4xl font-bold text-white group-hover:text-green-400 transition-colors">
            ${totalValue.toLocaleString()}
          </p>
        </div>

        {/* Card 3: Out of Stock - Red Accent */}
        <div className={`border p-6 rounded-xl shadow-lg relative overflow-hidden group transition-all ${outOfStock > 0 ? 'bg-red-900/10 border-red-900/50' : 'bg-gray-900 border-gray-800'}`}>
          <div className={`absolute top-0 right-0 w-20 h-20 rounded-bl-full -mr-4 -mt-4 transition ${outOfStock > 0 ? 'bg-red-500/20' : 'bg-gray-700/10'}`}></div>
          <h3 className={`font-medium mb-1 text-sm uppercase tracking-wider ${outOfStock > 0 ? 'text-red-300' : 'text-gray-400'}`}>Out of Stock</h3>
          <p className={`text-4xl font-bold ${outOfStock > 0 ? 'text-red-500' : 'text-white'}`}>
            {outOfStock}
          </p>
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Chart Section (Takes up 2 columns) */}
        <div className="lg:col-span-2 bg-gray-900 border border-gray-800 p-6 rounded-xl shadow-lg">
          <h2 className="text-xl font-bold mb-6 text-white flex items-center gap-2">
            <span className="w-2 h-6 bg-purple-500 rounded-full"></span>
            Stock Level Analysis
          </h2>
          <div className="h-[300px] w-full">
            <StockChart data={products} />
          </div>
        </div>

        {/* Quick Actions (Takes up 1 column) */}
        <div className="bg-gray-900 border border-gray-800 p-6 rounded-xl shadow-lg flex flex-col justify-center text-center h-full">
          <div className="mb-6">
            <div className="w-16 h-16 bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl">
              📦
            </div>
            <h2 className="text-xl font-bold text-white mb-2">Inventory Management</h2>
            <p className="text-gray-400 text-sm px-4">Add new items, update prices, or restock sold-out products.</p>
          </div>
          
          <Link 
            href="/admin/products" 
            className="w-full bg-white text-black font-bold py-4 rounded-lg hover:bg-gray-200 transition transform active:scale-95 shadow-[0_0_20px_rgba(255,255,255,0.1)]"
          >
            Manage Products →
          </Link>
        </div>

      </div>
    </div>
  );
}