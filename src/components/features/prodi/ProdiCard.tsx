"use client";

import Link from "next/link";
import { GraduationCap } from "lucide-react";
import type { Prodi } from "@/types";
import { useLanguage } from "@/hooks/useLanguage";
import { useAppSelector } from "@/store/store";
import { useMounted } from "@/hooks/useMounted";

interface ProdiCardProps {
  prodi: Prodi;
}

function ProdiCard({ prodi }: ProdiCardProps) {
  const { getLocalizedField } = useLanguage();
  const theme = useAppSelector((state) => state.theme.current);
  const mounted = useMounted();

  return (
    <Link href={`/prodi/${prodi.slug}`}>
      <div
        className="group overflow-hidden rounded-xl border p-6 shadow-sm transition-all hover:shadow-md"
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
          <GraduationCap className="h-6 w-6" />
        </div>
        <h3
          className="mb-2 text-lg font-semibold transition-colors"
          style={{ color: mounted ? theme.bodyTextHex : "#1e293b" }}
        >
          {getLocalizedField(prodi, "nama")}
        </h3>
        <p
          className="line-clamp-2 text-sm"
          style={{ color: mounted ? theme.bodyTextHex + "CC" : "#475569" }}
        >
          {getLocalizedField(prodi, "visi")}
        </p>
      </div>
    </Link>
  );
}

export { ProdiCard };
