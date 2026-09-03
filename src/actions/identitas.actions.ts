"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import { serializeDates } from "@/lib/utils/serialize";

export async function getIdentitas() {
  try {
    const identitas = await prisma.identitas.findMany();
    return { success: true, data: serializeDates(identitas) };
  } catch {
    return { success: false, error: "Gagal mengambil data identitas" };
  }
}

export async function getIdentitasByName(name: string) {
  try {
    const identitas = await prisma.identitas.findUnique({
      where: { name },
    });
    return { success: true, data: identitas?.value ?? null };
  } catch {
    return { success: false, error: "Gagal mengambil data identitas" };
  }
}

export async function setIdentitas(name: string, value: string) {
  try {
    const identitas = await prisma.identitas.upsert({
      where: { name },
      update: { value },
      create: { name, value },
    });
    revalidatePath("/admin/dashboard");
    return { success: true, data: serializeDates(identitas) };
  } catch {
    return { success: false, error: "Gagal menyimpan identitas" };
  }
}
