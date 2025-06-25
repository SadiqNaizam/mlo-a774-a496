import React from 'react';
import { Link } from 'react-router-dom';
import Header from '@/components/layout/Header';
import LeftSidebar from '@/components/layout/LeftSidebar';
import Footer from '@/components/layout/Footer';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Copy } from 'lucide-react';

const AddMoneyPage: React.FC = () => {
  console.log('AddMoneyPage loaded');

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    // In a real app, you would show a toast notification here.
    console.log('Copied to clipboard:', text);
  };

  return (
    <div className="flex min-h-screen w-full flex-col bg-muted/40">
      <LeftSidebar />
      <div className="flex flex-col sm:gap-4 sm:py-4 sm:pl-14">
        <Header />
        <main className="flex-1 grid items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
          <div className="max-w-4xl mx-auto w-full">
            <div className="flex items-center gap-4 mb-4">
              <Link to="/">
                <Button variant="outline" size="icon" className="h-7 w-7">
                  <ArrowLeft className="h-4 w-4" />
                  <span className="sr-only">Back</span>
                </Button>
              </Link>
              <h1 className="flex-1 shrink-0 whitespace-nowrap text-xl font-semibold tracking-tight sm:grow-0">
                Add Money
              </h1>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Deposit Instructions</CardTitle>
                <CardDescription>
                  Use the details below to add funds to your Magic Bank account via bank transfer.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Accordion type="single" collapsible defaultValue="item-1" className="w-full">
                  <AccordionItem value="item-1">
                    <AccordionTrigger>Deposit via Bank Transfer (USD)</AccordionTrigger>
                    <AccordionContent>
                      <div className="space-y-3 text-sm">
                        <p>To add USD to your account, please initiate a wire transfer to the following bank details.</p>
                        <div className="p-4 border rounded-lg space-y-2 bg-background">
                           <div className="flex justify-between items-center">
                              <span><strong>Account Holder:</strong> John Doe</span>
                              <Button variant="ghost" size="icon" onClick={() => handleCopy('John Doe')}><Copy className="h-4 w-4" /></Button>
                           </div>
                           <div className="flex justify-between items-center">
                              <span><strong>Account Number:</strong> 123456789</span>
                              <Button variant="ghost" size="icon" onClick={() => handleCopy('123456789')}><Copy className="h-4 w-4" /></Button>
                           </div>
                           <div className="flex justify-between items-center">
                              <span><strong>Routing Number (ACH):</strong> 021000021</span>
                               <Button variant="ghost" size="icon" onClick={() => handleCopy('021000021')}><Copy className="h-4 w-4" /></Button>
                           </div>
                           <div className="flex justify-between items-center">
                              <span><strong>Bank Name:</strong> Magic Bank of America</span>
                               <Button variant="ghost" size="icon" onClick={() => handleCopy('Magic Bank of America')}><Copy className="h-4 w-4" /></Button>
                           </div>
                        </div>
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="item-2">
                    <AccordionTrigger>Deposit via Bank Transfer (EUR)</AccordionTrigger>
                    <AccordionContent>
                      <div className="space-y-3 text-sm">
                        <p>To add EUR to your account, please initiate a SEPA transfer to the following bank details.</p>
                         <div className="p-4 border rounded-lg space-y-2 bg-background">
                           <div className="flex justify-between items-center">
                              <span><strong>Account Holder:</strong> John Doe</span>
                              <Button variant="ghost" size="icon" onClick={() => handleCopy('John Doe')}><Copy className="h-4 w-4" /></Button>
                           </div>
                           <div className="flex justify-between items-center">
                              <span><strong>IBAN:</strong> DE89 3704 0044 0532 0130 00</span>
                              <Button variant="ghost" size="icon" onClick={() => handleCopy('DE89 3704 0044 0532 0130 00')}><Copy className="h-4 w-4" /></Button>
                           </div>
                           <div className="flex justify-between items-center">
                              <span><strong>SWIFT/BIC:</strong> COBADEFFXXX</span>
                              <Button variant="ghost" size="icon" onClick={() => handleCopy('COBADEFFXXX')}><Copy className="h-4 w-4" /></Button>
                           </div>
                           <div className="flex justify-between items-center">
                              <span><strong>Bank Name:</strong> Magic Bank Germany AG</span>
                              <Button variant="ghost" size="icon" onClick={() => handleCopy('Magic Bank Germany AG')}><Copy className="h-4 w-4" /></Button>
                           </div>
                        </div>
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </CardContent>
            </Card>
          </div>
        </main>
        <Footer />
      </div>
    </div>
  );
};

export default AddMoneyPage;