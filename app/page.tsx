"use client";

import { useState, useEffect } from "react";
import { createClient } from "@/lib/supabase/client";
import { DolceGustoApp } from "@/components/dolce-gusto-app";
import { AuthForm } from "@/components/auth-form";
import { Loader2, Coffee } from "lucide-react";
import type { User } from "@supabase/supabase-js";

export default function Home() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const supabase = createClient();

  useEffect(() => {
    // Check current session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
      setLoading(false);
    });

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, [supabase.auth]);

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 rounded-full bg-primary flex items-center justify-center mx-auto mb-4">
            <Coffee className="w-8 h-8 text-primary-foreground" />
          </div>
          <Loader2 className="w-6 h-6 animate-spin mx-auto text-muted-foreground" />
        </div>
      </div>
    );
  }

  if (!user) {
    return <AuthForm onSuccess={() => {}} />;
  }

  return <DolceGustoApp user={user} />;
}
