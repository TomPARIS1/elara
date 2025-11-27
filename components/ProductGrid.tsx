import { Product } from '@/sanity.types'
import React from 'react'
import { Button } from './ui/button'
import ProductCard from './ProductCard'

function ProductGrid({ products }: {products: Product[]}) {
  return (
    <section id="featured" className="py-16 md:py-24 bg-secondary">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-12">
          <h2 className="text-3xl md:text-4xl font-light tracking-tight text-foreground text-balance">
            Elara's Best Sellers
          </h2>
        </div>


          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {products.map((product, index) => (
              <ProductCard key={index} product={product}/>
            ))}
          </div>

      </div>
    </section>
  )
}

export default ProductGrid