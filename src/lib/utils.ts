import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { format } from "date-fns";
import { id as idLocale } from "date-fns/locale";

export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}

export function formatDate(date: Date | string, fmt: string = "dd MMMM yyyy"): string {
  const d = typeof date === "string" ? new Date(date) : date;
  return format(d, fmt, { locale: idLocale });
}

export function formatDateTime(date: Date | string): string {
  return formatDate(date, "dd MMMM yyyy HH:mm");
}

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, "")
    .replace(/[\s_]+/g, "-")
    .replace(/^-+|-+$/g, "");
}
