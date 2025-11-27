import CategoryGrid from "@/components/CategoryGrid";
import Hero from "@/components/Hero";
import NewsletterBanner from "@/components/NewsletterBanner";
import ProductGrid from "@/components/ProductGrid";
import TrustBar from "@/components/TrustBar";
import { getAllCategories } from "@/sanity/lib/products/getAllCategories";
import { getAllProducts } from "@/sanity/lib/products/getAllProducts";
import { getTopRatedProducts } from "@/sanity/lib/products/getTopRatedProducts";

export default async function Home() {
  const products = await getAllProducts();
  const categories = await getAllCategories();
  const topRatedProducts = await getTopRatedProducts();

  return (
    <div>
      <Hero />
      <TrustBar />
      <CategoryGrid categories={categories}/>
      <ProductGrid products={topRatedProducts}/>
      <NewsletterBanner />
    </div>
  );
}
