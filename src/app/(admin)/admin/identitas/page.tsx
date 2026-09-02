"use client";

import { useEffect, useState } from "react";
import { useAppSelector } from "@/store/store";
import { useMounted } from "@/hooks/useMounted";
import { Card, CardContent } from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { MultiLangInput } from "@/components/features/language/MultiLangInput";
import { getIdentitas, setIdentitas } from "@/actions/identitas.actions";
import { uploadToStorage } from "@/actions/upload.actions";
import { toast } from "sonner";
import { LoadingOverlay } from "@/components/ui/LoadingOverlay";
import { Save, Building2, Image, Phone, Eye, Target } from "lucide-react";

interface IdentitasField {
  key: string;
  label: string;
  type: "text" | "textarea" | "banner" | "input";
  maxLength?: number;
}

const informasiUmumFields: IdentitasField[] = [
  { key: "nama_fakultas", label: "Nama Fakultas", type: "input", maxLength: 100 },
  { key: "tagline", label: "Tagline", type: "input", maxLength: 200 },
  { key: "tentang_fakultas", label: "Tentang Fakultas", type: "textarea", maxLength: 2000 },
];

const kontakFields: IdentitasField[] = [
  { key: "email_fakultas", label: "Email", type: "text", maxLength: 100 },
  { key: "telepon_fakultas", label: "Telepon", type: "text", maxLength: 20 },
  { key: "alamat_fakultas", label: "Alamat", type: "textarea", maxLength: 500 },
  { key: "jam_operasional", label: "Jam Operasional", type: "textarea", maxLength: 200 },
];

interface VisiMisiTab {
  key: string;
  label: string;
}

const visiMisiTabs: VisiMisiTab[] = [
  { key: "id", label: "Bahasa Indonesia" },
  { key: "en", label: "English" },
  { key: "cn", label: "中文" },
];

const bannerFields: IdentitasField[] = [
  { key: "banner_landing", label: "Banner Landing Page", type: "banner" },
  { key: "gambar_tentang", label: "Gambar Tentang Fakultas", type: "banner" },
  { key: "banner_berita", label: "Banner Berita", type: "banner" },
  { key: "banner_pengumuman", label: "Banner Pengumuman", type: "banner" },
  { key: "banner_dosen", label: "Banner Dosen", type: "banner" },
  { key: "banner_faq", label: "Banner FAQ", type: "banner" },
  { key: "banner_prodi", label: "Banner Program Studi", type: "banner" },
  { key: "banner_unduhan", label: "Banner Unduhan", type: "banner" },
  { key: "banner_struktur", label: "Banner Struktur Organisasi", type: "banner" },
  { key: "banner_visimisi", label: "Banner Visi & Misi", type: "banner" },
];

const allTextFields = [
  ...informasiUmumFields.map((f) => f.key),
  ...informasiUmumFields.map((f) => `${f.key}_en`),
  ...informasiUmumFields.map((f) => `${f.key}_cn`),
  ...kontakFields.map((f) => f.key),
];

interface VisiMisiTabsProps {
  values: Record<string, string>;
  setValues: (v: Record<string, string>) => void;
}

const visiMisiLimits = {
  visi: 1000,
  misi: 2000,
};

function VisiMisiTabs({ values, setValues }: VisiMisiTabsProps) {
  const [activeTab, setActiveTab] = useState("id");

  return (
    <div>
      <div className="mb-4 flex gap-2 border-b">
        {visiMisiTabs.map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key)}
            className={`border-b-2 px-4 py-2 text-sm font-medium transition-colors ${
              activeTab === tab.key
                ? "border-blue-600 text-blue-600"
                : "border-transparent text-gray-500 hover:text-gray-700"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>
      <div className="space-y-4">
        <div>
          <label className="mb-1 block text-sm font-medium text-gray-700">
            Visi ({visiMisiTabs.find((t) => t.key === activeTab)?.label})
          </label>
          <textarea
            value={values[`visi_fakultas_${activeTab}`] || ""}
            onChange={(e) => setValues({ ...values, [`visi_fakultas_${activeTab}`]: e.target.value })}
            placeholder="Masukkan visi"
            rows={4}
            maxLength={visiMisiLimits.visi}
            className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
          />
          <div className="mt-1 flex items-center justify-between">
            <p className={`text-xs ${(values[`visi_fakultas_${activeTab}`] || "").length > visiMisiLimits.visi ? "text-red-600" : "text-gray-500"}`}>
              {(values[`visi_fakultas_${activeTab}`] || "").length}/{visiMisiLimits.visi} karakter
            </p>
            {(values[`visi_fakultas_${activeTab}`] || "").length > visiMisiLimits.visi && (
              <p className="text-xs text-red-600">Melebihi batas maksimal!</p>
            )}
          </div>
        </div>
        <div>
          <label className="mb-1 block text-sm font-medium text-gray-700">
            Misi - satu item per baris ({visiMisiTabs.find((t) => t.key === activeTab)?.label})
          </label>
          <textarea
            value={values[`misi_fakultas_${activeTab}`] || ""}
            onChange={(e) => setValues({ ...values, [`misi_fakultas_${activeTab}`]: e.target.value })}
            placeholder="Masukkan satu misi per baris"
            rows={6}
            maxLength={visiMisiLimits.misi}
            className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
          />
          <div className="mt-1 flex items-center justify-between">
            <p className={`text-xs ${(values[`misi_fakultas_${activeTab}`] || "").length > visiMisiLimits.misi ? "text-red-600" : "text-gray-500"}`}>
              {(values[`misi_fakultas_${activeTab}`] || "").length}/{visiMisiLimits.misi} karakter
            </p>
            {(values[`misi_fakultas_${activeTab}`] || "").length > visiMisiLimits.misi && (
              <p className="text-xs text-red-600">Melebihi batas maksimal!</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

const visiMisiFieldKeys = [
  "visi_fakultas_id", "visi_fakultas_en", "visi_fakultas_cn",
  "misi_fakultas_id", "misi_fakultas_en", "misi_fakultas_cn",
];

export default function IdentitasPage() {
  const theme = useAppSelector((state) => state.theme.current);
  const mounted = useMounted();
  const [values, setValues] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [uploadingKey, setUploadingKey] = useState<string | null>(null);
  const [uploadError, setUploadError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchIdentitas() {
      const result = await getIdentitas();
      if (result.success && result.data) {
        const map: Record<string, string> = {};
        result.data.forEach((item) => {
          map[item.name] = item.value;
        });
        setValues(map);
      }
      setLoading(false);
    }
    fetchIdentitas();
  }, []);

  async function handleSave() {
    const warnings: string[] = [];

    if ((values.nama_fakultas || "").length > 100) {
      warnings.push("Nama Fakultas melebihi 100 karakter");
    }
    if ((values.tagline || "").length > 200) {
      warnings.push("Tagline melebihi 200 karakter");
    }
    if ((values.tentang_fakultas || "").length > 2000) {
      warnings.push("Tentang Fakultas melebihi 2000 karakter");
    }
    if ((values.email_fakultas || "").length > 100) {
      warnings.push("Email melebihi 100 karakter");
    }
    if ((values.telepon_fakultas || "").length > 20) {
      warnings.push("Telepon melebihi 20 karakter");
    }
    if ((values.alamat_fakultas || "").length > 500) {
      warnings.push("Alamat melebihi 500 karakter");
    }
    if ((values.jam_operasional || "").length > 200) {
      warnings.push("Jam Operasional melebihi 200 karakter");
    }

    const visiMisiKeys = [
      "visi_fakultas_id", "visi_fakultas_en", "visi_fakultas_cn",
      "misi_fakultas_id", "misi_fakultas_en", "misi_fakultas_cn",
    ];
    for (const key of visiMisiKeys) {
      const limit = key.startsWith("visi") ? 1000 : 2000;
      if ((values[key] || "").length > limit) {
        const label = key.replace("_fakultas_", " ").replace("_", " ");
        warnings.push(`${label} melebihi ${limit} karakter`);
      }
    }

    if (warnings.length > 0) {
      toast.warning(warnings.join(", "));
      return;
    }

    setSaving(true);
    try {
      const allFieldKeys = [
        ...allTextFields,
        ...bannerFields.map((f) => f.key),
        ...visiMisiFieldKeys,
      ];
      const promises = allFieldKeys.map((key) => {
        const value = values[key] || "";
        return setIdentitas(key, value);
      });
      await Promise.all(promises);
      toast.success("Identitas berhasil disimpan");
    } catch {
      toast.error("Gagal menyimpan identitas");
    } finally {
      setSaving(false);
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-t-transparent" style={{ borderColor: `${mounted ? theme.primaryHex : "#2563eb"} transparent transparent transparent` }} />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Identitas</h1>
          <p className="text-gray-600">Kelola informasi identitas fakultas</p>
        </div>
        <Button onClick={handleSave} disabled={saving}>
          <Save className="mr-2 h-4 w-4" />
          {saving ? "Menyimpan..." : "Simpan"}
        </Button>
      </div>

      <Card>
        <CardContent>
          <div className="mb-4 flex items-center gap-2">
            <Building2 className="h-5 w-5" style={{ color: mounted ? theme.primaryHex : "#2563eb" }} />
            <h2 className="text-lg font-semibold">Informasi Umum</h2>
          </div>
          <div className="space-y-4">
            {informasiUmumFields.map((field) => (
              <MultiLangInput
                key={field.key}
                label={field.label}
                value_id={values[field.key] || ""}
                value_en={values[`${field.key}_en`] || ""}
                value_cn={values[`${field.key}_cn`] || ""}
                onChange={(lang, value) => {
                  const suffix = lang === "id" ? "" : `_${lang}`;
                  setValues({ ...values, [`${field.key}${suffix}`]: value });
                }}
                type={field.type === "textarea" ? "textarea" : "input"}
                maxLength={field.maxLength}
              />
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent>
          <div className="mb-4 flex items-center gap-2">
            <Phone className="h-5 w-5" style={{ color: mounted ? theme.primaryHex : "#2563eb" }} />
            <h2 className="text-lg font-semibold">Kontak</h2>
          </div>
          <div className="space-y-4">
            {kontakFields.map((field) => (
              <div key={field.key}>
                <label className="mb-1 block text-sm font-medium text-gray-700">
                  {field.label}
                </label>
                {field.type === "textarea" ? (
                  <>
                    <textarea
                      value={values[field.key] || ""}
                      onChange={(e) => setValues({ ...values, [field.key]: e.target.value })}
                      placeholder={`Masukkan ${field.label.toLowerCase()}`}
                      rows={3}
                      maxLength={field.maxLength}
                      className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                    />
                    {field.maxLength && (
                      <div className="mt-1 flex items-center justify-between">
                        <p className={`text-xs ${(values[field.key] || "").length > field.maxLength ? "text-red-600" : "text-gray-500"}`}>
                          {(values[field.key] || "").length}/{field.maxLength} karakter
                        </p>
                        {(values[field.key] || "").length > field.maxLength && (
                          <p className="text-xs text-red-600">Melebihi batas maksimal!</p>
                        )}
                      </div>
                    )}
                  </>
                ) : (
                  <>
                    <Input
                      value={values[field.key] || ""}
                      onChange={(e) => setValues({ ...values, [field.key]: e.target.value })}
                      placeholder={`Masukkan ${field.label.toLowerCase()}`}
                      maxLength={field.maxLength}
                    />
                    {field.maxLength && (
                      <div className="mt-1 flex items-center justify-between">
                        <p className={`text-xs ${(values[field.key] || "").length > field.maxLength ? "text-red-600" : "text-gray-500"}`}>
                          {(values[field.key] || "").length}/{field.maxLength} karakter
                        </p>
                        {(values[field.key] || "").length > field.maxLength && (
                          <p className="text-xs text-red-600">Melebihi batas maksimal!</p>
                        )}
                      </div>
                    )}
                  </>
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent>
          <div className="mb-4 flex items-center gap-2">
            <Eye className="h-5 w-5" style={{ color: mounted ? theme.primaryHex : "#2563eb" }} />
            <Target className="h-5 w-5" style={{ color: mounted ? theme.primaryHex : "#2563eb" }} />
            <h2 className="text-lg font-semibold">Visi & Misi</h2>
          </div>
          <VisiMisiTabs values={values} setValues={setValues} />
        </CardContent>
      </Card>

      <Card>
        <CardContent>
          <div className="mb-4 flex items-center gap-2">
            <Image className="h-5 w-5" style={{ color: mounted ? theme.primaryHex : "#2563eb" }} />
            <h2 className="text-lg font-semibold">Banner Halaman</h2>
          </div>
          <p className="mb-4 text-sm text-gray-500">
            Ukuran banner: <strong>1920 x 400 px</strong> | Banner Landing Page: <strong>1920 x 600 px</strong> | Maksimal <strong>2MB</strong>
          </p>
          {uploadError && (
            <div className="mb-4 rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-700">
              {uploadError}
            </div>
          )}
          <div className="grid gap-6 sm:grid-cols-2">
            {bannerFields.map((field) => (
              <div key={field.key}>
                <label className="mb-2 block text-sm font-medium text-gray-700">
                  {field.label}
                </label>
                {values[field.key] ? (
                  <div className="relative">
                    <img
                      src={values[field.key]}
                      alt={field.label}
                      className="h-32 w-full rounded-lg object-cover"
                    />
                    <button
                      onClick={() => setValues({ ...values, [field.key]: "" })}
                      className="absolute right-2 top-2 rounded-full bg-red-500 p-1 text-white hover:bg-red-600"
                    >
                      <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </div>
                ) : uploadingKey === field.key ? (
                  <div className="flex h-32 items-center justify-center rounded-lg border-2 border-dashed border-gray-300">
                    <div className="h-8 w-8 animate-spin rounded-full border-4 border-gray-300 border-t-blue-600" />
                  </div>
                ) : (
                  <label className="flex h-32 cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-300 hover:border-blue-500">
                    <svg className="mb-2 h-8 w-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    <span className="text-sm text-gray-500">Upload Banner</span>
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={async (e) => {
                        const file = e.target.files?.[0];
                        if (!file) return;

                        if (file.size > 2 * 1024 * 1024) {
                          setUploadError("Ukuran file maksimal 2MB");
                          return;
                        }

                        setUploadError(null);
                        setUploadingKey(field.key);
                        try {
                          const url = await uploadToStorage(file, "banner");
                          setValues({ ...values, [field.key]: url });
                        } catch {
                          setUploadError("Gagal upload banner");
                        } finally {
                          setUploadingKey(null);
                        }
                      }}
                    />
                  </label>
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <LoadingOverlay open={saving} message="Menyimpan identitas..." />
    </div>
  );
}
