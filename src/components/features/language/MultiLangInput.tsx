"use client";

import { useState } from "react";
import { useAppSelector } from "@/store/store";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/Tabs";
import { Input } from "@/components/ui/Input";
import { Textarea } from "@/components/ui/Textarea";

interface MultiLangInputProps {
  label: string;
  value_id: string;
  value_en: string;
  value_cn: string;
  onChange: (lang: "id" | "en" | "cn", value: string) => void;
  type?: "input" | "textarea";
  placeholder?: string;
  maxLength?: number;
}

function MultiLangInput({
  label,
  value_id,
  value_en,
  value_cn,
  onChange,
  type = "input",
  maxLength,
}: MultiLangInputProps) {
  const language = useAppSelector((state) => state.language.current);
  const [activeTab, setActiveTab] = useState<"id" | "en" | "cn">(language);

  const values: Record<string, string> = {
    id: value_id,
    en: value_en,
    cn: value_cn,
  };

  const Component = type === "textarea" ? Textarea : Input;

  return (
    <div className="space-y-2">
      <label className="text-sm font-medium text-gray-700">{label}</label>
      <Tabs value={activeTab} onValueChange={(v) => setActiveTab(v as "id" | "en" | "cn")}>
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="id">🇮🇩 Indonesia</TabsTrigger>
          <TabsTrigger value="en">🇬🇧 English</TabsTrigger>
          <TabsTrigger value="cn">🇨🇳 China</TabsTrigger>
        </TabsList>
        {(["id", "en", "cn"] as const).map((lang) => (
          <TabsContent key={lang} value={lang}>
            <Component
              value={values[lang]}
              onChange={(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
                onChange(lang, e.target.value)
              }
              placeholder={`${label} (${lang.toUpperCase()})`}
              maxLength={maxLength}
            />
            {maxLength && (
              <div className="mt-1 flex items-center justify-between">
                <p className={`text-xs ${(values[lang] || "").length > maxLength ? "text-red-600" : "text-gray-500"}`}>
                  {(values[lang] || "").length}/{maxLength} karakter
                </p>
                {(values[lang] || "").length > maxLength && (
                  <p className="text-xs text-red-600">Melebihi batas maksimal!</p>
                )}
              </div>
            )}
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
}

export { MultiLangInput };
