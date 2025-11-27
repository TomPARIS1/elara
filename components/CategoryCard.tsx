import { imageUrl } from '@/lib/imageUrl'
import { Category } from '@/sanity.types'
import Image from 'next/image'
import React from 'react'

function CategoryCard({ category }: {category: Category }) {
  return (
    <div
        className="group cursor-pointer overflow-hidden bg-card hover:shadow-md transition-shadow duration-300"
    >
        <div className="relative h-48 overflow-hidden bg-muted">
            {category.image && category.title && (
                <Image
                    src={imageUrl(category.image).url()}
                    alt={category.title}
                    fill
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
            )}
            
        </div>
        <div className="p-4">
        <h3 className="font-medium text-foreground text-sm uppercase tracking-wide">{category.title}</h3>
        </div>
    </div>
  )
}

export default CategoryCard