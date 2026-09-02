"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import { ProdiSchema, type ProdiInput } from "@/lib/validations";
import { formatZodError } from "@/lib/utils/validation";

export async function getProdi() {
  try {
    const prodi = await prisma.prodi.findMany({ orderBy: { nama: "asc" } });
    return { success: true, data: prodi };
  } catch {
    return { success: false, error: "Gagal mengambil data prodi" };
  }
}

export async function getProdiBySlug(slug: string) {
  try {
    const prodi = await prisma.prodi.findUnique({ where: { slug } });
    if (!prodi) return { success: false, error: "Prodi tidak ditemukan" };
    return { success: true, data: prodi };
  } catch {
    return { success: false, error: "Gagal mengambil data prodi" };
  }
}

export async function createProdi(data: ProdiInput) {
  try {
    const validated = ProdiSchema.parse(data);
    const prodi = await prisma.prodi.create({ data: validated });
    revalidatePath("/admin/prodi");
    revalidatePath("/prodi");
    return { success: true, data: prodi };
  } catch (error) {
    return { success: false, error: formatZodError(error) };
  }
}

export async function updateProdi(id: string, data: ProdiInput) {
  try {
    const validated = ProdiSchema.parse(data);
    const prodi = await prisma.prodi.update({
      where: { id },
      data: validated,
    });
    revalidatePath("/admin/prodi");
    revalidatePath("/prodi");
    return { success: true, data: prodi };
  } catch (error) {
    return { success: false, error: formatZodError(error) };
  }
}

export async function deleteProdi(id: string) {
  try {
    await prisma.prodi.delete({ where: { id } });
    revalidatePath("/admin/prodi");
    revalidatePath("/prodi");
    return { success: true };
  } catch {
    return { success: false, error: "Gagal menghapus prodi" };
  }
}
