"use client";

import { useEffect, useRef, type HTMLAttributes } from "react";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";

interface ModalProps extends HTMLAttributes<HTMLDivElement> {
  open: boolean;
  onClose: () => void;
  title?: string;
  size?: "sm" | "md" | "lg" | "xl";
}

function Modal({
  open,
  onClose,
  title,
  size = "md",
  children,
  className,
}: ModalProps) {
  const overlayRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (open) {
      document.addEventListener("keydown", handleEscape);
      document.body.style.overflow = "hidden";
    }
    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "";
    };
  }, [open, onClose]);

  if (!open) return null;

  const sizes = {
    sm: "max-w-md",
    md: "max-w-lg",
    lg: "max-w-2xl",
    xl: "max-w-4xl",
  };

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto p-4"
      style={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}
      onClick={(e) => {
        if (e.target === overlayRef.current) onClose();
      }}
    >
      <div
        className={cn(
          "relative w-full rounded-xl shadow-2xl",
          sizes[size],
          className
        )}
        style={{ backgroundColor: "var(--theme-card-bg)" }}
      >
        {title && (
          <div
            className="flex items-center justify-between border-b px-6 py-4"
            style={{ borderColor: "var(--theme-card-border)" }}
          >
            <h2
              className="text-lg font-semibold"
              style={{ color: "var(--theme-body-text)" }}
            >
              {title}
            </h2>
            <button
              onClick={onClose}
              className="rounded-lg p-1 opacity-60 hover:opacity-100"
              style={{ color: "var(--theme-body-text)" }}
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        )}
        <div className="px-6 py-4">{children}</div>
      </div>
    </div>
  );
}

export { Modal };
