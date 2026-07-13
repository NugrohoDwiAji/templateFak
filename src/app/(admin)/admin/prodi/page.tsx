"use client";

import { useEffect, useState } from "react";
import { useAppSelector } from "@/store/store";
import { useMounted } from "@/hooks/useMounted";
import { Button } from "@/components/ui/Button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { Modal } from "@/components/ui/Modal";
import { ProdiForm } from "@/components/features/prodi/ProdiForm";
import { BannerUpload } from "@/components/features/banner/BannerUpload";
import {
  getProdi,
  createProdi,
  updateProdi,
  deleteProdi,
} from "@/actions/prodi.actions";
import type { Prodi } from "@/types";
import { Plus, Pencil, Trash2, ExternalLink } from "lucide-react";

export default function ProdiPage() {
  const theme = useAppSelector((state) => state.theme.current);
  const mounted = useMounted();
  const [prodi, setProdi] = useState<Prodi[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingProdi, setEditingProdi] = useState<Prodi | null>(null);

  const fetchProdi = async () => {
    const result = await getProdi();
    if (result.success && result.data) {
      setProdi(result.data);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchProdi();
  }, []);

  const openCreateModal = () => {
    setEditingProdi(null);
    setModalOpen(true);
  };

  const openEditModal = (item: Prodi) => {
    setEditingProdi(item);
    setModalOpen(true);
  };

  const handleSubmit = async (data: {
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
  }) => {
    let result;
    if (editingProdi) {
      result = await updateProdi(editingProdi.id, data);
    } else {
      result = await createProdi(data);
    }

    if (!result.success) {
      throw new Error(typeof result.error === "string" ? result.error : "Gagal menyimpan program studi");
    }

    setModalOpen(false);
    fetchProdi();
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Yakin ingin menghapus prodi ini?")) return;
    await deleteProdi(id);
    fetchProdi();
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Manajemen Program Studi</h1>
          <p className="text-gray-600">Kelola program studi fakultas</p>
        </div>
        <Button onClick={openCreateModal}>
          <Plus className="mr-2 h-4 w-4" />
          Tambah Prodi
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Banner Halaman Program Studi</CardTitle>
        </CardHeader>
        <CardContent>
          <BannerUpload label="Banner Prodi" identitasKey="banner_prodi" />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Daftar Program Studi</CardTitle>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="flex justify-center py-8">
              <div className="h-8 w-8 animate-spin rounded-full border-4 border-t-transparent" style={{ borderColor: `${mounted ? theme.primaryHex : "#2563eb"} transparent transparent transparent` }} />
            </div>
          ) : prodi.length === 0 ? (
            <p className="py-8 text-center text-gray-500">Belum ada program studi</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="px-4 py-3 font-medium text-gray-600">Nama</th>
                    <th className="px-4 py-3 font-medium text-gray-600">Slug</th>
                    <th className="px-4 py-3 font-medium text-gray-600">Link</th>
                    <th className="px-4 py-3 font-medium text-gray-600">Aksi</th>
                  </tr>
                </thead>
                <tbody>
                  {prodi.map((item) => (
                    <tr key={item.id} className="border-b border-gray-100 hover:bg-gray-50">
                      <td className="px-4 py-3 font-medium">{item.nama}</td>
                      <td className="px-4 py-3 text-gray-500">{item.slug}</td>
                      <td className="px-4 py-3">
                        {item.link ? (
                          <a
                            href={item.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center hover:underline"
                            style={{ color: theme.primaryHex }}
                          >
                            <ExternalLink className="mr-1 h-4 w-4" />
                            Buka
                          </a>
                        ) : (
                          <span className="text-gray-400">-</span>
                        )}
                      </td>
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
        title={editingProdi ? "Edit Program Studi" : "Tambah Program Studi"}
        size="xl"
      >
        <ProdiForm
          initialData={editingProdi ?? undefined}
          onSubmit={handleSubmit}
          onCancel={() => setModalOpen(false)}
        />
      </Modal>
    </div>
  );
}
