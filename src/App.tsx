
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Category from "./pages/Category";
import SubCategory from "./pages/SubCategory";
import Booking from "./pages/Booking";
import BookingStep2  from './pages/BookingStep2'
import CostBreakdown from "./pages/CostBreakdown";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Category />} />
          <Route path="/subcategory/:categoryId" element={<SubCategory />} />
          <Route path="/booking/:categoryId/:subcategoryId" element={<Booking />} />
          <Route path="/booking-step2" element={<BookingStep2 />} />
          <Route path="/cost-breakdown" element={<CostBreakdown />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
