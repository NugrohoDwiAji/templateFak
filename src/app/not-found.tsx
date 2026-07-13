import Link from "next/link";
import { Button } from "@/components/ui/Button";

export default function NotFound() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4">
      <div className="text-center">
        <h1 className="mb-2 text-6xl font-bold text-gray-900">404</h1>
        <p className="mb-6 text-lg text-gray-600">
          Halaman yang Anda cari tidak ditemukan
        </p>
        <Link href="/">
          <Button>Kembali ke Beranda</Button>
        </Link>
      </div>
    </div>
  );
}
