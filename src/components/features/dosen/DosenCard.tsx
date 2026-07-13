"use client";

import { User } from "lucide-react";
import type { Dosen } from "@/types";
import { useLanguage } from "@/hooks/useLanguage";

interface DosenCardProps {
  dosen: Dosen;
}

function DosenCard({ dosen }: DosenCardProps) {
  const { getLocalizedField } = useLanguage();

  return (
    <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm transition-shadow hover:shadow-md">
      <div className="flex aspect-square items-center justify-center bg-gray-100">
        {dosen.foto ? (
          <img
            src={dosen.foto}
            alt={dosen.nama}
            className="h-full w-full object-cover"
          />
        ) : (
          <User className="h-16 w-16 text-gray-300" />
        )}
      </div>
      <div className="p-4">
        <h3 className="mb-1 font-semibold text-gray-900">
          {getLocalizedField(dosen, "nama")}
        </h3>
        <p className="text-sm text-gray-500">{dosen.jenis_dosen}</p>
      </div>
    </div>
  );
}

export { DosenCard };
