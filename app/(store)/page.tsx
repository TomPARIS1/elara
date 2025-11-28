import CategoryGrid from "@/components/Category/CategoryGrid";
import Hero from "@/components/Landing/Hero";
import NewsletterBanner from "@/components/Landing/NewsletterBanner";
import ProductGrid from "@/components/Products/ProductGrid";
import TrustBar from "@/components/Landing/TrustBar";
import { getAllCategories } from "@/sanity/lib/products/getAllCategories";
import { getTopRatedProducts } from "@/sanity/lib/products/getTopRatedProducts";

export const dynamic = "force-static";
export const revalidate = 604800;

export default async function Home() {
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
