import React from 'react';
import { Link } from 'react-router-dom';

const Footer: React.FC = () => {
  console.log('Footer loaded');
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t bg-background">
      <div className="container mx-auto py-4 px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between">
          <p className="text-center text-sm text-muted-foreground mb-2 md:mb-0">
            &copy; {currentYear} Magic Bank. All rights reserved.
          </p>
          <nav className="flex gap-4 sm:gap-6 text-sm text-muted-foreground">
            {/* These links are placeholders as no routes are defined in App.tsx */}
            <Link to="#" className="hover:text-primary transition-colors">
              Terms of Service
            </Link>
            <Link to="#" className="hover:text-primary transition-colors">
              Privacy Policy
            </Link>
            <Link to="#" className="hover:text-primary transition-colors">
              Contact Support
            </Link>
          </nav>
        </div>
      </div>
    </footer>
  );
};

export default Footer;