
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { MenuItem } from "@/types/menu";
import StarRating from "./StarRating";
import { useCart } from "@/context/CartContext";
import { useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";

export default function MenuItemCard({ item }: { item: MenuItem }) {
  const { addToCart } = useCart();
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(price);
  };

  return (
    <>
      <Card className="h-full flex flex-col transition-shadow hover:shadow-md overflow-hidden">
        <div className="relative h-48 overflow-hidden">
          <img 
            src={item.image} 
            alt={item.name} 
            className="w-full h-full object-cover transition-transform hover:scale-105"
          />
          {item.popular && (
            <Badge 
              variant="default" 
              className="absolute top-2 right-2 bg-restaurant-primary text-white"
            >
              Popular
            </Badge>
          )}
        </div>
        <CardHeader className="pb-2">
          <div className="flex justify-between items-start">
            <CardTitle className="text-lg">{item.name}</CardTitle>
            <span className="font-bold text-restaurant-primary text-lg">
              {formatPrice(item.price)}
            </span>
          </div>
          <div className="flex flex-wrap gap-1 mt-1">
            {item.tags.map(tag => (
              <Badge 
                key={tag} 
                variant="outline" 
                className="text-xs bg-restaurant-light"
              >
                {tag}
              </Badge>
            ))}
          </div>
          <StarRating 
            initialRating={item.averageRating} 
            interactive={false} 
            size={16}
          />
          <CardDescription className="line-clamp-2 h-10 text-sm">
            {item.description}
          </CardDescription>
        </CardHeader>
        <CardFooter className="flex justify-between pt-2 mt-auto">
          <Button 
            variant="outline" 
            size="sm"
            onClick={() => setIsDetailsOpen(true)}
            className="text-restaurant-dark border-restaurant-dark hover:bg-restaurant-light"
          >
            Details
          </Button>
          <Button 
            onClick={() => addToCart(item)}
            size="sm"
            className="bg-restaurant-primary hover:bg-restaurant-secondary text-white"
          >
            Add to Order
          </Button>
        </CardFooter>
      </Card>

      <Dialog open={isDetailsOpen} onOpenChange={setIsDetailsOpen}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold">{item.name}</DialogTitle>
            <DialogDescription>
              <div className="flex flex-col md:flex-row gap-6 mt-4">
                <div className="md:w-1/2">
                  <img 
                    src={item.image} 
                    alt={item.name} 
                    className="w-full h-60 object-cover rounded-md"
                  />
                  <div className="mt-4">
                    <h3 className="font-semibold mb-1">Description</h3>
                    <p>{item.description}</p>
                  </div>
                  <div className="mt-4">
                    <div className="flex items-center justify-between">
                      <h3 className="font-semibold">Customer Rating</h3>
                      <p>{item.reviewCount} reviews</p>
                    </div>
                    <StarRating 
                      initialRating={item.averageRating} 
                      interactive={true} 
                      itemName={item.name.toLowerCase()}
                      size={24}
                    />
                  </div>
                </div>
                <div className="md:w-1/2">
                  <h3 className="font-semibold mb-2">Nutrition Information</h3>
                  <div className="grid grid-cols-2 gap-2">
                    <div className="bg-restaurant-light p-2 rounded">
                      <p className="text-sm font-medium">Calories</p>
                      <p className="text-xl font-bold">{item.nutritionInfo.calories}</p>
                    </div>
                    <div className="bg-restaurant-light p-2 rounded">
                      <p className="text-sm font-medium">Protein</p>
                      <p className="text-xl font-bold">{item.nutritionInfo.protein}g</p>
                    </div>
                    <div className="bg-restaurant-light p-2 rounded">
                      <p className="text-sm font-medium">Carbs</p>
                      <p className="text-xl font-bold">{item.nutritionInfo.carbs}g</p>
                    </div>
                    <div className="bg-restaurant-light p-2 rounded">
                      <p className="text-sm font-medium">Fat</p>
                      <p className="text-xl font-bold">{item.nutritionInfo.fat}g</p>
                    </div>
                  </div>
                  
                  {item.nutritionInfo.allergens.length > 0 && (
                    <div className="mt-4">
                      <h3 className="font-semibold mb-1">Allergens</h3>
                      <div className="flex flex-wrap gap-1">
                        {item.nutritionInfo.allergens.map(allergen => (
                          <Badge key={allergen} variant="outline" className="bg-red-50 text-red-500 border-red-200">
                            {allergen}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}
                  
                  <div className="mt-6">
                    <h3 className="font-semibold mb-1">Dietary Information</h3>
                    <div className="flex flex-wrap gap-1">
                      {item.tags.map(tag => (
                        <Badge key={tag} variant="outline" className="bg-restaurant-light">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  
                  <Button 
                    onClick={() => {
                      addToCart(item);
                      setIsDetailsOpen(false);
                    }}
                    className="w-full mt-6 bg-restaurant-primary hover:bg-restaurant-secondary text-white"
                  >
                    Add to Order - {formatPrice(item.price)}
                  </Button>
                </div>
              </div>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </>
  );
}
