"use client"

import useBasketStore from '@/store/store';
import { Product } from '@/sanity.types'
import React, { useEffect, useState } from 'react'
import { Minus, Plus } from 'lucide-react';

interface QuantitySelectorProps {
    product: Product;
    disabled?: boolean;
}

function QuantitySelector({ product, disabled }: QuantitySelectorProps) {
  const { addItem, removeItem, getItemCount } = useBasketStore();
  const itemCount = getItemCount(product._id);

  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return null;
  }

  return (
    <div className="flex items-center gap-4">
      <span className="text-sm font-light text-muted-foreground">Quantity:</span>

      <div className="flex items-center border border-border bg-background">
        
        <button
          onClick={() => removeItem(product._id)}
          disabled={itemCount === 0}
          className="p-2 text-foreground hover:bg-secondary disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          type="button"
        >
          <Minus className="w-4 h-4" />
        </button>

        <div className="w-12 py-1 text-center border-x border-border bg-transparent text-foreground font-light text-sm flex items-center justify-center min-h-[32px]">
          {itemCount}
        </div>

        <button
          onClick={() => addItem(product)}
          disabled={disabled}
          className="p-2 text-foreground hover:bg-secondary disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          type="button"
        >
          <Plus className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}

export default QuantitySelector;