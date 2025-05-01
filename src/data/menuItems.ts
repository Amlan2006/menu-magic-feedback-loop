
import { MenuItem } from "../types/menu";

export const menuItems: MenuItem[] = [
  {
    id: "1",
    name: "Classic Burger",
    description: "Juicy beef patty with lettuce, tomato, and our special sauce on a brioche bun",
    price: 12.99,
    image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?q=80&w=500",
    category: "main-courses",
    tags: ["popular", "spicy"],
    nutritionInfo: {
      calories: 650,
      protein: 35,
      carbs: 40,
      fat: 30,
      allergens: ["gluten", "dairy"]
    },
    averageRating: 4.7,
    reviewCount: 142,
    popular: true
  },
  {
    id: "2",
    name: "Garden Salad",
    description: "Fresh mixed greens with cherry tomatoes, cucumber, and house vinaigrette",
    price: 8.99,
    image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?q=80&w=500",
    category: "appetizers",
    tags: ["vegetarian", "vegan", "gluten-free"],
    nutritionInfo: {
      calories: 220,
      protein: 5,
      carbs: 15,
      fat: 16,
      allergens: []
    },
    averageRating: 4.3,
    reviewCount: 89,
    popular: false
  },
  {
    id: "3",
    name: "Chocolate Lava Cake",
    description: "Warm chocolate cake with a molten center, served with vanilla ice cream",
    price: 7.99,
    image: "https://images.unsplash.com/photo-1624353365286-3f8d62daad51?q=80&w=500",
    category: "desserts",
    tags: ["vegetarian"],
    nutritionInfo: {
      calories: 510,
      protein: 7,
      carbs: 70,
      fat: 25,
      allergens: ["gluten", "dairy", "eggs"]
    },
    averageRating: 4.9,
    reviewCount: 201,
    popular: true
  },
  {
    id: "4",
    name: "Grilled Salmon",
    description: "Wild-caught salmon fillet, grilled to perfection with lemon butter and herbs",
    price: 18.99,
    image: "https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?q=80&w=500",
    category: "main-courses",
    tags: ["gluten-free", "dairy-free"],
    nutritionInfo: {
      calories: 420,
      protein: 40,
      carbs: 2,
      fat: 28,
      allergens: ["fish"]
    },
    averageRating: 4.6,
    reviewCount: 112,
    popular: true
  },
  {
    id: "5",
    name: "Fresh Lemonade",
    description: "House-made lemonade with fresh-squeezed lemons and a hint of mint",
    price: 3.99,
    image: "https://images.unsplash.com/photo-1621263764928-df1444c5e859?q=80&w=500",
    category: "beverages",
    tags: ["vegetarian", "vegan", "gluten-free", "dairy-free", "nut-free"],
    nutritionInfo: {
      calories: 120,
      protein: 0,
      carbs: 30,
      fat: 0,
      allergens: []
    },
    averageRating: 4.5,
    reviewCount: 78,
    popular: false
  },
  {
    id: "6",
    name: "Truffle Fries",
    description: "Crispy french fries tossed with truffle oil, parmesan, and fresh herbs",
    price: 6.99,
    image: "https://images.unsplash.com/photo-1600688640154-9619e002df30?q=80&w=500",
    category: "sides",
    tags: ["vegetarian"],
    nutritionInfo: {
      calories: 380,
      protein: 5,
      carbs: 45,
      fat: 22,
      allergens: ["dairy"]
    },
    averageRating: 4.8,
    reviewCount: 156,
    popular: true
  },
  {
    id: "7",
    name: "Vegetable Stir Fry",
    description: "Seasonal vegetables stir-fried with tofu in a savory ginger soy sauce",
    price: 13.99,
    image: "https://images.unsplash.com/photo-1512058564366-18510be2db19?q=80&w=500",
    category: "main-courses",
    tags: ["vegetarian", "vegan", "dairy-free"],
    nutritionInfo: {
      calories: 310,
      protein: 15,
      carbs: 35,
      fat: 14,
      allergens: ["soy", "gluten"]
    },
    averageRating: 4.2,
    reviewCount: 65,
    popular: false
  },
  {
    id: "8",
    name: "Spinach Artichoke Dip",
    description: "Creamy blend of spinach, artichokes, and cheeses, served with tortilla chips",
    price: 9.99,
    image: "https://images.unsplash.com/photo-1576506295286-5cda18df9ef1?q=80&w=500",
    category: "appetizers",
    tags: ["vegetarian"],
    nutritionInfo: {
      calories: 450,
      protein: 12,
      carbs: 25,
      fat: 35,
      allergens: ["dairy"]
    },
    averageRating: 4.4,
    reviewCount: 92,
    popular: true
  }
];

export const getMenuItemsByCategory = (category: string) => {
  return menuItems.filter(item => item.category === category);
};

export const getMenuItemsByTag = (tag: string) => {
  return menuItems.filter(item => item.tags.includes(tag));
};

export const getMenuItemById = (id: string) => {
  return menuItems.find(item => item.id === id);
};

export const categories = [
  { id: "appetizers", name: "Appetizers" },
  { id: "main-courses", name: "Main Courses" },
  { id: "sides", name: "Sides" },
  { id: "desserts", name: "Desserts" },
  { id: "beverages", name: "Beverages" }
];

export const dietaryTags = [
  { id: "vegetarian", name: "Vegetarian" },
  { id: "vegan", name: "Vegan" },
  { id: "gluten-free", name: "Gluten-Free" },
  { id: "dairy-free", name: "Dairy-Free" },
  { id: "nut-free", name: "Nut-Free" },
  { id: "spicy", name: "Spicy" }
];
