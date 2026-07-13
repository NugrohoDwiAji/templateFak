import { type HTMLAttributes } from "react";
import { cn } from "@/lib/utils";

type CardProps = HTMLAttributes<HTMLDivElement>;

function Card({ className, ...props }: CardProps) {
  return (
    <div
      className={cn(
        "rounded-xl border border-gray-200 bg-white shadow-sm",
        className
      )}
      {...props}
    />
  );
}

function CardHeader({ className, ...props }: CardProps) {
  return (
    <div
      className={cn("border-b border-gray-200 px-6 py-4", className)}
      {...props}
    />
  );
}

function CardTitle({ className, ...props }: CardProps) {
  return (
    <h3
      className={cn("text-lg font-semibold text-gray-900", className)}
      {...props}
    />
  );
}

function CardContent({ className, ...props }: CardProps) {
  return <div className={cn("px-6 py-4", className)} {...props} />;
}

function CardFooter({ className, ...props }: CardProps) {
  return (
    <div
      className={cn(
        "flex items-center border-t border-gray-200 px-6 py-4",
        className
      )}
      {...props}
    />
  );
}

export { Card, CardHeader, CardTitle, CardContent, CardFooter };
