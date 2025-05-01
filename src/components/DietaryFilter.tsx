
import { Badge } from "@/components/ui/badge";
import { dietaryTags } from "@/data/menuItems";
import { cn } from "@/lib/utils";

interface DietaryFilterProps {
  selectedTags: string[];
  onToggleTag: (tag: string) => void;
}

export default function DietaryFilter({ selectedTags, onToggleTag }: DietaryFilterProps) {
  return (
    <div className="flex flex-wrap gap-2 py-2">
      {dietaryTags.map((tag) => (
        <Badge
          key={tag.id}
          variant="outline"
          onClick={() => onToggleTag(tag.id)}
          className={cn(
            "cursor-pointer transition-colors",
            selectedTags.includes(tag.id)
              ? "bg-restaurant-primary text-white"
              : "bg-restaurant-light hover:bg-restaurant-accent"
          )}
        >
          {tag.name}
        </Badge>
      ))}
    </div>
  );
}
