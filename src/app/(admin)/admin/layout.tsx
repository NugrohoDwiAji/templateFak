"use client";

import { useState } from "react";
import { SessionProvider } from "next-auth/react";
import { Sidebar } from "@/components/layout/Sidebar";
import { AdminHeader } from "@/components/layout/AdminHeader";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <SessionProvider>
      <div className="flex min-h-screen" style={{ backgroundColor: "var(--theme-body-bg)" }}>
        <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />
        <div className="flex flex-1 flex-col">
          <AdminHeader onMenuClick={() => setSidebarOpen(true)} />
          <main className="flex-1 p-6">{children}</main>
        </div>
      </div>
    </SessionProvider>
  );
}
