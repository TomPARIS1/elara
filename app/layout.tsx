import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '600', '700'], 
  variable: '--font-poppins',
});

export const metadata: Metadata = {
  title: {
    default: "Elara | Portfolio & E-commerce Demo",
    template: "%s | Elara",
  },
  description: "Full-stack e-commerce demo developed by Tom PARIS. A portfolio project using Next.js, TypeScript, Tailwind CSS, and Sanity.",
  
  keywords: ["Next.js", "Portfolio", "E-commerce", "Developer", "Sanity", "Clerk", "Stripe", "Demo"],
  authors: [{ name: "Tom PARIS", url: "https://tomparis.vercel.app" }],
  creator: "Tom PARIS",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
      <html lang="en">
        <body
          className={`${poppins.className} antialiased`}
        >
          {children}
        </body>
      </html>
  );
}
