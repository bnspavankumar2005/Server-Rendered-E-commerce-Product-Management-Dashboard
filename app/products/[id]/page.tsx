import { db } from "@/lib/db";
import { notFound } from "next/navigation";
import Link from "next/link";
import AddToCartButton from "@/components/AddToCartButton";

// Force dynamic rendering to ensure stock status is always fresh
export const dynamic = 'force-dynamic';

export default async function ProductDetailPage({ 
  params 
}: { 
  params: Promise<{ id: string }> 
}) {
  
  const { id } = await params;

  const product = await db.product.findUnique({
    where: { id: id },
  });

  if (!product) {
    return notFound();
  }

  // ✅ Clean version for Client Component (Decimal -> Number)
  const productForCart = {
    ...product,
    price: product.price.toNumber(), 
  };

  const isOutOfStock = product.stock === 0;

  return (
    <div className="p-10 max-w-6xl mx-auto min-h-screen flex flex-col justify-center">
      
      {/* Back Button */}
      <div className="mb-8">
        <Link 
          href="/" 
          className="text-gray-400 hover:text-white transition-colors flex items-center gap-2 text-sm font-medium"
        >
          ← Back to Store
        </Link>
      </div>

      {/* Main Product Card */}
      <div className="bg-gray-900 rounded-2xl shadow-2xl border border-gray-800 overflow-hidden">
        <div className="grid grid-cols-1 md:grid-cols-2">
          
          {/* Left Side: Image */}
          <div className="bg-gray-800 relative min-h-[500px] flex items-center justify-center p-8 group overflow-hidden">
            {product.imageUrl ? (
              <img 
                src={product.imageUrl} 
                alt={product.name} 
                className="w-full h-full object-contain relative z-10 transition-transform duration-500 group-hover:scale-110"
              />
            ) : (
              <div className="flex flex-col items-center text-gray-600">
                <span className="text-6xl mb-4">📷</span>
                <span className="text-lg font-medium">No Image Available</span>
              </div>
            )}
            {/* Subtle glow effect behind image */}
            <div className="absolute inset-0 bg-gradient-to-tr from-gray-900 via-transparent to-transparent opacity-60"></div>
          </div>

          {/* Right Side: Details */}
          <div className="p-10 md:p-14 flex flex-col justify-center bg-gray-900">
            
            {/* Stock Badge */}
            <div className="mb-6">
              {isOutOfStock ? (
                <span className="inline-flex items-center gap-2 bg-red-500/10 text-red-400 px-4 py-1.5 rounded-full text-sm font-bold border border-red-500/20 uppercase tracking-wide">
                  <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></span> Out of Stock
                </span>
              ) : (
                <span className="inline-flex items-center gap-2 bg-green-500/10 text-green-400 px-4 py-1.5 rounded-full text-sm font-bold border border-green-500/20 uppercase tracking-wide">
                  <span className="w-2 h-2 rounded-full bg-green-500"></span> {product.stock} In Stock
                </span>
              )}
            </div>

            <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-6 leading-tight">
              {product.name}
            </h1>
            
            <p className="text-gray-400 text-lg leading-relaxed mb-10 border-l-4 border-gray-700 pl-6">
              {product.description || "No description provided for this product."}
            </p>

            {/* Price Section */}
            <div className="flex items-end gap-2 mb-10">
              <span className="text-5xl font-bold text-white tracking-tight">
                ${product.price.toString()}
              </span>
              <span className="text-gray-500 mb-2 font-medium">USD</span>
            </div>

            {/* Add to Cart Button Container */}
            <div className="mt-auto">
              <AddToCartButton product={productForCart} disabled={isOutOfStock} />
            </div>
            
          </div>

        </div>
      </div>
    </div>
  );
}