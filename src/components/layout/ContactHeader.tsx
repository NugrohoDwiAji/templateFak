"use client";

import { Mail, Phone, MapPin } from "lucide-react";
import { LanguageSwitcher } from "@/components/features/language/LanguageSwitcher";
import { useAppSelector } from "@/store/store";
import { useMounted } from "@/hooks/useMounted";
import { useIdentitas } from "@/hooks/useIdentitas";

function ContactHeader() {
  const theme = useAppSelector((state) => state.theme.current);
  const mounted = useMounted();
  const { data: identitas } = useIdentitas();

  const telepon = identitas.telepon_fakultas || "";
  const email = identitas.email_fakultas || "";
  const alamat = identitas.alamat_fakultas || "";

  return (
    <div
      className="hidden border-b text-xs sm:block"
      style={{
        backgroundColor: mounted ? theme.primaryHex : "#2563eb",
        borderColor: mounted ? theme.primaryHex : "#2563eb",
      }}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-2 sm:px-6 lg:px-8">
        <div
          className="flex items-center gap-4"
          style={{ color: mounted ? theme.footerTextHex : "#ffffff" }}
        >
          {telepon && (
            <div className="flex items-center gap-1.5">
              <Phone className="h-3 w-3" />
              <span>{telepon}</span>
            </div>
          )}
          {email && (
            <div className="flex items-center gap-1.5">
              <Mail className="h-3 w-3" />
              <span>{email}</span>
            </div>
          )}
          {alamat && (
            <div className="flex items-center gap-1.5">
              <MapPin className="h-3 w-3" />
              <span>{alamat}</span>
            </div>
          )}
        </div>
        <LanguageSwitcher />
      </div>
    </div>
  );
}

export { ContactHeader };
