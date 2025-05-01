
import Header from "@/components/Header";
import MenuLayout from "@/components/MenuLayout";
import { CartProvider } from "@/context/CartContext";

const Index = () => {
  return (
    <CartProvider>
      <div className="min-h-screen flex flex-col bg-white">
        <Header />

        <main className="container mx-auto px-4 py-8 flex-1">
          <div className="mb-8 text-center">
            <h1 className="text-3xl md:text-4xl font-bold text-restaurant-dark">Our Menu</h1>
            <p className="text-muted-foreground mt-2 max-w-2xl mx-auto">
              Browse our delicious selection of freshly prepared dishes. Add items to your order, and we'll have them ready for you in no time!
            </p>
          </div>

          <MenuLayout />
        </main>

        <footer className="bg-restaurant-light py-6 border-t border-restaurant-accent">
          <div className="container mx-auto px-4 text-center text-sm text-muted-foreground">
            <p>© 2025 Menu Magic. All rights reserved.</p>
            <p className="mt-1">
              Skip the line, order in advance, and enjoy your meal faster!
            </p>
          </div>
        </footer>
      </div>
    </CartProvider>
  );
};

export default Index;
