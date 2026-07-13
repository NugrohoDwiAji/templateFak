"use client";

import { Menu, LogOut } from "lucide-react";
import { signOut } from "next-auth/react";
import { ThemeSwitcher } from "@/components/features/theme/ThemeSwitcher";
import { useAppSelector } from "@/store/store";
import { useMounted } from "@/hooks/useMounted";

interface AdminHeaderProps {
  onMenuClick: () => void;
}

function AdminHeader({ onMenuClick }: AdminHeaderProps) {
  const theme = useAppSelector((state) => state.theme.current);
  const mounted = useMounted();

  const handleLogout = async () => {
    await signOut({ callbackUrl: "/login" });
  };

  return (
    <header
      className="flex h-16 items-center justify-between border-b px-6"
      style={{
        backgroundColor: mounted ? theme.headerBgHex : "#ffffff",
        borderColor: mounted ? theme.primaryHex + "40" : "rgba(37, 99, 235, 0.25)",
        color: mounted ? theme.headerTextHex : "#1e293b",
      }}
    >
      <button
        onClick={onMenuClick}
        className="rounded-lg p-2 lg:hidden"
        style={{ color: mounted ? theme.headerTextHex : "#1e293b" }}
      >
        <Menu className="h-5 w-5" />
      </button>

      <div className="flex-1" />

      <div className="flex items-center gap-3">
        <ThemeSwitcher />
        <button
          onClick={handleLogout}
          className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm"
          style={{ color: mounted ? theme.headerTextHex : "#1e293b" }}
        >
          <LogOut className="h-4 w-4" />
          Logout
        </button>
      </div>
    </header>
  );
}

export { AdminHeader };
