"use client";

import { cn } from "@/lib/utils";
import { createClient } from "@/lib/supabase/client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useState } from "react";

export function LoginForm({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"div">) {
  const [error, setError] = useState<string | null>(null);
  const [loadingProvider, setLoadingProvider] = useState<string | null>(null);

  const signInWithGoogle = async (e: React.FormEvent) => {
    e.preventDefault();
    const supabase = createClient();
    setLoadingProvider("google");
    setError(null);

    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: "google",
        options: {
          redirectTo: `${window.location.origin}/auth/oauth?next=/dashboard`,
        },
      });

      if (error) throw error;
    } catch (error: unknown) {
      setError(error instanceof Error ? error.message : "An error occurred");
      setLoadingProvider(null);
    }
  };

  const signInWithDiscord = async (e: React.FormEvent) => {
    e.preventDefault();
    const supabase = createClient();
    setLoadingProvider("discord");
    setError(null);

    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: "discord",
        options: {
          redirectTo: `${window.location.origin}/auth/oauth?next=/dashboard`,
        },
      });

      if (error) throw error;
    } catch (error: unknown) {
      setError(error instanceof Error ? error.message : "An error occurred");
      setLoadingProvider(null);
    }
  };

  const signInWithLinkedin = async (e: React.FormEvent) => {
    e.preventDefault();
    const supabase = createClient();
    setLoadingProvider("linkedin");
    setError(null);

    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: "linkedin_oidc",
        options: {
          redirectTo: `${window.location.origin}/auth/oauth?next=/dashboard`,
        },
      });

      if (error) throw error;
    } catch (error: unknown) {
      setError(error instanceof Error ? error.message : "An error occurred");
      setLoadingProvider(null);
    }
  };

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">Welcome!</CardTitle>
          <CardDescription>Sign in to your account to continue</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <form onSubmit={signInWithGoogle}>
            <div className="flex flex-col gap-6">
              {error && <p className="text-sm text-destructive-500">{error}</p>}
              <Button
                type="submit"
                className="w-full bg-red-600 text-white"
                disabled={loadingProvider !== null}
              >
                {loadingProvider === "google"
                  ? "Logging in..."
                  : "Continue with Google"}
              </Button>
            </div>
          </form>
          <form onSubmit={signInWithDiscord}>
            <div className="flex flex-col gap-6">
              {error && <p className="text-sm text-destructive-500">{error}</p>}
              <Button
                type="submit"
                className="w-full bg-[#738ADB] text-white"
                disabled={loadingProvider !== null}
              >
                {loadingProvider === "discord"
                  ? "Logging in..."
                  : "Continue with Discord"}
              </Button>
            </div>
          </form>
          <form onSubmit={signInWithLinkedin}>
            <div className="flex flex-col gap-6">
              {error && <p className="text-sm text-destructive-500">{error}</p>}
              <Button
                type="submit"
                className="w-full bg-blue-700 text-white"
                disabled={loadingProvider !== null}
              >
                {loadingProvider === "linkedin"
                  ? "Logging in..."
                  : "Continue with LinkedIn"}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
