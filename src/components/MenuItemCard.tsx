import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { MenuItem } from "@/types/menu";
import StarRating from "./StarRating";
import { useCart } from "@/context/CartContext";
import { useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import WasteTracker from "./WasteTracker";
import FeedbackForm from "./FeedbackForm";
import NutritionSuggestions from "./NutritionSuggestions";
import { Trash, Utensils, Star } from "lucide-react";

export default function MenuItemCard({ item }: { item: MenuItem }) {
  const { addToCart } = useCart();
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  const [isFeedbackOpen, setIsFeedbackOpen] = useState(false);
  const [isNutritionOpen, setIsNutritionOpen] = useState(false);
  
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(price * 80); // Converting to Rupees (assuming 1 USD = 80 INR)
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
          
          {item.wasteData && (
            <div className="mt-1">
              <WasteTracker percentage={item.wasteData.averageWastePercentage} size="sm" />
              <div className="flex gap-2 mt-2">
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="text-xs h-7 px-2 flex items-center border-restaurant-accent"
                  onClick={() => setIsNutritionOpen(true)}
                >
                  <Utensils size={14} className="mr-1" />
                  Nutrition
                </Button>
                <Button 
                  variant="outline" 
                  size="sm"
                  className="text-xs h-7 px-2 flex items-center border-restaurant-accent"
                  onClick={() => setIsFeedbackOpen(true)}
                >
                  <Star size={14} className="mr-1" />
                  Feedback
                </Button>
              </div>
            </div>
          )}
          
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
                    <div className="flex items-center justify-between">
                      <StarRating 
                        initialRating={item.averageRating} 
                        interactive={false}
                        size={24}
                      />
                      <Button 
                        onClick={() => {
                          setIsDetailsOpen(false);
                          setIsFeedbackOpen(true);
                        }}
                        variant="outline"
                        size="sm"
                        className="ml-2 text-xs"
                      >
                        Leave Feedback
                      </Button>
                    </div>
                  </div>
                  
                  {item.wasteData && (
                    <div className="mt-4 p-3 bg-restaurant-light rounded-md">
                      <div className="flex items-center gap-2 mb-2">
                        <Trash size={16} className="text-muted-foreground" />
                        <h3 className="font-semibold">Waste Tracking</h3>
                      </div>
                      <WasteTracker percentage={item.wasteData.averageWastePercentage} size="md" />
                      <p className="text-xs text-muted-foreground mt-2">
                        Last updated: {new Date(item.wasteData.lastUpdated).toLocaleDateString()}
                      </p>
                    </div>
                  )}
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
      
      <Dialog open={isFeedbackOpen} onOpenChange={setIsFeedbackOpen}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle className="text-xl">Feedback</DialogTitle>
          </DialogHeader>
          <FeedbackForm item={item} onClose={() => setIsFeedbackOpen(false)} />
        </DialogContent>
      </Dialog>
      
      <Dialog open={isNutritionOpen} onOpenChange={setIsNutritionOpen}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle className="text-xl">Nutrition Suggestions</DialogTitle>
            <DialogDescription>
              Personalized nutrition recommendations for {item.name}
            </DialogDescription>
          </DialogHeader>
          <NutritionSuggestions item={item} />
        </DialogContent>
      </Dialog>
    </>
  );
}
