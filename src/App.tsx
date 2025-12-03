import React from 'react';
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";
import Booking from "./pages/Booking";
import BookingStep2 from './pages/BookingStep2';
import NotFound from "./pages/NotFound";
import Login from "./pages/Login";
import ConfirmPayment from "./pages/ConfirmPayment";
import { SidebarProvider, Sidebar } from './components/Sidebar';
import MyProfile from "./pages/MyProfile";
import AllBookedServices from "./pages/AllBookedServices";
import CurrentBookedService from "./pages/CurrentBookedService";
import ConfirmedRides from './pages/ConfirmedRides';
import OngoingRides from './pages/OngoingRides';
import BookingDetailView from "./pages/BookingDetailView";
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor } from './store/store';
import Category from './pages/Category';
import Subcategory from './pages/Subcategory';
import SubSubcategory from './pages/SubSubcategory';
import WalletPage from './pages/Wallet';
import ReferAndEarnPage from './pages/ReferAndEarnPage';
import PrivacyPolicy from './pages/PrivacyPolicy';

const queryClient = new QueryClient();

// Wrapper component to handle sidebar navigation
const AppWithSidebar = () => {
  const navigate = useNavigate();

  const handleNavigation = (path: string, title?: string) => {
    navigate(path);
  };

  return (
    <>
      <Routes>
        <Route path="/" element={<Category />} />
        <Route path="/subcategories/:categoryId" element={<Subcategory />} />
        <Route path="/subsubcategories/:categoryId/:subcategoryId" element={<SubSubcategory />} />
        <Route path="/login" element={<Login />} />
        <Route path="/booking/:categoryId/:subcategoryId?/:subSubcategoryId?" element={<Booking />} />
        <Route path="/booking-step2" element={<BookingStep2 />} />
        <Route path="/confirm-payment" element={<ConfirmPayment />} />
        <Route path="/wallet" element={<WalletPage />} />

        <Route path="/refer-and-earn" element={<ReferAndEarnPage />} />

        {/* signup redirection on refer link */}
        <Route path="/ref/:referralCode" element={<Login />} />

        <Route path="/my-profile" element={<MyProfile />} />

        <Route path="/currentBookings" element={<CurrentBookedService />} />
        <Route path="/confirmedRides" element={<ConfirmedRides />} />
        <Route path="/ongoingRides" element={<OngoingRides />} />

        
        <Route path="/allBookings" element={<AllBookedServices />} />

        <Route path="/detailView/:id" element={<BookingDetailView />} />
        <Route path="/privacyPolicy" element={<PrivacyPolicy />} />

        {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
        <Route path="*" element={<NotFound />} />
      </Routes>

      {/* Global Sidebar - will be available on all pages */}
      <Sidebar onNavigate={handleNavigation} />
    </>
  );
};

const App = () => (
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={<div>Loading...</div>} persistor={persistor}>
        <QueryClientProvider client={queryClient}>
          <TooltipProvider>
            <Toaster />
            <Sonner />
            <SidebarProvider>
              <BrowserRouter>
                <AppWithSidebar />
              </BrowserRouter>
            </SidebarProvider>
          </TooltipProvider>
        </QueryClientProvider>
      </PersistGate>
    </Provider>
  </React.StrictMode>
);

export default App;