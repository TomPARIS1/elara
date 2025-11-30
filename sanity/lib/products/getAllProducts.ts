import { defineQuery } from "next-sanity"
import { sanityFetch } from "../live";

export const getAllProducts = async (searchParams?: {
    category?: string;
    minPrice?: string;
    maxPrice?: string;
    minRating?: string;
}) => {
    // Construction dynamique des filtres
    let filters = '_type == "product"';
    
    if (searchParams?.category) {
        // Filtrer par catégorie dans le tableau de références
        filters += ` && "${searchParams.category}" in categories[]->slug.current`;
    }
    
    if (searchParams?.minPrice) {
        filters += ` && price >= ${parseFloat(searchParams.minPrice)}`;
    }
    
    if (searchParams?.maxPrice) {
        filters += ` && price <= ${parseFloat(searchParams.maxPrice)}`;
    }
    
    if (searchParams?.minRating) {
        // Adapter selon la structure exacte de votre rating
        // Si c'est rating.score ou rating.rate, ajustez ici
        filters += ` && rating.rate >= ${parseFloat(searchParams.minRating)}`;
    }

    const ALL_PRODUCTS_QUERY = defineQuery(`
        *[${filters}] | order(name asc)
    `);

    try {
        const products = await sanityFetch({
            query: ALL_PRODUCTS_QUERY,
        });

        return products.data || [];
    } catch (error) {
        console.error("Error fetching all products:", error);
        return [];
    }
};