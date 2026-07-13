"use client";

import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { FileDropZone } from "@/components/ui/FileDropZone";

interface BerkasFormProps {
  onSubmit: (data: { title: string; file: File }) => Promise<void>;
  onCancel: () => void;
}

function BerkasForm({ onSubmit, onCancel }: BerkasFormProps) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [file, setFile] = useState<File | null>(null);
  const [title, setTitle] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file) return;
    setLoading(true);
    setError(null);
    try {
      await onSubmit({ title, file });
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
      <Input
        label="Judul"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />

      <div className="space-y-1">
        <label className="text-sm font-medium text-gray-700">File</label>
        <FileDropZone
          onFile={setFile}
          currentFile={file}
          onClear={() => setFile(null)}
          accept={{
            "application/pdf": [".pdf"],
            "application/msword": [".doc"],
            "application/vnd.openxmlformats-officedocument.wordprocessingml.document": [".docx"],
            "application/vnd.ms-excel": [".xls"],
            "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet": [".xlsx"],
          }}
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

export { BerkasForm };
