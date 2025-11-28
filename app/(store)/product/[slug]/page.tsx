import { imageUrl } from '@/lib/imageUrl';
import { getProductBySlug } from '@/sanity/lib/products/getProductBySlug';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import React from 'react'
import { PortableText } from 'next-sanity';
import { Button } from '@/components/ui/button';
import QuantitySelector from '@/components/QuantitySelector';
import { getProductsByCategory } from '@/sanity/lib/products/getProductsByCategory';
import ProductGrid from '@/components/ProductGrid';
import ProductCard from '@/components/ProductCard';
import { Star, StarIcon } from 'lucide-react';
import useBasketStore from '@/store/store';
import AddToBasketButton from '@/components/AddToBasketButton';

const CheckIcon = () => <span className="text-accent mr-2">✓</span>;

async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);
  const outOfStock = product?.stock != 0 ? false : true;

  if (!product) {
    return (
      <main className="min-h-screen bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 text-center">
          <h1 className="text-2xl font-light text-foreground mb-4">Product not found</h1>
          <p className="text-muted-foreground font-light">
            We couldn't find the page you're looking for.
          </p>
        </div>
      </main>
    );
  }

  const categoryId = product?.categories?.[0]?._ref;
  const currentProductId = product?._id;

  const similarProducts = await getProductsByCategory(
    categoryId ?? "",
    currentProductId ?? ""
  );

  return (
    <main className="min-h-screen bg-background text-foreground">

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-16">
          
          <div className="relative w-full aspect-square md:aspect-auto md:h-[600px] bg-gray-100 rounded-2xl overflow-hidden border border-border">
            {product.image && (
              <Image
                src={imageUrl(product.image).url()}
                alt={product.name ?? "Product Image"}
                fill
                className="object-contain hover:scale-105 transition-transform duration-500 p-8"
                priority
              />
            )}
          </div>

          <div className="flex flex-col justify-start">
            
            <h1 className="text-3xl md:text-4xl font-light tracking-tight text-foreground text-balance mb-4">
              {product.name}
            </h1>

            <div className="flex items-center gap-4 mb-6">
               <div className="flex items-center gap-1">
               {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-3.5 h-3.5 ${i < Math.floor(product.rating?.rate ?? 0) ? "fill-accent text-accent" : "text-border"}`}
                  />
                ))}
               </div>
               <span className="text-sm font-light text-muted-foreground">
                 {product.rating?.rate} ({product.rating?.count} reviews)
               </span>
            </div>

            <div className="mb-8 pb-8 border-b border-border">
              <p className={`text-4xl font-light ${outOfStock ? 'text-red-500' : 'text-foreground'}`}>
                ${product.price?.toFixed(2)}
                {outOfStock && <span className="text-lg ml-4 font-medium">(Out of Stock)</span>}
              </p>
            </div>

            <div className="mb-8 pb-8 border-b border-border">
               {Array.isArray(product.description) && (
                <div className="prose max-w-none text-muted-foreground font-light text-sm leading-relaxed">
                  <PortableText value={product.description} />
                </div>
              )}
            </div>

            <div className="mb-8">
                <div className="w-full">
                    <AddToBasketButton product={product} />
                </div>
            </div>

            <div className="mt-4 pt-8 space-y-4 text-sm font-light text-muted-foreground">
              <p className="flex items-center">
                <CheckIcon /> Free shipping on orders over $50
              </p>
              <p className="flex items-center">
                <CheckIcon /> 30-day money-back guarantee
              </p>
              <p className="flex items-center">
                <CheckIcon /> Secure checkout
              </p>
            </div>
          </div>
        </div>

        {similarProducts && similarProducts.length > 0 && (
            <div className="mt-24 pt-12 border-t border-border">
            <h2 className="text-3xl font-light tracking-tight text-foreground text-balance mb-12">
                You may also like
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {similarProducts.map((prod, index) => (
                <ProductCard key={index} product={prod} />
                ))}
            </div>
            </div>
        )}
      </section>
    </main>
  );
}

export default ProductPage;