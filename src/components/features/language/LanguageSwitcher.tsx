"use client";

import { useAppDispatch, useAppSelector } from "@/store/store";
import { setLanguage } from "@/store/slices/languageSlice";
import { cn } from "@/lib/utils";
import { useMounted } from "@/hooks/useMounted";
import type { Language } from "@/types";

const languages: { code: Language; label: string; flag: string }[] = [
  { code: "id", label: "Indonesia", flag: "🇮🇩" },
  { code: "en", label: "English", flag: "🇬🇧" },
  { code: "cn", label: "中文", flag: "🇨🇳" },
];

function LanguageSwitcher() {
  const dispatch = useAppDispatch();
  const current = useAppSelector((state) => state.language.current);
  const theme = useAppSelector((state) => state.theme.current);
  const mounted = useMounted();

  return (
    <div className="flex items-center gap-1">
      {languages.map((lang) => (
        <button
          key={lang.code}
          onClick={() => dispatch(setLanguage(lang.code))}
          className={cn(
            "flex items-center gap-1.5 rounded-md px-2.5 py-1 text-xs font-medium transition-all"
          )}
          style={{
            backgroundColor: current === lang.code ? "white" : "transparent",
            color: current === lang.code
              ? (mounted ? theme.primaryHex : "#2563eb")
              : (mounted ? theme.footerTextHex : "#ffffff"),
          }}
          title={lang.label}
        >
          <span className="text-sm">{lang.flag}</span>
          <span className="hidden sm:inline">{lang.label}</span>
        </button>
      ))}
    </div>
  );
}

export { LanguageSwitcher };
