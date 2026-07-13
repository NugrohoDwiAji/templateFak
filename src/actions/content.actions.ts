"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import { ContentSchema, type ContentInput } from "@/lib/validations";

export async function getContents() {
  try {
    const contents = await prisma.content.findMany({
      orderBy: { createdAt: "desc" },
    });
    return { success: true, data: contents };
  } catch {
    return { success: false, error: "Gagal mengambil data konten" };
  }
}

export async function getContentById(id: string) {
  try {
    const content = await prisma.content.findUnique({ where: { id } });
    if (!content) return { success: false, error: "Konten tidak ditemukan" };
    return { success: true, data: content };
  } catch {
    return { success: false, error: "Gagal mengambil data konten" };
  }
}

export async function getContentByTitle(title: string) {
  try {
    const content = await prisma.content.findFirst({ where: { title } });
    if (!content) return { success: false, error: "Konten tidak ditemukan" };
    return { success: true, data: content };
  } catch {
    return { success: false, error: "Gagal mengambil data konten" };
  }
}

export async function createContent(data: ContentInput) {
  try {
    const validated = ContentSchema.parse(data);
    const content = await prisma.content.create({ data: validated });
    revalidatePath("/admin/content");
    return { success: true, data: content };
  } catch (error) {
    if (error instanceof Error) {
      return { success: false, error: error.message };
    }
    return { success: false, error: "Gagal membuat konten" };
  }
}

export async function updateContent(id: string, data: ContentInput) {
  try {
    const validated = ContentSchema.parse(data);
    const content = await prisma.content.update({
      where: { id },
      data: validated,
    });
    revalidatePath("/admin/content");
    return { success: true, data: content };
  } catch (error) {
    if (error instanceof Error) {
      return { success: false, error: error.message };
    }
    return { success: false, error: "Gagal memperbarui konten" };
  }
}

export async function deleteContent(id: string) {
  try {
    await prisma.content.delete({ where: { id } });
    revalidatePath("/admin/content");
    return { success: true };
  } catch {
    return { success: false, error: "Gagal menghapus konten" };
  }
}
