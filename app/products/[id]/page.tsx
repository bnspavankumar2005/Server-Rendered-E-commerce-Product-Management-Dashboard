import { db } from "@/lib/db";
import { notFound } from "next/navigation";
import Link from "next/link";
import AddToCartButton from "@/components/AddToCartButton";

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

  // ✅ FIX: Create a "Clean" version of the product for the Client Component
  // We convert the 'Decimal' price to a simple 'Number' here.
  const productForCart = {
    ...product,
    price: product.price.toNumber(), 
  };

  const isOutOfStock = product.stock === 0;

  return (
    <div className="p-10 max-w-6xl mx-auto min-h-screen">
      
      <div className="mb-6">
        <Link 
          href="/" 
          className="text-gray-400 hover:text-white transition-colors flex items-center gap-2"
        >
          ← Back to Store
        </Link>
      </div>

      <div className="bg-white rounded-xl shadow-lg p-8 md:p-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          
          {/* Left Side: Image */}
          <div className="bg-gray-100 rounded-lg overflow-hidden flex items-center justify-center min-h-[400px] border">
            {product.imageUrl ? (
              <img 
                src={product.imageUrl} 
                alt={product.name} 
                className="w-full h-full object-cover hover:scale-105 transition duration-500"
              />
            ) : (
              <span className="text-gray-400 text-xl">No Image Available</span>
            )}
          </div>

          {/* Right Side: Details */}
          <div className="flex flex-col justify-center">
            <h1 className="text-4xl font-extrabold mb-4 text-gray-900">{product.name}</h1>
            
            <div className="flex items-center gap-4 mb-6">
              <p className="text-3xl text-green-700 font-bold">
                ${product.price.toString()}
              </p>
              
              {isOutOfStock ? (
                <span className="bg-red-100 text-red-700 px-3 py-1 rounded-full text-sm font-semibold">
                  Out of Stock
                </span>
              ) : (
                <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-semibold">
                  {product.stock} in stock
                </span>
              )}
            </div>
            
            <p className="text-gray-600 leading-relaxed mb-8 text-lg">
              {product.description || "No description provided."}
            </p>

            {/* ✅ FIX: Pass the 'productForCart' (with number price) instead of 'product' (with Decimal) */}
            <AddToCartButton product={productForCart} disabled={isOutOfStock} />
            
          </div>

        </div>
      </div>
    </div>
  );
}