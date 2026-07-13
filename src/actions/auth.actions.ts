"use server";

import bcrypt from "bcrypt";
import { prisma } from "@/lib/prisma";

export async function register(username: string, password: string) {
  try {
    const existing = await prisma.user.findUnique({
      where: { username },
    });

    if (existing) {
      return { success: false, error: "Username sudah digunakan" };
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await prisma.user.create({
      data: {
        username,
        password: hashedPassword,
        name: username,
      },
    });

    return { success: true, data: { id: user.id, username: user.username } };
  } catch (error) {
    if (error instanceof Error) {
      return { success: false, error: error.message };
    }
    return { success: false, error: "Gagal mendaftar" };
  }
}
