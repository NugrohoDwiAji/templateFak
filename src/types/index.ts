export type Language = "id" | "en" | "cn";

export interface ApiResponse<T = unknown> {
  success: boolean;
  data?: T;
  error?: string | { message: string; path: string }[];
}

export interface PaginatedResponse<T> {
  success: boolean;
  data?: T[];
  total?: number;
  page?: number;
  pageSize?: number;
}

export interface User {
  id: string;
  username: string;
}

export interface Berita {
  id: string;
  title: string;
  title_en: string;
  title_cn: string;
  description: string;
  description_en: string;
  description_cn: string;
  filepath: string | null;
  uploadat: Date | string;
}

export interface Content {
  id: string;
  title: string;
  title_en: string;
  title_cn: string;
  value: string;
  value_en: string;
  value_cn: string;
  createdAt: Date | string;
  updatedAt: Date | string;
}

export interface Pengumuman {
  id: string;
  title: string;
  title_en: string;
  title_cn: string;
  file_path: string;
  uploadat: Date | string;
}

export interface Berkas {
  id: string;
  title: string;
  title_en: string;
  title_cn: string;
  filepath: string;
  uploadat: Date | string;
}

export interface Dosen {
  id: string;
  nama: string;
  nama_en: string;
  nama_cn: string;
  nik: string;
  foto: string | null;
  jenis_dosen: string;
  kepakaran: string | null;
  kepakaran_en: string | null;
  kepakaran_cn: string | null;
  create_at: Date | string;
}

export interface Prodi {
  id: string;
  nama: string;
  nama_en: string;
  nama_cn: string;
  slug: string;
  link: string | null;
  visi: string;
  visi_en: string;
  visi_cn: string;
  misi: string;
  misi_en: string;
  misi_cn: string;
}

export interface Faq {
  id: string;
  question: string;
  question_en: string;
  question_cn: string;
  answer: string;
  answer_en: string;
  answer_cn: string;
  created_at: Date | string;
}

export interface Identitas {
  id: string;
  name: string;
  value: string;
}

export interface ProfilFakultas {
  nama: string;
  tagline: string;
  tentang: string;
  gambar: string;
  alamat: string;
  telepon: string;
  email: string;
  visi: string;
  misi: string;
}
