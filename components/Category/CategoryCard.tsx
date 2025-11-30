import { imageUrl } from '@/lib/imageUrl'
import { Category } from '@/sanity.types'
import Image from 'next/image'
import Link from 'next/link';

function CategoryCard({ category }: {category: Category }) {
  return (
    <Link 
      href={`/shop?category=${category.slug?.current}`}
      className="group cursor-pointer overflow-hidden bg-card hover:shadow-md transition-shadow duration-300 block"
    >
      <div className="relative h-48 overflow-hidden bg-muted">
        {category.image && (
          <Image
          src={imageUrl(category.image).url()}
          alt={category.title ?? "Category Image"}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        )}
      </div>
      <div className="p-4">
        <h3 className="font-medium text-foreground text-sm uppercase tracking-wide">
          {category.title}
        </h3>
      </div>
    </Link>
  )
}

export default CategoryCard