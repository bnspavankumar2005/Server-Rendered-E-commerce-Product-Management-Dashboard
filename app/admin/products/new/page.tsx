"use client";

import { createProduct } from "@/lib/actions";
import ImageUpload from "@/components/admin/ImageUpload";
import { useState } from "react";
import Link from "next/link";

export default function NewProductPage() {
  const [imageUrl, setImageUrl] = useState("");

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const result = await createProduct(formData);

    if (result?.errors) {
      const errorMessage = Object.entries(result.errors)
        .map(([field, errors]) => `${field}: ${errors}`)
        .join("\n");
      alert("⚠️ Validation Failed:\n" + errorMessage);
    }
  }

  return (
    <div className="p-10 max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Add New Product</h1>
      
      <form onSubmit={handleSubmit} className="space-y-4 border p-6 rounded-lg shadow bg-white">
        
        <div>
          {/* FIX: Explicitly setting text colors to dark */}
          <label className="block font-medium mb-1 text-gray-900">Product Name</label>
          <input name="name" type="text" required className="w-full border p-2 rounded text-black" />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block font-medium mb-1 text-gray-900">Price ($)</label>
            <input name="price" type="number" step="0.01" required className="w-full border p-2 rounded text-black" />
          </div>
          <div>
            <label className="block font-medium mb-1 text-gray-900">Stock (Qty)</label>
            <input name="stock" type="number" required className="w-full border p-2 rounded text-black" />
          </div>
        </div>

        <div>
          <label className="block font-medium mb-1 text-gray-900">Product Image</label>
          <ImageUpload 
            value={imageUrl} 
            onChange={(url) => setImageUrl(url)} 
          />
          <input type="hidden" name="imageUrl" value={imageUrl} />
        </div>

        <div>
          <label className="block font-medium mb-1 text-gray-900">Description</label>
          <textarea name="description" rows={4} className="w-full border p-2 rounded text-black" />
        </div>

        <div className="flex gap-4 pt-4">
          <Link 
            href="/admin/products"
            className="flex-1 text-center border border-gray-300 py-2 rounded hover:bg-gray-100 text-gray-700 font-medium"
          >
            Cancel
          </Link>
          <button 
            type="submit" 
            className="flex-1 bg-blue-600 text-white py-2 rounded hover:bg-blue-700 font-medium"
          >
            Save Product
          </button>
        </div>
      
      </form>
    </div>
  );
}