
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Slider } from "@/components/ui/slider";
import { toast } from "@/components/ui/sonner";
import StarRating from "./StarRating";
import { FeedbackData, MenuItem } from "@/types/menu";
import { Trash } from "lucide-react";

interface FeedbackFormProps {
  item: MenuItem;
  onClose: () => void;
}

export default function FeedbackForm({ item, onClose }: FeedbackFormProps) {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [wastePercentage, setWastePercentage] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (rating === 0) {
      toast.error("Please provide a rating before submitting");
      return;
    }
    
    setIsSubmitting(true);
    
    // Create feedback data object
    const feedbackData: FeedbackData = {
      itemId: item.id,
      rating,
      comment: comment.trim() || undefined,
      wastePercentage: wastePercentage > 0 ? wastePercentage : undefined,
      submittedAt: new Date().toISOString()
    };
    
    // Simulate sending to backend
    console.log("Feedback submitted:", feedbackData);
    
    // Show success message
    toast.success("Thank you for your feedback!");
    
    // Reset form and close
    setTimeout(() => {
      setIsSubmitting(false);
      onClose();
    }, 1500);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-2">
        <h3 className="font-medium text-lg">Rate your experience with {item.name}</h3>
        <StarRating 
          initialRating={rating} 
          interactive={true} 
          onRatingChange={setRating}
          size={28} 
          className="justify-center"
        />
      </div>
      
      <div className="space-y-2">
        <label htmlFor="comment" className="font-medium">
          Comments (optional)
        </label>
        <Textarea
          id="comment"
          placeholder="Tell us what you liked or how we can improve..."
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          className="min-h-[100px]"
        />
      </div>
      
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <label htmlFor="waste" className="font-medium flex items-center gap-2">
            <Trash size={16} className="text-muted-foreground" />
            Food waste tracking (optional)
          </label>
          <span className="text-sm font-medium">{wastePercentage}%</span>
        </div>
        <p className="text-sm text-muted-foreground">
          Help us reduce waste by indicating how much of your food was left uneaten
        </p>
        <Slider
          id="waste"
          value={[wastePercentage]}
          onValueChange={(value) => setWastePercentage(value[0])}
          max={100}
          step={5}
          className="py-4"
        />
        <div className="flex justify-between text-xs text-muted-foreground">
          <span>0% (Finished all)</span>
          <span>100% (Didn't eat)</span>
        </div>
      </div>
      
      <div className="flex gap-3 pt-2">
        <Button
          type="button"
          variant="outline"
          onClick={onClose}
          className="flex-1"
        >
          Cancel
        </Button>
        <Button 
          type="submit"
          className="flex-1 bg-restaurant-primary hover:bg-restaurant-secondary"
          disabled={isSubmitting}
        >
          {isSubmitting ? "Submitting..." : "Submit Feedback"}
        </Button>
      </div>
    </form>
  );
}
