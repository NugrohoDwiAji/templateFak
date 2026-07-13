import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { ReduxProvider } from "@/components/providers/ReduxProvider";
import { ThemeProvider } from "@/components/providers/ThemeProvider";
import { prisma } from "@/lib/prisma";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

async function getIdentitasValue(name: string): Promise<string> {
  try {
    const item = await prisma.identitas.findUnique({ where: { name } });
    return item?.value || "";
  } catch {
    return "";
  }
}

export async function generateMetadata(): Promise<Metadata> {
  const namaFakultas = await getIdentitasValue("nama_fakultas");
  const tagline = await getIdentitasValue("tagline");

  const title = namaFakultas
    ? `${namaFakultas}- Universitas Bumigora`
    : "Fakultas  - Universitas Bumigora";

  const description = tagline || "Mengembangkan potensi diri melalui pendidikan tinggi berkualitas";

  return {
    title,
    description,
    icons: {
      icon: "/ubg.png",
    },
  };
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ReduxProvider>
          <ThemeProvider>{children}</ThemeProvider>
        </ReduxProvider>
      </body>
    </html>
  );
}
