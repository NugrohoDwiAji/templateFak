"use client";

import { useState } from "react";
import { X, Image } from "lucide-react";
import { uploadToStorage } from "@/actions/upload.actions";
import { setIdentitas } from "@/actions/identitas.actions";

interface BannerUploadProps {
  label: string;
  identitasKey: string;
  currentBanner?: string | null;
  onSaved?: (url: string) => void;
  recommendedWidth?: number;
  recommendedHeight?: number;
}

function BannerUpload({
  label,
  identitasKey,
  currentBanner,
  onSaved,
  recommendedWidth = 1920,
  recommendedHeight = 400,
}: BannerUploadProps) {
  const [banner, setBanner] = useState<string | null>(currentBanner ?? null);
  const [uploading, setUploading] = useState(false);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    try {
      const url = await uploadToStorage(file, "banner");
      const result = await setIdentitas(identitasKey, url);
      if (result.success) {
        setBanner(url);
        onSaved?.(url);
      }
    } catch {
      // silently fail
    } finally {
      setUploading(false);
    }
  };

  const handleRemove = async () => {
    const result = await setIdentitas(identitasKey, "");
    if (result.success) {
      setBanner(null);
      onSaved?.("");
    }
  };

  return (
    <div className="space-y-2">
      <label className="text-sm font-medium text-gray-700">{label}</label>
      <p className="text-xs text-gray-500">
        Ukuran yang disarankan: <strong>{recommendedWidth} x {recommendedHeight} px</strong> (rasio {recommendedWidth}:{recommendedHeight})
      </p>

      {banner ? (
        <div className="relative overflow-hidden rounded-lg border border-gray-200">
          <img
            src={banner}
            alt={label}
            className="h-40 w-full object-cover"
          />
          <button
            type="button"
            onClick={handleRemove}
            className="absolute right-2 top-2 rounded-full bg-red-500 p-1 text-white shadow-sm hover:bg-red-600"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      ) : (
        <label className="flex cursor-pointer flex-col items-center gap-2 rounded-lg border-2 border-dashed border-gray-300 bg-gray-50 p-6 transition-colors hover:border-gray-400 hover:bg-gray-100">
          {uploading ? (
            <div className="h-8 w-8 animate-spin rounded-full border-4 border-gray-300 border-t-blue-600" />
          ) : (
            <>
              <Image className="h-8 w-8 text-gray-400" />
              <span className="text-sm text-gray-500">Klik untuk upload banner</span>
              <span className="text-xs text-gray-400"> JPG, PNG, atau WebP</span>
            </>
          )}
          <input
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleFileChange}
            disabled={uploading}
          />
        </label>
      )}
    </div>
  );
}

export { BannerUpload };
