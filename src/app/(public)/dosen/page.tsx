"use client";

import { useEffect, useState } from "react";
import { Users } from "lucide-react";
import { getDosen } from "@/actions/dosen.actions";
import { DosenCard } from "@/components/features/dosen/DosenCard";
import { useLanguage } from "@/hooks/useLanguage";
import { useAppSelector } from "@/store/store";
import { useMounted } from "@/hooks/useMounted";
import { useIdentitas } from "@/hooks/useIdentitas";
import type { Dosen } from "@/types";

export default function DosenPage() {
  const [dosenList, setDosenList] = useState<Dosen[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { current } = useLanguage();
  const theme = useAppSelector((state) => state.theme.current);
  const mounted = useMounted();
  const { data: identitas } = useIdentitas();

  const banner = identitas.banner_dosen || "";
  const namaFakultas = identitas.nama_fakultas || "";

  useEffect(() => {
    async function fetchDosen() {
      try {
        const result = await getDosen();
        if (result.success && result.data) {
          setDosenList(result.data);
        } else {
          setError(result.error ?? "Gagal memuat data dosen");
        }
      } catch {
        setError("Terjadi kesalahan saat memuat data dosen");
      } finally {
        setLoading(false);
      }
    }
    fetchDosen();
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
            alt="Banner Dosen"
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
            <Users className="h-8 w-8" style={{ color: "rgba(255,255,255,0.7)" }} />
            <h1 className="text-3xl font-bold text-white sm:text-4xl">
              {current === "id"
                ? "Dosen"
                : current === "en"
                  ? "Lecturers"
                  : "讲师"}
            </h1>
          </div>
          <p className="mt-3 max-w-2xl text-lg" style={{ color: "rgba(255,255,255,0.8)" }}>
            {current === "id"
              ? `Daftar dosen pengajar${namaFakultas ? ` di ${namaFakultas}` : ""}`
              : current === "en"
                ? `List of lecturers${namaFakultas ? ` at ${namaFakultas}` : ""}`
                : namaFakultas ? `${namaFakultas}讲师名单` : "讲师名单"}
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
        ) : dosenList.length === 0 ? (
          <div className="py-20 text-center text-gray-500">
            {current === "id"
              ? "Belum ada data dosen"
              : current === "en"
                ? "No lecturers available"
                : "暂无讲师数据"}
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {dosenList.map((dosen) => (
              <DosenCard key={dosen.id} dosen={dosen} />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
