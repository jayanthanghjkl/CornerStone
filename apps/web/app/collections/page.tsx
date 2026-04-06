import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowRight, Laptop, Monitor, Zap, Cpu, Sparkles } from "lucide-react";
import Link from "next/link";

const collections = [
  {
    title: "The Professional Series",
    description: "Sleek, powerful, and reliable. Engineered for those who build the future with uncompromising speed.",
    icon: Cpu,
    category: "Professional",
    gradient: "from-blue-500/20 to-indigo-500/20",
    accent: "text-blue-500",
  },
  {
    title: "Zenith Gaming",
    description: "Unleash raw power with high-refresh displays, liquid-cooled hardware, and cutting-edge graphics.",
    icon: Zap,
    category: "Gaming",
    gradient: "from-purple-500/20 to-pink-500/20",
    accent: "text-purple-500",
  },
  {
    title: "Aero Ultraportable",
    description: "The thinnest high-performance machines ever built. Elite power that travels anywhere you go.",
    icon: Sparkles,
    category: "Ultraportable",
    gradient: "from-rose-500/20 to-orange-500/20",
    accent: "text-rose-500",
  },
  {
    title: "Titan Workstations",
    description: "Mobile computing without compromise. Custom-built for AI, 3D rendering, and heavy data science.",
    icon: Monitor,
    category: "Workstation",
    gradient: "from-emerald-500/20 to-teal-500/20",
    accent: "text-emerald-500",
  },
];

export default function CollectionsPage() {
  const containerClass = "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8";
  const sectionPadding = "py-20 md:py-28";

  return (
    <main className="flex flex-col overflow-x-hidden">
<<<<<<< HEAD
      {}
=======
      {/* ── HERO SECTION ───────────────────────────────────── */}
>>>>>>> 84677c2b19d0b46691e6d0ded4ee12a146e6e3de
      <section className="border-b-0 relative bg-background overflow-hidden py-30 md:py-40">
        <div className="absolute inset-0 pointer-events-none -z-10">
          <div className="absolute top-0 right-0 h-[500px] w-full bg-secondary/5 blur-[120px]" />
        </div>

        <div className={` ${containerClass}`}>
          <div className=" max-w-5xl space-y-6">
            <Badge variant="outline" className="px-4 py-1 uppercase tracking-[0.2em] text-[10px] font-black border-primary/20 text-primary">
              Curated Series
            </Badge>
            <div className="flex flex-row items-center pl-10 space-x-20">
              <h1 className="text-5xl font-extrabold justify-content tracking-tight sm:text-7xl">
                Explore the <br/>
                <span className="bg-gradient-to-r from-primary via-purple-500 to-indigo-500 bg-clip-text text-transparent">
                  Collections
                </span>
              </h1>
              <p className="text-xl  text-muted-foreground">
                Hand-picked hardware series meticulously designed to meet the 
                specific performance needs of every discipline.
              </p>
            </div>
          </div>
        </div>
      </section>

<<<<<<< HEAD
      {}
=======
      {/* ── COLLECTIONS GRID ──────────────────────────────── */}
>>>>>>> 84677c2b19d0b46691e6d0ded4ee12a146e6e3de
      <section className={`relative min-h-screen flex items-center justify-center bg-background overflow-hidden relative  bg-muted/10 ${sectionPadding}`}>
        <div className={containerClass}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-16">
            {collections.map((col) => (
              <Link 
                key={col.title} 
                href={`/shop?category=${col.category}`}
                className="group block relative overflow-hidden rounded-[2.5rem] border border-border/50 bg-card hover:border-primary/30 transition-all shadow-xl hover:shadow-2xl hover:-translate-y-1"
              >
                <div className="flex flex-col h-full">
<<<<<<< HEAD
                  {}
=======
                  {/* Decorative Header */}
>>>>>>> 84677c2b19d0b46691e6d0ded4ee12a146e6e3de
                  <div className={`relative h-72 w-full bg-gradient-to-br ${col.gradient} overflow-hidden flex items-center justify-center`}>
                    <div className="absolute inset-0 pointer-events-none">
                       <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-48 w-48 bg-white/5 rounded-full blur-3xl" />
                    </div>
                    <col.icon className={`h-28 w-28 ${col.accent} opacity-40 group-hover:scale-110 group-hover:rotate-3 transition-transform duration-700`} />
                    
                    <div className="absolute bottom-8 left-8">
                      <Badge className="bg-background/90 backdrop-blur-md text-foreground border-none font-bold px-4 py-1">
                        {col.category}
                      </Badge>
                    </div>
                  </div>

<<<<<<< HEAD
                  {}
=======
                  {/* Content */}
>>>>>>> 84677c2b19d0b46691e6d0ded4ee12a146e6e3de
                  <div className="p-10 flex-1 flex flex-col justify-between bg-card">
                    <div className="space-y-4">
                      <h2 className="text-3xl font-bold tracking-tight group-hover:text-primary transition-colors">
                        {col.title}
                      </h2>
                      <p className="text-muted-foreground leading-relaxed text-lg">
                        {col.description}
                      </p>
                    </div>
                    
                    <div className="mt-10 flex items-center gap-2 text-sm font-black uppercase tracking-widest text-primary">
                      Explore Models
                      <ArrowRight className="h-4 w-4 group-hover:translate-x-2 transition-transform" />
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

<<<<<<< HEAD
      {}
      <section className={`relative min-h-screen flex items-center justify-center bg-background overflow-hidden relative pt-20 md:pt-40 pb-100 md:pb-40 ${sectionPadding}`}>
        <div className={containerClass}>
          <div className="relative overflow-hidden rounded-[3rem] bg-muted/50 border border-border/50 p-12 md:p-24 text-center shadow-inner hover:transition-all hover:duration-300 hover:ease-in-out hover:transform hover:-translate-y-2 hover:shadow-2xl hover:shadow-black/20">
=======
      {/* ── CUSTOM BUILD CTA ──────────────────────────────── */}
      <section className={`relative min-h-screen flex items-center justify-center bg-background overflow-hidden relative pt-20 md:pt-40 pb-100 md:pb-40 ${sectionPadding}`}>
        <div className={containerClass}>
          <div className="relative overflow-hidden rounded-[3rem] bg-muted/50 border border-border/50 p-12 md:p-24 text-center shadow-inner">
>>>>>>> 84677c2b19d0b46691e6d0ded4ee12a146e6e3de
            <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_center,rgba(var(--primary),0.03)_0%,transparent_70%)] pointer-events-none" />
            
            <div className="relative z-10 max-w-2xl mx-auto space-y-8">
              <h2 className="text-4xl font-extrabold tracking-tight sm:text-5xl">Need a Custom Build?</h2>
              <p className="text-xl text-muted-foreground leading-relaxed">
                Our elite hardware engineers can help you configure a one-of-a-kind 
                machine tailored precisely to your technical requirements.
              </p>
              <div className="pt-4">
<<<<<<< HEAD
                <Button size="lg" className="rounded-full px-12 h-16 text-lg font-bold gap-3 shadow-xl shadow-primary/10 hover:scale-105 hover:bg-white/10 hover:shadow-xl hover:border-2 hover:border-primary hover:shadow-primary/40 hover:text-primary">
=======
                <Button size="lg" className="rounded-full px-12 h-16 text-lg font-bold gap-3 shadow-xl shadow-primary/10">
>>>>>>> 84677c2b19d0b46691e6d0ded4ee12a146e6e3de
                  Contact Our Engineers
                  <ArrowRight className="h-5 w-5" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
