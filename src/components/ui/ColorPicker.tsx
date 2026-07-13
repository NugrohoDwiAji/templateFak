"use client";

import { useState } from "react";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

interface ColorPickerProps {
  value: string;
  onChange: (value: string) => void;
  label?: string;
  colors?: string[];
}

const presetColors = [
  { name: "Biru", hex: "#2563eb", tailwind: "blue-600" },
  { name: "Biru Tua", hex: "#1e40af", tailwind: "blue-800" },
  { name: "Hijau", hex: "#059669", tailwind: "emerald-600" },
  { name: "Hijau Tua", hex: "#065f46", tailwind: "emerald-800" },
  { name: "Ungu", hex: "#7c3aed", tailwind: "violet-600" },
  { name: "Ungu Tua", hex: "#5b21b6", tailwind: "violet-800" },
  { name: "Merah", hex: "#e11d48", tailwind: "rose-600" },
  { name: "Merah Tua", hex: "#9f1239", tailwind: "rose-800" },
  { name: "Oranye", hex: "#ea580c", tailwind: "orange-600" },
  { name: "Oranye Tua", hex: "#9a3412", tailwind: "orange-800" },
  { name: "Teal", hex: "#0d9488", tailwind: "teal-600" },
  { name: "Teal Tua", hex: "#115e59", tailwind: "teal-800" },
  { name: "Abu Muda", hex: "#f9fafb", tailwind: "gray-50" },
  { name: "Abu", hex: "#f1f5f9", tailwind: "slate-100" },
  { name: "Abu Tua", hex: "#1f2937", tailwind: "gray-800" },
  { name: "Putih", hex: "#ffffff", tailwind: "white" },
  { name: "Hitam", hex: "#000000", tailwind: "black" },
];

function ColorPicker({ value, onChange, label }: ColorPickerProps) {
  const [showCustom, setShowCustom] = useState(false);

  return (
    <div className="space-y-2">
      {label && (
        <label className="block text-sm font-medium text-gray-700">
          {label}
        </label>
      )}
      <div className="flex flex-wrap gap-2">
        {presetColors.map((color) => (
          <button
            key={color.hex}
            type="button"
            onClick={() => onChange(color.tailwind)}
            className={cn(
              "relative h-8 w-8 rounded-lg border-2 transition-all hover:scale-110",
              value === color.tailwind
                ? "border-gray-800 ring-2 ring-gray-400"
                : "border-gray-200"
            )}
            style={{ backgroundColor: color.hex }}
            title={color.name}
          >
            {value === color.tailwind && (
              <Check
                className="absolute inset-0 m-auto h-4 w-4"
                style={{
                  color: color.hex === "#ffffff" || color.hex === "#f9fafb" || color.hex === "#f1f5f9"
                    ? "#1f2937"
                    : "#ffffff",
                }}
              />
            )}
          </button>
        ))}
      </div>
      <div className="flex items-center gap-2">
        <button
          type="button"
          onClick={() => setShowCustom(!showCustom)}
          className="text-sm text-blue-600 hover:text-blue-800"
        >
          {showCustom ? "Sembunyikan" : "Warna Kustom"}
        </button>
      </div>
      {showCustom && (
        <div className="flex items-center gap-2">
          <input
            type="color"
            value={
              presetColors.find((c) => c.tailwind === value)?.hex || "#000000"
            }
            onChange={(e) => onChange(e.target.value)}
            className="h-8 w-8 cursor-pointer rounded border-0"
          />
          <input
            type="text"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            className="flex-1 rounded-lg border border-gray-300 px-3 py-1.5 text-sm"
            placeholder="Contoh: blue-600"
          />
        </div>
      )}
    </div>
  );
}

export { ColorPicker };
