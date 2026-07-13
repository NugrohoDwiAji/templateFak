"use client";

import { useEffect, useState, use } from "react";
import { ArrowLeft, Eye, Target } from "lucide-react";
import Link from "next/link";
import { getProdiBySlug } from "@/actions/prodi.actions";
import { useLanguage } from "@/hooks/useLanguage";
import { useAppSelector } from "@/store/store";
import { useMounted } from "@/hooks/useMounted";
import type { Prodi } from "@/types";

export default function ProdiDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = use(params);
  const [prodi, setProdi] = useState<Prodi | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { current, getLocalizedField } = useLanguage();
  const theme = useAppSelector((state) => state.theme.current);
  const mounted = useMounted();

  useEffect(() => {
    async function fetchProdi() {
      try {
        const result = await getProdiBySlug(slug);
        if (result.success && result.data) {
          setProdi(result.data);
        } else {
          setError(result.error ?? "Program studi tidak ditemukan");
        }
      } catch {
        setError("Terjadi kesalahan saat memuat data program studi");
      } finally {
        setLoading(false);
      }
    }
    fetchProdi();
  }, [slug]);

  if (loading) {
    return (
      <div className="flex min-h-[50vh] items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-4" style={{ borderRightColor: mounted ? theme.primaryHex : "#2563eb", borderBottomColor: mounted ? theme.primaryHex : "#2563eb", borderLeftColor: mounted ? theme.primaryHex : "#2563eb", borderTopColor: "transparent" }} />
      </div>
    );
  }

  if (error || !prodi) {
    return (
      <div className="mx-auto max-w-7xl px-4 py-20 text-center sm:px-6 lg:px-8">
        <p className="text-lg text-red-600">{error ?? "Program studi tidak ditemukan"}</p>
        <Link
          href="/"
          className="mt-4 inline-flex items-center gap-2"
          style={{ color: mounted ? theme.primaryHex : "#2563eb" }}
        >
          <ArrowLeft className="h-4 w-4" />
          {current === "id" ? "Kembali ke Beranda" : current === "en" ? "Back to Home" : "返回首页"}
        </Link>
      </div>
    );
  }

  return (
    <div style={{ backgroundColor: mounted ? theme.bodyBgHex : "#f8fafc" }}>
      <section style={{ background: mounted ? `linear-gradient(135deg, ${theme.primaryHex}, ${theme.primaryHex}cc, ${theme.primaryHex}88)` : "linear-gradient(135deg, #2563eb, rgba(37, 99, 235, 0.8), rgba(37, 99, 235, 0.533))" }} className="py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Link
            href="/"
            className="mb-4 inline-flex items-center gap-2 hover:text-white"
            style={{ color: "rgba(255,255,255,0.7)" }}
          >
            <ArrowLeft className="h-4 w-4" />
            {current === "id" ? "Kembali" : current === "en" ? "Back" : "返回"}
          </Link>
          <h1 className="text-3xl font-bold text-white sm:text-4xl">
            {getLocalizedField(prodi, "nama") || prodi.nama}
          </h1>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-2">
          <div className="rounded-xl border border-gray-200 bg-white p-8 shadow-sm">
            <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-xl" style={{ backgroundColor: mounted ? `${theme.primaryHex}15` : "rgba(37, 99, 235, 0.082)", color: mounted ? theme.primaryHex : "#2563eb" }}>
              <Eye className="h-7 w-7" />
            </div>
            <h2 className="mb-4 text-2xl font-bold text-gray-900">
              {current === "id" ? "Visi" : current === "en" ? "Vision" : "愿景"}
            </h2>
            <p className="leading-relaxed text-gray-600">
              {getLocalizedField(prodi, "visi") || prodi.visi}
            </p>
          </div>

          <div className="rounded-xl border border-gray-200 bg-white p-8 shadow-sm">
            <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-xl" style={{ backgroundColor: mounted ? `${theme.primaryHex}15` : "rgba(37, 99, 235, 0.082)", color: mounted ? theme.primaryHex : "#2563eb" }}>
              <Target className="h-7 w-7" />
            </div>
            <h2 className="mb-4 text-2xl font-bold text-gray-900">
              {current === "id" ? "Misi" : current === "en" ? "Mission" : "使命"}
            </h2>
            <div className="leading-relaxed text-gray-600 whitespace-pre-line">
              {getLocalizedField(prodi, "misi") || prodi.misi}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
