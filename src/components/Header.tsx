import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import CartDrawer from "./CartDrawer";
import { Button } from "@/components/ui/button";
import { Trash, MessageSquare, Lock, LogIn, UserPlus, User, Phone, PhoneOff } from "lucide-react";
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
import { toast } from "@/components/ui/sonner";
import Vapi from "@vapi-ai/web";

// Initialize Vapi with your Public Key
// REMINDER: While this is a public key, ensure any sensitive keys are handled securely.
const vapi = new Vapi("fac95828-ef99-43dc-9a90-d6d22aab801b");

export default function Header() {
  const [isWasteDialogOpen, setIsWasteDialogOpen] = useState(false);
  const [isAnnouncementDialogOpen, setIsAnnouncementDialogOpen] = useState(false);
  const [isFeedbackDialogOpen, setIsFeedbackDialogOpen] = useState(false);
  const [isVoiceCallActive, setIsVoiceCallActive] = useState(false);
  const navigate = useNavigate();
  const { user, isAuthenticated, logout } = useUser();
  
  const handleLogout = async () => {
    try {
      await logout();
      toast.success("Logged out successfully");
    } catch (error) {
      toast.error("Logout failed. Please try again.");
      console.error("Logout error:", error);
    }
  };

  const startVoiceCall = async () => {
    try {
      // Use your Vapi Assistant ID here
      await vapi.start("e780a8e7-2bc4-4d6c-a539-f9bf46d5e567"); 
      setIsVoiceCallActive(true);
      toast.success("Voice chat started!");
    } catch (error) {
      console.error("Error starting voice call:", error);
      toast.error("Failed to start voice chat.");
      setIsVoiceCallActive(false);
    }
  };

  const stopVoiceCall = () => {
    vapi.stop();
    setIsVoiceCallActive(false);
    toast.info("Voice chat ended.");
  };

  // Listen for Vapi call end events
  useEffect(() => {
    vapi.on("call-end", () => {
      setIsVoiceCallActive(false);
      toast.info("Voice chat session ended.");
    });

    vapi.on("error", (e) => {
      console.error("Vapi error:", e);
      toast.error("Voice chat error occurred.");
      setIsVoiceCallActive(false); // Ensure state is reset on error
    });

    // Cleanup listeners on component unmount
    return () => {
      vapi.removeAllListeners();
    };
  }, []);

  return (
    <header className="sticky top-0 z-30 bg-white border-b border-restaurant-accent shadow-sm">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <div className="flex items-center">
          <div className="text-restaurant-primary font-bold text-2xl">Menu Magic</div>
        </div>
        
        <div className="flex items-center gap-2">
          {/* Voice Call Button */}
          <Button
            variant={isVoiceCallActive ? "destructive" : "outline"}
            size="sm"
            onClick={isVoiceCallActive ? stopVoiceCall : startVoiceCall}
            className="flex items-center gap-1"
            title={isVoiceCallActive ? "End Voice Chat" : "Start Voice Chat"}
          >
            {isVoiceCallActive ? <PhoneOff size={16} /> : <Phone size={16} />}
            <span className="hidden sm:inline">
              {isVoiceCallActive ? "End Chat" : "Voice Chat"}
            </span>
          </Button>
          
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
