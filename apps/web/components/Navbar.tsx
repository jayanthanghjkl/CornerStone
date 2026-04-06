"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { ShoppingCart, Menu, X, Laptop, LogOut, User, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCart, useCartRealtime } from "@/hooks/useCart";
import { supabase } from "@/lib/supabase-client";
import { cn } from "@/lib/utils";
import { useRouter, usePathname } from "next/navigation";
import { useQueryClient } from "@tanstack/react-query";

const navLinks = [
  { label: "Shop", href: "/shop" },
  { label: "Collections", href: "/collections" },
  { label: "About", href: "/about" },
];

export function Navbar() {
  const router = useRouter();
  const pathname = usePathname();
  const queryClient = useQueryClient();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [user, setUser] = useState<any>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [mounted, setMounted] = useState(false);
  const { totalItems } = useCart();
  
<<<<<<< HEAD
  
=======
  // Handle cart realtime updates globally here
>>>>>>> 84677c2b19d0b46691e6d0ded4ee12a146e6e3de
  useCartRealtime(user?.id);

  useEffect(() => {
    setMounted(true);
    const checkUser = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      const currentUser = session?.user ?? null;
      setUser(currentUser);

      if (currentUser) {
        const { data: profile } = await supabase
          .from("profiles")
          .select("role")
          .eq("id", currentUser.id)
          .single();
        setIsAdmin(profile?.role === "admin");
      } else {
        setIsAdmin(false);
      }
    };

    checkUser();

    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (_event, session) => {
      const currentUser = session?.user ?? null;
      setUser(currentUser);
      
      if (currentUser) {
        const { data: profile } = await supabase
          .from("profiles")
          .select("role")
          .eq("id", currentUser.id)
          .single();
        setIsAdmin(profile?.role === "admin");
      } else {
        setIsAdmin(false);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  const handleSignOut = async () => {
    await supabase.auth.signOut();
<<<<<<< HEAD
    queryClient.clear(); 
=======
    queryClient.clear(); // Clear ALL queries (cart, user, etc.)
>>>>>>> 84677c2b19d0b46691e6d0ded4ee12a146e6e3de
    setUser(null);
    setIsAdmin(false);
    router.push("/");
    router.refresh();
  };

  return (
<<<<<<< HEAD
    <header className={cn("sticky top-0 z-50 w-full bg-background/80 backdrop-blur-sm supports-[backdrop-filter]:bg-background/60", pathname === "/shop" ? "bg-white" : "bg-background/80 backdrop-blur-sm supports-[backdrop-filter]:bg-background/60")}
      
    >
      <div className="mx-auto flex h-16 max-w-[1350px] mt-4 mx-auto space-y-4 items-center justify-between px-4 sm:px-6 lg:px-8">
        {}
=======
    <header className="sticky top-0 z-50 w-full  bg-background/80 backdrop-blur-sm supports-[backdrop-filter]:bg-background/60">
      <div className="mx-auto flex h-16 max-w-[1350px] mt-4 mx-auto space-y-4 items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Logo */}
>>>>>>> 84677c2b19d0b46691e6d0ded4ee12a146e6e3de
        <Link href="/" className="flex items-center gap-2 group">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground ring-2 ring-primary/20 transition-all group-hover:ring-primary/60">
            <Laptop className="h-4 w-4" />
          </div>
          <span className="text-lg font-bold tracking-tight">
            Corner<span className="text-primary">stone</span>
          </span>
        </Link>

<<<<<<< HEAD
        {}
=======
        {/* Desktop nav */}
>>>>>>> 84677c2b19d0b46691e6d0ded4ee12a146e6e3de
        <nav className="hidden md:flex items-center gap-6">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
<<<<<<< HEAD
                "text-sm font-medium transition-colors hover:text-foreground hover:scale-105",
=======
                "text-sm font-medium transition-colors hover:text-foreground",
>>>>>>> 84677c2b19d0b46691e6d0ded4ee12a146e6e3de
                pathname === link.href ? "text-primary font-semibold" : "text-muted-foreground"
              )}
            >
              {link.label}
            </Link>
          ))}
          {isAdmin && (
            <Link
              href="/admin"
              className="flex items-center gap-1 text-sm font-medium text-primary/80 transition-colors hover:text-primary"
            >
              <Shield className="h-3.5 w-3.5" />
              Admin
            </Link>
          )}
        </nav>

<<<<<<< HEAD
        {}
        <div className="flex items-center gap-2">
          {}
=======
        {/* Right actions */}
        <div className="flex items-center gap-2">
          {/* Cart */}
>>>>>>> 84677c2b19d0b46691e6d0ded4ee12a146e6e3de
          {pathname !== "/" && pathname !== "/about" && pathname !== "/collections" && (
            <Button variant="ghost" size="icon" asChild className="relative">
              <Link href="/cart" aria-label={`Cart, ${mounted ? totalItems : 0} items`}>
                <ShoppingCart className="h-5 w-5" />
                {mounted && totalItems > 0 && (
                  <span className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-[10px] font-bold text-primary-foreground">
                    {totalItems > 9 ? "9+" : totalItems}
                  </span>
                )}
              </Link>
            </Button>
          )}
          {user ? (
            <div className="hidden sm:flex items-center gap-2">
              <Button variant="ghost" size="sm" onClick={handleSignOut} className="flex items-center gap-2 px-4 py-2 text-red-600 border border-red-600 rounded-lg hover:text-white hover:bg-red-600 transition-colors duration-300 ease-in-out">
                <LogOut className="h-4 w-4" />
                Sign Out
              </Button>
            </div>
          ) : (
            <>
              <Button variant="outline" size="sm" asChild className="hidden sm:flex">
                <Link href="/auth/login">Sign in</Link>
              </Button>
              <Button size="sm" asChild className="hidden sm:flex">
                <Link href="/auth/register">Get started</Link>
              </Button>
            </>
          )}

<<<<<<< HEAD
          {}
=======
          {/* Mobile hamburger */}
>>>>>>> 84677c2b19d0b46691e6d0ded4ee12a146e6e3de
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setMobileOpen((o) => !o)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>
      </div>

<<<<<<< HEAD
      {}
=======
      {/* Mobile menu */}
>>>>>>> 84677c2b19d0b46691e6d0ded4ee12a146e6e3de
      <div
        className={cn(
          "overflow-hidden border-t border-border/50 bg-background/95 backdrop-blur-xl md:hidden transition-all duration-300",
          mobileOpen ? "max-h-80" : "max-h-0"
        )}
      >
        <nav className="flex flex-col px-4 py-4 gap-1">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMobileOpen(false)}
              className="rounded-md px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
            >
              {link.label}
            </Link>
          ))}
          {isAdmin && (
            <Link
              href="/admin"
              onClick={() => setMobileOpen(false)}
              className="flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium text-primary/80 transition-colors hover:bg-primary/5"
            >
              <Shield className="h-4 w-4" />
              Admin Panel
            </Link>
          )}
          <div className="mt-3 flex flex-col gap-2 border-t border-border/50 pt-3">
            {user ? (
              <Button variant="outline" size="sm" className="w-full justify-start gap-2 text-destructive hover:bg-destructive/5" onClick={handleSignOut}>
                <LogOut className="h-4 w-4" />
                Sign Out
              </Button>
            ) : (
              <>
<<<<<<< HEAD
                <Button variant="outline" size="sm" className="w-full hover:scale-105 hover:bg-primary hover:text-primary-foreground" asChild onClick={() => setMobileOpen(false)}>
                  <Link href="/auth/login">Sign in</Link>
                </Button>
                <Button size="sm" className="w-full hover:scale-105 hover:bg-primary hover:text-primary-foreground" asChild onClick={() => setMobileOpen(false)}>
=======
                <Button variant="outline" size="sm" className="w-full" asChild onClick={() => setMobileOpen(false)}>
                  <Link href="/auth/login">Sign in</Link>
                </Button>
                <Button size="sm" className="w-full" asChild onClick={() => setMobileOpen(false)}>
>>>>>>> 84677c2b19d0b46691e6d0ded4ee12a146e6e3de
                  <Link href="/auth/register">Get started</Link>
                </Button>
              </>
            )}
          </div>
        </nav>
      </div>
    </header>
  );
}
