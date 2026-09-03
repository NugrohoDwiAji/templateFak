"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import { serializeDates } from "@/lib/utils/serialize";

export interface ThemeData {
  id: string;
  name: string;
  isActive: boolean;
  primaryColor: string;
  primaryHex: string;
  secondaryColor: string;
  secondaryHex: string;
  accentColor: string;
  accentHex: string;
  headerBg: string;
  headerBgHex: string;
  headerText: string;
  headerTextHex: string;
  sidebarBg: string;
  sidebarBgHex: string;
  sidebarText: string;
  sidebarTextHex: string;
  sidebarActive: string;
  sidebarActiveHex: string;
  bodyBg: string;
  bodyBgHex: string;
  bodyText: string;
  bodyTextHex: string;
  cardBg: string;
  cardBgHex: string;
  cardBorder: string;
  cardBorderHex: string;
  buttonPrimary: string;
  buttonPrimaryHex: string;
  buttonSecondary: string;
  buttonSecondaryHex: string;
  footerBg: string;
  footerBgHex: string;
  footerText: string;
  footerTextHex: string;
  createdAt?: Date | string;
  updatedAt?: Date | string;
}

export async function getThemes() {
  try {
    const themes = await prisma.theme.findMany({
      orderBy: { createdAt: "desc" },
    });
    return { success: true, data: serializeDates(themes) };
  } catch {
    return { success: false, error: "Gagal mengambil data tema" };
  }
}

export async function getActiveTheme() {
  try {
    const theme = await prisma.theme.findFirst({
      where: { isActive: true },
    });
    return { success: true, data: serializeDates(theme) };
  } catch {
    return { success: false, error: "Gagal mengambil tema aktif" };
  }
}

export async function getThemeById(id: string) {
  try {
    const theme = await prisma.theme.findUnique({
      where: { id },
    });
    return { success: true, data: serializeDates(theme) };
  } catch {
    return { success: false, error: "Gagal mengambil data tema" };
  }
}

export async function createTheme(data: Omit<ThemeData, "id" | "isActive">) {
  try {
    const theme = await prisma.theme.create({
      data: {
        ...data,
        isActive: false,
      },
    });
    revalidatePath("/admin/theme");
    return { success: true, data: serializeDates(theme) };
  } catch {
    return { success: false, error: "Gagal membuat tema baru" };
  }
}

export async function updateTheme(id: string, data: Partial<ThemeData>) {
  try {
    const theme = await prisma.theme.update({
      where: { id },
      data,
    });
    revalidatePath("/admin/theme");
    return { success: true, data: serializeDates(theme) };
  } catch {
    return { success: false, error: "Gagal mengupdate tema" };
  }
}

export async function setActiveTheme(id: string) {
  try {
    await prisma.theme.updateMany({
      where: { isActive: true },
      data: { isActive: false },
    });

    const theme = await prisma.theme.update({
      where: { id },
      data: { isActive: true },
    });

    revalidatePath("/admin/theme");
    revalidatePath("/");
    return { success: true, data: serializeDates(theme) };
  } catch {
    return { success: false, error: "Gagal mengaktifkan tema" };
  }
}

export async function deleteTheme(id: string) {
  try {
    const theme = await prisma.theme.findUnique({ where: { id } });
    if (theme?.isActive) {
      return { success: false, error: "Tidak bisa menghapus tema yang sedang aktif" };
    }

    await prisma.theme.delete({
      where: { id },
    });
    revalidatePath("/admin/theme");
    return { success: true };
  } catch {
    return { success: false, error: "Gagal menghapus tema" };
  }
}
