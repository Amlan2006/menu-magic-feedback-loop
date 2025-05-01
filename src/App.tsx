import React from 'react';
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import { Login } from "./pages/Login";
import { Register } from "./pages/Register";
import { AdminLayout } from "./pages/admin/AdminLayout";
import { Dashboard } from "./pages/admin/Dashboard";
import { Login as AdminLogin } from "./pages/admin/Login";
import { Settings } from "./pages/admin/Settings";
import { MenuManagement } from "./pages/admin/MenuManagement";
import { StaffManagement } from "./pages/admin/StaffManagement";
import { RegistrationDesks } from "./pages/admin/RegistrationDesks";
import { FeedbackDashboard } from "./pages/admin/FeedbackDashboard";
import { OrderManagement } from "./pages/admin/OrderManagement";
import { AuthProvider, useAuth } from "./context/AuthContext";
import { UserProvider } from "./context/UserContext";
import { CartProvider } from "./context/CartContext";
import { OrderProvider } from "./context/OrderContext";
import WasteAnalytics from "./components/WasteAnalytics";

const queryClient = new QueryClient();

function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAuth();

  if (loading) {
    return <div className="flex items-center justify-center min-h-screen">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gray-900"></div>
    </div>;
  }

  if (!user) {
    return <Navigate to="/admin/login" replace />;
  }

  return <>{children}</>;
}

const App: React.FC = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <UserProvider>
        <CartProvider>
          <OrderProvider>
            <TooltipProvider>
              <Toaster />
              <Sonner />
              <BrowserRouter>
                <Routes>
                  {/* User Routes */}
                  <Route path="/" element={<Index />} />
                  <Route path="/login" element={<Login />} />
                  <Route path="/register" element={<Register />} />
                  
                  {/* Admin Routes */}
                  <Route path="/admin/login" element={<AdminLogin />} />
                  <Route
                    path="/admin"
                    element={
                      <ProtectedRoute>
                        <AdminLayout />
                      </ProtectedRoute>
                    }
                  >
                    <Route index element={<Dashboard />} />
                    <Route path="analytics" element={<WasteAnalytics />} />
                    <Route path="feedback" element={<FeedbackDashboard />} />
                    <Route path="settings" element={<Settings />} />
                    <Route path="menu" element={<MenuManagement />} />
                    <Route path="staff" element={<StaffManagement />} />
                    <Route path="registrations" element={<RegistrationDesks />} />
                    <Route path="orders" element={<OrderManagement />} />
                  </Route>
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </BrowserRouter>
            </TooltipProvider>
          </OrderProvider>
        </CartProvider>
      </UserProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
