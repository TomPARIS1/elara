"use client"

import { useEffect, useState } from 'react'
import useBasketStore from '../../../store/store';
import { SignInButton, useAuth, useUser } from '@clerk/nextjs';
import { useRouter } from 'next/navigation';
import QuantitySelector from '@/components/Products/QuantitySelector';
import Image from 'next/image';
import { imageUrl } from '@/lib/imageUrl';
import { Loader2 } from 'lucide-react';
import { createCheckoutSession } from '@/app/actions/createCheckoutSession';

const CheckIcon = () => <span className="text-accent mr-2">✓</span>;

function BasketPage() {
  const groupedItems = useBasketStore((state) => state.getGroupedItems());
  const { isSignedIn } = useAuth();
  const { user } = useUser();
  const router = useRouter();

  const [isClient, setIsClient] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return (
        <div className="min-h-screen flex items-center justify-center bg-background">
            <Loader2 className="w-8 h-8 animate-spin text-foreground" />
        </div>
    );
  }

  if (groupedItems.length === 0) {
    return (
      <main className="min-h-screen bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 text-center">
          <h1 className="text-3xl font-light tracking-tight text-foreground mb-4">Your Basket is empty</h1>
          <p className="text-muted-foreground font-light mb-8">
            Looks like you haven't added anything yet.
          </p>
          <button 
            onClick={() => router.push('/')}
            className="inline-flex items-center justify-center px-8 py-3 bg-foreground text-background hover:bg-accent hover:text-accent-foreground transition-all duration-300 font-light text-sm tracking-wide"
          >
            Start Shopping
          </button>
        </div>
      </main>
    );
  }

  const handleCheckout = async () => {
    if (!isSignedIn) return;
    setIsLoading(true);

    try {
      const metadata = {
        orderNumber: crypto.randomUUID(),
        customerName: user?.fullName ?? "Unknown",
        customerEmail: user?.emailAddresses[0].emailAddress ?? "Unknown",
        clerkUserId: user!.id,
      };

      const checkoutUrl = await createCheckoutSession(groupedItems, metadata);

      if (checkoutUrl) {
        window.location.href = checkoutUrl;
      }
    } catch (error) {
      console.error("Error creating checkout session:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-background pb-24">
      
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        
        <h1 className="text-3xl md:text-4xl font-light tracking-tight text-foreground text-balance mb-12">
           Your Basket
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 lg:gap-16">
          
          <div className="lg:col-span-2">
            <div className="flex flex-col border-t border-border">
              {groupedItems.map((item) => (
                <div
                  key={item.product._id}
                  className="flex flex-col md:flex-row gap-6 items-start md:items-center py-8 border-b border-border group"
                >
                  <div 
                    className="relative w-24 h-24 md:w-32 md:h-32 bg-gray-100 border border-border overflow-hidden cursor-pointer shrink-0"
                    onClick={() => router.push(`/product/${item.product.slug?.current}`)}
                  >
                    {item.product.image && (
                      <Image
                        src={imageUrl(item.product.image).url()}
                        alt={item.product.name ?? "Product Image"}
                        fill
                        className="object-contain p-2 group-hover:scale-105 transition-transform duration-500"
                      />
                    )}
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-start mb-2">
                         <h2 
                            className="text-lg font-light text-foreground cursor-pointer hover:text-muted-foreground transition-colors line-clamp-2"
                            onClick={() => router.push(`/product/${item.product.slug?.current}`)}
                        >
                            {item.product.name}
                        </h2>
                        <p className="text-lg font-light text-foreground ml-4">
                            ${item.product.price && (item.product.price * item.quantity).toFixed(2)}
                        </p>
                    </div>
                    
                    <p className="text-sm text-muted-foreground font-light mb-4">
                        Unit Price: ${item.product.price?.toFixed(2)}
                    </p>

                    <div className="flex items-center gap-4">
                        <span className="text-sm font-light text-foreground">Qty: {item.quantity}</span>
                        <div className="scale-90 origin-left">
                             <QuantitySelector product={item.product} />
                        </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="h-fit sticky top-24">
            <div className="bg-gray-50/50 border border-border p-6 md:p-8">
              <h3 className="text-xl font-light tracking-tight mb-6">Order Summary</h3>

              <div className="space-y-4 text-sm font-light text-muted-foreground">
                <div className="flex justify-between text-foreground">
                  <span>Subtotal</span>
                  <span>${groupedItems.reduce((total, item) => total + (item.product.price ?? 0) * item.quantity, 0).toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Shipping</span>
                  <span>Free</span>
                </div>
              </div>

              <hr className="my-6 border-border" />

              <div className="flex justify-between text-xl font-light text-foreground mb-8">
                <span>Total</span>
                <span>
                  ${groupedItems.reduce((total, item) => total + (item.product.price ?? 0) * item.quantity, 0).toFixed(2)}
                </span>
              </div>

              {isSignedIn ? (
                <button
                  onClick={handleCheckout}
                  disabled={isLoading}
                  className="w-full py-3 px-6 flex items-center cursor-pointer justify-center gap-2 transition-all duration-300 font-light text-sm tracking-wide bg-foreground text-background hover:bg-accent hover:text-accent-foreground disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isLoading ? <Loader2 className="animate-spin w-4 h-4" /> : "Checkout"}
                </button>
              ) : (
                <SignInButton mode="modal">
                  <button className="w-full py-3 px-6 flex items-center cursor-pointer justify-center gap-2 transition-all duration-300 font-light text-sm tracking-wide bg-foreground text-background hover:bg-accent hover:text-accent-foreground">
                    Sign in to Checkout
                  </button>
                </SignInButton>
              )}

                <div className="mt-8 pt-6 border-t border-border space-y-3 text-xs font-light text-muted-foreground">
                    <p className="flex items-center"><CheckIcon /> Secure checkout</p>
                    <p className="flex items-center"><CheckIcon /> Free shipping over $50</p>
                </div>
            </div>
          </div>

        </div>
      </section>
    </main>
  );
}

export default BasketPage;