// rating.ts (Type Objet Imbriqué)

import { defineField, defineType } from 'sanity';

export const ratingType = defineType({
    name: 'rating', 
    title: 'Product Rating',
    type: 'object',
    fields: [
        defineField({
            name: 'rate',
            title: 'Average Rate',
            type: 'number',
            description: 'Average rating out of 5 (e.g., 4.5)',
            validation: (Rule) => Rule.min(0).max(5), 
        }),
        defineField({
            name: 'count',
            title: 'Review Count',
            type: 'number',
            description: 'Total number of reviews received',
            validation: (Rule) => Rule.min(0).integer(),
        }),
    ],
});