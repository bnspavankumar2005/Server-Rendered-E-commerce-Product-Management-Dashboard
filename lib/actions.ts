"use server";

import { db } from "@/lib/db";
import { redirect } from "next/navigation";
import { productSchema } from "@/lib/validation";
import { revalidatePath } from "next/cache";

// --- 1. CREATE PRODUCT ---
export async function createProduct(formData: FormData) {
  const rawData = {
    name: formData.get("name"),
    price: formData.get("price"),
    stock: formData.get("stock"),
    description: formData.get("description"),
    imageUrl: formData.get("imageUrl"),
  };

  const result = productSchema.safeParse(rawData);

  if (!result.success) {
    return { errors: result.error.flatten().fieldErrors };
  }

  await db.product.create({
    data: {
      name: result.data.name,
      price: result.data.price,
      stock: result.data.stock,
      description: result.data.description || "",
      imageUrl: result.data.imageUrl || "",
    },
  });

  redirect("/admin/products");
}

// --- 2. UPDATE PRODUCT ---
export async function updateProduct(id: string, formData: FormData) {
  const rawData = {
    name: formData.get("name"),
    price: formData.get("price"),
    stock: formData.get("stock"),
    description: formData.get("description"),
    imageUrl: formData.get("imageUrl"),
  };

  const result = productSchema.safeParse(rawData);

  if (!result.success) {
    return { errors: result.error.flatten().fieldErrors };
  }

  await db.product.update({
    where: { id: id },
    data: {
      name: result.data.name,
      price: result.data.price,
      stock: result.data.stock,
      description: result.data.description || "",
      imageUrl: result.data.imageUrl || "",
    },
  });

  redirect("/admin/products");
}

// --- 3. DELETE PRODUCT ---
export async function deleteProduct(id: string) {
  try {
    await db.product.delete({
      where: { id: id },
    });

    // Refresh the list so the item disappears immediately
    revalidatePath("/admin/products");
  } catch (error) {
    console.error("Failed to delete product:", error);
    throw new Error("Failed to delete product.");
  }
}