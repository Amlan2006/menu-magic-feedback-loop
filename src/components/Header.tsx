import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import CartDrawer from "./CartDrawer";
import { Button } from "@/components/ui/button";
import { Trash, MessageSquare, Lock, LogIn, UserPlus, User } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import WasteAnalytics from "./WasteAnalytics";
import Announcements from "./Announcements";
import { useUser } from "@/context/UserContext";
import { UserFeedback } from "./UserFeedback";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export default function Header() {
  const [isWasteDialogOpen, setIsWasteDialogOpen] = useState(false);
  const [isAnnouncementDialogOpen, setIsAnnouncementDialogOpen] = useState(false);
  const [isFeedbackDialogOpen, setIsFeedbackDialogOpen] = useState(false);
  const navigate = useNavigate();
  const { user, isAuthenticated, logout } = useUser();
  
  const handleLogout = async () => {
    await logout();
    toast.success("Logged out successfully");
  };

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
          <Button
            variant="outline"
            size="sm"
            onClick={() => setIsFeedbackDialogOpen(true)}
            className="flex items-center gap-1"
          >
            <MessageSquare size={16} />
            <span className="hidden sm:inline">Feedback</span>
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => navigate('/admin/login')}
            className="flex items-center gap-1"
          >
            <Lock size={16} />
            <span className="hidden sm:inline">Admin</span>
          </Button>
          
          {isAuthenticated ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm" className="gap-2">
                  <User size={16} />
                  <span className="hidden sm:inline">{user?.name.split(' ')[0]}</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem>Profile</DropdownMenuItem>
                <DropdownMenuItem>My Orders</DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleLogout}>Logout</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                asChild
                className="flex items-center gap-1"
              >
                <Link to="/login">
                  <LogIn size={16} />
                  <span className="hidden sm:inline">Login</span>
                </Link>
              </Button>
              <Button
                variant="default"
                size="sm"
                asChild
                className="flex items-center gap-1 bg-restaurant-primary hover:bg-restaurant-secondary"
              >
                <Link to="/register">
                  <UserPlus size={16} />
                  <span className="hidden sm:inline">Register</span>
                </Link>
              </Button>
            </div>
          )}
          
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

      <Dialog open={isFeedbackDialogOpen} onOpenChange={setIsFeedbackDialogOpen}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold flex items-center gap-2">
              <MessageSquare size={20} />
              Share Your Feedback
            </DialogTitle>
          </DialogHeader>
          <UserFeedback />
        </DialogContent>
      </Dialog>
    </header>
  );
}
