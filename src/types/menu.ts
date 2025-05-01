
export interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
  tags: string[];
  nutritionInfo: {
    calories: number;
    protein: number;
    carbs: number;
    fat: number;
    allergens: string[];
  };
  averageRating: number;
  reviewCount: number;
  popular: boolean;
  wasteData?: {
    averageWastePercentage: number;
    lastUpdated: string;
  };
}

export interface CartItem extends MenuItem {
  quantity: number;
}

export type MenuCategory = 'appetizers' | 'main-courses' | 'desserts' | 'beverages' | 'sides';

export type DietaryTag = 'vegetarian' | 'vegan' | 'gluten-free' | 'dairy-free' | 'nut-free' | 'spicy';

export interface FeedbackData {
  itemId: string;
  rating: number;
  comment?: string;
  wastePercentage?: number;
  submittedAt: string;
}

export type NutritionSuggestionType = 'balanced' | 'protein' | 'low-calorie' | 'vegan';
