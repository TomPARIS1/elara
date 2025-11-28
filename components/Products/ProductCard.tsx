"use client"

import { imageUrl } from '@/lib/imageUrl'
import { Product } from '@/sanity.types'
import { Star } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

function ProductCard({ product }: { product: Product }) {
  const outOfStock = product.stock != 0 ? false : true;

  return (
    <Link href={`/product/${product.slug?.current}`}>
    <div
      className="group bg-card border border-border overflow-hidden hover:border-accent hover:shadow-md transition-all duration-300 "
    >
      <div className="relative h-72 overflow-hidden bg-muted">
        
        {product.image && product.name && (
          <Image
            src={imageUrl(product.image).url()}
            alt={product.name}
            fill
            className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-500"
          />
        )}
        
        
      </div>

      <div className="p-5">
        <h3 className="font-light text-foreground line-clamp-2 mb-3 text-sm leading-snug min-h-10">{product.name}</h3>

        <div className="flex items-center gap-2 mb-4">
          <div className="flex items-center gap-0.5">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`w-3.5 h-3.5 ${i < Math.floor(product.rating?.rate ?? 0) ? "fill-accent text-accent" : "text-border"}`}
              />
            ))}
          </div>
          <span className="text-xs text-muted-foreground font-light">({product.rating?.count})</span>
        </div>

        <div className="flex items-end justify-between">
          {outOfStock ? (
            <span className="text-base text-red-600">Out of stock</span>
          ) : (
            <span className="text-base font-light text-foreground">${product.price?.toFixed(2)}</span>
          )}
        </div>
      </div>
    </div>
    </Link>
  )
}

export default ProductCard