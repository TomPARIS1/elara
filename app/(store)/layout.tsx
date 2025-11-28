import Footer from "@/components/Landing/Footer";
import Header from "@/components/Landing/Header";
import { SanityLive } from "@/sanity/lib/live";
import { ClerkProvider } from "@clerk/nextjs";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Shop", 
  description: "Welcome to Elara: Explore a curated collection of products in this high-performance e-commerce demo. Built using Next.js, Sanity, and the latest web technologies.",
  
  keywords: ["featured products", "best sellers", "top rated", "nextjs store demo"], 
};

export default function StoreLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
   <ClerkProvider>
      <Header />
      <main>
        {children}
      </main>

      <SanityLive />
      <Footer/>
    </ClerkProvider> 
  );
}
