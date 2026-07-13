"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import { DosenSchema, type DosenInput } from "@/lib/validations";

export async function getDosen() {
  try {
    const dosen = await prisma.dosen.findMany({
      orderBy: { create_at: "desc" },
      distinct: ["id"],
    });
    return { success: true, data: dosen };
  } catch {
    return { success: false, error: "Gagal mengambil data dosen" };
  }
}

export async function getDosenById(id: string) {
  try {
    const dosen = await prisma.dosen.findUnique({ where: { id } });
    if (!dosen) return { success: false, error: "Dosen tidak ditemukan" };
    return { success: true, data: dosen };
  } catch {
    return { success: false, error: "Gagal mengambil data dosen" };
  }
}

export async function createDosen(data: DosenInput) {
  try {
    const validated = DosenSchema.parse(data);
    const cleanData: Record<string, string> = {};
    for (const [key, value] of Object.entries(validated)) {
      if (value) cleanData[key] = value;
    }
    const dosen = await prisma.dosen.create({ data: cleanData });
    revalidatePath("/admin/dosen");
    revalidatePath("/dosen");
    return { success: true, data: dosen };
  } catch (error) {
    if (error instanceof Error) {
      return { success: false, error: error.message };
    }
    return { success: false, error: "Gagal membuat dosen" };
  }
}

export async function updateDosen(id: string, data: DosenInput) {
  try {
    const validated = DosenSchema.parse(data);
    const cleanData: Record<string, string> = {};
    for (const [key, value] of Object.entries(validated)) {
      if (value) cleanData[key] = value;
    }
    const dosen = await prisma.dosen.update({
      where: { id },
      data: cleanData,
    });
    revalidatePath("/admin/dosen");
    revalidatePath("/dosen");
    return { success: true, data: dosen };
  } catch (error) {
    if (error instanceof Error) {
      return { success: false, error: error.message };
    }
    return { success: false, error: "Gagal memperbarui dosen" };
  }
}

export async function deleteDosen(id: string) {
  try {
    await prisma.dosen.delete({ where: { id } });
    revalidatePath("/admin/dosen");
    revalidatePath("/dosen");
    return { success: true };
  } catch {
    return { success: false, error: "Gagal menghapus dosen" };
  }
}
