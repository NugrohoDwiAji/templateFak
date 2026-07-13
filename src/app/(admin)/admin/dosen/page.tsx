"use client";

import { useEffect, useState } from "react";
import { useAppSelector } from "@/store/store";
import { useMounted } from "@/hooks/useMounted";
import { Button } from "@/components/ui/Button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { Modal } from "@/components/ui/Modal";
import { DosenForm } from "@/components/features/dosen/DosenForm";
import { BannerUpload } from "@/components/features/banner/BannerUpload";
import {
  getDosen,
  createDosen,
  updateDosen,
  deleteDosen,
} from "@/actions/dosen.actions";
import { uploadToStorage } from "@/actions/upload.actions";
import { formatDate } from "@/lib/utils";
import type { Dosen } from "@/types";
import type { DosenInput } from "@/lib/validations";
import { Plus, Pencil, Trash2 } from "lucide-react";

export default function DosenPage() {
  const theme = useAppSelector((state) => state.theme.current);
  const mounted = useMounted();
  const [dosen, setDosen] = useState<Dosen[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingDosen, setEditingDosen] = useState<Dosen | null>(null);

  const fetchDosen = async () => {
    const result = await getDosen();
    if (result.success && result.data) {
      setDosen(result.data);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchDosen();
  }, []);

  const openCreateModal = () => {
    setEditingDosen(null);
    setModalOpen(true);
  };

  const openEditModal = (item: Dosen) => {
    setEditingDosen(item);
    setModalOpen(true);
  };

  const handleSubmit = async (data: {
    nama: string;
    nama_en: string;
    nama_cn: string;
    nik: string;
    jenis_dosen: string;
    kepakaran?: string;
    kepakaran_en?: string;
    kepakaran_cn?: string;
    foto?: File;
  }) => {
    const { foto: _foto, ...restData } = data;
    const dosenData: DosenInput = {
      nama: restData.nama,
      nik: restData.nik,
      jenis_dosen: restData.jenis_dosen,
      nama_en: restData.nama_en || undefined,
      nama_cn: restData.nama_cn || undefined,
      kepakaran: restData.kepakaran || undefined,
      kepakaran_en: restData.kepakaran_en || undefined,
      kepakaran_cn: restData.kepakaran_cn || undefined,
    };

    let result;
    if (editingDosen) {
      const updateData: DosenInput = { ...dosenData };
      if (editingDosen.foto) updateData.foto = editingDosen.foto;
      result = await updateDosen(editingDosen.id, updateData);
    } else {
      result = await createDosen(dosenData);
    }

    if (!result.success) {
      throw new Error(typeof result.error === "string" ? result.error : "Gagal menyimpan dosen");
    }

    if (data.foto && result.data) {
      const fotoPath = await uploadToStorage(data.foto, "dosen");
      if (fotoPath) {
        await updateDosen(result.data.id, {
          ...dosenData,
          foto: fotoPath,
        });
      }
    }

    setModalOpen(false);
    fetchDosen();
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Yakin ingin menghapus dosen ini?")) return;
    await deleteDosen(id);
    fetchDosen();
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Manajemen Dosen</h1>
          <p className="text-gray-600">Kelola data dosen fakultas</p>
        </div>
        <Button onClick={openCreateModal}>
          <Plus className="mr-2 h-4 w-4" />
          Tambah Dosen
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Banner Halaman Dosen</CardTitle>
        </CardHeader>
        <CardContent>
          <BannerUpload label="Banner Dosen" identitasKey="banner_dosen" />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Daftar Dosen</CardTitle>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="flex justify-center py-8">
              <div className="h-8 w-8 animate-spin rounded-full border-4 border-t-transparent" style={{ borderColor: `${mounted ? theme.primaryHex : "#2563eb"} transparent transparent transparent` }} />
            </div>
          ) : dosen.length === 0 ? (
            <p className="py-8 text-center text-gray-500">Belum ada dosen</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="px-4 py-3 font-medium text-gray-600">Nama</th>
                    <th className="px-4 py-3 font-medium text-gray-600">NIK</th>
                    <th className="px-4 py-3 font-medium text-gray-600">Jenis</th>
                    <th className="px-4 py-3 font-medium text-gray-600">Tanggal</th>
                    <th className="px-4 py-3 font-medium text-gray-600">Aksi</th>
                  </tr>
                </thead>
                <tbody>
                  {dosen.map((item) => (
                    <tr key={item.id} className="border-b border-gray-100 hover:bg-gray-50">
                      <td className="px-4 py-3 font-medium">{item.nama}</td>
                      <td className="px-4 py-3 text-gray-500">{item.nik}</td>
                      <td className="px-4 py-3">
                        <span className="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium" style={{ backgroundColor: `${theme.primaryHex}1A`, color: theme.primaryHex }}>
                          {item.jenis_dosen}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-gray-500">{formatDate(item.create_at)}</td>
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
        title={editingDosen ? "Edit Dosen" : "Tambah Dosen"}
        size="lg"
      >
        <DosenForm
          initialData={editingDosen ?? undefined}
          onSubmit={handleSubmit}
          onCancel={() => setModalOpen(false)}
        />
      </Modal>
    </div>
  );
}
