"use client";

import { supabase } from "@/lib/supabase-client";
import { useRouter } from "next/navigation";
import { LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";

export function AdminLogoutButton() {
  const router = useRouter();

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push("/auth/login");
    router.refresh();
  };

  return (
    <Button 
      variant="ghost" 
      onClick={handleLogout}
      className="w-full justify-start gap-3 text-muted-foreground hover:text-destructive transition-colors"
    >
      <LogOut className="h-4 w-4" />
      Logout
    </Button>
  );
}
