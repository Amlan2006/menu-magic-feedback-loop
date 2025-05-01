
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Salad, Apple, EggFried, Carrot } from "lucide-react";
import { MenuItem } from "@/types/menu";

interface NutritionSuggestionsProps {
  item: MenuItem;
}

type SuggestionType = "balanced" | "protein" | "low-calorie" | "vegan";

interface Suggestion {
  type: SuggestionType;
  title: string;
  description: string;
  icon: React.ReactNode;
  additionalItems: string[];
}

export default function NutritionSuggestions({ item }: NutritionSuggestionsProps) {
  const [suggestions, setSuggestions] = useState<Suggestion[]>([]);

  useEffect(() => {
    // Generate suggestions based on the item's nutrition info
    const generatedSuggestions: Suggestion[] = [];
    
    const { calories, protein, carbs, fat } = item.nutritionInfo;
    
    // Balanced meal suggestion
    if (calories > 300 && protein < 20) {
      generatedSuggestions.push({
        type: "balanced",
        title: "Balance Your Meal",
        description: "Add some protein to make this a more balanced meal",
        icon: <Salad className="h-5 w-5 text-green-600" />,
        additionalItems: ["Grilled chicken", "Tofu", "Greek yogurt"]
      });
    }
    
    // Protein boost suggestion
    if (protein < 15) {
      generatedSuggestions.push({
        type: "protein",
        title: "Protein Boost",
        description: "Consider adding a protein source to complement this dish",
        icon: <EggFried className="h-5 w-5 text-amber-600" />,
        additionalItems: ["Eggs", "Chicken", "Beans", "Nuts"]
      });
    }
    
    // Low calorie suggestion
    if (calories > 500) {
      generatedSuggestions.push({
        type: "low-calorie",
        title: "Lighter Options",
        description: "Try these lower-calorie alternatives",
        icon: <Carrot className="h-5 w-5 text-orange-500" />,
        additionalItems: ["Side salad", "Steamed vegetables", "Fresh fruit"]
      });
    }
    
    // Vegan option
    if (!item.tags.includes("vegan")) {
      generatedSuggestions.push({
        type: "vegan",
        title: "Plant-Based Alternative",
        description: "Check out these vegan options",
        icon: <Apple className="h-5 w-5 text-red-500" />,
        additionalItems: ["Vegetable curry", "Falafel wrap", "Bean burrito"]
      });
    }
    
    setSuggestions(generatedSuggestions);
  }, [item]);

  if (suggestions.length === 0) {
    return null;
  }

  return (
    <div className="mt-4 space-y-3">
      <h3 className="font-semibold">Nutrition Suggestions</h3>
      <div className="space-y-2">
        {suggestions.map((suggestion) => (
          <div 
            key={suggestion.type} 
            className="border rounded-md p-3 bg-restaurant-light/50"
          >
            <div className="flex items-center gap-2 mb-1">
              {suggestion.icon}
              <h4 className="font-medium">{suggestion.title}</h4>
            </div>
            <p className="text-sm text-muted-foreground mb-2">{suggestion.description}</p>
            <div className="flex flex-wrap gap-1">
              {suggestion.additionalItems.map((item) => (
                <Button key={item} variant="outline" size="sm" className="text-xs">
                  {item}
                </Button>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
