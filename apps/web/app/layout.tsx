import type { Metadata } from "next";
import "./globals.css";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { ReactQueryProvider } from "@/lib/query-provider";
import { Geist } from "next/font/google";
import { cn } from "@/lib/utils";

const geist = Geist({subsets:['latin'],variable:'--font-sans'});

export const metadata: Metadata = {
  title: {
    default: "Cornerstone — Premium E-Commerce",
    template: "%s | Cornerstone",
  },
  description:
    "Power your potential with Cornerstone. High-performance products for creators, developers, and professionals. Fast, scalable, and premium by default.",
  keywords: ["e-commerce", "performance", "store", "cornerstone"],
  authors: [{ name: "Cornerstone Team" }],
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://cornerstone.store",
    siteName: "Cornerstone",
    title: "Cornerstone — Premium E-Commerce",
    description:
      "High-performance products for creators, developers, and professionals.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Cornerstone — Premium E-Commerce",
    description: "High-performance products for creators, developers, and professionals.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning className={cn("font-sans", geist.variable)}>
      <body className="min-h-screen flex flex-col antialiased" suppressHydrationWarning>
        <ReactQueryProvider>
          <Navbar />
          <main className="flex-1">{children}</main>
          <Footer />
        </ReactQueryProvider>
      </body>
    </html>
  );
}
