"use client";

import { useEffect, useState } from "react";
import { useAppSelector } from "@/store/store";
import { useMounted } from "@/hooks/useMounted";
import { Button } from "@/components/ui/Button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { Modal } from "@/components/ui/Modal";
import { FaqForm } from "@/components/features/faq/FaqForm";
import {
  getFaq,
  createFaq,
  updateFaq,
  deleteFaq,
} from "@/actions/faq.actions";
import type { Faq } from "@/types";
import { LoadingOverlay } from "@/components/ui/LoadingOverlay";
import { Plus, Pencil, Trash2 } from "lucide-react";

export default function FaqPage() {
  const theme = useAppSelector((state) => state.theme.current);
  const mounted = useMounted();
  const [faq, setFaq] = useState<Faq[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingFaq, setEditingFaq] = useState<Faq | null>(null);
  const [saving, setSaving] = useState(false);

  const fetchFaq = async () => {
    const result = await getFaq();
    if (result.success && result.data) {
      setFaq(result.data);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchFaq();
  }, []);

  const openCreateModal = () => {
    setEditingFaq(null);
    setModalOpen(true);
  };

  const openEditModal = (item: Faq) => {
    setEditingFaq(item);
    setModalOpen(true);
  };

  const handleSubmit = async (data: {
    question: string;
    question_en: string;
    question_cn: string;
    answer: string;
    answer_en: string;
    answer_cn: string;
  }) => {
    setSaving(true);
    try {
      let result;
      if (editingFaq) {
        result = await updateFaq(editingFaq.id, data);
      } else {
        result = await createFaq(data);
      }

      if (!result.success) {
        throw new Error(typeof result.error === "string" ? result.error : "Gagal menyimpan FAQ");
      }

      setModalOpen(false);
      fetchFaq();
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Yakin ingin menghapus FAQ ini?")) return;
    await deleteFaq(id);
    fetchFaq();
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Manajemen FAQ</h1>
          <p className="text-gray-600">Kelola frequently asked questions</p>
        </div>
        <Button onClick={openCreateModal}>
          <Plus className="mr-2 h-4 w-4" />
          Tambah FAQ
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Daftar FAQ</CardTitle>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="flex justify-center py-8">
              <div className="h-8 w-8 animate-spin rounded-full border-4 border-t-transparent" style={{ borderColor: `${mounted ? theme.primaryHex : "#2563eb"} transparent transparent transparent` }} />
            </div>
          ) : faq.length === 0 ? (
            <p className="py-8 text-center text-gray-500">Belum ada FAQ</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="px-4 py-3 font-medium text-gray-600">Pertanyaan</th>
                    <th className="px-4 py-3 font-medium text-gray-600">Jawaban</th>
                    <th className="px-4 py-3 font-medium text-gray-600">Aksi</th>
                  </tr>
                </thead>
                <tbody>
                  {faq.map((item) => (
                    <tr key={item.id} className="border-b border-gray-100 hover:bg-gray-50">
                      <td className="px-4 py-3 font-medium max-w-xs truncate">{item.question}</td>
                      <td className="px-4 py-3 text-gray-500 max-w-xs truncate">{item.answer}</td>
                      <td className="px-4 py-3">
                        <div className="flex gap-2">
                          <Button variant="ghost" size="sm" onClick={() => openEditModal(item)}>
                            <Pencil className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="sm" onClick={() => handleDelete(item.id)}>
                            <Trash2 className="h-4 w-4 text-red-500" />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </CardContent>
      </Card>

      <Modal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        title={editingFaq ? "Edit FAQ" : "Tambah FAQ"}
        size="lg"
      >
        <FaqForm
          initialData={editingFaq ?? undefined}
          onSubmit={handleSubmit}
          onCancel={() => setModalOpen(false)}
        />
      </Modal>

      <LoadingOverlay open={saving} message="Menyimpan FAQ..." />
    </div>
  );
}
