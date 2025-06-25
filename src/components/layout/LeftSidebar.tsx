import React from 'react';
import { NavLink } from 'react-router-dom';
import { Banknote, LayoutDashboard, ArrowRightLeft, CreditCard, Settings } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import { cn } from '@/lib/utils';

const LeftSidebar: React.FC = () => {
  console.log('LeftSidebar loaded');

  const navLinkClass = ({ isActive }: { isActive: boolean }): string => {
    return cn(
      "flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8",
      { "bg-accent text-accent-foreground": isActive }
    );
  };
  
  const navItems = [
    { to: "/", icon: LayoutDashboard, label: "Dashboard" },
    { to: "/transaction-history", icon: ArrowRightLeft, label: "All Transactions" },
    { to: "#", icon: CreditCard, label: "Cards" }, // Placeholder link
    { to: "#", icon: Settings, label: "Settings" }, // Placeholder link
  ];

  return (
    <aside className="fixed inset-y-0 left-0 z-10 hidden w-14 flex-col border-r bg-background sm:flex">
      <nav className="flex flex-col items-center gap-4 px-2 sm:py-5">
        <NavLink
          to="/"
          className="group flex h-9 w-9 shrink-0 items-center justify-center gap-2 rounded-full bg-primary text-lg font-semibold text-primary-foreground md:h-8 md:w-8 md:text-base"
        >
          <Banknote className="h-4 w-4 transition-all group-hover:scale-110" />
          <span className="sr-only">Magic Bank</span>
        </NavLink>
        {navItems.map((item) => (
          <Tooltip key={item.label}>
            <TooltipTrigger asChild>
              <NavLink to={item.to} className={navLinkClass}>
                <item.icon className="h-5 w-5" />
                <span className="sr-only">{item.label}</span>
              </NavLink>
            </TooltipTrigger>
            <TooltipContent side="right">{item.label}</TooltipContent>
          </Tooltip>
        ))}
      </nav>
    </aside>
  );
};

export default LeftSidebar;