"use client";

import Image from "next/image";
import Link from "next/link";
import { useCart } from "@/hooks/useCart";
import { Button } from "@/components/ui/button";
import { 
  Minus, 
  Plus, 
  Trash2, 
  ArrowRight, 
  ShoppingBag,
  ShieldCheck,
  Truck,
  Loader2
} from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";

export default function CartPage() {
  const { items, removeItem, updateQuantity, totals, totalItems, isLoading, user } = useCart();

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center py-32 text-center">
        <Loader2 className="h-12 w-12 animate-spin text-primary" />
        <p className="mt-4 text-muted-foreground">Loading your cart...</p>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-32 text-center">
        <div className="mb-6 flex h-24 w-24 items-center justify-center rounded-full bg-muted">
          <ShoppingBag className="h-12 w-12 text-muted-foreground" />
        </div>
        <h1 className="text-3xl font-bold">Your cart is empty</h1>
        <p className="mt-4 text-muted-foreground max-w-xs">
          Looks like you haven't added any premium laptops to your cart yet.
        </p>
        <Button asChild className="mt-8 rounded-full px-8 hover:bg-white hover:border-2 hover:border-primary hover:text-primary hover:scale-105" size="lg">
          <Link href="/shop">Start Shopping</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-extrabold tracking-tight sm:text-4xl mb-10">
        Shopping <span className="text-primary">Cart</span>
      </h1>

      <div className="grid grid-cols-1 gap-12 lg:grid-cols-12">
        {}
        <div className="lg:col-span-8">
          <div className="space-y-6">
            {items.map((item) => {
              const product = item.product;
              if (!product) return null;

              return (
                <div 
                  key={item.id} 
                  className="flex flex-col sm:flex-row items-center gap-6 rounded-3xl border border-border/50 bg-card/50 p-6 backdrop-blur-sm transition-all hover:border-primary/20"
                >
                  {}
                  <div className="relative h-32 w-full sm:w-32 flex-shrink-0 overflow-hidden rounded-2xl bg-muted/50 border border-border/10">
                    {product.imageUrl ? (
                      <Image
                        src={product.imageUrl}
                        alt={product.name}
                        fill
                        className="object-cover"
                      />
                    ) : (
                      <div className="flex h-full w-full items-center justify-center">
                        <ShoppingBag className="h-8 w-8 text-muted-foreground/30" />
                      </div>
                    )}
                  </div>

                  {}
                  <div className="flex flex-1 flex-col">
                    <div className="flex items-start justify-between">
                      <div>
                        <Badge variant="outline" className="mb-1 text-[10px] uppercase">
                          {product.category}
                        </Badge>
                        <Link href={`/shop/${product.id}`} className="hover:text-primary transition-colors">
                          <h3 className="text-lg font-bold">{product.name}</h3>
                        </Link>
                      </div>
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        className="text-muted-foreground hover:text-destructive"
                        onClick={() => removeItem.mutate({ id: item.id, productId: product.id })}
                      >
                        <Trash2 className="h-5 w-5" />
                      </Button>
                    </div>

                    <div className="mt-4 flex flex-wrap items-center justify-between gap-4">
                      {}
                      <div className="flex items-center rounded-full border border-border/50 bg-muted/30 px-2 py-1">
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-7 w-7 rounded-full"
                          onClick={() => updateQuantity.mutate({ id: item.id, quantity: item.quantity - 1, productId: product.id })}
                        >
                          <Minus className="h-3 w-3" />
                        </Button>
                        <span className="w-8 text-center text-sm font-bold">
                          {item.quantity}
                        </span>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-7 w-7 rounded-full text-primary"
                          onClick={() => updateQuantity.mutate({ id: item.id, quantity: item.quantity + 1, productId: product.id })}
                        >
                          <Plus className="h-3 w-3" />
                        </Button>
                      </div>

                      <div className="flex flex-col items-end">
                        <span className="text-sm text-muted-foreground">
                          ${product.price.toFixed(2)} each
                        </span>
                        <span className="text-lg font-bold">
                          ${(product.price * item.quantity).toFixed(2)}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {}
        <div className="lg:col-span-4">
          <div className="sticky top-24 rounded-3xl border border-border/50 bg-card p-8 shadow-xl shadow-primary/5">
            <h2 className="text-xl font-bold mb-6">Order Summary</h2>
            
            <div className="space-y-4">
              <div className="flex justify-between text-muted-foreground">
                <span>Subtotal ({totalItems} items)</span>
                <span>${Number(totals.subtotal).toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-muted-foreground">
                <span>Shipping</span>
                <span className={totals.shipping === 0 ? "text-green-500 font-medium" : ""}>
                  {totals.shipping === 0 ? "Free" : `$${Number(totals.shipping).toFixed(2)}`}
                </span>
              </div>
              <div className="flex justify-between text-muted-foreground">
                <span>Tax (8%)</span>
                <span>${Number(totals.tax).toFixed(2)}</span>
              </div>
              
              <Separator className="my-4 opacity-50" />
              
              <div className="flex justify-between text-xl font-bold">
                <span>Total</span>
                <span className="text-primary">${Number(totals.total).toFixed(2)}</span>
              </div>
            </div>

            <Button className="mt-8 w-full h-14 text-lg font-bold rounded-2xl shadow-lg shadow-primary/20" asChild>
              <Link href="/checkout">
                Proceed to Checkout
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>

            <div className="mt-8 space-y-4">
              <div className="flex items-center gap-3 text-xs text-muted-foreground">
                <Truck className="h-4 w-4 text-primary" />
                <span>{totals.shipping === 0 ? "Free express delivery on all orders" : "Express delivery available"}</span>
              </div>
              <div className="flex items-center gap-3 text-xs text-muted-foreground">
                <ShieldCheck className="h-4 w-4 text-primary" />
                <span>Secure payment and data protection</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
