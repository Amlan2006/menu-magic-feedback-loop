
import { useState } from "react";
import CartDrawer from "./CartDrawer";
import { Button } from "@/components/ui/button";
import { Trash, MessageSquare } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import WasteAnalytics from "./WasteAnalytics";
import Announcements from "./Announcements";

export default function Header() {
  const [isWasteDialogOpen, setIsWasteDialogOpen] = useState(false);
  const [isAnnouncementDialogOpen, setIsAnnouncementDialogOpen] = useState(false);
  
  return (
    <header className="sticky top-0 z-30 bg-white border-b border-restaurant-accent shadow-sm">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <div className="flex items-center">
          <div className="text-restaurant-primary font-bold text-2xl">Menu Magic</div>
        </div>
        
        <div className="flex items-center gap-2">
          <Button 
            variant="outline" 
            size="sm" 
            onClick={() => setIsAnnouncementDialogOpen(true)}
            className="flex items-center gap-1"
          >
            <MessageSquare size={16} />
            <span className="hidden sm:inline">Community</span>
          </Button>
          <Button 
            variant="outline" 
            size="sm" 
            onClick={() => setIsWasteDialogOpen(true)}
            className="flex items-center gap-1"
          >
            <Trash size={16} />
            <span className="hidden sm:inline">Waste Tracker</span>
          </Button>
          <CartDrawer />
        </div>
      </div>
      
      <Dialog open={isWasteDialogOpen} onOpenChange={setIsWasteDialogOpen}>
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold flex items-center gap-2">
              <Trash size={20} />
              Waste Tracking Analytics
            </DialogTitle>
          </DialogHeader>
          <WasteAnalytics />
        </DialogContent>
      </Dialog>

      <Dialog open={isAnnouncementDialogOpen} onOpenChange={setIsAnnouncementDialogOpen}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold flex items-center gap-2">
              <MessageSquare size={20} />
              Community & Announcements
            </DialogTitle>
          </DialogHeader>
          <Announcements />
        </DialogContent>
      </Dialog>
    </header>
  );
}
