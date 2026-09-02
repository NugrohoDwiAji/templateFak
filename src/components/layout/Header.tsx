"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { useAppSelector } from "@/store/store";
import { useMounted } from "@/hooks/useMounted";
import { useIdentitas } from "@/hooks/useIdentitas";
import { useLanguage } from "@/hooks/useLanguage";

interface NavChild {
  name: { id: string; en: string; cn: string };
  href: string;
}

interface NavItemParent {
  name: { id: string; en: string; cn: string };
  children: NavChild[];
}

interface NavItemLink {
  name: { id: string; en: string; cn: string };
  href: string;
}

type NavItem = NavItemParent | NavItemLink;

const navigation: NavItem[] = [
  { name: { id: "Beranda", en: "Home", cn: "首页" }, href: "/" },
  {
    name: { id: "Profil", en: "Profile", cn: "简介" },
    children: [
      { name: { id: "Visi & Misi", en: "Vision & Mission", cn: "愿景与使命" }, href: "/visimisi" },
      { name: { id: "Struktur Organisasi", en: "Organizational Structure", cn: "组织结构" }, href: "/strukturorganisasi" },
      { name: { id: "Informasi", en: "Information", cn: "信息" }, href: "/informasi" },
      { name: { id: "Program Studi", en: "Study Programs", cn: "专业" }, href: "/prodi" },
      { name: { id: "Dosen", en: "Lecturers", cn: "讲师" }, href: "/dosen" },
    ],
  },
  { name: { id: "Berita", en: "News", cn: "新闻" }, href: "/berita" },
  { name: { id: "Pengumuman", en: "Announcements", cn: "公告" }, href: "/pengumuman" },
  { name: { id: "Unduhan", en: "Downloads", cn: "下载" }, href: "/unduhan" },
  { name: { id: "FAQ", en: "FAQ", cn: "常见问题" }, href: "/faq" },
];

function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const theme = useAppSelector((state) => state.theme.current);
  const mounted = useMounted();
  const { data: identitas } = useIdentitas();
  const { current } = useLanguage();

  const namaFakultas = identitas[`nama_fakultas_${current}`] || identitas.nama_fakultas || "";

  return (
    <header
      className="sticky top-0 z-40 border-b backdrop-blur-md"
      style={{
        backgroundColor: mounted ? theme.headerBgHex + "CC" : "rgba(255, 255, 255, 0.8)",
        borderColor: mounted ? theme.primaryHex + "40" : "rgba(37, 99, 235, 0.25)",
      }}
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-2">
          <img
            src="/ubg.png"
            alt="Logo UBG"
            className="h-10 w-10 rounded-lg object-contain"
          />
          {namaFakultas && (
            <span
              className="hidden text-sm font-semibold sm:block"
              style={{ color: mounted ? theme.primaryHex : "#2563eb" }}
            >
              {namaFakultas}
            </span>
          )}
        </Link>

        <nav className="hidden items-center gap-1 md:flex">
          {navigation.map((item) =>
            "children" in item ? (
              <div
                key={item.name.id}
                className="relative"
                onMouseEnter={() => setOpenDropdown(item.name.id)}
                onMouseLeave={() => setOpenDropdown(null)}
              >
                <button
                  className="flex items-center gap-1 rounded-lg px-3 py-2 text-sm font-medium transition-colors"
                  style={{ color: mounted ? theme.headerTextHex : "#1e293b" }}
                >
                  {item.name[current] || item.name.id}
                  <ChevronDown className="h-3 w-3" />
                </button>
                {openDropdown === item.name.id && (
                  <div
                    className="absolute left-0 top-full w-48 rounded-lg border py-1 shadow-lg"
                    style={{
                      backgroundColor: mounted ? theme.cardBgHex : "#ffffff",
                      borderColor: mounted ? theme.cardBorderHex : "#e2e8f0",
                    }}
                  >
                    {item.children.map((child) => (
                      <Link
                        key={child.href}
                        href={child.href}
                        className="block px-4 py-2 text-sm transition-colors"
                        style={{ color: mounted ? theme.bodyTextHex : "#1e293b" }}
                      >
                        {child.name[current] || child.name.id}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ) : (
              <Link
                key={item.href}
                href={item.href}
                className="rounded-lg px-3 py-2 text-sm font-medium transition-colors"
                style={{ color: mounted ? theme.headerTextHex : "#1e293b" }}
              >
                {item.name[current] || item.name.id}
              </Link>
            )
          )}
        </nav>

        <div className="flex items-center gap-2">
          <button
            className="rounded-lg p-2 md:hidden"
            style={{ color: mounted ? theme.headerTextHex : "#1e293b" }}
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            {mobileOpen ? (
              <X className="h-5 w-5" />
            ) : (
              <Menu className="h-5 w-5" />
            )}
          </button>
        </div>
      </div>

      {mobileOpen && (
        <div
          className="border-t md:hidden"
          style={{
            backgroundColor: mounted ? theme.cardBgHex : "#ffffff",
            borderColor: mounted ? theme.cardBorderHex : "#e2e8f0",
          }}
        >
          <div className="space-y-1 px-4 py-3">
            {navigation.map((item) =>
              "children" in item ? (
                <div key={item.name.id}>
                  <button
                    onClick={() =>
                      setOpenDropdown(
                        openDropdown === item.name.id ? null : item.name.id
                      )
                    }
                    className="flex w-full items-center justify-between rounded-lg px-3 py-2 text-sm font-medium"
                    style={{ color: mounted ? theme.bodyTextHex : "#1e293b" }}
                  >
                    {item.name[current] || item.name.id}
                    <ChevronDown
                      className={cn(
                        "h-4 w-4 transition-transform",
                        openDropdown === item.name.id && "rotate-180"
                      )}
                    />
                  </button>
                  {openDropdown === item.name.id && (
                    <div className="ml-4 space-y-1">
                      {item.children.map((child) => (
                        <Link
                          key={child.href}
                          href={child.href}
                          onClick={() => setMobileOpen(false)}
                          className="block rounded-lg px-3 py-2 text-sm"
                          style={{ color: mounted ? theme.bodyTextHex + "CC" : "#475569" }}
                        >
                          {child.name[current] || child.name.id}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ) : (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileOpen(false)}
                  className="block rounded-lg px-3 py-2 text-sm font-medium"
                  style={{ color: mounted ? theme.bodyTextHex : "#1e293b" }}
                >
                  {item.name[current] || item.name.id}
                </Link>
              )
            )}
          </div>
        </div>
      )}
    </header>
  );
}

export { Header };
