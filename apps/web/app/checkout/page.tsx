"use client";

import { useState } from "react";
import { useCart } from "@/hooks/useCart";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { 
  CheckCircle2, 
  CreditCard, 
  Truck, 
  ShieldCheck, 
  ArrowLeft,
  Laptop,
  Loader2
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase-client";

export default function CheckoutPage() {
  const { items, totals, clearCart, isLoading, user } = useCart();
  const [isOrdered, setIsOrdered] = useState(false);
  const [loading, setLoading] = useState(false);
  const [orderId, setOrderId] = useState<string | null>(null);
  const router = useRouter();

  const handlePlaceOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) {
      router.push("/auth/login?returnTo=/checkout");
      return;
    }
    
    setLoading(true);
    
    try {
      const { data, error } = await supabase.rpc("place_order");
      
      if (error) {
        throw error;
      }
      
      setOrderId(data);
      setIsOrdered(true);
<<<<<<< HEAD
      
=======
      // No need to call clearCart mutation as the RPC handles it on the server
>>>>>>> 84677c2b19d0b46691e6d0ded4ee12a146e6e3de
    } catch (err: any) {
      console.error("Checkout failed:", err);
      alert(err.message || "An error occurred during checkout. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center py-32 text-center">
        <Loader2 className="h-12 w-12 animate-spin text-primary" />
        <p className="mt-4 text-muted-foreground">Loading checkout...</p>
      </div>
    );
  }

  if (isOrdered) {
    return (
      <div className="flex flex-col items-center justify-center py-32 text-center px-4">
        <div className="mb-8 flex h-24 w-24 items-center justify-center rounded-full bg-green-500/10 text-green-500 animate-bounce">
          <CheckCircle2 className="h-12 w-12" />
        </div>
        <h1 className="text-4xl font-extrabold tracking-tight">Order Confirmed!</h1>
        <p className="mt-4 text-lg text-muted-foreground max-w-md">
          Thank you for choosing Cornerstone. Your premium product is being prepared for express delivery.
        </p>
        <div className="mt-10 flex flex-wrap justify-center gap-4">
          {orderId && (
            <Button asChild className="rounded-full px-8 bg-primary hover:bg-primary/90">
              <Link href={`/orders/${orderId}`}>View Order Details</Link>
            </Button>
          )}
          <Button variant="outline" asChild className="rounded-full px-8">
            <Link href="/shop">Continue Shopping</Link>
          </Button>
        </div>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-32 text-center">
        <h1 className="text-2xl font-bold">Your cart is empty</h1>
        <Button asChild className="mt-6">
          <Link href="/shop">Back to Shop</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <Link 
        href="/cart" 
        className="mb-8 inline-flex items-center text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
      >
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back to Cart
      </Link>

      <h1 className="text-3xl font-extrabold tracking-tight mb-10">Checkout</h1>

      <div className="grid grid-cols-1 gap-12 lg:grid-cols-12">
<<<<<<< HEAD
        {}
=======
        {/* Shipping & Payment Form */}
>>>>>>> 84677c2b19d0b46691e6d0ded4ee12a146e6e3de
        <div className="lg:col-span-7">
          <form onSubmit={handlePlaceOrder} className="space-y-8">
            <section className="space-y-4">
              <h2 className="text-xl font-bold flex items-center gap-2">
                <Truck className="h-5 w-5 text-primary" />
                Shipping Information
              </h2>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="firstName">First Name</Label>
                  <Input id="firstName" required className="bg-muted/30" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lastName">Last Name</Label>
                  <Input id="lastName" required className="bg-muted/30" />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="address">Address</Label>
                <Input id="address" required className="bg-muted/30" />
              </div>
              <div className="grid grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="city">City</Label>
                  <Input id="city" required className="bg-muted/30" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="state">State</Label>
                  <Input id="state" required className="bg-muted/30" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="zip">ZIP Code</Label>
                  <Input id="zip" required className="bg-muted/30" />
                </div>
              </div>
            </section>

            <section className="space-y-4 pt-4">
              <h2 className="text-xl font-bold flex items-center gap-2">
                <CreditCard className="h-5 w-5 text-primary" />
                Payment Details
              </h2>
              <div className="space-y-2">
                <Label htmlFor="card">Card Number</Label>
                <Input id="card" placeholder="0000 0000 0000 0000" required className="bg-muted/30" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="expiry">Expiry Date</Label>
                  <Input id="expiry" placeholder="MM/YY" required className="bg-muted/30" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="cvv">CVV</Label>
                  <Input id="cvv" placeholder="123" required className="bg-muted/30" />
                </div>
              </div>
            </section>

            <Button type="submit" size="lg" className="w-full h-14 text-lg font-bold rounded-2xl shadow-xl shadow-primary/20" disabled={loading}>
              {loading ? "Processing Order..." : `Pay $${Number(totals.total).toFixed(2)}`}
            </Button>
            
            <p className="text-center text-xs text-muted-foreground flex items-center justify-center gap-2">
              <ShieldCheck className="h-3 w-3" />
              Your payment is processed securely by Cornerstone
            </p>
          </form>
        </div>

<<<<<<< HEAD
        {}
=======
        {/* Order Summary Sidebar */}
>>>>>>> 84677c2b19d0b46691e6d0ded4ee12a146e6e3de
        <div className="lg:col-span-5">
          <div className="rounded-3xl border border-border/50 bg-card p-8 sticky top-24">
            <h2 className="text-xl font-bold mb-6">Your Order</h2>
            <div className="space-y-4 mb-6 max-h-[40vh] overflow-y-auto pr-2">
              {items.map((item) => (
                <div key={item.id} className="flex gap-4">
                  <div className="relative h-16 w-16 overflow-hidden rounded-lg bg-muted border border-border/10 flex-shrink-0">
                    {item.product?.imageUrl ? (
                      <Image src={item.product.imageUrl} alt={item.product.name} fill className="object-cover" />
                    ) : (
                      <div className="flex h-full w-full items-center justify-center"><Laptop className="h-4 w-4 text-muted-foreground/30" /></div>
                    )}
                  </div>
                  <div className="flex flex-col justify-center flex-1">
                    <span className="text-sm font-bold line-clamp-1">{item.product?.name}</span>
                    <span className="text-xs text-muted-foreground">Qty: {item.quantity}</span>
                  </div>
                  <div className="flex flex-col justify-center items-end">
                    <span className="text-sm font-bold">${((item.product?.price ?? 0) * item.quantity).toFixed(2)}</span>
                  </div>
                </div>
              ))}
            </div>

            <Separator className="my-6 opacity-50" />

            <div className="space-y-3">
              <div className="flex justify-between text-sm text-muted-foreground">
                <span>Subtotal</span>
                <span>${Number(totals.subtotal).toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-sm text-muted-foreground">
                <span>Shipping</span>
                <span className={totals.shipping === 0 ? "text-green-500 font-medium" : ""}>
                  {totals.shipping === 0 ? "Free" : `$${Number(totals.shipping).toFixed(2)}`}
                </span>
              </div>
              <div className="flex justify-between text-sm text-muted-foreground">
                <span>Tax (8%)</span>
                <span>${Number(totals.tax).toFixed(2)}</span>
              </div>
              <Separator className="my-2 opacity-30" />
              <div className="flex justify-between text-xl font-bold">
                <span>Total</span>
                <span className="text-primary">${Number(totals.total).toFixed(2)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

