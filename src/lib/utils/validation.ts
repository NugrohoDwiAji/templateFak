import { ZodError } from "zod";

export function formatZodError(error: unknown): string {
  if (error instanceof ZodError) {
    return error.issues
      .map((issue, index) => `${index + 1}. ${issue.message}`)
      .join("\n");
  }
  if (error instanceof Error) {
    return error.message;
  }
  return "Terjadi kesalahan";
}
