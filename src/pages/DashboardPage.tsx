import React from 'react';

// Custom Layout Components
import Header from '@/components/layout/Header';
import LeftSidebar from '@/components/layout/LeftSidebar';
import Footer from '@/components/layout/Footer';

// Custom UI Components
import AccountBalanceCard from '@/components/AccountBalanceCard';
import TransactionListItem, { TransactionListItemProps } from '@/components/TransactionListItem';

// shadcn/ui Components
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

// Placeholder data for transaction lists
const usdTransactions: TransactionListItemProps[] = [
  {
    type: 'out',
    description: 'Software Subscription',
    date: 'June 28, 2024',
    amount: 14.99,
    currency: 'USD',
  },
  {
    type: 'in',
    description: 'Client Payment - Project Alpha',
    date: 'June 27, 2024',
    amount: 2500.00,
    currency: 'USD',
  },
  {
    type: 'in',
    description: 'Salary Deposit',
    date: 'June 25, 2024',
    amount: 3200.50,
    currency: 'USD',
  },
  {
    type: 'out',
    description: 'Starbucks Coffee',
    date: 'June 24, 2024',
    amount: 5.75,
    currency: 'USD',
  },
];

const eurTransactions: TransactionListItemProps[] = [
  {
    type: 'out',
    description: 'Amazon.de Purchase',
    date: 'June 29, 2024',
    amount: 89.90,
    currency: 'EUR',
  },
  {
    type: 'in',
    description: 'Freelance Gig - Logo Design',
    date: 'June 26, 2024',
    amount: 500.00,
    currency: 'EUR',
  },
  {
    type: 'out',
    description: 'Train Ticket - Berlin to Hamburg',
    date: 'June 22, 2024',
    amount: 45.50,
    currency: 'EUR',
  },
];

const DashboardPage = () => {
  console.log('DashboardPage loaded');

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
            <AccountBalanceCard currency="USD" balance={5420.50} />
            <AccountBalanceCard currency="EUR" balance={2150.75} />
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
                      usdTransactions.map((tx, index) => (
                        <TransactionListItem key={`usd-${index}`} {...tx} />
                      ))
                    ) : (
                      <p className="p-6 text-center text-muted-foreground">No recent USD transactions.</p>
                    )}
                  </TabsContent>
                  <TabsContent value="eur" className="space-y-4 px-2">
                    {eurTransactions.length > 0 ? (
                      eurTransactions.map((tx, index) => (
                        <TransactionListItem key={`eur-${index}`} {...tx} />
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