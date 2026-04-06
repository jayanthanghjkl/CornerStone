"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase-client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { 
  Loader2, 
  Package, 
  ArrowLeft, 
  CheckCircle2, 
  Clock, 
  Truck, 
  AlertCircle,
  Laptop
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export default function OrderPage() {
  const { id } = useParams();
  const router = useRouter();
  const [order, setOrder] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchOrder() {
      try {
        const { data: { session } } = await supabase.auth.getSession();
        if (!session) {
          router.push(`/auth/login?returnTo=/orders/${id}`);
          return;
        }

        const { data, error } = await supabase
          .from("orders")
          .select(`
            *,
            order_items (
              *,
              product:products (*)
            )
          `)
          .eq("id", id)
          .single();

        if (error) throw error;
        setOrder(data);
      } catch (err: any) {
        console.error("Error fetching order:", err);
        setError(err.message || "Failed to load order details");
      } finally {
        setLoading(false);
      }
    }

    if (id) fetchOrder();
  }, [id, router]);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-32 text-center">
        <Loader2 className="h-12 w-12 animate-spin text-primary" />
        <p className="mt-4 text-muted-foreground">Fetching your order details...</p>
      </div>
    );
  }

  if (error || !order) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-24 text-center">
        <div className="mb-6 flex justify-center">
          <div className="flex h-20 w-20 items-center justify-center rounded-full bg-destructive/10 text-destructive">
            <AlertCircle className="h-10 w-10" />
          </div>
        </div>
        <h1 className="text-3xl font-bold tracking-tight">Order Not Found</h1>
        <p className="mt-4 text-lg text-muted-foreground">
          {error || "We couldn't find the order you're looking for."}
        </p>
        <Button asChild className="mt-8 rounded-full px-8">
          <Link href="/shop">Back to Shop</Link>
        </Button>
      </div>
    );
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "delivered": return <CheckCircle2 className="h-5 w-5 text-green-500" />;
      case "shipped": return <Truck className="h-5 w-5 text-blue-500" />;
      case "processing": return <Clock className="h-5 w-5 text-amber-500" />;
      default: return <Clock className="h-5 w-5 text-muted-foreground" />;
    }
  };

  return (
    <div className="mx-auto max-w-5xl px-4 py-12 sm:px-6 lg:px-8">
      <Link 
        href="/shop" 
        className="mb-8 inline-flex items-center text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
      >
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back to Shop
      </Link>

      <div className="flex flex-col gap-8 md:flex-row md:items-center md:justify-between mb-10">
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight">Order Details</h1>
          <p className="text-muted-foreground mt-1 flex items-center gap-2">
            Order ID: <span className="font-mono text-sm">{order.id}</span>
          </p>
        </div>
        <div className="flex items-center gap-3 bg-muted/50 px-4 py-2 rounded-2xl border border-border/50 w-fit">
          {getStatusIcon(order.status)}
          <span className="font-bold capitalize">{order.status}</span>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-6">
          <Card className="rounded-3xl border-border/50 shadow-sm overflow-hidden">
            <CardHeader className="bg-muted/30 border-b border-border/50">
              <CardTitle className="text-lg flex items-center gap-2">
                <Package className="h-5 w-5 text-primary" />
                Items Ordered
              </CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <div className="divide-y divide-border/50">
                {order.order_items.map((item: any) => (
                  <div key={item.id} className="flex gap-4 p-6 hover:bg-muted/10 transition-colors">
                    <div className="relative h-20 w-20 overflow-hidden rounded-xl bg-muted border border-border/10 flex-shrink-0">
                      {item.product?.image_url ? (
                        <Image 
                          src={item.product.image_url} 
                          alt={item.product.name} 
                          fill 
                          className="object-cover"
                        />
                      ) : (
                        <div className="flex h-full w-full items-center justify-center">
                          <Laptop className="h-6 w-6 text-muted-foreground/30" />
                        </div>
                      )}
                    </div>
                    <div className="flex flex-1 flex-col justify-center">
                      <h3 className="font-bold text-foreground">{item.product?.name || "Product"}</h3>
                      <p className="text-sm text-muted-foreground line-clamp-1">{item.product?.category}</p>
                      <div className="mt-1 flex items-center gap-4">
                        <span className="text-sm font-medium">Qty: {item.quantity}</span>
                        <span className="text-sm font-bold text-primary">${Number(item.price).toFixed(2)}</span>
                      </div>
                    </div>
                    <div className="flex items-center font-bold">
                      ${(Number(item.price) * item.quantity).toFixed(2)}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <Card className="rounded-3xl border-border/50 shadow-sm">
            <CardHeader>
              <CardTitle className="text-lg">Order Summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Order Date</span>
                <span className="font-medium">
                  {new Date(order.created_at).toLocaleDateString("en-US", {
                    month: "long",
                    day: "numeric",
                    year: "numeric"
                  })}
                </span>
              </div>
              <Separator className="opacity-50" />
              <div className="space-y-2 pt-2">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span className="font-medium">${(Number(order.total_amount) / 1.08 - 10).toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Shipping</span>
                  <span className="text-green-600 font-medium font-bold uppercase text-[10px] tracking-wider">Free</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Estimated Tax</span>
                  <span className="font-medium">${(Number(order.total_amount) * 0.08 / 1.08).toFixed(2)}</span>
                </div>
                <Separator className="my-4 opacity-50" />
                <div className="flex justify-between text-xl font-bold">
                  <span>Total</span>
                  <span className="text-primary">${Number(order.total_amount).toFixed(2)}</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="rounded-3xl bg-primary/5 border border-primary/10 p-6">
            <h4 className="font-bold text-primary mb-2 flex items-center gap-2">
              <Truck className="h-4 w-4" />
              Delivery Status
            </h4>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Your order is currently being <strong>{order.status}</strong>. 
              We'll send you a confirmation email with tracking information as soon as your items ship.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
