"use client";

import { useEffect, useState } from "react";
import { useAppSelector } from "@/store/store";
import { useMounted } from "@/hooks/useMounted";
import { useIdentitas } from "@/hooks/useIdentitas";
import { Card, CardContent } from "@/components/ui/Card";
import { getBerita } from "@/actions/berita.actions";
import { getPengumuman } from "@/actions/pengumuman.actions";
import { getDosen } from "@/actions/dosen.actions";
import { getProdi } from "@/actions/prodi.actions";
import { getFaq } from "@/actions/faq.actions";
import { getBerkas } from "@/actions/berkas.actions";
import {
  Newspaper,
  Megaphone,
  GraduationCap,
  BookOpen,
  HelpCircle,
  FileText,
} from "lucide-react";

interface StatCard {
  title: string;
  count: number;
  icon: React.ReactNode;
  color: string;
}

export default function DashboardPage() {
  const theme = useAppSelector((state) => state.theme.current);
  const mounted = useMounted();
  const { data: identitas } = useIdentitas();
  const [stats, setStats] = useState<StatCard[]>([]);
  const [loading, setLoading] = useState(true);

  const namaFakultas = identitas.nama_fakultas || "";

  useEffect(() => {
    async function fetchStats() {
      const [berita, pengumuman, dosen, prodi, faq, berkas] = await Promise.all(
        [getBerita(), getPengumuman(), getDosen(), getProdi(), getFaq(), getBerkas()]
      );

      setStats([
        {
          title: "Berita",
          count: berita.success ? (berita.data?.length ?? 0) : 0,
          icon: <Newspaper className="h-6 w-6" />,
          color: theme.primaryHex,
        },
        {
          title: "Pengumuman",
          count: pengumuman.success ? (pengumuman.data?.length ?? 0) : 0,
          icon: <Megaphone className="h-6 w-6" />,
          color: "bg-green-500",
        },
        {
          title: "Dosen",
          count: dosen.success ? (dosen.data?.length ?? 0) : 0,
          icon: <GraduationCap className="h-6 w-6" />,
          color: "bg-purple-500",
        },
        {
          title: "Program Studi",
          count: prodi.success ? (prodi.data?.length ?? 0) : 0,
          icon: <BookOpen className="h-6 w-6" />,
          color: "bg-orange-500",
        },
        {
          title: "FAQ",
          count: faq.success ? (faq.data?.length ?? 0) : 0,
          icon: <HelpCircle className="h-6 w-6" />,
          color: "bg-cyan-500",
        },
        {
          title: "Berkas",
          count: berkas.success ? (berkas.data?.length ?? 0) : 0,
          icon: <FileText className="h-6 w-6" />,
          color: "bg-rose-500",
        },
      ]);
      setLoading(false);
    }

    fetchStats();
  }, [theme.primaryHex]);

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-t-transparent" style={{ borderColor: `${mounted ? theme.primaryHex : "#2563eb"} transparent transparent transparent` }} />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-600">Selamat datang di panel admin{namaFakultas ? ` ${namaFakultas}` : ""}</p>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {stats.map((stat) => (
          <Card key={stat.title} className="hover:shadow-md transition-shadow">
            <CardContent className="flex items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-lg text-white" style={{ backgroundColor: stat.color }}>
                {stat.icon}
              </div>
              <div>
                <p className="text-sm text-gray-600">{stat.title}</p>
                <p className="text-2xl font-bold text-gray-900">{stat.count}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
