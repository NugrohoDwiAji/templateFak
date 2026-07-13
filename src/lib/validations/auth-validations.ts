import { z } from "zod";

export const nameSchema = z
  .string()
  .min(2, "Nama harus minimal 2 karakter")
  .max(100, "Nama maksimal 100 karakter");

export const usernameSchema = z
  .string()
  .min(3, "Username harus minimal 3 karakter")
  .max(50, "Username maksimal 50 karakter")
  .regex(
    /^[a-zA-Z0-9_]+$/,
    "Username hanya boleh berisi huruf, angka, dan underscore"
  );

export const emailSchema = z
  .string()
  .email("Format email tidak valid");

export const passwordSchema = z
  .string()
  .min(8, "Password harus minimal 8 karakter")
  .regex(/[A-Z]/, "Password harus mengandung minimal 1 huruf besar")
  .regex(/[a-z]/, "Password harus mengandung minimal 1 huruf kecil")
  .regex(/[0-9]/, "Password harus mengandung minimal 1 angka");

export const loginSchema = z.object({
  username: usernameSchema,
  password: z.string().min(1, "Password wajib diisi"),
});

export const registerSchema = z.object({
  name: nameSchema,
  username: usernameSchema,
  email: emailSchema,
  password: passwordSchema,
});

export type LoginInput = z.infer<typeof loginSchema>;
export type RegisterInput = z.infer<typeof registerSchema>;
