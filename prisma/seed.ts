import "dotenv/config";
import { PrismaMariaDb } from "@prisma/adapter-mariadb";
import { PrismaClient } from "@prisma/client";
import { z } from "zod";

const adminSeedSchema = z.object({
  username: z
    .string()
    .min(3, "Username harus minimal 3 karakter")
    .regex(
      /^[a-zA-Z0-9_]+$/,
      "Username hanya boleh berisi huruf, angka, dan underscore",
    ),
  password: z.string().min(8, "Password harus minimal 8 karakter"),
});

type AdminSeedInput = z.infer<typeof adminSeedSchema>;

function createPrismaClient() {
  const databaseUrl = process.env.DATABASE_URL?.trim();

  if (!databaseUrl) {
    throw new Error("Environment variable DATABASE_URL wajib diisi.");
  }

  const adapter = new PrismaMariaDb(databaseUrl);
  return new PrismaClient({ adapter });
}

function getAdminSeedInput(): AdminSeedInput {
  const validation = adminSeedSchema.safeParse({
    username: process.env.ADMIN_USERNAME ?? "admin",
    password: process.env.ADMIN_PASSWORD ?? "Admin123!",
  });

  if (!validation.success) {
    const message = validation.error.issues
      .map((issue) => `- ${issue.path.join(".")}: ${issue.message}`)
      .join("\n");

    throw new Error(`Konfigurasi admin tidak valid:\n${message}`);
  }

  return validation.data;
}

async function hashPassword(password: string): Promise<string> {
  const bcrypt = await import("bcrypt");
  return bcrypt.hash(password, 10);
}

export async function seedAdminUser(
  prisma: PrismaClient,
  input: AdminSeedInput,
) {
  const existingAdmin = await prisma.user.findUnique({
    where: { username: input.username },
  });

  const hashedPassword = await hashPassword(input.password);

  const admin = await prisma.user.upsert({
    where: { username: input.username },
    update: {
      password: hashedPassword,
    },
    create: {
      username: input.username,
      password: hashedPassword,
      name: "Administrator",
      email: `admin@ubg.ac.id`,
      role: "admin",
    },
  });

  return {
    admin,
    action: existingAdmin ? "updated" : "created",
  };
}

async function seedThemes(prisma: PrismaClient) {
  const themes = [
    {
      name: "Biru Klasik",
      isActive: true,
      primaryColor: "blue-600",
      primaryHex: "#2563eb",
      secondaryColor: "slate-100",
      secondaryHex: "#f1f5f9",
      accentColor: "blue-500",
      accentHex: "#3b82f6",
      headerBg: "white",
      headerBgHex: "#ffffff",
      headerText: "gray-800",
      headerTextHex: "#1f2937",
      sidebarBg: "blue-800",
      sidebarBgHex: "#1e40af",
      sidebarText: "white",
      sidebarTextHex: "#ffffff",
      sidebarActive: "white",
      sidebarActiveHex: "#ffffff",
      bodyBg: "gray-50",
      bodyBgHex: "#f9fafb",
      bodyText: "gray-800",
      bodyTextHex: "#1f2937",
      cardBg: "white",
      cardBgHex: "#ffffff",
      cardBorder: "gray-200",
      cardBorderHex: "#e5e7eb",
      buttonPrimary: "blue-600",
      buttonPrimaryHex: "#2563eb",
      buttonSecondary: "gray-200",
      buttonSecondaryHex: "#e5e7eb",
      footerBg: "blue-800",
      footerBgHex: "#1e40af",
      footerText: "white",
      footerTextHex: "#ffffff",
    },
    {
      name: "Hijau Alam",
      isActive: false,
      primaryColor: "emerald-600",
      primaryHex: "#059669",
      secondaryColor: "emerald-50",
      secondaryHex: "#ecfdf5",
      accentColor: "emerald-500",
      accentHex: "#10b981",
      headerBg: "white",
      headerBgHex: "#ffffff",
      headerText: "gray-800",
      headerTextHex: "#1f2937",
      sidebarBg: "emerald-800",
      sidebarBgHex: "#065f46",
      sidebarText: "white",
      sidebarTextHex: "#ffffff",
      sidebarActive: "white",
      sidebarActiveHex: "#ffffff",
      bodyBg: "gray-50",
      bodyBgHex: "#f9fafb",
      bodyText: "gray-800",
      bodyTextHex: "#1f2937",
      cardBg: "white",
      cardBgHex: "#ffffff",
      cardBorder: "gray-200",
      cardBorderHex: "#e5e7eb",
      buttonPrimary: "emerald-600",
      buttonPrimaryHex: "#059669",
      buttonSecondary: "gray-200",
      buttonSecondaryHex: "#e5e7eb",
      footerBg: "emerald-800",
      footerBgHex: "#065f46",
      footerText: "white",
      footerTextHex: "#ffffff",
    },
    {
      name: "Ungu Elegan",
      isActive: false,
      primaryColor: "violet-600",
      primaryHex: "#7c3aed",
      secondaryColor: "violet-50",
      secondaryHex: "#f5f3ff",
      accentColor: "violet-500",
      accentHex: "#8b5cf6",
      headerBg: "white",
      headerBgHex: "#ffffff",
      headerText: "gray-800",
      headerTextHex: "#1f2937",
      sidebarBg: "violet-800",
      sidebarBgHex: "#5b21b6",
      sidebarText: "white",
      sidebarTextHex: "#ffffff",
      sidebarActive: "white",
      sidebarActiveHex: "#ffffff",
      bodyBg: "gray-50",
      bodyBgHex: "#f9fafb",
      bodyText: "gray-800",
      bodyTextHex: "#1f2937",
      cardBg: "white",
      cardBgHex: "#ffffff",
      cardBorder: "gray-200",
      cardBorderHex: "#e5e7eb",
      buttonPrimary: "violet-600",
      buttonPrimaryHex: "#7c3aed",
      buttonSecondary: "gray-200",
      buttonSecondaryHex: "#e5e7eb",
      footerBg: "violet-800",
      footerBgHex: "#5b21b6",
      footerText: "white",
      footerTextHex: "#ffffff",
    },
    {
      name: "Merah Marun",
      isActive: false,
      primaryColor: "rose-600",
      primaryHex: "#e11d48",
      secondaryColor: "rose-50",
      secondaryHex: "#fff1f2",
      accentColor: "rose-500",
      accentHex: "#f43f5e",
      headerBg: "white",
      headerBgHex: "#ffffff",
      headerText: "gray-800",
      headerTextHex: "#1f2937",
      sidebarBg: "rose-800",
      sidebarBgHex: "#9f1239",
      sidebarText: "white",
      sidebarTextHex: "#ffffff",
      sidebarActive: "white",
      sidebarActiveHex: "#ffffff",
      bodyBg: "gray-50",
      bodyBgHex: "#f9fafb",
      bodyText: "gray-800",
      bodyTextHex: "#1f2937",
      cardBg: "white",
      cardBgHex: "#ffffff",
      cardBorder: "gray-200",
      cardBorderHex: "#e5e7eb",
      buttonPrimary: "rose-600",
      buttonPrimaryHex: "#e11d48",
      buttonSecondary: "gray-200",
      buttonSecondaryHex: "#e5e7eb",
      footerBg: "rose-800",
      footerBgHex: "#9f1239",
      footerText: "white",
      footerTextHex: "#ffffff",
    },
    {
      name: "Oranye Ceria",
      isActive: false,
      primaryColor: "orange-600",
      primaryHex: "#ea580c",
      secondaryColor: "orange-50",
      secondaryHex: "#fff7ed",
      accentColor: "orange-500",
      accentHex: "#f97316",
      headerBg: "white",
      headerBgHex: "#ffffff",
      headerText: "gray-800",
      headerTextHex: "#1f2937",
      sidebarBg: "orange-800",
      sidebarBgHex: "#9a3412",
      sidebarText: "white",
      sidebarTextHex: "#ffffff",
      sidebarActive: "white",
      sidebarActiveHex: "#ffffff",
      bodyBg: "gray-50",
      bodyBgHex: "#f9fafb",
      bodyText: "gray-800",
      bodyTextHex: "#1f2937",
      cardBg: "white",
      cardBgHex: "#ffffff",
      cardBorder: "gray-200",
      cardBorderHex: "#e5e7eb",
      buttonPrimary: "orange-600",
      buttonPrimaryHex: "#ea580c",
      buttonSecondary: "gray-200",
      buttonSecondaryHex: "#e5e7eb",
      footerBg: "orange-800",
      footerBgHex: "#9a3412",
      footerText: "white",
      footerTextHex: "#ffffff",
    },
    {
      name: "Teal Modern",
      isActive: false,
      primaryColor: "teal-600",
      primaryHex: "#0d9488",
      secondaryColor: "teal-50",
      secondaryHex: "#f0fdfa",
      accentColor: "teal-500",
      accentHex: "#14b8a6",
      headerBg: "white",
      headerBgHex: "#ffffff",
      headerText: "gray-800",
      headerTextHex: "#1f2937",
      sidebarBg: "teal-800",
      sidebarBgHex: "#115e59",
      sidebarText: "white",
      sidebarTextHex: "#ffffff",
      sidebarActive: "white",
      sidebarActiveHex: "#ffffff",
      bodyBg: "gray-50",
      bodyBgHex: "#f9fafb",
      bodyText: "gray-800",
      bodyTextHex: "#1f2937",
      cardBg: "white",
      cardBgHex: "#ffffff",
      cardBorder: "gray-200",
      cardBorderHex: "#e5e7eb",
      buttonPrimary: "teal-600",
      buttonPrimaryHex: "#0d9488",
      buttonSecondary: "gray-200",
      buttonSecondaryHex: "#e5e7eb",
      footerBg: "teal-800",
      footerBgHex: "#115e59",
      footerText: "white",
      footerTextHex: "#ffffff",
    },
  ];

  for (const data of themes) {
    const existing = await prisma.theme.findFirst({
      where: { name: data.name },
    });
    if (!existing) {
      await prisma.theme.create({ data });
    }
  }

  console.log(`✓ ${themes.length} tema berhasil di-seed`);
}

async function main() {
  const prisma = createPrismaClient();

  try {
    console.log("\n🌱 Memulai seed database...\n");

    const input = getAdminSeedInput();
    const { admin, action } = await seedAdminUser(prisma, input);
    console.log(`✓ Admin ${action}: ${admin.username}\n`);

    await seedThemes(prisma);

    console.log("\n✅ Seed database berhasil!\n");
  } finally {
    await prisma.$disconnect();
  }
}

main().catch((error) => {
  console.error("❌ Gagal menjalankan seed database.");
  console.error(error instanceof Error ? error.message : error);
  process.exit(1);
});
