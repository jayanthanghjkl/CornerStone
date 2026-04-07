"use client";

import { useState, Suspense } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { supabase } from "@/lib/supabase-client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Laptop, AlertCircle, CheckCircle2, Github, Chrome } from "lucide-react";

function RegisterForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const returnTo = searchParams.get("returnTo") || "/";

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          full_name: fullName,
        },
      },
    });

    if (error) {
      setError(error.message);
      setLoading(false);
    } else {
      setSuccess(true);
      setLoading(false);
    }
  };

  const handleOAuthLogin = async (provider: 'google' | 'github') => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider,
      options: {
        redirectTo: `${window.location.origin}/auth/callback?returnTo=${encodeURIComponent(returnTo)}`,
      },
    });
    if (error) setError(error.message);
  };



  if (success) {
    return (
      <div className="flex min-h-[80vh] items-center justify-center px-4 py-12">
        
        <Card className="w-full mt-10 max-w-md border-border/50 shadow-2xl shadow-primary/20 shadow-xl">
          <CardHeader className="text-center">
            <div className="flex justify-center mb-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-green-500/10 text-green-500">
                <CheckCircle2 className="h-8 w-8" />
              </div>
            </div>
            <CardTitle className="text-2xl font-bold">Check your email</CardTitle>
            <CardDescription className="pt-2">
              We've sent a verification link to <span className="font-bold text-foreground">{email}</span>.
              Please verify your account to continue.
            </CardDescription>
          </CardHeader>
          <CardFooter className="justify-center pt-2">
            <Button variant="outline" className="w-full" asChild>
              <Link href={`/auth/login${searchParams.get("returnTo") ? `?returnTo=${encodeURIComponent(searchParams.get("returnTo")!)}` : ""}`}>
                Return to Login
              </Link>
            </Button>
          </CardFooter>
        </Card>

      </div>
    );
  }

  return (
    
    <div className="flex min-h-[80vh] items-center justify-center px-4 py-12">
      
      <Card className="w-full max-w-md border-border/50 shadow-2xl shadow-primary/5">
        <CardHeader className="space-y-1 text-center">
          <div className="flex justify-center mb-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary text-primary-foreground">
              <Laptop className="h-6 w-6" />
            </div>
          </div>
          <CardTitle className="text-2xl font-bold">Create an Account</CardTitle>
          <CardDescription>
            Join the elite club of HarmonicWave high-performance users
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleRegister} className="space-y-4">
            {error && (
              <div className="flex items-center gap-2 rounded-lg bg-destructive/10 p-3 text-sm text-destructive">
                <AlertCircle className="h-4 w-4" />
                {error}
              </div>
            )}
            <div className="space-y-2">
              <Label htmlFor="fullName">Full Name</Label>
              <Input
                id="fullName"
                placeholder="John Doe"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                required
                className="bg-muted/30"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="name@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="bg-muted/30"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="Min. 8 characters"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="bg-muted/30"
              />
            </div>
            <Button className="w-full h-11 font-bold mt-2" type="submit" disabled={loading}>
              {loading ? "Creating Account..." : "Sign Up"}
            </Button>
          </form>

          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t border-border/50" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-card px-2 text-muted-foreground">Or continue with</span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <Button variant="outline" className="h-11" onClick={() => handleOAuthLogin('github')}>
              <Github className="mr-2 h-4 w-4" />
              GitHub
            </Button>
            <Button variant="outline" className="h-11" onClick={() => handleOAuthLogin('google')}>
              <Chrome className="mr-2 h-4 w-4" />
              Google
            </Button>
          </div>
        </CardContent>
        <CardFooter className="justify-center border-t border-border/10 pt-6">
          <p className="text-sm text-muted-foreground">
            Already have an account?{" "}
            <Link 
              href={`/auth/login${searchParams.get("returnTo") ? `?returnTo=${encodeURIComponent(searchParams.get("returnTo")!)}` : ""}`} 
              className="font-bold text-primary hover:underline"
            >
              Sign in
            </Link>
          </p>
        </CardFooter>
      </Card>
      
    </div>
    
  );
}

export default function RegisterPage() {
  return (
    <Suspense fallback={<div className="flex min-h-[80vh] items-center justify-center">Loading...</div>}>
      <RegisterForm />
    </Suspense>
  );
}
