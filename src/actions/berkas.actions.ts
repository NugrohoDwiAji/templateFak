"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";

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

export async function createBerkas(title: string, filepath: string) {
  try {
    const berkas = await prisma.berkas.create({
      data: { title, filepath },
    });
    revalidatePath("/admin/berkas");
    revalidatePath("/unduhan");
    return { success: true, data: berkas };
  } catch {
    return { success: false, error: "Gagal membuat berkas" };
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
