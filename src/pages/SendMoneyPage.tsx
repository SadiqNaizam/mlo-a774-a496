import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

// Layout Components
import Header from '@/components/layout/Header';
import LeftSidebar from '@/components/layout/LeftSidebar';
import Footer from '@/components/layout/Footer';

// Shadcn UI Components
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

const SendMoneyPage: React.FC = () => {
  console.log('SendMoneyPage loaded');
  const navigate = useNavigate();

  const [recipient, setRecipient] = useState('');
  const [amount, setAmount] = useState('');
  const [currency, setCurrency] = useState('EUR');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Basic validation
    if (!recipient || !amount || parseFloat(amount) <= 0) {
      toast.error('Please fill in all fields correctly.');
      return;
    }

    const appDataString = localStorage.getItem('appData');
    if (!appDataString) {
      toast.error('Could not retrieve account data. Please try refreshing.');
      return;
    }

    const appData = JSON.parse(appDataString);
    const numericAmount = parseFloat(amount);

    // Check for sufficient funds
    if (appData.balances[currency] < numericAmount) {
      toast.error(`Insufficient ${currency} funds.`);
      return;
    }

    // Update balance
    appData.balances[currency] -= numericAmount;

    // Create new transaction
    const newTransaction = {
      id: `txn_${new Date().getTime()}`,
      description: `Transfer to ${recipient}`,
      date: new Date().toISOString().split('T')[0], // YYYY-MM-DD
      type: 'outgoing' as const,
      status: 'Completed' as const,
      currency: currency as 'USD' | 'EUR',
      amount: -numericAmount,
    };

    // Add new transaction to the beginning of the list
    appData.transactions.unshift(newTransaction);

    // Save updated data back to localStorage
    localStorage.setItem('appData', JSON.stringify(appData));
    
    // Show success toast
    toast.success(`Transfer of ${amount} ${currency} to ${recipient} initiated!`);

    // Redirect to dashboard after a short delay
    setTimeout(() => {
      navigate('/'); // Navigate to dashboard as per user journey
    }, 2000);
  };

  return (
    <div className="flex min-h-screen w-full flex-col bg-muted/40">
      <LeftSidebar />
      <div className="flex flex-col sm:gap-4 sm:py-4 sm:pl-14">
        <Header />
        <main className="flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8 flex items-center justify-center">
          <Card className="w-full max-w-lg">
            <form onSubmit={handleSubmit}>
              <CardHeader>
                <CardTitle>Send Money</CardTitle>
                <CardDescription>
                  Transfer funds to another account securely.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-6">
                  <div className="grid gap-3">
                    <Label htmlFor="recipient">Recipient's Email or Account ID</Label>
                    <Input
                      id="recipient"
                      type="email"
                      placeholder="name@example.com"
                      value={recipient}
                      onChange={(e) => setRecipient(e.target.value)}
                      required
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="grid gap-3">
                      <Label htmlFor="amount">Amount</Label>
                      <Input
                        id="amount"
                        type="number"
                        placeholder="0.00"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                        required
                        min="0.01"
                        step="0.01"
                      />
                    </div>
                    <div className="grid gap-3">
                      <Label htmlFor="currency">Currency</Label>
                      <Select value={currency} onValueChange={setCurrency}>
                        <SelectTrigger id="currency">
                          <SelectValue placeholder="Select currency" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="EUR">EUR</SelectItem>
                          <SelectItem value="USD">USD</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button type="submit" className="w-full">
                  Send Money
                </Button>
              </CardFooter>
            </form>
          </Card>
        </main>
        <Footer />
      </div>
    </div>
  );
};

export default SendMoneyPage;