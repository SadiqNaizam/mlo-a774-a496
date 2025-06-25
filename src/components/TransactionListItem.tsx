import React from 'react';
import { ArrowDownLeft, ArrowUpRight } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface TransactionListItemProps {
  type: 'in' | 'out';
  description: string;
  date: string;
  amount: number;
  currency: 'USD' | 'EUR';
}

const TransactionListItem: React.FC<TransactionListItemProps> = ({
  type,
  description,
  date,
  amount,
  currency,
}) => {
  console.log('TransactionListItem loaded for:', description);

  const isIncome = type === 'in';

  // Format the amount with a currency symbol and a sign (+/-)
  const formattedAmount = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: currency,
    signDisplay: 'always',
  }).format(isIncome ? amount : -amount);

  const iconBgClass = isIncome ? 'bg-green-100 dark:bg-green-900/50' : 'bg-red-100 dark:bg-red-900/50';
  const iconClass = isIncome ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400';
  const amountClass = isIncome ? 'text-green-600' : 'text-slate-900 dark:text-slate-50';

  return (
    <div className="flex items-center justify-between py-4 px-2 border-b border-slate-100 dark:border-slate-800 last:border-b-0">
      <div className="flex items-center gap-4 truncate">
        <div className={cn("flex h-10 w-10 shrink-0 items-center justify-center rounded-full", iconBgClass)}>
          {isIncome ? (
            <ArrowDownLeft className={cn("h-5 w-5", iconClass)} />
          ) : (
            <ArrowUpRight className={cn("h-5 w-5", iconClass)} />
          )}
        </div>
        <div className="grid gap-0.5 truncate">
          <p className="font-semibold text-sm text-slate-900 dark:text-slate-50 truncate" title={description}>
            {description}
          </p>
          <p className="text-xs text-slate-500 dark:text-slate-400">{date}</p>
        </div>
      </div>
      <p className={cn("font-bold text-base whitespace-nowrap pl-4", amountClass)}>
        {formattedAmount}
      </p>
    </div>
  );
};

export default TransactionListItem;