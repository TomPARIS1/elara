"use client"

import React, { useEffect, useState } from 'react'
import useBasketStore from '../store';
import { useAuth, useUser } from '@clerk/nextjs';
import { useRouter } from 'next/navigation';
import AddToBasketButton from '@/components/AddToBasketButton';
import Image from 'next/image';
import { imageUrl } from '@/lib/imageUrl';

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
        return null;
    }

    if (groupedItems.length === 0) {
    }
    
    
    return (
        <section className="relative bg-background text-foreground py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl md:text-5xl font-light tracking-tight mb-12">Your Basket</h1>
  
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
            <div className="lg:col-span-2 flex flex-col gap-6">
              {groupedItems.map((item) => (
                <div
                  key={item.product._id}
                  className="group bg-card border border-border rounded-xl p-5 flex items-center justify-between hover:border-accent transition-all duration-300 hover:shadow-md"
                >
                  <div
                    className="flex items-center gap-5 cursor-pointer"
                    onClick={() => router.push(`/product/${item.product.slug?.current}`)}
                  >
                    <div className="relative w-20 h-20 bg-muted rounded-lg overflow-hidden">
                      {item.product.image && (
                        <Image
                        src={imageUrl(item.product.image).url()}
                        alt={item.product.name ?? "Product Image"}
                        fill
                        className="object-contain group-hover:scale-105 transition-transform duration-500"
                      />
                      )}
                      
                    </div>
  
                    <div className="flex flex-col">
                      <h2 className="text-sm font-light text-foreground line-clamp-2">
                        {item.product.name}
                      </h2>
                      <span className="text-xs text-muted-foreground font-light">
                        Qty: {item.quantity}
                      </span>
                    </div>
                  </div>
  
                  <div className="flex flex-col items-end gap-2">
                    <p className="text-base font-light text-foreground">
                        ${item.product.price && (
                            (item.product.price * item.quantity).toFixed(2)
                        )}
                    </p>
  
                    <AddToBasketButton product={item.product} />
                  </div>
                </div>
              ))}
            </div>
  
            <div className="bg-card border border-border rounded-xl p-6 h-fit shadow-sm">
              <h3 className="text-2xl font-light tracking-tight mb-6">Order Summary</h3>
  
              <div className="flex flex-col gap-3 text-sm font-light text-muted-foreground">
                {groupedItems.map((item) => (
                  <div key={item.product._id} className="flex justify-between">
                    <span>
                      {item.product.name} × {item.quantity}
                    </span>
                    <span>
                    ${item.product.price && (
                            (item.product.price * item.quantity).toFixed(2)
                        )}
                    </span>
                  </div>
                ))}
              </div>
  
              <hr className="my-6 border-border" />
  
              <div className="flex justify-between text-xl font-light text-foreground mb-6">
                <span>Total</span>
                <span>${groupedItems.reduce((total, item) => total + (item.product.price ?? 0) * item.quantity, 0).toFixed(2)}</span>
              </div>
  
              <button className="w-full bg-accent text-accent-foreground py-3 font-medium text-sm tracking-wide rounded-md hover:shadow-md transition-shadow duration-300">
                Checkout
              </button>
            </div>
          </div>
        </div>
      </section>
    )
}

export default BasketPage