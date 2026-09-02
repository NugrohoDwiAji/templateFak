"use client";

import { useEffect, useState } from "react";
import { useAppSelector } from "@/store/store";
import { useMounted } from "@/hooks/useMounted";
import { Button } from "@/components/ui/Button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { Modal } from "@/components/ui/Modal";
import { BeritaForm } from "@/components/features/berita/BeritaForm";
import {
  getBerita,
  createBerita,
  updateBerita,
  deleteBerita,
} from "@/actions/berita.actions";
import { uploadToStorage } from "@/actions/upload.actions";
import { formatDate } from "@/lib/utils";
import type { Berita } from "@/types";
import { LoadingOverlay } from "@/components/ui/LoadingOverlay";
import { Plus, Pencil, Trash2, ExternalLink } from "lucide-react";

export default function BeritaPage() {
  const theme = useAppSelector((state) => state.theme.current);
  const mounted = useMounted();
  const [berita, setBerita] = useState<Berita[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingBerita, setEditingBerita] = useState<Berita | null>(null);
  const [saving, setSaving] = useState(false);

  const fetchBerita = async () => {
    const result = await getBerita();
    if (result.success && result.data) {
      setBerita(result.data);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchBerita();
  }, []);

  const openCreateModal = () => {
    setEditingBerita(null);
    setModalOpen(true);
  };

  const openEditModal = (item: Berita) => {
    setEditingBerita(item);
    setModalOpen(true);
  };

  const handleSubmit = async (data: {
    title: string;
    title_en: string;
    title_cn: string;
    description: string;
    description_en: string;
    description_cn: string;
    file?: File;
  }) => {
    setSaving(true);
    try {
      let filepath: string | undefined;

      if (data.file) {
        filepath = await uploadToStorage(data.file, "berita");
      }

      const { file: _file, ...formData } = data;

      let result;
      if (editingBerita) {
        result = await updateBerita(editingBerita.id, formData, filepath ?? editingBerita.filepath);
      } else {
        result = await createBerita(formData, filepath);
      }

      if (!result.success) {
        throw new Error(typeof result.error === "string" ? result.error : "Gagal menyimpan berita");
      }

      setModalOpen(false);
      fetchBerita();
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Yakin ingin menghapus berita ini?")) return;
    await deleteBerita(id);
    fetchBerita();
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Manajemen Berita</h1>
          <p className="text-gray-600">Kelola berita fakultas</p>
        </div>
        <Button onClick={openCreateModal}>
          <Plus className="mr-2 h-4 w-4" />
          Tambah Berita
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Daftar Berita</CardTitle>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="flex justify-center py-8">
              <div className="h-8 w-8 animate-spin rounded-full border-4 border-t-transparent" style={{ borderColor: `${mounted ? theme.primaryHex : "#2563eb"} transparent transparent transparent` }} />
            </div>
          ) : berita.length === 0 ? (
            <p className="py-8 text-center text-gray-500">Belum ada berita</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="px-4 py-3 font-medium text-gray-600">Judul</th>
                    <th className="px-4 py-3 font-medium text-gray-600">Gambar</th>
                    <th className="px-4 py-3 font-medium text-gray-600">Tanggal</th>
                    <th className="px-4 py-3 font-medium text-gray-600">Aksi</th>
                  </tr>
                </thead>
                <tbody>
                  {berita.map((item) => (
                    <tr key={item.id} className="border-b border-gray-100 hover:bg-gray-50">
                      <td className="px-4 py-3 font-medium">{item.title}</td>
                      <td className="px-4 py-3">
                        {item.filepath ? (
                          <a
                            href={item.filepath}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center hover:underline"
                            style={{ color: theme.primaryHex }}
                          >
                            <ExternalLink className="mr-1 h-4 w-4" />
                            Lihat
                          </a>
                        ) : (
                          <span className="text-gray-400">-</span>
                        )}
                      </td>
                      <td className="px-4 py-3 text-gray-500">{formatDate(item.uploadat)}</td>
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
        title={editingBerita ? "Edit Berita" : "Tambah Berita"}
        size="lg"
      >
        <BeritaForm
          initialData={editingBerita ?? undefined}
          onSubmit={handleSubmit}
          onCancel={() => setModalOpen(false)}
        />
      </Modal>

      <LoadingOverlay open={saving} message="Menyimpan berita..." />
    </div>
  );
}
