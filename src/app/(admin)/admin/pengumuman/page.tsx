"use client";

import { useEffect, useState } from "react";
import { useAppSelector } from "@/store/store";
import { useMounted } from "@/hooks/useMounted";
import { Button } from "@/components/ui/Button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { Modal } from "@/components/ui/Modal";
import { PengumumanForm } from "@/components/features/pengumuman/PengumumanForm";
import { BannerUpload } from "@/components/features/banner/BannerUpload";
import {
  getPengumuman,
  createPengumuman,
  deletePengumuman,
} from "@/actions/pengumuman.actions";
import { uploadToStorage } from "@/actions/upload.actions";
import { formatDate } from "@/lib/utils";
import type { Pengumuman } from "@/types";
import { Plus, Trash2, FileText } from "lucide-react";

export default function PengumumanPage() {
  const theme = useAppSelector((state) => state.theme.current);
  const mounted = useMounted();
  const [pengumuman, setPengumuman] = useState<Pengumuman[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);

  const fetchPengumuman = async () => {
    const result = await getPengumuman();
    if (result.success && result.data) {
      setPengumuman(result.data);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchPengumuman();
  }, []);

  const handleSubmit = async (data: {
    title: string;
    title_en: string;
    title_cn: string;
    file: File;
  }) => {
    const filepath = await uploadToStorage(data.file, "pengumuman");
    const { file: _file, ...formData } = data;
    const result = await createPengumuman({ ...formData, file_path: filepath });

    if (!result.success) {
      throw new Error(typeof result.error === "string" ? result.error : "Gagal menyimpan pengumuman");
    }

    setModalOpen(false);
    fetchPengumuman();
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Yakin ingin menghapus pengumuman ini?")) return;
    await deletePengumuman(id);
    fetchPengumuman();
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Manajemen Pengumuman</h1>
          <p className="text-gray-600">Kelola pengumuman fakultas</p>
        </div>
        <Button onClick={() => setModalOpen(true)}>
          <Plus className="mr-2 h-4 w-4" />
          Tambah Pengumuman
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Banner Halaman Pengumuman</CardTitle>
        </CardHeader>
        <CardContent>
          <BannerUpload label="Banner Pengumuman" identitasKey="banner_pengumuman" />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Daftar Pengumuman</CardTitle>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="flex justify-center py-8">
              <div className="h-8 w-8 animate-spin rounded-full border-4 border-t-transparent" style={{ borderColor: `${mounted ? theme.primaryHex : "#2563eb"} transparent transparent transparent` }} />
            </div>
          ) : pengumuman.length === 0 ? (
            <p className="py-8 text-center text-gray-500">Belum ada pengumuman</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="px-4 py-3 font-medium text-gray-600">Judul</th>
                    <th className="px-4 py-3 font-medium text-gray-600">File</th>
                    <th className="px-4 py-3 font-medium text-gray-600">Tanggal</th>
                    <th className="px-4 py-3 font-medium text-gray-600">Aksi</th>
                  </tr>
                </thead>
                <tbody>
                  {pengumuman.map((item) => (
                    <tr key={item.id} className="border-b border-gray-100 hover:bg-gray-50">
                      <td className="px-4 py-3 font-medium">{item.title}</td>
                      <td className="px-4 py-3">
                        <a
                          href={item.file_path}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center hover:underline"
                          style={{ color: theme.primaryHex }}
                        >
                          <FileText className="mr-1 h-4 w-4" />
                          Lihat
                        </a>
                      </td>
                      <td className="px-4 py-3 text-gray-500">{formatDate(item.uploadat)}</td>
                      <td className="px-4 py-3">
                        <Button variant="ghost" size="sm" onClick={() => handleDelete(item.id)}>
                          <Trash2 className="h-4 w-4 text-red-500" />
                        </Button>
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
        title="Tambah Pengumuman"
      >
        <PengumumanForm
          onSubmit={handleSubmit}
          onCancel={() => setModalOpen(false)}
        />
      </Modal>
    </div>
  );
}
