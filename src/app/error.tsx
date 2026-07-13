"use client";

import { Button } from "@/components/ui/Button";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4">
      <div className="text-center">
        <h1 className="mb-2 text-6xl font-bold text-gray-900">500</h1>
        <p className="mb-6 text-lg text-gray-600">
          Terjadi kesalahan internal server
        </p>
        <p className="mb-6 text-sm text-gray-500">{error.message}</p>
        <Button onClick={reset}>Coba Lagi</Button>
      </div>
    </div>
  );
}
