import React from 'react';
import { Link } from 'react-router-dom';

import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowUpRight, ArrowDownLeft } from 'lucide-react';

interface AccountBalanceCardProps {
  currency: 'USD' | 'EUR' | string;
  balance: number;
}

const AccountBalanceCard: React.FC<AccountBalanceCardProps> = ({ currency, balance }) => {
  console.log(`AccountBalanceCard loaded for ${currency}`);

  const formattedBalance = new Intl.NumberFormat('en-US', {
    style: 'decimal',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(balance);

  const currencySymbol = currency === 'USD' ? '$' : '€';

  return (
    <Card className="w-full transition-shadow duration-300 hover:shadow-lg">
      <CardHeader>
        <CardTitle className="text-muted-foreground font-medium">
          {currency} Balance
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="text-4xl font-bold tracking-tight">
          {currencySymbol}{formattedBalance}
        </div>
      </CardContent>
      <CardFooter className="flex gap-2">
        <Button asChild className="flex-1">
          <Link to="/send-money">
            <ArrowUpRight className="mr-2 h-4 w-4" />
            Send
          </Link>
        </Button>
        <Button asChild variant="secondary" className="flex-1">
          <Link to="/add-money">
            <ArrowDownLeft className="mr-2 h-4 w-4" />
            Add Money
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
};

export default AccountBalanceCard;