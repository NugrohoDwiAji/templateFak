import { Skeleton } from "@/components/ui/Skeleton";

export default function Loading() {
  return (
    <div className="flex min-h-screen flex-col">
      <div className="h-16 border-b border-gray-200 bg-white">
        <div className="mx-auto flex h-full max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <Skeleton className="h-8 w-32" />
          <div className="hidden gap-4 md:flex">
            <Skeleton className="h-8 w-16" />
            <Skeleton className="h-8 w-16" />
            <Skeleton className="h-8 w-16" />
          </div>
        </div>
      </div>
      <div className="flex-1">
        <Skeleton className="h-96 w-full" />
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <Skeleton className="mb-8 h-8 w-48" />
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {Array.from({ length: 4 }).map((_, i) => (
              <Skeleton key={i} className="h-40 rounded-xl" />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
