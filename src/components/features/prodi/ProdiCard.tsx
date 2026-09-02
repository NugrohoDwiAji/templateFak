"use client";

import Link from "next/link";
import { GraduationCap, ExternalLink } from "lucide-react";
import type { Prodi } from "@/types";
import { useLanguage } from "@/hooks/useLanguage";
import { useAppSelector } from "@/store/store";
import { useMounted } from "@/hooks/useMounted";

interface ProdiCardProps {
  prodi: Prodi;
}

function ProdiCard({ prodi }: ProdiCardProps) {
  const { current, getLocalizedField } = useLanguage();
  const theme = useAppSelector((state) => state.theme.current);
  const mounted = useMounted();

  return (
    <div
      className="group overflow-hidden rounded-xl border p-6 shadow-sm transition-all hover:shadow-md"
      style={{
        backgroundColor: mounted ? theme.cardBgHex : "#ffffff",
        borderColor: mounted ? theme.cardBorderHex : "#e2e8f0",
      }}
    >
      <Link href={`/prodi/${prodi.slug}`}>
        <div
          className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg transition-colors"
          style={{
            backgroundColor: mounted ? theme.primaryHex + "20" : "rgba(37, 99, 235, 0.125)",
            color: mounted ? theme.primaryHex : "#2563eb",
          }}
        >
          <GraduationCap className="h-6 w-6" />
        </div>
        <h3
          className="mb-2 text-lg font-semibold transition-colors"
          style={{ color: mounted ? theme.bodyTextHex : "#1e293b" }}
        >
          {getLocalizedField(prodi, "nama")}
        </h3>
        <p
          className="mb-4 line-clamp-2 text-sm"
          style={{ color: mounted ? theme.bodyTextHex + "CC" : "#475569" }}
        >
          {getLocalizedField(prodi, "visi")}
        </p>
      </Link>

      {prodi.link && (
        <a
          href={prodi.link}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-2 inline-flex w-full items-center justify-center gap-2 rounded-lg px-4 py-2 text-sm font-medium text-white transition-opacity hover:opacity-90"
          style={{ backgroundColor: mounted ? theme.primaryHex : "#2563eb" }}
        >
          <ExternalLink className="h-4 w-4" />
          {current === "id" ? "Kunjungi Website" : current === "en" ? "Visit Website" : "访问网站"}
        </a>
      )}
    </div>
  );
}

export { ProdiCard };
