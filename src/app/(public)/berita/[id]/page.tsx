"use client";

import { useEffect, useState, use } from "react";
import { Calendar, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { getBeritaById } from "@/actions/berita.actions";
import { useLanguage } from "@/hooks/useLanguage";
import { useAppSelector } from "@/store/store";
import { useMounted } from "@/hooks/useMounted";
import { formatDate } from "@/lib/utils";
import type { Berita } from "@/types";

export default function BeritaDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const [berita, setBerita] = useState<Berita | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { current, getLocalizedField } = useLanguage();
  const theme = useAppSelector((state) => state.theme.current);
  const mounted = useMounted();

  useEffect(() => {
    async function fetchBerita() {
      try {
        const result = await getBeritaById(id);
        if (result.success && result.data) {
          setBerita(result.data);
        } else {
          setError(result.error ?? "Berita tidak ditemukan");
        }
      } catch {
        setError("Terjadi kesalahan saat memuat berita");
      } finally {
        setLoading(false);
      }
    }
    fetchBerita();
  }, [id]);

  if (loading) {
    return (
      <div className="flex min-h-[50vh] items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-4" style={{ borderRightColor: mounted ? theme.primaryHex : "#2563eb", borderBottomColor: mounted ? theme.primaryHex : "#2563eb", borderLeftColor: mounted ? theme.primaryHex : "#2563eb", borderTopColor: "transparent" }} />
      </div>
    );
  }

  if (error || !berita) {
    return (
      <div className="mx-auto max-w-7xl px-4 py-20 text-center sm:px-6 lg:px-8">
        <p className="text-lg text-red-600">{error ?? "Berita tidak ditemukan"}</p>
        <Link
          href="/berita"
          className="mt-4 inline-flex items-center gap-2"
          style={{ color: mounted ? theme.primaryHex : "#2563eb" }}
        >
          <ArrowLeft className="h-4 w-4" />
          {current === "id" ? "Kembali ke Berita" : current === "en" ? "Back to News" : "返回新闻"}
        </Link>
      </div>
    );
  }

  return (
    <div style={{ backgroundColor: mounted ? theme.bodyBgHex : "#f8fafc" }}>
      <section style={{ background: mounted ? `linear-gradient(135deg, ${theme.primaryHex}, ${theme.primaryHex}cc, ${theme.primaryHex}88)` : "linear-gradient(135deg, #2563eb, rgba(37, 99, 235, 0.8), rgba(37, 99, 235, 0.533))" }} className="py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Link
            href="/berita"
            className="mb-4 inline-flex items-center gap-2 hover:text-white"
            style={{ color: "rgba(255,255,255,0.7)" }}
          >
            <ArrowLeft className="h-4 w-4" />
            {current === "id" ? "Kembali" : current === "en" ? "Back" : "返回"}
          </Link>
          <h1 className="text-3xl font-bold text-white sm:text-4xl">
            {berita.title}
          </h1>
          <div className="mt-3 flex items-center gap-2" style={{ color: "rgba(255,255,255,0.7)" }}>
            <Calendar className="h-4 w-4" />
            <span>{formatDate(berita.uploadat)}</span>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <article className="mx-auto max-w-3xl">
          {berita.filepath && (
            <div className="mb-8 overflow-hidden rounded-xl">
              <img
                src={berita.filepath}
                alt={berita.title}
                className="h-auto w-full object-cover"
              />
            </div>
          )}
          <div className="prose prose-blue max-w-none">
            <p className="whitespace-pre-wrap text-gray-700 leading-relaxed">
              {getLocalizedField(berita, "description") || berita.description}
            </p>
          </div>
        </article>
      </section>
    </div>
  );
}
