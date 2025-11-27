import { defineQuery } from "next-sanity"
import { sanityFetch } from "../live";

export const getProductsByCategory = async (categoryId: string, excludeId: string) => { 

    // Mettre à jour la requête pour accepter '$excludeId'
    const PRODUCTS_BY_CATEGORY_QUERY = defineQuery(`
        *[
            _type == "product" 
            && $categoryId in categories[]->_id  // Filtre de catégorie
            && _id != $excludeId                  // 👈 CONDITION D'EXCLUSION
        ] | order(name asc)[0...3]
      `);
      
    try {
        const products = await sanityFetch({
            query: PRODUCTS_BY_CATEGORY_QUERY,
            params: {
                categoryId,
                excludeId, // 👈 Passer la variable au moteur GROQ
            },
        });

        return products.data || null;
    } catch (error) {
        console.error("Error fetching similar products:", error);
        return null;
    }
}
  