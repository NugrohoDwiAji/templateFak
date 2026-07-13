"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/Button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { Modal } from "@/components/ui/Modal";
import { ThemeForm } from "@/components/features/theme/ThemeForm";
import {
  getThemes,
  createTheme,
  updateTheme,
  deleteTheme,
  setActiveTheme,
  type ThemeData,
} from "@/actions/theme.actions";
import { Plus, Pencil, Trash2, Check, Palette } from "lucide-react";
import { useAppDispatch, useAppSelector } from "@/store/store";
import { useMounted } from "@/hooks/useMounted";
import { setTheme } from "@/store/slices/themeSlice";

function serializeTheme(data: ThemeData): ThemeData {
  const result = { ...data };
  if (result.createdAt instanceof Date) {
    result.createdAt = result.createdAt.toISOString();
  }
  if (result.updatedAt instanceof Date) {
    result.updatedAt = result.updatedAt.toISOString();
  }
  return result;
}

export default function ThemePage() {
  const theme = useAppSelector((state) => state.theme.current);
  const mounted = useMounted();
  const [themes, setThemes] = useState<ThemeData[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingTheme, setEditingTheme] = useState<ThemeData | null>(null);
  const dispatch = useAppDispatch();

  const fetchThemes = async () => {
    const result = await getThemes();
    if (result.success && result.data) {
      setThemes(result.data);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchThemes();
  }, []);

  const handleCreate = async (data: Omit<ThemeData, "id" | "isActive">) => {
    await createTheme(data);
    setModalOpen(false);
    fetchThemes();
  };

  const handleUpdate = async (data: Omit<ThemeData, "id" | "isActive">) => {
    if (!editingTheme) return;
    await updateTheme(editingTheme.id, data);
    setModalOpen(false);
    setEditingTheme(null);
    fetchThemes();
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Yakin ingin menghapus tema ini?")) return;
    await deleteTheme(id);
    fetchThemes();
  };

  const handleSetActive = async (theme: ThemeData) => {
    await setActiveTheme(theme.id);
    dispatch(setTheme(serializeTheme(theme)));
    fetchThemes();
  };

  const openCreateModal = () => {
    setEditingTheme(null);
    setModalOpen(true);
  };

  const openEditModal = (theme: ThemeData) => {
    setEditingTheme(theme);
    setModalOpen(true);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Manajemen Tema</h1>
          <p className="text-gray-600">Kelola tema warna website</p>
        </div>
        <Button onClick={openCreateModal}>
          <Plus className="mr-2 h-4 w-4" />
          Tambah Tema
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Daftar Tema</CardTitle>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="flex justify-center py-8">
              <div className="h-8 w-8 animate-spin rounded-full border-4 border-t-transparent" style={{ borderColor: `${mounted ? theme.primaryHex : "#2563eb"} transparent transparent transparent` }} />
            </div>
          ) : themes.length === 0 ? (
            <p className="py-8 text-center text-gray-500">Belum ada tema</p>
          ) : (
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {themes.map((theme) => (
                <div
                  key={theme.id}
                  className={`relative rounded-xl border-2 p-4 transition-all ${
                    theme.isActive
                      ? "border-green-500 bg-green-50"
                      : "border-gray-200 hover:border-gray-300"
                  }`}
                >
                  {theme.isActive && (
                    <div className="absolute -right-2 -top-2 rounded-full bg-green-500 p-1">
                      <Check className="h-3 w-3 text-white" />
                    </div>
                  )}

                  <div className="mb-3 flex items-center gap-3">
                    <div className="flex gap-1">
                      <div
                        className="h-8 w-8 rounded-lg border border-gray-200"
                        style={{ backgroundColor: theme.primaryHex }}
                      />
                      <div
                        className="h-8 w-8 rounded-lg border border-gray-200"
                        style={{ backgroundColor: theme.secondaryHex }}
                      />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-800">
                        {theme.name}
                      </h3>
                      {theme.isActive && (
                        <span className="text-xs text-green-600">Aktif</span>
                      )}
                    </div>
                  </div>

                  <div className="mb-3 flex gap-1">
                    <div
                      className="h-4 flex-1 rounded"
                      style={{ backgroundColor: theme.headerBgHex }}
                    />
                    <div
                      className="h-4 flex-1 rounded"
                      style={{ backgroundColor: theme.sidebarBgHex }}
                    />
                    <div
                      className="h-4 flex-1 rounded"
                      style={{ backgroundColor: theme.bodyBgHex }}
                    />
                    <div
                      className="h-4 flex-1 rounded"
                      style={{ backgroundColor: theme.footerBgHex }}
                    />
                  </div>

                  <div className="flex gap-2">
                    {!theme.isActive && (
                      <Button
                        variant="primary"
                        size="sm"
                        onClick={() => handleSetActive(theme)}
                      >
                        <Palette className="mr-1 h-3 w-3" />
                        Aktifkan
                      </Button>
                    )}
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => openEditModal(theme)}
                    >
                      <Pencil className="h-4 w-4" />
                    </Button>
                    {!theme.isActive && (
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleDelete(theme.id)}
                      >
                        <Trash2 className="h-4 w-4 text-red-500" />
                      </Button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      <Modal
        open={modalOpen}
        onClose={() => {
          setModalOpen(false);
          setEditingTheme(null);
        }}
        title={editingTheme ? "Edit Tema" : "Tambah Tema Baru"}
        size="xl"
      >
        <ThemeForm
          theme={editingTheme}
          onSubmit={editingTheme ? handleUpdate : handleCreate}
          onCancel={() => {
            setModalOpen(false);
            setEditingTheme(null);
          }}
        />
      </Modal>
    </div>
  );
}
