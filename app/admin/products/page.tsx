import { db } from "@/lib/db";
import Link from "next/link";
import { redirect } from "next/navigation";
import { auth } from "@clerk/nextjs/server";
import { deleteProduct } from "@/lib/actions";

// ⚠️ FORCE DYNAMIC: Ensures the list refreshes instantly after adds/deletes
export const dynamic = 'force-dynamic';

export default async function AdminProductsPage() {
  const { userId } = await auth();
  if (!userId) redirect("/");

  const products = await db.product.findMany({
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="p-10 max-w-6xl mx-auto min-h-screen">
      
      {/* Back Button */}
      <div className="mb-8">
        <Link 
          href="/admin" 
          className="text-gray-400 hover:text-white transition-colors flex items-center gap-2 text-sm font-medium"
        >
          ← Back to Dashboard
        </Link>
      </div>

      {/* Page Header */}
      <div className="flex justify-between items-end mb-8">
        <div>
          <h1 className="text-4xl font-extrabold text-white tracking-tight">Inventory</h1>
          <p className="text-gray-500 mt-2">Manage your products, prices, and stock levels.</p>
        </div>
        
        <Link 
          href="/admin/products/new" 
          className="bg-white text-black px-6 py-3 rounded-lg font-bold hover:bg-gray-200 transition shadow-[0_0_15px_rgba(255,255,255,0.1)] flex items-center gap-2"
        >
          <span className="text-xl leading-none">+</span> Add Product
        </Link>
      </div>

      {/* Dark Table Container */}
      <div className="bg-gray-900 rounded-xl shadow-2xl overflow-hidden border border-gray-800">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            
            {/* Table Header */}
            <thead className="bg-gray-800/50 text-gray-400 uppercase text-xs tracking-wider">
              <tr>
                <th className="p-5 font-medium">Product</th>
                <th className="p-5 font-medium">Stock Status</th>
                <th className="p-5 font-medium">Price</th>
                <th className="p-5 font-medium text-right">Actions</th>
              </tr>
            </thead>

            {/* Table Body */}
            <tbody className="divide-y divide-gray-800">
              {products.map((product) => (
                <tr key={product.id} className="group hover:bg-gray-800/50 transition duration-150">
                  
                  {/* Product Info Column */}
                  <td className="p-5">
                    <div className="flex items-center gap-4">
                      <div className="h-16 w-16 bg-gray-800 rounded-lg border border-gray-700 overflow-hidden flex-shrink-0 relative">
                        {product.imageUrl ? (
                          <img 
                            src={product.imageUrl} 
                            alt={product.name} 
                            className="w-full h-full object-cover" 
                          />
                        ) : (
                          <div className="flex items-center justify-center h-full text-xs text-gray-500">No Img</div>
                        )}
                      </div>
                      <div>
                        <h3 className="font-bold text-white text-lg group-hover:text-blue-400 transition-colors">{product.name}</h3>
                        <span className="text-xs text-gray-500">ID: {product.id.slice(0, 8)}...</span>
                      </div>
                    </div>
                  </td>
                  
                  {/* Stock Column */}
                  <td className="p-5">
                    {product.stock === 0 ? (
                      <span className="inline-flex items-center gap-1.5 bg-red-500/10 text-red-400 px-3 py-1 rounded-full text-xs font-bold border border-red-500/20">
                        <span className="w-1.5 h-1.5 rounded-full bg-red-500"></span> Out of Stock
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1.5 bg-green-500/10 text-green-400 px-3 py-1 rounded-full text-xs font-bold border border-green-500/20">
                        <span className="w-1.5 h-1.5 rounded-full bg-green-500"></span> {product.stock} in stock
                      </span>
                    )}
                  </td>
                  
                  {/* Price Column */}
                  <td className="p-5">
                    <span className="font-mono text-white font-medium text-lg">
                      ${product.price.toString()}
                    </span>
                  </td>
                  
                  {/* Actions Column */}
                  <td className="p-5 text-right">
                    <div className="flex justify-end items-center gap-3">
                      <Link 
                        href={`/admin/products/${product.id}/edit`} 
                        className="text-gray-400 hover:text-white hover:bg-gray-700 px-3 py-2 rounded-md transition text-sm font-medium"
                      >
                        Edit
                      </Link>
                      
                      <form action={deleteProduct.bind(null, product.id)}>
                        <button 
                          type="submit" 
                          className="text-red-500 hover:text-red-400 hover:bg-red-500/10 px-3 py-2 rounded-md transition text-sm font-medium"
                        >
                          Delete
                        </button>
                      </form>
                    </div>
                  </td>
                </tr>
              ))}

              {/* Empty State */}
              {products.length === 0 && (
                 <tr>
                   <td colSpan={4} className="p-12 text-center">
                     <div className="flex flex-col items-center justify-center text-gray-500">
                       <div className="w-16 h-16 bg-gray-800 rounded-full flex items-center justify-center mb-4 text-2xl">📦</div>
                       <h3 className="text-lg font-medium text-white mb-1">No products yet</h3>
                       <p className="text-sm mb-6">Get started by adding your first product to the inventory.</p>
                       <Link 
                          href="/admin/products/new" 
                          className="text-blue-400 hover:text-blue-300 underline"
                       >
                          Create Product
                       </Link>
                     </div>
                   </td>
                 </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}