"use client";

import { Eye, Target } from "lucide-react";
import { useLanguage } from "@/hooks/useLanguage";
import { useAppSelector } from "@/store/store";
import { useMounted } from "@/hooks/useMounted";
import { useIdentitas } from "@/hooks/useIdentitas";

export default function VisiMisiPage() {
  const { current } = useLanguage();
  const theme = useAppSelector((state) => state.theme.current);
  const mounted = useMounted();
  const { data: identitas } = useIdentitas();

  const namaFakultas = identitas.nama_fakultas || "";
  const banner = identitas.banner_visimisi || "";
  const visi = identitas[`visi_fakultas_${current}`] || identitas.visi_fakultas_id || "";
  const misiRaw = identitas[`misi_fakultas_${current}`] || identitas.misi_fakultas_id || "";
  const misiItems = misiRaw
    .split("\n")
    .filter((line: string) => line.trim() !== "");

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
            alt="Banner Visi & Misi"
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
          <h1 className="text-3xl font-bold text-white sm:text-4xl">
            {current === "id"
              ? "Visi & Misi"
              : current === "en"
                ? "Vision & Mission"
                : "愿景与使命"}
          </h1>
          <p className="mt-3 max-w-2xl text-lg" style={{ color: "rgba(255,255,255,0.8)" }}>
            {current === "id"
              ? `Arah dan tujuan${namaFakultas ? ` ${namaFakultas}` : ""}`
              : current === "en"
                ? `Direction and goals${namaFakultas ? ` of ${namaFakultas}` : ""}`
                : namaFakultas ? `${namaFakultas}的方向与目标` : "方向与目标"}
          </p>
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
            {visi ? (
              <p className="leading-relaxed text-gray-600">{visi}</p>
            ) : (
              <p className="leading-relaxed text-gray-400 italic">
                {current === "id"
                  ? "Belum ada data visi"
                  : current === "en"
                    ? "No vision data yet"
                    : "暂无愿景数据"}
              </p>
            )}
          </div>

          <div className="rounded-xl border border-gray-200 bg-white p-8 shadow-sm">
            <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-xl" style={{ backgroundColor: mounted ? `${theme.primaryHex}15` : "rgba(37, 99, 235, 0.082)", color: mounted ? theme.primaryHex : "#2563eb" }}>
              <Target className="h-7 w-7" />
            </div>
            <h2 className="mb-4 text-2xl font-bold text-gray-900">
              {current === "id" ? "Misi" : current === "en" ? "Mission" : "使命"}
            </h2>
            {misiItems.length > 0 ? (
              <ul className="space-y-3 text-gray-600">
                {misiItems.map((item: string, index: number) => (
                  <li key={index} className="flex items-start gap-3">
                    <span className="mt-1.5 h-2 w-2 flex-shrink-0 rounded-full" style={{ backgroundColor: mounted ? theme.primaryHex : "#2563eb" }} />
                    <span>{item.trim()}</span>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="leading-relaxed text-gray-400 italic">
                {current === "id"
                  ? "Belum ada data misi"
                  : current === "en"
                    ? "No mission data yet"
                    : "暂无使命数据"}
              </p>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
