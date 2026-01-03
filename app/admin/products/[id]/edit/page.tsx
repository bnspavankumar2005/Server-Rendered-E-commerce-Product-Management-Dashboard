import { db } from "@/lib/db";
import { notFound } from "next/navigation";
import EditForm from "@/components/admin/EditForm";
import Link from "next/link";

export default async function EditProductPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const product = await db.product.findUnique({
    where: { id: id },
  });

  if (!product) {
    return notFound();
  }

  // FIX: Convert "Decimal" -> "Number" for Client Component
  const serializedProduct = {
    ...product,
    price: product.price.toNumber(), 
  };

  return (
    <div className="p-10 max-w-3xl mx-auto min-h-screen flex flex-col justify-center">
      
      {/* Header with Back Button */}
      <div className="mb-8">
         <Link 
          href="/admin/products" 
          className="text-gray-400 hover:text-white transition-colors text-sm mb-2 block"
        >
          ← Back to Inventory
        </Link>
        <h1 className="text-4xl font-extrabold text-white tracking-tight">Edit Product</h1>
        <p className="text-gray-500 mt-1 text-sm">Update details for <span className="text-white font-medium">{product.name}</span></p>
      </div>

      {/* Pass the converted object to the Form */}
      <div className="bg-gray-900 border border-gray-800 p-8 md:p-10 rounded-2xl shadow-2xl">
        <EditForm product={serializedProduct} />
      </div>

    </div>
  );
}