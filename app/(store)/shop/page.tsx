
import FilterSidebar from '@/components/Filter/FilterSidebar';
import MobileFilterButton from '@/components/Filter/MobileFilterButton';
import ProductCard from '@/components/Products/ProductCard';
import { getAllProducts } from '@/sanity/lib/products/getAllProducts';

async function ShopPage() {
    const products = await getAllProducts();

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">

        <div className="mb-8">
          <h1 className="text-4xl md:text-5xl font-light tracking-tight text-foreground text-balance mb-2">
            The Complete Collection
          </h1>
          <p className="text-muted-foreground font-light">{products.length} products</p>
        </div>

        <div className="flex justify-between items-center mb-6 lg:hidden">
            <p className="text-muted-foreground font-light">{products.length} products found</p>
            {/*<MobileFilterButton>
                <FilterSidebar /> 
            </MobileFilterButton>*/}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <aside className="hidden lg:block">
            {/*<FilterSidebar />*/}
          </aside>

          <div className="lg:col-span-4">

            <div className="flex items-center justify-between mb-6 pb-4 border-b border-border">


                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                  {products.map((product, index) => (
                    <ProductCard
                        key={index}
                        product={product}
                    />
                  ))}
                </div>
               
          </div>
          </div>
        </div>
      </section>
  )
}

export default ShopPage