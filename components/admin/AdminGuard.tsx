"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase/client";

// Wrap any admin page with <AdminGuard> to require a logged-in Supabase
// user before showing its content. This protects the UI — the real
// security boundary is the Row Level Security policies in Supabase,
// which only allow writes from authenticated users (see supabase/schema.sql).
export default function AdminGuard({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      if (!data.session) {
        router.replace("/admin/login");
      } else {
        setChecking(false);
      }
    });

    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      if (!session) router.replace("/admin/login");
    });

    return () => listener.subscription.unsubscribe();
  }, [router]);

  if (checking) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-obsidian">
        <p className="text-mist">Checking access…</p>
      </main>
    );
  }

  return <>{children}</>;
}
