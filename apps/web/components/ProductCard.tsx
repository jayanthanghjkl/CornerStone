"use client";

import Image from "next/image";
import Link from "next/link";
import { Star, Laptop, ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useCart } from "@/hooks/useCart";
import { useCartStore } from "@/store/cart";
import type { Product } from "@/types";
import { cn } from "@/lib/utils";

interface ProductCardProps {
  product: Product;
  className?: string;
}

export function ProductCard({ product, className }: ProductCardProps) {
  const { addItem } = useCart();

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addItem.mutate({ productId: product.id, product });
  };

  return (
    <div className={cn("group block relative", className)}>
      <Card className="overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-2 border-border/50 bg-card/50 backdrop-blur-sm h-full flex flex-col">
        {}
        <Link href={`/shop/${product.id}`} className="flex-1 flex flex-col">
          {}
          <div className="relative h-56 w-full overflow-hidden bg-muted/50">
            {product.imageUrl ? (
              <Image
                src={product.imageUrl}
                alt={product.name}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-110"
              />
            ) : (
              <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-primary/10 to-secondary/10">
                <Laptop className="h-16 w-16 text-muted-foreground/30" />
              </div>
            )}
            
            <div className="absolute left-3 top-3 flex flex-col gap-2">
              <Badge variant="secondary" className="bg-background/80 backdrop-blur-md text-black text-xs font-semibold">
                {product.category}
              </Badge>
              {product.stock < 10 && product.stock > 0 && (
                <Badge variant="destructive" className="text-[10px] py-0 px-2 uppercase">
                  Low Stock
                </Badge>
              )}
            </div>
          </div>

          <CardHeader className="p-4 pb-0">
            <CardTitle className="line-clamp-1 text-lg group-hover:text-primary transition-colors">
              {product.name}
            </CardTitle>
            <CardDescription asChild className="flex items-center gap-1.5 text-xs font-medium">
              <div className="flex items-center gap-1.5">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={cn(
                        "h-3 w-3",
                        i < Math.floor(product.rating)
                          ? "fill-yellow-400 text-yellow-400"
                          : "fill-muted text-muted"
                      )}
                    />
                  ))}
                </div>
                <span className="text-muted-foreground">
                  ({product.reviewsCount})
                </span>
              </div>
            </CardDescription>
          </CardHeader>

          <CardContent className="p-4 pt-2 flex-1">
            <p className="line-clamp-2 text-xs text-muted-foreground leading-relaxed h-8">
              {product.description}
            </p>
            <div className="mt-3 flex flex-wrap gap-1.5">
              {Object.entries(product.specs).slice(0, 2).map(([key, val]) => (
                <Badge key={key} variant="outline" className="text-[10px] font-normal py-0">
                  {val as string}
                </Badge>
              ))}
            </div>
          </CardContent>
        </Link>

        {}
        <CardFooter className="p-4 pt-0 flex items-center justify-between border-t border-border/10 mt-2 bg-muted/20">
          <div className="flex flex-col">
            <span className="text-xs text-muted-foreground line-through opacity-50">
              ${(product.price * 1.2).toFixed(2)}
            </span>
            <span className="text-xl font-bold tracking-tight text-foreground">
              ${product.price.toFixed(2)}
            </span>
          </div>
          <Button 
            size="sm" 
            className="rounded-full px-4 h-9 shadow-lg shadow-primary/20 hover:shadow-primary/40 active:scale-95 transition-all relative z-20"
            onClick={handleAddToCart}
            disabled={addItem.isPending}
          >
            <ShoppingCart className="h-4 w-4 mr-2" />
            {addItem.isPending ? "Adding..." : "Add"}
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
