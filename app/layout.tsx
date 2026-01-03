import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import { CartProvider } from "@/context/CartContext";
import Cart from "@/components/Cart"; // <--- 1. Import the visual component

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Admin Dashboard | My Store",
  description: "Secure E-commerce Management System",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={inter.className}>
          <CartProvider>
            {children}
            <Cart /> {/* <--- 2. Add it right here at the bottom */}
          </CartProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}