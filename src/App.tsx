import { useEffect } from "react";
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

const initializeAppData = () => {
  if (localStorage.getItem('appData')) {
    return;
  }

  const initialBalances = {
    USD: 5420.50,
    EUR: 2150.75,
  };

  const initialTransactions = [
    // Data from DashboardPage (recent)
    { id: 'txn_12', description: 'Amazon.de Purchase', date: '2024-06-29', type: 'outgoing', status: 'Completed', currency: 'EUR', amount: -89.90 },
    { id: 'txn_8', description: 'Software Subscription', date: '2024-06-28', type: 'outgoing', status: 'Completed', currency: 'USD', amount: -14.99 },
    { id: 'txn_9', description: 'Client Payment - Project Alpha', date: '2024-06-27', type: 'incoming', status: 'Completed', currency: 'USD', amount: 2500.00 },
    { id: 'txn_13', description: 'Freelance Gig - Logo Design', date: '2024-06-26', type: 'incoming', status: 'Completed', currency: 'EUR', amount: 500.00 },
    { id: 'txn_10', description: 'Salary Deposit', date: '2024-06-25', type: 'incoming', status: 'Completed', currency: 'USD', amount: 3200.50 },
    { id: 'txn_11', description: 'Starbucks Coffee', date: '2024-06-24', type: 'outgoing', status: 'Completed', currency: 'USD', amount: -5.75 },
    { id: 'txn_14', description: 'Train Ticket - Berlin to Hamburg', date: '2024-06-22', type: 'outgoing', status: 'Completed', currency: 'EUR', amount: -45.50 },
    // Data from TransactionHistoryPage (older)
    { id: 'txn_1', description: 'Received from J. Doe', date: '2023-10-26', type: 'incoming', status: 'Completed', currency: 'USD', amount: 2500.0 },
    { id: 'txn_2', description: 'Spotify Subscription', date: '2023-10-25', type: 'outgoing', status: 'Completed', currency: 'EUR', amount: -9.99 },
    { id: 'txn_3', description: 'Bank Transfer Top-up', date: '2023-10-24', type: 'top-up', status: 'Completed', currency: 'EUR', amount: 5000.0 },
    { id: 'txn_4', description: 'Payment to A. Smith', date: '2023-10-23', type: 'outgoing', status: 'Pending', currency: 'USD', amount: -150.0 },
    { id: 'txn_5', description: 'Amazon Purchase', date: '2023-10-22', type: 'outgoing', status: 'Completed', currency: 'USD', amount: -45.5 },
    { id: 'txn_6', description: 'Salary Deposit', date: '2023-10-21', type: 'incoming', status: 'Completed', currency: 'EUR', amount: 3000.0 },
    { id: 'txn_7', description: 'Failed transfer to B. Lee', date: '2023-10-20', type: 'outgoing', status: 'Failed', currency: 'EUR', amount: -200.0 },
  ];

  // Ensure transactions are sorted by date descending for consistency
  initialTransactions.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  const appData = {
    balances: initialBalances,
    transactions: initialTransactions,
  };

  localStorage.setItem('appData', JSON.stringify(appData));
  console.log('App data initialized in localStorage.');
};


const App = () => {
  useEffect(() => {
    initializeAppData();
  }, []);

  return (
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
};

export default App;