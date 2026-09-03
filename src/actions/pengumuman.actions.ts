"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import { PengumumanSchema, type PengumumanInput } from "@/lib/validations";
import { formatZodError } from "@/lib/utils/validation";
import { serializeDates } from "@/lib/utils/serialize";

export async function getPengumuman() {
  try {
    const pengumuman = await prisma.pengumuman.findMany({
      orderBy: { uploadat: "desc" },
    });
    return { success: true, data: serializeDates(pengumuman) };
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
    return { success: true, data: serializeDates(pengumuman) };
  } catch (error) {
    return { success: false, error: formatZodError(error) };
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
