import { db } from "@/lib/db";
import { notFound } from "next/navigation";
import EditForm from "@/components/admin/EditForm";

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

  // FIX: Convert the "Decimal" price to a standard "Number"
  // Client Components cannot handle Prisma Decimal objects directly.
  const serializedProduct = {
    ...product,
    price: product.price.toNumber(), 
  };

  return (
    <div className="p-10 max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Edit Product</h1>
      {/* Pass the converted object, not the raw database object */}
      <EditForm product={serializedProduct} />
    </div>
  );
}