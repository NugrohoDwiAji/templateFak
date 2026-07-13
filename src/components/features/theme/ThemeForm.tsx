"use client";

import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { ColorPicker } from "@/components/ui/ColorPicker";
import type { ThemeData } from "@/actions/theme.actions";

interface ThemeFormProps {
  theme?: ThemeData | null;
  onSubmit: (data: Omit<ThemeData, "id" | "isActive">) => Promise<void>;
  onCancel: () => void;
}

function ThemeForm({ theme, onSubmit, onCancel }: ThemeFormProps) {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: theme?.name || "",
    primaryColor: theme?.primaryColor || "blue-600",
    primaryHex: theme?.primaryHex || "#2563eb",
    secondaryColor: theme?.secondaryColor || "slate-100",
    secondaryHex: theme?.secondaryHex || "#f1f5f9",
    accentColor: theme?.accentColor || "blue-500",
    accentHex: theme?.accentHex || "#3b82f6",
    headerBg: theme?.headerBg || "white",
    headerBgHex: theme?.headerBgHex || "#ffffff",
    headerText: theme?.headerText || "gray-800",
    headerTextHex: theme?.headerTextHex || "#1f2937",
    sidebarBg: theme?.sidebarBg || "blue-800",
    sidebarBgHex: theme?.sidebarBgHex || "#1e40af",
    sidebarText: theme?.sidebarText || "white",
    sidebarTextHex: theme?.sidebarTextHex || "#ffffff",
    sidebarActive: theme?.sidebarActive || "white",
    sidebarActiveHex: theme?.sidebarActiveHex || "#ffffff",
    bodyBg: theme?.bodyBg || "gray-50",
    bodyBgHex: theme?.bodyBgHex || "#f9fafb",
    bodyText: theme?.bodyText || "gray-800",
    bodyTextHex: theme?.bodyTextHex || "#1f2937",
    cardBg: theme?.cardBg || "white",
    cardBgHex: theme?.cardBgHex || "#ffffff",
    cardBorder: theme?.cardBorder || "gray-200",
    cardBorderHex: theme?.cardBorderHex || "#e5e7eb",
    buttonPrimary: theme?.buttonPrimary || "blue-600",
    buttonPrimaryHex: theme?.buttonPrimaryHex || "#2563eb",
    buttonSecondary: theme?.buttonSecondary || "gray-200",
    buttonSecondaryHex: theme?.buttonSecondaryHex || "#e5e7eb",
    footerBg: theme?.footerBg || "blue-800",
    footerBgHex: theme?.footerBgHex || "#1e40af",
    footerText: theme?.footerText || "white",
    footerTextHex: theme?.footerTextHex || "#ffffff",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await onSubmit(formData);
    } finally {
      setLoading(false);
    }
  };

  const colorMap: Record<string, string> = {
    "blue-600": "#2563eb",
    "blue-800": "#1e40af",
    "emerald-600": "#059669",
    "emerald-800": "#065f46",
    "violet-600": "#7c3aed",
    "violet-800": "#5b21b6",
    "rose-600": "#e11d48",
    "rose-800": "#9f1239",
    "orange-600": "#ea580c",
    "orange-800": "#9a3412",
    "teal-600": "#0d9488",
    "teal-800": "#115e59",
    "gray-50": "#f9fafb",
    "gray-800": "#1f2937",
    "slate-100": "#f1f5f9",
    "white": "#ffffff",
    "black": "#000000",
  };

  const updateField = (field: string, value: string) => {
    setFormData((prev) => {
      const hexField = field + "Hex";
      return {
        ...prev,
        [field]: value,
        [hexField]: colorMap[value] || value,
      };
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <Input
        label="Nama Tema"
        value={formData.name}
        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
        placeholder="Masukkan nama tema"
        required
      />

      <div className="rounded-lg border border-gray-200 bg-gray-50 p-4">
        <h3 className="mb-4 text-sm font-semibold text-gray-700">
          Warna Utama
        </h3>
        <div className="grid gap-4 md:grid-cols-2">
          <ColorPicker
            label="Primary Color"
            value={formData.primaryColor}
            onChange={(v) => updateField("primaryColor", v)}
          />
          <ColorPicker
            label="Secondary Color"
            value={formData.secondaryColor}
            onChange={(v) => updateField("secondaryColor", v)}
          />
          <ColorPicker
            label="Accent Color"
            value={formData.accentColor}
            onChange={(v) => updateField("accentColor", v)}
          />
        </div>
      </div>

      <div className="rounded-lg border border-gray-200 bg-gray-50 p-4">
        <h3 className="mb-4 text-sm font-semibold text-gray-700">Header</h3>
        <div className="grid gap-4 md:grid-cols-2">
          <ColorPicker
            label="Background"
            value={formData.headerBg}
            onChange={(v) => updateField("headerBg", v)}
          />
          <ColorPicker
            label="Text Color"
            value={formData.headerText}
            onChange={(v) => updateField("headerText", v)}
          />
        </div>
      </div>

      <div className="rounded-lg border border-gray-200 bg-gray-50 p-4">
        <h3 className="mb-4 text-sm font-semibold text-gray-700">Sidebar</h3>
        <div className="grid gap-4 md:grid-cols-3">
          <ColorPicker
            label="Background"
            value={formData.sidebarBg}
            onChange={(v) => updateField("sidebarBg", v)}
          />
          <ColorPicker
            label="Text Color"
            value={formData.sidebarText}
            onChange={(v) => updateField("sidebarText", v)}
          />
          <ColorPicker
            label="Active State"
            value={formData.sidebarActive}
            onChange={(v) => updateField("sidebarActive", v)}
          />
        </div>
      </div>

      <div className="rounded-lg border border-gray-200 bg-gray-50 p-4">
        <h3 className="mb-4 text-sm font-semibold text-gray-700">Body</h3>
        <div className="grid gap-4 md:grid-cols-2">
          <ColorPicker
            label="Background"
            value={formData.bodyBg}
            onChange={(v) => updateField("bodyBg", v)}
          />
          <ColorPicker
            label="Text Color"
            value={formData.bodyText}
            onChange={(v) => updateField("bodyText", v)}
          />
        </div>
      </div>

      <div className="rounded-lg border border-gray-200 bg-gray-50 p-4">
        <h3 className="mb-4 text-sm font-semibold text-gray-700">Card</h3>
        <div className="grid gap-4 md:grid-cols-2">
          <ColorPicker
            label="Background"
            value={formData.cardBg}
            onChange={(v) => updateField("cardBg", v)}
          />
          <ColorPicker
            label="Border"
            value={formData.cardBorder}
            onChange={(v) => updateField("cardBorder", v)}
          />
        </div>
      </div>

      <div className="rounded-lg border border-gray-200 bg-gray-50 p-4">
        <h3 className="mb-4 text-sm font-semibold text-gray-700">Button</h3>
        <div className="grid gap-4 md:grid-cols-2">
          <ColorPicker
            label="Primary Button"
            value={formData.buttonPrimary}
            onChange={(v) => updateField("buttonPrimary", v)}
          />
          <ColorPicker
            label="Secondary Button"
            value={formData.buttonSecondary}
            onChange={(v) => updateField("buttonSecondary", v)}
          />
        </div>
      </div>

      <div className="rounded-lg border border-gray-200 bg-gray-50 p-4">
        <h3 className="mb-4 text-sm font-semibold text-gray-700">Footer</h3>
        <div className="grid gap-4 md:grid-cols-2">
          <ColorPicker
            label="Background"
            value={formData.footerBg}
            onChange={(v) => updateField("footerBg", v)}
          />
          <ColorPicker
            label="Text Color"
            value={formData.footerText}
            onChange={(v) => updateField("footerText", v)}
          />
        </div>
      </div>

      <div className="flex justify-end gap-3">
        <Button type="button" variant="secondary" onClick={onCancel}>
          Batal
        </Button>
        <Button type="submit" loading={loading}>
          {theme ? "Update Tema" : "Buat Tema"}
        </Button>
      </div>
    </form>
  );
}

export { ThemeForm };
