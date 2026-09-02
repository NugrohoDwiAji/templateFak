"use client";

interface LoadingOverlayProps {
  open: boolean;
  message?: string;
}

function LoadingOverlay({ open, message = "Menyimpan data..." }: LoadingOverlayProps) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center" style={{ backgroundColor: "rgba(255, 255, 255, 0.8)" }}>
      <div className="flex flex-col items-center gap-4 rounded-xl border border-gray-200 bg-white px-8 py-6 shadow-lg">
        <div className="relative h-12 w-12">
          <div className="absolute inset-0 h-12 w-12 animate-spin rounded-full border-4 border-gray-200" />
          <div className="absolute inset-0 h-12 w-12 animate-spin rounded-full border-4 border-t-transparent" style={{ borderColor: "var(--theme-button-primary, #2563eb) transparent transparent transparent" }} />
        </div>
        <p className="text-sm font-medium text-gray-700">{message}</p>
      </div>
    </div>
  );
}

export { LoadingOverlay };
