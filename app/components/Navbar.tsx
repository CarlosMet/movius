"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import DropdownMenu from "./DropdownMenu";
import MobileMenu from "./MobileMenu";
import CartDrawer from "./CartDrawer";
import { Search, ShoppingCart } from "lucide-react";
import { getCart } from "@/lib/cart";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const [cartCount, setCartCount] = useState(0);

  const updateCount = () => {
    const items = getCart();
    const count = items.reduce((acc, item) => acc + (item.quantity ?? 0), 0);
    setCartCount(count);
  };

  useEffect(() => {
    updateCount();
    window.addEventListener("cartUpdated", updateCount);
    return () => window.removeEventListener("cartUpdated", updateCount);
  }, []);

  return (
    <>
      <nav className="relative h-16 bg-white flex items-center px-4 md:px-8 z-50">

        {/* LEFT */}
        <div className="flex items-center flex-1">
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="text-2xl md:hidden z-50"
          >
            {menuOpen ? "✕" : "☰"}
          </button>
          <Link href="/" className="hidden md:block font-bold text-lg">
            MOVIUS
          </Link>
        </div>

        {/* LOGO MOBILE */}
        <Link
          href="/"
          className="absolute left-1/2 -translate-x-1/2 font-bold text-lg md:hidden"
        >
          MOVIUS
        </Link>

        {/* CENTER MENU */}
        <div className="hidden md:flex items-center justify-center flex-1 space-x-10 text-sm font-medium">
          <Link href="/uniformes" className="hover:text-gray-900">Uniformes</Link>
          <div className="relative group">
            <Link href="/hombre" className="hover:text-gray-900">Hombre</Link>
            <DropdownMenu basePath="/hombre" />
          </div>
          <div className="relative group">
            <Link href="/mujer" className="hover:text-gray-900">Mujer</Link>
            <DropdownMenu basePath="/mujer" />
          </div>
          <Link href="/calzado" className="hover:text-gray-900">Calzado</Link>
        </div>

        {/* RIGHT */}
        <div className="flex items-center justify-end flex-1 space-x-5">
          <Search size={20} className="cursor-pointer" />
          <button
            onClick={() => setCartOpen(true)}
            className="relative cursor-pointer"
          >
            <ShoppingCart size={20} />
            {cartCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center leading-none">
                {cartCount > 99 ? "99+" : cartCount}
              </span>
            )}
          </button>
        </div>

      </nav>

      <MobileMenu open={menuOpen} setOpen={setMenuOpen} />
      <CartDrawer open={cartOpen} onClose={() => setCartOpen(false)} />
    </>
  );
}