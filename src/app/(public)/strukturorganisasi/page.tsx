"use client";

import { Network } from "lucide-react";
import { useLanguage } from "@/hooks/useLanguage";
import { useAppSelector } from "@/store/store";
import { useMounted } from "@/hooks/useMounted";
import { useIdentitas } from "@/hooks/useIdentitas";

export default function StrukturOrganisasiPage() {
  const { current } = useLanguage();
  const theme = useAppSelector((state) => state.theme.current);
  const mounted = useMounted();
  const { data: identitas } = useIdentitas();

  const banner = identitas.banner_struktur || "";
  const strukturImage = identitas.struktur_organisasi || "";
  const namaFakultas = identitas.nama_fakultas || "";

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
            alt="Banner Struktur"
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
            <Network className="h-8 w-8" style={{ color: "rgba(255,255,255,0.7)" }} />
            <h1 className="text-3xl font-bold text-white sm:text-4xl">
              {current === "id"
                ? "Struktur Organisasi"
                : current === "en"
                  ? "Organizational Structure"
                  : "组织结构"}
            </h1>
          </div>
          <p className="mt-3 max-w-2xl text-lg" style={{ color: "rgba(255,255,255,0.8)" }}>
            {current === "id"
              ? `Struktur organisasi${namaFakultas ? ` ${namaFakultas}` : ""}`
              : current === "en"
                ? `Organizational structure${namaFakultas ? ` of ${namaFakultas}` : ""}`
                : namaFakultas ? `${namaFakultas}组织结构` : "组织结构"}
          </p>
        </div>
      </section>

      {strukturImage && (
        <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-4xl">
            <div className="overflow-hidden rounded-xl border border-gray-200 bg-white p-8 shadow-sm">
              <img
                src={strukturImage}
                alt="Struktur Organisasi"
                className="w-full object-contain"
              />
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
