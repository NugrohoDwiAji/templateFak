"use client";

import { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { Upload, X } from "lucide-react";
import { cn } from "@/lib/utils";

interface FileDropZoneProps {
  onFile: (file: File) => void;
  accept?: Record<string, string[]>;
  maxSize?: number;
  currentFile?: File | null;
  onClear?: () => void;
  className?: string;
}

function FileDropZone({
  onFile,
  accept = { "image/*": [".png", ".jpg", ".jpeg", ".gif", ".webp"] },
  maxSize = 5 * 1024 * 1024,
  currentFile,
  onClear,
  className,
}: FileDropZoneProps) {
  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      const file = acceptedFiles[0];
      if (file) onFile(file);
    },
    [onFile]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept,
    maxSize,
    multiple: false,
  });

  return (
    <div className={cn("space-y-2", className)}>
      <div
        {...getRootProps()}
        className={cn(
          "flex cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed p-6 transition-colors",
          isDragActive
            ? "border-green-500 bg-green-50"
            : "border-gray-300 hover:border-gray-400",
          currentFile && "border-green-500 bg-green-50"
        )}
        style={{
          borderColor: isDragActive ? "var(--theme-primary)" : undefined,
          backgroundColor: isDragActive ? "var(--theme-secondary)" : undefined,
        }}
      >
        <input {...getInputProps()} />
        {currentFile ? (
          <div className="flex items-center gap-2">
            <span className="text-sm text-green-700">{currentFile.name}</span>
            {onClear && (
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  onClear();
                }}
                className="rounded-full p-1 hover:bg-green-100"
              >
                <X className="h-4 w-4 text-green-700" />
              </button>
            )}
          </div>
        ) : (
          <>
            <Upload className="mb-2 h-8 w-8 text-gray-400" />
            <p className="text-sm text-gray-600">
              {isDragActive
                ? "Drop file di sini..."
                : "Drag & drop file, atau klik untuk memilih"}
            </p>
            <p className="mt-1 text-xs text-gray-500">
              Maksimal {Math.round(maxSize / 1024 / 1024)}MB
            </p>
          </>
        )}
      </div>
    </div>
  );
}

export { FileDropZone };
