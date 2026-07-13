"use client";

import { Info } from "lucide-react";
import { useLanguage } from "@/hooks/useLanguage";
import { useAppSelector } from "@/store/store";
import { useMounted } from "@/hooks/useMounted";
import { useIdentitas } from "@/hooks/useIdentitas";

export default function InformasiPage() {
  const { current } = useLanguage();
  const theme = useAppSelector((state) => state.theme.current);
  const mounted = useMounted();
  const { data: identitas } = useIdentitas();

  const namaFakultas = identitas.nama_fakultas || "";
  const tentangFakultas = identitas.tentang_fakultas || "";
  const alamat = identitas.alamat_fakultas || "";
  const telepon = identitas.telepon_fakultas || "";
  const email = identitas.email_fakultas || "";
  const jamOperasional = identitas.jam_operasional || "";

  return (
    <div style={{ backgroundColor: mounted ? theme.bodyBgHex : "#f8fafc" }}>
      <section style={{ background: mounted ? `linear-gradient(135deg, ${theme.primaryHex}, ${theme.primaryHex}cc, ${theme.primaryHex}88)` : "linear-gradient(135deg, #2563eb, rgba(37, 99, 235, 0.8), rgba(37, 99, 235, 0.533))" }} className="py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3">
            <Info className="h-8 w-8" style={{ color: "rgba(255,255,255,0.7)" }} />
            <h1 className="text-3xl font-bold text-white sm:text-4xl">
              {current === "id"
                ? "Informasi"
                : current === "en"
                  ? "Information"
                  : "信息"}
            </h1>
          </div>
          <p className="mt-3 max-w-2xl text-lg" style={{ color: "rgba(255,255,255,0.8)" }}>
            {current === "id"
              ? `Informasi umum${namaFakultas ? ` ${namaFakultas}` : ""}`
              : current === "en"
                ? `General information${namaFakultas ? ` about ${namaFakultas}` : ""}`
                : namaFakultas ? `关于${namaFakultas}的一般信息` : "一般信息"}
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-6 lg:grid-cols-2">
          <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
            <h2 className="mb-3 text-xl font-bold text-gray-900">
              {current === "id"
                ? "Tentang Kami"
                : current === "en"
                  ? "About Us"
                  : "关于我们"}
            </h2>
            {tentangFakultas ? (
              <p className="text-gray-600 leading-relaxed">{tentangFakultas}</p>
            ) : (
              <p className="text-gray-400 italic">
                {current === "id"
                  ? "Belum ada data tentang kami"
                  : current === "en"
                    ? "No about data yet"
                    : "暂无关于我们数据"}
              </p>
            )}
          </div>

          <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
            <h2 className="mb-3 text-xl font-bold text-gray-900">
              {current === "id"
                ? "Kontak"
                : current === "en"
                  ? "Contact"
                  : "联系方式"}
            </h2>
            <div className="space-y-3 text-gray-600">
              <div>
                <p className="font-medium text-gray-900">
                  {current === "id"
                    ? "Alamat"
                    : current === "en"
                      ? "Address"
                      : "地址"}
                </p>
                {alamat ? (
                  <p>{alamat}</p>
                ) : (
                  <p className="text-gray-400 italic">-</p>
                )}
              </div>
              <div>
                <p className="font-medium text-gray-900">
                  {current === "id"
                    ? "Telepon"
                    : current === "en"
                      ? "Phone"
                      : "电话"}
                </p>
                {telepon ? (
                  <p>{telepon}</p>
                ) : (
                  <p className="text-gray-400 italic">-</p>
                )}
              </div>
              <div>
                <p className="font-medium text-gray-900">Email</p>
                {email ? (
                  <p>{email}</p>
                ) : (
                  <p className="text-gray-400 italic">-</p>
                )}
              </div>
            </div>
          </div>

          <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
            <h2 className="mb-3 text-xl font-bold text-gray-900">
              {current === "id"
                ? "Jam Operasional"
                : current === "en"
                  ? "Operating Hours"
                  : "营业时间"}
            </h2>
            {jamOperasional ? (
              <div className="space-y-2 text-gray-600">
                {jamOperasional.split("\n").filter((line: string) => line.trim() !== "").map((line: string, index: number) => (
                  <p key={index}>{line.trim()}</p>
                ))}
              </div>
            ) : (
              <p className="text-gray-400 italic">
                {current === "id"
                  ? "Belum ada data jam operasional"
                  : current === "en"
                    ? "No operating hours data yet"
                    : "暂无营业时间数据"}
              </p>
            )}
          </div>

          <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
            <h2 className="mb-3 text-xl font-bold text-gray-900">
              {current === "id"
                ? "Media Sosial"
                : current === "en"
                  ? "Social Media"
                  : "社交媒体"}
            </h2>
            <div className="space-y-3 text-gray-600">
              <p>
                {current === "id"
                  ? "Ikuti kami di media sosial untuk mendapatkan informasi terbaru."
                  : current === "en"
                    ? "Follow us on social media for the latest updates."
                    : "关注我们的社交媒体以获取最新信息。"}
              </p>
              <div className="flex gap-4">
                <span className="rounded-lg px-3 py-2 text-sm font-medium" style={{ backgroundColor: mounted ? `${theme.primaryHex}15` : "rgba(37, 99, 235, 0.082)", color: mounted ? theme.primaryHex : "#2563eb" }}>
                  Instagram
                </span>
                <span className="rounded-lg px-3 py-2 text-sm font-medium" style={{ backgroundColor: mounted ? `${theme.primaryHex}15` : "rgba(37, 99, 235, 0.082)", color: mounted ? theme.primaryHex : "#2563eb" }}>
                  Facebook
                </span>
                <span className="rounded-lg px-3 py-2 text-sm font-medium" style={{ backgroundColor: mounted ? `${theme.primaryHex}15` : "rgba(37, 99, 235, 0.082)", color: mounted ? theme.primaryHex : "#2563eb" }}>
                  YouTube
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
