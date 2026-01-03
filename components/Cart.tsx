"use client";

import { useState } from "react";
import { useCart } from "@/context/CartContext";

export default function Cart() {
  const [isOpen, setIsOpen] = useState(false);
  const { items, removeFromCart, cartTotal, clearCart, cartCount } = useCart();

  return (
    <>
      {/* 1. Floating Toggle Button (HIGH VISIBILITY FIX) */}
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-10 right-10 z-50 bg-white text-black p-5 rounded-full shadow-[0_0_20px_rgba(255,255,255,0.4)] hover:scale-110 hover:shadow-[0_0_30px_rgba(255,255,255,0.6)] transition-all duration-300 flex items-center justify-center border-4 border-gray-200"
        aria-label="Open Cart"
      >
        {/* SVG Cart Icon */}
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-8 h-8">
          <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
        </svg>
        
        {/* Badge Count (Bright Red) */}
        {cartCount > 0 && (
          <span className="absolute -top-2 -right-2 bg-red-600 text-white text-sm font-bold w-7 h-7 rounded-full flex items-center justify-center border-2 border-white shadow-sm">
            {cartCount}
          </span>
        )}
      </button>

      {/* 2. Dark Overlay (Backdrop) */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/60 z-50 backdrop-blur-sm"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* 3. Slide-out Panel */}
      <div className={`fixed top-0 right-0 h-full w-full md:w-[450px] bg-white z-[60] shadow-2xl transform transition-transform duration-300 ease-in-out ${isOpen ? "translate-x-0" : "translate-x-full"}`}>
        
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b bg-gray-50">
          <h2 className="text-2xl font-bold text-gray-900">Your Cart ({cartCount})</h2>
          <button 
            onClick={() => setIsOpen(false)} 
            className="p-2 hover:bg-gray-200 rounded-full text-gray-500 transition"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Cart Items List */}
        <div className="flex-1 overflow-y-auto p-6 h-[calc(100vh-250px)]">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-gray-500 space-y-4">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-16 h-16 text-gray-300">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 5c.07.286-.064.575-.327.697A60.05 60.05 0 0112 20.016c-3.79 0-7.234-1.378-9.991-3.69-.307-.26-.226-.74.128-.888l3.962-1.638" />
              </svg>
              <p className="text-lg font-medium">Your cart is empty.</p>
              <button 
                onClick={() => setIsOpen(false)} 
                className="bg-black text-white px-6 py-2 rounded-full hover:bg-gray-800 transition"
              >
                Start Shopping
              </button>
            </div>
          ) : (
            <div className="space-y-6">
              {items.map((item) => (
                <div key={item.id} className="flex gap-4 items-center bg-gray-50 p-3 rounded-lg border">
                  {/* Image */}
                  <div className="h-20 w-20 bg-white rounded-md border overflow-hidden relative flex-shrink-0">
                    {item.imageUrl ? (
                      <img src={item.imageUrl} alt={item.name} className="object-cover w-full h-full" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-gray-300 bg-gray-100">No Img</div>
                    )}
                  </div>
                  
                  {/* Info */}
                  <div className="flex-1">
                    <h3 className="font-bold text-gray-900 text-lg">{item.name}</h3>
                    <p className="text-gray-600">${item.price} x {item.quantity}</p>
                  </div>

                  {/* Price & Remove */}
                  <div className="text-right flex flex-col items-end gap-2">
                    <p className="font-bold text-gray-900 text-lg">${(item.price * item.quantity).toFixed(2)}</p>
                    <button 
                      onClick={() => removeFromCart(item.id)}
                      className="text-red-500 text-sm hover:text-red-700 font-medium hover:underline"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer: Totals & Checkout */}
        {items.length > 0 && (
          <div className="p-6 border-t bg-gray-50 absolute bottom-0 w-full shadow-[0_-5px_20px_rgba(0,0,0,0.05)]">
            <div className="flex justify-between items-center mb-6">
              <span className="text-gray-600 font-medium text-lg">Subtotal</span>
              <span className="text-3xl font-extrabold text-gray-900">${cartTotal.toFixed(2)}</span>
            </div>
            
            <button 
              onClick={() => alert("Checkout Feature Coming Soon!")}
              className="w-full bg-black text-white py-4 rounded-xl font-bold text-lg hover:bg-gray-800 hover:shadow-lg transition transform active:scale-95"
            >
              Checkout Now
            </button>
            
            <button 
              onClick={clearCart}
              className="w-full text-center text-gray-400 text-sm mt-4 hover:text-red-600 transition"
            >
              Clear Cart
            </button>
          </div>
        )}
      </div>
    </>
  );
}