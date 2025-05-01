
import { Button } from "@/components/ui/button";
import { categories } from "@/data/menuItems";
import { cn } from "@/lib/utils";

interface CategoryFilterProps {
  selectedCategory: string;
  onChange: (category: string) => void;
}

export default function CategoryFilter({ selectedCategory, onChange }: CategoryFilterProps) {
  return (
    <div className="w-full overflow-x-auto pb-2">
      <div className="flex space-x-2 min-w-max">
        <Button
          onClick={() => onChange("all")}
          variant={selectedCategory === "all" ? "default" : "outline"}
          className={cn(
            "rounded-full",
            selectedCategory === "all" ? "bg-restaurant-primary hover:bg-restaurant-secondary text-white" : "text-restaurant-dark hover:bg-restaurant-light"
          )}
        >
          All
        </Button>
        {categories.map((category) => (
          <Button
            key={category.id}
            onClick={() => onChange(category.id)}
            variant={selectedCategory === category.id ? "default" : "outline"}
            className={cn(
              "rounded-full",
              selectedCategory === category.id ? "bg-restaurant-primary hover:bg-restaurant-secondary text-white" : "text-restaurant-dark hover:bg-restaurant-light"
            )}
          >
            {category.name}
          </Button>
        ))}
      </div>
    </div>
  );
}
