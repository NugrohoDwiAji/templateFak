"use client";

import { Download, File } from "lucide-react";
import type { Berkas } from "@/types";
import { useLanguage } from "@/hooks/useLanguage";

interface BerkasCardProps {
  berkas: Berkas;
}

function BerkasCard({ berkas }: BerkasCardProps) {
  const { current } = useLanguage();

  const displayTitle =
    (current === "en" ? berkas.title_en : current === "cn" ? berkas.title_cn : berkas.title) ||
    berkas.title;

  return (
    <div className="flex items-center gap-4 rounded-xl border border-gray-200 bg-white p-4 shadow-sm transition-shadow hover:shadow-md">
      <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-lg bg-green-50 text-green-600">
        <File className="h-6 w-6" />
      </div>
      <div className="min-w-0 flex-1">
        <h3 className="truncate font-semibold text-gray-900">{displayTitle}</h3>
      </div>
      <a
        href={berkas.filepath}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center gap-1.5 rounded-lg bg-green-600 px-3 py-2 text-sm font-medium text-white hover:bg-green-700"
      >
        <Download className="h-4 w-4" />
        Unduh
      </a>
    </div>
  );
}

export { BerkasCard };
