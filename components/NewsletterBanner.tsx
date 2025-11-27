"use client"

import type React from "react"

import { useState } from "react"

export default function NewsletterBanner() {
  const [email, setEmail] = useState("")
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitted(true)
    setEmail("")
    setTimeout(() => setSubmitted(false), 3000)
  }

  return (
    <section className="bg-primary text-primary-foreground py-16 md:py-24 border-t border-primary-foreground/10">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-3xl md:text-4xl font-light tracking-tight mb-4 text-balance">
          Unlock 10% Off Your First Order
        </h2>
        <p className="text-lg text-primary-foreground/80 mb-8 font-light">
          Subscribe to our newsletter for exclusive offers and updates.
        </p>

        <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="flex-1 px-4 py-3 bg-primary-foreground text-primary placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2 focus:ring-offset-primary text-sm"
          />
          <button
            type="submit"
            className="px-6 py-3 bg-accent text-accent-foreground font-medium text-sm hover:shadow-md transition-shadow duration-300 whitespace-nowrap"
          >
            {submitted ? "Subscribed!" : "Subscribe"}
          </button>
        </form>
      </div>
    </section>
  )
}
