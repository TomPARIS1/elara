import { imageUrl } from '@/lib/imageUrl';
import { getProductBySlug } from '@/sanity/lib/products/getProductBySlug';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import React from 'react'
import { PortableText } from 'next-sanity';
import { Button } from '@/components/ui/button';
import AddToBasketButton from '@/components/AddToBasketButton';
import { getProductsByCategory } from '@/sanity/lib/products/getProductsByCategory';
import ProductGrid from '@/components/ProductGrid';
import ProductCard from '@/components/ProductCard';

async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const product = await getProductBySlug(slug);
    const outOfStock = product?.stock != 0 ? false : true;

    if (!product) {
      return notFound();
    }

    const categoryId = product?.categories?.[0]?._ref;

    const currentProductId = product?._id; 

    const similarProducts = await getProductsByCategory(
        categoryId ?? "",
        currentProductId ?? ""
    );

    
    

    return (
        <section className="relative bg-background text-foreground py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 gap-12 lg:gap-16 items-start pb-8">

          <div className="relative bg-gray-200 border border-border rounded-2xl overflow-hidden shadow-sm h-96 md:h-[500px]">
            {product.image && (
              <Image
                src={imageUrl(product.image).url()}
                alt={product.name ?? "Product Image"}
                fill
                className="object-contain group-hover:scale-105 transition-transform duration-500"
              />
            )}
          </div>

          <div className="flex flex-col gap-6">
            <h1 className="text-4xl md:text-5xl font-light tracking-tight leading-tight">
              {product.name}
            </h1>

            <span className={`text-2xl md:text-3xl font-light ${outOfStock ? 'text-red-500' : 'text-foreground'}`}>
              ${product.price?.toFixed(2)}
            </span>

            {Array.isArray(product.description) && (
              <div className="prose max-w-none text-muted-foreground font-light">
                <PortableText value={product.description} />
              </div>
            )}

            <div className="mt-6">
              <AddToBasketButton product={product} disabled={outOfStock} />
            </div>
          </div>
        </div>


        <div className="py-8 border-t">
          <h1 className="text-4xl md:text-5xl font-light tracking-tight text-foreground text-balance mb-2">
            You may also like
          </h1>
        </div>
        <div className="flex items-center justify-between mb-6 pb-4 border-b border-border">

        
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {similarProducts?.map((product, index) => (
              <ProductCard
                  key={index}
                  product={product}
              />
            ))}
            </div>
        </div>
      </div>
    </section>
    )
}

export default ProductPage;