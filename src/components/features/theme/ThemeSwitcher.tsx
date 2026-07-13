"use client";

import { useState, useEffect } from "react";
import { Palette, Check } from "lucide-react";
import { useAppDispatch, useAppSelector } from "@/store/store";
import { setTheme, setThemes } from "@/store/slices/themeSlice";
import { getThemes, setActiveTheme, type ThemeData } from "@/actions/theme.actions";
import { cn } from "@/lib/utils";

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

function ThemeSwitcher() {
  const [open, setOpen] = useState(false);
  const dispatch = useAppDispatch();
  const { current, themes } = useAppSelector((state) => state.theme);

  useEffect(() => {
    const fetchThemes = async () => {
      const result = await getThemes();
      if (result.success && result.data) {
        dispatch(setThemes(result.data.map(serializeTheme)));
      }
    };
    fetchThemes();
  }, [dispatch]);

  const handleSelectTheme = async (theme: ThemeData) => {
    dispatch(setTheme(serializeTheme(theme)));
    await setActiveTheme(theme.id);
    setOpen(false);
  };

  return (
    <div className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-2 rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm font-medium text-gray-700 shadow-sm transition-colors hover:bg-gray-50"
        title="Ubah Tema"
      >
        <Palette className="h-4 w-4" />
        <span className="hidden sm:inline">Tema</span>
      </button>

      {open && (
        <>
          <div
            className="fixed inset-0 z-40"
            onClick={() => setOpen(false)}
          />
          <div className="absolute right-0 top-full z-50 mt-2 w-72 rounded-xl border border-gray-200 bg-white py-2 shadow-lg">
            <div className="px-3 py-1 text-xs font-semibold text-gray-400">
              Pilih Tema Warna
            </div>
            <div className="max-h-80 overflow-y-auto">
              {themes.length === 0 ? (
                <div className="px-3 py-4 text-center text-sm text-gray-500">
                  Belum ada tema tersedia
                </div>
              ) : (
                themes.map((theme) => (
                  <button
                    key={theme.id}
                    onClick={() => handleSelectTheme(theme)}
                    className={cn(
                      "flex w-full items-center gap-3 px-3 py-3 text-sm transition-colors hover:bg-gray-50",
                      current.id === theme.id && "bg-gray-50"
                    )}
                  >
                    <div className="flex flex-col gap-1">
                      <div
                        className="h-6 w-6 rounded-full border border-gray-200"
                        style={{ backgroundColor: theme.primaryHex }}
                      />
                      <div
                        className="h-6 w-6 rounded-full border border-gray-200"
                        style={{ backgroundColor: theme.secondaryHex }}
                      />
                    </div>
                    <div className="flex-1 text-left">
                      <div className="font-medium text-gray-800">{theme.name}</div>
                      <div className="text-xs text-gray-500">
                        Primary + Secondary
                      </div>
                    </div>
                    {current.id === theme.id && (
                      <Check className="h-4 w-4 text-green-600" />
                    )}
                  </button>
                ))
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export { ThemeSwitcher };
