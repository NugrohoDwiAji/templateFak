"use client";

import Link from "next/link";
import { Mail, Phone, MapPin } from "lucide-react";
import { useAppSelector } from "@/store/store";
import { useMounted } from "@/hooks/useMounted";
import { useIdentitas } from "@/hooks/useIdentitas";

function Footer() {
  const theme = useAppSelector((state) => state.theme.current);
  const mounted = useMounted();
  const { data: identitas } = useIdentitas();

  const namaFakultas = identitas.nama_fakultas || "";
  const tagline = identitas.tagline || "";
  const alamat = identitas.alamat_fakultas || "";
  const telepon = identitas.telepon_fakultas || "";
  const email = identitas.email_fakultas || "";

  return (
    <footer
      className="border-t"
      style={{
        backgroundColor: mounted ? theme.footerBgHex : "#1e40af",
        borderColor: mounted ? theme.primaryHex + "40" : "rgba(37, 99, 235, 0.25)",
      }}
    >
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-8 md:grid-cols-3">
          <div>
            {namaFakultas && (
              <h3
                className="mb-4 text-sm font-semibold uppercase tracking-wider"
                style={{ color: mounted ? theme.footerTextHex : "#ffffff" }}
              >
                {namaFakultas}
              </h3>
            )}
            {tagline && (
              <p
                className="text-sm leading-relaxed"
                style={{ color: mounted ? theme.footerTextHex + "CC" : "#ffffffcc" }}
              >
                {tagline}
              </p>
            )}
          </div>

          <div>
            <h3
              className="mb-4 text-sm font-semibold uppercase tracking-wider"
              style={{ color: mounted ? theme.footerTextHex : "#ffffff" }}
            >
              Tautan
            </h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  href="/berita"
                  className="transition-colors hover:opacity-80"
                  style={{ color: mounted ? theme.footerTextHex + "CC" : "#ffffffcc" }}
                >
                  Berita
                </Link>
              </li>
              <li>
                <Link
                  href="/pengumuman"
                  className="transition-colors hover:opacity-80"
                  style={{ color: mounted ? theme.footerTextHex + "CC" : "#ffffffcc" }}
                >
                  Pengumuman
                </Link>
              </li>
              <li>
                <Link
                  href="/dosen"
                  className="transition-colors hover:opacity-80"
                  style={{ color: mounted ? theme.footerTextHex + "CC" : "#ffffffcc" }}
                >
                  Dosen
                </Link>
              </li>
              <li>
                <Link
                  href="/faq"
                  className="transition-colors hover:opacity-80"
                  style={{ color: mounted ? theme.footerTextHex + "CC" : "#ffffffcc" }}
                >
                  FAQ
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3
              className="mb-4 text-sm font-semibold uppercase tracking-wider"
              style={{ color: mounted ? theme.footerTextHex : "#ffffff" }}
            >
              Kontak
            </h3>
            <ul className="space-y-3 text-sm">
              {alamat && (
                <li
                  className="flex items-center gap-2"
                  style={{ color: mounted ? theme.footerTextHex + "CC" : "#ffffffcc" }}
                >
                  <MapPin className="h-4 w-4" />
                  <span>{alamat}</span>
                </li>
              )}
              {telepon && (
                <li
                  className="flex items-center gap-2"
                  style={{ color: mounted ? theme.footerTextHex + "CC" : "#ffffffcc" }}
                >
                  <Phone className="h-4 w-4" />
                  <span>{telepon}</span>
                </li>
              )}
              {email && (
                <li
                  className="flex items-center gap-2"
                  style={{ color: mounted ? theme.footerTextHex + "CC" : "#ffffffcc" }}
                >
                  <Mail className="h-4 w-4" />
                  <span>{email}</span>
                </li>
              )}
            </ul>
          </div>
        </div>

        <div
          className="mt-8 border-t pt-8 text-center text-sm"
          style={{
            borderColor: mounted ? theme.footerTextHex + "40" : "rgba(255, 255, 255, 0.25)",
            color: mounted ? theme.footerTextHex + "99" : "rgba(255, 255, 255, 0.6)",
          }}
        >
          &copy; {new Date().getFullYear()} {namaFakultas}. All rights reserved.
        </div>
      </div>
    </footer>
  );
}

export { Footer };
