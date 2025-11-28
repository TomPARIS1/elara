import ProductCard from "@/components/Products/ProductCard";
import { searchProductsByName } from "@/sanity/lib/products/searchProductsByName";

async function searchPage({
        searchParams,
    } : {
        searchParams: {
            query: string;
        };
    }) {

    const { query } = await searchParams;
    const products = await searchProductsByName(query);

    return (
        <main className="min-h-screen bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="mb-8">
            <h1 className="text-3xl font-light tracking-tight text-foreground mb-2">Search Results</h1>
            <p className="text-muted-foreground font-light">
              {query ? `Results for "${query}"` : "Enter a search term to find products"}
            </p>
            {products && (
                <p className="text-sm text-muted-foreground font-light mt-2">
                    {products.length} {products.length <= 1 ? "product" : "products"} found
                </p>
            )}
            
          </div>

          {products && products.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {products.map((product, index) => (
                <ProductCard key={index} product={product} />
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-16">
              <p className="text-muted-foreground font-light mb-4">No products found for "{query}"</p>
              <p className="text-sm text-muted-foreground font-light">Try searching for something else</p>
            </div>
          )}
        </div>
      </main>
    )
}

export default searchPage