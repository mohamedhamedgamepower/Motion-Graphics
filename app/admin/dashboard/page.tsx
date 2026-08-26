"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import AdminGuard from "@/components/admin/AdminGuard";
import ProjectsManager from "@/components/admin/ProjectsManager";
import PackagesManager from "@/components/admin/PackagesManager";
import { supabase } from "@/lib/supabase/client";

type Tab = "projects" | "packages";

export default function AdminDashboardPage() {
  const router = useRouter();
  const [tab, setTab] = useState<Tab>("projects");

  async function handleSignOut() {
    await supabase.auth.signOut();
    router.push("/admin/login");
  }

  return (
    <AdminGuard>
      <main className="min-h-screen bg-obsidian px-6 py-10 lg:px-10">
        <div className="mx-auto max-w-6xl">
          <div className="flex items-center justify-between">
            <h1 className="font-display text-2xl font-semibold">Admin Dashboard</h1>
            <button onClick={handleSignOut} className="text-sm text-mist hover:text-white">
              Sign out
            </button>
          </div>

          <div className="mt-6 flex gap-3">
            <TabButton active={tab === "projects"} onClick={() => setTab("projects")}>
              Projects
            </TabButton>
            <TabButton active={tab === "packages"} onClick={() => setTab("packages")}>
              Packages
            </TabButton>
          </div>

          <div className="mt-8">
            {tab === "projects" ? <ProjectsManager /> : <PackagesManager />}
          </div>
        </div>
      </main>
    </AdminGuard>
  );
}

function TabButton({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      onClick={onClick}
      className={`rounded-full px-4 py-2 text-sm font-medium ${
        active ? "bg-violet text-white" : "border border-white/15 text-mist hover:text-white"
      }`}
    >
      {children}
    </button>
  );
}
