import React from 'react'
import { Button } from './ui/button'

function Hero() {
  return (
    <section className="relative bg-background text-foreground py-20 md:py-32 lg:py-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16 items-center">
          {/* Content */}
          <div className="flex flex-col gap-6">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-light tracking-tight text-balance leading-tight">
              Essential Goods. Effortlessly Curated.
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground leading-relaxed font-light">
              Discover timeless pieces selected for quality, style, and enduring value. Each item thoughtfully chosen
              for modern living.
            </p>
            <button className="w-fit cursor-pointer bg-accent text-accent-foreground px-8 py-3 font-medium text-sm tracking-wide hover:shadow-md transition-shadow duration-300">
              Explore Collections
            </button>
          </div>

          {/* Hero Image */}
          <div className="relative h-64 md:h-96 bg-muted overflow-hidden">
            <img
              src="/hero-banner.png"
              alt="Curated product collection"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  )
}

export default Hero