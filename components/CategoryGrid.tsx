import { Category } from '@/sanity.types'
import CategoryCard from './CategoryCard'

function CategoryGrid({ categories }: {categories: Category[]}) {
  return (
    <section id="categories" className="py-16 md:py-24 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-12">
          <h2 className="text-3xl md:text-4xl font-light tracking-tight text-foreground text-balance">
            Shop By Categories
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((category, index) => (
            <CategoryCard key={index} category={category}/>
          ))}
        </div>
      </div>
    </section>
  )
}

export default CategoryGrid