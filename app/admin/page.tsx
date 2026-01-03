import { db } from "@/lib/db";
import Link from "next/link";
import StockChart from "@/components/admin/StockChart";

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
    <div className="p-10 max-w-6xl mx-auto">
      
      {/* Back Button */}
      <div className="mb-6">
        <Link 
          href="/" 
          className="text-gray-400 hover:text-white transition-colors"
        >
          ← Back to Store
        </Link>
      </div>

      <h1 className="text-4xl font-bold mb-8 text-white">Dashboard Overview</h1>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        
        {/* Card 1: Total Products - Blue */}
        <div className="bg-blue-100 border border-blue-300 p-6 rounded-lg shadow-sm">
          <h3 className="text-blue-800 font-semibold mb-2">Total Products</h3>
          <p className="text-4xl font-bold text-blue-900">{totalProducts}</p>
        </div>

        {/* Card 2: Inventory Value - Green */}
        <div className="bg-green-100 border border-green-300 p-6 rounded-lg shadow-sm">
          <h3 className="text-green-800 font-semibold mb-2">Inventory Value</h3>
          <p className="text-4xl font-bold text-green-900">${totalValue.toLocaleString()}</p>
        </div>

        {/* Card 3: Out of Stock - Red (Dynamic) */}
        <div className={`border p-6 rounded-lg shadow-sm ${outOfStock > 0 ? 'bg-red-100 border-red-300' : 'bg-gray-100 border-gray-300'}`}>
          <h3 className={`${outOfStock > 0 ? 'text-red-800' : 'text-gray-800'} font-semibold mb-2`}>Out of Stock</h3>
          <p className={`text-4xl font-bold ${outOfStock > 0 ? 'text-red-900' : 'text-gray-900'}`}>{outOfStock}</p>
        </div>
      </div>

      {/* CHART SECTION */}
      <div className="mb-10">
        <StockChart data={products} />
      </div>

      {/* Manage Inventory Section */}
      <div className="bg-white border rounded-lg p-8 text-center shadow-sm">
        <h2 className="text-2xl font-bold mb-4 text-gray-900">Manage Your Inventory</h2>
        <Link href="/admin/products" className="inline-block bg-black text-white px-8 py-3 rounded-lg hover:bg-gray-800">
          Go to Products List →
        </Link>
      </div>
    </div>
  );
}