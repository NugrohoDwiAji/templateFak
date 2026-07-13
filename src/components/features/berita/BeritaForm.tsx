"use client";

import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { FileDropZone } from "@/components/ui/FileDropZone";
import { MultiLangInput } from "@/components/features/language/MultiLangInput";
import type { Berita } from "@/types";

interface BeritaFormProps {
  initialData?: Berita;
  onSubmit: (data: {
    title: string;
    title_en: string;
    title_cn: string;
    description: string;
    description_en: string;
    description_cn: string;
    file?: File;
  }) => Promise<void>;
  onCancel: () => void;
}

function BeritaForm({ initialData, onSubmit, onCancel }: BeritaFormProps) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [file, setFile] = useState<File | null>(null);
  const [form, setForm] = useState({
    title: initialData?.title ?? "",
    title_en: initialData?.title_en ?? "",
    title_cn: initialData?.title_cn ?? "",
    description: initialData?.description ?? "",
    description_en: initialData?.description_en ?? "",
    description_cn: initialData?.description_cn ?? "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      await onSubmit({ ...form, file: file ?? undefined });
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
        label="Judul"
        value_id={form.title}
        value_en={form.title_en}
        value_cn={form.title_cn}
        onChange={(lang, value) =>
          setForm((prev) => ({
            ...prev,
            [`title${lang === "id" ? "" : `_${lang}`}`]: value,
          }))
        }
      />

      <MultiLangInput
        label="Deskripsi"
        value_id={form.description}
        value_en={form.description_en}
        value_cn={form.description_cn}
        onChange={(lang, value) =>
          setForm((prev) => ({
            ...prev,
            [`description${lang === "id" ? "" : `_${lang}`}`]: value,
          }))
        }
        type="textarea"
      />

      <div className="space-y-1">
        <label className="text-sm font-medium text-gray-700">Gambar</label>
        <FileDropZone
          onFile={setFile}
          currentFile={file}
          onClear={() => setFile(null)}
        />
      </div>

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

export { BeritaForm };
