import React from 'react'
import { Button } from './ui/button'
import { Category, Product } from '@/sanity.types';

interface ProductsViewProps {
    products: Product[];
    categories: Category[];
}

function ProductsView({ products, categories }: ProductsViewProps) {
  return (
    <div>
        <div>
            {/*<CategoryGrid categories={categories} />*/}
        </div>

        <div>
            <div>
                {/*<ProductGrid products={products} />*/}
            </div>
        </div>
    </div>
  )
}

export default ProductsView