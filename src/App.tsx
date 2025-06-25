import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";


import AddMoneyPage from "./pages/AddMoneyPage";
import DashboardPage from "./pages/DashboardPage";
import LoginPage from "./pages/LoginPage";
import SendMoneyPage from "./pages/SendMoneyPage";
import TransactionHistoryPage from "./pages/TransactionHistoryPage";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();


const App = () => (
<QueryClientProvider client={queryClient}>
    <TooltipProvider>
    <Toaster />
    <Sonner />
    <BrowserRouter>
        <Routes>


          <Route path="/" element={<DashboardPage />} />
          <Route path="/add-money" element={<AddMoneyPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/send-money" element={<SendMoneyPage />} />
          <Route path="/transaction-history" element={<TransactionHistoryPage />} />
          {/* catch-all */}
          <Route path="*" element={<NotFound />} />


        </Routes>
    </BrowserRouter>
    </TooltipProvider>
</QueryClientProvider>
);

export default App;
