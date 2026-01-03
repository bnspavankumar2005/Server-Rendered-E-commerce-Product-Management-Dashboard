import { db } from "@/lib/db";
import Link from "next/link";
import { UserButton, SignInButton, SignedIn, SignedOut } from "@clerk/nextjs";

export default async function HomePage({
  searchParams,
}: {
  searchParams: Promise<{ query?: string }>;
}) {
  
  const { query } = await searchParams;

  const products = await db.product.findMany({
    where: {
      name: {
        contains: query || "",
        mode: "insensitive",
      },
    },
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="p-10 max-w-6xl mx-auto">
      
      {/* HEADER SECTION */}
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-4xl font-extrabold tracking-tight text-white">My Store</h1>
        
        <div className="flex items-center gap-4">
          <SignedOut>
            <SignInButton mode="modal">
              <button className="text-sm font-medium text-gray-300 hover:text-white underline">
                Admin Login
              </button>
            </SignInButton>
          </SignedOut>

          <SignedIn>
            <Link href="/admin" className="text-sm font-medium text-gray-300 hover:text-white underline mr-4">
              Dashboard
            </Link>
            <UserButton afterSignOutUrl="/" />
          </SignedIn>
        </div>
      </div>

      {/* SEARCH BAR */}
      <form className="mb-10 flex gap-2 max-w-md">
        <input 
          name="query" 
          defaultValue={query} 
          placeholder="Search products..." 
          suppressHydrationWarning
          className="bg-white border p-3 rounded-lg w-full shadow-sm focus:ring-2 focus:ring-blue-500 outline-none text-black placeholder-gray-500"
        />
        <button 
          type="submit"
          suppressHydrationWarning
          className="bg-white text-black px-6 py-3 rounded-lg font-semibold hover:bg-gray-200 transition"
        >
          Search
        </button>
        
        {query && (
          <Link 
            href="/" 
            className="border border-gray-600 text-white px-4 py-3 rounded-lg hover:bg-gray-800 flex items-center"
          >
            ❌
          </Link>
        )}
      </form>

      {/* Product Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <Link 
            key={product.id} 
            href={`/products/${product.id}`} 
            className="group block"
          >
            <div className={`bg-white border rounded-lg p-5 shadow-sm hover:shadow-md transition h-full flex flex-col text-gray-900 ${product.stock === 0 ? 'opacity-75' : ''}`}>
              
              {product.imageUrl ? (
                <div className="relative h-48 mb-4 overflow-hidden rounded bg-gray-100">
                  <img 
                    src={product.imageUrl} 
                    alt={product.name} 
                    className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
                  />
                  {/* Overlay Badge for Out of Stock */}
                  {product.stock === 0 && (
                    <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                       <span className="bg-red-600 text-white px-3 py-1 rounded font-bold text-sm shadow">Out of Stock</span>
                    </div>
                  )}
                </div>
              ) : (
                <div className="h-48 bg-gray-200 rounded mb-4 flex items-center justify-center text-gray-400 relative">
                  No Image
                  {product.stock === 0 && (
                     <div className="absolute inset-0 flex items-center justify-center">
                        <span className="bg-red-600 text-white px-3 py-1 rounded font-bold text-sm shadow">Out of Stock</span>
                     </div>
                  )}
                </div>
              )}

              <h2 className="font-bold text-lg mb-1 text-gray-900">{product.name}</h2>
              
              {/* ✅ NEW: Stock Status Indicator */}
              <div className="mb-3">
                {product.stock === 0 ? (
                  <span className="text-red-600 text-sm font-bold flex items-center gap-1">
                    ● Out of Stock
                  </span>
                ) : (
                  <span className="text-green-600 text-sm font-medium flex items-center gap-1">
                    ● {product.stock} In Stock
                  </span>
                )}
              </div>
              
              <div className="mt-auto flex justify-between items-center">
                <span className={`font-bold text-xl ${product.stock === 0 ? 'text-gray-400' : 'text-green-700'}`}>
                  ${product.price.toString()}
                </span>
                <button 
                  suppressHydrationWarning
                  className={`px-3 py-1 rounded text-sm ${product.stock === 0 ? 'bg-gray-200 text-gray-500' : 'bg-black text-white hover:bg-gray-800'}`}
                >
                  {product.stock === 0 ? "View Details" : "Buy Now"}
                </button>
              </div>
            </div>
          </Link>
        ))}
      </div>

      {products.length === 0 && (
        <div className="text-center py-20 bg-gray-900 rounded-lg border border-gray-800">
          <h2 className="text-2xl font-bold text-gray-400">No products found</h2>
          <p className="text-gray-500 mt-2">
            Try searching for something else like "Watch" or "Shoes".
          </p>
          {query && (
             <Link href="/" className="text-blue-400 underline mt-4 block">Clear Search</Link>
          )}
        </div>
      )}
    </div>
  );
}