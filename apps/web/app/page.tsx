"use client";

import Link from "next/link";
import {
  ArrowRight,
  ShieldCheck,
  Zap,
  Cpu,
  Star,
  Laptop,
  Monitor,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { FeaturedCarousel } from "@/components/FeaturedCarousel";
import type { Product } from "@/types";
import { useProducts } from "@/hooks/useProducts";
import { motion } from "framer-motion";


const features = [
  {
    icon: Cpu,
    title: "Next-Gen Performance",
    description:
      "Equipped with the latest silicon from Apple, Intel, and AMD. Built for speed.",
    color: "text-pink-500",
    bg: "bg-pink-500/10",
  },
  {
    icon: Monitor,
    title: "Retina-Grade Displays",
    description:
      "Up to 4K OLED panels with 100% DCI-P3 coverage and 120Hz ProMotion tech.",
    color: "text-purple-500",
    bg: "bg-purple-500/10",
  },
  {
    icon: Zap,
    title: "All-Day Battery",
    description:
      "Efficiency optimized for the modern nomad. Get up to 22 hours on a single charge.",
    color: "text-indigo-500",
    bg: "bg-indigo-500/10",
  },
  {
    icon: ShieldCheck,
    title: "Secure by Design",
    description:
      "Biometric authentication and hardware-level encryption protect your life's work.",
    color: "text-fuchsia-500",
    bg: "bg-fuchsia-500/10",
  },
];


const stats = [
  { value: "10K+", label: "Products Shipped" },
  { value: "24h", label: "Express Delivery" },
  { value: "3yr", label: "Premium Warranty" },
  { value: "4.9★", label: "Customer Rating" },
];

export default function HomePage() {
  const { data: products, isLoading } = useProducts();
  const featuredProducts = products?.slice(0, 6) || [];

  const containerClass = "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8";
  const sectionPadding = "py-20 md:py-28";

  return (
    <main className="flex flex-col overflow-x-hidden">
      {}
      <section className="relative min-h-screen flex  bg-background overflow-hidden pt-10  md:pt-35">
        {}
        <div className="absolute inset-0 pointer-events-none -z-10">
          <div
            aria-hidden
            className="absolute -top-32 left-1/2 -translate-x-1/2 h-[600px] w-[900px] rounded-full bg-primary/10 blur-[120px] animate-pulse"
          />
          <div
            aria-hidden
            className="absolute bottom-0 right-0 h-[400px] w-[400px] rounded-full bg-secondary/10 blur-[100px]"
          />
        </div>

        {}
        <div className={containerClass}>
          <div className="relative z-10 text-center justify-center space-y-4 pt-10">

            <motion.h1 
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="text-5xl font-extrabold tracking-tight text-foreground sm:text-6xl lg:text-8xl"
            >
              Power Your{" "}
              <span className="bg-gradient-to-r from-primary via-purple-500 to-indigo-500 bg-clip-text text-transparent">
                Potential
              </span>
            </motion.h1>

            <motion.p 
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
              className="mt-6 mx-auto max-w-2xl text-lg leading-8 text-muted-foreground sm:text-xl"
            >
              Cornerstone delivers the world's most powerful products. Engineered 
              for developers, designers, and dreamers who demand excellence.
            </motion.p>

            <motion.div 
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut", delay: 0.4 }}
              className="mt-5 flex flex-wrap items-center justify-center gap-4 py-10 md:py-5"
            >
              <Button size="lg" asChild className="gap-2 px-10 h-14 rounded-full hover:border-primary text-lg shadow-xl shadow-primary/20 hover:shadow-primary/40 hover:scale-105 hover:bg-white hover:text-primary hover:border-2 hover:border-primary transition-all">
                <Link href="/shop">
                  Browse Shop
                  <ArrowRight className="h-5 w-5" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild className="px-10 h-14 rounded-full text-lg border-border/50 hover:border-primary shadow-primary/20 hover:shadow-primary/40 hover: shadow-xl hover:scale-105 hover:bg-white hover:text-primary hover:border-2 hover:border-primary hover:bg-muted/50">
                <Link href="/collections">View Collections</Link>
              </Button>
            </motion.div>
            <motion.div 
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut", delay: 0.6 }}
              className={`relative z-10 max-w-3xl mx-auto space-y-8 border-3 rounded-2xl py-5 md:py-10 ${containerClass}`}
            >
            <dl className="grid grid-cols-2 gap-y-12 gap-x-8 md:grid-cols-4">
              {stats.map(({ value, label }) => (
                <div key={label} className="text-center group">
                  <dt className="text-4xl font-extrabold text-foreground sm:text-5xl transition-transform group-hover:scale-110 duration-300">
                    {value}
                  </dt>
                  <dd className="mt-2 text-sm font-bold text-muted-foreground uppercase tracking-widest">{label}</dd>
                </div>
              ))}
            </dl>
          </motion.div>
          </div>
                    
        </div>
      </section>

      {}

      <section className={`relative z-10 bg-muted/30 ${sectionPadding}`}>
        <div className={containerClass}>
          <motion.div 
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="mb-16 flex flex-col md:flex-row md:items-end md:justify-between gap-6"
          >
            <div className="space-y-3">
              <Badge variant="outline" className="uppercase tracking-[0.2em] font-black text-[10px]">
                Top Selection
              </Badge>
              <h2 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
                Featured Hardware
              </h2>
              <p className="text-xl text-muted-foreground max-w-2xl">
                The pinnacle of performance and design, curated for the modern professional.
              </p>
            </div>
            <Button variant="ghost" asChild className="group w-fit gap-2 h-12 px-6 rounded-full hover:bg-primary/5">
              <Link href="/shop">
                View all models
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </Button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
          >
            {isLoading ? (
              <div className="flex h-64 w-full items-center justify-center">
                <div className="h-10 w-10 animate-spin rounded-full border-4 border-primary border-t-transparent" />
              </div>
            ) : (
              <FeaturedCarousel products={featuredProducts} />
            )}
          </motion.div>
        </div>
      </section>

      {}
      <section className={`relative bg-muted/20 ${sectionPadding}`}>
        <div className={containerClass}>
          <motion.div 
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="max-w-3xl mb-20"
          >
            <Badge variant="outline" className="mb-4 uppercase tracking-[0.3em] font-black text-[10px] border-primary/20 text-primary">
              Core Principles
            </Badge>
            <h2 className="text-4xl font-extrabold tracking-tight sm:text-6xl mb-6">
              Engineered for <br/>
              <span className="text-primary">Excellence</span>
            </h2>
            <p className="text-xl text-muted-foreground leading-relaxed">
              Every Cornerstone product is a masterpiece of engineering, 
              meticulously designed to push the boundaries of what's possible 
              in high-performance computing.
            </p>
          </motion.div>
           <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {features.map(({ icon: Icon, title, description, color, bg }, index) => (
              <motion.div 
                key={title}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, ease: "easeOut", delay: index * 0.1 }}
              >
                <Card
                  className="group h-full border-border/50 transition-all hover:border-primary/30 bg-card/50 backdrop-blur-sm p-2 rounded-3xl hover:scale-105"
                >
                  <CardHeader className="p-6">
                    <div
                      className={`mb-6 flex h-14 w-14 items-center justify-center rounded-2xl ${bg} transition-transform group-hover:rotate-12 duration-500`}
                    >
                      <Icon className={`h-7 w-7 ${color}`} />
                    </div>
                    <CardTitle className="text-2xl font-bold">{title}</CardTitle>
                  </CardHeader>
                  <CardContent className="p-6 pt-0">
                    <CardDescription className="text-base leading-relaxed text-muted-foreground">
                      {description}
                    </CardDescription>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {}
      <section className={`relative ${sectionPadding} overflow-hidden`}>
        <div className={containerClass}>
          <div className="relative overflow-hidden rounded-[3rem] bg-foreground px-6 py-24 text-center shadow-[0_48px_100px_-20px_rgba(0,0,0,0.4)] sm:px-16 md:py-32">
            {}
            <div
              aria-hidden
              className="absolute inset-0 bg-gradient-to-tr from-primary/20 via-purple-500/10 to-indigo-500/20 opacity-50"
            />
            <div
              aria-hidden
              className="absolute -top-24 -left-24 h-96 w-96 rounded-full bg-primary/20 blur-[100px]"
            />
            <div
              aria-hidden
              className="absolute -bottom-24 -right-24 h-96 w-96 rounded-full bg-purple-500/20 blur-[100px]"
            />

            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 40 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="relative z-10 max-w-3xl mx-auto space-y-10"
            >
              <h2 className="text-4xl font-black text-background sm:text-6xl tracking-tight leading-tight">
                Ready to Upgrade <br/> Your Digital Life?
              </h2>
              <p className="text-xl text-background/70 leading-relaxed max-w-xl mx-auto">
                Join the elite club of Cornerstone users and experience the true power 
                of the next generation of computing today.
              </p>
              <div className="flex flex-wrap items-center justify-center gap-6 pt-4">
                <Button
                  size="lg"
                  asChild
                  className="bg-background text-foreground hover:bg-background/90 gap-3 px-12 h-16 rounded-full text-xl font-black shadow-2xl transition-all hover:border-1 hover:text-background text-black hover:bg-background/10 hover:scale-105 active:scale-95 font-black backdrop-blur-sm"
                >
                  <Link href="/auth/register">
                    Join Cornerstone
                    <ArrowRight className="h-6 w-6" />
                  </Link>
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  asChild
                  className="text-black hover:bg-background/10 hover:text-background px-12 h-16 rounded-full text-xl hover:scale-105 font-black backdrop-blur-sm"
                >
                  <Link href="/shop">Explore Shop</Link>
                </Button>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </main>
  );
}
