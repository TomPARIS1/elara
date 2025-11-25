

// Il est souvent nécessaire d'importer une fonction spécifique si vous utilisez des annotations ou des références
// import { defineArrayMember, defineType } from 'sanity'; 

import { defineType } from "sanity";

export const blockContentType = defineType({
  title: 'Block Content',
  name: 'blockContent',
  type: 'array',
  of: [
    {
      title: 'Block',
      type: 'block',
      // Styles de base pour les titres
      styles: [
        { title: 'Normal', value: 'normal' },
        { title: 'H1', value: 'h1' },
        { title: 'H2', value: 'h2' },
        { title: 'H3', value: 'h3' },
        { title: 'H4', value: 'h4' },
        { title: 'Quote', value: 'blockquote' },
      ],
      // Annotations (gras, italique, liens)
      lists: [
        { title: 'Bullet', value: 'bullet' },
        { title: 'Numbered', value: 'number' },
      ],
      marks: {
        decorators: [
          { title: 'Strong', value: 'strong' },
          { title: 'Emphasis', value: 'em' },
          { title: 'Code', value: 'code' },
        ],
        // Annotations comme les hyperliens
        annotations: [
          {
            title: 'URL',
            name: 'link',
            type: 'object',
            fields: [
              {
                title: 'URL',
                name: 'href',
                type: 'url',
              },
            ],
          },
        ],
      },
    },
    // Vous pouvez ajouter d'autres types d'objets dans le Portable Text (images, vidéos, etc.)
    {
        type: 'image',
        options: { hotspot: true },
        fields: [
            {
                name: 'caption',
                type: 'string',
                title: 'Légende',
            },
        ],
    },
    // Si vous avez un type 'video', vous le référencez ici
    // { type: 'video' }, 
  ],
});