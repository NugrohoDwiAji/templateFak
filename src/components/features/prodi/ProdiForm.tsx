"use client";

import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { MultiLangInput } from "@/components/features/language/MultiLangInput";
import type { Prodi } from "@/types";

interface ProdiFormProps {
  initialData?: Prodi;
  onSubmit: (data: {
    nama: string;
    nama_en: string;
    nama_cn: string;
    slug: string;
    link?: string;
    visi: string;
    visi_en: string;
    visi_cn: string;
    misi: string;
    misi_en: string;
    misi_cn: string;
  }) => Promise<void>;
  onCancel: () => void;
}

function ProdiForm({ initialData, onSubmit, onCancel }: ProdiFormProps) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [form, setForm] = useState({
    nama: initialData?.nama ?? "",
    nama_en: initialData?.nama_en ?? "",
    nama_cn: initialData?.nama_cn ?? "",
    slug: initialData?.slug ?? "",
    link: initialData?.link ?? "",
    visi: initialData?.visi ?? "",
    visi_en: initialData?.visi_en ?? "",
    visi_cn: initialData?.visi_cn ?? "",
    misi: initialData?.misi ?? "",
    misi_en: initialData?.misi_en ?? "",
    misi_cn: initialData?.misi_cn ?? "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      await onSubmit(form);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Terjadi kesalahan saat menyimpan data");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {error && (
        <div className="rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-700">
          {error}
        </div>
      )}
      <MultiLangInput
        label="Nama"
        value_id={form.nama}
        value_en={form.nama_en}
        value_cn={form.nama_cn}
        onChange={(lang, value) =>
          setForm((prev) => ({
            ...prev,
            [`nama${lang === "id" ? "" : `_${lang}`}`]: value,
          }))
        }
      />

      <Input
        label="Slug"
        value={form.slug}
        onChange={(e) => setForm((prev) => ({ ...prev, slug: e.target.value }))}
        required
      />

      <Input
        label="Link (opsional)"
        value={form.link}
        onChange={(e) => setForm((prev) => ({ ...prev, link: e.target.value }))}
      />

      <MultiLangInput
        label="Visi"
        value_id={form.visi}
        value_en={form.visi_en}
        value_cn={form.visi_cn}
        onChange={(lang, value) =>
          setForm((prev) => ({
            ...prev,
            [`visi${lang === "id" ? "" : `_${lang}`}`]: value,
          }))
        }
        type="textarea"
      />

      <MultiLangInput
        label="Misi"
        value_id={form.misi}
        value_en={form.misi_en}
        value_cn={form.misi_cn}
        onChange={(lang, value) =>
          setForm((prev) => ({
            ...prev,
            [`misi${lang === "id" ? "" : `_${lang}`}`]: value,
          }))
        }
        type="textarea"
      />

      <div className="flex justify-end gap-2">
        <Button type="button" variant="ghost" onClick={onCancel}>
          Batal
        </Button>
        <Button type="submit" loading={loading}>
          {initialData ? "Perbarui" : "Simpan"}
        </Button>
      </div>
    </form>
  );
}

export { ProdiForm };
