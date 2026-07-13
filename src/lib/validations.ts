import { z } from "zod";

export const LoginSchema = z.object({
  username: z.string().min(1, "Username wajib diisi"),
  password: z.string().min(1, "Password wajib diisi"),
});

export type LoginInput = z.infer<typeof LoginSchema>;

export const BeritaSchema = z.object({
  title: z.string().min(1, "Judul wajib diisi"),
  title_en: z.string().min(1, "Title (EN) wajib diisi"),
  title_cn: z.string().min(1, "Title (CN) wajib diisi"),
  description: z.string().min(1, "Deskripsi wajib diisi"),
  description_en: z.string().min(1, "Description (EN) wajib diisi"),
  description_cn: z.string().min(1, "Description (CN) wajib diisi"),
});

export type BeritaInput = z.infer<typeof BeritaSchema>;

export const ContentSchema = z.object({
  title: z.string().min(1, "Judul wajib diisi"),
  title_en: z.string().min(1, "Title (EN) wajib diisi"),
  title_cn: z.string().min(1, "Title (CN) wajib diisi"),
  value: z.string().min(1, "Konten wajib diisi"),
  value_en: z.string().min(1, "Content (EN) wajib diisi"),
  value_cn: z.string().min(1, "Content (CN) wajib diisi"),
});

export type ContentInput = z.infer<typeof ContentSchema>;

export const PengumumanSchema = z.object({
  title: z.string().min(1, "Judul wajib diisi"),
  title_en: z.string().min(1, "Title (EN) wajib diisi"),
  title_cn: z.string().min(1, "Title (CN) wajib diisi"),
  file_path: z.string().min(1, "File wajib diupload"),
});

export type PengumumanInput = z.infer<typeof PengumumanSchema>;

export const BerkasSchema = z.object({
  title: z.string().min(1, "Judul wajib diisi"),
  filepath: z.string().min(1, "File wajib diupload"),
});

export type BerkasInput = z.infer<typeof BerkasSchema>;

export const DosenSchema = z.object({
  nama: z.string().min(1, "Nama wajib diisi"),
  nama_en: z.string().optional(),
  nama_cn: z.string().optional(),
  nik: z.string().min(1, "NIK wajib diisi"),
  jenis_dosen: z.string().min(1, "Jenis dosen wajib diisi"),
  kepakaran: z.string().optional(),
  kepakaran_en: z.string().optional(),
  kepakaran_cn: z.string().optional(),
  foto: z.string().optional(),
});

export type DosenInput = z.infer<typeof DosenSchema>;

export const ProdiSchema = z.object({
  nama: z.string().min(1, "Nama wajib diisi"),
  nama_en: z.string().min(1, "Name (EN) wajib diisi"),
  nama_cn: z.string().min(1, "Name (CN) wajib diisi"),
  slug: z.string().min(1, "Slug wajib diisi"),
  link: z.string().optional(),
  visi: z.string().min(1, "Visi wajib diisi"),
  visi_en: z.string().min(1, "Vision (EN) wajib diisi"),
  visi_cn: z.string().min(1, "Vision (CN) wajib diisi"),
  misi: z.string().min(1, "Misi wajib diisi"),
  misi_en: z.string().min(1, "Mission (EN) wajib diisi"),
  misi_cn: z.string().min(1, "Mission (CN) wajib diisi"),
});

export type ProdiInput = z.infer<typeof ProdiSchema>;

export const FaqSchema = z.object({
  question: z.string().min(1, "Pertanyaan wajib diisi"),
  question_en: z.string().min(1, "Question (EN) wajib diisi"),
  question_cn: z.string().min(1, "Question (CN) wajib diisi"),
  answer: z.string().min(1, "Jawaban wajib diisi"),
  answer_en: z.string().min(1, "Answer (EN) wajib diisi"),
  answer_cn: z.string().min(1, "Answer (CN) wajib diisi"),
});

export type FaqInput = z.infer<typeof FaqSchema>;

export const IdentitasSchema = z.object({
  name: z.string().min(1, "Nama wajib diisi"),
  value: z.string().min(1, "Value wajib diisi"),
});

export type IdentitasInput = z.infer<typeof IdentitasSchema>;
