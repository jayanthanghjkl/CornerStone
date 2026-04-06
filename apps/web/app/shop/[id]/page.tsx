"use client";

import { use } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useProduct } from "@/hooks/useProducts";
import { useCart } from "@/hooks/useCart";
import { useCartStore } from "@/store/cart";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { 
  ArrowLeft, 
  ShoppingCart, 
  Star, 
  ShieldCheck, 
  Truck, 
  RotateCcw,
  Cpu,
  MemoryStick,
  HardDrive,
  Monitor
} from "lucide-react";
import { cn } from "@/lib/utils";

export default function ProductDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const { data: product, isLoading, isError } = useProduct(id);
  const { addItem } = useCart();
  const router = useRouter();

  if (isLoading) return <ProductDetailSkeleton />;
  if (isError || !product) return <ProductError />;

  const specs = product.specs as Record<string, string>;

  const handleAddToCart = () => {
    addItem.mutate({ productId: product.id, product });
  };

  const handleBuyNow = () => {
    addItem.mutate({ productId: product.id, product });
    router.push("/cart");
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <Link 
        href="/shop" 
        className="mb-8 inline-flex items-center text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
      >
        <ArrowLeft className="mr-2 h-5 w-5" />
        Back to Shop
      </Link>

      <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:items-start">
<<<<<<< HEAD
        {}
=======
        {/* Product Image */}
>>>>>>> 84677c2b19d0b46691e6d0ded4ee12a146e6e3de
        <div className="relative aspect-square overflow-hidden rounded-3xl bg-muted/50 border border-border/50">
          {product.imageUrl ? (
            <Image
              src={product.imageUrl}
              alt={product.name}
              fill
              className="object-cover"
              priority
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-primary/10 to-secondary/10">
              <Cpu className="h-24 w-24 text-muted-foreground/30" />
            </div>
          )}
        </div>

<<<<<<< HEAD
        {}
=======
        {/* Product Info */}
>>>>>>> 84677c2b19d0b46691e6d0ded4ee12a146e6e3de
        <div className="flex flex-col">
          <div className="mb-6 flex items-center gap-2">
            <Badge variant="secondary" className="px-3 py-1 font-semibold">
              {product.category}
            </Badge>
            {product.stock > 0 ? (
              <Badge variant="outline" className="border-green-500/50 text-green-500">
                In Stock ({product.stock})
              </Badge>
            ) : (
              <Badge variant="destructive">Out of Stock</Badge>
            )}
          </div>

          <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl">
            {product.name}
          </h1>

          <div className="mt-4 flex items-center gap-4">
            <div className="flex items-center">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={cn(
                    "h-5 w-5",
                    i < Math.floor(product.rating)
                      ? "fill-yellow-400 text-yellow-400"
                      : "fill-muted text-muted"
                  )}
                />
              ))}
            </div>
            <span className="text-sm font-medium text-muted-foreground">
              {product.rating} / 5.0 ({product.reviewsCount} reviews)
            </span>
          </div>

          <div className="mt-8">
            <span className="text-4xl font-bold text-foreground">
              ${product.price.toFixed(2)}
            </span>
            <p className="mt-4 text-lg text-muted-foreground leading-relaxed">
              {product.description}
            </p>
          </div>

<<<<<<< HEAD
          {}
=======
          {/* Quick Specs */}
>>>>>>> 84677c2b19d0b46691e6d0ded4ee12a146e6e3de
          <div className="mt-8 grid grid-cols-2 gap-4">
            <div className="rounded-2xl border border-border/50 bg-muted/20 p-4">
              <div className="flex items-center gap-2 text-primary">
                <Cpu className="h-4 w-4" />
                <span className="text-xs font-bold uppercase tracking-wider">Processor</span>
              </div>
              <p className="mt-1 text-sm font-semibold">{specs.cpu || "N/A"}</p>
            </div>
            <div className="rounded-2xl border border-border/50 bg-muted/20 p-4">
              <div className="flex items-center gap-2 text-primary">
                <MemoryStick className="h-4 w-4" />
                <span className="text-xs font-bold uppercase tracking-wider">Memory</span>
              </div>
              <p className="mt-1 text-sm font-semibold">{specs.ram || "N/A"}</p>
            </div>
            <div className="rounded-2xl border border-border/50 bg-muted/20 p-4">
              <div className="flex items-center gap-2 text-primary">
                <HardDrive className="h-4 w-4" />
                <span className="text-xs font-bold uppercase tracking-wider">Storage</span>
              </div>
              <p className="mt-1 text-sm font-semibold">{specs.storage || "N/A"}</p>
            </div>
            <div className="rounded-2xl border border-border/50 bg-muted/20 p-4">
              <div className="flex items-center gap-2 text-primary">
                <Monitor className="h-4 w-4" />
                <span className="text-xs font-bold uppercase tracking-wider">Display</span>
              </div>
              <p className="mt-1 text-sm font-semibold">{specs.screen || "N/A"}</p>
            </div>
          </div>

<<<<<<< HEAD
          {}
=======
          {/* Action Buttons */}
>>>>>>> 84677c2b19d0b46691e6d0ded4ee12a146e6e3de
          <div className="mt-10 flex flex-col gap-4 sm:flex-row">
            <Button 
              size="lg" 
              className="flex-1 h-14 text-lg font-bold hover: border-1 hover:bg-white hover:text-black"
              onClick={handleAddToCart}
            >
              <ShoppingCart className="mr-2 h-5 w-5" />
              {addItem.isPending ? "Adding..." : "Add to Cart"}
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              className="flex-1 h-14 text-lg font-bold hover:bg-primary hover:text-primary-foreground"
              onClick={handleBuyNow}
            >
              Buy Now
            </Button>
          </div>

<<<<<<< HEAD
          {}
=======
          {/* Guarantees */}
>>>>>>> 84677c2b19d0b46691e6d0ded4ee12a146e6e3de
          <div className="mt-12 grid grid-cols-1 gap-6 border-t border-border/50 pt-8 sm:grid-cols-3">
            <div className="flex flex-col items-center text-center">
              <Truck className="h-6 w-6 text-primary mb-2" />
              <span className="text-sm font-bold">Free Express</span>
              <span className="text-xs text-muted-foreground">Shipping globally</span>
            </div>
            <div className="flex flex-col items-center text-center">
              <ShieldCheck className="h-6 w-6 text-primary mb-2" />
              <span className="text-sm font-bold">3yr Warranty</span>
              <span className="text-xs text-muted-foreground">Premium protection</span>
            </div>
            <div className="flex flex-col items-center text-center">
              <RotateCcw className="h-6 w-6 text-primary mb-2" />
              <span className="text-sm font-bold">30-Day Returns</span>
              <span className="text-xs text-muted-foreground">No questions asked</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function ProductDetailSkeleton() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <Skeleton className="mb-8 h-4 w-32" />
      <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
        <Skeleton className="aspect-square rounded-3xl" />
        <div className="space-y-6">
          <Skeleton className="h-10 w-3/4" />
          <Skeleton className="h-6 w-1/4" />
          <Skeleton className="h-24 w-full" />
          <div className="grid grid-cols-2 gap-4">
            <Skeleton className="h-20 rounded-2xl" />
            <Skeleton className="h-20 rounded-2xl" />
          </div>
          <div className="flex gap-4">
            <Skeleton className="h-14 flex-1 rounded-md" />
            <Skeleton className="h-14 flex-1 rounded-md" />
          </div>
        </div>
      </div>
    </div>
  );
}

function ProductError() {
  return (
    <div className="flex flex-col items-center justify-center py-32 text-center">
      <h2 className="text-3xl font-bold">Product not found</h2>
      <p className="mt-4 text-muted-foreground">The laptop you're looking for doesn't exist or has been removed.</p>
      <Button asChild className="mt-8">
        <Link href="/shop">Back to Shop</Link>
      </Button>
    </div>
  );
}
