import { db } from "@/lib/db";
import Link from "next/link";
import { redirect } from "next/navigation";
import { auth } from "@clerk/nextjs/server";
import { deleteProduct } from "@/lib/actions";

export default async function AdminProductsPage() {
  const { userId } = await auth();
  if (!userId) redirect("/");

  const products = await db.product.findMany({
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="p-10 max-w-6xl mx-auto">
      
      {/* NEW: Back Button */}
      <div className="mb-6">
        <Link 
          href="/admin" 
          className="text-gray-400 hover:text-white transition-colors"
        >
          ← Back to Dashboard
        </Link>
      </div>

      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-white">Inventory</h1>
        <Link 
          href="/admin/products/new" 
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 font-medium"
        >
          + Add Product
        </Link>
      </div>

      {/* Table Container */}
      <div className="bg-white rounded-lg shadow overflow-hidden border">
        <table className="w-full text-left">
          <thead className="bg-gray-100 border-b">
            <tr>
              <th className="p-4 font-semibold text-gray-600">Image</th>
              <th className="p-4 font-semibold text-gray-600">Name</th>
              <th className="p-4 font-semibold text-gray-600">Stock</th>
              <th className="p-4 font-semibold text-gray-600">Price</th>
              <th className="p-4 font-semibold text-gray-600">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y">
            {products.map((product) => (
              <tr key={product.id} className="hover:bg-gray-50 bg-white">
                <td className="p-4">
                  {product.imageUrl ? (
                     <img 
                       src={product.imageUrl} 
                       alt={product.name} 
                       className="w-12 h-12 object-cover rounded border" 
                     />
                  ) : (
                    <div className="w-12 h-12 bg-gray-200 rounded flex items-center justify-center text-xs text-gray-500">
                      No Img
                    </div>
                  )}
                </td>
                
                <td className="p-4 font-medium text-gray-900">
                  {product.name}
                </td>
                
                <td className="p-4 text-gray-600">
                  {product.stock === 0 ? (
                    <span className="bg-red-100 text-red-800 px-2 py-1 rounded text-xs font-bold">
                      Out of Stock
                    </span>
                  ) : (
                    <span className="text-gray-900">{product.stock} units</span>
                  )}
                </td>
                
                <td className="p-4 font-medium text-gray-900">
                  ${product.price.toString()}
                </td>
                
                <td className="p-4">
                  <div className="flex gap-3 items-center">
                    <Link 
                      href={`/admin/products/${product.id}/edit`} 
                      className="text-blue-600 hover:underline font-medium"
                    >
                      Edit
                    </Link>
                    
                    <form action={deleteProduct.bind(null, product.id)}>
                      <button 
                        type="submit" 
                        className="text-red-600 hover:underline font-medium bg-transparent border-none cursor-pointer"
                      >
                        Delete
                      </button>
                    </form>
                  </div>
                </td>
              </tr>
            ))}

            {products.length === 0 && (
               <tr className="bg-white">
                 <td colSpan={5} className="p-8 text-center text-gray-500">
                   No products found. Click "Add Product" to create one.
                 </td>
               </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}