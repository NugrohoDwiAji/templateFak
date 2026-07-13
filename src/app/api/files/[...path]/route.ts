import { NextRequest, NextResponse } from "next/server";
import fs from "fs/promises";
import path from "path";

const UPLOAD_ROOT = path.join(process.cwd(), "uploads");

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ path: string[] }> }
) {
  const { path: pathSegments } = await params;

  if (pathSegments.length < 2) {
    return NextResponse.json({ error: "Invalid path" }, { status: 400 });
  }

  const category = pathSegments[0]!;
  const filename = pathSegments.slice(1).join("/");

  const filePath = path.join(UPLOAD_ROOT, category, filename);

  try {
    const fileBuffer = await fs.readFile(filePath);
    const ext = path.extname(filename).toLowerCase();

    const mimeTypes: Record<string, string> = {
      ".jpg": "image/jpeg",
      ".jpeg": "image/jpeg",
      ".png": "image/png",
      ".gif": "image/gif",
      ".webp": "image/webp",
      ".pdf": "application/pdf",
      ".doc": "application/msword",
      ".docx": "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      ".xls": "application/vnd.ms-excel",
      ".xlsx": "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      ".ppt": "application/vnd.ms-powerpoint",
      ".pptx": "application/vnd.openxmlformats-officedocument.presentationml.presentation",
      ".txt": "text/plain",
      ".mp4": "video/mp4",
      ".webm": "video/webm",
    };

    const contentType = mimeTypes[ext] ?? "application/octet-stream";

    return new NextResponse(fileBuffer, {
      headers: {
        "Content-Type": contentType,
        "Cache-Control": "public, max-age=31536000, immutable",
      },
    });
  } catch {
    return NextResponse.json({ error: "File not found" }, { status: 404 });
  }
}
