"use server";

import fs from "fs/promises";
import path from "path";
import { v4 as uuid } from "uuid";

const UPLOAD_ROOT = path.join(process.cwd(), "uploads");

type UploadCategory =
  | "berita"
  | "berkas"
  | "pengumuman"
  | "dosen"
  | "struktur"
  | "banner";

export async function uploadToStorage(
  file: File,
  category: UploadCategory
): Promise<string> {
  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);

  const ext = path.extname(file.name);
  const filename = `${uuid()}${ext}`;
  const categoryDir = path.join(UPLOAD_ROOT, category);

  await fs.mkdir(categoryDir, { recursive: true });
  await fs.writeFile(path.join(categoryDir, filename), buffer);

  return `/api/files/${category}/${filename}`;
}
