
import { useState } from "react";
import { Calendar, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";

type Announcement = {
  id: string;
  title: string;
  content: string;
  author: string;
  date: string;
  type: "event" | "announcement";
  eventDate?: string;
};

// Sample data - in a real app this would come from a database
const initialAnnouncements: Announcement[] = [
  {
    id: "1",
    title: "Weekly Staff Meeting",
    content: "Join us for our weekly staff meeting where we'll discuss menu changes and upcoming promotions.",
    author: "Restaurant Manager",
    date: "2025-05-01",
    type: "event",
    eventDate: "2025-05-07"
  },
  {
    id: "2",
    title: "New Seasonal Items",
    content: "We're excited to announce our new seasonal menu items launching next week! Get ready for fresh spring flavors.",
    author: "Head Chef",
    date: "2025-04-28",
    type: "announcement"
  },
  {
    id: "3",
    title: "Food Waste Reduction Initiative",
    content: "Starting next month, we're launching a new initiative to further reduce our food waste. Please attend the training session.",
    author: "Sustainability Team",
    date: "2025-04-29",
    type: "event",
    eventDate: "2025-05-10"
  }
];

export default function Announcements() {
  const [announcements, setAnnouncements] = useState<Announcement[]>(initialAnnouncements);
  const [newAnnouncement, setNewAnnouncement] = useState("");
  const [newTitle, setNewTitle] = useState("");
  const [isEvent, setIsEvent] = useState(false);
  const [eventDate, setEventDate] = useState("");
  const { toast } = useToast();

  const handleSubmit = () => {
    if (!newTitle.trim() || !newAnnouncement.trim()) {
      toast({
        title: "Error",
        description: "Please enter both a title and content for your announcement.",
        variant: "destructive",
      });
      return;
    }

    if (isEvent && !eventDate) {
      toast({
        title: "Error",
        description: "Please select a date for your event.",
        variant: "destructive",
      });
      return;
    }

    const newItem: Announcement = {
      id: Date.now().toString(),
      title: newTitle,
      content: newAnnouncement,
      author: "Team Member",
      date: new Date().toISOString().split('T')[0],
      type: isEvent ? "event" : "announcement",
      ...(isEvent && { eventDate }),
    };

    setAnnouncements([newItem, ...announcements]);
    setNewAnnouncement("");
    setNewTitle("");
    setEventDate("");
    setIsEvent(false);

    toast({
      title: isEvent ? "Event Added" : "Announcement Posted",
      description: "Your message has been shared with the team.",
    });
  };

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <h2 className="text-2xl font-bold">Community Board</h2>
        <p className="text-muted-foreground">
          Share announcements, updates, or plan events with your team.
        </p>

        <Card>
          <CardHeader>
            <CardTitle>Create New Post</CardTitle>
            <CardDescription>Share an announcement or plan an event</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Title</label>
              <input 
                type="text" 
                placeholder="Announcement title..."
                value={newTitle}
                onChange={(e) => setNewTitle(e.target.value)}
                className="w-full p-2 border rounded-md"
              />
            </div>
            
            <div className="flex items-center gap-2">
              <input 
                type="checkbox" 
                id="isEvent" 
                checked={isEvent}
                onChange={(e) => setIsEvent(e.target.checked)} 
              />
              <label htmlFor="isEvent" className="text-sm">This is an event</label>
            </div>
            
            {isEvent && (
              <div className="space-y-2">
                <label className="text-sm font-medium">Event Date</label>
                <input 
                  type="date" 
                  value={eventDate}
                  onChange={(e) => setEventDate(e.target.value)}
                  className="w-full p-2 border rounded-md"
                />
              </div>
            )}
            
            <div className="space-y-2">
              <label className="text-sm font-medium">Message</label>
              <Textarea 
                placeholder="Share your announcement or event details..." 
                value={newAnnouncement}
                onChange={(e) => setNewAnnouncement(e.target.value)}
                rows={4}
              />
            </div>
          </CardContent>
          <CardFooter>
            <Button onClick={handleSubmit}>
              {isEvent ? 'Schedule Event' : 'Post Announcement'}
            </Button>
          </CardFooter>
        </Card>
      </div>

      <div className="space-y-4">
        <h3 className="text-xl font-semibold">Recent Updates</h3>
        
        {announcements.map((announcement) => (
          <Card key={announcement.id} className="overflow-hidden">
            <CardHeader className="pb-3">
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                  {announcement.type === "event" ? (
                    <Calendar size={18} className="text-restaurant-primary" />
                  ) : (
                    <MessageCircle size={18} className="text-restaurant-accent" />
                  )}
                  <span className="text-sm text-muted-foreground">
                    {announcement.type === "event" ? "Event" : "Announcement"}
                  </span>
                </div>
                <span className="text-xs text-muted-foreground">{announcement.date}</span>
              </div>
              <CardTitle className="text-lg">{announcement.title}</CardTitle>
              {announcement.type === "event" && announcement.eventDate && (
                <div className="flex items-center gap-2 mt-1">
                  <Calendar size={14} className="text-restaurant-primary" />
                  <span className="text-sm font-medium">Event Date: {announcement.eventDate}</span>
                </div>
              )}
            </CardHeader>
            <CardContent>
              <p className="text-sm">{announcement.content}</p>
            </CardContent>
            <CardFooter className="pt-1 pb-3 text-xs text-muted-foreground">
              Posted by {announcement.author}
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}
