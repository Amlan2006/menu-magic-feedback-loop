
import { useState } from "react";
import CartDrawer from "./CartDrawer";

export default function Header() {
  return (
    <header className="sticky top-0 z-30 bg-white border-b border-restaurant-accent shadow-sm">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <div className="flex items-center">
          <div className="text-restaurant-primary font-bold text-2xl">Menu Magic</div>
        </div>
        
        <div className="flex items-center">
          <CartDrawer />
        </div>
      </div>
    </header>
  );
}
