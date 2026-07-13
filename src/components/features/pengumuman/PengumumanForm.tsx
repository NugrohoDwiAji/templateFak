"use client";

import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { FileDropZone } from "@/components/ui/FileDropZone";
import { MultiLangInput } from "@/components/features/language/MultiLangInput";

interface PengumumanFormProps {
  onSubmit: (data: {
    title: string;
    title_en: string;
    title_cn: string;
    file: File;
  }) => Promise<void>;
  onCancel: () => void;
}

function PengumumanForm({ onSubmit, onCancel }: PengumumanFormProps) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [file, setFile] = useState<File | null>(null);
  const [form, setForm] = useState({
    title: "",
    title_en: "",
    title_cn: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file) return;
    setLoading(true);
    setError(null);
    try {
      await onSubmit({ ...form, file });
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

      <div className="space-y-1">
        <label className="text-sm font-medium text-gray-700">File</label>
        <FileDropZone
          onFile={setFile}
          currentFile={file}
          onClear={() => setFile(null)}
          accept={{ "application/pdf": [".pdf"] }}
        />
      </div>

      <div className="flex justify-end gap-2">
        <Button type="button" variant="ghost" onClick={onCancel}>
          Batal
        </Button>
        <Button type="submit" loading={loading} disabled={!file}>
          Simpan
        </Button>
      </div>
    </form>
  );
}

export { PengumumanForm };
