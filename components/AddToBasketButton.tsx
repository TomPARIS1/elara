"use client"

import useBasketStore from '@/app/(store)/store';
import { Product } from '@/sanity.types'
import React, { useEffect, useState } from 'react'

interface AddToBasketButtonProps {
    product: Product;
    disabled?: boolean;
}

function AddToBasketButton({ product, disabled }: AddToBasketButtonProps) {
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
        <div className="flex items-center space-x-4">

      <button
        onClick={() => removeItem(product._id)}
        disabled={itemCount === 0}
        className={`w-12 h-12 rounded-xl flex items-center justify-center text-lg font-semibold transition-all shadow border ${
          itemCount === 0
            ? 'bg-muted text-muted-foreground cursor-not-allowed border-border'
            : 'bg-card hover:bg-accent hover:text-accent-foreground border-border'
        }`}
      >
        -
      </button>

      <span className="text-lg font-medium w-6 text-center text-foreground">
        {itemCount}
      </span>

      <button
        onClick={() => addItem(product)}
        disabled={disabled}
        className={`w-12 h-12 rounded-xl flex items-center justify-center text-lg font-semibold transition-all shadow border ${
          disabled
            ? 'bg-muted text-muted-foreground cursor-not-allowed border-border'
            : 'bg-card hover:bg-accent hover:text-accent-foreground border-border'
        }`}
      >
        +
      </button>
    </div>
    )
}

export default AddToBasketButton