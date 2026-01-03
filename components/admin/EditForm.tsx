"use client";

import { updateProduct } from "@/lib/actions";
import ImageUpload from "@/components/admin/ImageUpload";
import { useState } from "react";
import Link from "next/link";

export default function EditForm({ product }: { product: any }) {
  const [imageUrl, setImageUrl] = useState(product.imageUrl || "");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    const formData = new FormData(event.currentTarget);
    const result = await updateProduct(product.id, formData);

    if (result?.errors) {
      setLoading(false);
      const errorMessage = Object.entries(result.errors)
        .map(([field, errors]) => `${field}: ${errors}`)
        .join("\n");
      alert("⚠️ Validation Failed:\n" + errorMessage);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      
      {/* Product Name */}
      <div>
        <label className="block text-xs font-bold text-gray-400 uppercase tracking-wide mb-2">Product Name</label>
        <input 
          name="name" 
          type="text" 
          defaultValue={product.name} 
          required 
          className="w-full bg-gray-800 border border-gray-700 p-4 rounded-lg text-white placeholder-gray-500 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition" 
        />
      </div>

      {/* Price & Stock Grid */}
      <div className="grid grid-cols-2 gap-6">
        <div>
          <label className="block text-xs font-bold text-gray-400 uppercase tracking-wide mb-2">Price ($)</label>
          <input 
            name="price" 
            type="number" 
            step="0.01" 
            defaultValue={product.price} 
            required 
            className="w-full bg-gray-800 border border-gray-700 p-4 rounded-lg text-white placeholder-gray-500 focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none transition" 
          />
        </div>
        <div>
          <label className="block text-xs font-bold text-gray-400 uppercase tracking-wide mb-2">Stock (Qty)</label>
          <input 
            name="stock" 
            type="number" 
            defaultValue={product.stock} 
            required 
            className="w-full bg-gray-800 border border-gray-700 p-4 rounded-lg text-white placeholder-gray-500 focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition" 
          />
        </div>
      </div>

      {/* Image Upload Section */}
      <div>
        <label className="block text-xs font-bold text-gray-400 uppercase tracking-wide mb-2">Product Image</label>
        <div className="bg-gray-800 border-2 border-dashed border-gray-700 rounded-lg p-6 hover:border-gray-500 transition">
          <ImageUpload 
            value={imageUrl} 
            onChange={(url) => setImageUrl(url)} 
          />
        </div>
        <input type="hidden" name="imageUrl" value={imageUrl} />
      </div>

      {/* Description */}
      <div>
        <label className="block text-xs font-bold text-gray-400 uppercase tracking-wide mb-2">Description</label>
        <textarea 
          name="description" 
          rows={4} 
          defaultValue={product.description || ""} 
          className="w-full bg-gray-800 border border-gray-700 p-4 rounded-lg text-white placeholder-gray-500 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition resize-none" 
        />
      </div>

      {/* Action Buttons */}
      <div className="border-t border-gray-800 pt-6 mt-6 flex gap-4">
        <Link 
          href="/admin/products"
          className="flex-1 text-center py-4 rounded-lg text-gray-400 font-bold hover:bg-gray-800 hover:text-white transition"
        >
          Cancel
        </Link>
        <button 
          type="submit" 
          disabled={loading}
          className="flex-1 bg-white text-black py-4 rounded-lg font-bold hover:bg-gray-200 transition shadow-[0_0_15px_rgba(255,255,255,0.1)] disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? "Updating..." : "Update Product"}
        </button>
      </div>
    </form>
  );
}