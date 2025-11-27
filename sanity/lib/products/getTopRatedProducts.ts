import { defineQuery } from "next-sanity"
import { sanityFetch } from "../live";

export const getTopRatedProducts = async () => {
    const TOP_RATED_PRODUCTS_QUERY = defineQuery(`
        *[
          _type == "product"
        ] | order(rating.rate desc) [0...8]
      `);

    try {
        const products = await sanityFetch({
            query: TOP_RATED_PRODUCTS_QUERY,
        });

        return products.data || [];
    } catch (error) {
        console.error("Error fetching top rated products:", error);
        return [];
    }
};