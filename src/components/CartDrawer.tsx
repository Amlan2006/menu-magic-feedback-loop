
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useCart } from "@/context/CartContext";
import { useState } from "react";
import { Menu } from "lucide-react";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { toast } from "@/components/ui/sonner";

export default function CartDrawer() {
  const { cartItems, removeFromCart, updateQuantity, clearCart, cartTotal, cartCount } = useCart();
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isOrderConfirmOpen, setIsOrderConfirmOpen] = useState(false);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(price);
  };

  const handlePlaceOrder = () => {
    setIsOrderConfirmOpen(false);
    setIsCartOpen(false);
    clearCart();
    toast.success("Your order has been placed! It will be ready shortly.");
  };

  return (
    <>
      <Sheet open={isCartOpen} onOpenChange={setIsCartOpen}>
        <SheetTrigger asChild>
          <Button 
            variant="outline" 
            size="icon" 
            className="relative bg-white border-restaurant-primary text-restaurant-primary hover:bg-restaurant-light"
          >
            <Menu />
            {cartCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-restaurant-primary text-white text-xs rounded-full h-5 w-5 flex items-center justify-center animate-cart-bounce">
                {cartCount}
              </span>
            )}
          </Button>
        </SheetTrigger>
        <SheetContent className="w-full sm:max-w-md">
          <SheetHeader>
            <SheetTitle>Your Order</SheetTitle>
            <SheetDescription>
              {cartCount === 0 ? (
                "Your order is empty. Add some delicious food!"
              ) : (
                `You have ${cartCount} item${cartCount === 1 ? '' : 's'} in your order.`
              )}
            </SheetDescription>
          </SheetHeader>
          
          {cartCount > 0 && (
            <>
              <div className="py-4 overflow-y-auto max-h-[calc(100vh-250px)]">
                {cartItems.map((item) => (
                  <div key={item.id} className="flex items-center py-3">
                    <div className="h-16 w-16 rounded overflow-hidden flex-shrink-0">
                      <img 
                        src={item.image} 
                        alt={item.name} 
                        className="h-full w-full object-cover"
                      />
                    </div>
                    <div className="ml-4 flex-1">
                      <h3 className="font-medium">{item.name}</h3>
                      <div className="text-restaurant-primary font-medium">
                        {formatPrice(item.price)}
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Button
                        variant="outline"
                        size="icon"
                        className="h-8 w-8 rounded-full"
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      >
                        -
                      </Button>
                      <span className="w-6 text-center">{item.quantity}</span>
                      <Button
                        variant="outline"
                        size="icon"
                        className="h-8 w-8 rounded-full"
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      >
                        +
                      </Button>
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="ml-2 text-muted-foreground hover:text-destructive"
                      onClick={() => removeFromCart(item.id)}
                    >
                      ✕
                    </Button>
                  </div>
                ))}
              </div>
              
              <Separator />
              
              <div className="space-y-4 mt-4">
                <div className="flex justify-between">
                  <span className="font-medium">Subtotal</span>
                  <span>{formatPrice(cartTotal)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium">Tax (8%)</span>
                  <span>{formatPrice(cartTotal * 0.08)}</span>
                </div>
                <Separator />
                <div className="flex justify-between font-bold">
                  <span>Total</span>
                  <span>{formatPrice(cartTotal * 1.08)}</span>
                </div>
              </div>
              
              <SheetFooter className="mt-6 flex flex-col gap-2 sm:flex-row">
                <Button 
                  variant="outline" 
                  className="flex-1" 
                  onClick={clearCart}
                >
                  Clear Order
                </Button>
                <Button 
                  className="flex-1 bg-restaurant-primary hover:bg-restaurant-secondary"
                  onClick={() => setIsOrderConfirmOpen(true)}
                >
                  Place Order
                </Button>
              </SheetFooter>
            </>
          )}
        </SheetContent>
      </Sheet>

      <Dialog open={isOrderConfirmOpen} onOpenChange={setIsOrderConfirmOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirm Your Order</DialogTitle>
            <DialogDescription>
              Review your order details before confirming.
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4 my-4">
            <h3 className="font-medium">Order Summary:</h3>
            <div className="space-y-2">
              {cartItems.map(item => (
                <div key={item.id} className="flex justify-between text-sm">
                  <span>{item.quantity} × {item.name}</span>
                  <span>{formatPrice(item.price * item.quantity)}</span>
                </div>
              ))}
            </div>
            <Separator />
            <div className="flex justify-between font-bold">
              <span>Total (incl. tax)</span>
              <span>{formatPrice(cartTotal * 1.08)}</span>
            </div>
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsOrderConfirmOpen(false)}>
              Cancel
            </Button>
            <Button 
              className="bg-restaurant-primary hover:bg-restaurant-secondary"
              onClick={handlePlaceOrder}
            >
              Confirm Order
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
