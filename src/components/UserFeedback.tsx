import React, { useState } from 'react';
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogTrigger,
  DialogFooter,
  DialogDescription
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { useUser } from '@/context/UserContext';
import { MessageSquare, Star } from 'lucide-react';
import { toast } from '@/components/ui/sonner';

interface Feedback {
  id: string;
  userId: string;
  userName: string;
  menuItemId?: string;
  menuItemName?: string;
  rating: number;
  comment: string;
  createdAt: string;
}

// Mock data storage - in a real app, this would be a database
const feedbackStore: Feedback[] = [];

interface UserFeedbackProps {
  menuItemId?: string;
  menuItemName?: string;
}

export function UserFeedback({ menuItemId, menuItemName }: UserFeedbackProps) {
  const [open, setOpen] = useState(false);
  const [rating, setRating] = useState<number>(5);
  const [comment, setComment] = useState('');
  const { user, isAuthenticated } = useUser();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async () => {
    if (!isAuthenticated || !user) {
      toast.error('Please log in to submit feedback');
      return;
    }

    setIsSubmitting(true);

    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 800));

    try {
      const newFeedback: Feedback = {
        id: Date.now().toString(),
        userId: user.id,
        userName: user.name,
        menuItemId,
        menuItemName,
        rating,
        comment,
        createdAt: new Date().toISOString()
      };

      // In a real app, this would be an API call
      feedbackStore.push(newFeedback);

      toast.success('Feedback submitted successfully');
      setOpen(false);
      setRating(5);
      setComment('');
    } catch (err) {
      toast.error('Failed to submit feedback');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <MessageSquare className="h-5 w-5 text-gray-400" />
            <span className="text-gray-600 text-sm">Share your feedback</span>
          </div>
          <Button 
            variant="outline" 
            size="sm"
            asChild
          >
            <a href="/login">Sign in to comment</a>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button 
          variant="outline" 
          size="sm"
          className="flex items-center gap-2"
        >
          <MessageSquare className="h-4 w-4" />
          <span>Leave Feedback</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Share Your Feedback</DialogTitle>
          <DialogDescription>
            {menuItemName 
              ? `Tell us what you think about ${menuItemName}` 
              : 'Share your experience with us'}
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label>Rating</Label>
            <RadioGroup
              defaultValue="5"
              value={rating.toString()}
              onValueChange={(value) => setRating(parseInt(value))}
              className="flex space-x-2"
            >
              {[1, 2, 3, 4, 5].map((value) => (
                <div key={value} className="flex items-center space-x-1">
                  <RadioGroupItem value={value.toString()} id={`rating-${value}`} className="sr-only" />
                  <Label
                    htmlFor={`rating-${value}`}
                    className={`cursor-pointer rounded-full p-1 ${
                      value <= rating ? 'text-yellow-500' : 'text-gray-300'
                    }`}
                  >
                    <Star className="h-6 w-6 fill-current" />
                  </Label>
                </div>
              ))}
            </RadioGroup>
          </div>
          <div className="space-y-2">
            <Label htmlFor="comment">Comment</Label>
            <Textarea
              id="comment"
              placeholder="Tell us what you liked or didn't like..."
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              rows={4}
            />
          </div>
        </div>
        <DialogFooter>
          <Button 
            variant="outline" 
            onClick={() => setOpen(false)}
            disabled={isSubmitting}
          >
            Cancel
          </Button>
          <Button 
            onClick={handleSubmit}
            disabled={isSubmitting || !comment}
          >
            {isSubmitting ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-t-2 border-b-2 border-white mr-2"></div>
                Submitting...
              </>
            ) : 'Submit Feedback'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

// Export the feedback store for admin access
export { feedbackStore }; 