import { Facebook, Instagram, Twitter, Mail } from "lucide-react"
import Link from "next/link"

export default function Footer() {
  return (
    <footer className="bg-primary text-primary-foreground py-12 md:py-16 border-t border-primary-foreground/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Brand */}
          <div className="col-span-1">
            <h3 className="text-lg font-light tracking-tight mb-4">Elara</h3>
            <p className="text-primary-foreground/70 text-sm font-light leading-relaxed">
              Essential goods, effortlessly curated for modern living.
            </p>
          </div>

          {/* Quick Links */}
          <div className="col-span-1">
            <h4 className="font-medium text-sm uppercase tracking-wide mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  href="#"
                  className="text-primary-foreground/70 hover:text-accent transition-colors duration-200 font-light"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-primary-foreground/70 hover:text-accent transition-colors duration-200 font-light"
                >
                  Returns
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-primary-foreground/70 hover:text-accent transition-colors duration-200 font-light"
                >
                  Shipping Info
                </Link>
              </li>
            </ul>
          </div>

          {/* Customer Service */}
          <div className="col-span-1">
            <h4 className="font-medium text-sm uppercase tracking-wide mb-4">Customer Service</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  href="#"
                  className="text-primary-foreground/70 hover:text-accent transition-colors duration-200 font-light"
                >
                  Contact Us
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-primary-foreground/70 hover:text-accent transition-colors duration-200 font-light"
                >
                  FAQ
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-primary-foreground/70 hover:text-accent transition-colors duration-200 font-light"
                >
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>

          {/* Social Media */}
          <div className="col-span-1">
            <h4 className="font-medium text-sm uppercase tracking-wide mb-4">Follow Us</h4>
            <div className="flex gap-4">
              <button className="p-2 text-primary-foreground/70 hover:text-accent transition-colors duration-200">
                <Facebook className="w-4 h-4" />
              </button>
              <button className="p-2 text-primary-foreground/70 hover:text-accent transition-colors duration-200">
                <Instagram className="w-4 h-4" />
              </button>
              <button className="p-2 text-primary-foreground/70 hover:text-accent transition-colors duration-200">
                <Twitter className="w-4 h-4" />
              </button>
              <button className="p-2 text-primary-foreground/70 hover:text-accent transition-colors duration-200">
                <Mail className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-primary-foreground/10 pt-8">
          <p className="text-center text-xs text-primary-foreground/60 font-light">
            &copy; 2025 Elara. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}
