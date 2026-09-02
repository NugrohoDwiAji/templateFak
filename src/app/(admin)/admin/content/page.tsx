"use client";

import { useEffect, useState } from "react";
import { useAppSelector } from "@/store/store";
import { useMounted } from "@/hooks/useMounted";
import { Button } from "@/components/ui/Button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { Modal } from "@/components/ui/Modal";
import { MultiLangInput } from "@/components/features/language/MultiLangInput";
import {
  getContents,
  createContent,
  updateContent,
  deleteContent,
} from "@/actions/content.actions";
import { formatDate } from "@/lib/utils";
import type { Content } from "@/types";
import { LoadingOverlay } from "@/components/ui/LoadingOverlay";
import { Plus, Pencil, Trash2 } from "lucide-react";

export default function ContentPage() {
  const theme = useAppSelector((state) => state.theme.current);
  const mounted = useMounted();
  const [contents, setContents] = useState<Content[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingContent, setEditingContent] = useState<Content | null>(null);
  const [form, setForm] = useState({
    title: "",
    title_en: "",
    title_cn: "",
    value: "",
    value_en: "",
    value_cn: "",
  });
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchContents = async () => {
    const result = await getContents();
    if (result.success && result.data) {
      setContents(result.data);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchContents();
  }, []);

  const openCreateModal = () => {
    setEditingContent(null);
    setForm({ title: "", title_en: "", title_cn: "", value: "", value_en: "", value_cn: "" });
    setModalOpen(true);
  };

  const openEditModal = (content: Content) => {
    setEditingContent(content);
    setForm({
      title: content.title,
      title_en: content.title_en,
      title_cn: content.title_cn,
      value: content.value,
      value_en: content.value_en,
      value_cn: content.value_cn,
    });
    setModalOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError(null);
    try {
      let result;
      if (editingContent) {
        result = await updateContent(editingContent.id, form);
      } else {
        result = await createContent(form);
      }

      if (!result.success) {
        throw new Error(typeof result.error === "string" ? result.error : "Gagal menyimpan konten");
      }

      setModalOpen(false);
      fetchContents();
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      }
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Yakin ingin menghapus konten ini?")) return;
    await deleteContent(id);
    fetchContents();
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Manajemen Konten</h1>
          <p className="text-gray-600">Kelola konten statis website</p>
        </div>
        <Button onClick={openCreateModal}>
          <Plus className="mr-2 h-4 w-4" />
          Tambah Konten
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Daftar Konten</CardTitle>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="flex justify-center py-8">
              <div className="h-8 w-8 animate-spin rounded-full border-4 border-t-transparent" style={{ borderColor: `${mounted ? theme.primaryHex : "#2563eb"} transparent transparent transparent` }} />
            </div>
          ) : contents.length === 0 ? (
            <p className="py-8 text-center text-gray-500">Belum ada konten</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="px-4 py-3 font-medium text-gray-600">Judul</th>
                    <th className="px-4 py-3 font-medium text-gray-600">Dibuat</th>
                    <th className="px-4 py-3 font-medium text-gray-600">Aksi</th>
                  </tr>
                </thead>
                <tbody>
                  {contents.map((content) => (
                    <tr key={content.id} className="border-b border-gray-100 hover:bg-gray-50">
                      <td className="px-4 py-3">{content.title}</td>
                      <td className="px-4 py-3 text-gray-500">{formatDate(content.createdAt)}</td>
                      <td className="px-4 py-3">
                        <div className="flex gap-2">
                          <Button variant="ghost" size="sm" onClick={() => openEditModal(content)}>
                            <Pencil className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="sm" onClick={() => handleDelete(content.id)}>
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
        title={editingContent ? "Edit Konten" : "Tambah Konten"}
        size="lg"
      >
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
            label="Konten"
            value_id={form.value}
            value_en={form.value_en}
            value_cn={form.value_cn}
            onChange={(lang, value) =>
              setForm((prev) => ({
                ...prev,
                [`value${lang === "id" ? "" : `_${lang}`}`]: value,
              }))
            }
            type="textarea"
          />

          <div className="flex justify-end gap-2">
            <Button type="button" variant="ghost" onClick={() => setModalOpen(false)}>
              Batal
            </Button>
            <Button type="submit" loading={saving}>
              {editingContent ? "Perbarui" : "Simpan"}
            </Button>
          </div>
        </form>
      </Modal>

      <LoadingOverlay open={saving} message="Menyimpan konten..." />
    </div>
  );
}
