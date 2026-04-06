"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase-client";
import { 
  Package, 
  Users, 
  ShoppingBag, 
  TrendingUp, 
  ArrowRight,
  ShieldCheck,
  AlertCircle
} from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    products: 0,
    orders: 0,
    users: 0,
    revenue: 0
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchStats() {
      try {
        const [
          { count: productsCount },
          { count: ordersCount },
          { count: usersCount },
          { data: revenueData }
        ] = await Promise.all([
          supabase.from("products").select("*", { count: 'exact', head: true }),
          supabase.from("orders").select("*", { count: 'exact', head: true }),
          supabase.from("profiles").select("*", { count: 'exact', head: true }),
          supabase.from("orders").select("total_amount")
        ]);

        const totalRevenue = revenueData?.reduce((sum, order) => sum + Number(order.total_amount), 0) || 0;

        setStats({
          products: productsCount || 0,
          orders: ordersCount || 0,
          users: usersCount || 0,
          revenue: totalRevenue
        });
      } catch (err: any) {
        console.error("Failed to fetch admin stats:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchStats();
  }, []);

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center">
        <AlertCircle className="h-12 w-12 text-destructive mb-4" />
        <h2 className="text-2xl font-bold">Failed to load dashboard</h2>
        <p className="text-muted-foreground mt-2">{error}</p>
        <Button onClick={() => window.location.reload()} className="mt-6">Try Again</Button>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-muted-foreground">Welcome to the Cornerstone Admin Control Center.</p>
      </div>

      {}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
            <TrendingUp className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            {loading ? <Skeleton className="h-8 w-24" /> : (
              <div className="text-2xl font-bold">${stats.revenue.toFixed(2)}</div>
            )}
            <p className="text-xs text-muted-foreground">+20.1% from last month</p>
          </CardContent>
        </Card>
        <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Products</CardTitle>
            <Package className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            {loading ? <Skeleton className="h-8 w-12" /> : (
              <div className="text-2xl font-bold">{stats.products}</div>
            )}
            <p className="text-xs text-muted-foreground">Active listings</p>
          </CardContent>
        </Card>
        <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Orders</CardTitle>
            <ShoppingBag className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            {loading ? <Skeleton className="h-8 w-12" /> : (
              <div className="text-2xl font-bold">{stats.orders}</div>
            )}
            <p className="text-xs text-muted-foreground">Successful checkouts</p>
          </CardContent>
        </Card>
        <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Users</CardTitle>
            <Users className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            {loading ? <Skeleton className="h-8 w-12" /> : (
              <div className="text-2xl font-bold">{stats.users}</div>
            )}
            <p className="text-xs text-muted-foreground">Registered customers</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card className="border-border/50">
          <CardHeader>
            <CardTitle>Inventory Management</CardTitle>
            <CardDescription>Update stock, add new laptops, or change prices.</CardDescription>
          </CardHeader>
          <CardContent>
            <Button asChild className="w-full justify-between" variant="outline">
              <Link href="/admin/products">
                Manage Products
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </CardContent>
        </Card>
        <Card className="border-border/50 bg-primary/5 border-primary/20">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <ShieldCheck className="h-5 w-5 text-primary" />
              Security Check
            </CardTitle>
            <CardDescription>All admin actions are logged for security purposes.</CardDescription>
          </CardHeader>
          <CardContent className="text-sm text-muted-foreground italic">
            "With great power comes great responsibility."
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
