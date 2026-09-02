"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import { ContentSchema, type ContentInput } from "@/lib/validations";
import { formatZodError } from "@/lib/utils/validation";

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
    return { success: false, error: formatZodError(error) };
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
    return { success: false, error: formatZodError(error) };
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
