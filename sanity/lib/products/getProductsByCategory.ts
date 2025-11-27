import { defineQuery } from "next-sanity"
import { sanityFetch } from "../live";

export const getProductsByCategory = async (categoryId: string, excludeId: string) => { 


    const PRODUCTS_BY_CATEGORY_QUERY = defineQuery(`
        *[
            _type == "product" 
            && $categoryId in categories[]->_id  
            && _id != $excludeId                  
        ] | order(name asc)[0...3]
      `);
      
    try {
        const products = await sanityFetch({
            query: PRODUCTS_BY_CATEGORY_QUERY,
            params: {
                categoryId,
                excludeId, 
            },
        });

        return products.data || null;
    } catch (error) {
        console.error("Error fetching similar products:", error);
        return null;
    }
}
  