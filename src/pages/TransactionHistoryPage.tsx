import React, { useState, useEffect } from 'react';
import {
  ArrowDownCircle,
  ArrowUpCircle,
  PlusCircle,
  Search,
} from 'lucide-react';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import Footer from '@/components/layout/Footer';
import Header from '@/components/layout/Header';
import LeftSidebar from '@/components/layout/LeftSidebar';

// Data structure interface
interface Transaction {
  id: string;
  description: string;
  date: string;
  type: 'incoming' | 'outgoing' | 'top-up';
  status: 'Completed' | 'Pending' | 'Failed';
  currency: 'USD' | 'EUR';
  amount: number;
}


const TransactionTypeIcon = ({ type }: { type: string }) => {
  switch (type) {
    case 'incoming':
      return <ArrowDownCircle className="h-5 w-5 text-green-500" />;
    case 'outgoing':
      return <ArrowUpCircle className="h-5 w-5 text-red-500" />;
    case 'top-up':
      return <PlusCircle className="h-5 w-5 text-blue-500" />;
    default:
      return null;
  }
};

const TransactionHistoryPage = () => {
  console.log('TransactionHistoryPage loaded');
  const [transactions, setTransactions] = useState<Transaction[]>([]);

  useEffect(() => {
    const appDataString = localStorage.getItem('appData');
    if (appDataString) {
      const appData = JSON.parse(appDataString);
      setTransactions(appData.transactions);
      console.log('Transaction history loaded from localStorage.');
    }
  }, []);


  return (
    <div className="flex min-h-screen w-full flex-col bg-muted/40">
      <LeftSidebar />
      <div className="flex flex-col sm:gap-4 sm:py-4 sm:pl-14">
        <Header />
        <main className="flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
            <div className="mb-8">
                <h1 className="text-3xl font-bold tracking-tight">Transaction History</h1>
                <p className="text-muted-foreground">View and manage all your transactions.</p>
            </div>
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Filter Transactions</CardTitle>
              <CardDescription>
                Narrow down your transaction history with the filters below.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="relative">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    type="search"
                    placeholder="Search by description..."
                    className="w-full pl-8"
                  />
                </div>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Filter by Type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Types</SelectItem>
                    <SelectItem value="incoming">Incoming</SelectItem>
                    <SelectItem value="outgoing">Outgoing</SelectItem>
                    <SelectItem value="top-up">Top-up</SelectItem>
                  </SelectContent>
                </Select>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Filter by Currency" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Currencies</SelectItem>
                    <SelectItem value="usd">USD</SelectItem>
                    <SelectItem value="eur">EUR</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>All Transactions</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Transaction</TableHead>
                    <TableHead className="hidden sm:table-cell">Date</TableHead>
                    <TableHead className="hidden md:table-cell">Type</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Amount</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {transactions.map((txn) => (
                    <TableRow key={txn.id}>
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <TransactionTypeIcon type={txn.type} />
                          <div className="font-medium">{txn.description}</div>
                        </div>
                      </TableCell>
                       <TableCell className="hidden sm:table-cell">{txn.date}</TableCell>
                       <TableCell className="hidden md:table-cell capitalize">{txn.type}</TableCell>
                      <TableCell>
                        <Badge variant={txn.status === 'Completed' ? 'default' : (txn.status === 'Pending' ? 'secondary' : 'destructive')}>\n                          {txn.status}\n                        </Badge>
                      </TableCell>
                      <TableCell className={`text-right font-medium ${txn.amount > 0 ? 'text-green-600' : 'text-foreground'}`}>
                        {new Intl.NumberFormat('en-US', {
                          style: 'currency',
                          currency: txn.currency,
                        }).format(txn.amount)}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
            <div className="p-4 border-t">
              <Pagination>
                <PaginationContent>
                  <PaginationItem>
                    <PaginationPrevious href="#" />
                  </PaginationItem>
                  <PaginationItem>
                    <PaginationLink href="#">1</PaginationLink>
                  </PaginationItem>
                  <PaginationItem>
                    <PaginationLink href="#" isActive>
                      2
                    </PaginationLink>
                  </PaginationItem>
                  <PaginationItem>
                    <PaginationLink href="#">3</PaginationLink>
                  </PaginationItem>
                  <PaginationItem>
                    <PaginationNext href="#" />
                  </PaginationItem>
                </PaginationContent>
              </Pagination>
            </div>
          </Card>
        </main>
        <Footer />
      </div>
    </div>
  );
};

export default TransactionHistoryPage;