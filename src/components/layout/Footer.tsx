"use client";

import Link from "next/link";
import { Mail, Phone, MapPin, Clock, MessageCircle, Facebook, Instagram, Twitter, Youtube } from "lucide-react";
import { useAppSelector } from "@/store/store";
import { useMounted } from "@/hooks/useMounted";
import { useIdentitas } from "@/hooks/useIdentitas";
import { useLanguage } from "@/hooks/useLanguage";

const t = {
  tautan: { id: "Tautan", en: "Links", cn: "链接" },
  berita: { id: "Berita", en: "News", cn: "新闻" },
  pengumuman: { id: "Pengumuman", en: "Announcements", cn: "公告" },
  dosen: { id: "Dosen", en: "Lecturers", cn: "讲师" },
  faq: { id: "FAQ", en: "FAQ", cn: "常见问题" },
  kontak: { id: "Kontak", en: "Contact", cn: "联系方式" },
  sosialMedia: { id: "Sosial Media", en: "Social Media", cn: "社交媒体" },
  jamOperasional: { id: "Jam Operasional", en: "Operating Hours", cn: "营业时间" },
  allRightsReserved: { id: "Hak cipta dilindungi.", en: "All rights reserved.", cn: "版权所有。" },
};

const defaultAlamat = "Jl. Ismail Marzuki No. 22, Cilinaya, Cakranegara District, Mataram City, West Nusa Tenggara 83127";

function formatWhatsAppLink(number: string): string {
  let cleaned = number.replace(/[\s\-()]/g, "");

  if (cleaned.startsWith("62")) {
    return `https://wa.me/${cleaned}`;
  }

  if (cleaned.startsWith("0")) {
    cleaned = "62" + cleaned.substring(1);
  }

  if (cleaned.startsWith("+62")) {
    cleaned = cleaned.substring(1);
  }

  return `https://wa.me/${cleaned}`;
}

function Footer() {
  const theme = useAppSelector((state) => state.theme.current);
  const mounted = useMounted();
  const { data: identitas } = useIdentitas();
  const { current } = useLanguage();

  const namaFakultas = identitas[`nama_fakultas_${current}`] || identitas.nama_fakultas || "";
  const tagline = identitas[`tagline_${current}`] || identitas.tagline || "";
  const alamat = identitas.alamat_fakultas || "";
  const telepon = identitas.telepon_fakultas || "";
  const email = identitas.email_fakultas || "";
  const jamOperasional = identitas.jam_operasional || "";
  const whatsapp = identitas.whatsapp || "";
  const facebook = identitas.facebook || "";
  const instagram = identitas.instagram || "";
  const twitter = identitas.twitter || "";
  const youtube = identitas.youtube || "";
  const tiktok = identitas.tiktok || "";

  const displayAlamat = alamat || defaultAlamat;

  const textColor = mounted ? theme.footerTextHex : "#ffffff";
  const textColorMuted = mounted ? theme.footerTextHex + "CC" : "#ffffffcc";

  return (
    <footer
      className="border-t"
      style={{
        backgroundColor: mounted ? theme.footerBgHex : "#1e40af",
        borderColor: mounted ? theme.primaryHex + "40" : "rgba(37, 99, 235, 0.25)",
      }}
    >
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {/* Kolom 1: Logo + Info */}
          <div className="flex items-start gap-4">
            <Link href="/">
              <img
                src="/ubg.png"
                alt="Logo UBG"
                className="h-16 w-16 rounded-lg object-contain brightness-0 invert"
              />
            </Link>
            <div>
              {namaFakultas && (
                <h3
                  className="mb-4 text-sm font-semibold uppercase tracking-wider"
                  style={{ color: textColor }}
                >
                  {namaFakultas}
                </h3>
              )}
              {tagline && (
                <p
                  className="text-sm leading-relaxed"
                  style={{ color: textColorMuted }}
                >
                  {tagline}
                </p>
              )}
            </div>
          </div>

          {/* Kolom 2: Tautan */}
          <div>
            <h3
              className="mb-4 text-sm font-semibold uppercase tracking-wider"
              style={{ color: textColor }}
            >
              {t.tautan[current]}
            </h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  href="/berita"
                  className="transition-colors hover:opacity-80"
                  style={{ color: textColorMuted }}
                >
                  {t.berita[current]}
                </Link>
              </li>
              <li>
                <Link
                  href="/pengumuman"
                  className="transition-colors hover:opacity-80"
                  style={{ color: textColorMuted }}
                >
                  {t.pengumuman[current]}
                </Link>
              </li>
              <li>
                <Link
                  href="/dosen"
                  className="transition-colors hover:opacity-80"
                  style={{ color: textColorMuted }}
                >
                  {t.dosen[current]}
                </Link>
              </li>
              <li>
                <Link
                  href="/faq"
                  className="transition-colors hover:opacity-80"
                  style={{ color: textColorMuted }}
                >
                  {t.faq[current]}
                </Link>
              </li>
            </ul>
          </div>

          {/* Kolom 3: Kontak */}
          <div>
            <h3
              className="mb-4 text-sm font-semibold uppercase tracking-wider"
              style={{ color: textColor }}
            >
              {t.kontak[current]}
            </h3>
            <ul className="space-y-3 text-sm">
              <li
                className="flex items-start gap-2"
                style={{ color: textColorMuted }}
              >
                <MapPin className="mt-0.5 h-4 w-4 flex-shrink-0" />
                <span>{displayAlamat}</span>
              </li>
              {telepon && (
                <li
                  className="flex items-center gap-2"
                  style={{ color: textColorMuted }}
                >
                  <Phone className="h-4 w-4" />
                  <span>{telepon}</span>
                </li>
              )}
              {email && (
                <li
                  className="flex items-center gap-2"
                  style={{ color: textColorMuted }}
                >
                  <Mail className="h-4 w-4" />
                  <span>{email}</span>
                </li>
              )}
              {jamOperasional && (
                <li
                  className="flex items-start gap-2"
                  style={{ color: textColorMuted }}
                >
                  <Clock className="mt-0.5 h-4 w-4 flex-shrink-0" />
                  <span>{jamOperasional}</span>
                </li>
              )}
            </ul>
          </div>

          {/* Kolom 4: Sosial Media */}
          <div>
            <h3
              className="mb-4 text-sm font-semibold uppercase tracking-wider"
              style={{ color: textColor }}
            >
              {t.sosialMedia[current]}
            </h3>
            <ul className="space-y-3 text-sm">
              {whatsapp && (
                <li>
                  <a
                    href={formatWhatsAppLink(whatsapp)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 transition-colors hover:opacity-80"
                    style={{ color: textColorMuted }}
                  >
                    <MessageCircle className="h-4 w-4" />
                    <span>WhatsApp</span>
                  </a>
                </li>
              )}
              {facebook && (
                <li>
                  <a
                    href={facebook}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 transition-colors hover:opacity-80"
                    style={{ color: textColorMuted }}
                  >
                    <Facebook className="h-4 w-4" />
                    <span>Facebook</span>
                  </a>
                </li>
              )}
              {instagram && (
                <li>
                  <a
                    href={instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 transition-colors hover:opacity-80"
                    style={{ color: textColorMuted }}
                  >
                    <Instagram className="h-4 w-4" />
                    <span>Instagram</span>
                  </a>
                </li>
              )}
              {twitter && (
                <li>
                  <a
                    href={twitter}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 transition-colors hover:opacity-80"
                    style={{ color: textColorMuted }}
                  >
                    <Twitter className="h-4 w-4" />
                    <span>Twitter/X</span>
                  </a>
                </li>
              )}
              {youtube && (
                <li>
                  <a
                    href={youtube}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 transition-colors hover:opacity-80"
                    style={{ color: textColorMuted }}
                  >
                    <Youtube className="h-4 w-4" />
                    <span>YouTube</span>
                  </a>
                </li>
              )}
              {tiktok && (
                <li>
                  <a
                    href={tiktok}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 transition-colors hover:opacity-80"
                    style={{ color: textColorMuted }}
                  >
                    <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1v-3.5a6.37 6.37 0 00-.79-.05A6.34 6.34 0 003.15 15.2a6.34 6.34 0 0010.86 4.48V13a8.28 8.28 0 005.58 2.16V11.7a4.83 4.83 0 01-3.59-1.42V6.69h3.59z" />
                    </svg>
                    <span>TikTok</span>
                  </a>
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
          &copy; {new Date().getFullYear()} {namaFakultas}. {t.allRightsReserved[current]}
        </div>
      </div>
    </footer>
  );
}

export { Footer };
