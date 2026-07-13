"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import { FaqSchema, type FaqInput } from "@/lib/validations";

export async function getFaq() {
  try {
    const faq = await prisma.faq.findMany({
      orderBy: { created_at: "desc" },
    });
    return { success: true, data: faq };
  } catch {
    return { success: false, error: "Gagal mengambil data FAQ" };
  }
}

export async function createFaq(data: FaqInput) {
  try {
    const validated = FaqSchema.parse(data);
    const faq = await prisma.faq.create({ data: validated });
    revalidatePath("/admin/faq");
    revalidatePath("/faq");
    return { success: true, data: faq };
  } catch (error) {
    if (error instanceof Error) {
      return { success: false, error: error.message };
    }
    return { success: false, error: "Gagal membuat FAQ" };
  }
}

export async function updateFaq(id: string, data: FaqInput) {
  try {
    const validated = FaqSchema.parse(data);
    const faq = await prisma.faq.update({
      where: { id },
      data: validated,
    });
    revalidatePath("/admin/faq");
    revalidatePath("/faq");
    return { success: true, data: faq };
  } catch (error) {
    if (error instanceof Error) {
      return { success: false, error: error.message };
    }
    return { success: false, error: "Gagal memperbarui FAQ" };
  }
}

export async function deleteFaq(id: string) {
  try {
    await prisma.faq.delete({ where: { id } });
    revalidatePath("/admin/faq");
    revalidatePath("/faq");
    return { success: true };
  } catch {
    return { success: false, error: "Gagal menghapus FAQ" };
  }
}
