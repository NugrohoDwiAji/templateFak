"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import { BeritaSchema, type BeritaInput } from "@/lib/validations";
import { formatZodError } from "@/lib/utils/validation";

export async function getBerita() {
  try {
    const berita = await prisma.berita.findMany({
      orderBy: { uploadat: "desc" },
    });
    return { success: true, data: berita };
  } catch {
    return { success: false, error: "Gagal mengambil data berita" };
  }
}

export async function getBeritaById(id: string) {
  try {
    const berita = await prisma.berita.findUnique({ where: { id } });
    if (!berita) return { success: false, error: "Berita tidak ditemukan" };
    return { success: true, data: berita };
  } catch {
    return { success: false, error: "Gagal mengambil data berita" };
  }
}

export async function createBerita(
  data: BeritaInput,
  filepath?: string | null
) {
  try {
    const validated = BeritaSchema.parse(data);
    const berita = await prisma.berita.create({
      data: { ...validated, filepath: filepath ?? null },
    });
    revalidatePath("/admin/berita");
    revalidatePath("/berita");
    return { success: true, data: berita };
  } catch (error) {
    return { success: false, error: formatZodError(error) };
  }
}

export async function updateBerita(
  id: string,
  data: BeritaInput,
  filepath?: string | null
) {
  try {
    const validated = BeritaSchema.parse(data);
    const berita = await prisma.berita.update({
      where: { id },
      data: { ...validated, filepath: filepath ?? undefined },
    });
    revalidatePath("/admin/berita");
    revalidatePath("/berita");
    return { success: true, data: berita };
  } catch (error) {
    return { success: false, error: formatZodError(error) };
  }
}

export async function deleteBerita(id: string) {
  try {
    await prisma.berita.delete({ where: { id } });
    revalidatePath("/admin/berita");
    revalidatePath("/berita");
    return { success: true };
  } catch {
    return { success: false, error: "Gagal menghapus berita" };
  }
}
