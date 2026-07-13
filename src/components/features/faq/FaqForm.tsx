"use client";

import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { MultiLangInput } from "@/components/features/language/MultiLangInput";

interface FaqFormProps {
  initialData?: {
    question: string;
    question_en: string;
    question_cn: string;
    answer: string;
    answer_en: string;
    answer_cn: string;
  };
  onSubmit: (data: {
    question: string;
    question_en: string;
    question_cn: string;
    answer: string;
    answer_en: string;
    answer_cn: string;
  }) => Promise<void>;
  onCancel: () => void;
}

function FaqForm({ initialData, onSubmit, onCancel }: FaqFormProps) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [form, setForm] = useState({
    question: initialData?.question ?? "",
    question_en: initialData?.question_en ?? "",
    question_cn: initialData?.question_cn ?? "",
    answer: initialData?.answer ?? "",
    answer_en: initialData?.answer_en ?? "",
    answer_cn: initialData?.answer_cn ?? "",
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
        label="Pertanyaan"
        value_id={form.question}
        value_en={form.question_en}
        value_cn={form.question_cn}
        onChange={(lang, value) =>
          setForm((prev) => ({
            ...prev,
            [`question${lang === "id" ? "" : `_${lang}`}`]: value,
          }))
        }
        type="textarea"
      />

      <MultiLangInput
        label="Jawaban"
        value_id={form.answer}
        value_en={form.answer_en}
        value_cn={form.answer_cn}
        onChange={(lang, value) =>
          setForm((prev) => ({
            ...prev,
            [`answer${lang === "id" ? "" : `_${lang}`}`]: value,
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

export { FaqForm };
