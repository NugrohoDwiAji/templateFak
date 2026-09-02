"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  FileText,
  Newspaper,
  FolderOpen,
  Megaphone,
  Users,
  GraduationCap,
  HelpCircle,
  Network,
  Palette,
  Settings,
  X,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useAppSelector } from "@/store/store";
import { useMounted } from "@/hooks/useMounted";

const adminLinks = [
  { name: "Dashboard", href: "/admin/dashboard", icon: LayoutDashboard },
  { name: "Content", href: "/admin/content", icon: FileText },
  { name: "Berita", href: "/admin/berita", icon: Newspaper },
  { name: "Pengumuman", href: "/admin/pengumuman", icon: Megaphone },
  { name: "Berkas", href: "/admin/berkas", icon: FolderOpen },
  { name: "Dosen", href: "/admin/dosen", icon: Users },
  { name: "Prodi", href: "/admin/prodi", icon: GraduationCap },
  { name: "FAQ", href: "/admin/faq", icon: HelpCircle },
  { name: "Struktur", href: "/admin/strukturorganisasi", icon: Network },
  { name: "Tema", href: "/admin/theme", icon: Palette },
  { name: "Identitas", href: "/admin/identitas", icon: Settings },
];

interface SidebarProps {
  open: boolean;
  onClose: () => void;
}

function Sidebar({ open, onClose }: SidebarProps) {
  const pathname = usePathname();
  const theme = useAppSelector((state) => state.theme.current);
  const mounted = useMounted();

  return (
    <>
      {open && (
        <div
          className="fixed inset-0 z-40 lg:hidden"
          style={{ backgroundColor: mounted ? theme.sidebarBgHex + "80" : "rgba(30, 41, 59, 0.5)" }}
          onClick={onClose}
        />
      )}

      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-50 w-64 transform transition-transform duration-200 ease-in-out",
          open ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        )}
        style={{ backgroundColor: mounted ? theme.sidebarBgHex : "#1e293b" }}
      >
        <div className="flex h-full flex-col">
          <div
            className="flex items-center justify-between border-b px-6 py-4"
            style={{
              borderColor: mounted ? theme.primaryHex + "40" : "rgba(37, 99, 235, 0.25)",
            }}
          >
            <Link
              href="/admin/dashboard"
              className="text-lg font-bold"
              style={{ color: mounted ? theme.sidebarTextHex : "#ffffff" }}
            >
              Admin Panel
            </Link>
            <button
              onClick={onClose}
              className="rounded-lg p-1 lg:hidden"
              style={{ color: mounted ? theme.sidebarTextHex + "B3" : "#ffffffb3" }}
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          <nav className="flex-1 space-y-1 px-3 py-4">
            {adminLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={onClose}
                  className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors"
                  style={{
                    backgroundColor: isActive
                      ? (mounted ? theme.sidebarActiveHex + "20" : "rgba(37, 99, 235, 0.2)")
                      : "transparent",
                    color: isActive
                      ? (mounted ? theme.sidebarActiveHex : "#2563eb")
                      : (mounted ? theme.sidebarTextHex + "CC" : "#ffffffcc"),
                  }}
                >
                  <link.icon className="h-5 w-5" />
                  {link.name}
                </Link>
              );
            })}
          </nav>

          <div
            className="border-t px-3 py-4"
            style={{ borderColor: mounted ? theme.primaryHex + "40" : "rgba(37, 99, 235, 0.25)" }}
          >
            <Link
              href="/"
              className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium"
              style={{ color: mounted ? theme.sidebarTextHex + "CC" : "#ffffffcc" }}
            >
              Kembali ke Website
            </Link>
          </div>
        </div>
      </aside>
    </>
  );
}

export { Sidebar };
