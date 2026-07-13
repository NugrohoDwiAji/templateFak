"use client";

import { useEffect, useState } from "react";
import { useAppSelector } from "@/store/store";
import { useMounted } from "@/hooks/useMounted";
import { Button } from "@/components/ui/Button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { FileDropZone } from "@/components/ui/FileDropZone";
import { BannerUpload } from "@/components/features/banner/BannerUpload";
import { uploadToStorage } from "@/actions/upload.actions";
import { getIdentitasByName, setIdentitas } from "@/actions/identitas.actions";
import { Upload, Trash2 } from "lucide-react";

export default function StrukturOrganisasiPage() {
  const theme = useAppSelector((state) => state.theme.current);
  const mounted = useMounted();
  const [currentImage, setCurrentImage] = useState<string | null>(null);
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchImage() {
      const result = await getIdentitasByName("struktur_organisasi");
      if (result.success && result.data) {
        setCurrentImage(result.data);
      }
      setLoading(false);
    }
    fetchImage();
  }, []);

  const handleUpload = async () => {
    if (!file) return;
    setUploading(true);
    setError(null);
    try {
      const filepath = await uploadToStorage(file, "struktur");
      const result = await setIdentitas("struktur_organisasi", filepath);

      if (!result.success) {
        throw new Error(typeof result.error === "string" ? result.error : "Gagal menyimpan struktur organisasi");
      }

      setCurrentImage(filepath);
      setFile(null);
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      }
    } finally {
      setUploading(false);
    }
  };

  const handleRemove = async () => {
    if (!confirm("Yakin ingin menghapus gambar struktur organisasi?")) return;
    setError(null);
    try {
      const result = await setIdentitas("struktur_organisasi", "");

      if (!result.success) {
        throw new Error(typeof result.error === "string" ? result.error : "Gagal menghapus struktur organisasi");
      }

      setCurrentImage(null);
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      }
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Struktur Organisasi</h1>
        <p className="text-gray-600">Kelola gambar struktur organisasi fakultas</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Banner Halaman Struktur Organisasi</CardTitle>
        </CardHeader>
        <CardContent>
          <BannerUpload label="Banner Struktur" identitasKey="banner_struktur" />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Gambar Struktur Organisasi</CardTitle>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="flex justify-center py-8">
              <div className="h-8 w-8 animate-spin rounded-full border-4 border-t-transparent" style={{ borderColor: `${mounted ? theme.primaryHex : "#2563eb"} transparent transparent transparent` }} />
            </div>
          ) : (
            <div className="space-y-6">
              {error && (
                <div className="rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-700">
                  {error}
                </div>
              )}
              {currentImage && (
                <div className="space-y-4">
                  <div className="overflow-hidden rounded-lg border border-gray-200">
                    <img
                      src={currentImage}
                      alt="Struktur Organisasi"
                      className="w-full object-contain"
                    />
                  </div>
                  <Button variant="danger" size="sm" onClick={handleRemove}>
                    <Trash2 className="mr-2 h-4 w-4" />
                    Hapus Gambar
                  </Button>
                </div>
              )}

              <div className="space-y-4">
                <FileDropZone
                  onFile={setFile}
                  currentFile={file}
                  onClear={() => setFile(null)}
                />
                {file && (
                  <Button onClick={handleUpload} loading={uploading}>
                    <Upload className="mr-2 h-4 w-4" />
                    {currentImage ? "Ganti Gambar" : "Upload Gambar"}
                  </Button>
                )}
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
