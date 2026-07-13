"use client";

import { useEffect, useState } from "react";
import { Megaphone } from "lucide-react";
import { getPengumuman } from "@/actions/pengumuman.actions";
import { PengumumanCard } from "@/components/features/pengumuman/PengumumanCard";
import { useLanguage } from "@/hooks/useLanguage";
import { useAppSelector } from "@/store/store";
import { useMounted } from "@/hooks/useMounted";
import { useIdentitas } from "@/hooks/useIdentitas";
import type { Pengumuman } from "@/types";

export default function PengumumanPage() {
  const [pengumumanList, setPengumumanList] = useState<Pengumuman[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { current } = useLanguage();
  const theme = useAppSelector((state) => state.theme.current);
  const mounted = useMounted();
  const { data: identitas } = useIdentitas();

  const banner = identitas.banner_pengumuman || "";

  useEffect(() => {
    async function fetchPengumuman() {
      try {
        const result = await getPengumuman();
        if (result.success && result.data) {
          setPengumumanList(result.data);
        } else {
          setError(result.error ?? "Gagal memuat pengumuman");
        }
      } catch {
        setError("Terjadi kesalahan saat memuat pengumuman");
      } finally {
        setLoading(false);
      }
    }
    fetchPengumuman();
  }, []);

  return (
    <div style={{ backgroundColor: mounted ? theme.bodyBgHex : "#f8fafc" }}>
      <section
        className="relative overflow-hidden py-16"
        style={{
          background: banner
            ? undefined
            : mounted
              ? `linear-gradient(135deg, ${theme.primaryHex}, ${theme.primaryHex}cc, ${theme.primaryHex}88)`
              : "linear-gradient(135deg, #2563eb, rgba(37, 99, 235, 0.8), rgba(37, 99, 235, 0.533))",
        }}
      >
        {banner && (
          <img
            src={banner}
            alt="Banner Pengumuman"
            className="absolute inset-0 h-full w-full object-cover"
          />
        )}
        <div
          className="absolute inset-0"
          style={{
            backgroundColor: banner ? "rgba(0,0,0,0.4)" : undefined,
          }}
        />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3">
            <Megaphone className="h-8 w-8" style={{ color: "rgba(255,255,255,0.7)" }} />
            <h1 className="text-3xl font-bold text-white sm:text-4xl">
              {current === "id"
                ? "Pengumuman"
                : current === "en"
                  ? "Announcements"
                  : "公告"}
            </h1>
          </div>
          <p className="mt-3 max-w-2xl text-lg" style={{ color: "rgba(255,255,255,0.8)" }}>
            {current === "id"
              ? "Pengumuman penting untuk mahasiswa dan civitas akademika"
              : current === "en"
                ? "Important announcements for students and academic community"
                : "面向学生和学术界的重要公告"}
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        {loading ? (
          <div className="flex items-center justify-center py-20">
            <div className="h-8 w-8 animate-spin rounded-full border-4" style={{ borderRightColor: mounted ? theme.primaryHex : "#2563eb", borderBottomColor: mounted ? theme.primaryHex : "#2563eb", borderLeftColor: mounted ? theme.primaryHex : "#2563eb", borderTopColor: "transparent" }} />
          </div>
        ) : error ? (
          <div className="rounded-xl border border-red-200 bg-red-50 p-6 text-center text-red-700">
            {error}
          </div>
        ) : pengumumanList.length === 0 ? (
          <div className="py-20 text-center text-gray-500">
            {current === "id"
              ? "Belum ada pengumuman"
              : current === "en"
                ? "No announcements available"
                : "暂无公告"}
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {pengumumanList.map((pengumuman) => (
              <PengumumanCard key={pengumuman.id} pengumuman={pengumuman} />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
