"use client";

import Link from "next/link";
import { Calendar } from "lucide-react";
import type { Berita } from "@/types";
import { formatDate } from "@/lib/utils";
import { useAppSelector } from "@/store/store";
import { useMounted } from "@/hooks/useMounted";

interface BeritaCardProps {
  berita: Berita;
}

function BeritaCard({ berita }: BeritaCardProps) {
  const theme = useAppSelector((state) => state.theme.current);
  const mounted = useMounted();

  return (
    <Link href={`/berita/${berita.id}`}>
      <article
        className="group overflow-hidden rounded-xl border shadow-sm transition-shadow hover:shadow-md"
        style={{
          backgroundColor: mounted ? theme.cardBgHex : "#ffffff",
          borderColor: mounted ? theme.cardBorderHex : "#e2e8f0",
        }}
      >
        {berita.filepath && (
          <div className="aspect-video overflow-hidden bg-gray-100">
            <img
              src={berita.filepath}
              alt={berita.title}
              className="h-full w-full object-cover transition-transform group-hover:scale-105"
            />
          </div>
        )}
        <div className="p-4">
          <h3
            className="mb-2 line-clamp-2 text-lg font-semibold transition-colors"
            style={{ color: mounted ? theme.bodyTextHex : "#1e293b" }}
          >
            {berita.title}
          </h3>
          <p
            className="mb-3 line-clamp-3 text-sm"
            style={{ color: mounted ? theme.bodyTextHex + "CC" : "#475569" }}
          >
            {berita.description}
          </p>
          <div
            className="flex items-center gap-1.5 text-xs"
            style={{ color: mounted ? theme.bodyTextHex + "99" : "#64748b" }}
          >
            <Calendar className="h-3.5 w-3.5" />
            <span>{formatDate(berita.uploadat)}</span>
          </div>
        </div>
      </article>
    </Link>
  );
}

export { BeritaCard };
