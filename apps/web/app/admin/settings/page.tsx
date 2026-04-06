"use client";

import { useState } from "react";
import { 
  Settings, 
  Shield, 
  Bell, 
  Globe, 
  Database,
  Save,
  RefreshCcw,
  Trash2
} from "lucide-react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";

export default function SettingsPage() {
  const [loading, setLoading] = useState(false);

  const handleSave = () => {
    setLoading(true);
    setTimeout(() => setLoading(false), 1000);
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Settings</h1>
        <p className="text-muted-foreground">Configure your store's global preferences and security.</p>
      </div>

      <div className="grid gap-8">
        {}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Globe className="h-5 w-5 text-primary" />
              General Configuration
            </CardTitle>
            <CardDescription>Manage your store's basic identity and public information.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-2">
              <Label htmlFor="siteName">Store Name</Label>
              <Input id="siteName" defaultValue="Cornerstone" className="bg-background/50" />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="supportEmail">Support Email</Label>
              <Input id="supportEmail" defaultValue="support@cornerstone.com" className="bg-background/50" />
            </div>
            <div className="flex items-center justify-between pt-2">
              <div className="space-y-0.5">
                <Label>Maintenance Mode</Label>
                <p className="text-xs text-muted-foreground">Disable public access while performing updates.</p>
              </div>
              <Switch />
            </div>
          </CardContent>
          <CardFooter className="border-t border-border/10 pt-6">
            <Button onClick={handleSave} disabled={loading} className="gap-2">
              {loading ? <RefreshCcw className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
              Save Changes
            </Button>
          </CardFooter>
        </Card>

        {}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Shield className="h-5 w-5 text-primary" />
              Security & Data
            </CardTitle>
            <CardDescription>Configure Row Level Security and API access.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Strict RLS Policies</Label>
                <p className="text-xs text-muted-foreground">Enforce strict data isolation for all users.</p>
              </div>
              <Switch defaultChecked />
            </div>
            <Separator className="opacity-50" />
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Admin Realtime Sync</Label>
                <p className="text-xs text-muted-foreground">Enable WebSocket updates for admin dashboard.</p>
              </div>
              <Switch defaultChecked />
            </div>
          </CardContent>
        </Card>

        {}
        <Card className="border-destructive/20 bg-destructive/5">
          <CardHeader>
            <CardTitle className="text-destructive flex items-center gap-2">
              <Trash2 className="h-5 w-5" />
              Danger Zone
            </CardTitle>
            <CardDescription>Irreversible actions for system administrators.</CardDescription>
          </CardHeader>
          <CardContent>
            <Button variant="destructive" className="font-bold">Reset System Cache</Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
