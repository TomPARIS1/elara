import { Truck, Lock, Shield } from "lucide-react"

export default function TrustBar() {
  const benefits = [
    {
      icon: Truck,
      title: "Free Shipping",
      description: "On all orders over $50",
    },
    {
      icon: Lock,
      title: "Secure Payment",
      description: "100% encrypted transactions",
    },
    {
      icon: Shield,
      title: "30-Day Guarantee",
      description: "Easy returns, no questions",
    },
  ]

  return (
    <section className="bg-secondary py-12 md:py-16 border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {benefits.map((benefit, index) => {
            const Icon = benefit.icon
            return (
              <div key={index} className="flex flex-col items-center text-center gap-3">
                <Icon className="w-6 h-6 text-accent" />
                <h3 className="font-medium text-foreground text-sm uppercase tracking-wide">{benefit.title}</h3>
                <p className="text-sm text-muted-foreground font-light">{benefit.description}</p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
