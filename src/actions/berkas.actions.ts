"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import { BerkasSchema, type BerkasInput } from "@/lib/validations";
import { formatZodError } from "@/lib/utils/validation";

export async function getBerkas() {
  try {
    const berkas = await prisma.berkas.findMany({
      orderBy: { uploadat: "desc" },
    });
    return { success: true, data: berkas };
  } catch {
    return { success: false, error: "Gagal mengambil data berkas" };
  }
}

export async function createBerkas(data: BerkasInput, filepath: string) {
  try {
    const validated = BerkasSchema.parse(data);
    const berkas = await prisma.berkas.create({
      data: { ...validated, filepath },
    });
    revalidatePath("/admin/berkas");
    revalidatePath("/unduhan");
    return { success: true, data: berkas };
  } catch (error) {
    return { success: false, error: formatZodError(error) };
  }
}

export async function deleteBerkas(id: string) {
  try {
    await prisma.berkas.delete({ where: { id } });
    revalidatePath("/admin/berkas");
    revalidatePath("/unduhan");
    return { success: true };
  } catch {
    return { success: false, error: "Gagal menghapus berkas" };
  }
}
