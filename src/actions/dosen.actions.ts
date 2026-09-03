"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import { DosenSchema, type DosenInput } from "@/lib/validations";
import { formatZodError } from "@/lib/utils/validation";
import { serializeDates } from "@/lib/utils/serialize";
import type { Prisma } from "@prisma/client";

export async function getDosen() {
  try {
    const dosen = await prisma.dosen.findMany({
      orderBy: { create_at: "desc" },
      distinct: ["id"],
    });
    return { success: true, data: serializeDates(dosen) };
  } catch {
    return { success: false, error: "Gagal mengambil data dosen" };
  }
}

export async function getDosenById(id: string) {
  try {
    const dosen = await prisma.dosen.findUnique({ where: { id } });
    if (!dosen) return { success: false, error: "Dosen tidak ditemukan" };
    return { success: true, data: serializeDates(dosen) };
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
    const dosen = await prisma.dosen.create({ data: cleanData as Prisma.dosenCreateInput });
    revalidatePath("/admin/dosen");
    revalidatePath("/dosen");
    return { success: true, data: serializeDates(dosen) };
  } catch (error) {
    return { success: false, error: formatZodError(error) };
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
      data: cleanData as Prisma.dosenUncheckedUpdateInput,
    });
    revalidatePath("/admin/dosen");
    revalidatePath("/dosen");
    return { success: true, data: serializeDates(dosen) };
  } catch (error) {
    return { success: false, error: formatZodError(error) };
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
