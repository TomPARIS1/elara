"use client"

import { Product } from '@/sanity.types'
import useBasketStore from '@/store/store'

function AddToBasketButton({ product }: {product: Product}) {
    const { addItem } = useBasketStore();

  return (
    <div>
        <button
            onClick={() => addItem(product)}
            className="w-full py-3 px-6 cursor-pointer flex items-center justify-center gap-2 transition-all duration-300 font-light text-sm tracking-wide bg-foreground text-background hover:bg-accent hover:text-accent-foreground disabled:opacity-50 disabled:cursor-not-allowed"
        >
            Add to Basket
        </button>
    </div>
  )
}

export default AddToBasketButton