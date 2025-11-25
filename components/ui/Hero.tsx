import React from 'react'
import { Button } from './button'

function Hero() {
  return (
    <section className="relative h-screen w-full overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img src="/modern-minimalist-designer-chair-in-concrete-room-.png" alt="Modern Chair" className="h-full w-full object-cover object-center" />
        {/* Subtle overlay to ensure text contrast if needed, though requested "clean" */}
        <div className="absolute inset-0 bg-black/5" />
      </div>

      {/* Content */}
      <div className="relative z-10 flex h-full flex-col items-center justify-center text-center px-4">
        <h1 className="max-w-4xl text-5xl md:text-7xl lg:text-8xl font-medium tracking-tight text-white mb-8 drop-shadow-sm">
          Crafted for Comfort
        </h1>

        <Button
          size="lg"
          className="bg-primary text-primary-foreground hover:bg-primary/90 px-8 py-6 rounded-full text-lg tracking-wide shadow-lg transition-transform hover:scale-105"
        >
          Shop Now
        </Button>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce text-white/80">
        <span className="text-xs uppercase tracking-widest">Scroll</span>
      </div>
    </section>
  )
}

export default Hero