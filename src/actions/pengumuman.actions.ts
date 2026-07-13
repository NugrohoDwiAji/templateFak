"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import { PengumumanSchema, type PengumumanInput } from "@/lib/validations";

export async function getPengumuman() {
  try {
    const pengumuman = await prisma.pengumuman.findMany({
      orderBy: { uploadat: "desc" },
    });
    return { success: true, data: pengumuman };
  } catch {
    return { success: false, error: "Gagal mengambil data pengumuman" };
  }
}

export async function createPengumuman(data: PengumumanInput) {
  try {
    const validated = PengumumanSchema.parse(data);
    const pengumuman = await prisma.pengumuman.create({ data: validated });
    revalidatePath("/admin/pengumuman");
    revalidatePath("/pengumuman");
    return { success: true, data: pengumuman };
  } catch (error) {
    if (error instanceof Error) {
      return { success: false, error: error.message };
    }
    return { success: false, error: "Gagal membuat pengumuman" };
  }
}

export async function deletePengumuman(id: string) {
  try {
    await prisma.pengumuman.delete({ where: { id } });
    revalidatePath("/admin/pengumuman");
    revalidatePath("/pengumuman");
    return { success: true };
  } catch {
    return { success: false, error: "Gagal menghapus pengumuman" };
  }
}
