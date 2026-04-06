"use client";

import { useState } from "react";
import { useProducts } from "@/hooks/useProducts";
import { ProductCard } from "@/components/ProductCard";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { Laptop, Search, SlidersHorizontal, PackageX } from "lucide-react";

export default function ShopPage() {
  const { data: products, isLoading, isError, error } = useProducts();
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");

  const categories = ["All", "Professional", "Gaming", "Ultraportable", "Workstation"];

  const filteredProducts = products?.filter((p) => {
    const matchesSearch = p.name.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = activeCategory === "All" || p.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    
  <div className="mx-auto px-4 py-12 sm:px-6 lg:px-8">
<<<<<<< HEAD
      {}
    
      <div className="sticky top-0 z-50 bg-background">
        {}
        <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between max-w-7xl mx-auto">
          <div className="mt-5 mb-5 flex flex-wrap items-center gap-2">
=======
      {/* Header */}
    <div className="sticky top-0 z-40 border-b border-border/50 bg-background">
      
        <div className="mb-12 max-w-7xl mx-auto space-y-4 pt-4"> {/* Added pt-4 to prevent clipping at the very top */}
          <div className="flex items-center gap-2">
            <Badge variant="outline" className="mt-16 px-3 py-1 uppercase tracking-wider text-[10px] font-bold">
              Catalog
            </Badge>
          </div>
          <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl">
            Premium <span className="text-primary">Laptops</span>
          </h1>
          <p className="max-w-2xl text-lg text-muted-foreground">
            Explore our hand-picked selection of high-performance machines 
            engineered for the modern professional.
          </p>
        </div>

        {/* Filters & Search */}
        <div className="mb-10 flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between max-w-7xl mx-auto">
          <div className="flex flex-wrap items-center gap-2">
>>>>>>> 84677c2b19d0b46691e6d0ded4ee12a146e6e3de
            {categories.map((cat) => (
              <Button
                key={cat}
                variant={activeCategory === cat ? "default" : "outline"}
                size="sm"
                onClick={() => setActiveCategory(cat)}
<<<<<<< HEAD
                className="rounded-full px-5 hover:text-white"
=======
                className="rounded-full px-5"
>>>>>>> 84677c2b19d0b46691e6d0ded4ee12a146e6e3de
              >
                {cat}
              </Button>
            ))}
          </div>
<<<<<<< HEAD
        <div className="mt-5 mb-5">
=======

>>>>>>> 84677c2b19d0b46691e6d0ded4ee12a146e6e3de
          <div className="relative w-full max-w-sm">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search laptops..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-10 rounded-full bg-muted/50 border-border/50 focus-visible:ring-primary"
            />
          </div>
        </div>
<<<<<<< HEAD
        </div>
      
=======
>>>>>>> 84677c2b19d0b46691e6d0ded4ee12a146e6e3de
      
    </div>




<<<<<<< HEAD
      {}
=======
      {/* Product Grid */}
>>>>>>> 84677c2b19d0b46691e6d0ded4ee12a146e6e3de
    <div className="pt-10 content-section max-w-7xl mx-auto">
      {isLoading ? (
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 ">
          {[...Array(8)].map((_, i) => (
            <div key={i} className="space-y-4">
              <Skeleton className="h-56 w-full rounded-2xl" />
              <div className="space-y-2">
                <Skeleton className="h-4 w-3/4" />
                <Skeleton className="h-4 w-1/2" />
              </div>
            </div>
          ))}
        </div>
      ) : isError ? (
        <div className="flex flex-col items-center justify-center py-24 text-center">
          <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-destructive/10">
            <PackageX className="h-10 w-10 text-destructive" />
          </div>
          <h2 className="text-2xl font-bold">Failed to load products</h2>
          <p className="mt-2 text-muted-foreground max-w-sm">
            {error instanceof Error ? error.message : "We couldn't reach the server. Please check your connection and try again."}
          </p>
          <Button variant="outline" className="mt-8" onClick={() => window.location.reload()}>
            Retry
          </Button>
        </div>
      ) : filteredProducts?.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-24 text-center border-2 border-dashed border-border/50 rounded-3xl">
          <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-muted">
            <Search className="h-10 w-10 text-muted-foreground" />
          </div>
          <h2 className="text-2xl font-bold text-foreground">No laptops found</h2>
          <p className="mt-2 text-muted-foreground">
            Try adjusting your search or category filters.
          </p>
          <Button variant="ghost" className="mt-8" onClick={() => { setSearch(""); setActiveCategory("All"); }}>
            Clear all filters
          </Button>
        </div>
      ) : (
        <div className="z-index-10 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 content-section">
          {filteredProducts?.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
   </div>
  );
}
