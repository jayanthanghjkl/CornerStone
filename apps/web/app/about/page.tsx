import { Badge } from "@/components/ui/badge";
import { Laptop, ShieldCheck, Zap, Globe, Users, Trophy, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";

const stats = [
  { label: "Years of Excellence", value: "12+" },
  { label: "Global Customers", value: "500K+" },
  { label: "Products Delivered", value: "1M+" },
  { label: "Service Centers", value: "150+" },
];

const values = [
  {
    icon: Zap,
    title: "Innovation First",
    description: "We constantly push the boundaries of technology to bring you the future today.",
    color: "text-pink-500",
    bg: "bg-pink-500/10",
  },
  {
    icon: ShieldCheck,
    title: "Uncompromising Quality",
    description: "Every product undergoes rigorous testing to ensure it meets our elite standards.",
    color: "text-purple-500",
    bg: "bg-purple-500/10",
  },
  {
    icon: Users,
    title: "Customer Centric",
    description: "Your success is our mission. We provide 24/7 premium support for all our users.",
    color: "text-indigo-500",
    bg: "bg-indigo-500/10",
  },
  {
    icon: Globe,
    title: "Global Sustainability",
    description: "We are committed to eco-friendly manufacturing and reducing our carbon footprint.",
    color: "text-fuchsia-500",
    bg: "bg-fuchsia-500/10",
  },
];

export default function AboutPage() {
  const containerClass = "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8";
  const sectionPadding = "py-20 md:py-28";

  return (
    <main className="flex flex-col overflow-x-hidden">
<<<<<<< HEAD
      {}
=======
      {/* ── HERO SECTION ───────────────────────────────────── */}
>>>>>>> 84677c2b19d0b46691e6d0ded4ee12a146e6e3de
      <section className="relative bg-background overflow-hidden py-10 md:py-20 mt-20">
        <div className="absolute inset-0 pointer-events-none -z-10">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 h-[500px] w-full bg-primary/5 blur-[120px]" />
        </div>
        
        <div className={containerClass}>
          <div className="text-center space-y-6 max-w-4xl mx-auto">
            <Badge variant="outline" className="px-4 py-1 uppercase tracking-[0.2em] text-[10px] font-black border-primary/20 text-primary">
              Our Story
            </Badge>
            <h1 className="text-5xl font-extrabold tracking-tight sm:text-7xl">
              Powering the World's <br />
              <span className="bg-gradient-to-r from-primary to-purple-500 bg-clip-text text-transparent">
                Most Ambitious Minds
              </span>
            </h1>
            <p className="text-xl text-muted-foreground leading-relaxed max-w-2xl mx-auto">
              Founded in 2014, Cornerstone began with a simple mission: to build the tools 
              that creators, developers, and dreamers need to change the world.
            </p>
            <div className={`relative z-10 max-w-3xl mx-auto space-y-8 border-3 rounded-2xl ${containerClass}`}>
              <div className="grid grid-cols-2 mt-10 mb-10 gap-y-12 item-center justify-center gap-x-8 md:grid-cols-4">
                {stats.map((stat) => (
                  <div key={stat.label} className="text-center group">
                    <dt className="text-4xl font-extrabold text-foreground sm:text-5xl transition-transform group-hover:scale-110 duration-300">
                      {stat.value}
                    </dt>
                    <dd className="mt-2 text-sm font-bold text-muted-foreground uppercase tracking-widest">{stat.label}</dd>
                  </div>))}
              </div>
            </div>
          </div>
        </div>
      </section>


<<<<<<< HEAD
      {}
=======
      {/* ── VALUES SECTION ────────────────────────────────── */}
>>>>>>> 84677c2b19d0b46691e6d0ded4ee12a146e6e3de
      <section className={`relative ${sectionPadding}`}>
        <div className={containerClass}>
          <div className="text-center mb-20 space-y-4">
            <h2 className="text-4xl font-bold tracking-tight sm:text-5xl">What Drives Us</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              The core principles that define everything we do and every product we build.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value) => (
<<<<<<< HEAD
              <Card key={value.title} className="group border-border/50 hover:border-primary/20 transition-all bg-card/50 backdrop-blur-sm p-2 rounded-[2rem]hover:transition-all hover:duration-300 hover:ease-in-out hover:transform hover:-translate-y-2 hover:shadow-2xl hover:shadow-primary/20">
=======
              <Card key={value.title} className="group border-border/50 hover:border-primary/20 transition-all bg-card/50 backdrop-blur-sm p-2 rounded-[2rem]">
>>>>>>> 84677c2b19d0b46691e6d0ded4ee12a146e6e3de
                <CardHeader className="p-6">
                  <div className={`h-14 w-14 rounded-2xl ${value.bg} flex items-center justify-center ${value.color} mb-6 transition-transform group-hover:rotate-12`}>
                    <value.icon className="h-7 w-7" />
                  </div>
                  <CardTitle className="text-2xl font-bold">{value.title}</CardTitle>
                </CardHeader>
                <CardContent className="p-6 pt-0">
                  <CardDescription className="text-base leading-relaxed text-muted-foreground">
                    {value.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

<<<<<<< HEAD
      {}
      <section className={`relative ${sectionPadding} overflow-hidden`}>
        <div className={containerClass}>
          <div className="relative overflow-hidden rounded-[3rem] bg-primary px-8 py-20 text-center text-primary-foreground shadow-2xl hover:transition-all hover:duration-300 hover:ease-in-out hover:transform hover:-translate-y-2 hover:shadow-2xl hover:shadow-black/20 hover:shadow-2xl hover:shadow-black/40">
=======
      {/* ── VISION SECTION ────────────────────────────────── */}
      <section className={`relative ${sectionPadding} overflow-hidden`}>
        <div className={containerClass}>
          <div className="relative overflow-hidden rounded-[3rem] bg-primary px-8 py-20 text-center text-primary-foreground shadow-2xl">
>>>>>>> 84677c2b19d0b46691e6d0ded4ee12a146e6e3de
            <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent pointer-events-none -z-10" />
            
            <div className="relative z-10 max-w-3xl mx-auto space-y-8">
              <Trophy className="h-16 w-16 mx-auto mb-4 opacity-80" />
              <h2 className="text-4xl font-black sm:text-6xl tracking-tight">The Future is Performance</h2>
              <p className="text-xl opacity-90 leading-relaxed max-w-2xl mx-auto">
                As we move into the next decade, Cornerstone remains committed to excellence. 
                We are investing heavily in AI-optimized hardware and revolutionary 
                display technologies to ensure your potential remains limitless.
              </p>
              <div className="pt-6">
<<<<<<< HEAD
                <Button size="lg" variant="secondary" asChild className="rounded-full px-10 h-14 text-lg hover:bg-white hover:scale-105 hover:text-primary font-bold shadow-xl">
=======
                <Button size="lg" variant="secondary" asChild className="rounded-full px-10 h-14 text-lg hover:bg-primary hover:text- font-bold shadow-xl">
>>>>>>> 84677c2b19d0b46691e6d0ded4ee12a146e6e3de
                  <Link href="/shop" className="gap-2">
                    Explore Our Products
                    <ArrowRight className="h-5 w-5" />
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
