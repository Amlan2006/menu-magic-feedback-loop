
import { Star } from "lucide-react";
import { useState } from "react";
import { toast } from "@/components/ui/sonner";
import { cn } from "@/lib/utils";

interface StarRatingProps {
  initialRating?: number;
  maxRating?: number;
  size?: number;
  interactive?: boolean;
  onRatingChange?: (rating: number) => void;
  itemName?: string;
  className?: string;
}

export default function StarRating({
  initialRating = 0,
  maxRating = 5,
  size = 20,
  interactive = false,
  onRatingChange,
  itemName = "item",
  className
}: StarRatingProps) {
  const [rating, setRating] = useState(initialRating);
  const [hoverRating, setHoverRating] = useState(0);

  const handleClick = (selectedRating: number) => {
    if (!interactive) return;
    
    setRating(selectedRating);
    if (onRatingChange) {
      onRatingChange(selectedRating);
    }
    
    toast.success(`Thank you for rating this ${itemName} ${selectedRating} stars!`);
  };

  return (
    <div className={cn("flex items-center", className)}>
      {[...Array(maxRating)].map((_, i) => {
        const starValue = i + 1;
        const filled = interactive
          ? hoverRating >= starValue || (!hoverRating && rating >= starValue)
          : rating >= starValue;
          
        return (
          <Star
            key={i}
            size={size}
            className={cn(
              "transition-colors",
              filled ? "fill-restaurant-primary text-restaurant-primary" : "fill-muted text-muted",
              interactive && "cursor-pointer"
            )}
            onClick={() => interactive && handleClick(starValue)}
            onMouseEnter={() => interactive && setHoverRating(starValue)}
            onMouseLeave={() => interactive && setHoverRating(0)}
          />
        );
      })}
      
      {!interactive && rating > 0 && (
        <span className="ml-2 text-sm text-muted-foreground">
          {rating.toFixed(1)} ({initialRating})
        </span>
      )}
    </div>
  );
}
