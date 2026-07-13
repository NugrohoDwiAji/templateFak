"use client";

import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Select } from "@/components/ui/Select";
import { FileDropZone } from "@/components/ui/FileDropZone";
import { MultiLangInput } from "@/components/features/language/MultiLangInput";
import type { Dosen } from "@/types";

interface DosenFormProps {
  initialData?: Dosen;
  onSubmit: (data: {
    nama: string;
    nama_en: string;
    nama_cn: string;
    nik: string;
    jenis_dosen: string;
    kepakaran?: string;
    kepakaran_en?: string;
    kepakaran_cn?: string;
    foto?: File;
  }) => Promise<void>;
  onCancel: () => void;
}

function DosenForm({ initialData, onSubmit, onCancel }: DosenFormProps) {
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<string[]>([]);
  const [foto, setFoto] = useState<File | null>(null);
  const [form, setForm] = useState({
    nama: initialData?.nama ?? "",
    nik: initialData?.nik ?? "",
    jenis_dosen: initialData?.jenis_dosen ?? "Dosen Tetap",
    kepakaran: initialData?.kepakaran ?? "",
    kepakaran_en: initialData?.kepakaran_en ?? "",
    kepakaran_cn: initialData?.kepakaran_cn ?? "",
  });

  const validate = (): string[] => {
    const newErrors: string[] = [];
    if (!form.nama.trim()) newErrors.push("Nama wajib diisi");
    if (!form.nik.trim()) newErrors.push("NIK wajib diisi");
    if (!form.jenis_dosen.trim()) newErrors.push("Jenis dosen wajib diisi");
    return newErrors;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrors([]);

    const validationErrors = validate();
    if (validationErrors.length > 0) {
      setErrors(validationErrors);
      setLoading(false);
      return;
    }

    try {
      const submitData: Record<string, string | File> = {
        nama: form.nama,
        nama_en: form.nama,
        nama_cn: form.nama,
        nik: form.nik,
        jenis_dosen: form.jenis_dosen,
      };
      if (form.kepakaran) submitData.kepakaran = form.kepakaran;
      if (form.kepakaran_en) submitData.kepakaran_en = form.kepakaran_en;
      if (form.kepakaran_cn) submitData.kepakaran_cn = form.kepakaran_cn;
      if (foto) submitData.foto = foto;
      await onSubmit(submitData);
    } catch {
      setErrors(["Terjadi kesalahan saat menyimpan data"]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {errors.length > 0 && (
        <div className="rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-700">
          <p className="mb-1 font-medium">Mohon lengkapi field berikut:</p>
          <ul className="list-inside list-disc space-y-0.5">
            {errors.map((err) => (
              <li key={err}>{err}</li>
            ))}
          </ul>
        </div>
      )}

      <Input
        label="Nama"
        value={form.nama}
        onChange={(e) => setForm((prev) => ({ ...prev, nama: e.target.value }))}
        required
      />

      <Input
        label="NIK"
        value={form.nik}
        onChange={(e) => setForm((prev) => ({ ...prev, nik: e.target.value }))}
        required
      />

      <Select
        label="Jenis Dosen"
        value={form.jenis_dosen}
        onChange={(e) =>
          setForm((prev) => ({ ...prev, jenis_dosen: e.target.value }))
        }
        options={[
          { value: "Dosen Tetap", label: "Dosen Tetap" },
          { value: "Dosen Tidak Tetap", label: "Dosen Tidak Tetap" },
          { value: "Dosen Praktisi", label: "Dosen Praktisi" },
        ]}
      />

      <MultiLangInput
        label="Kepakaran"
        value_id={form.kepakaran}
        value_en={form.kepakaran_en}
        value_cn={form.kepakaran_cn}
        onChange={(lang, value) =>
          setForm((prev) => ({
            ...prev,
            [`kepakaran${lang === "id" ? "" : `_${lang}`}`]: value,
          }))
        }
      />

      <div className="space-y-1">
        <label className="text-sm font-medium text-gray-700">Foto</label>
        <FileDropZone
          onFile={setFoto}
          currentFile={foto}
          onClear={() => setFoto(null)}
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

export { DosenForm };
