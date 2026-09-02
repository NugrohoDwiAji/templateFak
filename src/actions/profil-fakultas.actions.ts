"use server";

import { getIdentitas } from "@/actions/identitas.actions";
import type { ProfilFakultas, Language } from "@/types";

interface IdentitasRow {
  name: string;
  value: string;
}

function getValue(rows: IdentitasRow[], key: string): string {
  return rows.find((r) => r.name === key)?.value ?? "";
}

export async function getProfilFakultas(
  lang: Language = "id"
): Promise<{ success: boolean; data?: ProfilFakultas; error?: string }> {
  try {
    const result = await getIdentitas();
    if (!result.success || !result.data) {
      return { success: false, error: result.error ?? "Gagal mengambil data identitas" };
    }

    const rows = result.data;

    const visi = getValue(rows, `visi_fakultas_${lang}`) || getValue(rows, "visi_fakultas_id");
    const misi = getValue(rows, `misi_fakultas_${lang}`) || getValue(rows, "misi_fakultas_id");

    const data: ProfilFakultas = {
      nama: getValue(rows, `nama_fakultas_${lang}`) || getValue(rows, "nama_fakultas"),
      tagline: getValue(rows, `tagline_${lang}`) || getValue(rows, "tagline"),
      tentang: getValue(rows, `tentang_fakultas_${lang}`) || getValue(rows, "tentang_fakultas"),
      gambar: getValue(rows, "gambar_tentang"),
      alamat: getValue(rows, "alamat_fakultas"),
      telepon: getValue(rows, "telepon_fakultas"),
      email: getValue(rows, "email_fakultas"),
      visi,
      misi,
    };

    return { success: true, data };
  } catch {
    return { success: false, error: "Gagal mengambil profil fakultas" };
  }
}
