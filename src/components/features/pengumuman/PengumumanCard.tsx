"use client";

import { Download, Calendar } from "lucide-react";
import type { Pengumuman } from "@/types";
import { formatDate } from "@/lib/utils";
import { useAppSelector } from "@/store/store";
import { useMounted } from "@/hooks/useMounted";

interface PengumumanCardProps {
  pengumuman: Pengumuman;
}

function PengumumanCard({ pengumuman }: PengumumanCardProps) {
  const theme = useAppSelector((state) => state.theme.current);
  const mounted = useMounted();

  return (
    <div
      className="flex items-start gap-4 rounded-xl border p-4 shadow-sm transition-shadow hover:shadow-md"
      style={{
        backgroundColor: mounted ? theme.cardBgHex : "#ffffff",
        borderColor: mounted ? theme.cardBorderHex : "#e2e8f0",
      }}
    >
      <div
        className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-lg"
        style={{
          backgroundColor: mounted ? theme.primaryHex + "20" : "rgba(37, 99, 235, 0.125)",
          color: mounted ? theme.primaryHex : "#2563eb",
        }}
      >
        <Calendar className="h-6 w-6" />
      </div>
      <div className="min-w-0 flex-1">
        <h3
          className="mb-1 font-semibold"
          style={{ color: mounted ? theme.bodyTextHex : "#1e293b" }}
        >
          {pengumuman.title}
        </h3>
        <p
          className="text-sm"
          style={{ color: mounted ? theme.bodyTextHex + "99" : "#64748b" }}
        >
          {formatDate(pengumuman.uploadat)}
        </p>
      </div>
      <a
        href={pengumuman.file_path}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center gap-1.5 rounded-lg px-3 py-2 text-sm font-medium text-white transition-colors hover:opacity-90"
        style={{ backgroundColor: mounted ? theme.buttonPrimaryHex : "#2563eb" }}
      >
        <Download className="h-4 w-4" />
        Unduh
      </a>
    </div>
  );
}

export { PengumumanCard };
