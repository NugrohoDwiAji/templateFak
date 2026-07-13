"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowRight, Newspaper, Megaphone, Users, HelpCircle, GraduationCap, Award, Building2, Handshake, User } from "lucide-react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { ContactHeader } from "@/components/layout/ContactHeader";
import { BeritaCard } from "@/components/features/berita/BeritaCard";
import { FaqAccordion } from "@/components/features/faq/FaqAccordion";
import { useAppSelector } from "@/store/store";
import { useMounted } from "@/hooks/useMounted";
import { useIdentitas } from "@/hooks/useIdentitas";
import { useLanguage } from "@/hooks/useLanguage";
import { getBerita } from "@/actions/berita.actions";
import { getDosen } from "@/actions/dosen.actions";
import { getFaq } from "@/actions/faq.actions";
import type { Berita, Dosen, Faq } from "@/types";

const quickLinks = [
  { name: "Berita", href: "/berita", icon: Newspaper },
  { name: "Pengumuman", href: "/pengumuman", icon: Megaphone },
  { name: "Dosen", href: "/dosen", icon: Users },
  { name: "FAQ", href: "/faq", icon: HelpCircle },
];

const keunggulan = [
  { icon: GraduationCap, title: "Dosen Berkualitas" },
  { icon: Award, title: "Program Studi Unggulan" },
  { icon: Building2, title: "Fasilitas Modern" },
  { icon: Handshake, title: "Kerjasama Industri" },
];

export default function HomePage() {
  const theme = useAppSelector((state) => state.theme.current);
  const mounted = useMounted();
  const { data: identitas } = useIdentitas();
  const { current } = useLanguage();
  const [recentBerita, setRecentBerita] = useState<Berita[]>([]);
  const [dosenList, setDosenList] = useState<Dosen[]>([]);
  const [faqList, setFaqList] = useState<Faq[]>([]);

  const namaFakultas = identitas.nama_fakultas || "";
  const tagline = identitas.tagline || "";
  const tentangFakultas = identitas.tentang_fakultas || "";
  const gambarTentang = identitas.gambar_tentang || "";
  const misiRaw = identitas[`misi_fakultas_${current}`] || identitas.misi_fakultas_id || "";
  const misiItems = misiRaw
    .split("\n")
    .filter((line: string) => line.trim() !== "");

  useEffect(() => {
    async function fetchBerita() {
      const result = await getBerita();
      if (result.success && result.data) {
        const sorted = [...result.data].sort((a, b) => {
          const dateA = new Date(a.uploadat).getTime();
          const dateB = new Date(b.uploadat).getTime();
          return dateB - dateA;
        });
        setRecentBerita(sorted.slice(0, 6));
      }
    }

    async function fetchDosen() {
      const result = await getDosen();
      if (result.success && result.data) {
        setDosenList(result.data);
      }
    }

    async function fetchFaq() {
      const result = await getFaq();
      if (result.success && result.data) {
        setFaqList(result.data.slice(0, 5));
      }
    }

    fetchBerita();
    fetchDosen();
    fetchFaq();
  }, []);

  return (
    <div
      className="flex min-h-screen flex-col"
      style={{ backgroundColor: mounted ? theme.bodyBgHex : "#f8fafc" }}
    >
      <ContactHeader />
      <Header />

      <main className="flex-1">
        <section
          className="relative overflow-hidden"
          style={{
            background: mounted
              ? `linear-gradient(135deg, ${theme.primaryHex}, ${theme.primaryHex}DD, ${theme.primaryHex}AA)`
              : "linear-gradient(135deg, #2563eb, rgba(37, 99, 235, 0.867), rgba(37, 99, 235, 0.667))",
          }}
        >
          <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10" />
          <div className="relative mx-auto max-w-7xl px-4 py-24 sm:px-6 sm:py-32 lg:px-8">
            <div className="max-w-2xl">
              {namaFakultas && (
                <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl">
                  {namaFakultas}
                </h1>
              )}
              {tagline && (
                <p className="mt-6 text-lg leading-8 text-white/80">
                  {tagline}
                </p>
              )}
              <div className="mt-10 flex items-center gap-x-6">
                <Link
                  href="/prodi"
                  className="rounded-lg bg-white px-6 py-3 text-sm font-semibold shadow-sm transition-colors hover:opacity-90"
                  style={{ color: mounted ? theme.primaryHex : "#2563eb" }}
                >
                  Lihat Program Studi
                </Link>
                <Link
                  href="/berita"
                  className="flex items-center gap-2 text-sm font-semibold text-white transition-colors hover:text-white/80"
                >
                  Baca Berita
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <h2
            className="mb-8 text-2xl font-bold"
            style={{ color: mounted ? theme.bodyTextHex : "#1e293b" }}
          >
            Akses Cepat
          </h2>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {quickLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="group rounded-xl border p-6 shadow-sm transition-all hover:shadow-md"
                style={{
                  backgroundColor: mounted ? theme.cardBgHex : "#ffffff",
                  borderColor: mounted ? theme.cardBorderHex : "#e2e8f0",
                }}
              >
                <div
                  className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg transition-colors"
                  style={{
                    backgroundColor: mounted ? theme.primaryHex + "20" : "rgba(37, 99, 235, 0.125)",
                    color: mounted ? theme.primaryHex : "#2563eb",
                  }}
                >
                  <link.icon className="h-6 w-6" />
                </div>
                <h3
                  className="mb-1 font-semibold transition-colors"
                  style={{ color: mounted ? theme.bodyTextHex : "#1e293b" }}
                >
                  {link.name}
                </h3>
              </Link>
            ))}
          </div>
        </section>

        {tentangFakultas && (
          <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
            <div className="grid items-center gap-8 lg:grid-cols-2">
              {gambarTentang && (
                <div className="overflow-hidden rounded-2xl">
                  <img
                    src={gambarTentang}
                    alt={namaFakultas ? `Tentang ${namaFakultas}` : "Tentang Fakultas"}
                    className="h-full w-full object-cover"
                  />
                </div>
              )}
              <div>
                {namaFakultas && (
                  <>
                    <h2
                      className="mb-4 text-2xl font-bold sm:text-3xl"
                      style={{ color: mounted ? theme.bodyTextHex : "#1e293b" }}
                    >
                      Tentang {namaFakultas}
                    </h2>
                    <div
                      className="mb-6 h-1 w-16 rounded"
                      style={{ backgroundColor: mounted ? theme.primaryHex : "#2563eb" }}
                    />
                  </>
                )}
                <p
                  className="mb-6 leading-relaxed"
                  style={{ color: mounted ? theme.bodyTextHex + "CC" : "#475569" }}
                >
                  {tentangFakultas}
                </p>
                <Link
                  href="/visimisi"
                  className="inline-flex items-center gap-2 rounded-lg px-6 py-3 text-sm font-semibold text-white transition-opacity hover:opacity-90"
                  style={{ backgroundColor: mounted ? theme.primaryHex : "#2563eb" }}
                >
                  Selengkapnya
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>
          </section>
        )}

        {recentBerita.length > 0 && (
          <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
            <div className="mb-8 flex items-center justify-between">
              <h2
                className="text-2xl font-bold"
                style={{ color: mounted ? theme.bodyTextHex : "#1e293b" }}
              >
                Berita Terbaru
              </h2>
              <Link
                href="/berita"
                className="flex items-center gap-1.5 text-sm font-medium transition-colors hover:opacity-80"
                style={{ color: mounted ? theme.primaryHex : "#2563eb" }}
              >
                Lihat Semua
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {recentBerita.map((berita) => (
                <BeritaCard key={berita.id} berita={berita} />
              ))}
            </div>
          </section>
        )}

        {keunggulan.length > 0 && (
          <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
            <div className="mb-10 text-center">
              <h2
                className="text-2xl font-bold sm:text-3xl"
                style={{ color: mounted ? theme.bodyTextHex : "#1e293b" }}
              >
                {namaFakultas ? `Kenapa Harus ${namaFakultas}?` : "Keunggulan Kami"}
              </h2>
            </div>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {keunggulan.map((item) => (
                <div
                  key={item.title}
                  className="rounded-xl border p-6 shadow-sm transition-shadow hover:shadow-md"
                  style={{
                    backgroundColor: mounted ? theme.cardBgHex : "#ffffff",
                    borderColor: mounted ? theme.cardBorderHex : "#e2e8f0",
                  }}
                >
                  <div
                    className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg"
                    style={{
                      backgroundColor: mounted ? theme.primaryHex + "20" : "rgba(37, 99, 235, 0.125)",
                      color: mounted ? theme.primaryHex : "#2563eb",
                    }}
                  >
                    <item.icon className="h-6 w-6" />
                  </div>
                  <h3
                    className="mb-2 font-semibold"
                    style={{ color: mounted ? theme.bodyTextHex : "#1e293b" }}
                  >
                    {item.title}
                  </h3>
                </div>
              ))}
            </div>
          </section>
        )}

        {misiItems.length > 0 && (
          <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
            <div className="mb-10 text-center">
              <h2
                className="text-2xl font-bold sm:text-3xl"
                style={{ color: mounted ? theme.bodyTextHex : "#1e293b" }}
              >
                Misi Kami
              </h2>
            </div>
            <div className="mx-auto max-w-3xl space-y-4">
              {misiItems.map((item: string, index: number) => (
                <div
                  key={index}
                  className="flex items-start gap-3 rounded-xl border p-4"
                  style={{
                    backgroundColor: mounted ? theme.cardBgHex : "#ffffff",
                    borderColor: mounted ? theme.cardBorderHex : "#e2e8f0",
                  }}
                >
                  <span
                    className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full text-xs font-bold text-white"
                    style={{ backgroundColor: mounted ? theme.primaryHex : "#2563eb" }}
                  >
                    {index + 1}
                  </span>
                  <p
                    className="text-sm leading-relaxed"
                    style={{ color: mounted ? theme.bodyTextHex + "CC" : "#475569" }}
                  >
                    {item.trim()}
                  </p>
                </div>
              ))}
            </div>
          </section>
        )}

        {dosenList.length > 0 && (
          <section className="py-16">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
              <h2
                className="mb-8 text-2xl font-bold"
                style={{ color: mounted ? theme.bodyTextHex : "#1e293b" }}
              >
                Tim Dosen Kami
              </h2>
            </div>
            <div className="overflow-hidden">
              <div className="animate-marquee flex w-max gap-5">
                {(() => {
                  const uniqueDosen = dosenList.filter(
                    (d, i, arr) => arr.findIndex((x) => x.id === d.id) === i
                  );
                  return [...uniqueDosen, ...uniqueDosen].map((dosen, index) => (
                    <div
                      key={`${dosen.id}-${index}`}
                      className="flex items-center gap-4 rounded-2xl border px-6 py-5 shadow-sm transition-shadow hover:shadow-lg"
                      style={{
                        backgroundColor: mounted ? theme.cardBgHex : "#ffffff",
                        borderColor: mounted ? theme.cardBorderHex : "#e2e8f0",
                        minWidth: "340px",
                      }}
                    >
                      <div className="h-20 w-20 flex-shrink-0 overflow-hidden rounded-full bg-gray-100">
                        {dosen.foto ? (
                          <img
                            src={dosen.foto}
                            alt={dosen.nama}
                            className="h-full w-full object-cover"
                          />
                        ) : (
                          <div className="flex h-full w-full items-center justify-center">
                            <User className="h-8 w-8 text-gray-300" />
                          </div>
                        )}
                      </div>
                      <div className="min-w-0">
                        <h3
                          className="truncate text-lg font-semibold"
                          style={{ color: mounted ? theme.bodyTextHex : "#1e293b" }}
                        >
                          {dosen.nama}
                        </h3>
                        <p
                          className="text-sm"
                          style={{ color: mounted ? theme.bodyTextHex + "99" : "#64748b" }}
                        >
                          NIK: {dosen.nik}
                        </p>
                      </div>
                    </div>
                  ));
                })()}
              </div>
            </div>
          </section>
        )}

        {faqList.length > 0 && (
          <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
            <div className="mb-8 flex items-center justify-between">
              <h2
                className="text-2xl font-bold"
                style={{ color: mounted ? theme.bodyTextHex : "#1e293b" }}
              >
                Frequently Asked Questions
              </h2>
              <Link
                href="/faq"
                className="flex items-center gap-1.5 text-sm font-medium transition-colors hover:opacity-80"
                style={{ color: mounted ? theme.primaryHex : "#2563eb" }}
              >
                Selengkapnya
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
            <div className="mx-auto max-w-3xl space-y-3">
              {faqList.map((faq) => (
                <FaqAccordion key={faq.id} faq={faq} />
              ))}
            </div>
          </section>
        )}
      </main>

      <Footer />
    </div>
  );
}
