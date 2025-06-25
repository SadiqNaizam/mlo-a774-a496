import React, { useState, useEffect } from 'react';

// Custom Layout Components
import Header from '@/components/layout/Header';
import LeftSidebar from '@/components/layout/LeftSidebar';
import Footer from '@/components/layout/Footer';

// Custom UI Components
import AccountBalanceCard from '@/components/AccountBalanceCard';
import TransactionListItem from '@/components/TransactionListItem';

// shadcn/ui Components
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

// Data structure interfaces
interface Balance {
  USD: number;
  EUR: number;
  [key: string]: number;
}

interface Transaction {
  id: string;
  description: string;
  date: string;
  type: 'incoming' | 'outgoing' | 'top-up';
  status: 'Completed' | 'Pending' | 'Failed';
  currency: 'USD' | 'EUR';
  amount: number;
}

const DashboardPage = () => {
  console.log('DashboardPage loaded');
  const [balances, setBalances] = useState<Balance>({ USD: 0, EUR: 0 });
  const [transactions, setTransactions] = useState<Transaction[]>([]);

  useEffect(() => {
    const appDataString = localStorage.getItem('appData');
    if (appDataString) {
      const appData = JSON.parse(appDataString);
      setBalances(appData.balances);
      setTransactions(appData.transactions);
      console.log('Dashboard data loaded from localStorage.');
    }
  }, []);

  const usdTransactions = transactions
    .filter((tx) => tx.currency === 'USD')
    .slice(0, 4);

  const eurTransactions = transactions
    .filter((tx) => tx.currency === 'EUR')
    .slice(0, 4);
    
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  }

  return (
    <div className="flex min-h-screen w-full flex-col bg-muted/40">
      <LeftSidebar />
      <div className="flex flex-col sm:gap-4 sm:py-4 sm:pl-14">
        <Header />
        <main className="flex-1 space-y-8 p-4 sm:px-6 sm:py-0">
          <div className="flex items-center justify-between space-y-2">
            <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
          </div>

          {/* Account Balance Cards */}
          <section className="grid gap-6 md:grid-cols-2">
            <AccountBalanceCard currency="USD" balance={balances.USD} />
            <AccountBalanceCard currency="EUR" balance={balances.EUR} />
          </section>

          {/* Recent Transactions */}
          <section>
            <Card>
              <CardHeader>
                <CardTitle>Recent Transactions</CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                <Tabs defaultValue="usd">
                  <TabsList className="px-6">
                    <TabsTrigger value="usd">USD</TabsTrigger>
                    <TabsTrigger value="eur">EUR</TabsTrigger>
                  </TabsList>
                  <TabsContent value="usd" className="space-y-4 px-2">
                    {usdTransactions.length > 0 ? (
                      usdTransactions.map((tx) => (
                        <TransactionListItem
                          key={tx.id}
                          type={tx.type === 'outgoing' ? 'out' : 'in'}
                          description={tx.description}
                          date={formatDate(tx.date)}
                          amount={Math.abs(tx.amount)}
                          currency={tx.currency}
                        />
                      ))
                    ) : (
                      <p className="p-6 text-center text-muted-foreground">No recent USD transactions.</p>
                    )}
                  </TabsContent>
                  <TabsContent value="eur" className="space-y-4 px-2">
                    {eurTransactions.length > 0 ? (
                      eurTransactions.map((tx) => (
                        <TransactionListItem
                          key={tx.id}
                          type={tx.type === 'outgoing' ? 'out' : 'in'}
                          description={tx.description}
                          date={formatDate(tx.date)}
                          amount={Math.abs(tx.amount)}
                          currency={tx.currency}
                        />
                      ))
                    ) : (
                      <p className="p-6 text-center text-muted-foreground">No recent EUR transactions.</p>
                    )}
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          </section>
        </main>
        <Footer />
      </div>
    </div>
  );
};

export default DashboardPage;