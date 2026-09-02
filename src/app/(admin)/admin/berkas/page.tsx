"use client";

import { useEffect, useState } from "react";
import { useAppSelector } from "@/store/store";
import { useMounted } from "@/hooks/useMounted";
import { Button } from "@/components/ui/Button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { Modal } from "@/components/ui/Modal";
import { BerkasForm } from "@/components/features/berkas/BerkasForm";
import {
  getBerkas,
  createBerkas,
  deleteBerkas,
} from "@/actions/berkas.actions";
import { uploadToStorage } from "@/actions/upload.actions";
import { formatDate } from "@/lib/utils";
import type { Berkas } from "@/types";
import { LoadingOverlay } from "@/components/ui/LoadingOverlay";
import { Plus, Trash2, Download } from "lucide-react";

export default function BerkasPage() {
  const theme = useAppSelector((state) => state.theme.current);
  const mounted = useMounted();
  const [berkas, setBerkas] = useState<Berkas[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [saving, setSaving] = useState(false);

  const fetchBerkas = async () => {
    const result = await getBerkas();
    if (result.success && result.data) {
      setBerkas(result.data);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchBerkas();
  }, []);

  const handleSubmit = async (data: {
    title: string;
    title_en: string;
    title_cn: string;
    file: File;
  }) => {
    setSaving(true);
    try {
      const filepath = await uploadToStorage(data.file, "berkas");
      const { file: _file, ...formData } = data;
      const result = await createBerkas(formData, filepath);

      if (!result.success) {
        throw new Error(typeof result.error === "string" ? result.error : "Gagal menyimpan berkas");
      }

      setModalOpen(false);
      fetchBerkas();
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Yakin ingin menghapus berkas ini?")) return;
    await deleteBerkas(id);
    fetchBerkas();
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Manajemen Berkas</h1>
          <p className="text-gray-600">Kelola berkas unduhan</p>
        </div>
        <Button onClick={() => setModalOpen(true)}>
          <Plus className="mr-2 h-4 w-4" />
          Tambah Berkas
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Daftar Berkas</CardTitle>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="flex justify-center py-8">
              <div className="h-8 w-8 animate-spin rounded-full border-4 border-t-transparent" style={{ borderColor: `${mounted ? theme.primaryHex : "#2563eb"} transparent transparent transparent` }} />
            </div>
          ) : berkas.length === 0 ? (
            <p className="py-8 text-center text-gray-500">Belum ada berkas</p>
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
                  {berkas.map((item) => (
                    <tr key={item.id} className="border-b border-gray-100 hover:bg-gray-50">
                      <td className="px-4 py-3 font-medium">{item.title}</td>
                      <td className="px-4 py-3">
                        <a
                          href={item.filepath}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center hover:underline"
                          style={{ color: theme.primaryHex }}
                        >
                          <Download className="mr-1 h-4 w-4" />
                          Unduh
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
        title="Tambah Berkas"
      >
        <BerkasForm
          onSubmit={handleSubmit}
          onCancel={() => setModalOpen(false)}
        />
      </Modal>

      <LoadingOverlay open={saving} message="Menyimpan berkas..." />
    </div>
  );
}
